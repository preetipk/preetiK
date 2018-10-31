//var express = require('express');
//var router = express.Router();
const express = require('express');
const app = express();

var Auth0Strategy = require('passport-auth0'),
    passport = require('passport');
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();


const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/MyDatabase');

const Schema = mongoose.Schema;
const UserDetail = new Schema({
    username: String,
    password: String
});
const UserDetails = mongoose.model('user', UserDetail, 'user');



// Perform the login, after login Auth0 will redirect to callback
app.get('/login',
    passport.authenticate('auth0', { scope: 'openid email profile' }),
    function(req, res) {
        res.redirect("/");
    });

// Perform the final stage of authentication and redirect to '/user'
app.get('/callback',
    passport.authenticate('auth0', { failureRedirect: '/login' }),
    function(req, res) {
        if (!req.user) {
            throw new Error('user null');
        }
        res.redirect("/user");
    }
);

/* GET user profile. */
app.get('/user', ensureLoggedIn, function(req, res, next) {
    res.render('user', {
        user: req.user,
        userProfile: JSON.stringify(req.user, null, '  ')
    });
});

// Perform session logout and redirect to homepage
app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = app;

const port = process.env.PORT || 8000;
app.listen(port, () => console.log('App listening on port ' + port));