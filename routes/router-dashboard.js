// Import Module
const express = require('express');

const dashboardRouter = express.Router({caseSensitive: false});

dashboardRouter.get('/', (req, res) => {
  res.status(200).render('dashboard.ejs');
})

dashboardRouter.get('/players', async (req, res) => {
  const players = await db.Player.findAll({
    include: [db.PlayerBio, db.PlayerHistory],
  })
  res.render('players/players', { players })
})

module.exports = dashboardRouter;
