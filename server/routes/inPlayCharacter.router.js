const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const { rejectNonAdmin } = require('../modules/rejectNonAdmin');

router.post('/fetchInPlayCharDetail', rejectUnauthenticated, (req, res) => {
  const sqlText = `SELECT * FROM "character"
  JOIN "campaigns" ON "character"."campaign" = "campaigns"."campaign_id"
  WHERE id = $1`;
  pool
    .query(sqlText, [req.body.charID])
    .then((result) => {
      res.send(result.rows[0]);
    })
    .catch((error) => {
      console.error('Error fetching in play sheet character details:', error);
      res.sendStatus(400);
    });
});

router.post('/fetchInPlayCharStatus', rejectUnauthenticated, (req, res) => {
  const sqlText = `SELECT * FROM "char_status"
  WHERE char_id = $1`;
  pool
    .query(sqlText, [req.body.charID])
    .then((result) => {
      res.send(result.rows[0]);
    })
    .catch((error) => {
      console.error('Error fetching character status details', error);
      res.sendStatus(400);
    });
});

router.post('/fetchInPlayCharCyberware', rejectUnauthenticated, (req, res) => {
  const sqlText = `SELECT * FROM "char_owned_cyberware"
  JOIN "cyberware_master" ON "char_owned_cyberware"."cyberware_master_id" = "cyberware_master"."cyberware_master_id"
  WHERE "char_id" = $1`;
  pool
    .query(sqlText, [req.body.charID])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.error('Error fetching character cyberware list:', error);
      res.sendStatus(400);
    });
});

router.post('/fetchInPlayCharacterArmor', rejectUnauthenticated, (req, res) => {
  const sqlText = `SELECT * FROM "char_armor_bridge"
  JOIN "armor_master" ON "char_armor_bridge"."armor_id" = "armor_master"."armor_master_id"
  WHERE "char_id" = $1 AND "equipped" = TRUE
  ORDER BY "is_shield"`;
  pool
    .query(sqlText, [req.body.charID])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.error('Error fetching character equipped armor list:', error);
      res.sendStatus(400);
    });
});

router.post('/fetchInPlayCharWeapons', rejectUnauthenticated, (req, res) => {
  const sqlText = `SELECT * FROM "char_weapons_bridge"
  JOIN "weapon_master" ON "char_weapons_bridge"."weapon_id" = "weapon_master"."weapon_master_id"
  WHERE "char_id" = $1 AND "equipped" = TRUE`;
  pool
    .query(sqlText, [req.body.charID])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.error('Error fetching character equipped weapon list:', error);
    });
});

router.post('/fetchInPlayGrenades', rejectUnauthenticated, (req, res) => {
  const sqlText = `SELECT * FROM "char_grenade_bridge"
  JOIN "grenade_master" on "char_grenade_bridge"."grenade_id" = "grenade_master"."grenade_master_id"
  WHERE "char_id" = $1`;
  pool
    .query(sqlText, [req.body.charID])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.error('Error fetching character grenade list:', error);
    });
});

router.post('/fetchInPlayMiscGear', rejectUnauthenticated, (req, res) => {
  const sqlText = `SELECT * FROM "char_gear_bridge"
  JOIN "misc_gear_master" ON "char_gear_bridge"."misc_gear_id" = "misc_gear_master"."misc_gear_master_id"
  WHERE "char_id" = $1`;
  pool
    .query(sqlText, [req.body.charID])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.error('Error fetching char misc gear list:', error);
    });
});

router.post('/inPlayStatusChange', rejectUnauthenticated, (req, res) => {
  const sqlText = `UPDATE "char_status" SET
  "current_stun" = $1,
  "current_lethal" = $2,
  "current_agg" = $3, 
  "current_luck_loss" = $4, 
  "current_armor_quality" = $5, 
  "current_shield_quality" = $6, 
  "current_cyberware_armor_quality" = $7, 
  "current_cyberware_health_boxes" = $8, 
  "current_cyberware_armor_loss" = $9
  WHERE "char_id" = $10`;
  const sqlParams = [
    req.body.current_stun,
    req.body.current_lethal,
    req.body.current_agg,
    req.body.current_luck_loss,
    req.body.current_armor_quality,
    req.body.current_shield_quality,
    req.body.current_cyberware_armor_quality,
    req.body.current_cyberware_health_boxes,
    req.body.current_cyberware_armor_loss,
    req.body.charID,
  ];
  pool
    .query(sqlText, sqlParams)
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.error('Error changing character in play status:', error);
      res.sendStatus(400);
    });
});

router.post('/inPlayArmorChange', rejectUnauthenticated, (req, res) => {
  const sqlText = `UPDATE "char_armor_bridge" 
  SET "this_armor_loss" = $1
  WHERE "armor_bridge_id" = $2`;
  const sqlParams = [req.body.this_armor_loss, req.body.armor_bridge_id];
  pool
    .query(sqlText, sqlParams)
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.error('Error changing character in play armor:', error);
      res.sendStatus(400);
    });
});

router.post('/inPlayWeaponChange', rejectUnauthenticated, (req, res) => {
  const sqlText = `UPDATE "char_weapons_bridge"
  SET "current_shots_fired" = $1
  WHERE "weapon_bridge_id" = $2`;
  const sqlParams = [req.body.current_shots_fired, req.body.weapon_bridge_id];
  pool
    .query(sqlText, sqlParams)
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.error('Error changing character in play weapon:', error);
      res.sendStatus(400);
    });
});

router.post('/inPlayUseGrenade', rejectUnauthenticated, (req, res) => {
  const sqlText = `DELETE FROM "char_grenade_bridge" WHERE "grenade_bridge_id" = $1`;
  const sqlParams = [req.body.grenade_bridge_id];
  pool
    .query(sqlText, sqlParams)
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.error('Error changing character in play grenades:', error);
      res.sendStatus(400);
    });
});

router.post('/inPlayUseConsumable', rejectUnauthenticated, (req, res) => {
  const sqlText = `DELETE FROM "char_gear_bridge" WHERE "char_gear_bridge_id" = $1`;
  pool
    .query(sqlText, [req.body.char_gear_bridge_id])
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.error('Error using in play consumable:', error);
    });
});

router.post('/inPlayBankChange', rejectUnauthenticated, (req, res) => {
  const sqlText = `UPDATE "character" SET "bank" = $1 WHERE "id" = $2`;
  const sqlParams = [req.body.bank, req.body.charID];
  pool
    .query(sqlText, sqlParams)
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.error('Error changing character bank:', error);
      res.sendStatus(400);
    });
});

module.exports = router;
