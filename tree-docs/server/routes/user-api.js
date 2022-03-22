const express = require("express");
const sql = require("../db.js");

// create a new express-promise-router
// this has the same API as the normal express router except
// it allows you to use async functions as route handlers
const router = express.Router()

/*
    USERS
*/

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

/*
    BARE MINIMUM REQUIRED FOR DEMO
*/

//get documents
router.get('/documents', async(req, res) => {
    var documents = [];
    sql.query('SELECT MIN(DID) as DID, doc_name, title, full_name, created FROM treedocs.document JOIN treedocs.users ON users.UID = document.author GROUP BY doc_name').then(rows => {
        for(var i = 0; i < rows.length; i++)
        {
            var newDoc = { };
            newDoc.id = rows[i].DID;
            newDoc.name = rows[i].doc_name;
            var d = new Date(rows[i].created);
            newDoc.date = d.toString();
            newDoc.author = rows[i].full_name;
            documents.push(newDoc);
        }
        res.json(documents);
    });
});

//get summary
router.get('/summaries', async(req, res) => {
    var documents = [];
    sql.query('SELECT MIN(DID), doc_name, title, full_name, created FROM treedocs.document JOIN treedocs.users ON users.UID = document.author GROUP BY doc_name').then(rows => {
        for(var i = 0; i < rows.length; i++)
        {
            var newDoc = { };
            newDoc.id = rows[i].DID;
            newDoc.name = rows[i].doc_name;
            var d = new Date(rows[i].created);
            newDoc.date = d.toString();
            newDoc.author = rows[i].full_name;
            documents.push(newDoc);
        }
        res.json(documents);
    });
});

//get tree (for root did)
router.get('/get_tree/:did', async(req, res) => {
    // Reading uid from the URL

    const did = req.params.did;
    console.log(did);
    var data = [];

    sql.query(`WITH RECURSIVE doc_tree (DID, level, parent_DID)  
                AS (
                    SELECT DID, 0, -1 
                    FROM treedocs.hierarchy_parent
                    WHERE DID = ${did}
                    
                    UNION ALL 
                    SELECT 
                        hierarchy_parent.DID, doc_tree.level + 1, doc_tree.DID
                    FROM treedocs.hierarchy_parent, doc_tree 
                    WHERE hierarchy_parent.parent_DID = doc_tree.DID
                ) 
                SELECT DID, parent_DID, full_name FROM doc_tree NATURAL JOIN (treedocs.document JOIN treedocs.users ON users.UID = document.author)
                ORDER BY level, parent_DID;
    `).then(rows => {
        for(var i = 0; i < rows.length; i++) {
            if (rows[i].parent_DID != -1) {
                var newEntry = {};
                newEntry.child_did = rows[i].DID;
                newEntry.parent_did = rows[i].parent_DID;
                newEntry.author_name = rows[i].full_name;
                data.push(newEntry);
            }
        }
        res.json(data);

    });
});



// export our router to be mounted by the parent application
module.exports = router