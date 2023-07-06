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
        concentration: ap.concentration,
        contortionist: ap.contortionist,
        interrogation: ap.interrogation,
        legerdemain: ap.legerdemain,
        perception: ap.perception,
        persuasion: ap.persuasion,
        resist: ap.resist,
        streetwise: ap.streetwise,
        subterfuge: ap.subterfuge
        }
    }
    return state
}

export default characterCreation;