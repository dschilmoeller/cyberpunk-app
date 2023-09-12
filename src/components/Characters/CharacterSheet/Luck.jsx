import React from 'react';
import Grid from '@mui/material/Grid';
import { useSelector, useDispatch } from 'react-redux';
import Item from './Item';

import OtherAttributesDialog from '../../Modals/OtherAttributesDialog';

import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import AcUnitIcon from '@mui/icons-material/AcUnit';

function Luck(charDetailProp) {
    const charDetailLuck = charDetailProp.charDetailProp.max_luck
    const charStatus = useSelector(store => store.characterStatus)

    const dispatch = useDispatch();
    const unhurtMarker = <CircleOutlinedIcon />;
    const aggMarker = <AcUnitIcon />;

    const luckBoxChanger = (luckStatus) => {
        if (luckStatus === 'lucky') {
            dispatch({ type: "REMOVE_ONE_LUCK" })
        } else if (luckStatus === 'noDice') {
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
            let luckStatus
            if (luckArray[i] === unhurtMarker) {
                luckStatus = 'lucky'
            } else if (luckArray[i] === aggMarker) {
                luckStatus = 'noDice'
            }

            luckBoxes.push(
                <React.Fragment key={i}>
                    <Grid item xs={2.4}><Item onClick={() => luckBoxChanger(luckStatus)}>{luckArray[i]}</Item></Grid>
                </React.Fragment>
            )
        }
        return luckBoxes
    }

    return (
        <>
            <Item><OtherAttributesDialog prop={'Luck'} /></Item>
            <Grid container>
                {luckBuilder()}
            </Grid>
        </>
    )
}

export default Luck;