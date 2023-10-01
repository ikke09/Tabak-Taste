const mongoose = require('mongoose');
const {
    Schema
} = mongoose;

const tobaccoSchema = new Schema({
    producer: {
        name: String,
        path: String,
    },
    name: String,
    tastes: [String],
    type: String,
    amount: Number,
    unit: String,
    price: Number,
    currency: String,
    source: String,
    description: String,
});

const Tobacco = mongoose.model('Tobacco', tobaccoSchema, "Tobacco");

module.exports = { Tobacco };