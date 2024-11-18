const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

const { rejectUnauthenticated } = require('../modules/authentication-middleware');

router.post('/fetchInPlayCharDetail', rejectUnauthenticated, (req, res) => {
  const sqlText = `SELECT * FROM "character"
  JOIN "campaigns" ON "character"."campaign" = "campaigns"."campaign_id"
  WHERE id = $1`;
  pool
    .query(sqlText, [req.body.charID])
    .then((result) => {
      res.send(result.rows[0]);
    })
    .catch((err) => {
      console.error('Error fetching in play sheet character details:', err);
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
    .catch((err) => {
      console.error('Error fetching character status details', err);
      res.sendStatus(400);
    });
});

router.post('/fetchInPlayCharCyberware', rejectUnauthenticated, (req, res) => {
  const sqlText = `SELECT * FROM "char_owned_cyberware"
  JOIN "cyberware_master" ON "char_owned_cyberware"."cyberware_master_id" = "cyberware_master"."cyberware_master_id"
  WHERE "char_id" = $1
  ORDER BY "name" ASC`;
  pool
    .query(sqlText, [req.body.charID])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.error('Error fetching character cyberware list:', err);
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
    .catch((err) => {
      console.error('Error fetching character equipped armor list:', err);
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
    .catch((err) => {
      console.error('Error fetching character equipped weapon list:', err);
      res.sendStatus(400);
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
    .catch((err) => {
      console.error('Error fetching character grenade list:', err);
      res.sendStatus(400);
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
    .catch((err) => {
      console.error('Error fetching char misc gear list:', err);
      res.sendStatus(400);
    });
});

router.post('/fetchInPlayPharmaGear', rejectUnauthenticated, (req, res) => {
  const sqlText = `SELECT * FROM "char_pharma_bridge" 
  JOIN "pharma_master" ON "char_pharma_bridge"."pharma_master_id" = "pharma_master"."pharma_master_id"
  WHERE "char_id" = $1`;
  pool
    .query(sqlText, [req.body.charID])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.error('Error fetching char pharma gear list:', err);
      res.sendStatus(400);
    });
});

router.post('/fetchInPlayVehicles', rejectUnauthenticated, (req, res) => {
  const sqlText = `SELECT * FROM "char_vehicle_bridge"
  JOIN "vehicle_master" ON "char_vehicle_bridge"."vehicle_id" = "vehicle_master"."vehicle_master_id"
  WHERE "char_id" = $1
  ORDER BY "name"`;
  pool
    .query(sqlText, [req.body.charID])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.error('Error fetching character vehicle list:', err);
      res.sendStatus(400);
    });
});

router.post('/fetchInPlayVehicleMods', rejectUnauthenticated, (req, res) => {
  const sqlText = `SELECT * FROM "char_owned_vehicle_mods"
  JOIN "vehicle_mod_master" ON "char_owned_vehicle_mods"."vehicle_mod_master_id" = "vehicle_mod_master"."vehicle_mod_master_id"
  JOIN "char_vehicle_mod_bridge" ON "char_owned_vehicle_mods"."char_owned_vehicle_mods_id" = "char_vehicle_mod_bridge"."char_owned_vehicle_mods_id"
  WHERE "char_id" = $1`;
  pool
    .query(sqlText, [req.body.charID])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.error('Error fetching character vehicle mod list:', err);
      res.sendStatus(400);
    });
});

router.post('/fetchInPlayNotes', rejectUnauthenticated, (req, res) => {
  const sqlText = `SELECT * FROM "char_notes" 
  WHERE "char_id" = $1 
  ORDER BY "favorite" DESC, "char_note_id"`;
  pool
    .query(sqlText, [req.body.charID])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.error('Error fetching in play notes:', err);
      res.sendStatus(400);
    });
});

router.post('/fetchInPlayContacts', rejectUnauthenticated, (req, res) => {
  const sqlText = `SELECT * FROM "char_contact_bridge"
  JOIN "contact_master" ON "char_contact_bridge"."contact_id" = "contact_master"."contact_master_id"
  WHERE "char_id" = $1
  ORDER BY "name"`;

  const sqlParams = [req.body.charID];
  pool
    .query(sqlText, sqlParams)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.error('Error fetching character contacts:', err);
      res.sendStatus(400);
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
    .catch((err) => {
      console.error('Error changing character in play status:', err);
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
    .catch((err) => {
      console.error('Error changing character in play armor:', err);
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
    .catch((err) => {
      console.error('Error changing character in play weapon:', err);
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
    .catch((err) => {
      console.error('Error changing character in play grenades:', err);
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
    .catch((err) => {
      console.error('Error using in play consumable:', err);
      res.sendStatus(400);
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
    .catch((err) => {
      console.error('Error changing character bank:', err);
      res.sendStatus(400);
    });
});

router.post('/inPlayUsePharma', rejectUnauthenticated, (req, res) => {
  const sqlText = `DELETE FROM "char_pharma_bridge" WHERE "char_pharma_bridge_id" = $1`;
  pool
    .query(sqlText, [req.body.char_pharma_bridge_id])
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error('Error using pharmaceutical:', err);
      res.sendStatus(400);
    });
});

router.post('/inPlayVehicleStatusChange', rejectUnauthenticated, (req, res) => {
  const sqlText = `UPDATE "char_vehicle_bridge" 
  SET 
  current_damage = $1,
  current_armor_damage = $2
  WHERE vehicle_bridge_id = $3`;
  const sqlParams = [req.body.current_damage, req.body.current_armor_damage, req.body.vehicle_bridge_id];
  pool
    .query(sqlText, sqlParams)
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error('Error updating vehicle:', err);
      res.sendStatus(400);
    });
});

router.post('/inPlayNoteCreate', rejectUnauthenticated, (req, res) => {
  const sqlText = `INSERT INTO "char_notes" ("char_id", "title", "body", "favorite")
    VALUES ($1, $2, $3, $4)`;
  const sqlParams = [req.body.charID, req.body.title, req.body.body, req.body.favorite];
  pool
    .query(sqlText, sqlParams)
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error('Error creating note', err);
      res.sendStatus(400);
    });
});

router.post('/inPlayNoteEdit', rejectUnauthenticated, (req, res) => {
  const sqlText = `UPDATE "char_notes"
    SET "title" = $1, "body" = $2, "favorite" = $3
    WHERE "char_note_id" = $4`;
  const sqlParams = [req.body.title, req.body.body, req.body.favorite, req.body.char_note_id];
  pool
    .query(sqlText, sqlParams)
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error('Error updating note:', err);
      res.sendStatus(400);
    });
});

router.post('/inPlayNoteDelete', rejectUnauthenticated, (req, res) => {
  const sqlText = `DELETE FROM "char_notes" WHERE "char_note_id" = $1`;
  const sqlParams = [req.body.char_note_id];
  pool
    .query(sqlText, sqlParams)
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error('Error deleting note:', err);
      res.sendStatus(400);
    });
});

router.post('/inPlayContactEdit', rejectUnauthenticated, (req, res) => {
  const sqlText = `UPDATE "char_contact_bridge" SET
  loyalty = $1, notes = $2
  WHERE "char_contact_id" = $3`;
  const sqlParams = [req.body.loyalty, req.body.notes, req.body.char_contact_id];
  pool
    .query(sqlText, sqlParams)
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error('Error editing player contact:', err);
      res.sendStatus(400);
    });
});

module.exports = router;
