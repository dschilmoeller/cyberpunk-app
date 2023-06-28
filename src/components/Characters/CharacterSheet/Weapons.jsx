import React, { useState } from 'react';
import { Button } from '@mui/material';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { useSelector, useDispatch } from 'react-redux';
import { styled } from '@mui/material/styles';

function Weapons() {
    const dispatch = useDispatch();
    const charWeapons = useSelector((store) => store.characterWeapons)
    const unhurtMarker = `\u2610`;
    const aggMarker = `\u2718`;

}

export default Weapons;