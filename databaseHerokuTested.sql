CREATE TABLE
	"user" (
		"id" SERIAL PRIMARY KEY,
		"username" VARCHAR(80) UNIQUE NOT NULL,
		"password" VARCHAR(1000) NOT NULL,
		"user_type" INT NOT NULL
	);

CREATE TABLE campaigns (
    campaign_id SERIAL PRIMARY KEY,
    campaign_name character varying NOT NULL
);

CREATE TABLE character (
    id SERIAL PRIMARY KEY,
    user_id integer NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
    handle character varying NOT NULL,
    player character varying NOT NULL,
    is_paramedical boolean NOT NULL DEFAULT false,
    strength integer NOT NULL DEFAULT 1,
    body integer NOT NULL DEFAULT 1,
    reflexes integer NOT NULL DEFAULT 1,
    appearance integer NOT NULL DEFAULT 1,
    cool integer NOT NULL DEFAULT 1,
    street_cred integer NOT NULL DEFAULT 0,
    intelligence integer NOT NULL DEFAULT 1,
    willpower integer NOT NULL DEFAULT 1,
    technique integer NOT NULL DEFAULT 1,
    athletics integer NOT NULL DEFAULT 0,
    brawling integer NOT NULL DEFAULT 0,
    concentration integer NOT NULL DEFAULT 0,
    evasion integer NOT NULL DEFAULT 0,
    fast_talk integer NOT NULL DEFAULT 0,
    firearms integer NOT NULL DEFAULT 0,
    legerdemain integer NOT NULL DEFAULT 0,
    melee_weapons integer NOT NULL DEFAULT 0,
    perception integer NOT NULL DEFAULT 0,
    streetwise integer NOT NULL DEFAULT 0,
    demolitions integer NOT NULL DEFAULT 0,
    drive_land integer NOT NULL DEFAULT 0,
    drive_exotic integer NOT NULL DEFAULT 0,
    etiquette integer NOT NULL DEFAULT 0,
    exotic_weapons integer NOT NULL DEFAULT 0,
    heavy_weapons integer NOT NULL DEFAULT 0,
    performance integer NOT NULL DEFAULT 0,
    stealth integer NOT NULL DEFAULT 0,
    survival integer NOT NULL DEFAULT 0,
    tracking integer NOT NULL DEFAULT 0,
    business integer NOT NULL DEFAULT 0,
    cryptography integer NOT NULL DEFAULT 0,
    cyber_tech integer NOT NULL DEFAULT 0,
    investigation integer NOT NULL DEFAULT 0,
    first_aid integer NOT NULL DEFAULT 0,
    paramed integer NOT NULL DEFAULT 0,
    gambling integer NOT NULL DEFAULT 0,
    language integer NOT NULL DEFAULT 0,
    military_tech integer NOT NULL DEFAULT 0,
    science integer NOT NULL DEFAULT 0,
    vehicle_tech integer NOT NULL DEFAULT 0,
    med_surgery integer NOT NULL DEFAULT 0,
    med_pharma integer NOT NULL DEFAULT 0,
    med_cryo integer NOT NULL DEFAULT 0,
    medtech_available integer NOT NULL DEFAULT 0,
    maker_field integer NOT NULL DEFAULT 0,
    maker_upgrade integer NOT NULL DEFAULT 0,
    maker_fab integer NOT NULL DEFAULT 0,
    maker_invent integer NOT NULL DEFAULT 0,
    maker_available integer NOT NULL DEFAULT 0,
    rockerboy integer NOT NULL DEFAULT 0,
    solo integer NOT NULL DEFAULT 0,
    netrunner integer NOT NULL DEFAULT 0,
    nomad integer NOT NULL DEFAULT 0,
    media integer NOT NULL DEFAULT 0,
    medtech integer NOT NULL DEFAULT 0,
    maker integer NOT NULL DEFAULT 0,
    max_health integer NOT NULL DEFAULT 10,
    perm_humanity_loss integer NOT NULL DEFAULT 40,
    max_luck integer NOT NULL DEFAULT 4,
    max_xp integer NOT NULL DEFAULT 0,
    spent_xp integer NOT NULL DEFAULT 0,
    bank integer NOT NULL DEFAULT 0,
    cyber_strength integer NOT NULL DEFAULT 0,
    cyber_body integer NOT NULL DEFAULT 0,
    cyber_reflexes integer NOT NULL DEFAULT 0,
    cyber_appearance integer NOT NULL DEFAULT 0,
    cyber_cool integer NOT NULL DEFAULT 0,
    cyber_intelligence integer NOT NULL DEFAULT 0,
    temp_humanity_loss integer NOT NULL DEFAULT 0,
    cyberdeck_slots integer NOT NULL DEFAULT 0,
    nomad_vehicle_slots integer NOT NULL DEFAULT 0,
    campaign integer NOT NULL DEFAULT 1 REFERENCES campaigns(campaign_id) ON DELETE CASCADE
);

INSERT INTO "public"."campaigns"("campaign_id","campaign_name")
VALUES
(1,E'Unknown/Undecided');

CREATE TABLE char_status (
    char_status_id SERIAL PRIMARY KEY,
    char_id integer NOT NULL REFERENCES character(id) ON DELETE CASCADE,
    current_stun integer NOT NULL,
    current_lethal integer NOT NULL,
    current_agg integer NOT NULL,
    current_luck_loss integer NOT NULL,
    current_armor_quality integer NOT NULL DEFAULT 0,
    current_shield_quality integer NOT NULL DEFAULT 0,
    current_cyberware_armor_quality integer NOT NULL DEFAULT 0,
    current_cyberware_health_boxes integer NOT NULL DEFAULT 0,
    current_cyberware_armor_loss integer NOT NULL DEFAULT 0
);

CREATE TABLE weapon_master (
    weapon_master_id SERIAL PRIMARY KEY,
    name character varying NOT NULL,
    damage integer NOT NULL,
    dmg_type character varying NOT NULL,
    range integer NOT NULL,
    rof integer NOT NULL,
    max_clip integer NOT NULL,
    hands integer NOT NULL,
    concealable boolean NOT NULL DEFAULT false,
    price integer NOT NULL DEFAULT 0,
    is_treasure boolean NOT NULL DEFAULT false,
    description character varying NOT NULL DEFAULT 'placeholder'::character varying
);

CREATE TABLE char_weapons_bridge (
    weapon_bridge_id SERIAL PRIMARY KEY,
    char_id integer NOT NULL REFERENCES character(id) ON DELETE CASCADE,
    weapon_id integer NOT NULL REFERENCES weapon_master(weapon_master_id),
    current_shots_fired integer NOT NULL,
    equipped boolean NOT NULL DEFAULT false
);

CREATE TABLE armor_master (
    armor_master_id SERIAL PRIMARY KEY,
    name character varying NOT NULL DEFAULT 'name'::character varying,
    quality integer NOT NULL DEFAULT 0,
    price integer NOT NULL DEFAULT 0,
    description character varying NOT NULL DEFAULT 'desc'::character varying
);

-- MASTER ARMOR INSERT 

CREATE TABLE char_armor_bridge (
    armor_bridge_id SERIAL PRIMARY KEY,
    char_id integer NOT NULL REFERENCES character(id) ON DELETE CASCADE,
    armor_id integer NOT NULL REFERENCES armor_master(armor_master_id),
    this_armor_loss integer NOT NULL DEFAULT 0,
    equipped boolean NOT NULL DEFAULT false
);

CREATE TABLE shield_master (
    shield_master_id SERIAL PRIMARY KEY,
    quality integer NOT NULL DEFAULT 0,
    price integer NOT NULL DEFAULT 0,
    name character varying NOT NULL DEFAULT 'name'::character varying,
    description character varying NOT NULL DEFAULT 'desc'::character varying
);

-- MASTER SHIELD INSERT

CREATE TABLE char_shield_bridge (
    shield_bridge_id SERIAL PRIMARY KEY,
    char_id integer NOT NULL REFERENCES character(id) ON DELETE CASCADE,
    shield_id integer NOT NULL REFERENCES shield_master(shield_master_id),
    this_shield_loss integer NOT NULL DEFAULT 0,
    equipped boolean NOT NULL DEFAULT false
);

CREATE TABLE grenade_master (
    grenade_master_id SERIAL PRIMARY KEY,
    name character varying NOT NULL,
    description character varying NOT NULL DEFAULT 'PLACEHOLDER'::character varying,
    price integer NOT NULL DEFAULT 0,
    is_treasure boolean NOT NULL DEFAULT false
);

-- MASTER GRENADE INSERT

CREATE TABLE char_grenade_bridge (
    grenade_bridge_id SERIAL PRIMARY KEY,
    char_id integer NOT NULL REFERENCES character(id) ON DELETE CASCADE REFERENCES character(id) ON DELETE CASCADE,
    grenade_id integer NOT NULL REFERENCES grenade_master(grenade_master_id) ON DELETE CASCADE
);

