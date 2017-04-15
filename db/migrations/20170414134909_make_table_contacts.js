exports.up = function(knex) {
  return knex.schema.createTable('contacts', (table) => {
    table.increments();
    table.string('first_name').notNullable().defaultTo('');
    table.string('last_name').notNullable().defaultTo('');
    table.string('phone_number').notNullable();
    table.text('email_address').notNullable();
    table.text('image_url')
    table.integer('addresses_id').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('contacts');
};
