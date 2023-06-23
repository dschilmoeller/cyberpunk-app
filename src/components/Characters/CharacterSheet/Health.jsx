import React, { useState } from 'react';
import { Button } from '@mui/material';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { useSelector, useDispatch } from 'react-redux';
import { styled } from '@mui/material/styles';

function Health() {
    const cyberBridgeInfo = useSelector(store => store.characterCyberDetail[0])
    // TODO: change to prop
    const charStatus = useSelector((store) => store.characterStatus[0]);

    const dispatch = useDispatch();

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

    // determines presence and number of additional health boxes based on type of armor-ware and number of cyberlimbs.
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

    // handles cycling for boxes.
    const healthBoxChanger = (incoming) => {
        switch (incoming) {
            case `\u2610`:
                healthDispatcher('plusOneStun');
                return stunMarker
            case `\u2736`:
                healthDispatcher('plusOneLethal');
                return lethalMarker
            case `\uFE45`:
                healthDispatcher('plusOneAgg')
                return aggMarker
            case `\u2718`:
                healthDispatcher();
                return unhurtMarker
        }
    }

    // add dispatch for updating current_stun/lethal/agg in reducer? Or just update DB every time?
    // dispatch currently works.
    const healthDispatcher = (incoming) => {
        let numberStunWounds = 0
        let numberLethalWounds = 0
        let numberAggWounds = 0
        // subtractions required to deal with box not being changed when function is run
        // otherwise the current number always has +1 of the last applied wound type.
        // not needed for unhurt (default) => stun change since unhurt boxes are not tracked.
        switch (incoming) {
            case 'plusOneStun':
                numberStunWounds += 1
                break;
            case 'plusOneLethal':
                numberLethalWounds += 1
                numberStunWounds -= 1
                break;
            case 'plusOneAgg':
                numberAggWounds += 1
                numberLethalWounds -= 1
                break;
        }
        switch (bruisedBox) {
            case stunMarker:
                numberStunWounds += 1
                break;
            case lethalMarker:
                numberLethalWounds += 1
                break;
            case aggMarker:
                numberAggWounds += 1
                break;
        }
        switch (badlyBruisedBox) {
            case stunMarker:
                numberStunWounds += 1
                break;
            case lethalMarker:
                numberLethalWounds += 1
                break;
            case aggMarker:
                numberAggWounds += 1
                break;
        }
        switch (hurtBox) {
            case stunMarker:
                numberStunWounds += 1
                break;
            case lethalMarker:
                numberLethalWounds += 1
                break;
            case aggMarker:
                numberAggWounds += 1
                break;
        }
        switch (badlyHurtBox) {
            case stunMarker:
                numberStunWounds += 1
                break;
            case lethalMarker:
                numberLethalWounds += 1
                break;
            case aggMarker:
                numberAggWounds += 1
                break;
        }
        switch (injuredBox) {
            case stunMarker:
                numberStunWounds += 1
                break;
            case lethalMarker:
                numberLethalWounds += 1
                break;
            case aggMarker:
                numberAggWounds += 1
                break;
        }
        switch (woundedBox) {
            case stunMarker:
                numberStunWounds += 1
                break;
            case lethalMarker:
                numberLethalWounds += 1
                break;
            case aggMarker:
                numberAggWounds += 1
                break;
        }
        switch (mauledBox) {
            case stunMarker:
                numberStunWounds += 1
                break;
            case lethalMarker:
                numberLethalWounds += 1
                break;
            case aggMarker:
                numberAggWounds += 1
                break;
        }
        switch (badlyMauledBox) {
            case stunMarker:
                numberStunWounds += 1
                break;
            case lethalMarker:
                numberLethalWounds += 1
                break;
            case aggMarker:
                numberAggWounds += 1
                break;
        }
        switch (crippledBox) {
            case stunMarker:
                numberStunWounds += 1
                break;
            case lethalMarker:
                numberLethalWounds += 1
                break;
            case aggMarker:
                numberAggWounds += 1
                break;
        }
        switch (incapacitatedBox) {
            case stunMarker:
                numberStunWounds += 1
                break;
            case lethalMarker:
                numberLethalWounds += 1
                break;
            case aggMarker:
                numberAggWounds += 1
                break;
        }
        switch (cyberBadlyBruisedBox) {
            case stunMarker:
                numberStunWounds += 1
                break;
            case lethalMarker:
                numberLethalWounds += 1
                break;
            case aggMarker:
                numberAggWounds += 1
                break;
        }
        switch (cyberHurtBox) {
            case stunMarker:
                numberStunWounds += 1
                break;
            case lethalMarker:
                numberLethalWounds += 1
                break;
            case aggMarker:
                numberAggWounds += 1
                break;
        }
        switch (cyberBadlyHurtBox) {
            case stunMarker:
                numberStunWounds += 1
                break;
            case lethalMarker:
                numberLethalWounds += 1
                break;
            case aggMarker:
                numberAggWounds += 1
                break;
        }
        switch (cyberInjuredBox) {
            case stunMarker:
                numberStunWounds += 1
                break;
            case lethalMarker:
                numberLethalWounds += 1
                break;
            case aggMarker:
                numberAggWounds += 1
                break;
        }
        switch (cyberWoundedBox) {
            case stunMarker:
                numberStunWounds += 1
                break;
            case lethalMarker:
                numberLethalWounds += 1
                break;
            case aggMarker:
                numberAggWounds += 1
                break;
        }
        switch (cyberMauledBox) {
            case stunMarker:
                numberStunWounds += 1
                break;
            case lethalMarker:
                numberLethalWounds += 1
                break;
            case aggMarker:
                numberAggWounds += 1
                break;
        }
        switch (cyberBadlyMauledBox) {
            case stunMarker:
                numberStunWounds += 1
                break;
            case lethalMarker:
                numberLethalWounds += 1
                break;
            case aggMarker:
                numberAggWounds += 1
                break;
        }
        switch (cyberCrippledBox) {
            case stunMarker:
                numberStunWounds += 1
                break;
            case lethalMarker:
                numberLethalWounds += 1
                break;
            case aggMarker:
                numberAggWounds += 1
                break;
        }
        switch (cyberIncapacitatedBox) {
            case stunMarker:
                numberStunWounds += 1
                break;
            case lethalMarker:
                numberLethalWounds += 1
                break;
            case aggMarker:
                numberAggWounds += 1
                break;
        }
        dispatch({ type: 'SET_WOUNDS', payload: {numberStunWounds: numberStunWounds, numberLethalWounds: numberLethalWounds, numberAggWounds: numberAggWounds} })
    }

    // how to change state of health boxes based on number of current wounds?
    // very complex & long if statement? How to account for cyber boxes? Or maybe a 'from last session' pop-up with info?
    // some work may be left to the player for the time being. Otherwise will require a dramatic rethink of code. 
    // Talk w/ Paige, Ray, see if there's a better way to be going about this process?

    const previouslyOnCharStatus = (incoming) => {
        
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
                {/* <Item>Health</Item> */}
                <Button onClick={() => previouslyOnCharStatus()}>Get Character Status</Button>
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