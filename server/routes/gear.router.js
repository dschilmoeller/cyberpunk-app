const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// Fetch Armor List
router.get('/armor', (req, res) => {
    const sqlText = `SELECT * FROM "armor_master" order by "armor_master_id"`

    pool.query(sqlText)
        .then((result) => {
            res.send(result.rows);
        })
        .catch(err => {
            console.log(`Error Fetching Armor List:`, err);
        });
});

// Fetch Weapon List
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

// Fetch miscellaneous gear list.
router.get('/miscgear', (req, res) => {
    const sqlText = `SELECT * FROM "misc_gear_master" order by "misc_gear_master_id"`

    pool.query(sqlText)
    .then((result) => {
        res.send(result.rows);
    })
    .catch(err => {
        console.log(`Error fetching misc gear list:`, err);
    })
})

// Fetch cyberware list
router.get('/cyberware/', (req, res) => {
    const sqlText = `SELECT * FROM "cyberware_master" order by "cyberware_master_id"`
    pool.query(sqlText)
    .then((result) => {
        res.send(result.rows);
    })
    .catch(err => {
        console.log(`Error fetching cyberware master list:`, err);
    })

})

module.exports = router