var express = require('express');
var passport = require('passport');
var router = express.Router();

// GET auth callback
// the signin route calls the passport.authenticate method, causing the app to redirect to the Azure login page
router.get(
    '/signin',
    function (req, res, next) {
        passport.authenticate('azuread-openidconnect', 
            {
                response: res,
                prompt: 'login',
                failureRedirect: '/',
                failureFlash: true
            }
        )(req, res, next);    
    },
    function(req, res) {
        res.redirect('/');
    }
);

// the callback route is where Azure redirects after the signin is complete. The code calls the passport.authenticate method again, causing the passport-azure-ad strategy to
// request an access token. Once the token is obtained, the next handler is called, which redirects back to the home page with the access token in the temporary error value.
// We'll use this to verify that our sign-in is working before moving on.
// Before we test, we need to configure the Express app to use the new router from ./routes/auth.js
router.post(
    '/callback',
    function(req, res, next) {
        passport.authenticate(
            'azuread-openidconnect',
            {
                response: res,
                failureRedirect: '/',
                failureFlash: true
            }
        )(req, res, next);
    },
    function(req, res) {
        res.redirect('/')
    }
);

// the signout method logs the user out and destroys the session
router.get(
    '/signout',
    function(req, res) {
        req.session.destroy(function(err) {
            req.logout();
            res.redirect('/');
        });
    }
);

module.exports = router;