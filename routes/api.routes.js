const express = require('express');
const router = express.Router();
const apiController = require('../controllers/api.controller');

router.get('/', apiController.apiIndex);
router.get('/players', apiController.getAllPlayers);
router.get('/players/:id', apiController.getPlayerById);
router.post('/players/create', apiController.createPlayer);
router.delete('/players/delete/:id', apiController.deletePlayer);
router.put('/players/update/:id', apiController.updatePlayer);

module.exports = router;
