import React from 'react';
import Grid from '@mui/material/Grid';
import { useSelector, useDispatch } from 'react-redux';
import Item from './Item';

import OtherAttributesDialog from '../../Modals/OtherAttributesDialog';

import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import CancelIcon from '@mui/icons-material/Cancel';

function Humanity(charDetailProp) {
    const temp_humanity_loss = charDetailProp.charDetailProp.temp_humanity_loss
    const perm_humanity_loss = charDetailProp.charDetailProp.perm_humanity_loss

    const unhurtMarker = <CircleOutlinedIcon />
    const stunMarker = <CloseOutlinedIcon />
    const aggMarker = <CancelIcon />;


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
        let humanityArray = humanityArrayBuilder(temp_humanity_loss, perm_humanity_loss)
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
                {/* {humanityBuilder()} */}
                <Grid item xs={12}><Item sx={{color: 'white'}}>Current Humanity: {40 - (temp_humanity_loss + perm_humanity_loss)} / 40</Item></Grid>
            </Grid>
        </>
    )
}

export default Humanity;