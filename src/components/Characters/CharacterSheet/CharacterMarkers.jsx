import React, { useState } from 'react';
import { Button } from '@mui/material';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import { styled } from '@mui/material/styles';

import Health from './Health';
import Health2 from './Health2';
import Humanity from './Humanity';
import Luck from './Luck';
import Armor from './Armor';

// To Do: 

// set up cyberware boxes in health.
// after making it a new component.
// More importantly, decide how to handle all of the above in the database
// Only one kind of Cyberware impacts the number of boxes - can do a simple-ish conditional
// render on that side depending on what cyberware is present. Might need to be a stretch
// for the time being.

// handling window close to update char sheet as well as a manual save button! https://stackoverflow.com/questions/36355093/reactjs-browser-tab-close-event/66171052#66171052


// would be worth making some SVG squares of larger size for usage later.
// it may also be time to break down armor/luck/etc into smaller components.

function CharacterMarkers(charDetailProp) {
    const charDetail = charDetailProp.charDetail

    // special character storage
    const unhurtMarker = `\u2610`;
    const stunMarker = `\u2736`;
    const lethalMarker = `\uFE45`;
    const aggMarker = `\u2718`;

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    return (
        <>
            {/* <Health charDetailProp={charDetail} /> */}
            <Health2 charDetailProp={charDetail} />
            <Grid item xs={6}>
                <Armor charDetailProp={charDetail} />
                <Luck charDetailProp={charDetail} />
                <Humanity charDetailProp={charDetail} />
            </Grid>
        </>
    )
}

export default CharacterMarkers