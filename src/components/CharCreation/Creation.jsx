import React, { useEffect } from 'react';
import CreationFirstSteps from './CreationFirstStep';
import CreationAttributes from './CreationAttributes';
import CreationSkills from './CreationSkills';
import CreationRoleAbilities from './CreationRoleAbilities';
import CreationGear from './CreationGear';
import CreationCyberware from './CreationCyberware';
import CreationReview from './CreationReview';
import { useSelector, useDispatch } from 'react-redux';

function Creation() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({type: "FETCH_ARMOR_LIST"})
        dispatch({type: "FETCH_SHIELD_LIST"})
        dispatch({type: "FETCH_WEAPON_LIST"})
        dispatch({type: "FETCH_MISC_GEAR_LIST"})
        dispatch({type: "FETCH_CYBERWARE_LIST"})
    })

    const creationStep = useSelector((store) => store.characterCreation.creationStep)
    return (
        <>
            <h1>Character Creation</h1>
            {creationStep === 'first_steps' ? <CreationFirstSteps /> : <></>}
            {creationStep === 'attributes' ? <CreationAttributes /> : <></>}
            {creationStep === 'skills' ? <CreationSkills /> : <></>}
            {creationStep === 'role' ? <CreationRoleAbilities /> : <></>}
            {creationStep === 'gear' ? <CreationGear /> : <></>}
            {creationStep === 'cyberware' ? <CreationCyberware /> : <></>}
            {creationStep === 'review' ? <CreationReview /> : <></>}
            
        </>
    )
}

export default Creation