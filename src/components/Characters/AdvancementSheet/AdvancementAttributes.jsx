import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Grid from '@mui/material/Grid';
import Item from '../CharacterSheet/Item';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';

import AttributesDialog from '../../Modals/AttributesDialog';

import CircleIcon from '@mui/icons-material/Circle';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';

function TransitionUp(props) {
    return <Slide {...props} direction="up" />;
}

export default function AdvancementAttributes() {

    const [showSnackbar, setShowSnackbar] = React.useState(false);
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const dispatch = useDispatch();
    const advancementDetails = useSelector(store => store.advancementDetail);
    const loadStatus = useSelector(store => store.loaders.advancementSheet);

    const fullCircle = <CircleIcon />
    const emptyCircle = <CircleOutlinedIcon />

    const attDotReturn = (attribute, max) => {
        let returnedDots = []
        for (let i = 0; i < attribute; i++) {
            returnedDots.push(fullCircle)
        }
        let j = attribute
        for (j; j <= (max - 1); j++) {
            returnedDots.push(emptyCircle)
        }
        return returnedDots
    }

    const attributeExpReturn = (attribute) => {
        let newCost = (attribute + 1) * 5
        return newCost
    }

    const attributeSpendExp = (attributeScore, attributeName) => {
        const availableExp = advancementDetails.max_xp - advancementDetails.spent_xp
        attributeScore = Number(attributeScore)
        let increaseAttributeCost = (attributeScore + 1) * 5

        if (increaseAttributeCost <= availableExp) {
            dispatch({ type: "SET_ADVANCEMENT_LOAD_STATUS", payload: true })
            dispatch({ type: 'ADVANCEMENT_INCREASE_ATTRIBUTE', payload: { attributeName, newStat: attributeScore + 1, newSpentXP: advancementDetails.spent_xp + increaseAttributeCost, charID: advancementDetails.id } })
        } else {
            setShowSnackbar(true)
        }
    }

    return (<>
        <h1>Attributes</h1>
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

        <Grid container>
            <Grid item xs={12}>
                <Grid container>
                    <Grid item xs={12}><Item>Physical</Item></Grid>
                    {loadStatus === false ? (
                        <>
                            <Grid item xs={4}><Item><AttributesDialog prop={'Strength'} /></Item></Grid>
                            <Grid item xs={4}><Item>{attDotReturn(advancementDetails.strength, 5)}</Item></Grid>
                            {advancementDetails.strength < 5 ? <Grid item xs={4}>
                                <Item
                                    sx={{
                                        cursor: 'pointer', '&:hover': {
                                            backgroundColor: '#fff',
                                            color: '#000',
                                        }
                                    }} onClick={() => attributeSpendExp(advancementDetails.strength, 'strength')}>
                                    Increase: {attributeExpReturn(advancementDetails.strength)} XP
                                </Item></Grid> : <Grid item xs={4}><Item>Maximum Reached</Item></Grid>}

                            <Grid item xs={4}><Item><AttributesDialog prop={'Body'} /></Item></Grid>
                            <Grid item xs={4}><Item>{attDotReturn(advancementDetails.body, 5)}</Item></Grid>
                            {advancementDetails.body < 5 ? <Grid item xs={4}><Item sx={{
                                cursor: 'pointer', '&:hover': {
                                    backgroundColor: '#fff',
                                    color: '#000',
                                }
                            }} onClick={() => attributeSpendExp(advancementDetails.body, 'body')}>Increase: {attributeExpReturn(advancementDetails.body)} XP</Item></Grid> : <Grid item xs={4}><Item>Maximum Reached</Item></Grid>}

                            <Grid item xs={4}><Item><AttributesDialog prop={'Reflexes'} /></Item></Grid>
                            <Grid item xs={4}><Item>{attDotReturn(advancementDetails.reflexes, 5)}</Item></Grid>
                            {advancementDetails.reflexes < 5 ? <Grid item xs={4}><Item sx={{
                                cursor: 'pointer', '&:hover': {
                                    backgroundColor: '#fff',
                                    color: '#000',
                                }
                            }} onClick={() => attributeSpendExp(advancementDetails.reflexes, 'reflexes')}>Increase: {attributeExpReturn(advancementDetails.reflexes)} XP</Item></Grid> : <Grid item xs={4}><Item>Maximum Reached</Item></Grid>}


                            <Grid item xs={12}><Item>Social</Item></Grid>
                            <Grid item xs={4}><Item><AttributesDialog prop={'Appearance'} /></Item></Grid>
                            <Grid item xs={4}><Item>{attDotReturn(advancementDetails.appearance, 5)}</Item></Grid>
                            {advancementDetails.appearance < 5 ? <Grid item xs={4}><Item sx={{
                                cursor: 'pointer', '&:hover': {
                                    backgroundColor: '#fff',
                                    color: '#000',
                                }
                            }} onClick={() => attributeSpendExp(advancementDetails.appearance, 'appearance')}>Increase: {attributeExpReturn(advancementDetails.appearance)} XP</Item></Grid> : <Grid item xs={4}><Item>Maximum Reached</Item></Grid>}

                            <Grid item xs={4}><Item><AttributesDialog prop={'Cool'} /></Item></Grid>
                            <Grid item xs={4}><Item>{attDotReturn(advancementDetails.cool, 5)}</Item></Grid>
                            {advancementDetails.cool < 5 ? <Grid item xs={4}><Item sx={{
                                cursor: 'pointer', '&:hover': {
                                    backgroundColor: '#fff',
                                    color: '#000',
                                }
                            }} onClick={() => attributeSpendExp(advancementDetails.cool, 'cool')}>Increase: {attributeExpReturn(advancementDetails.cool)} XP</Item></Grid> : <Grid item xs={4}><Item>Maximum Reached</Item></Grid>}


                            <Grid item xs={12}><Item>Mental</Item></Grid>
                            <Grid item xs={4}><Item><AttributesDialog prop={'Intelligence'} /></Item></Grid>
                            <Grid item xs={4}><Item>{attDotReturn(advancementDetails.intelligence, 5)}</Item></Grid>
                            {advancementDetails.intelligence < 5 ? <Grid item xs={4}><Item sx={{
                                cursor: 'pointer', '&:hover': {
                                    backgroundColor: '#fff',
                                    color: '#000',
                                }
                            }} onClick={() => attributeSpendExp(advancementDetails.intelligence, 'intelligence')}>Increase: {attributeExpReturn(advancementDetails.intelligence)} XP</Item></Grid> : <Grid item xs={4}><Item>Maximum Reached</Item></Grid>}

                            <Grid item xs={4}><Item><AttributesDialog prop={'Willpower'} /></Item></Grid>
                            <Grid item xs={4}><Item>{attDotReturn(advancementDetails.willpower, 10)}</Item></Grid>
                            {advancementDetails.willpower < 10 ? <Grid item xs={4}><Item sx={{
                                cursor: 'pointer', '&:hover': {
                                    backgroundColor: '#fff',
                                    color: '#000',
                                }
                            }} onClick={() => attributeSpendExp(advancementDetails.willpower, 'willpower')}>Increase: {attributeExpReturn(advancementDetails.willpower)} XP</Item></Grid> : <Grid item xs={4}><Item>Maximum Reached</Item></Grid>}

                            <Grid item xs={4}><Item><AttributesDialog prop={'Technique'} /></Item></Grid>
                            <Grid item xs={4}><Item>{attDotReturn(advancementDetails.technique, 10)}</Item></Grid>
                            {advancementDetails.technique < 10 ? <Grid item xs={4}><Item sx={{
                                cursor: 'pointer', '&:hover': {
                                    backgroundColor: '#fff',
                                    color: '#000',
                                }
                            }} onClick={() => attributeSpendExp(advancementDetails.technique, 'technique')}>Increase: {attributeExpReturn(advancementDetails.technique)} XP</Item></Grid> : <Grid item xs={4}><Item>Maximum Reached</Item></Grid>}

                        </>
                    ) : <>
                        <Grid item xs={12}><Item>Loading...</Item></Grid>
                    </>}
                </Grid>
            </Grid>

        </Grid>
    </>)
}