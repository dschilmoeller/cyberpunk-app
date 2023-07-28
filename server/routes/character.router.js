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
    const sqlText = `SELECT * FROM "character"
    WHERE id = $1`
    pool.query(sqlText, [req.params.id])
        .then((result) => {
            res.send(result.rows);
        })
        .catch(err => {
            console.log(`Error fetching character details:`, err);
        })
})

// fetch equipped cyberware for in play character sheet.
router.get('/fetchcharactercyberdetails/:id', (req, res) => {
    const sqlText = `SELECT * FROM "char_owned_cyberware"
    JOIN "cyberware_master" ON "cyberware_master"."cyberware_master_id" = "char_owned_cyberware"."cyberware_master_id"
    WHERE char_id = $1`
    pool.query(sqlText, [req.params.id])
        .then((result) => {
            res.send(result.rows);
        })
        .catch(err => {
            console.log(`Error fetching character cyberware details`, err);
        })
})

// fetch char_status details for in play character sheet.
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

// fetch character weapons for in play character sheet
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

// save changes made on in play character sheet.
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

// save shots fired on in play character sheet.
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
// routes having to do with spending experience, equipping/unequipping gear and cyberware,
// and purchasing and selling gear and cyberware

// pulls stats and status for character, similar to in play sheet.
router.get('/fetchAdvancementDetails/:id', (req, res) => {
    const sqlText = `SELECT * FROM "character"
    JOIN "char_status" ON "char_status"."char_id" = "character"."id"
    WHERE id = $1`
    pool.query(sqlText, [req.params.id])
        .then((result) => {
            res.send(result.rows);
        })
        .catch(err => {
            console.log(`Error fetching advancement character details:`, err);
        })
})

