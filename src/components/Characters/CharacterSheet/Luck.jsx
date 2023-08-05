import React from 'react';
import Grid from '@mui/material/Grid';
import { useSelector, useDispatch } from 'react-redux';
import Item from './Item';
import SpecialModal from '../../Modals/SpecialModal';

function Luck(charDetailProp) {
    const charDetailLuck = charDetailProp.charDetailProp.max_luck
    const charStatus = useSelector(store => store.characterStatus)

    const dispatch = useDispatch();
    const unhurtMarker = `\u2610`;
    const aggMarker = `\u2718`;

    const luckBoxChanger = (e) => {
        if (e.target.innerText === unhurtMarker) {
            dispatch({ type: "REMOVE_ONE_LUCK" })
        } else if (e.target.innerText === aggMarker) {
            dispatch({ type: "ADD_ONE_LUCK" })
        }
    }

    const luckDamageBuilder = (usedLuck) => {
        let usedLuckArray = []
        for (let i = 0; i < usedLuck; i++) {
            usedLuckArray.push(aggMarker)
        }
        if (usedLuckArray.length < charDetailLuck) {
            let remainder = charDetailLuck - usedLuck
            for (let i = 0; i < remainder; i++) {
                usedLuckArray.push(unhurtMarker)
            }
        }
        return usedLuckArray
    }

    const luckBuilder = () => {
        let luckBoxes = []
        let luckArray = luckDamageBuilder(charStatus.current_luck_loss)
        for (let i = 0; i < charDetailLuck; i++) {
            luckBoxes.push(
                <React.Fragment key={i}>
                    <Grid item xs={2.4}><Item onClick={(e) => luckBoxChanger(e)}>{luckArray[i]}</Item></Grid>
                </React.Fragment>
            )
        }
        return luckBoxes
    }

    return (
        <>
            <Item><SpecialModal prop={'Luck'} /></Item>
            <Grid container>
                {luckBuilder()}
            </Grid>
        </>
    )
}

export default Luck;