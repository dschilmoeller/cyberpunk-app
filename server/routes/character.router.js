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
    // console.log(`In fetch char details, id:`, req.params.id);
    const sqlText = `SELECT * FROM "character"
    WHERE id = $1`
    pool.query(sqlText, [req.params.id])
        .then((result) => {
            res.send(result.rows);
            // console.log(`Result:`, result.rows);
        })
        .catch(err => {
            console.log(`Error fetching character details:`, err);
        })
})

router.get('/fetchcharactercyberdetails/:id', (req, res) => {
    const sqlText = `SELECT * FROM "char_cyberware_bridge"
    WHERE char_id = $1`
    pool.query(sqlText, [req.params.id])
    .then((result) => {
        res.send(result.rows);
    })
    .catch(err => {
        console.log(`Error fetching character cyberware detials`, err);
    })
})

router.get('/fetchcharacterstatus/:id', (req, res) => {
    const sqlText = `SELECT * FROM "char_status"
    WHERE char_id = $1`
    pool.query(sqlText, [req.params.id])
    .then((result) => {
        res.send(result.rows);
    })
    .catch(err => {
        console.log(`Error fetching character cyberware detials`, err);
    })
})

router.get('/fetchcharacterweapons/:id', (req, res) => {
    const sqlText = `SELECT * FROM "character_weapons_bridge"
    JOIN "weapons_master" ON "weapons_master"."id" = "character_weapons_bridge"."weapon_id"
    JOIN "weapon_mod1_master" ON "weapon_mod1_master".id = "character_weapons_bridge".weapon_mod_1
    JOIN "weapon_mod2_master" ON "weapon_mod2_master".id = "character_weapons_bridge".weapon_mod_2
    WHERE char_id = $1
    `
    pool.query(sqlText, [req.params.id])
    .then((result) => {
        res.send(result.rows);
    })
    .catch(err => {
        console.log(`Error fetching character weapon details`, err);
    })
})

router.put('/savecharacter/:id', (req, res) => {
    const sqlText = `UPDATE "char_status"
    SET "current_stun" = $1, "current_lethal" = $2, "current_agg" = $3, "current_armor_loss" = $4, "current_luck_loss" = $5, "current_humanity_loss" = $6
    WHERE "char_id" = $7;`
    const sqlParams = [req.body.current_stun, req.body.current_lethal, req.body.current_agg, req.body.current_armor_loss, req.body.current_luck_loss, req.body.current_humanity_loss, req.params.id]

    pool.query(sqlText, sqlParams)
    .then((result) => {
        res.sendStatus(202)
    })
    .catch(err => {
        console.log(`Error saving character status:`, err);
    })
})
module.exports = router