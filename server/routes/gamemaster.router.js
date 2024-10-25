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
            console.log(`Error fetching campaigns`, err);
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
            console.log(`Error Fetching characters:`, err);
        });
});

router.post('/fetchGamemasterCharacterDetail/', rejectUnauthenticated, (req, res) => {
    const sqlText = `SELECT * FROM "character"
    JOIN "campaigns" ON "character"."campaign" = "campaigns"."campaign_id"
    WHERE id = $1`
    pool.query(sqlText, [req.body.characterID])
        .then((result) => {
            // Crude security measure to prevent accessing unauthorized chars. disabled for the moment.
            // if (result.rows[0].user_id === req.user.id) {
            res.send(result.rows[0]);
            // } else {
            //     res.send(404)
            // }
        })
        .catch(err => {
            console.log(`Error fetching character details:`, err);
            res.send(400)
        })
})

// '/api/characters/fetchGameMasterCharacters'
// '/api/characters/fetchcampaigns'
'/api/characters/fetchGMCharacterDetails'


module.exports = router