CREATE TABLE cyberware_master (
    cyberware_master_id SERIAL PRIMARY KEY,
    name character varying NOT NULL,
    type character varying NOT NULL DEFAULT 'fashionware'::character varying,
    install_level character varying NOT NULL DEFAULT 'mall'::character varying,
    description character varying NOT NULL DEFAULT '0'::character varying,
    price integer NOT NULL DEFAULT 100,
    humanity_loss_min integer NOT NULL DEFAULT 1,
    humanity_loss_max integer NOT NULL DEFAULT 1,
    is_treasure boolean NOT NULL DEFAULT false
);

-- MASTER TABLE INSERT 

CREATE TABLE char_cyberware_bridge (
    cyberware_bridge_id SERIAL PRIMARY KEY,
    char_id integer NOT NULL REFERENCES character(id) ON DELETE CASCADE,
    fashionware_slots integer NOT NULL DEFAULT 7,
    neuralware_slots integer NOT NULL DEFAULT 0,
    cyberoptic_slots integer NOT NULL DEFAULT 0,
    cyberaudio_slots integer NOT NULL DEFAULT 0,
    internalware_slots integer NOT NULL DEFAULT 7,
    externalware_slots integer NOT NULL DEFAULT 1,
    cyberarm_slots integer NOT NULL DEFAULT 0,
    cyberleg_slots integer NOT NULL DEFAULT 0
);

CREATE TABLE char_owned_cyberware (
    owned_cyberware_id SERIAL PRIMARY KEY,
    char_id integer NOT NULL REFERENCES character(id) ON DELETE CASCADE,
    cyberware_master_id integer NOT NULL REFERENCES cyberware_master(cyberware_master_id),
    equipped boolean NOT NULL DEFAULT false
);

CREATE TABLE misc_gear_master (
    misc_gear_master_id SERIAL PRIMARY KEY,
    name character varying NOT NULL,
    description character varying NOT NULL,
    price integer NOT NULL DEFAULT 0
);

-- misc gear master insert

CREATE TABLE char_gear_bridge (
    char_gear_bridge_id SERIAL PRIMARY KEY,
    char_id integer NOT NULL REFERENCES character(id) ON DELETE CASCADE,
    misc_gear_id integer NOT NULL REFERENCES misc_gear_master(misc_gear_master_id)
);

CREATE TABLE vehicle_master (
    vehicle_master_id SERIAL PRIMARY KEY,
    name character varying NOT NULL,
    description character varying NOT NULL,
    type character varying NOT NULL,
    health integer NOT NULL,
    seats integer NOT NULL,
    move integer NOT NULL,
    mph integer NOT NULL,
    price integer NOT NULL DEFAULT 0
);
-- vehicle insert

CREATE TABLE vehicle_mod_master (
    vehicle_mod_master_id SERIAL PRIMARY KEY,
    name character varying NOT NULL,
    description character varying NOT NULL,
    type character varying NOT NULL,
    price integer NOT NULL
);
-- mod insert

CREATE TABLE char_vehicle_bridge (
    vehicle_bridge_id SERIAL PRIMARY KEY,
    char_id integer NOT NULL REFERENCES character(id) ON DELETE CASCADE,
    vehicle_id integer NOT NULL REFERENCES vehicle_master(vehicle_master_id),
    current_damage integer NOT NULL DEFAULT 0,
    current_armor_damage integer NOT NULL DEFAULT 0,
    total_mod_cost integer NOT NULL DEFAULT 0,
    has_armor boolean NOT NULL DEFAULT false,
    extra_seats integer NOT NULL DEFAULT 0
);

CREATE TABLE char_owned_vehicle_mods (
    char_owned_vehicle_mods_id SERIAL PRIMARY KEY,
    char_id integer NOT NULL REFERENCES character(id) ON DELETE CASCADE,
    vehicle_mod_master_id integer NOT NULL REFERENCES vehicle_mod_master(vehicle_mod_master_id),
    equipped boolean NOT NULL DEFAULT false
);

CREATE TABLE char_vehicle_mod_bridge (
    char_vehicle_mod_bridge_id SERIAL PRIMARY KEY,
    vehicle_bridge_id integer NOT NULL REFERENCES char_vehicle_bridge(vehicle_bridge_id) ON DELETE CASCADE,
    char_owned_vehicle_mods_id integer NOT NULL REFERENCES char_owned_vehicle_mods(char_owned_vehicle_mods_id)
);

CREATE TABLE netrunner_master (
    netrunner_master_id SERIAL PRIMARY KEY,
    name character varying NOT NULL,
    description character varying NOT NULL,
    price integer NOT NULL DEFAULT 0,
    type character varying NOT NULL,
    slots integer NOT NULL DEFAULT 0,
    perception integer NOT NULL DEFAULT 0,
    speed integer NOT NULL DEFAULT 0,
    attack integer NOT NULL DEFAULT 0,
    defense integer NOT NULL DEFAULT 0,
    rez integer NOT NULL DEFAULT 0
);

-- insert master netrunner

CREATE TABLE netrunner_bridge (
    netrunner_bridge_id SERIAL PRIMARY KEY,
    char_id integer NOT NULL REFERENCES character(id) ON DELETE CASCADE,
    netrunner_master_id integer NOT NULL REFERENCES netrunner_master(netrunner_master_id),
    equipped boolean NOT NULL DEFAULT false
);

CREATE TABLE armor_mod_master (
    armor_mod_master_id SERIAL PRIMARY KEY,
    name character varying NOT NULL
);

CREATE TABLE char_notes (
    char_note_id SERIAL PRIMARY KEY,
    char_id integer NOT NULL REFERENCES character(id),
    title character varying(400),
    body text,
    favorite boolean NOT NULL DEFAULT false
);

CREATE TABLE contact_master (
    contact_master_id SERIAL PRIMARY KEY,
    campaign_id integer NOT NULL REFERENCES campaigns(campaign_id),
    name character varying(400),
    connection integer NOT NULL DEFAULT 0,
    description text
);

CREATE TABLE char_contact_bridge (
    char_contact_id SERIAL PRIMARY KEY,
    char_id integer NOT NULL REFERENCES character(id) ON DELETE CASCADE,
    contact_id integer NOT NULL REFERENCES contact_master(contact_master_id) ON DELETE CASCADE,
    loyalty integer NOT NULL DEFAULT 0,
    notes text NOT NULL DEFAULT 'My Notes here.'::text
);

CREATE TABLE clothing_master (
    clothing_master_id SERIAL PRIMARY KEY,
    name character varying(80) NOT NULL,
    description text NOT NULL,
    quality integer NOT NULL DEFAULT 0
);

-- clothing master insert

CREATE TABLE char_clothing_bridge (
    clothing_bridge_id SERIAL PRIMARY KEY,
    char_id integer NOT NULL REFERENCES character(id) ON DELETE CASCADE,
    clothing_id integer NOT NULL REFERENCES clothing_master(clothing_master_id) ON DELETE CASCADE,
    rank integer NOT NULL DEFAULT 1,
    equipped boolean NOT NULL DEFAULT false
);

INSERT INTO "public"."armor_master"("name","quality","price","description")
VALUES
(E'Clothes',1,10,'Standard clothing with mild antiballistic properties.'),
(E'Leathers',2,20,'Not even slightly bulletproof, but offers protection against small clubs.'),
(E'Kevlar',3,50,'Offers decent protection for the vitals at a bargain price.'),
(E'Light Armorjack',4,100,'Full body armor of the lightest kind.'),
(E'Medium Armorjack',5,500,'A plain suit of modern armor, completely undisguisable as anything else.'),
(E'Heavy Armorjack',6,1000,'The descendent of SWAT armor and platemail, offering considerable protection to the wearer.'),
(E'Full Flak',7,2000,'Standard military issue gear, designed to keep the wearer alive through some SHIT.'),
(E'Metalgear',8,5000,'Advanced composite alloys and strategic plating offering the best possible protection.'),
(E'Armored Trench Coat',4,1000,'A somewhat less obtrusive piece of gear, allowing an edgerunner to armor up in public. Not especially fancy, and it does not breathe. Expect a certain amount of musk.'),
(E'Fancy Armored Suit',4,2500,'A stylish, high class looking bit of body armor. Common amongst Corpos with reason to suspect they are less loved than they should be. Also, it breathes.'),
(E'Military Grade Powered Armor',10,25000,'Sometimes you gotta send in the Space Marines. +2 Dice to any strength rolls. Armor is considered Hardened (see rules)');

INSERT INTO "public"."shield_master"("quality","price","name","description")
VALUES
(1,500,E'Runner\'s Buckler',E'A small shield, useful for deflecting gangers and salesmen.'),
(2,1000,E'Riot Shield',E'A full sized shield offering decent protection.');

INSERT INTO "public"."armor_mod_master"("name")
VALUES
('No mod equipped');

