// server.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

// Check MongoDB connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
    console.log('Connected to MongoDB');
    
    // Define the user schema and model here, only once
    const userSchema = new mongoose.Schema({
        username: String,
        password: String
    });
    
    // Check if the model has already been defined
    if (!mongoose.models.User) {
        mongoose.model('User', userSchema);
    }
});

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Route for root path
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});
// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
});

// Handle form submission
app.post('/login', (req, res) => {
    const User = mongoose.model('User'); // Retrieve the User model
    const { username, password } = req.body;
    
    // Create a new user document
    const newUser = new User({
        username,
        password
    });

    // Save the user to the database
    newUser.save()
        .then(() => res.send('User created successfully'))
        .catch(err => res.status(400).send('Error creating user: ' + err));
});

// Start the 00
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
