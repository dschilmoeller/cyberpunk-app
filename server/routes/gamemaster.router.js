const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const { rejectNonAdmin } = require('../modules/rejectNonAdmin');

// GM Routes
// Fetch campaigns
router.get('/fetchcampaigns', rejectUnauthenticated, (req, res) => {
  const sqlText = `SELECT * FROM "campaigns" ORDER BY campaign_id ASC`;
  pool
    .query(sqlText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      res.sendStatus(400);
      console.error(`Error fetching campaigns`, err);
    });
});

// fetch specific requirements for the GM summary page.
router.get('/fetchGameMasterCharacters', rejectNonAdmin, (req, res) => {
  const sqlText = `SELECT id, handle, player, campaign, max_xp, spent_xp, bank, cool, cyber_cool, perception, perm_humanity_loss, temp_humanity_loss, reflexes, cyber_reflexes
    FROM "character"
    ORDER BY player ASC
    `;

  pool
    .query(sqlText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      res.sendStatus(400);
      console.error(`Error Fetching characters:`, err);
    });
});

router.post('/fetchGamemasterCharacterDetail/', rejectUnauthenticated, (req, res) => {
  const sqlText = `SELECT * FROM "character"
    JOIN "campaigns" ON "character"."campaign" = "campaigns"."campaign_id"
    WHERE id = $1`;
  pool
    .query(sqlText, [req.body.characterID])
    .then((result) => {
      res.send(result.rows[0]);
    })
    .catch((err) => {
      res.sendStatus(400);
      console.error(`Error fetching character details:`, err);
    });
});

router.post('/fetchCharacterContacts/', rejectNonAdmin, (req, res) => {
  const sqlText = `SELECT * FROM "char_contact_bridge"
  JOIN "contact_master" ON "char_contact_bridge"."contact_id" = "contact_master"."contact_master_id"
  WHERE "char_id" = $1
  ORDER BY "contact_master_id"`;
  pool
    .query(sqlText, [req.body.characterID])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      res.sendStatus(400);
      console.error('Error fetching character contacts for GM:', err);
    });
});

router.post('/changeHandle/', rejectUnauthenticated, (req, res) => {
  const sqlText = `UPDATE "character"
    SET "handle" = $1
    WHERE "id" = $2`;

  const sqlParams = [req.body.handle, req.body.charID];
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
      console.error('Error changing handle:', err);
      res.sendStatus(400);
    });
});

router.post('/changePlayer', rejectUnauthenticated, (req, res) => {
  const sqlText = `UPDATE "character"
    SET "player" = $1
    WHERE "id" = $2`;
  const sqlParams = [req.body.player, req.body.charID];
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
      console.error('Error changing player:', err);
      res.sendStatus(400);
    });
});

router.post('/changeCampaign/', rejectUnauthenticated, (req, res) => {
  const sqlText = `UPDATE "character"
    SET "campaign" = $1
    WHERE "id" = $2`;

  const sqlParams = [req.body.campaign_id, req.body.charID];

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
      console.error('Error changing campaign:', err);
      res.sendStatus(400);
    });
});

router.post('/changeTempHumanity', rejectNonAdmin, (req, res) => {
  const sqlText = `UPDATE "character" SET "temp_humanity_loss" = $1 WHERE "id" = $2`;
  const sqlParams = [req.body.temp_humanity_loss, req.body.charID];
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
      console.error('Error changing temporary humanity loss:', err);
      res.sendStatus(400);
    });
});

router.post('/changePermHumanity/', rejectNonAdmin, (req, res) => {
  const sqlText = `UPDATE "character" SET "perm_humanity_loss" = $1 WHERE "id" = $2`;
  const sqlParams = [req.body.perm_humanity_loss, req.body.charID];
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
      console.error('Error changing permanent humanity loss:', err);
      res.sendStatus(400);
    });
});

router.post('/changeBank', rejectNonAdmin, (req, res) => {
  const sqlText = `UPDATE "character" SET "bank" = $1 WHERE "id" = $2`;
  const sqlParams = [req.body.bank, req.body.charID];
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
      console.error('Error changing character bank:', err);
      res.sendStatus(400);
    });
});

router.post('/changeXP', rejectNonAdmin, (req, res) => {
  const sqlText = `UPDATE "character" SET "max_xp" = $1 WHERE "id" = $2`;
  const sqlParams = [req.body.max_xp, req.body.charID];
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
      console.error('Error changing character max XP:', err);
      res.sendStatus(400);
    });
});

const attributeArray = ['strength', 'body', 'reflexes', 'appearance', 'cool', 'street_cred', 'intelligence', 'willpower', 'technique', 'max_luck'];

router.post('/changeAttribute', rejectNonAdmin, (req, res) => {
  if (attributeArray.includes(req.body.attribute)) {
    const sqlText = `
    UPDATE "character" SET "${req.body.attribute}" = $1 WHERE "id" = $2`;
    const sqlParams = [req.body.newScore, req.body.charID];
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
        console.error('Error changing attribute:', err);
        res.sendStatus(400);
      });
  } else {
    res.sendStatus(400);
  }
});

const skillArray = [
  'athletics',
  'brawling',
  'concentration',
  'evasion',
  'fast_talk',
  'firearms',
  'legerdemain',
  'melee_weapons',
  'perception',
  'streetwise',
  'demolitions',
  'drive_land',
  'drive_exotic',
  'etiquette',
  'exotic_weapons',
  'heavy_weapons',
  'performance',
  'stealth',
  'survival',
  'tracking',
  'business',
  'cryptography',
  'cyber_tech',
  'investigation',
  'gambling',
  'language',
  'military_tech',
  'science',
  'vehicle_tech',
  'first_aid',
  'paramed',
  'is_paramedical',
];

