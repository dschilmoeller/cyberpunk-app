CREATE TABLE "user" (
	"id" SERIAL PRIMARY KEY,
	"username" VARCHAR (80) UNIQUE NOT NULL,
	"password" VARCHAR (1000) NOT NULL,
	"user_type" INT NOT NULL
);
-- remove max_armor, max_health
CREATE TABLE "character" (
	"id" serial NOT NULL,
	"user_id" integer NOT NULL,
	"handle" varchar NOT NULL,
	"player" varchar NOT NULL,
	"role" varchar NOT NULL,
	"culture" varchar NOT NULL,
	"campaign" varchar NOT NULL,
	"is_paramedical" bool NOT NULL DEFAULT false,
	"strength" integer NOT NULL DEFAULT '1',
	"cyber_strength" integer NOT NULL DEFAULT '0',
	"body" integer NOT NULL DEFAULT '1',
	"cyber_body" integer NOT NULL DEFAULT '0',
	"reflexes" integer NOT NULL DEFAULT '1',
	"cyber_reflexes" integer NOT NULL DEFAULT '0',
	"move" integer NOT NULL DEFAULT '1',
	"cyber_move" integer NOT NULL DEFAULT '0',
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
	"maker_field" integer NOT NULL DEFAULT '0',
	"maker_upgrade" integer NOT NULL DEFAULT '0',
	"maker_fab" integer NOT NULL DEFAULT '0',
	"maker_invent" integer NOT NULL DEFAULT '0',
	"rockerboy" integer NOT NULL DEFAULT '0',
	"solo" integer NOT NULL DEFAULT '0',
	"netrunner" integer NOT NULL DEFAULT '0',
	"nomad" integer NOT NULL DEFAULT '0',
	"media" integer NOT NULL DEFAULT '0',
	"medtech" integer NOT NULL DEFAULT '0',
	"maker" integer NOT NULL DEFAULT '0',
	"perm_humanity_loss" integer NOT NULL DEFAULT '40',
	"temp_humanity_loss" integer NOT NULL DEFAULT '0',
	"max_luck" integer NOT NULL DEFAULT '4',
	"max_xp" integer NOT NULL DEFAULT '0',
	"spent_xp" integer NOT NULL DEFAULT '0',
	"bank" integer NOT NULL DEFAULT '0',
	CONSTRAINT "char_pk" PRIMARY KEY ("id")
) WITH (OIDS = FALSE);
-- added current armor/shield/cyber armor, cyber health boxes
CREATE TABLE "char_status" (
	"char_status_id" serial NOT NULL,
	"char_id" integer NOT NULL,
	"current_stun" integer NOT NULL,
	"current_lethal" integer NOT NULL,
	"current_agg" integer NOT NULL,
	"current_armor_loss" integer NOT NULL,
	"current_luck_loss" integer NOT NULL,
	"current_armor_quality" integer NOT NULL DEFAULT 0,
	"current_shield_quality" integer NOT NULL DEFAULT 0,
	"current_cyberware_armor_quality" integer NOT NULL DEFAULT 0,
	"current_cyberware_health_boxes" integer NOT NULL DEFAULT 0,
	CONSTRAINT "char_status_pk" PRIMARY KEY ("char_status_id")
) WITH (OIDS = FALSE);
CREATE TABLE "weapon_master" (
	"weapon_master_id" serial NOT NULL,
	"name" varchar NOT NULL,
	"damage" integer NOT NULL,
	"dmg_type" varchar NOT NULL,
	"range" integer NOT NULL,
	"rof" integer NOT NULL,
	"max_clip" integer NOT NULL,
	"hands" integer NOT NULL,
	"concealable" bool NOT NULL,
	"price" integer NOT NULL DEFAULT '0',
	CONSTRAINT "weapons_master_pk" PRIMARY KEY ("weapon_master_id")
) WITH (OIDS = FALSE);
CREATE TABLE "char_weapons_bridge" (
	"weapon_bridge_id" serial NOT NULL,
	"char_id" integer NOT NULL,
	"weapon_id" integer NOT NULL,
	"weapon_mod_1" integer NOT NULL,
	"weapon_mod_2" integer NOT NULL,
	"current_shots_fired" integer NOT NULL,
	"equipped" bool NOT NULL DEFAULT false,
	CONSTRAINT "char_weapons_bridge_pk" PRIMARY KEY ("weapon_bridge_id")
) WITH (OIDS = FALSE);
CREATE TABLE "armor_master" (
	"armor_master_id" serial NOT NULL,
	"name" varchar NOT NULL DEFAULT 'name',
	"description" varchar NOT NULL DEFAULT 'desc',
	"quality" integer NOT NULL DEFAULT '0',
	"price" integer NOT NULL DEFAULT '0',
	CONSTRAINT "armor_master_pk" PRIMARY KEY ("armor_master_id")
) WITH (OIDS = FALSE);
CREATE TABLE "shield_master" (
	"shield_master_id" serial NOT NULL,
	"name" varchar NOT NULL DEFAULT 'name',
	"description" varchar NOT NULL DEFAULT 'desc',
	"quality" integer NOT NULL DEFAULT '0',
	"price" integer NOT NULL DEFAULT '0',
	CONSTRAINT "shield_master_pk" PRIMARY KEY ("shield_master_id")
) WITH (OIDS = FALSE);
CREATE TABLE "char_armor_bridge" (
	"armor_bridge_id" serial NOT NULL,
	"char_id" integer NOT NULL,
	"armor_id" integer NOT NULL,
	"armor_mod_1" integer NOT NULL,
	"armor_mod_2" integer NOT NULL,
	"equipped" boolean NOT NULL DEFAULT false,
	CONSTRAINT "char_armor_bridge_pk" PRIMARY KEY ("armor_bridge_id")
) WITH (OIDS = FALSE);
CREATE TABLE "char_shield_bridge" (
	"shield_bridge_id" serial NOT NULL,
	"char_id" integer NOT NULL,
	"shield_id" integer NOT NULL,
	"armor_mod_1" integer NOT NULL default '1',
	"equipped" boolean NOT NULL DEFAULT false,
	CONSTRAINT "char_shield_bridge_pk" PRIMARY KEY ("shield_bridge_id")
) WITH (OIDS = FALSE);
ALTER TABLE "char_shield_bridge"
ADD CONSTRAINT "char_shield_bridge_fk0" FOREIGN KEY ("char_id") REFERENCES "character"("id");
ALTER TABLE "char_shield_bridge"
ADD CONSTRAINT "char_shield_bridge_fk1" FOREIGN KEY ("shield_id") REFERENCES "shield_master"("shield_master_id");
ALTER TABLE "char_shield_bridge"
ADD CONSTRAINT "char_shield_bridge_fk2" FOREIGN KEY ("armor_mod_1") REFERENCES "armor_mod_master"("armor_mod_master");
CREATE TABLE "armor_mod_master" (
	"armor_mod_master_id" serial NOT NULL,
	CONSTRAINT "armor_mod_master_pk" PRIMARY KEY ("armor_mod_master_id")
) WITH (OIDS = FALSE);
CREATE TABLE "weapon_mod1_master" (
	"weapon_mod1_master_id" serial NOT NULL,
	"mod_1_name" varchar NOT NULL,
	CONSTRAINT "weapon_mod1_master_pk" PRIMARY KEY ("weapon_mod1_master_id")
) WITH (OIDS = FALSE);
CREATE TABLE "weapon_mod2_master" (
	"weapon_mod2_master_id" serial NOT NULL,
	"mod_2_name" varchar NOT NULL,
	CONSTRAINT "weapon_mod2_master_pk" PRIMARY KEY ("weapon_mod2_master_id")
) WITH (OIDS = FALSE);
CREATE TABLE "cyberware_master" (
	"cyberware_master_id" serial NOT NULL,
	"name" varchar NOT NULL,
	"type" varchar NOT NULL DEFAULT 'fashionware',
	"install_level" varchar NOT NULL DEFAULT 'Mall',
	"description" varchar NOT NULL DEFAULT '0',
	"price" integer NOT NULL DEFAULT '100',
	"humanity_loss_min" integer NOT NULL DEFAULT '1',
	"humanity_loss_max" integer NOT NULL DEFAULT '1',
	CONSTRAINT "cyberware_master_pk" PRIMARY KEY ("cyberware_master_id")
) WITH (OIDS = FALSE);
CREATE TABLE "char_cyberware_bridge" (
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
) WITH (OIDS = FALSE);

