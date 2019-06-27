const express = require('express')
const router = express.Router();
const ApprovalInventory = require('../Models/approvalInventory')
const Inventory = require('../Models/inventory');
router.get('/', async (req, res) => {
    let inv = await ApprovalInventory.ApprovalInventory.find()
    res.send(inv)
})
router.get('/:productId', async (req, res) => {
    let inv = await ApprovalInventory.ApprovalInventory.find({ productId: req.params.productId })
    console.log(req.params.productId)
    res.send(inv)
})
router.post('/createInventory', async (req, res) => {
    try {
        console.log(req.body)
        let adminInv = await Inventory.Inventory.find({ productId: req.params.productId });
        if (adminInv.length) {
            throw err;
        } else {
            let inv = new ApprovalInventory.ApprovalInventory({
                productId: req.body.productId,
                productName: req.body.productName,
                vendor: req.body.vendor,
                mrp: req.body.mrp,
                batchNum: req.body.batchNum,
                batchDate: req.body.batchDate,
                qty: req.body.qty,
                status: "add"
            })
            let result = await inv.save()
            res.send(inv)
        }

    }
    catch (err) {
        res.send({ "error": "This productId already exists!" })
    }

})
router.post('/updateInventory', async (req, res) => {
    try {
        let adminInvArr = await Inventory.Inventory.find({ productId: req.body.productId });
        let adminInv = adminInvArr[0]
        if (!adminInvArr.length) {
            throw err;
        } else {
            adminInv.status = "update";
            let inv = new ApprovalInventory.ApprovalInventory({
                productId: req.body.productId,
                productName: req.body.productName,
                vendor: req.body.vendor,
                mrp: req.body.mrp,
                batchNum: req.body.batchNum,
                batchDate: req.body.batchDate,
                qty: req.body.qty,
                status: req.body.status
            })
            let result = await inv.save()
            console.log("result:", result)
            res.send(inv)
        }
    }
    catch (err) {
        res.send({ "error": "This productId does not exist!" })
    }
})
router.post('/deleteInventory', async (req, res) => {
    try {
        console.log(req.body.productId)
        let adminInvArr = await Inventory.Inventory.find({ productId: req.body.productId });
        let adminInv = adminInvArr[0]
        console.log(adminInv)
        if (!adminInvArr.length) {
            console.log("in here")
            throw err;
        } else {
            adminInv.status = "delete";
            let inv = new ApprovalInventory.ApprovalInventory({
                productId: adminInv.productId,
                productName: adminInv.productName,
                vendor: adminInv.vendor,
                mrp: adminInv.mrp,
                batchNum: adminInv.batchNum,
                batchDate: adminInv.batchDate,
                qty: adminInv.qty,
                status: adminInv.status
            })
            console.log("inv:", inv)

            let result = await inv.save()
            console.log("result:", result)
            res.send(inv)
        }


    }
    catch (err) {
        res.send({ "error": err })
    }
})
router.post('/approve', async (req, res) => {
    try {
        console.log("req.body", req.body)
        if (req.body.status == "add") {
            let adminInvArr = await ApprovalInventory.ApprovalInventory.find({ productId: req.body.productId });
            let adminInv = adminInvArr[0]
            let inv = new Inventory.Inventory({
                productId: adminInv.productId,
                productName: adminInv.productName,
                vendor: adminInv.vendor,
                mrp: adminInv.mrp,
                batchNum: adminInv.batchNum,
                batchDate: adminInv.batchDate,
                qty: adminInv.qty
            })
            let result = await inv.save()
            const del = await ApprovalInventory.ApprovalInventory.findByIdAndRemove(req.body._id)

            res.send(inv)
        }
        else if (req.body.status == "update") {
            let adminInvArr = await Inventory.Inventory.find({ productId: req.body.productId });
            let adminInvApp = await ApprovalInventory.ApprovalInventory.find({ productId: req.body.productId });
            let adminInv = adminInvApp[0]
            console.log(adminInvArr, adminInv)
            const inv = await Inventory.Inventory.findByIdAndUpdate(adminInvArr[0]._id, {
                $set: {
                    productName: adminInv.productName,
                    vendor: adminInv.vendor,
                    mrp: adminInv.mrp,
                    batchNum: adminInv.batchNum,
                    batchDate: adminInv.batchDate,
                    qty: adminInv.qty
                }
            }, {
                    new: true
                })
            const del = await ApprovalInventory.ApprovalInventory.findByIdAndRemove(req.body._id)

        }
        else if (req.body.status == "delete") {
            let adminInvArr = await Inventory.Inventory.find({ productId: req.body.productId });
            let adminInvId = adminInvArr[0]._id
            const del = await ApprovalInventory.ApprovalInventory.findByIdAndRemove(req.body._id)
            const inv = await Inventory.Inventory.findByIdAndRemove(adminInvId, function (err) {
                if (err)
                    res.send(err)
                else
                    res.send("Inventory deleted")
            })
        }
    }
    catch (err) {
        res.send({ "error": err })
    }
})
router.post('/reject', async (req, res) => {
    const inv = await ApprovalInventory.ApprovalInventory.findByIdAndDelete(req.body._id, function (err) {
        if (err)
            res.send(err)
        else
            res.send("Inventory Rejected")
    })

})
module.exports = router;