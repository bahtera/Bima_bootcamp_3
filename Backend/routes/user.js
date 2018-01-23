const express = require("express");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const router = express.Router();


router.post("/register", (req, res) => {
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    newUser.save((error) => {
        if (error) {
            res.status(500).send(error);
        }
        else {
            res.json(newUser);
        }
    });
});

router.post("/login", (req, res) => {
    let obj = {};
    if (req.body.name){
        obj={name: req.body.name, password: req.body.password};
    }else if(req.body.email){
        obj={email: req.body.email, password: req.body.password};
    }
    User.findOne(obj, (error, result) => {
        if (error) {
            res.status(500).json(error);
        }
        else if (!result) {
            res.status(404).json({ message: "User not found !" });
        }
        else {
            const payload = {
                id: result._id,
                name: result.name
            };
            const token = jwt.sign(payload, "secretkey", {});
            res.json({ token: token });
        }

    });
});

module.exports = (function () {
    return router;
})();
