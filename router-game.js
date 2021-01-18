// Import Module
const express = require('express');

const gameRouter = express.Router({caseSensitive: false});

gameRouter.get('/', (req, res) => {
  res.render('game.ejs').status(200);
})

module.exports = gameRouter;