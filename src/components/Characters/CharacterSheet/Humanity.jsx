import React from 'react';
import Grid from '@mui/material/Grid';
import { useSelector, useDispatch } from 'react-redux';
import Item from './Item';

import OtherAttributesDialog from '../../Modals/OtherAttributesDialog';

// To Do: import charDetailProp correctly

function Humanity(charDetailProp) {
    const charStatus = useSelector(store => store.characterStatus)
    const permHumanityLoss = charDetailProp.charDetailProp.perm_humanity_loss
    const dispatch = useDispatch();
    const unhurtMarker = `\u2610`;
    const stunMarker = `\u2736`;
    const aggMarker = `\u2718`;

    const humanityArrayBuilder = (tempHumanityLoss, permHumanityLoss) => {
        let humanityArray = []
        for (let i = 0; i < permHumanityLoss; i++) {
            humanityArray.push(aggMarker)
        }
        for (let i = 0; i < tempHumanityLoss; i++) {
            humanityArray.push(stunMarker)
        }
        if (humanityArray.length < 40) {
            let remainder = 40 - (permHumanityLoss + tempHumanityLoss)
            for (let i = 0; i < remainder; i++) {
                humanityArray.push(unhurtMarker)
            }
        }
        return humanityArray;
    }


    const humanityBuilder = () => {
        let humanityArray = humanityArrayBuilder(charStatus.current_humanity_loss, permHumanityLoss)
        let humanityBoxes = []

        for (let i = 0; i < 40; i++) {
            humanityBoxes.push(<Grid key={i} item xs={1.2}><Item>{humanityArray[i]}</Item></Grid>)
        }
        return humanityBoxes
    }

    return (
        <>
            <Item><OtherAttributesDialog prop={'Humanity'} /></Item>
            <Grid container>
                {humanityBuilder()}
            </Grid>
        </>
    )
}

export default Humanity;