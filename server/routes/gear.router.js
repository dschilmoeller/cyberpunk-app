const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// Fetch Armor List
router.get('/armor', (req, res) => {
    const sqlText = `SELECT * FROM "armor_master" order by "quality"`

    pool.query(sqlText)
        .then((result) => {
            res.send(result.rows);
        })
        .catch(err => {
            console.log(`Error Fetching Armor List:`, err);
        });
});

router.get('/weapon', (req, res) => {
    const sqlText = `SELECT * FROM "weapon_master" order by "weapon_master_id"`
    
    pool.query(sqlText)
        .then((result) => {
            res.send(result.rows);
        })
        .catch(err => {
            console.log(`Error Fetching Weapon List:`, err);
        });
});

module.exports = router