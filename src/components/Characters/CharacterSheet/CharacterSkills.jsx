import React, { useState } from 'react';
import { Button } from '@mui/material';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';

function CharacterSkills(charDetailProp) {
    const charDetail = charDetailProp.charDetail

    // Streetwise Skills
    const [athletics, setAthletics] = useState(0)
    const [concentration, setConcentration] = useState(0)
    const [contortionist, setContortionist] = useState(0)
    const [interrogation, setInterrogation] = useState(0)
    const [legerdemain, setLegerdemain] = useState(0)
    const [perception, setPerception] = useState(0)
    const [persuasion, setPersuasion] = useState(0)

    // Tekhne skills

    // Knowledge Skills
}

export default CharacterSkills;