CREATE TABLE "misc_gear_master" (
	"misc_gear_master_id" serial NOT NULL,
	"name" varchar NOT NULL,
	"description" varchar NOT NULL,
	"price" integer NOT NULL DEFAULT '0' CONSTRAINT "misc_gear_master_pk" PRIMARY KEY ("misc_gear_master_id")
) WITH (OIDS = FALSE);
CREATE TABLE "char_gear_bridge" (
	"char_gear_bridge_id" serial NOT NULL,
	"char_id" integer NOT NULL,
	"misc_gear_id" integer NOT NULL,
	CONSTRAINT "char_gear_bridge_pk" PRIMARY KEY ("char_gear_bridge_id")
) wiTH (OIDS = FALSE);


CREATE TABLE "char_owned_cyberware" (
	"owned_cyberware_id" serial NOT NULL,
	"char_id" integer NOT NULL,
	"cyberware_master_id" integer NOT NULL,
	"equipped" bool NOT NULL default false
) WITH (OIDS = FALSE);
ALTER TABLE "char_owned_cyberware"
ADD CONSTRAINT "char_owned_cyberware_fk0" FOREIGN KEY ("char_id") REFERENCES "character"("id");
ALTER TABLE "char_owned_cyberware"
ADD CONSTRAINT "char_owned_cyberware_fk1" FOREIGN KEY ("cyberware_id") REFERENCES "cyberware_master"("cyberware_master_id");
ALTER TABLE "misc_gear_master"
ADD COLUMN "price" integer NOT NULL DEFAULT '0';
ALTER TABLE "char_gear_bridge"
ADD CONSTRAINT "char_gear_bridge_fk0" FOREIGN KEY ("char_id") REFERENCES "character"("id");
ALTER TABLE "char_gear_bridge"
ADD CONSTRAINT "char_gear_bridge_fk1" FOREIGN KEY ("misc_gear_id") REFERENCES "misc_gear_master"("misc_gear_master_id");
ALTER TABLE "character"
ADD CONSTRAINT "char_fk0" FOREIGN KEY ("user_id") REFERENCES "user"("id");
ALTER TABLE "char_weapons_bridge"
ADD CONSTRAINT "char_weapons_bridge_fk0" FOREIGN KEY ("char_id") REFERENCES "character"("id");
ALTER TABLE "char_weapons_bridge"
ADD CONSTRAINT "char_weapons_bridge_fk1" FOREIGN KEY ("weapon_id") REFERENCES "weapon_master"("weapon_master_id");
ALTER TABLE "char_weapons_bridge"
ADD CONSTRAINT "char_weapons_bridge_fk2" FOREIGN KEY ("weapon_mod_1") REFERENCES "weapon_mod1_master"("weapon_mod1_master_id");
ALTER TABLE "char_weapons_bridge"
ADD CONSTRAINT "char_weapons_bridge_fk3" FOREIGN KEY ("weapon_mod_2") REFERENCES "weapon_mod2_master"("weapon_mod2_master_id");
ALTER TABLE "char_armor_bridge"
ADD CONSTRAINT "char_armor_bridge_fk0" FOREIGN KEY ("char_id") REFERENCES "character"("id");
ALTER TABLE "char_armor_bridge"
ADD CONSTRAINT "char_armor_bridge_fk1" FOREIGN KEY ("armor_id") REFERENCES "armor_master"("armor_master_id");
ALTER TABLE "char_armor_bridge"
ADD CONSTRAINT "char_armor_bridge_fk2" FOREIGN KEY ("armor_mod_1") REFERENCES "armor_mod_master"("armor_mod_master_id");
ALTER TABLE "char_armor_bridge"
ADD CONSTRAINT "char_armor_bridge_fk3" FOREIGN KEY ("armor_mod_2") REFERENCES "armor_mod_master"("armor_mod_master_id");
ALTER TABLE "char_status"
ADD CONSTRAINT "char_status_fk0" FOREIGN KEY ("char_id") REFERENCES "character"("id");
ALTER TABLE "char_cyberware_bridge"
ADD CONSTRAINT "char_cyberware_bridge_fk0" FOREIGN KEY ("char_id") REFERENCES "character"("id");




