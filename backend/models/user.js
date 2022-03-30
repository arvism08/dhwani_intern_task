const mongoose = require("mongoose");
const conn = require('../config/db');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    tokens: [
        {
            token: {
                type: String,
                require: true
            }
        }
    ]
}, {
    timestamps: true
});

userSchema.pre('save', function (next) {
    var salt = bcrypt.genSaltSync(10);
    if (this.password && this.isModified('password')) {
        this.password = bcrypt.hashSync(this.password, salt);
    }
    next();
})

userSchema.methods.getAuthToken = async function (data) {
    let params = {
        email: this.email,
        username: this.username
    };
    const tokenValue = jwt.sign(params, process.env.SECRETKEY);
    this.tokens = this.tokens.concat({ token: tokenValue });
    await this.save();
    return tokenValue;
}

userSchema.methods.deleteToken=function(token,cb){
    var user=this;

    user.update({$unset : {token :1}},function(err,user){
        if(err) return cb(err);
        cb(null,user);
    })
}

let users = conn.model('users', userSchema);
module.exports = users;