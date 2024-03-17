const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const eventRoutes = require('./routes/events');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/event-mangement', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use('/api/events', eventRoutes); // Correct route path

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});