SELECT *
FROM "char_weapons_bridge"
	JOIN "weapons_master" ON "weapons_master".weapon_id = "char_weapons_bridge".weapon_id
	JOIN "weapon_mod1_master" ON "weapon_mod1_master".weapon_mod1_id = "char_weapons_bridge".weapon_mod_1
	JOIN "weapon_mod2_master" ON "weapon_mod2_master".weapon_mod2_id = "char_weapons_bridge".weapon_mod_2
WHERE char_id = 1
ORDER BY id ASC
select *
from "weapon_master";

INSERT INTO "cyberware_master"("cyberware_master_id","name","price","description","humanity_loss_min","humanity_loss_max","install_level","type")
VALUES
INSERT INTO "cyberware_master"("name","price","description","humanity_loss_min","humanity_loss_max","install_level","type")
VALUES
('Biomonitor',100,'Implant that reads vital signs.',0,0,'Mall','fashionware'),
('Chemskin',100,'Custom skin biosculpting that can alter the appearance of ones skin to almost any conceivable combination of color, inked tattoos, designs, and the like.',0,0,'Mall','fashionware'),
('EMP Threading',10,'Metallic lines that run across the body. Highly fashionable combinations are always coming and going.',0,0,'Mall','fashionware'),
('Light Tattoo',100,'Subdermal patches that can produce colorful, backlit tattoos. Gives +1 Appearance when awesome enough.',0,0,'Mall','fashionware'),
('Corneal Implant',100,'Color changing lenses implanted in the eyes, allowing for nearly any color/style combination',0,0,'Mall','fashionware'),
('Skinwatch',100,'Subdermal LED watch',0,0,'Mall','fashionware'),
('Techhair',100,'Color changing, light emitting, artificial hair. Grants +1 Cool.',0,0,'Mall','fashionware'),
('Basic Neural Link',500,'Artifical Nervous System that allows for the use of different pieces of chipware.  The basic version has 5 sockets. Inclues interfacing plugs to connect to most machines.',2,8,'Hospital','neuralware'),
('Braindance Recorder',500,'System to record all of a users experience to memory chips.',0,0,'Chip','neuralware'),
('Kerenzikov',500,'Speedware that artifically boosts a users experiential sense of time. Increases Move by 1 and adds 1 die to most combat rolls for one scene when activated. Deals the user 3 stun damage when the effect wears off.',0,0,'Chip','neuralware'),
('Sandevistan',2000,'Speedware that artifically boosts a users experiential sense of time. Increases Move by 2 and adds 2 die to most combat rolls for one scene when activated. Deals the user 6 stun damage when the effect wears off.',0,0,'Chip','neuralware'),
('Miilitech "Kali"',25000,'Speedware that artifically boosts a users experiential sense of time. Increases Move by 3 and adds 3 die to most combat rolls for one scene when activated. Deals the user 6 lethal damage when the effect wears off.',0,0,'Chip','neuralware'),
('Memory chip',10,'Memory storage chip. Approximate capacity of 2 Exabytes, or 2 Billion Gigabytes for you old timers.',0,0,'Chip','neuralware'),
('Olfactory Boost',100,'Chip that assists in decoding scents and boosts a users sense of smell to dog-like levels. Allows tracking via scent, amongst other tricks.',0,0,'Chip','neuralware'),
('Pain Editor',5000,'Chip that overrides the users ability to feel pain. Dramatically reduces wound-based die penalties.',0,0,'Chip','neuralware'),
('Skill Chip - Athletics',500,'Chip that overrides a users muscle memory, gives access to internal databanks, and otherwise gives a user skills they might not otherwise have access to.',0,0,'Chip','neuralware'),
('Skill Chip - Brawling',500,'Chip that overrides a users muscle memory, gives access to internal databanks, and otherwise gives a user skills they might not otherwise have access to.',0,0,'Chip','neuralware'),
('Skill Chip - Evasion',500,'Chip that overrides a users muscle memory, gives access to internal databanks, and otherwise gives a user skills they might not otherwise have access to.',0,0,'Chip','neuralware'),
('Skill Chip - Fast Talk',500,'Chip that overrides a users muscle memory, gives access to internal databanks, and otherwise gives a user skills they might not otherwise have access to.',0,0,'Chip','neuralware'),
('Skill Chip - Firearms',500,'Chip that overrides a users muscle memory, gives access to internal databanks, and otherwise gives a user skills they might not otherwise have access to.',0,0,'Chip','neuralware'),
('Skill Chip - Melee Weapons',500,'Chip that overrides a users muscle memory, gives access to internal databanks, and otherwise gives a user skills they might not otherwise have access to.',0,0,'Chip','neuralware'),
('Skill Chip - Drive Land',500,'Chip that overrides a users muscle memory, gives access to internal databanks, and otherwise gives a user skills they might not otherwise have access to.',0,0,'Chip','neuralware'),
('Skill Chip - Performance',500,'Chip that overrides a users muscle memory, gives access to internal databanks, and otherwise gives a user skills they might not otherwise have access to.',0,0,'Chip','neuralware'),
('Skill Chip - Stealth',500,'Chip that overrides a users muscle memory, gives access to internal databanks, and otherwise gives a user skills they might not otherwise have access to.',0,0,'Chip','neuralware'),
('Skill Chip - Cryptography',500,'Chip that overrides a users muscle memory, gives access to internal databanks, and otherwise gives a user skills they might not otherwise have access to.',0,0,'Chip','neuralware'),
('Skill Chip - First Aid',500,'Chip that overrides a users muscle memory, gives access to internal databanks, and otherwise gives a user skills they might not otherwise have access to.',0,0,'Chip','neuralware'),
('Skill Chip - Gambling',500,'Chip that overrides a users muscle memory, gives access to internal databanks, and otherwise gives a user skills they might not otherwise have access to.',0,0,'Chip','neuralware'),
('Skill Chip - Language',500,'Chip that overrides a users muscle memory, gives access to internal databanks, and otherwise gives a user skills they might not otherwise have access to.',0,0,'Chip','neuralware'),
('Tactile Booster',100,'Chip that increases a users sense of touch to the point where they can detect cats and larger sized animals from 20 meters away by placing their hand on a solid surface.',0,0,'Chip','neuralware'),
('Algernonic Subprocessors I',1000,'A general purpose intelligence booster chip. Gives instant access to all knowledge of an 8th grader.',0,0,'Chip','neuralware'),
('Algernonic Subprocessors II',5000,'A general purpose intelligence booster chip. Makes the user seem pretty bright.',0,0,'Chip','neuralware'),
('Algernonic Subprocessors III',25000,'A highly advanced intelligence booster chip. Contains a Small helper AI to assist with cognitive loads.',0,0,'Chip','neuralware'),
('Algernonic Subprocessors IV',75000,'An extremely advanced intelligence booster chip. Can make an average dullard into a Weapons Grade Savant.',0,0,'Chip','neuralware'),
('Algernonic Subprocessors V',1000000,'If this existed it would definitely be used to cheat at Jeapordy.',0,0,'Chip','neuralware'),
('Basic Cybereyes',100,'A set of Artificial eyes with 3 option slots. Includes the ability to change colors and patterns, a HUD, simple video recordings, and viewing Augmented Reality',1,4,'Clinic','cyberoptics'),
('Anti-Dazzle System',100,'Makes the user immune to the effects of flashes and strobes.',0,0,'Mall','cyberoptics'),
('Dartgun',500,'Single shot dart that can be loaded with poison.',0,0,'Clinic','cyberoptics'),
('Image Processing',500,'When paired in both eyes, allows for reduced difficulties on vision based perception checks.',0,0,'Mall','cyberoptics'),
('Infrared Imaging',500,'When paired in both eyes, allows for ignoring penalties for darkness, smog, and most smoke.',0,0,'Mall','cyberoptics'),
('MicroOptics',100,'In-eye magnifier allows for zooming in up to 400x.',0,0,'Mall','cyberoptics'),
('Rad Detector',1000,'Displays ambient radiation as a soft glow in the users surroundings.',0,0,'Clinic','cyberoptics'),
('HUD Agent',100,'More or less sophisticated digital assistant that appears in the users hud.',0,0,'Clinic','cyberoptics'),
('Basic Cyberaudio Suite',500,'Artificial system replacing a users inner ear. Includes basic recorder',1,4,'Clinic','cyberaudio'),
('Hearing Amplifier',100,'Boosts nearby sounds, allowing for reduced difficulties on hearing based perception checks.',0,0,'Mall','cyberaudio'),
('Level Damper',100,'Dampens loud noises such as gunshots, flash bang grenades, and screams.',0,0,'Mall','cyberaudio'),
('Radio Communicator',100,'Allows user to communicate via radio. Approximate range of 1 mile.',0,0,'Clinic','cyberaudio'),
('Voice Stress Analyzer',500,'Runs sophisticated analysis on incoming speech patterns, giving reduced difficulties to efforts to detect lies.',0,0,'Clinic','cyberaudio'),
('AudioVox',500,'Voice synthesizer. Can be programmed in a variety of useful ways, most commonly used by speech-givers and musicians to achieve flawless verbalization.',1,4,'Clinic','internalware'),
('Contraceptive Implant',10,'Prevents unwanted pregnancy for approxiamtely 4 years.',0,0,'Mall','internalware'),
('Platelet Booster',500,'Advanced nanotech that lowers healing difficulty values by 1.',1,4,'Clinic','internalware'),
('Nanotech Hive',5000,'Small, self-propogating device that allows for rapid and dramatic healing. User recovers from wounds as though they were in a cryotank if they get at least 8 hours of sleep a day.',1,4,'Hospital','internalware'),
('Vampyres',500,'Light Melee Weapon implanted in the mouth. Can deliver a single dose of poison from a small resevoir. If the user grapples a victim first, the damage is aggravated',1,4,'Clinic','internalware'),
('Cybersnake',1000,'Esophogus mounted Heavy Melee Weapon. If the user grapples a victim first, the damage is aggravated.',2,8,'Hospital','internalware'),
('Gills',1000,'User can breathe underwater.',1,4,'Hospital','internalware'),
('Grafted Muscles I',1000,'Increases Strength by a small amount without excessive bulking.',1,4,'Hospital','internalware'),
('Grafted Muscles II',5000,'Increases Strength by a moderate amount with a small amount of bulk.',2,8,'Hospital','internalware'),
('Grafted Muscles III',25000,'Increases Strength by a large amount. The muscles are apparent but seem natural.',3,9,'Hospital','internalware'),
('Grafted Muscles IV',75000,'Massively increased Strength without a visible trace courtesy of like, carbon nanorods or some nonsense.',4,12,'Hospital','internalware'),
('Grafted Muscles V',1000000,'This is probably not real and stories of waifu girls ripping cars in half is therefore no cause for alarm.',5,15,'Hospital','internalware'),
('Bone Lacing I',1000,'Increases Body by a small amount. Basically nothing you cannot achieve with vitamins.',1,4,'Hospital','internalware'),
('Bone Lacing II',5000,'Increases Body by a modest amount. Your bones are...pretty strong.',2,8,'Hospital','internalware'),
('Bone Lacing III',25000,'Increases Body by a large amount. Unironic use of the nickname Old Ironsides is permitted.',3,9,'Hospital','internalware'),
('Bone Lacing IV',75000,'Massively increased Body courtesy of Vanadium Bones and, um, skin de-tenderizing (.',4,12,'Hospital','internalware'),
('Bone Lacing V',1000000,'Stories of humans becoming literal brick walls are to be dismissed by all right thinking people.',5,15,'Hospital','internalware'),
('Nervous System Siliconization I',1000,'Increases Reflexes by a small amount by turning some of your nerves into carbon fiber optics.',1,4,'Hospital','internalware'),
('Nervous System Siliconization II',5000,'Increases Reflexes by a modest amount. Carbon Fiber Optic nerves again. Pretty cool right.',2,8,'Hospital','internalware'),
('Nervous System Siliconization III',25000,'Increases Reflexes by a large amount. Very futuristic, your Carbon Fiber Optics endings.',3,9,'Hospital','internalware'),
('Nervous System Siliconization IV',75000,'Increases Reflexes by an enormous amount. Just say it. Carbon. Fiber. Optics. Rolls off the tongue.',4,12,'Hospital','internalware'),
('Nervous System Siliconization V',1000000,'Faster than a speeding bullet and slicker than an oil spill. Thank god these don\'t exist, right.',5,15,'Hospital','internalware'),
('Independent Air Supply',1000,'A third lung made of oxygen tanks. Allows holding ones breath for about an hour.',1,6,'Hospital','internalware'),
('Midnight Lady Implant',100,'Be a Venus, be the fire, be the desire.',1,2,'Clinic','internalware'),
('Mr. Studd Implant',100,'All Night. Every Night.',1,2,'Clinic','internalware'),
('Toxin Binders',500,'Reduces difficulty to resist airborne toxins by 1.',1,4,'Clinic','internalware'),
('Nasal Filters',5000,'Makes owner immune to most airborne toxins and gases.',1,6,'Hospital','internalware'),
('Skin Weave',500,'Weaves resistant material directly into the skin. Increases armor by 2 and adds 1 health box.',1,4,'Hospital','externalware'),
('Subdermal Armor',1000,'Implanted armor beneath the skin. Increases armor by 3 and adds 2 health boxes.',1,4,'Hospital','externalware'),
('Body Plating',25000,'Bonds armor plating directly to the user\'s bone in an extremely unsettling way. Generally considered the last step before one goes full cyborg. Increases armor by 5 and adds 3 health boxes. This armor is also considered Hardened (rules).',2,6,'Hospital','externalware'),
('Cyberarm - Right',500,'Replacement arm. Standard issue looks like an angular robotic limb. Grants 1 additional health box.',2,6,'Hospital','cyberarm'),
('Cyberarm - Left',500,'Replacement arm. Standard issue looks like an angular robotic limb. Grants 1 additional health box.',2,6,'Hospital','cyberarm'),
('Grapple Hand',500,'User can fire their hand 30 meters. It can still feel and grab things. Hand can also just run along the ground and grab things.',0,0,'Clinic','cyberarm'),
('Medscanner',500,'Built in scanner that assists with diagnosing injury and illness. Reduces First Aid and Paramedic difficulties by 1.',0,0,'Clinic','cyberarm'),
('Techscanner',500,'Built in scanner for assessing technology. Comes with a variety of probes. Reduces repair and jury rigging difficulties by 1.',0,0,'Clinic','cyberarm'),
('Tool Hand',500,'Fingers contain a variety of screwdrivers, wrenches, a small drill, and other tools. Never carry a toolbag again!',0,0,'Clinic','cyberarm'),
('Quick Change Mount',100,'Special mounting that allows arm to be removed or attached as a complex action',0,0,'Clinic','cyberarm'),
('Subdermal Grip',500,'Allows user to interface with a smartgun without connecting interface plugs.',0,0,'Clinic','cyberarm'),
('Built-in Gun',500,'A one-handed gun can be built into a cyberarm. Weapon is concealed even if not normally able to be.',0,0,'Clinic','cyberarm'),
('Big Knucks',100,'Built in armored knuckles. Gives +1 damage to unarmed attacks.',0,0,'Clinic','cyberarm'),
('Scratchers',100,'Carbo-glass fingernails. Acts as a light melee weapon that is virtually undetectable. Exotic Weapon',0,0,'Clinic','cyberarm'),
('Rippers',500,'Carbo-glass claws built into the first joint of a finger. Acts as a medium melee weapon that is virtually undetectable. Exotic Weapon.',0,0,'Clinic','cyberarm'),
('Wolvers',1000,'Titanium claws concealed in the forearm that pop out when making a fist. Does NOT make the noise for trademark reasons. Acts as a heavy melee weapon that is virtually undetectable. Exotic Weapon.',0,0,'Clinic','cyberarm'),
('Hardened Shielding',1000,'Cyberlimb is immune to the effect of EMP devices.',0,0,'Clinic','cyberarm'),
('Plastic Covering',100,'Plastic coating for limb, giving it a close to human appearance, if somewhat shiny and angular.',0,0,'Clinic','cyberarm'),
('Realskinn Covering',500,'Artificial skin covering for cyberlimb. Mimics the feel, temp, and reaction of actual skin.',0,0,'Clinic','cyberarm'),
('SuperChrome Covering',1000,'Shiny metallic coating for cyberlminb. Self cleaning and polishing, too!',0,0,'Clinic','cyberarm'),
('Cyberleg - Right',500,'Replacement leg. Standard issue looks like an angular robotic limb. Modifications all require installation in both legs to be effective. Grants 1 additional health box.',2,6,'Hospital','cyberleg'),
('Cyberleg - Left',500,'Replacement leg. Standard issue looks like an angular robotic limb. Modifications all require installation in both legs to be effective. Grants 1 additional health box.',2,6,'Hospital','cyberleg'),
('Grip Foot',250,'Foot contains traction enhancing nanofibers similar to a chameleons. Allows climbing at normal speed on non-wet surfaces. User must be barefoot',0,0,'Clinic','cyberleg'),
('Web Foot',250,'Allows toes to extend and deploy webbing, acting as built in flippers. Allows swimming at normal speed.',0,0,'Clinic','cyberleg'),
('Spring Heels',250,'Leg contains powerful hydraulics, allowing for some truly impressive leaps. More importantly, allows surviving the landing.',0,0,'Clinic','cyberleg'),
('Skate Foot',250,'Feet can split apart and deploy inline skates. Movement is doubled over most surfaces when skating.',0,0,'Clinic','cyberleg'),
('Hardened Shielding',1000,'Cyberlimb is immune to the effect of EMP devices.',0,0,'Clinic','cyberleg'),
('Plastic Covering',100,'Plastic coating for limb, giving it a close to human appearance, if somewhat shiny and angular.',0,0,'Clinic','cyberleg'),
('Realskinn Covering',500,'Artificial skin covering for cyberlimb. Mimics the feel, temp, and reaction of actual skin.',0,0,'Clinic','cyberleg'),
('SuperChrome Covering',1000,'Shiny metallic coating for cyberlminb. Self cleaning and polishing, too!',0,0,'Clinic','cyberleg'),
('Artificial Shoulder Mount',1000,'(BETA - Does not work) Allows user to mount an additional pair of cyberlimbs under their normal arms.',3,9,'Hospital','borgware'),
('MultiOptic Mount',1000,'(BETA - Does not work) Gives user 5 additional cybereye slots.',3,9,'Hospital','borgware'),
('Sensor Array',1000,'(BETA - Does not work) Gives user 5 additional cyberear slots.',3,9,'Hospital','borgware'),
('Linear Frame Alpha',50000,'(BETA - Does not work) Grafted exoskeleton with built in power supply. Adds 5 armor and 4 health boxes. Increases Strength and Body by 2. Decreases Reflexes by 1. Not compatible with External Cyberarmor. Not compatible with Grafted Muscles or Bone Lacing.',3,9,'Hospital','borgware'),
('Linear Frame Beta',150000,'(BETA - Does not work) Advanced grafted exoskeleton with built in power supply. Adds 6 armor and 5 health boxes. Increases Strength and Body by 3. Decreases Reflexes by 2. Not compatible with External Cyberarmor. Not compatible with Grafted Muscles or Bone Lacing.',4,12,'Hospital','borgware');
INSERT INTO "public"."armor_master"("name", "quality", "price", "description")
VALUES (
		E'Clothes',
		1,
		10,
		E'Standard clothing with mild antiballistic properties.'
	),
	(
		E'Leathers',
		2,
		20,
		E'Not even slightly bulletproof, but offers protection against small clubs.'
	),
	(
		E'Kevlar',
		3,
		50,
		E'Offers decent protection for the vitals at a bargain price.'
	),
	(
		E'Light Armorjack',
		4,
		100,
		E'Full body armor of the lightest kind.'
	),
	(
		E'Armored Trench Coat',
		4,
		1000,
		E'A somewhat less obtrusive piece of gear, allowing an edgerunner to armor up in public. Not especially fancy, doesn\'t breathe. Expect a certain amount of musk.'
	),
	(
		E'Fancy Armored Suit',
		4,
		2500,
		E'A stylish, high class looking bit of body armor. Common amongst Corpos with reason to suspect they are less loved than they should be. Also, it breathes.'
	),
	(
		E'Medium Armorjack',
		5,
		500,
		E'A plain suit of modern armor, completely undisguisable as anything else.'
	),
	(
		E'Heavy Armorjack',
		6,
		1000,
		E'The descendent of SWAT armor and platemail, offering considerable protection to the wearer.'
	),
	(
		E'Full Flak',
		7,
		2000,
		E'Standard military issue gear, designed to keep the wearer alive through some SHIT.'
	),
	(
		E'Metalgear',
		8,
		5000,
		E'Advanced composite alloys and strategic plating offering the best possible protection. The weaere soaks non-aggravated wounds with a difficulty of 5.'
	),
	(
		E'Military Grade Powered Armor',
		10,
		50000,
		E'Sometimes you gotta send in the Space Marines. +2 Dice to any strength rolls. Armor is considered Hardened (see rules)'
	);
