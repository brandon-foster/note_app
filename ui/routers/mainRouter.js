const express = require('express');

const mainController = require('../controllers/mainController');

const router = express.Router();

router.get('/', mainController.getIndexView);
router.get('/notes', mainController.getNotesView);

module.exports = router;