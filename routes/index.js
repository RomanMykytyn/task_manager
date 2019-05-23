var express = require('express');
var router = express.Router();
var path = require('path');
var User = require('../models/user');
var passport = require('passport');

/* GET home page. */
router.get('/', checkAuthentication, function(req, res, next) {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

function checkAuthentication(req,res,next){
    if(req.isAuthenticated()){
        //req.isAuthenticated() will return true if user is logged in
        next();
    } else{
        console.log(req.isAuthenticated());
        res.render('enterForm', { msg: '' });
    }
}

router.post('/', function(req, res, next) {
  if (req.body.type_button === 'Register') {
    User.findOne({ username: req.body.username }, 'username', function (err, user) {
      if (user) { return res.render('enterForm', { msg: 'Name is already in use.' }); }
      else {
        var newUser = new User({username: req.body.username, password: req.body.password});
        newUser.save(function(err) {
          return err ? next(err) : req.logIn(newUser, function(err) {
            return err ? next(err) : res.redirect('/');
          })
        })
      }
    })
  }
  if (req.body.type_button === 'Enter') {
    passport.authenticate('local',
      function(err, user, info) {
        return err
          ? next(err)
          : user
            ? req.logIn(user, function(err) {
                return err
                  ? next(err)
                  : res.redirect('/');
              })
            : res.render('enterForm', { msg: 'Wrong name or password.' });
      }
    )(req, res, next);
  }
})

module.exports = router;
