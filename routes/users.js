var express        = require('express'),
    router         = express.Router(),
    passport       = require("passport"),
    User           = require('../models/user'),
    isLoggedIn     = require("../middleware/isLoggedIn");


router.get("/users", function(req, res) {
    res.render("index");
});

/// problem here - remove invites and /show
router.get("/users/:user_id", isLoggedIn, function(req, res) {
    User.findById(req.params.user_id).populate("entries").exec(function(err, user) {
       if(err){
         console.log(err);
       }
       else{
         console.log("found user: " + user);
         res.render("/table", {user: user});
       }
   });
});

module.exports = router;