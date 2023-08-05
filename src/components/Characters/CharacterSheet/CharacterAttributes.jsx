import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Item from './Item';
import AttributesModal from '../../Modals/AttributesModal';

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
        setStrengthAtt(dotReturn(charDetail.strength + charDetail.cyber_strength))
        setBodyAtt(dotReturn(charDetail.body + charDetail.cyber_body))
        setReflexesAtt(dotReturn(charDetail.reflexes + charDetail.cyber_reflexes))
        setMoveAtt(dotReturn(Math.ceil(charDetail.reflexes + charDetail.cyber_reflexes) / 2))
        setAppearanceAtt(dotReturn(charDetail.appearance + charDetail.cyber_appearance))
        setCoolAtt(dotReturn(charDetail.cool + charDetail.cyber_cool))
        setStreetCredAtt(dotReturn(charDetail.street_cred))
        setIntelligenceAtt(dotReturn(charDetail.intelligence + charDetail.cyber_intelligence))
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

    return (
        <>
            <Grid item xs={12}>
            </Grid>
            <Grid item xs={12}><Item sx={{fontSize:'1.8em', padding: 0}}>Attributes</Item></Grid>
            <Grid item xs={1.5}>
                <Item><AttributesModal prop={'Strength'} /></Item>
            </Grid>
            <Grid item xs={2.5}>
                <Item> {strengthAtt} </Item>
            </Grid>

            <Grid item xs={1.5}>
                <Item><AttributesModal prop={'Appearance'} /></Item>
            </Grid>
            <Grid item xs={2.5}>
                <Item> {appearanceAtt} </Item>
            </Grid>

            <Grid item xs={1.5}>
                <Item><AttributesModal prop={'Intelligence'} /></Item>
            </Grid>
            <Grid item xs={2.5}>
                <Item> {intelligenceAtt} </Item>
            </Grid>

            <Grid item xs={1.5}>
                <Item><AttributesModal prop={'Body'} /> </Item>
            </Grid>
            <Grid item xs={2.5}>
                <Item>{bodyAtt}</Item>
            </Grid>

            <Grid item xs={1.5}>
                <Item><AttributesModal prop={'Cool'} /></Item>
            </Grid>
            <Grid item xs={2.5}>
                <Item> {coolAtt} </Item>
            </Grid>

            <Grid item xs={1.5}>
                <Item><AttributesModal prop={'Willpower'} /></Item>
            </Grid>
            <Grid item xs={2.5}>
                <Item> {willpowerAtt} </Item>
            </Grid>

            <Grid item xs={1.5}>
                <Item><AttributesModal prop={'Reflexes'} /></Item>
            </Grid>
            <Grid item xs={2.5}>
                <Item>{reflexesAtt}</Item>
            </Grid>

            <Grid item xs={1.5}>
                <Item><AttributesModal prop={'Street Cred'} /></Item>
            </Grid>
            <Grid item xs={2.5}>
                <Item> {streetCredAtt} </Item>
            </Grid>

            <Grid item xs={1.5}>
                <Item><AttributesModal prop={'Technique'} /></Item>
            </Grid>
            <Grid item xs={2.5}>
                <Item> {techniqueAtt} </Item>
            </Grid>

            <Grid item xs={1.5}>
                <Item><AttributesModal prop={'Move'} /></Item>
            </Grid>
            <Grid item xs={2.5}>
                <Item>{moveatt}</Item>
            </Grid>
        </>
    )
}

export default CharacterAttributes;