import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Grid from '@mui/material/Grid';
import Item from '../CharacterSheet/Item';

import OtherAttributesDialog from '../../Modals/OtherAttributesDialog';

import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import HorizontalRuleOutlinedIcon from '@mui/icons-material/HorizontalRuleOutlined';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';

function TransitionUp(props) {
    return <Slide {...props} direction="up" />;
}

export default function AdvancementOther() {

    const dispatch = useDispatch();
    const advancementDetails = useSelector((store) => store.advancementDetail);

    const unhurtMarker = <CircleOutlinedIcon />
    const stunMarker = <HorizontalRuleOutlinedIcon />;
    const aggMarker = <AcUnitIcon />;

    const [showSnackbar, setShowSnackbar] = React.useState(false);
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    // creates 10 boxes; character luck are empty square, unpurchased luck is X'd square.
    const luckBuilder = () => {
        let luckBoxes = []
        // push 1 empty square per point of max luck
        for (let i = 0; i < advancementDetails.max_luck; i++) {
            luckBoxes.push(
                <React.Fragment key={i}>
                    <Grid item xs={2.4}><Item>{unhurtMarker}</Item></Grid>
                </React.Fragment>
            )
        }
        // fill remainder with filled squares.
        for (let i = 0; i < (10 - advancementDetails.max_luck); i++) {
            luckBoxes.push(
                <React.Fragment key={i + 10}>
                    <Grid item xs={2.4}><Item>{aggMarker}</Item></Grid>
                </React.Fragment>
            )
        }
        return luckBoxes
    }

    // returns cost of increasing luck score
    const luckExpReturn = () => {
        return (advancementDetails.max_luck * 2) + ' XP'
    }

    // increase Luck in advancementDetails reducer by sending new max score + amount of XP spent.
    const addLuck = () => {
        let increaseLuckCost = advancementDetails.max_luck * 2
        if (advancementDetails.max_xp - advancementDetails.spent_xp >= increaseLuckCost) {
            dispatch({ type: "INCREASE_LUCK", payload: { newLuck: (advancementDetails.max_luck + 1), increaseLuckCost } })
        } else {
            setShowSnackbar(true)
        }
    }

    // creates 40 entries in an array; permanent cyberware humanity loss repped by an X; temp by a *, and remainining humanity represented by empty square
    // each entry shows up as a box with appropriate mark.
    const humanityArrayBuilder = (tempHumanityLoss, permHumanityLoss) => {
        let humanityArray = []
        for (let i = 0; i < permHumanityLoss; i++) {
            humanityArray.push(
                <Grid key={i} item xs={1.2}><Item>{aggMarker}</Item></Grid>
            )
        }
        for (let i = 0; i < tempHumanityLoss; i++) {
            humanityArray.push(<Grid key={i + 40} item xs={1.2}><Item>{stunMarker}</Item></Grid>)
        }
        if (humanityArray.length < 40) {
            let remainder = 40 - (permHumanityLoss + tempHumanityLoss)
            for (let i = 0; i < remainder; i++) {
                humanityArray.push(<Grid key={i + 80} item xs={1.2}><Item>{unhurtMarker}</Item></Grid>)
            }
        }
        return humanityArray;
    }

    const restoreTemporaryHumanity = () => {
        if (advancementDetails.max_xp - advancementDetails.spent_xp >= 1) {
            dispatch({ type: "REMOVE_TEMP_HUMANITY_LOSS", payload: advancementDetails.temp_humanity_loss - 1 })
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
                Insufficient Experience
            </Alert>
        </Snackbar >
        <h1>Other Traits</h1>
        <Grid container>

            <Grid item xs={6}>
                <Grid container>
                    <Grid item xs={12}><Item><OtherAttributesDialog prop={'Luck'} /></Item></Grid>
                    <Grid item xs={12}>
                        {advancementDetails.max_luck < 10 ? <Item sx={{ cursor: 'pointer' }} onClick={() => addLuck()}>Increase Maximum Luck: {luckExpReturn()} </Item>
                            :
                            <Item>Maximum Luck Achieved!</Item>}

                    </Grid>
                    {luckBuilder()}
                </Grid>
            </Grid>

            <Grid item xs={6}>
                <Grid container>
                    <Grid item xs={12}><Item><OtherAttributesDialog prop={'Humanity'} /></Item></Grid>
                    <Grid item xs={12}>
                        {advancementDetails.temp_humanity_loss > 0 ?
                            <Item sx={{ cursor: 'pointer' }} onClick={() => restoreTemporaryHumanity()}>Restore Temporary Humanity: 1 XP</Item>
                            : <></>}
                        {advancementDetails.temp_humanity_loss === 0 ? <Item>Remove Cyberware to restore additional humanity</Item> : <></>}
                        {advancementDetails.perm_humanity_loss === 0 && advancementDetails.temp_humanity_loss === 0 ? <Item>Maximum Humanity reached</Item> : <></>}
                    </Grid>
                    {humanityArrayBuilder(advancementDetails.temp_humanity_loss, advancementDetails.perm_humanity_loss)}
                </Grid>
            </Grid>

        </Grid>
    </>)
}