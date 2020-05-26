
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')

require('dotenv').config();

//creates server
const app = express();
const port = process.env.PORT || 5000;

//parses json
app.use(cors());
app.use(express.json());

//datasae connection 
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

//Require and uses files
const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);


//Starts the server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});