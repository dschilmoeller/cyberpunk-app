CREATE TABLE
	"user" (
		"id" SERIAL PRIMARY KEY,
		"username" VARCHAR(80) UNIQUE NOT NULL,
		"password" VARCHAR(1000) NOT NULL,
		"user_type" INT NOT NULL
	);

CREATE TABLE
	"character" (
		"id" serial NOT NULL,
		"user_id" integer NOT NULL,
		"handle" varchar NOT NULL,
		"player" varchar NOT NULL,
		"campaign" INT NOT NULL,
		"is_paramedical" bool NOT NULL DEFAULT false,
		"strength" integer NOT NULL DEFAULT '1',
		"cyber_strength" integer NOT NULL DEFAULT '0',
		"body" integer NOT NULL DEFAULT '1',
		"cyber_body" integer NOT NULL DEFAULT '0',
		"reflexes" integer NOT NULL DEFAULT '1',
		"cyber_reflexes" integer NOT NULL DEFAULT '0',
		"appearance" integer NOT NULL DEFAULT '1',
		"cyber_appearance" integer NOT NULL DEFAULT '0',
		"cool" integer NOT NULL DEFAULT '1',
		"cyber_cool" integer NOT NULL DEFAULT '0',
		"street_cred" integer NOT NULL DEFAULT '0',
		"intelligence" integer NOT NULL DEFAULT '1',
		"cyber_intelligence" integer NOT NULL DEFAULT '0',
		"willpower" integer NOT NULL DEFAULT '1',
		"technique" integer NOT NULL DEFAULT '1',
		"athletics" integer NOT NULL DEFAULT '0',
		"brawling" integer NOT NULL DEFAULT '0',
		"concentration" integer NOT NULL DEFAULT '0',
		"evasion" integer NOT NULL DEFAULT '0',
		"fast_talk" integer NOT NULL DEFAULT '0',
		"firearms" integer NOT NULL DEFAULT '0',
		"legerdemain" integer NOT NULL DEFAULT '0',
		"melee_weapons" integer NOT NULL DEFAULT '0',
		"perception" integer NOT NULL DEFAULT '0',
		"streetwise" integer NOT NULL DEFAULT '0',
		"demolitions" integer NOT NULL DEFAULT '0',
		"drive_land" integer NOT NULL DEFAULT '0',
		"drive_exotic" integer NOT NULL DEFAULT '0',
		"etiquette" integer NOT NULL DEFAULT '0',
		"exotic_weapons" integer NOT NULL DEFAULT '0',
		"heavy_weapons" integer NOT NULL DEFAULT '0',
		"performance" integer NOT NULL DEFAULT '0',
		"stealth" integer NOT NULL DEFAULT '0',
		"survival" integer NOT NULL DEFAULT '0',
		"tracking" integer NOT NULL DEFAULT '0',
		"business" integer NOT NULL DEFAULT '0',
		"cryptography" integer NOT NULL DEFAULT '0',
		"cyber_tech" integer NOT NULL DEFAULT '0',
		"investigation" integer NOT NULL DEFAULT '0',
		"first_aid" integer NOT NULL DEFAULT '0',
		"paramed" integer NOT NULL DEFAULT '0',
		"gambling" integer NOT NULL DEFAULT '0',
		"language" integer NOT NULL DEFAULT '0',
		"military_tech" integer NOT NULL DEFAULT '0',
		"science" integer NOT NULL DEFAULT '0',
		"vehicle_tech" integer NOT NULL DEFAULT '0',
		"med_surgery" integer NOT NULL DEFAULT '0',
		"med_pharma" integer NOT NULL DEFAULT '0',
		"med_cryo" integer NOT NULL DEFAULT '0',
		"medtech_available" integer NOT NULL DEFAULT '0',
		"maker_field" integer NOT NULL DEFAULT '0',
		"maker_upgrade" integer NOT NULL DEFAULT '0',
		"maker_fab" integer NOT NULL DEFAULT '0',
		"maker_invent" integer NOT NULL DEFAULT '0',
		"maker_available" integer NOT NULL DEFAULT '0',
		"rockerboy" integer NOT NULL DEFAULT '0',
		"solo" integer NOT NULL DEFAULT '0',
		"netrunner" integer NOT NULL DEFAULT '0',
		"cyberdeck_slots" integer NOT NULL DEFAULT '0',
		"nomad" integer NOT NULL DEFAULT '0',
		"nomad_vehicle_slots" integer NOT NULL DEFAULT 0 "media" integer NOT NULL DEFAULT '0',
		"medtech" integer NOT NULL DEFAULT '0',
		"maker" integer NOT NULL DEFAULT '0',
		"perm_humanity_loss" integer NOT NULL DEFAULT '40',
		"temp_humanity_loss" integer NOT NULL DEFAULT '0',
		"max_luck" integer NOT NULL DEFAULT '4',
		"max_xp" integer NOT NULL DEFAULT '0',
		"spent_xp" integer NOT NULL DEFAULT '0',
		"bank" integer NOT NULL DEFAULT '0',
		CONSTRAINT "char_pk" PRIMARY KEY ("id")
	)
WITH
	(OIDS = FALSE);

CREATE TABLE
	"campaigns" (
		"campaign_id" SERIAL PRIMARY KEY,
		"campaign_name" VARCHAR NOT NULL,
	)
WITH
	(OIDS = FALSE);

ALTER TABLE "character" ADD CONSTRAINT "char_fk0" FOREIGN KEY ("user_id") REFERENCES "user" ("id");

ALTER TABLE "character" ADD CONSTRAINT "char_fk1" FOREIGN KEY ("campaign") REFERENCES "campaigns" ("campaign_id");

INSERT INTO
	"public"."campaigns" ("campaign_id", "campaign_name")
VALUES
	(1, E 'Unknown/Undecided');

CREATE TABLE
	"char_status" (
		"char_status_id" serial NOT NULL,
		"char_id" integer NOT NULL,
		"current_stun" integer NOT NULL,
		"current_lethal" integer NOT NULL,
		"current_agg" integer NOT NULL,
		-- "current_armor_loss" integer NOT NULL,
		"current_luck_loss" integer NOT NULL,
		"current_armor_quality" integer NOT NULL DEFAULT 0,
		"current_shield_quality" integer NOT NULL DEFAULT 0,
		"current_cyberware_armor_quality" integer NOT NULL DEFAULT 0,
		"current_cyberware_armor_loss" integer NOT NULL DEFAULT 0,
		"current_cyberware_health_boxes" integer NOT NULL DEFAULT 0,
		CONSTRAINT "char_status_pk" PRIMARY KEY ("char_status_id")
	)
WITH
	(OIDS = FALSE);

CREATE TABLE
	"weapon_master" (
		"weapon_master_id" serial NOT NULL,
		"description" varchar NOT NULL DEFAULT 'PLACEHOLDER',
		"name" varchar NOT NULL,
		"damage" integer NOT NULL,
		"dmg_type" varchar NOT NULL,
		"range" integer NOT NULL,
		"rof" integer NOT NULL,
		"max_clip" integer NOT NULL,
		"hands" integer NOT NULL,
		"concealable" bool NOT NULL,
		"price" integer NOT NULL DEFAULT '0',
		"is_treasure" bool NOT NULL DEFAULT false,
		CONSTRAINT "weapons_master_pk" PRIMARY KEY ("weapon_master_id")
	)
WITH
	(OIDS = FALSE);

CREATE TABLE
	"char_weapons_bridge" (
		"weapon_bridge_id" serial NOT NULL,
		"char_id" integer NOT NULL,
		"weapon_id" integer NOT NULL,
		"current_shots_fired" integer NOT NULL DEFAULT 0,
		"equipped" bool NOT NULL DEFAULT false,
		CONSTRAINT "char_weapons_bridge_pk" PRIMARY KEY ("weapon_bridge_id")
	)
WITH
	(OIDS = FALSE);

CREATE TABLE
	"armor_master" (
		"armor_master_id" serial NOT NULL,
		"name" varchar NOT NULL DEFAULT 'name',
		"description" varchar NOT NULL DEFAULT 'desc',
		"quality" integer NOT NULL DEFAULT '0',
		"price" integer NOT NULL DEFAULT '0',
		"is_shield" boolean NOT NULL DEFAULT FALSE CONSTRAINT "armor_master_pk" PRIMARY KEY ("armor_master_id")
	)
WITH
	(OIDS = FALSE);

-- CREATE TABLE
-- 	"shield_master" (
-- 		"shield_master_id" serial NOT NULL,
-- 		"name" varchar NOT NULL DEFAULT 'name',
-- 		"description" varchar NOT NULL DEFAULT 'desc',
-- 		"quality" integer NOT NULL DEFAULT '0',
-- 		"price" integer NOT NULL DEFAULT '0',
-- 		CONSTRAINT "shield_master_pk" PRIMARY KEY ("shield_master_id")
-- 	)
-- WITH
-- 	(OIDS = FALSE);
CREATE TABLE
	"char_armor_bridge" (
		"armor_bridge_id" serial NOT NULL,
		"char_id" integer NOT NULL,
		"armor_id" integer NOT NULL,
		"this_armor_loss" integer NOT NULL DEFAULT '0',
		"equipped" boolean NOT NULL DEFAULT false,
		CONSTRAINT "char_armor_bridge_pk" PRIMARY KEY ("armor_bridge_id")
	)
WITH
	(OIDS = FALSE);

-- CREATE TABLE
-- 	"char_shield_bridge" (
-- 		"shield_bridge_id" serial NOT NULL,
-- 		"char_id" integer NOT NULL,
-- 		"shield_id" integer NOT NULL,
-- 		"this_shield_loss" integer NOT NULL DEFAULT '0',
-- 		"equipped" boolean NOT NULL DEFAULT false,
-- 		CONSTRAINT "char_shield_bridge_pk" PRIMARY KEY ("shield_bridge_id")
-- 	)
-- WITH
-- 	(OIDS = FALSE);
-- ALTER TABLE "char_shield_bridge" ADD CONSTRAINT "char_shield_bridge_fk0" FOREIGN KEY ("char_id") REFERENCES "character" ("id") ON DELETE CASCADE;
-- ALTER TABLE "char_shield_bridge" ADD CONSTRAINT "char_shield_bridge_fk1" FOREIGN KEY ("shield_id") REFERENCES "shield_master" ("shield_master_id");
CREATE TABLE
	"grenade_master" (
		"grenade_master_id" serial NOT NULL,
		"name" varchar NOT NULL,
		"description" varchar NOT NULL DEFAULT 'PLACEHOLDER',
		"price" integer NOT NULL DEFAULT '0',
		"is_treasure" bool NOT NULL DEFAULT false,
		CONSTRAINT "grenade_master_pk" PRIMARY KEY ("grenade_master_id")
	)
WITH
	(OIDS = FALSE);

CREATE TABLE
	"char_grenade_bridge" (
		"grenade_bridge_id" serial NOT NULL,
		"char_id" integer NOT NULL,
		"grenade_id" integer NOT NULL,
		CONSTRAINT "char_grenade_bridge_pk" PRIMARY KEY ("grenade_bridge_id")
	)
WITH
	(OIDS = FALSE);

ALTER TABLE "char_grenade_bridge" ADD CONSTRAINT "char_grenade_bridge_fk0" FOREIGN KEY ("char_id") REFERENCES "character" ("id") ON DELETE CASCADE;

ALTER TABLE "char_grenade_bridge" ADD CONSTRAINT "char_grenade_bridge_fk1" FOREIGN KEY ("grenade_id") REFERENCES "grenade_master" ("grenade_master_id") ON DELETE CASCADE;

INSERT INTO
	"grenade_master" ("name", "description", "price", "is_treasure")
VALUES
	(
		'Fragmentation',
		'Deals 12 lethal damage in a 4x4 meter area, and half that in an 8x8 meter area.',
		100,
		false
	),
	(
		'Flashbang',
		'Deals 10 stun damage in a 6x6 meter area.',
		50,
		false
	),
	(
		'Smoke',
		'Creates a cloud of thick, noxious smoke that fills a 4x4 meter area, and spreads 1 meter a turn for 20 turns. Can fill an enclosed space, otherwise stops at a 10x10 meter area.',
		50,
		false
	),
	(
		'EMP',
		'Releases a disruptive electrical charge. Deals 8 stun damage to most people, but convert one wound to lethal for each health box created by cyberware. Deals lethal damage to drones and robots; their armor cannot be hardened against this damage.',
		500,
		false
	),
	(
		'"Holy Water"',
		'A glass vessel filled with a volatile acid. Deals 3 Aggravated damage in a 2x2 area.',
		500,
		true
	);

CREATE TABLE
	"cyberware_master" (
		"cyberware_master_id" serial NOT NULL,
		"name" varchar NOT NULL,
		"type" varchar NOT NULL DEFAULT 'fashionware',
		"install_level" varchar NOT NULL DEFAULT 'Mall',
		"description" varchar NOT NULL DEFAULT '0',
		"price" integer NOT NULL DEFAULT '100',
		"humanity_loss_min" integer NOT NULL DEFAULT '1',
		"humanity_loss_max" integer NOT NULL DEFAULT '1',
		"is_treasure" boolean NOT NULL DEFAULT false,
		CONSTRAINT "cyberware_master_pk" PRIMARY KEY ("cyberware_master_id")
	)
WITH
	(OIDS = FALSE);

CREATE TABLE
	"char_cyberware_bridge" (
		"cyberware_bridge_id" serial NOT NULL,
		"char_id" integer NOT NULL,
		"fashionware_slots" integer NOT NULL DEFAULT 7,
		"neuralware_slots" integer NOT NULL DEFAULT 0,
		"cyberoptic_slots" integer NOT NULL DEFAULT 0,
		"cyberaudio_slots" integer NOT NULL DEFAULT 0,
		"internalware_slots" integer NOT NULL DEFAULT 7,
		"externalware_slots" integer NOT NULL DEFAULT 1,
		"cyberarm_slots" integer NOT NULL DEFAULT 0,
		"cyberleg_slots" integer NOT NULL DEFAULT 0,
		CONSTRAINT "char_cyberware_bridge_pk" PRIMARY KEY ("cyberware_bridge_id")
	)
WITH
	(OIDS = FALSE);

CREATE TABLE
	"misc_gear_master" (
		"misc_gear_master_id" serial NOT NULL,
		"name" varchar NOT NULL,
		"description" varchar NOT NULL,
		"price" integer NOT NULL DEFAULT '0',
		CONSTRAINT "misc_gear_master_pk" PRIMARY KEY ("misc_gear_master_id")
	)
