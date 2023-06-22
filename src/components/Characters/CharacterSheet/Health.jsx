import React, { useState } from 'react';
import { Button } from '@mui/material';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { useSelector, useDispatch } from 'react-redux';
import { styled } from '@mui/material/styles';

function Health() {
    const cyberBridgeInfo = useSelector(store => store.characterCyberDetail[0])

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
    

    const cyberHealthBuilder = (cyberBridgeInfo) => {
        let cyberHealthCount = 0
        switch (cyberBridgeInfo.armor_level) {
            case 1:
                cyberHealthCount += 1;
                break;
            case 2:
                cyberHealthCount += 2;
                break;
            case 3:
                cyberHealthCount += 3;
                break;
            case 4:
                cyberHealthCount += 4;
                break;
            case 5:
                cyberHealthCount += 5;
                break;
        }
        switch (cyberBridgeInfo.cyber_limb_count) {
            case 1:
                cyberHealthCount += 1;
                break;
            case 2:
                cyberHealthCount += 2;
                break;
            case 3:
                cyberHealthCount += 3;
                break;
            case 4:
                cyberHealthCount += 4;
                break;
        }
        
        return cyberHealthCount;
    }

    const cyberHealthTotal = cyberHealthBuilder(cyberBridgeInfo)

    
    
    // state for cyberware boxes
    const [cyberBadlyBruisedBox, setCyberBadlyBruisedBox] = useState(`\u2610`)
    const [cyberHurtBox, setCyberHurtBox] = useState(`\u2610`)
    const [cyberBadlyHurtBox, setCyberBadlyHurtBox] = useState(`\u2610`)
    const [cyberInjuredBox, setCyberInjuredBox] = useState(`\u2610`)
    const [cyberWoundedBox, setCyberWoundedBox] = useState(`\u2610`)
    const [cyberMauledBox, setCyberMauledBox] = useState(`\u2610`)
    const [cyberBadlyMauledBox, setCyberBadlyMauledBox] = useState(`\u2610`)
    const [cyberCrippledBox, setCyberCrippledBox] = useState(`\u2610`)
    const [cyberIncapacitatedBox, setCyberIncapacitatedBox] = useState(`\u2610`)

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
                    {cyberHealthTotal > 0 ?
                        <>
                            <Grid item xs={2}><Item onClick={() => setBadlyBruisedBox(healthBoxChanger(badlyBruisedBox))}>{badlyBruisedBox}</Item></Grid>
                            <Grid item xs={2}><Item onClick={() => setCyberBadlyBruisedBox(healthBoxChanger(cyberBadlyBruisedBox))}>{cyberBadlyBruisedBox}</Item></Grid>
                        </> :
                        <Grid item xs={4}><Item onClick={() => setBadlyBruisedBox(healthBoxChanger(badlyBruisedBox))}>{badlyBruisedBox}</Item></Grid>}
                    <Grid item xs={4}><Item>-0</Item></Grid>

                    <Grid item xs={4}><Item>Hurt</Item></Grid>
                    {cyberHealthTotal > 1 ?
                        <>
                            <Grid item xs={2}><Item onClick={() => setHurtBox(healthBoxChanger(hurtBox))}>{hurtBox}</Item></Grid>
                            <Grid item xs={2}><Item onClick={() => setCyberHurtBox(healthBoxChanger(cyberHurtBox))}>{cyberHurtBox}</Item></Grid>
                        </>
                        :
                        <Grid item xs={4}><Item onClick={() => setHurtBox(healthBoxChanger(hurtBox))}>{hurtBox}</Item></Grid>}
                    {cyberBridgeInfo.armor_level === 5 ? <Grid item xs={4}><Item>-0</Item></Grid> : <Grid item xs={4}><Item>-1</Item></Grid>}


                    <Grid item xs={4}><Item>Badly Hurt</Item></Grid>
                    {cyberHealthTotal > 2 ?
                        <>
                            <Grid item xs={2}><Item onClick={() => setBadlyHurtBox(healthBoxChanger(badlyHurtBox))}>{badlyHurtBox}</Item></Grid>
                            <Grid item xs={2}><Item onClick={() => setCyberBadlyHurtBox(healthBoxChanger(cyberBadlyHurtBox))}>{cyberBadlyHurtBox}</Item></Grid>
                        </>
                        : <Grid item xs={4}><Item onClick={() => setBadlyHurtBox(healthBoxChanger(badlyHurtBox))}>{badlyHurtBox}</Item></Grid>}

                    {cyberBridgeInfo.armor_level === 5 ? <Grid item xs={4}><Item>-0</Item></Grid> : <Grid item xs={4}><Item>-1</Item></Grid>}

                    <Grid item xs={4}><Item>Injured</Item></Grid>
                    {cyberHealthTotal > 3 ?
                        <>
                            <Grid item xs={2}><Item onClick={() => setInjuredBox(healthBoxChanger(injuredBox))}>{injuredBox}</Item></Grid>
                            <Grid item xs={2}><Item onClick={() => setCyberInjuredBox(healthBoxChanger(cyberInjuredBox))}>{cyberInjuredBox}</Item></Grid>
                        </>
                        : <Grid item xs={4}><Item onClick={() => setInjuredBox(healthBoxChanger(injuredBox))}>{injuredBox}</Item></Grid>}
                    {cyberBridgeInfo.armor_level === 5 ? <Grid item xs={4}><Item>-0</Item></Grid> : <Grid item xs={4}><Item>-2</Item></Grid>}

                    <Grid item xs={4}><Item>Wounded</Item></Grid>
                    {cyberHealthTotal > 4 ?
                        <>
                            <Grid item xs={2}><Item onClick={() => setWoundedBox(healthBoxChanger(woundedBox))}>{woundedBox}</Item></Grid>
                            <Grid item xs={2}><Item onClick={() => setCyberWoundedBox(healthBoxChanger(cyberWoundedBox))}>{cyberWoundedBox}</Item></Grid>
                        </>
                        : <Grid item xs={4}><Item onClick={() => setWoundedBox(healthBoxChanger(woundedBox))}>{woundedBox}</Item></Grid>}
                    {cyberBridgeInfo.armor_level === 5 ? <Grid item xs={4}><Item>-0</Item></Grid> : <Grid item xs={4}><Item>-2</Item></Grid>}

                    <Grid item xs={4}><Item>Mauled</Item></Grid>
                    {cyberHealthTotal > 5 ?
                        <>
                            <Grid item xs={2}><Item onClick={() => setMauledBox(healthBoxChanger(mauledBox))}>{mauledBox}</Item></Grid>
                            <Grid item xs={2}><Item onClick={() => setCyberMauledBox(healthBoxChanger(cyberMauledBox))}>{cyberMauledBox}</Item></Grid>
                        </> :
                        <Grid item xs={4}><Item onClick={() => setMauledBox(healthBoxChanger(mauledBox))}>{mauledBox}</Item></Grid>}
                    {cyberBridgeInfo.armor_level === 5 ? <Grid item xs={4}><Item>-0</Item></Grid> : <Grid item xs={4}><Item>-3</Item></Grid>}

                    <Grid item xs={4}><Item>Badly Mauled</Item></Grid>
                    {cyberHealthTotal > 6 ?
                        <>
                            <Grid item xs={2}><Item onClick={() => setBadlyMauledBox(healthBoxChanger(badlyMauledBox))}>{badlyMauledBox}</Item></Grid>
                            <Grid item xs={2}><Item onClick={() => setCyberBadlyMauledBox(healthBoxChanger(cyberBadlyMauledBox))}>{cyberBadlyMauledBox}</Item></Grid>
                        </> :
                        <Grid item xs={4}><Item onClick={() => setBadlyMauledBox(healthBoxChanger(badlyMauledBox))}>{badlyMauledBox}</Item></Grid>}
                    {cyberBridgeInfo.armor_level === 5 ? <Grid item xs={4}><Item>-1</Item></Grid> : <Grid item xs={4}><Item>-3</Item></Grid>}

                    <Grid item xs={4}><Item>Crippled</Item></Grid>
                    {cyberHealthTotal > 7 ?
                        <>
                            <Grid item xs={2}><Item onClick={() => setCrippledBox(healthBoxChanger(crippledBox))}>{crippledBox}</Item></Grid>
                            <Grid item xs={2}><Item onClick={() => setCyberCrippledBox(healthBoxChanger(cyberCrippledBox))}>{cyberCrippledBox}</Item></Grid>
                        </> :
                        <Grid item xs={4}><Item onClick={() => setCrippledBox(healthBoxChanger(crippledBox))}>{crippledBox}</Item></Grid>}
                    {cyberBridgeInfo.armor_level === 5 ? <Grid item xs={4}><Item>-2</Item></Grid> : <Grid item xs={4}><Item>-4</Item></Grid>}

                    <Grid item xs={4}><Item>Incapacitated</Item></Grid>
                    {cyberHealthTotal > 8 ?
                        <>
                            <Grid item xs={2}><Item onClick={() => setIncapacitatedBox(healthBoxChanger(incapacitatedBox))}>{incapacitatedBox}</Item></Grid>
                            <Grid item xs={2}><Item onClick={() => setCyberIncapacitatedBox(healthBoxChanger(cyberIncapacitatedBox))}>{cyberIncapacitatedBox}</Item></Grid>
                        </> :
                        <Grid item xs={4}><Item onClick={() => setIncapacitatedBox(healthBoxChanger(incapacitatedBox))}>{incapacitatedBox}</Item></Grid>}
                    {cyberBridgeInfo.armor_level === 5 ? <Grid item xs={4}><Item>-3</Item></Grid> : <Grid item xs={4}><Item>-5</Item></Grid>}
                </Grid>
            </Grid>
        </>
    )
}

export default Health;