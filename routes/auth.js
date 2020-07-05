const router = require("express").Router();
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { registerValidation, loginValidation } = require("../validation")
let User = require("../models/User");

// bcrypt
const saltRounds = 10;

router.post("/register", (req, res) => {
    const {error} = registerValidation(req.body)
    if (error) {
        res.send(error.details[0].message)
    } else {
        // Hash password
        bcrypt.hash(req.body.password, saltRounds)
            .then(hash => {
                const user = new User({
                    username: req.body.username,
                    email: req.body.email,
                    password: hash
                })
            
                user.save()
                    .then(() => res.json("User added"))
                    .catch(err => res.status(400).json("Error: " + err ))
            })
            .catch(err => res.status(400).json("Error: " + err))
    }
})

router.post("/login", (req, res) => {
    const {error} = loginValidation(req.body)
    if (error) {
        res.send(error.details[0].message)
    } else {
        // Check database if user exists
        const user = User.findOne({username: req.body.username})
            .then(user => { 
                // Compare passwords
                bcrypt.compare(req.body.password, user.password)
                    .then((result) => {
                        if (result) {
                            // Create a token
                            const token = jwt.sign({
                                _id: user._id,
                            }, process.env.TOKEN_SECRET)
                            // Send the token
                            res.header("auth-token", token).send(token)
                        } else {
                            res.status(401).json({message: "Username or password invalid."});
                        }
                    })
                    .catch(err => res.status(401).json({message: "Username or password invalid.", error: err}));
            })
            .catch(err => res.status(401).json({message: "Username or password invalid.", error: err}));
    }
})

module.exports = router