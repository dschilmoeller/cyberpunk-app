import React, { useState } from 'react';
import { Button } from '@mui/material';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { useSelector, useDispatch } from 'react-redux';
import { styled } from '@mui/material/styles';
import Item from './Item';

function Weapons() {
    const dispatch = useDispatch();
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

    const weaponBuilder = () => {
        let weapons = []
        for (let i = 0; i < charWeapons.length; i++) {
            let clip = []
            for (let b = 0; b < charWeapons[i].max_clip; b++){
                clip.push(unhurtMarker)
            }
            
            weapons.push(
                <>

                    <Grid item xs={6}><Item><i>{charWeapons[i].name}</i></Item></Grid>
                    <Grid item xs={2}><Item>{charWeapons[i].dmg_type === 'melee' ? charDetail.strength + charWeapons[i].damage : charWeapons[i].damage}</Item></Grid>
                    <Grid item xs={2}><Item>{charWeapons[i].rof}</Item></Grid>
                    <Grid item xs={2}><Item>{charWeapons[i].range === 0 ? 'Melee' : charWeapons[i].range}</Item></Grid>
                    <Grid item xs={6}><Item>{charWeapons[i].concealable ? 'Conceal: Yes' : 'Conceal: No'}</Item></Grid>
                    <Grid item xs={6}><Item>Number of Hands: {charWeapons[i].hands}</Item></Grid>
                    <Grid item xs={12}>{charWeapons[i].dmg_type === 'melee' ? <Item></Item> : <Item>Clip</Item>}</Grid>
                    {clip.map((item) => {
                        return (
                            <>
                            <Grid item xs={1.2}>
                            <Item onClick={(e) => {ammoBoxChanger(e)}}>{unhurtMarker}</Item>
                            </Grid>
                            </>
                        )
                    })}

                </>
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