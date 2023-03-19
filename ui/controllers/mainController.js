const showdown = require('showdown');
showdown.setOption('tables', true);

const viewBuilder = require('../util/viewBuilder');
const navItems = require('../config/navItems');
const noteRepository = require('../repository/noteRepository');
const categoryRepository = require('../repository/categoryRepository');
const prettifySegment = require('../util/prettifySegment');

const converter = new showdown.Converter();

function enhanceNote(note, categoryList) {
    const matches = categoryList.filter(c => c.id === parseInt(note.noteCategory));
    if (matches.length > 0) {
        const category = matches[0];
        note.noteCategoryText = category.text;
        note.noteCategoryTextEncoded = prettifySegment(category.text);
        note.noteBody = converter.makeHtml(note.noteBody)
    }
    return note;
}

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
    categoryList.forEach(c => {
        c.preparedNoteList = [];
        c.preparedNoteList = rawNoteList
            .map((note, i) => enhanceNote(note, categoryList))
            .filter(n => parseInt(n.noteCategory) === c.id)
        c.textEncoded = prettifySegment(c.text);
        return c;
    });
    performRender(categoryList);
    function performRender(categoryList) {
        res.render('notes', viewBuilder()
            .title('Notes')
            .navItems(navItems)
            .activeNavItem(1)
            .categoryList(categoryList)
            .isLoggedIn(req.session.isLoggedIn)
            .build()
        );
    }
};

exports.getNoteDetailView = async (req, res, next) => {
    const note = await noteRepository.findById(parseInt(req.params.id));
    note.noteBody = converter.makeHtml(note.noteBody);
    const categoryList = await categoryRepository.fetchAll();
    function extractDetailNavItems(noteBody) {
        function extractId(element) {
            let curr = element;
            const start = curr.indexOf('id="');
            curr = curr.substring(start);
            const start2 = curr.indexOf('"');
            curr = curr.substring(start2);
            curr = curr.substring(1);
            const end = curr.indexOf('"');
            curr = curr.substring(0, end);
            return curr;
        }
        function extractInnerHtml(element) {
            let curr = element;
            const start = curr.indexOf('>');
            curr = curr.substring(start + 1);            
            const end = curr.indexOf('<');
            curr = curr.substring(0, end);
            return curr;
        }
        const idToInnerHtmlMap = new Map();
        const lines = noteBody.split('\n');
        lines.forEach(l => {
            function matchesElement(elemName, html) {
                if (html.length >= elemName.length + 2) {
                    return elemName === html.substring(1, 1 + (elemName.length));
                }
                return false;
            }
            if (matchesElement('h2', l)) {
                const id = extractId(l);
                const innerHtml = extractInnerHtml(l);
                if (innerHtml !== '') {
                    idToInnerHtmlMap.set(id, innerHtml);
                }
            }
        });
        return idToInnerHtmlMap;
    }
    res.render('note-detail', viewBuilder()
        .title(note.noteTitle)
        .navItems(navItems)
        .activeNavItem(1)
        .note(enhanceNote(note, categoryList))
        .viewName('note-detail')
        .detailNavItems(extractDetailNavItems(note.noteBody))
        .jsModule('noteDetailModule.js')
        .isLoggedIn(req.session.isLoggedIn)
        .build()
    );
};

exports.getLoginView = (req, res, next) => {
    res.render('login', viewBuilder()
        .title('Login')
        .navItems(navItems)
        .activeNavItem(4)
        .build()
    );
};