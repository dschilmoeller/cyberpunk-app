const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

const { rejectUnauthenticated } = require('../modules/authentication-middleware');

router.post('/fetchCharDetails', rejectUnauthenticated, (req, res) => {
  const sqlText = `SELECT * FROM "character" WHERE id = $1`;
  pool
    .query(sqlText, [req.body.charID])
    .then((result) => {
      res.send(result.rows[0]);
    })
    .catch((err) => {
      console.log(`Error fetching equip character details:`, err);
      res.sendStatus(400);
    });
});

router.post('/fetchStatus', rejectUnauthenticated, (req, res) => {
  const sqlText = `SELECT * FROM "char_status" where char_id = $1`;
  pool
    .query(sqlText, [req.body.charID])
    .then((result) => {
      res.send(result.rows[0]);
    })
    .catch((err) => {
      console.error('Error fetching equip char status:', err);
      res.sendStatus(400);
    });
});

router.post('/fetchCharArmor', rejectUnauthenticated, (req, res) => {
  const armorText = `SELECT * FROM "char_armor_bridge"
  JOIN "armor_master" ON "char_armor_bridge"."armor_id" = "armor_master"."armor_master_id"
  WHERE "char_id" = $1`;
  pool
    .query(armorText, [req.body.charID])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.error('Error fetching armor:', err);
      res.sendStatus(400);
    });
});

router.post('/updateEquipageArmor', rejectUnauthenticated, (req, res) => {
  const sqlText = `UPDATE "char_armor_bridge" SET "this_armor_loss" = $1, "equipped" = $2 WHERE "armor_bridge_id" = $3`;
  const sqlParams = [req.body.this_armor_loss, req.body.equipped, req.body.armor_bridge_id];
  pool
    .query(sqlText, sqlParams)
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error('Error changing armor status:', err);
      res.sendStatus(400);
    });
});

router.post('/fetchCharWeapons', rejectUnauthenticated, (req, res) => {
  const weaponText = `SELECT * FROM "char_weapons_bridge"
  JOIN "weapon_master" ON "char_weapons_bridge"."weapon_id" = "weapon_master"."weapon_master_id"
  WHERE "char_id" = $1`;
  pool
    .query(weaponText, [req.body.charID])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.error('Error fetching weapons:', err);
      res.sendStatus(400);
    });
});

router.post('/fetchCharGrenades', rejectUnauthenticated, (req, res) => {
  const grenadeText = `SELECT * FROM "char_grenade_bridge"
  JOIN "grenade_master" on "char_grenade_bridge"."grenade_id" = "grenade_master"."grenade_master_id"
  WHERE "char_id" = $1`;
  pool
    .query(grenadeText, [req.body.charID])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.error('Error fetching grenades:', err);
      res.sendStatus(400);
    });
});

router.post('/fetchCharMiscGear', rejectUnauthenticated, (req, res) => {
  const miscText = `SELECT * FROM "char_gear_bridge"
  JOIN "misc_gear_master" ON "char_gear_bridge"."misc_gear_id" = "misc_gear_master"."misc_gear_master_id"
  WHERE "char_id" = $1`;
  pool
    .query(miscText, [req.body.charID])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.error('Error fetching misc gear:', err);
      res.sendStatus(400);
    });
});

router.post('/fetchCharPharmaGear', rejectUnauthenticated, (req, res) => {
  const pharmaText = `SELECT * FROM "char_pharma_bridge" 
  JOIN "pharma_master" ON "char_pharma_bridge"."pharma_master_id" = "pharma_master"."pharma_master_id"
  WHERE "char_id" = $1`;
  pool
    .query(pharmaText, [req.body.charID])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.error('Error fetching pharma gear:', err);
      res.sendStatus(400);
    });
});

router.post('/fetchCharCyberware', rejectUnauthenticated, (req, res) => {
  const cyberText = `SELECT * FROM "char_owned_cyberware"
  JOIN "cyberware_master" ON "char_owned_cyberware"."cyberware_master_id" = "cyberware_master"."cyberware_master_id"
  WHERE "char_id" = $1`;
  pool
    .query(cyberText, [req.body.charID])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.error('Error fetching cyberware:', err);
      res.sendStatus(400);
    });
});

router.post('/fetchCharVehicles', rejectUnauthenticated, (req, res) => {
  const vehicleText = `SELECT * FROM "char_vehicle_bridge"
  JOIN "vehicle_master" ON "char_vehicle_bridge"."vehicle_id" = "vehicle_master"."vehicle_master_id"
  WHERE "char_id" = $1`;
  pool
    .query(vehicleText, [req.body.charID])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.error('Error fetching vehicles:', err);
      res.sendStatus(400);
    });
});

router.post('/fetchCharVehicleMods', rejectUnauthenticated, (req, res) => {
  const vehicleModText = `SELECT * FROM "char_owned_vehicle_mods"
  JOIN "vehicle_mod_master" ON "char_owned_vehicle_mods"."vehicle_mod_master_id" = "vehicle_mod_master"."vehicle_mod_master_id"
  WHERE "char_id" = $1`;
  pool
    .query(vehicleModText, [req.body.charID])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.error('Error fetching vehicles:', err);
      res.sendStatus(400);
    });
});

const whitelist = [
  // character table - updating for equipping cyberware
  'cyber_strength',
  'cyber_body',
  'cyber_reflexes',
  'cyber_appearance',
  'cyber_cool',
  'cyber_intelligence',
  'temp_humanity_loss',
  'perm_humanity_loss',
  // for repairing gear
  'bank',
  // char_status table
  // TODO I don't think either of the next two will be used again.
  'current_armor_quality',
  'current_shield_quality',
  // equipping cyberware
  'current_cyberware_armor_quality',
  'current_cyberware_health_boxes',
  'current_cyberware_armor_loss',
];

router.post('/updateCharacter', rejectUnauthenticated, (req, res) => {
  if (whitelist.includes(req.body.statName)) {
    const sqlText = `UPDATE "character" SET ${req.body.statName} = $1 WHERE id = $2`;
    const sqlParams = [req.body.newRank, req.body.charID];
    pool
      .query(sqlText, sqlParams)
      .then((result) => {
        res.sendStatus(200);
      })
      .catch((err) => {
        console.error('Error updating character details:', err);
        res.sendStatus(400);
      });
  } else {
    res.sendStatus(400);
  }
});

router.post('/updateCharacterStatus', rejectUnauthenticated, (req, res) => {
  if (whitelist.includes(req.body.statName)) {
    const sqlText = `UPDATE "char_status" SET ${req.body.statName} = $1 WHERE char_id = $2`;
    const sqlParams = [req.body.newRank, req.body.charID];
    pool
      .query(sqlText, sqlParams)
      .then((result) => {
        res.sendStatus(200);
      })
      .catch((err) => {
        console.error('Error updating character details:', err);
        res.sendStatus(400);
      });
  } else {
    res.sendStatus(400);
  }
});

module.exports = router;
