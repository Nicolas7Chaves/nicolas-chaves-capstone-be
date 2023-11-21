const express = require ('express');
const cors = require ('cors');
const app = express();
const knex = require('knex')(require('./knexfile'));

require("dotenv").config();

app.use(cors());
app.use(express.json());

app.get('/employees', async (_req, res) => {
    try {
        const employees = await knex('employees')
        // .select('employee.id' ,'warehouse_name', 'item_name', 'description', 'category', 'status', 'quantity');
        console.log(employees)
        res.status(200).json(employees);
        
    } catch (error) {
        console.error('Error retrieving employees', error)
        res.status(500).send('Error retrieving employees');
        // response.send(`Error retrieving inventories:`);
    }
});

app.get('/attendance', async (_req, res) => {
    try {
        const attendance = await knex('attendance')
        // .select('employee.id' ,'warehouse_name', 'item_name', 'description', 'category', 'status', 'quantity');
        console.log(attendance)
        res.status(200).json(attendance);
        
    } catch (error) {
        console.error('Error retrieving attendance', error)
        res.status(500).send('Error retrieving attendance');
        // response.send(`Error retrieving inventories:`);
    }
});

const port = process.env.PORT || 8081;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});