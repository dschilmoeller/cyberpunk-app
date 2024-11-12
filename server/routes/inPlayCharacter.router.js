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
  WHERE "char_id" = $1`;
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
  WHERE "char_id" = $1 AND "equipped" = true
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
      console.error('Error changing character in play status:', err);
      res.sendStatus(400);
    });
});
module.exports = router;
