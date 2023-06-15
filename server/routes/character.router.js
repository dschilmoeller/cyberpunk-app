const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


// fetch characters list route
router.get('/fetchallcharacters', (req, res) => {
    const sqlText = `SELECT id, name 
    FROM "character"
    WHERE user_id = $1
    ORDER BY id ASC
    `

    pool.query(sqlText, [req.user.id])
        .then((result) => {
            res.send(result.rows);
        })
        .catch(err => {
            console.log(`Error Fetching characters:`, err);
        });
});

// fetch character details
// wrap res.send in conditional - if req.user.id != returned user_id 
// or just leave in SQL command as WHERE for security reasons.
router.get('/fetchcharacterdetails/:id', (req, res) => {
    console.log(`In fetch char details, id:`, req.params.id);
    const sqlText = `SELECT * FROM "character"
    WHERE id = $1`
    pool.query(sqlText, [req.params.id])
        .then((result) => {
            res.send(result.rows);
            console.log(`Result:`, result.rows);
        })
        .catch(err => {
            console.log(`Error fetching character details:`, err);
        })
})

module.exports = router