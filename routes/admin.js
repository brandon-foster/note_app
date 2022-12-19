const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();
router.get('/add-note', adminController.getAddNote);

module.exports = router;