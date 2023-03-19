const BASE_DIR = require('../config/baseDir');

module.exports = function viewBuilder() {
    const payload = {
        pageTitle: null,
        navItems: [],
        activeNavItem: null,
        categoryList: [],
        noteList: [],
        note: null,
        viewName: null,
        detailNavItems: [],
        jsModule: null,
        jsScripts: [],
        BASE_DIR: BASE_DIR,
    };
    return {
        title: function(s) {
            payload.pageTitle = s;
            return this;
        },
        navItems: function(arr) {
            payload.navItems = arr;
            return this;
        },
        activeNavItem: function(id) {
            payload.activeNavItem = id;            
            return this;
        },
        categoryList: function categoryList(arr) {
            payload.categoryList = arr;
            return this;
        },
        noteList: function(arr) {
            payload.noteList = arr;
            return this;
        },
        note: function(obj) {
            payload.note = obj;
            return this;
        },
        viewName: function(s) {
            payload.viewName = s;
            return this;
        },
        detailNavItems: function (arr) {
            payload.detailNavItems = arr;
            return this;
        },
        jsScripts: function (arr) {
            payload.jsScripts = arr;
            return this;
        },
        jsModule: function (s) {
            payload.jsModule = s;
            return this;
        },
        build: function build() {
            return payload;
        },
    };
};