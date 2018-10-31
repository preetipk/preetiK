app.use(function(req, res, next) {
    res.locals.loggedIn = false;
    if (req.session.passport && typeof req.session.passport.user !== 'undefined') {
        res.locals.loggedIn = true;
    }
    next();
});

// the auth router should be loaded after the function definition
app.use('/', indexRouter);
//..
app.use('/', authRouter);
//..