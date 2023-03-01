const passport = require("passport")
const local = require("passport-local");
const CartService = require('../services/cart.service');
const cart = new CartService();

const User = require('../models/user');
const LocalStrategy = local.Strategy;
// const config = require('../config/globals');
const { createHash, isValidPassword } = require('../utils/auth');
const { sendMailSignup } = require('../utils/nodemailer');
const initializePassport = () => {
    passport.use(
        'signup',
        new LocalStrategy(
            {passReqToCallback: true},
            async (req, username, password, done) => {
                const logger = req.app.get('logger');
                // console.log(password);
                try {
                    let user = await User.findOne({username: username});
                    // logger.info(user);
                    if(user) return done(null, false, req.flash('signupMessage', 'El usuario ya existe'));
                    const newUser = {
                        username,
                        password: createHash(password),
                        name: req.body.name,
                        address: req.body.address,
                        age: req.body.age,
                        phone: req.body.phone,
                        avatar: req.file.filename
                    }
                    try {
                        let result = await User.create(newUser);
                        const infoMail = await sendMailSignup({ user: newUser});
                        // logger.info(infoMail);
                        return done(null, result);
                    } catch (error) {
                        return done(error, false, req.flash('signupMessage', error.message));
                    }
                } catch (error) {
                    return done(error, false, req.flash('signupMessage', error.message));
                }
            }
        )
    );

    passport.use (
        'login',
        new LocalStrategy(
            {passReqToCallback: true},
            async(req, username, password, done) => {
                try {
                    if(!username || !password) return done(null, false, req.flash('loginMessage', 'Ingrese usuario y contraseña'));
                    let user = await User.findOne({username: username});
                    
                    if(!user) return done(null, false, req.flash('loginMessage', 'Usuario / contraseña incorrectos'));
                    if(!isValidPassword(user, password)) {
                        return done(null, false, req.flash('loginMessage', 'Usuario / contraseña incorrectos'));
                    }
                    return done(null, user);
                } catch (error) {
                    done(error, false, req.flash('loginMessage', error.message));
                }
            }
        )
    )

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });
    passport.deserializeUser(async (id, done) => {
        User.findById(id, async (err, user) => {
            if(!err){
                const userCart = await cart.getUserCart(id);
                user.cart = userCart;
            }
            done(err, user);
        });
    });
}

module.exports = { initializePassport };