const fileDbIO = require('../util/fileDbIO');

module.exports = (function createCategoryRepository() {
    return {
        fetchAll: async () => {
            return await fileDbIO.fetchCategoryList();
        },
        append: async function(categoryToSave) {
            fileDbIO.appendToCategoryList(categoryToSave);
        },
        findById: async function(id) {
           return fileDbIO.findCategoryById(id);
        },
    };
}());
