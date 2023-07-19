const characterCreation = (state = {
    creationStep: 'first_steps',
    handle: '', player: '', campaign: '', role: '', culture: '', concept: '',

    strength: 0, body: 0, reflexes: 0, move: 0, appearance: 0, cool: 0, street_cred: 1, intelligence: 0, willpower: 0, technique: 0,

    skillNumber: 4,
    athletics: 0, brawling: 0, concentration: 0, evasion: 0, fastTalk: 0, firearms: 0, legerdemain: 0, meleeWeapons: 0, perception: 0, streetwise: 0,
    demolitions: 0, driveLand: 0, driveExotic: 0, etiquette: 0, exoticWeapons: 0, heavyWeapons: 0, performance: 0, stealth: 0, survival: 0, tracking: 0,
    business: 0, cryptography: 0, cyberTech: 0, firstAid: 0, investigation: 0, gambling: 0, language: 0, militaryTech: 0, science: 0, vehicleTech: 0,

    roleSelection: '',
    rockerboy: 0, solo: 0, netrunner: 0, nomad: 0, media: 0, medtech: 0, maker: 0,
    medSurgery: 0, medPharma: 0, medCryo: 0, isParamedical: false, paramedic: 0,
    makerField: 0, makerUpgrade: 0, makerFab: 0, makerInvent: 0,
    availableMedSkillPoints: 0, availableMakerSkillPoints: 0,


    armor: [], shield: [], weapons: [], gear: [], cyberware: [],

    gearbucks: 1500, cyberbucks: 2500
},
    action) => {
    const ap = action.payload
    if (action.type === "SET_CREATION_STEP") {
        return { ...state, creationStep: action.payload }
    }

    if (action.type === "SET_CREATION_FIRST_STEPS") {
        return {
            ...state,
            handle: ap.handle,
            player: ap.player,
            campaign: ap.campaign,
            role: ap.role,
            culture: ap.culture,
            concept: ap.concept
        }
    }
    if (action.type === "SET_CREATION_ATTRIBUTES") {
        return {
            ...state,
            strength: ap.strength,
            body: ap.body,
            reflexes: ap.reflexes,
            move: ap.move,
            appearance: ap.appearance,
            cool: ap.cool,
            street_cred: ap.street_cred,
            intelligence: ap.intelligence,
            willpower: ap.willpower,
            technique: ap.technique
        }
    }
    if (action.type === "SET_CREATION_SKILLS") {
        return {
            ...state,
            
            skillNumber: ap.skillNumber,

            athletics: ap.athletics,
            brawling: ap.brawling,
            concentration: ap.concentration,
            evasion: ap.evasion,
            fastTalk: ap.fastTalk,
            firearms: ap.firearms,
            legerdemain: ap.legerdemain,
            meleeWeapons: ap.meleeWeapons,
            perception: ap.perception,
            streetwise: ap.streetwise,
            
            demolitions: ap.demolitions,
            driveLand: ap.driveLand,
            driveExotic: ap.driveExotic,
            etiquette: ap.etiquette,
            exoticWeapons: ap.exoticWeapons,
            heavyWeapons: ap.heavyWeapons,
            performance: ap.performance,
            stealth: ap.stealth,
            survival: ap.survival,
            tracking: ap.tracking,

            business: ap.business,
            cryptography: ap.cryptography,
            cyberTech: ap.cyberTech,
            investigation: ap.investigation,
            firstAid: ap.firstAid,
            gambling: ap.gambling,
            language: ap.language,
            militaryTech: ap.militaryTech,
            science: ap.science,
            vehicleTech: ap.vehicleTech
        }
    }
    if (action.type === "SET_CREATION_ROLE_ABILITIES") {
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
            availableMedSkillPoints: ap.availableMedSkillPoints
        }
    }
    if (action.type === "CREATION_BUY_ARMOR") {
        return {
            ...state,
            armor: [...state.armor, action.payload],
            gearbucks: action.newBank
        }
    }
    if (action.type === "CREATION_SELL_ARMOR") {
        return {
            ...state,
            armor: [
                ...state.armor.slice(0, action.payload),
                ...state.armor.slice(action.payload + 1)],
            gearbucks: action.newBank
        }
    }

    if (action.type === "CREATION_BUY_SHIELD") {
        return {
            ...state,
            shield: [...state.shield, action.payload],
            gearbucks: action.newBank
        }
    }
    if (action.type === "CREATION_SELL_SHIELD") {
        return {
            ...state,
            shield: [
                ...state.shield.slice(0, action.payload),
                ...state.shield.slice(action.payload + 1)],
            gearbucks: action.newBank
        }
    }

    if (action.type === "CREATION_BUY_WEAPON") {
        return {
            ...state,
            weapons: [...state.weapons, action.payload],
            gearbucks: action.newBank
        }
    }
    if (action.type === "CREATION_SELL_WEAPON") {
        return {
            ...state,
            weapons: [
                ...state.weapons.slice(0, action.payload),
                ...state.weapons.slice(action.payload + 1)],
            gearbucks: action.newBank
        }
    }
    if (action.type === "CREATION_BUY_GEAR") {
        return {
            ...state,
            gear: [...state.gear, action.payload],
            gearbucks: action.newBank
        }
    }
    if (action.type === "CREATION_SELL_GEAR") {
        return {
            ...state,
            gear: [
                ...state.gear.slice(0, action.payload),
                ...state.gear.slice(action.payload + 1)],
            gearbucks: action.newBank
        }
    }
    if (action.type === "CREATION_BUY_CYBERWARE") {
        return {
            ...state,
            cyberware: [...state.cyberware, action.payload],
            cyberbucks: action.newBank
        }
    }
    if (action.type === "CREATION_SELL_CYBERWARE") {
        return {
            ...state,
            cyberware: [
                ...state.cyberware.slice(0, action.payload),
                ...state.cyberware.slice(action.payload + 1)],
            cyberbucks: action.newBank
        }
    }

    return state
}

export default characterCreation;