import React from 'react';
import Grid from '@mui/material/Grid';
import { useSelector, useDispatch } from 'react-redux';
import Item from './Item';

import OtherAttributesDialog from '../../Modals/OtherAttributesDialog';

function Health() {
    const charStatus = useSelector((store) => store.characterStatus)
    const charCyber = useSelector(store => store.characterCyberDetail)
    // base health of 10 + health boxes created by cyberware
    const totalHealth = 10 + charStatus.current_cyberware_health_boxes

    const dispatch = useDispatch();

    // shorthand for different special characters
    const unhurtMarker = `\u2610`;
    const stunMarker = `\u2736`;
    const lethalMarker = `\uFE45`;
    const aggMarker = `\u2718`;

    // handles changing marks on character sheet, affects characterStatus reducer
    const healthBoxChanger = (e) => {
        if (e.target.innerText === unhurtMarker) {
            dispatch({ type: "ADD_STUN_WOUND" })
        } else if (e.target.innerText === stunMarker) {
            dispatch({ type: "ADD_LETHAL_WOUND" })
        } else if (e.target.innerText === lethalMarker) {
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
                healthBoxes.push(
                    <React.Fragment key={i + 50}>
                        <Grid item xs={2}><Item onClick={(e) => healthBoxChanger(e)}>{healthArray[healthArraySpot]}</Item></Grid>
                        <Grid item xs={2}><Item onClick={(e) => healthBoxChanger(e)}>{healthArray[healthArraySpot + 1]}</Item></Grid>
                    </React.Fragment>
                )
                if (healthArray[healthArraySpot] === stunMarker ||
                    healthArray[healthArraySpot] === lethalMarker ||
                    healthArray[healthArraySpot] === aggMarker) {
                    diePenaltySpot += 1
                }

                healthArraySpot += 2
            } else {
                healthBoxes.push(<Grid key={i + 100} item xs={4}><Item onClick={(e) => healthBoxChanger(e)}>{healthArray[healthArraySpot]}</Item></Grid>)
                if (healthArray[healthArraySpot] === stunMarker ||
                    healthArray[healthArraySpot] === lethalMarker ||
                    healthArray[healthArraySpot] === aggMarker) {
                    diePenaltySpot += 1
                }

                healthArraySpot += 1
            }

            // add die penalties; highlight as one goes down list.

            diePenaltySpot > i ?
                healthBoxes.push(<Grid key={i + 150} item xs={4}><Item sx={{ backgroundColor:'red', color:'aqua' }}>{painPenalty[i]}</Item></Grid>)
                : healthBoxes.push(<Grid key={i + 150} item xs={4}><Item>{painPenalty[i]}</Item></Grid>)
            // healthBoxes.push(<Grid key={i + 150} item xs={4}><Item>{painPenalty[i]}</Item></Grid>)

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