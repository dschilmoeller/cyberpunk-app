import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@mui/material';

import Grid from '@mui/material/Grid';
import Item from '../Characters/CharacterSheet/Item';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';

import AttributesDialog from '../Modals/AttributesDialog';

import CircleIcon from '@mui/icons-material/Circle';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import SquareIcon from '@mui/icons-material/Square';
import CheckBoxOutlineBlankOutlinedIcon from '@mui/icons-material/CheckBoxOutlineBlankOutlined'

function TransitionUp(props) {
    return <Slide {...props} direction="up" />;
}

export default function GameMasterAttributes() {

    const dispatch = useDispatch();

    const charDetail = useSelector(store => store.advancementDetail)

    const [showSnackbar, setShowSnackbar] = React.useState(false);
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const fullCircle = <CircleIcon />
    const emptyCircle = <CircleOutlinedIcon />
    const fullBox = <SquareIcon />
    const boxOutline = <CheckBoxOutlineBlankOutlinedIcon />

    const attDotReturn = (attribute, cyberAtt) => {
        let returnedDots = []
        for (let i = 0; i < attribute; i++) {
            returnedDots.push(<React.Fragment key={i}>{fullCircle}</React.Fragment>)
        }
        let j = attribute
        for (j; j <= 4; j++) {
            returnedDots.push(<React.Fragment key={j + 5}>{emptyCircle}</React.Fragment>)
        }
        for (let b = 0; b < cyberAtt; b++) {
            returnedDots.push(<React.Fragment key={b + 10}>{fullBox}</React.Fragment>)
        }
        let k = cyberAtt
        for (k; k <= 4; k++) {
            returnedDots.push(<React.Fragment key={k + 15}>{boxOutline}</React.Fragment>)
        }
        return returnedDots
    }

    const tenPointAttRetrun = (attribute) => {
        let returnedDots = []
        for (let i = 0; i < attribute; i++) {
            returnedDots.push(fullCircle)
        }
        let j = attribute
        for (j; j <= 9; j++) {
            returnedDots.push(emptyCircle)
        }
        return returnedDots
    }

    const attLevelChange = (statToChange, currentStat, changeType) => {
        let newTotalExp;
        let newSpentTotalExp;
        
        if (currentStat < 5 && changeType === 'increase') {
            newTotalExp = charDetail.max_xp + ((currentStat + 1) * 5)
            newSpentTotalExp = charDetail.spent_xp + ((currentStat + 1) * 5)
            currentStat += 1
            dispatch({
                type: "GM_INCREASE_STAT", payload: {
                    statToChange: statToChange,
                    newStatAmount: currentStat,
                    // newTotalExp: newTotalExp,
                    // newSpentTotalExp: newSpentTotalExp
                }
            })
        } else if (currentStat > 1 && changeType === 'decrease') {
            // should generate enough XP to cover any changes made. Only good if the rest of the calculations are bulletproof.
            // leave for now.
            // newTotalExp = charDetail.max_xp + ((currentStat) * 5)
            currentStat -= 1
            dispatch({
                type: "GM_DECREASE_STAT", payload: {
                    statToChange: statToChange,
                    newStatAmount: currentStat,
                    // newTotalExp: newTotalExp
                }
            })
        } else {
            setShowSnackbar(true)
        }

    }

    const tenPointAttLevelChange = (statToChange, currentStat, changeType) => {
        let newTotalExp
        let newSpentTotalExp
        if (currentStat < 10 && changeType === 'increase') {
            newTotalExp = charDetail.max_xp + ((currentStat + 1) * 5)
            newSpentTotalExp = charDetail.spent_xp + ((currentStat + 1) * 5)
            currentStat += 1
            dispatch({
                type: "GM_INCREASE_STAT", payload: {
                    statToChange: statToChange,
                    newStatAmount: currentStat,
                    newTotalExp: newTotalExp,
                    newSpentTotalExp: newSpentTotalExp
                }
            })
        } else if (currentStat > 1 && changeType === 'decrease') {
            // newTotalExp = charDetail.max_xp + ((currentStat) * 5)
            currentStat -= 1
            dispatch({
                type: "GM_DECREASE_STAT", payload: {
                    statToChange: statToChange,
                    newStatAmount: currentStat,
                    // newTotalExp: newTotalExp
                }
            })
        } else {
            setShowSnackbar(true)
        }
    }


    return (<>

        <Snackbar
            TransitionComponent={TransitionUp}
            autoHideDuration={2000}
            open={showSnackbar}
            onClose={() => setShowSnackbar(false)}
            anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
        >
            <Alert onClose={() => setShowSnackbar(false)} severity="warning" sx={{ width: '100%' }}>
                Can't make selected change!
            </Alert>
        </Snackbar>

        <Grid container paddingTop={3} spacing={3} alignContent={'center'}>
            <Grid item xs={12}>
                <Grid container spacing={1}>
                    <Grid xs={3} item><Item><AttributesDialog prop={'Strength'} /></Item></Grid>
                    <Grid xs={3} item><Item>{attDotReturn(charDetail.strength, charDetail.cyber_strength)}</Item></Grid>
                    <Grid xs={3} item><Item><Button variant='contained' color='success' onClick={() => attLevelChange('strength', charDetail.strength, 'increase')}>Increase</Button></Item></Grid>
                    <Grid xs={3} item><Item><Button variant='contained' color='error' onClick={() => attLevelChange('strength', charDetail.strength, 'decrease')}>Decrease</Button></Item></Grid>

                    <Grid xs={3} item><Item><AttributesDialog prop={'Body'} /></Item></Grid>
                    <Grid xs={3} item><Item>{attDotReturn(charDetail.body, charDetail.cyber_body)}</Item></Grid>
                    <Grid xs={3} item><Item><Button variant='contained' color='success' onClick={() => attLevelChange('body', charDetail.body, 'increase')}>Increase</Button></Item></Grid>
                    <Grid xs={3} item><Item><Button variant='contained' color='error' onClick={() => attLevelChange('body', charDetail.body, 'decrease')}>Decrease</Button></Item></Grid>

                    <Grid xs={3} item><Item><AttributesDialog prop={'Reflexes'} /></Item></Grid>
                    <Grid xs={3} item><Item>{attDotReturn(charDetail.reflexes, charDetail.cyber_reflexes)}</Item></Grid>
                    <Grid xs={3} item><Item><Button variant='contained' color='success' onClick={() => attLevelChange('reflexes', charDetail.reflexes, 'increase')}>Increase</Button></Item></Grid>
                    <Grid xs={3} item><Item><Button variant='contained' color='error' onClick={() => attLevelChange('reflexes', charDetail.reflexes, 'decrease')}>Decrease</Button></Item></Grid>

                </Grid>
            </Grid>

            <Grid item xs={12}>
                <Grid container spacing={1}>
                    <Grid xs={3} item><Item><AttributesDialog prop={'Appearance'} /></Item></Grid>
                    <Grid xs={3} item><Item>{attDotReturn(charDetail.appearance, charDetail.cyber_appearance)}</Item></Grid>
                    <Grid xs={3} item><Item><Button variant='contained' color='success' onClick={() => attLevelChange('appearance', charDetail.appearance, 'increase')}>Increase</Button></Item></Grid>
                    <Grid xs={3} item><Item><Button variant='contained' color='error' onClick={() => attLevelChange('appearance', charDetail.appearance, 'decrease')}>Decrease</Button></Item></Grid>

                    <Grid xs={3} item><Item><AttributesDialog prop={'Cool'} /></Item></Grid>
                    <Grid xs={3} item><Item>{attDotReturn(charDetail.cool, charDetail.cyber_cool)}</Item></Grid>
                    <Grid xs={3} item><Item><Button variant='contained' color='success' onClick={() => attLevelChange('cool', charDetail.cool, 'increase')}>Increase</Button></Item></Grid>
                    <Grid xs={3} item><Item><Button variant='contained' color='error' onClick={() => attLevelChange('cool', charDetail.cool, 'decrease')}>Decrease</Button></Item></Grid>

                    <Grid xs={3} item><Item><AttributesDialog prop={'Street Cred'} /></Item></Grid>
                    <Grid xs={3} item><Item>{tenPointAttRetrun(charDetail.street_cred)}</Item></Grid>
                    <Grid xs={3} item><Item><Button variant='contained' color='success' onClick={() => tenPointAttLevelChange('street_cred', charDetail.street_cred, 'increase')}>Increase</Button></Item></Grid>
                    <Grid xs={3} item><Item><Button variant='contained' color='error' onClick={() => tenPointAttLevelChange('street_cred', charDetail.street_cred, 'decrease')}>Decrease</Button></Item></Grid>
                </Grid>
            </Grid>

            <Grid item xs={12}>
                <Grid container spacing={1}>
                    <Grid xs={3} item><Item><AttributesDialog prop={'Intelligence'} /></Item></Grid>
                    <Grid xs={3} item><Item>{attDotReturn(charDetail.intelligence, charDetail.cyber_intelligence)}</Item></Grid>
                    <Grid xs={3} item><Item><Button variant='contained' color='success' onClick={() => attLevelChange('intelligence', charDetail.intelligence, 'increase')}>Increase</Button></Item></Grid>
                    <Grid xs={3} item><Item><Button variant='contained' color='error' onClick={() => attLevelChange('intelligence', charDetail.intelligence, 'decrease')}>Decrease</Button></Item></Grid>

                    <Grid xs={3} item><Item><AttributesDialog prop={'Willpower'} /></Item></Grid>
                    <Grid xs={3} item><Item>{tenPointAttRetrun(charDetail.willpower)}</Item></Grid>
                    <Grid xs={3} item><Item><Button variant='contained' color='success' onClick={() => tenPointAttLevelChange('willpower', charDetail.willpower, 'increase')}>Increase</Button></Item></Grid>
                    <Grid xs={3} item><Item><Button variant='contained' color='error' onClick={() => tenPointAttLevelChange('willpower', charDetail.willpower, 'decrease')}>Decrease</Button></Item></Grid>

                    <Grid xs={3} item><Item><AttributesDialog prop={'Technique'} /></Item></Grid>
                    <Grid xs={3} item><Item>{tenPointAttRetrun(charDetail.technique)}</Item></Grid>
                    <Grid xs={3} item><Item><Button variant='contained' color='success' onClick={() => tenPointAttLevelChange('technique', charDetail.technique, 'increase')}>Increase</Button></Item></Grid>
                    <Grid xs={3} item><Item><Button variant='contained' color='error' onClick={() => tenPointAttLevelChange('technique', charDetail.technique, 'decrease')}>Decrease</Button></Item></Grid>
                </Grid>
            </Grid>

            <Grid item xs={12}>
                <Grid container spacing={1}>
                    <Grid xs={3} item><Item><AttributesDialog prop={'Luck'} /></Item></Grid>
                    <Grid xs={3} item><Item>{tenPointAttRetrun(charDetail.max_luck)}</Item></Grid>
                    <Grid xs={3} item><Item><Button variant='contained' color='success' onClick={() => tenPointAttLevelChange('max_luck', charDetail.max_luck, 'increase')}>Increase</Button></Item></Grid>
                    <Grid xs={3} item><Item><Button variant='contained' color='error' onClick={() => tenPointAttLevelChange('max_luck', charDetail.max_luck, 'decrease')}>Decrease</Button></Item></Grid>
                </Grid>
            </Grid>
        </Grid >
    </>)
}
