const mongoose = require("mongoose");
const conn = require('../config/db');

var stateSchema = new mongoose.Schema({
    id: Number,
    state_name: String,
}, {
    timestamps: true
});

let states = conn.model('states', stateSchema);
module.exports = states;