INSERT INTO "public"."shield_master"("name", "quality", "price", "description")
VALUES (
		E'Runner\'s Buckler',
		1,
		500,
		E'A small shield, useful for deflecting gangers and salesmen.'
	),
	(
		E'Riot Shield',
		2,
		1000,
		E'A full sized shield offering decent protection.'
	)
INSERT INTO "public"."weapon_master"(
		"name",
		"damage",
		"dmg_type",
		"range",
		"rof",
		"max_clip",
		"hands",
		"concealable",
		"price"
	)
VALUES (
		E'Light Melee Weapon',
		0,
		E'melee',
		0,
		2,
		0,
		1,
		TRUE,
		10
	),
	(
		E'Medium Melee Weapon',
		1,
		E'melee',
		0,
		2,
		0,
		1,
		FALSE,
		50
	),
	(
		E'Heavy Melee Weapon',
		2,
		E'melee',
		0,
		2,
		0,
		2,
		FALSE,
		100
	),
	(
		E'Very Heavy Melee Weapon',
		4,
		E'melee',
		0,
		1,
		0,
		2,
		FALSE,
		500
	),
	(
		E'Light Pistol',
		4,
		E'gun',
		5,
		2,
		12,
		1,
		TRUE,
		50
	),
	(
		E'Heavy Pistol',
		5,
		E'gun',
		10,
		2,
		8,
		1,
		TRUE,
		100
	),
	(
		E'Very Heavy Pistol',
		6,
		E'gun',
		15,
		1,
		4,
		1,
		FALSE,
		500
	),
	(E'Light SMG', 2, E'smg', 15, 4, 20, 1, TRUE, 100),
	(
		E'Heavy SMG',
		3,
		E'smg',
		20,
		3,
		30,
		1,
		FALSE,
		500
	),
	(
		E'Pump Shotgun',
		7,
		E'shotgun',
		10,
		1,
		6,
		2,
		FALSE,
		100
	),
	(
		E'Double Barrel',
		7,
		E'shotgun',
		10,
		2,
		2,
		2,
		FALSE,
		100
	),
	(
		E'Assault Shotgun',
		6,
		E'shotgun',
		10,
		2,
		8,
		2,
		FALSE,
		500
	),
	(
		E'Assault Rifle',
		6,
		E'assault',
		25,
		3,
		30,
		2,
		FALSE,
		1000
	),
	(
		E'Sniper Rifle',
		8,
		E'rifle',
		150,
		1,
		4,
		2,
		FALSE,
		1000
	),
	(E'Bow', 2, E'bow', 10, 1, 1, 2, FALSE, 1000),
	(
		E'Grenade Launcher',
		12,
		E'explosive',
		40,
		1,
		4,
		2,
		FALSE,
		5000
	),
	(
		E'Rocket Launcher',
		24,
		E'explosive',
		120,
		1,
		1,
		2,
		FALSE,
		10000
	);
