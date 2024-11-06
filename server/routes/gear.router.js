const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// Fetch Armor List
router.get('/fetcharmor', rejectUnauthenticated, (req, res) => {
  const sqlText = `SELECT * FROM "armor_master" order by "armor_master_id"`;

  pool
    .query(sqlText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log(`Error Fetching Armor List:`, err);
    });
});

// Other Fetches
router.get('/fetchshield', rejectUnauthenticated, (req, res) => {
  const sqlText = `SELECT * FROM "shield_master" order by "shield_master_id"`;
  pool
    .query(sqlText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log(`Error Fetching Armor List:`, err);
    });
});

router.get('/fetchweapon', rejectUnauthenticated, (req, res) => {
  const sqlText = `SELECT * FROM "weapon_master" order by "weapon_master_id"`;
  pool
    .query(sqlText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log(`Error Fetching Weapon List:`, err);
    });
});

router.get('/fetchgrenades', rejectUnauthenticated, (req, res) => {
  const sqlText = `SELECT * FROM "grenade_master"`;
  pool
    .query(sqlText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log(`Error fetching grenade list:`, err);
    });
});

router.get('/fetchmiscgear', rejectUnauthenticated, (req, res) => {
  const sqlText = `SELECT * FROM "misc_gear_master" order by "misc_gear_master_id"`;
  pool
    .query(sqlText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log(`Error fetching misc gear list:`, err);
    });
});

router.get('/fetchPharma', rejectUnauthenticated, (req, res) => {
  const sqlText = `SELECT * FROM "pharma_master" order by "rank"`;
  pool
    .query(sqlText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log(`Error fetching pharma list:`, err);
    });
});

router.get('/fetchcyberware/', rejectUnauthenticated, (req, res) => {
  const sqlText = `SELECT * FROM "cyberware_master" order by "cyberware_master_id"`;
  pool
    .query(sqlText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log(`Error fetching cyberware master list:`, err);
    });
});

router.get('/fetchnetrunner/', rejectUnauthenticated, (req, res) => {
  const sqlText = `SELECT * FROM "netrunner_master" order by "netrunner_master_id"`;
  pool
    .query(sqlText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log(`Error fetching cyberware master list:`, err);
    });
});

router.get('/fetchvehicles', rejectUnauthenticated, (req, res) => {
  const sqlText = `SELECT * FROM "vehicle_master" order by "type"`;
  pool
    .query(sqlText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log(`Error fetching vehicle master list:`, err);
    });
});

router.get('/fetchvehicleMods', rejectUnauthenticated, (req, res) => {
  const sqlText = `SELECT * FROM "vehicle_mod_master" ORDER BY "vehicle_mod_master_id"`;
  pool
    .query(sqlText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log(`Error fetching vehicle modification list:`, err);
    });
});

router.get('/fetchclothing', rejectUnauthenticated, (req, res) => {
  const sqlText = `SELECT * FROM "clothing_master"`;
  pool
    .query(sqlText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log(`Error fetching master clothing lists:`, err);
    });
});

router.get('/fetchlifestyle/', rejectUnauthenticated, (req, res) => {
  const sqlText = `SELECT * FROM "lifestyle_master"`;
  pool
    .query(sqlText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log(`Error fetching lifestyle master rows`, err);
    });
});

// Purchases and Sales
const whiteListTable = [
  'char_armor_bridge',
  'char_clothing_bridge',
  'char_gear_bridge',
  'char_pharma_bridge',
  'char_grenade_bridge',
  'char_owned_cyberware',
  'char_owned_vehicle_mods',
  'char_shield_bridge',
  'char_vehicle_bridge',
  'char_weapons_bridge',
];
const whiteListBuyPKs = [
  'armor_id',
  'clothing_id',
  'misc_gear_id',
  'pharma_master_id',
  'grenade_id',
  'cyberware_master_id',
  'vehicle_mod_master_id',
  'shield_id',
  'vehicle_id',
  'weapon_id',
];
const whiteListSellPKs = [
  'armor_bridge_id',
  'clothing_bridge_id',
  'char_gear_bridge_id',
  'char_pharma_bridge_id',
  'grenade_bridge_id',
  'owned_cyberware_id',
  'char_owned_vehicle_mods_id',
  'shield_bridge_id',
  'vehicle_bridge_id',
  'weapon_bridge_id',
];

