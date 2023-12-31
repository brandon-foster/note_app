const express = require('express');

const mainController = require('../controllers/mainController');

const router = express.Router();

router.get('/', mainController.getIndexView);
router.get('/notes', mainController.getNotesView);
router.get('/notes/:id', mainController.getNoteDetailView);
router.get('/login', mainController.getLoginView);

module.exports = router;