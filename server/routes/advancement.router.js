const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

const { rejectUnauthenticated } = require('../modules/authentication-middleware')
const { rejectNonAdmin } = require('../modules/rejectNonAdmin')

// eventually move all routes to do with editing sheet (e.g. shopping / spend XP / equip gear pagees) here

// Character Advancement Routes
// routes having to do with spending experience, equipping/unequipping gear and cyberware,
// and purchasing and selling gear and cyberware