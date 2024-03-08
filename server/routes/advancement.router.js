const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

const { rejectUnauthenticated } = require('../modules/authentication-middleware')
const { rejectNonAdmin } = require('../modules/rejectNonAdmin')

// Character Advancement Routes
// routes having to do with spending experience mainly.

router.get('/fetchAdvancementDetails/:id', rejectUnauthenticated, (req, res) => {
    const sqlText = `SELECT * FROM "character"
    JOIN "char_status" ON "char_status"."char_id" = "character"."id"
    JOIN "campaigns" ON "campaigns"."campaign_id" = "character"."campaign"
    WHERE id = $1`
    pool.query(sqlText, [req.params.id])
        .then((result) => {
            res.send(result.rows);
        })
        .catch(err => {
            console.log(`Error fetching advancement character details:`, err);
        })
})

router.put('/changeStat', rejectUnauthenticated, (req, res) => {
    if (columnCheck(req.body.statName) === true) {
        const sqlText = `UPDATE "character" SET ${req.body.statName} = $1, spent_xp = $2 WHERE id = $3`
        const sqlParams = [req.body.newValue, req.body.newSpentXP, req.body.charID]
        pool.query(sqlText, sqlParams)
            .then(result => { res.sendStatus(200) })
            .catch(err => { console.log(`Error updating character stat ${req.body.statName}:`, err); })
    }
    else {
        console.log(`Error changing attribute due to column validation failure. Column Check value:`, columnCheck);
        res.sendStatus(400)
    }
})

// whitelist for incoming data to check against as express cannot parametize column names due to ' / " mismatch in javascript strings.
const columnCheck = (statName) => {
    const whiteListColumn = ['strength', 'body', 'reflexes', 'appearance', 'cool',
        'intelligence', 'willpower', 'technique', 'max_luck', 'temp_humanity_loss',
        'athletics', 'brawling', 'concentration', 'evasion', 'fast_talk', 'firearms', 'legerdemain', 'melee_weapons', 'perception', 'streetwise',
        'demolitions', 'drive_land', 'drive_exotic', 'etiquette', 'exotic_weapons', 'heavy_weapons', 'performance', 'stealth', 'survival', 'tracking',
        'business', 'cryptography', 'cyber_tech', 'investigation', 'first_aid', 'paramed', 'gambling', 'language', 'military_tech', 'science', 'vehicle_tech']
    for (let i = 0; i < whiteListColumn.length; i++) {
        if (whiteListColumn[i] === statName) {
            return true;
        }
    }
    return false;
}

module.exports = router