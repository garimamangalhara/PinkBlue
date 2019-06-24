const express = require('express')
const router = express.Router();
const Inventory = require('../Models/inventory')
router.get('/', async (req, res) => {
    let inv = await Inventory.Inventory.find()
    res.send(inv)
})
router.get('/:productId', async (req, res) => {
    let inv = await Inventory.Inventory.find({ productId: req.params.productId })
    console.log(req.params.productId)
    res.send(inv)
})
router.post('/createInventory', async (req, res) => {
    console.log(req.body)
    let inv = new Inventory.Inventory({
        productId: req.body.productId,
        productName: req.body.productName,
        vendor: req.body.vendor,
        mrp: req.body.mrp,
        batchNum: req.body.batchNum,
        batchDate: req.body.batchDate,
        qty: req.body.qty,
        status: req.body.status
    })
    try {
        console.log(inv)
        let result = await inv.save()
        console.log("result:", result)
        res.send(inv)
    }
    catch (err) {
        res.send("This productId already exists!")
    }

})
router.post('/updateInventory', async (req, res) => {
    const inv = await Inventory.Inventory.findByIdAndUpdate(req.body.productId, {
        $set: {
            productName: req.body.productName,
            vendor: req.body.vendor,
            mrp: req.body.mrp,
            batchNum: req.body.batchNum,
            batchDate: req.body.batchDate,
            qty: req.body.qty,
            status: req.body.status
        }
    }, {
            new: true
        })
    try {

        res.send(inv)
    }
    catch (err) {
        res.send("Some error while updating!")
    }
})
module.exports = router;