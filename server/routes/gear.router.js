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
const whiteListTable = ['char_armor_bridge', 'char_clothing_bridge', 'char_gear_bridge', 'char_grenade_bridge', 'char_owned_cyberware', 'char_owned_vehicle_mods', 'char_shield_bridge', 'char_vehicle_bridge', 'char_weapons_bridge']
const whiteListBuyPKs = ['armor_id','clothing_id', 'misc_gear_id', 'grenade_id', 'cyberware_master_id', 'vehicle_mod_master_id', 'shield_id', 'vehicle_id','weapon_id']
const whiteListSellPKs = ['armor_bridge_id', 'clothing_bridge_id', 'char_gear_bridge_id', 'grenade_bridge_id', 'owned_cyberware_id', 'char_owned_vehicle_mods_id', 'shield_bridge_id', 'vehicle_bridge_id', 'weapon_bridge_id']

router.post('/buyItem', (req, res) => {
    let tableCheck = false;
    let columnCheck = false;

    for (let i = 0; i < whiteListTable.length; i++) {
        if (whiteListTable[i] === req.body.table) {
            tableCheck = true
        }
    }
    for (let j = 0; j < whiteListBuyPKs.length; j++) {
        if (whiteListBuyPKs[j] === req.body.column) {
            columnCheck = true
        }
    }

    if (tableCheck === true && columnCheck === true) {
        const sqlText = `INSERT INTO ${req.body.table} (char_id, ${req.body.column}) VALUES ($1, $2);`
        let sqlParams = [req.body.charID, req.body.itemMasterID]

        pool.query(sqlText, sqlParams)
            .then(result => { res.sendStatus(201) })
            .catch(err => { console.log(`Error buying item:`, err); })
    } else {
        console.log(`Failure to buy item due to table/column check failure. Table: ${tableCheck}, Column: ${columnCheck}`);
        res.sendStatus(400);
    }

})

router.delete('/sellItem', (req, res) => {
    let tableCheck = false;
    let columnCheck = false;

    for (let i = 0; i < whiteListTable.length; i++) {
        if (whiteListTable[i] === req.body.table) {
            tableCheck = true
        }
    }
    for (let j = 0; j < whiteListSellPKs.length; j++) {
        if (whiteListSellPKs[j] === req.body.column) {
            columnCheck = true
        }
    }
    if (tableCheck === true && columnCheck === true) {
        const sqlText = `DELETE FROM ${req.body.table} WHERE ${req.body.column} = $1`
        let sqlParams = [req.body.itemID]

        pool.query(sqlText, sqlParams)
            .then(result => { res.sendStatus(200) })
            .catch(err => { console.log(`Error selling item:`, err); })
    } else {
        console.log(`Failure to buy item due to table/column check failure. Table: ${tableCheck}, Column: ${columnCheck}`);
        res.sendStatus(400);
    }
})

router.put('/changeCharacterArmor/', (req, res) => {
    const sqlText = `UPDATE "char_armor_bridge" SET "this_armor_loss" = $1 WHERE "armor_bridge_id" = $2`
    const sqlParams = [req.body.newLoss, req.body.armor_bridge_id]
    pool.query(sqlText, sqlParams)
    .then(result => {res.sendStatus(200)})
    .catch(err => {console.log(`Error changing in play character armor loss`, err);})
})

router.put('/changeCharacterShield/', (req, res) => {
    const sqlText = `UPDATE "char_shield_bridge" SET "this_shield_loss" = $1 WHERE "shield_bridge_id" = $2`
    const sqlParams = [req.body.newLoss, req.body.shield_bridge_id]
    pool.query(sqlText, sqlParams)
    .then(result => {res.sendStatus(200)})
    .catch(err => {console.log(`Error changing in play character shield loss`, err);})
})

router.put('/changeCharacterCyberArmor/', (req, res) => {
    const sqlText = `UPDATE "char_status" SET "current_cyberware_armor_loss" = $1 WHERE "char_status_id" = $2`
    const sqlParams = [req.body.newLoss, req.body.char_status_id]
    pool.query(sqlText, sqlParams)
    .then(result => {res.sendStatus(200)})
    .catch(err => {console.log(`Error changing in play character cyberware armor loss`, err);})
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