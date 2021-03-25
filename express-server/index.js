const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());
app.use((req, res, next) => {
  console.log(`${req.mehtod}- ${req.url}-${req.ip}`);
  next();
});
const port = 3033;

mongoose
  .connect('mongodb://localhost:27018/testing')
  .then(() => {
    console.log('connected to db');
  })
  .catch((err) => {
    console.log('errmessage', err);
  });

//schema
const Schema = mongoose.Schema;
const taskSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  completed: {
    type: Boolean,
  },
  dueDate: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

//model
const task = mongoose.model('task', taskSchema);

app.get('/', (req, res) => {
  res.send('welcome');
});

app.get('/api/task', (req, res) => {
  task
    .find()
    .then((tasks) => {
      res.json(tasks);
    })
    .catch((err) => {
      res.json(err);
    });
});


app.post('/api/task', (req, res) => {
  const body = req.body;
  const Task = new task(body);
  Task.save()
    .then((task) => {
      res.json(task);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.get('/api/task/:id', (req, res) => {
  const id = req.params.id;
  task
    .findById(id)
    .then((task) => {
      res.json(task);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.put('/api/task/:id', (req, res) => {
  const id = req.params.id;
  const body = req.body;
  task
    .findByIdAndUpdate(id, body, { new: true, runValidators: true })
    .then((task) => {
      res.json(task);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.delete('/api/task/:id', (req, res) => {
  const id = req.params.id;
  task
    .findByIdAndDelete(id)
    .then((task) => {
      res.json(task);
    })
    .catch((err) => {
      res.json(err);
    });
});


app.listen(port, () => {
  console.log('running at port ', port);
});
