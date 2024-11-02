const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/yourDatabaseName', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.error("Could not connect to MongoDB...", err));

// Middleware to parse JSON
app.use(express.json());

// Basic route for the root URL
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Route to add a new user
app.post('/add-user', async (req, res) => {
    const { name, email, age } = req.body;
    const user = new User({ name, email, age });
    await user.save();
    res.send("User added successfully");
  });
  

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
