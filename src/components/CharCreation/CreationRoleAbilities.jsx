import React, { useState } from 'react';
import { Grid } from '@mui/material';
import Item from '../Characters/CharacterSheet/Item';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import SkillsDialog from '../Modals/SkillsDialog';
import RoleAbilitiesDialog from '../Modals/RoleAbilitiesDialog';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';

function TransitionUp(props) {
    return <Slide {...props} direction="up" />;
}

function CreationRoleAbilities() {
    const fulldot = ` \u2b24`
    const emptydot = ` \u25ef`
    const dispatch = useDispatch()
    const charDetail = useSelector(store => store.characterCreation)

    const [showSnackbar, setShowSnackbar] = React.useState(false);
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    // sets selection if returning to this page. All state is tracked through characterCreationDetail reducer
    // and fired into the database during the review stage.
    const [roleSelection, setRoleSelection] = useState(charDetail.roleSelection)

    // state for all roles - not elegant but works.
    const [rockerboy, setRockerboy] = useState(charDetail.rockerboy);
    const [solo, setSolo] = useState(charDetail.solo);
    const [netrunner, setNetrunner] = useState(charDetail.netrunner);
    const [nomad, setNomad] = useState(charDetail.nomad);
    const [media, setMedia] = useState(charDetail.media);
    const [medtech, setMedtech] = useState(charDetail.medtech);
    const [maker, setMaker] = useState(charDetail.maker);
    const [isParamedical, setIsParamedical] = useState(charDetail.isParamedical)
    const [paramedic, setParamedic] = useState(charDetail.paramedic)

    // tracking available points.
    const [availableMedSkillPoints, setAvailableMedSkillPoints] = useState(charDetail.availableMedSkillPoints)
    const [availableMakerSkillPoints, setAvailableMakerSkillPoints] = useState(charDetail.availableMakerSkillPoints)

    // special role skills - Medtech
    const [medSurgery, setMedSurgery] = useState(charDetail.medSurgery);
    const [medPharma, setMedPharma] = useState(charDetail.medPharma);
    const [medCryo, setMedCryo] = useState(charDetail.medCryo);
    // special role skills - Maker
    const [makerField, setMakerField] = useState(charDetail.makerField);
    const [makerUpgrade, setMakerUpgrade] = useState(charDetail.makerUpgrade);
    const [makerFab, setMakerFab] = useState(charDetail.makerFab);
    const [makerInvent, setMakerInvent] = useState(charDetail.makerInvent);

    // each selection resets all other role selections and zeroes out the special medtech/maker skills.
    // as well as changes isParamedical to false if not selecting medtech.
    const selectRole = (selectedRole) => {
        switch (selectedRole) {
            case 'Rockerboy':
                setRoleSelection('Rockerboy')
                resetSpecialSkills()
                setRockerboy(2)
                setSolo(0)
                setNetrunner(0)
                setNomad(0)
                setMedia(0)
                setMedtech(0)
                setMaker(0)
                setIsParamedical(false)
                setParamedic(0)
                break;
            case 'Solo':
                setRoleSelection('Solo')
                resetSpecialSkills()
                setSolo(2)
                setRockerboy(0)
                setNetrunner(0)
                setNomad(0)
                setMedia(0)
                setMedtech(0)
                setMaker(0)
                setIsParamedical(false)
                setParamedic(0)
                break;
            case 'Netrunner':
                setRoleSelection('Netrunner')
                resetSpecialSkills()
                setNetrunner(2)
                setRockerboy(0)
                setSolo(0)
                setNomad(0)
                setMedia(0)
                setMedtech(0)
                setMaker(0)
                setIsParamedical(false)
                setParamedic(0)
                break;
            case 'Nomad':
                setRoleSelection('Nomad')
                resetSpecialSkills()
                setNomad(2)
                setRockerboy(0)
                setSolo(0)
                setNetrunner(0)
                setMedia(0)
                setMedtech(0)
                setMaker(0)
                setIsParamedical(false)
                setParamedic(0)
                break;
            case 'Media':
                setRoleSelection('Media')
                resetSpecialSkills()
                setMedia(2)
                setRockerboy(0)
                setSolo(0)
                setNetrunner(0)
                setNomad(0)
                setMedtech(0)
                setMaker(0)
                setIsParamedical(false)
                setParamedic(0)
                break;
            case 'Medtech':
                setRoleSelection('Medtech')
                resetSpecialSkills()
                setMedtech(2)
                setRockerboy(0)
                setSolo(0)
                setNetrunner(0)
                setNomad(0)
                setMedia(0)
                setMaker(0)
                setAvailableMedSkillPoints(2)
                setIsParamedical(true)
                setParamedic(charDetail.firstAid)
                break;
            case 'Maker':
                setRoleSelection('Maker')
                resetSpecialSkills()
                setMaker(2)
                setRockerboy(0)
                setSolo(0)
                setNetrunner(0)
                setNomad(0)
                setMedia(0)
                setMedtech(0)
                setAvailableMakerSkillPoints(4)
                setIsParamedical(false)
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
            isParamedical,
            paramedic,
            makerField,
            makerUpgrade,
            makerFab,
            makerInvent,
            roleSelection,
            availableMakerSkillPoints,
            availableMedSkillPoints
        }
        if (roleSelection === 'Rockerboy' || roleSelection === 'Solo' || roleSelection === 'Netrunner' || roleSelection === 'Nomad' || roleSelection === 'Media'
            || (roleSelection === 'Maker' && availableMakerSkillPoints === 0)
            || (roleSelection === 'Medtech' && availableMedSkillPoints === 0)) {
            dispatch({ type: "SET_CREATION_ROLE_ABILITIES", payload: ability })
            dispatch({ type: "SET_CREATION_STEP", payload: 'gear' })
        } else {
            setShowSnackbar(true)
        }
    }

    // quick fill for faster demo/testing purposes.
    // const instaFill = () => {
    //     setRoleSelection('Maker')
    //     setRockerboy(0)
    //     setSolo(0)
    //     setNetrunner(0)
    //     setNomad(0)
    //     setMedia(0)
    //     setMedtech(0)
    //     setMaker(2)
    //     setMedCryo(0)
    //     setMedPharma(0)
    //     setMedSurgery(0)
    //     setMakerField(1)
    //     setMakerUpgrade(1)
    //     setMakerFab(1)
    //     setMakerInvent(1)
    // }
    return (<>

        <Snackbar
            TransitionComponent={TransitionUp}
            autoHideDuration={2000}
            open={showSnackbar}
            onClose={() => setShowSnackbar(false)}
            anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
        >
            <Alert onClose={() => setShowSnackbar(false)} severity="warning" sx={{ width: '100%' }}>
                Please ensure you have selected a Role and any related skills!
            </Alert>
        </Snackbar >

        <h1>Select Role</h1>
        <h3>Roles are the niche Edgerunners occupy, and grant special abilities. Click the name to find out more!</h3>
        <h3>Roles selected during creation start with 2 ranks, and represent the specialization your character has chosen up to date, as well as their primary means of making a living on a day to day basis.</h3>
        <h3>Note that Medtech and Maker roles have special skills associated with them - you'll have to make some additional selections.</h3>
        <Grid container>
            <Grid item xs={12} textAlign={'center'}>
                <Button sx={{ margin: 1 }} variant='contained' onClick={() => resetRoleAbility()}>Reset Role Selection</Button>
                <Button sx={{ margin: 1 }} variant='contained' onClick={() => dispatchRoleAbility()}>Save Role Selection</Button>
                {/* <Button sx={{ margin: 1 }} variant='contained' onClick={() => instaFill()}>Quick Role Selection</Button> */}
            </Grid>
        </Grid>
        <Grid container spacing={1} padding={2}>
            <Grid item xs={12}><Item sx={{ fontSize: '1.8em', padding: 0 }}>Role Abilities</Item></Grid>
            {roleSelection === 'Rockerboy' ? (<>
                <Grid item xs={12}><Item sx={{ backgroundColor: '#607d8b' }}>ROCKERBOY SELECTED</Item></Grid>
            </>)
                : (<>
                    <Grid item xs={6}><Item><RoleAbilitiesDialog prop={'Rockerboy'} /></Item></Grid>
                    <Grid item xs={6}><Item onClick={() => selectRole('Rockerboy')}>Select</Item></Grid>
                </>)}


            {roleSelection === 'Solo' ? (<>
                <Grid item xs={12}><Item sx={{ backgroundColor: '#607d8b' }}>SOLO SELECTED</Item></Grid>
            </>) : (<>
                <Grid item xs={6}><Item><RoleAbilitiesDialog prop={'Solo'} /></Item></Grid>
                <Grid item xs={6}><Item onClick={() => selectRole('Solo')}>Select</Item></Grid>
            </>)}

            {roleSelection === 'Netrunner' ? (<>
                <Grid item xs={12}><Item sx={{ backgroundColor: '#607d8b' }}>NETRUNNER SELECTED</Item></Grid>
            </>) : (<>
                <Grid item xs={6}><Item><RoleAbilitiesDialog prop={'Netrunner'} /></Item></Grid>
                <Grid item xs={6}><Item onClick={() => selectRole('Netrunner')}>Select</Item></Grid>
            </>)}

            {roleSelection === 'Nomad' ? (<>
                <Grid item xs={12}><Item sx={{ backgroundColor: '#607d8b' }}>NOMAD SELECTED</Item></Grid>
            </>) : (<>
                <Grid item xs={6}><Item><RoleAbilitiesDialog prop={'Nomad'} /></Item></Grid>
                <Grid item xs={6}><Item onClick={() => selectRole('Nomad')}>Select</Item></Grid>
            </>)}

            {roleSelection === 'Media' ? (<>
                <Grid item xs={12}><Item sx={{ backgroundColor: '#607d8b' }}>MEDIA SELECTED</Item></Grid>
            </>) : (<>
                <Grid item xs={6}><Item><RoleAbilitiesDialog prop={'Media'} /></Item></Grid>
                <Grid item xs={6}><Item onClick={() => selectRole('Media')}>Select</Item></Grid>
            </>)}

            {roleSelection === 'Medtech' ? (<>
                <Grid item xs={12}><Item sx={{ backgroundColor: '#607d8b' }}>MEDTECH SELECTED</Item></Grid>
            </>) : (<>
                <Grid item xs={6}><Item><RoleAbilitiesDialog prop={'Medtech'} /></Item></Grid>
                <Grid item xs={6}><Item onClick={() => selectRole('Medtech')}>Select</Item></Grid>
            </>)}

            {roleSelection === 'Maker' ? (<>
                <Grid item xs={12}><Item sx={{ backgroundColor: '#607d8b' }}>MAKER SELECTED</Item></Grid>
            </>) : (<>
                <Grid item xs={6}><Item><RoleAbilitiesDialog prop={'Maker'} /></Item></Grid>
                <Grid item xs={6}><Item onClick={() => selectRole('Maker')}>Select</Item></Grid>
            </>)}
        </Grid>

        <Grid container spacing={1} padding={2}>
            {roleSelection === 'Medtech' ? (<>

                <Grid item xs={12}><Item sx={{ fontSize: '1.8em', padding: 0 }}>Special Skills</Item></Grid>
                <Grid item xs={12}><Item><h3>Points Available: {availableMedSkillPoints}</h3></Item></Grid>

                <Grid item xs={4}><Item><RoleAbilitiesDialog prop={'Surgery'} /></Item></Grid>
                <Grid item xs={4}><Item>{dotReturn(medSurgery)}</Item></Grid>
                {availableMedSkillPoints > 0 ? (<>
                    <Grid item xs={4}><Item onClick={() => selectMedtechRoleSkill('Surgery')}>Select Skill</Item></Grid>
                </>) : (<>
                    <Grid item xs={4}><Item>No More Selections Available</Item></Grid>
                </>)}


                <Grid item xs={4}><Item><RoleAbilitiesDialog prop={'Pharmaceuticals'} /></Item></Grid>
                <Grid item xs={4}><Item>{dotReturn(medPharma)}</Item></Grid>
                {availableMedSkillPoints > 0 ? (<>
                    <Grid item xs={4}><Item onClick={() => selectMedtechRoleSkill('Pharmaceuticals')}>Select Skill</Item></Grid>
                </>) : (<>
                    <Grid item xs={4}><Item>No More Selections Available</Item></Grid>
                </>)}

                <Grid item xs={4}><Item><RoleAbilitiesDialog prop={'Cryogenics'} /></Item></Grid>
                <Grid item xs={4}><Item>{dotReturn(medCryo)}</Item></Grid>
                {availableMedSkillPoints > 0 ? (<>
                    <Grid item xs={4}><Item onClick={() => selectMedtechRoleSkill('Cryogenics')}>Select Skill</Item></Grid>
                </>) : (<>
                    <Grid item xs={4}><Item>No More Selections Available</Item></Grid>
                </>)}

                <Grid item xs={12}><Item><h3>First Aid:</h3></Item></Grid>
                <Grid item xs={6}><Item><SkillsDialog prop={'First Aid'} /></Item></Grid>
                <Grid item xs={6}><Item>{dotReturn(charDetail.firstAid)}</Item></Grid>
                <Grid item xs={12}><Item>becomes </Item></Grid>
                <Grid item xs={6}><Item><SkillsDialog prop={'Paramedic'} /></Item></Grid>
                <Grid item xs={6}><Item>{dotReturn(paramedic)}</Item></Grid>

            </>) : <></>}

        </Grid>

        <Grid container spacing={1} padding={2}>
            {roleSelection === 'Maker' ? (<>
                <Grid item xs={12}><Item sx={{ fontSize: '1.8em', padding: 0 }}>Special Skills</Item></Grid>
                <Grid item xs={12}><Item><h3>Points Available: {availableMakerSkillPoints}</h3></Item></Grid>

                <Grid item xs={4}><Item><RoleAbilitiesDialog prop={'Field Expertise'} /></Item></Grid>
                <Grid item xs={4}><Item>{dotReturn(makerField)}</Item></Grid>
                {availableMakerSkillPoints > 0 ? (<>
                    <Grid item xs={4}><Item onClick={() => selectMakerRoleSkill('Field Expertise')}>Select Skill</Item></Grid>
                </>) : (<>
                    <Grid item xs={4}><Item>No More Selections Available</Item></Grid>
                </>)}

                <Grid item xs={4}><Item><RoleAbilitiesDialog prop={'Upgrade Expertise'} /></Item></Grid>
                <Grid item xs={4}><Item>{dotReturn(makerUpgrade)}</Item></Grid>
                {availableMakerSkillPoints > 0 ? (<>
                    <Grid item xs={4}><Item onClick={() => selectMakerRoleSkill('Upgrade Expertise')}>Select Skill</Item></Grid>
                </>) : (<>
                    <Grid item xs={4}><Item>No More Selections Available</Item></Grid>
                </>)}

                <Grid item xs={4}><Item><RoleAbilitiesDialog prop={'Fabrication Expertise'} /></Item></Grid>
                <Grid item xs={4}><Item>{dotReturn(makerFab)}</Item></Grid>
                {availableMakerSkillPoints > 0 ? (<>
                    <Grid item xs={4}><Item onClick={() => selectMakerRoleSkill('Fabrication')}>Select Skill</Item></Grid>
                </>) : (<>
                    <Grid item xs={4}><Item>No More Selections Available</Item></Grid>
                </>)}

                <Grid item xs={4}><Item><RoleAbilitiesDialog prop={'Invention Expertise'} /></Item></Grid>
                <Grid item xs={4}><Item>{dotReturn(makerInvent)}</Item></Grid>
                {availableMakerSkillPoints > 0 ? (<>
                    <Grid item xs={4}><Item onClick={() => selectMakerRoleSkill('Invention')}>Select Skill</Item></Grid>
                </>) : (<>
                    <Grid item xs={4}><Item>No More Selections Available</Item></Grid>
                </>)}
            </>) : <></>}
        </Grid>
    </>)
}

export default CreationRoleAbilities