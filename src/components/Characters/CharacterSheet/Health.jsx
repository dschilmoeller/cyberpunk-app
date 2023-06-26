import React, { useState } from 'react';
import { Button } from '@mui/material';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { useSelector, useDispatch } from 'react-redux';
import { styled } from '@mui/material/styles';


function Health2() {
    const charDetail = useSelector((store) => store.characterDetail[0])
    const totalHealth = charDetail.max_health
    const charStatus = useSelector(store => store.characterStatus)
    
    const dispatch = useDispatch();

    const unhurtMarker = `\u2610`;
    const stunMarker = `\u2736`;
    const lethalMarker = `\uFE45`;
    const aggMarker = `\u2718`;

    // these will eventually be pulled from the characterStatus store
    const [stunWounds, setStunWounds] = useState(charStatus.current_stun)
    const [lethalWounds, setLethalWounds] = useState(charStatus.current_lethal)
    const [aggWounds, setAggWounds] = useState(charStatus.current_agg)

    const healthBoxChanger = (e) => {
        if (e.target.innerText === unhurtMarker) {
            e.target.innerText = stunMarker
            dispatch({type: "ADD_STUN_WOUND"})
        } else if (e.target.innerText === stunMarker) {
            e.target.innerText = lethalMarker
            dispatch({type: "ADD_LETHAL_WOUND"})
        } else if (e.target.innerText === lethalMarker) {
            e.target.innerText = aggMarker
            dispatch({type: "ADD_AGG_WOUND"})
        } else {
            e.target.innerText = unhurtMarker
            dispatch({type: "REMOVE_WOUND"})
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
        // conditional if pain editor is present.
        // painPenalty = [0, 0, 0, 0, -1, -1, -2, -2, -3, -5]
        
        let healthArray = woundBuilder(charStatus.current_stun, charStatus.current_lethal, charStatus.current_agg)
        
        let healthArraySpot = 0

        let healthBoxes = []
        let cyberBoxes = total - 10

        for (let i = 0; i < 10; i++) {
            healthBoxes.push(<Grid item xs={4}><Item>{healthWords[i]}</Item></Grid>)
            if (cyberBoxes > i) {
                healthBoxes.push(
                    <>
                        <Grid item xs={2}><Item onClick={(e) => healthBoxChanger(e)}>{healthArray[healthArraySpot]}</Item></Grid>
                        <Grid item xs={2}><Item onClick={(e) => healthBoxChanger(e)}>{healthArray[healthArraySpot + 1]}</Item></Grid>
                    </>
                )
                healthArraySpot += 2
            } else {
                healthBoxes.push(<Grid item xs={4}><Item onClick={(e) => healthBoxChanger(e)}>{healthArray[healthArraySpot]}</Item></Grid>)
                healthArraySpot += 1
            }
            healthBoxes.push(<Grid item xs={4}><Item>{painPenalty[i]}</Item></Grid>)

        }

        return healthBoxes
    }

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    return (
        <>
            <Grid item xs={6}>
                <Grid container>
                    <Grid item xs={12}><Item>Health</Item></Grid>
                    <Grid item xs={4}><Item>Status</Item></Grid>
                    <Grid item xs={4}><Item>Marks</Item></Grid>
                    <Grid item xs={4}><Item>Die Penalty</Item></Grid>

                </Grid>

                <Grid container>
                    {charStatus.char_id ? healthBuilder(totalHealth) : <></>}
                </Grid>
            </Grid>
        </>
    )
}

export default Health2;