var jwt = require('jsonwebtoken');

var jwtAuth = (req, res, next) => {
    var token = req.headers.authorization;
    token = token.split(' ')[1];
    jwt.verify(token, process.env.SECRETKEY, function (err, decoded) {
        if (err) {
            res.send({ message: "Invalid token" });
        } else {
            next();
        }
    })
}

module.exports = jwtAuth;