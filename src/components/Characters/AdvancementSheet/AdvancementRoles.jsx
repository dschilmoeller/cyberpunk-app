import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Grid from '@mui/material/Grid';
import Item from '../CharacterSheet/Item';

import RoleAbilitiesDialog from '../../Modals/RoleAbilitiesDialog';

import CircleIcon from '@mui/icons-material/Circle';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';

function TransitionUp(props) {
    return <Slide {...props} direction="up" />;
}

export default function AdvancementRoles() {

    const dispatch = useDispatch();
    const advancementDetails = useSelector((store) => store.advancementDetail);
    const loadStatus = useSelector(store => store.loaders.advancementSheet);

    const fullCircle = <CircleIcon />
    const emptyCircle = <CircleOutlinedIcon />

    const [showSnackbar, setShowSnackbar] = React.useState(false);
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const roleDotReturn = (role) => {
        let returnedDots = []
        for (let i = 0; i < role; i++) {
            returnedDots.push(<React.Fragment key={i}>{fullCircle}</React.Fragment>)
        }
        let j = role
        for (j; j < 10; j++) {
            returnedDots.push(<React.Fragment key={j+10}>{emptyCircle}</React.Fragment>)
        }
        return returnedDots
    }

    const dotReturn = (role) => {
        let returnedDots = []

        for (let i = 0; i < role; i++) {
            returnedDots.push(<React.Fragment key={i}>{fullCircle}</React.Fragment>)
        }
        let j = role
        for (j; j <= 4; j++) {
            returnedDots.push(<React.Fragment key={j+10}>{emptyCircle}</React.Fragment>)
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
        let increaseRoleCost = 0
        if (roleScore === 0) {
            increaseRoleCost = 15
        } else {
            increaseRoleCost = (roleScore + 1) * 5
        }


        if (increaseRoleCost <= availableExp) {
            dispatch({ type: "SET_ADVANCEMENT_LOAD_STATUS", payload: true })
            dispatch({ type: 'ADVANCEMENT_CHANGE_STAT', payload: { statName: roleName, newValue: roleScore + 1, newSpentXP: advancementDetails.spent_xp + increaseRoleCost, charID: advancementDetails.id } })
        } else {
            setShowSnackbar(true)
        }
    }

    const increaseRoleSkill = (currentSkillRank, skillName) => {
        // if available points - 1 === 0 -> dispatch ADVANCEMENT_CHANGE_STAT
        // else dispatch change to reducer and continue (if gaining two ranks in one session)
        dispatch({ type: "SET_ADVANCEMENT_LOAD_STATUS", payload: true })
        dispatch({ type: 'ADVANCEMENT_CHANGE_STAT', payload: { statName: skillName, newValue: currentSkillRank + 1, newSpentXP: advancementDetails.spent_xp, charID: advancementDetails.id } })

    }


    return (<>

        <Snackbar
            TransitionComponent={TransitionUp}
            autoHideDuration={2000}
            open={showSnackbar}
            onClose={() => setShowSnackbar(false)}
            anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
        >
            <Alert onClose={() => setShowSnackbar(false)} severity="warning" sx={{ width: '100%' }}>
                Insufficient XP
            </Alert>
        </Snackbar>

        <h1>Role Abilities</h1>
        <Grid container spacing={1}>
            {loadStatus === false ? (
                <>
                    <Grid item xs={3}>
                        <Item><RoleAbilitiesDialog prop={'Rockerboy'} /></Item>
                    </Grid>
                    <Grid item xs={6}>
                        <Item>{roleDotReturn(advancementDetails.rockerboy)}</Item>
                    </Grid>
                    <Grid item xs={3}>{advancementDetails.rockerboy < 10 ? <Item sx={{
                        cursor: 'pointer', '&:hover': {
                            backgroundColor: '#fff',
                            color: '#000',
                        }
                    }} onClick={() => roleSpendExp(advancementDetails.rockerboy, 'rockerboy')}>Increase: {roleExpReturn(advancementDetails.rockerboy)}</Item> : <Item>Maxed</Item>}</Grid>

                    <Grid item xs={3}>
                        <Item><RoleAbilitiesDialog prop={'Solo'} /></Item>
                    </Grid>
                    <Grid item xs={6}>
                        <Item>{roleDotReturn(advancementDetails.solo)}</Item>
                    </Grid>
                    <Grid item xs={3}>{advancementDetails.solo < 10 ? <Item sx={{
                        cursor: 'pointer', '&:hover': {
                            backgroundColor: '#fff',
                            color: '#000',
                        }
                    }} onClick={() => roleSpendExp(advancementDetails.solo, 'solo')}>Increase: {roleExpReturn(advancementDetails.solo)}</Item> : <Item>Maxed</Item>}</Grid>


                    <Grid item xs={3}>
                        <Item><RoleAbilitiesDialog prop={'Netrunner'} /></Item>
                    </Grid>
                    <Grid item xs={6}>
                        <Item>{roleDotReturn(advancementDetails.netrunner)}</Item>
                    </Grid>
                    <Grid item xs={3}>{advancementDetails.netrunner < 10 ? <Item sx={{
                        cursor: 'pointer', '&:hover': {
                            backgroundColor: '#fff',
                            color: '#000',
                        }
                    }} onClick={() => roleSpendExp(advancementDetails.netrunner, 'netrunner')}>Increase: {roleExpReturn(advancementDetails.netrunner)}</Item> : <Item>Maxed</Item>}</Grid>


                    <Grid item xs={3}>
                        <Item><RoleAbilitiesDialog prop={'Nomad'} /></Item>
                    </Grid>
                    <Grid item xs={6}>
                        <Item>{roleDotReturn(advancementDetails.nomad)}</Item>
                    </Grid>
                    <Grid item xs={3}>{advancementDetails.nomad < 10 ? <Item sx={{
                        cursor: 'pointer', '&:hover': {
                            backgroundColor: '#fff',
                            color: '#000',
                        }
                    }} onClick={() => roleSpendExp(advancementDetails.nomad, 'nomad')}>Increase: {roleExpReturn(advancementDetails.nomad)}</Item> : <Item>Maxed</Item>}</Grid>

                    <Grid item xs={3}>
                        <Item>Nomad Vehicles Available:</Item>
                    </Grid>
                    <Grid item xs={6}>
                        <Item>{roleDotReturn(advancementDetails.nomad_vehicle_slots)}</Item>
                    </Grid>
                    <Grid item xs={3}>
                        <Item>Increase Nomad Role</Item>
                    </Grid>

                    <Grid item xs={3}>
                        <Item><RoleAbilitiesDialog prop={'Media'} /></Item>
                    </Grid>
                    <Grid item xs={6}>
                        <Item>{roleDotReturn(advancementDetails.media)}</Item>
                    </Grid>
                    <Grid item xs={3}>{advancementDetails.media < 10 ? <Item sx={{
                        cursor: 'pointer', '&:hover': {
                            backgroundColor: '#fff',
                            color: '#000',
                        }
                    }} onClick={() => roleSpendExp(advancementDetails.media, 'media')}>Increase: {roleExpReturn(advancementDetails.media)}</Item> : <Item>Maxed</Item>}</Grid>

                    <Grid item xs={3}>
                        <Item sx={{ backgroundColor: '#074287' }}><RoleAbilitiesDialog prop={'Medtech'} /></Item>
                    </Grid>
                    <Grid item xs={6}>
                        <Item sx={{ backgroundColor: '#074287' }}>{roleDotReturn(advancementDetails.medtech)}</Item>
                    </Grid>
                    <Grid item xs={3}>{advancementDetails.medtech < 10 ? <Item sx={{
                        backgroundColor: '#074287',
                        cursor: 'pointer', '&:hover': {
                            backgroundColor: '#fff',
                            color: '#000',
                        }
                    }} onClick={() => roleSpendExp(advancementDetails.medtech, 'medtech')}>Increase: {roleExpReturn(advancementDetails.medtech)}</Item> : <Item>Maxed</Item>}</Grid>

                    <Grid item xs={3}>
                        <Item sx={{ backgroundColor: '#074287' }}><RoleAbilitiesDialog prop={'Surgery'} /></Item>
                    </Grid>
                    <Grid item xs={6}>
                        <Item sx={{ backgroundColor: '#074287' }}>{dotReturn(advancementDetails.med_surgery)}</Item>
                    </Grid>
                    <Grid item xs={3}>{advancementDetails.medtech_available > 0 && advancementDetails.med_surgery < 5 ? <Item sx={{
                        backgroundColor: '#074287',
                        cursor: 'pointer', '&:hover': {
                            backgroundColor: '#fff',
                            color: '#000',
                        }
                    }} onClick={() => increaseRoleSkill(advancementDetails.med_surgery, 'med_surgery')}>Spend Role Points ({advancementDetails.medtech_available})</Item> : <Item sx={{ backgroundColor: '#074287' }}>No Points to Spend</Item>}</Grid>

                    <Grid item xs={3}>
                        <Item sx={{ backgroundColor: '#074287' }}><RoleAbilitiesDialog prop={'Pharmaceuticals'} /></Item>
                    </Grid>
                    <Grid item xs={6}>
                        <Item sx={{ backgroundColor: '#074287' }}>{dotReturn(advancementDetails.med_pharma)}</Item>
                    </Grid>
                    <Grid item xs={3}>{advancementDetails.medtech_available > 0 && advancementDetails.med_pharma < 5 ? <Item sx={{
                        backgroundColor: '#074287',
                        cursor: 'pointer', '&:hover': {
                            backgroundColor: '#fff',
                            color: '#000',
                        }
                    }} onClick={() => increaseRoleSkill(advancementDetails.med_pharma, 'med_pharma')}>Spend Role Points ({advancementDetails.medtech_available})</Item> : <Item sx={{ backgroundColor: '#074287' }}>No Points to Spend</Item>}</Grid>

                    <Grid item xs={3}>
                        <Item sx={{ backgroundColor: '#074287' }}><RoleAbilitiesDialog prop={'Cryogenics'} /></Item>
                    </Grid>
                    <Grid item xs={6}>
                        <Item sx={{ backgroundColor: '#074287' }}>{dotReturn(advancementDetails.med_cryo)}</Item>
                    </Grid>
                    <Grid item xs={3}>{advancementDetails.medtech_available > 0 && advancementDetails.med_cryo < 5 ? <Item sx={{
                        backgroundColor: '#074287',
                        cursor: 'pointer', '&:hover': {
                            backgroundColor: '#fff',
                            color: '#000',
                        }
                    }} onClick={() => increaseRoleSkill(advancementDetails.med_cryo, 'med_cryo')}>Spend Role Points ({advancementDetails.medtech_available})</Item> : <Item sx={{ backgroundColor: '#074287' }}>No Points to Spend</Item>}</Grid>

                    <Grid item xs={3}>
                        <Item sx={{ backgroundColor: '#02520d' }}><RoleAbilitiesDialog prop={'Maker'} /></Item>
                    </Grid>
                    <Grid item xs={6}>
                        <Item sx={{ backgroundColor: '#02520d' }}>{roleDotReturn(advancementDetails.maker)}</Item>
                    </Grid>
                    <Grid item xs={3}>{advancementDetails.maker < 10 ? <Item sx={{
                        backgroundColor: '#02520d',
                        cursor: 'pointer', '&:hover': {
                            backgroundColor: '#fff',
                            color: '#000',
                        }
                    }} onClick={() => roleSpendExp(advancementDetails.maker, 'maker')}>Increase: {roleExpReturn(advancementDetails.maker)}</Item> : <Item>Maxed</Item>}</Grid>

                    <Grid item xs={3}>
                        <Item sx={{ backgroundColor: '#02520d' }}><RoleAbilitiesDialog prop={'Field Expertise'} /></Item>
                    </Grid>
                    <Grid item xs={6}>
                        <Item sx={{ backgroundColor: '#02520d' }}>{roleDotReturn(advancementDetails.maker_field)}</Item>
                    </Grid>
                    <Grid item xs={3}>{advancementDetails.maker_available > 0 && advancementDetails.maker_field < 10 ? <Item sx={{
                        backgroundColor: '#02520d',
                        cursor: 'pointer', '&:hover': {
                            backgroundColor: '#fff',
                            color: '#000',
                        }
                    }} onClick={() => increaseRoleSkill(advancementDetails.maker_field, 'maker_field')}>Spend Role Points ({advancementDetails.maker_available})</Item> : <Item sx={{ backgroundColor: '#02520d' }}>No Points to Spend</Item>}</Grid>

                    <Grid item xs={3}>
                        <Item sx={{ backgroundColor: '#02520d' }}><RoleAbilitiesDialog prop={'Upgrade Expertise'} /></Item>
                    </Grid>
                    <Grid item xs={6}>
                        <Item sx={{ backgroundColor: '#02520d' }}>{roleDotReturn(advancementDetails.maker_upgrade)}</Item>
                    </Grid>
                    <Grid item xs={3}>{advancementDetails.maker_available > 0 && advancementDetails.maker_upgrade < 10 ? <Item sx={{
                        backgroundColor: '#02520d',
                        cursor: 'pointer', '&:hover': {
                            backgroundColor: '#fff',
                            color: '#000',
                        }
                    }} onClick={() => increaseRoleSkill(advancementDetails.maker_upgrade, 'maker_upgrade')}>Spend Role Points ({advancementDetails.maker_available})</Item> : <Item sx={{ backgroundColor: '#02520d' }}>No Points to Spend</Item>}</Grid>

                    <Grid item xs={3}>
                        <Item sx={{ backgroundColor: '#02520d' }}><RoleAbilitiesDialog prop={'Fabrication'} /></Item>
                    </Grid>
                    <Grid item xs={6}>
                        <Item sx={{ backgroundColor: '#02520d' }}>{roleDotReturn(advancementDetails.maker_fab)}</Item>
                    </Grid>
                    <Grid item xs={3}>{advancementDetails.maker_available > 0 && advancementDetails.maker_fab < 10 ? <Item sx={{
                        backgroundColor: '#02520d',
                        cursor: 'pointer', '&:hover': {
                            backgroundColor: '#fff',
                            color: '#000',
                        }
                    }} onClick={() => increaseRoleSkill(advancementDetails.maker_fab, 'maker_fab')}>Spend Role Points ({advancementDetails.maker_available})</Item> : <Item sx={{ backgroundColor: '#02520d' }}>No Points to Spend</Item>}</Grid>

                    <Grid item xs={3}>
                        <Item sx={{ backgroundColor: '#02520d' }}><RoleAbilitiesDialog prop={'Invention'} /></Item>
                    </Grid>
                    <Grid item xs={6}>
                        <Item sx={{ backgroundColor: '#02520d' }}>{roleDotReturn(advancementDetails.maker_invent)}</Item>
                    </Grid>
                    <Grid item xs={3}>{advancementDetails.maker_available > 0 && advancementDetails.maker_invent < 10 ? <Item sx={{
                        backgroundColor: '#02520d',
                        cursor: 'pointer', '&:hover': {
                            backgroundColor: '#fff',
                            color: '#000',
                        }
                    }} onClick={() => increaseRoleSkill(advancementDetails.maker_invent, 'maker_invent')}>Spend Role Points ({advancementDetails.maker_available})</Item> : <Item sx={{ backgroundColor: '#02520d' }}>No Points to Spend</Item>}</Grid>
                </>
            ) : <>
                <Grid item xs={12}><Item>Loading...</Item></Grid>
            </>}
        </Grid>
    </>)
}