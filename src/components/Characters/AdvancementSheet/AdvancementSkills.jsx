import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Grid from '@mui/material/Grid';
import Item from '../CharacterSheet/Item';

import SkillsDialog from '../../Modals/SkillsDialog';
import {SkillSet} from '../../../utils/objects/objects.utils';
import CircleIcon from '@mui/icons-material/Circle';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';

function TransitionUp(props) {
    return <Slide {...props} direction="up" />;
}

export default function AdvancementSkills() {

    const dispatch = useDispatch();
    const advancementDetails = useSelector((store) => store.advancementDetail);
    const loadStatus = useSelector(store => store.loaders.advancementSheet);

    const fullCircle = <CircleIcon />
    const emptyCircle = <CircleOutlinedIcon />

    const [showSnackbar, setShowSnackbar] = React.useState(false);
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const skillDotReturn = (skill) => {
        let returnedDots = []
        for (let i = 0; i < skill; i++) {
            returnedDots.push(<React.Fragment key={i}>{fullCircle}</React.Fragment>)
        }
        let j = skill
        for (j; j <= 4; j++) {
            returnedDots.push(<React.Fragment key={j + 10}>{emptyCircle}</React.Fragment>)
        }
        return returnedDots
    }

    const skillExpReturn = (skill) => {
        let newCost = (skill + 1) * 2
        return `${newCost} XP`
    }

    const skillSpendExp = (skillScore, skillName) => {
        const availableExp = advancementDetails.max_xp - advancementDetails.spent_xp
        skillScore = Number(skillScore)
        let increaseSkillCost = (skillScore + 1) * 2

        if (increaseSkillCost <= availableExp) {
            dispatch({ type: "SET_ADVANCEMENT_LOAD_STATUS", payload: true })
            dispatch({ type: 'ADVANCEMENT_CHANGE_STAT', payload: { statName: skillName, newValue: skillScore + 1, newSpentXP: advancementDetails.spent_xp + increaseSkillCost, charID: advancementDetails.id } })
        } else {
            setShowSnackbar(true)
        }
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

        <h1>Skills</h1>
        <Grid container>
            {loadStatus === false ? (
                <>
                    <Grid item xs={4}>
                        <Grid container>
                            {SkillSet.streets.map((skill) => {
                                return (
                                    <>
                                        <Grid item xs={3}><Item><SkillsDialog prop={skill[1]}></SkillsDialog></Item></Grid>
                                        <Grid item xs={5}><Item>{skillDotReturn(advancementDetails[skill[0]])}</Item></Grid>
                                        <Grid item xs={4}>{advancementDetails[skill[0]] < 5 ? <Item sx={{
                                            cursor: 'pointer', '&:hover': {
                                                backgroundColor: '#fff',
                                                color: '#000',
                                            }
                                        }} onClick={() => skillSpendExp(advancementDetails[skill[0]], 'athletics')}>Increase: {skillExpReturn(advancementDetails[skill[0]])}</Item> : <Item>Maxed</Item>}</Grid>
                                    </>
                                )
                            })}
                        </Grid>
                    </Grid>

                    <Grid item xs={4}>
                        <Grid container>
                            {SkillSet.tekhne.map((skill) => {
                                return (
                                    <>
                                        <Grid item xs={3}><Item><SkillsDialog prop={skill[1]}></SkillsDialog></Item></Grid>
                                        <Grid item xs={5}><Item>{skillDotReturn(advancementDetails[skill[0]])}</Item></Grid>
                                        <Grid item xs={4}>{advancementDetails[skill[0]] < 5 ? <Item sx={{
                                            cursor: 'pointer', '&:hover': {
                                                backgroundColor: '#fff',
                                                color: '#000',
                                            }
                                        }} onClick={() => skillSpendExp(advancementDetails[skill[0]], 'athletics')}>Increase: {skillExpReturn(advancementDetails[skill[0]])}</Item> : <Item>Maxed</Item>}</Grid>
                                    </>
                                )
                            })}
                        </Grid>
                    </Grid>

                    <Grid item xs={4}>
                        <Grid container>
                            {SkillSet.knowledge.map((skill) => {
                                return (
                                    <>
                                        <Grid item xs={3}><Item><SkillsDialog prop={skill[1]}></SkillsDialog></Item></Grid>
                                        <Grid item xs={5}><Item>{skillDotReturn(advancementDetails[skill[0]])}</Item></Grid>
                                        <Grid item xs={4}>{advancementDetails[skill[0]] < 5 ? <Item sx={{
                                            cursor: 'pointer', '&:hover': {
                                                backgroundColor: '#fff',
                                                color: '#000',
                                            }
                                        }} onClick={() => skillSpendExp(advancementDetails[skill[0]], 'athletics')}>Increase: {skillExpReturn(advancementDetails[skill[0]])}</Item> : <Item>Maxed</Item>}</Grid>
                                    </>
                                )
                            })}
                        </Grid>
                    </Grid>




                    {advancementDetails.is_paramedical ? (<>
                        <Grid item xs={3}><Item><SkillsDialog prop={'Paramedic'}></SkillsDialog></Item></Grid>
                        <Grid item xs={5}><Item>{skillDotReturn(advancementDetails.paramed)}</Item></Grid>
                        <Grid item xs={4}>{advancementDetails.paramed < 5 ? <Item sx={{
                            cursor: 'pointer', '&:hover': {
                                backgroundColor: '#fff',
                                color: '#000',
                            }
                        }} onClick={() => skillSpendExp(advancementDetails.paramed, 'paramed')}>Increase: {skillExpReturn(advancementDetails.paramed)}</Item> : <Item>Maxed</Item>}</Grid>
                    </>) : <>
                        <Grid item xs={3}><Item><SkillsDialog prop={'First Aid'}></SkillsDialog></Item></Grid>
                        <Grid item xs={5}><Item>{skillDotReturn(advancementDetails.first_aid)}</Item></Grid>
                        <Grid item xs={4}>{advancementDetails.first_aid < 5 ? <Item sx={{
                            cursor: 'pointer', '&:hover': {
                                backgroundColor: '#fff',
                                color: '#000',
                            }
                        }} onClick={() => skillSpendExp(advancementDetails.first_aid, 'first_aid')}>Increase: {skillExpReturn(advancementDetails.first_aid)}</Item> : <Item>Maxed</Item>}</Grid>
                    </>}
                </>
            ) : (<>
                <Grid item xs={12}><Item>Loading...</Item></Grid>
            </>)
            }
        </Grid>
    </>)
}
