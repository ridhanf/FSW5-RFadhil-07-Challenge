const express = require('express');
const router = express.Router();
const apiController = require('../controllers/api.controller');

router.get('/', apiController.apiIndex);
router.get('/players', apiController.getAllPlayers);
router.post('/players/create', apiController.createPlayer);
router.get('/players/:id', apiController.getPlayerById);
router.put('/players/update/:id', apiController.updatePlayer);
router.delete('/players/delete/:id', apiController.deletePlayer);

module.exports = router;
