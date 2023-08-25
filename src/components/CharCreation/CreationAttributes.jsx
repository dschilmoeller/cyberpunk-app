import React, { useState } from 'react';
import { Grid } from '@mui/material';
import Item from '../Characters/CharacterSheet/Item';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import AttributesDialog from '../Modals/AttributesDialog';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';

function TransitionUp(props) {
    return <Slide {...props} direction="up" />;
}

function CreationAttributes() {
    const fulldot = ` \u2b24`
    const emptydot = ` \u25ef`
    const dispatch = useDispatch()
    const charDetail = useSelector(store => store.characterCreation)

    const [showSnackbar, setShowSnackbar] = React.useState(false);
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    // state for tracking amount to apply to each attribute, and how many have been selected.
    const [attributeNumber, setAttributeNumber] = useState(4)
    const [attributeCounter, setAttributeCounter] = useState(1)

    // sets selection if returning to this page. All state is tracked through characterCreationDetail reducer
    // and fired into the database during the review stage.
    // physical attributes
    const [strengthAtt, setStrengthAtt] = useState(charDetail.strength);
    const [bodyAtt, setBodyAtt] = useState(charDetail.body);
    const [reflexesAtt, setReflexesAtt] = useState(charDetail.reflexes);
    const [moveatt, setMoveAtt] = useState(0);

    // social attributes
    const [appearanceAtt, setAppearanceAtt] = useState(charDetail.appearance);
    const [coolAtt, setCoolAtt] = useState(charDetail.cool);
    const [streetCredAtt, setStreetCredAtt] = useState(charDetail.street_cred);

    // mental attributes
    const [intelligenceAtt, setIntelligenceAtt] = useState(charDetail.intelligence);
    const [willpowerAtt, setWillpowerAtt] = useState(charDetail.willpower)
    const [techniqueAtt, setTechniqueAtt] = useState(charDetail.technique)

    const dotReturn = (attribute) => {
        let returnedDots = ''

        for (let i = 0; i < attribute; i++) {
            returnedDots += fulldot;
        }
        let j = attribute
        for (j; j <= 4; j++) {
            returnedDots += emptydot
        }
        return returnedDots
    }

    // goes through selections and sets attribute to the current attributeNumber, then changes the counter
    // and if necessary, the attributeNumber for the next selection.
    const AttributeSelector = (attribute) => {
        switch (attribute) {
            case ('strength'):
                if (strengthAtt === 0) {
                    setStrengthAtt(attributeNumber);
                    dealWithCounter();
                    break;
                } else {
                    alert('Already selected!')
                    break;
                }
            case 'body':
                if (bodyAtt === 0) {
                    setBodyAtt(attributeNumber);
                    dealWithCounter();
                    break;
                } else {
                    alert('Already selected!')
                    break;
                }
            case 'reflexes':
                if (reflexesAtt === 0) {
                    setReflexesAtt(attributeNumber)
                    setMoveAtt(Math.ceil(attributeNumber / 2))
                    dealWithCounter();
                    break;
                } else {
                    alert('Already selected!')
                    break;
                }
            case 'appearance':
                if (appearanceAtt === 0) {
                    setAppearanceAtt(attributeNumber)
                    dealWithCounter();
                    break;
                } else {
                    alert('Already selected!')
                    break;
                }
            case 'cool':
                if (coolAtt === 0) {
                    setCoolAtt(attributeNumber);
                    dealWithCounter();
                    break;
                } else {
                    alert('Already selected!')
                    break;
                }
            case 'intelligence':
                if (intelligenceAtt === 0) {
                    setIntelligenceAtt(attributeNumber);
                    dealWithCounter();
                    break;
                } else {
                    alert('Already selected!')
                    break;
                }
            case 'willpower':
                if (willpowerAtt === 0) {
                    setWillpowerAtt(attributeNumber);
                    dealWithCounter();
                    break;
                } else {
                    alert('Already selected!')
                    break;
                }
            case 'technique':
                if (techniqueAtt === 0) {
                    setTechniqueAtt(attributeNumber)
                    dealWithCounter();
                    break;
                } else {
                    alert('Already selected!')
                    break;
                }
            default:
                console.log(`Attribute Selector Whoopsie!`, attribute);
                break;
        }
    }

    const dealWithCounter = () => {
        setAttributeCounter(attributeCounter + 1);
        if (attributeCounter > 0) {
            setAttributeNumber(3)
        }
        if (attributeCounter > 3) {
            setAttributeNumber(2)
        }
        if (attributeCounter > 6) {
            setAttributeNumber(1)
        }
    }

    const resetAttributeSelection = () => {
        setAttributeNumber(4);
        setAttributeCounter(1);
        setStrengthAtt(0);
        setBodyAtt(0);
        setReflexesAtt(0);
        setMoveAtt(0);
        setAppearanceAtt(0);
        setCoolAtt(0);
        setIntelligenceAtt(0);
        setWillpowerAtt(0);
        setTechniqueAtt(0);
    }

    const dispatchAttributes = () => {
        if (strengthAtt > 0 && bodyAtt > 0 && reflexesAtt > 0 && appearanceAtt > 0 && coolAtt > 0 && intelligenceAtt > 0 && willpowerAtt > 0 && techniqueAtt > 0) {
            const attributes = {
                strength: strengthAtt,
                body: bodyAtt,
                reflexes: reflexesAtt,
                appearance: appearanceAtt,
                cool: coolAtt,
                street_cred: streetCredAtt,
                intelligence: intelligenceAtt,
                willpower: willpowerAtt,
                technique: techniqueAtt
            }
            dispatch({ type: 'SET_CREATION_ATTRIBUTES', payload: attributes })
            dispatch({ type: 'SET_CREATION_STEP', payload: 'skills' })
        } else {
            setShowSnackbar(true)
        }
    }

    // quick fill for faster demo/testing purposes.
    // const instaFill = () => {
    //     setAttributeNumber(1);
    //     setAttributeCounter(7);
    //     setStrengthAtt(2);
    //     setBodyAtt(2);
    //     setReflexesAtt(3);
    //     setMoveAtt(2);
    //     setAppearanceAtt(1);
    //     setCoolAtt(3);
    //     setIntelligenceAtt(2);
    //     setWillpowerAtt(3);
    //     setTechniqueAtt(4);
    // }

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


            <h2>Attributes:</h2>
            <h3>Attributes are the fundamental traits of your character - almost all rolls in Cyberpumpkin use one Attribute + a skill or other trait.</h3>
            <h3>One Attribute is selected at 4; three more are at 3. Then, select three more at 2 - this is about average for most humans - and finally one attribute is selected at 1.</h3>
            <h3>Movement is always derived from Reflexes, and all characters start with 1 Street Cred.</h3>
            <h3>Click an attribute name to learn more about it, including examples!</h3>

            <Grid container>
                <Grid item xs={12} textAlign={'center'}>
                    <Button sx={{ margin: 1 }} variant='contained' onClick={() => resetAttributeSelection()}>Reset Attribute Selection</Button>
                    <Button sx={{ margin: 1 }} variant='contained' onClick={() => dispatchAttributes()}>Save Attributes</Button>
                    {/* <Button sx={{ margin: 1 }} variant='contained' onClick={() => instaFill()}>Quick Fill</Button> */}
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={4}>
                    <Grid container>
                        <Grid xs={4} item><Item><AttributesDialog prop={'Strength'} /></Item></Grid>
                        {strengthAtt === 0 ? <Grid xs={8} item>
                            <Item sx={{ cursor: 'pointer' }} onClick={() => AttributeSelector('strength')}>Select at {attributeNumber} points</Item>
                        </Grid>
                            : <>
                                <Grid xs={8} item><Item>{dotReturn(strengthAtt)}</Item></Grid>
                            </>}
                        <Grid xs={4} item><Item><AttributesDialog prop={'Body'} /></Item></Grid>
                        {bodyAtt === 0 ? <Grid xs={8} item>
                            <Item sx={{ cursor: 'pointer' }} onClick={() => AttributeSelector('body')}>Select at {attributeNumber} points</Item>
                        </Grid>
                            : <>
                                <Grid xs={8} item><Item>{dotReturn(bodyAtt)}</Item></Grid>
                            </>}
                        <Grid xs={4} item><Item><AttributesDialog prop={'Reflexes'} /></Item></Grid>
                        {reflexesAtt === 0 ? <Grid xs={8} item>
                            <Item sx={{ cursor: 'pointer' }} onClick={() => AttributeSelector('reflexes')}>Select at {attributeNumber} points</Item>
                        </Grid>
                            : <>
                                <Grid xs={8} item><Item>{dotReturn(reflexesAtt)}</Item></Grid>
                            </>}
                        <Grid xs={4} item><Item><AttributesDialog prop={'Move'} /></Item></Grid>
                        {reflexesAtt === 0 ? <Grid xs={8} item>
                            <Item>Derived from Reflexes</Item>
                        </Grid>
                            : <>
                                <Grid xs={8} item><Item>{dotReturn(moveatt)}</Item></Grid>
                            </>}
                    </Grid>
                </Grid>

                <Grid item xs={4}>
                    <Grid container>
                        <Grid xs={4} item><Item><AttributesDialog prop={'Appearance'} /></Item></Grid>
                        {appearanceAtt === 0 ? <Grid xs={8} item>
                            <Item sx={{ cursor: 'pointer' }} onClick={() => AttributeSelector('appearance')}>Select at {attributeNumber} points</Item>
                        </Grid>
                            : <>
                                <Grid xs={8} item><Item>{dotReturn(appearanceAtt)}</Item></Grid>
                            </>}
                        <Grid xs={4} item><Item><AttributesDialog prop={'Cool'} /></Item></Grid>
                        {coolAtt === 0 ? <Grid xs={8} item>
                            <Item sx={{ cursor: 'pointer' }} onClick={() => AttributeSelector('cool')}>Select at {attributeNumber} points</Item>
                        </Grid>
                            : <>
                                <Grid xs={8} item><Item>{dotReturn(coolAtt)}</Item></Grid>
                            </>}
                        <Grid xs={4} item><Item><AttributesDialog prop={'Street Cred'} /></Item></Grid>
                        <Grid xs={8} item><Item>{dotReturn(streetCredAtt)}</Item></Grid>
                    </Grid>
                </Grid>

                <Grid item xs={4}>
                    <Grid container>
                        <Grid xs={4} item><Item><AttributesDialog prop={'Intelligence'} /></Item></Grid>
                        {intelligenceAtt === 0 ? <Grid xs={8} item>
                            <Item sx={{ cursor: 'pointer' }} onClick={() => AttributeSelector('intelligence')}>Select at {attributeNumber} points</Item>
                        </Grid>
                            : <>
                                <Grid xs={8} item><Item>{dotReturn(intelligenceAtt)}</Item></Grid>
                            </>}
                        <Grid xs={4} item><Item><AttributesDialog prop={'Willpower'} /></Item></Grid>
                        {willpowerAtt === 0 ? <Grid xs={8} item>
                            <Item sx={{ cursor: 'pointer' }} onClick={() => AttributeSelector('willpower')}>Select at {attributeNumber} points</Item>
                        </Grid>
                            : <>
                                <Grid xs={8} item><Item>{dotReturn(willpowerAtt)}</Item></Grid>
                            </>}
                        <Grid xs={4} item><Item><AttributesDialog prop={'Technique'} /></Item></Grid>
                        {techniqueAtt === 0 ? <Grid xs={8} item>
                            <Item sx={{ cursor: 'pointer' }} onClick={() => AttributeSelector('technique')}>Select at {attributeNumber} points</Item>
                        </Grid>
                            : <>
                                <Grid xs={8} item><Item>{dotReturn(techniqueAtt)}</Item></Grid>
                            </>}
                    </Grid>
                </Grid>
            </Grid>
        </>
    )

}

export default CreationAttributes