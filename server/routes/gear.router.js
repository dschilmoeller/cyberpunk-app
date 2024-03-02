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
router.post('/buyarmor', (req, res) => {
    const sqlText = `INSERT INTO "char_armor_bridge" ("char_id", "armor_id", "this_armor_loss", "equipped")
    VALUES ($1, $2, $3, $4)`
    const sqlParams = [req.body.charID, req.body.item.armor_master_id, 0, false]
    pool.query(sqlText, sqlParams)
        .then(result => { res.sendStatus(201); })
        .catch(err => { console.log(`Error purchasing armor:`, err); })
})

router.delete('/sellArmor/:id', (req, res) => {
    const sqlText = `DELETE FROM "char_armor_bridge" WHERE "armor_bridge_id" = $1`
    pool.query(sqlText, [req.params.id])
        .then(result => { res.sendStatus(200); })
        .catch(err => { console.log(`Error selling armor:`, err); })
})

router.post('/buyShield', (req, res) => {
    const sqlText = `INSERT INTO "char_shield_bridge" ("char_id", "shield_id", "this_shield_loss", "equipped")
    VALUES ($1, $2, $3, $4)`
    const sqlParams = [req.body.charID, req.body.item.shield_master_id, 0, false]
    pool.query(sqlText, sqlParams)
        .then(result => { res.sendStatus(201); })
        .catch(err => { console.log(`Error buying shield:`, err); })
})

router.delete('/sellShield/:id', (req, res) => {
    const sqlText = `DELETE FROM "char_shield_bridge" WHERE "shield_bridge_id" = $1`
    pool.query(sqlText, [req.params.id])
        .then(resuilt => { res.sendStatus(200); })
        .catch(err => { console.log(`Error selling shield:`, err); })
})

router.post('/buyWeapon', (req, res) => {
    const sqlText = `INSERT INTO "char_weapons_bridge" ("char_id", "weapon_id", "weapon_mod_1", "weapon_mod_2", "current_shots_fired", "equipped")
    VALUES ($1, $2, 1, 1, 0, false)`
    const sqlParams = [req.body.charID, req.body.item.weapon_master_id]
    pool.query(sqlText, sqlParams)
        .then(result => { res.sendStatus(201); })
        .catch(err => { console.log(`Error buying weapon:`, err); })
})

router.delete('/sellWeapon/:id', (req, res) => {
    const sqlText = `DELETE FROM "char_weapon_bridge" WHERE "weapon_bridge_id" = $1`
    pool.query(sqlText, [req.params.id])
        .then(result => { res.sendStatus(200); })
        .catch(err => { console.log(`Error selling weapon:`, err); })
})

router.post('/buyGrenade/', (req, res) => {
    const sqlText = `INSERT INTO "char_grenade_bridge" ("char_id", "grenade_id")
    VALUES ($1, $2)`
    const sqlParams = [req.body.charID, req.body.item.grenade_master_id]
    pool.query(sqlText, sqlParams)
        .then(result => { res.sendStatus(201); })
        .catch(err => { console.log(`Error buying grenade:`, err); })
})

router.delete('/sellGrenade/:id', (req, res) => {
    const sqlText = `DELETE FROM "char_grenade_bridge" WHERE "grenade_bridge_id" = $1`
    pool.query(sqlText, [req.params.id])
        .then(result => { res.sendStatus(200); })
        .catch(err => { console.log(`Error selling grenade:`, err); })
})

router.post('/buyMiscGear/', (req, res) => {
    const sqlText = `INSERT INTO "char_gear_bridge" ("char_id", "misc_gear_id")
    VALUES ($1, $2)`
    const sqlParams = [req.body.charID, req.body.item.misc_gear_master_id]
    pool.query(sqlText, sqlParams)
        .then(result => { res.sendStatus(201); })
        .catch(err => { console.log(`Error buying misc gear:`, err); })
})

router.delete('/sellMiscGear/:id', (req, res) => {
    const sqlText = `DELETE FROM "char_gear_bridge" WHERE "char_gear_bridge_id" = $1`
    pool.query(sqlText, [req.params.id])
        .then(result => { res.sendStatus(200); })
        .catch(err => { console.log(`Error selling misc gear:`, err); })
})

router.post('/buyCyberware/', (req, res) => {
    const sqlText = `INSERT INTO "char_owned_cyberware" ("char_id", "cyberware_master_id)
    VALUES ($1, $2)`
    const sqlParams = [req.body.charID, req.body.item.cyberware_master_id]
    pool.query(sqlText, sqlParams)
        .then(result => { res.sendStatus(201); })
        .catch(err => { console.log(`Error buying cyberware:`, err); })
})

router.delete('/sellCyberware/:id', (req, res) => {
    const sqlText = `DELETE FROM "char_owned_cyberware" WHERE "owned_cyberware_id" = $1`
    pool.query(sqlText, [req.params.id])
        .then(result => { res.sendStatus(200); })
        .catch(err => { console.log(`Error selling cyberware:`, err); })
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

router.post('/buyVehicle', (req, res) => {
    const sqlText = `INSERT INTO "char_vehicle_bridge" ("char_id", "vehicle_id")
    VALUES ($1, $2)`
    const sqlParams = [req.body.charID, req.body.item.vehicle_id]
    pool.query(sqlText, sqlParams)
        .then(result => { res.sendStatus(201); })
        .catch(err => { console.log(`Error buying vehicle:`, err); })
})

router.delete('/sellVehicle/:id', (req, res) => {
    const sqlText = `DELETE FROM "char_vehicle_bridge" WHERE "netrunner_bridge_id" = $1`
    pool.query(sqlText, [req.params.id])
        .then(result => { res.sendStatus(200); })
        .catch(err => { console.log(`Error selling vehicle:`, err); })
})

router.post('/buyVehicleMod', (req, res) => {
    const sqlText = `INSERT INTO "char_owned_vehicle_mods" ("char_id", "vehicle_mod_master_id")
    VALUES ($1, $2)`
    const sqlParams = [req.body.charID, req.body.item.vehicle_mod_master_id]
    pool.query(sqlText, sqlParams)
    .then(result => { res.sendStatus(201); })
    .catch(err => { console.log(`Error buying vehicle mod:`, err);})
})

router.delete('/sellVehicleMod/:id', (req, res) => {
    const sqlText = `DELETE FROM "char_owned_vehicle_mods" WHERE "vehicle_mod_master_id" = $1`
    pool.query(sqlText, [req.params.id])
    .then(result => { res.sendStatus(200) ; })
    .catch(err => { console.log(`Error selling vehicle mod:`, err);})
})

router.post('/buyclothing', (req, res) => {
    const sqlText = `INSERT INTO "char_clothing_bridge" ("char_id", "clothing_id", "rank", "equipped")
    VALUES ($1, $2, $3, $4)`
    const sqlParams = [req.body.charID, req.body.item.clothing_master_id, req.body.rank, false]
    pool.query(sqlText, sqlParams)
        .then(result => { res.sendStatus(201); })
        .catch(err => { console.log(`Error buying clothing:`, err); })
})

router.delete('/sellclothing/:id', (req, res) => {
    const sqlText = `DELETE FROM "char_clothing_bridge" WHERE "clothing_bridge_id" = $1`
    pool.query(sqlText, [req.params.id])
        .then(result => { res.sendStatus(200); })
        .catch(err => { console.log(`Error selling clothing:`, err); })
})

module.exports = router