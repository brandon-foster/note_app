const path = require('path');

const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');

const adminRouter = require('./routers/adminRouter');
const mainRouter = require('./routers/mainRouter');
const errorController = require('./controllers/errorController');
const rootDir = require('./util/rootDir');
const BASE_DIR = require('./config/baseDir');

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(session({
    secret: 'ssshhh',
    saveUninitialized: true,
    resave: true,
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(BASE_DIR, express.static(path.join(rootDir, 'public')));
app.use(`${BASE_DIR}/admin`, adminRouter);
app.use(`${BASE_DIR}/`, mainRouter);
app.use(errorController.get404);
app.listen(3000);
