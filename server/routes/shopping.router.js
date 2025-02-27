const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

const { rejectUnauthenticated } = require('../modules/authentication-middleware');

router.post('/fetchCharDetails', rejectUnauthenticated, (req, res) => {
  const sqlText = `SELECT * FROM "character" JOIN "campaigns" ON "campaigns"."campaign_id" = "character"."campaign" WHERE id = $1`;
  pool
    .query(sqlText, [req.body.charID])
    .then((result) => {
      res.send(result.rows[0]);
    })
    .catch((err) => {
      console.error(`Error fetching equip character details:`, err);
      res.sendStatus(400);
    });
});

router.get('/fetchMasterArmorList', rejectUnauthenticated, (req, res) => {
  const sqlText = `SELECT * FROM "armor_master"`;
  pool
    .query(sqlText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.error('Error fetching character master armor list:', err);
      res.sendStatus(400);
    });
});

router.get('/fetchMasterWeaponsList', rejectUnauthenticated, (req, res) => {
  const sqlText = `SELECT * FROM "weapon_master" WHERE "is_treasure" = false`;
  pool
    .query(sqlText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.error('Error fetching character master weapon list:', err);
      res.sendStatus(400);
    });
});

router.get('/fetchMasterGrenadesList', rejectUnauthenticated, (req, res) => {
  const sqlText = `SELECT * FROM "grenade_master"`;
  pool
    .query(sqlText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.error('Error fetching character master grenade list:', err);
      res.sendStatus(400);
    });
});

router.get('/fetchMasterMiscGearList', rejectUnauthenticated, (req, res) => {
  const sqlText = `SELECT * FROM "misc_gear_master"`;
  pool
    .query(sqlText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.error('Error fetching character master misc gear list:', err);
      res.sendStatus(400);
    });
});

router.get('/fetchMasterPharmaList', rejectUnauthenticated, (req, res) => {
  const sqlText = `SELECT * from "pharma_master"`;
  pool
    .query(sqlText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.error('Error fetching character master pharma list:', err);
      res.sendStatus(400);
    });
});

router.get('/fetchMasterCyberwareList', rejectUnauthenticated, (req, res) => {
  const sqlText = `SELECT * from "cyberware_master"`;
  pool
    .query(sqlText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.error('Error fetching character master cyberware list:', err);
      res.sendStatus(400);
    });
});

router.get('/fetchMasterVehiclesList', rejectUnauthenticated, (req, res) => {
  const sqlText = `SELECT * FROM "vehicle_master"`;
  pool
    .query(sqlText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.error('Error fetching character master vehicle list:', err);
      res.sendStatus(400);
    });
});

router.get('/fetchMasterVehicleModsList', rejectUnauthenticated, (req, res) => {
  const sqlText = `SELECT * FROM "vehicle_mod_master"`;
  pool
    .query(sqlText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.error('Error fetching character master vehicle mod list:', err);
      res.sendStatus(400);
    });
});

router.post('/charChangeBank', rejectUnauthenticated, (req, res) => {
  const sqlText = `UPDATE "character" SET "bank" = $1 WHERE "id" = $2`;
  const sqlParams = [req.body.newBank, req.body.charID];
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

router.post('/charChangeNomadVehicleSlots', rejectUnauthenticated, (req, res) => {
  const sqlText = `UPDATE "character" set "nomad_vehicle_slots" = $1 WHERE "id" = $2`;
  const sqlParams = [req.body.newSlotCount, req.body.charID];
  pool
    .query(sqlText, sqlParams)
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error('Error changing character Nomad Vehicle Slots:', err);
      res.sendStatus(400);
    });
});

