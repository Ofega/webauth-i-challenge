exports.up = function (knex) {
    return knex.schema.createTable('user', table => {
        table.increments();
        table.string('username', 100).notNullable();
        table.text('password', 255).notNullable();
    })
};

exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists('user');
};
