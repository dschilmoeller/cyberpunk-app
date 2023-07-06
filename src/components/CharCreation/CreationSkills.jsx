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
    const [concentration, setConcentration] = useState(0)
    const [contortionist, setContortionist] = useState(0)
    const [interrogation, setInterrogation] = useState(0)
    const [legerdemain, setLegerdemain] = useState(0)
    const [perception, setPerception] = useState(0)
    const [persuasion, setPersuasion] = useState(0)
    const [resist, setResist] = useState(0)
    const [streetwise, setStreetwise] = useState(0)
    const [subterfuge, setSubterfuge] = useState(0)

    // Tekhne skills
    const [animal, setAnimal] = useState(0)
    const [demolitions, setDemolitions] = useState(0)
    const [driveLand, setDriveLand] = useState(0)
    const [driveAir, setDriveAir] = useState(0)
    const [driveSea, setDriveSea] = useState(0)
    const [etiquette, setEtiquette] = useState(0)
    const [performance, setPerformance] = useState(0)
    const [stealth, setStealth] = useState(0)
    const [survival, setSurvival] = useState(0)
    const [tracking, setTracking] = useState(0)

    // Knowledge Skills
    const [isParaMed, setIsParaMed] = useState(false)
    const [bureaucracy, setBureaucracy] = useState(0)
    const [business, setBusiness] = useState(0)
    const [criminology, setCriminology] = useState(0)
    const [cryptography, setCryptography] = useState(0)
    const [deduction, setDeduction] = useState(0)
    const [firstAid, setFirstAid] = useState(0)
    const [paramed, setParaMed] = useState(0)
    const [gambling, setGambling] = useState(0)
    const [language, setLanguage] = useState(0)
    const [library, setLibrary] = useState(0)
    const [science, setScience] = useState(0)

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
            case 'Athletics':
                if (athletics === 0) {
                    setAthletics(skillNumber)
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
            case 'Contortionist':
                if (contortionist === 0) {
                    setContortionist(skillNumber);
                    dealWithCounter();
                } else {
                    alert('Already selected!');
                }
                break;

            case 'Interrogation':
                if (interrogation === 0) {
                    setInterrogation(skillNumber);
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

            case 'Perception':
                if (perception === 0) {
                    setPerception(skillNumber);
                    dealWithCounter();
                } else {
                    alert('Already selected!');
                }
                break;

            case 'Persuasion':
                if (persuasion === 0) {
                    setPersuasion(skillNumber);
                    dealWithCounter();
                } else {
                    alert('Already selected!');
                }
                break;

            case 'Resist Torture/Drugs':
                if (resist === 0) {
                    setResist(skillNumber);
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

            case 'Subterfuge':
                if (subterfuge === 0) {
                    setSubterfuge(skillNumber);
                    dealWithCounter();
                } else {
                    alert('Already selected!');
                }
                break;

            case 'Animal Handling':
                if (animal === 0) {
                    setAnimal(skillNumber);
                    dealWithCounter();
                } else {
                    alert('Already selected!');
                }
                break;

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

            case 'Drive Air Vehicle':
                if (driveAir === 0) {
                    setDriveAir(skillNumber);
                    dealWithCounter();
                } else {
                    alert('Already selected!');
                }
                break;

            case 'Drive Sea Vehicle':
                if (driveSea === 0) {
                    setDriveSea(skillNumber);
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

            case 'Bureaucracy':
                if (bureaucracy === 0) {
                    setBureaucracy(skillNumber);
                    dealWithCounter();
                } else {
                    alert('Already selected!');
                }
                break;

            case 'Business':
                if (business === 0) {
                    setBusiness(skillNumber);
                    dealWithCounter();
                } else {
                    alert('Already selected!');
                }
                break;

            case 'Criminology':
                if (criminology === 0) {
                    setCriminology(skillNumber);
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

            case 'Deduction':
                if (deduction === 0) {
                    setDeduction(skillNumber);
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

            case 'Library Search':
                if (library === 0) {
                    setLibrary(skillNumber);
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
        setConcentration(0)
        setContortionist(0)
        setInterrogation(0)
        setLegerdemain(0)
        setPerception(0)
        setPersuasion(0)
        setResist(0)
        setStreetwise(0)
        setSubterfuge(0)

        setAnimal(0)
        setDemolitions(0)
        setDriveLand(0)
        setDriveAir(0)
        setDriveSea(0)
        setEtiquette(0)
        setPerformance(0)
        setStealth(0)
        setSurvival(0)
        setTracking(0)

        setIsParaMed(false)
        setBureaucracy(0)
        setBusiness(0)
        setCriminology(0)
        setCryptography(0)
        setDeduction(0)
        setFirstAid(0)
        setParaMed(0)
        setGambling(0)
        setLanguage(0)
        setLibrary(0)
        setScience(0)
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
            dispatch({type: 'SET_CREATION_SKILLS', payload: skills})
            dispatch({type: 'SET_CREATION_STEP', payload: 'combat_skills'})
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

                        <Grid item xs={4}><Item><SkillsModal prop={'Concentration'} /></Item></Grid>
                        {concentration === 0 ? <Grid xs={8} item>
                            <Item onClick={() => skillSelector('Concentration')}>{selectVerbiage()}</Item>
                        </Grid> : <><Grid xs={8} item><Item>{dotReturn(concentration)}</Item></Grid></>}

                        <Grid item xs={4}><Item><SkillsModal prop={'Contortionist'} /></Item></Grid>
                        {contortionist === 0 ? <Grid xs={8} item>
                            <Item onClick={() => skillSelector('Contortionist')}>{selectVerbiage()}</Item>
                        </Grid> : <><Grid xs={8} item><Item>{dotReturn(contortionist)}</Item></Grid></>}

                        <Grid item xs={4}><Item><SkillsModal prop={'Interrogation'} /></Item></Grid>
                        {interrogation === 0 ? <Grid xs={8} item>
                            <Item onClick={() => skillSelector('Interrogation')}>{selectVerbiage()}</Item>
                        </Grid> : <><Grid xs={8} item><Item>{dotReturn(interrogation)}</Item></Grid></>}

                        <Grid item xs={4}><Item><SkillsModal prop={'Legerdemain'} /></Item></Grid>
                        {legerdemain === 0 ? <Grid xs={8} item>
                            <Item onClick={() => skillSelector('Legerdemain')}>{selectVerbiage()}</Item>
                        </Grid> : <><Grid xs={8} item><Item>{dotReturn(legerdemain)}</Item></Grid></>}

                        <Grid item xs={4}><Item><SkillsModal prop={'Perception'} /></Item></Grid>
                        {perception === 0 ? <Grid xs={8} item>
                            <Item onClick={() => skillSelector('Perception')}>{selectVerbiage()}</Item>
                        </Grid> : <><Grid xs={8} item><Item>{dotReturn(perception)}</Item></Grid></>}

                        <Grid item xs={4}><Item><SkillsModal prop={'Persuasion'} /></Item></Grid>
                        {persuasion === 0 ? <Grid xs={8} item>
                            <Item onClick={() => skillSelector('Persuasion')}>{selectVerbiage()}</Item>
                        </Grid> : <><Grid xs={8} item><Item>{dotReturn(persuasion)}</Item></Grid></>}

                        <Grid item xs={4}><Item><SkillsModal prop={'Resist Torture/Drugs'} /></Item></Grid>
                        {resist === 0 ? <Grid xs={8} item>
                            <Item onClick={() => skillSelector('Resist Torture/Drugs')}>{selectVerbiage()}</Item>
                        </Grid> : <><Grid xs={8} item><Item>{dotReturn(resist)}</Item></Grid></>}

                        <Grid item xs={4}><Item><SkillsModal prop={'Streetwise'} /></Item></Grid>
                        {streetwise === 0 ? <Grid xs={8} item>
                            <Item onClick={() => skillSelector('Streetwise')}>{selectVerbiage()}</Item>
                        </Grid> : <><Grid xs={8} item><Item>{dotReturn(streetwise)}</Item></Grid></>}

                        <Grid item xs={4}><Item><SkillsModal prop={'Subterfuge'} /></Item></Grid>
                        {subterfuge === 0 ? <Grid xs={8} item>
                            <Item onClick={() => skillSelector('Subterfuge')}>{selectVerbiage()}</Item>
                        </Grid> : <><Grid xs={8} item><Item>{dotReturn(subterfuge)}</Item></Grid></>}
                    </Grid>
                </Grid>

                <Grid item xs={4}>
                    <Grid container>
                        <Grid item xs={4}><Item><SkillsModal prop={'Animal Handling'} /></Item></Grid>
                        {animal === 0 ? <Grid xs={8} item>
                            <Item onClick={() => skillSelector('Animal Handling')}>{selectVerbiage()}</Item>
                        </Grid> : <><Grid xs={8} item><Item>{dotReturn(animal)}</Item></Grid></>}

                        <Grid item xs={4}><Item><SkillsModal prop={'Demolitions'} /></Item></Grid>
                        {demolitions === 0 ? <Grid xs={8} item>
                            <Item onClick={() => skillSelector('Demolitions')}>{selectVerbiage()}</Item>
                        </Grid> : <><Grid xs={8} item><Item>{dotReturn(demolitions)}</Item></Grid></>}

                        <Grid item xs={4}><Item><SkillsModal prop={'Drive Land Vehicle'} /></Item></Grid>
                        {driveLand === 0 ? <Grid xs={8} item>
                            <Item onClick={() => skillSelector('Drive Land Vehicle')}>{selectVerbiage()}</Item>
                        </Grid> : <><Grid xs={8} item><Item>{dotReturn(driveLand)}</Item></Grid></>}

                        <Grid item xs={4}><Item><SkillsModal prop={'Drive Air Vehicle'} /></Item></Grid>
                        {driveAir === 0 ? <Grid xs={8} item>
                            <Item onClick={() => skillSelector('Drive Air Vehicle')}>{selectVerbiage()}</Item>
                        </Grid> : <><Grid xs={8} item><Item>{dotReturn(driveAir)}</Item></Grid></>}

                        <Grid item xs={4}><Item><SkillsModal prop={'Drive Sea Vehicle'} /></Item></Grid>
                        {driveSea === 0 ? <Grid xs={8} item>
                            <Item onClick={() => skillSelector('Drive Sea Vehicle')}>{selectVerbiage()}</Item>
                        </Grid> : <><Grid xs={8} item><Item>{dotReturn(driveSea)}</Item></Grid></>}

                        <Grid item xs={4}><Item><SkillsModal prop={'Etiquette'} /></Item></Grid>
                        {etiquette === 0 ? <Grid xs={8} item>
                            <Item onClick={() => skillSelector('Etiquette')}>{selectVerbiage()}</Item>
                        </Grid> : <><Grid xs={8} item><Item>{dotReturn(etiquette)}</Item></Grid></>}

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
                        <Grid item xs={4}><Item><SkillsModal prop={'Bureaucracy'} /></Item></Grid>
                        {bureaucracy === 0 ? <Grid xs={8} item>
                            <Item onClick={() => skillSelector('Bureaucracy')}>{selectVerbiage()}</Item>
                        </Grid> : <><Grid xs={8} item><Item>{dotReturn(bureaucracy)}</Item></Grid></>}

                        <Grid item xs={4}><Item><SkillsModal prop={'Business'} /></Item></Grid>
                        {business === 0 ? <Grid xs={8} item>
                            <Item onClick={() => skillSelector('Business')}>{selectVerbiage()}</Item>
                        </Grid> : <><Grid xs={8} item><Item>{dotReturn(business)}</Item></Grid></>}

                        <Grid item xs={4}><Item><SkillsModal prop={'Criminology'} /></Item></Grid>
                        {criminology === 0 ? <Grid xs={8} item>
                            <Item onClick={() => skillSelector('Criminology')}>{selectVerbiage()}</Item>
                        </Grid> : <><Grid xs={8} item><Item>{dotReturn(criminology)}</Item></Grid></>}

                        <Grid item xs={4}><Item><SkillsModal prop={'Cryptography'} /></Item></Grid>
                        {cryptography === 0 ? <Grid xs={8} item>
                            <Item onClick={() => skillSelector('Cryptography')}>{selectVerbiage()}</Item>
                        </Grid> : <><Grid xs={8} item><Item>{dotReturn(cryptography)}</Item></Grid></>}

                        <Grid item xs={4}><Item><SkillsModal prop={'Deduction'} /></Item></Grid>
                        {deduction === 0 ? <Grid xs={8} item>
                            <Item onClick={() => skillSelector('Deduction')}>{selectVerbiage()}</Item>
                        </Grid> : <><Grid xs={8} item><Item>{dotReturn(deduction)}</Item></Grid></>}

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

                        <Grid item xs={4}><Item><SkillsModal prop={'Library Search'} /></Item></Grid>
                        {library === 0 ? <Grid xs={8} item>
                            <Item onClick={() => skillSelector('Library Search')}>{selectVerbiage()}</Item>
                        </Grid> : <><Grid xs={8} item><Item>{dotReturn(library)}</Item></Grid></>}

                        <Grid item xs={4}><Item><SkillsModal prop={'Science'} /></Item></Grid>
                        {science === 0 ? <Grid xs={8} item>
                            <Item onClick={() => skillSelector('Science')}>{selectVerbiage()}</Item>
                        </Grid> : <><Grid xs={8} item><Item>{dotReturn(science)}</Item></Grid></>}
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}

export default CreationSkills