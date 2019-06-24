const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const login = require('./Routes/login');
const inventory=require('./Routes/inventoryRoutes')
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to mongodb'))
    .catch(err => console.log("Error in connection", err));
app.use(bodyParser.json());
app.use('/api/login', login);
app.use('/api/inventory',inventory);
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));