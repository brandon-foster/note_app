const BASE_DIR = require('./baseDir');

module.exports = [
    {
        id: 0,
        href: `${BASE_DIR}`,
        displayText: 'Home',
    },
    {
        id: 1,
        href: `${BASE_DIR}/notes`,
        displayText: 'All Notes',
    },
    {
        id: 2,
        href: `${BASE_DIR}/admin/add-note`,
        displayText: 'Add Note',
    },
    {
        id: 3,
        href: `${BASE_DIR}/admin/add-category`,
        displayText: 'Add Category',
    },
];
