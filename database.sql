
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
	"id" serial NOT NULL,
	"username" varchar NOT NULL,
	"password" varchar NOT NULL,
	"account_type" varchar NOT NULL,
	CONSTRAINT "user_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
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
	"concentration" integer NOT NULL DEFAULT '0',
	"contortionist" integer NOT NULL DEFAULT '0',
	"interrogation" integer NOT NULL DEFAULT '0',
	"legerdemain" integer NOT NULL DEFAULT '0',
	"perception" integer NOT NULL DEFAULT '0',
	"persuasion" integer NOT NULL DEFAULT '0',
	"resist" integer NOT NULL DEFAULT '0',
	"streetwise" integer NOT NULL DEFAULT '0',
	"subterfuge" integer NOT NULL DEFAULT '0',
	"animal" integer NOT NULL DEFAULT '0',
	"demolitions" integer NOT NULL DEFAULT '0',
	"driveland" integer NOT NULL DEFAULT '0',
	"driveair" integer NOT NULL DEFAULT '0',
	"drivesea" integer NOT NULL DEFAULT '0',
	"etiquette" integer NOT NULL DEFAULT '0',
	"performance" integer NOT NULL DEFAULT '0',
	"stealth" integer NOT NULL DEFAULT '0',
	"tracking" integer NOT NULL DEFAULT '0',
	"survival" integer NOT NULL DEFAULT '0',
	"bureaucracy" integer NOT NULL DEFAULT '0',
	"business" integer NOT NULL DEFAULT '0',
	"criminology" integer NOT NULL DEFAULT '0',
	"cryptography" integer NOT NULL DEFAULT '0',
	"deduction" integer NOT NULL DEFAULT '0',
	"firstaid" integer NOT NULL DEFAULT '0',
	"gambling" integer NOT NULL DEFAULT '0',
	"language" integer NOT NULL DEFAULT '0',
	"libraryuse" integer NOT NULL DEFAULT '0',
	"science" integer NOT NULL DEFAULT '0',
	"evasion" integer NOT NULL DEFAULT '0',
	"brawl" integer NOT NULL DEFAULT '0',
	"melee" integer NOT NULL DEFAULT '0',
	"archery" integer NOT NULL DEFAULT '0',
	"handgun" integer NOT NULL DEFAULT '0',
	"shoulder_arms" integer NOT NULL DEFAULT '0',
	"automatics" integer NOT NULL DEFAULT '0',
	"heavy_weapons" integer NOT NULL DEFAULT '0',
	"basic_tech" integer NOT NULL DEFAULT '0',
	"cyber_tech" integer NOT NULL DEFAULT '0',
	"weapon_tech" integer NOT NULL DEFAULT '0',
	"medical_tech" integer NOT NULL DEFAULT '0',
	"security_tech" integer NOT NULL DEFAULT '0',
	"land_tech" integer NOT NULL DEFAULT '0',
	"air_tech" integer NOT NULL DEFAULT '0',
	"sea_tech" integer NOT NULL DEFAULT '0',
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
	"stun_damage" integer NOT NULL DEFAULT '0',
	"lethal_damage" integer NOT NULL DEFAULT '0',
	"agg_damage" integer NOT NULL DEFAULT '0',
	"humanity" integer NOT NULL DEFAULT '40',
	"max_luck" integer NOT NULL DEFAULT '4',
	"current_luck" integer NOT NULL DEFAULT '0',
	"max_armor" integer NOT NULL DEFAULT '0',
	"current_armor" integer NOT NULL DEFAULT '0',
	CONSTRAINT "character_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "weapons_master" (
	"id" serial NOT NULL,
	"name" varchar NOT NULL,
	"damage" integer NOT NULL,
	"dmg_type" integer NOT NULL,
	"range" integer NOT NULL,
	"rof" integer NOT NULL,
	CONSTRAINT "weapons_master_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "character_weapons_bridge" (
	"id" serial NOT NULL,
	"char_id" integer NOT NULL,
	"weapon_id" integer NOT NULL,
	"weapon_mod_1" integer NOT NULL,
	"weapon_mod_2" integer NOT NULL,
	CONSTRAINT "character_weapons_bridge_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "armor_master" (
	"id" serial NOT NULL,
	CONSTRAINT "armor_master_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "char_armor_bridge" (
	"id" serial NOT NULL,
	"char_id" integer NOT NULL,
	"armor_id" integer NOT NULL,
	"armor_mod_1" integer NOT NULL,
	"armor_mod_2" integer NOT NULL,
	CONSTRAINT "char_armor_bridge_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "armor_mod_master" (
	"id" serial NOT NULL,
	CONSTRAINT "armor_mod_master_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "weapon_mod_master" (
	"id" serial NOT NULL,
	CONSTRAINT "weapon_mod_master_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

ALTER TABLE "character" ADD CONSTRAINT "character_fk0" FOREIGN KEY ("user_id") REFERENCES "user"("id");

ALTER TABLE "character_weapons_bridge" ADD CONSTRAINT "character_weapons_bridge_fk0" FOREIGN KEY ("char_id") REFERENCES "character"("id");
ALTER TABLE "character_weapons_bridge" ADD CONSTRAINT "character_weapons_bridge_fk1" FOREIGN KEY ("weapon_id") REFERENCES "weapons_master"("id");
ALTER TABLE "character_weapons_bridge" ADD CONSTRAINT "character_weapons_bridge_fk2" FOREIGN KEY ("weapon_mod_1") REFERENCES "weapon_mod_master"("id");
ALTER TABLE "character_weapons_bridge" ADD CONSTRAINT "character_weapons_bridge_fk3" FOREIGN KEY ("weapon_mod_2") REFERENCES "weapon_mod_master"("id");

ALTER TABLE "char_armor_bridge" ADD CONSTRAINT "char_armor_bridge_fk0" FOREIGN KEY ("char_id") REFERENCES "character"("id");
ALTER TABLE "char_armor_bridge" ADD CONSTRAINT "char_armor_bridge_fk1" FOREIGN KEY ("armor_id") REFERENCES "armor_master"("id");
ALTER TABLE "char_armor_bridge" ADD CONSTRAINT "char_armor_bridge_fk2" FOREIGN KEY ("armor_mod_1") REFERENCES "armor_mod_master"("id");
ALTER TABLE "char_armor_bridge" ADD CONSTRAINT "char_armor_bridge_fk3" FOREIGN KEY ("armor_mod_2") REFERENCES "armor_mod_master"("id");