router.post('/changeSkill', rejectNonAdmin, (req, res) => {
  if (skillArray.includes(req.body.skillName)) {
    const sqlText = `UPDATE "character" SET ${req.body.skillName} = $1 WHERE "id" = $2`;
    const sqlParams = [req.body.newRank, req.body.charID];

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
        console.error('Error changing character skill:', err);
        res.sendStatus(400);
      });
  } else {
    res.sendStatus(400);
  }
});

const roleArray = [
  'rockerboy',
  'solo',
  'netrunner',
  'nomad',
  'media',
  'medtech',
  'maker',
  'med_surgery',
  'med_pharma',
  'med_cryo',
  'maker_field',
  'maker_upgrade',
  'maker_fab',
  'maker_invent',
];

router.post('/changeRole', rejectNonAdmin, (req, res) => {
  if (roleArray.includes(req.body.roleName)) {
    const sqlText = `Update "character" SET ${req.body.roleName} = $1 WHERE "id" = $2`;
    const sqlParams = [req.body.newRank, req.body.charID];
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
        console.error('Error changing character skill:', err);
        res.sendStatus(400);
      });
  } else {
    res.sendStatus(400);
  }
});

router.post('/deleteCharacterGear', rejectNonAdmin, (req, res) => {
  let sqlText = '';

  switch (req.body.type) {
    case 'armor':
      sqlText = `DELETE FROM "char_armor_bridge" WHERE "armor_bridge_id" = $1`;
      break;
    case 'weapon':
      sqlText = `DELETE FROM "char_weapons_bridge" WHERE "weapon_bridge_id" = $1`;
      break;
    case 'grenade':
      sqlText = `DELETE FROM "char_grenade_bridge" WHERE "grenade_bridge_id" = $1`;
      break;
    case 'misc':
      sqlText = `DELETE FROM "char_gear_bridge" WHERE "char_gear_bridge_id" = $1`;
      break;
    case 'cyberware':
      sqlText = `DELETE FROM "char_owned_cyberware" WHERE "owned_cyberware_id" = $1`;
      break;
    case 'netrunner':
      sqlText = `DELETE FROM "netrunner_bridge" WHERE "netrunner_bridge_id" = $1`;
      break;
    case 'vehicle':
      sqlText = `DELETE FROM "char_vehicle_bridge" WHERE "vehicle_bridge_id" = $1`;
      break;
    case 'vehicle_mod':
      sqlText = `DELETE FROM "char_owned_vehicle_mods" WEHRE "char_owned_vehicle_mods_id" = $1`;
      break;
    default:
      console.error('Error in gear type:', req.body.type);
      res.sendStatus(400);
      break;
  }
  pool
    .query(sqlText, [req.body.data])
    .then((result) => {
      if (result.rowCount > 0) {
        res.sendStatus(200);
      } else {
        res.sendStatus(400);
      }
    })
    .catch((err) => {
      console.error('Error deleting gear:', err);
      res.sendStatus(400);
    });
});

router.post('/giveCharacterGear', rejectNonAdmin, (req, res) => {
  let sqlText = '';
  switch (req.body.type) {
    case 'armor':
      sqlText = `INSERT INTO "char_armor_bridge" ("armor_id", "char_id") VALUES ($1, $2);`;
      break;
    case 'weapon':
      sqlText = `INSERT INTO "char_weapons_bridge" ("weapon_id", "char_id") VALUES ($1, $2);`;
      break;
    case 'grenade':
      sqlText = `INSERT INTO "char_grenade_bridge" ("grenade_id", "char_id") VALUES ($1, $2);`;
      break;
    case 'misc':
      sqlText = `INSERT INTO "char_gear_bridge" ("misc_gear_id", "char_id") VALUES ($1, $2);`;
      break;
    case 'cyberware':
      sqlText = `INSERT INTO "char_owned_cyberware" ("cyberware_master_id", "char_id") VALUES ($1, $2);`;
      break;
    case 'netrunner':
      sqlText = `INSERT INTO "netrunner_bridge" ("netrunner_master_id", "char_id") VALUES ($1, $2);`;
      break;
    case 'vehicle':
      sqlText = `INSERT INTO "char_vehicle_bridge" ("vehicle_id", "char_id") VALUES ($1, $2);`;
      break;
    case 'vehicle_mod':
      sqlText = `INSERT INTO "char_owned_vehicle_mods" ("vehicle_mod_master_id", "char_id") VALUES ($1, $2);`;
      break;
    default:
      console.error('Error in gear type:', req.body.type);
      res.sendStatus(400);
      break;
  }
  const sqlParams = [req.body.data, req.body.charID];
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
      console.error('Error adding gear:', err);
      res.sendStatus(400);
    });
});

router.post('/changeContactLoyalty', rejectNonAdmin, (req, res) => {
  const sqlText = `UPDATE "char_contact_bridge" SET "loyalty" = $1 WHERE "char_contact_id" = $2`;
  const sqlParams = [req.body.loyalty, req.body.contactID];
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
      console.error('Error changing contact loyalty:', err);
      res.sendStatus(400);
    });
});
module.exports = router;
