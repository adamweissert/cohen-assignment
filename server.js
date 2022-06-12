const express = require('express');
const app = express();
var path = require('path');
var serveStatic = require('serve-static');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(serveStatic(__dirname + "/frontend"));

let todos = [{ id: 1, name: 'Cohen Interview Assignment' }];

const PORT = process.env.PORT || 3000

app.get('/todos', (req, res) => {
    return res.status(200).send(todos);
});

app.get('/tasks', (req, res) => {
    return res.status(200).send(todos);
});

app.post('/todos', (req, res) => {
    return res.status(200).send(todos);
});

app.post('/tasks', (req, res) => {
    return res.status(200).send(todos);
});

app.listen(PORT, () =>
    console.log(`Example app listening on port ${PORT}!`),
);