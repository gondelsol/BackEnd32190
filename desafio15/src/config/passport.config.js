const passport = require("passport")
const local = require("passport-local");
const User = require('../models/user');
const LocalStrategy = local.Strategy;

const { createHash, isValidPassword } = require('../utils/utils');

const initializePassport = () => {
    passport.use(
        'signup',
        new LocalStrategy(
            {passReqToCallback: true},
            async(req, username, password, done) => {
                // console.log(password);
                try {
                    let user = await User.findOne({username: username});
                    if(user) return done(null, false);
                    const newUser = {
                        username,
                        password: createHash(password),
                    }
                    try {
                        let result = await User.create(newUser);
                        return done(null, result);
                    } catch (error) {
                        done(error);
                    }
                } catch (error) {
                    done(error);
                }
            }
        )
    );

    passport.use (
        'login',
        new LocalStrategy(
            async(username, password, done) => {
                // console.log(password);
                try {
                    let user = await User.findOne({username: username});
                    // console.log(user);
                    if(!user) return done(null, false, {message: 'Usuario/Contraseña incorrectos'});
                    if(!isValidPassword(user, password)) {
                        return done(null, false, {message: 'Usuario/Contraseña incorrectos'});
                    }
                    return done(null, user);
                } catch (error) {
                    done(error);
                }
            }
        )
    )


    passport.serializeUser((user, done) => {
        done(null, user._id);
    });
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });
}

module.exports = { initializePassport };