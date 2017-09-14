const express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    db = require('./db'),
    controllers = require('./controllers/apiController'),
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

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Hello',
        message: 'Work in progress...',
    });
    
});

app.get('/db', (req, res, next) => {
    var testInfo;
    db.query('SELECT * FROM users', (err, data) => {
        if (err) {
          return next(err);
        }
        testInfo = data.rows;
        res.render('dbTest', {
            title: 'DB_Test',
            message: 'Here is the rendered info: ',
            name: testInfo[0].name,
            email: testInfo[0].email,
            id: testInfo[0].id,
            data: testInfo
        });
        console.log("Database Tested...");
    })
});

controllers(app);

app.listen(3000, () => {
    console.log('Running on 3000');
});