import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Item from './Item';
import { useSelector } from 'react-redux';

import CircleIcon from '@mui/icons-material/Circle';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';

import SkillsDialog from '../../Modals/SkillsDialog';

// prop should be changed to use-store to remove the setskills function's neccessity at some point.
function CharacterSkills(charDetailProp) {
    const charDetail = charDetailProp.charDetail
    const characterCyberware = useSelector(store => store.characterGear.cyberware)

    const fulldot = <CircleIcon sx={{fontSize: {xs: '1.25rem', sm: '1.25rem', md: '1.25rem', lg: '1.5rem'}}}/>
    const emptydot = <CircleOutlinedIcon sx={{fontSize: {xs: '1.25rem', sm: '1.25rem', md: '1.25rem', lg: '1.5rem'}}}/>

    useEffect(() => {
        setSkills();
        skillChipChecker();
    }, [])

    // Streetwise Skills
    const [athletics, setAthletics] = useState(0)
    const [brawling, setBrawling] = useState(0)
    const [concentration, setConcentration] = useState(0)
    const [evasion, setEvasion] = useState(0)
    const [fastTalk, setFastTalk] = useState(0)
    const [firearms, setFirearms] = useState(0)
    const [legerdemain, setLegerdemain] = useState(0)
    const [meleeWeapons, setMeleeWeapons] = useState(0)
    const [perception, setPerception] = useState(0)
    const [streetwise, setStreetwise] = useState(0)

    // Tekhne skills

    const [demolitions, setDemolitions] = useState(0)
    const [driveLand, setDriveLand] = useState(0)
    const [driveExotic, setDriveExotic] = useState(0)
    const [etiquette, setEtiquette] = useState(0)
    const [heavyWeapons, setHeavyWeapons] = useState(0)
    const [exoticWeapons, setExoticWeapons] = useState(0)
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

    // non-standard skills:
    const [isParaMed, setIsParaMed] = useState(false)
    const [paramed, setParaMed] = useState(0)

    const setSkills = () => {
        setAthletics(charDetail.athletics)
        setBrawling(charDetail.brawling)
        setConcentration(charDetail.concentration)
        setEvasion(charDetail.evasion)
        setFastTalk(charDetail.fast_talk)
        setFirearms(charDetail.firearms)
        setLegerdemain(charDetail.legerdemain)
        setMeleeWeapons(charDetail.melee_weapons)
        setPerception(charDetail.perception)
        setStreetwise(charDetail.streetwise)

        setDemolitions(charDetail.demolitions)
        setDriveLand(charDetail.drive_land)
        setDriveExotic(charDetail.drive_exotic)
        setEtiquette(charDetail.etiquette)
        setExoticWeapons(charDetail.exotic_weapons)
        setHeavyWeapons(charDetail.heavy_weapons)
        setPerformance(charDetail.performance)
        setStealth(charDetail.stealth)
        setSurvival(charDetail.survival)
        setTracking(charDetail.tracking)

        setBusiness(charDetail.business)
        setCryptography(charDetail.cryptography)
        setCyberTech(charDetail.cyber_tech)
        setInvestigation(charDetail.investigation)
        setFirstAid(charDetail.first_aid)
        setGambling(charDetail.gambling)
        setLanguage(charDetail.language)
        setMilTech(charDetail.military_tech)
        setScience(charDetail.science)
        setVehicleTech(charDetail.vehicle_tech)

        setIsParaMed(charDetail.is_paramedical)
        setParaMed(charDetail.paramed)
    }

    // creates list of dots of either the filled or empty variety to show character stats.
    const dotReturn = (skill) => {
        let returnedDots = []
        for (let i = 0; i < skill; i++) {
            returnedDots.push(<React.Fragment key={i}>{fulldot}</React.Fragment>)
        }
        let j = skill
        for (j; j <= 4; j++) {
            returnedDots.push(<React.Fragment key={j + 10}>{emptydot}</React.Fragment>)
        }
        return returnedDots
    }


    // run through owned cyberware and see if any skill chips are installed.
    // if they are, assign them at rank 2
    const skillChipChecker = () => {
        characterCyberware.map(cyberware => {
            switch (cyberware.name) {
                case 'Skill Chip - Athletics':
                    if (cyberware.equipped === true && charDetail.athletics <= 2) {
                        setAthletics(2)
                    }
                    break;
                case 'Skill Chip - Brawling':
                    if (cyberware.equipped === true && charDetail.brawling <= 2) {
                        setBrawling(2)
                    }
                    break;
                case 'Skill Chip - Evasion':
                    if (cyberware.equipped === true && charDetail.evasion <= 2) {
                        setEvasion(2)
                    }
                    break;
                case 'Skill Chip - Fast Talk':
                    if (cyberware.equipped === true && charDetail.fastTalk <= 2) {
                        setFastTalk(2)
                    }
                    break;
                case 'Skill Chip - Firearms':
                    if (cyberware.equipped === true && charDetail.firearms <= 2) {
                        setFirearms(2)
                    }
                    break;
                case 'Skill Chip - Melee Weapons':
                    if (cyberware.equipped === true && charDetail.melee_weapons <= 2) {
                        setMeleeWeapons(2)
                    }
                    break;
                case 'Skill Chip - Drive Land':
                    if (cyberware.equipped === true && charDetail.drive_land <= 2) {
                        setDriveLand(2)
                    }
                    break;
                case 'Skill Chip - Performance':
                    if (cyberware.equipped === true && charDetail.performance <= 2) {
                        setPerformance(2)
                    }
                    break;
                case 'Skill Chip - Cryptography':
                    if (cyberware.equipped === true && charDetail.cryptography <= 2) {
                        setCryptography(2)
                    }
                    break;
                case 'Skill Chip - First Aid':
                    if (cyberware.equipped === true && charDetail.first_aid <= 2) {
                        setFirstAid(2)
                    }
                    break;
                case 'Skill Chip - Gambling':
                    if (cyberware.equipped === true && charDetail.gambling <= 2) {
                        setGambling(2)
                    }
                    break;
                case 'Skill Chip - Language':
                    if (cyberware.equipped === true && charDetail.language <= 2) {
                        setLanguage(2)
                    }
                    break;
            }
        })
    }

    return (
        <>
            <Grid item xs={12}>
                <Item sx={{ fontSize: '1.3em', padding: 0 }}>Skills</Item>
            </Grid>
            <Grid item xs={4}>
                <Grid container>
                    <Grid item xs={12}><Item><SkillsDialog prop={'Streets'} /></Item></Grid>

                    <Grid item xs={4}><Item><SkillsDialog prop={'Athletics'} /></Item></Grid>
                    <Grid item xs={8}><Item>{dotReturn(athletics)}</Item></Grid>

                    <Grid item xs={4}><Item><SkillsDialog prop={'Brawling'} /></Item></Grid>
                    <Grid item xs={8}><Item>{dotReturn(brawling)}</Item></Grid>

                    <Grid item xs={4}><Item><SkillsDialog prop={'Concentration'} /></Item></Grid>
                    <Grid item xs={8}><Item>{dotReturn(concentration)}</Item></Grid>

                    <Grid item xs={4}><Item><SkillsDialog prop={'Evasion'} /></Item></Grid>
                    <Grid item xs={8}><Item>{dotReturn(evasion)}</Item></Grid>

                    <Grid item xs={4}><Item><SkillsDialog prop={'Fast Talk'} /></Item></Grid>
                    <Grid item xs={8}><Item>{dotReturn(fastTalk)}</Item></Grid>

                    <Grid item xs={4}><Item><SkillsDialog prop={'Firearms'} /></Item></Grid>
                    <Grid item xs={8}><Item>{dotReturn(firearms)}</Item></Grid>

                    <Grid item xs={4}><Item><SkillsDialog prop={'Legerdemain'} /></Item></Grid>
                    <Grid item xs={8}><Item>{dotReturn(legerdemain)}</Item></Grid>

                    <Grid item xs={4}><Item><SkillsDialog prop={'Melee Weapons'} /></Item></Grid>
                    <Grid item xs={8}><Item>{dotReturn(meleeWeapons)}</Item></Grid>

                    <Grid item xs={4}><Item><SkillsDialog prop={'Perception'} /></Item></Grid>
                    <Grid item xs={8}><Item>{dotReturn(perception)}</Item></Grid>

                    <Grid item xs={4}><Item><SkillsDialog prop={'Streetwise'} /></Item></Grid>
                    <Grid item xs={8}><Item>{dotReturn(streetwise)}</Item></Grid>
                </Grid>
            </Grid>

            <Grid item xs={4}>
                <Grid container>
                    <Grid item xs={12}><Item><SkillsDialog prop={'Tekhne'} /></Item></Grid>

                    <Grid item xs={4}><Item><SkillsDialog prop={'Demolitions'} /></Item></Grid>
                    <Grid item xs={8}><Item>{dotReturn(demolitions)}</Item></Grid>

                    <Grid item xs={4}><Item><SkillsDialog prop={'Drive Land Vehicle'} /></Item></Grid>
                    <Grid item xs={8}><Item>{dotReturn(driveLand)}</Item></Grid>

                    <Grid item xs={4}><Item><SkillsDialog prop={'Drive Exotic Vehicle'} /></Item></Grid>
                    <Grid item xs={8}><Item>{dotReturn(driveExotic)}</Item></Grid>

                    <Grid item xs={4}><Item><SkillsDialog prop={'Etiquette'} /></Item></Grid>
                    <Grid item xs={8}><Item>{dotReturn(etiquette)}</Item></Grid>

                    <Grid item xs={4}><Item><SkillsDialog prop={'Exotic Weapons'} /></Item></Grid>
                    <Grid item xs={8}><Item>{dotReturn(exoticWeapons)}</Item></Grid>

                    <Grid item xs={4}><Item><SkillsDialog prop={'Heavy Weapons'} /></Item></Grid>
                    <Grid item xs={8}><Item>{dotReturn(heavyWeapons)}</Item></Grid>

                    <Grid item xs={4}><Item><SkillsDialog prop={'Performance'} /></Item></Grid>
                    <Grid item xs={8}><Item>{dotReturn(performance)}</Item></Grid>

                    <Grid item xs={4}><Item><SkillsDialog prop={'Stealth'} /></Item></Grid>
                    <Grid item xs={8}><Item>{dotReturn(stealth)}</Item></Grid>

                    <Grid item xs={4}><Item><SkillsDialog prop={'Survival'} /></Item></Grid>
                    <Grid item xs={8}><Item>{dotReturn(survival)}</Item></Grid>

                    <Grid item xs={4}><Item><SkillsDialog prop={'Tracking'} /></Item></Grid>
                    <Grid item xs={8}><Item>{dotReturn(tracking)}</Item></Grid>
                </Grid>
            </Grid>

            <Grid item xs={4}>
                <Grid container>
                    <Grid item xs={12}><Item><SkillsDialog prop={'Knowledge'} /></Item></Grid>

                    <Grid item xs={4}><Item><SkillsDialog prop={'Business'} /></Item></Grid>
                    <Grid item xs={8}><Item>{dotReturn(business)}</Item></Grid>

                    <Grid item xs={4}><Item><SkillsDialog prop={'Cryptography'} /></Item></Grid>
                    <Grid item xs={8}><Item>{dotReturn(cryptography)}</Item></Grid>

                    <Grid item xs={4}><Item><SkillsDialog prop={'Cyber Tech'} /></Item></Grid>
                    <Grid item xs={8}><Item>{dotReturn(cyberTech)}</Item></Grid>

                    <Grid item xs={4}><Item><SkillsDialog prop={'Investigation'} /></Item></Grid>
                    <Grid item xs={8}><Item>{dotReturn(investigation)}</Item></Grid>

                    {isParaMed === true ? (<>
                        <Grid item xs={4}><Item><SkillsDialog prop={'Paramedic'} /></Item></Grid>
                        <Grid item xs={8}><Item>{dotReturn(paramed)}</Item></Grid>
                    </>) : (<>
                        <Grid item xs={4}><Item><SkillsDialog prop={'First Aid'} /></Item></Grid>
                        <Grid item xs={8}><Item>{dotReturn(firstAid)}</Item></Grid>
                    </>)}

                    <Grid item xs={4}><Item><SkillsDialog prop={'Gambling'} /></Item></Grid>
                    <Grid item xs={8}><Item>{dotReturn(gambling)}</Item></Grid>

                    <Grid item xs={4}><Item><SkillsDialog prop={'Language'} /></Item></Grid>
                    <Grid item xs={8}><Item>{dotReturn(language)}</Item></Grid>

                    <Grid item xs={4}><Item><SkillsDialog prop={'Military Tech'} /></Item></Grid>
                    <Grid item xs={8}><Item>{dotReturn(milTech)}</Item></Grid>

                    <Grid item xs={4}><Item><SkillsDialog prop={'Science'} /></Item></Grid>
                    <Grid item xs={8}><Item>{dotReturn(science)}</Item></Grid>

                    <Grid item xs={4}><Item><SkillsDialog prop={'Vehicle Tech'} /></Item></Grid>
                    <Grid item xs={8}><Item>{dotReturn(vehicleTech)}</Item></Grid>
                </Grid>
            </Grid>
        </>
    )
}

export default CharacterSkills;