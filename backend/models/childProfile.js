const mongoose = require("mongoose");
const conn = require('../config/db');

const childProfileSchema = new mongoose.Schema({
    name: String,
    sex: String,
    dob: String,
    father_name: String,
    mother_name: String,
    district_id: Number,
    photo: String
});

let child = conn.model('child', childProfileSchema);
module.exports = child;