WITH
	(OIDS = FALSE);

CREATE TABLE
	"char_gear_bridge" (
		"char_gear_bridge_id" serial NOT NULL,
		"char_id" integer NOT NULL,
		"misc_gear_id" integer NOT NULL,
		CONSTRAINT "char_gear_bridge_pk" PRIMARY KEY ("char_gear_bridge_id")
	)
wiTH
	(OIDS = FALSE);

ALTER TABLE "char_gear_bridge" ADD CONSTRAINT "char_gear_bridge_fk0" FOREIGN KEY ("char_id") REFERENCES "character" ("id") ON DELETE CASCADE;

ALTER TABLE "char_gear_bridge" ADD CONSTRAINT "char_gear_bridge_fk1" FOREIGN KEY ("misc_gear_id") REFERENCES "misc_gear_master" ("misc_gear_master_id");

CREATE TABLE
	"vehicle_master" (
		"vehicle_master_id" serial NOT NULL,
		"name" varchar NOT NULL,
		"description" varchar NOT NULL,
		"type" varchar NOT NULL,
		"health" integer NOT NULL,
		"seats" integer NOT NULL,
		"move" integer NOT NULL,
		"mph" integer NOT NULL,
		"price" integer NOT NULL DEFAULT '0',
		CONSTRAINT "vehicle_master_pk" PRIMARY KEY ("vehicle_master_id")
	)
WITH
	(OIDS = FALSE);

INSERT INTO
	"vehicle_master" (
		"name",
		"description",
		"type",
		"health",
		"seats",
		"move",
		"mph",
		"price"
	)
VALUES
	(
		'Scooter',
		'A small but mighty wheeled conveyance, useful for a daily commute through traffic.',
		'Bike',
		5,
		1,
		10,
		40,
		5000
	),
	(
		'Roadbike',
		'A common sight on Night City streets as an efficient and cheap form of transport.',
		'Bike',
		8,
		2,
		15,
		100,
		20000
	),
	(
		'Superbike',
		'A powerful and exotic streetbike capable of extreme speed and high performance.',
		'Bike',
		6,
		2,
		25,
		300,
		100000
	),
	(
		'Compact Groundcar',
		'A small, affordable vehicle for the budget conscious driver.',
		'Car',
		14,
		4,
		15,
		100,
		30000
	),
	(
		'High Performance Groundcar',
		'A sporty, more playful version of the standard groundcar, with improved performance.',
		'Car',
		14,
		4,
		20,
		200,
		50000
	),
	(
		'Super Groundcar',
		'An exotic and sports car, capable of extreme speeds and maneuvers',
		'Car',
		12,
		2,
		25,
		300,
		100000
	),
	(
		'Light SUV',
		'A small SUV, built for rugged terrain',
		'Car',
		15,
		4,
		15,
		100,
		30000
	),
	(
		'Full Size SUV',
		'A large SUV with ruggedized tires and ample seating and cargo space.',
		'Car',
		20,
		6,
		15,
		120,
		50000
	),
	(
		'Tactical SUV',
		'A large SUV built to military specifications.',
		'Car',
		25,
		6,
		15,
		150,
		100000
	),
	(
		'Jet Ski',
		'Personal watercraft.',
		'Boat',
		8,
		2,
		15,
		60,
		20000
	),
	(
		'Speedboat',
		'High performance watercraft.',
		'Boat',
		12,
		4,
		15,
		60,
		50000
	),
	(
		'Cabin Cruiser',
		'Large and luxurious boat that doubles as floating living space. This model has 2 rooms',
		'Boat',
		20,
		4,
		6,
		20,
		60000
	),
	(
		'Cabin Cruiser',
		'Large and luxurious boat that doubles as floating living space. This model has 4 rooms',
		'Boat',
		30,
		8,
		6,
		20,
		120000
	),
	(
		'Yacht',
		'Customized, massive watercraft with ultraluxe accommodations. Fluffy white cat not included. This model has 4 rooms.',
		'Boat',
		50,
		16,
		6,
		30,
		200000
	),
	(
		'Yacht',
		'Customized, massive watercraft with ultraluxe accommodations. Fluffy white cat not included. This model has 8 rooms.',
		'Boat',
		60,
		32,
		6,
		30,
		400000
	),
	(
		'Gyrocopter',
		'Smallest possible flying machine - favored by a F few enthusiasts.',
		'Air',
		4,
		1,
		10,
		60,
		20000
	),
	(
		'Helicopter',
		'A proper whirlybird flyer, with actual range and safety features.',
		'Air',
		12,
		4,
		20,
		200,
		50000
	),
	(
		'AV-4 Aerodyne',
		'A multipurpose vectored thrust flying machine, useful for delivering small groups at high speed.',
		'Air',
		20,
		6,
		20,
		200,
		100000
	),
	(
		'AV-9 Aerodyne',
		'Exotic vector thrust vehicle capable of extreme maneuvers',
		'Air',
		12,
		2,
		25,
		300,
		200000
	),
	(
		'Aerozep',
		'Modern cargo blimp that can serve as a floating living space. This model has 2 rooms.',
		'Air',
		20,
		4,
		10,
		100,
		60000
	),
	(
		'Aerozep',
		'Modern cargo blimp that can serve as a floating living space. This model has 6 rooms.',
		'Air',
		20,
		12,
		10,
		100,
		180000
	);

CREATE TABLE
	"vehicle_mod_master" (
		"vehicle_mod_master_id" serial NOT NULL,
		"name" varchar NOT NULL,
		"description" varchar NOT NULL,
		"type" varchar NOT NULL,
		"price" integer NOT NULL,
		CONSTRAINT "vehicle_mod_master_pk" PRIMARY KEY ("vehicle_mod_master_id")
	)
WITH
	(OIDS = FALSE);

INSERT INTO
	"vehicle_mod_master" ("name", "description", "type", "price")
VALUES
	(
		'Armored',
		'Armors the bike superstructure. Doubles Armor of Vehicle.',
		'Bike',
		5000
	),
	(
		'Armored',
		'Armors the car chassis and adds bulletproof glass. Doubles Armor of Vehicle.',
		'Car',
		10000
	),
	(
		'Armored',
		'Armors the boat chassis and adds bulletproof glass. Doubles Armor of Vehicle.',
		'Boat',
		10000
	),
	(
		'Armored',
		'Armors the aircraft chassis and adds bullet resistant glass. Doubles Armor of Vehicle.',
		'Air',
		15000
	),
	(
		'Comm Center',
		'Adds communications center, 6 Radio Communicators, Scramblers, Radio Scanner, Homing tracers and tracking device.',
		'Car',
		2000
	),
	(
		'Comm Center',
		'Adds communications center, 6 Radio Communicators, Scramblers, Radio Scanner, Homing tracers and tracking device.',
		'Boat',
		2000
	),
	(
		'NOS',
		'Gives bike a short burst of power. Vehicle can make 1 extra move action, but takes 3 unsoakable wounds.',
		'Bike',
		1000
	),
	(
		'NOS',
		'Gives car a short burst of power. Vehicle can make 1 extra move action, but takes 3 unsoakable wounds.',
		'Car',
		1000
	),
	(
		'Onboard Flamethrower',
		'Vehicle mounted flamethrower, deals 8 Damage with ROF of 1 and clip of 1. Cannot be reloaded while driving.',
		'Bike',
		5000
	),
	(
		'Onboard Flamethrower',
		'Vehicle mounted flamethrower, deals 8 Damage with ROF of 1 and clip of 1. Cannot be reloaded while driving.',
		'Car',
		5000
	),
	(
		'Onboard Machine Gun',
		'Vehicle mounted assault rifle. Can only use autofire actions; cannot be reloaded while driving.',
		'Bike',
		5000
	),
	(
		'Onboard Machine Gun',
		'Vehicle mounted assault rifle. Can only use autofire actions; cannot be reloaded while driving.',
		'Car',
		5000
	),
	(
		'Seating Upgrade',
		'Adds 1 seat to vehicle, either by adding a sidecar, expanding the chassis, or something similar. Seat can be rigged to eject.',
		'Bike',
		1000
	),
	(
		'Seating Upgrade',
		'Adds 1 seat to vehicle, either by adding a sidecar, expanding the chassis, or something similar. Seat can be rigged to eject.',
		'Car',
		1000
	),
	(
		'Seating Upgrade',
		'Adds 1 seat to vehicle, either by adding a sidecar, expanding the chassis, or something similar. Seat can be rigged to eject.',
		'Air',
		1000
	),
	(
		'Security Upgrade',
		'Replaces mechanical locks with biometric security. Requires Vehicle Tech DV8 (2+) to bypass, failure results in 10 stun damage/round to intruder. Intruder cannot stop themselves from taking this damage.',
		'Bike',
		6000
	),
	(
		'Security Upgrade',
		'Replaces mechanical locks with biometric security. Requires Vehicle Tech DV8 (2+) to bypass, failure results in 10 stun damage/round to intruder. Intruder cannot stop themselves from taking this damage.',
		'Car',
		6000
	),
	(
		'Security Upgrade',
		'Replaces mechanical locks with biometric security. Requires Vehicle Tech DV8 (2+) to bypass, failure results in 10 stun damage/round to intruder. Intruder cannot stop themselves from taking this damage.',
		'Boat',
		6000
	),
	(
		'Security Upgrade',
		'Replaces mechanical locks with biometric security. Requires Vehicle Tech DV8 (2+) to bypass, failure results in 10 stun damage/round to intruder. Intruder cannot stop themselves from taking this damage.',
		'Air',
		6000
	),
	(
		'Smuggling Compartment',
		'Installs 1 hidden holster per passenger, capable of holding any concealable weapon. Creates 1 larger space in the vehicle that requires a Perception check to locate.',
		'Bike',
		1000
	),
	(
		'Smuggling Compartment',
		'Installs 1 hidden holster per passenger, capable of holding any concealable weapon. Creates 1 larger space in the vehicle that requires a Perception check to locate.',
		'Car',
		1000
	),
	(
		'Smuggling Compartment',
		'Installs 1 hidden holster per passenger, capable of holding any concealable weapon. Creates 2 larger spaces in the vehicle that requires a Perception check to locate.',
		'Boat',
		2000
	),
	(
		'Smuggling Compartment',
		'Installs 1 hidden holster per passenger, capable of holding any concealable weapon. Creates 2 larger spaces in the vehicle that requires a Perception check to locate.',
		'Air',
		2000
	),
	(
		'Heavy Chassis',
		'Significantly upgrades the structure of the vehicle, allowing it to tow multiple tons and installing a 100m towing cable. Reduces top speed by 25%',
		'Car',
		5000
	),
	(
		'Rocket Pod',
		'Requires Heavy Chassis. Installs Rocket Launcher with clip of 3 onto the vehicle.',
		'Car',
		30000
	),
	(
		'Heavy Weapon Mount',
		'Requires Heavy Chassis. Installs Heavy Cannon (Dam 16, Range 100, ROF 1, Clip 10) onto the vehicle.',
		'Car',
		30000
	),
	(
		'Mounted Melee Weapon',
		'Very Heavy Melee weapon is mounted on one side of the vehicle. Concealable. Driver can attack using their action; vehicle has effective strength of 4.',
		'Bike',
		3000
	),
	(
		'Mounted Melee Weapon',
		'Very Heavy Melee weapon is mounted on one side of the vehicle. Concealable. Driver can attack using their action; vehicle has effective strength of 7.',
		'Car',
		3000
	),
	(
		'Hover Install',
		'Installs a series of powerful fans and a deployable raft to vehicle, allowing it to move on water as a cabin cruiser.',
		'Car',
		4000
	),
	(
		'AV-4 Engine Install',
		'Adds powerful vectored thrust turbofans to the vehicle, allowing it to fly. While in the air, moves as an AV-4.',
		'Car',
		10000
	),
	(
		'Combat Plow',
		'When ramming, those inside take no damage. If vehicle has and used NOS mod in the same or previous turn, deals 4 extra damage.',
		'Car',
		1000
	),
	(
		'Enhanced Plug Integration',
		'While driving, user can attack and dodge as though they were on foot - normal combat movements do not require drive tests.',
		'Bike',
		5000
	);

CREATE TABLE
	"char_vehicle_bridge" (
		"vehicle_bridge_id" serial NOT NULL,
		"char_id" integer NOT NULL,
		"vehicle_id" integer NOT NULL,
		"current_damage" integer NOT NULL DEFAULT 0,
		"current_armor_damage" integer NOT NULL DEFAULT 0,
		"total_mod_cost" integer NOT NULL DEFAULT 0,
		"has_armor" boolean NOT NULL DEFAULT false,
		"extra_seats" integer NOT NULL DEFAULT 0,
		CONSTRAINT "char_vehicle_bridge_pk" PRIMARY KEY ("vehicle_bridge_id")
	)
wiTH
	(OIDS = FALSE);

CREATE TABLE
	"char_owned_vehicle_mods" (
		"char_owned_vehicle_mods_id" serial NOT NULL,
		"char_id" integer NOT NULL,
		"vehicle_mod_master_id" integer NOT NULL,
		"equipped" boolean NOT NULL DEFAULT false,
		CONSTRAINT "char_owned_vehicle_mod_bridge_pk" PRIMARY KEY ("char_owned_vehicle_mods_id")
	)
WITH
	(OIDS = FALSE)
CREATE TABLE
	"char_vehicle_mod_bridge" (
		"char_vehicle_mod_bridge_id" serial NOT NULL,
		"vehicle_bridge_id" integer NOT NULL,
		"char_owned_vehicle_mods_id" integer NOT NULL,
		CONSTRAINT "char_vehicle_mod_bridge_pk" PRIMARY KEY ("char_vehicle_mod_bridge_id")
	)
WITH
	(OIDS = FALSE);

-- links characters to owned vehicles
ALTER TABLE "char_vehicle_bridge" ADD CONSTRAINT "char_vehicle_bridge_fk0" FOREIGN KEY ("char_id") REFERENCES "character" ("id") ON DELETE CASCADE;

ALTER TABLE "char_vehicle_bridge" ADD CONSTRAINT "char_vehicle_bridge_fk1" FOREIGN KEY ("vehicle_id") REFERENCES "vehicle_master" ("vehicle_master_id");

-- links characters to owned vehicle mods
ALTER TABLE "char_owned_vehicle_mods" ADD CONSTRAINT "char_owned_vehicle_mods_fk0" FOREIGN KEY ("char_id") REFERENCES "character" ("id") ON DELETE CASCADE;

