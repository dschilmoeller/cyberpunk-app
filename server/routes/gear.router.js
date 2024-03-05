const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// Fetch Armor List
router.get('/fetcharmor', (req, res) => {
    const sqlText = `SELECT * FROM "armor_master" order by "armor_master_id"`

    pool.query(sqlText)
        .then((result) => {
            res.send(result.rows);
        })
        .catch(err => {
            console.log(`Error Fetching Armor List:`, err);
        });
});

// Other Fetches
router.get('/fetchshield', (req, res) => {
    const sqlText = `SELECT * FROM "shield_master" order by "shield_master_id"`
    pool.query(sqlText)
        .then((result) => { res.send(result.rows); })
        .catch(err => { console.log(`Error Fetching Armor List:`, err); });
});

router.get('/fetchweapon', (req, res) => {
    const sqlText = `SELECT * FROM "weapon_master" order by "weapon_master_id"`
    pool.query(sqlText)
        .then((result) => { res.send(result.rows); })
        .catch(err => { console.log(`Error Fetching Weapon List:`, err); });
});

router.get('/fetchgrenades', (req, res) => {
    const sqlText = `SELECT * FROM "grenade_master"`
    pool.query(sqlText)
        .then((result) => { res.send(result.rows); })
        .catch(err => { console.log(`Error fetching grenade list:`, err); })
})

router.get('/fetchmiscgear', (req, res) => {
    const sqlText = `SELECT * FROM "misc_gear_master" order by "misc_gear_master_id"`
    pool.query(sqlText)
        .then((result) => { res.send(result.rows); })
        .catch(err => { console.log(`Error fetching misc gear list:`, err); })
})

router.get('/fetchcyberware/', (req, res) => {
    const sqlText = `SELECT * FROM "cyberware_master" order by "cyberware_master_id"`
    pool.query(sqlText)
        .then((result) => { res.send(result.rows); })
        .catch(err => { console.log(`Error fetching cyberware master list:`, err); })
})

router.get('/fetchnetrunner/', (req, res) => {
    const sqlText = `SELECT * FROM "netrunner_master" order by "netrunner_master_id"`
    pool.query(sqlText)
        .then((result) => { res.send(result.rows); })
        .catch(err => { console.log(`Error fetching cyberware master list:`, err); })
})

router.get('/fetchvehicles', (req, res) => {
    const sqlText = `SELECT * FROM "vehicle_master" order by "type"`
    pool.query(sqlText)
        .then((result) => { res.send(result.rows); })
        .catch(err => { console.log(`Error fetching vehicle master list:`, err); })
})

router.get('/fetchvehicleMods', (req, res) => {
    const sqlText = `SELECT * FROM "vehicle_mod_master" ORDER BY "vehicle_mod_master_id"`
    pool.query(sqlText)
        .then((result) => { res.send(result.rows); })
        .catch(err => { console.log(`Error fetching vehicle modification list:`, err); })
})

router.get('/fetchclothing', (req, res) => {
    const sqlText = `SELECT * FROM "clothing_master"`
    pool.query(sqlText)
        .then(result => { res.send(result.rows); })
        .catch(err => { console.log(`Error fetching master clothing lists:`, err); })
})

router.get('/fetchlifestyle/', (req, res) => {
    const sqlText = `SELECT * FROM "lifestyle_master"`
    pool.query(sqlText)
        .then((result) => { res.send(result.rows); })
        .catch(err => { console.log(`Error fetching lifestyle master rows`, err); })
})

// Purchases and Sales
const whiteListTable = ['char_armor_bridge', 'char_shield_bridge', 'char_weapons_bridge', 'char_clothing_bridge']
const whiteListPKs = ['armor_bridge_id', 'shield_bridge_id', 'weapon_bridge_id', 'clothing_bridge_id']

// clothing - special case, has default rank that is not static.

router.post('/buyItem', (req, res) => {
    // test for whitelisting.
    let table = req.body.table
    let column = req.body.column
    const sqlText = `INSERT INTO ${table} (char_id, ${column}) VALUES ($1, $2);`
    let sqlParams = [req.body.charID, req.body.itemMasterID]

    pool.query(sqlText, sqlParams)
        .then(result => { res.sendStatus(201) })
        .catch(err => { console.log(`Error buying item:`, err); })
})

router.delete('/sellItem', (req, res) => {
    // test for whitelisting
    let table = req.body.table
    let column = req.body.column
    const sqlText = `DELETE FROM ${table} WHERE ${column} = $1`
    let sqlParams = [req.body.itemID]

    pool.query(sqlText, sqlParams)
        .then(result => { res.sendStatus(200) })
        .catch(err => { console.log(`Error selling item:`, err); })
})

router.post('/buyNetrunnerGear', (req, res) => {
    const sqlText = `INSERT INTO "netrunner_bridge" ("char_id", "netrunner_master_id", "equipped")
    VALUES ($1, $2, $3)`
    const sqlParams = [req.body.charID, req.body.item.netrunner_master_id, false]
    pool.query(sqlText, sqlParams)
        .then(result => { res.sendStatus(201); })
        .catch(err => { console.log(`Error buying netrunner gear:`, err); })
})

router.delete('/sellNetrunnerGear/:id', (req, res) => {
    const sqlText = `DELETE FROM "netrunner_bridge" WHERE "netrunner_bridge_id" = $1`
    pool.query(sqlText, [req.params.id])
        .then(result => { res.sendStatus(200); })
        .catch(err => { console.log(`Error selling netrunner gear:`, err); })
})

module.exports = router