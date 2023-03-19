const BASE_DIR = require('./baseDir');

const ALWAYS = 'always';
const IS_NOT_LOGGED_IN = 'is not logged in';
const IS_LOGGED_IN = 'is logged in';

module.exports = [
    {
        id: 0,
        href: `${BASE_DIR}`,
        displayText: 'Home',
        displayWhen: ALWAYS,
    },
    {
        id: 1,
        href: `${BASE_DIR}/notes`,
        displayText: 'All Notes',
        displayWhen: ALWAYS,
    },
    {
        id: 2,
        href: `${BASE_DIR}/admin/add-note`,
        displayText: 'Add Note',
        displayWhen: IS_LOGGED_IN,
    },
    {
        id: 3,
        href: `${BASE_DIR}/admin/add-category`,
        displayText: 'Add Category',
        displayWhen: IS_LOGGED_IN,
    },
    {
        id: 4,
        href: `${BASE_DIR}/login`,
        displayText: 'Login',
        displayWhen: IS_NOT_LOGGED_IN,
    },
    {
        id: 6,
        href: `${BASE_DIR}/admin/dashboard`,
        displayText: 'Dashboard',
        displayWhen: IS_LOGGED_IN,
    },
    {
        id: 5,
        href: `${BASE_DIR}/admin/logout`,
        displayText: 'Logout',
        displayWhen: IS_LOGGED_IN,
    }
];
