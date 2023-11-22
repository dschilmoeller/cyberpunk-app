import * as React from 'react';

import { useSelector } from 'react-redux';

import { Button } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import { Grid } from '@mui/material';

import DiceTenBase from '../Dice/DiceTenBase';
import DiceTenHighlighted from '../Dice/DiceTenHighlighted';

export default function DieRollDialog() {
    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');

    const charDetails = useSelector(store => store.characterDetail)
    const charStatus =  useSelector(store => store.characterStatus)
    const characterCyberware = useSelector(store => store.characterGear.cyberware)

    const handleClickOpen = (scrollType) => () => {
        setOpen(true);
        setScroll(scrollType);
        setShowResult(false)
    };

    // short timer to prevent rapid re-rolling (or 'cheating' to call a spade a spade.)
    const threeSeconds = 3000;
    const [allowRoll, setAllowRoll] = React.useState(true);

    React.useEffect(() => {
        const interval = setInterval(() => {
            setAllowRoll(true)
            console.log(`allowRoll:`, allowRoll);
        }, threeSeconds);

        // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
        return () => clearInterval(interval);
    }, [])

    const handleClose = () => {
        setOpen(false);
    };

    const [selectedDieIndex, setSelectedDieIndex] = React.useState(0)
    const [selectedDifficulty, setSelectedDifficulty] = React.useState(6)

    const handleDifficultyChange = (event) => {
        setSelectedDifficulty(event.target.value);
    };

    const [usingLuck, setUsingLuck] = React.useState(false)


    const [showResult, setShowResult] = React.useState(false)
    const [rollResult, setRollresult] = React.useState('')

    function difficultyRoll(amount, isExploding, difficulty) {

        // Gets a number b/w 1 and 10
        function getRandomInt() {
            const min = Math.ceil(1);
            const max = Math.floor(11);
            return Math.floor(Math.random() * (max - min) + min);
        }

        // Sorts randomInt
        function rollDiceSorted(amount) {
            let dieArray = []
            for (let i = 0; i < amount; i++) {
                dieArray.push(getRandomInt());
            }
            return dieArray.sort((a, b) => (a - b));
        }

        // Sorts randomInt and increases number of dice rolled for each 10 that occurs
        function explodingDiceSorted(amount) {
            let dieArray = []
            for (let i = 0; i < amount; i++) {
                let dieRolled = getRandomInt()
                if (dieRolled == 10) {
                    amount += 1
                }
                dieArray.push(dieRolled)
            }
            return dieArray.sort((a, b) => (a - b));
        }

        let resultArray;
        let successes = 0;
        let glitches = 0;

        if (isExploding === true) {
            resultArray = explodingDiceSorted(amount)
        } else {
            resultArray = rollDiceSorted(amount)
        }

        successes = resultArray.filter((die) => die >= difficulty);
        glitches = resultArray.filter((die) => die == 1);

        let outcome = 0;

        // always being plural is annoying, time to make some more variables.
        let hitWord = ''
        let glitchWord = ''

        if (successes.length == 1) {
            hitWord = 'hit'
        } else {
            hitWord = 'hits'
        }
        if (glitches.length == 1) {
            glitchWord = 'glitch'
        } else {
            glitchWord = 'glitches'
        }

        if (successes.length > glitches.length) {
            outcome = `SUCCESS with ${successes.length - glitches.length} ${hitWord}.`
            // outcome = 0
        } else if (successes.length == glitches.length) {
            outcome = `FAILURE with ${successes.length} ${hitWord} and ${glitches.length} ${glitchWord}.`
            // outcome = 1
        } else {
            outcome = `BOTCH with ${successes.length} ${hitWord} and ${glitches.length} ${glitchWord}.`
            // outcome = 2
        }

        setShowResult(true);
        // You rolled the following: [], resulting in {successes} hits and {glitches} glitches. Your have {outcome}!

        // list dice results:
        let dieResultText = 'You rolled '
        for (let i = 0; i < resultArray.length; i++) {
            if (i < resultArray.length - 1) {
                dieResultText += `${resultArray[i]}, `
            } else {
                dieResultText += `${resultArray[i]}`
            }
        }

        setRollresult(`${dieResultText}. This is a ${outcome}`)
        setUsingLuck(false)
    }

    function diceBuilder(selectedIndex) {
        // needs to return array of SVGs, highlighted and unhighlighted die outlines.
        let diceSVGArray = []
        for (let i = 0; i < selectedIndex; i++) {
            diceSVGArray.push(
                <React.Fragment key={i}>
                    <Grid item xs={1.2} onClick={() => difficultyRoll(i + 1, usingLuck, selectedDifficulty)} onMouseEnter={() => setSelectedDieIndex(i + 1)}>
                        <DiceTenHighlighted />
                    </Grid>
                </React.Fragment>
            )
        }
        for (let i = selectedIndex; i < 20; i++) {
            diceSVGArray.push(
                <React.Fragment key={i}>
                    <Grid item xs={1.2} onMouseEnter={() => setSelectedDieIndex(i + 1)}>
                        <DiceTenBase />
                    </Grid>
                </React.Fragment>
            )
        }
        return diceSVGArray
    }

    const quickRoll = (att, cyberAtt, skill, isExploding, difficultyValue, penalty) => {
        if (allowRoll){
            difficultyRoll(((att + cyberAtt + skill) + penalty), isExploding, difficultyValue)
            setAllowRoll(false)
        }
    }

    const painPenalty = (stun, lethal, agg, cyberBoxes) => {
        let woundAggregator = stun + lethal + agg
        let painPenalty = [0, 0, 0, -1, -1, -2, -2, -3, -3, -5, -8]
        let finalPain = 0
        
        characterCyberware.map(cyberware => {
            if (cyberware.name === 'Pain Editor' && cyberware.equipped === true) {
                painPenalty = [0, 0, 0, 0, -1, -1, -2, -2, -3, -4]
            }
        })

        if (woundAggregator - cyberBoxes < 1) {
            painPenalty = 0
        } else {
            finalPain = painPenalty[woundAggregator - cyberBoxes]
        }
        return finalPain
    }

    return (
        <>

            <div className='navLink' fullwidth="true" onClick={handleClickOpen('paper')}>Roll Some Dice</div>
            <Dialog
                open={open}
                onClose={handleClose}
                scroll={scroll}
                maxWidth='lg'
                fullWidth
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title">Rolling Dice - Hover and click to roll</DialogTitle>
                <DialogContent dividers={scroll === 'paper'}>

                    <Grid container spacing={1}>
                        <Grid item xs={6}><h3>You will roll {selectedDieIndex} Dice with a Difficulty Value of {selectedDifficulty}</h3></Grid>
                        <Grid item xs={6}><h3>I'm using Luck!
                            <FormGroup>
                                <FormControlLabel control={<Switch
                                    checked={usingLuck}
                                    onChange={(e) => setUsingLuck(e.target.checked)} />} label="10s Explode?" />
                            </FormGroup>
                        </h3>
                        </Grid>

                        {(charDetails.id > 0) && (charStatus.char_id > 0) ? (
                            <>
                                <Grid container paddingBottom={1}>
                                    <Grid item xs={12} display={'flex'} justifyContent={'center'}><h4 style={{ margin: 0 }}>Quick Actions:</h4></Grid>

                                    <Grid item xs={6} display={'flex'} justifyContent={'center'}
                                        onClick={() => quickRoll(charDetails.reflexes, charDetails.cyber_reflexes, charDetails.melee_weapons, usingLuck, selectedDifficulty, painPenalty(charStatus.current_stun, charStatus.current_lethal, charStatus.current_agg, charStatus.current_cyberware_health_boxes))}
                                    >
                                        <Button fullWidth
                                            onMouseEnter={() => setSelectedDieIndex((charDetails.reflexes + charDetails.cyber_reflexes + charDetails.melee_weapons) + painPenalty(charStatus.current_stun, charStatus.current_lethal, charStatus.current_agg, charStatus.current_cyberware_health_boxes))}
                                        >
                                            Melee Attack / Parry - {(charDetails.reflexes + charDetails.cyber_reflexes + charDetails.melee_weapons) + painPenalty(charStatus.current_stun, charStatus.current_lethal, charStatus.current_agg, charStatus.current_cyberware_health_boxes)}d10 @ DV {selectedDifficulty}</Button>
                                    </Grid>

                                    <Grid item xs={6} display={'flex'} justifyContent={'center'}
                                        onClick={() => quickRoll(charDetails.reflexes, charDetails.cyber_reflexes, charDetails.firearms, usingLuck, selectedDifficulty, painPenalty(charStatus.current_stun, charStatus.current_lethal, charStatus.current_agg, charStatus.current_cyberware_health_boxes))}
                                    >
                                        <Button fullWidth
                                            onMouseEnter={() => setSelectedDieIndex((charDetails.reflexes + charDetails.cyber_reflexes + charDetails.firearms) + painPenalty(charStatus.current_stun, charStatus.current_lethal, charStatus.current_agg, charStatus.current_cyberware_health_boxes))}
                                        >
                                            Firearms Attack - {(charDetails.reflexes + charDetails.cyber_reflexes + charDetails.firearms) + painPenalty(charStatus.current_stun, charStatus.current_lethal, charStatus.current_agg, charStatus.current_cyberware_health_boxes)}d10 @ DV {selectedDifficulty}</Button>
                                    </Grid>

                                    <Grid item xs={6} display={'flex'} justifyContent={'center'}
                                        onClick={() => quickRoll(charDetails.reflexes, charDetails.cyber_reflexes, 0, usingLuck, selectedDifficulty, painPenalty(charStatus.current_stun, charStatus.current_lethal, charStatus.current_agg, charStatus.current_cyberware_health_boxes))}
                                    >
                                        <Button fullWidth onMouseEnter={() => setSelectedDieIndex((charDetails.reflexes + charDetails.cyber_reflexes) + painPenalty(charStatus.current_stun, charStatus.current_lethal, charStatus.current_agg, charStatus.current_cyberware_health_boxes))}>
                                            Quick Dodge - {(charDetails.reflexes + charDetails.cyber_reflexes) + painPenalty(charStatus.current_stun, charStatus.current_lethal, charStatus.current_agg, charStatus.current_cyberware_health_boxes)}d10 @ DV {selectedDifficulty}</Button>
                                    </Grid>

                                    <Grid item xs={6} display={'flex'} justifyContent={'center'}
                                        onClick={() => quickRoll(charDetails.reflexes, charDetails.cyber_reflexes, charDetails.evasion, usingLuck, selectedDifficulty, painPenalty(charStatus.current_stun, charStatus.current_lethal, charStatus.current_agg, charStatus.current_cyberware_health_boxes))}
                                    >
                                        <Button fullWidth onMouseEnter={() => setSelectedDieIndex((charDetails.reflexes + charDetails.cyber_reflexes + charDetails.evasion) + painPenalty(charStatus.current_stun, charStatus.current_lethal, charStatus.current_agg, charStatus.current_cyberware_health_boxes))}>
                                            Evade - {(charDetails.reflexes + charDetails.cyber_reflexes + charDetails.evasion) + painPenalty(charStatus.current_stun, charStatus.current_lethal, charStatus.current_agg, charStatus.current_cyberware_health_boxes)}d10 @ DV {selectedDifficulty}</Button>
                                    </Grid>
                                </Grid>
                            </>) : <></>}

                        <Grid item xs={12}>
                            {<FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Select Difficulty Value</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={selectedDifficulty}
                                    label="Difficulty"
                                    onChange={handleDifficultyChange}
                                >
                                    <MenuItem value={4}>Four</MenuItem>
                                    <MenuItem value={5}>Five</MenuItem>
                                    <MenuItem value={6}>Six</MenuItem>
                                    <MenuItem value={7}>Seven</MenuItem>
                                    <MenuItem value={8}>Eight</MenuItem>
                                    <MenuItem value={9}>Nine</MenuItem>
                                </Select>
                            </FormControl>}
                        </Grid>
                        {diceBuilder(selectedDieIndex)}

                        {showResult ? (
                            <>
                                <Grid item xs={12}><h2>Roll Result: {rollResult}</h2></Grid>
                            </>
                        ) : <></>}
                    </Grid>


                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
