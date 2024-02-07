const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

const { rejectUnauthenticated } = require('../modules/authentication-middleware')
const { rejectNonAdmin } = require('../modules/rejectNonAdmin')

// eventually move all routes to do with editing sheet (e.g. shopping / spend XP / equip gear pagees) here

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
            console.log(`Error fetching character advancement details`, err);
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
        SET "current_armor_quality"= $1, "current_shield_quality" = $2, "current_cyberware_armor_quality" = $3, "current_cyberware_health_boxes" = $4
        WHERE char_status_id = $5`

            const charStatusParams = [req.body.gear.totalArmorQuality, req.body.gear.totalShieldQuality, req.body.gear.totalCyberwareArmorQuality, req.body.gear.totalCyberwareHealthBoxesCreated, rb.char_status_id]
            pool.query(charStatusSqlText, charStatusParams)
        })
        .then(result => {
            // change armor mod, equipped status
            const armor = req.body.gear.armor
            const armorSqlText = `UPDATE "char_armor_bridge"
            SET "equipped" = $1
            WHERE armor_bridge_id = $2`

            for (let i = 0; i < armor.length; i++) {
                const armorSqlParams = [armor[i].equipped, armor[i].armor_bridge_id]
                pool.query(armorSqlText, armorSqlParams)
            }

            // change shield mod, equipped status
            const shield = req.body.gear.shield
            const shieldSqlText = `UPDATE "char_shield_bridge"
            SET "equipped" = $1
            WHERE shield_bridge_id = $2`

            for (let i = 0; i < shield.length; i++) {
                const shieldSqlParams = [shield[i].equipped, shield[i].shield_bridge_id]
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
                const boughtWeaponsSqlText = `INSERT INTO "char_weapons_bridge" ("char_id", "weapon_id", "weapon_mod_1", "weapon_mod_2", "current_shots_fired", "equipped")
            VALUES ($1, $2, $3, $4, $5, $6);`
                for (let i = 0; i < boughtWeapons.length; i++) {
                    const boughtWeaponsParams = [req.body.char.id, boughtWeapons[i].weapon_master_id, 1, 1, 0, false]
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