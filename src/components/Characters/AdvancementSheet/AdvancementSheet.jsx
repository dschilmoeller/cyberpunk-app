import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import { useHistory, useParams, useLocation } from 'react-router-dom';

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
import AdvancementClothes from './AdvancementClothes';

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
    const location = useLocation();

    const euroBuck = `\u20AC$`

    // opener for primary tabs.
    const [value, setValue] = useState(location.hash ? location.hash : false)
    const handleChange = (event, newValue) => {
        setValue(newValue);
        // setExperienceValue(false)
        setShopValue(false)
    }

    // next level down tabs
    // const [experienceValue, setExperienceValue] = useState(location.hash ? location.hash : false)
    // const handleExperienceValueChange = (event, newValue) => {
    //     setExperienceValue(newValue);
    //     setShopValue(false)
    // }
    const [equipmentValue, setShopValue] = useState(location.hash ? location.hash : false)
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
        dispatch({ type: "FETCH_MASTER_LISTS" })
    }, [])

    useEffect(() => {
        window.addEventListener('beforeunload', alertUser)
        return () => {
            window.removeEventListener('beforeunload', alertUser)
        }
    })

    const alertUser = (event) => {
        event.preventDefault()
        event.returnValue = ''
    }

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
                </Snackbar>
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
                            <Grid item xs={6}><Item><h2>Available XP: {advancementDetails.max_xp - advancementDetails.spent_xp}</h2></Item></Grid>
                            <Grid item xs={6}><Item><h2>Cash on Hand: {euroBuck}{advancementDetails.bank}</h2></Item></Grid>
                        </Grid>
                    </>
                ) : <></>}

                <Item><h2>I want to...</h2>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor='primary'
                        textColor='secondary'>
                        <Tab value='#experience' href={`/#/advancementsheet/${params.id}#experience`} label='Spend XP' />
                        <Tab value='#gear' href={`/#/advancementsheet/${params.id}#gear`} label='Equip Gear' />
                    </Tabs></Item>

                {value === '#experience' 
                || value === '#attributes'
                || value === '#skills'
                || value === '#role'
                || value === '#otherTraits' ? (
                    <Tabs
                        value={value}
                        onChange={setValue}
                        indicatorColor='primary'
                        textColor='secondary'>
                        <Tab value='#attributes' href={`/#/advancementsheet/${params.id}#attributes`} label='Attributes' />
                        <Tab value='#skills' href={`/#/advancementsheet/${params.id}#skills`} label='Skills' />
                        <Tab value='#role' href={`/#/advancementsheet/${params.id}#role`} label='Role Abilities' />
                        <Tab value='#otherTraits' href={`/#/advancementsheet/${params.id}#otherTraits`} label='Other Traits' />
                    </Tabs>) : <></>}

                {value === '#attributes' ? (<>
                    <AdvancementAttributes />
                </>) : <></>}

                {value === '#skills' ? (<>
                    <AdvancementSkills />
                </>) : <></>}

                {value === '#role' ? (<>
                    <AdvancementSpecial />
                </>) : <></>}

                {value === '#otherTraits' ? (<>
                    <AdvancementOther />
                </>) : <></>}

                {value === '#gear'
                || value === '#armor'
                || value === '#weapons'
                || value === '#other'
                || value === '#netrunner'
                || value === '#cyberware'
                || value === '#vehicles'
                || value === '#clothes' ? (
                    <Tabs
                        value={value}
                        onChange={setValue}
                        indicatorColor='primary'
                        textColor='secondary'>
                        <Tab value='#armor' href={`/#/advancementsheet/${params.id}#armor`} label='Armor' />
                        <Tab value='#weapons' href={`/#/advancementsheet/${params.id}#weapons`} label='Weapons' />
                        <Tab value='#other' href={`/#/advancementsheet/${params.id}#other`} label='Other Gear' />
                        {advancementDetails.netrunner > 0 && <Tab value='#netrunner' href={`/#/advancementsheet/${params.id}#netrunner`} label='Netrunner Gear' />}
                        <Tab value='#cyberware' href={`/#/advancementsheet/${params.id}#cyberware`} label='Cyberware' />
                        <Tab value='#vehicles' href={`/#/advancementsheet/${params.id}#vehicles`} label='Vehicles' />
                        <Tab value='#clothes' href={`/#/advancementsheet/${params.id}#clothes`} label='Clothes' />
                    </Tabs>) : <></>}

                {value === '#armor' ? (<>
                    <AdvancementGearArmor />
                </>) : <></>}

                {value === '#weapons' ? (<>
                    <AdvancementGearWeapons />
                </>) : <></>}

                {value === '#other' && advancementDetails.med_pharma > 0 ?
                    (<>
                        <AdvancementMakePharmaDialog />
                        <AdvancementGearOther />
                    </>) : <></>}

                {value === '#other' && advancementDetails.med_pharma < 1 ?
                    (<>
                        <AdvancementGearOther />
                    </>) : <></>}

                {value === '#netrunner' ? (<>
                    <AdvancementNetrunnerGear />
                </>) : <></>}

                {value === '#cyberware' ? (<>
                    <AdvancementCyberware />
                </>) : <></>}

                {value === '#vehicles' ? (<>
                    <AdvancementGarage />
                </>) : <></>}

                {value === '#clothes' ? (<>
                    <AdvancementClothes />
                </>) : <></>}

            </div>
        </>
    )
}

export default AdvancementSheet;
