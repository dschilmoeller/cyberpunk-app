import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import Item from '../Characters/CharacterSheet/Item';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import SkillsDialog from '../Modals/SkillsDialog';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';

function TransitionUp(props) {
    return <Slide {...props} direction="up" />;
}

function CreationSkills() {

    const fulldot = ` \u2b24`
    const emptydot = ` \u25ef`
    const dispatch = useDispatch();
    const charDetail = useSelector(store => store.characterCreation)

    const [showSnackbar, setShowSnackbar] = React.useState(false);
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });


    // functions more or less identically to the attributes, except the skill number is tracked via the reducer
    // for what I'm sure was a good reason.
    const [skillNumber, setSkillNumber] = useState(charDetail.skillNumber)
    const [skillCounter, setSkillCounter] = useState(1)

    // Streetwise Skills
    const [athletics, setAthletics] = useState(charDetail.athletics)
    const [brawling, setBrawling] = useState(charDetail.brawling)
    const [concentration, setConcentration] = useState(charDetail.concentration)
    const [evasion, setEvasion] = useState(charDetail.evasion)
    const [fastTalk, setFastTalk] = useState(charDetail.fastTalk)
    const [firearms, setFirearms] = useState(charDetail.firearms)
    const [legerdemain, setLegerdemain] = useState(charDetail.legerdemain)
    const [meleeWeapons, setMeleeWeapons] = useState(charDetail.meleeWeapons)
    const [perception, setPerception] = useState(charDetail.perception)
    const [streetwise, setStreetwise] = useState(charDetail.streetwise)

    // Tekhne skills

    const [demolitions, setDemolitions] = useState(charDetail.demolitions)
    const [driveLand, setDriveLand] = useState(charDetail.driveLand)
    const [driveExotic, setDriveExotic] = useState(charDetail.driveExotic)
    const [etiquette, setEtiquette] = useState(charDetail.etiquette)
    const [heavyWeapons, setHeavyWeapons] = useState(charDetail.heavyWeapons)
    const [exoticWeapons, setExoticWeapons] = useState(charDetail.exoticWeapons)
    const [performance, setPerformance] = useState(charDetail.performance)
    const [stealth, setStealth] = useState(charDetail.stealth)
    const [survival, setSurvival] = useState(charDetail.survival)
    const [tracking, setTracking] = useState(charDetail.tracking)

    // Knowledge Skills
    const [business, setBusiness] = useState(charDetail.business)
    const [cryptography, setCryptography] = useState(charDetail.cryptography)
    const [cyberTech, setCyberTech] = useState(charDetail.cyberTech)
    const [investigation, setInvestigation] = useState(charDetail.investigation)
    const [firstAid, setFirstAid] = useState(charDetail.firstAid)
    const [gambling, setGambling] = useState(charDetail.gambling)
    const [language, setLanguage] = useState(charDetail.language)
    const [militaryTech, setMilitaryTech] = useState(charDetail.militaryTech)
    const [science, setScience] = useState(charDetail.science)
    const [vehicleTech, setVehicleTech] = useState(charDetail.vehicleTech)

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

    const skillSelector = (skill) => {
        switch (skill) {
            // Streetwise Skills
            case 'Athletics':
                if (athletics === 0) {
                    setAthletics(skillNumber)
                    dealWithCounter()
                    break;
                } else {
                    alert('Already selected!')
                    break;
                }
            case 'Brawling':
                if (brawling === 0) {
                    setBrawling(skillNumber)
                    dealWithCounter()
                    break;
                } else {
                    alert('Already selected!')
                    break;
                }
            case 'Concentration':
                if (concentration === 0) {
                    setConcentration(skillNumber)
                    dealWithCounter()
                    break;
                } else {
                    alert('Already selected!')
                    break;
                }
            case 'Evasion':
                if (evasion === 0) {
                    setEvasion(skillNumber);
                    dealWithCounter();
                } else {
                    alert('Already selected!');
                }
                break;
            case 'Fast Talk':
                if (fastTalk === 0) {
                    setFastTalk(skillNumber);
                    dealWithCounter();
                } else {
                    alert('Already selected!');
                }
                break;

            case 'Legerdemain':
                if (legerdemain === 0) {
                    setLegerdemain(skillNumber);
                    dealWithCounter();
                } else {
                    alert('Already selected!');
                }
                break;
            case 'Melee Weapons':
                if (meleeWeapons === 0) {
                    setMeleeWeapons(skillNumber)
                    dealWithCounter()
                    break;
                } else {
                    alert('Already selected!')
                    break;
                }
            case 'Perception':
                if (perception === 0) {
                    setPerception(skillNumber);
                    dealWithCounter();
                } else {
                    alert('Already selected!');
                }
                break;

            case 'Firearms':
                if (firearms === 0) {
                    setFirearms(skillNumber);
                    dealWithCounter();
                } else {
                    alert('Already selected!');
                }
                break;

            case 'Streetwise':
                if (streetwise === 0) {
                    setStreetwise(skillNumber);
                    dealWithCounter();
                } else {
                    alert('Already selected!');
                }
                break;

            // Tekhne Skills
            case 'Demolitions':
                if (demolitions === 0) {
                    setDemolitions(skillNumber);
                    dealWithCounter();
                } else {
                    alert('Already selected!');
                }
                break;

            case 'Drive Land Vehicle':
                if (driveLand === 0) {
                    setDriveLand(skillNumber);
                    dealWithCounter();
                } else {
                    alert('Already selected!');
                }
                break;

            case 'Drive Exotic Vehicle':
                if (driveExotic === 0) {
                    setDriveExotic(skillNumber);
                    dealWithCounter();
                } else {
                    alert('Already selected!');
                }
                break;

            case 'Etiquette':
                if (etiquette === 0) {
                    setEtiquette(skillNumber);
                    dealWithCounter();
                } else {
                    alert('Already selected!');
                }
                break;

            case 'Exotic Weapons':
                if (exoticWeapons === 0) {
                    setExoticWeapons(skillNumber);
                    dealWithCounter();
                } else {
                    alert('Already selected!');
                }
                break;

            case 'Heavy Weapons':
                if (heavyWeapons === 0) {
                    setHeavyWeapons(skillNumber);
                    dealWithCounter();
                } else {
                    alert('Already selected!');
                }
                break;

            case 'Performance':
                if (performance === 0) {
                    setPerformance(skillNumber);
                    dealWithCounter();
                } else {
                    alert('Already selected!');
                }
                break;

            case 'Stealth':
                if (stealth === 0) {
                    setStealth(skillNumber);
                    dealWithCounter();
                } else {
                    alert('Already selected!');
                }
                break;

            case 'Tracking':
                if (tracking === 0) {
                    setTracking(skillNumber);
                    dealWithCounter();
                } else {
                    alert('Already selected!');
                }
                break;

            case 'Survival':
                if (survival === 0) {
                    setSurvival(skillNumber);
                    dealWithCounter();
                } else {
                    alert('Already selected!');
                }
                break;

            // Knowledge Skills
            case 'Business':
                if (business === 0) {
                    setBusiness(skillNumber);
                    dealWithCounter();
                } else {
                    alert('Already selected!');
                }
                break;

            case 'Cryptography':
                if (cryptography === 0) {
                    setCryptography(skillNumber);
                    dealWithCounter();
                } else {
                    alert('Already selected!');
                }
                break;

            case 'Cyber Tech':
                if (cyberTech === 0) {
                    setCyberTech(skillNumber);
                    dealWithCounter();
                } else {
                    alert('Already selected!');
                }
                break;

            case 'Investigation':
                if (investigation === 0) {
                    setInvestigation(skillNumber);
                    dealWithCounter();
                } else {
                    alert('Already selected!');
                }
                break;

            case 'First Aid':
                if (firstAid === 0) {
                    setFirstAid(skillNumber);
                    dealWithCounter();
                } else {
                    alert('Already selected!');
                }
                break;

            case 'Gambling':
                if (gambling === 0) {
                    setGambling(skillNumber);
                    dealWithCounter();
                } else {
                    alert('Already selected!');
                }
                break;

            case 'Language':
                if (language === 0) {
                    setLanguage(skillNumber);
                    dealWithCounter();
                } else {
                    alert('Already selected!');
                }
                break;

            case 'Military Tech':
                if (militaryTech === 0) {
                    setMilitaryTech(skillNumber);
                    dealWithCounter();
                } else {
                    alert('Already selected!');
                }
                break;

            case 'Science':
                if (science === 0) {
                    setScience(skillNumber);
                    dealWithCounter();
                } else {
                    alert('Already selected!');
                }
                break;
            case 'Vehicle Tech':
                if (vehicleTech === 0) {
                    setVehicleTech(skillNumber);
                    dealWithCounter();
                } else {
                    alert('Already selected!')
                }
            default:
                console.log(`Skill Selector Whoopsie!`, skill);
                break;
        }
    }

    const dealWithCounter = () => {
        setSkillCounter(skillCounter + 1);
        if (skillCounter > 1) {
            setSkillNumber(3)
        }
        if (skillCounter > 5) {
            setSkillNumber(2)
        }
        if (skillCounter > 11) {
            setSkillNumber(1)
        }
        if (skillCounter > 17) {
            setSkillNumber(0)
        }
    }

    const resetSkillSelection = () => {
        setSkillNumber(4)
        setSkillCounter(1)

        setAthletics(0)
        setBrawling(0)
        setConcentration(0)
        setEvasion(0)
        setFastTalk(0)
        setLegerdemain(0)
        setMeleeWeapons(0)
        setPerception(0)
        setFirearms(0)
        setStreetwise(0)

        setDemolitions(0)
        setDriveLand(0)
        setDriveExotic(0)
        setEtiquette(0)
        setExoticWeapons(0)
        setHeavyWeapons(0)
        setPerformance(0)
        setStealth(0)
        setSurvival(0)
        setTracking(0)

        setBusiness(0)
        setCryptography(0)
        setCyberTech(0)
        setInvestigation(0)
        setFirstAid(0)
        setGambling(0)
        setLanguage(0)
        setMilitaryTech(0)
        setScience(0)
        setVehicleTech(0)
    }

    const selectVerbiage = () => {
        if (skillCounter < 19) {
            return 'Select at Rank' + ' ' + skillNumber
        } else {
            return 'No more selections remaining.'
        }

    }

    const dispatchSkills = () => {
        if (skillNumber === 0) {
            const skills = {
                skillNumber,
                athletics, brawling, concentration, evasion, fastTalk, firearms, legerdemain, meleeWeapons, perception, streetwise,
                demolitions, driveLand, driveExotic, etiquette, exoticWeapons, heavyWeapons, performance, stealth, survival, tracking,
                business, cryptography, cyberTech, firstAid, investigation, gambling, language, militaryTech, science, vehicleTech
            }
            dispatch({ type: 'SET_CREATION_SKILLS', payload: skills })
            dispatch({ type: 'SET_CREATION_STEP', payload: 'role' })
        } else {
            setShowSnackbar(true)
        }
    }

    // quick fill for faster demo/testing purposes.
    // const quickSelect = () => {
    //     setAthletics(4)
    //     setBrawling(4)
    //     setConcentration(3)
    //     setEvasion(3)
    //     setFastTalk(3)
    //     setFirearms(3)
    //     setMeleeWeapons(2)
    //     setLegerdemain(2)
    //     setPerception(2)
    //     setStreetwise(2)
    //     setDemolitions(2)
    //     setDriveLand(2)
    //     setDriveExotic(1)
    //     setEtiquette(1)
    //     setExoticWeapons(1)
    //     setHeavyWeapons(1)
    //     setPerformance(1)
    //     setStealth(1)
    //     setSkillNumber(0)
    //     setSkillCounter(19)
    // }

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
            </Snackbar >


            <h1>Skill Selection</h1>
            <h3>Skills are the specific areas that your character excels in - or not. Similar to Attributes, they are selected in descending order of priority.</h3>
            <h3>Two skills are selected at 4; four skills are selected at 3; and six skills each are selected at 2 and 1.</h3>
            <h3>Click a skill name to learn more about it. Click column headers for special notes involving all the skills in a column.</h3>
            <h3></h3>

            <Grid container>
                <Grid item xs={12} textAlign={'center'}>
                    <Button sx={{ margin: 1 }} variant='contained' onClick={() => resetSkillSelection()}>Reset Skill Selection</Button>
                    <Button sx={{ margin: 1 }} variant='contained' onClick={() => dispatchSkills()}>Save Skill Selection</Button>
                    {/* <Button sx={{ margin: 1 }} variant='contained' onClick={() => quickSelect()}>Quick Skill Selection</Button> */}
                </Grid>
            </Grid>
            <Grid container>
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
            </Grid>
        </>
    )
}

export default CreationSkills