require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { Tobacco } = require('./models/tobacco');

const port = process.env.PORT || process.env.API_PORT;
const dbOptions = {
    user: process.env.DB_USER,
    pass: process.env.DB_PW
};

mongoose.connect(process.env.DB_CONNECTION, dbOptions, (error) => {
    if(error) console.error(error);
    else console.debug('DB connected!');
});

app.get('/', (req, res) => {
  res.json({
      version: process.env.API_VERSION
  });
});

app.get('/tobaccos', (req, res) => {

    const findOptions = {};
    if(req.query) {
        if(req.query.name) {
            findOptions.name = {$regex: `${req.query.name}`}
        }
    }

    Tobacco.find(findOptions, (err, data) => {
        if(err) console.error(err);
        else res.json(data);
    });
});

app.listen(port, () => {
    console.debug(`API listening on Port ${port}`);
});