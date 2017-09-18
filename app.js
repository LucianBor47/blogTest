const express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    db = require('./db'),
    controllers = require('./controllers'),
    app = express();

// Connection String


// Set Default Ext PUG
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

// Set Public Folder
app.use(express.static(path.join(__dirname, 'public')));

//Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


controllers.apiController(app);
controllers.pageRoutes(app);

app.listen(3000, () => {
    console.log('Running on 3000');
});