// various gear fetches.
router.get('/fetchAdvancementArmor/:id', (req, res) => {
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

router.get('/fetchAdvancementShield/:id', (req, res) => {
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

router.get('/fetchAdvancementWeapons/:id', (req, res) => {
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

router.get('/fetchAdvancementGear/:id', (req, res) => {
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

router.get('/fetchAdvancementCyber/:id', (req, res) => {
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

router.get('/fetchAdvancementCyberSlots/:id', (req, res) => {
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

// advancement save route
// big one is to update the character stats, skills, and such.
router.put('/saveAdvancementCharacter/:id', (req, res) => {
    const rb = req.body.char

    const charSqlText = `UPDATE "character"
    SET "user_id" = $1, "handle" = $2, "player" = $3, "role" = $4, "culture" = $5, "concept" = $6, "campaign" = $7, "is_paramedical" = $8,
    "strength" = $9, "body" = $10, "reflexes" = $11, "move" = $12, "appearance" = $13, "cool" = $14, "street_cred" = $15, "intelligence" = $16, "willpower" = $17, "technique" = $18,
    "athletics" = $19, "brawling" = $20, "concentration" = $21, "evasion" = $22, "fast_talk" = $23, "firearms" = $24, "legerdemain" = $25, "melee_weapons" = $26, "perception" = $27, "streetwise" = $28,
    "demolitions" = $29, "drive_land" = $30, "drive_exotic" = $31, "etiquette" = $32, "exotic_weapons" = $33, "heavy_weapons" = $34, "performance" = $35, "stealth" = $36, "survival" = $37, "tracking" = $38,
    "business" = $39, "cryptography" = $40, "cyber_tech" = $41, "first_aid" = $42, "paramed" = $43, "investigation" = $44, "gambling" = $45, "language" = $46, "military_tech" = $47, "science" = $48, "vehicle_tech" = $49,
    "rockerboy" = $50, "solo" = $51, "netrunner" = $52, "nomad" = $53, "media" = $54, "medtech" = $55, "med_surgery" = $56, "med_pharma" = $57, "med_cryo" = $58,
    "maker" = $59, "maker_field" = $60, "maker_upgrade" = $61, "maker_fab" = $62, "maker_invent" = $63,
    "perm_humanity_loss" = $64, "max_luck" = $65, "max_xp" = $66, "spent_xp" = $67, "bank" = $68,
    "cyber_strength" = $69, "cyber_body" = $70, "cyber_reflexes" = $71, "cyber_move" = $72, "cyber_appearance" = $73, "cyber_cool" = $74, "cyber_intelligence" = $75
    WHERE ID = $76`

    const charParams = [req.user.id, rb.handle, rb.player, rb.role, rb.culture, rb.concept, rb.campaign, rb.is_paramedical,
    rb.strength, rb.body, rb.reflexes, rb.move, rb.appearance, rb.cool, rb.street_cred, rb.intelligence, rb.willpower, rb.technique,
    rb.athletics, rb.brawling, rb.concentration, rb.evasion, rb.fast_talk, rb.firearms, rb.legerdemain, rb.melee_weapons, rb.perception, rb.streetwise,
    rb.demolitions, rb.drive_land, rb.drive_exotic, rb.etiquette, rb.exotic_weapons, rb.heavy_weapons, rb.performance, rb.stealth, rb.survival, rb.tracking,
    rb.business, rb.cryptography, rb.cyber_tech, rb.first_aid, rb.paramed, rb.investigation, rb.gambling, rb.language, rb.military_tech, rb.science, rb.vehicle_tech,
    rb.rockerboy, rb.solo, rb.netrunner, rb.nomad, rb.media, rb.medtech, rb.med_surgery, rb.med_pharma, rb.med_cryo,
    rb.maker, rb.maker_field, rb.maker_upgrade, rb.maker_fab, rb.maker_invent, rb.perm_humanity_loss, rb.max_luck, rb.max_xp, rb.spent_xp, rb.bank,
    rb.cyber_strength, rb.cyber_body, rb.cyber_reflexes, rb.cyber_move, rb.cyber_appearance, rb.cyber_cool, rb.cyber_intelligence,
    rb.char_id]

    pool.query(charSqlText, charParams)
        .then(result => {
            // query to save character status!
            const charStatusSqlText = `UPDATE "char_status"
        SET "current_humanity_loss" = $1, "current_armor_quality"= $2, "current_shield_quality" = $3, "current_cyberware_armor_quality" = $4, "current_cyberware_health_boxes" = $5
        WHERE char_status_id = $6`

            const charStatusParams = [rb.current_humanity_loss, req.body.gear.totalArmorQuality, req.body.gear.totalShieldQuality, req.body.gear.totalCyberwareArmorQuality, req.body.gear.totalCyberwareHealthBoxesCreated, rb.char_status_id]
            pool.query(charStatusSqlText, charStatusParams)
        })
        .then(result => {
            // change armor mod, equipped status
            const armor = req.body.gear.armor
            const armorSqlText = `UPDATE "char_armor_bridge"
            SET "armor_mod_1" = $1, "equipped" = $2
            WHERE armor_bridge_id = $3`

            for (let i = 0; i < armor.length; i++) {
                const armorSqlParams = [armor[i].armor_mod_1, armor[i].equipped, armor[i].armor_bridge_id]
                pool.query(armorSqlText, armorSqlParams)
            }

            // change shield mod, equipped status
            const shield = req.body.gear.shield
            const shieldSqlText = `UPDATE "char_shield_bridge"
            SET "armor_mod_1" = $1, "equipped" = $2
            WHERE shield_bridge_id = $3`

            for (let i = 0; i < shield.length; i++) {
                const shieldSqlParams = [shield[i].armor_mod_1, shield[i].equipped, shield[i].shield_bridge_id]
                pool.query(shieldSqlText, shieldSqlParams)
            }

            // change weapon details
            const weapons = req.body.gear.weapons
            const weaponsSqlText = `UPDATE "char_weapons_bridge"
            SET "weapon_mod_1" = $1, "weapon_mod_2" = $2, "current_shots_fired" = $3, "equipped" = $4
            WHERE weapon_bridge_id = $5`

            for (let i = 0; i < weapons.length; i++) {
                const weaponSqlParams = [weapons[i].weapon_mod_1, weapons[i].weapon_mod_2, weapons[i].current_shots_fired, weapons[i].equipped, weapons[i].weapon_bridge_id]
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
                const boughtArmorSqlText = `INSERT INTO "char_armor_bridge" ("char_id", "armor_id", "armor_mod_1", "equipped")
            VALUES ($1, $2, $3, $4);`
                for (let i = 0; i < boughtArmor.length; i++) {
                    const boughtArmorParams = [req.user.id, boughtArmor[i].armor_master_id, 1, false]
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
                const boughtShieldSqlText = `INSERT INTO "char_shield_bridge" ("char_id", "shield_id", "armor_mod_1", "equipped")
            VALUES ($1, $2, $3, $4);`
                for (let i = 0; i < boughtShield.length; i++) {
                    const boughtShieldParams = [req.user.id, boughtShield[i].shield_master_id, 1, false]
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
                const boughtWeaponsSqlText = `INSERT INTO "char_weapons_bridge" ("char_id", "weapon_id", "weapon_mod_1", "weapon_mod_2", "current_shots_fired", "equipped")
            VALUES ($1, $2, $3, $4, $5, $6);`
                for (let i = 0; i < boughtWeapons.length; i++) {
                    const boughtWeaponsParams = [req.user.id, boughtWeapons[i].weapon_master_id, 1, 1, 0, false]
                    pool.query(boughtWeaponsSqlText, boughtWeaponsParams)
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
                    const boughtMiscGearParams = [req.user.id, boughtMiscGear[i].misc_gear_master_id]
                    pool.query(boughtMiscGearSqlText, boughtMiscGearParams)
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
                    const boughtCyberwareParams = [req.user.id, boughtCyberware[i].cyberware_master_id]
                    pool.query(boughtCyberwareSqlText, boughtCyberwareParams)
                }
            }

        })
        .then((result) => {
            res.sendStatus(201)
        })
        .catch(err => {
            console.log(`Error creating character,`, err);
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
		"perm_humanity_loss","max_luck","max_xp","spent_xp","bank"
	)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 
        $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, 
        $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, 
        $29, $30, $31, $32, $33, $34, $35, $36, $37, $38, 
        $39, $40, $41, $42, $43, $44, $45, $46, $47, $48, $49, 
        $50, $51, $52, $53, $54, $55, $56, $57, $58, 
        $59, $60, $61, $62, $63, 
        $64, $65, $66, $67, $68)
        RETURNING id;`

    const charParams = [req.user.id, rb.handle, rb.player, rb.role, rb.culture, rb.concept, rb.campaign, rb.isParamedical,
    rb.strength, rb.body, rb.reflexes, rb.move, rb.appearance, rb.cool, rb.street_cred, rb.intelligence, rb.willpower, rb.technique,
    rb.athletics, rb.brawling, rb.concentration, rb.evasion, rb.fastTalk, rb.firearms, rb.legerdemain, rb.meleeWeapons, rb.perception, rb.streetwise,
    rb.demolitions, rb.driveLand, rb.driveExotic, rb.etiquette, rb.exoticWeapons, rb.heavyWeapons, rb.performance, rb.stealth, rb.survival, rb.tracking,
    rb.business, rb.cryptography, rb.cyberTech, rb.firstAid, rb.paramedic, rb.investigation, rb.gambling, rb.language, rb.militaryTech, rb.science, rb.vehicleTech,
    rb.rockerboy, rb.solo, rb.netrunner, rb.nomad, rb.media, rb.medtech, rb.medSurgery, rb.medPharma, rb.medCryo,
    rb.maker, rb.makerField, rb.makerUpgrade, rb.makerFab, rb.makerInvent, 0, 5, 0, 0, 300]

    pool.query(charSqlText, charParams)
        .then((result) => {
            for (let i = 0; i < req.body.armor.length; i++) {
                const armorSqlText = `INSERT INTO "char_armor_bridge" 
                ("char_id", "armor_id", "armor_mod_1", "equipped")
                VALUES ($1, $2, $3, $4)`
                const armorSqlParams = [result.rows[0].id, rb.armor[i] + 1, 1, false]
                pool.query(armorSqlText, armorSqlParams)
            }
            for (let i = 0; i < req.body.shield.length; i++) {
                const shieldSqlText = `INSERT INTO "char_shield_bridge" 
                ("char_id", "shield_id", "armor_mod_1", "equipped")
                VALUES ($1, $2, $3, $4)`
                const shieldSqlParams = [result.rows[0].id, rb.shield[i] + 1, 1, false]
                pool.query(shieldSqlText, shieldSqlParams)
            }
            for (let i = 0; i < req.body.weapons.length; i++) {
                const weaponSqlText = `INSERT INTO "char_weapons_bridge" 
                ("char_id", "weapon_id", "weapon_mod_1", "weapon_mod_2", "current_shots_fired", "equipped")
                VALUES ($1, $2, $3, $4, $5, $6)`
                const weaponSqlParams = [result.rows[0].id, rb.weapons[i] + 1, 1, 1, 0, true]
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
            "current_armor_loss","current_humanity_loss","current_luck_loss", "current_armor_quality", "current_shield_quality", "current_cyberware_armor_quality", "current_cyberware_health_boxes")
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`
            const bridgeParams = [result.rows[0].id, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
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

module.exports = router