const express = require('express');
const { Router } = express;
const router = Router();
const passport = require('passport');

const {
    createUser, uploadAvatar, failedSignup, login, failedLogin
} = require('../../controllers/user.js');

const { checkAdmin } = require('../../middlewares/auth.js');

router.get('/failedSignup', failedSignup)
router.get('/failedLogin', failedLogin)

// Crea un usuario y devuelve su id
router.post("/signUp", uploadAvatar, passport.authenticate('signup', {
    failureRedirect: '/api/user/failedSignup',
    failureFlash: true
}), createUser);

router.post("/login", passport.authenticate('login', {
    failureRedirect: '/api/user/failedLogin',
    failureFlash: true
}), login);

module.exports = router; 