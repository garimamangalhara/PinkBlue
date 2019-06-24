const mongoose = require('mongoose');

const InventorySchema = new mongoose.Schema({
    productId: { type: String, unique: true,required:true },
    productName: String,
    vendor: String,
    mrp: Number,
    batchNum: String,
    batchDate: String,
    qty: Number,
    status: String

});

module.exports.Inventory = mongoose.model('Inventory', InventorySchema); 