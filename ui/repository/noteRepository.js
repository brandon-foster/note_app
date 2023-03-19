const path = require('path');

const rootDir = require('../util/rootDir');
const fileio = require('../util/fileio');

const FILE = path.join(rootDir, 'data', 'noteList.json');
const BACKUP_FILE = `${FILE}.backup`;

module.exports = (function createNoteRepository() {
    function persistList(list) {
        fileio.writeJson(FILE, JSON.stringify(list));
        fileio.writeJson(BACKUP_FILE, JSON.stringify(list));
    }
    return {
        fetchAll: async () => {
            const list = await fileio.parseJson(FILE);
            return list;
        },
        append: async function(noteToSave) {
            const list = await fileio.parseJson(FILE);
            list.push(noteToSave);
            persistList(list);
        },
        findById: async function(id) {
            const list = await fileio.parseJson(FILE);
            list.filter(note => note.noteId === id);
            if (list.size === 0) {
                return null;
            }
            return list[id];
        },
        update: async function(noteToSave) {
            const list = await fileio.parseJson(FILE);
            list
                .filter(n => {
                    return n.noteId === noteToSave.noteId
                })
                .forEach(n => {
                    n.noteTitle = noteToSave.noteTitle;
                    n.noteCategory = noteToSave.noteCategory;
                    n.noteBody = noteToSave.noteBody;
                    return n;
                });
            persistList(list);
        }
    };
}());
