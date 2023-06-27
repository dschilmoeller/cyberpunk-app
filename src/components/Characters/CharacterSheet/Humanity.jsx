import React, { useState } from 'react';
import { Button } from '@mui/material';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import { useSelector, useDispatch } from 'react-redux';

// To Do: import charDetailProp correctly
// change characters to filled boxes and x'd boxes for style
function Humanity(charDetailProp) {
    const charStatus = useSelector(store => store.characterStatus)
    const permHumanityLoss = charDetailProp.charDetailProp.perm_humanity_loss
    const unhurtMarker = `\u2610`;
    const dispatch = useDispatch();
    const stunMarker = `\u2736`;
    const aggMarker = `\u2718`;

    const humanityBoxChanger = (e) => {
        if (e.target.innerText === unhurtMarker) {
            e.target.innerText = stunMarker
            dispatch({ type: "REMOVE_ONE_TEMP_HUMANITY" })
        } else if (e.target.innerText === stunMarker) {
            e.target.innerText = unhurtMarker
            dispatch({ type: "ADD_ONE_TEMP_HUMANITY" })
        }
    }

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
            humanityBoxes.push(<Grid item xs={1.2}><Item onClick={(e) => humanityBoxChanger(e)}>{humanityArray[i]}</Item></Grid>)
        }
        return humanityBoxes

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
            <Item sx={{ marginTop: 4.5 }}>Humanity</Item>
            <Grid container>
                {humanityBuilder()}
            </Grid>
        </>
    )
}

export default Humanity;