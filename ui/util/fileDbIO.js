const path = require('path');
const fs = require('fs');
const fileio = require('./fileio');
const rootDir = require('./rootDir');
const FILE = path.join(rootDir, 'data', 'db.json');
const BACKUP_FILE = `${FILE}.backup`;

module.exports = (function createJsonIO() {

    function createDb() {
        return new Promise((res, rej) => {
            const json = JSON.stringify({
                noteList: [],
                categoryList: [],
            });
            fileio.write(FILE, json)
                .then(() => {
                    res()
                });
        });
    }

    function readDb() {
        return new Promise((res, rej) => {
            fileio.read(FILE)
                .then((db) => {
                    res(db);
                });
        });
    }

    async function parseDb() {
        return new Promise((res, rej) => {
            readDb().then(db => {
                if (db === null) {
                    createDb().then(() => {
                        readDb().then(db => {
                            res(db);
                        });
                    });
                }
                else {
                    res(db);
                }
            });
        });
    }

    function persistDb(db) {
        fileio.write(FILE, JSON.stringify(db));
        fileio.write(BACKUP_FILE, JSON.stringify(db));
    }

    async function fetchNoteList() {
        const db = await parseDb();
        return db.noteList;
    }

    async function fetchCategoryList() {
        const db = await parseDb();
        return db.categoryList;
    }

    async function appendToNoteList(noteToSave) {
        const db = await parseDb();
        db.noteList.push(noteToSave);
        persistDb(db);
    }

    async function appendToCategoryList(categoryToSave) {
        const db = await parseDb();
        db.categoryList.push(categoryToSave);
        persistDb(db);
    }

    async function findNoteById(id) {
        const db = await parseDb();
        if (db.noteList.size === 0) {
            return null;
        }
        return db.noteList[id];
    }

    async function findCategoryById(id) {
        const db = await parseDb();
        // db.categoryList.filter(category => category.id === id);
        if (db.categoryList.size === 0) {
            return null;
        }
        return db.categoryList[id];
    }

    async function updateNote(noteToSave) {
        const db = await parseDb();
        db.noteList
            .filter(n => {
                return n.noteId === noteToSave.noteId
            })
            .forEach(n => {
                n.noteTitle = noteToSave.noteTitle;
                n.noteCategory = noteToSave.noteCategory;
                n.noteBody = noteToSave.noteBody;
                return n;
            });
        persistDb(db);
    }

    return {
        parseDb: parseDb,
        fetchNoteList: fetchNoteList,
        fetchCategoryList: fetchCategoryList,
        appendToNoteList: appendToNoteList,
        appendToCategoryList: appendToCategoryList,
        findNoteById: findNoteById,
        findCategoryById: findCategoryById,
        updateNote: updateNote,
    };
}());