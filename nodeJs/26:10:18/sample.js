app.get('/callback',
    passport.authenticate('auth0', { failureRedirect: '/login' }),
    function(req, res) {
        if (!req.user) {
            throw new Error('user null');
        }
        res.redirect("/");
    }
);

app.get('/login',
    passport.authenticate('auth0', {}),
    function(req, res) {
        res.redirect("/");
    });