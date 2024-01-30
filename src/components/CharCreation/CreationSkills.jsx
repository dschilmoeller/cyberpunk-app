import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import Item from '../Characters/CharacterSheet/Item';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import SkillsDialog from '../Modals/SkillsDialog';

import CircleIcon from '@mui/icons-material/Circle';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';

import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';

function TransitionUp(props) {
    return <Slide {...props} direction="up" />;
}

function CreationSkills() {

    const fulldot = <CircleIcon />
    const emptydot = <CircleOutlinedIcon />

    const dispatch = useDispatch();
    const charDetail = useSelector(store => store.characterCreation)
    const creationReviewReached = useSelector(store => store.characterCreation.creationReviewReached)

    const [showSnackbar, setShowSnackbar] = React.useState(false);
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const [skillArray, setSkillArray] = useState([])

    useEffect(() => {
        setSkillArray([
            { skillName: 'Athletics', value: charDetail.athletics },
            { skillName: 'Demolitions', value: charDetail.demolitions },
            { skillName: 'Business', value: charDetail.business },
            { skillName: 'Brawling', value: charDetail.brawling },
            { skillName: 'Drive Land Vehicle', skillDataName: 'driveLand', value: charDetail.driveLand },
            { skillName: 'Cryptography', value: charDetail.cryptography },
            { skillName: 'Concentration', value: charDetail.concentration },
            { skillName: 'Drive Exotic Vehicle', skillDataName: 'driveExotic', value: charDetail.driveExotic },
            { skillName: 'Cyber Tech', skillDataName: 'cyberTech', value: charDetail.cyberTech },
            { skillName: 'Evasion', value: charDetail.evasion },
            { skillName: 'Etiquette', value: charDetail.etiquette },
            { skillName: 'Investigation', value: charDetail.investigation },
            { skillName: 'Fast Talk', skillDataName: 'fastTalk', value: charDetail.fastTalk },
            { skillName: 'Heavy Weapons', skillDataName: 'heavyWeapons', value: charDetail.heavyWeapons },
            { skillName: 'First Aid', skillDataName: 'firstAid', value: charDetail.firstAid },
            { skillName: 'Firearms', value: charDetail.firearms },
            { skillName: 'Exotic Weapons', skillDataName: 'exoticWeapons', value: charDetail.exoticWeapons },
            { skillName: 'Gambling', value: charDetail.gambling },
            { skillName: 'Legerdemain', value: charDetail.legerdemain },
            { skillName: 'Performance', value: charDetail.performance },
            { skillName: 'Language', value: charDetail.language },
            { skillName: 'Melee Weapons', skillDataName: 'meleeWeapons', value: charDetail.meleeWeapons },
            { skillName: 'Stealth', value: charDetail.stealth },
            { skillName: 'Military Tech', skillDataName: 'militaryTech', value: charDetail.militaryTech },
            { skillName: 'Perception', value: charDetail.perception },
            { skillName: 'Survival', value: charDetail.survival },
            { skillName: 'Science', value: charDetail.science },
            { skillName: 'Streetwise', value: charDetail.streetwise },
            { skillName: 'Tracking', value: charDetail.tracking },
            { skillName: 'Vehicle Tech', skillDataName: 'vehicleTech', value: charDetail.vehicleTech }
        ])
        setSkillSelectionOrder(charDetail.skillSelectionHistory)
        setSkillNumber(charDetail.skillNumber)
        setSkillCounter(charDetail.skillCounter)
    }, [charDetail])

    const [skillSelectionOrder, setSkillSelectionOrder] = useState(charDetail.skillSelectionHistory)

    // functions more or less identically to the attributes, except the skill number is tracked via the reducer
    // for what I'm sure was a good reason.
    const [skillNumber, setSkillNumber] = useState(charDetail.skillNumber)
    const [skillCounter, setSkillCounter] = useState(charDetail.skillCounter)


    const dotReturn = (skill) => {
        let returnedDots = []
        for (let i = 0; i < skill; i++) {
            returnedDots.push(<React.Fragment key={i}>{fulldot}</React.Fragment>);
        }
        let j = skill
        for (j; j <= 4; j++) {
            returnedDots.push(<React.Fragment key={j + 5}>{emptydot}</React.Fragment>);
        }
        return returnedDots
    }

    const skillSelector = (skill) => {
        if (skill.skillDataName) {
            dispatch({ type: 'CREATION_SELECT_SKILL', payload: { skill: skill.skillDataName, value: skillNumber } })
        } else {
            dispatch({ type: 'CREATION_SELECT_SKILL', payload: { skill: skill.skillName.toLowerCase(), value: skillNumber } })
        }
        increaseCounter()
    }

    const increaseCounter = () => {
        if (skillCounter < 1) {
            dispatch({ type: 'INCREASE_SKILL_COUNTER', payload: 4 })
        } else if (skillCounter >= 1 && skillCounter <= 4) {
            dispatch({ type: 'INCREASE_SKILL_COUNTER', payload: 3 })
            return;
        } else if (skillCounter > 4 && skillCounter <= 10) {
            dispatch({ type: 'INCREASE_SKILL_COUNTER', payload: 2 })
        } else if (skillCounter > 10 && skillCounter <= 16) {
            dispatch({ type: 'INCREASE_SKILL_COUNTER', payload: 1 })
            setSkillCounter(skillCounter + 1);
        } else if (skillCounter > 16) {
            dispatch({ type: 'INCREASE_SKILL_COUNTER', payload: 0 })
        } else {
            console.log(`error increasing skill counter`);
        }
    }

    const decreaseCounter = () => {
        if (skillCounter === 0) {
            console.log(`Error - no skill selection made`);
            return;
        } else if (skillCounter > 0 && skillCounter <= 2) {
            dispatch({ type: 'DECREASE_SKILL_COUNTER', payload: 4 })
            return;
        } else if (skillCounter > 2 && skillCounter <= 6) {
            dispatch({ type: 'DECREASE_SKILL_COUNTER', payload: 3 })
            return;
        } else if (skillCounter > 6 && skillCounter <= 12) {
            dispatch({ type: 'DECREASE_SKILL_COUNTER', payload: 2 })
            return;
        } else if (skillCounter > 12 && skillCounter <= 18) {
            dispatch({ type: 'DECREASE_SKILL_COUNTER', payload: 1 })
            return;
        } else {
            console.log(`Error decreasing counter`);
        }
    }

    const undoLastSkillSelection = () => {
        if (skillSelectionOrder.length < 1) {
            console.log(`Error - no skills selected!`);
            return;
        } else if (skillSelectionOrder.slice(-1)[0].skillDataName) {
            dispatch({ type: 'CREATION_UNDO_LAST_SKILL', payload: skillSelectionOrder.pop() })
            decreaseCounter();
        } else {
            dispatch({ type: 'CREATION_UNDO_LAST_SKILL', payload: skillSelectionOrder.pop() })
            decreaseCounter();
        }
    }

    const resetSkillSelection = () => {
        dispatch({ type: 'CREATION_RESET_SKILLS' })
    }

    const selectVerbiage = () => {
        if (skillNumber > 0) {
            return 'Select at Rank' + ' ' + skillNumber
        } else {
            return 'No more selections remaining.'
        }
    }

    const saveSkills = () => {
        let counter = 0;

        skillArray.map(item => item.value > 0 ? counter += 1 : counter += 0);

        if (skillCounter == 18 && creationReviewReached === false) {
            dispatch({ type: 'SET_CREATION_STEP', payload: 'role' })
        } else if (counter == 18 && creationReviewReached === true) {
            dispatch({ type: 'SET_CREATION_STEP', payload: 'review' })
        } else {
            setShowSnackbar(true)
        }
    }

    return (
        <>

            <Snackbar
                TransitionComponent={TransitionUp}
                autoHideDuration={2000}
                open={showSnackbar}
                onClose={() => setShowSnackbar(false)}
                anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
            >
                <Alert onClose={() => setShowSnackbar(false)} severity="warning" sx={{ width: '100%' }}>
                    Please ensure you have made all your skill selections!
                </Alert>
            </Snackbar>

            <Grid container display={'flex'} justifyContent={'center'} spacing={1}>
                <Grid item xs={12}><Item sx={{ height: 1 }}><Typography variant='h4'>Skill Selection:</Typography></Item></Grid>
                <Grid item xs={12}><Item sx={{ height: 1 }}>Skills are the specific areas that your character excels in - or not. Similar to Attributes, they are selected in descending order of priority.</Item></Grid>
                <Grid item xs={12}><Item sx={{ height: 1 }}>Selections: Two skills are selected at 4 - again, these the traits in which your character excels far beyond most people in.</Item></Grid>
                <Grid item xs={12}><Item sx={{ height: 1 }}>Four more skills are selected at 3 - these are additional areas in which your character is a professional; Next, six skills each are selected at 2 and 1. These are skills in which your character has some familiarity, but perhaps is less impressively skilled at.</Item></Grid>
                <Grid item xs={12}><Item sx={{ height: 1 }}>Click a skill name to learn more about it! Click column headers for special notes involving all the skills in a column.</Item></Grid>
            </Grid>

            <Grid container>
                <Grid item xs={12} textAlign={'center'}>
                    <Button sx={{ margin: 1 }} variant='contained' onClick={() => resetSkillSelection()}>Reset Skill Selection</Button>
                    <Button sx={{ margin: 1 }} variant='contained' onClick={() => saveSkills()}>Save Skill Selection</Button>
                    <Button sx={{ margin: 1 }} variant='contained' onClick={() => undoLastSkillSelection()}>Undo Last Selection</Button>
                </Grid>
            </Grid>

            <Grid container>
                {skillArray.map(skill => {
                    return (
                        <React.Fragment key={skill.skillName}>
                            <Grid item xs={1.333}><Item><SkillsDialog prop={skill.skillName} /></Item></Grid>
                            {skill.value === 0 ? <Grid xs={2.666} item>
                                {skillNumber > 0 ? <Item sx={{ cursor: 'pointer' }} onClick={() => skillSelector(skill)}>{selectVerbiage()}</Item> : <Item>{selectVerbiage()}</Item>}
                                {/* <Item sx={{ cursor: 'pointer' }} onClick={() => skillSelector(skill)}>{selectVerbiage()}</Item> */}
                            </Grid> : <><Grid xs={2.666} item><Item>{dotReturn(skill.value)}</Item></Grid></>}
                        </React.Fragment>
                    )
                })}
            </Grid>




            {/* <Grid container>
                <Grid item xs={4} padding={1}>
                    <Grid container spacing={1}>
                        <Grid item xs={12}><Item><SkillsDialog prop={'Streets'} /></Item></Grid>
                        <Grid item xs={4}><Item><SkillsDialog prop={'Athletics'} /></Item></Grid>
                        {athletics === 0 ? <Grid xs={8} item>
                            <Item sx={{ cursor: 'pointer' }} onClick={() => skillSelector('Athletics')}>{selectVerbiage()}</Item>
                        </Grid> : <><Grid xs={8} item><Item>{dotReturn(athletics)}</Item></Grid></>}

                        <Grid item xs={4}><Item><SkillsDialog prop={'Brawling'} /></Item></Grid>
                        {brawling === 0 ? <Grid xs={8} item>
                            <Item sx={{ cursor: 'pointer' }} onClick={() => skillSelector('Brawling')}>{selectVerbiage()}</Item>
                        </Grid> : <><Grid xs={8} item><Item>{dotReturn(brawling)}</Item></Grid></>}

                        <Grid item xs={4}><Item><SkillsDialog prop={'Concentration'} /></Item></Grid>
                        {concentration === 0 ? <Grid xs={8} item>
                            <Item sx={{ cursor: 'pointer' }} onClick={() => skillSelector('Concentration')}>{selectVerbiage()}</Item>
                        </Grid> : <><Grid xs={8} item><Item>{dotReturn(concentration)}</Item></Grid></>}

                        <Grid item xs={4}><Item><SkillsDialog prop={'Evasion'} /></Item></Grid>
                        {evasion === 0 ? <Grid xs={8} item>
                            <Item sx={{ cursor: 'pointer' }} onClick={() => skillSelector('Evasion')}>{selectVerbiage()}</Item>
                        </Grid> : <><Grid xs={8} item><Item>{dotReturn(evasion)}</Item></Grid></>}

                        <Grid item xs={4}><Item><SkillsDialog prop={'Fast Talk'} /></Item></Grid>
                        {fastTalk === 0 ? <Grid xs={8} item>
                            <Item sx={{ cursor: 'pointer' }} onClick={() => skillSelector('Fast Talk')}>{selectVerbiage()}</Item>
                        </Grid> : <><Grid xs={8} item><Item>{dotReturn(fastTalk)}</Item></Grid></>}
                        <Grid item xs={4}><Item><SkillsDialog prop={'Firearms'} /></Item></Grid>
                        {firearms === 0 ? <Grid xs={8} item>
                            <Item sx={{ cursor: 'pointer' }} onClick={() => skillSelector('Firearms')}>{selectVerbiage()}</Item>
                        </Grid> : <><Grid xs={8} item><Item>{dotReturn(firearms)}</Item></Grid></>}

                        <Grid item xs={4}><Item><SkillsDialog prop={'Legerdemain'} /></Item></Grid>
                        {legerdemain === 0 ? <Grid xs={8} item>
                            <Item sx={{ cursor: 'pointer' }} onClick={() => skillSelector('Legerdemain')}>{selectVerbiage()}</Item>
                        </Grid> : <><Grid xs={8} item><Item>{dotReturn(legerdemain)}</Item></Grid></>}

                        <Grid item xs={4}><Item><SkillsDialog prop={'Melee Weapons'} /></Item></Grid>
                        {meleeWeapons === 0 ? <Grid xs={8} item>
                            <Item sx={{ cursor: 'pointer' }} onClick={() => skillSelector('Melee Weapons')}>{selectVerbiage()}</Item>
                        </Grid> : <><Grid xs={8} item><Item>{dotReturn(meleeWeapons)}</Item></Grid></>}

                        <Grid item xs={4}><Item><SkillsDialog prop={'Perception'} /></Item></Grid>
                        {perception === 0 ? <Grid xs={8} item>
                            <Item sx={{ cursor: 'pointer' }} onClick={() => skillSelector('Perception')}>{selectVerbiage()}</Item>
                        </Grid> : <><Grid xs={8} item><Item>{dotReturn(perception)}</Item></Grid></>}

                        <Grid item xs={4}><Item><SkillsDialog prop={'Streetwise'} /></Item></Grid>
                        {streetwise === 0 ? <Grid xs={8} item>
                            <Item sx={{ cursor: 'pointer' }} onClick={() => skillSelector('Streetwise')}>{selectVerbiage()}</Item>
                        </Grid> : <><Grid xs={8} item><Item>{dotReturn(streetwise)}</Item></Grid></>}
                    </Grid>
                </Grid>

                <Grid item xs={4} padding={1}>
                    <Grid container spacing={1}>
                        <Grid item xs={12}><Item><SkillsDialog prop={'Tekhne'} /></Item></Grid>
                        <Grid item xs={4}><Item><SkillsDialog prop={'Demolitions'} /></Item></Grid>
                        {demolitions === 0 ? <Grid xs={8} item>
                            <Item sx={{ cursor: 'pointer' }} onClick={() => skillSelector('Demolitions')}>{selectVerbiage()}</Item>
                        </Grid> : <><Grid xs={8} item><Item>{dotReturn(demolitions)}</Item></Grid></>}

                        <Grid item xs={4}><Item><SkillsDialog prop={'Drive Land Vehicle'} /></Item></Grid>
                        {driveLand === 0 ? <Grid xs={8} item>
                            <Item sx={{ cursor: 'pointer' }} onClick={() => skillSelector('Drive Land Vehicle')}>{selectVerbiage()}</Item>
                        </Grid> : <><Grid xs={8} item><Item>{dotReturn(driveLand)}</Item></Grid></>}

                        <Grid item xs={4}><Item><SkillsDialog prop={'Drive Exotic Vehicle'} /></Item></Grid>
                        {driveExotic === 0 ? <Grid xs={8} item>
                            <Item sx={{ cursor: 'pointer' }} onClick={() => skillSelector('Drive Exotic Vehicle')}>{selectVerbiage()}</Item>
                        </Grid> : <><Grid xs={8} item><Item>{dotReturn(driveExotic)}</Item></Grid></>}

                        <Grid item xs={4}><Item><SkillsDialog prop={'Etiquette'} /></Item></Grid>
                        {etiquette === 0 ? <Grid xs={8} item>
                            <Item sx={{ cursor: 'pointer' }} onClick={() => skillSelector('Etiquette')}>{selectVerbiage()}</Item>
                        </Grid> : <><Grid xs={8} item><Item>{dotReturn(etiquette)}</Item></Grid></>}

                        <Grid item xs={4}><Item><SkillsDialog prop={'Exotic Weapons'} /></Item></Grid>
                        {exoticWeapons === 0 ? <Grid xs={8} item>
                            <Item sx={{ cursor: 'pointer' }} onClick={() => skillSelector('Exotic Weapons')}>{selectVerbiage()}</Item>
                        </Grid> : <><Grid xs={8} item><Item>{dotReturn(exoticWeapons)}</Item></Grid></>}

                        <Grid item xs={4}><Item><SkillsDialog prop={'Heavy Weapons'} /></Item></Grid>
                        {heavyWeapons === 0 ? <Grid xs={8} item>
                            <Item sx={{ cursor: 'pointer' }} onClick={() => skillSelector('Heavy Weapons')}>{selectVerbiage()}</Item>
                        </Grid> : <><Grid xs={8} item><Item>{dotReturn(heavyWeapons)}</Item></Grid></>}

                        <Grid item xs={4}><Item><SkillsDialog prop={'Performance'} /></Item></Grid>
                        {performance === 0 ? <Grid xs={8} item>
                            <Item sx={{ cursor: 'pointer' }} onClick={() => skillSelector('Performance')}>{selectVerbiage()}</Item>
                        </Grid> : <><Grid xs={8} item><Item>{dotReturn(performance)}</Item></Grid></>}

                        <Grid item xs={4}><Item><SkillsDialog prop={'Stealth'} /></Item></Grid>
                        {stealth === 0 ? <Grid xs={8} item>
                            <Item sx={{ cursor: 'pointer' }} onClick={() => skillSelector('Stealth')}>{selectVerbiage()}</Item>
                        </Grid> : <><Grid xs={8} item><Item>{dotReturn(stealth)}</Item></Grid></>}

                        <Grid item xs={4}><Item><SkillsDialog prop={'Survival'} /></Item></Grid>
                        {survival === 0 ? <Grid xs={8} item>
                            <Item sx={{ cursor: 'pointer' }} onClick={() => skillSelector('Survival')}>{selectVerbiage()}</Item>
                        </Grid> : <><Grid xs={8} item><Item>{dotReturn(survival)}</Item></Grid></>}

                        <Grid item xs={4}><Item><SkillsDialog prop={'Tracking'} /></Item></Grid>
                        {tracking === 0 ? <Grid xs={8} item>
                            <Item sx={{ cursor: 'pointer' }} onClick={() => skillSelector('Tracking')}>{selectVerbiage()}</Item>
                        </Grid> : <><Grid xs={8} item><Item>{dotReturn(tracking)}</Item></Grid></>}
                    </Grid>
                </Grid>

                <Grid item xs={4} padding={1}>
                    <Grid container spacing={1}>
                        <Grid item xs={12}><Item><SkillsDialog prop={'Knowledge'} /></Item></Grid>
                        <Grid item xs={4}><Item><SkillsDialog prop={'Business'} /></Item></Grid>
                        {business === 0 ? <Grid xs={8} item>
                            <Item sx={{ cursor: 'pointer' }} onClick={() => skillSelector('Business')}>{selectVerbiage()}</Item>
                        </Grid> : <><Grid xs={8} item><Item>{dotReturn(business)}</Item></Grid></>}

                        <Grid item xs={4}><Item><SkillsDialog prop={'Cryptography'} /></Item></Grid>
                        {cryptography === 0 ? <Grid xs={8} item>
                            <Item sx={{ cursor: 'pointer' }} onClick={() => skillSelector('Cryptography')}>{selectVerbiage()}</Item>
                        </Grid> : <><Grid xs={8} item><Item>{dotReturn(cryptography)}</Item></Grid></>}

                        <Grid item xs={4}><Item><SkillsDialog prop={'Cyber Tech'} /></Item></Grid>
                        {cyberTech === 0 ? <Grid xs={8} item>
                            <Item sx={{ cursor: 'pointer' }} onClick={() => skillSelector('Cyber Tech')}>{selectVerbiage()}</Item>
                        </Grid> : <><Grid xs={8} item><Item>{dotReturn(cyberTech)}</Item></Grid></>}

                        <Grid item xs={4}><Item><SkillsDialog prop={'Investigation'} /></Item></Grid>
                        {investigation === 0 ? <Grid xs={8} item>
                            <Item sx={{ cursor: 'pointer' }} onClick={() => skillSelector('Investigation')}>{selectVerbiage()}</Item>
                        </Grid> : <><Grid xs={8} item><Item>{dotReturn(investigation)}</Item></Grid></>}

                        <Grid item xs={4}><Item><SkillsDialog prop={'First Aid'} /></Item></Grid>
                        {firstAid === 0 ? <Grid xs={8} item>
                            <Item sx={{ cursor: 'pointer' }} onClick={() => skillSelector('First Aid')}>{selectVerbiage()}</Item>
                        </Grid> : <><Grid xs={8} item><Item>{dotReturn(firstAid)}</Item></Grid></>}

                        <Grid item xs={4}><Item><SkillsDialog prop={'Gambling'} /></Item></Grid>
                        {gambling === 0 ? <Grid xs={8} item>
                            <Item sx={{ cursor: 'pointer' }} onClick={() => skillSelector('Gambling')}>{selectVerbiage()}</Item>
                        </Grid> : <><Grid xs={8} item><Item>{dotReturn(gambling)}</Item></Grid></>}

                        <Grid item xs={4}><Item><SkillsDialog prop={'Language'} /></Item></Grid>
                        {language === 0 ? <Grid xs={8} item>
                            <Item sx={{ cursor: 'pointer' }} onClick={() => skillSelector('Language')}>{selectVerbiage()}</Item>
                        </Grid> : <><Grid xs={8} item><Item>{dotReturn(language)}</Item></Grid></>}

                        <Grid item xs={4}><Item><SkillsDialog prop={'Military Tech'} /></Item></Grid>
                        {militaryTech === 0 ? <Grid xs={8} item>
                            <Item sx={{ cursor: 'pointer' }} onClick={() => skillSelector('Military Tech')}>{selectVerbiage()}</Item>
                        </Grid> : <><Grid xs={8} item><Item>{dotReturn(militaryTech)}</Item></Grid></>}

                        <Grid item xs={4}><Item><SkillsDialog prop={'Science'} /></Item></Grid>
                        {science === 0 ? <Grid xs={8} item>
                            <Item sx={{ cursor: 'pointer' }} onClick={() => skillSelector('Science')}>{selectVerbiage()}</Item>
                        </Grid> : <><Grid xs={8} item><Item>{dotReturn(science)}</Item></Grid></>}

                        <Grid item xs={4}><Item><SkillsDialog prop={'Vehicle Tech'} /></Item></Grid>
                        {vehicleTech === 0 ? <Grid xs={8} item>
                            <Item sx={{ cursor: 'pointer' }} onClick={() => skillSelector('Vehicle Tech')}>{selectVerbiage()}</Item>
                        </Grid> : <><Grid xs={8} item><Item>{dotReturn(vehicleTech)}</Item></Grid></>}
                    </Grid>
                </Grid>
            </Grid> */}
        </>
    )
}

export default CreationSkills