const jsonIO = require('../util/fileDbIO');

module.exports = (function createCategoryRepository() {
    return {
        fetchAll: async () => {
            return await jsonIO.fetchCategoryList();
        },
        findById: async function(id) {
           return jsonIO.findCategoryById(id);
        },
        append: async function(categoryToSave) {
            jsonIO.appendToCategoryList(categoryToSave);
        },
    };
}());
