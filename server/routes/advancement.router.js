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
        .then((result) => { res.send(result.rows); })
        .catch(err => { console.log(`Error fetching advancement character details:`, err); })
})

router.put('/changeStat', rejectUnauthenticated, (req, res) => {
    if (characterTableColumnCheck(req.body.statName) === true) {
        const sqlText = `UPDATE "character" SET ${req.body.statName} = $1, spent_xp = $2 WHERE id = $3`
        const sqlParams = [req.body.newValue, req.body.newSpentXP, req.body.charID]
        pool.query(sqlText, sqlParams)
            .then(result => { res.sendStatus(200); })
            .catch(err => { console.log(`Error updating character stat ${req.body.statName}:`, err); })
    }
    else {
        console.log(`Error changing attribute due to column validation failure. Column Check value:`, req.body.statName);
        res.sendStatus(400)
    }
})

router.put('/repairItem', rejectUnauthenticated, (req, res) => {
    if (repairCheck(req.body.table, req.body.columnName, req.body.tablePrimaryKey)) {
        const sqlText = `UPDATE ${req.body.table} SET ${req.body.columnName} = 0 WHERE ${req.body.tablePrimaryKey} = $1`
        const sqlParams = [req.body.tableID]
        pool.query(sqlText, sqlParams)
            .then(result => { res.sendStatus(200); })
            .catch(err => { console.log(`Error repairing item in table ${req.body.table} setting column ${req.body.columnName} to 0 at PK ${req.body.tablePrimaryKey} due to Error:`, err);})
    } else {
        console.log(`Error repairing item due to column/table validation failure. Table: ${req.body.table}, Column: ${req.body.columnName}, PK: ${req.body.tablePrimaryKey}`);
        res.sendStatus(400)
    }
})

router.put('/changeBank', rejectUnauthenticated, (req, res) => {
    const sqlText = `UPDATE "character" SET "bank" = $1 WHERE "id" = $2`
    const sqlParams = [req.body.newBank, req.body.charID]
    pool.query(sqlText, sqlParams)
    .then(result => { res.sendStatus(200);})
    .catch(err => { console.log(`Error changing character bank:`, err);})
})

// whitelist for incoming data to check against as express cannot parametize column names due to ' / " mismatch in javascript strings.
const characterTableColumnCheck = (statName) => {
    const whiteListColumn = ['strength', 'body', 'reflexes', 'appearance', 'cool',
        'intelligence', 'willpower', 'technique', 'max_luck', 'temp_humanity_loss',
        'athletics', 'brawling', 'concentration', 'evasion', 'fast_talk', 'firearms', 'legerdemain', 'melee_weapons', 'perception', 'streetwise',
        'demolitions', 'drive_land', 'drive_exotic', 'etiquette', 'exotic_weapons', 'heavy_weapons', 'performance', 'stealth', 'survival', 'tracking',
        'business', 'cryptography', 'cyber_tech', 'investigation', 'first_aid', 'paramed', 'gambling', 'language', 'military_tech', 'science', 'vehicle_tech',
        'medtech', 'maker', 'media', 'rockerboy', 'solo', 'netrunner', 'nomad', 'nomad_vehicle_slots',
        'is_paramedical', 'med_surgery', 'med_pharma', 'med_cryo',
        'maker_field', 'maker_upgrade', 'maker_fab', 'maker_invent', 'medtech_available', 'maker_available']
    for (let i = 0; i < whiteListColumn.length; i++) {
        if (whiteListColumn[i] === statName) {
            return true;
        }
    }
    return false;
}

const repairCheck = (table, column, pk) => {
    if (itemTableCheck(table) === true
        && itemColumnCheck(column) === true
        && itemPrimaryKeyCheck(pk) === true) {
        return true;
    } else {
        return false;
    }
}
const itemTableCheck = (tableName) => {
    const whiteListTable = ['char_armor_bridge', 'char_shield_bridge']
    for (let i = 0; i < whiteListTable.length; i++) {
        if (whiteListTable[i] === tableName) {
            return true
        }
    }
    return false;
}

const itemColumnCheck = (columnName) => {
    const whiteListColumn = ['this_armor_loss', 'this_shield_loss']
    for (let i = 0; i < whiteListColumn.length; i++) {
        if (whiteListColumn[i] === columnName) {
            return true
        }
    }
    return false;
}

const itemPrimaryKeyCheck = (columnName) => {
    const whiteListPK = ['armor_bridge_id', 'shield_bridge_id']
    for (let i = 0; i < whiteListPK.length; i++) {
        if (whiteListPK[i] === columnName) {
            return true
        }
    }
    return false;
}

module.exports = router