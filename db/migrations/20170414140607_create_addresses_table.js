exports.up = function(knex) {
  return knex.schema.createTable('addresses', (table) => {
    table.increments();
    table.text('line_1').notNullable().defaultTo('');
    table.text('line_2').notNullable().defaultTo('');
    table.string('city').notNullable();
    table.integer('zip')
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('addresses');
};
