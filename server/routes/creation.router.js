const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

const { rejectUnauthenticated } = require('../modules/authentication-middleware')
const { rejectNonAdmin } = require('../modules/rejectNonAdmin')

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
                const armorSqlText = `INSERT INTO "char_armor_bridge" 
                ("char_id", "armor_id", "equipped")
                VALUES ($1, $2, $3, $4)`
                const armorSqlParams = [result.rows[0].id, rb.armor[i], false]
                pool.query(armorSqlText, armorSqlParams)
            }
            for (let i = 0; i < req.body.shield.length; i++) {
                const shieldSqlText = `INSERT INTO "char_shield_bridge" 
                ("char_id", "shield_id", "equipped")
                VALUES ($1, $2, $3, $4)`
                const shieldSqlParams = [result.rows[0].id, rb.shield[i], false]
                pool.query(shieldSqlText, shieldSqlParams)
            }
            for (let i = 0; i < req.body.weapons.length; i++) {
                const weaponSqlText = `INSERT INTO "char_weapons_bridge" 
                ("char_id", "weapon_id", "weapon_mod_1", "weapon_mod_2", "current_shots_fired", "equipped")
                VALUES ($1, $2, $3, $4, $5, $6)`
                const weaponSqlParams = [result.rows[0].id, rb.weapons[i], 1, 1, 0, true]
                pool.query(weaponSqlText, weaponSqlParams)
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