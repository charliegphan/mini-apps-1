const express = require('express');
const path = require('path');
const mongodb = require('mongodb').MongoClient;
const dbuser = require('./config')

const app = express();

mongodb.connect('mongodb://'
  + dbuser.username + ':' + dbuser.password + '@ds237922.mlab.com:37922/checkout',
  { useNewUrlParser: true }, (err, db) => {
    if (err) {
      throw err;
    }

    app.use(express.static('./public'))

    app.get('/', (req, res) => {
      res.send(path.join(__dirname, './public.index.html'))
    })

    app.listen(3000, () => {
      console.log('listening on port 3000 ^_^');
    })

  })