ALTER TABLE "char_owned_vehicle_mods" ADD CONSTRAINT "char_owned_vehicle_mods_fk1" FOREIGN KEY ("vehicle_mod_master_id") REFERENCES "vehicle_mod_master" ("vehicle_mod_master_id");

-- links vehicles to mods - rows created upon equipping a mod to a vehicle.
ALTER TABLE "char_vehicle_mod_bridge" ADD CONSTRAINT "char_vehicle_mod_bridge_fk0" FOREIGN KEY ("vehicle_bridge_id") REFERENCES "char_vehicle_bridge" ("vehicle_bridge_id") ON DELETE CASCADE;

ALTER TABLE "char_vehicle_mod_bridge" ADD CONSTRAINT "char_vehicle_mod_bridge_fk1" FOREIGN KEY ("char_owned_vehicle_mods_id") REFERENCES "char_owned_vehicle_mods" ("char_owned_vehicle_mods_id");

CREATE TABLE
	"netrunner_master" (
		"netrunner_master_id" serial NOT NULL,
		"name" varchar NOT NULL,
		"description" varchar NOT NULL,
		"price" integer NOT NULL DEFAULT 0,
		"type" varchar NOT NULL,
		"slots" integer NOT NULL DEFAULT 0,
		"perception" integer NOT NULL DEFAULT 0,
		"speed" integer NOT NULL DEFAULT 0,
		"attack" integer NOT NULL DEFAULT 0,
		"defense" integer NOT NULL DEFAULT 0,
		"rez" integer NOT NULL DEFAULT 0,
		CONSTRAINT "netrunner_master_pk" PRIMARY KEY ("netrunner_master_id")
	)
WITH
	(OIDS = FALSE);

CREATE TABLE
	"netrunner_bridge" (
		"netrunner_bridge_id" serial NOT NULL,
		"char_id" integer NOT NULL,
		"netrunner_master_id" integer NOT NULL,
		"equipped" boolean NOT NULL DEFAULT false,
		CONSTRAINT "netrunner_bridge_pk" PRIMARY KEY ("netrunner_bridge_id")
	)
WITH
	(OIDS = FALSE);

ALTER TABLE "netrunner_bridge" ADD CONSTRAINT "netrunner_bridge_fk0" FOREIGN KEY ("char_id") REFERENCES "character" ("id") ON DELETE CASCADE;

ALTER TABLE "netrunner_bridge" ADD CONSTRAINT "netrunner_bridge_fk1" FOREIGN KEY ("netrunner_master_id") REFERENCES "netrunner_master" ("netrunner_master_id");

INSERT INTO
	"netrunner_master" (
		"name",
		"description",
		"price",
		"type",
		"slots",
		"perception",
		"speed",
		"attack",
		"defense",
		"rez"
	)
VALUES
	(
		'Cyberdeck Alpha',
		'A basic Deck for Netrunning. Roughly the size of a pack of cigarettes.',
		500,
		'deck',
		4,
		0,
		0,
		0,
		0,
		0
	),
	(
		'Cyberdeck Beta',
		'An advanced Deck for Netrunning. Slightly larger, more rugged, and much more powerful.',
		2500,
		'deck',
		5,
		0,
		0,
		0,
		0,
		0
	),
	(
		'Cyberdeck Delta',
		'A sophisticated Deck for Netrunning, with milspec components and a quantum processor. About the size of paperback book, and as rugged as a piece of steel of the same size.',
		10000,
		'deck',
		6,
		0,
		0,
		0,
		0,
		0
	),
	(
		'Eraser',
		'+1 Dice to Cloak Actions',
		50,
		'software',
		1,
		0,
		0,
		0,
		0,
		3
	),
	(
		'See Ya',
		'+1 Dice to Pathfinder Actions',
		50,
		'software',
		1,
		0,
		0,
		0,
		0,
		3
	),
	(
		'Speedy',
		'+1 Dice to Initiative Actions',
		50,
		'software',
		1,
		0,
		0,
		0,
		0,
		3
	),
	(
		'Worm',
		'+1 Dice to Backdoor Actions',
		50,
		'software',
		1,
		0,
		0,
		0,
		0,
		3
	),
	(
		'Greaser',
		'+1 Dice to Slide Actions',
		50,
		'software',
		1,
		0,
		0,
		0,
		0,
		3
	),
	(
		'Armor',
		'+1 Dice to Net Soak Rolls.',
		50,
		'software',
		1,
		0,
		0,
		0,
		0,
		3
	),
	(
		'Flak',
		'Reduce target program attack to 0. Program immediately deactivates once used.',
		50,
		'software',
		1,
		0,
		0,
		0,
		0,
		3
	),
	(
		'Shield',
		'On receiving damage in the net, reduce by 8. Program immediately deactivates once used.',
		50,
		'software',
		1,
		0,
		0,
		0,
		0,
		3
	),
	(
		'Ban Hammer',
		'An elegant weapon from a civilized discussion board.',
		50,
		'software',
		1,
		0,
		0,
		2,
		0,
		3
	),
	(
		'Sword',
		'A common weapon in the Netrunners arsenal.',
		50,
		'software',
		1,
		0,
		0,
		1,
		1,
		3
	),
	(
		'Epic Flail',
		'Sometimes you just gotta hope and swing.',
		50,
		'software',
		1,
		0,
		0,
		0,
		2,
		3
	),
	(
		'DeckKRASH',
		'If this hits a Netrunner, they immediately Jack Out if it does any damage.',
		500,
		'software',
		1,
		0,
		0,
		0,
		0,
		1
	),
	(
		'Hellbolt',
		'If used on an enemy Netrunner, their cyberdeck will catch on fire if it does any damage',
		500,
		'software',
		1,
		0,
		0,
		2,
		0,
		1
	),
	(
		'Nerve Scrub',
		'If used on an enemy Netrunner, their Reflexes and Intelligence are lowered by one for 1 hour if the attack does any damage. These effects are psychosomatic and not permanent.',
		500,
		'software',
		1,
		0,
		0,
		0,
		0,
		1
	),
	(
		'Poison Pins',
		'If used to target an enemy program, the program will be destroyed instead of deactivated if it is de-rezzed.',
		500,
		'software',
		1,
		0,
		0,
		1,
		1,
		3
	),
	(
		'Superglue',
		'If used on an enemy Netrunner, they can not change levels in the Architecture or voluntarily Jack Out for 1d10/2 rounds.',
		500,
		'software',
		1,
		0,
		0,
		1,
		1,
		3
	),
	(
		'Brainfuxx0r',
		'If used on an enemy Netrunner, their lose a number of Netrunner actions equal to the damage taken.',
		500,
		'software',
		1,
		0,
		0,
		1,
		1,
		3
	),
	(
		'Asp',
		'On successful hit, deactivates a program at random. Can combine - each program gives +1 to all stats when doing so.',
		100,
		'black ice',
		1,
		5,
		5,
		2,
		2,
		3
	),
	(
		'Giant',
		'On successful hit that causes damage, Netrunner is forcibly jacked out.',
		1000,
		'black ice',
		1,
		5,
		1,
		6,
		4,
		6
	),
	(
		'Hellhound',
		'On a successful hit that causes damage, Netrunner deck catches fire. Can combine - each program gives +1 to all stats when doing so.',
		500,
		'black ice',
		1,
		7,
		6,
		5,
		3,
		4
	),
	(
		'Kraken',
		'On a successful hit that causes damage, Netrunner cannot change levels of the architecture or Jack Out for 1 round',
		1000,
		'black ice',
		1,
		5,
		2,
		8,
		4,
		6
	),
	(
		'Liche',
		'On a successful hit that causes damage, Netrunners Reflexes and Intelligence are lowered by one for 1 hour.',
		500,
		'black ice',
		1,
		8,
		6,
		4,
		4,
		8
	),
	(
		'Raven',
		'Instead of attacking, can change places with a program from a deeper level of the architecture.',
		100,
		'black ice',
		1,
		4,
		4,
		2,
		2,
		3
	),
	(
		'Scorpion',
		'On a successful hit that causes damage, Netrunners Movement is lowered by 1 for 1 hour.',
		500,
		'black ice',
		1,
		5,
		4,
		4,
		4,
		3
	),
	(
		'Skunk',
		'Until Derezzed, the Netrunner loses 1 die to all Slide actions. Each Skunk program can affect only 1 Netrunner at a time, but multiple Skunks can stack the effects.',
		500,
		'black ice',
		1,
		5,
		4,
		4,
		2,
		2
	),
	(
		'Wisp',
		'A basic defensive program that can take a variety of forms. Can combine - each program gives +1 to all stats when doing so.',
		50,
		'black ice',
		1,
		5,
		4,
		2,
		2,
		3
	),
	(
		'Dragon',
		'If this ICE targets a program, the program will be destroyed instead of deactivated if it is de-rezzed',
		10000,
		'black ice',
		1,
		8,
		8,
		7,
		7,
		10
	),
	(
		'Killer App',
		'If this ICE targets a program, the program will be destroyed instead of deactivated if it is de-rezzed.',
		1000,
		'black ice',
		1,
		5,
		3,
		8,
		2,
		4
	),
	(
		'Sabertooth',
		'If this ICE targets a program, the program will be destroyed instead of deactivated if it is de-rezzed.',
		1000,
		'black ice',
		1,
		5,
		8,
		4,
		2,
		4
	),
	(
		'DNA Lock',
		'Deck cannot be accessed or altered without a Cybertech roll against a DV of 8.',
		100,
		'mod',
		1,
		0,
		0,
		0,
		0,
		0
	),
	(
		'Hardened Circuitry',
		'Cyberdeck cannot be disabled or destroyed by EMP effects.',
		100,
		'mod',
		1,
		0,
		0,
		0,
		0,
		0
	),
	(
		'Insulated Wires',
		'Cyberdeck cannot catch on fire as the result of enemy programs.',
		100,
		'mod',
		1,
		0,
		0,
		0,
		0,
		0
	),
	(
		'Extended Antenna',
		'Cyberdeck can connect to wireless access points up to 20 meters away.',
		100,
		'mod',
		1,
		0,
		0,
		0,
		0,
		0
	),
	(
		'Backup Drive',
		'A program that is destroyed is saved to this drive instead. They can be restored to the Deck with a single meat action.',
		100,
		'mod',
		1,
		0,
		0,
		0,
		0,
		0
	),
	(
		'KRASH Barrier',
		'Netrunner cannot be Jacked Out involuntarily without depressing a physical button on this device.',
		500,
		'mod',
		2,
		0,
		0,
		0,
		0,
		0
	);

INSERT INTO
	"netrunner_master" (
		"name",
		"description",
		"price",
		"type",
		"slots",
		"perception",
		"speed",
		"attack",
		"defense",
		"rez"
	)
VALUES -- One step up weapons
	(
		'Langford Parrot',
		'Caution: Direct observation of the Parrot may result in catastrophic autoDarwination',
		500,
		'software',
		1,
		0,
		0,
		3,
		1,
		4
	),
	(
		'Flaming Sword',
		'Like a sword, but on fire.',
		500,
		'software',
		1,
		0,
		0,
		2,
		2,
		4
	),
	(
		'Web Launchers',
		'Apparently this is a weapon somehow?',
		500,
		'software',
		1,
		0,
		0,
		1,
		3,
		4
	),
	-- Two step up weapons
	(
		'BFG',
		'They bring a knife, we bring a rocket launcher.',
		2500,
		'software',
		1,
		0,
		0,
		4,
		2,
		5
	),
	(
		'Holy Avenger',
		'Yo I think this thing is +5 AND flaming.',
		2500,
		'software',
		1,
		0,
		0,
		3,
		3,
		5
	),
	(
		'Zatoichi Walking Stick',
		'You can hear how dice fall when holding it.',
		2500,
		'software',
		1,
		0,
		0,
		2,
		4,
		5
	);

CREATE TABLE
	"char_owned_cyberware" (
		"owned_cyberware_id" serial NOT NULL,
		"char_id" integer NOT NULL,
		"cyberware_master_id" integer NOT NULL,
		"equipped" bool NOT NULL default false
	)
WITH
	(OIDS = FALSE);

ALTER TABLE "char_owned_cyberware" ADD CONSTRAINT "char_owned_cyberware_fk0" FOREIGN KEY ("char_id") REFERENCES "character" ("id") ON DELETE CASCADE;

ALTER TABLE "char_owned_cyberware" ADD CONSTRAINT "char_owned_cyberware_fk1" FOREIGN KEY ("cyberware_id") REFERENCES "cyberware_master" ("cyberware_master_id");

ALTER TABLE "char_weapons_bridge" ADD CONSTRAINT "char_weapons_bridge_fk0" FOREIGN KEY ("char_id") REFERENCES "character" ("id") ON DELETE CASCADE;

ALTER TABLE "char_weapons_bridge" ADD CONSTRAINT "char_weapons_bridge_fk1" FOREIGN KEY ("weapon_id") REFERENCES "weapon_master" ("weapon_master_id");

ALTER TABLE "char_armor_bridge" ADD CONSTRAINT "char_armor_bridge_fk0" FOREIGN KEY ("char_id") REFERENCES "character" ("id") ON DELETE CASCADE;

ALTER TABLE "char_armor_bridge" ADD CONSTRAINT "char_armor_bridge_fk1" FOREIGN KEY ("armor_id") REFERENCES "armor_master" ("armor_master_id");

ALTER TABLE "char_status" ADD CONSTRAINT "char_status_fk0" FOREIGN KEY ("char_id") REFERENCES "character" ("id") ON DELETE CASCADE;

ALTER TABLE "char_cyberware_bridge" ADD CONSTRAINT "char_cyberware_bridge_fk0" FOREIGN KEY ("char_id") REFERENCES "character" ("id") ON DELETE CASCADE;

INSERT INTO
	"cyberware_master" (
		"name",
		"price",
		"description",
		"humanity_loss_min",
		"humanity_loss_max",
		"install_level",
		"type",
		"is_treasure"
	)