router.post('/charPurchaseGear', rejectUnauthenticated, (req, res) => {
  let sqlText = ``;
  switch (req.body.type) {
    case 'Armor':
      sqlText = `WITH inserted_row AS 
                  (INSERT INTO "char_armor_bridge" ("char_id", "armor_id") 
                  VALUES ($1, $2) 
                  RETURNING *) 
                SELECT * FROM inserted_row
                JOIN "armor_master" ON inserted_row.armor_id = "armor_master"."armor_master_id"`;
      break;
    case 'Weapon':
      sqlText = `WITH inserted_row AS 
                  (INSERT INTO "char_weapons_bridge" ("char_id", "weapon_id") 
                  VALUES ($1, $2) 
                  RETURNING *) 
                SELECT * FROM inserted_row
                JOIN "weapon_master" ON inserted_row.weapon_id = "weapon_master"."weapon_master_id"`;
      break;
    case 'Grenade':
      sqlText = `WITH inserted_row AS 
                  (INSERT INTO "char_grenade_bridge" ("char_id", "grenade_id", "qty_owned") 
                  VALUES ($1, $2, 1) 
                  RETURNING *) 
                SELECT * FROM inserted_row
                JOIN "grenade_master" ON inserted_row.grenade_id = "grenade_master"."grenade_master_id"`;
      break;
    case 'Misc':
      sqlText = `WITH inserted_row AS 
                  (INSERT INTO "char_gear_bridge" ("char_id", "misc_gear_id") 
                  VALUES ($1, $2) 
                  RETURNING *) 
                SELECT * FROM inserted_row
                JOIN "misc_gear_master" ON inserted_row.misc_gear_id = "misc_gear_master"."misc_gear_master_id"`;
      break;
    case 'Pharma':
      sqlText = `WITH inserted_row AS 
                  (INSERT INTO "char_pharma_bridge" ("char_id", "pharma_master_id", "qty_owned") 
                  VALUES ($1, $2, 1) 
                  RETURNING *) 
                SELECT * FROM inserted_row
                JOIN "pharma_master" ON inserted_row.pharma_master_id = "pharma_master"."pharma_master_id"`;
      break;
    case 'Cyberware':
      sqlText = `WITH inserted_row AS 
                  (INSERT INTO "char_owned_cyberware" ("char_id", "cyberware_master_id","equipped") 
                  VALUES ($1, $2, false) 
                  RETURNING *) 
                SELECT * FROM inserted_row
                JOIN "cyberware_master" ON inserted_row.cyberware_master_id = "cyberware_master"."cyberware_master_id"`;
      break;
    case 'Vehicle':
      sqlText = `WITH inserted_row AS
                  (INSERT INTO "char_vehicle_bridge" 
                    (
                        "char_id", "vehicle_id","current_damage","current_armor_damage", "total_mod_cost","has_armor","extra_seats")
                      VALUES 
                        ($1, $2, 0, 0, 0, false, 0)
                      RETURNING *
                    ) 
                SELECT * FROM inserted_row
                JOIN "vehicle_master" ON inserted_row.vehicle_id = "vehicle_master"."vehicle_master_id"`;
      break;
    default:
      console.error('Error - invalid purchase type.');
      res.sendStatus(400);
      break;
  }
  const sqlParams = [req.body.charID, req.body.gearID];
  pool
    .query(sqlText, sqlParams)
    .then((result) => {
      if (result.rowCount > 0) {
        res.send(result.rows[0]);
      } else {
        res.sendStatus(400);
      }
    })
    .catch((err) => {
      console.error('Error character purchasing gear:', err);
      res.sendStatus(400);
    });
});

router.post('/charSellGear', rejectUnauthenticated, (req, res) => {
  let sqlText = ``;
  switch (req.body.type) {
    case 'Armor':
      sqlText = `DELETE FROM "char_armor_bridge" WHERE "armor_bridge_id" = $1`;
      break;
    case 'Weapon':
      sqlText = `DELETE FROM "char_weapons_bridge" WHERE "weapon_bridge_id" = $1`;
      break;
    case 'Grenade':
      sqlText = `DELETE FROM "char_grenade_bridge" WHERE "grenade_bridge_id" = $1`;
      break;
    case 'Misc':
      sqlText = `DELETE FROM "char_gear_bridge" WHERE "char_gear_bridge_id" = $1`;
      break;
    case 'Pharma':
      sqlText = `DELETE FROM "char_pharma_bridge" WHERE "char_pharma_bridge_id" = $1`;
      break;
    case 'Cyberware':
      sqlText = `DELETE FROM "char_owned_cyberware" WHERE "owned_cyberware_id" = $1`;
      break;
    case 'Vehicle':
      sqlText = `DELETE FROM "char_vehicle_bridge" WHERE "vehicle_bridge_id" = $1`;
      break;
    default:
      console.error('Error - invalid sell type.');
      res.sendStatus(400);
      break;
  }

  const sqlParams = [req.body.gearID];
  pool
    .query(sqlText, sqlParams)
    .then((result) => {
      if (result.rowCount > 0) {
        res.sendStatus(200);
      } else {
        res.sendStatus(400);
      }
    })
    .catch((err) => {
      console.error('Error character selling gear:', err);
      res.sendStatus(400);
    });
});

router.post('/charChangeGearQty', rejectUnauthenticated, (req, res) => {
  let sqlText = ``;
  switch (req.body.type) {
    case 'Grenade':
      sqlText = `UPDATE "char_grenade_bridge" set "qty_owned" = $1 WHERE "grenade_bridge_id" = $2`;
      break;
    case 'Pharma':
      sqlText = `UPDATE "char_pharma_bridge" set "qty_owned" = $1 WHERE "char_pharma_bridge_id" = $2`;
      break;
    default:
      console.error('Error - invalid sell type.');
      res.sendStatus(400);
      break;
  }

  const sqlParams = [req.body.qty_owned, req.body.gearID];
  pool
    .query(sqlText, sqlParams)
    .then((result) => {
      if (result.rowCount > 0) {
        res.sendStatus(200);
      } else {
        res.sendStatus(400);
      }
    })
    .catch((err) => {
      console.error('Error character selling gear:', err);
      res.sendStatus(400);
    });
});

module.exports = router;