INSERT INTO "public"."misc_gear_master"("name", "description", "price")
VALUES (E'Agent', E'Adaptive AI Smartphone', 100),
	(
		E'Airhypo',
		E'Easy to use drug injection device',
		20
	),
	(
		E'Anti-Smog Breathing Mask',
		E'Helpful for filtering out the omnipresent airborne toxins in the city.',
		20
	),
	(
		E'Audio Recorder',
		E'Records audio onto onboard Chips. ',
		100
	),
	(
		E'Auto Level Dampening Ear Protectors',
		E'Compact ear protection, making the user immune to the effecs caused by dangerously loud sounds while still allowing whispered conversation.',
		500
	),
	(
		E'Binoculars',
		E'Adjustable and highly flexible, allowing for up to 12x magnification',
		50
	),
	(
		E'Braindance Viewer',
		E'Allows the wearer to experience braindance Chips.',
		1000
	),
	(
		E'Bug detector',
		E'Discreet tool that can detect video and listening devices',
		500
	),
	(
		E'Camping Gear',
		E'2 person tent, self inflating mattress and sleeping bag, stakes, tarp, and other necessaries for street living.',
		75
	),
	(
		E'Carryall',
		E'A bag with carrying handles and a shoulder strap',
		20
	),
	(
		E'Chemical Analyzer',
		E'Handheld device that can provide chemical analysis of the air or provided samples.',
		1000
	),
	(
		E'Computer',
		E'A portable computer with a touchscreen and keyboard. Durable and hardy.',
		50
	),
	(
		E'Cryopump',
		E'A portable slip for a single person with a cryo unit. See Role Abilities: Medtech',
		2500
	),
	(
		E'Cryotank',
		E'An installed tank and associated hardware. See Role Abilities: Medtech',
		5000
	),
	(
		E'Cyberdeck Alpha',
		E'Basic Deck for Netrunning. 5 slots.',
		100
	),
	(
		E'Cyberdeck Beta',
		E'Sophisticated Deck for Netrunning. 7 slots.',
		2500
	),
	(
		E'Cyberdeck Delta',
		E'Advanced Deck for Netrunning. 9 slots.',
		7500
	),
	(
		E'Disposable Cell Phone',
		E'It makes calls and not much else.',
		5
	),
	(
		E'Drum Syntheizer',
		E'When attached to an amp, produces pre-programmed drumbeats',
		50
	),
	(
		E'Duct Tape',
		E'Comes in many colors, including glow-in-the-dark',
		5
	),
	(
		E'Instrument',
		E'Any device for making music. Electric versions require an amp.',
		500
	),
	(
		E'Flashlight',
		E'Rechargeable light with adjustable lenses, extra modes, and programable colors.',
		20
	),
	(E'Food Stick', E'One awful meal in bar form.', 5),
	(
		E'Glow Paint',
		E'Glow in the dark spray paint',
		10
	),
	(
		E'Glow Stick',
		E'Single use stick that illuminates a small area.',
		5
	),
	(
		E'Grapple Gun',
		E'Fires a grappling line up to 30 meters. Bamf!',
		500
	),
	(
		E'Plasticuffs',
		E'Plastic Restraints. Can be broken by characters with a Strength of 6 or higher.',
		10
	),
	(
		E'Steel Handcuffs',
		E'Steel Restraints. Can be broken by characters with a Strength of 7 or higher.',
		50
	),
	(
		E'Steel Security Handcuffs',
		E'Advanced Steel Restraints. Can be broken by characters with a Strength of 9 or higher.',
		500
	),
	(
		E'Homing Tracers',
		E'Dime-sized device that can be tracked by a Cyberdeck, Computer, Radio Communicator, Radio Scanner, or many kinds of cyberware.',
		500
	),
	(
		E'Kibble Pack',
		E'One meal worth of delicious* human** food***',
		5
	),
	(
		E'Lock Picks',
		E'Used to crack mechanical locks.',
		20
	),
	(
		E'Medscanner',
		E'Handheld device useful for assessing injuries and illness. Reduces First Aid and Paramedic difficulties by 1.',
		500
	),
	(
		E'Medtech Bag',
		E'A full set of emergency medical tools in custom pockets',
		100
	),
	(
		E'Memory Chip',
		E'Standard data storage device',
		5
	),
	(E'MRE', E'Self heating ration', 5),
	(
		E'Personal CarePak',
		E'Everything a person needs to clean up - cleansing wipes, leave-in nanoshampoo, compostable toothbrush, the works.',
		10
	),
	(
		E'Pocket Amplifier',
		E'Battery powered amplifier. Can support 2 instruments for up to 6 hours on a single charge.',
		50
	),
	(
		E'Radar Detector',
		E'Beeps when within 2 meters of an active radar beam',
		500
	),
	(
		E'Radio Communicator',
		E'Earpiece and bone conduction microphone with a range of roughly 1 mile',
		100
	),
	(
		E'Radio Scrambler',
		E'Plug in device that scrambles radio communications. Requires pairing in advance to work properly.',
		500
	),
	(
		E'Road Flare',
		E'Lights up a large area for roughly an hour',
		5
	),
	(E'Rope (50m)', E'Just some rope.', 20),
	(
		E'Smart Glasses',
		E'Sophisticated HUD glasses that have one cyberoptics cyberware feature, chosen at purchase.',
		500
	),
	(E'Techtool', E'Handy folding multi-tool', 50),
	(
		E'Tool Bag',
		E'A full set of everyday tools useful for a variety of situations.',
		100
	),
	(
		E'Tool Bag - Cybertech',
		E'A full set of everyday tools useful for dealing with cyberware.',
		500
	),
	(
		E'Tool Bag - Vehicles',
		E'A full set of everyday tools useful for working on cars.',
		500
	),
	(
		E'Tool Bag - Exotic',
		E'A full set of everyday tools useful for a very special type of equipment, chosen at purchase.',
		500
	),
	(
		E'Vial of deadly poison',
		E'A single dose of a deadly poison in a special storage vial. Can be applied to a melee weapon as a complex action, or delivered via other mechanisms. Deals 3 lethal damage when applied to a melee weapon, deals 8 stun damage when ingested or injected. Loses potency in about an hour when exposed to the air.',
		100
	),
	(
		E'Vial of biotoxin',
		E'A single dose of a virulent toxin in a special storage vial. Can be applied to a melee weapon as a complex action, or delivered via other mechanisms. Deals 3 aggravated damage when applied to a melee weapon, deals 12 lethal damage when ingested or injected',
		500
	),
	(
		E'Video Camera',
		E'Device about the size of a cigar that records audio & video. Can run for about a day on a single charge. Commonly shoulder mounted. Has auto-zoom, movement compensation, and other advanced features.',
		100
	),
	(
		E'Virtuality Goggles',
		E'Projects cyberspace imagery over a real world view - helpful for the netrunner on the go.',
		100
	);