INSERT INTO "public"."clothing_master"("name","description","quality")
VALUES
('Vendomat Skinnies','Very cheap clothing similar to scrubs, available from Vendomats across the city.',0),
('Bag Lady Chic','Clothing that can might have come from any pawn shop or lost and found, layered with some tasteful dirt.',0),
('Leisurewear','Athletic fit clothing that eschews zippers and buttons in favor of string and spandex.',1),
('Generic Chic','Generic, comfortable clothing available everywhere from better Vendomats and shops.',1),
('Bohemian','Folksy, retro style clothing that shows off your free spirit and willingness to spend time in thrift stores.',1),
('Ganger Brights','Brightly colored clothes chosen to signify ones allegiance to a street gang.',1),
('Nomad Leathers','Rugged, neo-tribal clothing made to last.',2),
('Urban Flash','High tech clothes that show off your taste and give a sense of presence.',2),
('Businesswear','Suits still have a place, and hey - they always look good.',2),
('Asia Pop','Sharp and cutting edge, this outfit says you are down with the youth culture. Mixes ancient influences with modern aesthetics.',2),
('High Fashion','Not a style on its own, but one of the other styles custom tailored and made from the finest materials.',3);

INSERT INTO "public"."grenade_master"("name","description","price","is_treasure")
VALUES
('Fragmentation',E'Deals 12 lethal damage in a 4x4 meter area, and half that in an 8x8 meter area.',100,FALSE),
('Flashbang',E'Deals 10 stun damage in a 6x6 meter area.',50,FALSE),
('Smoke',E'Creates a cloud of thick, noxious smoke that fills a 4x4 meter area, and spreads 1 meter a turn for 20 turns. Can fill an enclosed space, otherwise stops at a 10x10 meter area.',50,FALSE),
('EMP',E'Releases a disruptive electrical charge. Deals 8 stun damage to most people, but convert one wound to lethal for each health box created by cyberware. Deals lethal damage to drones and robots; their armor cannot be hardened against this damage.',500,FALSE),
('"Holy Water"',E'A glass vessel filled with a volatile acid. Deals 3 Aggravated damage in a 2x2 area.',500,TRUE);

INSERT INTO "public"."misc_gear_master"("name","description","price")
VALUES
('Agent','Adaptive AI Smartphone',100),
('Airhypo','Easy to use drug injection device',20),
('Anti-Smog Breathing Mask','Helpful for filtering out the omnipresent airborne toxins in the city.',20),
('Audio Recorder','Records audio onto onboard chips. ',100),
('Auto Level Dampening Ear Protectors','Compact ear protection, making the user immune to the effecs caused by dangerously loud sounds while still allowing whispered conversation.',500),
('Binoculars','Adjustable and highly flexible, allowing for up to 12x magnification',50),
('Braindance Viewer','Allows the wearer to experience braindance chips.',1000),
('Bug detector','Discreet tool that can detect video and listening devices',500),
('Camping Gear','2 person tent, self inflating mattress and sleeping bag, stakes, tarp, and other necessaries for street living.',75),
('Carryall','A bag with carrying handles and a shoulder strap',20),
('Chemical Analyzer','Handheld device that can provide chemical analysis of the air or provided samples.',1000),
('Computer','A portable computer with a touchscreen and keyboard. Durable and hardy.',50),
('Cryopump','A portable slip for a single person with a cryo unit. See Role Abilities: Medtech',2500),
('Cryotank','An installed tank and associated hardware. See Role Abilities: Medtech',5000),
('Disposable Cell Phone','It makes calls and not much else.',5),
('Drum Syntheizer','When attached to an amp, produces pre-programmed drumbeats',50),
('Duct Tape','Comes in many colors, including glow-in-the-dark',5),
('Instrument','Any device for making music. Electric versions require an amp.',500),
('Flashlight','Rechargeable light with adjustable lenses, extra modes, and programable colors.',20),
('Food Stick','One awful meal in bar form.',5),
('Glow Paint','Glow in the dark spray paint',10),
('Glow Stick','Single use stick that illuminates a small area.',5),
('Grapple Gun','Fires a grappling line up to 30 meters. Bamf!',500),
('Plasticuffs','Plastic Restraints. Can be broken by characters with a Strength of 6 or higher.',10),
('Steel Handcuffs','Steel Restraints. Can be broken by characters with a Strength of 7 or higher.',50),
('Steel Security Handcuffs','Advanced Steel Restraints. Can be broken by characters with a Strength of 9 or higher.',500),
('Homing Tracers','Dime-sized device that can be tracked by a Cyberdeck, Computer, Radio Communicator, Radio Scanner, or many kinds of cyberware.',500),
('Kibble Pack','One meal worth of delicious* human** food***',5),
('Lock Picks','Used to crack mechanical locks.',20),
('Medscanner','Handheld device useful for assessing injuries and illness. Reduces First Aid and Paramedic difficulties by 1.',500),
('Medtech Bag','A full set of emergency medical tools in custom pockets',100),
('Memory Chip','Standard data storage device',5),
('MRE','Self heating ration',5),
('Personal CarePak','Everything a person needs to clean up - cleansing wipes, leave-in nanoshampoo, compostable toothbrush, the works.',10),
('Pocket Amplifier','Battery powered amplifier. Can support 2 instruments for up to 6 hours on a single charge.',50),
('Radar Detector','Beeps when within 2 meters of an active radar beam',500),
('Radio Communicator','Earpiece and bone conduction microphone with a range of roughly 1 mile',100),
('Radio Scrambler','Plug in device that scrambles radio communications. Requires pairing in advance to work properly.',500),
('Road Flare','Lights up a large area for roughly an hour',5),
('Rope (50m)','Just some rope.',20),
('Smart Glasses','Sophisticated HUD glasses that have one cyberoptics cyberware feature, chosen at purchase.',500),
('Techtool','Handy folding multi-tool',50),
('Tool Bag','A full set of everyday tools useful for a variety of situations.',100),
('Tool Bag - Cybertech','A full set of everyday tools useful for dealing with cyberware.',500),
('Tool Bag - Vehicles','A full set of everyday tools useful for working on cars.',500),
('Tool Bag - Exotic','A full set of everyday tools useful for a very special type of equipment, chosen at purchase.',500),
('Vial of deadly poison','A single dose of a deadly poison in a special storage vial. Can be applied to a melee weapon as a complex action, or delivered via other mechanisms. Deals 3 lethal damage when applied to a melee weapon, deals 8 stun damage when ingested or injected. Loses potency in about an hour when exposed to the air.',100),
('Vial of biotoxin','A single dose of a virulent toxin in a special storage vial. Can be applied to a melee weapon as a complex action, or delivered via other mechanisms. Deals 3 aggravated damage when applied to a melee weapon, deals 12 lethal damage when ingested or injected',500),
('Video Camera','Device about the size of a cigar that records audio & video. Can run for about a day on a single charge. Commonly shoulder mounted. Has auto-zoom, movement compensation, and other advanced features.',100),
('Virtuality Goggles','Projects cyberspace imagery over a real world view - helpful for the netrunner on the go.',100),
('Antibiotic','Speeds up natural healing processes, allowing the recovery of one additional wound when the user rolls their body to recover. Multiple doses cannot stack, and it cannot be used with Speedheal. Requires Pharmaceutical Skill to use properly.',500),
('Rapi-Detox','When injected, a user affected by a drug, poison, or other intoxicant is immediately purged of the substance. Aggressively. From both ends. Requires Pharmaceutical Skill to use properly.',500),
('Speedheal','When injected, the user immediately rolls Body (DV 6) and recovers stun and lethal wounds as though they had rested for 1 day. The user immediately loses one temporary humanity point. Can be used on a target no more than once per day. Requires Pharmaceutical Skill to use properly.',500),
('Stim','When administered, the user can ignore all wound penalties for 1 hour. Further, Stun Wounds cannot cause the user to fall unconscious. Requires Pharmaceutical Skill to use properly.',500),
('Surge','A dose of surge allows the target to function without sleep for approximately 48 hours. They immediately lose 1 point of temporary humanity. Consecutive uses without a week or more of rest incur increasing humanity penalties. Requires Pharmaceutical Skill to use properly.',500),
('Selfie Stick','A stick that a camera can be attached to, extends roughly four feet.',10);

