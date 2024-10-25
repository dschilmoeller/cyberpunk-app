const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

const { rejectUnauthenticated } = require('../modules/authentication-middleware')
const { rejectNonAdmin } = require('../modules/rejectNonAdmin')

// GM Routes

// Fetch campaigns
router.get('/fetchcampaigns', rejectUnauthenticated, (req, res) => {
    const sqlText = `SELECT * FROM "campaigns" ORDER BY campaign_id ASC`
    pool.query(sqlText)
        .then((result) => {
            res.send(result.rows);
        })
        .catch(err => {
            res.sendStatus(400);
            console.error(`Error fetching campaigns`, err);
        })
})

// fetch specific requirements for the GM summary page. 
router.get('/fetchGameMasterCharacters', rejectNonAdmin, (req, res) => {
    const sqlText = `SELECT id, handle, player, campaign, max_xp, spent_xp, bank, cool, cyber_cool, perception, perm_humanity_loss, temp_humanity_loss, reflexes, cyber_reflexes
    FROM "character"
    ORDER BY player ASC
    `

    pool.query(sqlText)
        .then((result) => {
            res.send(result.rows);
        })
        .catch(err => {
            res.sendStatus(400);
            console.error(`Error Fetching characters:`, err);
        });
});

router.post('/fetchGamemasterCharacterDetail/', rejectUnauthenticated, (req, res) => {
    const sqlText = `SELECT * FROM "character"
    JOIN "campaigns" ON "character"."campaign" = "campaigns"."campaign_id"
    WHERE id = $1`
    pool.query(sqlText, [req.body.characterID])
        .then((result) => {
            res.send(result.rows[0]);
        })
        .catch(err => {
            res.sendStatus(400)
            console.error(`Error fetching character details:`, err);
        })
})

router.post('/changeCampaign/', rejectUnauthenticated, (req, res) => {
    const sqlText = `UPDATE "character"
    SET "campaign" = $1
    WHERE "id" = $2`

    const sqlParams = [req.body.campaign_id, req.body.charID]

    pool.query(sqlText, sqlParams)
        .then((result) => {
            if (result.rowCount > 0) {
                res.sendStatus(200)
            } else {
                res.sendStatus(400)
            }
        })
        .catch((err) => {
            console.error('Error changing campaign:', err);
            res.sendStatus(400);
        })
})


module.exports = router