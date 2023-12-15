// Import necessary modules and models
const express = require('express');
const router = express.Router();
const Event = require('../models/event'); // Adjust the path based on your project structure

// Display a list of events on the home page
router.get('/', async (req, res) => {
    try {
        const events = await Event.findAll(); // Assuming you have a findAll method in your Event model
        res.render('index', { events });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});
router.get('/about', async (req, res) => {
    try {
        const events = await Event.findAll(); // Assuming you have a findAll method in your Event model
        res.render('about.ejs', { events });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/eventDetails', async (req, res) => {
    try {
        const events = await Event.findAll(); // Assuming you have a findAll method in your Event model
        res.render('eventDetails.ejs', { events });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});
router.get('/login', async (req, res) => {
    try {
        const events = await Event.findAll(); // Assuming you have a findAll method in your Event model
        res.render('login.ejs', { events });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});
router.get('/register', async (req, res) => {
    try {
        const events = await Event.findAll(); // Assuming you have a findAll method in your Event model
        res.render('register.ejs', { events });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/dashboard', async (req, res) => {
    try {
        const events = await Event.findAll(); // Assuming you have a findAll method in your Event model
        res.render('dashboard.ejs', { events });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/createEvent', async (req, res) => {
    try {
        const events = await Event.findAll(); // Assuming you have a findAll method in your Event model
        res.render('createEvent.ejs', { events });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});



// Display the details of a specific event
router.get('/event/:eventId', async (req, res) => {
    try {
        const eventId = req.params.eventId;
        const event = await Event.findByPk(eventId); // Assuming you have a findByPk method in your Event model

        if (!event) {
            return res.status(404).send('Event not found');
        }

        res.render('eventDetails', { event });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// Other routes and middleware can be added as needed

module.exports = router;
