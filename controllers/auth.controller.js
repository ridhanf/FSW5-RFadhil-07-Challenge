// const passport = require('passport');
const {User} = require('../db/models');

const register = (req, res, next) => {
  User.register(req.body)
    .then((user) => {
      console.log(user);
      res.status(200).json(user);
    })
    .catch((error) => next(error.message))
};

const login =  (req, res, next) => {
  User.authenticate(req.body)
    .then(user => {
      dataUser = {
        id: user.id,
        username: user.username,
        token: user.generateToken()
      }
      res.status(200).json(dataUser)
    })
    .catch(error => {
      return next(error.message)
    })
}

const whoami = (req, res) => {
  /* req.user adalah instance dari User Model, hasil autentikasi dari passport. */
  console.log(req);
  res.status(200).json(req.user);
  // res.render('profile', req.user.dataValues)
}

const logout = (req, res) => {
  // req.logout();
  // res.redirect('/login');
  res.status(200);
}

module.exports = {
  register,
  login,
  whoami,
  logout
};
