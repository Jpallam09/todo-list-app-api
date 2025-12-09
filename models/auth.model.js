import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        trim: true,
        minleghth: 3,
        maxleght: 30
    },

    email: {
        type: String,
        required: [, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        typre: String,
        required: [true, 'Password is required'],
        minlength: 6,
        maxlength: 55
    }
}, { timestamps: true })

const User = mongoose.model('User', userSchema);

export default User;