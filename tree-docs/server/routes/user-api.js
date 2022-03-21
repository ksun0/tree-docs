const express = require("express");
const sql = require("../db.js");

// create a new express-promise-router
// this has the same API as the normal express router except
// it allows you to use async functions as route handlers
const router = express.Router()

router.get('/users', async (req, res) => {
    var users = [];
    sql.query('SELECT * FROM treedocs.users').then(rows => {
        for(var i = 0; i < rows.length; i++)
        {
            var newUser = { };
            newUser.UID = rows[i].UID;
            newUser.full_name = rows[i].full_name;
            users.push(newUser);
        }
        res.json(users);
    });
});

router.post('/user', async (req, res) => {
    const user = req.body;

    // Output the user to the console for debugging
    console.log(user);

    // TODO: SQL to add user

    res.send('User is added to the database');
});

router.get('/user/:uid', async(req, res) => {
    // Reading uid from the URL

    const uid = req.params.uid;

    sql.query(`SELECT * FROM treedocs.users WHERE UID = ${uid}`).then(row => {
        res.send(row);
        // Sending 404 when not found something is a good practice
        // res.status(404).send('User not found');
    });
});

router.delete('/user/:uid', async(req, res) => {
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

router.post('/user/:isbn', async(req, res) => {
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

// export our router to be mounted by the parent application
module.exports = router