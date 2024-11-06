const SkillSet = {
  streets: [
    ['athletics', 'Athletics'],
    ['brawling', 'Brawling'],
    ['concentration', 'Concentration'],
    ['evasion', 'Evasion'],
    ['fast_talk', 'Fast Talk'],
    ['firearms', 'Firearms'],
    ['legerdemain', 'Legerdemain'],
    ['melee_weapons', 'Melee Weapons'],
    ['perception', 'Perception'],
    ['streetwise', 'Streetwise'],
  ],
  tekhne: [
    ['demolitions', 'Demolitions'],
    ['drive_land', 'Drive Land'],
    ['drive_exotic', 'Drive Exotic'],
    ['etiquette', 'Etiquette'],
    ['exotic_weapons', 'Exotic Weapons'],
    ['heavy_weapons', 'Heavy Weapons'],
    ['performance', 'Performance'],
    ['stealth', 'Stealth'],
    ['survival', 'Survival'],
    ['tracking', 'Tracking'],
  ],
  knowledge: [
    ['business', 'Business'],
    ['cryptography', 'Cryptography'],
    ['cyber_tech', 'Cyber Tech'],
    ['investigation', 'Investigation'],
    ['gambling', 'Gambling'],
    ['language', 'Language'],
    ['military_tech', 'Military Tech'],
    ['science', 'Science'],
    ['vehicle_tech', 'Vehicle Tech'],
  ],
  paramed: [
    ['is_paramed'],
    ['first_aid', 'First Aid'],
    ['paramedic', 'Paramedic'],
  ],
};

const AttributesObj = {
  // name, organic maximum
  physical: [['strength', 5], ['body', 5], ['reflexes']],
  social: [['appearance', 5], ['cool', 5], ['street cred']],
  mental: [
    ['intelligence', 5],
    ['willpower', 10],
    ['technique', 10],
  ],
  special: [['luck', 10]],
};

const AttributesArr = [
  // name, organic maximum, cyber version OR database appearance
  ['strength', 5, 'cyber_strength'],
  ['body', 5, 'cyber_body'],
  ['reflexes', 5, 'cyber_reflexes'],
  ['appearance', 5, 'cyber_appearance'],
  ['cool', 5, 'cyber_cool'],
  ['street cred', 10, 'street_cred'],
  ['intelligence', 5, 'cyber_intelligence'],
  ['willpower', 10],
  ['technique', 10],
  ['luck', 10, 'max_luck'],
];

export { SkillSet, AttributesObj, AttributesArr };
