const express = require('express');
const spotifyController = require('../controllers/spotify');
const router = express.Router();
/**
 * Retrieve All Devices From Inventory
 */
router.get('/login', spotifyController.login);

router.get('/callback', spotifyController.callback);

router.get('/refresh_token', spotifyController.refreshToken);


//For testing purposes
router.get('/get_token', spotifyController.getToken);

module.exports = router;