INSERT INTO "public"."netrunner_master"("name","description","price","type","slots","perception","speed","attack","defense","rez")
VALUES
(E'Cyberdeck Alpha',E'A basic Deck for Netrunning. Roughly the size of a pack of cigarettes.',500,E'deck',4,0,0,0,0,0),
(E'Cyberdeck Beta',E'An advanced Deck for Netrunning. Slightly larger, more rugged, and much more powerful.',2500,E'deck',5,0,0,0,0,0),
(E'Cyberdeck Delta',E'A sophisticated Deck for Netrunning, with milspec components and a quantum processor. About the size of paperback book, and as rugged as a piece of steel of the same size.',10000,E'deck',6,0,0,0,0,0),
(E'Eraser',E'+1 Dice to Cloak Actions',50,E'software',1,0,0,0,0,3),
(E'See Ya',E'+1 Dice to Pathfinder Actions',50,E'software',1,0,0,0,0,3),
(E'Speedy',E'+1 Dice to Initiative Actions',50,E'software',1,0,0,0,0,3),
(E'Worm',E'+1 Dice to Backdoor Actions',50,E'software',1,0,0,0,0,3),
(E'Greaser',E'+1 Dice to Slide Actions',50,E'software',1,0,0,0,0,3),
(E'Armor',E'+1 Dice to Net Soak Rolls.',50,E'software',1,0,0,0,0,3),
(E'Flak',E'Reduce target program attack to 0. Program immediately deactivates once used.',50,E'software',1,0,0,0,0,3),
(E'Shield',E'On receiving damage in the net, reduce to 0. Program immediately deactivates once used.',50,E'software',1,0,0,0,0,3),
(E'Ban Hammer',E'An elegant weapon from a civilized discussion board.',50,E'software',1,0,0,2,0,3),
(E'Sword',E'A common weapon in the Netrunners arsenal.',50,E'software',1,0,0,1,1,3),
(E'Epic Flail',E'Sometimes you just gotta hope and swing.',50,E'software',1,0,0,0,2,3),
(E'DeckKRASH',E'If this hits a Netrunner, they immediately Jack Out if it does any damage.',500,E'software',1,0,0,0,0,1),
(E'Hellbolt',E'If used on an enemy Netrunner, their cyberdeck will catch on fire if it does any damage',500,E'software',1,0,0,2,0,1),
(E'Nerve Scrub',E'If used on an enemy Netrunner, their Reflexes and Intelligence are lowered by one for 1 hour if the attack does any damage. These effects are psychosomatic and not permanent.',500,E'software',1,0,0,0,0,1),
(E'Poison Pins',E'If used to target an enemy program, the program will be destroyed instead of deactivated if it is de-rezzed.',500,E'software',1,0,0,1,1,3),
(E'Superglue',E'If used on an enemy Netrunner, they can not change levels in the Architecture or voluntarily Jack Out for 1d10/2 rounds.',500,E'software',1,0,0,1,1,3),
(E'Brainfuxx0r',E'If used on an enemy Netrunner, their lose a number of Netrunner actions equal to the damage taken.',500,E'software',1,0,0,1,1,3),
(E'Asp',E'On successful hit, deactivates a program at random. Can combine - each program gives +1 to all stats when doing so.',100,E'black ice',1,5,5,2,2,3),
(E'Giant',E'On successful hit that causes damage, Netrunner is forcibly jacked out.',1000,E'black ice',1,5,1,6,4,6),
(E'Hellhound',E'On a successful hit that causes damage, Netrunner deck catches fire. Can combine - each program gives +1 to all stats when doing so.',500,E'black ice',1,7,6,5,3,4),
(E'Kraken',E'On a successful hit that causes damage, Netrunner cannot change levels of the architecture or Jack Out for 1 round',1000,E'black ice',1,5,2,8,4,6),
(E'Liche',E'On a successful hit that causes damage, Netrunners Reflexes and Intelligence are lowered by one for 1 hour.',500,E'black ice',1,8,6,4,4,8),
(E'Raven',E'Instead of attacking, can change places with a program from a deeper level of the architecture.',100,E'black ice',1,4,4,2,2,3),
(E'Scorpion',E'On a successful hit that causes damage, Netrunners Movement is lowered by 1 for 1 hour.',500,E'black ice',1,5,4,4,4,3),
(E'Skunk',E'Until Derezzed, the Netrunner loses 1 die to all Slide actions. Each Skunk program can affect only 1 Netrunner at a time, but multiple Skunks can stack the effects.',500,E'black ice',1,5,4,4,2,2),
(E'Wisp',E'A basic defensive program that can take a variety of forms. Can combine - each program gives +1 to all stats when doing so.',50,E'black ice',1,5,4,2,2,3),
(E'Dragon',E'If this ICE targets a program, the program will be destroyed instead of deactivated if it is de-rezzed',10000,E'black ice',1,8,8,7,7,10),
(E'Killer App',E'If this ICE targets a program, the program will be destroyed instead of deactivated if it is de-rezzed.',1000,E'black ice',1,5,3,8,2,4),
(E'Sabertooth',E'If this ICE targets a program, the program will be destroyed instead of deactivated if it is de-rezzed.',1000,E'black ice',1,5,8,4,2,4),
(E'DNA Lock',E'Deck cannot be accessed or altered without a Cybertech roll against a DV of 8.',100,E'mod',1,0,0,0,0,0),
(E'Hardened Circuitry',E'Cyberdeck cannot be disabled or destroyed by EMP effects.',100,E'mod',1,0,0,0,0,0),
(E'Insulated Wires',E'Cyberdeck cannot catch on fire as the result of enemy programs.',100,E'mod',1,0,0,0,0,0),
(E'Extended Antenna',E'Cyberdeck can connect to wireless access points up to 20 meters away.',100,E'mod',1,0,0,0,0,0),
(E'Backup Drive',E'A program that is destroyed is saved to this drive instead. They can be restored to the Deck with a single meat action.',100,E'mod',1,0,0,0,0,0),
(E'KRASH Barrier',E'Netrunner cannot be Jacked Out involuntarily without depressing a physical button on this device.',500,E'mod',2,0,0,0,0,0),
(E'Langford Parrot',E'Caution: Direct observation of the Parrot may result in catastrophic autoDarwination',500,E'software',1,0,0,3,1,4),
(E'Flaming Sword',E'Like a sword, but on fire.',500,E'software',1,0,0,2,2,4),
(E'Web Launchers',E'Apparently this is a weapon somehow?',500,E'software',1,0,0,1,3,4),
(E'BFG',E'They bring a knife, we bring a rocket launcher.',2500,E'software',1,0,0,4,2,5),
(E'Holy Avenger',E'Yo I think this thing is +5 AND flaming.',2500,E'software',1,0,0,3,3,5),
(E'Zatoichi Walking Stick',E'You can hear how dice fall when holding it.',2500,E'software',1,0,0,2,4,5);

INSERT INTO "public"."vehicle_master"("name","description","type","health","seats","move","mph","price")
VALUES
(E'Scooter',E'A small but mighty wheeled conveyance, useful for a daily commute through traffic.',E'Bike',5,1,10,40,5000),
(E'Roadbike',E'A common sight on Night City streets as an efficient and cheap form of transport.',E'Bike',8,2,15,100,20000),
(E'Superbike',E'A powerful and exotic streetbike capable of extreme speed and high performance.',E'Bike',6,2,25,300,100000),
(E'Compact Groundcar',E'A small, affordable vehicle for the budget conscious driver.',E'Car',14,4,15,100,30000),
(E'High Performance Groundcar',E'A sporty, more playful version of the standard groundcar, with improved performance.',E'Car',14,4,20,200,50000),
(E'Super Groundcar',E'An exotic and sports car, capable of extreme speeds and maneuvers',E'Car',12,2,25,300,100000),
(E'Jet Ski',E'Personal watercraft.',E'Boat',8,2,15,60,20000),
(E'Speedboat',E'High performance watercraft.',E'Boat',12,4,15,60,50000),
(E'Cabin Cruiser',E'Large and luxurious boat that doubles as floating living space. This model has 2 rooms',E'Boat',20,4,6,20,60000),
(E'Cabin Cruiser',E'Large and luxurious boat that doubles as floating living space. This model has 4 rooms',E'Boat',30,8,6,20,120000),
(E'Yacht',E'Customized, massive watercraft with ultraluxe accommodations. Fluffy white cat not included. This model has 4 rooms.',E'Boat',50,16,6,30,200000),
(E'Yacht',E'Customized, massive watercraft with ultraluxe accommodations. Fluffy white cat not included. This model has 8 rooms.',E'Boat',60,32,6,30,400000),
(E'Gyrocopter',E'Smallest possible flying machine - favored by a select few enthusiasts.',E'Air',4,1,10,60,20000),
(E'Helicopter',E'A proper whirlybird flyer, with actual range and safety features.',E'Air',12,4,20,200,50000),
(E'AV-4 Aerodyne',E'A multipurpose vectored thrust flying machine, useful for delivering small groups at high speed.',E'Air',20,6,20,200,100000),
(E'AV-9 Aerodyne',E'Exotic vector thrust vehicle capable of extreme maneuvers',E'Air',12,2,25,300,200000),
(E'Aerozep',E'Modern cargo blimp that can serve as a floating living space. This model has 2 rooms.',E'Air',20,4,10,100,60000),
(E'Aerozep',E'Modern cargo blimp that can serve as a floating living space. This model has 6 rooms.',E'Air',20,12,10,100,180000),
(E'Light SUV',E'A small SUV, built for rugged terrain',E'Car',15,4,15,100,30000),
(E'Full Size SUV',E'A large SUV with ruggedized tires and ample seating and cargo space.',E'Car',20,6,15,120,50000),
(E'Tactical SUV',E'A large SUV built to military specifications.',E'Car',25,6,15,150,100000);

