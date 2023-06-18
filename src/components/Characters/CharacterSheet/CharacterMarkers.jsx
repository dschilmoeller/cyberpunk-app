import React, { useState } from 'react';
import { Button } from '@mui/material';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import { styled } from '@mui/material/styles';

// To Do: set up cyberware boxes
// More importantly, decide how to handle all of the above.
// Only one kind of Cyberware impacts the number of boxes - can do a simple-ish conditional
// render on that side depending on what cyberware is present. Might need to be a stretch
// for the time being.



function CharacterMarkers(charDetailProp) {
    const charDetail = charDetailProp.charDetail

    // These are largely determined during character creation.
    const [maxHealth, setMaxHealth] = useState(0)
    const [humanity, setHumanity] = useState(0)
    const [maxLuck, setMaxLuck] = useState(0)
    const [maxArmor, setMaxArmor] = useState(6)

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

    // armorbuilder - create a number of properly keyed boxes with their own individual states(?) to 
    // deal with armor being present.

    // special character storage
    const unhurtMarker = `\u2610`;
    const stunMarker = `\u2736`;
    const lethalMarker = `\uFE45`;
    const aggMarker = `\u2718`;

    // handles character cycling for boxes.
    const boxChanger = (incoming) => {
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
                    <Grid item xs={4}><Item onClick={() => setBruisedBox(boxChanger(bruisedBox))}>{bruisedBox}</Item></Grid>
                    <Grid item xs={4}><Item>-0</Item></Grid>
                    <Grid item xs={4}><Item>Badly Bruised</Item></Grid>
                    <Grid item xs={4}><Item onClick={() => setBadlyBruisedBox(boxChanger(badlyBruisedBox))}>{badlyBruisedBox}</Item></Grid>
                    <Grid item xs={4}><Item>-0</Item></Grid>
                    <Grid item xs={4}><Item>Hurt</Item></Grid>
                    <Grid item xs={4}><Item onClick={() => setHurtBox(boxChanger(hurtBox))}>{hurtBox}</Item></Grid>
                    <Grid item xs={4}><Item>-1</Item></Grid>
                    <Grid item xs={4}><Item>Badly Hurt</Item></Grid>
                    <Grid item xs={4}><Item onClick={() => setBadlyHurtBox(boxChanger(badlyHurtBox))}>{badlyHurtBox}</Item></Grid>
                    <Grid item xs={4}><Item>-1</Item></Grid>
                    <Grid item xs={4}><Item>Injured</Item></Grid>
                    <Grid item xs={4}><Item onClick={() => setInjuredBox(boxChanger(injuredBox))}>{injuredBox}</Item></Grid>
                    <Grid item xs={4}><Item>-2</Item></Grid>
                    <Grid item xs={4}><Item>Wounded</Item></Grid>
                    <Grid item xs={4}><Item onClick={() => setWoundedBox(boxChanger(woundedBox))}>{woundedBox}</Item></Grid>
                    <Grid item xs={4}><Item>-2</Item></Grid>
                    <Grid item xs={4}><Item>Mauled</Item></Grid>
                    <Grid item xs={4}><Item onClick={() => setMauledBox(boxChanger(mauledBox))}>{mauledBox}</Item></Grid>
                    <Grid item xs={4}><Item>-3</Item></Grid>
                    <Grid item xs={4}><Item>Badly Mauled</Item></Grid>
                    <Grid item xs={4}><Item onClick={() => setBadlyMauledBox(boxChanger(badlyMauledBox))}>{badlyMauledBox}</Item></Grid>
                    <Grid item xs={4}><Item>-3</Item></Grid>
                    <Grid item xs={4}><Item>Crippled</Item></Grid>
                    <Grid item xs={4}><Item onClick={() => setCrippledBox(boxChanger(crippledBox))}>{crippledBox}</Item></Grid>
                    <Grid item xs={4}><Item>-5</Item></Grid>
                    <Grid item xs={4}><Item>Incapacitated</Item></Grid>
                    <Grid item xs={4}><Item onClick={() => setIncapacitatedBox(boxChanger(incapacitatedBox))}>{incapacitatedBox}</Item></Grid>
                    <Grid item xs={4}><Item>-8</Item></Grid>
                </Grid>
            </Grid>

            <Grid item xs={6}>
                <Item>Armor Ablation</Item>
                <Grid container>
                    <Grid item xs={12}><Item></Item></Grid>
                    
                </Grid>
                <Grid container></Grid>
            </Grid>

            <Grid item xs={6}>
                <Item>Humanity</Item>
            </Grid>

            <Grid item xs={6}>
                <Item>Luck</Item>
            </Grid>
        </>
    )
}

export default CharacterMarkers