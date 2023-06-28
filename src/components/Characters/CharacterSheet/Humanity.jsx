import React from 'react';
import Grid from '@mui/material/Grid';
import { useSelector, useDispatch } from 'react-redux';
import Item from './Item';

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
            dispatch({ type: "REMOVE_ONE_TEMP_HUMANITY" })
        } else if (e.target.innerText === stunMarker) {
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
            humanityBoxes.push(<Grid key={i} item xs={1.2}><Item onClick={(e) => humanityBoxChanger(e)}>{humanityArray[i]}</Item></Grid>)
        }
        return humanityBoxes

    }

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