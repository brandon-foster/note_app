const viewBuilder = require('../util/viewBuilder');
const navItems = require("../config/navItems");

exports.get404 = (req, res, next) => {
    res.render('404', viewBuilder()
        .title('Nothing Here')
        .navItems(navItems)
        .build()
    );
};