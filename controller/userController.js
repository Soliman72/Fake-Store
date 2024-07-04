// controllers/usersController.js

const bcrypt = require('bcrypt');
const passport = require('passport');
const db = require('../config/db');

// Register a new user
exports.registerUser = (req, res) => {
  const { email, password } = req.body;
  
  // Hash the password
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) throw err;

    const query = 'INSERT INTO users (email, password) VALUES (?, ?)';
    db.query(query, [email, hash], (err, results) => {
      if (err) throw err;
      res.status(201).send({ id: results.insertId, email });
    });
  });
};

// Login user
exports.loginUser = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(400).send(info);

    req.logIn(user, (err) => {
      if (err) return next(err);
      res.send({ message: 'Logged in successfully', user });
    });
  })(req, res, next);
};

// Logout user
exports.logoutUser = (req, res) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.send({ message: 'Logged out successfully' });
  });
};
