import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import { useHistory, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Item from '../Characters/CharacterSheet/Item';
import AttributesModal from '../Modals/AttributesModal';
import SkillsModal from '../Modals/SkillsModal';
import SpecialModal from '../Modals/SpecialModal';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';


export default function CreationReview() {

    const charDetail = useSelector(store => store.characterCreation)
    const armor = useSelector(store => store.armorMaster)
    const weapons = useSelector(store => store.weaponMaster)
    const miscGear = useSelector(store => store.miscGearMaster)
    const cyberware = useSelector(store => store.cyberwareMaster)

    const dispatch = useDispatch();

    const fulldot = ` \u2b24`
    const emptydot = ` \u25ef`

    // physical attributes
    const [strengthAtt, setStrengthAtt] = useState(charDetail.strength);
    const [bodyAtt, setBodyAtt] = useState(charDetail.body);
    const [reflexesAtt, setReflexesAtt] = useState(charDetail.reflexes);
    const [moveatt, setMoveAtt] = useState(charDetail.move);

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
        let returnedDots = ''

        for (let i = 0; i < attribute; i++) {
            returnedDots += fulldot;
        }
        let j = attribute
        for (j; j <= 9; j++) {
            returnedDots += emptydot
        }
        return returnedDots
    }

    const skillDotReturn = (skill) => {
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

    const saveCharacter = () => {
        console.log(`Saving...`);
        dispatch({type: "SAVE_CREATION_CHARACTER", payload: charDetail})
    }

    return (<>
        <Box sx={{ flexGrow: 1 }}>
            <h1>Review Character</h1>
            <Button onClick={() => saveCharacter()}>Save Character</Button>

            <Grid container spacing={1}>

                {charDetail ? (
                    <>
                        <Grid item xs={12}><Item sx={{ cursor: 'pointer' }} onClick={() => dispatch({ type: "SET_CREATION_STEP", payload: 'first_steps' })}><h1>Details - click to return to Character Details</h1></Item></Grid>
                        <Grid item xs={4}>
                            <Item>Handle: {charDetail.handle}</Item>
                        </Grid>
                        <Grid item xs={4}>
                            <Item>Role: {charDetail.role}</Item>
                        </Grid>
                        <Grid item xs={4}>
                            <Item>Player: {charDetail.player}</Item>
                        </Grid>
                        <Grid item xs={4}>
                            <Item>Campaign: {charDetail.campaign} </Item>
                        </Grid>
                        <Grid item xs={4}>
                            <Item>Culture: {charDetail.culture}</Item>
                        </Grid>
                        <Grid item xs={4}>
                            <Item>Concept: {charDetail.concept}</Item>
                        </Grid>

                        <Grid item xs={12}><Item sx={{ cursor: 'pointer' }} onClick={() => dispatch({ type: "SET_CREATION_STEP", payload: 'attributes' })}><h1>Atribute - click to return to Attribute selection</h1></Item></Grid>
                        <Grid item xs={4}>
                            <Grid container>
                                <Grid item xs={4}><Item><AttributesModal prop={'Strength'} /></Item></Grid>
                                <Grid item xs={8}><Item>{attDotReturn(strengthAtt)} </Item></Grid>

                                <Grid item xs={4}><Item><AttributesModal prop={'Body'} /> </Item></Grid>
                                <Grid item xs={8}><Item>{attDotReturn(bodyAtt)}</Item></Grid>

                                <Grid item xs={4}><Item><AttributesModal prop={'Reflexes'} /></Item></Grid>
                                <Grid item xs={8}><Item>{attDotReturn(reflexesAtt)}</Item></Grid>

                                <Grid item xs={4}><Item><AttributesModal prop={'Move'} /></Item></Grid>
                                <Grid item xs={8}><Item>{attDotReturn(moveatt)}</Item></Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={4}>
                            <Grid container>
                                <Grid item xs={4}><Item><AttributesModal prop={'Appearance'} /></Item></Grid>
                                <Grid item xs={8}><Item> {attDotReturn(appearanceAtt)} </Item></Grid>

                                <Grid item xs={4}><Item><AttributesModal prop={'Cool'} /></Item></Grid>
                                <Grid item xs={8}><Item> {attDotReturn(coolAtt)} </Item></Grid>

                                <Grid item xs={4}><Item><AttributesModal prop={'Street Cred'} /></Item></Grid>
                                <Grid item xs={8}><Item> {attDotReturn(streetCredAtt)} </Item></Grid>

                            </Grid>
                        </Grid>

                        <Grid item xs={4}>
                            <Grid container>
                                <Grid item xs={4}><Item><AttributesModal prop={'Intelligence'} /></Item></Grid>
                                <Grid item xs={8}><Item> {attDotReturn(intelligenceAtt)} </Item></Grid>

                                <Grid item xs={4}><Item><AttributesModal prop={'Willpower'} /></Item></Grid>
                                <Grid item xs={8}><Item> {attDotReturn(willpowerAtt)} </Item></Grid>

                                <Grid item xs={4}><Item><AttributesModal prop={'Technique'} /></Item></Grid>
                                <Grid item xs={8}><Item> {attDotReturn(techniqueAtt)} </Item></Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={12}><Item sx={{ cursor: 'pointer' }} onClick={() => dispatch({ type: "SET_CREATION_STEP", payload: 'skills' })}><h1>Skills - click to return to Skill selection</h1></Item></Grid>

                        <Grid item xs={4}>
                            <Grid container>
                                <Grid item xs={12}><Item><SkillsModal prop={'Streets'} /></Item></Grid>

                                <Grid item xs={4}><Item><SkillsModal prop={'Athletics'} /></Item></Grid>
                                <Grid item xs={8}><Item>{skillDotReturn(athletics)}</Item></Grid>

                                <Grid item xs={4}><Item><SkillsModal prop={'Brawling'} /></Item></Grid>
                                <Grid item xs={8}><Item>{skillDotReturn(brawling)}</Item></Grid>

                                <Grid item xs={4}><Item><SkillsModal prop={'Concentration'} /></Item></Grid>
                                <Grid item xs={8}><Item>{skillDotReturn(concentration)}</Item></Grid>

                                <Grid item xs={4}><Item><SkillsModal prop={'Evasion'} /></Item></Grid>
                                <Grid item xs={8}><Item>{skillDotReturn(evasion)}</Item></Grid>

                                <Grid item xs={4}><Item><SkillsModal prop={'Fast Talk'} /></Item></Grid>
                                <Grid item xs={8}><Item>{skillDotReturn(fastTalk)}</Item></Grid>

                                <Grid item xs={4}><Item><SkillsModal prop={'Firearms'} /></Item></Grid>
                                <Grid item xs={8}><Item>{skillDotReturn(firearms)}</Item></Grid>

                                <Grid item xs={4}><Item><SkillsModal prop={'Legerdemain'} /></Item></Grid>
                                <Grid item xs={8}><Item>{skillDotReturn(legerdemain)}</Item></Grid>

                                <Grid item xs={4}><Item><SkillsModal prop={'Melee Weapons'} /></Item></Grid>
                                <Grid item xs={8}><Item>{skillDotReturn(meleeWeapons)}</Item></Grid>

                                <Grid item xs={4}><Item><SkillsModal prop={'Perception'} /></Item></Grid>
                                <Grid item xs={8}><Item>{skillDotReturn(perception)}</Item></Grid>

                                <Grid item xs={4}><Item><SkillsModal prop={'Streetwise'} /></Item></Grid>
                                <Grid item xs={8}><Item>{skillDotReturn(streetwise)}</Item></Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={4}>
                            <Grid container>
                                <Grid item xs={12}><Item><SkillsModal prop={'Tekhne'} /></Item></Grid>

                                <Grid item xs={4}><Item><SkillsModal prop={'Demolitions'} /></Item></Grid>
                                <Grid item xs={8}><Item>{skillDotReturn(demolitions)}</Item></Grid>

                                <Grid item xs={4}><Item><SkillsModal prop={'Drive Land'} /></Item></Grid>
                                <Grid item xs={8}><Item>{skillDotReturn(driveLand)}</Item></Grid>

                                <Grid item xs={4}><Item><SkillsModal prop={'Drive Exotic'} /></Item></Grid>
                                <Grid item xs={8}><Item>{skillDotReturn(driveExotic)}</Item></Grid>

                                <Grid item xs={4}><Item><SkillsModal prop={'Etiquette'} /></Item></Grid>
                                <Grid item xs={8}><Item>{skillDotReturn(etiquette)}</Item></Grid>

                                <Grid item xs={4}><Item><SkillsModal prop={'Exotic Weapons'} /></Item></Grid>
                                <Grid item xs={8}><Item>{skillDotReturn(exoticWeapons)}</Item></Grid>

                                <Grid item xs={4}><Item><SkillsModal prop={'Heavy Weapons'} /></Item></Grid>
                                <Grid item xs={8}><Item>{skillDotReturn(heavyWeapons)}</Item></Grid>

                                <Grid item xs={4}><Item><SkillsModal prop={'Performance'} /></Item></Grid>
                                <Grid item xs={8}><Item>{skillDotReturn(performance)}</Item></Grid>

                                <Grid item xs={4}><Item><SkillsModal prop={'Stealth'} /></Item></Grid>
                                <Grid item xs={8}><Item>{skillDotReturn(stealth)}</Item></Grid>

                                <Grid item xs={4}><Item><SkillsModal prop={'Survival'} /></Item></Grid>
                                <Grid item xs={8}><Item>{skillDotReturn(survival)}</Item></Grid>

                                <Grid item xs={4}><Item><SkillsModal prop={'Tracking'} /></Item></Grid>
                                <Grid item xs={8}><Item>{skillDotReturn(tracking)}</Item></Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={4}>
                            <Grid container>
                                <Grid item xs={12}><Item><SkillsModal prop={'Knowledge'} /></Item></Grid>

                                <Grid item xs={4}><Item><SkillsModal prop={'Business'} /></Item></Grid>
                                <Grid item xs={8}><Item>{skillDotReturn(business)}</Item></Grid>

                                <Grid item xs={4}><Item><SkillsModal prop={'Cryptography'} /></Item></Grid>
                                <Grid item xs={8}><Item>{skillDotReturn(cryptography)}</Item></Grid>

                                <Grid item xs={4}><Item><SkillsModal prop={'Cyber Tech'} /></Item></Grid>
                                <Grid item xs={8}><Item>{skillDotReturn(cyberTech)}</Item></Grid>

                                <Grid item xs={4}><Item><SkillsModal prop={'Investigation'} /></Item></Grid>
                                <Grid item xs={8}><Item>{skillDotReturn(investigation)}</Item></Grid>

                                {isParamedical === true ? (<>
                                    <Grid item xs={4}><Item><SkillsModal prop={'Paramedic'} /></Item></Grid>
                                    <Grid item xs={8}><Item>{skillDotReturn(paramedic)}</Item></Grid>
                                </>) : (<>
                                    <Grid item xs={4}><Item><SkillsModal prop={'First Aid'} /></Item></Grid>
                                    <Grid item xs={8}><Item>{skillDotReturn(firstAid)}</Item></Grid>
                                </>)}

                                <Grid item xs={4}><Item><SkillsModal prop={'Gambling'} /></Item></Grid>
                                <Grid item xs={8}><Item>{skillDotReturn(gambling)}</Item></Grid>

                                <Grid item xs={4}><Item><SkillsModal prop={'Language'} /></Item></Grid>
                                <Grid item xs={8}><Item>{skillDotReturn(language)}</Item></Grid>

                                <Grid item xs={4}><Item><SkillsModal prop={'Military Tech'} /></Item></Grid>
                                <Grid item xs={8}><Item>{skillDotReturn(militaryTech)}</Item></Grid>

                                <Grid item xs={4}><Item><SkillsModal prop={'Science'} /></Item></Grid>
                                <Grid item xs={8}><Item>{skillDotReturn(science)}</Item></Grid>

                                <Grid item xs={4}><Item><SkillsModal prop={'Vehicle Tech'} /></Item></Grid>
                                <Grid item xs={8}><Item>{skillDotReturn(vehicleTech)}</Item></Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={12}><Item sx={{ cursor: 'pointer' }} onClick={() => dispatch({ type: "SET_CREATION_STEP", payload: 'role' })}><h1>Role Abilities - click to return to Role selection</h1></Item></Grid>
                        
                            <Grid container spacing={1}>
                                {rockerboy != '' ? (<>
                                    <Grid item xs={4.5}>
                                        <Item><SpecialModal prop={'Rockerboy'} /></Item>
                                    </Grid>
                                    <Grid item xs={7.5}>
                                        <Item>{attDotReturn(rockerboy)}</Item>
                                    </Grid></>) : <></>}

                                {solo != '' ? (<>
                                    <Grid item xs={4.5}>
                                        <Item><SpecialModal prop={'Solo'} /></Item>
                                    </Grid>
                                    <Grid item xs={7.5}>
                                        <Item>{attDotReturn(solo)}</Item>
                                    </Grid></>) : <></>}

                                {netrunner != '' ? (<>
                                    <Grid item xs={4.5}>
                                        <Item><SpecialModal prop={'Netrunner'} /></Item>
                                    </Grid>
                                    <Grid item xs={7.5}>
                                        <Item>{attDotReturn(netrunner)}</Item>
                                    </Grid></>) : <></>}

                                {nomad != '' ? (<>
                                    <Grid item xs={4.5}>
                                        <Item><SpecialModal prop={'Nomad'} /></Item>
                                    </Grid>
                                    <Grid item xs={7.5}>
                                        <Item>{attDotReturn(nomad)}</Item>
                                    </Grid></>) : <></>}

                                {media != '' ? (<>
                                    <Grid item xs={4.5}>
                                        <Item><SpecialModal prop={'Media'} /></Item>
                                    </Grid>
                                    <Grid item xs={7.5}>
                                        <Item>{attDotReturn(media)}</Item>
                                    </Grid></>) : <></>}

                                {medtech != '' ? (<>
                                    <Grid item xs={4.5}>
                                        <Item><SpecialModal prop={'Medtech'} /></Item>
                                    </Grid>
                                    <Grid item xs={7.5}>
                                        <Item>{skillDotReturn(medtech)}</Item>
                                    </Grid>

                                    <Grid item xs={4.5}>
                                        <Item><SpecialModal prop={'Surgery'} /></Item>
                                    </Grid>
                                    <Grid item xs={7.5}>
                                        <Item>{skillDotReturn(medSurgery)}</Item>
                                    </Grid>

                                    <Grid item xs={4.5}>
                                        <Item><SpecialModal prop={'Pharmaceuticals'} /></Item>
                                    </Grid>
                                    <Grid item xs={7.5}>
                                        <Item>{skillDotReturn(medPharma)}</Item>
                                    </Grid>

                                    <Grid item xs={4.5}>
                                        <Item><SpecialModal prop={'Cryogenics'} /></Item>
                                    </Grid>
                                    <Grid item xs={7.5}>
                                        <Item>{skillDotReturn(medCryo)}</Item>
                                    </Grid>
                                </>) : <></>}

                                {maker != '' ? (<><Grid item xs={4.5}>
                                    <Item><SpecialModal prop={'Maker'} /></Item>
                                </Grid>
                                    <Grid item xs={7.5}>
                                        <Item>{attDotReturn(maker)}</Item>
                                    </Grid>
                                    <Grid item xs={4.5}>
                                        <Item><SpecialModal prop={'Field Expertise'} /></Item>
                                    </Grid>
                                    <Grid item xs={7.5}>
                                        <Item>{attDotReturn(makerField)}</Item>
                                    </Grid>
                                    <Grid item xs={4.5}>
                                        <Item><SpecialModal prop={'Upgrade Expertise'} /></Item>
                                    </Grid>
                                    <Grid item xs={7.5}>
                                        <Item>{attDotReturn(makerUpgrade)}</Item>
                                    </Grid>
                                    <Grid item xs={4.5}>
                                        <Item><SpecialModal prop={'Fabrication'} /></Item>
                                    </Grid>
                                    <Grid item xs={7.5}>
                                        <Item>{attDotReturn(makerFab)}</Item>
                                    </Grid>
                                    <Grid item xs={4.5}>
                                        <Item><SpecialModal prop={'Invention'} /></Item>
                                    </Grid>
                                    <Grid item xs={7.5}>
                                        <Item>{attDotReturn(makerInvent)}</Item>
                                    </Grid>
                                </>) : <></>}
                        </Grid>

                        <TableContainer component={Paper}>

                            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell><b>Armor</b></TableCell>
                                        <TableCell><Button onClick={() => dispatch({ type: "SET_CREATION_STEP", payload: 'gear' })}>Return to Gear Selection</Button></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="left">Name</TableCell>
                                        <TableCell align="left">Quality</TableCell>
                                        <TableCell align="left">Description</TableCell>
                                        <TableCell align="left">Price</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {charDetail.armor.map((item, i) => (
                                        <TableRow key={i}>
                                            <TableCell align="left">{armor[item].name} </TableCell>
                                            <TableCell align="left">{armor[item].quality}</TableCell>
                                            <TableCell align="left">{armor[item].description}</TableCell>
                                            <TableCell align="right">{armor[item].price}$</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>

                            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell><b>Weapons</b></TableCell>
                                    </TableRow>
                                    <TableRow>
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
                                        <TableRow key={i}>
                                            <TableCell align="left">{weapons[item].name}</TableCell>
                                            <TableCell align="center">{weapons[item].dmg_type === 'melee' || weapons[item].dmg_type === 'bow' ? `Str + ${weapons[item].damage}` : `${weapons[item].damage}`}</TableCell>
                                            <TableCell align="center">{weapons[item].dmg_type === 'bow' ? `Str * ${weapons[item].range}` : `${weapons[item].range}`}</TableCell>
                                            <TableCell align="center">{weapons[item].rof}</TableCell>
                                            <TableCell align="center">{weapons[item].max_clip}</TableCell>
                                            <TableCell align="center">{weapons[item].hands}</TableCell>
                                            <TableCell align="center">{weapons[item].concealable ? 'Yes' : 'No'}</TableCell>
                                            <TableCell align="right">{weapons[item].price}$</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell><b>Misc Gear</b></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="left">Name</TableCell>
                                    <TableCell align="left">Description</TableCell>
                                    <TableCell align="left">Price</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {charDetail.gear.map((item, i) => (
                                    <TableRow key={i}>
                                        <TableCell align="left">{miscGear[item].name} </TableCell>
                                        <TableCell align="left">{miscGear[item].description}</TableCell>
                                        <TableCell align="right">{miscGear[item].price}$</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell><b>Cyberware</b></TableCell>
                                    <TableCell><Button onClick={() => dispatch({ type: "SET_CREATION_STEP", payload: 'cyberware' })}>Return to Cyberware</Button></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="left">Name</TableCell>
                                    <TableCell align="left">Description</TableCell>
                                    <TableCell align="left">Humanity Loss</TableCell>
                                    <TableCell align="left">Price</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {charDetail.cyberware.map((item, i) => (
                                    <TableRow key={i}>
                                        <TableCell align="left">{cyberware[item].name} </TableCell>
                                        <TableCell align="left">{cyberware[item].description}</TableCell>
                                        <TableCell align="left">{Math.floor(cyberware[item].humanity_loss_max / 2)}</TableCell>
                                        <TableCell align="right">{cyberware[item].price}$</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                    </>
                ) : <></>}

            </Grid>
        </Box>

    </>)
}