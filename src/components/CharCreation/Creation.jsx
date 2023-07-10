import React from 'react';
import CreationAttributes from './CreationAttributes';
import CreationSkills from './CreationSkills';
import CreationRoleAbilities from './CreationRoleAbilities';
import { useSelector } from 'react-redux';

function Creation() {
    const creationStep = useSelector((store) => store.characterCreation.creationStep)
    return (
        <>
            <h1>Character Creation</h1>
            {creationStep === 'attributes' ? <CreationAttributes /> : <></>}
            {creationStep === 'skills' ? <CreationSkills /> : <></>}
            {creationStep === 'role' ? <CreationRoleAbilities /> : <></>}
        </>
    )
}

export default Creation