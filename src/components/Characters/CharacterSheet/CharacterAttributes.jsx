import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';

function CharacterAttributes(charDetailProp) {
    const charDetail = charDetailProp.charDetail

    useEffect(() => {
        setAttributes();
    })
    // physical attributes
    const [strengthAtt, setStrengthAtt] = useState('');
    const [bodyAtt, setBodyAtt] = useState('');
    const [reflexesAtt, setReflexesAtt] = useState('');
    const [moveatt, setMoveAtt] = useState('');

    // social attributes
    const [appearanceAtt, setAppearanceAtt] = useState('');
    const [coolAtt, setCoolAtt] = useState('');
    const [streetCredAtt, setStreetCredAtt] = useState('');

    // mental attributes
    const [intelligenceAtt, setIntelligenceAtt] = useState('');
    const [willpowerAtt, setWillpowerAtt] = useState('')
    const [techniqueAtt, setTechniqueAtt] = useState('')

    const fulldot = ` \u2b24`
    const emptydot = ` \u25ef`

    const setAttributes = () => {
        setStrengthAtt(dotReturn(charDetail.strength))
        setBodyAtt(dotReturn(charDetail.body))
        setReflexesAtt(dotReturn(charDetail.reflexes))
        setMoveAtt(dotReturn(charDetail.move))
        setAppearanceAtt(dotReturn(charDetail.appearance))
        setCoolAtt(dotReturn(charDetail.cool))
        setStreetCredAtt(dotReturn(charDetail.street_cred))
        setIntelligenceAtt(dotReturn(charDetail.intelligence))
        setWillpowerAtt(dotReturn(charDetail.willpower))
        setTechniqueAtt(dotReturn(charDetail.technique))
    }

    const dotReturn = (attribute) => {
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

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    return (
        <>
        <Grid item xs={12}>
        </Grid>
            
            <Grid item xs={12}><Item><h1>Atributes</h1></Item></Grid>
            <Grid item xs={1.5}>
                <Item>Strength:</Item>
            </Grid>
            <Grid item xs={2.5}>
                <Item> {strengthAtt} </Item>
            </Grid>

            <Grid item xs={1.5}>
                <Item>Appearance:</Item>
            </Grid>
            <Grid item xs={2.5}>
                <Item> {appearanceAtt} </Item>
            </Grid>
            
            <Grid item xs={1.5}>
                <Item>Intelligence:</Item>
            </Grid>
            <Grid item xs={2.5}>
                <Item> {intelligenceAtt} </Item>
            </Grid>

            <Grid item xs={1.5}>
                <Item>Body: </Item>
            </Grid>
            <Grid item xs={2.5}>
                <Item>{bodyAtt}</Item>
            </Grid>

            <Grid item xs={1.5}>
                <Item>Cool:</Item>
            </Grid>
            <Grid item xs={2.5}>
                <Item> {coolAtt} </Item>
            </Grid>

            <Grid item xs={1.5}>
                <Item>Willpower:</Item>
            </Grid>
            <Grid item xs={2.5}>
                <Item> {willpowerAtt} </Item>
            </Grid>

            <Grid item xs={1.5}>
                <Item>Reflexes:</Item>
            </Grid>
            <Grid item xs={2.5}>
                <Item>{reflexesAtt}</Item>
            </Grid>

            <Grid item xs={1.5}>
                <Item>Street Cred:</Item>
            </Grid>
            <Grid item xs={2.5}>
                <Item> {streetCredAtt} </Item>
            </Grid>

            <Grid item xs={1.5}>
                <Item>Technique:</Item>
            </Grid>
            <Grid item xs={2.5}>
                <Item> {techniqueAtt} </Item>
            </Grid>

            <Grid item xs={1.5}>
                <Item>Move:</Item>
            </Grid>
            <Grid item xs={2.5}>
                <Item>{moveatt}</Item>
            </Grid>
        </>
    )
}

export default CharacterAttributes;