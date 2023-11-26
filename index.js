const express = require('express');
const cors = require('cors');
const app = express();
const knex = require('knex')(require('./knexfile'));
const moment = require('moment-timezone');

require("dotenv").config();

app.use(cors());
app.use(express.json());

// GET EMPLOYEE
app.get('/employees', async (_req, res) => {
    try {
        const employees = await knex('employees').select('*');
        for (let employee of employees) {
            const clockedIn = await knex('attendance')
                .where({
                    employee_id: employee.id,
                    clock_out_time: null
                })
                .first();
            employee.isClockedIn = !!clockedIn;
        }
        console.log(employees);
        res.status(200).json(employees);
    } catch (error) {
        console.error('Error retrieving employees', error);
        res.status(500).send('Error retrieving employees');
    }
});

// DELETE EMPLOYEE
app.delete('/employees/:id', async (req, res) => {
    try {
        const employeeId = req.params.id;
        await knex('employees').where({ id: employeeId }).del();
        res.status(200).send('Employee deleted successfully');
    } catch (error) {
        console.error('Error deleting employee', error);
        res.status(500).send('Internal Server Error');
    }
});
// UPDATING EMPLOYEE DATA
app.put('/employees/:id', async (req, res) => {
    const employeeId = req.params.id;
    const updatedData = req.body;

    try {
        const updateCount = await knex('employees')
            .where({ id: employeeId })
            .update(updatedData);

        if (updateCount > 0) {
            res.status(200).send('Employee updated successfully');
        } else {
            res.status(404).send('Employee not found');
        }
    } catch (error) {
        console.error('Error updating employee', error);
        res.status(500).send('Internal Server Error');
    }
});

// POST NEW EMPLOYEE
app.post('/employees', async (req, res) => {
    try {
        const { first_name, last_name, hourly_rate } = req.body;
        await knex('employees').insert({
            first_name,
            last_name,
            hourly_rate
        });
        res.status(201).send('New employee added successfully');
    } catch (error) {
        console.error('Error adding new employee', error);
        res.status(500).send('Internal Server Error');
    }
});


//GET ATTENDANCE DATA
app.get('/attendance', async (req, res) => {
    try {
        const { startDate, endDate } = req.query;

        // First, get all employees
        const employees = await knex('employees').select('*');

        // Then, get attendance data within the specified date range
        const attendance = await knex('attendance')
            .join('employees', 'attendance.employee_id', '=', 'employees.id')
            .select('attendance.*', 'employees.first_name', 'employees.last_name', 'employees.hourly_rate')
            .whereBetween(knex.raw('DATE(attendance.clock_in_time)'), [startDate, endDate]);

        // Merge the attendance data with the employee data
        const mergedData = employees.map(emp => {
            const attendanceRecords = attendance.filter(a => a.employee_id === emp.id);
            return {
                ...emp,
                attendance: attendanceRecords
            };
        });

        res.status(200).json(mergedData);
    } catch (error) {
        console.error('Error retrieving attendance', error);
        res.status(500).send('Error retrieving attendance');
    }
});


//POSTING CLOCKED IN DATA
app.post('/attendance/clockin', async (req, res) => {
    try {
        const { employee_id, clock_in_time } = req.body;
        console.log("Received Request Data:", { employee_id, clock_in_time });
        // Validate the data
        if (!employee_id || !clock_in_time) {
            return res.status(400).send('Missing required fields');
        }

        // Check if the employee is already clocked in
        const existingEntry = await knex('attendance')
            .where({
                employee_id: employee_id,
                clock_out_time: null
            })
            .first();

        if (existingEntry) {
            return res.status(400).send('Employee is already clocked in and has not clocked out.');
        }

        // Convert the received timestamp to the appropriate format
        const estDateTime = moment(clock_in_time).tz('America/New_York').format('YYYY-MM-DD HH:mm:ss');

        // Insert the clock-in record into the database
        await knex('attendance').insert({
            employee_id: employee_id,
            clock_in_time: estDateTime,
        });

        res.status(201).send('Clock-in recorded successfully');
    } catch (error) {
        console.error('Error recording clock-in', error);
        res.status(500).send(`Internal Server Error: ${error.message}`);
    }
});

// UPDATING CLOCKED OUT DATA
app.put('/attendance/clockout', async (req, res) => {
    try {
        const { employee_id, clock_out_time } = req.body;
        if (!employee_id || !clock_out_time) {
            return res.status(400).send('Missing required fields');
        }

        const estDateTime = moment(clock_out_time).tz('America/New_York').format('YYYY-MM-DD HH:mm:ss');

        const latestClockIn = await knex('attendance')
            .where({
                employee_id: employee_id,
                clock_out_time: null
            })
            .orderBy('clock_in_time', 'desc')
            .first();

        if (!latestClockIn) {
            return res.status(404).send('No clock-in record found to clock out.');
        }

        await knex('attendance')
            .where({ id: latestClockIn.id })
            .update({
                clock_out_time: estDateTime
            });

        res.status(200).send('Clock-out updated successfully');
    } catch (error) {
        console.error('Error updating clock-out', error);
        res.status(500).send('Internal Server Error');
    }
});


const port = process.env.PORT || 8081;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});