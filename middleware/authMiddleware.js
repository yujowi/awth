const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

const requireAuth = (req, res, next) => {
    console.log('authentication');

    const token = req.headers.authorization || req.cookies.jwt;
    
    console.log ('authentication bitches!');
    console.log (token);

    // validate
    if (token) {
        jwt.verify(token, JWT_SECRET, async (err, decodedToken) => {
            if (err) {
                res.status(401).json("Hands off bitch!");
                // console.log (err);
            } else {
                console.log(decodedToken);
                res.locals.user = decodedToken.user;
                next();
                return;
            };
        });
    } else {
        res.status(401).json("Hands off bitch!");
    }
};

module.exports = { requireAuth };