INSERT INTO "public"."vehicle_mod_master"("name","description","type","price")
VALUES
(E'Armored',E'Armors the bike superstructure. Doubles Armor of Vehicle.',E'Bike',5000),
(E'Armored',E'Armors the car chassis and adds bulletproof glass. Doubles Armor of Vehicle.',E'Car',10000),
(E'Armored',E'Armors the boat chassis and adds bulletproof glass. Doubles Armor of Vehicle.',E'Boat',10000),
(E'Armored',E'Armors the aircraft chassis and adds bullet resistant glass. Doubles Armor of Vehicle.',E'Air',15000),
(E'Comm Center',E'Adds communications center, 6 Radio Communicators, Scramblers, Radio Scanner, Homing tracers and tracking device.',E'Car',2000),
(E'Comm Center',E'Adds communications center, 6 Radio Communicators, Scramblers, Radio Scanner, Homing tracers and tracking device.',E'Boat',2000),
(E'NOS',E'Gives bike a short burst of power. Vehicle can make 1 extra move action, but takes 3 unsoakable wounds.',E'Bike',1000),
(E'NOS',E'Gives car a short burst of power. Vehicle can make 1 extra move action, but takes 3 unsoakable wounds.',E'Car',1000),
(E'Onboard Flamethrower',E'Vehicle mounted flamethrower, deals 8 Damage with ROF of 1 and clip of 1. Cannot be reloaded while driving.',E'Bike',5000),
(E'Onboard Flamethrower',E'Vehicle mounted flamethrower, deals 8 Damage with ROF of 1 and clip of 1. Cannot be reloaded while driving.',E'Car',5000),
(E'Onboard Machine Gun',E'Vehicle mounted assault rifle. Can only use autofire actions; cannot be reloaded while driving.',E'Bike',5000),
(E'Onboard Machine Gun',E'Vehicle mounted assault rifle. Can only use autofire actions; cannot be reloaded while driving.',E'Car',5000),
(E'Seating Upgrade',E'Adds 1 seat to vehicle, either by adding a sidecar, expanding the chassis, or something similar. Seat can be rigged to eject.',E'Bike',1000),
(E'Seating Upgrade',E'Adds 1 seat to vehicle, either by adding a sidecar, expanding the chassis, or something similar. Seat can be rigged to eject.',E'Car',1000),
(E'Seating Upgrade',E'Adds 1 seat to vehicle, either by adding a sidecar, expanding the chassis, or something similar. Seat can be rigged to eject.',E'Air',1000),
(E'Security Upgrade',E'Replaces mechanical locks with biometric security. Requires Vehicle Tech DV8 (2+) to bypass, failure results in 10 stun damage/round to intruder. Intruder cannot stop themselves from taking this damage.',E'Bike',6000),
(E'Security Upgrade',E'Replaces mechanical locks with biometric security. Requires Vehicle Tech DV8 (2+) to bypass, failure results in 10 stun damage/round to intruder. Intruder cannot stop themselves from taking this damage.',E'Car',6000),
(E'Security Upgrade',E'Replaces mechanical locks with biometric security. Requires Vehicle Tech DV8 (2+) to bypass, failure results in 10 stun damage/round to intruder. Intruder cannot stop themselves from taking this damage.',E'Boat',6000),
(E'Security Upgrade',E'Replaces mechanical locks with biometric security. Requires Vehicle Tech DV8 (2+) to bypass, failure results in 10 stun damage/round to intruder. Intruder cannot stop themselves from taking this damage.',E'Air',6000),
(E'Smuggling Compartment',E'Installs 1 hidden holster per passenger, capable of holding any concealable weapon. Creates 1 larger space in the vehicle that requires a Perception check to locate.',E'Bike',1000),
(E'Smuggling Compartment',E'Installs 1 hidden holster per passenger, capable of holding any concealable weapon. Creates 1 larger space in the vehicle that requires a Perception check to locate.',E'Car',1000),
(E'Smuggling Compartment',E'Installs 1 hidden holster per passenger, capable of holding any concealable weapon. Creates 2 larger spaces in the vehicle that requires a Perception check to locate.',E'Boat',2000),
(E'Smuggling Compartment',E'Installs 1 hidden holster per passenger, capable of holding any concealable weapon. Creates 2 larger spaces in the vehicle that requires a Perception check to locate.',E'Air',2000),
(E'Heavy Chassis',E'Significantly upgrades the structure of the vehicle, allowing it to tow multiple tons and installing a 100m towing cable. Reduces top speed by 25%',E'Car',5000),
(E'Rocket Pod',E'Requires Heavy Chassis. Installs Rocket Launcher with clip of 3 onto the vehicle.',E'Car',30000),
(E'Heavy Weapon Mount',E'Requires Heavy Chassis. Installs Heavy Cannon (Dam 16, Range 100, ROF 1, Clip 10) onto the vehicle.',E'Car',30000),
(E'Mounted Melee Weapon',E'Very Heavy Melee weapon is mounted on one side of the vehicle. Concealable. Driver can attack using their action; vehicle has effective strength of 4.',E'Bike',3000),
(E'Mounted Melee Weapon',E'Very Heavy Melee weapon is mounted on one side of the vehicle. Concealable. Driver can attack using their action; vehicle has effective strength of 7.',E'Car',3000),
(E'Hover Install',E'Installs a series of powerful fans and a deployable raft to vehicle, allowing it to move on water as a cabin cruiser.',E'Car',4000),
(E'AV-4 Engine Install',E'Adds powerful vectored thrust turbofans to the vehicle, allowing it to fly. While in the air, moves as an AV-4.',E'Car',10000),
(E'Combat Plow',E'When ramming, those inside take no damage. If vehicle has and used NOS mod in the same or previous turn, deals 4 extra damage.',E'Car',1000),
(E'Enhanced Plug Integration',E'While driving, user can attack and dodge as though they were on foot - normal combat movements do not require drive tests.',E'Bike',5000);

