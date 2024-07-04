// config/passport.js

const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const db = require('./db');

module.exports = function(passport) {
  passport.use(new LocalStrategy(
    { usernameField: 'email' },
    function(email, password, done) {
      db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
        if (err) return done(err);
        if (!results.length) return done(null, false, { message: 'Incorrect email.' });

        // Compare hashed passwords
        bcrypt.compare(password, results[0].password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            return done(null, results[0]);
          } else {
            return done(null, false, { message: 'Incorrect password.' });
          }
        });
      });
    }
  ));

  passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });
};
