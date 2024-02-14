import * as React from 'react';

import { useSelector, useDispatch } from 'react-redux';

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

import './animation.css'

export default function DieRollDialog() {
    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');

    const charDetails = useSelector(store => store.characterDetail)
    const charStatus = useSelector(store => store.characterStatus)
    const characterCyberware = useSelector(store => store.characterGear.cyberware)

    const dispatch = useDispatch();

    const handleClickOpen = (scrollType) => () => {
        setOpen(true);
        setScroll(scrollType);
        setShowResult(false)
    };

    // short timer to prevent rapid re-rolling (or 'cheating' to call a spade a spade.)
    const threeSeconds = 1500;
    const [allowRoll, setAllowRoll] = React.useState(true);

    React.useEffect(() => {
        const interval = setInterval(() => {
            if (allowRoll == false) {
                setAllowRoll(true)
                setDieClass('not-spinning')
            }

        }, threeSeconds);

        // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
        return () => clearInterval(interval);
    }, [allowRoll])

    // handle making the dice spin
    const [dieClass, setDieClass] = React.useState('not-spinning')

    const handleClose = () => {
        setOpen(false);
    };

    const [selectedDieIndex, setSelectedDieIndex] = React.useState(0)
    const [selectedDifficulty, setSelectedDifficulty] = React.useState(6)

    const handleDifficultyChange = (event) => {
        setSelectedDifficulty(event.target.value);
    };

    // const [usingLuck, setUsingLuck] = React.useState(false)

    // prevent using luck if none is available - character sheet only.
    // const checkUsingLuck = (incoming) => {
    //     if ((charStatus.current_luck_loss < charDetails.max_luck) || charDetails.max_luck == undefined)
    //         setUsingLuck(incoming)
    // }

    const [showResult, setShowResult] = React.useState(false)
    const [rollResult, setRollresult] = React.useState('')

    // function difficultyRoll(amount, isExploding, difficulty) {
    function difficultyRoll(amount, isInitiative, difficulty) {
        // see if a roll has occurred recently
        if (allowRoll == true) {
            // Gets a number b/w 1 and 10
            function getRandomInt() {
                // const min = Math.ceil(1);
                // const max = Math.floor(11);
                // return Math.floor(Math.random() * (max - min) + min);
                // It would be wrong to increase the chance of failure to 14.3%, right?
                const arr = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10]
                console.log(arr.length);
                return arr[Math.floor(Math.random() * arr.length)];
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
            // function explodingDiceSorted(amount) {
            //     let dieArray = []
            //     for (let i = 0; i < amount; i++) {
            //         let dieRolled = getRandomInt()
            //         if (dieRolled == 10) {
            //             amount += 1
            //         }
            //         dieArray.push(dieRolled)
            //     }
            //     return dieArray.sort((a, b) => (a - b));
            // }

            let resultArray;
            let successes = 0;
            let glitches = 0;

            // if (isExploding === true) {
            //     resultArray = explodingDiceSorted(amount)
            // } else {
                resultArray = rollDiceSorted(amount)
            // }

            let totalTens = 0;

            successes = resultArray.filter((die) => die >= difficulty);
            successes.map(success => {
                if (success == 10) {
                    totalTens += 1;
                    if (totalTens == 2) {
                        totalTens = 0;
                        // Unshift so it does not include bonus 10s as part of the map - seems like it doesn't anyway but better safe.
                        successes.unshift(10, 10);
                    }
                }
            })

            glitches = resultArray.filter((die) => die == 1);

            let outcome = 0;

            // always being plural makes my eye twitch.
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

            // list dice results:
            let dieResultText = 'You rolled '
            for (let i = 0; i < resultArray.length; i++) {
                if (i < resultArray.length - 1) {
                    dieResultText += `${resultArray[i]}, `
                } else {
                    dieResultText += `${resultArray[i]}`
                }
            }

            // list initiative outcome
            let initiativeResult = charDetails.reflexes + charDetails.cyber_reflexes + successes.length - glitches.length

            // Display: You rolled the following: [], resulting in {successes} hits and {glitches} glitches. You have {outcome}!
            if (isInitiative === true) {
                setRollresult(`${dieResultText}. Your initiative is ${initiativeResult}.`)
            } else {
                setRollresult(`${dieResultText}. This is a ${outcome}`)
            }
            
            // clean up 'using luck', prevent rolling for a momment, and make the dice spin (prevention & rolling timer reset in UseEffect)
            // setUsingLuck(false)
            setAllowRoll(false)
            setDieClass('spin-die')
            // burn one luck if allowed.
            // if (usingLuck == true && (charStatus.current_luck_loss < charDetails.max_luck)) {
            //     dispatch({ type: 'REMOVE_ONE_LUCK' })
            // }

        }
    }

    function diceBuilder(selectedIndex) {
        // return array of SVGs, highlighted and unhighlighted die outlines.
        let diceSVGArray = []
        for (let i = 0; i < selectedIndex; i++) {
            diceSVGArray.push(
                <React.Fragment key={i}>
                    {/* <Grid item xs={1.2} onClick={() => difficultyRoll(i + 1, usingLuck, selectedDifficulty)} onMouseEnter={() => setSelectedDieIndex(i + 1)}> */}
                    <Grid item xs={1.2} onClick={() => difficultyRoll(i + 1, false, selectedDifficulty)} onMouseEnter={() => setSelectedDieIndex(i + 1)}>
                        <DiceTenHighlighted prop={{ class_id: dieClass }} />
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

    const quickRoll = (totalDice, isExploding, difficultyValue) => {
        if (allowRoll) {
            difficultyRoll(totalDice, isExploding, difficultyValue)
            setAllowRoll(false)
        }
    }

    const painPenalty = (stun, lethal, agg, cyberBoxes) => {
        let woundAggregator = stun + lethal + agg
        let painPenalty = [0, 0, 0, -1, -1, -2, -2, -3, -3, -5, -8]
        let finalPain;

        characterCyberware.map(cyberware => {
            if (cyberware.name === 'Pain Editor' && cyberware.equipped === true) {
                painPenalty = [0, 0, 0, 0, 0, -1, -1, -2, -2, -3, -4]
            }
        })

        if (woundAggregator == 0) {
            finalPain = 0
        } else if (woundAggregator / 2 <= cyberBoxes) {
            // console.log(`pain w/ cyber: `, painPenalty[Math.ceil(woundAggregator / 2)]);
            finalPain = painPenalty[Math.ceil(woundAggregator / 2)]
        } else {
            // console.log(`position is, of 10,`, (woundAggregator - cyberBoxes));
            // console.log(`pain past cyber: `, painPenalty[Math.ceil(woundAggregator / 2) + cyberBoxes]);
            finalPain = painPenalty[woundAggregator - cyberBoxes]
        }

        // if (woundAggregator - cyberBoxes < 1) {
        //     painPenalty = 0
        // } else {
        //     finalPain = painPenalty[woundAggregator - cyberBoxes]
        // }
        return finalPain
    }

    const dieChecker = (total) => {
        if (total <= 0) {
            return 1
        } else {
            return total
        }
    }

    return (
        <>

            <div className='navLink' fullwidth="true" onClick={handleClickOpen('paper')}>Roll Some Dice</div>
            <Dialog
                PaperProps={{
                    sx: {
                        minHeight: '80vh'
                    }
                }}
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
                        <Grid item xs={12} display={'flex'} justifyContent={'center'}><h3>You will roll {selectedDieIndex} Dice with a Difficulty Value of {selectedDifficulty}</h3></Grid>
                        {/* <Grid item xs={6}><h3>I'm using Luck!
                            <FormGroup>
                                <FormControlLabel control={<Switch
                                    checked={usingLuck}
                                    onChange={(e) => checkUsingLuck(e.target.checked)} />} label="10s Explode?" />
                            </FormGroup>
                        </h3>
                        </Grid> */}

                        {(charDetails.id > 0) && (charStatus.char_id > 0) ? (
                            <>
                                <Grid container spacing={1} paddingBottom={1}>
                                    <Grid item xs={12} display={'flex'} justifyContent={'center'}><h4 style={{ margin: 0 }}>Quick Actions:</h4></Grid>

                                    <Grid item xs={3} />
                                    <Grid item xs={6} display={'flex'} justifyContent={'center'}
                                        // onClick={() => quickRoll(dieChecker((charDetails.reflexes + charDetails.cyber_reflexes + charDetails.melee_weapons) + painPenalty(charStatus.current_stun, charStatus.current_lethal, charStatus.current_agg, charStatus.current_cyberware_health_boxes)), usingLuck, selectedDifficulty)}
                                        onClick={() => quickRoll(dieChecker((charDetails.reflexes + charDetails.cyber_reflexes + charDetails.melee_weapons) + painPenalty(charStatus.current_stun, charStatus.current_lethal, charStatus.current_agg, charStatus.current_cyberware_health_boxes)), true, selectedDifficulty)}
                                    >
                                        <Button fullWidth variant='contained' color='secondary'
                                            onMouseEnter={() => setSelectedDieIndex(dieChecker((charDetails.reflexes + charDetails.cyber_reflexes) + painPenalty(charStatus.current_stun, charStatus.current_lethal, charStatus.current_agg, charStatus.current_cyberware_health_boxes)))}
                                        >
                                            Initiative - add {charDetails.reflexes + charDetails.cyber_reflexes} to hits! {dieChecker((charDetails.reflexes + charDetails.cyber_reflexes) + painPenalty(charStatus.current_stun, charStatus.current_lethal, charStatus.current_agg, charStatus.current_cyberware_health_boxes))}d10 @ DV {selectedDifficulty}</Button>
                                    </Grid>
                                    <Grid item xs={3} />

                                    <Grid item xs={6} display={'flex'} justifyContent={'center'}
                                        onClick={() => quickRoll(dieChecker((charDetails.reflexes + charDetails.cyber_reflexes + charDetails.melee_weapons) + painPenalty(charStatus.current_stun, charStatus.current_lethal, charStatus.current_agg, charStatus.current_cyberware_health_boxes)), false, selectedDifficulty)}
                                    >
                                        <Button fullWidth variant='contained'
                                            onMouseEnter={() => setSelectedDieIndex(dieChecker((charDetails.reflexes + charDetails.cyber_reflexes + charDetails.melee_weapons) + painPenalty(charStatus.current_stun, charStatus.current_lethal, charStatus.current_agg, charStatus.current_cyberware_health_boxes)))}
                                        >
                                            Melee Attack / Parry - {dieChecker((charDetails.reflexes + charDetails.cyber_reflexes + charDetails.melee_weapons) + painPenalty(charStatus.current_stun, charStatus.current_lethal, charStatus.current_agg, charStatus.current_cyberware_health_boxes))}d10 @ DV {selectedDifficulty}</Button>
                                    </Grid>

                                    <Grid item xs={6} display={'flex'} justifyContent={'center'}
                                        onClick={() => quickRoll(dieChecker((charDetails.reflexes + charDetails.cyber_reflexes + charDetails.firearms) + painPenalty(charStatus.current_stun, charStatus.current_lethal, charStatus.current_agg, charStatus.current_cyberware_health_boxes)), false, selectedDifficulty)}
                                    >
                                        <Button fullWidth variant='contained'
                                            onMouseEnter={() => setSelectedDieIndex(dieChecker((charDetails.reflexes + charDetails.cyber_reflexes + charDetails.firearms) + painPenalty(charStatus.current_stun, charStatus.current_lethal, charStatus.current_agg, charStatus.current_cyberware_health_boxes)))}
                                        >
                                            Firearms Attack - {dieChecker((charDetails.reflexes + charDetails.cyber_reflexes + charDetails.firearms) + painPenalty(charStatus.current_stun, charStatus.current_lethal, charStatus.current_agg, charStatus.current_cyberware_health_boxes))}d10 @ DV {selectedDifficulty}</Button>
                                    </Grid>

                                    <Grid item xs={6} display={'flex'} justifyContent={'center'}
                                        onClick={() => quickRoll(dieChecker((charDetails.reflexes + charDetails.cyber_reflexes + 0) + painPenalty(charStatus.current_stun, charStatus.current_lethal, charStatus.current_agg, charStatus.current_cyberware_health_boxes)), false, selectedDifficulty)}
                                    >
                                        <Button fullWidth variant='contained' onMouseEnter={() => setSelectedDieIndex(dieChecker((charDetails.reflexes + charDetails.cyber_reflexes) + painPenalty(charStatus.current_stun, charStatus.current_lethal, charStatus.current_agg, charStatus.current_cyberware_health_boxes)))}>
                                            Quick Dodge - {dieChecker((charDetails.reflexes + charDetails.cyber_reflexes) + painPenalty(charStatus.current_stun, charStatus.current_lethal, charStatus.current_agg, charStatus.current_cyberware_health_boxes))}d10 @ DV {selectedDifficulty}</Button>
                                    </Grid>

                                    <Grid item xs={6} display={'flex'} justifyContent={'center'}
                                        onClick={() => quickRoll(dieChecker((charDetails.reflexes + charDetails.cyber_reflexes + charDetails.evasion) + painPenalty(charStatus.current_stun, charStatus.current_lethal, charStatus.current_agg, charStatus.current_cyberware_health_boxes)), false, selectedDifficulty)}
                                    >
                                        <Button fullWidth variant='contained' onMouseEnter={() => setSelectedDieIndex(dieChecker((charDetails.reflexes + charDetails.cyber_reflexes + charDetails.evasion) + painPenalty(charStatus.current_stun, charStatus.current_lethal, charStatus.current_agg, charStatus.current_cyberware_health_boxes)))}>
                                            Evade - {dieChecker((charDetails.reflexes + charDetails.cyber_reflexes + charDetails.evasion) + painPenalty(charStatus.current_stun, charStatus.current_lethal, charStatus.current_agg, charStatus.current_cyberware_health_boxes))}d10 @ DV {selectedDifficulty}</Button>
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
