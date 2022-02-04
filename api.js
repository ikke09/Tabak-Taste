require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const helmet = require("helmet");
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

app.get('/api', (req, res) => {
  res.json({
      version: process.env.API_VERSION
  });
});

app.get('/api/tobaccos', (req, res) => {

    const findOptions = {};
    if(req.query) {
        if(req.query.name) {
            findOptions.name = {$regex: `${req.query.name}`, $options: 'i'}
        }
    }

    Tobacco.find(findOptions, (err, data) => {
        if(err) console.error(err);
        else res.json(data);
    });
});

app.use(cors());
app.use(helmet());
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
})

app.listen(port, () => {
    console.debug(`API listening on Port ${port}`);
});