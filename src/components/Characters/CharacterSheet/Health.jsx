import React from 'react';
import Grid from '@mui/material/Grid';
import { useSelector, useDispatch } from 'react-redux';
import Item from './Item';
import SpecialModal from '../../Modals/SpecialModal';
import OtherAttributesDialog from '../../Modals/OtherAttributesDialog';

function Health() {
    const charStatus = useSelector((store) => store.characterStatus)
    const charCyber = useSelector(store => store.characterCyberDetail)
    const totalHealth = 10 + charStatus.current_cyberware_health_boxes

    const dispatch = useDispatch();

    const unhurtMarker = `\u2610`;
    const stunMarker = `\u2736`;
    const lethalMarker = `\uFE45`;
    const aggMarker = `\u2718`;

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
        let painPenalty = [0, 0, -1, -1, -2, -2, -3, -3, -5, -10]
        charCyber.map(cyberware => {
            if (cyberware.name === 'Pain Editor' && cyberware.equipped === true) {
                painPenalty = [0, 0, 0, 0, -1, -1, -2, -2, -3, -5]
            }
        })
        
        let healthArray = woundBuilder(charStatus.current_stun, charStatus.current_lethal, charStatus.current_agg)

        let healthArraySpot = 0

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
                healthArraySpot += 2
            } else {
                healthBoxes.push(<Grid key={i + 100} item xs={4}><Item onClick={(e) => healthBoxChanger(e)}>{healthArray[healthArraySpot]}</Item></Grid>)
                healthArraySpot += 1
            }
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