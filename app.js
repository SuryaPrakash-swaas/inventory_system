//Express Initialized
const express = require('express');
//Body Parser Initialized
const bodyParser = require('body-parser');
//DotENV Initialized
const dotenv = require('dotenv');

dotenv.config();

const app = express();
//Defining Server port
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Import routes
const route = require('./jwtAuth/Routes/index');
const route2 = require('./Routes/index')

// Use routes
app.use(route);
app.use(route2);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