INSERT INTO "weapon_mod1_master" ("mod_1_name")
VALUES ('Not Modded');
INSERT INTO "weapon_mod2_master" ("mod_2_name")
VALUES ('Not Modded');
INSERT INTO "armor_mod_master" ("name")
VALUES ('Not Modded');
INSERT INTO "character" (
		"user_id",
		"handle",
		"player",
		"role",
		"culture",

		"campaign",
		"is_paramedical",
		"strength",
		"body",
		"reflexes",
		"move",
		"appearance",
		"cool",
		"street_cred",
		"intelligence",
		"willpower",
		"technique",
		"athletics",
		"brawling",
		"concentration",
		"evasion",
		"fast_talk",
		"firearms",
		"legerdemain",
		"melee_weapons",
		"perception",
		"streetwise",
		"demolitions",
		"drive_land",
		"drive_exotic",
		"etiquette",
		"exotic_weapons",
		"heavy_weapons",
		"performance",
		"stealth",
		"survival",
		"tracking",
		"business",
		"cryptography",
		"cyber_tech",
		"investigation",
		"first_aid",
		"paramed",
		"gambling",
		"language",
		"military_tech",
		"science",
		"vehicle_tech",
		"rockerboy",
		"solo",
		"netrunner",
		"nomad",
		"media",
		"medtech",
		"med_surgery",
		"med_pharma",
		"med_cryo",
		"maker",
		"maker_field",
		"maker_upgrade",
		"maker_fab",
		"maker_invent",
		"perm_humanity_loss",
		"max_luck",
		"max_armor",
		"max_xp",
		"spent_xp",
		"bank"
	)
