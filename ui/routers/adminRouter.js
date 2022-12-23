const express = require('express');

const adminController = require('../controllers/adminController');

const router = express.Router();
router.get('/add-note', adminController.getAddNote);
router.post('/add-note', adminController.postAddNote);
router.get('/edit-note/:id', adminController.getEditNote);
router.post('/edit-note', adminController.postEditNote);

module.exports = router;