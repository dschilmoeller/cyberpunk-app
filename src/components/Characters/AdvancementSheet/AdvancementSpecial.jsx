import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Grid from '@mui/material/Grid';
import Item from '../CharacterSheet/Item';

import SpecialModal from '../../Modals/SpecialModal';

export default function AdvancementSpecial() {

    const dispatch = useDispatch();
    const advancementDetails = useSelector((store) => store.advancementDetail);

    const fulldot = ` \u2b24`
    const emptydot = ` \u25ef`

    const [availableMedSkillPoints, setAvailableMedSkillPoints] = useState(0)
    const [availableMakerSkillPoints, setAvailableMakerSkillPoints] = useState(0)

    const roleDotReturn = (role) => {
        let returnedDots = ''
        for (let i = 0; i < role; i++) {
            returnedDots += fulldot;
        }
        let j = role
        for (j; j < 10; j++) {
            returnedDots += emptydot
        }
        return returnedDots
    }

    const dotReturn = (role) => {
        let returnedDots = ''

        for (let i = 0; i < role; i++) {
            returnedDots += fulldot;
        }
        let j = role
        for (j; j <= 4; j++) {
            returnedDots += emptydot
        }
        return returnedDots
    }

    const roleExpReturn = (role) => {
        if (role < 1) {
            return `15 XP`
        } else {
            let newCost = (role + 1) * 5
            return `${newCost} XP`
        }
    }

    const roleSpendExp = (roleScore, roleName) => {
        const availableExp = advancementDetails.max_xp - advancementDetails.spent_xp
        roleScore = Number(roleScore)
        let increaseRoleCost = (roleScore + 1) * 5

        if (increaseRoleCost <= availableExp) {
            dispatch({ type: 'INCREASE_ROLE', payload: { roleScore: roleScore, roleName: roleName, increaseRoleCost: increaseRoleCost } })
            if (roleName === 'medtech'){
                setAvailableMedSkillPoints(availableMedSkillPoints + 1)
                dispatch({ type: 'SET_PARAMEDICAL_TRUE'})
            }
            if (roleName === 'maker'){
                setAvailableMakerSkillPoints(availableMakerSkillPoints + 2)
            }
        } else {
            alert('Insufficient XP')
        }
    }

    const increaseRoleSkill = (currentSkillRank, skillName) => {
        dispatch({ type: 'INCREASE_ROLE_SKILL', payload: { skillName, currentSkillRank } })
        if (skillName === 'med_surgery' || skillName === 'med_pharma' || skillName === 'med_cryo'){
            setAvailableMedSkillPoints(availableMedSkillPoints - 1)
        }
        if (skillName === 'maker_field' || skillName === 'maker_upgrade' || skillName === 'maker_fab' || skillName === 'maker_invent'){
            setAvailableMakerSkillPoints(availableMakerSkillPoints -1)
        }
    }


    return (<>
        <h1>Role Abilities</h1>
        <Grid container>
            <Grid item xs={3}>
                <Item><SpecialModal prop={'Rockerboy'} /></Item>
            </Grid>
            <Grid item xs={6}>
                <Item>{roleDotReturn(advancementDetails.rockerboy)}</Item>
            </Grid>
            <Grid item xs={3}>{advancementDetails.rockerboy < 10 ? <Item sx={{ cursor: 'pointer' }} onClick={() => roleSpendExp(advancementDetails.rockerboy, 'rockerboy')}>Increase: {roleExpReturn(advancementDetails.rockerboy)}</Item> : <Item>Maxed</Item>}</Grid>

            <Grid item xs={3}>
                <Item><SpecialModal prop={'Solo'} /></Item>
            </Grid>
            <Grid item xs={6}>
                <Item>{roleDotReturn(advancementDetails.solo)}</Item>
            </Grid>
            <Grid item xs={3}>{advancementDetails.solo < 10 ? <Item sx={{ cursor: 'pointer' }} onClick={() => roleSpendExp(advancementDetails.solo, 'solo')}>Increase: {roleExpReturn(advancementDetails.solo)}</Item> : <Item>Maxed</Item>}</Grid>


            <Grid item xs={3}>
                <Item><SpecialModal prop={'Netrunner'} /></Item>
            </Grid>
            <Grid item xs={6}>
                <Item>{roleDotReturn(advancementDetails.netrunner)}</Item>
            </Grid>
            <Grid item xs={3}>{advancementDetails.netrunner < 10 ? <Item sx={{ cursor: 'pointer' }} onClick={() => roleSpendExp(advancementDetails.netrunner, 'netrunner')}>Increase: {roleExpReturn(advancementDetails.netrunner)}</Item> : <Item>Maxed</Item>}</Grid>


            <Grid item xs={3}>
                <Item><SpecialModal prop={'Nomad'} /></Item>
            </Grid>
            <Grid item xs={6}>
                <Item>{roleDotReturn(advancementDetails.nomad)}</Item>
            </Grid>
            <Grid item xs={3}>{advancementDetails.nomad < 10 ? <Item sx={{ cursor: 'pointer' }} onClick={() => roleSpendExp(advancementDetails.nomad, 'nomad')}>Increase: {roleExpReturn(advancementDetails.nomad)}</Item> : <Item>Maxed</Item>}</Grid>

            <Grid item xs={3}>
                <Item><SpecialModal prop={'Media'} /></Item>
            </Grid>
            <Grid item xs={6}>
                <Item>{roleDotReturn(advancementDetails.media)}</Item>
            </Grid>
            <Grid item xs={3}>{advancementDetails.media < 10 ? <Item sx={{ cursor: 'pointer' }} onClick={() => roleSpendExp(advancementDetails.media, 'media')}>Increase: {roleExpReturn(advancementDetails.media)}</Item> : <Item>Maxed</Item>}</Grid>

            <Grid item xs={3}>
                <Item><SpecialModal prop={'Medtech'} /></Item>
            </Grid>
            <Grid item xs={6}>
                <Item sx={{ backgroundColor: 'lightblue' }}>{roleDotReturn(advancementDetails.medtech)}</Item>
            </Grid>
            <Grid item xs={3}>{advancementDetails.medtech < 10 ? <Item sx={{ cursor: 'pointer' }} onClick={() => roleSpendExp(advancementDetails.medtech, 'medtech')}>Increase: {roleExpReturn(advancementDetails.medtech)}</Item> : <Item>Maxed</Item>}</Grid>

            <Grid item xs={3}>
                <Item><SpecialModal prop={'Surgery'} /></Item>
            </Grid>
            <Grid item xs={6}>
                <Item sx={{ backgroundColor: 'lightblue' }}>{dotReturn(advancementDetails.med_surgery)}</Item>
            </Grid>
            <Grid item xs={3}>{availableMedSkillPoints > 0 && advancementDetails.med_surgery < 5 ? <Item sx={{ cursor: 'pointer' }} onClick={() => increaseRoleSkill(advancementDetails.med_surgery, 'med_surgery')}>Spend Role Points</Item> : <Item>No Points to Spend</Item>}</Grid>

            <Grid item xs={3}>
                <Item><SpecialModal prop={'Pharmaceuticals'} /></Item>
            </Grid>
            <Grid item xs={6}>
                <Item sx={{ backgroundColor: 'lightblue' }}>{dotReturn(advancementDetails.med_pharma)}</Item>
            </Grid>
            <Grid item xs={3}>{availableMedSkillPoints > 0 && advancementDetails.med_pharma < 5 ? <Item sx={{ cursor: 'pointer' }} onClick={() => increaseRoleSkill(advancementDetails.med_pharma, 'med_pharma')}>Spend Role Points</Item> : <Item>No Points to Spend</Item>}</Grid>

            <Grid item xs={3}>
                <Item><SpecialModal prop={'Cryogenics'} /></Item>
            </Grid>
            <Grid item xs={6}>
                <Item sx={{ backgroundColor: 'lightblue' }}>{dotReturn(advancementDetails.med_cryo)}</Item>
            </Grid>
            <Grid item xs={3}>{availableMedSkillPoints > 0 && advancementDetails.med_cryo < 5 ? <Item sx={{ cursor: 'pointer' }} onClick={() => increaseRoleSkill(advancementDetails.med_cryo, 'med_cryo')}>Spend Role Points</Item> : <Item>No Points to Spend</Item>}</Grid>

            <Grid item xs={3}>
                <Item><SpecialModal prop={'Maker'} /></Item>
            </Grid>
            <Grid item xs={6}>
                <Item sx={{ backgroundColor: 'palegreen' }}>{roleDotReturn(advancementDetails.maker)}</Item>
            </Grid>
            <Grid item xs={3}>{advancementDetails.maker < 10 ? <Item sx={{ cursor: 'pointer' }} onClick={() => roleSpendExp(advancementDetails.maker, 'maker')}>Increase: {roleExpReturn(advancementDetails.maker)}</Item> : <Item>Maxed</Item>}</Grid>

            <Grid item xs={3}>
                <Item><SpecialModal prop={'Field Expertise'} /></Item>
            </Grid>
            <Grid item xs={6}>
                <Item sx={{ backgroundColor: 'palegreen' }}>{roleDotReturn(advancementDetails.maker_field)}</Item>
            </Grid>
            <Grid item xs={3}>{availableMakerSkillPoints > 0 && advancementDetails.maker_field < 10 ? <Item sx={{ cursor: 'pointer' }} onClick={() => increaseRoleSkill(advancementDetails.maker_field, 'maker_field')}>Spend Role Points</Item> :<Item>No Points to Spend</Item>}</Grid>

            <Grid item xs={3}>
                <Item><SpecialModal prop={'Upgrade Expertise'} /></Item>
            </Grid>
            <Grid item xs={6}>
                <Item sx={{ backgroundColor: 'palegreen' }}>{roleDotReturn(advancementDetails.maker_upgrade)}</Item>
            </Grid>
            <Grid item xs={3}>{availableMakerSkillPoints > 0 && advancementDetails.maker_upgrade < 10 ? <Item sx={{ cursor: 'pointer' }} onClick={() => increaseRoleSkill(advancementDetails.maker_upgrade, 'maker_upgrade')}>Spend Role Points</Item> : <Item>No Points to Spend</Item>}</Grid>

            <Grid item xs={3}>
                <Item><SpecialModal prop={'Fabrication'} /></Item>
            </Grid>
            <Grid item xs={6}>
                <Item sx={{ backgroundColor: 'palegreen' }}>{roleDotReturn(advancementDetails.maker_fab)}</Item>
            </Grid>
            <Grid item xs={3}>{availableMakerSkillPoints > 0 && advancementDetails.maker_fab < 10 ? <Item sx={{ cursor: 'pointer' }} onClick={() => increaseRoleSkill(advancementDetails.maker_fab, 'maker_fab')}>Spend Role Points</Item> : <Item>No Points to Spend</Item>}</Grid>

            <Grid item xs={3}>
                <Item><SpecialModal prop={'Invention'} /></Item>
            </Grid>
            <Grid item xs={6}>
                <Item sx={{ backgroundColor: 'palegreen' }}>{roleDotReturn(advancementDetails.maker_invent)}</Item>
            </Grid>
            <Grid item xs={3}>{availableMakerSkillPoints > 0 && advancementDetails.maker_invent < 10 ? <Item sx={{ cursor: 'pointer' }} onClick={() => increaseRoleSkill(advancementDetails.maker_invent, 'maker_invent')}>Spend Role Points</Item> : <Item>No Points to Spend</Item>}</Grid>
        </Grid>
    </>)
}