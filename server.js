const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json())

const user = require('./routes/user.route');

app.use('/user', user);

const start = async () => {

  try {
      await mongoose.connect('mongodb://localhost:27017/user', {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useCreateIndex: true
      })
      console.log('app connected to MongoDb');
  } catch (err) {
      console.log('app NOT connected to MongoDb');
      console.error(err);
  }

  app.listen(5000, () => {
      console.log('app listening on port 5000');
  });
};

start();
