// Import necessary modules and models
const express = require('express');
const router = express.Router();
const Event = require('../models/event'); // Adjust the path based on your project structure
const UserModel = require('../models/user'); // Import User model with a distinct name
const sequelize = require('../config/db');

// Display Top 6 events on the home page
router.get('/', async (req, res) => {
    try {
        const events = await Event.findAll(); 

        const currentDateTime = new Date();
        const upcomingEvents = events
        .map(event => {
            const eventDateTime = new Date(event.date);

            const [hours, minutes] = event.time.split(':').map(Number);

            eventDateTime.setHours(hours, minutes);

            return { ...event, dateTime: eventDateTime };
        })
        .filter(event => event.dateTime >= currentDateTime)
        .sort((a, b) => a.dateTime - b.dateTime)
        .slice(0, 6);
        console.log(upcomingEvents[0]); 


    res.render('index', { upcomingEvents: upcomingEvents });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/search', async (req, res) => {
    try {
        const results = await sequelize.query(
            `SELECT * FROM Events WHERE eventName LIKE '%search_criteria%'`,
           
        );

        return results;
    } catch (error) {
        console.error('Error searching events:', error);
        throw error;
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

router.get('/weather', async (req, res) => {
    const request = require('request');
          
    let apiKey = '4cea5216353d6d8dd7b8580ea25df4f7';
    let city = 'london';
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
                 
    request(url, function (err, response, body) {
      if(err){
        console.log('error:', error);
      } else {
        //res.send(body);
        var weather = JSON.parse(body)
var wmsg = 'It is '+ weather.main.temp + 
   ' degrees in '+ weather.name +
   '! <br> The humidity now is: ' + 
   weather.main.humidity;
res.send (wmsg);

      } 
    });

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

router.get('/dashboard', async (req, res) => {
    try {
        // Logging: Display the session userId for debugging
        console.log('Session User ID:', req.session.userId);

        // Check User Object Initialization
        const user = await UserModel.findByPk(req.session.userId);
        if (!user) {
            console.log('User not found, redirecting to login.');
            return res.redirect('/login');
        }

        // Proceed with fetching events and rendering the dashboard
        const events = await Event.findAll();
        res.render('dashboard', { user, events });
    } catch (error) {
        // Error Handling: Log the error and send a user-friendly response
        console.error('Error in /dashboard route:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