router.post('/buyItem', rejectUnauthenticated, (req, res) => {
  let tableCheck = false;
  let columnCheck = false;

  for (let i = 0; i < whiteListTable.length; i++) {
    if (whiteListTable[i] === req.body.table) {
      tableCheck = true;
    }
  }
  for (let j = 0; j < whiteListBuyPKs.length; j++) {
    if (whiteListBuyPKs[j] === req.body.column) {
      columnCheck = true;
    }
  }

  if (tableCheck === true && columnCheck === true) {
    const sqlText = `INSERT INTO ${req.body.table} (char_id, ${req.body.column}) VALUES ($1, $2);`;
    let sqlParams = [req.body.charID, req.body.itemMasterID];

    pool
      .query(sqlText, sqlParams)
      .then((result) => {
        res.sendStatus(201);
      })
      .catch((err) => {
        console.log(`Error buying item:`, err);
      });
  } else {
    console.log(`Failure to buy item due to table/column check failure. Table: ${tableCheck}, Column: ${columnCheck}`);
    res.sendStatus(400);
  }
});

router.delete('/sellItem', rejectUnauthenticated, (req, res) => {
  let tableCheck = false;
  let columnCheck = false;

  for (let i = 0; i < whiteListTable.length; i++) {
    if (whiteListTable[i] === req.body.table) {
      tableCheck = true;
    }
  }
  for (let j = 0; j < whiteListSellPKs.length; j++) {
    if (whiteListSellPKs[j] === req.body.column) {
      columnCheck = true;
    }
  }
  if (tableCheck === true && columnCheck === true) {
    const sqlText = `DELETE FROM ${req.body.table} WHERE ${req.body.column} = $1`;
    let sqlParams = [req.body.itemID];

    pool
      .query(sqlText, sqlParams)
      .then((result) => {
        res.sendStatus(200);
      })
      .catch((err) => {
        console.log(`Error selling item:`, err);
      });
  } else {
    console.log(`Failure to sell item due to table/column check failure. Table: ${tableCheck}, Column: ${columnCheck}`);
    res.sendStatus(400);
  }
});

router.put('/changeCharacterArmor/', rejectUnauthenticated, (req, res) => {
  const sqlText = `UPDATE "char_armor_bridge" SET "this_armor_loss" = $1 WHERE "armor_bridge_id" = $2`;
  const sqlParams = [req.body.newLoss, req.body.armor_bridge_id];
  pool
    .query(sqlText, sqlParams)
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(`Error changing in play character armor loss`, err);
    });
});

router.put('/changeCharacterShield/', rejectUnauthenticated, (req, res) => {
  const sqlText = `UPDATE "char_shield_bridge" SET "this_shield_loss" = $1 WHERE "shield_bridge_id" = $2`;
  const sqlParams = [req.body.newLoss, req.body.shield_bridge_id];
  pool
    .query(sqlText, sqlParams)
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(`Error changing in play character shield loss`, err);
    });
});

router.put('/changeCharacterCyberArmor/', rejectUnauthenticated, (req, res) => {
  const sqlText = `UPDATE "char_status" SET "current_cyberware_armor_loss" = $1 WHERE "char_status_id" = $2`;
  const sqlParams = [req.body.newLoss, req.body.char_status_id];
  pool
    .query(sqlText, sqlParams)
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(`Error changing in play character cyberware armor loss`, err);
    });
});

router.post('/buyNetrunnerGear', rejectUnauthenticated, (req, res) => {
  const sqlText = `INSERT INTO "netrunner_bridge" ("char_id", "netrunner_master_id", "equipped")
    VALUES ($1, $2, $3)`;
  const sqlParams = [req.body.charID, req.body.item.netrunner_master_id, false];
  pool
    .query(sqlText, sqlParams)
    .then((result) => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log(`Error buying netrunner gear:`, err);
    });
});