VALUES (
		'1',
		'Guvyer MacQueen',
		'Schwami',
		'Techboy',
		'Desert',
		'Gatti Ombre' false,
		2,
		2,
		3,
		2,
		1,
		3,
		1,
		2,
		3,
		4,
		4,
		4,
		3,
		3,
		3,
		3,
		2,
		2,
		2,
		2,
		2,
		2,
		1,
		1,
		1,
		1,
		1,
		1,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		2,
		1,
		1,
		1,
		1,
		0,
		4,
		0,
		0,
		0,
		300
	);
INSERT INTO "char_status" (
		"char_id",
		"current_stun",
		"current_lethal",
		"current_agg",
		"current_armor_loss",
		"current_luck_loss"
	)
VALUES (2, 2, 3, 1, 1, 2);

INSERT INTO "public"."armor_master"("armor_master_id","name","quality","price","description")
VALUES (1,E'Clothes',1,10,E'Standard clothing with mild antiballistic properties.'),
(2,E'Leathers',2,20,E'Not even slightly bulletproof, but offers protection against small clubs.'),
(3,E'Kevlar',3,50,E'Offers decent protection for the vitals at a bargain price.'),
(4,E'Light Armorjack',4,100,E'Full body armor of the lightest kind.'),
(5,E'Medium Armorjack',5,500,E'A plain suit of modern armor, completely undisguisable as anything else.'),
(6,E'Heavy Armorjack',6,1000,E'The descendent of SWAT armor and platemail, offering considerable protection to the wearer.'),
(7,E'Full Flak',7,2000,E'Standard military issue gear, designed to keep the wearer alive through some SHIT.'),
(8,E'Metalgear',8,5000,E'Advanced composite alloys and strategic plating offering the best possible protection. The weaere soaks non-aggravated wounds with a difficulty of 5.'),
(11,E'Armored Trench Coat',4,1000,E'A somewhat less obtrusive piece of gear, allowing an edgerunner to armor up in public. Not especially fancy, doesn\'t breathe. Expect a certain amount of musk.'),
(12,E'Fancy Armored Suit',4,2500,E'A stylish, high class looking bit of body armor. Common amongst Corpos with reason to suspect they are less loved than they should be. Also, it breathes.'),
(13,E'Military Grade Powered Armor',10,25000,E'Sometimes you gotta send in the Space Marines. +2 Dice to any strength rolls. Non-aggravated wounds are soaked with a difficulty of 4. ');

INSERT INTO "public"."shield_master"("name", "quality", "price", "description")
VALUES (
		E'Runner\'s Buckler',
		1,
		500,
		E'A small shield, useful for deflecting gangers and salesmen.'
	),
	(
		E'Riot Shield',
		2,
		1000,
		E'A full sized shield offering decent protection.'
	);