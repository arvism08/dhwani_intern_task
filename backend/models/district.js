const mongoose = require("mongoose");
const conn = require('../config/db');

var stateSchema = new mongoose.Schema({
    id: Number,
    state_id: Number,
    district_name: String
 });

let districts = conn.model('districts', stateSchema);
module.exports = districts;
 