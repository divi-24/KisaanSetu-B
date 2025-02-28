const express = require('express');
const passport = require('passport');
const router = express.Router();

// Initiate Google Login
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Callback URL for Google
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: 'https://kisaan-setu-f.vercel.app/login' }),
  (req, res) => {
    // Redirect to the dashboard or home page on success
    res.redirect('https://kisaan-setu-f.vercel.app/');
  }
);

router.get('/auth/logout', (req, res) => {
  req.logout(err => {
    if (err) {
      return next(err); 
    }
    req.session.destroy(() => {
      res.clearCookie('connect.sid'); 
      res.redirect('https://kisaan-setu-f.vercel.app/'); 
    });
  });
});

module.exports = router;
