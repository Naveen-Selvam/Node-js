const express = require('express');
const app = express();
app.use(express.json());
const port = 3033;
const user = [
  { id: 1, name: 'virat', age: 40 },
  { id: 2, name: 'dhoni', age: 45 },
];
app.get('/', (req, res) => {
  res.send('welocme to the express werbsite');
});
app.get('/about', (req, res) => {
  res.send('about page');
});
app.get('/users', (req, res) => {
  res.json(user);
});
app.get('/users/:id', (req, res) => {
  const id = req.params.id;
  const userResult = user.find((ele) => {
    return ele.id === Number(id);
  });
  if (userResult) {
    res.json(userResult);
  } else {
    res.json({});
  }
});

app.post('/info', (req, res) => {
  const mtd = req.method;
  const data = req.body;
  res.json(data);
});

app.put('/info', (req, res) => {
  const mtd = req.method;
  res.send(`${mtd} is occured`);
});

app.delete('/info', (req, res) => {
  const mtd = req.method;
  res.send(`${mtd} is occured`);
});

app.listen(port, () => {
  console.log('running at port ', port);
});
