const characterCreation = (state = {creationStep: 'attributes'}, action) => {
    const ap = action.payload
    if (action.type === "SET_CREATION_STEP") {
        return {...state, creationStep: action.payload}
    }

    if (action.type === "SET_CREATION_ATTRIBUTES") {
        return {...state, 
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
        return {...state,
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
    return state
}

export default characterCreation;