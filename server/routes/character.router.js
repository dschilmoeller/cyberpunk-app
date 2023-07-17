const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// To Do: add blocker for not-logged in
// rewrite SQL requests to limit characters to those belonging to logged in user (req.user.id?)
// add res.send(error) to catch statements.
// Eventually - GM section or change commands to allow for user type.

// fetch characters list route
router.get('/fetchallcharacters', (req, res) => {
    const sqlText = `SELECT id, handle 
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

// fetch equipped cyberware
router.get('/fetchcharactercyberdetails/:id', (req, res) => {
    const sqlText = `SELECT * FROM "char_cyberware_bridge"
    WHERE char_id = $1`
    pool.query(sqlText, [req.params.id])
        .then((result) => {
            res.send(result.rows);
        })
        .catch(err => {
            console.log(`Error fetching character cyberware details`, err);
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
    const sqlText = `SELECT * FROM "char_weapons_bridge"
    JOIN "weapon_master" ON "weapon_master".weapon_master_id = "char_weapons_bridge".weapon_id
    JOIN "weapon_mod1_master" ON "weapon_mod1_master".weapon_mod1_master_id = "char_weapons_bridge".weapon_mod_1
    JOIN "weapon_mod2_master" ON "weapon_mod2_master".weapon_mod2_master_id = "char_weapons_bridge".weapon_mod_2
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

router.put('/savecharacterweapons/:id', (req, res) => {
    const sqlText = `UPDATE "char_weapons_bridge" 
    SET "current_shots_fired" = $1
    WHERE "weapon_bridge_id" = $2`
    const sqlParams = [req.body.current_shots_fired, req.body.id]
    pool.query(sqlText, sqlParams)
        .then((result) => {
            res.sendStatus(202)
        })
        .catch(err => {
            console.log(`error saving weapon bridge status:`, err);
        })
})


// Character Advancement Routes
router.get('/fetchAdvancementDetails/:id', (req, res) => {
    const sqlText = `SELECT * FROM "character"
    WHERE id = $1`
    pool.query(sqlText, [req.params.id])
        .then((result) => {
            res.send(result.rows);
        })
        .catch(err => {
            console.log(`Error fetching advancement character details:`, err);
        })
})

router.get('/fetchAdvancementOwnedArmor/:id', (req, res) => {
    const sqlText = `SELECT * FROM "char_owned_armor" 
    JOIN "armor_master" ON "armor_master"."armor_master_id" = "char_owned_armor"."armor_id"
    WHERE char_id = $1`
    pool.query(sqlText, [req.params.id])
        .then((result) => {
            res.send(result.rows);
        })
        .catch(err => {
            console.log(`Error fetching owned armor details:`, err);
        })
})

router.get('/fetchAdvancementEquippedArmor/:id', (req, res) => {
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

router.get('/fetchAdvancementOwnedWeapons/:id', (req, res) => {
    const sqlText = `SELECT * FROM "char_owned_weapons" 
    JOIN "weapon_master" ON "weapon_master"."weapon_master_id" = "char_owned_weapons"."weapon_id"
    WHERE char_id = $1`
    pool.query(sqlText, [req.params.id])
        .then((result) => {
            res.send(result.rows);
        })
        .catch(err => {
            console.log(`Error fetching owned weapon details:`, err);
        })
})

router.get('/fetchAdvancementEquippedWeapons/:id', (req, res) => {
    const sqlText = `SELECT * FROM "char_weapons_bridge" 
    JOIN "weapon_master" ON "weapon_master"."weapon_master_id" = "char_weapons_bridge"."weapon_id"
    WHERE char_id = $1`
    pool.query(sqlText, [req.params.id])
        .then((result) => {
            res.send(result.rows);
        })
        .catch(err => {
            console.log(`Error fetching owned weapon details:`, err);
        })
})

router.get('/fetchAdvancementOwnedGear/:id', (req, res) => {
    const sqlText = `SELECT * FROM "char_owned_gear" 
    JOIN "misc_gear_master" ON "misc_gear_master"."misc_gear_master_id" = "char_owned_gear"."gear_id"
    WHERE char_id = $1`
    pool.query(sqlText, [req.params.id])
        .then((result) => {
            res.send(result.rows);
        })
        .catch(err => {
            console.log(`Error fetching owned gear details:`, err);
        })
})

router.get('/fetchAdvancementOwnedCyber/:id', (req, res) => {
    const sqlText = `SELECT * FROM "char_owned_cyberware" 
    JOIN "cyberware_master" ON "cyberware_master"."cyberware_master_id" = "char_owned_cyberware"."cyberware_master_id"
    WHERE char_id = $1`
    pool.query(sqlText, [req.params.id])
        .then((result) => {
            res.send(result.rows);
        })
        .catch(err => {
            console.log(`Error fetching owned cyberware details:`, err);
        })
})

router.get('/fetchAdvancementEquippedCyber/:id', (req, res) => {
    const sqlText = `SELECT * FROM "char_cyberware_bridge" 
    WHERE char_id = $1`
    pool.query(sqlText, [req.params.id])
        .then((result) => {
            res.send(result.rows);
        })
        .catch(err => {
            console.log(`Error fetching owned equipped cyberware details:`, err);
        })
})


// Creation save route(s)
router.post('/saveCreationCharacter/', (req, res) => {
    const rb = req.body
    const charSqlText = `INSERT INTO "character" (
		"user_id","handle","player","role","culture","concept","campaign","is_paramedical",
		"strength","body","reflexes","move","appearance","cool","street_cred","intelligence","willpower","technique",
		"athletics","brawling","concentration","evasion","fast_talk","firearms","legerdemain","melee_weapons","perception","streetwise",
        "demolitions","drive_land","drive_exotic","etiquette","exotic_weapons","heavy_weapons","performance","stealth","survival","tracking",
        "business","cryptography","cyber_tech","investigation","first_aid","paramed","gambling","language","military_tech","science","vehicle_tech",
		"rockerboy","solo","netrunner","nomad","media","medtech","med_surgery","med_pharma","med_cryo",
		"maker","maker_field","maker_upgrade","maker_fab","maker_invent",
		"max_health","perm_humanity_loss","max_luck","max_armor","max_xp","spent_xp","bank"
	)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 
        $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, 
        $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, 
        $29, $30, $31, $32, $33, $34, $35, $36, $37, $38, 
        $39, $40, $41, $42, $43, $44, $45, $46, $47, $48, $49, 
        $50, $51, $52, $53, $54, $55, $56, $57, $58, 
        $59, $60, $61, $62, $63, 
        $64, $65, $66, $67, $68, $69, $70)
        RETURNING id;`

    const charParams = [req.user.id, rb.handle, rb.player, rb.role, rb.culture, rb.concept, rb.campaign, rb.isParamedical,
    rb.strength, rb.body, rb.reflexes, rb.move, rb.appearance, rb.cool, rb.street_cred, rb.intelligence, rb.willpower, rb.technique,
    rb.athletics, rb.brawling, rb.concentration, rb.evasion, rb.fastTalk, rb.firearms, rb.legerdemain, rb.meleeWeapons, rb.perception, rb.streetwise,
    rb.demolitions, rb.driveLand, rb.driveExotic, rb.etiquette, rb.exoticWeapons, rb.heavyWeapons, rb.performance, rb.stealth, rb.survival, rb.tracking,
    rb.business, rb.cryptography, rb.cyberTech, rb.firstAid, rb.paramedic, rb.investigation, rb.gambling, rb.language, rb.militaryTech, rb.science, rb.vehicleTech,
    rb.rockerboy, rb.solo, rb.netrunner, rb.nomad, rb.media, rb.medtech, rb.medSurgery, rb.medPharma, rb.medCryo,
    rb.maker, rb.makerField, rb.makerUpgrade, rb.makerFab, rb.makerInvent, 10, 0, 5, 0, 0, 0, 300]

    pool.query(charSqlText, charParams)
        .then((result) => {
            for (let i = 0; i < req.body.armor.length; i++) {
                const armorSqlText = `INSERT INTO "char_owned_armor" 
                ("char_id", "armor_id")
                VALUES ($1, $2)`
                const armorSqlParams = [result.rows[0].id, rb.armor[i] + 1]
                pool.query(armorSqlText, armorSqlParams)
            }
            for (let i = 0; i < req.body.weapons.length; i++) {
                const weaponSqlText = `INSERT INTO "char_weapons_bridge" 
                ("char_id", "weapon_id", "weapon_mod_1", "weapon_mod_2", "current_shots_fired")
                VALUES ($1, $2, $3, $4, $5)`
                const weaponSqlParams = [result.rows[0].id, rb.weapons[i] + 1, 1, 1, 0]
                pool.query(weaponSqlText, weaponSqlParams)
            }
            for (let i = 0; i < req.body.weapons.length; i++) {
                const weaponSqlText = `INSERT INTO "char_owned_weapons" 
                ("char_id", "weapon_id", "equipped")
                VALUES ($1, $2, $3)`
                const weaponSqlParams = [result.rows[0].id, rb.weapons[i] + 1, true]
                pool.query(weaponSqlText, weaponSqlParams)
            }
            for (let i = 0; i < req.body.gear.length; i++) {
                const gearSqlText = `INSERT INTO "char_gear_bridge" 
                ("char_id", "misc_gear_id")
                VALUES ($1, $2)`
                const gearSqlParams = [result.rows[0].id, rb.gear[i] + 1]
                pool.query(gearSqlText, gearSqlParams)
            }
            for (let i = 0; i < req.body.cyberware.length; i++) {
                const gearSqlText = `INSERT INTO "char_owned_cyberware" 
                ("char_id", "cyberware_master_id")
                VALUES ($1, $2)`
                const gearSqlParams = [result.rows[0].id, rb.cyberware[i] + 1]
                pool.query(gearSqlText, gearSqlParams)
            }
            const bridgeSqlText = `INSERT INTO "char_status" ("char_id", "current_stun", "current_lethal","current_agg",
            "current_armor_loss","current_humanity_loss","current_luck_loss")
            VALUES ($1, $2, $3, $4, $5, $6, $7)`
            const bridgeParams = [result.rows[0].id, 0, 0, 0, 0, 0, 0]
            pool.query(bridgeSqlText, bridgeParams)

        })
        .then((result) => {
            res.sendStatus(201)
        })
        .catch(err => {
            console.log(`Error creating character,`, err);
        })
})

module.exports = router