INSERT INTO "public"."weapon_master"("name","description","damage","dmg_type","range","rof","max_clip","hands","concealable","price","is_treasure")
VALUES
(E'Light Melee Weapon',E'Light Melee weapons are small, easily concealed items like pocket knives and switchblades. It can also cover small improvised weapons like rocks, broken bottles, and small sticks.',0,E'melee',0,2,0,1,TRUE,10,FALSE),
(E'Medium Melee Weapon',E'Medium Melee weapons are larger, heavier, and unable to be hidden on one\'s person - they include things like truncheons, nunchaku, large daggers and small swords. This also covers larger improvised weapons like chairs and pool cues.',1,E'melee',0,2,0,1,FALSE,50,FALSE),
(E'Heavy Melee Weapon',E'Heavy Melee weapons are specialized tools of destruction - most swords, machetes, and large clubs fit into this category. Generally they are two handed propositions, though a character with 4 strength or higher can use them one handed. Only very massive or dangerous improvised weapons are considered in this category.',2,E'melee',0,2,0,2,FALSE,100,FALSE),
(E'Very Heavy Melee Weapon',E'Very Heavy Melee Weapons covers exceptionally large and/or dangerous weapons - Greatswords and Battle Axes would be typical of the category. No improvised weapon is considered Very Heavy unless it is effectively a weapon on it\'s own merit, like a piece of rebar with a chunk of cement on it. Most Very Heavy weapons cannot be used effectively by characters with less than 6 strength; characters using them with 5 or lower strength have +1 difficulty on all attack rolls. A character with 9 strength or higher can use them one-handed effectively, however.',4,E'melee',0,1,0,2,FALSE,500,FALSE),
(E'Light Pistol',E'ight Pistols are typically low caliber, high magazine weapons. They also include hold-outs and very small revolvers; they are generally not terribly accurate and only useful at very close range.',4,E'gun',5,2,12,1,TRUE,50,FALSE),
(E'Heavy Pistol',E'Heavy Pistols are the favored weapon of law enforcement, Edgerunners, and just about everyone else who can afford one - they mix the best in range, stopping power, and magazine size.',5,E'gun',10,2,8,1,TRUE,100,FALSE),
(E'Very Heavy Pistol',E'Very Heavy Pistols are favored by those looking to make a statement; the 44 Magnum or Desert Eagle being classic examples. While each shot is far more dangerous and accurate from such weapons, relatively low rates of fire and magazine size means they should only be used by experts.',6,E'gun',15,1,4,1,FALSE,500,FALSE),
(E'Light SMG',E'LIght submachine guns are typically machine pistols, designed to put a lot of bullets into the air without too much concern for accuracy. Uses SMG Special Rules',2,E'smg',15,4,20,1,TRUE,100,FALSE),
(E'Heavy SMG',E'Heavy submachine guns are typically bullpup designs, and are favored by certain special forces and well-heeled gangers. Uses SMG Special Rules',3,E'smg',20,3,30,1,FALSE,500,FALSE),
(E'Pump Shotgun',E'Shotguns are two handed weapons that trade range for damage. Modern shotguns have a choke on the barrel that allows for the attack to be widely dispersed - in this case, the user can hit a Lot of People with a single shot if they know what they\'re doing. The pump version is slow firing but widely available.',7,E'shotgun',10,1,6,2,FALSE,100,FALSE),
(E'Double Barrel',E'Double Barrel shotguns are rarely seen in the city, but they can pack a surprising punch. A character with a double barrel can fire both simultaneously, dealing an additional 3 damage.',7,E'shotgun',10,2,2,2,FALSE,500,FALSE),
(E'Assault Shotgun',E'Assault Shotguns are extremely dangerous devices that use slightly smaller shells and provide sustained, rapid fire. They are commonly used by military forces as breaching and suppression devices.',6,E'shotgun',10,2,8,2,FALSE,5000,FALSE),
(E'Assault Rifle',E'Assault Rifles are rapid firing, extremely powerful weapons rarely seen outside the hands of trained military units. Using one in public will generally bring down an unholy shitstorm of law enforcement. Can use Automatics special rules.',7,E'assault',25,3,30,2,FALSE,5000,FALSE),
(E'Sniper Rifle',E'Sniper rifles are cumbersome, heavy weapons that provide high damage at extreme range. They have a low rate of fire and smaller magazines.',8,E'rifle',150,1,4,2,FALSE,1000,FALSE),
(E'Bow',E'Bows are muscle powered weapons that are inferior to modern firearms except in one area - they are almost completely silent. As a result, they are surprisingly common on the streets. Bows use the Exotic Weapons skill. Modern bows have adjustable tensions. Getting one for use by an extraordinarily strong character (Strength of 6 or higher) requires a special order and carries a much higher cost.',2,E'bow',10,1,1,2,FALSE,1000,FALSE),
(E'Grenade Launcher',E'High explosive weapons generally have a long range and deal extremely high damage. They are difficult to find ammunition for, and are rarely found outside the hands of highly trained military units. Using them in public is contra-indicated by the sane; using them in enclosed areas is usually the last thing someone does. High Explosive Weapons use the Heavy Weapons skill.',12,E'explosive',40,1,4,2,FALSE,10000,FALSE),
(E'Rocket Launcher',E'High explosive weapons generally have a long range and deal extremely high damage. They are difficult to find ammunition for, and are rarely found outside the hands of highly trained military units. Using them in public is contra-indicated by the sane; using them in enclosed areas is usually the last thing someone does. High Explosive Weapons use the Heavy Weapons skill.',24,E'explosive',120,1,1,2,FALSE,25000,FALSE),
(E'Companion Revolver',E'Space cowboy pistol - looks like an antique revolver with an integral suppressor and some funky sights.',5,E'gun',10,2,5,1,TRUE,10000,TRUE),
(E'Winchester 1873',E'The gun that won the West.',6,E'gun',15,1,15,2,FALSE,15000,TRUE),
(E'Kendachi Arms Monokatana',E'A crystalline blade with built in microvibrators allow this weapon to slice through, well, anything. Ignores most armor.',3,E'melee',0,2,0,2,FALSE,10000,TRUE),
(E'Malorian 3516',E'High powered, custom handgun. Requires special smart ammunition made specifically for this weapon. Can be used in melee as a medium melee weapon once per reload, breathing fire from the base of the grip and dealing aggravated damage.',6,E'gun',20,2,7,1,TRUE,150000,TRUE),
(E'Rhinemetall EMG-86',E'Heavy Weapon. Requires a complex action to reload both ammunition and charge pack. Requires custom ammunition. Ignores non-hardened armor, treats hardened armor as non-hardened, deals aggravated damage.',8,E'gun',100,1,2,2,FALSE,250000,TRUE),
(E'Magnetic Shuriken',E'Exotic Weapon. Attacker has -1 DV on most attacks if target is wearing metallic armor or has more than 1 cyberlimb. Explodes after hitting, ablating an additional point of armor.',1,E'bow',1,3,3,1,TRUE,1000,TRUE),
(E'Giant Magna-Shuriken',E'Exotic Weapon. This is an 8 pound piece of razor edged steel honed to an almost fractal level of sharpness. It is wildly dangerous to vehicles, much less people. Requires a Shuriken Battleglove to use.',8,E'bow',2,1,1,1,FALSE,10000,TRUE),
(E'Gun-nade',E'One use pistol - removing the clip is the equivalent of pulling the pin on a grenade built into the device. Who would build such a thing!?',4,E'gun',5,2,8,1,TRUE,500,TRUE),
(E'DB-12',E'Shotgun pistol - characters with a strength of 4 or lower have +1 DV when attacking. Both barrels can fire together, dealing an additional 3 damage if the attack hits. Takes a full standard action to reload.',7,E'shotgun',5,2,2,2,FALSE,5000,TRUE),
(E'Arasaka Whistler',E'Exotic Weapon. Full sized, pump action crossbow for rapid, silent killing. Can be broken down into a concealable device as a single complex action, or restored in two.',6,E'gun',20,2,6,2,TRUE,15000,TRUE),
(E'Araska Reaper',E'Exotic Weapon. Handheld, self-recocking crossbow. Often wielded with shuriken in close combat by complete maniacs. Collapses into, or expands from, a single, inscrutable block as a simple action.',4,E'gun',10,2,4,1,TRUE,20000,TRUE),
(E'Bauhaus Rippercannon',E'Custom made, extremely bulky machine gun that fires flechette filled cartridges. Requires Strength 6 or a mount to use effectively. Stupid illegal in every jurisdiction where it has been found. Uses SMG rules.',5,E'smg',30,3,60,2,FALSE,50000,TRUE),
(E'Comrade Molech',E'Requires custom ammo. Base DV of 8 to all attacks due to incredible weight and bulkiness; this is reduced by 1 each for using two hands (like a sissy) or having Strength of 7+.',10,E'gun',10,1,1,2,TRUE,100000,TRUE),
(E'Wooden Stake',E'A pointy wooden stick',1,E'melee',0,2,0,1,TRUE,0,TRUE),
(E'Tactical Selfie Stick',E'A spring loaded, carbon fiber selfie stick.',0,E'melee',0,2,0,1,TRUE,0,TRUE);

