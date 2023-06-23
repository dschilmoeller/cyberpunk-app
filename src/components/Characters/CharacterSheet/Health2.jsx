import React, { useState } from 'react';
import { Button } from '@mui/material';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import { styled } from '@mui/material/styles';


function Health2() {
    const totalHealth = 12
    const [totalStun, setTotalStun] = useState(2)

    const unhurtMarker = `\u2610`;
    const stunMarker = `\u2736`;
    const lethalMarker = `\uFE45`;
    const aggMarker = `\u2718`;

    const healthBoxChanger = (e) => {
        if (e.target.innerText === unhurtMarker) {
            e.target.innerText = stunMarker
        } else if (e.target.innerText === stunMarker) {
            e.target.innerText = lethalMarker
        } else if (e.target.innerText === lethalMarker) {
            e.target.innerText = aggMarker
        } else

            e.target.innerText = unhurtMarker

    }

    const healthBuilder = (total) => {
        let healthBoxes = []
        let cyberBoxes = total - 10

        for (let i = 0; i < 10; i++) {
            if (cyberBoxes > i) {
                healthBoxes.push(
                    <>
                        <Grid item xs={2}><Item onClick={(e) => healthBoxChanger(e)}>{unhurtMarker}</Item></Grid>
                        <Grid item xs={2}><Item onClick={(e) => healthBoxChanger(e)}>{unhurtMarker}</Item></Grid>
                    </>
                )
            } else {
                healthBoxes.push(
                    <>
                        <Grid item xs={4}><Item onClick={(e) => healthBoxChanger(e)}>{unhurtMarker}</Item></Grid>
                    </>
                )
            }
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
                <Item>Health</Item>
                <Grid container>
                    {healthBuilder(totalHealth)}
                </Grid>
            </Grid>
        </>
    )
}

export default Health2;