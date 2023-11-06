import React from 'react';
import Grid from '@mui/material/Grid';
import Item from './Item';
import AttributesDialog from '../../Modals/AttributesDialog';

import CircleIcon from '@mui/icons-material/Circle';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import SquareIcon from '@mui/icons-material/Square';
import CheckBoxOutlineBlankOutlinedIcon from '@mui/icons-material/CheckBoxOutlineBlankOutlined'

function CharacterAttributes(charDetailProp) {
    const charDetail = charDetailProp.charDetail

    const fullCircle = <CircleIcon />
    const emptyCircle = <CircleOutlinedIcon />
    const fullBox = <SquareIcon />
    const boxOutline = <CheckBoxOutlineBlankOutlinedIcon />

    const dotReturn = (attribute, cyberAtt) => {
        let returnedDots = []
        for (let i = 0; i < attribute; i++) {
            returnedDots.push(<React.Fragment key={i}>{fullCircle}</React.Fragment>)
        }
        for (let b = 0; b < cyberAtt; b++) {
            returnedDots.push(<React.Fragment key={b + 10}>{fullBox}</React.Fragment>)
        }
        let j = attribute
        for (j; j <= 4; j++) {
            returnedDots.push(<React.Fragment key={j + 5}>{emptyCircle}</React.Fragment>)
        }
        let k = cyberAtt
        for (k; k <= 4; k++) {
            returnedDots.push(<React.Fragment key={k + 15}>{boxOutline}</React.Fragment>)
        }
        return returnedDots
    }

    const tenPointAttRetrun = (attribute) => {
        let returnedDots = []
        for (let i = 0; i < attribute; i++) {
            returnedDots.push(fullCircle)
        }
        let j = attribute
        for (j; j <= 9; j++) {
            returnedDots.push(emptyCircle)
        }
        return returnedDots
    }

    const moveDotReturn = (attribute) => {
        let returnedDots = []

        for (let i = 0; i < attribute; i++) {
            returnedDots.push(<React.Fragment key={i}>{fullCircle}</React.Fragment>)
        }
        let j = attribute
        for (j; j <= 4; j++) {
            returnedDots.push(<React.Fragment key={j + 5}>{emptyCircle}</React.Fragment>)
        }
        return returnedDots
    }

    return (
        <>
            <Grid item xs={12}><Item sx={{ fontSize: '1.3em', padding: 0 }}>Attributes</Item></Grid>
            <Grid item xs={4}>
                <Grid container spacing={1}>
                    <Grid item xs={4}>
                        <Item><AttributesDialog prop={'Strength'} /></Item>
                    </Grid>
                    <Grid item xs={8}>
                        <Item> {dotReturn(charDetail.strength, charDetail.cyber_strength)} </Item>
                    </Grid>
                    <Grid item xs={4}>
                        <Item><AttributesDialog prop={'Body'} /> </Item>
                    </Grid>
                    <Grid item xs={8}>
                        <Item>{dotReturn(charDetail.body, charDetail.cyber_body)}</Item>
                    </Grid>
                    <Grid item xs={4}>
                        <Item><AttributesDialog prop={'Reflexes'} /></Item>
                    </Grid>
                    <Grid item xs={8}>
                        <Item>{dotReturn(charDetail.reflexes, charDetail.cyber_reflexes)}</Item>
                    </Grid>
                    <Grid item xs={4}>
                        <Item><AttributesDialog prop={'Move'} /></Item>
                    </Grid>
                    <Grid item xs={8}>
                        <Item>{moveDotReturn(Math.ceil(charDetail.reflexes + charDetail.cyber_reflexes) / 2)}</Item>
                    </Grid>
                </Grid>
            </Grid>

            <Grid item xs={4}>
                <Grid container spacing={1}>
                    <Grid item xs={4}>
                        <Item><AttributesDialog prop={'Appearance'} /></Item>
                    </Grid>
                    <Grid item xs={8}>
                        <Item> {dotReturn(charDetail.appearance, charDetail.cyber_appearance)} </Item>
                    </Grid>
                    <Grid item xs={4}>
                        <Item><AttributesDialog prop={'Cool'} /></Item>
                    </Grid>
                    <Grid item xs={8}>
                        <Item> {dotReturn(charDetail.cool, charDetail.cyber_cool)} </Item>
                    </Grid>
                    <Grid item xs={4}>
                        <Item><AttributesDialog prop={'Street Cred'} /></Item>
                    </Grid>
                    <Grid item xs={8}>
                        <Item> {tenPointAttRetrun(charDetail.street_cred)} </Item>
                    </Grid>
                </Grid>
            </Grid>

            <Grid item xs={4}>
                <Grid container spacing={1}>
                    <Grid item xs={4}>
                        <Item><AttributesDialog prop={'Intelligence'} /></Item>
                    </Grid>
                    <Grid item xs={8}>
                        <Item> {dotReturn(charDetail.intelligence, charDetail.cyber_intelligence)} </Item>
                    </Grid>
                    <Grid item xs={4}>
                        <Item><AttributesDialog prop={'Willpower'} /></Item>
                    </Grid>
                    <Grid item xs={8}>
                        <Item> {tenPointAttRetrun(charDetail.willpower)} </Item>
                    </Grid>
                    <Grid item xs={4}>
                        <Item><AttributesDialog prop={'Technique'} /></Item>
                    </Grid>
                    <Grid item xs={8}>
                        <Item> {tenPointAttRetrun(charDetail.technique)} </Item>
                    </Grid>

                </Grid>
            </Grid>
        </>
    )
}

export default CharacterAttributes;