import React from 'react';
import Grid from '@mui/material/Grid';
import { useSelector, useDispatch } from 'react-redux';
import Item from './Item';

import OtherAttributesDialog from '../../Modals/OtherAttributesDialog';

import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import HorizontalRuleOutlinedIcon from '@mui/icons-material/HorizontalRuleOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

function Health() {
    const charStatus = useSelector((store) => store.characterStatus)
    const charCyber = useSelector(store => store.characterCyberDetail)
    // base health of 10 + health boxes created by cyberware
    const totalHealth = 10 + charStatus.current_cyberware_health_boxes

    const dispatch = useDispatch();

    // shorthand for different special characters
    const unhurtMarker = <CircleOutlinedIcon />
    const stunMarker = <HorizontalRuleOutlinedIcon />;
    const lethalMarker = <CloseOutlinedIcon />
    const aggMarker = <AcUnitIcon />;

    // handles changing marks on character sheet, affects characterStatus reducer
    const healthBoxChanger = (b) => {
        if (b === 'unhurt') {
            dispatch({ type: "ADD_STUN_WOUND" })
        } else if (b === 'stun') {
            dispatch({ type: "ADD_LETHAL_WOUND" })
        } else if (b === 'lethal') {
            dispatch({ type: "ADD_AGG_WOUND" })
        } else {
            dispatch({ type: "REMOVE_WOUND" })
        }
    }

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
        charCyber.map(cyberware => {
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
                        <Grid item xs={2}><Item onClick={() => healthBoxChanger(woundtype)}>{healthArray[healthArraySpot]}</Item></Grid>
                        <Grid item xs={2}><Item onClick={() => healthBoxChanger(woundtype2)}>{healthArray[healthArraySpot + 1]}</Item></Grid>
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

                healthBoxes.push(<Grid key={i + 100} item xs={4}><Item onClick={() => healthBoxChanger(woundtype)}>{healthArray[healthArraySpot]}</Item></Grid>)
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

    return (
        <>
            <Grid item xs={4}>
                <Grid container>
                    <Grid item xs={12}><Item><OtherAttributesDialog prop={'Health'} /></Item></Grid>
                    <Grid item xs={4}><Item><OtherAttributesDialog prop={'Status'} /></Item></Grid>
                    <Grid item xs={4}><Item><OtherAttributesDialog prop={'Marks'} /></Item></Grid>
                    <Grid item xs={4}><Item><OtherAttributesDialog prop={'Die Penalty'} /></Item></Grid>

                    {charStatus.char_id ? healthBuilder(totalHealth) : <></>}
                </Grid>
            </Grid>
        </>
    )
}

export default Health;