INSERT INTO "public"."cyberware_master"("name","price","description","humanity_loss_min","humanity_loss_max","install_level","type","is_treasure")
VALUES
(E'Biomonitor',100,E'Implant that reads vital signs.',0,0,E'Mall',E'fashionware',FALSE),
(E'Chemskin',100,E'Custom skin biosculpting that can alter the appearance of ones skin to almost any conceivable combination of color, inked tattoos, designs, and the like.',0,0,E'Mall',E'fashionware',FALSE),
(E'EMP Threading',10,E'Metallic lines that run across the body. Highly fashionable combinations are always coming and going.',0,0,E'Mall',E'fashionware',FALSE),
(E'Light Tattoo',100,E'Subdermal patches that can produce colorful, backlit tattoos. Gives +1 Appearance when awesome enough.',0,0,E'Mall',E'fashionware',FALSE),
(E'Corneal Implant',100,E'Color changing lenses implanted in the eyes, allowing for nearly any color/style combination',0,0,E'Mall',E'fashionware',FALSE),
(E'Skinwatch',100,E'Subdermal LED watch',0,0,E'Mall',E'fashionware',FALSE),
(E'Techhair',100,E'Color changing, light emitting, artificial hair. Grants +1 Cool.',0,0,E'Mall',E'fashionware',FALSE),
(E'Basic Neural Link',500,E'Artifical Nervous System that allows for the use of different pieces of chipware.  The basic version has 5 sockets. Inclues interfacing plugs to connect to most machines.',2,8,E'Hospital',E'neuralware',FALSE),
(E'Braindance Recorder',500,E'System to record all of a users experience to memory chips.',0,0,E'Chip',E'neuralware',FALSE),
(E'Kerenzikov',500,E'Speedware that artifically boosts a users experiential sense of time. Increases Move by 1 and adds 1 die to most combat rolls for one scene when activated. Deals the user 3 stun damage when the effect wears off.',0,0,E'Chip',E'neuralware',FALSE),
(E'Sandevistan',2000,E'Speedware that artifically boosts a users experiential sense of time. Increases Move by 2 and adds 2 die to most combat rolls for one scene when activated. Deals the user 6 stun damage when the effect wears off.',0,0,E'Chip',E'neuralware',FALSE),
(E'Miilitech "Kali"',25000,E'Speedware that artifically boosts a users experiential sense of time. Increases Move by 3 and adds 3 die to most combat rolls for one scene when activated. Deals the user 6 lethal damage when the effect wears off.',0,0,E'Chip',E'neuralware',FALSE),
(E'Memory chip',10,E'Memory storage chip. Approximate capacity of 2 Exabytes, or 2 Billion Gigabytes for you old timers.',0,0,E'Chip',E'neuralware',FALSE),
(E'Olfactory Boost',100,E'Chip that assists in decoding scents and boosts a users sense of smell to dog-like levels. Allows tracking via scent, amongst other tricks.',0,0,E'Chip',E'neuralware',FALSE),
(E'Pain Editor',5000,E'Chip that overrides the users ability to feel pain. Dramatically reduces wound-based die penalties. Character does not fall unconscious when wound track is filled with stun damage.',0,0,E'Chip',E'neuralware',FALSE),
(E'Skill Chip - Athletics',500,E'Chip that overrides a users muscle memory, gives access to internal databanks, and otherwise gives a user skills they might not otherwise have access to.',0,0,E'Chip',E'neuralware',FALSE),
(E'Skill Chip - Brawling',500,E'Chip that overrides a users muscle memory, gives access to internal databanks, and otherwise gives a user skills they might not otherwise have access to.',0,0,E'Chip',E'neuralware',FALSE),
(E'Skill Chip - Evasion',500,E'Chip that overrides a users muscle memory, gives access to internal databanks, and otherwise gives a user skills they might not otherwise have access to.',0,0,E'Chip',E'neuralware',FALSE),
(E'Skill Chip - Fast Talk',500,E'Chip that overrides a users muscle memory, gives access to internal databanks, and otherwise gives a user skills they might not otherwise have access to.',0,0,E'Chip',E'neuralware',FALSE),
(E'Skill Chip - Firearms',500,E'Chip that overrides a users muscle memory, gives access to internal databanks, and otherwise gives a user skills they might not otherwise have access to.',0,0,E'Chip',E'neuralware',FALSE),
(E'Skill Chip - Melee Weapons',500,E'Chip that overrides a users muscle memory, gives access to internal databanks, and otherwise gives a user skills they might not otherwise have access to.',0,0,E'Chip',E'neuralware',FALSE),
(E'Skill Chip - Drive Land',500,E'Chip that overrides a users muscle memory, gives access to internal databanks, and otherwise gives a user skills they might not otherwise have access to.',0,0,E'Chip',E'neuralware',FALSE),
(E'Skill Chip - Performance',500,E'Chip that overrides a users muscle memory, gives access to internal databanks, and otherwise gives a user skills they might not otherwise have access to.',0,0,E'Chip',E'neuralware',FALSE),
(E'Skill Chip - Stealth',500,E'Chip that overrides a users muscle memory, gives access to internal databanks, and otherwise gives a user skills they might not otherwise have access to.',0,0,E'Chip',E'neuralware',FALSE),
(E'Skill Chip - Cryptography',500,E'Chip that overrides a users muscle memory, gives access to internal databanks, and otherwise gives a user skills they might not otherwise have access to.',0,0,E'Chip',E'neuralware',FALSE),
(E'Skill Chip - First Aid',500,E'Chip that overrides a users muscle memory, gives access to internal databanks, and otherwise gives a user skills they might not otherwise have access to.',0,0,E'Chip',E'neuralware',FALSE),
(E'Skill Chip - Gambling',500,E'Chip that overrides a users muscle memory, gives access to internal databanks, and otherwise gives a user skills they might not otherwise have access to.',0,0,E'Chip',E'neuralware',FALSE),
(E'Skill Chip - Language',500,E'Chip that overrides a users muscle memory, gives access to internal databanks, and otherwise gives a user skills they might not otherwise have access to.',0,0,E'Chip',E'neuralware',FALSE),
(E'Tactile Booster',100,E'Chip that increases a users sense of touch to the point where they can detect cats and larger sized animals from 20 meters away by placing their hand on a solid surface.',0,0,E'Chip',E'neuralware',FALSE),
(E'Algernonic Subprocessors I',1000,E'A general purpose intelligence booster chip. Gives instant access to all knowledge of an 8th grader.',0,0,E'Chip',E'neuralware',FALSE),
(E'Algernonic Subprocessors II',5000,E'A general purpose intelligence booster chip. Makes the user seem pretty bright.',0,0,E'Chip',E'neuralware',FALSE),
(E'Algernonic Subprocessors III',25000,E'A highly advanced intelligence booster chip. Contains a Small helper AI to assist with cognitive loads.',0,0,E'Chip',E'neuralware',TRUE),
(E'Algernonic Subprocessors IV',75000,E'An extremely advanced intelligence booster chip. Can make an average dullard into a Weapons Grade Savant.',0,0,E'Chip',E'neuralware',TRUE),
(E'Algernonic Subprocessors V',1000000,E'If this existed it would definitely be used to cheat at Jeapordy.',0,0,E'Chip',E'neuralware',TRUE),
(E'Basic Cybereyes',100,E'A pair of artificial eyes with 3 option slots. Includes the ability to change colors and patterns, a HUD, simple video recordings, and viewing Augmented Reality.',1,4,E'Clinic',E'cyberoptics',FALSE),
(E'Anti-Dazzle System',100,E'Makes the user immune to the effects of flashes and strobes.',0,0,E'Mall',E'cyberoptics',FALSE),
(E'Dartgun',500,E'Single shot dart that can be loaded with poison.',0,0,E'Clinic',E'cyberoptics',FALSE),
(E'Image Processing',500,E'User reduces difficulties on vision based perception checks.',0,0,E'Mall',E'cyberoptics',FALSE),
(E'Infrared Imaging',500,E'User ignores penalties for darkness, smog, and most smoke.',0,0,E'Mall',E'cyberoptics',FALSE),
(E'MicroOptics',100,E'In-eye magnifier allows for zooming in up to 400x.',0,0,E'Mall',E'cyberoptics',FALSE),
(E'Rad Detector',1000,E'Displays ambient radiation as a soft glow in the users surroundings.',0,0,E'Clinic',E'cyberoptics',FALSE),
(E'HUD Agent',100,E'More or less sophisticated digital assistant that appears in the users hud.',0,0,E'Clinic',E'cyberoptics',FALSE),
(E'Basic Cyberaudio Suite',500,E'Artificial system replacing a users inner ear. Includes basic recorder',1,4,E'Clinic',E'cyberaudio',FALSE),
(E'Hearing Amplifier',100,E'Boosts nearby sounds, allowing for reduced difficulties on hearing based perception checks.',0,0,E'Mall',E'cyberaudio',FALSE),
(E'Level Damper',100,E'Dampens loud noises such as gunshots, flash bang grenades, and screams.',0,0,E'Mall',E'cyberaudio',FALSE),
(E'Radio Communicator',100,E'Allows user to communicate via radio. Approximate range of 1 mile.',0,0,E'Clinic',E'cyberaudio',FALSE),
(E'Voice Stress Analyzer',500,E'Runs sophisticated analysis on incoming speech patterns, giving reduced difficulties to efforts to detect lies.',0,0,E'Clinic',E'cyberaudio',FALSE),
(E'AudioVox',500,E'Voice synthesizer. Can be programmed in a variety of useful ways, most commonly used by speech-givers and musicians to achieve flawless verbalization.',1,4,E'Clinic',E'internalware',FALSE),
(E'Contraceptive Implant',10,E'Prevents unwanted pregnancy for approximately 4 years.',0,0,E'Mall',E'internalware',FALSE),
(E'Platelet Booster',500,E'Advanced nanotech that lowers healing difficulty values by 1.',1,4,E'Clinic',E'internalware',FALSE),
(E'Nanotech Hive',5000,E'Small, self-propogating device that allows for rapid and dramatic healing. User recovers from wounds as though they were in a cryotank if they get at least 8 hours of sleep a day.',1,4,E'Hospital',E'internalware',FALSE),
(E'Vampyres',500,E'Light Melee Weapon implanted in the mouth. Can deliver a single dose of poison from a small resevoir. If the user grapples a victim first, the damage is aggravated',1,4,E'Clinic',E'internalware',FALSE),
(E'Cybersnake',1000,E'Esophogus mounted Heavy Melee Weapon. If the user grapples a victim first, the damage is aggravated.',2,8,E'Hospital',E'internalware',FALSE),
(E'Gills',1000,E'User can breathe underwater.',1,4,E'Hospital',E'internalware',FALSE),
(E'Grafted Muscles I',1000,E'Increases Strength by a small amount without excessive bulking.',1,4,E'Hospital',E'internalware',FALSE),
(E'Grafted Muscles II',5000,E'Increases Strength by a moderate amount with a small amount of bulk.',2,8,E'Hospital',E'internalware',FALSE),
(E'Grafted Muscles III',25000,E'Increases Strength by a large amount. The muscles are apparent but seem natural.',3,9,E'Hospital',E'internalware',TRUE),
(E'Grafted Muscles IV',75000,E'Massively increased Strength without a visible trace courtesy of like, carbon nanorods or some nonsense.',4,12,E'Hospital',E'internalware',TRUE),
(E'Grafted Muscles V',1000000,E'This is probably not real and stories of waifu girls ripping cars in half are therefore no cause for alarm.',5,15,E'Hospital',E'internalware',TRUE),
(E'Bone Lacing I',1000,E'Increases Body by a small amount. Basically nothing you cannot achieve with vitamins.',1,4,E'Hospital',E'internalware',FALSE),
(E'Bone Lacing II',5000,E'Increases Body by a modest amount. Your bones are...pretty strong.',2,8,E'Hospital',E'internalware',FALSE),
(E'Bone Lacing III',25000,E'Increases Body by a large amount. Unironic use of the nickname Old Ironsides is permitted.',3,9,E'Hospital',E'internalware',TRUE),
(E'Bone Lacing IV',75000,E'Massively increased Body courtesy of Vanadium Bones and, um, skin de-tenderizing (.',4,12,E'Hospital',E'internalware',TRUE),
(E'Bone Lacing V',1000000,E'Stories of humans becoming literal brick walls are to be dismissed by all right thinking people.',5,15,E'Hospital',E'internalware',TRUE),
(E'Nervous System Siliconization I',1000,E'Increases Reflexes by a small amount by turning some of your nerves into carbon fiber optics.',1,4,E'Hospital',E'internalware',FALSE),
(E'Nervous System Siliconization II',5000,E'Increases Reflexes by a modest amount. Carbon Fiber Optic nerves again. Pretty cool right.',2,8,E'Hospital',E'internalware',FALSE),
(E'Nervous System Siliconization III',25000,E'Increases Reflexes by a large amount. Very futuristic, your Carbon Fiber Optics endings.',3,9,E'Hospital',E'internalware',TRUE),
(E'Nervous System Siliconization IV',75000,E'Increases Reflexes by an enormous amount. Just say it. Carbon. Fiber. Optics. Rolls off the tongue.',4,12,E'Hospital',E'internalware',TRUE),
(E'Nervous System Siliconization V',1000000,E'Faster than a speeding bullet and slicker than an oil spill. Stories of human blurs are just them being tired.',5,15,E'Hospital',E'internalware',TRUE),
(E'Independent Air Supply',1000,E'A third lung made of oxygen tanks. Allows holding ones breath for about an hour.',1,6,E'Hospital',E'internalware',FALSE),
(E'Midnight Lady Implant',100,E'Be a Venus, be the fire, be the desire.',1,2,E'Clinic',E'internalware',FALSE),
(E'Mr. Studd Implant',100,E'All Night. Every Night.',1,2,E'Clinic',E'internalware',FALSE),
(E'Toxin Binders',500,E'Reduces difficulty to resist airborne toxins by 1.',1,4,E'Clinic',E'internalware',FALSE),
(E'Nasal Filters',5000,E'Makes owner immune to most airborne toxins and gases.',1,6,E'Hospital',E'internalware',FALSE),
(E'Skin Weave',500,E'Weaves resistant material directly into the skin. Increases armor by 2 and adds 1 health box.',1,4,E'Hospital',E'externalware',FALSE),
(E'Subdermal Armor',1000,E'Implanted armor beneath the skin. Increases armor by 3 and adds 2 health boxes.',1,4,E'Hospital',E'externalware',FALSE),
(E'Body Plating',50000,E'Bonds armor plating directly to the user\'s bone in an extremely unsettling way. Generally considered the last step before one goes full cyborg. Increases armor by 5 and adds 3 health boxes. This armor is also considered Hardened rules).',2,6,E'Hospital',E'externalware',FALSE),
(E'Cyberarm - Right',500,E'Replacement arm. Standard issue looks like an angular robotic limb. Grants 1 additional health box.',2,6,E'Hospital',E'cyberarm',FALSE),
(E'Cyberarm - Left',500,E'Replacement arm. Standard issue looks like an angular robotic limb. Grants 1 additional health box.',2,6,E'Hospital',E'cyberarm',FALSE),
(E'Grapple Hand',500,E'User can fire their hand 30 meters. It can still feel and grab things. Hand can also just run along the ground and grab things.',0,0,E'Clinic',E'cyberarm',FALSE),
(E'Medscanner',500,E'Built in scanner that assists with diagnosing injury and illness. Reduces First Aid and Paramedic difficulties by 1.',0,0,E'Clinic',E'cyberarm',FALSE),
(E'Techscanner',500,E'Built in scanner for assessing technology. Comes with a variety of probes. Reduces repair and jury rigging difficulties by 1.',0,0,E'Clinic',E'cyberarm',FALSE),
(E'Tool Hand',500,E'Fingers contain a variety of screwdrivers, wrenches, a small drill, and other tools. Never carry a toolbag again!',0,0,E'Clinic',E'cyberarm',FALSE),
(E'Quick Change Mount',100,E'Special mounting that allows arm to be removed or attached as a complex action',0,0,E'Clinic',E'cyberarm',FALSE),
(E'Subdermal Grip',500,E'Allows user to interface with a smartgun without connecting interface plugs.',0,0,E'Clinic',E'cyberarm',FALSE),
(E'Built-in Gun',500,E'A one-handed gun can be built into a cyberarm. Weapon is concealed even if not normally able to be.',0,0,E'Clinic',E'cyberarm',FALSE),
(E'Big Knucks',100,E'Built in armored knuckles. Gives +1 damage to unarmed attacks.',1,1,E'Clinic',E'cyberarm',FALSE),
(E'Scratchers',100,E'Carbo-glass fingernails. Acts as a light melee weapon that is virtually undetectable. Exotic Weapon',1,1,E'Clinic',E'cyberarm',FALSE),
(E'Rippers',500,E'Carbo-glass claws built into the first joint of a finger. Acts as a medium melee weapon that is virtually undetectable. Exotic Weapon.',1,2,E'Clinic',E'cyberarm',FALSE),
(E'Wolvers',1000,E'Titanium claws concealed in the forearm that pop out when making a fist. Does NOT make the noise for trademark reasons. Acts as a heavy melee weapon that is virtually undetectable. Exotic Weapon.',1,4,E'Clinic',E'cyberarm',FALSE),
(E'Hardened Shielding',1000,E'Cyberlimb is immune to the effect of EMP devices.',0,0,E'Clinic',E'cyberarm',FALSE),
(E'Plastic Covering',100,E'Plastic coating for limb, giving it a close to human appearance, if somewhat shiny and angular.',0,0,E'Clinic',E'cyberarm',FALSE),
(E'Realskinn Covering',500,E'Artificial skin covering for cyberlimb. Mimics the feel, temp, and reaction of actual skin.',0,0,E'Clinic',E'cyberarm',FALSE),
(E'SuperChrome Covering',1000,E'Shiny metallic coating for cyberlminb. Self cleaning and polishing, too!',0,0,E'Clinic',E'cyberarm',FALSE),
(E'Cyberleg - Right',500,E'Replacement leg. Standard issue looks like an angular robotic limb. Modifications must be purchased twice and installed  in both legs to be effective. Grants 1 additional health box.',2,6,E'Hospital',E'cyberleg',FALSE),
(E'Cyberleg - Left',500,E'Replacement leg. Standard issue looks like an angular robotic limb. Modifications must be purchased twice and installed  in both legs to be effective. Grants 1 additional health box.',2,6,E'Hospital',E'cyberleg',FALSE),
(E'Grip Foot',250,E'Foot contains traction enhancing nanofibers similar to a chameleons. Allows climbing at normal speed on non-wet surfaces. User must be barefoot',0,0,E'Clinic',E'cyberleg',FALSE),
(E'Web Foot',250,E'Allows toes to extend and deploy webbing, acting as built in flippers. Allows swimming at normal speed.',0,0,E'Clinic',E'cyberleg',FALSE),
(E'Spring Heels',250,E'Leg contains powerful hydraulics, allowing for some truly impressive leaps. More importantly, allows surviving the landing.',0,0,E'Clinic',E'cyberleg',FALSE),
(E'Skate Foot',250,E'Feet can split apart and deploy inline skates. Movement is doubled over most surfaces when skating.',0,0,E'Clinic',E'cyberleg',FALSE),
(E'Hardened Shielding',1000,E'Cyberlimb is immune to the effect of EMP devices.',0,0,E'Clinic',E'cyberleg',FALSE),
(E'Plastic Covering',100,E'Plastic coating for limb, giving it a close to human appearance, if somewhat shiny and angular.',0,0,E'Clinic',E'cyberleg',FALSE),
(E'Realskinn Covering',500,E'Artificial skin covering for cyberlimb. Mimics the feel, temp, and reaction of actual skin.',0,0,E'Clinic',E'cyberleg',FALSE),
(E'SuperChrome Covering',1000,E'Shiny metallic coating for cyberlminb. Self cleaning and polishing, too!',0,0,E'Clinic',E'cyberleg',FALSE),
(E'Artificial Shoulder Mount',1000,E'Allows user to mount an additional pair of cyberlimbs under their normal arms.',3,9,E'Hospital',E'borgware',FALSE),
(E'MultiOptic Mount',1000,E'(BETA - Does not work) Gives user 5 additional cybereye slots.',3,9,E'Hospital',E'borgware',TRUE),
(E'Sensor Array',1000,E'(BETA - Does not work) Gives user 5 additional cyberear slots.',3,9,E'Hospital',E'borgware',TRUE),
(E'Linear Frame Alpha',50000,E'Grafted exoskeleton with built in power supply. Adds 5 armor and 4 health boxes. Increases Strength and Body by 3. Decreases Reflexes by 1. Not compatible with any Externalware, Cyberlimbs, Grafted Muscles, Bone Lacing, or Nervous System Siliconization.',3,9,E'Hospital',E'borgware',TRUE),
(E'Linear Frame Beta',150000,E'(BETA - Does not work) Advanced grafted exoskeleton with built in power supply. Adds 6 armor and 4 health boxes. Increases Strength and Body by 3. Decreases Reflexes by 2. Not compatible with External Cyberarmor. Not compatible with Grafted Muscles or Bone Lacing.',4,12,E'Hospital',E'borgware',TRUE),
(E'Nervous System Regulator',25000,E'A chip that seizes control of much of the users autonomic nervous system, bringing heart rate, breathing, blood pressure, and the like under manual control. Grants +1 Cool.',0,0,E'Chip',E'neuralware',TRUE),
(E'Chromed Exo-Armor',25000,E'Armor mounted to surgically implanted hard points across the users body, and polished to a high shine. May include fiber optic light designs, chameleon coatings, and the like. Grants +1 Appearance, +4 Armor, and +2 Health Boxes.',2,6,E'Hospital',E'externalware',TRUE),
(E'Skill Chip - Military Tech',1000,E'Chip that overrides a users muscle memory, gives access to internal databanks, and otherwise gives a user skills they might not otherwise have access to.',0,0,E'Chip',E'neuralware',TRUE);