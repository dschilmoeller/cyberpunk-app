import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Grid from '@mui/material/Grid';
import Item from '../CharacterSheet/Item';
import SpecialModal from '../../Modals/SpecialModal';


export default function AdvancementOther() {

    const dispatch = useDispatch();
    const advancementDetails = useSelector((store) => store.advancementDetail);

    const unhurtMarker = `\u2610`;
    const stunMarker = `\u2736`;
    const aggMarker = `\u2718`;

    const luckBuilder = () => {
        let luckBoxes = []
        for (let i = 0; i < advancementDetails.max_luck; i++) {
            luckBoxes.push(
                <React.Fragment key={i}>
                    <Grid item xs={2.4}><Item>{unhurtMarker}</Item></Grid>
                </React.Fragment>
            )
        }
        return luckBoxes
    }

    const luckExpReturn = () => {
        return (advancementDetails.max_luck * 2) + ' XP'
    }

    const addLuck = () => {
        let increaseLuckCost = advancementDetails.max_luck * 2
        dispatch({ type: "INCREASE_LUCK", payload: { newLuck: (advancementDetails.max_luck + 1), increaseLuckCost } })
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
        let humanityArray = humanityArrayBuilder(advancementDetails.current_humanity_loss, advancementDetails.perm_humanity_loss)
        let humanityBoxes = []

        for (let i = 0; i < 40; i++) {
            humanityBoxes.push(<Grid key={i} item xs={1.2}><Item>{humanityArray[i]}</Item></Grid>)
        }
        return humanityBoxes
    }

    const restoreTemporaryHumanity = () => {
        dispatch({ type: "REMOVE_TEMP_HUMANITY_LOSS", payload: advancementDetails.current_humanity_loss - 1 })
    }

    return (<>
        <h1>Other Traits</h1>
        <Grid container>

            <Grid item xs={6}>
                <Grid container>
                    <Grid item xs={12}><Item><SpecialModal prop={'Luck'} /></Item></Grid>
                    <Grid item xs={12}>
                        {advancementDetails.max_luck < 10 ? <Item sx={{ cursor: 'pointer' }} onClick={() => addLuck()}>Increase Luck: {luckExpReturn()} </Item>
                            :
                            <Item>Maximum Luck Achieved!</Item>}

                    </Grid>
                    {luckBuilder()}
                </Grid>
            </Grid>

            <Grid item xs={6}>
                <Grid container>
                    <Grid item xs={12}><Item><SpecialModal prop={'Humanity'} /></Item></Grid>
                    <Grid item xs={12}>
                        {advancementDetails.current_humanity_loss > 0 ?
                            <Item sx={{ cursor: 'pointer' }} onClick={() => restoreTemporaryHumanity()}>Restore Temporary Humanity: 1 XP</Item>
                            : <Item>Remove Cyberware to restore additional humanity</Item>}
                    </Grid>
                    {humanityBuilder()}
                </Grid>
            </Grid>

        </Grid>
    </>)
}