const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true
    },
    password: {
        type: String
    }
});

userSchema.statics.signIn = async function(email, password) {
    const user = await this.findOne({ email });
    if (user) {
        if (password == user.password) {
            return user;
        }
        throw Error ('incorrect password');
    }
    throw Error('incorrect email');
}

const User = mongoose.model('user', userSchema);
module.exports = User;