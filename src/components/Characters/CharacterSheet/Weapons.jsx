import React from 'react';
import Grid from '@mui/material/Grid';
import { useSelector, useDispatch } from 'react-redux';
import Item from './Item';
import { Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

// change alert to a snackbar type alert!

function Weapons() {
    const charWeapons = useSelector((store) => store.characterWeapons)
    const charDetail = useSelector((store) => store.characterDetail[0])
    
    const dispatch = useDispatch();
    const unhurtMarker = `\u2610`;
    const aggMarker = `\u2718`;

    const ammoBoxChanger = (e, incomingKey) => {
        console.log(`Incoming key:`, incomingKey);
        if (e.target.innerText === unhurtMarker) {
            dispatch({ type: "FIRE_ONE_SHOT", payload: incomingKey })
        } else if (e.target.innerText === aggMarker) {
            dispatch({ type: "RELOAD_ONE_SHOT", payload: incomingKey })
        }
    }

    const clipBuilder = (maxClip, shotsFired, incomingKey) => {
        let clipArray = []
        for (let i = 0; i < shotsFired; i++) {
            clipArray.push(<Grid item key={i + 1000} xs={1.2}><Item onClick={(e) => ammoBoxChanger(e, incomingKey)}>{aggMarker}</Item></Grid>)
        }
        if (clipArray.length < maxClip) {
            let remainder = maxClip - shotsFired
            for (let i = 0; i < remainder; i++) {
                clipArray.push(<Grid item key={i + 2000} xs={1.2}><Item onClick={(e) => ammoBoxChanger(e, incomingKey)}>{unhurtMarker}</Item></Grid>)
            }
        }
        return clipArray
    }

    const ClipButtonBuilder = (damageType, incomingKey, i) => {
        switch (damageType) {
            case 'melee':
                return (<Grid item xs={12}><Item></Item></Grid>)
            case 'smg':
                return (<Grid item xs={12}><Item><Typography>Clip: <Button onClick={()=> handleOneShot(incomingKey)}>Shoot</Button> <Button onClick={() => handleAutoFire(incomingKey, i)}>AutoFire</Button> <Button onClick={() => handleReload(incomingKey)}>Reload</Button> </Typography> </Item></Grid>)
            case 'assault':
                return (<Grid item xs={12}><Item><Typography>Clip: <Button onClick={()=> handleOneShot(incomingKey)}>Shoot</Button> <Button onClick={() => handleAutoFire(incomingKey, i)}>AutoFire</Button> <Button onClick={() => handleReload(incomingKey)}>Reload</Button> </Typography> </Item></Grid>)
            default:
                return (<Grid item xs={12}><Item><Typography>Clip: <Button onClick={()=> handleOneShot(incomingKey)}>Shoot</Button> <Button onClick={() => handleReload(incomingKey)}>Reload</Button> </Typography> </Item></Grid>)
        }
    }

    const handleAutoFire = (incomingKey, i) => {
        console.log(`charweaons[key]`, charWeapons[incomingKey]);
        console.log(`key:`, incomingKey);
        if ((charWeapons[i].max_clip - charWeapons[i].current_shots_fired) > 9 ) {
            dispatch({type: 'FIRE_WEAPON_AUTOMATIC', payload: incomingKey})
        } else {
            alert('You need more bullets!')
        }
    }

    const handleReload = (incomingKey) => {
        dispatch({type: 'RELOAD_WEAPON', payload: incomingKey})
    }

    const handleOneShot = (incomingKey) => {
        dispatch ({type: "FIRE_ONE_SHOT", payload: incomingKey})
    }

    const weaponBuilder = () => {
        let weapons = []

        for (let i = 0; i < charWeapons.length; i++) {
            weapons.push(
                <React.Fragment key={i}>
                    <Grid item xs={6}><Item><i>{charWeapons[i].name}</i></Item></Grid>
                    <Grid item xs={2}><Item>{charWeapons[i].dmg_type === 'melee' ? charDetail.strength + charWeapons[i].damage : charWeapons[i].damage}</Item></Grid>
                    <Grid item xs={2}><Item>{charWeapons[i].rof}</Item></Grid>
                    <Grid item xs={2}><Item>{charWeapons[i].range === 0 ? 'Melee' : charWeapons[i].range}</Item></Grid>
                    <Grid item xs={6}><Item>{charWeapons[i].concealable ? 'Conceal: Yes' : 'Conceal: No'}</Item></Grid>
                    <Grid item xs={6}><Item>Number of Hands: {charWeapons[i].hands}</Item></Grid>
                    {ClipButtonBuilder(charWeapons[i].dmg_type, charWeapons[i].weapon_bridge_id, i)}
                    {clipBuilder(charWeapons[i].max_clip, charWeapons[i].current_shots_fired, charWeapons[i].weapon_bridge_id)}
                    <Grid item xs={12} sx={{backgroundColor: 'black'}} />
                </React.Fragment>
            )
        }
        return weapons
    }

    return (
        <>
            <Grid container>
                <Grid item xs={6}><Item><b>Name</b></Item></Grid>
                <Grid item xs={2}><Item><b>DMG</b></Item></Grid>
                <Grid item xs={2}><Item><b>ROF</b></Item></Grid>
                <Grid item xs={2}><Item><b>Range</b></Item></Grid>
                {weaponBuilder()}
            </Grid>
        </>
    )
}

export default Weapons;