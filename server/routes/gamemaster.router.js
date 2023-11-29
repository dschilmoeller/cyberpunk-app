const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

const { rejectUnauthenticated } = require('../modules/authentication-middleware')
const { rejectNonAdmin } = require('../modules/rejectNonAdmin')

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
                const boughtArmorSqlText = `INSERT INTO "char_armor_bridge" ("char_id", "armor_id", "equipped")
            VALUES ($1, $2, $3, $4);`
                for (let i = 0; i < boughtArmor.length; i++) {
                    const boughtArmorParams = [req.body.charDetail.id, boughtArmor[i].armor_master_id, false]
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
                const boughtShieldSqlText = `INSERT INTO "char_shield_bridge" ("char_id", "shield_id", "equipped")
            VALUES ($1, $2, $3, $4);`
                for (let i = 0; i < boughtShield.length; i++) {
                    const boughtShieldParams = [req.body.charDetail.id, boughtShield[i].shield_master_id, false]
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
                const boughtWeaponsSqlText = `INSERT INTO "char_weapons_bridge" ("char_id", "weapon_id", "weapon_mod_1", "weapon_mod_2", "current_shots_fired", "equipped")
                VALUES ($1, $2, $3, $4, $5, $6);`
                for (let i = 0; i < boughtWeapons.length; i++) {
                    const boughtWeaponsParams = [req.body.charDetail.id, boughtWeapons[i].weapon_master_id, 1, 1, 0, false]
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

// eventually move all routes to do with the GM page here