VALUES
	(
		'Biomonitor',
		100,
		'Implant that reads vital signs.',
		0,
		0,
		'Mall',
		'fashionware',
		false
	),
	(
		'Chemskin',
		100,
		'Custom skin biosculpting that can alter the appearance of ones skin to almost any conceivable combination of color, inked tattoos, designs, and the like.',
		0,
		0,
		'Mall',
		'fashionware',
		false
	),
	(
		'EMP Threading',
		10,
		'Metallic lines that run across the body. Highly fashionable combinations are always coming and going.',
		0,
		0,
		'Mall',
		'fashionware',
		false
	),
	(
		'Light Tattoo',
		100,
		'Subdermal patches that can produce colorful, backlit tattoos. Gives +1 Appearance when awesome enough.',
		0,
		0,
		'Mall',
		'fashionware',
		false
	),
	(
		'Corneal Implant',
		100,
		'Color changing lenses implanted in the eyes, allowing for nearly any color/style combination',
		0,
		0,
		'Mall',
		'fashionware',
		false
	),
	(
		'Skinwatch',
		100,
		'Subdermal LED watch',
		0,
		0,
		'Mall',
		'fashionware',
		false
	),
	(
		'Techhair',
		100,
		'Color changing, light emitting, artificial hair. Grants +1 Cool.',
		0,
		0,
		'Mall',
		'fashionware',
		false
	),
	(
		'Basic Neural Link',
		500,
		'Artifical Nervous System that allows for the use of different pieces of chipware. This basic version has 5 sockets. Inclues interfacing plugs to connect to most machines. Only one can be equipped at a time.',
		2,
		8,
		'Hospital',
		'neuralware',
		false
	),
	(
		'Braindance Recorder',
		500,
		'System to record all of a users experience to memory chips.',
		0,
		0,
		'Chip',
		'neuralware',
		false
	),
	(
		'Kerenzikov',
		500,
		'Speedware that dramatically boosts a users experiential sense of time. Increases Move by 1, and User gains a second complex action each round. Deals the user 6 stun damage when the effect wears off.',
		0,
		0,
		'Chip',
		'neuralware',
		false
	),
	(
		'Sandevistan',
		2000,
		'Speedware that dangerously boosts a users experiential sense of time. Increases Move by 3 and the user gains two additional complex actions each round. Deals the user 6 lethal damage when the effect wears off.',
		0,
		0,
		'Chip',
		'neuralware',
		false
	),
	(
		'Miilitech "Kali"',
		25000,
		'Speedware that artifically boosts a users experiential sense of time. Increases Move by 3 and adds 3 die to most combat rolls for one scene when activated. Deals the user 6 lethal damage when the effect wears off.',
		0,
		0,
		'Chip',
		'neuralware',
		false
	),
	(
		'Memory chip',
		10,
		'Memory storage chip. Approximate capacity of 2 Exabytes, or 2 Billion Gigabytes for you old timers.',
		0,
		0,
		'Chip',
		'neuralware',
		false
	),
	(
		'Olfactory Boost',
		100,
		'Chip that assists in decoding scents and boosts a users sense of smell to dog-like levels. Allows tracking via scent, amongst other tricks.',
		0,
		0,
		'Chip',
		'neuralware',
		false
	),
	(
		'Pain Editor',
		5000,
		'Chip that overrides the users ability to feel pain. Dramatically reduces wound-based die penalties. Character does not fall unconscious when wound track is filled with stun damage.',
		0,
		0,
		'Chip',
		'neuralware',
		false
	),
	(
		'Skill Chip - Athletics',
		500,
		'Chip that overrides a users muscle memory, gives access to internal databanks, and otherwise gives a user skills they might not otherwise have access to.',
		0,
		0,
		'Chip',
		'neuralware',
		false
	),
	(
		'Skill Chip - Brawling',
		500,
		'Chip that overrides a users muscle memory, gives access to internal databanks, and otherwise gives a user skills they might not otherwise have access to.',
		0,
		0,
		'Chip',
		'neuralware',
		false
	),
	(
		'Skill Chip - Evasion',
		500,
		'Chip that overrides a users muscle memory, gives access to internal databanks, and otherwise gives a user skills they might not otherwise have access to.',
		0,
		0,
		'Chip',
		'neuralware',
		false
	),
	(
		'Skill Chip - Fast Talk',
		500,
		'Chip that overrides a users muscle memory, gives access to internal databanks, and otherwise gives a user skills they might not otherwise have access to.',
		0,
		0,
		'Chip',
		'neuralware',
		false
	),
	(
		'Skill Chip - Firearms',
		500,
		'Chip that overrides a users muscle memory, gives access to internal databanks, and otherwise gives a user skills they might not otherwise have access to.',
		0,
		0,
		'Chip',
		'neuralware',
		false
	),
	(
		'Skill Chip - Melee Weapons',
		500,
		'Chip that overrides a users muscle memory, gives access to internal databanks, and otherwise gives a user skills they might not otherwise have access to.',
		0,
		0,
		'Chip',
		'neuralware',
		false
	),
	(
		'Skill Chip - Drive Land',
		500,
		'Chip that overrides a users muscle memory, gives access to internal databanks, and otherwise gives a user skills they might not otherwise have access to.',
		0,
		0,
		'Chip',
		'neuralware',
		false
	),
	(
		'Skill Chip - Performance',
		500,
		'Chip that overrides a users muscle memory, gives access to internal databanks, and otherwise gives a user skills they might not otherwise have access to.',
		0,
		0,
		'Chip',
		'neuralware',
		false
	),
	(
		'Skill Chip - Stealth',
		500,
		'Chip that overrides a users muscle memory, gives access to internal databanks, and otherwise gives a user skills they might not otherwise have access to.',
		0,
		0,
		'Chip',
		'neuralware',
		false
	),
	(
		'Skill Chip - Cryptography',
		500,
		'Chip that overrides a users muscle memory, gives access to internal databanks, and otherwise gives a user skills they might not otherwise have access to.',
		0,
		0,
		'Chip',
		'neuralware',
		false
	),
	(
		'Skill Chip - First Aid',
		500,
		'Chip that overrides a users muscle memory, gives access to internal databanks, and otherwise gives a user skills they might not otherwise have access to.',
		0,
		0,
		'Chip',
		'neuralware',
		false
	),
	(
		'Skill Chip - Gambling',
		500,
		'Chip that overrides a users muscle memory, gives access to internal databanks, and otherwise gives a user skills they might not otherwise have access to.',
		0,
		0,
		'Chip',
		'neuralware',
		false
	),
	(
		'Skill Chip - Language',
		500,
		'Chip that overrides a users muscle memory, gives access to internal databanks, and otherwise gives a user skills they might not otherwise have access to.',
		0,
		0,
		'Chip',
		'neuralware',
		false
	),
	(
		'Tactile Booster',
		100,
		'Chip that increases a users sense of touch to the point where they can detect cats and larger sized animals from 20 meters away by placing their hand on a solid surface.',
		0,
		0,
		'Chip',
		'neuralware',
		false
	),
	(
		'Algernonic Subprocessors I',
		1000,
		'A general purpose intelligence booster chip. Gives instant access to all knowledge of an 8th grader.',
		0,
		0,
		'Chip',
		'neuralware',
		false
	),
	(
		'Algernonic Subprocessors II',
		5000,
		'A general purpose intelligence booster chip. Makes the user seem pretty bright.',
		0,
		0,
		'Chip',
		'neuralware',
		false
	),
	(
		'Algernonic Subprocessors III',
		25000,
		'A highly advanced intelligence booster chip. Contains a Small helper AI to assist with cognitive loads.',
		0,
		0,
		'Chip',
		'neuralware',
		true
	),
	(
		'Algernonic Subprocessors IV',
		75000,
		'An extremely advanced intelligence booster chip. Can make an average dullard into a Weapons Grade Savant.',
		0,
		0,
		'Chip',
		'neuralware',
		true
	),
	(
		'Algernonic Subprocessors V',
		1000000,
		'If this existed it would definitely be used to cheat at Jeapordy.',
		0,
		0,
		'Chip',
		'neuralware',
		true
	),
	(
		'Nervous System Regulator',
		25000,
		'A chip that seizes control of much of the users autonomic nervous system, bringing heart rate, breathing, blood pressure, and the like under manual control. Grants +1 Cool.',
		0,
		0,
		'Chip',
		'neuralware',
		true
	),
	(
		'Basic Cybereyes',
		100,
		'A pair of artificial eyes with 3 option slots. Includes the ability to change colors and patterns, a HUD, simple video recordings, and viewing Augmented Reality.',
		1,
		4,
		'Clinic',
		'cyberoptics',
		false
	),
	(
		'Anti-Dazzle System',
		100,
		'Makes the user immune to the effects of flashes and strobes.',
		0,
		0,
		'Mall',
		'cyberoptics',
		false
	),
	(
		'Dartgun',
		500,
		'Single shot dart that can be loaded with poison.',
		0,
		0,
		'Clinic',
		'cyberoptics',
		false
	),
	(
		'Image Processing',
		500,
		'User reduces difficulties on vision based perception checks.',
		0,
		0,
		'Mall',
		'cyberoptics',
		false
	),
	(
		'Infrared Imaging',
		500,
		'User ignores penalties for darkness, smog, and most smoke.',
		0,
		0,
		'Mall',
		'cyberoptics',
		false
	),
	(
		'MicroOptics',
		100,
		'In-eye magnifier allows for zooming in up to 400x.',
		0,
		0,
		'Mall',
		'cyberoptics',
		false
	),
	(
		'Rad Detector',
		1000,
		'Displays ambient radiation as a soft glow in the users surroundings.',
		0,
		0,
		'Clinic',
		'cyberoptics',
		false
	),
	(
		'HUD Agent',
		100,
		'More or less sophisticated digital assistant that appears in the users hud.',
		0,
		0,
		'Clinic',
		'cyberoptics',
		false
	),
	(
		'Basic Cyberaudio Suite',
		500,
		'Artificial system replacing a users inner ear. Includes basic recorder',
		1,
		4,
		'Clinic',
		'cyberaudio',
		false
	),
	(
		'Hearing Amplifier',
		100,
		'Boosts nearby sounds, allowing for reduced difficulties on hearing based perception checks.',
		0,
		0,
		'Mall',
		'cyberaudio',
		false
	),
	(
		'Level Damper',
		100,
		'Dampens loud noises such as gunshots, flash bang grenades, and screams.',
		0,
		0,
		'Mall',
		'cyberaudio',
		false
	),
	(
		'Radio Communicator',
		100,
		'Allows user to communicate via radio. Approximate range of 1 mile.',
		0,
		0,
		'Clinic',
		'cyberaudio',
		false
	),
	(
		'Voice Stress Analyzer',
		500,
		'Runs sophisticated analysis on incoming speech patterns, giving reduced difficulties to efforts to detect lies.',
		0,
		0,
		'Clinic',
		'cyberaudio'
	),
	false,
	(
		'AudioVox',
		500,
		'Voice synthesizer. Can be programmed in a variety of useful ways, most commonly used by speech-givers and musicians to achieve flawless verbalization.',
		1,
		4,
		'Clinic',
		'internalware',
		false
	),
	(
		'Contraceptive Implant',
		10,
		'Prevents unwanted pregnancy for approximately 4 years.',
		0,
		0,
		'Mall',
		'internalware',
		false
	),
	(
		'Platelet Booster',
		500,
		'Advanced nanotech that lowers healing difficulty values by 1.',
		1,
		4,
		'Clinic',
		'internalware',
		false
	),
	(
		'Nanotech Hive',
		5000,
		'Small, self-propogating device that allows for rapid and dramatic healing. User recovers from wounds as though they were in a cryotank if they get at least 8 hours of sleep a day.',
		1,
		4,
		'Hospital',
		'internalware',
		false
	),
	(
		'Vampyres',
		500,
		'Light Melee Weapon implanted in the mouth. If the user grapples a victim first, the damage is aggravated. The standard version is unable to be concealed or retracted.',
		1,
		4,
		'Clinic',
		'internalware',
		false
	),
	(
		'Cybersnake',
		1000,
		'Esophogus mounted Heavy Melee Weapon. If the user grapples a victim first, the damage is aggravated.',
		2,
		8,
		'Hospital',
		'internalware',
		false
	),
	(
		'Gills',
		1000,
		'User can breathe underwater.',
		1,
		4,
		'Hospital',
		'internalware',
		false
	),
	(
		'Grafted Muscles I',
		1000,
		'Increases Strength by a small amount without excessive bulking.',
		1,
		4,
		'Hospital',
		'internalware',
		false
	),
	(
		'Grafted Muscles II',
		5000,
		'Increases Strength by a moderate amount with a small amount of bulk.',
		2,
		8,
		'Hospital',
		'internalware',
		false
	),
	(
		'Grafted Muscles III',
		25000,
		'Increases Strength by a large amount. The muscles are apparent but seem natural.',
		3,
		9,
		'Hospital',
		'internalware',
		true
	),
	(
		'Grafted Muscles IV',
		75000,
		'Massively increased Strength without a visible trace courtesy of like, carbon nanorods or some nonsense.',
		4,
		12,
		'Hospital',
		'internalware',
		true
	),
	(
		'Grafted Muscles V',
		1000000,
		'This is probably not real and stories of waifu girls ripping cars in half is therefore no cause for alarm.',
		5,
		15,
		'Hospital',
		'internalware',
		true
	),
	(
		'Bone Lacing I',
		1000,
		'Increases Body by a small amount. Basically nothing you cannot achieve with vitamins.',
		1,
		4,
		'Hospital',
		'internalware',
		false
	),
	(
		'Bone Lacing II',
		5000,
		'Increases Body by a modest amount. Your bones are...pretty strong.',
		2,
		8,
		'Hospital',
		'internalware',
		false
	),
	(
		'Bone Lacing III',
		25000,
		'Increases Body by a large amount. Unironic use of the nickname Old Ironsides is permitted.',
		3,
		9,
		'Hospital',
		'internalware',
		true
	),
	(
		'Bone Lacing IV',
		75000,
		'Massively increased Body courtesy of Vanadium Bones and, um, skin de-tenderizing (.',
		4,
		12,
		'Hospital',
		'internalware',
		true
	),
	(
		'Bone Lacing V',
		1000000,
		'Stories of humans becoming literal brick walls are to be dismissed by all right thinking people.',
		5,
		15,
		'Hospital',
		'internalware',
		true
	),
	(
		'Nervous System Siliconization I',
		1000,
		'Increases Reflexes by a small amount by turning some of your nerves into carbon fiber optics.',
		1,
		4,
		'Hospital',
		'internalware',
		false
	),
	(
		'Nervous System Siliconization II',
		5000,
		'Increases Reflexes by a modest amount. Carbon Fiber Optic nerves again. Pretty cool right.',
		2,
		8,
		'Hospital',
		'internalware',
		false
	),
	(
		'Nervous System Siliconization III',
		25000,
		'Increases Reflexes by a large amount. Very futuristic, your Carbon Fiber Optics endings.',
		3,
		9,
		'Hospital',
		'internalware',
		true
	),
	(
		'Nervous System Siliconization IV',
		75000,
		'Increases Reflexes by an enormous amount. Just say it. Carbon. Fiber. Optics. Rolls off the tongue.',
		4,
		12,
		'Hospital',
		'internalware',
		true
	),
	(
		'Nervous System Siliconization V',
		1000000,
		'Faster than a speeding bullet and slicker than an oil spill. Thank god these don\'t exist, right.',
		5,
		15,
		'Hospital',
		'internalware',
		true
	),
	(
		'Independent Air Supply',
		1000,
		'A third lung made of oxygen tanks. Allows holding ones breath for about an hour.',
		1,
		6,
		'Hospital',
		'internalware',
		false
	),
	(
		'Midnight Lady Implant',
		100,
		'Be a Venus, be the fire, be the desire.',
		1,
		2,
		'Clinic',
		'internalware',
		false
	),
	(
		'Mr. Studd Implant',
		100,
		'All Night. Every Night.',
		1,
		2,
		'Clinic',
		'internalware',
		false
	),
	(
		'Toxin Binders',
		500,
		'Reduces difficulty to resist airborne toxins by 1.',
		1,
		4,
		'Clinic',
		'internalware',
		false
	),
	(
		'Nasal Filters',
		5000,
		'Makes owner immune to most airborne toxins and gases.',
		1,
		6,
		'Hospital',
		'internalware',
		false
	),
	(
		'Skin Weave',
		500,
		'Weaves resistant material directly into the skin. Increases armor by 2 and adds 1 health box.',
		1,
		4,
		'Hospital',
		'externalware',
		false
	),
	(
		'Subdermal Armor',
		1000,
		'Implanted armor beneath the skin. Increases armor by 3 and adds 2 health boxes.',
		1,
		4,
		'Hospital',
		'externalware',
		false
	),
	(
		'Chromed Exo-Armor',
		25000,
		'Armor mounted to surgically implanted hard points across the users body, and polished to a high shine. May include fiber optic light designs, chameleon coatings, and the like. Grants +1 Appearance, +4 Armor, and +2 Health Boxes.',
		2,
		6,
		'Hospital',
		'externalware',
		true
	),
	(
		'Body Plating',
		50000,
		'Bonds armor plating directly to the user\'s bone in an extremely unsettling way. Generally considered the last step before one goes full cyborg. Increases armor by 5 and adds 3 health boxes. This armor is also considered Hardened (rules).',
		2,
		6,
		'Hospital',
		'externalware',
		false
	),
	(
		'Cyberarm - Right',
		500,
		'Replacement arm. Standard issue looks like an angular robotic limb. Grants 1 additional health box.',
		2,
		6,
		'Hospital',
		'cyberarm',
		false
	),
	(
		'Cyberarm - Left',
		500,
		'Replacement arm. Standard issue looks like an angular robotic limb. Grants 1 additional health box.',
		2,
		6,
		'Hospital',
		'cyberarm',
		false
	),
	(
		'Grapple Hand',
		500,
		'User can fire their hand 30 meters. It can still feel and grab things. Hand can also just run along the ground and grab things.',
		0,
		0,
		'Clinic',
		'cyberarm',
		false
	),
	(
		'Medscanner',
		500,
		'Built in scanner that assists with diagnosing injury and illness. Reduces First Aid and Paramedic difficulties by 1.',
		0,
		0,
		'Clinic',
		'cyberarm',
		false
	),
	(
		'Techscanner',
		500,
		'Built in scanner for assessing technology. Comes with a variety of probes. Reduces repair and jury rigging difficulties by 1.',
		0,
		0,
		'Clinic',
		'cyberarm',
		false
	),
	(
		'Tool Hand',
		500,
		'Fingers contain a variety of screwdrivers, wrenches, a small drill, and other tools. Never carry a toolbag again!',
		0,
		0,
		'Clinic',
		'cyberarm',
		false
	),
	(
		'Quick Change Mount',
		100,
		'Special mounting that allows arm to be removed or attached as a complex action',
		0,
		0,
		'Clinic',
		'cyberarm',
		false
	),
	(
		'Subdermal Grip',
		500,
		'Allows user to interface with a smartgun without connecting interface plugs.',
		0,
		0,
		'Clinic',
		'cyberarm',
		false
	),
	(
		'Built-in Gun',
		500,
		'A one-handed gun can be built into a cyberarm. Weapon is concealed even if not normally able to be.',
		0,
		0,
		'Clinic',
		'cyberarm',
		false
	),
	(
		'Big Knucks',
		100,
		'Built in armored knuckles. Gives +1 damage to unarmed attacks.',
		0,
		0,
		'Clinic',
		'cyberarm',
		false
	),
	(
		'Scratchers',
		100,
		'Carbo-glass fingernails. Acts as a light melee weapon that is virtually undetectable. Exotic Weapon',
		0,
		0,
		'Clinic',
		'cyberarm',
		false
	),
	(
		'Rippers',
		500,
		'Carbo-glass claws built into the first joint of a finger. Acts as a medium melee weapon that is virtually undetectable. Exotic Weapon.',
		0,
		0,
		'Clinic',
		'cyberarm',
		false
	),
	(
		'Wolvers',
		1000,
		'Titanium claws concealed in the forearm that pop out when making a fist. Does NOT make the noise for trademark reasons. Acts as a heavy melee weapon that is virtually undetectable. Exotic Weapon.',
		0,
		0,
		'Clinic',
		'cyberarm',
		false
	),
	(
		'Hardened Shielding',
		1000,
		'Cyberlimb is immune to the effect of EMP devices.',
		0,
		0,
		'Clinic',
		'cyberarm',
		false
	),
	(
		'Plastic Covering',
		100,
		'Plastic coating for limb, giving it a close to human appearance, if somewhat shiny and angular.',
		0,
		0,
		'Clinic',
		'cyberarm',
		false
	),
	(
		'Realskinn Covering',
		500,
		'Artificial skin covering for cyberlimb. Mimics the feel, temp, and reaction of actual skin.',
		0,
		0,
		'Clinic',
		'cyberarm',
		false
	),
	(
		'SuperChrome Covering',
		1000,
		'Shiny metallic coating for cyberlminb. Self cleaning and polishing, too!',
		0,
		0,
		'Clinic',
		'cyberarm',
		false
	),
	(
		'Cyberleg - Right',
		500,
		'Replacement leg. Standard issue looks like an angular robotic limb. Modifications must be purchased twice and installed in both legs to be effective. Grants 1 additional health box.',
		2,
		6,
		'Hospital',
		'cyberleg',
		false
	),
	(
		'Cyberleg - Left',
		500,
		'Replacement leg. Standard issue looks like an angular robotic limb. Modifications must be purchased twice and installed in both legs to be effective. Grants 1 additional health box.',
		2,
		6,
		'Hospital',
		'cyberleg',
		false
	),
	(
		'Grip Foot',
		250,
		'Foot contains traction enhancing nanofibers similar to a chameleons. Allows climbing at normal speed on non-wet surfaces. User must be barefoot',
		0,
		0,
		'Clinic',
		'cyberleg',
		false
	),
	(
		'Web Foot',
		250,
		'Allows toes to extend and deploy webbing, acting as built in flippers. Allows swimming at normal speed.',
		0,
		0,
		'Clinic',
		'cyberleg',
		false
	),
	(
		'Spring Heels',
		250,
		'Leg contains powerful hydraulics, allowing for some truly impressive leaps. More importantly, allows surviving the landing.',
		0,
		0,
		'Clinic',
		'cyberleg',
		false
	),
	(
		'Skate Foot',
		250,
		'Feet can split apart and deploy inline skates. Movement is doubled over most surfaces when skating.',
		0,
		0,
		'Clinic',
		'cyberleg',
		false
	),
	(
		'Hardened Shielding',
		1000,
		'Cyberlimb is immune to the effect of EMP devices.',
		0,
		0,
		'Clinic',
		'cyberleg',
		false
	),
	(
		'Plastic Covering',
		100,
		'Plastic coating for limb, giving it a close to human appearance, if somewhat shiny and angular.',
		0,
		0,
		'Clinic',
		'cyberleg',
		false
	),
	(
		'Realskinn Covering',
		500,
		'Artificial skin covering for cyberlimb. Mimics the feel, temp, and reaction of actual skin.',
		0,
		0,
		'Clinic',
		'cyberleg',
		false
	),
	(
		'SuperChrome Covering',
		1000,
		'Shiny metallic coating for cyberlminb. Self cleaning and polishing, too!',
		0,
		0,
		'Clinic',
		'cyberleg',
		false
	),
	(
		'Artificial Shoulder Mount',
		1000,
		'Allows user to mount an additional pair of cyberlimbs under their normal arms.',
		3,
		9,
		'Hospital',
		'borgware',
		false
	),
	(
		'MultiOptic Mount',
		1000,
		'(BETA - Does not work) Gives user 5 additional cybereye slots.',
		3,
		9,
		'Hospital',
		'borgware',
		true
	),
	(
		'Sensor Array',
		1000,
		'(BETA - Does not work) Gives user 5 additional cyberear slots.',
		3,
		9,
		'Hospital',
		'borgware',
		true
	),
	(
		'Linear Frame Alpha',
		50000,
		'Grafted exoskeleton with built in power supply for heavy manual labor. Adds 5 armor and 4 health boxes. Increases Strength and Body by 3. Not compatible with any Externalware, Cyberlimbs, Grafted Muscles, Bone Lacing, or Nervous System Siliconization.',
		5,
		15,
		'Hospital',
		'borgware',
		true
	),
	(
		'Linear Frame Beta',
		150000,
		'(BETA - Does not work) Advanced grafted exoskeleton with built in power supply, designed for combat. Adds 8 armor and 6 health boxes. Increases Strength and Body by 4. Not compatible with any Externalware, Cyberlimbs, Grafted Muscles, Bone Lacing, or Nervous System Siliconization.',
		6,
		18,
		'Hospital',
		'borgware',
		true
	);

