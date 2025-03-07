import * as React from 'react';

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, InputLabel, MenuItem, FormControl, Select, Grid } from '@mui/material';

import DiceTenBase from '../Dice/DiceTenBase';
import DiceTenHighlighted from '../Dice/DiceTenHighlighted';

import './animation.css';

export default function CharWeaponDieRollDialog({ type, charStatus, charDetail, painEditor }) {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
    if (type === 'melee') {
      quickRoll(meleeAttackDice, false, 6);
      setSelectedDieIndex(meleeAttackDice);
    } else if (type === 'firearm') {
      quickRoll(firearmsAttackDice, false, 6);
      setSelectedDieIndex(firearmsAttackDice);
    } else if (type === 'exotic') {
      quickRoll(exoticWeaponAttackDice, false, 6);
      setSelectedDieIndex(exoticWeaponAttackDice);
    }
  };

  // short timer to prevent rapid re-rolling (or 'cheating' to call a spade a spade.)
  const threeSeconds = 2500;
  const [allowRoll, setAllowRoll] = React.useState(true);

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (allowRoll == false) {
        setAllowRoll(true);
        setDieClass('not-spinning');
      }
    }, threeSeconds);

    // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
    return () => clearInterval(interval);
  }, [open]);

  // handle making the dice spin
  const [dieClass, setDieClass] = React.useState('not-spinning');

  const handleClose = () => {
    setOpen(false);
  };

  const [selectedDieIndex, setSelectedDieIndex] = React.useState(0);
  const [selectedDifficulty, setSelectedDifficulty] = React.useState(6);

  const handleDifficultyChange = (event) => {
    setSelectedDifficulty(event.target.value);
  };

  const handleMouseEnter = (index) => {
    if (allowRoll === true) {
      setSelectedDieIndex(index);
    }
  };

  const [showResult, setShowResult] = React.useState(false);
  const [rollResult, setRollresult] = React.useState('');

  function difficultyRoll(amount, isInitiative, difficulty) {
    // see if a roll has occurred recently
    if (allowRoll == true) {
      // Gets a number b/w 1 and 10
      function getRandomInt() {
        // const min = Math.ceil(1);
        // const max = Math.floor(11);
        // return Math.floor(Math.random() * (max - min) + min);
        // It would be wrong to increase the chance of failure to 14.3%, right?
        const arr = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10];
        return arr[Math.floor(Math.random() * arr.length)];
      }

      // Sorts randomInt
      function rollDiceSorted(amount) {
        let dieArray = [];
        for (let i = 0; i < amount; i++) {
          dieArray.push(getRandomInt());
        }
        return dieArray.sort((a, b) => a - b);
      }

      let resultArray;
      let successes = 0;
      let glitches = 0;

      resultArray = rollDiceSorted(amount);

      let totalTens = 0;

      successes = resultArray.filter((die) => die >= difficulty);
      successes.map((success) => {
        if (success == 10) {
          totalTens += 1;
          if (totalTens == 2) {
            totalTens = 0;
            // Unshift so it does not include bonus 10s as part of the map - seems like it doesn't anyway but better safe.
            successes.unshift(10, 10);
          }
        }
      });

      glitches = resultArray.filter((die) => die == 1);

      let outcome = 0;

      // always being plural makes my eye twitch.
      let hitWord = '';
      let glitchWord = '';

      if (successes.length == 1) {
        hitWord = 'hit';
      } else {
        hitWord = 'hits';
      }
      if (glitches.length == 1) {
        glitchWord = 'glitch';
      } else {
        glitchWord = 'glitches';
      }

      if (successes.length > glitches.length) {
        outcome = `SUCCESS with ${successes.length - glitches.length} ${hitWord}.`;
        // outcome = 0
      } else if (successes.length == glitches.length) {
        outcome = `FAILURE with ${successes.length} ${hitWord} and ${glitches.length} ${glitchWord}.`;
        // outcome = 1
      } else {
        outcome = `BOTCH with ${successes.length} ${hitWord} and ${glitches.length} ${glitchWord}.`;
        // outcome = 2
      }

      setShowResult(true);

      // list dice results:
      let dieResultText = 'You rolled ';
      for (let i = 0; i < resultArray.length; i++) {
        if (i < resultArray.length - 1) {
          dieResultText += `${resultArray[i]}, `;
        } else {
          dieResultText += `${resultArray[i]}`;
        }
      }

      // list initiative outcome
      let initiativeResult = charDetail.reflexes + charDetail.cyber_reflexes + successes.length - glitches.length;

      // Display: You rolled the following: [], resulting in {successes} hits and {glitches} glitches. You have {outcome}!
      if (isInitiative === true) {
        setRollresult(`${dieResultText}. Your initiative is ${initiativeResult}.`);
      } else {
        setRollresult(`${dieResultText}. This is a ${outcome}`);
      }

      // prevent rolling for a moment, and make the dice spin (prevention & rolling timer reset in UseEffect)
      setAllowRoll(false);
      setDieClass('spin-die');
    }
  }

  function diceBuilder(selectedIndex) {
    // return array of SVGs, highlighted and unhighlighted die outlines.
    let diceSVGArray = [];
    for (let i = 0; i < selectedIndex; i++) {
      diceSVGArray.push(
        <React.Fragment key={i}>
          <Grid item xs={1.2} onClick={() => difficultyRoll(i + 1, false, selectedDifficulty)} onMouseEnter={() => handleMouseEnter(i + 1)}>
            <DiceTenHighlighted prop={{ class_id: dieClass }} />
          </Grid>
        </React.Fragment>
      );
    }
    for (let i = selectedIndex; i < 20; i++) {
      diceSVGArray.push(
        <React.Fragment key={i}>
          <Grid item xs={1.2} onMouseEnter={() => handleMouseEnter(i + 1)}>
            <DiceTenBase />
          </Grid>
        </React.Fragment>
      );
    }
    return diceSVGArray;
  }

  const quickRoll = (totalDice, isInitiative, difficultyValue) => {
    if (allowRoll) {
      difficultyRoll(totalDice, isInitiative, difficultyValue);
    }
  };

  const painPenalty = (stun, lethal, agg, cyberBoxes) => {
    let woundAggregator = stun + lethal + agg;
    let painPenalty = painEditor ? [0, 0, 0, 0, 0, -1, -1, -2, -2, -3, -4] : [0, 0, 0, -1, -1, -2, -2, -3, -3, -5, -8];
    let finalPain;

    if (woundAggregator == 0) {
      finalPain = 0;
    } else if (woundAggregator / 2 <= cyberBoxes) {
      finalPain = painPenalty[Math.ceil(woundAggregator / 2)];
    } else {
      finalPain = painPenalty[woundAggregator - cyberBoxes];
    }
    return finalPain;
  };

  const painPenaltyAmount = painPenalty(
    charStatus.current_stun,
    charStatus.current_lethal,
    charStatus.current_agg,
    charStatus.current_cyberware_health_boxes
  );

  const dieChecker = (total) => {
    if (total <= 0) {
      return 1;
    } else {
      return total;
    }
  };
  const meleeAttackDice = dieChecker(charDetail.reflexes + charDetail.cyber_reflexes + charDetail.melee_weapons + painPenaltyAmount);
  const firearmsAttackDice = dieChecker(charDetail.reflexes + charDetail.cyber_reflexes + charDetail.firearms + painPenaltyAmount);
  const exoticWeaponAttackDice = dieChecker(charDetail.reflexes + charDetail.cyber_reflexes + charDetail.exotic_weapons + painPenaltyAmount);
  const quickDodgeDice = dieChecker(charDetail.reflexes + charDetail.cyber_reflexes + painPenaltyAmount);
  const fullDodgeDice = dieChecker(charDetail.reflexes + charDetail.cyber_reflexes + charDetail.evasion + painPenaltyAmount);
  const initiativeDice = dieChecker(charDetail.reflexes + charDetail.cyber_reflexes + painPenaltyAmount);

  return (
    <>
      <Button onClick={handleClickOpen('paper')}>Attack Roll</Button>
      <Dialog
        PaperProps={{
          sx: {
            minHeight: '80vh',
          },
        }}
        open={open}
        onClose={handleClose}
        scroll={scroll}
        maxWidth="lg"
        fullWidth
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Rolling Dice - Hover and click to roll</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <Grid container spacing={1}>
            {diceBuilder(selectedDieIndex)}
            <Grid item xs={12} display={'flex'} justifyContent={'center'}>
              <h3>
                You will roll {selectedDieIndex} Dice with a Difficulty Value of {selectedDifficulty}
              </h3>
            </Grid>

            {charDetail.id > 0 && charStatus.char_id > 0 ? (
              <>
                <Grid container spacing={1} paddingBottom={1}>
                  <Grid item xs={12} display={'flex'} justifyContent={'center'}>
                    <h4 style={{ margin: 0 }}>Quick Actions:</h4>
                  </Grid>

                  <Grid item xs={3} />
                  <Grid item xs={6} display={'flex'} justifyContent={'center'} onClick={() => quickRoll(initiativeDice, true, selectedDifficulty)}>
                    <Button fullWidth variant="contained" color="secondary" onMouseEnter={() => handleMouseEnter(initiativeDice)}>
                      Initiative - add {initiativeDice} to hits! {initiativeDice}d10 @ DV {selectedDifficulty}
                    </Button>
                  </Grid>
                  <Grid item xs={3} />

                  <Grid item xs={6} display={'flex'} justifyContent={'center'} onClick={() => quickRoll(meleeAttackDice, false, selectedDifficulty)}>
                    <Button fullWidth variant="contained" onMouseEnter={() => handleMouseEnter(meleeAttackDice)}>
                      Melee Attack / Parry - {meleeAttackDice}d10 @ DV {selectedDifficulty}
                    </Button>
                  </Grid>

                  <Grid
                    item
                    xs={6}
                    display={'flex'}
                    justifyContent={'center'}
                    onClick={() => quickRoll(firearmsAttackDice, false, selectedDifficulty)}
                  >
                    <Button fullWidth variant="contained" onMouseEnter={() => handleMouseEnter(firearmsAttackDice)}>
                      Firearms Attack - {firearmsAttackDice}d10 @ DV {selectedDifficulty}
                    </Button>
                  </Grid>

                  <Grid item xs={6} display={'flex'} justifyContent={'center'} onClick={() => quickRoll(quickDodgeDice, false, selectedDifficulty)}>
                    <Button fullWidth variant="contained" onMouseEnter={() => handleMouseEnter(quickDodgeDice)}>
                      Quick Dodge - {quickDodgeDice}d10 @ DV {selectedDifficulty}
                    </Button>
                  </Grid>

                  <Grid item xs={6} display={'flex'} justifyContent={'center'} onClick={() => quickRoll(fullDodgeDice, false, selectedDifficulty)}>
                    <Button fullWidth variant="contained" onMouseEnter={() => handleMouseEnter(fullDodgeDice)}>
                      Evade - {fullDodgeDice}d10 @ DV {selectedDifficulty}
                    </Button>
                  </Grid>
                </Grid>
              </>
            ) : (
              <></>
            )}

            <Grid item xs={12}>
              {
                <FormControl fullWidth>
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
                </FormControl>
              }
            </Grid>

            {showResult ? (
              <>
                <Grid item xs={12}>
                  <h2>Roll Result: {rollResult}</h2>
                </Grid>
              </>
            ) : (
              <></>
            )}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
