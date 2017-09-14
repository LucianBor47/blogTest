const db = require('../db'),
    bodyParser = require('body-parser'),
    bcrypt = require('bcrypt');

module.exports = (app) => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.get('/api/test', (req, res) => {
        res.send('working...')
    })

    app.get('/api/users/:username', (req, res) => {
        const query = {
            text: 'SELECT name, email, joined_up FROM users WHERE name = $1',
            values: [req.params.username]
        };
        db.query(query, (err, data) => {
            if (err) throw err;
            
            res.send(data.rows[0]);
        });
    });

    app.get('/api/user/:id', (req, res) => {
        if (parseInt(req.params.id)) {
            const query = {
                text: 'SELECT name, email, password, joined_up FROM users WHERE id = $1',
                values: [req.params.id]
            };
            db.query(query, (err, data) => {
                if (err) throw err;
                console.log(bcrypt.compareSync("testpass", data.rows[0]['password']));
                res.send(data.rows[0]);
            });
        } else {
            res.send('Error: id needs to be an integer...');
        }
    });

    app.post('/api/users', (req, res) => {
        if(req.body.id) {
            const saltRounds = 10;
            const newPass = bcrypt.hashSync(req.body.password, saltRounds);
            const query = {
                text: "UPDATE users SET name = ($1), email = ($2), password = ($3) WHERE id = ($4)",
                values: [req.body.name, req.body.email, newPass, req.body.id]
            };
            db.query(query, (err, data) => {
                if(err) throw err;
                res.send('Updated...' + req.body.id);
            });
        } else {
            const query = {
                text: 'INSERT INTO users(name, email, password) values($1,$2,$3)',
                values: [req.body.name, req.body.email, newPass]
            }
            db.query(query, (err, data) => {
                if(err) {throw err};

                res.send('User Created!');
            });
        }
    });

    app.delete('/api/users', (req, res) => {
        const query = {
            text: 'DELETE FROM users WHERE name = $1',
            values: [req.body.name]
        }
        db.query(query, (err, data) => {
            if(err) throw err;
            res.send('User deleted! ' + req.body.name);
        });
    });
}