INSERT INTO
	"public"."armor_master" (
		"name",
		"quality",
		"price",
		"description",
		"is_shield"
	)
VALUES
	(
		'Clothes',
		1,
		10,
		'Standard clothing with mild antiballistic properties.',
		FALSE
	),
	(
		'Leathers',
		2,
		20,
		'Not even slightly bulletproof, but offers protection against small clubs.',
		FALSE
	),
	(
		'Kevlar',
		3,
		50,
		'Offers decent protection for the vitals at a bargain price.',
		FALSE
	),
	(
		'Light Armorjack',
		4,
		100,
		'Full body armor of the lightest kind.',
		FALSE
	),
	(
		'Armored Trench Coat',
		4,
		1000,
		'A somewhat less obtrusive piece of gear, allowing an edgerunner to armor up in public. Not especially fancy, does not breathe. Expect a certain amount of musk.',
		FALSE
	),
	(
		'Fancy Armored Suit',
		4,
		2500,
		'A stylish, high class looking bit of body armor. Common amongst Corpos with reason to suspect they are less loved than they should be. Also, it breathes.',
		FALSE
	),
	(
		'Medium Armorjack',
		5,
		500,
		'A plain suit of modern armor, completely undisguisable as anything else.',
		FALSE
	),
	(
		'Heavy Armorjack',
		6,
		1000,
		'The descendent of SWAT armor and platemail, offering considerable protection to the wearer.',
		FALSE
	),
	(
		'Full Flak',
		7,
		2000,
		'Standard military issue gear, designed to keep the wearer alive through some SHIT.',
		FALSE
	),
	(
		'Metalgear',
		8,
		5000,
		'Advanced composite alloys and strategic plating offering the best possible protection. The weaere soaks non-aggravated wounds with a difficulty of 5.',
		FALSE
	),
	(
		'Military Grade Powered Armor',
		10,
		50000,
		'Sometimes you gotta send in the Space Marines. +2 Dice to any strength rolls. Armor is considered Hardened (see rules)',
		FALSE
	),
	(
		'Buckler',
		1,
		500,
		'A small shield, useful for deflecting gangers and salesmen.',
		TRUE
	),
	(
		'Riot Shield',
		2,
		1000,
		'A full sized shield offering decent protection.',
		TRUE
	);

-- INSERT INTO
-- 	"public"."shield_master" ("name", "quality", "price", "description")
-- VALUES
-- 	(
-- 		E 'Runner\'s Buckler',
-- 		1,
-- 		500,
-- 		E 'A small shield, useful for deflecting gangers and salesmen.'
-- 	),
-- 	(
-- 		E 'Riot Shield',
-- 		2,
-- 		1000,
-- 		E 'A full sized shield offering decent protection.'
-- 	)
INSERT INTO
	"public"."weapon_master" (
		"name",
		"description",
		"damage",
		"dmg_type",
		"range",
		"rof",
		"max_clip",
		"hands",
		"concealable",
		"price",
		"is_treasure"
	)
