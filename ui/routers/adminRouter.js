const path = require('path');

const express = require('express');
const multer = require('multer');

const adminController = require('../controllers/adminController');
const rootDir = require('../util/rootDir');

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
router.get('/db', adminController.getDb);
const storage = multer.diskStorage({
    destination: path.join(rootDir, 'data'),
    filename: function filename(req, file, cb) {
        cb(null, file.originalname);
    },
});
const upload = multer({ storage: storage });
router.post('/db', upload.single('db'), adminController.postDb);

module.exports = router;