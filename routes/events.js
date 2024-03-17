const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

// Define routes for event management
router.get('/', eventController.getAllEvents);
router.post('/', eventController.createEvent);
router.put('/:eventId', eventController.updateEvent);
router.delete('/:eventId', eventController.deleteEvent);
router.post('/:eventId/register', eventController.registerForEvent);

module.exports = router;