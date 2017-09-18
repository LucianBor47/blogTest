const db = require('../db');

module.exports = (app) => {

    app.get('/', (req, res) => {
        console.log('Home route pinged...');
        res.render('index', {
            title: 'Hello',
            message: 'Work in progress...',
        });
        
    });

    app.get('/db', (req, res, next) => {
        var testInfo;
        db.query('SELECT name, id, email FROM users ORDER BY id', (err, data) => {
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
        });

    });

    app.get('/register', (req, res, next) => {
        res.render('register', {
            title: "Register Page"
        });
    });

    app.get('/login', (req, res, next) => {
        res.render('login', {
            title: 'Log In Page'
        });
    });
};
