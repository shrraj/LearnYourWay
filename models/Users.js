const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');

//UserSchema
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    },
    tests:[{
        TestId: {type:Number},
        score:{type: Number},
        date:{type: Date,
            default: Date.now}
    }],
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]
});

//generating jwt Token
UserSchema.methods.generateAuthToken = async function () {
    try {
        let token = jwt.sign({ _id: this._id }, process.env.VALUE);
        this.tokens = this.tokens.concat({token: token});
        await this.save();
        return token;
    }
    catch (err) {
        console.log(err);
    }
}

const User = mongoose.model('User', UserSchema);

module.exports = User;


