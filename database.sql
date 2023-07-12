CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "user_type" INT NOT NULL
);

CREATE TABLE "character" (
	"id" serial NOT NULL,
	"user_id" integer NOT NULL,
	"name" varchar NOT NULL,
	"player" varchar NOT NULL,
	"role" varchar NOT NULL,
	"culture" varchar NOT NULL,
	"concept" varchar NOT NULL,
	"is_paramedical" bool NOT NULL DEFAULT 'false',
	"strength" integer NOT NULL DEFAULT '1',
	"body" integer NOT NULL DEFAULT '1',
	"reflexes" integer NOT NULL DEFAULT '1',
	"move" integer NOT NULL DEFAULT '1',
	"appearance" integer NOT NULL DEFAULT '1',
	"cool" integer NOT NULL DEFAULT '1',
	"street_cred" integer NOT NULL DEFAULT '0',
	"intelligence" integer NOT NULL DEFAULT '1',
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
	"max_health" integer NOT NULL DEFAULT '10',
	"perm_humanity_loss" integer NOT NULL DEFAULT '40',
	"max_luck" integer NOT NULL DEFAULT '4',
	"max_armor" integer NOT NULL DEFAULT '0',
	"max_xp" integer NOT NULL DEFAULT '0',
	"spent_xp" integer NOT NULL DEFAULT '0',
	"bank" integer NOT NULL DEFAULT '0',
	CONSTRAINT "character_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

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
) WITH (
  OIDS=FALSE
);


