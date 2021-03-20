const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());
const port = 3033;

mongoose
  .connect('mongodb://localhost:27018/testing')
  .then(() => {
    console.log('connected to db');
  })
  .catch((err) => {
    console.log('errmessage', err);
  });

app.get('/', (req, res) => {
  res.send('welcome');
});

app.listen(port, () => {
  console.log('running at port ', port);
});
