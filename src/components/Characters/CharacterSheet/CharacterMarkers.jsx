import React, { useState } from 'react';
import { Button } from '@mui/material';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import { styled } from '@mui/material/styles';

// To Do: set up cyberware boxes
// More importantly, decide how to handle all of the above.
// Only one kind of Cyberware impacts the number of boxes - can do a simple-ish conditional
// render on that side depending on what cyberware is present. Might need to be a stretch
// for the time being.

// would be worth making some SVG squares of larger size for usage later.
// it may also be time to break down armor/luck/etc into smaller components.

function CharacterMarkers(charDetailProp) {
    const charDetail = charDetailProp.charDetail

    // These are largely determined during character creation. Default state should be pulled from character-reducer.
    const [maxHealth, setMaxHealth] = useState(0)
    const [humanity, setHumanity] = useState(0)
    const [maxLuck, setMaxLuck] = useState(0)
    const [maxArmor, setMaxArmor] = useState(6)

    // special character storage
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

    // state for determining whether cyberware boxes show up

    // state for cyberware boxes

    // handles character cycling for boxes.
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

    // armorbuilder - create a number of properly keyed boxes with their own individual states(?) to 
    // deal with armor being present. Or just 10x pieces of state to track each one?
    const [armorBox1, setArmorBox1] = useState(unhurtMarker)
    const [armorBox2, setArmorBox2] = useState(unhurtMarker)
    const [armorBox3, setArmorBox3] = useState(unhurtMarker)
    const [armorBox4, setArmorBox4] = useState(unhurtMarker)
    const [armorBox5, setArmorBox5] = useState(unhurtMarker)
    const [armorBox6, setArmorBox6] = useState(unhurtMarker)
    const [armorBox7, setArmorBox7] = useState(unhurtMarker)
    const [armorBox8, setArmorBox8] = useState(unhurtMarker)
    const [armorBox9, setArmorBox9] = useState(unhurtMarker)
    const [armorBox10, setArmorBox10] = useState(unhurtMarker)


    const armorBoxChanger = (incoming) => {
        switch (incoming) {
            case `\u2610`:
                return aggMarker;
            case `\u2718`:
                return unhurtMarker;
        }
    }

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

    const luckBoxChanger = (incoming) => {
        switch (incoming) {
            case `\u2610`:
                return aggMarker;
            case `\u2718`:
                return unhurtMarker;
        }
    }

    // create a variable with part of it's name being a variable?
    // algorithmically generate state as well to handle large numbers of state as with armor/luck/humanity esp.?

    const fortySpot = () => {
        let fortyArray = []
        for (let i = 0; i < 40; i++) {
            fortyArray.push(<Grid item xs={0.6}><Item>{unhurtMarker}</Item></Grid>)
        }
        return fortyArray
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
                    <Grid item xs={4}><Item onClick={() => setBadlyBruisedBox(healthBoxChanger(badlyBruisedBox))}>{badlyBruisedBox}</Item></Grid>
                    <Grid item xs={4}><Item>-0</Item></Grid>
                    <Grid item xs={4}><Item>Hurt</Item></Grid>
                    <Grid item xs={4}><Item onClick={() => setHurtBox(healthBoxChanger(hurtBox))}>{hurtBox}</Item></Grid>
                    <Grid item xs={4}><Item>-1</Item></Grid>
                    <Grid item xs={4}><Item>Badly Hurt</Item></Grid>
                    <Grid item xs={4}><Item onClick={() => setBadlyHurtBox(healthBoxChanger(badlyHurtBox))}>{badlyHurtBox}</Item></Grid>
                    <Grid item xs={4}><Item>-1</Item></Grid>
                    <Grid item xs={4}><Item>Injured</Item></Grid>
                    <Grid item xs={4}><Item onClick={() => setInjuredBox(healthBoxChanger(injuredBox))}>{injuredBox}</Item></Grid>
                    <Grid item xs={4}><Item>-2</Item></Grid>
                    <Grid item xs={4}><Item>Wounded</Item></Grid>
                    <Grid item xs={4}><Item onClick={() => setWoundedBox(healthBoxChanger(woundedBox))}>{woundedBox}</Item></Grid>
                    <Grid item xs={4}><Item>-2</Item></Grid>
                    <Grid item xs={4}><Item>Mauled</Item></Grid>
                    <Grid item xs={4}><Item onClick={() => setMauledBox(healthBoxChanger(mauledBox))}>{mauledBox}</Item></Grid>
                    <Grid item xs={4}><Item>-3</Item></Grid>
                    <Grid item xs={4}><Item>Badly Mauled</Item></Grid>
                    <Grid item xs={4}><Item onClick={() => setBadlyMauledBox(healthBoxChanger(badlyMauledBox))}>{badlyMauledBox}</Item></Grid>
                    <Grid item xs={4}><Item>-3</Item></Grid>
                    <Grid item xs={4}><Item>Crippled</Item></Grid>
                    <Grid item xs={4}><Item onClick={() => setCrippledBox(healthBoxChanger(crippledBox))}>{crippledBox}</Item></Grid>
                    <Grid item xs={4}><Item>-5</Item></Grid>
                    <Grid item xs={4}><Item>Incapacitated</Item></Grid>
                    <Grid item xs={4}><Item onClick={() => setIncapacitatedBox(healthBoxChanger(incapacitatedBox))}>{incapacitatedBox}</Item></Grid>
                    <Grid item xs={4}><Item>-8</Item></Grid>
                </Grid>
            </Grid>

            <Grid item xs={6}>
                <Item>Armor Ablation</Item>
                <Grid container>
                    <Grid item xs={1.2}><Item>Armor</Item></Grid>
                    <Grid item xs={1.2}><Item>Armor</Item></Grid>
                    <Grid item xs={1.2}><Item>Armor</Item></Grid>
                    <Grid item xs={1.2}><Item>Armor</Item></Grid>
                    <Grid item xs={1.2}><Item>Armor</Item></Grid>
                    <Grid item xs={1.2}><Item>Armor</Item></Grid>
                    <Grid item xs={1.2}><Item>Cyber</Item></Grid>
                    <Grid item xs={1.2}><Item>Cyber</Item></Grid>
                    <Grid item xs={1.2}><Item>Cyber</Item></Grid>
                    <Grid item xs={1.2}><Item>Cyber</Item></Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={1.2}><Item onClick={() => setArmorBox1(armorBoxChanger(armorBox1))}>{armorBox1}</Item></Grid>
                    <Grid item xs={1.2}><Item onClick={() => setArmorBox2(armorBoxChanger(armorBox2))}>{armorBox2}</Item></Grid>
                    <Grid item xs={1.2}><Item onClick={() => setArmorBox3(armorBoxChanger(armorBox3))}>{armorBox3}</Item></Grid>
                    <Grid item xs={1.2}><Item onClick={() => setArmorBox4(armorBoxChanger(armorBox4))}>{armorBox4}</Item></Grid>
                    <Grid item xs={1.2}><Item onClick={() => setArmorBox5(armorBoxChanger(armorBox5))}>{armorBox5}</Item></Grid>
                    <Grid item xs={1.2}><Item onClick={() => setArmorBox6(armorBoxChanger(armorBox6))}>{armorBox6}</Item></Grid>
                    <Grid item xs={1.2}><Item onClick={() => setArmorBox7(armorBoxChanger(armorBox7))}>{armorBox7}</Item></Grid>
                    <Grid item xs={1.2}><Item onClick={() => setArmorBox8(armorBoxChanger(armorBox8))}>{armorBox8}</Item></Grid>
                    <Grid item xs={1.2}><Item onClick={() => setArmorBox9(armorBoxChanger(armorBox9))}>{armorBox9}</Item></Grid>
                    <Grid item xs={1.2}><Item onClick={() => setArmorBox10(armorBoxChanger(armorBox10))}>{armorBox10}</Item></Grid>
                </Grid>

                <Item sx={{ marginTop: 4 }}>Luck</Item>
                <Grid container>
                    <Grid item xs={1.2}><Item>1</Item></Grid>
                    <Grid item xs={1.2}><Item>2</Item></Grid>
                    <Grid item xs={1.2}><Item>3</Item></Grid>
                    <Grid item xs={1.2}><Item>4</Item></Grid>
                    <Grid item xs={1.2}><Item>5</Item></Grid>
                    <Grid item xs={1.2}><Item>6</Item></Grid>
                    <Grid item xs={1.2}><Item>7</Item></Grid>
                    <Grid item xs={1.2}><Item>8</Item></Grid>
                    <Grid item xs={1.2}><Item>9</Item></Grid>
                    <Grid item xs={1.2}><Item>10</Item></Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={1.2}><Item onClick={() => setLuckBox1(luckBoxChanger(luckBox1))}>{luckBox1}</Item></Grid>
                    <Grid item xs={1.2}><Item onClick={() => setLuckBox2(luckBoxChanger(luckBox2))}>{luckBox2}</Item></Grid>
                    <Grid item xs={1.2}><Item onClick={() => setLuckBox3(luckBoxChanger(luckBox3))}>{luckBox3}</Item></Grid>
                    <Grid item xs={1.2}><Item onClick={() => setLuckBox4(luckBoxChanger(luckBox4))}>{luckBox4}</Item></Grid>
                    <Grid item xs={1.2}><Item onClick={() => setLuckBox5(luckBoxChanger(luckBox5))}>{luckBox5}</Item></Grid>
                    <Grid item xs={1.2}><Item onClick={() => setLuckBox6(luckBoxChanger(luckBox6))}>{luckBox6}</Item></Grid>
                    <Grid item xs={1.2}><Item onClick={() => setLuckBox7(luckBoxChanger(luckBox7))}>{luckBox7}</Item></Grid>
                    <Grid item xs={1.2}><Item onClick={() => setLuckBox8(luckBoxChanger(luckBox8))}>{luckBox8}</Item></Grid>
                    <Grid item xs={1.2}><Item onClick={() => setLuckBox9(luckBoxChanger(luckBox9))}>{luckBox9}</Item></Grid>
                    <Grid item xs={1.2}><Item onClick={() => setLuckBox10(luckBoxChanger(luckBox10))}>{luckBox10}</Item></Grid>
                </Grid>

                <Item sx={{ marginTop: 4 }}>Humanity</Item>
                <Grid container>

                    {fortySpot()}
                    {/* <Grid item xs={0.6}><Item>{unhurtMarker}</Item></Grid> */}
                    {/* Loop -> Key = x => Function using 'this' ?? generate x boxes and track. */}
                    {/* How then to handle tracking between sessions and save? Do dispatches to total armor each time a box is checked in the switch statement? */}
                </Grid>
            </Grid>
        </>
    )
}

export default CharacterMarkers