CREATE TABLE "character_weapons_bridge" (
	"weapon_bridge_id" serial NOT NULL,
	"char_id" integer NOT NULL,
	"weapon_id" integer NOT NULL,
	"weapon_mod_1" integer NOT NULL,
	"weapon_mod_2" integer NOT NULL,
	"current_clip" integer NOT NULL,
	CONSTRAINT "character_weapons_bridge_pk" PRIMARY KEY ("weapon_bridge_id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "armor_master" (
	"armor_master_id" serial NOT NULL,
	"quality" integer NOT NULL DEFAULT '0'
	"price" integer NOT NULL DEFAULT '0',
	CONSTRAINT "armor_master_pk" PRIMARY KEY ("armor_master_id")
) WITH (
  OIDS=FALSE
);


CREATE TABLE "char_armor_bridge" (
	"armor_bridge_id" serial NOT NULL,
	"char_id" integer NOT NULL,
	"armor_id" integer NOT NULL,
	"armor_mod_1" integer NOT NULL,
	"armor_mod_2" integer NOT NULL,
	CONSTRAINT "char_armor_bridge_pk" PRIMARY KEY ("armor_bridge_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "armor_mod_master" (
	"armor_mod_master_id" serial NOT NULL,
	CONSTRAINT "armor_mod_master_pk" PRIMARY KEY ("armor_mod_master_id")
) WITH (
  OIDS=FALSE
);


CREATE TABLE "weapon_mod1_master" (
	"weapon_mod1_master_id" serial NOT NULL,
	"mod_1_name" varchar NOT NULL,
	CONSTRAINT "weapon_mod1_master_pk" PRIMARY KEY ("weapon_mod1_master_id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "weapon_mod2_master" (
	"weapon_mod2_master_id" serial NOT NULL,
	"mod_2_name" varchar NOT NULL,
	CONSTRAINT "weapon_mod2_master_pk" PRIMARY KEY ("weapon_mod2_master_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "char_status" (
	"char_status_id" serial NOT NULL,
	"char_id" integer NOT NULL,
	"current_stun" integer NOT NULL,
	"current_lethal" integer NOT NULL,
	"current_agg" integer NOT NULL,
	"current_armor_loss" integer NOT NULL,
	"current_humanity_loss" integer NOT NULL,
	"current_luck_loss" integer NOT NULL,
	CONSTRAINT "char_status_pk" PRIMARY KEY ("char_status_id")
) WITH (
  OIDS=FALSE
);



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
) WITH (
  OIDS=FALSE
);


INSERT INTO "cyberware_master" ("name", "type", "install_level", "price", "humanity_loss_min", "humanity_loss_max", "description") VALUES
('Biomonitor', 'fashionware', 'Mall', 100, 0, 0, 'Implant that reads vital signs.'),
('Chemskin', 'fashionware', 'Mall', 100, 0, 0, 'Custom skin biosculpting that can alter the appearance of ones skin to almost any conceivable combination of color, inked tattoos, designs, and the like. Gives +1 Cool when paired with Techhair'),
('EMP Threading', 'fashionware', 'Mall', 10, 0, 0, 'Metallic lines that run across the body. Highly fashionable combinations are always coming and going.'),
('Light Tattoo', 'fashionware', 'Mall', 100, 0, 0, 'Subdermal patches that can produce colorful, backlit tattoos. Gives +1 appearance when awesome enough.'),
('Corneal Implant', 'fashionware', 'Mall', 100, 0, 0, 'Color changing lenses implanted in the eyes, allowing for nearly any color/style combination'),
('Skinwatch', 'fashionware', 'Mall', 100, 0, 0, 'Subdermal LED watch'),
('Techhair', 'fashionware', 'Mall', 100, 0, 0, 'Color changing, light emitting, artificial hair. Gives +1 Cool when paired with Chemskin'),
('Basic Neural Link', 'neuralware', 'Clinic', 500, 1, 5, 'Artifical Nervous System that allows for the use of different pieces of chipware.  The basic version has 5 sockets. Inclues interfacing plugs to connect to most machines.'),
('Braindance Recorder', 'neuralware', 'Clinic', 500, 1, 6, 'System to record all of a users experience to memory chips.'),
('Kerenzikov', 'neuralware', 'Clinic', 500, 1, 6, 'Speedware that artifically boosts a users experiential sense of time. Increases Move by 1 and adds 1 die to most combat rolls for one scene when activated. Deals the user 3 stun damage when the effect wears off.'),
('Sandevistan', 'neuralware', 'Clinic', 2000, 1, 6, 'Speedware that artifically boosts a users experiential sense of time. Increases Move by 2 and adds 2 die to most combat rolls for one scene when activated. Deals the user 6 stun damage when the effect wears off.'),
('Miilitech "Kali"', 'neuralware', 'Clinic', 25000, 1, 6, 'Speedware that artifically boosts a users experiential sense of time. Increases Move by 3 and adds 3 die to most combat rolls for one scene when activated. Deals the user 6 lethal damage when the effect wears off.'),
('Memory chip', 'neuralware', 'chip', 10, 0, 0, 'Memory storage chip. Approximate capacity of 2 Exabytes, or 2 Billion Gigabytes for you old timers.'),
('Olfactory Boost', 'neuralware', 'chip', 100, 0, 0, 'Chip that assists in decoding scents and boosts a users sense of smell to dog-like levels. Allows tracking via scent, amongst other tricks.'),
('Pain Editor', 'neuralware', 'chip', 5000, 0, 0, 'Chip that overrides the users ability to feel pain. Dramatically reduces wound-based die penalties.'),
('Skill Chip - Athletics', 'neuralware', 'chip', 500, 0, 0, 'Chip that overrides a users muscle memory, gives access to internal databanks, and otherwise gives a user skills they might not otherwise have access to.'),
('Skill Chip - Brawling', 'neuralware', 'chip', 500, 0, 0, 'Chip that overrides a users muscle memory, gives access to internal databanks, and otherwise gives a user skills they might not otherwise have access to.'),
('Skill Chip - Evasion', 'neuralware', 'chip', 500, 0, 0, 'Chip that overrides a users muscle memory, gives access to internal databanks, and otherwise gives a user skills they might not otherwise have access to.'),
('Skill Chip - Fast Talk', 'neuralware', 'chip', 500, 0, 0, 'Chip that overrides a users muscle memory, gives access to internal databanks, and otherwise gives a user skills they might not otherwise have access to.'),
('Skill Chip - Firearms', 'neuralware', 'chip', 500, 0, 0, 'Chip that overrides a users muscle memory, gives access to internal databanks, and otherwise gives a user skills they might not otherwise have access to.'),
('Skill Chip - Melee Weapons', 'neuralware', 'chip', 500, 0, 0, 'Chip that overrides a users muscle memory, gives access to internal databanks, and otherwise gives a user skills they might not otherwise have access to.'),
('Skill Chip - Drive Land', 'neuralware', 'chip', 500, 0, 0, 'Chip that overrides a users muscle memory, gives access to internal databanks, and otherwise gives a user skills they might not otherwise have access to.'),
('Skill Chip - Performance', 'neuralware', 'chip', 500, 0, 0, 'Chip that overrides a users muscle memory, gives access to internal databanks, and otherwise gives a user skills they might not otherwise have access to.'),
('Skill Chip - Stealth', 'neuralware', 'chip', 500, 0, 0, 'Chip that overrides a users muscle memory, gives access to internal databanks, and otherwise gives a user skills they might not otherwise have access to.'),
('Skill Chip - Cryptography', 'neuralware', 'chip', 500, 0, 0, 'Chip that overrides a users muscle memory, gives access to internal databanks, and otherwise gives a user skills they might not otherwise have access to.'),
('Skill Chip - First Aid', 'neuralware', 'chip', 500, 0, 0, 'Chip that overrides a users muscle memory, gives access to internal databanks, and otherwise gives a user skills they might not otherwise have access to.'),
('Skill Chip - Gambling', 'neuralware', 'chip', 500, 0, 0, 'Chip that overrides a users muscle memory, gives access to internal databanks, and otherwise gives a user skills they might not otherwise have access to.'),
('Skill Chip - Language', 'neuralware', 'chip', 500, 0, 0, 'Chip that overrides a users muscle memory, gives access to internal databanks, and otherwise gives a user skills they might not otherwise have access to.'),
('Tactile Booster', 'neuralware', 'chip', 100, 0, 0, 'Chip that increases a users sense of touch to the point where they can detect cats and larger sized animals from 20 meters away by placing their hand on a solid surface.'),
('Algernonic Subprocessors I', 'neuralware', 'chip', 1000, 0, 0, 'A general purpose intelligence booster chip. Gives instant access to all knowledge of roughly an 8th grader.'),
('Algernonic Subprocessors II', 'neuralware', 'chip', 5000, 0, 0, 'A general purpose intelligence booster chip. Makes the user seem pretty bright.'),
('Algernonic Subprocessors III', 'neuralware', 'chip', 25000, 0, 0, 'A highly advanced intelligence booster chip. Contains a sMall helper AI to assist with cognitive loads.'),
('Algernonic Subprocessors IV', 'neuralware', 'chip', 75000, 0, 0, 'An extremely advanced intelligence booster chip. Can make an average dullard into a Weapons Grade Savant.'),
('Algernonic Subprocessors V', 'neuralware', 'chip', 1000000, 0, 0, 'This probably does not exist, so dont worry about the specs.'),
('Cybereye', 'cyberoptics', 'Clinic', 100, 1, 6, 'An artificial eye with 3 option slots. Includes the ability to change colors and patterns, a HUD, simple video recordings, and Augemnted Reality'),
('Anti-Dazzle System', 'cyberoptics', 'Mall', 100, 1, 2, 'Makes the user immune to the effects of flashes and strobes.'),
('Dartgun', 'cyberoptics', 'Clinic', 500, 1, 2, 'Single shot dart that can be loaded with poison.'),
('Image Processing', 'cyberoptics', 'Mall', 500, 1, 4, 'When paired in both eyes, allows for reduced difficulties on vision based perception checks.'),
('Infrared Imaging', 'cyberoptics', 'Mall', 500, 1, 4, 'When paired in both eyes, allows for ignoring penalties for darkness, smog, and most smoke.'),
('MicroOptics', 'cyberoptics', 'Mall', 100, 1, 2, 'In-eye magnifier allows for zooming in up to 400x.'),
('Rad Detector', 'cyberoptics', 'Clinic', 1000, 1, 4, 'Displays ambient radiation as a soft glow in the users surroundings.'),
('HUD Agent', 'cyberoptics', 'Clinic', 100, 1, 2, 'More or less sophisticated digital assistant that appears in the users hud.'),
('Cyberaudio Suite', 'cyberaudio', 'Clinic', 500, 1, 6, 'Artificial system replacing a users inter-ear canals. Includes basic recorder'),
('Hearing Amplifier', 'cyberaudio', 'Mall', 100, 1, 2, 'Boosts nearby sounds, allowing for reduced difficulties on hearing based perception checks.'),
('Level Damper', 'cyberaudio', 'Mall', 100, 1, 2, 'Dampens loud noises such as gunshots, flash bang grenades, and screams.'),
('Radio Communicator', 'cyberaudio', 'Clinic', 100, 1, 2, 'Allows user to communicate via radio. Approximate range of 1 mile.'),
('Voice Stress Analyzer', 'cyberaudio', 'Clinic', 500, 1, 4, 'Runs sophisticated analysis on incoming speech patterns, giving reduced difficulties to efforts to detect lies.'),
('AudioVox', 'internalware', 'Clinic', 500, 1, 5, 'Voice synthesizer. Can be programmed in a variety of useful ways, most commonly used by speech-givers and musicians to achieve flawless verbalization.'),
('Contraceptive Implant', 'internalware', 'Mall', 10, 0, 0, 'Prevents unwanted pregnancy for approxiamtely 4 years.'),
('Platelet Booster', 'internalware', 'Clinic', 500, 1, 3, 'Advanced nanotech that lowers healing difficulty values by 1.'),
('Nanotech Hive', 'internalware', 'Hospital', 5000, 1, 10, 'SMall, self-propogating device that allows for rapid and dramatic healing. User recovers from wounds as though they were in a cryotank if they get at least 8 hours of sleep a day.'),
('Vampyres', 'internalware', 'Clinic', 500, 1, 4, 'Light Melee Weapon implanted in the mouth. Can deliver a single dose of poison from a sMall resevoir. If the user grapples a victim first, the damage is aggravated'),
('Cybersnake', 'internalware', 'Hospital', 1000, 1, 10, 'Esophogus mounted Heavy Melee Weapon. If the user grapples a victim first, the damage is aggravated.'),
('Gills', 'internalware', 'Hospital', 1000, 1, 8, 'User can breathe underwater.'),
('Grafted Muscles I', 'internalware', 'Hospital', 1000, 1, 8, 'Increases Strength by a sMall amount without excessive bulk.'),
('Grafted Muscles II', 'internalware', 'Hospital', 5000, 2, 12, 'Increases Strength by a moderate amount without excessive bulk.'),
('Grafted Muscles III', 'internalware', 'Hospital', 25000, 3, 16, 'Increases Strength by a large amount without excessive bulk.'),
('Grafted Muscles IV', 'internalware', 'Hospital', 75000, 4, 20, 'Massively increased Strength without a trace courtesy of like, carbon nanorods or some bullshit.'),
('Grafted Muscles V', 'internalware', 'Hospital', 1000000, 5, 24, 'This is probably not real and therefore no cause for concern or alarm.'),
('Bone Lacing I', 'internalware', 'Hospital', 1000, 1, 8, 'Increases Body by a sMall amount. Basically nothing you cannot achieve with vitamins.'),
('Bone Lacing II', 'internalware', 'Hospital', 5000, 2, 12, 'Increases Body by a modest amount. Your bones are...pretty strong.'),
('Bone Lacing III', 'internalware', 'Hospital', 25000, 3, 16, 'Increases Body by a large amount. Unironic use of the nickname Old Ironsides is permitted.'),
('Bone Lacing IV', 'internalware', 'Hospital', 75000, 4, 20, 'Massively increased Body courtesy of Vanadium Bones and Shit (tm).'),
('Bone Lacing V', 'internalware', 'Hospital', 1000000, 5, 24, 'This cannot be done, obviously. You are not a literal brick wall.'),
('Nervous System Siliconization I', 'internalware', 'Hospital', 1000, 1, 8, 'Increases Reflexes by a sMall amount by slowly turning your nerves into carbon fiber optics.'),
('Nervous System Siliconization II', 'internalware', 'Hospital', 5000, 2, 12, 'Increases Reflexes by a modest amount. Carbon Fiber Optics. Pretty cool right..'),
('Nervous System Siliconization III', 'internalware', 'Hospital', 25000, 3, 16, 'Increases Reflexes by a large amount. Very futuristic, your Carbon Fiber Optics.'),
('Nervous System Siliconization IV', 'internalware', 'Hospital', 75000, 4, 20, 'Increases Reflexes by an enormous amount. Just say it. Carbon. Fiber. Optics.'),
('Nervous System Siliconization V', 'internalware', 'Hospital', 1000000, 5, 24, 'Such a thing is surely not possible.'),
('Independent Air Supply', 'internalware', 'Hospital', 1000, 1, 2, 'A third lung made of oxygen tanks. Allows holding ones breath for about an hour.'),
('Midnight Lady Implant', 'internalware', 'Clinic', 100, 1, 2, 'Be a Venus, be the fire, be the desire.'),
('Mr. Studd Implant', 'internalware', 'Clinic', 100, 1, 2, 'All Night. Every Night.'),
('Toxin Binders', 'internalware', 'Clinic', 500, 1, 2, 'Reduces difficulty to resist airborne toxins by 1.'),
('Nasal Filters', 'internalware', 'Hospital', 5000, 1, 2, 'Makes owner immune to most airborne toxins and gases.'), 
('Skin Weave', 'externalware', 'Hospital', 500, 1, 6, 'Weaves resistant material directly into the skin. Increases armor by 2 and adds 1 health box.'),
('Subdermal Armor', 'externalware', 'Hospital', 1000, 1, 10, 'Implanted armor beneatht the skin. Increases armor by 3 and adds 2 health boxes.'),
('Body Plating', 'externalware', 'Hospital', 25000, 2, 20, 'Bonds armor plating directly to the skin and bone in an extremely unsettling way. Generally considered the last step before one goes full cyborg. Increases armor by 5 and adds 3 health boxes. This armor is also considered Hardened (see rules).'),
('Cyberarm - Right', 'cyberarm', 'Hospital', 500, 2, 10, 'Replacement arm. Standard issue looks like an angular robotic limb. Grants 1 additional health box.'),
('Cyberarm - Left', 'cyberarm', 'Hospital', 500, 2, 10, 'Replacement arm. Standard issue looks like an angular robotic limb. Grants 1 additional health box.'),

('Grapple Hand', 'cyberarm', 'Clinic', 500, 0, 0, 'User can fire their hand 30 meters. It can still feel and grab things. Hand can also just run along the ground and grab things.'),
('Medscanner', 'cyberarm', 'Clinic', 500, 0, 0, 'Built in scanner that assists with diagnosing injury and illness. Reduces First Aid and Paramedic difficulties by 1.'),
('Techscanner', 'cyberarm', 'Clinic', 500, 0, 0, 'Built in scanner for assessing technology. Comes with a variety of probes. Reduces repair and jury rigging difficulties by 1.'),
('Tool Hand', 'cyberarm', 'Clinic', 500, 0, 0, 'Fingers contain a variety of screwdrivers, wrenches, a sMall drill, and other tools. Never carry a toolbag again!'),
('Quick Change Mount', 'cyberarm', 'Clinic', 100, 0, 0, 'Special mounting that allows arm to be removed or attached as a complex action'),
('Subdermal Grip', 'cyberarm', 'Clinic', 500, 0, 0, 'Allows user to interface with a smartgun without connecting interface plugs.'),
('Built-in Gun', 'cyberarm', 'Clinic', 500, 0, 0, 'A one-handed gun can be built into a cyberarm. Weapon is concealed even if not norMally able to be.'),
('Big Knucks', 'cyberarm', 'Clinic', 100, 0, 0, 'Built in armored knuckles. Gives +1 damage to unarmed attacks.'),
('Scratchers', 'cyberarm', 'Clinic', 100, 0, 0, 'Carbo-glass fingernails. Acts as a light melee weapon that is virtually undetectable. Exotic Weapon'),
('Rippers', 'cyberarm', 'Clinic', 500, 0, 0, 'Carbo-glass claws built into the first joint of a finger. Acts as a medium melee weapon that is virtually undetectable. Exotic Weapon.'),
('Wolvers', 'cyberarm', 'Clinic', 1000, 0, 0, 'Titanium claws concealed in the forearm that pop out when making a fist. Does NOT make the noise for trademark reasons. Acts as a heavy melee weapon that is virtually undetectable. Exotic Weapon.'),

('Hardened Shielding', 'cyberarm', 'Clinic', 1000, 0, 0, 'Cyberlimb is immune to the effect of EMP devices.'),
('Plastic Covering', 'cyberarm', 'Clinic', 100, 0, 0, 'Plastic coating for limb, giving it a close to human appearance, if somewhat shiny and angular.'),
('Realskinn Covering', 'cyberarm', 'Clinic', 500, 0, 0, 'Artificial skin covering for cyberlimb. Mimics the feel, temp, and reaction of actual skin.'),
('SuperChrome Covering', 'cyberarm', 'Clinic', 1000, 0, 0, 'Shiny metallic coating for cyberlminb. Self cleaning and polishing, too!'),

('Cyberleg - Right', 'cyberleg', 'Hospital', 500, 2, 10, 'Replacement leg. Standard issue looks like an angular robotic limb. Modifications all require installation in both legs to be effective. Grants 1 additional health box.'),
('Cyberleg - Left', 'cyberleg', 'Hospital', 500, 2, 10, 'Replacement leg. Standard issue looks like an angular robotic limb. Modifications all require installation in both legs to be effective. Grants 1 additional health box.'),
('Grip Foot', 'cyberleg', 'Clinic', 250, 0, 0, 'Foot contains traction enhancing nanofibers similar to a chameleons. Allows climbing at normal speed on non-wet surfaces. User must be barefoot'),
('Web Foot', 'cyberleg', 'Clinic', 250, 0, 0, 'Allows toes to extend and deploy webbing, acting as built in flippers. Allows swimming at normal speed.'),
('Spring Heels', 'cyberleg', 'Clinic', 250, 0, 0, 'Leg contains powerful hydraulics, allowing for some truly impressive leaps. More importantly, allows surviving the landing.'),
('Skate Foot', 'cyberleg', 'Clinic', 250, 0, 0, 'Feet can split apart and deploy inline skates. Movement is doubled over most surfaces when skating.'),

('Hardened Shielding', 'cyberleg', 'Clinic', 1000, 0, 0, 'Cyberlimb is immune to the effect of EMP devices.'),
('Plastic Covering', 'cyberleg', 'Clinic', 100, 0, 0, 'Plastic coating for limb, giving it a close to human appearance, if somewhat shiny and angular.'),
('Realskinn Covering', 'cyberleg', 'Clinic', 500, 0, 0, 'Artificial skin covering for cyberlimb. Mimics the feel, temp, and reaction of actual skin.'),
('SuperChrome Covering', 'cyberleg', 'Clinic', 1000, 0, 0, 'Shiny metallic coating for cyberlminb. Self cleaning and polishing, too!'),('Artificial Shoulder Mount', 'borgware', 'Hospital', 1000, 2, 20, '(BETA - Does not work) Allows user to mount an additional pair of cyberlimbs under their normal arms.'),


('MultiOptic Mount', 'borgware', 'Hospital', 1000, 2, 20, '(BETA - Does not work) Gives user 5 additional cybereye slots.'),
('Sensor Array', 'borgware', 'Hospital', 1000, 2, 20, '(BETA - Does not work) Gives user 5 additional cyberear slots.'),
('Linear Frame Alpha', 'borgware', 'Hospital', 50000, 2, 20, '(BETA - Does not work) Grafted exoskeleton with built in power supply. Adds 5 armor and 4 health boxes. Increases Strength and Body by 2. Decreases Reflexes by 1. Not compatible with External Cyberarmor. Not compatible with Grafted Muscles or Bone Lacing.'),
('Linear Frame Beta', 'borgware', 'Hospital', 150000, 3, 30, '(BETA - Does not work) Advanced grafted exoskeleton with built in power supply. Adds 6 armor and 5 health boxes. Increases Strength and Body by 3. Decreases Reflexes by 2. Not compatible with External Cyberarmor. Not compatible with Grafted Muscles or Bone Lacing.');


CREATE TABLE "char_cyberware_bridge" (
	"cyberware_bridge_id" serial NOT NULL,
	"char_id" integer NOT NULL,	
	CONSTRAINT "char_cyberware_bridge_pk" PRIMARY KEY ("cyberware_bridge_id")
) WITH (
  OIDS=FALSE
);

--Some minor changes to the bridge below.
ALTER TABLE "char_cyberware_bridge" ADD COLUMN "neural_link" boolean NOT NULL DEFAULT false;
ALTER TABLE "char_cyberware_bridge" ADD COLUMN "neural_socket_1" integer NOT NULL DEFAULT '0';
ALTER TABLE "char_cyberware_bridge" ADD COLUMN "neural_socket_2" integer NOT NULL DEFAULT '0';
ALTER TABLE "char_cyberware_bridge" ADD COLUMN "neural_socket_3" integer NOT NULL DEFAULT '0';
ALTER TABLE "char_cyberware_bridge" ADD COLUMN "neural_socket_4" integer NOT NULL DEFAULT '0';
ALTER TABLE "char_cyberware_bridge" ADD COLUMN "neural_socket_5" integer NOT NULL DEFAULT '0';

ALTER TABLE "char_cyberware_bridge" ADD CONSTRAINT "char_cyberware_bridge_fk1" FOREIGN KEY ("neural_socket_1") REFERENCES "cyberware_master"("cyberware_master_id");
ALTER TABLE "char_cyberware_bridge" ADD CONSTRAINT "char_cyberware_bridge_fk2" FOREIGN KEY ("neural_socket_2") REFERENCES "cyberware_master"("cyberware_master_id");
ALTER TABLE "char_cyberware_bridge" ADD CONSTRAINT "char_cyberware_bridge_fk3" FOREIGN KEY ("neural_socket_3") REFERENCES "cyberware_master"("cyberware_master_id");
ALTER TABLE "char_cyberware_bridge" ADD CONSTRAINT "char_cyberware_bridge_fk4" FOREIGN KEY ("neural_socket_4") REFERENCES "cyberware_master"("cyberware_master_id");
ALTER TABLE "char_cyberware_bridge" ADD CONSTRAINT "char_cyberware_bridge_fk5" FOREIGN KEY ("neural_socket_5") REFERENCES "cyberware_master"("cyberware_master_id");

ALTER TABLE "char_cyberware_bridge" ADD COLUMN "right_eye_cyber" boolean NOT NULL DEFAULT FALSE;
ALTER TABLE "char_cyberware_bridge" ADD COLUMN "right_eye_socket_1" integer NOT NULL DEFAULT '0';
ALTER TABLE "char_cyberware_bridge" ADD COLUMN "right_eye_socket_2" integer NOT NULL DEFAULT '0';
ALTER TABLE "char_cyberware_bridge" ADD COLUMN "right_eye_socket_3" integer NOT NULL DEFAULT '0';

ALTER TABLE "char_cyberware_bridge" ADD COLUMN "left_eye_cyber" boolean NOT NULL DEFAULT FALSE;
ALTER TABLE "char_cyberware_bridge" ADD COLUMN "left_eye_socket_1" integer NOT NULL DEFAULT '0';
ALTER TABLE "char_cyberware_bridge" ADD COLUMN "left_eye_socket_2" integer NOT NULL DEFAULT '0';
ALTER TABLE "char_cyberware_bridge" ADD COLUMN "left_eye_socket_3" integer NOT NULL DEFAULT '0';

ALTER TABLE "char_cyberware_bridge" ADD CONSTRAINT "char_cyberware_bridge_fk6" FOREIGN KEY ("right_eye_socket_1") REFERENCES "cyberware_master"("cyberware_master_id");
ALTER TABLE "char_cyberware_bridge" ADD CONSTRAINT "char_cyberware_bridge_fk7" FOREIGN KEY ("right_eye_socket_2") REFERENCES "cyberware_master"("cyberware_master_id");
ALTER TABLE "char_cyberware_bridge" ADD CONSTRAINT "char_cyberware_bridge_fk8" FOREIGN KEY ("right_eye_socket_3") REFERENCES "cyberware_master"("cyberware_master_id");
ALTER TABLE "char_cyberware_bridge" ADD CONSTRAINT "char_cyberware_bridge_fk9" FOREIGN KEY ("left_eye_socket_1") REFERENCES "cyberware_master"("cyberware_master_id");
ALTER TABLE "char_cyberware_bridge" ADD CONSTRAINT "char_cyberware_bridge_fk10" FOREIGN KEY ("left_eye_socket_2") REFERENCES "cyberware_master"("cyberware_master_id");
ALTER TABLE "char_cyberware_bridge" ADD CONSTRAINT "char_cyberware_bridge_fk11" FOREIGN KEY ("left_eye_socket_3") REFERENCES "cyberware_master"("cyberware_master_id");


ALTER TABLE "char_cyberware_bridge" ADD COLUMN "cyberaudio_suite" boolean NOT NULL DEFAULT FALSE;
ALTER TABLE "char_cyberware_bridge" ADD COLUMN "cyberaudio_suite_socket_1" integer NOT NULL DEFAULT '0';
ALTER TABLE "char_cyberware_bridge" ADD COLUMN "cyberaudio_suite_socket_2" integer NOT NULL DEFAULT '0';
ALTER TABLE "char_cyberware_bridge" ADD COLUMN "cyberaudio_suite_socket_3" integer NOT NULL DEFAULT '0';

ALTER TABLE "char_cyberware_bridge" ADD CONSTRAINT "char_cyberware_bridge_fk12" FOREIGN KEY ("cyberaudio_suite_socket_1") REFERENCES "cyberware_master"("cyberware_master_id");
ALTER TABLE "char_cyberware_bridge" ADD CONSTRAINT "char_cyberware_bridge_fk13" FOREIGN KEY ("cyberaudio_suite_socket_2") REFERENCES "cyberware_master"("cyberware_master_id");
ALTER TABLE "char_cyberware_bridge" ADD CONSTRAINT "char_cyberware_bridge_fk14" FOREIGN KEY ("cyberaudio_suite_socket_3") REFERENCES "cyberware_master"("cyberware_master_id");

ALTER TABLE "char_cyberware_bridge" ADD COLUMN "internal_cyberware_socket_1" integer NOT NULL DEFAULT '0';
ALTER TABLE "char_cyberware_bridge" ADD COLUMN "internal_cyberware_socket_2" integer NOT NULL DEFAULT '0';
ALTER TABLE "char_cyberware_bridge" ADD COLUMN "internal_cyberware_socket_3" integer NOT NULL DEFAULT '0';
ALTER TABLE "char_cyberware_bridge" ADD COLUMN "internal_cyberware_socket_4" integer NOT NULL DEFAULT '0';
ALTER TABLE "char_cyberware_bridge" ADD COLUMN "internal_cyberware_socket_5" integer NOT NULL DEFAULT '0';
ALTER TABLE "char_cyberware_bridge" ADD COLUMN "internal_cyberware_socket_6" integer NOT NULL DEFAULT '0';
ALTER TABLE "char_cyberware_bridge" ADD COLUMN "internal_cyberware_socket_7" integer NOT NULL DEFAULT '0';

ALTER TABLE "char_cyberware_bridge" ADD CONSTRAINT "char_cyberware_bridge_fk15" FOREIGN KEY ("internal_cyberware_socket_1") REFERENCES "cyberware_master"("cyberware_master_id");
ALTER TABLE "char_cyberware_bridge" ADD CONSTRAINT "char_cyberware_bridge_fk16" FOREIGN KEY ("internal_cyberware_socket_2") REFERENCES "cyberware_master"("cyberware_master_id");
ALTER TABLE "char_cyberware_bridge" ADD CONSTRAINT "char_cyberware_bridge_fk17" FOREIGN KEY ("internal_cyberware_socket_3") REFERENCES "cyberware_master"("cyberware_master_id");
ALTER TABLE "char_cyberware_bridge" ADD CONSTRAINT "char_cyberware_bridge_fk18" FOREIGN KEY ("internal_cyberware_socket_4") REFERENCES "cyberware_master"("cyberware_master_id");
ALTER TABLE "char_cyberware_bridge" ADD CONSTRAINT "char_cyberware_bridge_fk19" FOREIGN KEY ("internal_cyberware_socket_5") REFERENCES "cyberware_master"("cyberware_master_id");
ALTER TABLE "char_cyberware_bridge" ADD CONSTRAINT "char_cyberware_bridge_fk20" FOREIGN KEY ("internal_cyberware_socket_6") REFERENCES "cyberware_master"("cyberware_master_id");
ALTER TABLE "char_cyberware_bridge" ADD CONSTRAINT "char_cyberware_bridge_fk21" FOREIGN KEY ("internal_cyberware_socket_7") REFERENCES "cyberware_master"("cyberware_master_id");

ALTER TABLE "char_cyberware_bridge" ADD COLUMN "external_cyberware_armor" integer NOT NULL DEFAULT '0';

ALTER TABLE "char_cyberware_bridge" ADD CONSTRAINT "char_cyberware_bridge_fk22" FOREIGN KEY ("external_cyberware_armor") REFERENCES "cyberware_master"("cyberware_master_id");

ALTER TABLE "char_cyberware_bridge" ADD COLUMN "right_cyberarm" boolean NOT NULL DEFAULT FALSE;
ALTER TABLE "char_cyberware_bridge" ADD COLUMN "right_cyberarm_socket_1" integer NOT NULL DEFAULT '0';
ALTER TABLE "char_cyberware_bridge" ADD COLUMN "right_cyberarm_socket_2" integer NOT NULL DEFAULT '0';
ALTER TABLE "char_cyberware_bridge" ADD COLUMN "right_cyberarm_socket_3" integer NOT NULL DEFAULT '0';
ALTER TABLE "char_cyberware_bridge" ADD COLUMN "right_cyberarm_socket_4" integer NOT NULL DEFAULT '0';

ALTER TABLE "char_cyberware_bridge" ADD CONSTRAINT "char_cyberware_bridge_fk23" FOREIGN KEY ("right_cyberarm_socket_1") REFERENCES "cyberware_master"("cyberware_master_id");
ALTER TABLE "char_cyberware_bridge" ADD CONSTRAINT "char_cyberware_bridge_fk24" FOREIGN KEY ("right_cyberarm_socket_2") REFERENCES "cyberware_master"("cyberware_master_id");
ALTER TABLE "char_cyberware_bridge" ADD CONSTRAINT "char_cyberware_bridge_fk25" FOREIGN KEY ("right_cyberarm_socket_3") REFERENCES "cyberware_master"("cyberware_master_id");
ALTER TABLE "char_cyberware_bridge" ADD CONSTRAINT "char_cyberware_bridge_fk26" FOREIGN KEY ("right_cyberarm_socket_4") REFERENCES "cyberware_master"("cyberware_master_id");

ALTER TABLE "char_cyberware_bridge" ADD COLUMN "left_cyberarm" boolean NOT NULL DEFAULT FALSE;
ALTER TABLE "char_cyberware_bridge" ADD COLUMN "left_cyberarm_socket_1" integer NOT NULL DEFAULT '0';
ALTER TABLE "char_cyberware_bridge" ADD COLUMN "left_cyberarm_socket_2" integer NOT NULL DEFAULT '0';
ALTER TABLE "char_cyberware_bridge" ADD COLUMN "left_cyberarm_socket_3" integer NOT NULL DEFAULT '0';
ALTER TABLE "char_cyberware_bridge" ADD COLUMN "left_cyberarm_socket_4" integer NOT NULL DEFAULT '0';

ALTER TABLE "char_cyberware_bridge" ADD CONSTRAINT "char_cyberware_bridge_fk27" FOREIGN KEY ("left_cyberarm_socket_1") REFERENCES "cyberware_master"("cyberware_master_id");
ALTER TABLE "char_cyberware_bridge" ADD CONSTRAINT "char_cyberware_bridge_fk28" FOREIGN KEY ("left_cyberarm_socket_2") REFERENCES "cyberware_master"("cyberware_master_id");
ALTER TABLE "char_cyberware_bridge" ADD CONSTRAINT "char_cyberware_bridge_fk29" FOREIGN KEY ("left_cyberarm_socket_3") REFERENCES "cyberware_master"("cyberware_master_id");
ALTER TABLE "char_cyberware_bridge" ADD CONSTRAINT "char_cyberware_bridge_fk30" FOREIGN KEY ("left_cyberarm_socket_4") REFERENCES "cyberware_master"("cyberware_master_id");

ALTER TABLE "char_cyberware_bridge" ADD COLUMN "right_cyberleg" boolean NOT NULL DEFAULT FALSE;
ALTER TABLE "char_cyberware_bridge" ADD COLUMN "right_cyberleg_socket_1" integer NOT NULL DEFAULT '0';
ALTER TABLE "char_cyberware_bridge" ADD COLUMN "right_cyberleg_socket_2" integer NOT NULL DEFAULT '0';
ALTER TABLE "char_cyberware_bridge" ADD COLUMN "right_cyberleg_socket_3" integer NOT NULL DEFAULT '0';

ALTER TABLE "char_cyberware_bridge" ADD CONSTRAINT "char_cyberware_bridge_fk31" FOREIGN KEY ("right_cyberleg_socket_1") REFERENCES "cyberware_master"("cyberware_master_id");
ALTER TABLE "char_cyberware_bridge" ADD CONSTRAINT "char_cyberware_bridge_fk32" FOREIGN KEY ("right_cyberleg_socket_2") REFERENCES "cyberware_master"("cyberware_master_id");
ALTER TABLE "char_cyberware_bridge" ADD CONSTRAINT "char_cyberware_bridge_fk33" FOREIGN KEY ("right_cyberleg_socket_3") REFERENCES "cyberware_master"("cyberware_master_id");

ALTER TABLE "char_cyberware_bridge" ADD COLUMN "left_cyberleg" boolean NOT NULL DEFAULT FALSE;
ALTER TABLE "char_cyberware_bridge" ADD COLUMN "left_cyberleg_socket_1" integer NOT NULL DEFAULT '0';
ALTER TABLE "char_cyberware_bridge" ADD COLUMN "left_cyberleg_socket_2" integer NOT NULL DEFAULT '0';
ALTER TABLE "char_cyberware_bridge" ADD COLUMN "left_cyberleg_socket_3" integer NOT NULL DEFAULT '0';

ALTER TABLE "char_cyberware_bridge" ADD CONSTRAINT "char_cyberware_bridge_fk34" FOREIGN KEY ("left_cyberleg_socket_1") REFERENCES "cyberware_master"("cyberware_master_id");
ALTER TABLE "char_cyberware_bridge" ADD CONSTRAINT "char_cyberware_bridge_fk35" FOREIGN KEY ("left_cyberleg_socket_2") REFERENCES "cyberware_master"("cyberware_master_id");
ALTER TABLE "char_cyberware_bridge" ADD CONSTRAINT "char_cyberware_bridge_fk36" FOREIGN KEY ("left_cyberleg_socket_3") REFERENCES "cyberware_master"("cyberware_master_id");

ALTER TABLE "char_cyberware_bridge" ADD COLUMN "fashion_socket_1" integer NOT NULL DEFAULT '0';
ALTER TABLE "char_cyberware_bridge" ADD COLUMN "fashion_socket_2" integer NOT NULL DEFAULT '0';
ALTER TABLE "char_cyberware_bridge" ADD COLUMN "fashion_socket_3" integer NOT NULL DEFAULT '0';
ALTER TABLE "char_cyberware_bridge" ADD COLUMN "fashion_socket_4" integer NOT NULL DEFAULT '0';
ALTER TABLE "char_cyberware_bridge" ADD COLUMN "fashion_socket_5" integer NOT NULL DEFAULT '0';
ALTER TABLE "char_cyberware_bridge" ADD COLUMN "fashion_socket_6" integer NOT NULL DEFAULT '0';
ALTER TABLE "char_cyberware_bridge" ADD COLUMN "fashion_socket_7" integer NOT NULL DEFAULT '0';

ALTER TABLE "char_cyberware_bridge" ADD CONSTRAINT "char_cyberware_bridge_fk37" FOREIGN KEY ("fashion_socket_1") REFERENCES "cyberware_master"("cyberware_master_id");
ALTER TABLE "char_cyberware_bridge" ADD CONSTRAINT "char_cyberware_bridge_fk38" FOREIGN KEY ("fashion_socket_2") REFERENCES "cyberware_master"("cyberware_master_id");
ALTER TABLE "char_cyberware_bridge" ADD CONSTRAINT "char_cyberware_bridge_fk39" FOREIGN KEY ("fashion_socket_3") REFERENCES "cyberware_master"("cyberware_master_id");
ALTER TABLE "char_cyberware_bridge" ADD CONSTRAINT "char_cyberware_bridge_fk40" FOREIGN KEY ("fashion_socket_4") REFERENCES "cyberware_master"("cyberware_master_id");
ALTER TABLE "char_cyberware_bridge" ADD CONSTRAINT "char_cyberware_bridge_fk41" FOREIGN KEY ("fashion_socket_5") REFERENCES "cyberware_master"("cyberware_master_id");
ALTER TABLE "char_cyberware_bridge" ADD CONSTRAINT "char_cyberware_bridge_fk42" FOREIGN KEY ("fashion_socket_6") REFERENCES "cyberware_master"("cyberware_master_id");
ALTER TABLE "char_cyberware_bridge" ADD CONSTRAINT "char_cyberware_bridge_fk43" FOREIGN KEY ("fashion_socket_7") REFERENCES "cyberware_master"("cyberware_master_id");



CREATE TABLE "misc_gear_master" (
	"misc_gear_master_id" serial NOT NULL,
	"name" varchar NOT NULL,
	"description" varchar NOT NULL,
	"price" integer NOT NULL DEFAULT '0'
	CONSTRAINT "misc_gear_master_pk" PRIMARY KEY ("misc_gear_master_id")
	) WITH (
	OIDS=FALSE
	);

CREATE TABLE "misc_gear_bridge" (
	"misc_gear_bridge_id" serial NOT NULL,
	"char_id" integer NOT NULL,
	"misc_gear_id" integer NOT NULL,
	CONSTRAINT "misc_gear_bridge_pk" PRIMARY KEY ("misc_gear_bridge_id")
	) wiTH (
	OIDS=FALSE
	);

ALTER TABLE "misc_gear_master" ADD COLUMN "price" integer NOT NULL DEFAULT '0';
	
ALTER TABLE "misc_gear_bridge" ADD CONSTRAINT "misc_gear_bridge_fk0" FOREIGN KEY ("char_id") REFERENCES "character"("id");
ALTER TABLE "misc_gear_bridge" ADD CONSTRAINT "misc_gear_bridge_fk1" FOREIGN KEY ("misc_gear_id") REFERENCES "misc_gear_master"("misc_gear_master_id");

ALTER TABLE "character" ADD CONSTRAINT "character_fk0" FOREIGN KEY ("user_id") REFERENCES "user"("id");


ALTER TABLE "character_weapons_bridge" ADD CONSTRAINT "character_weapons_bridge_fk0" FOREIGN KEY ("char_id") REFERENCES "character"("id");
ALTER TABLE "character_weapons_bridge" ADD CONSTRAINT "character_weapons_bridge_fk1" FOREIGN KEY ("weapon_id") REFERENCES "weapon_master"("weapon_master_id");
ALTER TABLE "character_weapons_bridge" ADD CONSTRAINT "character_weapons_bridge_fk2" FOREIGN KEY ("weapon_mod_1") REFERENCES "weapon_mod1_master"("weapon_mod1_master_id");
ALTER TABLE "character_weapons_bridge" ADD CONSTRAINT "character_weapons_bridge_fk3" FOREIGN KEY ("weapon_mod_2") REFERENCES "weapon_mod2_master"("weapon_mod2_master_id");


ALTER TABLE "char_armor_bridge" ADD CONSTRAINT "char_armor_bridge_fk0" FOREIGN KEY ("char_id") REFERENCES "character"("id");
ALTER TABLE "char_armor_bridge" ADD CONSTRAINT "char_armor_bridge_fk1" FOREIGN KEY ("armor_id") REFERENCES "armor_master"("armor_master_id");
ALTER TABLE "char_armor_bridge" ADD CONSTRAINT "char_armor_bridge_fk2" FOREIGN KEY ("armor_mod_1") REFERENCES "armor_mod_master"("armor_mod_master_id");
ALTER TABLE "char_armor_bridge" ADD CONSTRAINT "char_armor_bridge_fk3" FOREIGN KEY ("armor_mod_2") REFERENCES "armor_mod_master"("armor_mod_master_id");


ALTER TABLE "char_status" ADD CONSTRAINT "char_status_fk0" FOREIGN KEY ("char_id") REFERENCES "character"("id");

ALTER TABLE "char_cyberware_bridge" ADD CONSTRAINT "char_cyberware_bridge_fk0" FOREIGN KEY ("char_id") REFERENCES "character"("id");


SELECT * FROM "character_weapons_bridge"
JOIN "weapons_master" ON "weapons_master".weapon_id = "character_weapons_bridge".weapon_id
JOIN "weapon_mod1_master" ON "weapon_mod1_master".weapon_mod1_id = "character_weapons_bridge".weapon_mod_1
JOIN "weapon_mod2_master" ON "weapon_mod2_master".weapon_mod2_id = "character_weapons_bridge".weapon_mod_2
WHERE char_id = 1
ORDER BY id ASC

select * from "weapon_master";