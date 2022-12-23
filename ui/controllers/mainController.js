const showdown = require('showdown');

const viewBuilder = require('../util/viewBuilder');
const navItems = require('../config/navItems');
const noteRepository = require('../repository/noteRepository');
const categoryRepository = require('../repository/categoryRepository');

exports.getIndexView = (req, res, next) => {
    res.render('home', viewBuilder()
        .title('Home')
        .navItems(navItems)
        .activeNavItem(0)
        .build()
    );
};

exports.getNotesView = async (req, res, next) => {
    const categoryList = await categoryRepository.fetchAll();
    const rawNoteList = await noteRepository.fetchAll();
    function enhanceNote(note, index) {
        const matches = categoryList.filter(c => c.id === parseInt(note.noteCategory));
        if (matches.length > 0) {
            const category = matches[0];
            note.noteCategoryText = category.text;
            note.noteId = index;
            const converter = new showdown.Converter();
            note.noteBody = converter.makeHtml(note.noteBody)
        }
        return note;
    }
    categoryList.forEach(c => {
        c.preparedNoteList = [];
        c.preparedNoteList = rawNoteList
            .map((note, i) => enhanceNote(note, i))
            .filter(n => parseInt(n.noteCategory) === c.id)
        return c;
    });
    performRender(categoryList);
    function performRender(categoryList) {
        res.render('notes', viewBuilder()
            .title('Notes')
            .navItems(navItems)
            .activeNavItem(1)
            .categoryList(categoryList)
            .build()
        );
    }
};
