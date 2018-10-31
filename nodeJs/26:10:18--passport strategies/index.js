const express = require('express');
const app = express();


const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => res.sendFile('auth.html', { root: __dirname }));

app.get('/register', (req, res) => res.sendFile('register.html', { root: __dirname }));

app.get('/logout', (req, res) => res.sendFile('auth.html', { root: __dirname }));

app.get('/success', (req, res) => res.sendFile('success.html', { root: __dirname }));


const passport = require('passport');
var Auth0Strategy = require('passport-auth0');
app.use(passport.initialize());
app.use(passport.session());

app.get('/success', (req, res) => res.send("Welcome ....\n" + req.query.username + "!!"));
app.get('/error', (req, res) => res.send("error logging in"));

passport.serializeUser(function(user, cb) {
    cb(null, user.id);
});

// passport.deserializeUser(function(id, cb) {
//     User.findById(id, function(err, user) {
//         cb(err, user);
//     });
// });


passport.deserializeUser(function(id, done) {
    User.findOne({
        _id: id
    }, '-password -salt', function(err, user) {
        done(err, user);
    });
});


const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/MyDatabase');

const Schema = mongoose.Schema;
const UserDetail = new Schema({
    username: String,
    password: String
});
const UserDetails = mongoose.model('userInfo', UserDetail, 'userInfo');

// const LocalStrategy = require('passport-local').Strategy;

var strategy = new Auth0Strategy({
    domain: '',
    clientID: '',
    clientSecret: '',
    callbackURL: '/loginapi/callback'
}, function(accessToken, refreshToken, extraParams, profile, done) {
    // accessToken is the token to call Auth0 API (not needed in the most cases)
    // extraParams.id_token has the JSON Web Token
    // profile has all the information from the user
    var info = {
        "profile": profile,
        "accessToken": accessToken,
        "refreshToken": refreshToken,
        "extraParams": extraParams
    };
    return done(null, info);
});

//const Strategy = require('').Strategy

passport.use(new strategy(
    function(username, password, done) {
        UserDetails.findOne({
            username: username
        }, function(err, user) {
            if (err) {
                return done(err);
            }

            if (!user) {
                return done(null, false);
            }

            if (user.password != password) {
                return done(null, false);
            }
            return done(null, user);
        });
    }
));

app.post('/',
    passport.authenticate('local', { failureRedirect: '/error' }),
    function(req, res) {
        res.redirect('/success?username=' + req.user.username);
    });

app.post("/register", function(req, res) {
    var user = req.body;
    UserDetails.find({ "username": user.username }, function(error, data) {

        console.log("doc=" + data);
        if (data.length <= 0) {
            console.log("create user");
            var newuser = new UserDetails({ "username": req.body.username, "password": req.body.password });
            console.log("new user=" + newuser);
            UserDetails.create(newuser, function(error, data) {
                // companys.create({company1}, function(err, data) {
                console.log("data in save = " + data);

                if (!data) {
                    console.log("error in posting data");
                    res.send("data not added");
                } else {
                    res.send("saved" + data);
                }
            })
        } else {

            res.send("username already exist try another value");
        }
    })
})
const port = process.env.PORT || 8000;
app.listen(port, () => console.log('App listening on port ' + port));