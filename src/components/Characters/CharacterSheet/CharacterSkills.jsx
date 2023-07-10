import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Item from './Item';
import SkillsModal from '../../Modals/SkillsModal';

function CharacterSkills(charDetailProp) {
    const charDetail = charDetailProp.charDetail

    const fulldot = ` \u2b24`
    const emptydot = ` \u25ef`

    useEffect(() => {
        setSkills();
    })

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

    return (
        <>
            <Grid item xs={12}>
                <Item><h1>Skills</h1></Item>
            </Grid>
            <Grid item xs={4}>
                <Grid container>
                    <Grid item xs={4}><Item><SkillsModal prop={'Athletics'} /></Item></Grid>
                    <Grid item xs={8}><Item>{dotReturn(athletics)}</Item></Grid>

                    <Grid item xs={4}><Item><SkillsModal prop={'Brawling'} /></Item></Grid>
                    <Grid item xs={8}><Item>{dotReturn(brawling)}</Item></Grid>

                    <Grid item xs={4}><Item><SkillsModal prop={'Concentration'} /></Item></Grid>
                    <Grid item xs={8}><Item>{dotReturn(concentration)}</Item></Grid>

                    <Grid item xs={4}><Item><SkillsModal prop={'Evasion'} /></Item></Grid>
                    <Grid item xs={8}><Item>{dotReturn(evasion)}</Item></Grid>

                    <Grid item xs={4}><Item><SkillsModal prop={'Fast Talk'} /></Item></Grid>
                    <Grid item xs={8}><Item>{dotReturn(fastTalk)}</Item></Grid>

                    <Grid item xs={4}><Item><SkillsModal prop={'Firearms'} /></Item></Grid>
                    <Grid item xs={8}><Item>{dotReturn(firearms)}</Item></Grid>

                    <Grid item xs={4}><Item><SkillsModal prop={'Legerdemain'} /></Item></Grid>
                    <Grid item xs={8}><Item>{dotReturn(legerdemain)}</Item></Grid>

                    <Grid item xs={4}><Item><SkillsModal prop={'Melee Weapons'} /></Item></Grid>
                    <Grid item xs={8}><Item>{dotReturn(meleeWeapons)}</Item></Grid>

                    <Grid item xs={4}><Item><SkillsModal prop={'Perception'} /></Item></Grid>
                    <Grid item xs={8}><Item>{dotReturn(perception)}</Item></Grid>

                    <Grid item xs={4}><Item><SkillsModal prop={'Streetwise'} /></Item></Grid>
                    <Grid item xs={8}><Item>{dotReturn(streetwise)}</Item></Grid>
                </Grid>
            </Grid>

            <Grid item xs={4}>
                <Grid container>
                    <Grid item xs={4}><Item><SkillsModal prop={'Demolitions'} /></Item></Grid>
                    <Grid item xs={8}><Item>{dotReturn(demolitions)}</Item></Grid>

                    <Grid item xs={4}><Item><SkillsModal prop={'Drive Land'} /></Item></Grid>
                    <Grid item xs={8}><Item>{dotReturn(driveLand)}</Item></Grid>

                    <Grid item xs={4}><Item><SkillsModal prop={'Drive Exotic'} /></Item></Grid>
                    <Grid item xs={8}><Item>{dotReturn(driveExotic)}</Item></Grid>

                    <Grid item xs={4}><Item><SkillsModal prop={'Etiquette'} /></Item></Grid>
                    <Grid item xs={8}><Item>{dotReturn(etiquette)}</Item></Grid>

                    <Grid item xs={4}><Item><SkillsModal prop={'Exotic Weapons'} /></Item></Grid>
                    <Grid item xs={8}><Item>{dotReturn(exoticWeapons)}</Item></Grid>

                    <Grid item xs={4}><Item><SkillsModal prop={'Heavy Weapons'} /></Item></Grid>
                    <Grid item xs={8}><Item>{dotReturn(heavyWeapons)}</Item></Grid>

                    <Grid item xs={4}><Item><SkillsModal prop={'Performance'} /></Item></Grid>
                    <Grid item xs={8}><Item>{dotReturn(performance)}</Item></Grid>

                    <Grid item xs={4}><Item><SkillsModal prop={'Stealth'} /></Item></Grid>
                    <Grid item xs={8}><Item>{dotReturn(stealth)}</Item></Grid>

                    <Grid item xs={4}><Item><SkillsModal prop={'Survival'} /></Item></Grid>
                    <Grid item xs={8}><Item>{dotReturn(survival)}</Item></Grid>

                    <Grid item xs={4}><Item><SkillsModal prop={'Tracking'} /></Item></Grid>
                    <Grid item xs={8}><Item>{dotReturn(tracking)}</Item></Grid>
                </Grid>
            </Grid>

            <Grid item xs={4}>
                <Grid container>
                    <Grid item xs={4}><Item><SkillsModal prop={'Business'} /></Item></Grid>
                    <Grid item xs={8}><Item>{dotReturn(business)}</Item></Grid>

                    <Grid item xs={4}><Item><SkillsModal prop={'Cryptography'} /></Item></Grid>
                    <Grid item xs={8}><Item>{dotReturn(cryptography)}</Item></Grid>

                    <Grid item xs={4}><Item><SkillsModal prop={'Cyber Tech'} /></Item></Grid>
                    <Grid item xs={8}><Item>{dotReturn(cyberTech)}</Item></Grid>

                    <Grid item xs={4}><Item><SkillsModal prop={'Investigation'} /></Item></Grid>
                    <Grid item xs={8}><Item>{dotReturn(investigation)}</Item></Grid>

                    {isParaMed === true ? (<>
                        <Grid item xs={4}><Item><SkillsModal prop={'Paramedic'} /></Item></Grid>
                        <Grid item xs={8}><Item>{dotReturn(paramed)}</Item></Grid>
                    </>) : (<>
                        <Grid item xs={4}><Item><SkillsModal prop={'First Aid'} /></Item></Grid>
                        <Grid item xs={8}><Item>{dotReturn(firstAid)}</Item></Grid>
                    </>)}

                    <Grid item xs={4}><Item><SkillsModal prop={'Gambling'} /></Item></Grid>
                    <Grid item xs={8}><Item>{dotReturn(gambling)}</Item></Grid>

                    <Grid item xs={4}><Item><SkillsModal prop={'Language'} /></Item></Grid>
                    <Grid item xs={8}><Item>{dotReturn(language)}</Item></Grid>

                    <Grid item xs={4}><Item><SkillsModal prop={'Military Tech'} /></Item></Grid>
                    <Grid item xs={8}><Item>{dotReturn(milTech)}</Item></Grid>

                    <Grid item xs={4}><Item><SkillsModal prop={'Science'} /></Item></Grid>
                    <Grid item xs={8}><Item>{dotReturn(science)}</Item></Grid>

                    <Grid item xs={4}><Item><SkillsModal prop={'Vehicle Tech'} /></Item></Grid>
                    <Grid item xs={8}><Item>{dotReturn(vehicleTech)}</Item></Grid>
                </Grid>
            </Grid>
        </>
    )
}

export default CharacterSkills;