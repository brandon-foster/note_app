const path = require('path');

const rootDir = require('../util/rootDir');
const fileio = require('../util/fileio');

const FILE = path.join(rootDir, 'data', 'categoryList.json');
const BACKUP_FILE = `${FILE}.backup`;

module.exports = (function createCategoryRepository() {
    return {
        fetchAll: async () => {
            const list = await fileio.parseJson(FILE);
            return list;
        },
        findById: async function(id) {
            const list = await fileio.parseJson(FILE);
            list.filter(category => category.id === id);
            if (list.size === 0) {
                return null;
            }
            return list[id];
        },
        append: async function(category) {
            const list = await fileio.parseJson(FILE);
            list.push(category);
            fileio.writeJson(FILE, JSON.stringify(list));
            fileio.writeJson(BACKUP_FILE, JSON.stringify(list));
        },
    };
}());
