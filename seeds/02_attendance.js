exports.seed = async function (knex) {
    // Deletes ALL existing entries in attendance
    await knex('attendance').del();
        await knex('attendance').insert([
            {
                employee_id: 1,
                clock_in_time: new Date('2023-11-20T09:00:00'),
                clock_out_time: new Date('2023-11-20T17:00:00'),
            },
            {
                employee_id: 2,
                clock_in_time: new Date('2023-11-20T09:00:00'),
                clock_out_time: new Date('2023-11-20T17:00:00'),
            },
            {
                employee_id: 3,
                clock_in_time: new Date('2023-11-20T09:00:00'),
                clock_out_time: new Date('2023-11-20T17:00:00')
            },
            {
                employee_id: 4,
                clock_in_time: new Date('2023-11-20T09:00:00'),
                clock_out_time: new Date('2023-11-20T17:00:00'),
            },
            {
                employee_id: 5,
                clock_in_time: new Date('2023-11-20T09:00:00'),
                clock_out_time: new Date('2023-11-20T17:00:00'),
            },
            { employee_id: 1, clock_in_time: new Date('2023-11-13T09:00:00'), clock_out_time: new Date('2023-11-13T17:00:00') },
            { employee_id: 2, clock_in_time: new Date('2023-11-13T09:00:00'), clock_out_time: new Date('2023-11-13T17:15:00') },
            { employee_id: 3, clock_in_time: new Date('2023-11-13T09:00:00'), clock_out_time: new Date('2023-11-13T16:45:00') },
            { employee_id: 4, clock_in_time: new Date('2023-11-13T09:00:00'), clock_out_time: new Date('2023-11-13T17:30:00') },
            { employee_id: 5, clock_in_time: new Date('2023-11-13T09:00:00'), clock_out_time: new Date('2023-11-13T16:30:00') },
            { employee_id: 1, clock_in_time: new Date('2023-11-14T09:00:00'), clock_out_time: new Date('2023-11-14T17:00:00') },
            { employee_id: 2, clock_in_time: new Date('2023-11-14T09:00:00'), clock_out_time: new Date('2023-11-14T17:15:00') },
            { employee_id: 3, clock_in_time: new Date('2023-11-14T09:00:00'), clock_out_time: new Date('2023-11-14T16:45:00') },
            { employee_id: 4, clock_in_time: new Date('2023-11-14T09:00:00'), clock_out_time: new Date('2023-11-14T17:30:00') },
            { employee_id: 5, clock_in_time: new Date('2023-11-14T09:00:00'), clock_out_time: new Date('2023-11-14T16:30:00') },
            { employee_id: 1, clock_in_time: new Date('2023-11-15T09:00:00'), clock_out_time: new Date('2023-11-15T17:00:00') },
            { employee_id: 2, clock_in_time: new Date('2023-11-15T09:00:00'), clock_out_time: new Date('2023-11-15T17:15:00') },
            { employee_id: 3, clock_in_time: new Date('2023-11-15T09:00:00'), clock_out_time: new Date('2023-11-15T16:45:00') },
            { employee_id: 4, clock_in_time: new Date('2023-11-15T09:00:00'), clock_out_time: new Date('2023-11-15T17:30:00') },
            { employee_id: 5, clock_in_time: new Date('2023-11-15T09:00:00'), clock_out_time: new Date('2023-11-15T16:30:00') },
            { employee_id: 1, clock_in_time: new Date('2023-11-16T09:00:00'), clock_out_time: new Date('2023-11-16T17:00:00') },
            { employee_id: 2, clock_in_time: new Date('2023-11-16T09:00:00'), clock_out_time: new Date('2023-11-16T17:15:00') },
            { employee_id: 3, clock_in_time: new Date('2023-11-16T09:00:00'), clock_out_time: new Date('2023-11-16T16:45:00') },
            { employee_id: 4, clock_in_time: new Date('2023-11-16T09:00:00'), clock_out_time: new Date('2023-11-16T17:30:00') },
            { employee_id: 5, clock_in_time: new Date('2023-11-16T09:00:00'), clock_out_time: new Date('2023-11-16T16:30:00') },
            { employee_id: 1, clock_in_time: new Date('2023-11-17T09:00:00'), clock_out_time: new Date('2023-11-17T17:00:00') },
            { employee_id: 2, clock_in_time: new Date('2023-11-17T09:00:00'), clock_out_time: new Date('2023-11-17T17:15:00') },
            { employee_id: 3, clock_in_time: new Date('2023-11-17T09:00:00'), clock_out_time: new Date('2023-11-17T16:45:00') },
            { employee_id: 4, clock_in_time: new Date('2023-11-17T09:00:00'), clock_out_time: new Date('2023-11-17T17:30:00') },
            { employee_id: 5, clock_in_time: new Date('2023-11-17T09:00:00'), clock_out_time: new Date('2023-11-17T16:30:00') },
        ]);
};