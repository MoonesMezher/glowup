const jwt = require("jsonwebtoken")
require("dotenv").config


class Auth {
    constructor(email, password) {
        this.email = email;
        this.password = password;
    }

    generateToken = (email) => {
        return jwt.sign({ email }, process.env.JWT_SECRET_KEY);
    }

    login = (req, res) => {
        try {
            const { email, password } = req.body;
    
            // Check if all required fields are provided
            if (!email || !password) {
                return res.status(400).json({ state: "failed", message: "All fields are required" });
            }

            if(email !== this.email || password !== this.password) {
                return res.status(400).json({ state: "failed", message: "Wrong data" });
            }

            const token = this.generateToken(email);
            
            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 1000 * 60 * 60 * 24 // 1 day
            });

            return res.status(200).json({ state: "success", message: "Logged in successfully", token });
        } catch (err) {
            return res.status(500).json({ state: "failed", message: err.message})
        }
    }
}

const email = process.env.EMAIL
const password = process.env.PASSWORD

const auth = new Auth(email, password);

module.exports = auth