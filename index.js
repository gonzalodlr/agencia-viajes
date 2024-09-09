//const express = require('express'); // commonJS sintax
import express from 'express'; // ES6 sintax, add module to package.json
import router from './routes/index.js'; // Add .js extension en node.js
import db from './config/db.js'; // Add .js extension en node.js

// Create server
const app = express();

// Connect to database
db.authenticate()
    .then( () => console.log('Database connected') )
    .catch( error => console.log(error) );

// Define port
const port = process.env.PORT || 4000;

app.listen( port, () => {
    console.log(`Listen on port ${port}`);
});

/* Todo esto son Middlewares */

// Add template engine
app.set('view engine', 'pug');

// Add year
app.use( (req, res, next) => {
    res.locals.actualYear = new Date().getFullYear();
    res.locals.nombreSitio = 'Agencia de Viajes';

    next(); // Si no pones next no funciona ya que no utiliza el siguiente middleware
});

// Add body parser for reading form data
app.use(express.urlencoded({ extended: true }));

// Add static files
app.use(express.static('public'));

// Add routes
app.use('/', router); // Use router from routes/index.js