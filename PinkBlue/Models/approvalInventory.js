const mongoose = require('mongoose');

const ApprovalInventorySchema = new mongoose.Schema({
    productId: { type: String, unique: true,required:true },
    productName: String,
    vendor: String,
    mrp: Number,
    batchNum: String,
    batchDate: String,
    qty: Number,
    status: String

});

module.exports.ApprovalInventory = mongoose.model('ApprovalInventory', ApprovalInventorySchema); 