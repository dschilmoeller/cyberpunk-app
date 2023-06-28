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
            weapons.push(
                <>
                    
                    <Grid item xs={4}>ROF</Grid>
                    <Grid item xs={12}>{charWeapons[i].name}</Grid>
                </>
            )
        }
        return weapons
    }

    return (
        <>
            {weaponBuilder()}
        </>
    )
}

export default Weapons;