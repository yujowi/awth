const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

const requireAuth = (req, res, next) => {
    console.log('authentication');
    console.log(req.cookies.jwt);
    const token = req.cookies.jwt;

    console.log ('authentication bitches!');

    try {
        if (!token) { throw Error ('no token'); };
        // validate
        jwt.verify(token, JWT_SECRET, async (err, decodedToken) => {
            if (err) {
                console.log (err);
            } else {
                console.log(decodedToken);
                res.locals.user = decodedToken.user;
                next();
                return;
            };
        });
    } catch (err) {
        console.log (err);
        res.status(401).json("Hands off bitch!");
    };
};

module.exports = { requireAuth };