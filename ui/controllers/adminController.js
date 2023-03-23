const viewBuilder = require('../util/viewBuilder');
const navItems = require('../config/navItems');
const categoryRepository = require('../repository/categoryRepository');
const noteRepository = require('../repository/noteRepository');
const fileDbIO = require('../util/fileDbIO');
const BASE_DIR = require('../config/baseDir');

const OWNER = 'alice';

exports.getAddNote = async (req, res, next) => {
    if (!req.session.isLoggedIn) {
        return res.redirect(`${BASE_DIR}/notes`);
    }
    const categoryList = await categoryRepository.fetchAll();
    res.render('admin/add-note', viewBuilder()
        .title('Add Note')
        .navItems(navItems)
        .activeNavItem(2)
        .categoryList(categoryList)
        .isLoggedIn(req.session.isLoggedIn)
        .build()
    );
}

exports.postAddNote = async (req, res, next) => {
    if (!req.session.isLoggedIn) {
        return res.redirect(`${BASE_DIR}/notes`);
    }
    const noteList = await noteRepository.fetchAll();
    const noteId = noteList.length;
    noteRepository.append({
        noteId: noteId,
        noteTitle: req.body.noteTitle,
        noteCategory: req.body.noteCategory,
        noteBody: req.body.noteBody,
    });
    res.redirect(`${BASE_DIR}/notes/${noteId}`);
}

exports.getEditNote = async (req, res, next) => {
    if (!req.session.isLoggedIn) {
        return res.redirect(`${BASE_DIR}/notes`);
    }
    const categoryList = await categoryRepository.fetchAll();
    const noteList = await noteRepository.fetchAll();
    if (noteList.length > 0) {
        const note = await noteRepository.findById(req.params.id);
        return res.render('admin/edit-note', viewBuilder()
            .title('Edit Note')
            .navItems(navItems)
            .activeNavItem(2)
            .categoryList(categoryList)
            .note(note)
            .isLoggedIn(req.session.isLoggedIn)
            .build()
        );
    }
    res.redirect(req.url);
};

exports.postEditNote = async (req, res, next) => {
    if (!req.session.isLoggedIn) {
        return res.redirect(`${BASE_DIR}/notes`);
    }
    const foundNote = await noteRepository.findById(req.body.noteId);
    foundNote.noteTitle = req.body.noteTitle;
    foundNote.noteCategory = req.body.noteCategory;
    foundNote.noteBody = req.body.noteBody;
    noteRepository.update(foundNote);
    res.redirect(`${BASE_DIR}/notes/${foundNote.noteId}`);
};

exports.getAddCategory = (req, res, next) => {
    if (!req.session.isLoggedIn) {
        return res.redirect(`${BASE_DIR}/notes`);
    }
    res.render('admin/add-category', viewBuilder()
        .title('Add Category')
        .navItems(navItems)
        .activeNavItem(3)
        .isLoggedIn(req.session.isLoggedIn)
        .build()
    );
};

exports.postAddCategory = async (req, res, next) => {
    if (!req.session.isLoggedIn) {
        return res.redirect(`${BASE_DIR}/notes`);
    }
    const cats = await categoryRepository.fetchAll();
    const category = {
        id: cats.length,
        text: req.body.text,
        isPrivate: req.body['set-private'] !== undefined,
    };
    categoryRepository.append(category);
    res.redirect(`${BASE_DIR}/notes`);
};

exports.postLogin = (req, res, next) => {
    const session = req.session;
    session.username = req.body.username;
    session.isLoggedIn = session.username === OWNER;
    res.redirect(`${BASE_DIR}/notes`);
};

exports.getLogout = (req, res, next) => {
    req.session.username = null;
    req.session.isLoggedIn = false;
    res.redirect(`${BASE_DIR}/notes`);
}

exports.getDashboard = (req, res, next) => {
    if (!req.session.isLoggedIn) {
        return res.redirect(`${BASE_DIR}/notes`);
    }
    res.render('admin/dashboard', viewBuilder()
        .title('Dashboard')
        .navItems(navItems)
        .activeNavItem(6)
        .isLoggedIn(req.session.isLoggedIn)
        .build()
    );
}

exports.getDb = async (req, res, next) => {
    if (!req.session.isLoggedIn) {
        return res.redirect(`${BASE_DIR}/notes`);
    }
    const dbObj = await fileDbIO.parseDb();
    res.json(dbObj);
};