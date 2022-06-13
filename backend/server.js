// const express = require('express');
// const app = express();
// // var serveStatic = require('serve-static');
// import cors from 'cors';
// import Router from '../src/router/routes.js';

// app.use(express.json());
// app.use(cors());
// app.use(Router);
// app.use(express.urlencoded({ extended: true }));
// // app.use(serveStatic(__dirname + "/frontend"));

// let todos = [{ id: 1, name: 'Cohen Interview Assignment' }];

// const PORT = process.env.PORT || 3000



// app.listen(PORT, () =>
//     console.log(`Example app listening on port ${PORT}!`),
// );

import express from 'express';
import cors from 'cors';
import Router from './routes/routes.js';

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(cors());
app.use(Router);

app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`);
})