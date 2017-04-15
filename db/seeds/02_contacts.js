exports.seed = function(knex) {
  return knex('contacts').del()
    .then(() => {
      return knex('contacts').insert([{
        id: 1,
        first_name: 'Joe',
        last_name: 'Smith',
        phone_number: '555-555-5555',
        email_address: 'code@gmail.com',
        image_url: 'www.placehold.it/140/100',
        addresses_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },{
        id: 2,
        first_name: 'Sam',
        last_name: 'Smith',
        phone_number: '555-555-5555',
        email_address: 'code@gmail.com',
        image_url: 'www.placehold.it/140/100',
        addresses_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },{
        id: 3,
        first_name: 'Ben',
        last_name: 'Simpson',
        phone_number: '555-555-5555',
        email_address: 'code@gmail.com',
        image_url: 'www.placehold.it/140/100',
        addresses_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      }]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('contacts_id_seq', (SELECT MAX(id) FROM contacts));"
      );
    });
};
