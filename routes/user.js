// user.js

const express = require('express');
const router = express.Router();
const User = require('../models/user'); // Adjust the path as needed

// Display the login form
router.get('/login', (req, res) => {
    res.render('login'); // Assuming you have a 'login.ejs' file in the 'views' directory
});

// Handle user login
router.post('/login', async (req, res) => {
    try {
        // Extract login credentials from the request body
        const { username, password } = req.body;

        // Implement user authentication logic
        // Check username and password against the database

        // For example:
        const user = await User.findOne({ where: { username, password } });

        if (user) {
            // User authenticated, redirect to a protected page
            res.redirect('/dashboard');
        } else {
            // Authentication failed, redirect back to the login page
            res.redirect('/user/login');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
