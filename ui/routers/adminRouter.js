const express = require('express');

const adminController = require('../controllers/adminController');

const router = express.Router();
router.get('/add-note', adminController.getAddNote);
router.post('/add-note', adminController.postAddNote);
router.get('/edit-note/:id', adminController.getEditNote);
router.post('/edit-note', adminController.postEditNote);
router.get('/add-category', adminController.getAddCategory);
router.post('/add-category', adminController.postAddCategory);
router.post('/login', adminController.postLogin);
router.get('/logout', adminController.getLogout);
router.get('/dashboard', adminController.getDashboard);
router.get('/noteList', adminController.getNoteList);
router.get('/categoryList', adminController.getCategoryList);

module.exports = router;