VALUES
	(
		'Light Melee Weapon',
		'Light Melee weapons are small, easily concealed items like pocket knives and switchblades. It can also cover small improvised weapons like rocks, broken bottles, and small sticks.',
		0,
		'melee',
		0,
		2,
		0,
		1,
		TRUE,
		10,
		FALSE
	),
	(
		'Medium Melee Weapon',
		'Medium Melee weapons are larger, heavier, and unable to be hidden on one\'s person - they include things like truncheons, nunchaku, large daggers and small swords. This also covers larger improvised weapons like chairs and pool cues.',
		1,
		'melee',
		0,
		2,
		0,
		1,
		FALSE,
		50,
		FALSE
	),
	(
		'Heavy Melee Weapon',
		'Heavy Melee weapons are specialized tools of destruction - most swords, machetes, and large clubs fit into this category. Generally they are two handed propositions, though a character with 4 strength or higher can use them one handed. Only very massive or dangerous improvised weapons are considered in this category.',
		2,
		'melee',
		0,
		2,
		0,
		2,
		FALSE,
		100,
		FALSE
	),
	(
		'Very Heavy Melee Weapon',
		'Very Heavy Melee Weapons covers exceptionally large and/or dangerous weapons - Greatswords and Battle Axes would be typical of the category. No improvised weapon is considered Very Heavy unless it is effectively a weapon on it\'s own merit, like a piece of rebar with a chunk of cement on it. Most Very Heavy weapons cannot be used effectively by characters with less than 6 strength; characters using them with 5 or lower strength have +1 difficulty on all attack rolls. A character with 9 strength or higher can use them one-handed effectively, however.',
		4,
		'melee',
		0,
		1,
		0,
		2,
		FALSE,
		500,
		FALSE
	),
	(
		'Light Pistol',
		'Light Pistols are typically low caliber, high magazine weapons. They also include hold-outs and very small revolvers; they are generally not terribly accurate and only useful at very close range.',
		4,
		'gun',
		5,
		2,
		12,
		1,
		TRUE,
		50,
		FALSE
	),
	(
		'Heavy Pistol',
		'Heavy Pistols are the favored weapon of law enforcement, Edgerunners, and just about everyone else who can afford one - they mix the best in range, stopping power, and magazine size.',
		5,
		'gun',
		10,
		2,
		8,
		1,
		TRUE,
		100,
		FALSE
	),
	(
		'Very Heavy Pistol',
		'Very Heavy Pistols are favored by those looking to make a statement; the 44 Magnum or Desert Eagle being classic examples. While each shot is far more dangerous and accurate from such weapons, relatively low rates of fire and magazine size means they should only be used by experts.',
		6,
		'gun',
		15,
		1,
		4,
		1,
		FALSE,
		500,
		FALSE
	),
	(
		'Light SMG',
		'Light submachine guns are typically machine pistols, designed to put a lot of bullets into the air without too much concern for accuracy. Uses SMG Special Rules.',
		2,
		'smg',
		15,
		4,
		20,
		1,
		TRUE,
		100,
		FALSE
	),
	(
		'Heavy SMG',
		'Heavy submachine guns are typically bullpup designs, and are favored by certain special forces and well-heeled gangers. Uses SMG Special Rules.',
		3,
		'smg',
		20,
		3,
		30,
		1,
		FALSE,
		500,
		FALSE
	),
	(
		'Pump Shotgun',
		'Shotguns are two handed weapons that trade range for damage. Modern shotguns have a choke on the barrel that allows for the attack to be widely dispersed - in this case, the user can hit a Lot of People with a single shot if they know what they\'re doing. The pump version is slow firing but widely available.',
		7,
		'shotgun',
		10,
		1,
		6,
		2,
		FALSE,
		100,
		FALSE
	),
	(
		'Double Barrel',
		'Double Barrel shotguns are rarely seen in the city, but they can pack a surprising punch. A character with a double barrel can fire both simultaneously, dealing an additional 3 damage.',
		7,
		'shotgun',
		10,
		2,
		2,
		2,
		FALSE,
		500,
		FALSE
	),
	(
		'Assault Shotgun',
		'Assault Shotguns are extremely dangerous devices that use slightly smaller shells and provide sustained, rapid fire. They are commonly used by military forces as breaching and suppression devices.',
		6,
		'shotgun',
		10,
		2,
		8,
		2,
		FALSE,
		5000,
		FALSE
	),
	(
		'Assault Rifle',
		'Assault Rifles are rapid firing, extremely powerful weapons rarely seen outside the hands of trained military units. Using one in public will generally bring down an unholy shitstorm of law enforcement. Can use Automatics special rules.',
		7,
		'assault',
		25,
		3,
		30,
		2,
		FALSE,
		5000,
		FALSE
	),
	(
		'Sniper Rifle',
		'Sniper rifles are cumbersome, heavy weapons that provide high damage at extreme range. They have a low rate of fire and smaller magazines.',
		8,
		'rifle',
		150,
		1,
		4,
		2,
		FALSE,
		1000,
		FALSE
	),
	(
		'Bow',
		'Bows are muscle powered weapons that are inferior to modern firearms except in one area - they are almost completely silent. As a result, they are surprisingly common on the streets. Bows use the Exotic Weapons skill. Modern bows have adjustable tensions. Getting one for use by an extraordinarily strong character (Strength of 6 or higher) requires a special order and carries a much higher cost.',
		2,
		'bow',
		10,
		1,
		1,
		2,
		FALSE,
		1000,
		FALSE
	),
	(
		'Grenade Launcher',
		'Heavy Weapon. High explosive weapons generally have a long range and deal extremely high damage. They are difficult to find ammunition for, and are rarely found outside the hands of highly trained military units. Using them in public is contra-indicated by the sane; using them in enclosed areas is usually the last thing someone does. High Explosive Weapons use the Heavy Weapons skill.',
		12,
		'explosive',
		40,
		1,
		4,
		2,
		FALSE,
		10000,
		FALSE
	),
	(
		'Rocket Launcher',
		'Heavy Weapon. High explosive weapons generally have a long range and deal extremely high damage. They are difficult to find ammunition for, and are rarely found outside the hands of highly trained military units. Using them in public is contra-indicated by the sane; using them in enclosed areas is usually the last thing someone does. High Explosive Weapons use the Heavy Weapons skill.',
		24,
		'explosive',
		120,
		1,
		1,
		2,
		FALSE,
		25000,
		FALSE
	),
	(
		'Companion Revolver',
		'Space cowboy pistol - looks like an antique revolver with an integral suppressor and some funky sights.',
		5,
		'gun',
		10,
		2,
		5,
		1,
		TRUE,
		10000,
		TRUE
	),
	(
		'Winchester 1873',
		'The gun that won the West.',
		6,
		'gun',
		15,
		1,
		15,
		2,
		FALSE,
		15000,
		TRUE
	),
	(
		'Kendachi Arms Monokatana',
		'A crystalline blade with built in microvibrators allow this weapon to slice through, well, anything. Ignores most armor.',
		3,
		'melee',
		0,
		2,
		0,
		2,
		FALSE,
		10000,
		TRUE
	),
	(
		'Malorian 3516',
		'High powered, custom handgun. Requires special smart ammunition made specifically for this weapon. Can be used in melee as a medium melee weapon once per reload, breathing fire from the base of the grip and dealing aggravated damage.',
		6,
		'gun',
		20,
		2,
		7,
		1,
		TRUE,
		150000,
		TRUE
	),
	(
		'Rhinemetall EMG-86',
		'Heavy Weapon.. Requires a complex action to reload both ammunition and charge pack. Requires custom ammunition. Ignores non-hardened armor, treats hardened armor as non-hardened, deals aggravated damage.',
		8,
		'gun',
		100,
		1,
		2,
		2,
		FALSE,
		250000,
		TRUE
	),
	(
		'Magnetic Shuriken',
		'Exotic Weapon. Attacker has -1 DV on most attacks if target is wearing metallic armor or has more than 1 cyberlimb. Explodes after hitting, ablating an additional point of armor.',
		1,
		'bow',
		1,
		3,
		3,
		1,
		TRUE,
		1000,
		TRUE
	),
	(
		'Giant Magna-Shuriken',
		'Exotic Weapon. This is an 8 pound piece of razor edged steel honed to an almost fractal level of sharpness. It is wildly dangerous to vehicles, much less people. Requires a Shuriken Battleglove to use.',
		8,
		'bow',
		2,
		1,
		1,
		1,
		FALSE,
		10000,
		TRUE
	),
	(
		'Gun-nade',
		'One use pistol - removing the clip is the equivalent of pulling the pin on a grenade built into the device. Who would build such a thing!?',
		4,
		'gun',
		5,
		2,
		8,
		1,
		TRUE,
		500,
		TRUE
	),
	(
		'DB-12',
		'Shotgun pistol - characters with a strength of 4 or lower have +1 DV when attacking. Both barrels can fire together, dealing an additional 3 damage if the attack hits. Takes a full standard action to reload.',
		7,
		'shotgun',
		5,
		2,
		2,
		2,
		FALSE,
		5000,
		TRUE
	),
	(
		'Arasaka Whistler',
		'Exotic Weapon. Full sized, pump action crossbow for rapid, silent killing. Can be broken down into a concealable device as a single complex action, or restored in two.',
		6,
		'gun',
		20,
		2,
		6,
		2,
		TRUE,
		15000,
		TRUE
	),
	(
		'Araska Reaper',
		'Exotic Weapon. Handheld, self-recocking crossbow. Often wielded with shuriken in close combat by complete maniacs. Collapses into, or expands from, a single, inscrutable block as a simple action.',
		4,
		'gun',
		10,
		2,
		4,
		1,
		TRUE,
		20000,
		TRUE
	),
	(
		'Bauhaus Rippercannon',
		'Custom made, extremely bulky machine gun that fires flechette filled cartridges. Requires Strength 6 or a mount to use effectively. Stupid illegal in every jurisdiction where it has been found. Uses SMG rules.',
		5,
		'smg',
		30,
		3,
		60,
		2,
		FALSE,
		50000,
		TRUE
	),
	(
		'Comrade Molech',
		'Requires custom ammo. Base DV of 8 to all attacks due to incredible weight and bulkiness; this is reduced by 1 each for using two hands (like a sissy) or having Strength of 8+.',
		10,
		'gun',
		10,
		1,
		1,
		2,
		TRUE,
		100000,
		TRUE
	),
	(
		'Tactical Selfie Stick',
		'A spring loaded, carbon fiber selfie stick.',
		0,
		'melee',
		0,
		2,
		0,
		1,
		TRUE,
		10,
		TRUE
	);

INSERT INTO
	"public"."misc_gear_master" ("name", "description", "price")
VALUES
	(E 'Agent', E 'Adaptive AI Smartphone', 100),
	(
		E 'Airhypo',
		E 'Easy to use drug injection device',
		20
	),
	(
		E 'Anti-Smog Breathing Mask',
		E 'Helpful for filtering out the omnipresent airborne toxins in the city.',
		20
	),
	(
		E 'Audio Recorder',
		E 'Records audio onto onboard Chips. ',
		100
	),
	(
		E 'Auto Level Dampening Ear Protectors',
		E 'Compact ear protection, making the user immune to the effecs caused by dangerously loud sounds while still allowing whispered conversation.',
		500
	),
	(
		E 'Binoculars',
		E 'Adjustable and highly flexible, allowing for up to 12x magnification',
		50
	),
	(
		E 'Braindance Viewer',
		E 'Allows the wearer to experience braindance Chips.',
		1000
	),
	(
		E 'Bug detector',
		E 'Discreet tool that can detect video and listening devices',
		500
	),
	(
		E 'Camping Gear',
		E '2 person tent, self inflating mattress and sleeping bag, stakes, tarp, and other necessaries for street living.',
		75
	),
	(
		E 'Carryall',
		E 'A bag with carrying handles and a shoulder strap',
		20
	),
	(
		E 'Chemical Analyzer',
		E 'Handheld device that can provide chemical analysis of the air or provided samples.',
		1000
	),
	(
		E 'Computer',
		E 'A portable computer with a touchscreen and keyboard. Durable and hardy.',
		50
	),
	(
		E 'Cryopump',
		E 'A portable slip for a single person with a cryo unit. See Role Abilities: Medtech',
		2500
	),
	(
		E 'Cryotank',
		E 'An installed tank and associated hardware. See Role Abilities: Medtech',
		5000
	),
	(
		E 'Disposable Cell Phone',
		E 'It makes calls and not much else.',
		5
	),
	(
		E 'Drum Syntheizer',
		E 'When attached to an amp, produces pre-programmed drumbeats',
		50
	),
	(
		E 'Duct Tape',
		E 'Comes in many colors, including glow-in-the-dark',
		5
	),
	(
		E 'Instrument',
		E 'Any device for making music. Electric versions require an amp.',
		500
	),
	(
		E 'Flashlight',
		E 'Rechargeable light with adjustable lenses, extra modes, and programable colors.',
		20
	),
	(
		E 'Food Stick',
		E 'One awful meal in bar form.',
		5
	),
	(
		E 'Glow Paint',
		E 'Glow in the dark spray paint',
		10
	),
	(
		E 'Glow Stick',
		E 'Single use stick that illuminates a small area.',
		5
	),
	(
		E 'Grapple Gun',
		E 'Fires a grappling line up to 30 meters. Bamf!',
		500
	),
	(
		E 'Plasticuffs',
		E 'Plastic Restraints. Can be broken by characters with a Strength of 6 or higher.',
		10
	),
	(
		E 'Steel Handcuffs',
		E 'Steel Restraints. Can be broken by characters with a Strength of 7 or higher.',
		50
	),
	(
		E 'Steel Security Handcuffs',
		E 'Advanced Steel Restraints. Can be broken by characters with a Strength of 9 or higher.',
		500
	),
	(
		E 'Homing Tracers',
		E 'Dime-sized device that can be tracked by a Cyberdeck, Computer, Radio Communicator, Radio Scanner, or many kinds of cyberware.',
		500
	),
	(
		E 'Kibble Pack',
		E 'One meal worth of delicious* human** food***',
		5
	),
	(
		E 'Lock Picks',
		E 'Used to crack mechanical locks.',
		20
	),
	(
		E 'Medscanner',
		E 'Handheld device useful for assessing injuries and illness. Reduces First Aid and Paramedic difficulties by 1.',
		500
	),
	(
		E 'Medtech Bag',
		E 'A full set of emergency medical tools in custom pockets',
		100
	),
	(
		E 'Memory Chip',
		E 'Standard data storage device',
		5
	),
	(E 'MRE', E 'Self heating ration', 5),
	(
		E 'Personal CarePak',
		E 'Everything a person needs to clean up - cleansing wipes, leave-in nanoshampoo, compostable toothbrush, the works.',
		10
	),
	(
		E 'Pocket Amplifier',
		E 'Battery powered amplifier. Can support 2 instruments for up to 6 hours on a single charge.',
		50
	),
	(
		E 'Radar Detector',
		E 'Beeps when within 2 meters of an active radar beam',
		500
	),
	(
		E 'Radio Communicator',
		E 'Earpiece and bone conduction microphone with a range of roughly 1 mile',
		100
	),
	(
		E 'Radio Scrambler',
		E 'Plug in device that scrambles radio communications. Requires pairing in advance to work properly.',
		500
	),
	(
		E 'Road Flare',
		E 'Lights up a large area for roughly an hour',
		5
	),
	(E 'Rope (50m)', E 'Just some rope.', 20),
	(
		E 'Smart Glasses',
		E 'Sophisticated HUD glasses that have one cyberoptics cyberware feature, chosen at purchase.',
		500
	),
	(E 'Techtool', E 'Handy folding multi-tool', 50),
	(
		E 'Video Camera',
		E 'Device about the size of a cigar that records audio & video. Can run for about a day on a single charge. Commonly shoulder mounted. Has auto-zoom, movement compensation, and other advanced features.',
		100
	),
	(
		E 'Virtuality Goggles',
		E 'Projects cyberspace imagery over a real world view - helpful for the netrunner on the go.',
		100
	),
	(
		'Tool Bag - Medical',
		'A portable medical kit suitable for first aid and minor surgical operations, as well as the installation of basic cyberware (Mall Level)',
		500
	),
	(
		'Workshop - Medical',
		'A well equipped medical station, suitable for treatment of 2 patients at a time. Includes necessary surgical implements for basic surgical procedures and cyberware installation. (Clinic Level)',
		5000
	),
	(
		'Facility - Medical',
		'A fully equipped medical facility, suitable for treatemnt of 4 patients at a time. Includes a sophisticated operating theater, AI support, and the like. Suitable for any surgical procedure or cyberware installation (Hospital Level)',
		25000
	),
	(
		'Tool Bag - Cybertech',
		'A portable toolkit suitable for minor field repairs to cyberware. Allows installation of the most basic forms of cyberware in conjunction with the appropriate medical equipment (Mall Level)',
		500
	),
	(
		'Workshop - Cybertech',
		'A well equipped cyberware station, suitable for the repair and fabrication of most basic cyberware. Allows installation of most cyberware in conjunction with the appropriate medical equipment (Clinic Level)',
		5000
	),
	(
		'Facility - Cybertech',
		'A fully equipped Cyberware facility, allowing the user to repair or fabrication of most cyberware. Allows installation of most cyberware in conjunction with the appropriate medical equipment (Hospital Level)',
		25000
	),
	(
		'Tool Bag - Vehicles',
		'A portable set of everyday tools useful for working on cars. Allows repairs to a vehicles unmodified maximum.',
		500
	),
	(
		'Workshop - Vehicles',
		'A well equipped station, suitable for working on a single normal sized vehicle. Allows for the installation and repair of most vehicle modifications, as well as the vehicle itself. Requires Armory Workshop to install vehicular weaponry.',
		5000
	),
	(
		'Facility - Vehicles',
		'A fully equipped area to work on vehicles. Allows for installation and repair of just about any vehicle or related modification. Requires Armory Workshop to install vehicular weaponry.',
		25000
	),
	(
		'Tool Bag - Armory',
		'A portable set of tools useful for working on basic weapons and armor. Allows for the repair and maintenance of these kinds of gear, as well as the production of standard ammunition. Not suitable for work on exotic or cyber weapons, or advanced armor (rating 5+).',
		500
	),
	(
		'Workshop - Armory',
		'A fully equipped set of tools and machinery for working on or modifying most weapons and armor. Allows for the production of non-custom ammunition. Allows for repair and modification of armor without the Hardened property. In conjunction with a Cyberware Workshop, allows for repair and modification of most cyberweapons.',
		5000
	) (
		'Facility - Armory',
		'A fully stocked shop for working on any conceivable set of weapons or armor. Allows for repair and modification of any such item, as well as the crafting of weapon-specific custom ammunition. In conjunction with a Cyberware Workshop, allows for the repair and modification of any cyberweapon.',
		25000
	),
	(
		'Workshop - Pharmaceutical',
		'A well equipped station with everyday tools necessary for the production of various medicines and compounds. Allows for the creation of most pharmaceuticals.',
		5000
	),
	(
		'Facility - Pharmaceutical',
		'A modern, fully equipped lab for pharmacological compounds. Allows development and creation of any number of chemicals and biological agents.',
		25000
	),
	(
		'Workshop - Explosives',
		'A well equipped setup for working with explosives and other hazardous chemicals. Allows for the creation of most kinds of demolition equipment, as well as ammunition for some heavy weapons.',
		5000
	),
	(
		'Facility - Explosives',
		'A fully equipped lab for the creation of large amounts of explosive compounds and other hazardous chemicals. Allows for the creation and manufacture of just about any kind of demolition equipment, along with ammunition for heavy weapons based on explosive ammo.',
		25000
	),
	(
		'Workshop - Fabrication',
		'Small set of 3-D printers, lathes, and other tools of the trade to produce equipment. Allows for the production of unique equipment, as well as mass production of certain kinds of gear in conjunction with the relevant Workshop / Facility.',
		5000
	),
	(
		'Facility - Fabrication',
		'A full set of 3-D Printers, lathes, laser cutters, and other tools needed to produce large amounts of specialized equipment. Allows for the production of unique equipment, as well as mass production of other kinds of gear in conjunction with the relevant Workshop / Facility.' 25000
	),
	(
		'Workshop - Invention',
		'A full electronics shop, micro-foundry, and diverse other exotic tools used for developing unique items. Allows for the creation of blueprints used to craft other gear, and can perform the function of any other Tool Bag.',
		10000
	),
	(
		'Facility - Invention',
		'A full bore science lab, with diverse prototyping and small scale fab equipment - along with chemistry tools, welders, and almost any conceivable other tool required. Allows for the creation of blueprints used to craft other gear, and can perform the function of any other Workshop.',
		50000
	),
	(
		'Workshop - Cloning',
		'A specialized set of tools to force grow cloned limbs and organs. Allows for growing a limb in a few hours, or an organ in a day or so by a character with the Medtech - Cryogenics skill.',
		5000
	),
	(
		'Workshop - Cloned Part Ice Chest',
		'A specialized freezer allowing the long term storage of spare limbs, organs, and other biological tissue. Can store a full set of replacement parts for 2 people, or the critical organs - hearts, livers, kidneys, eyes, etc - of a full dozen.',
		5000
	)
