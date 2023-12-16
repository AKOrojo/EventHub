// events.js

const express = require('express');
const router = express.Router();
const Event = require('../models/event'); // Adjust the path as needed

// Display detailed information about a specific event
router.get('/:event_id', async (req, res) => {
    const eventId = req.params.event_id;

    try {
        const event = await Event.findByPk(eventId);
        if (!event) {
            return res.status(404).send('Event not found');
        }

        res.render('eventDetails', { event });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;