router.delete('/sellNetrunnerGear/:id', rejectUnauthenticated, (req, res) => {
  const sqlText = `DELETE FROM "netrunner_bridge" WHERE "netrunner_bridge_id" = $1`;
  pool
    .query(sqlText, [req.params.id])
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(`Error selling netrunner gear:`, err);
    });
});

router.put('/changeWeaponClip', rejectUnauthenticated, (req, res) => {
  const sqlText = `UPDATE "char_weapons_bridge" SET "current_shots_fired" = $1 WHERE "weapon_bridge_id" = $2`;
  const sqlParams = [req.body.currentShotsFired, req.body.weaponBridgeID];

  pool
    .query(sqlText, sqlParams)
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(`Error updating weapon clip:`, err);
    });
});

router.post('/createPharma', rejectUnauthenticated, (req, res) => {
  const sqlText = `INSERT INTO "char_pharma_bridge" (char_id, pharma_master_id) VALUES ($1, $2)`;
  const sqlParams = [req.body.charID, req.body.pharmaID];
  pool
    .query(sqlText, sqlParams)
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(`Error creating Pharmaceutical:`, err);
    });
});

router.post('/createModBridgeEntry/', rejectUnauthenticated, (req, res) => {
  if (tableCheck(req.body.modTable) === true && baseItemCheck(req.body.baseItemColumn) === true && modItemCheck(req.body.modItemColumn) === true) {
    const sqlText = `INSERT INTO ${req.body.modTable} (${req.body.baseItemColumn}, ${req.body.modItemColumn}) VALUES ($1, $2)`;
    const sqlParams = [req.body.baseItemID, req.body.modItemID];
    pool
      .query(sqlText, sqlParams)
      .then((result) => {
        res.sendStatus(200);
      })
      .catch((err) => {
        console.log(`Error Equipping Mod on table ${req.body.modTable}:`, err);
      });
  } else if (tableCheck(req.body.modTable) === false) {
    console.log(`Error with table check validation. Table ${req.body.modTable} not whitelisted.`);
    res.sendStatus(400);
  } else if (baseItemCheck(req.body.baseItemColumn) === false) {
    console.log(`Error with base item check validation. Column ${req.body.baseItemColumn} not whitelisted.`);
    res.sendStatus(400);
  } else if (modItemCheck(req.body.modItemColumn) === false) {
    console.log(`Error with mod item check validation. Column ${req.body.modItemColumn} not whitelisted`);
    res.sendStatus(400);
  } else {
    console.log(`Unknown error with /equipmod status, tables and column validated. This should never appear.`);
    res.sendStatus(400);
  }
});

router.put('/changeModEquipStatus/', rejectUnauthenticated, (req, res) => {
  if (modItemTableCheck(req.body.modItemTable) === true && modItemCheck(req.body.modItemColumn) === true) {
    const sqlText = `UPDATE ${req.body.modItemTable} SET "equipped" = $1 WHERE ${req.body.modItemColumn} = $2`;
    const sqlParams = [req.body.equipStatus, req.body.modItemID];
    pool
      .query(sqlText, sqlParams)
      .then((result) => {
        res.sendStatus(200);
      })
      .catch((err) => {
        console.log(`Error changing Mod equipped status on table ${req.body.modItemTable}:`, err);
      });
  } else if (modItemTableCheck(req.body.modItemTable) === false) {
    console.log(`Error with Mod Item Table Validation. Table ${req.body.modItemTable} not whitelisted.`);
    res.sendStatus(400);
  } else if (modItemCheck(req.body.modItemColumn) === false) {
    console.log(`Error with mod item check validation. Column ${req.body.modItemColumn} not whitelisted`);
    res.sendStatus(400);
  } else {
    console.log(`Unknown error with /changeModEquipStatus, tables and column validated. This should never appear.`);
    res.sendStatus(400);
  }
});

