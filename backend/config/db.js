const mongoose = require('mongoose');
const DB_PORT=27017;
const DATABASE = 'newUser';

mongoose.connect(`mongodb://localhost:${DB_PORT}/${DATABASE}`).then(con=> {
    console.log("connected DB");
}).catch(err=>{
    console.log('error', err);
});

module.exports = mongoose;