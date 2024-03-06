const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

const { rejectUnauthenticated } = require('../modules/authentication-middleware')
const { rejectNonAdmin } = require('../modules/rejectNonAdmin')

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

// fetch characters list route
router.get('/fetchallcharacters', rejectUnauthenticated, (req, res) => {
    const sqlText = `SELECT id, handle, campaign, campaign_name
    FROM "character"
    JOIN "campaigns" ON "campaigns"."campaign_id" = "character"."campaign"
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

router.get('/fetchcharacterdetails/:id', rejectUnauthenticated, (req, res) => {
    const sqlText = `SELECT * FROM "character"
    JOIN "campaigns" ON "character"."campaign" = "campaigns"."campaign_id"
    WHERE id = $1`
    pool.query(sqlText, [req.params.id])
        .then((result) => {
            // Crude security measure to prevent accessing unauthorized chars. disabled for the moment.
            // if (result.rows[0].user_id === req.user.id) {
            res.send(result.rows);
            // } else {
            //     res.send(404)
            // }
        })
        .catch(err => {
            console.log(`Error fetching character details:`, err);
        })
})

// fetch equipped cyberware for in play character sheet.
router.get('/fetchcharactercyberdetails/:id', rejectUnauthenticated, (req, res) => {
    const sqlText = `SELECT * FROM "char_owned_cyberware"
    JOIN "cyberware_master" ON "cyberware_master"."cyberware_master_id" = "char_owned_cyberware"."cyberware_master_id"
    WHERE char_id = $1
    ORDER BY "name"`
    pool.query(sqlText, [req.params.id])
        .then((result) => {
            res.send(result.rows);
        })
        .catch(err => {
            console.log(`Error fetching character cyberware details`, err);
        })
})

// fetch char_status details for in play character sheet - initial, using char_id
router.get('/fetchcharacterstatus/:id', rejectUnauthenticated, (req, res) => {
    const sqlText = `SELECT * FROM "char_status"
    WHERE char_id = $1`
    pool.query(sqlText, [req.params.id])
        .then((result) => {
            res.send(result.rows);
        })
        .catch(err => {
            console.log(`Error fetching character status details`, err);
        })
})

// fetch char_status when changing health on in play sheet - non initial load, using char_status_id
router.get('/fetchcharacterstatusbystatusid/:id', rejectUnauthenticated, (req, res) => {
    const sqlText = `SELECT * FROM "char_status"
    WHERE char_status_id = $1`
    pool.query(sqlText, [req.params.id])
        .then((result) => {
            res.send(result.rows);
        })
        .catch(err => {
            console.log(`Error fetching character status details`, err);
        })
})

// fetch character armor & shields for in play sheet
router.get('/fetchcharacterarmor/:id', rejectUnauthenticated, (req, res) => {
    const sqlText = `SELECT * FROM "char_armor_bridge"
    JOIN "armor_master" ON "armor_master"."armor_master_id" = "char_armor_bridge"."armor_id"
    WHERE char_id = $1 AND equipped = true`
    pool.query(sqlText, [req.params.id])
        .then((result) => {
            res.send(result.rows);
        })
        .catch(err => {
            console.log(`Error fetching character armor details`, err);
        })
})

router.get('/fetchcharactershield/:id', rejectUnauthenticated, (req, res) => {
    const sqlText = `SELECT * FROM "char_shield_bridge"
    JOIN "shield_master" ON "shield_master"."shield_master_id" = "char_shield_bridge"."shield_id"
    WHERE char_id = $1 AND equipped = true`
    pool.query(sqlText, [req.params.id])
        .then((result) => {
            res.send(result.rows);
        })
        .catch(err => {
            console.log(`Error fetching character shield details`, err);
        })
})


// fetch character weapons for in play character sheet
router.get('/fetchcharacterweapons/:id', rejectUnauthenticated, (req, res) => {
    const sqlText = `SELECT * FROM "char_weapons_bridge"
    JOIN "weapon_master" ON "weapon_master".weapon_master_id = "char_weapons_bridge".weapon_id
    WHERE char_id = $1
    ORDER BY "damage" DESC
    `
    pool.query(sqlText, [req.params.id])
        .then((result) => {
            res.send(result.rows);
        })
        .catch(err => {
            console.log(`Error fetching character weapon details`, err);
        })
})

// fetch character grenades for in play character sheet
router.get('/fetchcharactergrenades/:id', rejectUnauthenticated, (req, res) => {
    const sqlText = `SELECT * FROM "char_grenade_bridge"
    JOIN "grenade_master" ON "grenade_master"."grenade_master_id" = "char_grenade_bridge"."grenade_id"
    WHERE char_id = $1
    ORDER BY "name" DESC`
    pool.query(sqlText, [req.params.id])
        .then((result) => {
            res.send(result.rows);
        })
        .catch(err => {
            console.log(`Error fetching character grenade details`, err);
        })
})

// fetch character misc gear for in play character sheet
router.get('/fetchCharacterMiscGear/:id', rejectUnauthenticated, (req, res) => {
    const sqlText = `SELECT * FROM "char_gear_bridge"
    JOIN "misc_gear_master" ON "misc_gear_master"."misc_gear_master_id" = "char_gear_bridge"."misc_gear_id"
    WHERE "char_id" = $1
    ORDER BY "name" ASC`
    pool.query(sqlText, [req.params.id])
        .then((result) => {
            res.send(result.rows);
        })
        .catch(err => {
            console.log(`Error fetching character misc gear details`, err);
        })
})

router.get('/fetchcharacterNetrunningGear/:id', rejectUnauthenticated, (req, res) => {
    const sqlText = `SELECT * FROM "netrunner_bridge"
    JOIN "netrunner_master" ON "netrunner_master"."netrunner_master_id" = "netrunner_bridge"."netrunner_master_id"
    WHERE "char_id" = $1
    ORDER BY "type" ASC, "attack" DESC`
    pool.query(sqlText, [req.params.id])
        .then((result) => {
            res.send(result.rows);
        })
        .catch(err => {
            console.log(`Error fetching character netrunning gear:`, err);
        })
})

router.get('/fetchcharacterVehicles/:id', rejectUnauthenticated, (req, res) => {
    const sqlText = `SELECT * FROM "char_vehicle_bridge"
    JOIN "vehicle_master" ON "vehicle_master"."vehicle_master_id" = "char_vehicle_bridge"."vehicle_id"
    WHERE char_id = $1`
    pool.query(sqlText, [req.params.id])
        .then((result) => {
            // result.rows.map(item => 
            // select details for mod1
            // change mod1 integer => retrieved details
            // repeat for 2 - 5

            res.send(result.rows);
        })
        .catch(err => {
            console.log(`Error fetching character vehicles:`, err);
        })
})

router.get('/characterActiveVehicleMods/:id', rejectUnauthenticated, (req, res) => {
    const sqlText = `SELECT * FROM "char_vehicle_mod_bridge"
    JOIN "char_owned_vehicle_mods" ON "char_owned_vehicle_mods"."char_owned_vehicle_mods_id" = "char_vehicle_mod_bridge"."char_owned_vehicle_mods_id"
    JOIN "vehicle_mod_master" ON "vehicle_mod_master".vehicle_mod_master_id = char_owned_vehicle_mods.vehicle_mod_master_id
    WHERE "char_id" = $1 AND "equipped" = true`
    pool.query(sqlText, [req.params.id])
        .then(result => {
            res.send(result.rows);
        })
        .catch(err => {
            console.log(`Error fetching character vehicle mods:`, err);
        })
})

// get character notes
router.get('/fetchCharacterNotes/:id', rejectUnauthenticated, (req, res) => {
    const sqlText = `SELECT * FROM char_notes
    WHERE char_id = $1
    ORDER BY "favorite" DESC, "char_note_id"`
    pool.query(sqlText, [req.params.id])
        .then(result => {
            res.send(result.rows);
        })
        .catch(err => {
            console.log(`Error fetching character notes:`, err);
        })
})

// get character contacts
router.get('/fetchCharacterContacts/:id', rejectUnauthenticated, (req, res) => {
    const sqlText = `SELECT * FROM char_contact_bridge
    JOIN "contact_master" ON "contact_master"."contact_master_id" = "char_contact_bridge"."contact_id"
    WHERE char_id = $1
    ORDER BY "name" ASC`
    pool.query(sqlText, [req.params.id])
        .then(result => {
            res.send(result.rows);
        })
        .catch(err => {
            console.log(`Error fetching character contacts:`, err);
        })
})

// use consumable from pack:
router.delete('/useConsumable/:id', rejectUnauthenticated, (req, res) => {
    const sqlText = `DELETE FROM "char_gear_bridge" WHERE "char_gear_bridge_id" = $1`
    const sqlParams = [req.params.id]
    pool.query(sqlText, sqlParams)
        .then((result) => {
            res.sendStatus(202)
        })
        .catch(err => {
            console.log(`Error using consumable:`, err);
        })
})

// use grenade from pack:
router.delete('/useGrenade/:id', rejectUnauthenticated, (req, res) => {
    const sqlText = `DELETE FROM "char_grenade_bridge" WHERE "grenade_bridge_id" = $1`
    const sqlParams = [req.params.id]
    pool.query(sqlText, sqlParams)
        .then((result) => {
            res.sendStatus(202)
        })
        .catch(err => {
            console.log(`Error using Grenade:`, err);
        })
})

// save changes made on in play character sheet.
router.put('/savecharacter/:id', rejectUnauthenticated, (req, res) => {
    const sqlText = `UPDATE "char_status"
    SET "current_stun" = $1, "current_lethal" = $2, "current_agg" = $3, "current_cyberware_armor_loss" = $4, "current_luck_loss" = $5
    WHERE "char_id" = $6;`
    const sqlParams = [req.body.current_stun, req.body.current_lethal, req.body.current_agg, req.body.current_cyberware_armor_loss, req.body.current_luck_loss, req.params.id]

    pool.query(sqlText, sqlParams)
        .then((result) => {
            res.sendStatus(202)
        })
        .catch(err => {
            console.log(`Error saving character status:`, err);
        })
})

router.put('/changeCharacterHealth/', rejectUnauthenticated, (req, res) => {
    const sqlText = `UPDATE "char_status"
    SET "current_stun" = $1, "current_lethal" = $2, "current_agg" = $3
    WHERE "char_status_id" = $4;`
    const sqlParams = [req.body.setStun, req.body.setLethal, req.body.setAgg, req.body.charStatusID]
    pool.query(sqlText, sqlParams)
        .then(result => { res.sendStatus(200); })
        .catch(err => { console.log(`Error updating character health:`, err);})
})

// save damage to armor / shield from in play sheet
router.put('/savecharacterarmor/:id', rejectUnauthenticated, (req, res) => {
    const sqlText = `UPDATE "char_armor_bridge"
    SET "this_armor_loss" = $1
    WHERE "armor_bridge_id" = $2`
    const sqlParams = [req.body.this_armor_loss, req.body.armor_bridge_id]
    pool.query(sqlText, sqlParams)
        .then(result => {
            res.sendStatus(202)
        })
        .catch(err => {
            console.log(`Error saving character Armor Details`, err);
        })
})

router.put('/savecharactershield/:id', rejectUnauthenticated, (req, res) => {
    const sqlText = `UPDATE "char_shield_bridge"
    SET "this_shield_loss" = $1
    WHERE "shield_bridge_id" = $2`
    const sqlParams = [req.body.this_shield_loss, req.body.shield_bridge_id]
    pool.query(sqlText, sqlParams)
        .then(result => {
            res.sendStatus(202)
        })
        .catch(err => {
            console.log(`Error saving character shield Details`, err);
        })
})

// save shots fired on in play character sheet.
router.put('/savecharacterweapons/:id', rejectUnauthenticated, (req, res) => {
    const sqlText = `UPDATE "char_weapons_bridge" 
    SET "current_shots_fired" = $1
    WHERE "weapon_bridge_id" = $2`

    if (req.body.length === 0) {
        res.sendStatus(202)
    } else {
        for (let i = 0; i < req.body.length; i++) {
            const sqlParams = [req.body[i].current_shots_fired, req.body[i].weapon_bridge_id]
            pool.query(sqlText, sqlParams)
                .catch(err => {
                    console.log(`Error saving weapons`, err);
                })
            if (i == req.body.length - 1) {
                res.sendStatus(202)
            }
        }
    }
})

// save vehicle health and armor damage
router.put('/savecharactervehicles/:id', rejectUnauthenticated, (req, res) => {
    const sqlText = `UPDATE "char_vehicle_bridge"
    SET "current_damage" = $1, "current_armor_damage" = $2
    WHERE "char_id" = $3`

    if (req.body.length === 0) {
        res.sendStatus(202)
    } else {
        for (let i = 0; i < req.body.length; i++) {
            const sqlParams = [req.body[i].current_damage, req.body[i].current_armor_damage, req.body[i].char_id]
            pool.query(sqlText, sqlParams)
                .catch(err => {
                    console.log(`Error saving vehicles`, err);
                })
            if (i == req.body.length - 1) {
                res.sendStatus(202)
            }
        }
    }
})

// handle permanent luck changes made by burning one luck.
router.put('/characterBurnOneLuck/:id', rejectUnauthenticated, (req, res) => {
    const sqlText = `UPDATE "character"
    SET "max_luck" = $1
    WHERE "id" = $2`

    const sqlParams = [(req.body.max_luck - 1), req.body.charID]

    pool.query(sqlText, sqlParams)
        .then((results) => {
            res.sendStatus(202)
        })
        .catch(err => {
            console.log(`Error burning one char luck:`, err);
        })
})

// create pharmaceutical compound
router.put('/charactercreatepharmaceutical/', rejectUnauthenticated, (req, res) => {
    const updateBankSqlText = `UPDATE "character" set "bank" = $1 WHERE "id" = $2`
    const bankSqlParams = [req.body.newBank, req.body.characterID]
    const updateMiscGearBridgeText = `INSERT INTO "char_gear_bridge" ("char_id", "misc_gear_id") VALUES ($1, $2)`
    const miscGearBridgeParams = [req.body.characterID, req.body.pharmaceutical.misc_gear_master_id]

    pool.query(updateBankSqlText, bankSqlParams)
        .then((results) => {
            for (let i = 0; i < req.body.doses; i++) {
                pool.query(updateMiscGearBridgeText, miscGearBridgeParams)
            }
            res.sendStatus(202)
        })
        .catch(err => {
            console.log(`Error creating new pharmaceuticals`, err);
        })
})

// save arbitrary in play bank changes (from backpack) 
router.put('/savecharacterbank/:id', rejectUnauthenticated, (req, res) => {
    const updateBankSqlText = `UPDATE "character" set "bank" = $1 WHERE "id" = $2`
    const bankSqlParams = [req.body.newBank, req.body.charID]
    pool.query(updateBankSqlText, bankSqlParams)
        .then(result => {
            res.sendStatus(200)
        })
        .catch(err => {
            console.log(`error arbitrarily updating bank:`, err);
        })
})

router.get('/fetchBank/:id', rejectUnauthenticated, (req, res) => {
    const sqlText = `SELECT "bank" from "character" WHERE "character"."id" = $1`
    const sqlParams = [req.params.id]
    pool.query(sqlText, sqlParams)
        .then(result => {
            res.send(result.rows[0])
        })
        .catch(err => {
            console.log(`error fetching bank:`, err);
        })
})

// create in play character note
router.post('/createCharacterNote/', rejectUnauthenticated, (req, res) => {
    const sqlText = `INSERT INTO char_notes ("char_id", "title", "body", "favorite")
    VALUES ($1, $2, $3, $4)`
    let noteFavBool;
    if (req.body.favorite != null) {
        noteFavBool = req.body.favorite;
    } else {
        noteFavBool = false;
    }
    const sqlParams = [req.body.char_id, req.body.title, req.body.body, noteFavBool]
    pool.query(sqlText, sqlParams)
        .then(result => {
            res.sendStatus(201)
        })
        .catch(err => {
            console.log(`error creating new note`, err);
        })
})

// save in play character note edit
router.put('/updateCharacterNote', rejectUnauthenticated, (req, res) => {
    const sqlText = `UPDATE "char_notes"
    SET "title" = $1, "body" = $2, "favorite" = $3
    WHERE "char_note_id" = $4`
    const sqlParams = [req.body.title, req.body.body, req.body.favorite, req.body.id]
    pool.query(sqlText, sqlParams)
        .then(result => {
            res.sendStatus(200)
        })
        .catch(err => {
            console.log(`Error updating note`, err);
        })
})

// delete in play character note
router.delete('/deleteCharacterNote/:id', rejectUnauthenticated, (req, res) => {
    const sqlText = `DELETE FROM "char_notes" WHERE "char_note_id" = $1`
    pool.query(sqlText, [req.params.id])
        .then(result => {
            res.sendStatus(200)
        })
        .catch(err => {
            console.log(`Error deleting note:`, err);
        })
})

// fetch GM contacts
router.get('/fetchgamemastercontacts/', rejectUnauthenticated, (req, res) => {
    const sqlText = `SELECT * FROM "contact_master"
    JOIN "campaigns" ON "campaigns"."campaign_id" = "contact_master"."campaign_id"
    ORDER BY "contact_master"."campaign_id" ASC, "name" ASC`
    pool.query(sqlText)
        .then((result) => {
            res.send(result.rows);
        })
        .catch(err => {
            console.log(`Error fetching GM master contact list:`, err);
        })
})

// contact updating - fetch all char ids and camp ids, 
// router.get('/fetchcharacteidandcampaignid', rejectUnauthenticated, (req, res) => {
//     const sqlText = `SELECT "id", "campaign" FROM "character"`
//     pool.query(sqlText)
//     .then((result) => {
//         res.send(result.rows);
//     })
//     .catch(err => {
//         console.log(`Error fetching id & campaign ID from character`);
//     })
// })

// fetch all char_contact_bridge data
router.get('/fetchgamemastercontactbridgedata', rejectUnauthenticated, (req, res) => {
    const sqlText = `SELECT * FROM "char_contact_bridge"`
    pool.query(sqlText)
        .then((result) => {
            res.send(result.rows);
        })
        .catch(err => {
            console.log(`Error fetching char_contact_bridge data`);
        })
})

// GM Insert contact into char_contact_bridge
router.post('/insertcharcontactbridge/', rejectUnauthenticated, (req, res) => {
    const sqlText = `INSERT INTO char_contact_bridge ("char_id", "contact_id", "loyalty", "notes")
    VALUES ($1, $2, $3, $4)`
    const sqlParams = [req.body.characterID, req.body.contactID, 0, 'Your notes here!']
    pool.query(sqlText, sqlParams)
        .then((result) => {
            res.sendStatus(201)
        })
        .catch(err => {
            console.log(`error inserting contact into char contact bridge`, err);
            console.log(`error is with char ID`, req.body.charID, `and contact id`, req.body.contactID);
        })
})

// GM Create Contact
router.post('/creategamemastercontact/', rejectUnauthenticated, (req, res) => {
    const sqlText = `INSERT INTO contact_master ("campaign_id", "name", "connection", "description")
    VALUES ($1, $2, $3, $4)`

    const sqlParams = [req.body.campaign_id, req.body.name, req.body.connection, req.body.description]
    pool.query(sqlText, sqlParams)
        .then(result => {
            res.sendStatus(201)
        })
        .catch(err => {
            console.log(`error creating new contact`, err);
        })
})

// GM update contact
router.put('/savegamemastercontact/:id', rejectUnauthenticated, (req, res) => {
    const sqlText = `UPDATE "contact_master"
    SET campaign_id = $1, name = $2, connection = $3, description = $4
    WHERE "contact_master_id" = $5`
    const sqlParams = [req.body.campaign_id, req.body.name, req.body.connection, req.body.description, req.body.contact_master_id]

    pool.query(sqlText, sqlParams)
        .then(result => {
            res.sendStatus(200)
        })
        .catch(err => {
            console.log(`error updating contact (GM):`, err);
        })
})

// gm delete contact
router.delete('/deletegamemastercontact/:id', rejectUnauthenticated, (req, res) => {
    const sqlText = `DELETE FROM "contact_master" WHERE "contact_master_id" = $1`
    pool.query(sqlText, [req.params.id])
        .then(result => {
            res.sendStatus(200)
        })
        .catch(err => {
            console.log(`Error deleting contact (GM)`, err);
        })
})

// save in play character contact loyalty/note edit.
router.put('/updateCharacterContact', rejectUnauthenticated, (req, res) => {
    const sqlText = `UPDATE "char_contact_bridge"
    SET "loyalty" = $1, "notes" = $2
    WHERE "char_contact_id" = $3`
    const sqlParams = [req.body.loyalty, req.body.notes, req.body.char_contact_id]
    pool.query(sqlText, sqlParams)
        .then(result => {
            res.sendStatus(200)
        })
        .catch(err => {
            console.log(`Error updating contact (player)`, err);
        })
})

// delete in play character contact - chars can't do this, needs GM route.
// router.delete('/deleteCharacterContact/:id', rejectUnauthenticated, (req, res) => {
//     const sqlText = `DELETE FROM "char_contacts" WHERE "char_contacts_id" = $1`
//     pool.query(sqlText, [req.params.id])
//         .then(result => {
//             res.sendStatus(200)
//         })
//         .catch(err => {
//             console.log(`Error deleting note:`, err);
//         })
// })

// Character Advancement Routes
// routes having to do with spending experience, equipping/unequipping gear and cyberware,
// and purchasing and selling gear and cyberware

// pulls stats and status for character, similar to in play sheet.
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

router.get('/fetchAdvancementStatus/:id', rejectUnauthenticated, (req, res) => {
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

// various gear fetches.
router.get('/fetchAdvancementArmor/:id', rejectUnauthenticated, (req, res) => {
    const sqlText = `SELECT * FROM "char_armor_bridge" 
    JOIN "armor_master" ON "armor_master"."armor_master_id" = "char_armor_bridge"."armor_id"
    WHERE char_id = $1`
    pool.query(sqlText, [req.params.id])
        .then((result) => {
            res.send(result.rows);
        })
        .catch(err => {
            console.log(`Error fetching owned armor details:`, err);
        })
})

router.get('/fetchAdvancementShield/:id', rejectUnauthenticated, (req, res) => {
    const sqlText = `SELECT * FROM "char_shield_bridge" 
    JOIN "shield_master" ON "shield_master"."shield_master_id" = "char_shield_bridge"."shield_id"
    WHERE char_id = $1`
    pool.query(sqlText, [req.params.id])
        .then((result) => {
            res.send(result.rows);
        })
        .catch(err => {
            console.log(`Error fetching equipped shield details:`, err);
        })
})

router.get('/fetchAdvancementWeapons/:id', rejectUnauthenticated, (req, res) => {
    const sqlText = `SELECT * FROM "char_weapons_bridge" 
    JOIN "weapon_master" ON "weapon_master"."weapon_master_id" = "char_weapons_bridge"."weapon_id"
    WHERE char_id = $1`
    pool.query(sqlText, [req.params.id])
        .then((result) => {
            res.send(result.rows);
        })
        .catch(err => {
            console.log(`Error fetching equipped weapon details:`, err);
        })
})

router.get('/fetchAdvancementGrenades/:id', rejectUnauthenticated, (req, res) => {
    const sqlText = `SELECT * FROM "char_grenade_bridge"
    JOIN "grenade_master" ON "grenade_master"."grenade_master_id" = "char_grenade_bridge"."grenade_id"
    WHERE "char_id" = $1`
    pool.query(sqlText, [req.params.id])
        .then((result) => {
            res.send(result.rows);
        })
        .catch(err => {
            console.log(`Error fetching owned grenade details:`, err)
        })
})

router.get('/fetchAdvancementGear/:id', rejectUnauthenticated, (req, res) => {
    const sqlText = `SELECT * FROM "char_gear_bridge" 
    JOIN "misc_gear_master" ON "misc_gear_master"."misc_gear_master_id" = "char_gear_bridge"."misc_gear_id"
    WHERE char_id = $1`
    pool.query(sqlText, [req.params.id])
        .then((result) => {
            res.send(result.rows);
        })
        .catch(err => {
            console.log(`Error fetching owned gear details:`, err);
        })
})

router.get('/fetchAdvancementMiscGear/:id', rejectUnauthenticated, (req, res) => {
    const sqlText = `SELECT * FROM "char_gear_bridge" 
    JOIN "misc_gear_master" ON "misc_gear_master"."misc_gear_master_id" = "char_gear_bridge"."misc_gear_id"
    WHERE char_id = $1`
    pool.query(sqlText, [req.params.id])
        .then((result) => {
            res.send(result.rows);
        })
        .catch(err => {
            console.log(`Error fetching owned gear details:`, err);
        })
})

router.get('/fetchAdvancementCyber/:id', rejectUnauthenticated, (req, res) => {
    const sqlText = `SELECT * FROM "char_owned_cyberware" 
    JOIN "cyberware_master" ON "cyberware_master"."cyberware_master_id" = "char_owned_cyberware"."cyberware_master_id"
    WHERE char_id = $1
    ORDER BY char_owned_cyberware."cyberware_master_id"`
    pool.query(sqlText, [req.params.id])
        .then((result) => {
            res.send(result.rows);
        })
        .catch(err => {
            console.log(`Error fetching owned cyberware details:`, err);
        })
})

router.get('/fetchAdvancementCyberSlots/:id', rejectUnauthenticated, (req, res) => {
    const sqlText = `SELECT * FROM "char_cyberware_bridge"
    WHERE char_id = $1`
    pool.query(sqlText, [req.params.id])
        .then((result) => {
            res.send(result.rows);
        })
        .catch(err => {
            console.log(`Error fetching owned cyberware details:`, err);
        })
})

router.get('/fetchNetrunnerGear/:id', rejectUnauthenticated, (req, res) => {
    const sqlText = `SELECT * FROM "netrunner_bridge"
    JOIN "netrunner_master" ON "netrunner_master"."netrunner_master_id" = "netrunner_bridge"."netrunner_master_id"
    WHERE char_id = $1
    ORDER BY "type" ASC`
    pool.query(sqlText, [req.params.id])
        .then((result) => {
            res.send(result.rows)
        })
        .catch(err => {
            console.log(`Error fetching advancement character netrunner gear details`, err);
        })
})

router.get('/fetchAdvancementVehicle/:id', rejectUnauthenticated, (req, res) => {
    const sqlText = `SELECT * FROM "char_vehicle_bridge"
    JOIN "vehicle_master" ON "vehicle_master"."vehicle_master_id" = "char_vehicle_bridge"."vehicle_id"
    WHERE char_id = $1
    ORDER BY "type" ASC`
    pool.query(sqlText, [req.params.id])
        .then((result) => {

            res.send(result.rows)
        })
        .catch(err => {
            console.log(`Error fetching advancement character vehicles:`, err);
        })
})

router.get('/fetchAdvancementVehicleMods/:id', rejectUnauthenticated, (req, res) => {
    const sqlText = `SELECT * FROM "char_owned_vehicle_mods"
    JOIN "vehicle_mod_master" ON "vehicle_mod_master"."vehicle_mod_master_id" = "char_owned_vehicle_mods"."vehicle_mod_master_id"
    WHERE char_id = $1
    ORDER BY "type"`
    pool.query(sqlText, [req.params.id])
        .then((result) => {
            res.send(result.rows)
        })
        .catch(err => {
            console.log(`Error fetching advancement owned vehicle mods:`, err);
        })
})

router.get('/fetchAdvancementActiveVehicleMods/:id', rejectUnauthenticated, (req, res) => {
    const sqlText = `SELECT * FROM "char_vehicle_mod_bridge"
    JOIN "char_owned_vehicle_mods" ON "char_owned_vehicle_mods"."char_owned_vehicle_mods_id" = "char_vehicle_mod_bridge"."char_owned_vehicle_mods_id"
    JOIN "vehicle_mod_master" ON "vehicle_mod_master".vehicle_mod_master_id = char_owned_vehicle_mods.vehicle_mod_master_id
    WHERE "char_id" = $1`
    pool.query(sqlText, [req.params.id])
        .then((result) => {
            res.send(result.rows)
        })
        .catch(err => {
            console.log(`Error fetching advancement character active vehicle mods`, err);
        })
})

router.get('/fetchAdvancementClothes/:id', rejectUnauthenticated, (req, res) => {
    const sqlText = `SELECT * from char_clothing_bridge
    JOIN "clothing_master" ON "clothing_master"."clothing_master_id" = "char_clothing_bridge"."clothing_id"
    WHERE char_id = $1`
    pool.query(sqlText, [req.params.id])
        .then(result => {
            res.send(result.rows);
        })
        .catch(err => {
            console.log(`Error fetching character clothing.`);
        })
})

// fetch advancement armor

// fetch advancement shield

// advancement save route
// big one is to update the character stats, skills, and such.
router.put('/saveAdvancementCharacter/:id', rejectUnauthenticated, (req, res) => {
    const rb = req.body.char
    const charSqlText = `UPDATE "character"
    SET  "is_paramedical" = $1,
    "strength" = $2, "body" = $3, "reflexes" = $4, "appearance" = $5, "cool" = $6, "street_cred" = $7, "intelligence" = $8, "willpower" = $9, "technique" = $10,
    "athletics" = $11, "brawling" = $12, "concentration" = $13, "evasion" = $14, "fast_talk" = $15, "firearms" = $16, "legerdemain" = $17, "melee_weapons" = $18, "perception" = $19, "streetwise" = $20,
    "demolitions" = $21, "drive_land" = $22, "drive_exotic" = $23, "etiquette" = $24, "exotic_weapons" = $25, "heavy_weapons" = $26, "performance" = $27, "stealth" = $28, "survival" = $29, "tracking" = $30,
    "business" = $31, "cryptography" = $32, "cyber_tech" = $33, "first_aid" = $34, "paramed" = $35, "investigation" = $36, "gambling" = $37, "language" = $38, "military_tech" = $39, "science" = $40, "vehicle_tech" = $41,
    "rockerboy" = $42, "solo" = $43, "netrunner" = $44, "nomad" = $45, "media" = $46, "medtech" = $47, "med_surgery" = $48, "med_pharma" = $49, "med_cryo" = $50,
    "maker" = $51, "maker_field" = $52, "maker_upgrade" = $53, "maker_fab" = $54, "maker_invent" = $55,
    "perm_humanity_loss" = $56, "temp_humanity_loss" = $57, "max_luck" = $58, "max_xp" = $59, "spent_xp" = $60, "bank" = $61,
    "cyber_strength" = $62, "cyber_body" = $63, "cyber_reflexes" = $64, "cyber_appearance" = $65, "cyber_cool" = $66, "cyber_intelligence" = $67,
    "cyberdeck_slots" = $68, "nomad_vehicle_slots" = $69
    WHERE id = $70`

    const charParams = [rb.is_paramedical,
    rb.strength, rb.body, rb.reflexes, rb.appearance, rb.cool, rb.street_cred, rb.intelligence, rb.willpower, rb.technique,
    rb.athletics, rb.brawling, rb.concentration, rb.evasion, rb.fast_talk, rb.firearms, rb.legerdemain, rb.melee_weapons, rb.perception, rb.streetwise,
    rb.demolitions, rb.drive_land, rb.drive_exotic, rb.etiquette, rb.exotic_weapons, rb.heavy_weapons, rb.performance, rb.stealth, rb.survival, rb.tracking,
    rb.business, rb.cryptography, rb.cyber_tech, rb.first_aid, rb.paramed, rb.investigation, rb.gambling, rb.language, rb.military_tech, rb.science, rb.vehicle_tech,
    rb.rockerboy, rb.solo, rb.netrunner, rb.nomad, rb.media, rb.medtech, rb.med_surgery, rb.med_pharma, rb.med_cryo,
    rb.maker, rb.maker_field, rb.maker_upgrade, rb.maker_fab, rb.maker_invent, rb.perm_humanity_loss, rb.temp_humanity_loss, rb.max_luck, rb.max_xp, rb.spent_xp, rb.bank,
    rb.cyber_strength, rb.cyber_body, rb.cyber_reflexes, rb.cyber_appearance, rb.cyber_cool, rb.cyber_intelligence,
    rb.cyberdeck_slots, rb.nomad_vehicle_slots,
    rb.char_id]

    pool.query(charSqlText, charParams)
        .then(result => {
            // query to save character status!
            const charStatusSqlText = `UPDATE "char_status"
        SET "current_armor_quality"= $1, "current_shield_quality" = $2, "current_cyberware_armor_quality" = $3, "current_cyberware_health_boxes" = $4, "current_cyberware_armor_loss" = $5
        WHERE char_status_id = $6`

            const charStatusParams = [req.body.gear.totalArmorQuality, req.body.gear.totalShieldQuality, req.body.gear.totalCyberwareArmorQuality, req.body.gear.totalCyberwareHealthBoxesCreated, rb.current_cyberware_armor_loss, rb.char_status_id]
            pool.query(charStatusSqlText, charStatusParams)
        })
        .then(result => {
            // change armor mod, equipped status
            const armor = req.body.gear.armor
            const armorSqlText = `UPDATE "char_armor_bridge"
            SET "equipped" = $1, "this_armor_loss" = $2
            WHERE armor_bridge_id = $3`

            for (let i = 0; i < armor.length; i++) {
                const armorSqlParams = [armor[i].equipped, armor[i].this_armor_loss, armor[i].armor_bridge_id]
                pool.query(armorSqlText, armorSqlParams)
            }

            // change shield mod, equipped status
            const shield = req.body.gear.shield
            const shieldSqlText = `UPDATE "char_shield_bridge"
            SET "equipped" = $1, "this_shield_loss" = $2
            WHERE shield_bridge_id = $3`

            for (let i = 0; i < shield.length; i++) {
                const shieldSqlParams = [shield[i].equipped, shield[i].this_shield_loss, shield[i].shield_bridge_id]
                pool.query(shieldSqlText, shieldSqlParams)
            }

            // change weapon details
            const weapons = req.body.gear.weapons
            const weaponsSqlText = `UPDATE "char_weapons_bridge"
            SET "current_shots_fired" = $1, "equipped" = $2
            WHERE weapon_bridge_id = $3`

            for (let i = 0; i < weapons.length; i++) {
                const weaponSqlParams = [weapons[i].current_shots_fired, weapons[i].equipped, weapons[i].weapon_bridge_id]
                pool.query(weaponsSqlText, weaponSqlParams)
            }

            // change cyberware details
            const cyberware = req.body.gear.cyberware
            const cyberwareSqlText = `UPDATE "char_owned_cyberware"
            SET "equipped" = $1
            WHERE owned_cyberware_id = $2`

            for (let i = 0; i < cyberware.length; i++) {
                const cyberwareSqlParams = [cyberware[i].equipped, cyberware[i].owned_cyberware_id]
                pool.query(cyberwareSqlText, cyberwareSqlParams)
            }

            // change slot details
            const cyberwareSlots = req.body.gear.cyberwareSlots
            const cyberwareSlotsSqlText = `UPDATE "char_cyberware_bridge"
            SET "fashionware_slots" = $1, "neuralware_slots" = $2, "cyberoptic_slots" = $3, 
            "cyberaudio_slots" = $4, "internalware_slots" = $5, "externalware_slots" = $6, 
            "cyberarm_slots" = $7, "cyberleg_slots" = $8
            WHERE "cyberware_bridge_id" = $9`
            const cyberwareSlotsSqlParams = [cyberwareSlots.fashionware_slots, cyberwareSlots.neuralware_slots, cyberwareSlots.cyberoptic_slots,
            cyberwareSlots.cyberaudio_slots, cyberwareSlots.internalware_slots, cyberwareSlots.externalware_slots,
            cyberwareSlots.cyberarm_slots, cyberwareSlots.cyberleg_slots, cyberwareSlots.cyberware_bridge_id]
            pool.query(cyberwareSlotsSqlText, cyberwareSlotsSqlParams)

            // update clothing - rank changes and equipping.
            const clothing = req.body.gear.clothes
            const clothingSqlText = `UPDATE "char_clothing_bridge"
            SET "rank" = $1, equipped = $2
            WHERE clothing_bridge_id = $3`
            for (let i = 0; i < clothing.length; i++) {
                const clothingSqlParams = [clothing[i].rank, clothing[i].equipped, clothing[i].clothing_bridge_id]
                pool.query(clothingSqlText, clothingSqlParams)
            }


            // change netrunner gear details:
            const netrunnerGear = req.body.gear.netrunnerGear
            const netrunnerGearSqlText = `UPDATE "netrunner_bridge"
            SET "equipped" = $1
            WHERE "netrunner_bridge_id" = $2`

            for (let i = 0; i < netrunnerGear.length; i++) {
                const netrunnerGearSqlParams = [netrunnerGear[i].equipped, netrunnerGear[i].netrunner_bridge_id]
                pool.query(netrunnerGearSqlText, netrunnerGearSqlParams)
            }

            // change vehicle mod status
            const removedMods = req.body.mods.removedVehicleMods
            const equippedMods = req.body.mods.addedVehicleMods
            if (removedMods.length > 0 || equippedMods.length > 0) {
                for (let i = 0; i < removedMods.length; i++) {
                    // remove row from bridge
                    const removeEquippedModsSqlText = `DELETE FROM "char_vehicle_mod_bridge" WHERE "char_vehicle_mod_bridge_id" = $1`
                    const removeEquippedModsParams = [removedMods[i].char_vehicle_mod_bridge_id]

                    // update owned mod to read false on equpped
                    const updateRemovedOwnedModSqlText = `UPDATE "char_owned_vehicle_mods" SET "equipped" = false WHERE "char_owned_vehicle_mods_id" = $1`
                    const updateRemovedOwnedModsParams = [removedMods[i].char_owned_vehicle_mods_id]

                    // update vehicle cost and other factors (subtraction)
                    if (removedMods[i].name === 'Armored') {
                        const updateVehicleArmorSqlText = `UPDATE "char_vehicle_bridge" SET "total_mod_cost" = "total_mod_cost" - $1, "has_armor" = false WHERE "vehicle_bridge_id" = $2`
                        const updatedVehicleArmorParams = [(removedMods[i].price / 4), removedMods[i].vehicle_bridge_id]
                        pool.query(updateVehicleArmorSqlText, updatedVehicleArmorParams)

                    } else if (removedMods[i].name === 'Seating Upgrade') {
                        const updateVehicleSeatSqlText = `UPDATE "char_vehicle_bridge" SET "total_mod_cost" = "total_mod_cost" - $1, "extra_seats" = "extra_seats" - 1 WHERE "vehicle_bridge_id" = $2`
                        const updatedVehicleArmorParams = [(removedMods[i].price / 4), removedMods[i].vehicle_bridge_id]
                        pool.query(updateVehicleSeatSqlText, updatedVehicleArmorParams)

                    } else {
                        const updateVehicleBridgeItemCostSqlText = `UPDATE "char_vehicle_bridge" SET "total_mod_cost" = "total_mod_cost" - $1 WHERE "vehicle_bridge_id" = $2`
                        const updateVehicleBridgeItemCostParams = [(removedMods[i].price / 4), removedMods[i].vehicle_bridge_id]
                        pool.query(updateVehicleBridgeItemCostSqlText, updateVehicleBridgeItemCostParams)

                    }
                    pool.query(removeEquippedModsSqlText, removeEquippedModsParams)
                        .then(
                            pool.query(updateRemovedOwnedModSqlText, updateRemovedOwnedModsParams)
                        )
                }
                if (equippedMods.length > 0) {
                    for (let i = 0; i < equippedMods.length; i++) {
                        // inverse of above - adds row to bridge; updates owned to true, and updates vehicle cost (as addition)
                        const insertEquippedModSqlText = `INSERT INTO "char_vehicle_mod_bridge" ("vehicle_bridge_id", "char_owned_vehicle_mods_id")
                    VALUES ($1, $2)`
                        const insertEquippedModParams = [equippedMods[i].vehicle_bridge_id, equippedMods[i].char_owned_vehicle_mods_id]

                        const updateOwnedModSqlText = `UPDATE "char_owned_vehicle_mods" SET "equipped" = true WHERE "char_owned_vehicle_mods_id" = $1`
                        const updateOwnedModsParams = [equippedMods[i].char_owned_vehicle_mods_id]

                        if (equippedMods[i].name === 'Armored') {
                            const updateVehicleArmorSqlText = `UPDATE "char_vehicle_bridge" SET "total_mod_cost" = "total_mod_cost" + $1, "has_armor" = true WHERE "vehicle_bridge_id" = $2`
                            const updatedVehicleArmorParams = [(equippedMods[i].price / 4), equippedMods[i].vehicle_bridge_id]
                            pool.query(updateVehicleArmorSqlText, updatedVehicleArmorParams)

                        } else if (equippedMods[i].name === 'Seating Upgrade') {
                            const updateVehicleSeatSqlText = `UPDATE "char_vehicle_bridge" SET "total_mod_cost" = "total_mod_cost" + $1, "extra_seats" = "extra_seats" + 1 WHERE "vehicle_bridge_id" = $2`
                            const updatedVehicleArmorParams = [(equippedMods[i].price / 4), equippedMods[i].vehicle_bridge_id]
                            pool.query(updateVehicleSeatSqlText, updatedVehicleArmorParams)

                        } else {
                            const updateVehicleBridgeItemCostSqlText = `UPDATE "char_vehicle_bridge" SET "total_mod_cost" = "total_mod_cost" + $1 WHERE "vehicle_bridge_id" = $2`
                            const updateVehicleBridgeItemCostParams = [(equippedMods[i].price / 4), equippedMods[i].vehicle_bridge_id]
                            pool.query(updateVehicleBridgeItemCostSqlText, updateVehicleBridgeItemCostParams)
                        }
                        pool.query(insertEquippedModSqlText, insertEquippedModParams)
                            .then(
                                pool.query(updateOwnedModSqlText, updateOwnedModsParams)
                            )
                    }
                }
            }



            // SHOPPING
            // armor: loop through soldArmor array, perform delete command on each
            const soldArmor = req.body.gear.soldArmor
            if (soldArmor.length > 0) {
                const soldArmorSqlText = `DELETE FROM "char_armor_bridge" WHERE "armor_bridge_id" = $1`
                for (let i = 0; i < soldArmor.length; i++) {
                    const soldArmorSqlParams = [soldArmor[i].armor_bridge_id]
                    pool.query(soldArmorSqlText, soldArmorSqlParams)
                }
            }

            // loop through boughtArmor array, perform post on each.
            const boughtArmor = req.body.gear.boughtArmor
            if (boughtArmor.length > 0) {
                const boughtArmorSqlText = `INSERT INTO "char_armor_bridge" ("char_id", "armor_id", "this_armor_loss", "equipped")
            VALUES ($1, $2, $3, $4);`
                for (let i = 0; i < boughtArmor.length; i++) {
                    const boughtArmorParams = [req.body.char.id, boughtArmor[i].armor_master_id, 0, false]
                    pool.query(boughtArmorSqlText, boughtArmorParams)
                }
            }

            const soldShield = req.body.gear.soldShield
            if (soldShield.length > 0) {
                const soldShieldSqlText = `DELETE FROM "char_shield_bridge" WHERE "shield_bridge_id" = $1`
                for (let i = 0; i < soldShield.length; i++) {
                    const soldShieldParams = [soldShield[i].shield_bridge_id]
                    pool.query(soldShieldSqlText, soldShieldParams)
                }
            }
            const boughtShield = req.body.gear.boughtShield
            if (boughtShield.length > 0) {
                const boughtShieldSqlText = `INSERT INTO "char_shield_bridge" ("char_id", "shield_id", "this_shield_loss", "equipped")
            VALUES ($1, $2, $3, $4);`
                for (let i = 0; i < boughtShield.length; i++) {
                    const boughtShieldParams = [req.body.char.id, boughtShield[i].shield_master_id, 0, false]
                    pool.query(boughtShieldSqlText, boughtShieldParams)
                }
            }

            // loop through bought weapons, perform delete/post on each as appropriate
            const soldWeapons = req.body.gear.soldWeapons
            if (soldWeapons.length > 0) {
                const soldWeaponsSqlText = `DELETE FROM "char_weapons_bridge" WHERE "weapon_bridge_id" = $1`
                for (let i = 0; i < soldWeapons.length; i++) {
                    const soldWeaponsParams = [soldWeapons[i].weapon_bridge_id]
                    pool.query(soldWeaponsSqlText, soldWeaponsParams)
                }
            }

            const boughtWeapons = req.body.gear.boughtWeapons
            if (boughtWeapons.length > 0) {
                const boughtWeaponsSqlText = `INSERT INTO "char_weapons_bridge" ("char_id", "weapon_id", "current_shots_fired", "equipped")
            VALUES ($1, $2, $3, $4, $5, $6);`
                for (let i = 0; i < boughtWeapons.length; i++) {
                    const boughtWeaponsParams = [req.body.char.id, boughtWeapons[i].weapon_master_id, 0, false]
                    pool.query(boughtWeaponsSqlText, boughtWeaponsParams)
                }
            }

            // loop through bought/sold grenades, perform delete/post on each
            const soldGrenades = req.body.gear.soldGrenades
            if (soldGrenades.length > 0) {
                const soldGrenadeSqlText = `DELETE FROM "char_grenade_bridge" WHERE "grenade_bridge_id" = $1`
                for (let i = 0; i < soldGrenades.length; i++) {
                    const soldGrenadesParams = [soldGrenades[i].grenade_bridge_id]
                    pool.query(soldGrenadeSqlText, soldGrenadesParams)
                }
            }

            const boughtGrenades = req.body.gear.boughtGrenades
            if (boughtGrenades.length > 0) {
                const boughtGrenadeSqlText = `INSERT INTO "char_grenade_bridge" ("char_id", "grenade_id")
                VALUES ($1, $2);`
                for (let i = 0; i < boughtGrenades.length; i++) {
                    const boughtGrenadesParams = [req.body.char.id, boughtGrenades[i].grenade_master_id]
                    pool.query(boughtGrenadeSqlText, boughtGrenadesParams)
                }
            }

            // loop through misc gear, perform delete/post on each as needed
            const soldMiscGear = req.body.gear.soldMiscGear
            if (soldMiscGear.length > 0) {
                const soldMiscGearSqlText = `DELETE FROM "char_gear_bridge" where "char_gear_bridge_id" = $1`
                for (let i = 0; i < soldMiscGear.length; i++) {
                    const soldMiscGearParams = [soldMiscGear[i].char_gear_bridge_id]
                    pool.query(soldMiscGearSqlText, soldMiscGearParams)
                }
            }

            const boughtMiscGear = req.body.gear.boughtMiscGear
            if (boughtMiscGear.length > 0) {
                const boughtMiscGearSqlText = `INSERT INTO "char_gear_bridge" ("char_id", "misc_gear_id") 
            VALUES ($1, $2)`
                for (let i = 0; i < boughtMiscGear.length; i++) {
                    const boughtMiscGearParams = [req.body.char.id, boughtMiscGear[i].misc_gear_master_id]
                    pool.query(boughtMiscGearSqlText, boughtMiscGearParams)
                }
            }

            const soldClothes = req.body.gear.soldClothes

            if (soldClothes.length > 0) {
                const soldClothesSqlText = `DELETE FROM "char_clothing_bridge" WHERE "clothing_bridge_id" = $1`
                for (let i = 0; i < soldClothes.length; i++) {
                    const soldClothesParams = [soldClothes[i].clothing_bridge_id]
                    pool.query(soldClothesSqlText, soldClothesParams)
                }
            }

            const boughtClothes = req.body.gear.boughtClothes
            if (boughtClothes.length > 0) {
                const boughtClothesSqlText = `INSERT INTO "char_clothing_bridge" ("char_id", "clothing_id", "rank") VALUES ($1, $2, $3)`
                for (let i = 0; i < boughtClothes.length; i++) {
                    const boughtClothesParams = [req.body.char.id, boughtClothes[i].clothing_master_id, boughtClothes[i].rank]
                    pool.query(boughtClothesSqlText, boughtClothesParams)
                }
            }

            const soldNetrunnerGear = req.body.gear.soldNetrunnerGear
            if (soldNetrunnerGear.length > 0) {
                const soldNetrunnerGearSqlText = `DELETE FROM "netrunner_bridge" where "netrunner_bridge_id" = $1`
                for (let i = 0; i < soldNetrunnerGear.length; i++) {
                    const soldNetrunnerGearParams = [soldNetrunnerGear[i].netrunner_bridge_id]
                    pool.query(soldNetrunnerGearSqlText, soldNetrunnerGearParams)
                }
            }

            const boughtNetrunnerGear = req.body.gear.boughtNetrunnerGear
            if (boughtNetrunnerGear.length > 0) {
                const boughtNetrunnerGearSqlText = `INSERT INTO "netrunner_bridge" ("char_id", "netrunner_master_id") 
            VALUES ($1, $2)`
                for (let i = 0; i < boughtNetrunnerGear.length; i++) {

                    const boughtNetrunnerGearParams = [req.body.char.id, boughtNetrunnerGear[i].netrunner_master_id]
                    pool.query(boughtNetrunnerGearSqlText, boughtNetrunnerGearParams)
                }
            }

            const soldVehicles = req.body.gear.soldVehicles
            if (soldVehicles.length > 0) {
                const soldVehicleSqlText = `DELETE FROM "char_vehicle_bridge" WHERE "vehicle_bridge_id" = $1`
                for (let i = 0; i < soldVehicles.length; i++) {
                    const soldVehicleParams = [soldVehicles[i].vehicle_bridge_id]
                    pool.query(soldVehicleSqlText, soldVehicleParams)
                }
            }

            const boughtVehicles = req.body.gear.boughtVehicles
            if (boughtVehicles.length > 0) {
                const boughtVehiclesSqlText = `INSERT INTO "char_vehicle_bridge" ("char_id", "vehicle_id")
            VALUES ($1, $2);`
                for (let i = 0; i < boughtVehicles.length; i++) {
                    const boughtVehiclesParmas = [req.body.char.id, boughtVehicles[i].vehicle_master_id]
                    pool.query(boughtVehiclesSqlText, boughtVehiclesParmas)
                }
            }

            const soldVehicleMods = req.body.gear.soldVehicleMods
            if (soldVehicleMods.length > 0) {
                const soldVehicleModSqlText = `DELETE FROM "char_owned_vehicle_mods" WHERE "char_owned_vehicle_mods_id" = $1`
                for (let i = 0; i < soldVehicleMods.length; i++) {
                    const soldVehicleModsParams = [soldVehicleMods[i].char_owned_vehicle_mods_id]
                    pool.query(soldVehicleModSqlText, soldVehicleModsParams)
                }
            }

            const boughtVehicleMods = req.body.gear.boughtVehicleMods
            if (boughtVehicleMods.length > 0) {
                const boughtVehicleModsSqlText = `INSERT INTO "char_owned_vehicle_mods" ("char_id", "vehicle_mod_master_id")
            VALUES ($1, $2);`
                for (let i = 0; i < boughtVehicleMods.length; i++) {
                    const boughtVehicleModsParams = [req.body.char.id, boughtVehicleMods[i].vehicle_mod_master_id]
                    pool.query(boughtVehicleModsSqlText, boughtVehicleModsParams)
                }
            }

            const soldCyberware = req.body.gear.soldCyberware
            if (soldCyberware.length > 0) {
                const soldCyberwareSqlText = `DELETE FROM "char_owned_cyberware" where "owned_cyberware_id" = $1`
                for (let i = 0; i < soldCyberware.length; i++) {
                    const soldCyberwareParams = [soldCyberware[i].owned_cyberware_id]
                    pool.query(soldCyberwareSqlText, soldCyberwareParams)
                }
            }

            const boughtCyberware = req.body.gear.boughtCyberware
            if (boughtCyberware.length > 0) {
                const boughtCyberwareSqlText = `INSERT INTO "char_owned_cyberware" ("char_id", "cyberware_master_id") 
            VALUES ($1, $2)`
                for (let i = 0; i < boughtCyberware.length; i++) {
                    const boughtCyberwareParams = [req.body.char.id, boughtCyberware[i].cyberware_master_id]
                    pool.query(boughtCyberwareSqlText, boughtCyberwareParams)
                }
            }

        })
        .then((result) => {
            res.sendStatus(201)
        })
        .catch(err => {
            console.log(`Error saving advancement character,`, err);
        })

})

router.put('/attributeGearChangeStrength/:id', rejectUnauthenticated, (req, res) => {
    const sqlText = `UPDATE character SET cyber_strength = (SELECT "cyber_strength" FROM "character" WHERE "character".id = $1) + $2 where "character"."id" = $1;`
    const sqlParams = [req.body.charID, req.body.change]

    pool.query(sqlText, sqlParams)
        .then(result => { res.sendStatus(201) })
        .catch(err => { console.log(`Error updating character cyber strength`, err); })
})

router.put('/attributeGearChangeBody/:id', rejectUnauthenticated, (req, res) => {
    const sqlText = `UPDATE character SET cyber_body = (SELECT "cyber_body" FROM "character" WHERE "character".id = $1) + $2 where "character"."id" = $1;`
    const sqlParams = [req.body.charID, req.body.change]

    pool.query(sqlText, sqlParams)
        .then(result => { res.sendStatus(201) })
        .catch(err => { console.log(`Error updating character cyber body`, err); })
})

router.put('/attributeGearChangeReflexes/:id', rejectUnauthenticated, (req, res) => {
    const sqlText = `UPDATE character SET cyber_reflexes = (SELECT "cyber_reflexes" FROM "character" WHERE "character".id = $1) + $2 where "character"."id" = $1;`
    const sqlParams = [req.body.charID, req.body.change]

    pool.query(sqlText, sqlParams)
        .then(result => { res.sendStatus(201) })
        .catch(err => { console.log(`Error updating character cyber reflexes`, err); })
})

router.put('/attributeGearChangeAppearance/:id', rejectUnauthenticated, (req, res) => {
    const sqlText = `UPDATE character SET cyber_appearance = (SELECT "cyber_appearance" FROM "character" WHERE "character".id = $1) + $2 where "character"."id" = $1;`
    const sqlParams = [req.body.charID, req.body.change]

    pool.query(sqlText, sqlParams)
        .then(result => { res.sendStatus(201) })
        .catch(err => { console.log(`Error updating character cyber appearance`, err); })
})

router.put('/attributeGearChangeCool/:id', rejectUnauthenticated, (req, res) => {
    const sqlText = `UPDATE character SET cyber_cool = (SELECT "cyber_cool" FROM "character" WHERE "character".id = $1) + $2 where "character"."id" = $1;`
    const sqlParams = [req.body.charID, req.body.change]

    pool.query(sqlText, sqlParams)
        .then(result => { res.sendStatus(201) })
        .catch(err => { console.log(`Error updating character cyber cool`, err); })
})

// allows string literal in insert statement while removing SQL Injection possibility (hopefully)
const whiteListTable = ['char_armor_bridge', 'char_shield_bridge', 'char_weapons_bridge', 'char_clothing_bridge']
const whiteListPKs = ['armor_bridge_id', 'shield_bridge_id', 'weapon_bridge_id', 'clothing_bridge_id']

router.put('/changeEquipStatus/:id', rejectUnauthenticated, (req, res) => {
    let tableCheck = false
    let pkCheck = false
    for (let i = 0; i < whiteListTable.length; i++) {
        if (whiteListTable[i] === req.body.table) {
            tableCheck = true
        }
    }
    for (let j = 0; j < whiteListPKs.length; j++) {
        if (whiteListPKs[j] === req.body.tablePrimaryKey) {
            pkCheck = true
        }
    }

    if (tableCheck === true
        &&
        pkCheck === true
        &&
        req.body.equipStatus === true || req.body.equipStatus === false) {
        const table = req.body.table
        const equipStatus = req.body.equipStatus
        const tablePrimaryKey = req.body.tablePrimaryKey
        const sqlText = `update ${table} SET "equipped" = ${equipStatus} WHERE ${tablePrimaryKey} = $1`
        pool.query(sqlText, [req.params.id])
            .then(result => { res.sendStatus(201); })
            .catch(err => { console.log(`Error changing char equipment status:`, err); })
    } else {
        console.log(`Failure to change equip status due to failing check/equipstatus. Table: ${tableCheck}, PK: ${pkCheck}`);
    }
})

router.put('/changeCharacterArmorQuality/:id', rejectUnauthenticated, (req, res) => {
    const sqlText = `UPDATE "char_status" SET "current_armor_quality" = $1 WHERE "char_id" = $2`
    const sqlParams = [req.body.quality, req.params.id]
    pool.query(sqlText, sqlParams)
        .then(result => { res.sendStatus(201); })
        .catch(err => { console.log(`Error altering character armor quality:`, err); })
})

router.put('/removeCharacterArmor/:id', rejectUnauthenticated, (req, res) => {
    console.log(`removing char armor`);
    const sqlText = `UPDATE "char_status" SET "current_armor_quality" = 0 WHERE "char_id" = $1`
    pool.query(sqlText, [req.params.id])
        .then(result => { res.sendStatus(201); })
        .catch(err => { console.log(`Error resetting character current armor quality:`, err); })
})

router.put('/changeCharacterShieldQuality/:id', rejectUnauthenticated, (req, res) => {
    const sqlText = `UPDATE "char_status" SET "current_shield_quality" = $1 WHERE "char_id" = $2`
    const sqlParams = [req.body.quality, req.params.id]
    pool.query(sqlText, sqlParams)
        .then(result => { res.sendStatus(201); })
        .catch(err => { console.log(`Error altering character shield quality:`, err); })
})

router.put('/removeCharacterShield/:id', rejectUnauthenticated, (req, res) => {
    const sqlText = `UPDATE "char_status" SET "current_shield_quality" = 0 WHERE "char_id" = $1`
    pool.query(sqlText, [req.params.id])
        .then(result => { res.sendStatus(201); })
        .catch(err => { console.log(`Error resetting character current shield quality:`, err); })
})

router.put('/characteralterclothing/:id', rejectUnauthenticated, (req, res) => {
    const sqlText = `UPDATE "char_clothing_bridge" SET "rank" = $1 WHERE "clothing_bridge_id" = $2`
    const sqlParams = [req.body.newRank, req.params.id]
    pool.query(sqlText, sqlParams)
        .then(result => { res.sendStatus(201); })
        .catch(err => { console.log(`Error improving character clothing:`, err); })
})


// Creation save route(s)
router.post('/saveCreationCharacter/', rejectUnauthenticated, (req, res) => {
    const rb = req.body
    const charSqlText = `INSERT INTO "character" (
		"user_id","handle","player","campaign","is_paramedical",
		"strength","body","reflexes","appearance","cool","street_cred","intelligence","willpower","technique",
		"athletics","brawling","concentration","evasion","fast_talk","firearms","legerdemain","melee_weapons","perception","streetwise",
        "demolitions","drive_land","drive_exotic","etiquette","exotic_weapons","heavy_weapons","performance","stealth","survival","tracking",
        "business","cryptography","cyber_tech","investigation","first_aid","paramed","gambling","language","military_tech","science","vehicle_tech",
		"rockerboy","solo","netrunner","nomad","media","medtech","med_surgery","med_pharma","med_cryo",
		"maker","maker_field","maker_upgrade","maker_fab","maker_invent",
		"perm_humanity_loss","max_luck","max_xp","spent_xp","bank",
        "cyberdeck_slots", "nomad_vehicle_slots"
	)
    VALUES ($1, $2, $3, $4, $5, 
        $6, $7, $8, $9, $10, $11, $12, $13, $14, 
        $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, 
        $25, $26, $27, $28, $29, $30, $31, $32, $33, $34, 
        $35, $36, $37, $38, $39, $40, $41, $42, $43, $44, $45, 
        $46, $47, $48, $49, $50, $51, $52, $53, $54, 
        $55, $56, $57, $58, $59, 
        $60, $61, $62, $63, $64,
        $65, $66)
        RETURNING id;`

    const charParams = [req.user.id, rb.handle, rb.player, rb.campaign, rb.isParamedical,
    rb.strength, rb.body, rb.reflexes, rb.appearance, rb.cool, rb.street_cred, rb.intelligence, rb.willpower, rb.technique,
    rb.athletics, rb.brawling, rb.concentration, rb.evasion, rb.fastTalk, rb.firearms, rb.legerdemain, rb.meleeWeapons, rb.perception, rb.streetwise,
    rb.demolitions, rb.driveLand, rb.driveExotic, rb.etiquette, rb.exoticWeapons, rb.heavyWeapons, rb.performance, rb.stealth, rb.survival, rb.tracking,
    rb.business, rb.cryptography, rb.cyberTech, rb.investigation, rb.firstAid, rb.paramedic, rb.gambling, rb.language, rb.militaryTech, rb.science, rb.vehicleTech,
    rb.rockerboy, rb.solo, rb.netrunner, rb.nomad, rb.media, rb.medtech, rb.medSurgery, rb.medPharma, rb.medCryo,
    rb.maker, rb.makerField, rb.makerUpgrade, rb.makerFab, rb.makerInvent, 0, 5, 0, 0, 300, 0, rb.availableNomadVehicles]

    pool.query(charSqlText, charParams)
        .then((result) => {
            for (let i = 0; i < req.body.armor.length; i++) {
                if (rb.armor[i] === 12) {
                    const armorSqlText = `INSERT INTO "char_armor_bridge" 
                    ("char_id", "armor_id", "this_armor_loss", "equipped")
                    VALUES ($1, $2, $3, $4)`
                    const armorSqlParams = [result.rows[0].id, rb.armor[i], 0, true]
                    pool.query(armorSqlText, armorSqlParams)
                } else {
                    const armorSqlText = `INSERT INTO "char_armor_bridge" 
                    ("char_id", "armor_id", "this_armor_loss", "equipped")
                    VALUES ($1, $2, $3, $4)`
                    const armorSqlParams = [result.rows[0].id, rb.armor[i], 0, false]
                    pool.query(armorSqlText, armorSqlParams)
                }
            }
            for (let i = 0; i < req.body.shield.length; i++) {
                if (rb.shield[i] === 3) {
                    const shieldSqlText = `INSERT INTO "char_shield_bridge" 
                    ("char_id", "shield_id", "this_shield_loss", "equipped")
                    VALUES ($1, $2, $3, $4)`
                    const shieldSqlParams = [result.rows[0].id, rb.shield[i], 0, true]
                    pool.query(shieldSqlText, shieldSqlParams)
                } else {
                    const shieldSqlText = `INSERT INTO "char_shield_bridge" 
                ("char_id", "shield_id", "this_shield_loss", "equipped")
                VALUES ($1, $2, $3, $4)`
                    const shieldSqlParams = [result.rows[0].id, rb.shield[i], 0, false]
                    pool.query(shieldSqlText, shieldSqlParams)
                }
            }
            for (let i = 0; i < req.body.weapons.length; i++) {
                const weaponSqlText = `INSERT INTO "char_weapons_bridge" 
                ("char_id", "weapon_id", "current_shots_fired", "equipped")
                VALUES ($1, $2, $3, $4, $5, $6)`
                const weaponSqlParams = [result.rows[0].id, rb.weapons[i], 0, true]
                pool.query(weaponSqlText, weaponSqlParams)
            }
            for (let i = 0; i < req.body.grenades.length; i++) {
                const grenadeSqlText = `INSERT INTO "char_grenade_bridge"
                ("char_id", "grenade_id")
                VALUES ($1, $2)`
                const grenadeSqlParams = [result.rows[0].id, rb.grenades[i]]
                pool.query(grenadeSqlText, grenadeSqlParams)
            }
            for (let i = 0; i < req.body.gear.length; i++) {
                const gearSqlText = `INSERT INTO "char_gear_bridge" 
                ("char_id", "misc_gear_id")
                VALUES ($1, $2)`
                const gearSqlParams = [result.rows[0].id, rb.gear[i]]
                pool.query(gearSqlText, gearSqlParams)
            }
            for (let i = 0; i < req.body.cyberware.length; i++) {
                const gearSqlText = `INSERT INTO "char_owned_cyberware" 
                ("char_id", "cyberware_master_id")
                VALUES ($1, $2)`
                const gearSqlParams = [result.rows[0].id, rb.cyberware[i]]
                pool.query(gearSqlText, gearSqlParams)
            }
            for (let i = 0; i < req.body.netrunnerGear.length; i++) {
                const netrunnerGearSqlText = `INSERT INTO "netrunner_bridge" 
                ("char_id", "netrunner_master_id", "equipped")
                VALUES ($1, $2, $3)`
                const netrunnerGearParams = [result.rows[0].id, rb.netrunnerGear[i], false]
                pool.query(netrunnerGearSqlText, netrunnerGearParams)
            }

            const bridgeSqlText = `INSERT INTO "char_status" ("char_id", "current_stun", "current_lethal","current_agg",
            "current_luck_loss", "current_armor_quality", "current_shield_quality", "current_cyberware_armor_quality", "current_cyberware_health_boxes", "current_cyberware_armor_loss")
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`
            const bridgeParams = [result.rows[0].id, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            pool.query(bridgeSqlText, bridgeParams)

            const cyberBridgeSqlText = `INSERT INTO "char_cyberware_bridge" ("char_id", 
            "fashionware_slots", "neuralware_slots", "cyberoptic_slots", 
            "cyberaudio_slots", "internalware_slots", "externalware_slots", 
            "cyberarm_slots", "cyberleg_slots")
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`
            const cyberBridgeParams = [result.rows[0].id, 7, 0, 0, 0, 7, 1, 0, 0]
            pool.query(cyberBridgeSqlText, cyberBridgeParams)

        })
        .then((result) => {
            res.sendStatus(201)
        })
        .catch(err => {
            console.log(`Error creating character,`, err);
        })
})

// GM Routes
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

router.put('/savegamemastercharacter/:id', rejectNonAdmin, (req, res) => {
    const rb = req.body.charDetail
    const charSqlText = `UPDATE "character"
        SET "is_paramedical" = $1,
        "strength" = $2, "body" = $3, "reflexes" = $4, "appearance" = $5, "cool" = $6, "street_cred" = $7, "intelligence" = $8, "willpower" = $9, "technique" = $10,
        "athletics" = $11, "brawling" = $12, "concentration" = $13, "evasion" = $14, "fast_talk" = $15, "firearms" = $16, "legerdemain" = $17, "melee_weapons" = $18, "perception" = $19, "streetwise" = $20,
        "demolitions" = $21, "drive_land" = $22, "drive_exotic" = $23, "etiquette" = $24, "exotic_weapons" = $25, "heavy_weapons" = $26, "performance" = $27, "stealth" = $28, "survival" = $29, "tracking" = $30,
        "business" = $31, "cryptography" = $32, "cyber_tech" = $33, "first_aid" = $34, "paramed" = $35, "investigation" = $36, "gambling" = $37, "language" = $38, "military_tech" = $39, "science" = $40, "vehicle_tech" = $41,
        "rockerboy" = $42, "solo" = $43, "netrunner" = $44, "nomad" = $45, "media" = $46, "medtech" = $47, "med_surgery" = $48, "med_pharma" = $49, "med_cryo" = $50,
        "maker" = $51, "maker_field" = $52, "maker_upgrade" = $53, "maker_fab" = $54, "maker_invent" = $55,
        "perm_humanity_loss" = $56, "temp_humanity_loss" = $57, "max_luck" = $58, "max_xp" = $59, "spent_xp" = $60, "bank" = $61,
        "cyber_strength" = $62, "cyber_body" = $63, "cyber_reflexes" = $64, "cyber_appearance" = $65, "cyber_cool" = $66, "cyber_intelligence" = $67,
        "cyberdeck_slots" = $68, "nomad_vehicle_slots" = $69, "campaign" = $70
        WHERE id = $71`

    const charParams = [rb.is_paramedical,
    rb.strength, rb.body, rb.reflexes, rb.appearance, rb.cool, rb.street_cred, rb.intelligence, rb.willpower, rb.technique,
    rb.athletics, rb.brawling, rb.concentration, rb.evasion, rb.fast_talk, rb.firearms, rb.legerdemain, rb.melee_weapons, rb.perception, rb.streetwise,
    rb.demolitions, rb.drive_land, rb.drive_exotic, rb.etiquette, rb.exotic_weapons, rb.heavy_weapons, rb.performance, rb.stealth, rb.survival, rb.tracking,
    rb.business, rb.cryptography, rb.cyber_tech, rb.first_aid, rb.paramed, rb.investigation, rb.gambling, rb.language, rb.military_tech, rb.science, rb.vehicle_tech,
    rb.rockerboy, rb.solo, rb.netrunner, rb.nomad, rb.media, rb.medtech, rb.med_surgery, rb.med_pharma, rb.med_cryo,
    rb.maker, rb.maker_field, rb.maker_upgrade, rb.maker_fab, rb.maker_invent, rb.perm_humanity_loss, rb.temp_humanity_loss, rb.max_luck, rb.max_xp, rb.spent_xp, rb.bank,
    rb.cyber_strength, rb.cyber_body, rb.cyber_reflexes, rb.cyber_appearance, rb.cyber_cool, rb.cyber_intelligence,
    rb.cyberdeck_slots, rb.nomad_vehicle_slots, rb.campaign,
    rb.char_id]

    pool.query(charSqlText, charParams)
        .then(result => {
            // change status e.g. from removing armor/shield
            const charStatusSqlText = `UPDATE "char_status"
            SET "current_armor_quality"= $1, "current_shield_quality" = $2, "current_cyberware_armor_quality" = $3, "current_cyberware_health_boxes" = $4
            WHERE char_status_id = $5`

            const charStatusParams = [req.body.gear.totalArmorQuality, req.body.gear.totalShieldQuality, req.body.gear.totalCyberwareArmorQuality, req.body.gear.totalCyberwareHealthBoxesCreated, rb.char_status_id]
            pool.query(charStatusSqlText, charStatusParams)
        })
        .then(result => {
            // change cyberware details
            const cyberware = req.body.gear.cyberware
            const cyberwareSqlText = `UPDATE "char_owned_cyberware"
            SET "equipped" = $1
            WHERE owned_cyberware_id = $2`

            for (let i = 0; i < cyberware.length; i++) {
                const cyberwareSqlParams = [cyberware[i].equipped, cyberware[i].owned_cyberware_id]
                pool.query(cyberwareSqlText, cyberwareSqlParams)
            }

            // change slot details
            const cyberwareSlots = req.body.gear.cyberwareSlots
            const cyberwareSlotsSqlText = `UPDATE "char_cyberware_bridge"
            SET "fashionware_slots" = $1, "neuralware_slots" = $2, "cyberoptic_slots" = $3, 
            "cyberaudio_slots" = $4, "internalware_slots" = $5, "externalware_slots" = $6, 
            "cyberarm_slots" = $7, "cyberleg_slots" = $8
            WHERE "cyberware_bridge_id" = $9`
            const cyberwareSlotsSqlParams = [cyberwareSlots.fashionware_slots, cyberwareSlots.neuralware_slots, cyberwareSlots.cyberoptic_slots,
            cyberwareSlots.cyberaudio_slots, cyberwareSlots.internalware_slots, cyberwareSlots.externalware_slots,
            cyberwareSlots.cyberarm_slots, cyberwareSlots.cyberleg_slots, cyberwareSlots.cyberware_bridge_id]
            pool.query(cyberwareSlotsSqlText, cyberwareSlotsSqlParams)

            const soldArmor = req.body.gear.soldArmor
            if (soldArmor.length > 0) {
                const soldArmorSqlText = `DELETE FROM "char_armor_bridge" WHERE "armor_bridge_id" = $1`
                for (let i = 0; i < soldArmor.length; i++) {
                    const soldArmorSqlParams = [soldArmor[i].armor_bridge_id]
                    pool.query(soldArmorSqlText, soldArmorSqlParams)
                }
            }

            // loop through boughtArmor array, perform post on each.
            const boughtArmor = req.body.gear.boughtArmor
            if (boughtArmor.length > 0) {
                const boughtArmorSqlText = `INSERT INTO "char_armor_bridge" ("char_id", "armor_id", "this_armor_loss", "equipped")
            VALUES ($1, $2, $3, $4);`
                for (let i = 0; i < boughtArmor.length; i++) {
                    const boughtArmorParams = [req.body.charDetail.id, boughtArmor[i].armor_master_id, 0, false]
                    pool.query(boughtArmorSqlText, boughtArmorParams)
                }
            }

            const soldShield = req.body.gear.soldShield
            if (soldShield.length > 0) {
                const soldShieldSqlText = `DELETE FROM "char_shield_bridge" WHERE "shield_bridge_id" = $1`
                for (let i = 0; i < soldShield.length; i++) {
                    const soldShieldParams = [soldShield[i].shield_bridge_id]
                    pool.query(soldShieldSqlText, soldShieldParams)
                }
            }
            const boughtShield = req.body.gear.boughtShield
            if (boughtShield.length > 0) {
                const boughtShieldSqlText = `INSERT INTO "char_shield_bridge" ("char_id", "shield_id", "this_shield_loss", "equipped")
            VALUES ($1, $2, $3, $4);`
                for (let i = 0; i < boughtShield.length; i++) {
                    const boughtShieldParams = [req.body.charDetail.id, boughtShield[i].shield_master_id, 0, false]
                    pool.query(boughtShieldSqlText, boughtShieldParams)
                }
            }

            const soldWeapons = req.body.gear.soldWeapons
            if (soldWeapons.length > 0) {
                const soldWeaponsSqlText = `DELETE FROM "char_weapons_bridge" WHERE "weapon_bridge_id" = $1`
                for (let i = 0; i < soldWeapons.length; i++) {
                    const soldWeaponsParams = [soldWeapons[i].weapon_bridge_id]
                    pool.query(soldWeaponsSqlText, soldWeaponsParams)
                }
            }

            const boughtWeapons = req.body.gear.boughtWeapons
            if (boughtWeapons.length > 0) {
                const boughtWeaponsSqlText = `INSERT INTO "char_weapons_bridge" ("char_id", "weapon_id", "current_shots_fired", "equipped")
                VALUES ($1, $2, $3, $4, $5, $6);`
                for (let i = 0; i < boughtWeapons.length; i++) {
                    const boughtWeaponsParams = [req.body.charDetail.id, boughtWeapons[i].weapon_master_id, 0, false]
                    pool.query(boughtWeaponsSqlText, boughtWeaponsParams)
                }
            }

            const soldGrenades = req.body.gear.soldGrenades
            if (soldGrenades.length > 0) {
                const soldGrenadeSqlText = `DELETE FROM "char_grenade_bridge" WHERE "grenade_bridge_id" = $1`
                for (let i = 0; i < soldGrenades.length; i++) {
                    const soldGrenadeParams = [soldGrenades[i].grenade_bridge_id]
                    pool.query(soldGrenadeSqlText, soldGrenadeParams)
                }
            }

            const boughtGrenades = req.body.gear.boughtGrenades
            if (boughtGrenades.length > 0) {
                const boughtGrenadeSqlText = `INSERT INTO "char_grenade_bridge" ("char_id", "grenade_id")
                VALUES ($1, $2)`
                for (let i = 0; i < boughtGrenades.length; i++) {
                    const boughtGrenadesParams = [req.body.charDetail.id, boughtGrenades[i].grenade_master_id]
                    pool.query(boughtGrenadeSqlText, boughtGrenadesParams)
                }
            }

            // loop through misc gear, perform delete/post on each as needed
            const soldMiscGear = req.body.gear.soldMiscGear
            if (soldMiscGear.length > 0) {
                const soldMiscGearSqlText = `DELETE FROM "char_gear_bridge" where "char_gear_bridge_id" = $1`
                for (let i = 0; i < soldMiscGear.length; i++) {
                    const soldMiscGearParams = [soldMiscGear[i].char_gear_bridge_id]
                    pool.query(soldMiscGearSqlText, soldMiscGearParams)
                }
            }

            const boughtMiscGear = req.body.gear.boughtMiscGear
            if (boughtMiscGear.length > 0) {
                const boughtMiscGearSqlText = `INSERT INTO "char_gear_bridge" ("char_id", "misc_gear_id") 
            VALUES ($1, $2)`
                for (let i = 0; i < boughtMiscGear.length; i++) {
                    const boughtMiscGearParams = [req.body.charDetail.id, boughtMiscGear[i].misc_gear_master_id]
                    pool.query(boughtMiscGearSqlText, boughtMiscGearParams)
                }
            }

            const soldNetrunnerGear = req.body.gear.soldNetrunnerGear
            if (soldNetrunnerGear.length > 0) {
                const soldNetrunnerGearSqlText = `DELETE FROM "netrunner_bridge" where "netrunner_bridge_id" = $1`
                for (let i = 0; i < soldNetrunnerGear.length; i++) {
                    const soldNetrunnerGearParams = [soldNetrunnerGear[i].netrunner_bridge_id]
                    pool.query(soldNetrunnerGearSqlText, soldNetrunnerGearParams)
                }
            }

            const boughtNetrunnerGear = req.body.gear.boughtNetrunnerGear
            if (boughtNetrunnerGear.length > 0) {
                const boughtNetrunnerGearSqlText = `INSERT INTO "netrunner_bridge" ("char_id", "netrunner_master_id") 
            VALUES ($1, $2)`
                for (let i = 0; i < boughtNetrunnerGear.length; i++) {

                    const boughtNetrunnerGearParams = [req.body.charDetail.id, boughtNetrunnerGear[i].netrunner_master_id]
                    pool.query(boughtNetrunnerGearSqlText, boughtNetrunnerGearParams)
                }
            }

            const soldVehicles = req.body.gear.soldVehicles
            if (soldVehicles.length > 0) {
                const soldVehicleSqlText = `DELETE FROM "char_vehicle_bridge" WHERE "vehicle_bridge_id" = $1`
                for (let i = 0; i < soldVehicles.length; i++) {
                    const soldVehicleParams = [soldVehicles[i].vehicle_bridge_id]
                    pool.query(soldVehicleSqlText, soldVehicleParams)
                }
            }

            const boughtVehicles = req.body.gear.boughtVehicles
            if (boughtVehicles.length > 0) {
                const boughtVehiclesSqlText = `INSERT INTO "char_vehicle_bridge" ("char_id", "vehicle_id")
            VALUES ($1, $2);`
                for (let i = 0; i < boughtVehicles.length; i++) {
                    const boughtVehiclesParmas = [req.body.charDetail.id, boughtVehicles[i].vehicle_master_id]
                    pool.query(boughtVehiclesSqlText, boughtVehiclesParmas)
                }
            }

            const soldVehicleMods = req.body.gear.soldVehicleMods
            if (soldVehicleMods.length > 0) {
                const soldVehicleModSqlText = `DELETE FROM "char_owned_vehicle_mods" WHERE "char_owned_vehicle_mods_id" = $1`
                for (let i = 0; i < soldVehicleMods.length; i++) {
                    const soldVehicleModsParams = [soldVehicleMods[i].char_owned_vehicle_mods_id]
                    pool.query(soldVehicleModSqlText, soldVehicleModsParams)
                }
            }

            const boughtVehicleMods = req.body.gear.boughtVehicleMods
            if (boughtVehicleMods.length > 0) {
                const boughtVehicleModsSqlText = `INSERT INTO "char_owned_vehicle_mods" ("char_id", "vehicle_mod_master_id")
            VALUES ($1, $2);`
                for (let i = 0; i < boughtVehicleMods.length; i++) {
                    const boughtVehicleModsParams = [req.body.charDetail.id, boughtVehicleMods[i].vehicle_mod_master_id]
                    pool.query(boughtVehicleModsSqlText, boughtVehicleModsParams)
                }
            }

            const soldCyberware = req.body.gear.soldCyberware
            if (soldCyberware.length > 0) {
                const soldCyberwareSqlText = `DELETE FROM "char_owned_cyberware" where "owned_cyberware_id" = $1`
                for (let i = 0; i < soldCyberware.length; i++) {
                    const soldCyberwareParams = [soldCyberware[i].owned_cyberware_id]
                    pool.query(soldCyberwareSqlText, soldCyberwareParams)
                }
            }

            const boughtCyberware = req.body.gear.boughtCyberware
            if (boughtCyberware.length > 0) {
                const boughtCyberwareSqlText = `INSERT INTO "char_owned_cyberware" ("char_id", "cyberware_master_id") 
            VALUES ($1, $2)`
                for (let i = 0; i < boughtCyberware.length; i++) {
                    const boughtCyberwareParams = [req.body.charDetail.id, boughtCyberware[i].cyberware_master_id]
                    pool.query(boughtCyberwareSqlText, boughtCyberwareParams)
                }
            }

            const contactDetails = req.body.contacts
            if (contactDetails.length > 0) {
                const changeContactLoyaltySqlText = `UPDATE "char_contact_bridge"
                SET "loyalty" = $1
                WHERE "char_contact_id" = $2`
                for (let i = 0; i < contactDetails.length; i++) {
                    if (contactDetails[i].modified === true) {
                        pool.query(changeContactLoyaltySqlText, [contactDetails[i].loyalty, contactDetails[i].char_contact_id])
                    }
                }
            }
        })
        .then((result) => {
            res.sendStatus(201)
        })
        .catch(err => {
            console.log(`Error saving GM character changes,`, err);
        })
})

router.delete('/deletegamemastercharacter/:id', rejectNonAdmin, (req, res) => {
    const charDeleteSqlText = `DELETE FROM "character" WHERE "id" = $1;`
    const charDeleteSqlParams = [req.params.id]

    if (req.user.user_type === 2) {
        pool.query(charDeleteSqlText, charDeleteSqlParams)
            .then(result => {
                res.sendStatus(202)
            })
            .catch(err => {
                console.log(`Error deleting character for GM:`, err);
            })
    } else {
        res.sendStatus(403)
    }

})

router.get('/fetchCharacterLifestyle/:id', rejectUnauthenticated, (req, res) => {
    const sqlText = `SELECT * FROM "char_lifestyle_bridge"`
    pool.query(sqlText)
        .then((result) => {
            res.send(result.rows);
        })
        .catch(err => {
            console.log(`Error fetching character lifestyle`, err);
        })
})


module.exports = router