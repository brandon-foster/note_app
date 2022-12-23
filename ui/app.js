const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const adminRouter = require('./routers/adminRouter');
const mainRouter = require('./routers/mainRouter');
const errorController = require('./controllers/errorController');
const rootDir = require('./util/rootDir');

const app = express();
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(rootDir, 'public')));
app.use('/admin', adminRouter);
app.use('/', mainRouter);
app.use(errorController.get404);
app.listen(3000);
