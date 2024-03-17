const Event = require('../models/event/event');


exports.getAllEvents = async(req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createEvent = async(req, res) => {
    try {
        const newEvent = new Event(req.body);
        const savedEvent = await newEvent.save();
        res.status(201).json(savedEvent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateEvent = async(req, res) => {
    try {
        const updatedEvent = await Event.findByIdAndUpdate(req.params.eventId, req.body, { new: true });
        res.json(updatedEvent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteEvent = async(req, res) => {
    try {
        await Event.findByIdAndDelete(req.params.eventId);
        res.json({ message: 'Event deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.registerForEvent = async(req, res) => {
    try {
        const eventId = req.params.eventId;
        const userId = req.body.userId;
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        if (event.attendees.includes(userId)) {
            return res.status(400).json({ message: 'User already registered for this event' });
        }
        event.attendees.push(userId);
        await event.save();
        res.json({ message: 'User registered for the event successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};