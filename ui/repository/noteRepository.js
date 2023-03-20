const jsonIO = require('../util/fileDbIO');

module.exports = (function createNoteRepository() {
    return {
        fetchAll: async () => {
            return await jsonIO.fetchNoteList();
        },
        append: async function(noteToSave) {
            jsonIO.appendToNoteList(noteToSave);
        },
        findById: async function(id) {
            return jsonIO.findNoteById(id);
        },
        update: async function(noteToSave) {
            jsonIO.updateNote(noteToSave);
        }
    };
}());
