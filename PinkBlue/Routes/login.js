const express = require('express')
const router = express.Router();
const User = require('../Models/user')


router.post('/getUser', async (req, res) => {
    console.log(req.body)

    try {
        let user = await User.User.find({ userName: req.body.userName, password: req.body.password })
        if (user.length) res.send(user)
        else res.send({ response: "User does not exist" })
    }
    catch (err) {
        res.send("This username already exists!")
    }

})
router.post('/createUser', async (req, res) => {
    console.log(req.body)
    let users = await User.User.find()
    let user = new User.User({
        name: req.body.name,
        userName: req.body.userName,
        password: req.body.password,
        isManager: false
    })
    //will give access as manager if you are the first person to signup
    if (users.length) {
        user.isManager = false
    }
    else {
        user.isManager = true
    }

    try {
        console.log(user)
        let result = await user.save()
        console.log("result:", result)
        res.send(user)
    }
    catch (err) {
        res.send("This username already exists!")
    }

})
module.exports = router;