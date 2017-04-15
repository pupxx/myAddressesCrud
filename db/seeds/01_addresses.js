
exports.seed = function(knex) {
  return knex('addresses').del()
    .then(() => {
      return knex('addresses').insert([{
        id: 1,
        line_1: '1222 E. Madison',
        line_2: 'Apt 2',
        city: 'Seattle',
        zip: 99514,
        created_at: new Date(),
        updated_at: new Date()
      },{
        id: 2,
        line_1: '3133 Some St.',
        line_2: 'Apt 34',
        city: 'Seattle',
        zip: 98111,
        created_at: new Date(),
        updated_at: new Date()
      },{
        id: 3,
        line_1: '4444 Something St.',
        line_2: 'Apt #4',
        city: 'Seattle',
        zip: 98012,
        created_at: new Date(),
        updated_at: new Date()
      }]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('addresses_id_seq', (SELECT MAX(id) FROM addresses));"
      );
    });
};