router.delete('/removeModBridgeEntry/', rejectUnauthenticated, (req, res) => {
  if (tableCheck(req.body.modTable) === true && tablePKCheck(req.body.modTablePK) === true) {
    const sqlText = `DELETE FROM ${req.body.modTable} WHERE ${req.body.modTablePK} = $1`;
    pool
      .query(sqlText, [req.body.modID])
      .then((result) => {
        res.sendStatus(200);
      })
      .catch((err) => {
        console.log(`Error removing mod from ${req.body.modTable}:`, err);
      });
  } else if (tableCheck(req.body.modTable) === false) {
    console.log(`Error with table check validation. Table ${req.body.modTable} not whitelisted.`);
    res.sendStatus(400);
  } else if (tablePKCheck(req.body.modTablePK) === false) {
    console.log(`Error with mod table pk validation. Table PK ${req.body.modTablePK} not whitelisted`);
    res.sendStatus(400);
  } else {
    console.log(`Unknown error with /removeModBridgeEntry, table and PK validated. This should never appear.`);
    res.sendStatus(400);
  }
});

router.put('/changeVehicleTotalModCost/', rejectUnauthenticated, (req, res) => {
  const sqlText = `UPDATE "char_vehicle_bridge" SET "total_mod_cost" = (SELECT total_mod_cost) + $1 WHERE "vehicle_bridge_id" = $2`;
  const sqlParams = [req.body.price, req.body.id];
  pool
    .query(sqlText, sqlParams)
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(`Error changing vehicle mod total cost:`, err);
    });
});

router.put('/changeVehicleArmoredStatus/', rejectUnauthenticated, (req, res) => {
  const sqlText = `UPDATE "char_vehicle_bridge" SET "has_armor" = $1 WHERE "vehicle_bridge_id" = $2`;
  const sqlParams = [req.body.status, req.body.id];
  pool
    .query(sqlText, sqlParams)
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(`Error changing vehicle armored status to ${req.body.status}:`, err);
    });
});

router.put('/changeVehicleSeats', rejectUnauthenticated, (req, res) => {
  let sqlText;
  if (req.body.status === true) {
    sqlText = `UPDATE "char_vehicle_bridge" SET "extra_seats" = (SELECT extra_seats) + 1 WHERE "vehicle_bridge_id" = $1`;
  } else if (req.body.status === false) {
    sqlText = `UPDATE "char_vehicle_bridge" SET "extra_seats" = (SELECT extra_seats) - 1 WHERE "vehicle_bridge_id" = $1`;
  } else {
    console.log(`Error - status not set for seat change`);
    res.sendStatus(400);
  }

  pool
    .query(sqlText, [req.body.id])
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(`Error changing vehicle armored status to ${req.body.status}:`, err);
    });
});

// mod table whitelists & checks
const modWhiteListTable = ['char_vehicle_mod_bridge'];
const modWhiteListTablePK = ['char_vehicle_mod_bridge_id'];
const modWhiteListBaseItem = ['vehicle_bridge_id'];
const modWhiteListModItem = ['char_owned_vehicle_mods_id'];
const modWhiteListModItemTable = ['char_owned_vehicle_mods'];

const tableCheck = (tableName) => {
  for (let i = 0; i < modWhiteListTable.length; i++) {
    if (modWhiteListTable[i] === tableName) {
      return true;
    }
  }
  return false;
};

const tablePKCheck = (tablePKName) => {
  for (let i = 0; i < modWhiteListTablePK.length; i++) {
    if (modWhiteListTablePK[i] === tablePKName) {
      return true;
    }
  }
  return false;
};

const baseItemCheck = (baseItemColumn) => {
  for (let i = 0; i < modWhiteListBaseItem.length; i++) {
    if (modWhiteListBaseItem[i] === baseItemColumn) {
      return true;
    }
  }
  return false;
};

const modItemCheck = (modItemColumn) => {
  for (let i = 0; i < modWhiteListModItem.length; i++) {
    if (modWhiteListModItem[i] === modItemColumn) {
      return true;
    }
  }
  return false;
};

const modItemTableCheck = (modItemTable) => {
  for (let i = 0; i < modWhiteListModItemTable.length; i++) {
    if (modWhiteListModItemTable[i] === modItemTable) {
      return true;
    }
  }
  return false;
};

