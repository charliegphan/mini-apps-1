const express = require('express');
const path = require('path');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const dbuser = require('./config')
const bodyParser = require('body-parser');


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('./public'))


MongoClient.connect('mongodb://'
  + dbuser.username + ':' + dbuser.password + '@ds237922.mlab.com:37922/checkout',
  { useNewUrlParser: true }, (err, client) => {
    if (err) {
      throw err;
    }

    const purchases = client.db('checkout').collection('purchases')

    app.get('/', (req, res) => {
      res.send(path.join(__dirname, './public.index.html'))
    });

    app.post('/checkout', (req, res) => {
      purchases.insertOne(req.body, (err, docs) => {
        if (err) {
          throw err;
        }
        let id = docs.ops[0]._id
        res.send(id);
      })
    });

    app.post('/infoForm', (req, res) => {
      let id = req.body.id;
      purchases.updateOne({ '_id': ObjectId(id) },
        {
          $set: {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
          }
        }, (err, result) => {
          if (err) {
            throw err;
          }
          res.sendStatus(201);
        })
    });

    app.post('/shippingForm', (req, res) => {
      let id = req.body.id;
      purchases.updateOne({ '_id': ObjectId(id) },
        {
          $set: {
            address1: req.body.address1,
            address2: req.body.address2,
            city: req.body.city,
            state: req.body.state,
            zipcode: req.body.zipcode,
            phone: req.body.phone
          }
        }, (err, result) => {
          if (err) {
            throw err;
          }
          res.sendStatus(201);
        })
    });

    // app.post('/billingForm', (req, res) => {

    // });

    app.listen(3000, () => {
      console.log('listening on port 3000 ^_^');
    })

  })

