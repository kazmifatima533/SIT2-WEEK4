// Load environment variables
require('dotenv').config();  

const mongoose = require('mongoose');

const connect = async () => {
    const dbURI = process.env.MONGODB_URI;  
    
    if (!dbURI) {
        console.log("MongoDB URI is not defined in the .env file.");
        return;
    }

    try {
        await mongoose.connect(dbURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB");
    } catch (err) {
        console.log("MongoDB connection error: ", err);
    }
};

module.exports = { connect };
