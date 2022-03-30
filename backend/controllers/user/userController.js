const Users = require('../../models/user');
const bcrypt = require('bcryptjs');
const jwt_decode = require('jwt-decode');
const { response } = require('express');

const list = async (req, res) => {
    let users = await Users.find();
    res.send({ message: users });
}

//Add new User to database
const userAdd = async (req, res) => {
    let { username, email, password } = req.body;

    let newUser = new Users({
        username,
        email,
        password
    })
    let response = await newUser.save();
    let myToken = await newUser.getAuthToken();
    res.status(200).send({ message: "User added succesfully", text: myToken });
};

//Login 
const userLogin = async (req, res) => {
    if (!req.body.username || !req.body.password) {
        res.status(301).json({ message: 'Error', text: 'Please select username/password' });
    }

    let foundUser = await Users.findOne({ username: req.body.username });
    var responseType = {
        success: true,
        status: 200,
        message: "",

    };

    if (foundUser) {
        var match = await bcrypt.compare(req.body.password, foundUser.password);

        if (match) {
            let myToken = await foundUser.getAuthToken();
            responseType.message = "Login succesfull.";
            responseType.token = myToken;
        } else {
            responseType.success = false;
            responseType.status = 401;
            responseType.message = "Authentication Failed"
        }

    } else {
        responseType.success = false;
        responseType.status = 401;
        responseType.message = "Authentication Failed"
    }


    res.send(responseType);
}

//Logout
const userLogout = async (req, res) => {
    token = req.headers.authorization;
    var decoded = jwt_decode(token);

    console.log(decoded);

    let user = await Users.findOne({ username: decoded.username });
    user.tokens = [];  //set all tokens to null
    let response = await user.save();

    //console.log(user);
    //redirect to the page you want to go after logout. 
    res.send({ success: true, status: 200, message: "Successfully logged out" });
}

module.exports = { list, userAdd, userLogin, userLogout };