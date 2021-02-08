// Import Module
const express = require('express');
const db = require('../db/models');

const dashboardRouter = express.Router({caseSensitive: false});

dashboardRouter.get('/', (req, res) => {
  res.status(200).render('dashboard/dashboard');
})

const loginHandler = async (req, res) => {
  const body = req.body
  if ((req, body.username === 'admin' && req.body.password === 'admin')) {
    res.redirect('/dashboard/users');
  } else {
    res.redirect('/dashboard');
  }
}

dashboardRouter.post('/login', loginHandler);

dashboardRouter.get('/users', async (req, res) => {
  const users = await db.User.findAll({
    include: [db.UserBio, db.UserHistory],
  })
  console.log('MASUUUKKKKK');
  res.render('dashboard/users/allUsers', { users })
})

module.exports = dashboardRouter;
