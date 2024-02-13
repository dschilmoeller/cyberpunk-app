import React from 'react';
import Grid from '@mui/material/Grid';
import { useSelector, useDispatch } from 'react-redux';
import Item from './Item';
import { Button } from '@mui/material';
import OtherAttributesDialog from '../../Modals/OtherAttributesDialog';

import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import AcUnitIcon from '@mui/icons-material/AcUnit';

function Luck(charDetailProp) {
    const charDetailLuck = charDetailProp.charDetailProp.max_luck
    const charStatus = useSelector(store => store.characterStatus)

    const dispatch = useDispatch();
    const unhurtMarker = <CircleOutlinedIcon />;
    const aggMarker = <AcUnitIcon />;

    // const luckBoxChanger = (luckStatus) => {
    //     if (luckStatus === 'lucky') {
    //         dispatch({ type: "REMOVE_ONE_LUCK" })
    //     } else if (luckStatus === 'noDice') {
    //         dispatch({ type: "ADD_ONE_LUCK" })
    //     }
    // }

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
                    {/* <Grid item xs={2.4}><Item onClick={() => luckBoxChanger(luckStatus)}>{luckArray[i]}</Item></Grid> */}
                    <Grid item xs={2.4}><Item>{luckArray[i]}</Item></Grid>
                </React.Fragment>
            )
        }
        return luckBoxes
    }

    const useOneLuck = () => {
        if (charStatus.current_luck_loss < charDetailLuck) {
            dispatch({ type: "REMOVE_ONE_LUCK" })
        } else {
            console.log(`You're out of luck!`);
        }
    }

    const recoverOneLuck = () => {
        if (charStatus.current_luck_loss > 0) {
            dispatch({ type: "ADD_ONE_LUCK" })
        } else {
            console.log(`You're full up!`);
        }

    }

    return (
        <>
            <Item><OtherAttributesDialog prop={'Luck'} /></Item>
            <Grid container>
                <Grid item xs={6}>
                    <Item>
                        <Button variant='contained' fullWidth sx={{lineHeight: 1, height: '125%', fontSize: {xs: '0.6em', md: '0.9em'}}} color='secondary' onClick={() => useOneLuck()} >Use Luck</Button>
                    </Item>
                </Grid>
                <Grid item xs={6}>
                    <Item>
                        <Button variant='contained' fullWidth sx={{lineHeight: 1, height: '125%', fontSize: {xs: '0.6em', md: '0.9em'}}} color='primary' onClick={() => recoverOneLuck()}>Recover Luck</Button>
                    </Item>
                </Grid>
                <Grid container>
                    {luckBuilder()}
                </Grid>
                <Grid item xs={12}><Item sx={{opacity:0}}></Item></Grid>
            </Grid>
        </>
    )
}

export default Luck;