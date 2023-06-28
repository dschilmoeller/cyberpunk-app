import React from 'react';
import Grid from '@mui/material/Grid';
import { useSelector } from 'react-redux';
import Item from './Item';
import { Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

function Weapons() {
    const charWeapons = useSelector((store) => store.characterWeapons)
    const charDetail = useSelector((store) => store.characterDetail[0])
    const unhurtMarker = `\u2610`;
    const aggMarker = `\u2718`;

    const ammoBoxChanger = (e) => {
        if (e.target.innerText === unhurtMarker) {
            e.target.innerText = aggMarker
        } else if (e.target.innerText === aggMarker) {
            e.target.innerText = unhurtMarker
        }
    }

    const Div = styled('div')(({ theme }) => ({
        ...theme.typography.button,
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(1),
    }));

    const clipBuilder = (maxClip, shotsFired) => {
        let clipArray = []
        for (let i = 0; i < shotsFired; i++) {
            clipArray.push(<Grid item xs={1.2}><Item onClick={(e) => ammoBoxChanger(e)}>{aggMarker}</Item></Grid>)
        }
        if (clipArray.length < maxClip) {
            let remainder = maxClip - shotsFired
            for (let i = 0; i < remainder; i++) {
                clipArray.push(<Grid item xs={1.2}><Item onClick={(e) => ammoBoxChanger(e)}>{unhurtMarker}</Item></Grid>)
            }
        }
        return clipArray
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
                    <Grid item xs={12}>{charWeapons[i].dmg_type === 'melee' ? <Item></Item> : <Item><Typography>Clip:</Typography> </Item>}</Grid>
                    {clipBuilder(charWeapons[i].max_clip, charWeapons[i].current_shots_fired)}
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