router.post('/fetchCharacterArmor', rejectUnauthenticated, (req, res) => {
  const sqlText = `SELECT * FROM "char_armor_bridge"
    JOIN "armor_master" ON "armor_master"."armor_master_id" = "char_armor_bridge"."armor_id"
    WHERE char_id = $1`;
  pool
    .query(sqlText, [req.body.charID])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.error('Error fetching character armor:', err);
      res.sendStatus(400);
    });
});

router.post('/fetchCharacterShields', rejectUnauthenticated, (req, res) => {
  const sqlText = `SELECT * FROM "char_shield_bridge"
    JOIN "shield_master" ON "shield_master"."shield_master_id" = "char_shield_bridge"."shield_id"
    WHERE char_id = $1`;
  pool
    .query(sqlText, [req.body.charID])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.error('Error fetching character shield(s):', err);
      res.sendStatus(400);
    });
});

router.post('/fetchCharacterWeapons', rejectUnauthenticated, (req, res) => {
  const sqlText = `SELECT * FROM "char_weapons_bridge"
    JOIN "weapon_master" ON "weapon_master".weapon_master_id = "char_weapons_bridge".weapon_id
    WHERE char_id = $1`;
  pool
    .query(sqlText, [req.body.charID])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.error('Error fetching character weapons:', err);
      res.sendStatus(400);
    });
});

router.post('/fetchCharacterGrenades', rejectUnauthenticated, (req, res) => {
  const sqlText = `SELECT * FROM "char_grenade_bridge"
    JOIN "grenade_master" ON "grenade_master"."grenade_master_id" = "char_grenade_bridge"."grenade_id"
    WHERE char_id = $1`;
  pool
    .query(sqlText, [req.body.charID])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.error('Error fetching character grenades:', err);
      res.sendStatus(400);
    });
});

router.post('/fetchCharacterMiscGear', rejectUnauthenticated, (req, res) => {
  const sqlText = `SELECT * FROM "char_gear_bridge"
    JOIN "misc_gear_master" ON "misc_gear_master"."misc_gear_master_id" = "char_gear_bridge"."misc_gear_id"
    WHERE "char_id" = $1
    ORDER BY "name" ASC`;
  pool
    .query(sqlText, [req.body.charID])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.error('Error fetching character misc gear:', err);
      res.sendStatus(400);
    });
});

router.post('/fetchCharacterCyberware', rejectUnauthenticated, (req, res) => {
  const sqlText = `SELECT * FROM "char_owned_cyberware" 
    JOIN "cyberware_master" ON "cyberware_master"."cyberware_master_id" = "char_owned_cyberware"."cyberware_master_id"
    WHERE char_id = $1`;
  pool
    .query(sqlText, [req.body.charID])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.error('Error fetching character cyberware:', err);
      res.sendStatus(400);
    });
});

router.post('/fetchCharacterNetrunnerGear', rejectUnauthenticated, (req, res) => {
  const sqlText = `SELECT * FROM "netrunner_bridge"
    JOIN "netrunner_master" ON "netrunner_master"."netrunner_master_id" = "netrunner_bridge"."netrunner_master_id"
    WHERE char_id = $1`;
  pool
    .query(sqlText, [req.body.charID])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.error('Error fetching character netrunner gear:', err);
      res.sendStatus(400);
    });
});

router.post('/fetchCharacterVehicles', rejectUnauthenticated, (req, res) => {
  const sqlText = `SELECT * FROM "char_vehicle_bridge"
    JOIN "vehicle_master" ON "vehicle_master"."vehicle_master_id" = "char_vehicle_bridge"."vehicle_id"
    WHERE char_id = $1`;
  pool
    .query(sqlText, [req.body.charID])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.error('Error fetching character vehicles:', err);
      res.sendStatus(400);
    });
});

router.post('/fetchCharacterVehicleMods', rejectUnauthenticated, (req, res) => {
  const sqlText = `SELECT * FROM "char_owned_vehicle_mods"
    JOIN "vehicle_mod_master" ON "vehicle_mod_master"."vehicle_mod_master_id" = "char_owned_vehicle_mods"."vehicle_mod_master_id"
    WHERE char_id = $1`;
  pool
    .query(sqlText, [req.body.charID])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.error('Error fetching character vehicle mods:', err);
      res.sendStatus(400);
    });
});

module.exports = router;
