import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import Item from '../Characters/CharacterSheet/Item';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import SpecialModal from '../Modals/SpecialModal';
import SkillsModal from '../Modals/SkillsModal';

function CreationRoleAbilities() {
    const fulldot = ` \u2b24`
    const emptydot = ` \u25ef`
    const dispatch = useDispatch()
    const characterDetails = useSelector(store => store.characterCreation)

    const [roleSelection, setRoleSelection] = useState('')

    const [rockerboy, setRockerboy] = useState(0);
    const [solo, setSolo] = useState(0);
    const [netrunner, setNetrunner] = useState(0);
    const [nomad, setNomad] = useState(0);
    const [media, setMedia] = useState(0);
    const [medtech, setMedtech] = useState(0);
    const [maker, setMaker] = useState(0);
    const [isParamed, setIsParamed] = useState(false)
    const [paramedic, setParamedic] = useState(0)

    const [availableMedSkillPoints, setAvailableMedSkillPoints] = useState(0)
    const [availableMakerSkillPoints, setAvailableMakerSkillPoints] = useState(0)

    // special role skills - Medtech
    const [medSurgery, setMedSurgery] = useState(0);
    const [medPharma, setMedPharma] = useState(0);
    const [medCryo, setMedCryo] = useState(0);
    // special role skills - Maker
    const [makerField, setMakerField] = useState(0);
    const [makerUpgrade, setMakerUpgrade] = useState(0);
    const [makerFab, setMakerFab] = useState(0);
    const [makerInvent, setMakerInvent] = useState(0);

    const selectRole = (selectedRole) => {
        switch (selectedRole) {
            case 'Rockerboy':
                setRoleSelection('Rockerboy')
                resetSpecialSkills()
                setRockerboy(2)
                setIsParamed(false)
                setParamedic(0)
                break;
            case 'Solo':
                setRoleSelection('Solo')
                resetSpecialSkills()
                setSolo(2)
                setIsParamed(false)
                setParamedic(0)
                break;
            case 'Netrunner':
                setRoleSelection('Netrunner')
                resetSpecialSkills()
                setNetrunner(2)
                setIsParamed(false)
                setParamedic(0)
                break;
            case 'Nomad':
                setRoleSelection('Nomad')
                resetSpecialSkills()
                setNomad(2)
                setIsParamed(false)
                setParamedic(0)
                break;
            case 'Media':
                setRoleSelection('Media')
                resetSpecialSkills()
                setMedia(2)
                setIsParamed(false)
                setParamedic(0)
                break;
            case 'Medtech':
                setRoleSelection('Medtech')
                resetSpecialSkills()
                setMedtech(2)
                setAvailableMedSkillPoints(2)
                setIsParamed(true)
                setParamedic(characterDetails.firstAid)
                break;
            case 'Maker':
                setRoleSelection('Maker')
                resetSpecialSkills()
                setMaker(2)
                setAvailableMakerSkillPoints(4)
                setIsParamed(false)
                setParamedic(0)
                break;
        }
    }

    const resetRoleAbility = () => {
        setRoleSelection('')
        setRockerboy(0)
        setSolo(0)
        setNetrunner(0)
        setNomad(0)
        setMedia(0)
        setMedtech(0)
        setMaker(0)
        setMedCryo(0)
        setMedPharma(0)
        setMedSurgery(0)
        setMakerField(0)
        setMakerUpgrade(0)
        setMakerFab(0)
        setMakerInvent(0)
    }

    const dotReturn = (skill) => {
        let returnedDots = ''

        for (let i = 0; i < skill; i++) {
            returnedDots += fulldot;
        }
        let j = skill
        for (j; j <= 4; j++) {
            returnedDots += emptydot
        }
        return returnedDots
    }

    const resetSpecialSkills = () => {
        setMedCryo(0)
        setMedPharma(0)
        setMedSurgery(0)
        setMakerFab(0)
        setMakerField(0)
        setMakerInvent(0)
        setMakerUpgrade(0)
    }

    const selectMedtechRoleSkill = (roleSkillSelection) => {
        if (availableMedSkillPoints > 0) {
            switch (roleSkillSelection) {
                case 'Surgery':
                    setMedSurgery(medSurgery + 1)
                    setAvailableMedSkillPoints(availableMedSkillPoints - 1)
                    break;
                case 'Pharmaceuticals':
                    setMedPharma(medPharma + 1)
                    setAvailableMedSkillPoints(availableMedSkillPoints - 1)
                    break;
                case 'Cryogenics':
                    setMedCryo(medCryo + 1)
                    setAvailableMedSkillPoints(availableMedSkillPoints - 1)
                    break;
            }
        }
    }

    const selectMakerRoleSkill = (roleSkillSelection) => {
        if (availableMakerSkillPoints > 0) {
            switch (roleSkillSelection) {
                case 'Field Expertise':
                    setMakerField(makerField + 1)
                    setAvailableMakerSkillPoints(availableMakerSkillPoints - 1)
                    break;
                case 'Upgrade Expertise':
                    setMakerUpgrade(makerUpgrade + 1)
                    setAvailableMakerSkillPoints(availableMakerSkillPoints - 1)
                    break;
                case 'Fabrication':
                    setMakerFab(makerFab + 1)
                    setAvailableMakerSkillPoints(availableMakerSkillPoints - 1)
                    break;
                case 'Invention':
                    setMakerInvent(makerInvent + 1)
                    setAvailableMakerSkillPoints(availableMakerSkillPoints - 1)
                    break;

            }
        }
    }

    const dispatchRoleAbility = () => {
        const ability = {
            rockerboy,
            solo,
            netrunner,
            nomad,
            media,
            medtech,
            maker,
            medSurgery,
            medPharma,
            medCryo,
            isParamed,
            paramedic,
            makerField,
            makerUpgrade,
            makerFab,
            makerInvent
        }
        if (roleSelection === 'Rockerboy' || roleSelection === 'Solo' || roleSelection === 'Netrunner' || roleSelection === 'Nomad' || roleSelection === 'Media'
            || (roleSelection === 'Maker' && availableMakerSkillPoints === 0)
            || (roleSelection === 'Medtech' && availableMedSkillPoints === 0)) {
            dispatch({ type: "SET_CREATION_ROLE_ABILITIES", payload: ability })
        } else {
            alert('Please ensure a role ability is selected and any associated skills are declared.')
        }
    }

    return (<>
        <h1>Select Role</h1>
        <Grid container>
            <Grid item xs={12} textAlign={'center'}>
                <Button sx={{ margin: 1 }} variant='contained' onClick={() => resetRoleAbility()}>Reset Role Selection</Button>
                <Button sx={{ margin: 1 }} variant='contained' onClick={() => dispatchRoleAbility()}>Save Role Selection</Button>
            </Grid>
        </Grid>
        <Grid container>
            <Grid item xs={12}><Item><h1>Role Abilities</h1></Item></Grid>
            {roleSelection === 'Rockerboy' ? (<>
                <Grid item xs={12}><Item>ROCKERBOY SELECTED</Item></Grid>
            </>)
                : (<>
                    <Grid item xs={6}><Item><SpecialModal prop={'Rockerboy'} /></Item></Grid>
                    <Grid item xs={6}><Item onClick={() => selectRole('Rockerboy')}>Select</Item></Grid>
                </>)}


            {roleSelection === 'Solo' ? (<>
                <Grid item xs={12}><Item>SOLO SELECTED</Item></Grid>
            </>) : (<>
                <Grid item xs={6}><Item><SpecialModal prop={'Solo'} /></Item></Grid>
                <Grid item xs={6}><Item onClick={() => selectRole('Solo')}>Select</Item></Grid>
            </>)}

            {roleSelection === 'Netrunner' ? (<>
                <Grid item xs={12}><Item>NETRUNNER SELECTED</Item></Grid>
            </>) : (<>
                <Grid item xs={6}><Item><SpecialModal prop={'Netrunner'} /></Item></Grid>
                <Grid item xs={6}><Item onClick={() => selectRole('Netrunner')}>Select</Item></Grid>
            </>)}

            {roleSelection === 'Nomad' ? (<>
                <Grid item xs={12}><Item>NOMAD SELECTED</Item></Grid>
            </>) : (<>
                <Grid item xs={6}><Item><SpecialModal prop={'Nomad'} /></Item></Grid>
                <Grid item xs={6}><Item onClick={() => selectRole('Nomad')}>Select</Item></Grid>
            </>)}

            {roleSelection === 'Media' ? (<>
                <Grid item xs={12}><Item>MEDIA SELECTED</Item></Grid>
            </>) : (<>
                <Grid item xs={6}><Item><SpecialModal prop={'Media'} /></Item></Grid>
                <Grid item xs={6}><Item onClick={() => selectRole('Media')}>Select</Item></Grid>
            </>)}

            {roleSelection === 'Medtech' ? (<>
                <Grid item xs={12}><Item>MEDTECH SELECTED</Item></Grid>
            </>) : (<>
                <Grid item xs={6}><Item><SpecialModal prop={'Medtech'} /></Item></Grid>
                <Grid item xs={6}><Item onClick={() => selectRole('Medtech')}>Select</Item></Grid>
            </>)}

            {roleSelection === 'Maker' ? (<>
                <Grid item xs={12}><Item>MAKER SELECTED</Item></Grid>
            </>) : (<>
                <Grid item xs={6}><Item><SpecialModal prop={'Maker'} /></Item></Grid>
                <Grid item xs={6}><Item onClick={() => selectRole('Maker')}>Select</Item></Grid>
            </>)}
        </Grid>

        <Grid container>
            {roleSelection === 'Medtech' ? (<>

                <Grid item xs={12}><Item><h1>Special Skills</h1></Item></Grid>
                <Grid item xs={12}><Item><h3>Points Available: {availableMedSkillPoints}</h3></Item></Grid>

                <Grid item xs={4}><Item><SpecialModal prop={'Surgery'} /></Item></Grid>
                {availableMedSkillPoints > 0 ? (<>
                    <Grid item xs={4}><Item onClick={() => selectMedtechRoleSkill('Surgery')}>Select Skill</Item></Grid>
                </>) : (<>
                    <Grid item xs={4}><Item>No More Selections Available</Item></Grid>
                </>)}
                <Grid item xs={4}><Item>{dotReturn(medSurgery)}</Item></Grid>


                <Grid item xs={4}><Item><SpecialModal prop={'Pharmaceuticals'} /></Item></Grid>
                {availableMedSkillPoints > 0 ? (<>
                    <Grid item xs={4}><Item onClick={() => selectMedtechRoleSkill('Pharmaceuticals')}>Select Skill</Item></Grid>
                </>) : (<>
                    <Grid item xs={4}><Item>No More Selections Available</Item></Grid>
                </>)}
                <Grid item xs={4}><Item>{dotReturn(medPharma)}</Item></Grid>

                <Grid item xs={4}><Item><SpecialModal prop={'Cryogenics'} /></Item></Grid>
                {availableMedSkillPoints > 0 ? (<>
                    <Grid item xs={4}><Item onClick={() => selectMedtechRoleSkill('Cryogenics')}>Select Skill</Item></Grid>
                </>) : (<>
                    <Grid item xs={4}><Item>No More Selections Available</Item></Grid>
                </>)}
                <Grid item xs={4}><Item>{dotReturn(medCryo)}</Item></Grid>

<Grid item xs={12}><Item><h3>First Aid:</h3></Item></Grid>
                <Grid item xs={6}><Item><SkillsModal prop={'First Aid'} /></Item></Grid>
                <Grid item xs={6}><Item>{dotReturn(characterDetails.firstAid)}</Item></Grid>
                <Grid item xs={12}><Item>becomes </Item></Grid>
                <Grid item xs={6}><Item><SkillsModal prop={'Paramedic'} /></Item></Grid>
                <Grid item xs={6}><Item>{dotReturn(paramedic)}</Item></Grid>


            </>) : <></>}

        </Grid>

        <Grid container>
            {roleSelection === 'Maker' ? (<>
                <Grid item xs={12}><Item><h1>Special Skills</h1></Item></Grid>
                <Grid item xs={12}><Item><h3>Points Available: {availableMakerSkillPoints}</h3></Item></Grid>

                <Grid item xs={4}><Item><SpecialModal prop={'Field Expertise'} /></Item></Grid>
                {availableMakerSkillPoints > 0 ? (<>
                    <Grid item xs={4}><Item onClick={() => selectMakerRoleSkill('Field Expertise')}>Select Skill</Item></Grid>
                </>) : (<>
                    <Grid item xs={4}><Item>No More Selections Available</Item></Grid>
                </>)}
                <Grid item xs={4}><Item>{dotReturn(makerField)}</Item></Grid>

                <Grid item xs={4}><Item><SpecialModal prop={'Upgrade Expertise'} /></Item></Grid>
                {availableMakerSkillPoints > 0 ? (<>
                    <Grid item xs={4}><Item onClick={() => selectMakerRoleSkill('Upgrade Expertise')}>Select Skill</Item></Grid>
                </>) : (<>
                    <Grid item xs={4}><Item>No More Selections Available</Item></Grid>
                </>)}
                <Grid item xs={4}><Item>{dotReturn(makerUpgrade)}</Item></Grid>

                <Grid item xs={4}><Item><SpecialModal prop={'Fabrication'} /></Item></Grid>
                {availableMakerSkillPoints > 0 ? (<>
                    <Grid item xs={4}><Item onClick={() => selectMakerRoleSkill('Fabrication')}>Select Skill</Item></Grid>
                </>) : (<>
                    <Grid item xs={4}><Item>No More Selections Available</Item></Grid>
                </>)}
                <Grid item xs={4}><Item>{dotReturn(makerFab)}</Item></Grid>

                <Grid item xs={4}><Item><SpecialModal prop={'Invention'} /></Item></Grid>
                {availableMakerSkillPoints > 0 ? (<>
                    <Grid item xs={4}><Item onClick={() => selectMakerRoleSkill('Invention')}>Select Skill</Item></Grid>
                </>) : (<>
                    <Grid item xs={4}><Item>No More Selections Available</Item></Grid>
                </>)}
                <Grid item xs={4}><Item>{dotReturn(makerInvent)}</Item></Grid>
            </>) : <></>}
        </Grid>
    </>)
}

export default CreationRoleAbilities