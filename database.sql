
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
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
	"current_clip" integer NOT NULL,
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
	CONSTRAINT "cyberware_master_pk" PRIMARY KEY ("cyberware_master_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "char_cyberware_bridge" (
	"cyberware_bridge_id" serial NOT NULL,
	"char_id" integer NOT NULL,
	"cyber_id" integer NOT NULL,
	"armor_level" integer NOT NULL,
	"cyber_limb_count" integer NOT NULL,
	CONSTRAINT "char_cyberware_bridge_pk" PRIMARY KEY ("cyberware_bridge_id")
) WITH (
  OIDS=FALSE
);



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
ALTER TABLE "char_cyberware_bridge" ADD CONSTRAINT "char_cyberware_bridge_fk1" FOREIGN KEY ("cyber_id") REFERENCES "cyberware_master"("cyberware_master_id");