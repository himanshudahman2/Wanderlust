const express = require("express");
const router = express.Router({mergeParams:true});
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

const userConroller = require("../controllers/users.js");

router.route("/signup")
.get(userConroller.renderSignupForm)
.post(wrapAsync(userConroller.signup)
);

router.route("/login")
.get(userConroller.renderLoginForm)
.post(saveRedirectUrl,
    passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true
}), userConroller.login);


router.get("/logout", userConroller.logout);


module.exports = router;