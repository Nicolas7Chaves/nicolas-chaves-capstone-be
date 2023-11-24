const express = require('express');
const cors = require('cors');
const app = express();
const knex = require('knex')(require('./knexfile'));
const moment = require('moment-timezone');

require("dotenv").config();

app.use(cors());
app.use(express.json());

app.get('/employees', async (_req, res) => {
    try {
        const employees = await knex('employees')
        console.log(employees);
        res.status(200).json(employees);

    } catch (error) {
        console.error('Error retrieving employees', error)
        res.status(500).send('Error retrieving employees');
        // response.send(`Error retrieving inventories:`);
    }
});


//GET ATTENDANCE DATA
app.get('/attendance', async (req, res) => {
    try {
        const { startDate, endDate } = req.query;
        const attendance = await knex('attendance')
            .join('employees', 'attendance.employee_id', '=', 'employees.id')
            .select('attendance.*', 'employees.first_name', 'employees.last_name', 'employees.hourly_rate')
            .whereBetween('attendance.date', [startDate, endDate]); // Filter by date range
        console.log(attendance);
        res.status(200).json(attendance);
    } catch (error) {
        console.error('Error retrieving attendance', error)
        res.status(500).send('Error retrieving attendance');
    }
});


//POSTING CLOCKED IN DATA
app.post('/attendance/clockin', async (req, res) => {
    try {
        const { employee_id, clock_in_time } = req.body;
        // Validate the data
        if (!employee_id || !clock_in_time) {
            return res.status(400).send('Missing required fields');
        }
        const existingEntry = await knex('attendance')
            .where({
                employee_id: employee_id,
                clock_out_time: null
            })
            .first();

        if (existingEntry) {
            return res.status(400).send('Employee is already clocked in and has not clocked out.');
        }
        // const sqlDateTime = new Date(clock_in_time).toISOString().replace('T', ' ').substring(0, 19);
        const estDateTime = moment(clock_in_time).tz('America/New_York').format('YYYY-MM-DD HH:mm:ss');
        // Insert a clock-in record into the attendance table
        await knex('attendance').insert({
            employee_id: employee_id,
            clock_in_time: estDateTime,
            date: estDateTime.split(' ')[0] // Extracting the date part
        });
        res.status(201).send('Clock-in recorded successfully');
    } catch (error) {
        console.error('Error recording clock-in', error);
        res.status(500).send('Internal Server Error');
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