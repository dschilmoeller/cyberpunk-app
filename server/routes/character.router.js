const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


// fetch characters list route
router.get('/fetchallcharacters', (req, res) => {
    const sqlText = `SELECT id, name 
    FROM "character"
    ORDER BY id ASC
    `

    pool.query(sqlText)
    .then((result) => {
        console.log(`result:`, result.rows);
        res.send(result.rows);
    })
    .catch((err) => {
        console.log(`Error Fetching characters:`, err);
    });
});

module.exports = router