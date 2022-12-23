const path = require('path');

const rootDir = require('../util/rootDir');
const fileio = require('../util/fileio');

const filename = path.join(rootDir, 'data', 'categoryList.json');

module.exports = (function createCategoryRepository() {
    return {
        fetchAll: async () => {
            const list = await fileio.parseJson(filename);
            return list;
        },
        findById: async function(id) {
            const list = await fileio.parseJson(filename);
            list.filter(category => category.id === id);
            if (list.size === 0) {
                return null;
            }
            return list[id];
        },
    };
}());
