const router = require("express").Router();
const auth = require("./verify")

router.get("/", auth, (req, res) => {
    res.json ({
        "post" : "This is a post!",
        "message" : "This is the content of the post!"
    })
})

module.exports = router;