import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import { useHistory, useParams } from 'react-router-dom';

import Grid from '@mui/material/Grid';
import Item from '../CharacterSheet/Item';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import AdvancementAttributes from './AdvancementAttributes';
import AdvancementSkills from './AdvancementSkills';
import AdvancementSpecial from './AdvancementSpecial';
import AdvancementOther from './AdvancementOther';

import AdvancementGearArmor from './AdvancementGearArmor';
import AdvancementGearWeapons from './AdvancementGearWeapons';
import AdvancementGearOther from './AdvancementGearOther';
import AdvancementNetrunnerGear from './AdvancementNetrunnerGear';
import AdvancementMakePharmaDialog from '../../Modals/AdvancementMakePharmaDialog';
import AdvancementCyberware from './AdvancementCyberware';
import AdvancementGarage from './AdvancementGarage';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';

function TransitionUp(props) {
    return <Slide {...props} direction="up" />;
}

function AdvancementSheet() {
    const advancementDetails = useSelector((store) => store.advancementDetail);
    const equipmentDetails = useSelector(store => store.advancementGear)
    const modDetails = useSelector(store => store.characterModMaster)

    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();

    const euroBuck = `\u20AC$`

    // opener for primary tabs.
    const [value, setValue] = useState(false)
    const handleChange = (event, newValue) => {
        setValue(newValue);
        setExperienceValue(false)
        setShopValue(false)
    }

    // next level down tabs
    const [experienceValue, setExperienceValue] = useState(false)
    const handleExperienceValueChange = (event, newValue) => {
        setExperienceValue(newValue);
        setShopValue(false)
    }
    const [equipmentValue, setShopValue] = useState(false)
    const equipmentValueChange = (event, newValue) => {
        setShopValue(newValue)
        setExperienceValue(false)
    }

    const [showSnackbar, setShowSnackbar] = React.useState(false);
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    useEffect(() => {
        dispatch({ type: "FETCH_ADVANCEMENT_DETAIL", payload: params.id })
        dispatch({ type: "FETCH_ARMOR_LIST" })
        dispatch({ type: "FETCH_SHIELD_LIST" })
        dispatch({ type: "FETCH_WEAPON_LIST" })
        dispatch({ type: "FETCH_GRENADE_LIST" })
        dispatch({ type: "FETCH_MISC_GEAR_LIST" })
        dispatch({ type: "FETCH_CYBERWARE_LIST" })
        dispatch({ type: "FETCH_NETRUNNER_LIST" })
    }, [])

    const fetchCharacterDetail = () => {
        dispatch({ type: "FETCH_ADVANCEMENT_DETAIL", payload: params.id })
        window.location.reload(true);
    }

    const saveCharacterChanges = () => {
        if (advancementDetails.perm_humanity_loss + advancementDetails.temp_humanity_loss > 39) {
            setShowSnackbar(true)
        } else {
            dispatch({ type: "SAVE_ADVANCEMENT_DETAIL", payload: { char: advancementDetails, gear: equipmentDetails, mods: modDetails } })
            history.push('/characterlist')
        }
    }

    return (
        <>
            <div>
                <Snackbar
                    TransitionComponent={TransitionUp}
                    autoHideDuration={4000}
                    open={showSnackbar}
                    onClose={() => setShowSnackbar(false)}
                    anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
                >
                    <Alert onClose={() => setShowSnackbar(false)} severity="warning" sx={{ width: '100%' }}>
                        You cannot save! Your character will undergo immediate cyberpsychosis if you don't have at least 1 humanity remaining!
                    </Alert>
                </Snackbar >
                <Grid container>
                    <Grid item display={'flex'} justifyContent={'center'} xs={4}>
                        <Button variant='contained' onClick={() => history.push('/characterlist')}>Back to Character List</Button>
                    </Grid>
                
                    <Grid item display={'flex'} justifyContent={'center'} xs={4}>
                        <Button variant='contained' onClick={() => fetchCharacterDetail()}>Reset Changes</Button>
                    </Grid>
                
                    <Grid item display={'flex'} justifyContent={'center'} xs={4}>
                        <Button variant='contained' onClick={() => saveCharacterChanges()}>Save Changes</Button>
                    </Grid>
                </Grid>

                {advancementDetails ? (
                    <>
                        <Grid container>
                            <Grid item xs={4}>
                                <Item>Name: {advancementDetails.handle}</Item>
                            </Grid>
                            <Grid item xs={4}>
                                <Item>Player: {advancementDetails.player}</Item>
                            </Grid>
                            <Grid item xs={4}>
                                <Item>Campaign: {advancementDetails.campaign_name} </Item>
                            </Grid>
                        </Grid>

                        <Grid container>
                            <Grid item xs={6}><Item>Available XP: {advancementDetails.max_xp - advancementDetails.spent_xp}</Item></Grid>
                            <Grid item xs={6}><Item>Cash on Hand: {euroBuck}{advancementDetails.bank}</Item></Grid>
                        </Grid>
                    </>
                ) : <></>}

                <Item><h2>I want to...</h2>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor='primary'
                        textColor='secondary'>
                        <Tab value='experience' label='Spend XP' />
                        <Tab value='gear' label='Equip Gear' />
                    </Tabs></Item>

                {value === 'experience' ? (
                    <Tabs
                        value={experienceValue}
                        onChange={handleExperienceValueChange}
                        indicatorColor='primary'
                        textColor='secondary'>
                        <Tab value='attributes' label='Attributes' />
                        <Tab value='skills' label='Skills' />
                        <Tab value='role' label='Role Abilities' />
                        <Tab value='otherTraits' label='Other Traits' />
                    </Tabs>) : <></>}

                {experienceValue === 'attributes' ? (<>
                    <AdvancementAttributes />
                </>) : <></>}

                {experienceValue === 'skills' ? (<>
                    <AdvancementSkills />
                </>) : <></>}

                {experienceValue === 'role' ? (<>
                    <AdvancementSpecial />
                </>) : <></>}

                {experienceValue === 'otherTraits' ? (<>
                    <AdvancementOther />
                </>) : <></>}

                {value === 'gear' ? (
                    <Tabs
                        value={equipmentValue}
                        onChange={equipmentValueChange}
                        indicatorColor='primary'
                        textColor='secondary'>
                        <Tab value='armor' label='Armor' />
                        <Tab value='weapons' label='Weapons' />
                        <Tab value='other' label='Other Gear' />
                        {advancementDetails.netrunner > 0 && <Tab value='netrunner' label='Netrunner Gear' />}
                        <Tab value='cyberware' label='Cyberware' />
                        <Tab value='vehicles' label='Vehicles' />
                    </Tabs>) : <></>}

                {equipmentValue === 'armor' ? (<>
                    <AdvancementGearArmor />
                </>) : <></>}

                {equipmentValue === 'weapons' ? (<>
                    <AdvancementGearWeapons />
                </>) : <></>}

                {equipmentValue === 'other' && advancementDetails.med_pharma > 0 ?
                    (<>
                        <AdvancementMakePharmaDialog />
                        <AdvancementGearOther />
                    </>) : <></>}

                {equipmentValue === 'other' && advancementDetails.med_pharma < 1 ?
                    (<>
                        <AdvancementGearOther />
                    </>) : <></>}

                {equipmentValue === 'netrunner' ? (<>
                    <AdvancementNetrunnerGear />
                </>) : <></>}

                {equipmentValue === 'cyberware' ? (<>
                    <AdvancementCyberware />
                </>) : <></>}

                {equipmentValue === 'vehicles' ? (<>
                    <AdvancementGarage />
                </>) : <></>}

            </div>
        </>
    )
}

export default AdvancementSheet;
