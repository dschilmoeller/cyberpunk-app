import React, { useState } from 'react';
import { Button } from '@mui/material';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import { styled } from '@mui/material/styles';

import Health from './Health';
import Humanity from './Humanity';
import Luck from './Luck';
import Armor from './Armor';
import Weapons from './Weapons';

// To Do: 

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
            <Health />
            <Grid item xs={4}>
                <Armor charDetailProp={charDetail} />
                <Luck charDetailProp={charDetail} />
                <Humanity charDetailProp={charDetail} />
            </Grid>
            <Grid item xs={4}>
                <Weapons />
            </Grid>
        </>
    )
}

export default CharacterMarkers