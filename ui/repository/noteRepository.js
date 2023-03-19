const path = require('path');

const rootDir = require('../util/rootDir');
const fileio = require('../util/fileio');

const filename = path.join(rootDir, 'data', 'noteList.json');
const BACKUP_FILE = path.join(rootDir, 'data', 'noteList.json.backup');

module.exports = (function createNoteRepository() {
    function persistList(list) {
        fileio.writeJson(filename, JSON.stringify(list));
        fileio.writeJson(BACKUP_FILE, JSON.stringify(list));
    }
    return {
        fetchAll: async () => {
            const list = await fileio.parseJson(filename);
            return list;
        },
        append: async function(noteToSave) {
            const list = await fileio.parseJson(filename);
            list.push(noteToSave);
            persistList(list);
        },
        findById: async function(id) {
            const list = await fileio.parseJson(filename);
            list.filter(note => note.noteId === id);
            if (list.size === 0) {
                return null;
            }
            return list[id];
        },
        update: async function(noteToSave) {
            const list = await fileio.parseJson(filename);
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
