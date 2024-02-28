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

router.get('/shield', (req, res) => {
    const sqlText = `SELECT * FROM "shield_master" order by "shield_master_id"`

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

// Fetch Grenade List
router.get('/grenades', (req, res) => {
    const sqlText = `SELECT * FROM "grenade_master"`

    pool.query(sqlText)
        .then((result) => {
            res.send(result.rows);
        })
        .catch(err => {
            console.log(`Error fetching grenade list:`, err);
        })
})

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

router.get('/netrunner/', (req, res) => {
    const sqlText = `SELECT * FROM "netrunner_master" order by "netrunner_master_id"`
    pool.query(sqlText)
        .then((result) => {
            res.send(result.rows);
        })
        .catch(err => {
            console.log(`Error fetching cyberware master list:`, err);
        })
})

router.get('/vehicles', (req, res) => {
    const sqlText = `SELECT * FROM "vehicle_master" order by "type"`
    pool.query(sqlText)
        .then((result) => {
            res.send(result.rows);
        })
        .catch(err => {
            console.log(`Error fetching vehicle master list:`, err);
        })
})

router.get('/vehicleMods', (req, res) => {
    const sqlText = `SELECT * FROM "vehicle_mod_master" ORDER BY "vehicle_mod_master_id"`
    pool.query(sqlText)
        .then((result) => {
            res.send(result.rows);
        })
        .catch(err => {
            console.log(`Error fetching vehicle modification list:`, err);
        })
})

router.get('/clothing', (req, res) => {
    const sqlText = `SELECT * FROM "clothing_master"`
    pool.query(sqlText)
    .then(result => {
        res.send(result.rows);
    })
    .catch(err => {
        console.log(`Error fetching master clothing lists:`, err);
    })
})

router.get('/lifestyle/', (req, res) => {
    const sqlText = `SELECT * FROM "lifestyle_master"`
    pool.query(sqlText)
        .then((result) => {
            res.send(result.rows);
        })
        .catch(err => {
            console.log(`Error fetching lifestyle master rows`, err);
        })
})

router.post('/buyclothing', (req, res) => {
    const sqlText = `INSERT INTO "char_clothing_bridge" ("char_id", "clothing_id", "rank", "equipped")
    VALUES ($1, $2, $3, $4)`
    const sqlParams = [req.body.charID, req.body.item.clothing_master_id, req.body.rank, false]
    pool.query(sqlText, sqlParams)
    .then(result => {
        res.sendStatus(201)
    })
    .catch(err => {
        console.log(`Error buying clothing:`, err);
    })
})

router.delete('/sellclothing/:id', (req, res) => {
    const sqlText = `DELETE FROM "char_clothing_bridge" WHERE "clothing_bridge_id" = $1`
    const sqlParams = [req.params.id]
    pool.query(sqlText, sqlParams)
    .then(result => {
        res.sendStatus(200)
    })
    .catch(err => {
        console.log(`Error selling clothing:`, err);
    })
})

module.exports = router