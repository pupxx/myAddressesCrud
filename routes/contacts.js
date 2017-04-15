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

router.delete('/:id', (req, res)=>{
  var obj = {}
  var id = req.params.id;
  var allContactData = knex('addresses').innerJoin('contacts', 'addresses.id', 'contacts.addresses_id').where('contacts.id', id)

  allContactData.first().then((contact)=>{
    obj.addressid = contact.addresses_id;
    // console.log(contact);
    knex('addresses').del().where('addresses.id', obj.addressid).then(()=>{
      knex('contacts').del().where('contacts.id', id).then(()=>{
        res.redirect('/contacts');
      })
    })

  });
  // return obj
});


//get one
// router.get('/:id', (req, res)=>{
//   var id = req.params.id;
//   knex('contacts').innerJoin('addresses', 'addresses.id', 'contacts.addresses_id').where('contacts.id', id).first()
//   .then((contact)=>{
//     res.render('contacts/contact', {
//       contact
//     });
//   });
// });


module.exports = router;
