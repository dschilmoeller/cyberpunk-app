const characterCreation = (state = { creationStep: 'first_steps', armor: [], weapons: [], gear: [], cyberware: [] }, action) => {
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
            isParamedical: ap.isParamed,
            paramedic: ap.paramedic,
            makerField: ap.makerField,
            makerUpgrade: ap.makerUpgrade,
            makerFab: ap.makerFab,
            makerInvent: ap.makerInvent
        }
    }
    if (action.type === "CREATION_BUY_ARMOR") {
        return {
            ...state,
            armor: [...state.armor, action.payload]
        }
    }
    if (action.type === "CREATION_SELL_ARMOR") {
        return {
            ...state,
            armor: [
                ...state.armor.slice(0, action.payload),
            ...state.armor.slice(action.payload + 1)]
        }
    }
    if (action.type === "CREATION_BUY_WEAPON") {
        return {
            ...state,
            weapons: [...state.weapons, action.payload]
        }
    }

    if (action.type === "CREATION_SELL_WEAPON") {
        return {
            ...state,
            weapons: [
                ...state.weapons.slice(0, action.payload),
            ...state.weapons.slice(action.payload + 1)]
        }
    }

    if (action.type === "CREATION_BUY_GEAR") {
        return {
            ...state,
            gear: [...state.gear, action.payload]
        }
    }

    if (action.type === "CREATION_SELL_GEAR") {
        return {
            ...state,
            gear: [
                ...state.gear.slice(0, action.payload),
            ...state.gear.slice(action.payload + 1)]
        }
    }

    if (action.type === "CREATION_BUY_CYBERWARE") {
        return {
            ...state,
            cyberware: [...state.cyberware, action.payload]
        }
    }

    if (action.type === "CREATION_SELL_CYBERWARE") {
        return {
            ...state,
            cyberware: [
                ...state.cyberware.slice(0, action.payload),
            ...state.cyberware.slice(action.payload + 1)]
        }
    }

    return state
}

export default characterCreation;