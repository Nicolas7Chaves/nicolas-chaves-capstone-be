/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
    // Deletes ALL existing entries in attendance
    await knex('attendance').del();

    await knex('attendance').insert([
        {
            employee_id: 1,
            clock_in_time: new Date('2023-11-20T09:00:00'),
            clock_out_time: new Date('2023-11-20T17:00:00'),
            date: new Date('2023-11-20').toISOString().split('T')[0]
        },
        {
            employee_id: 2,
            clock_in_time: new Date('2023-11-20T09:00:00'),
            clock_out_time: new Date('2023-11-20T17:00:00'),
            date: new Date('2023-11-20').toISOString().split('T')[0]
        },
        {
            employee_id: 3,
            clock_in_time: new Date('2023-11-20T09:00:00'),
            clock_out_time: new Date('2023-11-20T17:00:00'),
            date: new Date('2023-11-20').toISOString().split('T')[0]
        },
        {
            employee_id: 4,
            clock_in_time: new Date('2023-11-20T09:00:00'),
            clock_out_time: new Date('2023-11-20T17:00:00'),
            date: new Date('2023-11-20').toISOString().split('T')[0]
        },
        {
            employee_id: 5,
            clock_in_time: new Date('2023-11-20T09:00:00'),
            clock_out_time: new Date('2023-11-20T17:00:00'),
            date: new Date('2023-11-20').toISOString().split('T')[0]
        },
    ]);
};