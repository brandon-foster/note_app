exports.getAddNote = (req, res, next) => {
    res.render('admin/add-note', {
        pageTitle: 'Add Note'
    });
}
