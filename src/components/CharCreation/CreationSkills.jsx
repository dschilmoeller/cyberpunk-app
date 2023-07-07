import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import Item from '../Characters/CharacterSheet/Item';
import { Button } from '@mui/material';
import SkillsModal from '../Modals/SkillsModal';
import { useDispatch } from 'react-redux';

function CreationSkills() {

    const fulldot = ` \u2b24`
    const emptydot = ` \u25ef`
    const dispatch = useDispatch();

    const [skillNumber, setSkillNumber] = useState(4)
    const [skillCounter, setSkillCounter] = useState(1)

    // Streetwise Skills
    const [athletics, setAthletics] = useState(0)
    const [brawling, setBrawling] = useState(0)
    const [concentration, setConcentration] = useState(0)
    const [evasion, setEvasion] = useState(0)
    const [fastTalk, setFastTalk] = useState(0)
    const [legerdemain, setLegerdemain] = useState(0)
    const [meleeWeapons, setMeleeWeapons] = useState(0)
    const [perception, setPerception] = useState(0)
    const [rangedWeapons, setRangedWeapons] = useState(0)
    const [streetwise, setStreetwise] = useState(0)

    // Tekhne skills

    const [demolitions, setDemolitions] = useState(0)
    const [driveLand, setDriveLand] = useState(0)
    const [driveExotic, setDriveExotic] = useState(0)
    const [etiquette, setEtiquette] = useState(0)
    const [heavyWeapon, setHeavyWeapon] = useState(0)
    const [exoticWeapon, setExoticWeapon] = useState(0)
    const [performance, setPerformance] = useState(0)
    const [stealth, setStealth] = useState(0)
    const [survival, setSurvival] = useState(0)
    const [tracking, setTracking] = useState(0)

    // Knowledge Skills
    const [business, setBusiness] = useState(0)
    const [cryptography, setCryptography] = useState(0)
    const [cyberTech, setCyberTech] = useState(0)
    const [investigation, setInvestigation] = useState(0)
    const [firstAid, setFirstAid] = useState(0)
    const [gambling, setGambling] = useState(0)
    const [language, setLanguage] = useState(0)
    const [milTech, setMilTech] = useState(0)
    const [science, setScience] = useState(0)
    const [vehicleTech, setVehicleTech] = useState(0)

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

            case 'Ranged Weapons':
                if (rangedWeapons === 0) {
                    setRangedWeapons(skillNumber);
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
                if (exoticWeapon === 0) {
                    setExoticWeapon(skillNumber);
                    dealWithCounter();
                } else {
                    alert('Already selected!');
                }
                break;

            case 'Heavy Weapons':
                if (heavyWeapon === 0) {
                    setHeavyWeapon(skillNumber);
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
                if (milTech === 0) {
                    setMilTech(skillNumber);
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
        setRangedWeapons(0)
        setStreetwise(0)

        setDemolitions(0)
        setDriveLand(0)
        setDriveExotic(0)
        setEtiquette(0)
        setExoticWeapon(0)
        setHeavyWeapon(0)
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
        setMilTech(0)
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
                athletics, concentration, contortionist, interrogation, legerdemain, perception, persuasion, resist, streetwise, subterfuge,
                animal, demolitions, driveLand, driveAir, driveSea, etiquette, performance, stealth, tracking, survival,
                bureaucracy, business, criminology, cryptography, deduction, firstAid, gambling, language, library, science
            }
            dispatch({ type: 'SET_CREATION_SKILLS', payload: skills })
            dispatch({ type: 'SET_CREATION_STEP', payload: 'combat_skills' })
        } else {
            alert('Please select all available skills!')
        }
    }

    return (
        <>

            <Grid container>
                <Grid item xs={12} textAlign={'center'}>
                    <Button sx={{ margin: 1 }} variant='contained' onClick={() => resetSkillSelection()}>Reset Skill Selection</Button>
                    <Button sx={{ margin: 1 }} variant='contained' onClick={() => dispatchSkills()}>Save Skill Selection</Button>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={4}>
                    <Grid container>
                        <Grid item xs={4}><Item><SkillsModal prop={'Athletics'} /></Item></Grid>
                        {athletics === 0 ? <Grid xs={8} item>
                            <Item onClick={() => skillSelector('Athletics')}>{selectVerbiage()}</Item>
                        </Grid> : <><Grid xs={8} item><Item>{dotReturn(athletics)}</Item></Grid></>}

                        <Grid item xs={4}><Item><SkillsModal prop={'Brawling'} /></Item></Grid>
                        {brawling === 0 ? <Grid xs={8} item>
                            <Item onClick={() => skillSelector('Brawling')}>{selectVerbiage()}</Item>
                        </Grid> : <><Grid xs={8} item><Item>{dotReturn(brawling)}</Item></Grid></>}

                        <Grid item xs={4}><Item><SkillsModal prop={'Concentration'} /></Item></Grid>
                        {concentration === 0 ? <Grid xs={8} item>
                            <Item onClick={() => skillSelector('Concentration')}>{selectVerbiage()}</Item>
                        </Grid> : <><Grid xs={8} item><Item>{dotReturn(concentration)}</Item></Grid></>}            

                        <Grid item xs={4}><Item><SkillsModal prop={'Evasion'} /></Item></Grid>
                        {evasion === 0 ? <Grid xs={8} item>
                            <Item onClick={() => skillSelector('Evasion')}>{selectVerbiage()}</Item>
                        </Grid> : <><Grid xs={8} item><Item>{dotReturn(evasion)}</Item></Grid></>}

                        <Grid item xs={4}><Item><SkillsModal prop={'Fast Talk'} /></Item></Grid>
                        {fastTalk === 0 ? <Grid xs={8} item>
                            <Item onClick={() => skillSelector('Fast Talk')}>{selectVerbiage()}</Item>
                        </Grid> : <><Grid xs={8} item><Item>{dotReturn(fastTalk)}</Item></Grid></>}

                        <Grid item xs={4}><Item><SkillsModal prop={'Legerdemain'} /></Item></Grid>
                        {legerdemain === 0 ? <Grid xs={8} item>
                            <Item onClick={() => skillSelector('Legerdemain')}>{selectVerbiage()}</Item>
                        </Grid> : <><Grid xs={8} item><Item>{dotReturn(legerdemain)}</Item></Grid></>}

                        <Grid item xs={4}><Item><SkillsModal prop={'Melee Weapons'} /></Item></Grid>
                        {meleeWeapons === 0 ? <Grid xs={8} item>
                            <Item onClick={() => skillSelector('Melee Weapons')}>{selectVerbiage()}</Item>
                        </Grid> : <><Grid xs={8} item><Item>{dotReturn(meleeWeapons)}</Item></Grid></>}

                        <Grid item xs={4}><Item><SkillsModal prop={'Perception'} /></Item></Grid>
                        {perception === 0 ? <Grid xs={8} item>
                            <Item onClick={() => skillSelector('Perception')}>{selectVerbiage()}</Item>
                        </Grid> : <><Grid xs={8} item><Item>{dotReturn(perception)}</Item></Grid></>}

                        <Grid item xs={4}><Item><SkillsModal prop={'Ranged Weapons'} /></Item></Grid>
                        {rangedWeapons === 0 ? <Grid xs={8} item>
                            <Item onClick={() => skillSelector('Ranged Weapons')}>{selectVerbiage()}</Item>
                        </Grid> : <><Grid xs={8} item><Item>{dotReturn(rangedWeapons)}</Item></Grid></> }

                        <Grid item xs={4}><Item><SkillsModal prop={'Streetwise'} /></Item></Grid>
                        {streetwise === 0 ? <Grid xs={8} item>
                            <Item onClick={() => skillSelector('Streetwise')}>{selectVerbiage()}</Item>
                        </Grid> : <><Grid xs={8} item><Item>{dotReturn(streetwise)}</Item></Grid></>}

                    </Grid>
                </Grid>

                <Grid item xs={4}>
                    <Grid container>
                        <Grid item xs={4}><Item><SkillsModal prop={'Demolitions'} /></Item></Grid>
                        {demolitions === 0 ? <Grid xs={8} item>
                            <Item onClick={() => skillSelector('Demolitions')}>{selectVerbiage()}</Item>
                        </Grid> : <><Grid xs={8} item><Item>{dotReturn(demolitions)}</Item></Grid></>}

                        <Grid item xs={4}><Item><SkillsModal prop={'Drive Land Vehicle'} /></Item></Grid>
                        {driveLand === 0 ? <Grid xs={8} item>
                            <Item onClick={() => skillSelector('Drive Land Vehicle')}>{selectVerbiage()}</Item>
                        </Grid> : <><Grid xs={8} item><Item>{dotReturn(driveLand)}</Item></Grid></>}

                        <Grid item xs={4}><Item><SkillsModal prop={'Drive Exotic Vehicle'} /></Item></Grid>
                        {driveExotic === 0 ? <Grid xs={8} item>
                            <Item onClick={() => skillSelector('Drive Exotic Vehicle')}>{selectVerbiage()}</Item>
                        </Grid> : <><Grid xs={8} item><Item>{dotReturn(driveExotic)}</Item></Grid></>}

                        <Grid item xs={4}><Item><SkillsModal prop={'Etiquette'} /></Item></Grid>
                        {etiquette === 0 ? <Grid xs={8} item>
                            <Item onClick={() => skillSelector('Etiquette')}>{selectVerbiage()}</Item>
                        </Grid> : <><Grid xs={8} item><Item>{dotReturn(etiquette)}</Item></Grid></>}

                        <Grid item xs={4}><Item><SkillsModal prop={'Exotic Weapons'} /></Item></Grid>
                        {exoticWeapon === 0 ? <Grid xs={8} item>
                            <Item onClick={() => skillSelector('Exotic Weapons')}>{selectVerbiage()}</Item>
                        </Grid> : <><Grid xs={8} item><Item>{dotReturn(exoticWeapon)}</Item></Grid></>}

                        <Grid item xs={4}><Item><SkillsModal prop={'Performance'} /></Item></Grid>
                        {performance === 0 ? <Grid xs={8} item>
                            <Item onClick={() => skillSelector('Performance')}>{selectVerbiage()}</Item>
                        </Grid> : <><Grid xs={8} item><Item>{dotReturn(performance)}</Item></Grid></>}

                        <Grid item xs={4}><Item><SkillsModal prop={'Stealth'} /></Item></Grid>
                        {stealth === 0 ? <Grid xs={8} item>
                            <Item onClick={() => skillSelector('Stealth')}>{selectVerbiage()}</Item>
                        </Grid> : <><Grid xs={8} item><Item>{dotReturn(stealth)}</Item></Grid></>}

                        <Grid item xs={4}><Item><SkillsModal prop={'Survival'} /></Item></Grid>
                        {survival === 0 ? <Grid xs={8} item>
                            <Item onClick={() => skillSelector('Survival')}>{selectVerbiage()}</Item>
                        </Grid> : <><Grid xs={8} item><Item>{dotReturn(survival)}</Item></Grid></>}

                        <Grid item xs={4}><Item><SkillsModal prop={'Tracking'} /></Item></Grid>
                        {tracking === 0 ? <Grid xs={8} item>
                            <Item onClick={() => skillSelector('Tracking')}>{selectVerbiage()}</Item>
                        </Grid> : <><Grid xs={8} item><Item>{dotReturn(tracking)}</Item></Grid></>}
                    </Grid>
                </Grid>

                <Grid item xs={4}>
                    <Grid container>
                        <Grid item xs={4}><Item><SkillsModal prop={'Business'} /></Item></Grid>
                        {business === 0 ? <Grid xs={8} item>
                            <Item onClick={() => skillSelector('Business')}>{selectVerbiage()}</Item>
                        </Grid> : <><Grid xs={8} item><Item>{dotReturn(business)}</Item></Grid></>}

                        <Grid item xs={4}><Item><SkillsModal prop={'Cryptography'} /></Item></Grid>
                        {cryptography === 0 ? <Grid xs={8} item>
                            <Item onClick={() => skillSelector('Cryptography')}>{selectVerbiage()}</Item>
                        </Grid> : <><Grid xs={8} item><Item>{dotReturn(cryptography)}</Item></Grid></>}

                        <Grid item xs={4}><Item><SkillsModal prop={'Cyber Tech'} /></Item></Grid>
                        {cyberTech === 0 ? <Grid xs={8} item>
                            <Item onClick={() => skillSelector('Cyber Tech')}>{selectVerbiage()}</Item>
                        </Grid> : <><Grid xs={8} item><Item>{dotReturn(cyberTech)}</Item></Grid></>}

                        <Grid item xs={4}><Item><SkillsModal prop={'Investigation'} /></Item></Grid>
                        {investigation === 0 ? <Grid xs={8} item>
                            <Item onClick={() => skillSelector('Investigation')}>{selectVerbiage()}</Item>
                        </Grid> : <><Grid xs={8} item><Item>{dotReturn(investigation)}</Item></Grid></>}

                        <Grid item xs={4}><Item><SkillsModal prop={'First Aid'} /></Item></Grid>
                        {firstAid === 0 ? <Grid xs={8} item>
                            <Item onClick={() => skillSelector('First Aid')}>{selectVerbiage()}</Item>
                        </Grid> : <><Grid xs={8} item><Item>{dotReturn(firstAid)}</Item></Grid></>}

                        <Grid item xs={4}><Item><SkillsModal prop={'Gambling'} /></Item></Grid>
                        {gambling === 0 ? <Grid xs={8} item>
                            <Item onClick={() => skillSelector('Gambling')}>{selectVerbiage()}</Item>
                        </Grid> : <><Grid xs={8} item><Item>{dotReturn(gambling)}</Item></Grid></>}

                        <Grid item xs={4}><Item><SkillsModal prop={'Language'} /></Item></Grid>
                        {language === 0 ? <Grid xs={8} item>
                            <Item onClick={() => skillSelector('Language')}>{selectVerbiage()}</Item>
                        </Grid> : <><Grid xs={8} item><Item>{dotReturn(language)}</Item></Grid></>}

                        <Grid item xs={4}><Item><SkillsModal prop={'Military Tech'} /></Item></Grid>
                        {milTech === 0 ? <Grid xs={8} item>
                            <Item onClick={() => skillSelector('Military Tech')}>{selectVerbiage()}</Item>
                        </Grid> : <><Grid xs={8} item><Item>{dotReturn(milTech)}</Item></Grid></>}

                        <Grid item xs={4}><Item><SkillsModal prop={'Science'} /></Item></Grid>
                        {science === 0 ? <Grid xs={8} item>
                            <Item onClick={() => skillSelector('Science')}>{selectVerbiage()}</Item>
                        </Grid> : <><Grid xs={8} item><Item>{dotReturn(science)}</Item></Grid></>}

                        <Grid item xs={4}><Item><SkillsModal prop={'Vehicle Tech'} /></Item></Grid>
                        {vehicleTech === 0 ? <Grid xs={8} item>
                            <Item onClick={() => skillSelector('Vehicle Tech')}>{selectVerbiage()}</Item>
                        </Grid> : <><Grid xs={8} item><Item>{dotReturn(vehicleTech)}</Item></Grid></>}
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}

export default CreationSkills