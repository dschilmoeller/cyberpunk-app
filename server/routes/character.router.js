const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// To Do: add blocker for not-logged in
// rewrite SQL requests to limit characters to those belonging to logged in user (req.user.id?)
// add res.send(error) to catch statements.
// Eventually - GM section or change commands to allow for user type.



// fetch characters list route
router.get('/fetchallcharacters', (req, res) => {
    const sqlText = `SELECT id, handle, campaign
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

// fetch character misc gear for in play character sheet
router.get('/fetchCharacterMiscGear/:id', (req, res) => {
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

// use consumable from pack:
router.delete('/useConsumable/:id', (req, res) => {
    const sqlText = `DELETE FROM "char_gear_bridge" WHERE "char_gear_bridge_id" = $1`
    const sqlParams = [req.params.id]
    console.log(`query should be:`, sqlText, sqlParams);
    pool.query(sqlText, sqlParams)
    .then((result) => {
        res.sendStatus(202)
    })
    .catch(err => {
        console.log(`Error using consumable:`, err);
    })
})

// save changes made on in play character sheet.
router.put('/savecharacter/:id', (req, res) => {
    const sqlText = `UPDATE "char_status"
    SET "current_stun" = $1, "current_lethal" = $2, "current_agg" = $3, "current_armor_loss" = $4, "current_luck_loss" = $5
    WHERE "char_id" = $6;`
    const sqlParams = [req.body.current_stun, req.body.current_lethal, req.body.current_agg, req.body.current_armor_loss, req.body.current_luck_loss, req.params.id]

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

    const sqlParams = [req.body.current_shots_fired, req.body.weapon_bridge_id]
    pool.query(sqlText, sqlParams)
        .then((result) => {
            res.sendStatus(202)
        })
        .catch(err => {
            console.log(`error saving weapon bridge status:`, err);
        })
})

router.put('/characterBurnOneLuck/:id', (req, res) => {
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

    // swapped concept for temp humanity loss tracker rather than re-number all items.
    const charSqlText = `UPDATE "character"
    SET  "is_paramedical" = $1,
    "strength" = $2, "body" = $3, "reflexes" = $4, "appearance" = $5, "cool" = $6, "street_cred" = $7, "intelligence" = $8, "willpower" = $9, "technique" = $10,
    "athletics" = $11, "brawling" = $12, "concentration" = $13, "evasion" = $14, "fast_talk" = $15, "firearms" = $16, "legerdemain" = $17, "melee_weapons" = $18, "perception" = $19, "streetwise" = $20,
    "demolitions" = $21, "drive_land" = $22, "drive_exotic" = $23, "etiquette" = $24, "exotic_weapons" = $25, "heavy_weapons" = $26, "performance" = $27, "stealth" = $28, "survival" = $29, "tracking" = $30,
    "business" = $31, "cryptography" = $32, "cyber_tech" = $33, "first_aid" = $34, "paramed" = $35, "investigation" = $36, "gambling" = $37, "language" = $38, "military_tech" = $39, "science" = $40, "vehicle_tech" = $41,
    "rockerboy" = $42, "solo" = $43, "netrunner" = $44, "nomad" = $45, "media" = $46, "medtech" = $47, "med_surgery" = $48, "med_pharma" = $49, "med_cryo" = $50,
    "maker" = $51, "maker_field" = $52, "maker_upgrade" = $53, "maker_fab" = $54, "maker_invent" = $55,
    "perm_humanity_loss" = $56, "temp_humanity_loss" = $57, "max_luck" = $58, "max_xp" = $59, "spent_xp" = $60, "bank" = $61,
    "cyber_strength" = $62, "cyber_body" = $63, "cyber_reflexes" = $64, "cyber_appearance" = $65, "cyber_cool" = $66, "cyber_intelligence" = $67
    WHERE id = $68`

    const charParams = [rb.is_paramedical,
    rb.strength, rb.body, rb.reflexes, rb.appearance, rb.cool, rb.street_cred, rb.intelligence, rb.willpower, rb.technique,
    rb.athletics, rb.brawling, rb.concentration, rb.evasion, rb.fast_talk, rb.firearms, rb.legerdemain, rb.melee_weapons, rb.perception, rb.streetwise,
    rb.demolitions, rb.drive_land, rb.drive_exotic, rb.etiquette, rb.exotic_weapons, rb.heavy_weapons, rb.performance, rb.stealth, rb.survival, rb.tracking,
    rb.business, rb.cryptography, rb.cyber_tech, rb.first_aid, rb.paramed, rb.investigation, rb.gambling, rb.language, rb.military_tech, rb.science, rb.vehicle_tech,
    rb.rockerboy, rb.solo, rb.netrunner, rb.nomad, rb.media, rb.medtech, rb.med_surgery, rb.med_pharma, rb.med_cryo,
    rb.maker, rb.maker_field, rb.maker_upgrade, rb.maker_fab, rb.maker_invent, rb.perm_humanity_loss, rb.temp_humanity_loss, rb.max_luck, rb.max_xp, rb.spent_xp, rb.bank,
    rb.cyber_strength, rb.cyber_body, rb.cyber_reflexes, rb.cyber_appearance, rb.cyber_cool, rb.cyber_intelligence,
    rb.char_id]

    pool.query(charSqlText, charParams)
        .then(result => {
            // query to save character status!
            const charStatusSqlText = `UPDATE "char_status"
        SET "current_armor_quality"= $1, "current_shield_quality" = $2, "current_cyberware_armor_quality" = $3, "current_cyberware_health_boxes" = $4
        WHERE char_status_id = $5`

            const charStatusParams = [req.body.gear.totalArmorQuality, req.body.gear.totalShieldQuality, req.body.gear.totalCyberwareArmorQuality, req.body.gear.totalCyberwareHealthBoxesCreated, rb.char_status_id]
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
                    const boughtArmorParams = [req.body.char.id, boughtArmor[i].armor_master_id, 1, false]
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
                    const boughtShieldParams = [req.body.char.id, boughtShield[i].shield_master_id, 1, false]
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
                    const boughtWeaponsParams = [req.body.char.id, boughtWeapons[i].weapon_master_id, 1, 1, 0, false]
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
                    const boughtMiscGearParams = [req.body.char.id, boughtMiscGear[i].misc_gear_master_id]
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



// Creation save route(s)

router.post('/saveCreationCharacter/', (req, res) => {
    const rb = req.body
    const charSqlText = `INSERT INTO "character" (
		"user_id","handle","player","campaign","is_paramedical",
		"strength","body","reflexes","appearance","cool","street_cred","intelligence","willpower","technique",
		"athletics","brawling","concentration","evasion","fast_talk","firearms","legerdemain","melee_weapons","perception","streetwise",
        "demolitions","drive_land","drive_exotic","etiquette","exotic_weapons","heavy_weapons","performance","stealth","survival","tracking",
        "business","cryptography","cyber_tech","investigation","first_aid","paramed","gambling","language","military_tech","science","vehicle_tech",
		"rockerboy","solo","netrunner","nomad","media","medtech","med_surgery","med_pharma","med_cryo",
		"maker","maker_field","maker_upgrade","maker_fab","maker_invent",
		"perm_humanity_loss","max_luck","max_xp","spent_xp","bank"
	)
    VALUES ($1, $2, $3, $4, $5, 
        $6, $7, $8, $9, $10, $11, $12, $13, $14, 
        $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, 
        $25, $26, $27, $28, $29, $30, $31, $32, $33, $34, 
        $35, $36, $37, $38, $39, $40, $41, $42, $43, $44, $45, 
        $46, $47, $48, $49, $50, $51, $52, $53, $54, 
        $55, $56, $57, $58, $59, 
        $60, $61, $62, $63, $64)
        RETURNING id;`

    const charParams = [req.user.id, rb.handle, rb.player, rb.campaign, rb.isParamedical,
    rb.strength, rb.body, rb.reflexes, rb.appearance, rb.cool, rb.street_cred, rb.intelligence, rb.willpower, rb.technique,
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
            "current_armor_loss","current_luck_loss", "current_armor_quality", "current_shield_quality", "current_cyberware_armor_quality", "current_cyberware_health_boxes")
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
router.get('/fetchGameMasterCharacters', (req, res) => {
    const sqlText = `SELECT id, handle, player, max_xp, spent_xp, bank, cool, cyber_cool, perception, perm_humanity_loss, temp_humanity_loss, reflexes, cyber_reflexes
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

router.put('/savegamemastercharacter/:id', (req, res) => {
    const charDetailsSqlText = `UPDATE character
    SET handle = $1, player = $2, campaign = $3, max_xp = $4, spent_xp = $5, bank = $6, street_cred = $7, max_luck = $8, temp_humanity_loss = $9, perm_humanity_loss = $10
    WHERE id = $11`

    const charDetailUpdateParams = [req.body.handle, req.body.player, req.body.campaign, req.body.charDetail.max_xp, req.body.charDetail.spent_xp, req.body.charDetail.bank, req.body.charDetail.street_cred, req.body.charDetail.max_luck, req.body.charDetail.temp_humanity_loss, req.body.charDetail.perm_humanity_loss, req.body.charDetail.id]
    pool.query(charDetailsSqlText, charDetailUpdateParams)
        .then(result => {
            res.sendStatus(203)
        })
        .catch(err => {
            console.log(`Error updating character for GM:`, err);
        })
})

router.delete('/deletegamemastercharacter/:id', (req, res) => {
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

module.exports = router