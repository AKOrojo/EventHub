// user.js

const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

// Display the login form
router.get('/login', (req, res) => {
    res.render('login');
});

// Handle user login
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find user by username
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.redirect('/user/login');
        }

        // Compare password
        const isValid = await bcrypt.compare(password, user.password);
        if (isValid) {
            req.session.userId = user.id;
            res.redirect('/dashboard');
        } else {
            res.redirect('/user/login');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// Display the registration form
router.get('/register', (req, res) => {
    res.render('register');
});

// Handle user registration
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if user exists
        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) {
            return res.redirect('/user/register');
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = await User.create({ username, email, password: hashedPassword });


        // Set session and redirect
        req.session.userId = newUser.id;
        res.redirect('/dashboard');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});



module.exports = router;
