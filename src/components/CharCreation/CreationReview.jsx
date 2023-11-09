import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import { useHistory, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Item from '../Characters/CharacterSheet/Item';

import AttributesDialog from '../Modals/AttributesDialog';
import SkillsDialog from '../Modals/SkillsDialog';
import RoleAbilitiesDialog from '../Modals/RoleAbilitiesDialog';

import CircleIcon from '@mui/icons-material/Circle';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';


export default function CreationReview() {

    const charDetail = useSelector(store => store.characterCreation)
    const armor = useSelector(store => store.gearMaster.armor)
    const shield = useSelector(store => store.gearMaster.shields)
    const weapons = useSelector(store => store.gearMaster.weapons)
    const miscGear = useSelector(store => store.gearMaster.miscGear)
    const netrunnerMaster = useSelector(store => store.gearMaster.netrunnerGear)
    const cyberware = useSelector(store => store.gearMaster.cyberware)
    
    const dispatch = useDispatch();
    const history = useHistory();

    const fulldot = <CircleIcon />
    const emptydot = <CircleOutlinedIcon />

    // physical attributes
    const [strengthAtt, setStrengthAtt] = useState(charDetail.strength);
    const [bodyAtt, setBodyAtt] = useState(charDetail.body);
    const [reflexesAtt, setReflexesAtt] = useState(charDetail.reflexes);
    const [moveatt, setMoveAtt] = useState(Math.ceil(charDetail.reflexes / 2));

    // social attributes
    const [appearanceAtt, setAppearanceAtt] = useState(charDetail.appearance);
    const [coolAtt, setCoolAtt] = useState(charDetail.cool);
    const [streetCredAtt, setStreetCredAtt] = useState(charDetail.street_cred);

    // mental attributes
    const [intelligenceAtt, setIntelligenceAtt] = useState(charDetail.intelligence);
    const [willpowerAtt, setWillpowerAtt] = useState(charDetail.willpower)
    const [techniqueAtt, setTechniqueAtt] = useState(charDetail.technique)

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

    const [rockerboy, setRockerboy] = useState(charDetail.rockerboy);
    const [solo, setSolo] = useState(charDetail.solo);
    const [netrunner, setNetrunner] = useState(charDetail.netrunner);
    const [nomad, setNomad] = useState(charDetail.nomad);
    const [media, setMedia] = useState(charDetail.media);
    const [medtech, setMedtech] = useState(charDetail.medtech);
    const [maker, setMaker] = useState(charDetail.maker);
    const [isParamedical, setIsParamedical] = useState(charDetail.isParamedical)
    const [paramedic, setParamedic] = useState(charDetail.paramedic)

    // special role skills - Medtech
    const [medSurgery, setMedSurgery] = useState(charDetail.medSurgery);
    const [medPharma, setMedPharma] = useState(charDetail.medPharma);
    const [medCryo, setMedCryo] = useState(charDetail.medCryo);
    // special role skills - Maker
    const [makerField, setMakerField] = useState(charDetail.makerField);
    const [makerUpgrade, setMakerUpgrade] = useState(charDetail.makerUpgrade);
    const [makerFab, setMakerFab] = useState(charDetail.makerFab);
    const [makerInvent, setMakerInvent] = useState(charDetail.makerInvent);

    const attDotReturn = (attribute) => {
        let returnedDots = []

        for (let i = 0; i < attribute; i++) {
            returnedDots.push(fulldot);
        }
        let j = attribute
        for (j; j <= 9; j++) {
            returnedDots.push(emptydot);
        }
        return returnedDots
    }

    const skillDotReturn = (skill) => {
        let returnedDots = []
        for (let i = 0; i < skill; i++) {
            returnedDots.push(fulldot);
        }
        let j = skill
        for (j; j <= 4; j++) {
            returnedDots.push(emptydot);
        }
        return returnedDots
    }

    const saveCharacter = () => {
        let updatedCharDetail = charDetail
        // convert index to master ids. is there a way to do this directly in the logic so that index === id? not without total conversion. see if this will fix for now.
        // this allows for table indices not to match perfectly.
        let armor_master_array = []
        for (let i = 0; i < charDetail.armor.length; i++ ) {
            // go to armor at index: chardetail.armor[i] and fetch master id.
            armor_master_array.push(armor[charDetail.armor[i]].armor_master_id)
        }
        updatedCharDetail.armor = armor_master_array
        
        let shield_master_array = []
        for (let i = 0; i < charDetail.shield.length; i++ ) {
            shield_master_array.push(shield[charDetail.shield[i]].shield_master_id)
        }
        updatedCharDetail.shield = shield_master_array

        let weapon_master_array = []
        for (let i = 0; i < charDetail.weapons.length; i++ ) {
            weapon_master_array.push(weapons[charDetail.weapons[i]].weapon_master_id)
        }
        updatedCharDetail.weapons = weapon_master_array

        let misc_gear_master_array = []
        for (let i = 0; i < charDetail.gear.length; i++ ) {
            misc_gear_master_array.push(miscGear[charDetail.gear[i]].misc_gear_master_id)
        }
        updatedCharDetail.gear = misc_gear_master_array
        
        let netrunner_gear_master_array = []
        for (let i = 0; i < charDetail.netrunnerGear.length; i++ ) {
            netrunner_gear_master_array.push(netrunnerMaster[charDetail.netrunnerGear[i]].netrunner_master_id)
        }
        updatedCharDetail.netrunnerGear = netrunner_gear_master_array
        
        let cyberware_master_array = []
        for (let i = 0; i < charDetail.cyberware.length; i++ ) {
            cyberware_master_array.push(cyberware[charDetail.cyberware[i]].cyberware_master_id)
        }
        updatedCharDetail.cyberware = cyberware_master_array

        dispatch({ type: "SAVE_CREATION_CHARACTER", payload: updatedCharDetail })
        history.push('/characterlist')
    }

    return (<>
        <Box sx={{ flexGrow: 1 }}>
            <Grid container paddingLeft={3} paddingBottom={3} paddingRight={3}>
                <Grid item display={'flex'} justifyContent={'center'} xs={12}>
                    <h1>Review Character</h1>
                </Grid>
                <Grid item xs={12}>
                    <Item><Button fullWidth onClick={() => saveCharacter()}>Save Character</Button></Item>
                </Grid>
            </Grid>

            <Grid container spacing={1}>

                {charDetail ? (
                    <>
                        <Grid item xs={12}><Item>
                            <Button fullWidth
                                onClick={() => dispatch({ type: "SET_CREATION_STEP", payload: 'first_steps' })}>
                                Details - click to return to Character Details
                            </Button>
                        </Item>
                        </Grid>
                        <Grid item xs={4}>
                            <Item>Handle: {charDetail.handle}</Item>
                        </Grid>
                        <Grid item xs={4}>
                            <Item>Player: {charDetail.player}</Item>
                        </Grid>
                        <Grid item xs={4}>
                            <Item>Campaign: {charDetail.campaignName} </Item>
                        </Grid>

                        <Grid item xs={12}><Item>
                            <Button fullWidth
                                onClick={() => dispatch({ type: "SET_CREATION_STEP", payload: 'attributes' })}>
                                Atribute - click to return to Attribute selection
                            </Button>
                        </Item>
                        </Grid>

                        <Grid item xs={4}>
                            <Grid container>
                                <Grid item xs={4}><Item><AttributesDialog prop={'Strength'} /></Item></Grid>
                                <Grid item xs={8}><Item>{attDotReturn(strengthAtt)} </Item></Grid>

                                <Grid item xs={4}><Item><AttributesDialog prop={'Body'} /> </Item></Grid>
                                <Grid item xs={8}><Item>{attDotReturn(bodyAtt)}</Item></Grid>

                                <Grid item xs={4}><Item><AttributesDialog prop={'Reflexes'} /></Item></Grid>
                                <Grid item xs={8}><Item>{attDotReturn(reflexesAtt)}</Item></Grid>

                                <Grid item xs={4}><Item><AttributesDialog prop={'Move'} /></Item></Grid>
                                <Grid item xs={8}><Item>{attDotReturn(moveatt)}</Item></Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={4}>
                            <Grid container>
                                <Grid item xs={4}><Item><AttributesDialog prop={'Appearance'} /></Item></Grid>
                                <Grid item xs={8}><Item> {attDotReturn(appearanceAtt)} </Item></Grid>

                                <Grid item xs={4}><Item><AttributesDialog prop={'Cool'} /></Item></Grid>
                                <Grid item xs={8}><Item> {attDotReturn(coolAtt)} </Item></Grid>

                                <Grid item xs={4}><Item><AttributesDialog prop={'Street Cred'} /></Item></Grid>
                                <Grid item xs={8}><Item> {attDotReturn(streetCredAtt)} </Item></Grid>

                            </Grid>
                        </Grid>

                        <Grid item xs={4}>
                            <Grid container>
                                <Grid item xs={4}><Item><AttributesDialog prop={'Intelligence'} /></Item></Grid>
                                <Grid item xs={8}><Item> {attDotReturn(intelligenceAtt)} </Item></Grid>

                                <Grid item xs={4}><Item><AttributesDialog prop={'Willpower'} /></Item></Grid>
                                <Grid item xs={8}><Item> {attDotReturn(willpowerAtt)} </Item></Grid>

                                <Grid item xs={4}><Item><AttributesDialog prop={'Technique'} /></Item></Grid>
                                <Grid item xs={8}><Item> {attDotReturn(techniqueAtt)} </Item></Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={12}>
                            <Item>
                                <Button fullWidth
                                    onClick={() => dispatch({ type: "SET_CREATION_STEP", payload: 'skills' })}>
                                    Skills - click to return to Skill selection
                                </Button>
                            </Item>
                        </Grid>

                        <Grid item xs={4}>
                            <Grid container>
                                <Grid item xs={12}><Item><SkillsDialog prop={'Streets'} /></Item></Grid>

                                <Grid item xs={4}><Item><SkillsDialog prop={'Athletics'} /></Item></Grid>
                                <Grid item xs={8}><Item>{skillDotReturn(athletics)}</Item></Grid>

                                <Grid item xs={4}><Item><SkillsDialog prop={'Brawling'} /></Item></Grid>
                                <Grid item xs={8}><Item>{skillDotReturn(brawling)}</Item></Grid>

                                <Grid item xs={4}><Item><SkillsDialog prop={'Concentration'} /></Item></Grid>
                                <Grid item xs={8}><Item>{skillDotReturn(concentration)}</Item></Grid>

                                <Grid item xs={4}><Item><SkillsDialog prop={'Evasion'} /></Item></Grid>
                                <Grid item xs={8}><Item>{skillDotReturn(evasion)}</Item></Grid>

                                <Grid item xs={4}><Item><SkillsDialog prop={'Fast Talk'} /></Item></Grid>
                                <Grid item xs={8}><Item>{skillDotReturn(fastTalk)}</Item></Grid>

                                <Grid item xs={4}><Item><SkillsDialog prop={'Firearms'} /></Item></Grid>
                                <Grid item xs={8}><Item>{skillDotReturn(firearms)}</Item></Grid>

                                <Grid item xs={4}><Item><SkillsDialog prop={'Legerdemain'} /></Item></Grid>
                                <Grid item xs={8}><Item>{skillDotReturn(legerdemain)}</Item></Grid>

                                <Grid item xs={4}><Item><SkillsDialog prop={'Melee Weapons'} /></Item></Grid>
                                <Grid item xs={8}><Item>{skillDotReturn(meleeWeapons)}</Item></Grid>

                                <Grid item xs={4}><Item><SkillsDialog prop={'Perception'} /></Item></Grid>
                                <Grid item xs={8}><Item>{skillDotReturn(perception)}</Item></Grid>

                                <Grid item xs={4}><Item><SkillsDialog prop={'Streetwise'} /></Item></Grid>
                                <Grid item xs={8}><Item>{skillDotReturn(streetwise)}</Item></Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={4}>
                            <Grid container>
                                <Grid item xs={12}><Item><SkillsDialog prop={'Tekhne'} /></Item></Grid>

                                <Grid item xs={4}><Item><SkillsDialog prop={'Demolitions'} /></Item></Grid>
                                <Grid item xs={8}><Item>{skillDotReturn(demolitions)}</Item></Grid>

                                <Grid item xs={4}><Item><SkillsDialog prop={'Drive Land'} /></Item></Grid>
                                <Grid item xs={8}><Item>{skillDotReturn(driveLand)}</Item></Grid>

                                <Grid item xs={4}><Item><SkillsDialog prop={'Drive Exotic'} /></Item></Grid>
                                <Grid item xs={8}><Item>{skillDotReturn(driveExotic)}</Item></Grid>

                                <Grid item xs={4}><Item><SkillsDialog prop={'Etiquette'} /></Item></Grid>
                                <Grid item xs={8}><Item>{skillDotReturn(etiquette)}</Item></Grid>

                                <Grid item xs={4}><Item><SkillsDialog prop={'Exotic Weapons'} /></Item></Grid>
                                <Grid item xs={8}><Item>{skillDotReturn(exoticWeapons)}</Item></Grid>

                                <Grid item xs={4}><Item><SkillsDialog prop={'Heavy Weapons'} /></Item></Grid>
                                <Grid item xs={8}><Item>{skillDotReturn(heavyWeapons)}</Item></Grid>

                                <Grid item xs={4}><Item><SkillsDialog prop={'Performance'} /></Item></Grid>
                                <Grid item xs={8}><Item>{skillDotReturn(performance)}</Item></Grid>

                                <Grid item xs={4}><Item><SkillsDialog prop={'Stealth'} /></Item></Grid>
                                <Grid item xs={8}><Item>{skillDotReturn(stealth)}</Item></Grid>

                                <Grid item xs={4}><Item><SkillsDialog prop={'Survival'} /></Item></Grid>
                                <Grid item xs={8}><Item>{skillDotReturn(survival)}</Item></Grid>

                                <Grid item xs={4}><Item><SkillsDialog prop={'Tracking'} /></Item></Grid>
                                <Grid item xs={8}><Item>{skillDotReturn(tracking)}</Item></Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={4}>
                            <Grid container>
                                <Grid item xs={12}><Item><SkillsDialog prop={'Knowledge'} /></Item></Grid>

                                <Grid item xs={4}><Item><SkillsDialog prop={'Business'} /></Item></Grid>
                                <Grid item xs={8}><Item>{skillDotReturn(business)}</Item></Grid>

                                <Grid item xs={4}><Item><SkillsDialog prop={'Cryptography'} /></Item></Grid>
                                <Grid item xs={8}><Item>{skillDotReturn(cryptography)}</Item></Grid>

                                <Grid item xs={4}><Item><SkillsDialog prop={'Cyber Tech'} /></Item></Grid>
                                <Grid item xs={8}><Item>{skillDotReturn(cyberTech)}</Item></Grid>

                                <Grid item xs={4}><Item><SkillsDialog prop={'Investigation'} /></Item></Grid>
                                <Grid item xs={8}><Item>{skillDotReturn(investigation)}</Item></Grid>

                                {isParamedical === true ? (<>
                                    <Grid item xs={4}><Item><SkillsDialog prop={'Paramedic'} /></Item></Grid>
                                    <Grid item xs={8}><Item>{skillDotReturn(paramedic)}</Item></Grid>
                                </>) : (<>
                                    <Grid item xs={4}><Item><SkillsDialog prop={'First Aid'} /></Item></Grid>
                                    <Grid item xs={8}><Item>{skillDotReturn(firstAid)}</Item></Grid>
                                </>)}

                                <Grid item xs={4}><Item><SkillsDialog prop={'Gambling'} /></Item></Grid>
                                <Grid item xs={8}><Item>{skillDotReturn(gambling)}</Item></Grid>

                                <Grid item xs={4}><Item><SkillsDialog prop={'Language'} /></Item></Grid>
                                <Grid item xs={8}><Item>{skillDotReturn(language)}</Item></Grid>

                                <Grid item xs={4}><Item><SkillsDialog prop={'Military Tech'} /></Item></Grid>
                                <Grid item xs={8}><Item>{skillDotReturn(militaryTech)}</Item></Grid>

                                <Grid item xs={4}><Item><SkillsDialog prop={'Science'} /></Item></Grid>
                                <Grid item xs={8}><Item>{skillDotReturn(science)}</Item></Grid>

                                <Grid item xs={4}><Item><SkillsDialog prop={'Vehicle Tech'} /></Item></Grid>
                                <Grid item xs={8}><Item>{skillDotReturn(vehicleTech)}</Item></Grid>
                            </Grid>
                        </Grid>

                        <Grid container spacing={1} paddingTop={1} paddingBottom={1}>
                            <Grid item xs={12}>
                                <Item>
                                    <Button fullWidth
                                        onClick={() => dispatch({ type: "SET_CREATION_STEP", payload: 'role' })}>
                                        Role Abilities - click to return to Role selection</Button>
                                </Item>
                            </Grid>

                            {rockerboy != '' ? (<>
                                <Grid item xs={4.5}>
                                    <Item><RoleAbilitiesDialog prop={'Rockerboy'} /></Item>
                                </Grid>
                                <Grid item xs={7.5}>
                                    <Item>{attDotReturn(rockerboy)}</Item>
                                </Grid></>) : <></>}

                            {solo != '' ? (<>
                                <Grid item xs={4.5}>
                                    <Item><RoleAbilitiesDialog prop={'Solo'} /></Item>
                                </Grid>
                                <Grid item xs={7.5}>
                                    <Item>{attDotReturn(solo)}</Item>
                                </Grid></>) : <></>}

                            {netrunner != '' ? (<>
                                <Grid item xs={4.5}>
                                    <Item><RoleAbilitiesDialog prop={'Netrunner'} /></Item>
                                </Grid>
                                <Grid item xs={7.5}>
                                    <Item>{attDotReturn(netrunner)}</Item>
                                </Grid></>) : <></>}

                            {nomad != '' ? (<>
                                <Grid item xs={4.5}>
                                    <Item><RoleAbilitiesDialog prop={'Nomad'} /></Item>
                                </Grid>
                                <Grid item xs={7.5}>
                                    <Item>{attDotReturn(nomad)}</Item>
                                </Grid></>) : <></>}

                            {media != '' ? (<>
                                <Grid item xs={4.5}>
                                    <Item><RoleAbilitiesDialog prop={'Media'} /></Item>
                                </Grid>
                                <Grid item xs={7.5}>
                                    <Item>{attDotReturn(media)}</Item>
                                </Grid></>) : <></>}

                            {medtech != '' ? (<>
                                <Grid item xs={4.5}>
                                    <Item><RoleAbilitiesDialog prop={'Medtech'} /></Item>
                                </Grid>
                                <Grid item xs={7.5}>
                                    <Item>{skillDotReturn(medtech)}</Item>
                                </Grid>

                                <Grid item xs={4.5}>
                                    <Item><RoleAbilitiesDialog prop={'Surgery'} /></Item>
                                </Grid>
                                <Grid item xs={7.5}>
                                    <Item>{skillDotReturn(medSurgery)}</Item>
                                </Grid>

                                <Grid item xs={4.5}>
                                    <Item><RoleAbilitiesDialog prop={'Pharmaceuticals'} /></Item>
                                </Grid>
                                <Grid item xs={7.5}>
                                    <Item>{skillDotReturn(medPharma)}</Item>
                                </Grid>

                                <Grid item xs={4.5}>
                                    <Item><RoleAbilitiesDialog prop={'Cryogenics'} /></Item>
                                </Grid>
                                <Grid item xs={7.5}>
                                    <Item>{skillDotReturn(medCryo)}</Item>
                                </Grid>
                            </>) : <></>}

                            {maker != '' ? (<><Grid item xs={4.5}>
                                <Item><RoleAbilitiesDialog prop={'Maker'} /></Item>
                            </Grid>
                                <Grid item xs={7.5}>
                                    <Item>{attDotReturn(maker)}</Item>
                                </Grid>
                                <Grid item xs={4.5}>
                                    <Item><RoleAbilitiesDialog prop={'Field Expertise'} /></Item>
                                </Grid>
                                <Grid item xs={7.5}>
                                    <Item>{attDotReturn(makerField)}</Item>
                                </Grid>
                                <Grid item xs={4.5}>
                                    <Item><RoleAbilitiesDialog prop={'Upgrade Expertise'} /></Item>
                                </Grid>
                                <Grid item xs={7.5}>
                                    <Item>{attDotReturn(makerUpgrade)}</Item>
                                </Grid>
                                <Grid item xs={4.5}>
                                    <Item><RoleAbilitiesDialog prop={'Fabrication'} /></Item>
                                </Grid>
                                <Grid item xs={7.5}>
                                    <Item>{attDotReturn(makerFab)}</Item>
                                </Grid>
                                <Grid item xs={4.5}>
                                    <Item><RoleAbilitiesDialog prop={'Invention'} /></Item>
                                </Grid>
                                <Grid item xs={7.5}>
                                    <Item>{attDotReturn(makerInvent)}</Item>
                                </Grid>
                            </>) : <></>}
                        </Grid>

                        <Grid container spacing={1} padding={2}>

                            <Grid item display={'flex'} justifyContent={'center'} xs={12}>
                                <Button onClick={() => dispatch({ type: "SET_CREATION_STEP", payload: 'gear' })}>Return to Gear Selection</Button>
                            </Grid>
                            <Grid item display={'flex'} justifyContent={'center'} xs={12}>Armor</Grid>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                                    <TableHead>
                                        <TableRow hover>
                                            <TableCell align="left">Name</TableCell>
                                            <TableCell align="left">Quality</TableCell>
                                            <TableCell align="left">Description</TableCell>
                                            <TableCell align="center">Price</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {charDetail.armor.map((item, i) => (
                                            <TableRow hover key={i}>
                                                <TableCell align="left">{armor[item].name} </TableCell>
                                                <TableCell align="left">{armor[item].quality}</TableCell>
                                                <TableCell align="left">{armor[item].description}</TableCell>
                                                <TableCell align="center">{armor[item].price}$</TableCell>
                                            </TableRow>
                                        ))}
                                        {charDetail.shield.map((item, i) => (
                                            <TableRow hover key={i}>
                                                <TableCell align="left">{shield[item].name} </TableCell>
                                                <TableCell align="left">{shield[item].quality}</TableCell>
                                                <TableCell align="left">{shield[item].description}</TableCell>
                                                <TableCell align="center">{shield[item].price}$</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>

                        <Grid container spacing={1} padding={2}>
                            <Grid item display={'flex'} justifyContent={'center'} xs={12}>Weapons</Grid>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                                    <TableHead>
                                        <TableRow hover>
                                            <TableCell align="left">Name</TableCell>
                                            <TableCell align="center">Damage</TableCell>
                                            <TableCell align="center">Range</TableCell>
                                            <TableCell align="center">Rate of Fire</TableCell>
                                            <TableCell align="center">Max Clip</TableCell>
                                            <TableCell align="center"># of Hands</TableCell>
                                            <TableCell align="center">Concealable?</TableCell>
                                            <TableCell align="center">Price</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {charDetail.weapons.map((item, i) => (
                                            <TableRow hover key={i}>
                                                <TableCell align="left">{weapons[item].name}</TableCell>
                                                <TableCell align="center">{weapons[item].dmg_type === 'melee' || weapons[item].dmg_type === 'bow' ? `Str + ${weapons[item].damage}` : `${weapons[item].damage}`}</TableCell>
                                                <TableCell align="center">{weapons[item].dmg_type === 'bow' ? `Str * ${weapons[item].range}` : `${weapons[item].range}`}</TableCell>
                                                <TableCell align="center">{weapons[item].rof}</TableCell>
                                                <TableCell align="center">{weapons[item].max_clip}</TableCell>
                                                <TableCell align="center">{weapons[item].hands}</TableCell>
                                                <TableCell align="center">{weapons[item].concealable ? 'Yes' : 'No'}</TableCell>
                                                <TableCell align="center">{weapons[item].price}$</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>

                        <Grid container spacing={1} padding={2}>
                            <Grid item display={'flex'} justifyContent={'center'} xs={12}>Misc Gear</Grid>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                                    <TableHead>
                                        <TableRow hover>
                                            <TableCell align="left">Name</TableCell>
                                            <TableCell align="left">Description</TableCell>
                                            <TableCell align="center">Price</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {charDetail.gear.map((item, i) => (
                                            <TableRow hover key={i}>
                                                <TableCell align="left">{miscGear[item].name} </TableCell>
                                                <TableCell align="left">{miscGear[item].description}</TableCell>
                                                <TableCell align="center">{miscGear[item].price}$</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>

                        { charDetail.netrunnerGear.length > 0 ? 
                        <>
                        <Grid container spacing={1} padding={2}>
                            <Grid item display={'flex'} justifyContent={'center'} xs={12}>Netrunner Gear</Grid>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                                    <TableHead>
                                        <TableRow hover>
                                            <TableCell align="left">Name</TableCell>
                                            <TableCell align="left">Description</TableCell>
                                            <TableCell align="center">Price</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {charDetail.netrunnerGear.map((item, i) => (
                                            <TableRow hover key={i}>
                                                <TableCell align="left">{netrunnerMaster[item].name}</TableCell>
                                                <TableCell align="left">{netrunnerMaster[item].description}</TableCell>
                                                <TableCell align="center">{netrunnerMaster[item].price}$</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                        </> : <></> }

                        <Grid container spacing={1} padding={2}>
                            <Grid item display={'flex'} justifyContent={'center'} xs={12}>
                                <Button onClick={() => dispatch({ type: "SET_CREATION_STEP", payload: 'cyberware' })}>Return to Cyberware</Button>
                            </Grid>

                            <Grid item display={'flex'} justifyContent={'center'} xs={12}>Cyberware</Grid>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                                    <TableHead>
                                        <TableRow hover>
                                            <TableCell align="left">Name</TableCell>
                                            <TableCell align="left">Description</TableCell>
                                            <TableCell align="left">Humanity Loss</TableCell>
                                            <TableCell align="left">Price</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {charDetail.cyberware.map((item, i) => (
                                            <TableRow hover key={i}>
                                                <TableCell align="left">{cyberware[item].name} </TableCell>
                                                <TableCell align="left">{cyberware[item].description}</TableCell>
                                                <TableCell align="left">{Math.floor(cyberware[item].humanity_loss_max / 2)}</TableCell>
                                                <TableCell align="right">{cyberware[item].price}$</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>

                    </>
                ) : <></>}

            </Grid>
        </Box >

    </>)
}