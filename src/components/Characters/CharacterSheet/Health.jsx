import React, { useState } from 'react';
import { Button } from '@mui/material';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import { styled } from '@mui/material/styles';

function Health() {

    const unhurtMarker = `\u2610`;
    const stunMarker = `\u2736`;
    const lethalMarker = `\uFE45`;
    const aggMarker = `\u2718`;

    // State for baseline boxes
    const [bruisedBox, setBruisedBox] = useState(`\u2610`)
    const [badlyBruisedBox, setBadlyBruisedBox] = useState(`\u2610`)
    const [hurtBox, setHurtBox] = useState(`\u2610`)
    const [badlyHurtBox, setBadlyHurtBox] = useState(`\u2610`)
    const [injuredBox, setInjuredBox] = useState(`\u2610`)
    const [woundedBox, setWoundedBox] = useState(`\u2610`)
    const [mauledBox, setMauledBox] = useState(`\u2610`)
    const [badlyMauledBox, setBadlyMauledBox] = useState(`\u2610`)
    const [crippledBox, setCrippledBox] = useState(`\u2610`)
    const [incapacitatedBox, setIncapacitatedBox] = useState(`\u2610`)

    // state for determining whether cyberware boxes show up

    // state for cyberware boxes

    // handles character cycling for boxes.
    // add dispatch for updating current_stun/lethal/agg in reducer? Or just update DB every time?
    const healthBoxChanger = (incoming) => {
        switch (incoming) {
            case `\u2610`:
                return stunMarker
            case `\u2736`:
                return lethalMarker
            case `\uFE45`:
                return aggMarker
            case `\u2718`:
                return unhurtMarker
        }
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
                    <Grid item xs={4}><Item>Bruised</Item></Grid>
                    <Grid item xs={4}><Item onClick={() => setBruisedBox(healthBoxChanger(bruisedBox))}>{bruisedBox}</Item></Grid>
                    <Grid item xs={4}><Item>-0</Item></Grid>
                    <Grid item xs={4}><Item>Badly Bruised</Item></Grid>
                    <Grid item xs={4}><Item onClick={() => setBadlyBruisedBox(healthBoxChanger(badlyBruisedBox))}>{badlyBruisedBox}</Item></Grid>
                    <Grid item xs={4}><Item>-0</Item></Grid>
                    <Grid item xs={4}><Item>Hurt</Item></Grid>
                    <Grid item xs={4}><Item onClick={() => setHurtBox(healthBoxChanger(hurtBox))}>{hurtBox}</Item></Grid>
                    <Grid item xs={4}><Item>-1</Item></Grid>
                    <Grid item xs={4}><Item>Badly Hurt</Item></Grid>
                    <Grid item xs={4}><Item onClick={() => setBadlyHurtBox(healthBoxChanger(badlyHurtBox))}>{badlyHurtBox}</Item></Grid>
                    <Grid item xs={4}><Item>-1</Item></Grid>
                    <Grid item xs={4}><Item>Injured</Item></Grid>
                    <Grid item xs={4}><Item onClick={() => setInjuredBox(healthBoxChanger(injuredBox))}>{injuredBox}</Item></Grid>
                    <Grid item xs={4}><Item>-2</Item></Grid>
                    <Grid item xs={4}><Item>Wounded</Item></Grid>
                    <Grid item xs={4}><Item onClick={() => setWoundedBox(healthBoxChanger(woundedBox))}>{woundedBox}</Item></Grid>
                    <Grid item xs={4}><Item>-2</Item></Grid>
                    <Grid item xs={4}><Item>Mauled</Item></Grid>
                    <Grid item xs={4}><Item onClick={() => setMauledBox(healthBoxChanger(mauledBox))}>{mauledBox}</Item></Grid>
                    <Grid item xs={4}><Item>-3</Item></Grid>
                    <Grid item xs={4}><Item>Badly Mauled</Item></Grid>
                    <Grid item xs={4}><Item onClick={() => setBadlyMauledBox(healthBoxChanger(badlyMauledBox))}>{badlyMauledBox}</Item></Grid>
                    <Grid item xs={4}><Item>-3</Item></Grid>
                    <Grid item xs={4}><Item>Crippled</Item></Grid>
                    <Grid item xs={4}><Item onClick={() => setCrippledBox(healthBoxChanger(crippledBox))}>{crippledBox}</Item></Grid>
                    <Grid item xs={4}><Item>-5</Item></Grid>
                    <Grid item xs={4}><Item>Incapacitated</Item></Grid>
                    <Grid item xs={4}><Item onClick={() => setIncapacitatedBox(healthBoxChanger(incapacitatedBox))}>{incapacitatedBox}</Item></Grid>
                    <Grid item xs={4}><Item>-8</Item></Grid>
                </Grid>
            </Grid>
        </>
    )
}

export default Health;