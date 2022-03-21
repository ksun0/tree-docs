const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

const sql = require("./db.js");

app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/user', (req, res) => {
    const user = req.body;

    // Output the book to the console for debugging
    console.log(user);
    users.push(user);

    res.send('User is added to the database');
});

app.get('/users', (req, res) => {
    sql.query(`SELECT * FROM treedocs.users`, function(err, res) {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
        res.json()
      });
});

app.get('/user/:uid', (req, res) => {
    // Reading uid from the URL
    const uid = req.params.uid;

    // Searching users for the uid
    for (let user of users) {
        if (user.uid === uid) {
            res.json(user);
            return;
        }
    }

    // Sending 404 when not found something is a good practice
    res.status(404).send('Uiser not found');
});

app.delete('/user/:uid', (req, res) => {
    // Reading uid from the URL
    const uid = req.params.uid;

    // Remove item from the books array
    users = users.filter(u => {
        if (u.uid !== uid) {
            return true;
        }
        return false;
    });

    res.send('User is deleted');
});

app.post('/user/:isbn', (req, res) => {
    // Reading uid from the URL
    const uid = req.params.uid;
    const newUser = req.body;

    // Remove item from the books array
    for (let i = 0; i < users.length; i++) {
        let user = users[i]
        if (user.uid === uid) {
            users[i] = newUser;
        }
    }

    res.send('User is edited');
});

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));