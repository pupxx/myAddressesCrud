var express = require('express');
var router = express.Router();
var knex = require('../db/connection');

//Get all
router.get('/', (req, res)=>{
  knex('addresses').innerJoin('contacts', 'addresses.id', 'contacts.addresses_id')
  .then(function(contacts){
    res.render('contacts/index', {
      contacts
    });
  });
});


//Add One - no duplicate addresses to address table.
router.post('/', function(req, res){
  var contact = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    phone_number: req.body.phone_number,
    email_address: req.body.email,
    image_url: req.body.image_url,
  };
  var inputAddress = {
    line_1: req.body.line_1,
    line_2: req.body.line_2,
    city: req.body.city,
    zip: req.body.zip
  };

  var allAddresses = knex('addresses');

  var duplicate = knex('addresses').where('addresses.line_1', inputAddress.line_1).andWhere('addresses.line_2', inputAddress.line_2);

  var addContact = knex('contacts').insert(contact, '*');

  var addAddress = knex('addresses').insert(inputAddress, '*');


  duplicate.then((duplicate)=>{
    console.log(duplicate);
    if(duplicate.length === 0){
      allAddresses.insert(inputAddress, '*').then((newAddress)=>{
        id = newAddress[0].id;
        contact.addresses_id = id;
        addContact.then((newContact)=>{
          res.redirect(`/contacts/${id}`)
        });
      });

    }else{
      contact.addresses_id = duplicate[0].id;
      addContact.then((newContact)=>{
        id = newContact[0].id;
        res.redirect(`/contacts/${id}`)
      });
    }
  });
});

//Create One
router.get('/create', (req, res)=>{
  knex('addresses').innerJoin('contacts', 'addresses.id', 'contacts.addresses_id').then((contact)=>{
    res.render('contacts/create', {
      contact
    });
  });
});

//Delete One
router.delete('/:id', (req, res)=>{
  var obj = {}
  var id = req.params.id;
  var allContactData = knex('addresses').innerJoin('contacts', 'addresses.id', 'contacts.addresses_id').where('contacts.id', id);

  allContactData.first().then((contact)=>{
    obj.addressid = contact.addresses_id;

    knex('contacts').del().where('contacts.id', id).then(()=>{
      knex('addresses').whereNotExists(knex('contacts').whereRaw('addresses.id = contacts.addresses_id')).del().then(()=>{
        res.redirect('/contacts');

      });
    });
  });
});

// get one
router.get('/:id', (req, res)=>{
  var id = req.params.id;
  knex('contacts').innerJoin('addresses', 'addresses.id', 'contacts.addresses_id').where('contacts.id', id).first().then((contact)=>{
    res.render('contacts/contact', {
      contact
    });
  });
});


module.exports = router;
