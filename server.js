// const fs = require('fs');
// const path = require('path');
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
// const { animals } = require('./data/animals');
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

//app.use is middleware

//parse incoming string or array data
app.use(express.urlencoded({ extended: true }));//this tells it to parse the data as deeply as it can
//parse incoming json data
app.use(express.json());
//allow front end files to be readily available
app.use(express.static('public'));
//this tells the app to search for these routes
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

//this can go anywhere after the globals, but is best practice here
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});

