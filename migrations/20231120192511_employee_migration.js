exports.up = function (knex) {
    return knex.schema
        .createTable('employees', (table) => {
            table.increments('id').primary();
            table.string('first_name').notNullable();
            table.string('last_name').notNullable();
            table.float('hourly_rate').notNullable();
            table.timestamp('created_at').defaultTo(knex.fn.now());
            table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
        })
        .createTable('attendance', (table) => {
            table.increments('id').primary();
            table.integer('employee_id').unsigned().references('id').inTable('employees');
            table.timestamp('clock_in_time');
            table.timestamp('clock_out_time');
            table.date('date').notNullable();
        });
};

exports.down = function (knex) {
    return knex.schema
        .dropTable('attendance')
        .dropTable('employees');
};