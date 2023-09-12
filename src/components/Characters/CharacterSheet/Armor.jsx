import React from 'react';
import Grid from '@mui/material/Grid';
import { useSelector, useDispatch } from 'react-redux';
import Item from './Item';

import OtherAttributesDialog from '../../Modals/OtherAttributesDialog';

import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import AcUnitIcon from '@mui/icons-material/AcUnit';

function Armor() {
    
    const charStatus = useSelector(store => store.characterStatus)
    const charDetailArmor = charStatus.current_armor_quality + charStatus.current_shield_quality + charStatus.current_cyberware_armor_quality

    const dispatch = useDispatch();
    const unhurtMarker = <CircleOutlinedIcon />;
    const aggMarker = <AcUnitIcon />;

    // add dispatch to update current_armor
    const armorBoxChanger = (armorStatus) => {
        if (armorStatus === 'undamaged') {
            dispatch({type: "REMOVE_ONE_ARMOR"})
        } else if (armorStatus === 'ablated') {
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
            let armorStatus
            if (armorArray[i] === unhurtMarker) {
                armorStatus = 'undamaged'
            } else if (armorArray[i] === aggMarker) {
                armorStatus = 'ablated'
            }
            armorBoxes.push(
                <React.Fragment key={i}>
                <Grid item xs={2.4}><Item onClick={() => armorBoxChanger(armorStatus)}>{armorArray[i]}</Item></Grid>
                </React.Fragment>
            )
        }
        return armorBoxes
    }

    return (
        <>
            <Item><OtherAttributesDialog prop={'Armor'} /></Item>
            <Grid container>
                {armorBuilder()}
            </Grid>
        </>
    )
}

export default Armor;