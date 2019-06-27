const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const login = require('./Routes/login');
const inventory = require('./Routes/inventoryRoutes')
const approvalInventory = require('./Routes/approvalInventoryRoutes')
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to mongodb'))
    .catch(err => console.log("Error in connection", err));
app.use(bodyParser.json());
app.use('/api/login', login);
app.use('/api/inventory', inventory);
app.use('/api/approvalInventory', approvalInventory)
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));