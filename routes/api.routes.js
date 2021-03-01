const express = require('express');
const router = express.Router();
const controller = require('../controllers/api.controller');

router.get('/players', controller.getAllPlayers);
router.get('/players/:id', controller.getPlayerById);
router.post('/players/create', controller.createPlayer);
router.delete('/players/delete/:id', controller.deletePlayer);
router.put('/players/update/:id', controller.updatePlayer);

module.exports = router;
