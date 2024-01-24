import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Grid from '@mui/material/Grid';
import { Button } from '@mui/material';
import Item from './Item';

import OtherAttributesDialog from '../../Modals/OtherAttributesDialog';

import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import HorizontalRuleOutlinedIcon from '@mui/icons-material/HorizontalRuleOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

function Health() {
    const charStatus = useSelector((store) => store.characterStatus)
    const characterCyberware = useSelector(store => store.characterGear.cyberware)
    // base health of 10 + health boxes created by cyberware
    const totalHealth = 10 + charStatus.current_cyberware_health_boxes
    const totalDamage = charStatus.current_stun + charStatus.current_lethal + charStatus.current_agg

    const dispatch = useDispatch();

    // shorthand for different special characters
    const unhurtMarker = <CircleOutlinedIcon />
    const stunMarker = <HorizontalRuleOutlinedIcon
        sx={{ backgroundColor: '#ce93d8', color: 'black' }}
    />;
    const lethalMarker = <CloseOutlinedIcon
        sx={{ backgroundColor: '#90caf9', color: 'black' }}
    />
    const aggMarker = <AcUnitIcon
        sx={{ backgroundColor: '#f44336', color: 'black' }}
    />;

    // handles changing marks on character sheet, affects characterStatus reducer
    // const healthBoxChanger = (b) => {
    //     if (b === 'unhurt') {
    //         dispatch({ type: "ADD_STUN_WOUND" })
    //     } else if (b === 'stun') {
    //         dispatch({ type: "ADD_LETHAL_WOUND" })
    //     } else if (b === 'lethal') {
    //         dispatch({ type: "ADD_AGG_WOUND" })
    //     } else {
    //         dispatch({ type: "REMOVE_WOUND" })
    //     }
    // }

    // creates array of current wounds, starting with agg, then lethal, then stun, and fills remainder with unhurt boxes

    const woundBuilder = (stunWound, lethalWound, aggWound) => {
        let woundArray = []
        for (let i = 0; i < aggWound; i++) {
            woundArray.push(aggMarker)
        }
        for (let i = 0; i < lethalWound; i++) {
            woundArray.push(lethalMarker)
        }
        for (let i = 0; i < stunWound; i++) {
            woundArray.push(stunMarker)
        }
        if (woundArray.length < totalHealth) {
            let remainder = (totalHealth - (aggWound + lethalWound + stunWound))
            for (let i = 0; i < remainder; i++)
                woundArray.push(unhurtMarker)
        }

        return woundArray
    }

    const healthBuilder = (total) => {
        let healthWords = ['Bruised', 'Badly Bruised', 'Hurt', 'Badly Hurt', 'Injured', 'Wounded', 'Mauled', 'Seriously Mauled', 'Crippled', 'Incapacitated']
        // create standard wound penalties
        let painPenalty = [0, 0, -1, -1, -2, -2, -3, -3, -5, -8]
        // check for presence of equipped pain editor, and if there is one change die penalties
        characterCyberware.map(cyberware => {
            if (cyberware.name === 'Pain Editor' && cyberware.equipped === true) {
                painPenalty = [0, 0, 0, 0, -1, -1, -2, -2, -3, -4]
            }
        })

        let healthArray = woundBuilder(charStatus.current_stun, charStatus.current_lethal, charStatus.current_agg)

        let healthArraySpot = 0
        let diePenaltySpot = 0

        let healthBoxes = []
        let cyberBoxes = total - 10

        for (let i = 0; i < 10; i++) {
            healthBoxes.push(
                <Grid key={i} item xs={4}><Item><OtherAttributesDialog prop={healthWords[i]} /></Item></Grid>
            )
            if (cyberBoxes > i) {
                let woundtype = ''
                if (healthArray[healthArraySpot] === unhurtMarker) {
                    woundtype = 'unhurt'
                } else if (healthArray[healthArraySpot] === stunMarker) {
                    woundtype = 'stun'
                } else if (healthArray[healthArraySpot] === lethalMarker) {
                    woundtype = 'lethal'
                } else if (healthArray[healthArraySpot] === aggMarker) {
                    woundtype = 'agg'
                } else {
                    console.log(`Error!`);
                }
                let woundtype2 = ''
                if (healthArray[healthArraySpot + 1] === unhurtMarker) {
                    woundtype2 = 'unhurt'
                } else if (healthArray[healthArraySpot + 1] === stunMarker) {
                    woundtype2 = 'stun'
                } else if (healthArray[healthArraySpot + 1] === lethalMarker) {
                    woundtype2 = 'lethal'
                } else if (healthArray[healthArraySpot + 1] === aggMarker) {
                    woundtype2 = 'agg'
                } else {
                    console.log(`Error!`);
                }

                healthBoxes.push(
                    <React.Fragment key={i + 50}>
                        {/* <Grid item xs={2}><Item onClick={() => healthBoxChanger(woundtype)}>{healthArray[healthArraySpot]}</Item></Grid>
                        <Grid item xs={2}><Item onClick={() => healthBoxChanger(woundtype2)}>{healthArray[healthArraySpot + 1]}</Item></Grid> */}
                        <Grid item xs={2}><Item>{healthArray[healthArraySpot]}</Item></Grid>
                        <Grid item xs={2}><Item>{healthArray[healthArraySpot + 1]}</Item></Grid>
                    </React.Fragment>
                )

                if (healthArray[healthArraySpot] === stunMarker ||
                    healthArray[healthArraySpot] === lethalMarker ||
                    healthArray[healthArraySpot] === aggMarker) {
                    diePenaltySpot += 1
                }

                healthArraySpot += 2
            } else {
                let woundtype
                if (healthArray[healthArraySpot] === unhurtMarker) {
                    woundtype = 'unhurt'
                } else if (healthArray[healthArraySpot] === stunMarker) {
                    woundtype = 'stun'
                } else if (healthArray[healthArraySpot] === lethalMarker) {
                    woundtype = 'lethal'
                } else if (healthArray[healthArraySpot] === aggMarker) {
                    woundtype = 'agg'
                } else {
                    console.log(`Error!`);
                }

                healthBoxes.push(<Grid key={i + 100} item xs={4}>
                    {/* <Item onClick={() => healthBoxChanger(woundtype)}>{healthArray[healthArraySpot]}</Item></Grid>) */}
                    <Item>{healthArray[healthArraySpot]}</Item></Grid>)
                if (healthArray[healthArraySpot] === stunMarker ||
                    healthArray[healthArraySpot] === lethalMarker ||
                    healthArray[healthArraySpot] === aggMarker) {
                    diePenaltySpot += 1
                }

                healthArraySpot += 1
            }

            // add die penalties; highlight as one goes down list.
            diePenaltySpot > i ?
                healthBoxes.push(<Grid key={i + 150} item xs={4}><Item sx={{ backgroundColor: '#E11845', color: 'aqua' }}>{painPenalty[i]}</Item></Grid>)
                :
                healthBoxes.push(<Grid key={i + 150} item xs={4}><Item>{painPenalty[i]}</Item></Grid>)
        }

        return healthBoxes
    }

    // need two kinds of wounds - overwrite and new
    // if stun wounds == 0 -> new
    // else if stun wounds 1+ -> replace
    // agg will probably need 3? replace stun, replace lethal?
    // prevent sending dam when full or healing when empty to avoid confusion.

    // total health = 10
    // add 1 stun - if total damages < 10 => +1 stun
    // add 1 stun - if total damage >= 10 => move to lethal add track
    // add 1 lethal - if total damage < 10 => +1 lethal
    // add 1 lethal - if total damage >= 10 => move to agg add track
    // add 1 agg - if total damage < 10 => +1 agg
    // add 1 agg - if total damage >= 10 => Char dead (do nothing)

    // combine into single function (dam_type, heal/harm)

    const woundHandler = (damageType, healOrHarm) => {
        switch (damageType) {
            case 'stun':
                handleStun(healOrHarm)
                break;
            case 'lethal':
                handleLethal(healOrHarm)
                break;
            case 'agg':
                handleAgg(healOrHarm)
                break;
            default:
                console.log(`Error applying damage`);
                break;
        }
    }

    const handleStun = (healOrHarm) => {
        switch (healOrHarm) {
            case 'harm':
                if (totalDamage < totalHealth) {
                    dispatch({ type: "ADD_STUN_WOUND" })
                } else if (totalDamage >= totalHealth) {
                    handleLethal(healOrHarm)
                } else {
                    console.log(`Error applying STUN damage`);
                }
                break;
            case 'heal':
                if (charStatus.current_stun > 0){
                    dispatch({ type: "REMOVE_STUN_WOUND"})
                }
        }
    }

    const handleLethal = (healOrHarm) => {
        switch (healOrHarm) {
            case 'harm':
                if (totalDamage < totalHealth) {
                    dispatch({ type: "ADD_LETHAL_WOUND" })
                    if (charStatus.current_stun > 0){
                        dispatch({ type: "REMOVE_STUN_WOUND"})
                    }
                } else if (totalDamage >= totalHealth) {
                    handleAgg(healOrHarm)
                } else {
                    console.log(`Error applying LETHAL damage`);
                }
                break;
            case 'heal':
                if (charStatus.current_lethal > 0){
                    dispatch({ type: "REMOVE_LETHAL_WOUND"})
                }
        }
    }

    const handleAgg = (healOrHarm) => {
        switch (healOrHarm) {
            case 'harm':
                if (totalDamage < totalHealth) {
                    dispatch({ type: "ADD_AGG_WOUND" })
                    if (charStatus.current_lethal > 0) {
                        dispatch({ type: "REMOVE_LETHAL_WOUND"})
                    }
                } else {
                    console.log(`Error applying AGG damage OR damage track filled`);
                    // toast - 'You dead m8'
                }
                break;
            case 'heal':
                if (charStatus.current_agg > 0){
                    dispatch({ type: "REMOVE_AGG_WOUND"})
                }
        }
    }

    return (
        <>
            <Grid item xs={4}>
                <Grid container>
                    <Grid item xs={12}><Item><OtherAttributesDialog prop={'Health'} /></Item></Grid>
                    <Grid item xs={4}><Item><Button sx={{ height: '125%'}} fullWidth color='secondary' variant='contained' onClick={() => woundHandler('stun', 'harm')}>Stun</Button></Item></Grid>
                    <Grid item xs={4}><Item><Button sx={{ height: '125%'}} fullWidth color='primary' variant='contained' onClick={() => woundHandler('lethal', 'harm')}>Lethal</Button></Item></Grid> 
                    <Grid item xs={4}><Item><Button sx={{ height: '125%'}} fullWidth color='error' variant='contained' onClick={() => woundHandler('agg', 'harm')}>Agg</Button></Item></Grid>
                    <Grid item xs={4}><Item><OtherAttributesDialog prop={'Status'} /></Item></Grid>
                    <Grid item xs={4}><Item><OtherAttributesDialog prop={'Marks'} /></Item></Grid>
                    <Grid item xs={4}><Item><OtherAttributesDialog prop={'Die Penalty'} /></Item></Grid>

                    {charStatus.char_id ? healthBuilder(totalHealth) : <></>}

                    <Grid item xs={4} ><Item><Button size='small' sx={{ height: '125%'}} fullWidth variant='contained' color='secondary' onClick={() => woundHandler('stun', 'heal')}>Heal Stun</Button></Item></Grid>
                    <Grid item xs={4}><Item><Button size='small' sx={{ height: '125%'}} fullWidth variant='contained' onClick={() => woundHandler('lethal', 'heal')}>Heal Lethal</Button></Item></Grid>
                    <Grid item xs={4}><Item><Button size='small' sx={{ height: '125%'}} fullWidth variant='contained' color='error' onClick={() => woundHandler('agg', 'heal')}>Heal Agg</Button></Item></Grid>
                </Grid>
            </Grid>
        </>
    )

}

export default Health;