const fileDbIO = require('../util/fileDbIO');

module.exports = (function createNoteRepository() {
    return {
        fetchAll: async () => {
            return await fileDbIO.fetchNoteList();
        },
        append: async function(noteToSave) {
            fileDbIO.appendToNoteList(noteToSave);
        },
        findById: async function(id) {
            return fileDbIO.findNoteById(id);
        },
        update: async function(noteToSave) {
            fileDbIO.updateNote(noteToSave);
        }
    };
}());