CREATE TABLE
	"pharma_master" (
		"pharma_master_id" SERIAL NOT NULL,
		"name" varchar NOT NULL,
		"description" varchar NOT NULL,
		"price" integer NOT NULL,
		"rank" integer NOT NULL,
		CONSTRAINT "pharma_master_pk" PRIMARY KEY ("pharma_master_id")
	)
WITH
	(OIDS = FALSE);

CREATE TABLE
	"char_pharma_bridge" (
		"char_pharma_bridge_id" SERIAL NOT NULL,
		"char_id" integer NOT NULL,
		"pharma_master_id" integer NOT NULL,
		CONSTRAINT "char_pharma_bridge_pk" PRIMARY KEY ("char_pharma_brige_id")
	)
WITH
	(OIDS = FALSE);

ALTER TABLE "char_pharma_bridge" ADD CONSTRAINT "char_pharma_bridge_fk0" FOREIGN KEY ("char_id") REFERENCES "character" ("id") ON DELETE CASCADE
ALTER TABLE "char_pharma_bridge" ADD CONSTRAINT "char_pharma_bridge_fk1" FOREIGN KEY ("pharma_master_id") REFERENCES "pharma_master" ("pharma_master_id") ON DELETE CASCADE
INSERT INTO
	"pharma_master" ("name", "description", "price", "rank")
VALUES
	(
		'Speedheal',
		'When administered, the subject immediately recovers 1 lethal or 2 stun wounds per success on the administration test. The subject also immediately loses one temporary humanity point. Can be administered to a given subject no more than once per day. Has no effect on aggravated wounds.',
		500,
		1
	),
	(
		'Blue Blood',
		'When administered, the subject immediately recovers all stun wounds. They further recover 2 lethal wounds or 1 aggravated wound per success on the administration test. For each non-stun wound recovered, the subject loses 1 temporary point of humanity.',
		2000,
		3
	),
	(
		'Formula K-3',
		'A secret Arasaka formulation requiring a strange black liquid to produce. When administered, the subject immediately begins regenerating. They recover 1 stun damage per round, 1 lethal damage every 2 rounds, and 1 aggravated damage each hour. The effects last for a number of hours equal to the number of successes on the administration test, and the subject loses 1 temporary humanity for every lethal or aggravated wound healed by Formula K-3.',
		3000,
		4
	),
	(
		'Antibiotic',
		'Administration of potent antibiotics, antivirals, and various other medications allow a subject to recover an additional lethal wound whenever they would recover wounds naturally. Requires 1 dose per day of treatment.',
		500,
		1
	),
	(
		'Regenesis',
		'Use while receiving medical attention allows the subject to recover a number of lethal or aggravated wounds equal to the successes on the administration test in addition to the results of their normal body roll. Requires 1 dose per day of treatment.',
		5000,
		5
	),
	(
		'Rapi-Detox',
		'When adminstered, a subject currently affected by a drug, poison, or other intoxicant is immediately purged of the substance. Aggressively. From both ends.',
		500,
		1
	),
	(
		'Anti-Poison Protocol',
		'When administered, the subject becomes resistant to most poisons for 24 hours. They can ignore a number of wounds caused by a poison equal to the rank of the pharmacist making the Anti-Poison protocol.',
		1000,
		2
	),
	(
		'The Bloodwall',
		'When administered, the subject is immune to any poison not specifically tailored to their DNA. The effects last for 1 day per success on the administration test.',
		5000,
		5
	),
	(
		'Stim',
		'When administered, the subject can ignore all wound penalties for 1 hour. Further, Stun Wounds cannot cause the subject to fall unconscious.',
		500,
		1
	),
	(
		'Study Aide',
		'When administered, the subject cannot fall unconscious for any reason. The effect lasts for a number of hours equal to the 4 times the successes on the administration test.',
		1000,
		2
	),
	(
		'Bone Jelly',
		'Combat Drug. When administered, the subject gains +1 to their Reflexes attribute for a number of hours equal to the successes on the administration test.',
		1000,
		2
	),
	(
		'Coca Rossa',
		'Combat Drug. When adminstered, the subject gains +1 to their Strength attribute for a number of hours equal to the successes on the administration test.',
		1000,
		2
	),
	(
		'Elder Bark',
		'Combat Drug. When administered, the subject gains +1 to their Body and Cool attributes for a number of hours equal to the successes on the administration test.',
		1000,
		2
	),
	(
		'Turbo Dog Brown Ale',
		'Combat Drug. When administered, the subject gains +1 to their Strength and Body attributes for a number of hours equal to the successes on the administration test.',
		2000,
		3
	),
	(
		'Moloko Plus',
		'Combat Drug. When administered, the subject gains +2 to their Strength and +1 to Body and Reflexes attributes, as well as the effects of activating a Kerenzikov cyberware (does not stack with Kerenzikov / Other speedware). Subjects also hallucinate rather heavily (comparable to mescaline in potency), and show a marked preference for sex, violence, and certain kinds of classical music.',
		5000,
		5
	),
	(
		'Surge',
		'When administered, the subject can function without sleep for approximately 24 hours.',
		500,
		1
	),
	(
		'Dexedrine Speedball',
		'When administered, the subject can function without sleep for 24 hours per success on the administration roll. They lose 1 temporary humanity for each 24 hours they remain awake past the first. Includes a secondary come down injection that removes the effect.',
		1000,
		2
	),
	(
		'PGGB',
		'When administered, the subject gains +2 to their Intelligence attribute and cannot be rendered unconscious by stun or lethal damage for a number of hours equal to the successes on the administration test. They also believe they can understand any language and see a short way into the future, but they are mistaken. It is reportedly like having your brains smashed out by a slice of lemon wrapped in a gold brick.',
		3000,
		4
	),
	(
		'Tetrafodinal',
		'When administered, the subject cannot be rendered unconscious or fall asleep for a full week. They also do not suffer wound penalties during this interval. If heavily injured, they must make death saves per normal, and succeed at a Willpower test to remain still for more than 30 seconds. The subject immediately loses 10 points of temporary humanity minus the number of successes on the adminstration roll.',
		5000,
		5
	),
	(
		'Truth Serum',
		'When administered, the subject must make a willpower test (DV7) and score more successes than the administrator of the serum to speak untruthfully.',
		2000,
		3
	),
	(
		'Hallucinogen',
		'A powerful psychoactive agent, sourced from any number of origins. The subject will be tripping (+1 DV on most tests, GM discretion) for 4 hours per success on the administration test. In controlled environments, the subject can regain 1 lost point of temporary humanity during the process.',
		2000,
		3
	),
	(
		'Green Mescaline',
		'An unbelievably powerful Hallucinogenic drug. The subject will be tripping heavily (+1-3 DV on most tests, GM discretion) for 1 day per success on the administration test. In a controlled environment, they will also recover one lost point of temporary humanity each day.',
		3000,
		4
	),
	(
		'The Ultra Mk. III',
		'Unclear in origin, this substance takes root in the brain does not let go. The subject of the drug will be tripping heavily (+1-3 DV on most tests, GM discretion) until it wears off. This can be done by giving the subject a complete blood transfusion, several doses of Bloodwall, or similarly drastic interventions. It may also wear off in time, though no occurrence of it ending naturally has been recorded.',
		5000,
		5
	),
	(
		'Poison - Rank 1' 'A somewhat dangerous poison. Melee weapons slathered in the substance deal 1 additional lethal wound on any attack that deals damage. If injected or ingested, subject suffers 8 Stun Damage.',
		500,
		1
	),
	(
		'Poison - Rank 2',
		'A dangerous poison. Melee weapons slathered in the substance deal 1 additional lethal wound on any attack that deals damage. If injected or ingested, subject suffers 10 Stun Damage.',
		1000,
		2
	),
	(
		'Poison - Rank 3',
		'A very dangerous poison. Melee weapons slathered in the substance deal 2 additional lethal wounds on any attack that deals damage. If injected or ingested, subject suffers 12 Stun Damage.',
		2000,
		3
	),
	(
		'Poison - Rank 4',
		'A lethal poison. Melee weapons slathered in the substance deal 2 additional lethal wounds on any attack that deals damage. If injected or ingested, subject suffers 14 Stun Damage.',
		3000,
		4
	),
	(
		'Poison - Rank 5',
		'An extremely lethal poison. Melee weapons slathered in the substance deal 3 additional lethal wounds on any attack that deals damage. If injected or ingested, subject suffers 16 Stun Damage.',
		5000,
		5
	),
	(
		'Biotoxin - Rank 3',
		'A dangerous and virulent toxin. Melee weapons slathered in the substance deal 1 additional aggravated wound on any attack that deals damage. If injected or ingested, subject suffers 6 lethal damage.',
		2000,
		3
	),
	(
		'Biotoxin - Rank 4',
		'A dangerous and virulent toxin. Melee weapons slathered in the substance deal 2 additional aggravated wounds on any attack that deals damage. If injected or ingested, subject suffers 8 lethal damage.',
		3000,
		4
	),
	(
		'Biotoxin - Rank 5',
		'A dangerous and virulent toxin. Melee weapons slathered in the substance deal 3 additional aggravated wounds on any attack that deals damage. If injected or ingested, subject suffers 12 lethal damage.',
		5000,
		5
	),
	(
		'Custom Biotoxin',
		'A highly dangerous mixture tailored to a specific individuals DNA. Melee weapons slathered in the substance deal 5 additional aggravated wounds on any attack that deals damage. If injected or ingested, subject suffers 15 lethal wounds. Making this requires first obtaining a sample of the would-be victims DNA.',
		5000,
		5
	)
