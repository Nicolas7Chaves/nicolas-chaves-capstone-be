/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
    // Deletes ALL existing entries in the attendance table first
    await knex('attendance').del();

    // Then delete all existing entries in the employees table
    await knex('employees').del();    // Current date and time
    const currentTimestamp = new Date();
    const createdDate = new Date('2023-11-20T00:00:00');
    await knex('employees').insert([
        {
            id: 1,
            first_name: 'Nicolas',
            last_name: 'Chaves',
            hourly_rate: 50,
            created_at: createdDate,
            updated_at: currentTimestamp,
        },
        {
            id: 2,
            first_name: 'Maria',
            last_name: 'Gonzalez',
            hourly_rate: 35,
            created_at: createdDate,
            updated_at: currentTimestamp,
        },
        {
            id: 3,
            first_name: 'Luis',
            last_name: 'Martinez',
            hourly_rate: 40,
            created_at: createdDate,
            updated_at: currentTimestamp,
        },
        {
            id: 4,
            first_name: 'Mark',
            last_name: 'Williams',
            hourly_rate: 20,
            created_at: createdDate,
            updated_at: currentTimestamp,
        },
        {
            id: 5,
            first_name: 'Juan',
            last_name: 'Perez',
            hourly_rate: 25,
            created_at: createdDate,
            updated_at: currentTimestamp,
        }
    ]);
};