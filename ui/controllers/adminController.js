const viewBuilder = require('../util/viewBuilder');
const navItems = require('../config/navItems');
const categoryRepository = require('../repository/categoryRepository');
const noteRepository = require('../repository/noteRepository');

exports.getAddNote = async (req, res, next) => {
    const categoryList = await categoryRepository.fetchAll();
    res.render('admin/add-note', viewBuilder()
        .title('Add Note')
        .navItems(navItems)
        .activeNavItem(2)
        .categoryList(categoryList)
        .build()
    );
}

exports.postAddNote = async (req, res, next) => {
    const noteList = await noteRepository.fetchAll();
    noteRepository.append({
        noteId: noteList.length,
        noteTitle: req.body.noteTitle,
        noteCategory: req.body.noteCategory,
        noteBody: req.body.noteBody,
    });
    res.redirect('/notes');
}

exports.getEditNote = async (req, res, next) => {
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
            .build()
        );
    }
    res.redirect(req.url);
};

exports.postEditNote = async (req, res, next) => {
    const foundNote = await noteRepository.findById(req.body.noteId);
    foundNote.noteTitle = req.body.noteTitle;
    foundNote.noteCategory = req.body.noteCategory;
    foundNote.noteBody = req.body.noteBody;
    noteRepository.update(foundNote);
    res.redirect('/notes');
};