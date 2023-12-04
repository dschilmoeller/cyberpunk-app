import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import Item from '../Characters/CharacterSheet/Item';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import AttributesDialog from '../Modals/AttributesDialog';

import CircleIcon from '@mui/icons-material/Circle';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';

import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';

function TransitionUp(props) {
    return <Slide {...props} direction="up" />;
}

function CreationAttributes() {
    const fulldot = <CircleIcon />
    const emptydot = <CircleOutlinedIcon />

    const dispatch = useDispatch()

    const charDetail = useSelector(store => store.characterCreation)
    const creationReviewReached = useSelector(store => store.characterCreation.creationReviewReached)

    const [showSnackbar, setShowSnackbar] = React.useState(false);
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    // state for tracking amount to apply to each attribute, and how many have been selected.
    const [attributeNumber, setAttributeNumber] = useState(4)
    const [attributeCounter, setAttributeCounter] = useState(1)

    // New method of tracking stats.
    const [statTracker, setStatTracker] = useState([])

    useEffect(() => {
        setStatTracker([
            { attName: 'Strength', value: charDetail.strength },
            { attName: 'Appearance', value: charDetail.appearance },
            { attName: 'Intelligence', value: charDetail.intelligence },
            { attName: 'Body', value: charDetail.body },
            { attName: 'Cool', value: charDetail.cool },
            { attName: 'Willpower', value: charDetail.willpower },
            { attName: 'Reflexes', value: charDetail.reflexes },
            { attName: 'Street Cred', value: 1 },
            { attName: 'Technique', value: charDetail.technique },
        ])
    }, [charDetail])

    const [statSelectionOrder, setStatSelectionOrder] = useState([])

    const dotReturn = (attribute) => {
        let returnedDots = []

        for (let i = 0; i < attribute; i++) {
            returnedDots.push(
                <React.Fragment key={i}>{fulldot}</React.Fragment>);
        }
        let j = attribute
        for (j; j <= 4; j++) {
            returnedDots.push(<React.Fragment key={j + 5}>{emptydot}</React.Fragment>);
        }
        return returnedDots
    }

    const AttributeSelector = (attribute) => {
        dispatch({ type: 'CREATION_UPDATE_ATT', payload: { att: attribute.toLowerCase(), value: attributeNumber } })
        increaseCounter()
        setStatSelectionOrder([...statSelectionOrder, attribute.toLowerCase()])
    }
    
    const undoLastSelection = () => {
        dispatch({ type: 'CREATION_UPDATE_ATT', payload: { att: statSelectionOrder.pop(), value: 0 } })
        decreaseCounter();
    }

    const increaseCounter = () => {
        if (attributeCounter >= 1 && attributeCounter <= 3) {
            setAttributeNumber(3)
            setAttributeCounter(attributeCounter + 1);
            return;
        } else if (attributeCounter > 3 && attributeCounter <= 6) {
            setAttributeNumber(2)
            setAttributeCounter(attributeCounter + 1);
            return;
        } else if (attributeCounter > 6) {
            setAttributeNumber(1)
            setAttributeCounter(attributeCounter + 1);
            return;
        }
    }

    const decreaseCounter = () => {
        if (attributeCounter === 1){
            console.log(`Error - no selection made`);
            return;
        } else if (attributeCounter === 2) {
            setAttributeCounter(attributeCounter - 1)
            setAttributeNumber(4)
            return;
        } else if (attributeCounter > 2 && attributeCounter <= 5) {
            setAttributeCounter(attributeCounter - 1)
            setAttributeNumber(3)
            return;
        } else if (attributeCounter > 5 && attributeCounter <= 8) {
            setAttributeCounter(attributeCounter - 1)
            setAttributeNumber(2)
        } else if (attributeCounter > 8) {
            setAttributeCounter(attributeCounter - 1)
            setAttributeNumber(1)
        } else {
            console.log(`Error decreasing counter`);
        }
    }

    const resetAttributeSelection = () => {
        dispatch({ type: 'CREATION_RESET_ATTRIBUTES' })
        setAttributeCounter(1)
        setAttributeNumber(4)
    }

    const saveAttributes = () => {

        const attValueArray = statTracker.map(item => item.value > 0)
        const checker = arr => arr.every(v => v === true);

        if (attributeCounter >= 9 && creationReviewReached === false) {
            dispatch({ type: 'SET_CREATION_STEP', payload: 'skills' })
        } else if (checker(attValueArray) === true && creationReviewReached === true) {
            dispatch({ type: 'SET_CREATION_STEP', payload: 'review' })
        } else {
            setShowSnackbar(true)
        }
    }

    
    return (
        <>

            <Snackbar
                TransitionComponent={TransitionUp}
                autoHideDuration={2000}
                open={showSnackbar}
                onClose={() => setShowSnackbar(false)}
                anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
            >
                <Alert onClose={() => setShowSnackbar(false)} severity="warning" sx={{ width: '100%' }}>
                    Please ensure you have selected all the necessary attributes!
                </Alert>
            </Snackbar >


            <Grid container display={'flex'} justifyContent={'center'} spacing={1}>
                <Grid item xs={12}><Item sx={{ height: 1 }}><Typography variant='h4'>Attributes:</Typography></Item></Grid>
                <Grid item xs={12}><Item sx={{ height: 1 }}>Attributes are the fundamental traits of your character - almost all rolls in Cyberpumpkin use one Attribute + a skill or other trait.</Item></Grid>
                <Grid item xs={12}><Item sx={{ height: 1 }}>Selections: One attribute is your primary, and is selected at 4 - this is your most outstanding attribute, far beyond the average person. Three additional attributes are selected at 3; these are your characters other above average traits. Three additional attributes are selected at 2 - this is about average for most humans - and finally one attribute is selected at 1 - you can't excel at everything, unfortunately.</Item></Grid>
                <Grid item xs={12}><Item sx={{ height: 1 }}>Special Attributes: All characters start with 1 Street Cred.</Item></Grid>
                <Grid item xs={12}><Item sx={{ height: 1 }}>Click an attribute name to learn more about it, including examples of what different ranks might look like!</Item></Grid>
            </Grid>

            <Grid container>
                <Grid item xs={12} textAlign={'center'}>
                    <Button sx={{ margin: 1 }} variant='contained' onClick={() => resetAttributeSelection()}>Reset Attribute Selection</Button>
                    <Button sx={{ margin: 1 }} variant='contained' onClick={() => saveAttributes()}>Save Attributes</Button>
                    <Button sx={{ margin: 1 }} variant='contained' onClick={() => undoLastSelection()}>undo last</Button>
                    {/* <Button sx={{ margin: 1 }} variant='contained' onClick={() => instaFill()}>Quick Fill</Button> */}
                </Grid>
            </Grid>

            <Grid container>
                {statTracker.map(stat => {
                    return (
                        <React.Fragment key={stat.attName}>
                            <Grid item xs={4}>
                                <Grid container>
                                    <Grid xs={4} item><Item><AttributesDialog prop={stat.attName} /></Item></Grid>
                                    {stat.value === 0 ? <Grid xs={8} item>
                                        <Item sx={{ cursor: 'pointer' }} onClick={() => AttributeSelector(stat.attName)}>Select at {attributeNumber} points</Item>
                                    </Grid>
                                        : <>
                                            {/* deals with Move att having string value rather than an integer to start */}
                                            <Grid xs={8} item><Item>{dotReturn(stat.value)}</Item></Grid>
                                        </>}
                                </Grid>
                            </Grid>
                        </React.Fragment>
                    )
                })}

            </Grid>
        </>
    )
}

export default CreationAttributes