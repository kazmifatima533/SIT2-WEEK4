const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();  
const routes = require("./routes/Todoroute")

const app = express();
const PORT = process.env.PORT || 8080;  

app.use(express.json());  
app.use(cors()); 

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));


app.use('/api', routes); 


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
