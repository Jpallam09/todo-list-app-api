import bcrypt from 'bcrypt';
import User from '../models/auth.model.js';

export const signUp = async (req, res, next) => {
    try {
        //extract username, email and password from incoming req.body (headers)
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        //for better consistecy make the email lowercase
        const normalizedEmail = email.toLowerCase();

        //check if user with the email already exists and throw error if email exists
        const existingUser = await User.findOne({ email: normalizedEmail });
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: 'Email already in use'
            });
        }

        //hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //create a new user
        const user = await User.create({
            username,
            email: normalizedEmail,
            password: hashedPassword
        });

        //send response
        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            data: {
                userId: user._id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {

        //catch the error
        next(error);
    }
};

export const signIn = async (req, res, next) => {
    try {
        //extract email and password from incoming req.body (headers)
        const { email, password } = req.body;

        //check if user with the email exists and trhow error if email does not exist
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email or password missing'
            })
        }

        //for better consistecy make the email lowercase
        const normalizedEmail = email.toLowerCase();

        //find for user email in database 
        const user = await User.findOne({ email: normalizedEmail });

        //throw error if email does not exist
        if (!user) {
            return res.status(409).json({
                success: false,
                message: 'Invalid credentials'
            })
        }

        //compare password match
        const isMatch = await bcrypt.compare(password, user.password);
        //always return an error for hanling this 
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials',
            });
        }

        req.session.user = {
            userId: user._id,
            username: user.username,
            email: user.email
        };

        //successful response
        res.status(200).json({
            success: true,
            message: 'User signed in successfully',
            data: req.session.user
        });
    } catch (error) {
        next(error);
    }
};

export const signOut = (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(500).json({ success: false, message: "Logout failed" });
        res.clearCookie('connect.sid');
        res.status(200).json({ success: true, message: "Logged out successfully" });
    });
};