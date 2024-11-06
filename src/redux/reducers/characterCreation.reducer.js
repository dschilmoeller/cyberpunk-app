const characterCreation = (
  state = {
    creationStep: 'first_steps',
    handle: '',
    player: '',
    campaign: 1,
    campaign_name: 'Unknown/Undecided',

    strength: 0,
    body: 0,
    reflexes: 0,
    appearance: 0,
    cool: 0,
    street_cred: 1,
    intelligence: 0,
    willpower: 0,
    technique: 0,
    attributeSelectionHistory: [],
    attributeCounter: 0,
    attributeNumber: 4,

    athletics: 0,
    brawling: 0,
    concentration: 0,
    evasion: 0,
    fastTalk: 0,
    firearms: 0,
    legerdemain: 0,
    meleeWeapons: 0,
    perception: 0,
    streetwise: 0,
    demolitions: 0,
    driveLand: 0,
    driveExotic: 0,
    etiquette: 0,
    exoticWeapons: 0,
    heavyWeapons: 0,
    performance: 0,
    stealth: 0,
    survival: 0,
    tracking: 0,
    business: 0,
    cryptography: 0,
    cyberTech: 0,
    firstAid: 0,
    investigation: 0,
    gambling: 0,
    language: 0,
    militaryTech: 0,
    science: 0,
    vehicleTech: 0,
    skillSelectionHistory: [],
    skillCounter: 0,
    skillNumber: 4,

    roleSelection: '',
    rockerboy: 0,
    solo: 0,
    netrunner: 0,
    nomad: 0,
    media: 0,
    medtech: 0,
    maker: 0,
    medSurgery: 0,
    medPharma: 0,
    medCryo: 0,
    isParamedical: false,
    paramedic: 0,
    makerField: 0,
    makerUpgrade: 0,
    makerFab: 0,
    makerInvent: 0,
    availableMedSkillPoints: 0,
    availableMakerSkillPoints: 0,
    availableNomadVehicles: 0,

    armor: [],
    shield: [],
    weapons: [],
    grenades: [],
    gear: [],
    cyberware: [],
    netrunnerGear: [],

    gearbucks: 1500,
    cyberbucks: 2500,

    creationReviewReached: false,
  },
  action
) => {
  // A person grows weary of typing action.payload in this part.
  const ap = action.payload;
  switch (action.type) {
    case 'CLEAR_CREATION_DETAILS':
      return {
        creationStep: 'first_steps',
        handle: '',
        player: '',
        campaign: 1,
        campaign_name: 'Unknown/Undecided',

        strength: 0,
        body: 0,
        reflexes: 0,
        appearance: 0,
        cool: 0,
        street_cred: 1,
        intelligence: 0,
        willpower: 0,
        technique: 0,
        attributeSelectionHistory: [],
        attributeCounter: 0,
        attributeNumber: 4,

        athletics: 0,
        brawling: 0,
        concentration: 0,
        evasion: 0,
        fastTalk: 0,
        firearms: 0,
        legerdemain: 0,
        meleeWeapons: 0,
        perception: 0,
        streetwise: 0,
        demolitions: 0,
        driveLand: 0,
        driveExotic: 0,
        etiquette: 0,
        exoticWeapons: 0,
        heavyWeapons: 0,
        performance: 0,
        stealth: 0,
        survival: 0,
        tracking: 0,
        business: 0,
        cryptography: 0,
        cyberTech: 0,
        firstAid: 0,
        investigation: 0,
        gambling: 0,
        language: 0,
        militaryTech: 0,
        science: 0,
        vehicleTech: 0,
        skillSelectionHistory: [],
        skillCounter: 0,
        skillNumber: 4,

        roleSelection: '',
        rockerboy: 0,
        solo: 0,
        netrunner: 0,
        nomad: 0,
        media: 0,
        medtech: 0,
        maker: 0,
        medSurgery: 0,
        medPharma: 0,
        medCryo: 0,
        isParamedical: false,
        paramedic: 0,
        makerField: 0,
        makerUpgrade: 0,
        makerFab: 0,
        makerInvent: 0,
        availableMedSkillPoints: 0,
        availableMakerSkillPoints: 0,
        availableNomadVehicles: 0,

        armor: [],
        shield: [],
        weapons: [],
        grenades: [],
        gear: [],
        cyberware: [],
        netrunnerGear: [],

        gearbucks: 1500,
        cyberbucks: 2500,

        creationReviewReached: false,
      };
    // This simply tracks what step of char creation we're on.
    case 'SET_CREATION_STEP':
      return { ...state, creationStep: action.payload };
    // this is used throughout to determine where one goes upon hitting 'next'
    case 'CREATION_REVIEW_REACHED':
      return {
        ...state,
        creationReviewReached: true,
      };
    // The next few simply set the data for the various steps.
    case 'SET_CREATION_FIRST_STEPS':
      return {
        ...state,
        handle: ap.handle,
        player: ap.player,
        campaign: ap.campaign,
        campaignName: ap.campaignName,
      };
    case 'CREATION_SELECT_ATT':
      return {
        ...state,
        [action.payload.att]: action.payload.value,
        attributeSelectionHistory: [
          ...state.attributeSelectionHistory,
          action.payload,
        ],
      };
    case 'CREATION_UNDO_SELECT_ATT':
      return {
        ...state,
        [action.payload.att]: 0,
        attributeSelectionHistory: [
          ...state.attributeSelectionHistory.filter(
            (a) => a.att !== action.payload.att
          ),
        ],
      };
    case 'INCREASE_ATT_COUNTER':
      return {
        ...state,
        attributeCounter: state.attributeCounter + 1,
        attributeNumber: action.payload,
      };
    case 'DECREASE_ATT_COUNTER':
      return {
        ...state,
        attributeCounter: state.attributeCounter - 1,
        attributeNumber: action.payload,
      };
    case 'CREATION_RESET_ATTRIBUTES':
      return {
        ...state,
        strength: 0,
        body: 0,
        reflexes: 0,
        appearance: 0,
        cool: 0,
        street_cred: 1,
        intelligence: 0,
        willpower: 0,
        technique: 0,
        attributeSelectionHistory: [],
        attributeCounter: 0,
        attributeNumber: 4,
      };
    case 'CREATION_SELECT_SKILL':
      return {
        ...state,
        [action.payload.skill]: action.payload.value,
        skillSelectionHistory: [...state.skillSelectionHistory, action.payload],
      };
    case 'CREATION_UNDO_LAST_SKILL':
      return {
        ...state,
        [action.payload.skill]: 0,
        skillSelectionHistory: [
          ...state.skillSelectionHistory.filter(
            (a) => a.skill !== action.payload.skill
          ),
        ],
      };
    case 'INCREASE_SKILL_COUNTER':
      return {
        ...state,
        skillCounter: state.skillCounter + 1,
        skillNumber: action.payload,
      };
    case 'DECREASE_SKILL_COUNTER':
      return {
        ...state,
        skillCounter: state.skillCounter - 1,
        skillNumber: action.payload,
      };
    case 'CREATION_RESET_SKILLS':
      return {
        ...state,
        athletics: 0,
        brawling: 0,
        concentration: 0,
        evasion: 0,
        fastTalk: 0,
        firearms: 0,
        legerdemain: 0,
        meleeWeapons: 0,
        perception: 0,
        streetwise: 0,
        demolitions: 0,
        driveLand: 0,
        driveExotic: 0,
        etiquette: 0,
        exoticWeapons: 0,
        heavyWeapons: 0,
        performance: 0,
        stealth: 0,
        survival: 0,
        tracking: 0,
        business: 0,
        cryptography: 0,
        cyberTech: 0,
        firstAid: 0,
        investigation: 0,
        gambling: 0,
        language: 0,
        militaryTech: 0,
        science: 0,
        vehicleTech: 0,
        skillSelectionHistory: [],
        skillCounter: 0,
        skillNumber: 4,
      };
    case 'SET_CREATION_ROLE_ABILITIES':
      return {
        ...state,
        rockerboy: ap.rockerboy,
        solo: ap.solo,
        netrunner: ap.netrunner,
        nomad: ap.nomad,
        media: ap.media,
        medtech: ap.medtech,
        maker: ap.maker,
        medSurgery: ap.medSurgery,
        medPharma: ap.medPharma,
        medCryo: ap.medCryo,
        isParamedical: ap.isParamedical,
        paramedic: ap.paramedic,
        makerField: ap.makerField,
        makerUpgrade: ap.makerUpgrade,
        makerFab: ap.makerFab,
        makerInvent: ap.makerInvent,
        roleSelection: ap.roleSelection,
        availableMakerSkillPoints: ap.availableMakerSkillPoints,
        availableMedSkillPoints: ap.availableMedSkillPoints,
        availableNomadVehicles: ap.availableNomadVehicles,
      };
    case 'CREATION_BUY_ARMOR':
      return {
        ...state,
        armor: [...state.armor, action.payload],
        gearbucks: action.newBank,
      };
    case 'CREATION_SELL_ARMOR':
      return {
        ...state,
        armor: [
          ...state.armor.slice(0, action.payload),
          ...state.armor.slice(action.payload + 1),
        ],
        gearbucks: action.newBank,
      };
    case 'CREATION_BUY_SHIELD':
      return {
        ...state,
        shield: [...state.shield, action.payload],
        gearbucks: action.newBank,
      };
    case 'CREATION_SELL_SHIELD':
      return {
        ...state,
        shield: [
          ...state.shield.slice(0, action.payload),
          ...state.shield.slice(action.payload + 1),
        ],
        gearbucks: action.newBank,
      };
    case 'CREATION_BUY_WEAPON':
      return {
        ...state,
        weapons: [...state.weapons, action.payload],
        gearbucks: action.newBank,
      };
    case 'CREATION_SELL_WEAPON':
      return {
        ...state,
        weapons: [
          ...state.weapons.slice(0, action.payload),
          ...state.weapons.slice(action.payload + 1),
        ],
        gearbucks: action.newBank,
      };
    case 'CREATION_BUY_GRENADE':
      return {
        ...state,
        grenades: [...state.grenades, action.payload],
        gearbucks: action.newBank,
      };
    case 'CREATION_SELL_GRENADE':
      return {
        ...state,
        grenades: [
          ...state.grenades.slice(0, action.payload),
          ...state.grenades.slice(action.payload + 1),
        ],
        gearbucks: action.newBank,
      };
    case 'CREATION_BUY_GEAR':
      return {
        ...state,
        gear: [...state.gear, action.payload],
        gearbucks: action.newBank,
      };
    case 'CREATION_SELL_GEAR':
      return {
        ...state,
        gear: [
          ...state.gear.slice(0, action.payload),
          ...state.gear.slice(action.payload + 1),
        ],
        gearbucks: action.newBank,
      };
    case 'CREATION_BUY_NETRUNNER_GEAR':
      return {
        ...state,
        netrunnerGear: [...state.netrunnerGear, action.payload],
        gearbucks: action.newBank,
      };
    case 'CREATION_SELL_NETRUNNER_GEAR':
      return {
        ...state,
        netrunnerGear: [
          ...state.netrunnerGear.slice(0, action.payload),
          ...state.netrunnerGear.slice(action.payload + 1),
        ],
        gearbucks: action.newBank,
      };
    case 'CREATION_BUY_CYBERWARE':
      return {
        ...state,
        cyberware: [...state.cyberware, action.payload],
        cyberbucks: action.newBank,
      };
    case 'CREATION_SELL_CYBERWARE':
      return {
        ...state,
        cyberware: [
          ...state.cyberware.slice(0, action.payload),
          ...state.cyberware.slice(action.payload + 1),
        ],
        cyberbucks: action.newBank,
      };
    default:
      return state;
  }
};

export default characterCreation;
