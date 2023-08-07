import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Grid from '@mui/material/Grid';
import Item from '../CharacterSheet/Item';

import AttributesDialog from '../../Modals/AttributesDialog';

export default function AdvancementAttributes() {

    const dispatch = useDispatch();
    const advancementDetails = useSelector((store) => store.advancementDetail);

    const fulldot = ` \u2b24`
    const emptydot = ` \u25ef`

    const attDotReturn = (attribute, max) => {
        let returnedDots = ''
        for (let i = 0; i < attribute; i++) {
            returnedDots += fulldot;
        }
        let j = attribute
        for (j; j <= (max - 1); j++) {
            returnedDots += emptydot
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
            dispatch({ type: 'INCREASE_ATTRIBUTE', payload: { attributeScore, attributeName, increaseAttributeCost } })
        } else {
            alert('Insufficient XP')
        }
    }

    return (<>
        <h1>Attributes</h1>
        <Grid container>
            <Grid item xs={12}>
                <Grid container>
                    <Grid item xs={12}><Item>Physical</Item></Grid>
                    <Grid item xs={4}><Item><AttributesDialog prop={'Strength'} /></Item></Grid>
                    <Grid item xs={4}><Item>{attDotReturn(advancementDetails.strength, 5)}</Item></Grid>
                    {advancementDetails.strength < 5? <Grid item xs={4}><Item sx={{ cursor: 'pointer' }} onClick={() => attributeSpendExp(advancementDetails.strength, 'strength')}>Increase: {attributeExpReturn(advancementDetails.strength)} XP</Item></Grid> : <Grid item xs={4}><Item>Maximum Reached</Item></Grid>}

                    <Grid item xs={4}><Item><AttributesDialog prop={'Body'} /></Item></Grid>
                    <Grid item xs={4}><Item>{attDotReturn(advancementDetails.body, 5)}</Item></Grid>
                    {advancementDetails.body < 5? <Grid item xs={4}><Item sx={{ cursor: 'pointer' }} onClick={() => attributeSpendExp(advancementDetails.body, 'body')}>Increase: {attributeExpReturn(advancementDetails.body)} XP</Item></Grid> : <Grid item xs={4}><Item>Maximum Reached</Item></Grid>}

                    <Grid item xs={4}><Item><AttributesDialog prop={'Reflexes'} /></Item></Grid>
                    <Grid item xs={4}><Item>{attDotReturn(advancementDetails.reflexes, 5)}</Item></Grid>
                    {advancementDetails.reflexes < 5? <Grid item xs={4}><Item sx={{ cursor: 'pointer' }} onClick={() => attributeSpendExp(advancementDetails.reflexes, 'reflexes')}>Increase: {attributeExpReturn(advancementDetails.reflexes)} XP</Item></Grid> : <Grid item xs={4}><Item>Maximum Reached</Item></Grid>}


                    <Grid item xs={12}><Item>Social</Item></Grid>
                    <Grid item xs={4}><Item><AttributesDialog prop={'Appearance'} /></Item></Grid>
                    <Grid item xs={4}><Item>{attDotReturn(advancementDetails.appearance, 5)}</Item></Grid>
                    {advancementDetails.appearance < 5? <Grid item xs={4}><Item sx={{ cursor: 'pointer' }} onClick={() => attributeSpendExp(advancementDetails.appearance, 'appearance')}>Increase: {attributeExpReturn(advancementDetails.appearance)} XP</Item></Grid> : <Grid item xs={4}><Item>Maximum Reached</Item></Grid>}

                    <Grid item xs={4}><Item><AttributesDialog prop={'Cool'} /></Item></Grid>
                    <Grid item xs={4}><Item>{attDotReturn(advancementDetails.cool, 5)}</Item></Grid>
                    {advancementDetails.cool < 5? <Grid item xs={4}><Item sx={{ cursor: 'pointer' }} onClick={() => attributeSpendExp(advancementDetails.cool, 'cool')}>Increase: {attributeExpReturn(advancementDetails.cool)} XP</Item></Grid> : <Grid item xs={4}><Item>Maximum Reached</Item></Grid>}


                    <Grid item xs={12}><Item>Mental</Item></Grid>
                    <Grid item xs={4}><Item><AttributesDialog prop={'Intelligence'} /></Item></Grid>
                    <Grid item xs={4}><Item>{attDotReturn(advancementDetails.intelligence, 5)}</Item></Grid>
                    {advancementDetails.intelligence < 5? <Grid item xs={4}><Item sx={{ cursor: 'pointer' }} onClick={() => attributeSpendExp(advancementDetails.intelligence, 'intelligence')}>Increase: {attributeExpReturn(advancementDetails.intelligence)} XP</Item></Grid> : <Grid item xs={4}><Item>Maximum Reached</Item></Grid>}

                    <Grid item xs={4}><Item><AttributesDialog prop={'Willpower'} /></Item></Grid>
                    <Grid item xs={4}><Item>{attDotReturn(advancementDetails.willpower, 10)}</Item></Grid>
                    {advancementDetails.willpower < 10? <Grid item xs={4}><Item sx={{ cursor: 'pointer' }} onClick={() => attributeSpendExp(advancementDetails.willpower, 'willpower')}>Increase: {attributeExpReturn(advancementDetails.willpower)} XP</Item></Grid> : <Grid item xs={4}><Item>Maximum Reached</Item></Grid>}

                    <Grid item xs={4}><Item><AttributesDialog prop={'Technique'} /></Item></Grid>
                    <Grid item xs={4}><Item>{attDotReturn(advancementDetails.technique, 10)}</Item></Grid>
                    {advancementDetails.technique < 10? <Grid item xs={4}><Item sx={{ cursor: 'pointer' }} onClick={() => attributeSpendExp(advancementDetails.technique, 'technique')}>Increase: {attributeExpReturn(advancementDetails.technique)} XP</Item></Grid> : <Grid item xs={4}><Item>Maximum Reached</Item></Grid>}
                </Grid>
            </Grid>

        </Grid>
    </>)
}