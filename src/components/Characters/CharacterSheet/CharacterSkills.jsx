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



    const setSkills = () => {
        setAthletics(dotReturn(charDetail.athletics))
        setConcentration(dotReturn(charDetail.concentration))
        setContortionist(dotReturn(charDetail.contortionist))
        setInterrogation(dotReturn(charDetail.interrogation))
        setLegerdemain(dotReturn(charDetail.legerdemain))
        setPerception(dotReturn(charDetail.perception))
        setPersuasion(dotReturn(charDetail.persuasion))
        setResist(dotReturn(charDetail.resist))
        setStreetwise(dotReturn(charDetail.streetwise))
        setSubterfuge(dotReturn(charDetail.subterfuge))

        setAnimal(dotReturn(charDetail.animal))
        setDemolitions(dotReturn(charDetail.demolitions))
        setDriveLand(dotReturn(charDetail.driveland))
        setDriveAir(dotReturn(charDetail.driveair))
        setDriveSea(dotReturn(charDetail.drivesea))
        setEtiquette(dotReturn(charDetail.etiquette))
        setPerformance(dotReturn(charDetail.performance))
        setStealth(dotReturn(charDetail.stealth))
        setSurvival(dotReturn(charDetail.survival))
        setTracking(dotReturn(charDetail.tracking))

        setIsParaMed(charDetail.is_paramedical)
        setBureaucracy(dotReturn(charDetail.bureaucracy))
        setBusiness(dotReturn(charDetail.business))
        setCriminology(dotReturn(charDetail.criminology))
        setCryptography(dotReturn(charDetail.cryptography))
        setDeduction(dotReturn(charDetail.deduction))
        setFirstAid(dotReturn(charDetail.first_aid))
        setParaMed(dotReturn(charDetail.paramed))
        setGambling(dotReturn(charDetail.gambling))
        setLanguage(dotReturn(charDetail.language))
        setLibrary(dotReturn(charDetail.library))
        setScience(dotReturn(charDetail.science))
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
                <Item><SkillsModal prop={'Streetwise'} /></Item>
            </Grid>
            <Grid item xs={4}>
                <Item><SkillsModal prop={'Tekhne'} /></Item>
            </Grid>
            <Grid item xs={4}>
                <Item><SkillsModal prop={'Knowledge'} /></Item>
            </Grid>

            <Grid item xs={1.5}>
                <Item><SkillsModal prop={'Athletics'} /></Item>
            </Grid>
            <Grid item xs={2.5}>
                <Item>{athletics}</Item>
            </Grid>

            <Grid item xs={1.5}>
                <Item><SkillsModal prop={'Animal Handling'} /></Item>
            </Grid>
            <Grid item xs={2.5}>
                <Item>{animal}</Item>
            </Grid>

            <Grid item xs={1.5}>
                <Item><SkillsModal prop={'Bureaucracy'} /></Item>
            </Grid>
            <Grid item xs={2.5}>
                <Item>{bureaucracy}</Item>
            </Grid>

            <Grid item xs={1.5}>
                <Item><SkillsModal prop={'Concentration'} /></Item>
            </Grid>
            <Grid item xs={2.5}>
                <Item>{concentration}</Item>
            </Grid>

            <Grid item xs={1.5}>
                <Item><SkillsModal prop={'Demolitions'} /></Item>
            </Grid>
            <Grid item xs={2.5}>
                <Item>{demolitions}</Item>
            </Grid>

            <Grid item xs={1.5}>
                <Item><SkillsModal prop={'Business'} /></Item>
            </Grid>
            <Grid item xs={2.5}>
                <Item>{business}</Item>
            </Grid>

            <Grid item xs={1.5}>
                <Item><SkillsModal prop={'Contortionist'} /></Item>
            </Grid>
            <Grid item xs={2.5}>
                <Item>{contortionist}</Item>
            </Grid>

            <Grid item xs={1.5}>
                <Item><SkillsModal prop={'Drive Land Vehicle'} /></Item>
            </Grid>
            <Grid item xs={2.5}>
                <Item>{driveLand}</Item>
            </Grid>

            <Grid item xs={1.5}>
                <Item><SkillsModal prop={'Criminology'} /></Item>
            </Grid>
            <Grid item xs={2.5}>
                <Item>{criminology}</Item>
            </Grid>

            <Grid item xs={1.5}>
                <Item><SkillsModal prop={'Interrogation'} /></Item>
            </Grid>
            <Grid item xs={2.5}>
                <Item>{interrogation}</Item>
            </Grid>

            <Grid item xs={1.5}>
                <Item><SkillsModal prop={'Drive Air Vehicle'} /></Item>
            </Grid>
            <Grid item xs={2.5}>
                <Item>{driveAir}</Item>
            </Grid>

            <Grid item xs={1.5}>
                <Item><SkillsModal prop={'Cryptography'} /></Item>
            </Grid>
            <Grid item xs={2.5}>
                <Item>{cryptography}</Item>
            </Grid>

            <Grid item xs={1.5}>
                <Item><SkillsModal prop={'Legerdemain'} /></Item>
            </Grid>
            <Grid item xs={2.5}>
                <Item>{legerdemain}</Item>
            </Grid>

            <Grid item xs={1.5}>
                <Item><SkillsModal prop={'Drive Sea Vehicle'} /></Item>
            </Grid>
            <Grid item xs={2.5}>
                <Item>{driveSea}</Item>
            </Grid>

            <Grid item xs={1.5}>
                <Item><SkillsModal prop={'Deduction'} /></Item>
            </Grid>
            <Grid item xs={2.5}>
                <Item>{deduction}</Item>
            </Grid>

            <Grid item xs={1.5}>
                <Item><SkillsModal prop={'Perception'} /></Item>
            </Grid>
            <Grid item xs={2.5}>
                <Item>{perception}</Item>
            </Grid>

            <Grid item xs={1.5}>
                <Item><SkillsModal prop={'Etiquette'} /></Item>
            </Grid>
            <Grid item xs={2.5}>
                <Item>{etiquette}</Item>
            </Grid>

            {isParaMed === true ? (
                <>
                    <Grid item xs={1.5}>
                        <Item><SkillsModal prop={'Paramedic'} /></Item>
                    </Grid>
                    <Grid item xs={2.5}>
                        <Item>{paramed}</Item>
                    </Grid>
                </>
            ) : <>
                <Grid item xs={1.5}>
                    <Item><SkillsModal prop={'First Aid'} /></Item>
                </Grid>
                <Grid item xs={2.5}>
                    <Item>{firstAid}</Item>
                </Grid>
            </>}

            <Grid item xs={1.5}>
                <Item><SkillsModal prop={'Persuasion'} /></Item>
            </Grid>
            <Grid item xs={2.5}>
                <Item>{persuasion}</Item>
            </Grid>

            <Grid item xs={1.5}>
                <Item><SkillsModal prop={'Performance'} /></Item>
            </Grid>
            <Grid item xs={2.5}>
                <Item>{performance}</Item>
            </Grid>

            <Grid item xs={1.5}>
                <Item><SkillsModal prop={'Gambling'} /></Item>
            </Grid>
            <Grid item xs={2.5}>
                <Item>{gambling}</Item>
            </Grid>

            <Grid item xs={1.5}>
                <Item><SkillsModal prop={'Resist Torture/Drugs'} /></Item>
            </Grid>
            <Grid item xs={2.5}>
                <Item>{resist}</Item>
            </Grid>

            <Grid item xs={1.5}>
                <Item><SkillsModal prop={'Stealth'} /></Item>
            </Grid>
            <Grid item xs={2.5}>
                <Item>{stealth}</Item>
            </Grid>

            <Grid item xs={1.5}>
                <Item><SkillsModal prop={'Language'} /></Item>
            </Grid>
            <Grid item xs={2.5}>
                <Item>{language}</Item>
            </Grid>

            <Grid item xs={1.5}>
                <Item><SkillsModal prop={'Streetwise'} /></Item>
            </Grid>
            <Grid item xs={2.5}>
                <Item>{streetwise}</Item>
            </Grid>

            <Grid item xs={1.5}>
                <Item><SkillsModal prop={'Survival'} /></Item>
            </Grid>
            <Grid item xs={2.5}>
                <Item>{survival}</Item>
            </Grid>

            <Grid item xs={1.5}>
                <Item><SkillsModal prop={'Library Search'} /></Item>
            </Grid>
            <Grid item xs={2.5}>
                <Item>{library}</Item>
            </Grid>

            <Grid item xs={1.5}>
                <Item><SkillsModal prop={'Subterfuge'} /></Item>
            </Grid>
            <Grid item xs={2.5}>
                <Item>{subterfuge}</Item>
            </Grid>

            <Grid item xs={1.5}>
                <Item><SkillsModal prop={'Tracking'} /></Item>
            </Grid>
            <Grid item xs={2.5}>
                <Item>{tracking}</Item>
            </Grid>

            <Grid item xs={1.5}>
                <Item><SkillsModal prop={'Science'} /></Item>
            </Grid>
            <Grid item xs={2.5}>
                <Item>{science}</Item>
            </Grid>
        </>
    )
}

export default CharacterSkills;