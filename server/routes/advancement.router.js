const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

const { rejectUnauthenticated } = require('../modules/authentication-middleware')
const { rejectNonAdmin } = require('../modules/rejectNonAdmin')

// eventually move all routes to do with editing sheet (e.g. shopping / spend XP / equip gear pagees) here

// Character Advancement Routes
// routes having to do with spending experience, equipping/unequipping gear and cyberware,
// and purchasing and selling gear and cyberware

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

router.put('/increaseAttribute', rejectUnauthenticated, (req, res) => {
    const whiteListColumn = ['strength', 'body', 'reflexes', 'appearance', 'cool', 'intelligence', 'willpower', 'technique', 'max_luck', 'temp_humanity_loss']
    let columnCheck = false;
    for (let i = 0; i < whiteListColumn.length; i++) {
        if (whiteListColumn[i] === req.body.attributeName) {
            columnCheck = true
        }
    }
    if (columnCheck === true) {
        const sqlText = `UPDATE "character" SET ${req.body.attributeName} = $1, spent_xp = $2 WHERE id = $3`
        const sqlParams = [req.body.newStat, req.body.newSpentXP, req.body.charID]
        pool.query(sqlText, sqlParams)
            .then(result => { res.sendStatus(200) })
            .catch(err => { console.log(`Error updating character Attribute:`, err); })
    } else {
        console.log(`Error changing attribute due to column validation failure. Column Check value:`, columnCheck);
        res.sendStatus(400)
    }

})

module.exports = router