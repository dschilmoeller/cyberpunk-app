import React, { useState } from 'react';
import { Button } from '@mui/material';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';

// To Do: import charDetailProp correctly
// change characters to filled boxes and x'd boxes for style
function Humanity(charDetailProp) {

    const unhurtMarker = `\u2610`;
    const stunMarker = `\u2736`;
    const lethalMarker = `\uFE45`;

    // loop through perm humanity loss, creating a 1 for each and adding to current humanity (b)
    // loop through temp humanity loss, creating a 2 for each and adding to current humanity (c)
    // finally loop, with i starting at total of perm + temp humanity loss, and add 0s until 40 is reached.
    // display 1 as perm loss, 2 as temp loss, and 0 as unused humanity.
    const permHumanityLoss = 4
    const tempHumanityLoss = 8
    const currentHumanityArray = []

    const humanityBuilder = () => {
        for (let i = 0; i < permHumanityLoss; i++) {
            currentHumanityArray.push(1)
        }

        for (let i = 0; i < tempHumanityLoss; i++) {
            currentHumanityArray.push(2)
        }
        let currentHumanityLost = (permHumanityLoss + tempHumanityLoss)
        for (let i = currentHumanityLost; i < 40; i++) {
            currentHumanityArray.push(0)
        }
    }

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    humanityBuilder();

    return (
        <>
            {currentHumanityArray.map((item, i) => {
                if (item === 0) {
                    return <Grid item xs={.6} key={i}><Item>{unhurtMarker}</Item></Grid>
                }
                if (item === 1) {
                    return <Grid item xs={.6} key={i}><Item>{stunMarker}</Item></Grid>
                }
                if (item === 2) {
                    return <Grid item xs={.6} key={i}><Item>{lethalMarker}</Item></Grid>
                }
            })}
        </>
    )
}

export default Humanity;