CREATE TABLE
	char_notes (
		char_note_id SERIAL NOT NULL,
		char_id int NOT NULL,
		title varchar(400),
		body text,
		favorite bool NOT NULL DEFAULT false,
		CONSTRAINT char_note_pk PRIMARY KEY (char_note_id)
	)
WITH
	(OIDS = FALSE);

ALTER TABLE char_notes ADD CONSTRAINT char_notes_pk0 FOREIGN KEY (char_id) REFERENCES character(id);

CREATE TABLE
	char_contacts (
		char_contact_id SERIAL NOT NULL,
		char_id int NOT NULL,
		name varchar(400),
		loyalty int,
		connection int,
		description text,
		CONSTRAINT char_contact_pk PRIMARY KEY (char_contact_id)
	)
WITH
	(OIDS = FALSE);

ALTER TABLE char_contacts ADD CONSTRAINT char_contacts_pk0 FOREIGN KEY (char_id) REFERENCES character(id);

CREATE TABLE
	contact_master (
		contact_master_id SERIAL NOT NULL,
		campaign_id int NOT NULL,
		name varchar(400),
		connection int NOT NULL DEFAULT 0,
		description text,
		CONSTRAINT contact_master_pk PRIMARY KEY (contact_master_id)
	)
WITH
	(OIDS = FALSE);

-- links contacts to relevant campaign.
ALTER TABLE contact_master ADD CONSTRAINT contact_master_pk0 FOREIGN KEY (campaign_id) REFERENCES campaigns (campaign_id);

CREATE TABLE
	char_contact_bridge (
		char_contact_id SERIAL NOT NULL,
		char_id int NOT NULL,
		contact_id int NOT NULL,
		loyalty int NOT NULL DEFAULT 0,
		notes text NOT NULL DEFAULT 'My Notes here.',
		CONSTRAINT char_contact_bridge_pk PRIMARY KEY (char_contact_id)
	)
WITH
	(OIDS = FALSE);

-- connect bridge to chars, when char is deleted relevent bridge entries also go away.
ALTER TABLE char_contact_bridge ADD CONSTRAINT char_id_pk0 FOREIGN KEY (char_id) REFERENCES character(id) ON DELETE CASCADE;

-- connect bridge to master contacts; when master contact is deleted relevent bridge entries are also deleted.
ALTER TABLE char_contact_bridge ADD CONSTRAINT contact_id_pk1 FOREIGN KEY (contact_id) REFERENCES contact_master (contact_master_id) ON DELETE CASCADE;

-- For inclusion into misc gear treasure table. ('Shuriken Battleglove', 'A large glove with built in power packs connected to a reversible-polarity electromagnet. Cannot be used with cyberweapons or equipment built into the same arm as it is worn on.')
-- for treasure-cyberware - mantis blades, glowing mantis blades, emp mantis blades, poisoned mantis blades.
CREATE TABLE
	clothing_master (
		clothing_master_id SERIAL NOT NULL,
		name varchar(80) NOT NULL,
		description text NOT NULL,
		quality int NOT NULL DEFAULT 0,
		CONSTRAINT clothing_master_pk PRIMARY KEY (clothing_master_id)
	)
WITH
	(OIDS = FALSE);

INSERT INTO
	"public"."clothing_master" ("name", "description", "quality")
VALUES
	(
		'Vendomat Skinnies',
		'Very cheap clothing similar to scrubs, available from Vendomats across the city.',
		0
	),
	(
		'Bag Lady Chic',
		'Clothing that can might have come from any pawn shop or lost and found, layered with some tasteful dirt.',
		0
	),
	(
		'Leisurewear',
		'Athletic fit clothing that eschews zippers and buttons in favor of string and spandex.',
		1
	),
	(
		'Generic Chic',
		'Generic, comfortable clothing available everywhere from better Vendomats and shops.',
		1
	),
	(
		'Bohemian',
		'Folksy, retro style clothing that shows off your free spirit and willingness to spend time in thrift stores.',
		1
	),
	(
		'Ganger Brights',
		'Brightly colored clothes chosen to signify ones allegiance to a street gang.',
		1
	),
	(
		'Nomad Leathers',
		'Rugged, neo-tribal clothing made to last.',
		2
	),
	(
		'Urban Flash',
		'High tech clothes that show off your taste and give a sense of presence.',
		2
	),
	(
		'Businesswear',
		'Suits still have a place, and hey - they always look good.',
		2
	),
	(
		'Asia Pop',
		'Sharp and cutting edge, this outfit says you are down with the youth culture. Mixes ancient influences with modern aesthetics.',
		2
	),
	(
		'High Fashion',
		'Not a style on its own, but one of the other styles custom tailored and made from the finest materials.',
		2
	);

CREATE TABLE
	char_clothing_bridge (
		clothing_bridge_id SERIAL NOT NULL,
		char_id int NOT NULL,
		clothing_id int NOT NULL,
		rank int NOT NULL DEFAULT 1,
		equipped boolean NOT NULL DEFAULT false,
		CONSTRAINT clothing_bridge_pk PRIMARY KEY (clothing_bridge_id)
	)
WITH
	(OIDS = FALSE);

ALTER TABLE char_clothing_bridge ADD CONSTRAINT char_id_pk0 FOREIGN KEY (char_id) REFERENCES character(id) ON DELETE CASCADE;

ALTER TABLE char_clothing_bridge ADD CONSTRAINT clothing_id_pk1 FOREIGN KEY (clothing_id) REFERENCES clothing_master (clothing_master_id) ON DELETE CASCADE;

CREATE TABLE
	"lifestyle_master" (
		"lifestyle_master_id" serial NOT NULL,
		"quality" integer NOT NULL DEFAULT 1,
		"name" varchar NOT NULL,
		"housing" text NOT NULL,
		"storage" text NOT NULL,
		"ameneties" text NOT NULL,
		"food" text NOT NULL,
		"parking" text NOT NULL,
		CONSTRAINT "lifestyle_master_pk" PRIMARY KEY ("lifestyle_master_id")
	)
WITH
	(OIDS = FALSE);

CREATE TABLE
	"char_lifestyle_bridge" (
		"lifestyle_bridge_id" serial NOT NULL,
		"char_id" integer NOT NULL,
		"housing_rank" integer NOT NULL DEFAULT 1,
		"storage_rank" integer NOT NULL DEFAULT 1,
		"ameneties_rank" integer NOT NULL DEFAULT 1,
		"food_rank" integer NOT NULL DEFAULT 1,
		"parking_rank" integer NOT NULL DEFAULT 1,
		"months_owned" integer NOT NULL,
		CONSTRAINT "char_lifestyle_bridge_pk" PRIMARY KEY ("lifestyle_bridge_id")
	)
WITH
	(OIDS = FALSE);

ALTER TABLE "char_lifestyle_bridge" ADD CONSTRAINT "char_lifestyle_bridge_fk0" FOREIGN KEY ("char_id") REFERENCES "character" ("id") ON DELETE CASCADE;

INSERT INTO
	"lifestyle_master" (
		"quality",
		"name",
		"housing",
		"storage",
		"ameneties",
		"food",
		"parking",
		"monthly_price"
	)
VALUES
	(
		1,
		'Street Livin',
		'You live on the street.',
		'You are entirely self reliant regarding your gear. You cannot keep more than you can carry on your person.',
		'You can get the occasional Personal CarePak to clean up, but otherwise you are on your own.',
		'Food is whatever you can find in the dumpster today.',
		'You park on the street, but are in constant danger of it being ripped off, towed, or messed with.'
	),
	(
		2,
		'Low Life',
		'You live in a bedsit or illegally converted storage container, and envy the spacious accommodations given to felons.',
		'You can store about a duffel bags worth of stuff securely, provided you make sure everyone you live near thinks you are as poor as they are.',
		'You have a common area with filthy toilets, sporadically available running water and electricity, and you generally stash some batteries and bottles of water in your space for redundancy. Problems with your living area are distinctly your problem.',
		'You live off food you would not give to a dog you disliked. You can go out to a street food vendor or a braindance parlor once a week.',
		'You park on the street, and your vehicle is only as secure as you can make it. You at least have access to a private lot or an arrangement to use an alley.'
	),
	(
		3,
		'Scraping By',
		'You live in a legally converted shipping container, or a modified hotel, with about 2x6 meters of living space.',
		'You have a small amount of private storage space that is relatively secure - it is not hard to break into your living area, but your neighbors are not so desperate they will try.',
		'You have access to a relatively well maintained common kitchen and bathroom, with short if relatively secure intervals where you can get water and electricity, but you have to keep the local gangers paid off or risk their ire to use them. Problems with your living area are your problem, but they are relatively infrequent.',
		'You usually eat kibble, instant noodles, and the like, but at least have access to a variety of flavors and a small supply of condiments. You visit street vendors relatively often as well to liven up your diet.',
		'You have access to a surface parking lot. It has decent lighting and security cameras, which will deter the most casual of thieves.'
	),
	(
		4,
		'Dire Straits',
		'You live in a furnished micro-condo, or a small trailer outside of town. You have roughly 48 meters squared of living space.',
		'You have a closet sized storage area which is well locked and alarmed.',
		'You have reliable-ish utilities, as well as a microsopic or barely functional kitchen and access to some sort of gym facilities. If there is a problem, you can fix it yourself or get on a months long waitlist.',
		'Your meals are instant and well supplemented with kibble, but you also can get takeout or visit a street vendor a few times a week without bringing on a financial crisis.',
		'You have access to a shared garagae with decent security - not a place to keep a nice car, but at least the odds are in your favor if you drive a piece of crap. Alternately, simple isolation provides some security for your vehicle(s).'
	),
	(
		5,
		'Distinctly Mid',
		'You live in a small house on the outskirts of town, or a Super Efficiency apartment or condo.',
		'You have a small second bedroom or the like which can be used for storage, and your whole place is relatively secure. In addition to on site security, your neighborhood is actually patrolled by police occasionally and local gangs are savvy enough not to shit where they eat.',
		'You have reliable utilities several hours a day, and some kind of backup in the form of solar or bottled water. You enjoy a private bathroom with rationed showers, and a terrible kitchen or small limited food preparation area. You actually have a landlord you have met, and can get your problems fixed in a month or two. There is an on-site gym of of some kind you have ready access to.',
		'You generally eat pre-pak food or takeout, and have access to a decent variety of flavor and enough to eat that you are not hungry all the time.',
		'You have a small private garage, suitable for 1 vehicle, whose locks are of decent quality. If in a shared structure, the security is sufficient to deter any but the most determined gangers from messing with your stuff.'
	),
	(
		6,
		'Doing alright',
		'You have a decent sized house on the edge of a combat zone, or a mid-sized efficiency apartment. In all, you have roughly 150 square meters of space.',
		'You have a good sized room or two and a backup closet that can be secured with high end electronic and physical locks.',
		'You have reliable, if still rationed, utilities, as well as a small kitchen, bathroom, and access to a decent gym with volunteer-led classes and maintained equipment. Your landlord can fix most problems within a few weeks.',
		'You eat out regularly, sometimes at actual sit down restaurants, and enjoy real fruit or vegetables on top of your instant meals once or twice a month.',
		'You have access to two spots in a well secured garage - either paying off local gangers if in a house, or enjoying low level corporate security in a shared garage environment.'
	),
	(
		7,
		'Corporate Lite',
		'You live in a corporate apartment, large co-op, or a modest house in a nice part of town, with about 400 square meters of space to do with as you please.',
		'Your entire space is relatively secure, and your storage is limited only by what level of space you are willing to dedicate to it.',
		'You have a nice bathroom, an actual kitchen, and access to a good gym with a pool. Utilities are largely unrestricted, but you do get the occasional brownout. Several bars or restaurants are in your building or nearby. Any issues with your space are dealt with inside of a week.',
		'You enjoy high quality pre-pak food, and have to fresh food every week or so, as well as some vat-grown actual meats.',
		'You have a couple secure parking spots, with high end security of one flavor or another. You have access to an aircar hangar, but no permanent storage - just pick up and drop off priveleges.'
	),
	(
		8,
		'Upper Middle Class',
		'You have either a luxury corporate apartment, or a good sized house - either way, some 1000 square meters of space.',
		'In addition to your living space being highly secure, you have a closet sized vault to store really valuable items. You also have access to a safe deposit box in a reputable bank.',
		'You have several bathrooms, a large kitchen, and access to a top flight gym with profesionally led classes, shared secure conference rooms, and an onsite concierge to handle most minor issues immediately. Any major problems will be attended to within a day or two.',
		'You eat fresh food several times a week, supplemented with prepak or takeout as you like, and can dine out at restaurants more or less at will. Once a month, you can enjoy a truly world class meal or evening of decadent entertainment.',
		'You have a private, highly secure garage for up to four vehicles, as well as access to an equally well protected aircar hangar for a single vessel.'
	),
	(
		9,
		'Executive Living',
		'You have a penthouse apartment, with a private rooftop garden, aircar pad, private elevator access, and luxurious surroundings. Some 2400 square meters of space.',
		'In addition to your residence, you have a room sized vault that requires a professional team to even consider breaking into. In addition, you have one or more off site places you can stash things - equally protected and private.',
		'You live a life of luxury, with access to just about any convenience you deem necessary. Any issues with your living space are attended immediately by a crack team of specialists.',
		'Your dining habits are epicurean, and in addition to the fresh food your private chef prepares you can enjoy a world class restaurant meal at least once a week.',
		'You have a highly secure private garage, capable of holding an entire collection of high end cars, as well as access to a shared AV hangar with room for several vehicles.'
	),
	(
		10,
		'Truly Wealthy',
		'You have a multi-level penthouse, suburban mansion, or a small compound - in any case, you have a 5000+ square meter living area.',
		'You have multiple secure vaults, as well as access to off-site storage facilities that cater to a variety of security conscious consumers.',
		'Your lifestyle is the stuff of sybaritic legend, with staff to attend to just about any need you might dream up.',
		'You eat only the finest foods, generally at world class restaurants or prepared by your personal chef.',
		'You have multiple secure garages, aircraft hangars, and if in a penthouse, priority access to a zeppelin mooring post.'
	)