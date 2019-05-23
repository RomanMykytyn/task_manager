var express = require('express');
var router = express.Router();
var User = require('../models/user');

/* GET users listing. */
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
})



module.exports = router;
