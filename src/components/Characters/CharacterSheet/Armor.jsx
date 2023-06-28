import React from 'react';
import Grid from '@mui/material/Grid';
import { useSelector, useDispatch } from 'react-redux';
import Item from './Item';

function Armor(charDetailProp) {
    
    const charDetailArmor = charDetailProp.charDetailProp.max_armor
    const charStatus = useSelector(store => store.characterStatus)
    
    const dispatch = useDispatch();
    const unhurtMarker = `\u2610`;
    const aggMarker = `\u2718`;

    // add dispatch to update current_armor
    const armorBoxChanger = (e) => {
        if (e.target.innerText === unhurtMarker) {
            dispatch({type: "REMOVE_ONE_ARMOR"})
        } else if (e.target.innerText === aggMarker) {
            dispatch({type: "ADD_ONE_ARMOR"})
        }
    }

    const armorDamageBuilder = (ablated) => {
        let ablatedArray = []
        for (let i = 0; i < ablated; i++) {
            ablatedArray.push(aggMarker)
        }
        
        if (ablatedArray.length < charDetailArmor) {
            let remainder = charDetailArmor - ablated
            for (let i = 0; i < remainder; i++) {
                ablatedArray.push(unhurtMarker)
            }
        }
        return ablatedArray
    }

    const armorBuilder = () => {
        let armorBoxes = []
        let armorArray = armorDamageBuilder(charStatus.current_armor_loss)
        for (let i = 0; i < charDetailArmor; i++ ) {
            armorBoxes.push(
                <React.Fragment key={i}>
                <Grid item xs={2.4}><Item onClick={(e) => armorBoxChanger(e)}>{armorArray[i]}</Item></Grid>
                </React.Fragment>
            )
        }
        return armorBoxes
    }

    return (
        <>
            <Item >Armor</Item>
            <Grid container>
                {armorBuilder()}
            </Grid>
        </>
    )
}

export default Armor;