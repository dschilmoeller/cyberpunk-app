import React, { useState } from 'react';
import { Button } from '@mui/material';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import { styled } from '@mui/material/styles';


function Luck(charDetailProp) {
    const charDetailLuck = charDetailProp.charDetailProp.max_luck
    const unhurtMarker = `\u2610`;
    const stunMarker = `\u2736`;
    const lethalMarker = `\uFE45`;
    const aggMarker = `\u2718`;

    const [luckBox1, setLuckBox1] = useState(unhurtMarker)
    const [luckBox2, setLuckBox2] = useState(unhurtMarker)
    const [luckBox3, setLuckBox3] = useState(unhurtMarker)
    const [luckBox4, setLuckBox4] = useState(unhurtMarker)
    const [luckBox5, setLuckBox5] = useState(unhurtMarker)
    const [luckBox6, setLuckBox6] = useState(unhurtMarker)
    const [luckBox7, setLuckBox7] = useState(unhurtMarker)
    const [luckBox8, setLuckBox8] = useState(unhurtMarker)
    const [luckBox9, setLuckBox9] = useState(unhurtMarker)
    const [luckBox10, setLuckBox10] = useState(unhurtMarker)

    // add dispatch to change current_luck
    const luckBoxChanger = (incoming) => {
        switch (incoming) {
            case `\u2610`:
                return aggMarker;
            case `\u2718`:
                return unhurtMarker;
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
            <Item sx={{ marginTop: 4.5 }}>Luck</Item>
            <Grid container >
                {charDetailLuck > 0 ? <Grid item xs={1.2}><Item>1</Item></Grid> : <></>}
                {charDetailLuck > 1 ? <Grid item xs={1.2}><Item>2</Item></Grid> : <></>}
                {charDetailLuck > 2 ? <Grid item xs={1.2}><Item>3</Item></Grid> : <></>}
                {charDetailLuck > 3 ? <Grid item xs={1.2}><Item>4</Item></Grid> : <></>}
                {charDetailLuck > 4 ? <Grid item xs={1.2}><Item>5</Item></Grid> : <></>}
                {charDetailLuck > 5 ? <Grid item xs={1.2}><Item>6</Item></Grid> : <></>}
                {charDetailLuck > 6 ? <Grid item xs={1.2}><Item>7</Item></Grid> : <></>}
                {charDetailLuck > 7 ? <Grid item xs={1.2}><Item>8</Item></Grid> : <></>}
                {charDetailLuck > 8 ? <Grid item xs={1.2}><Item>9</Item></Grid> : <></>}
                {charDetailLuck > 9 ? <Grid item xs={1.2}><Item>10</Item></Grid> : <></>}
            </Grid>
            <Grid container>
                {charDetailLuck > 0 ? <Grid item xs={1.2}><Item onClick={() => setLuckBox1(luckBoxChanger(luckBox1))}>{luckBox1}</Item></Grid> : <></>}
                {charDetailLuck > 1 ? <Grid item xs={1.2}><Item onClick={() => setLuckBox2(luckBoxChanger(luckBox2))}>{luckBox2}</Item></Grid> : <></>}
                {charDetailLuck > 2 ? <Grid item xs={1.2}><Item onClick={() => setLuckBox3(luckBoxChanger(luckBox3))}>{luckBox3}</Item></Grid> : <></>}
                {charDetailLuck > 3 ? <Grid item xs={1.2}><Item onClick={() => setLuckBox4(luckBoxChanger(luckBox4))}>{luckBox4}</Item></Grid> : <></>}
                {charDetailLuck > 4 ? <Grid item xs={1.2}><Item onClick={() => setLuckBox5(luckBoxChanger(luckBox5))}>{luckBox5}</Item></Grid> : <></>}
                {charDetailLuck > 5 ? <Grid item xs={1.2}><Item onClick={() => setLuckBox6(luckBoxChanger(luckBox6))}>{luckBox6}</Item></Grid> : <></>}
                {charDetailLuck > 6 ? <Grid item xs={1.2}><Item onClick={() => setLuckBox7(luckBoxChanger(luckBox7))}>{luckBox7}</Item></Grid> : <></>}
                {charDetailLuck > 7 ? <Grid item xs={1.2}><Item onClick={() => setLuckBox8(luckBoxChanger(luckBox8))}>{luckBox8}</Item></Grid> : <></>}
                {charDetailLuck > 8 ? <Grid item xs={1.2}><Item onClick={() => setLuckBox9(luckBoxChanger(luckBox9))}>{luckBox9}</Item></Grid> : <></>}
                {charDetailLuck > 9 ? <Grid item xs={1.2}><Item onClick={() => setLuckBox10(luckBoxChanger(luckBox10))}>{luckBox10}</Item></Grid> : <></>}
            </Grid>
        </>
    )
}

export default Luck;