const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config.js');

// create JWT
const maxAge = 1*24*60*60;
const createToken = (user) => {
    return jwt.sign(
        { user }, 
        JWT_SECRET, 
        { expiresIn: maxAge }
    );
};

// post auth/newUser
module.exports.newUser_post = async (req, res) => {
    const { email, password } = req.body;
    console.log(`newUser ${email}, ${password}`);

    try {
        // const user = { _id: 123 };
        const user = await User.create({ email, password });
        res.status(201).json({user: { id: user._id, email, password }})
    }
    catch(err) {
        console.log(err);
        res.status(400).json({ err });
    }
};

// post auth/signIn
module.exports.signIn_post = async (req, res) => {
    const { email, password } = req.body;
    console.log(`signIn ${email}, ${password}`);

    try {
        const user = await User.signIn(email, password);
        console.log(JWT_SECRET)
        const token = createToken(user);
        res.header('Authorization', 'Bearer '+ token); 
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge*1000 });
        res.status(200).json({
            token,
            user: { 
                id: user._id, 
                email, 
                password 
            }
        })
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ err});
    }
}

// post auth/signOut
module.exports.signOut_post = async (req, res) => {
    res.cookie('jwt', '', { maxAge: 1});
    res.status(200).json("Signed out");
}

// // user get
// module.exports.user_get = (req, res) => {
//     res.json({ response: 'Hello user' });
// };