var express = require('express');
var router = express.Router();
var knex = require('../db/connection')

//Get all
router.get('/', (req, res)=>{
  knex('addresses').innerJoin('contacts', 'addresses.id', 'contacts.addresses_id')
  .then(function(contacts){
    res.render('contacts/index', {
      contacts
    });
  });
});

//get one
router.get('/:id', (req, res)=>{
  var id = req.params.id;
  knex('contacts').innerJoin('addresses', 'addresses.id', 'contacts.addresses_id').where('contacts.id', id).first()
  .then((contact)=>{
    res.render('contacts/contact', {
      contact
    });
  });
});

module.exports = router;
