import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import Item from '../Characters/CharacterSheet/Item';
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';

function CreationAttributes() {
    const fulldot = ` \u2b24`
    const emptydot = ` \u25ef`
    const dispatch = useDispatch()

    const [attributeNumber, setAttributeNumber] = useState(4)
    const [attributeCounter, setAttributeCounter] = useState(1)

    useEffect(() => {
        setAttributes();
    }, [])

    const [strengthAtt, setStrengthAtt] = useState(0);
    const [bodyAtt, setBodyAtt] = useState(0);
    const [reflexesAtt, setReflexesAtt] = useState(0);
    const [moveatt, setMoveAtt] = useState(0);

    // social attributes
    const [appearanceAtt, setAppearanceAtt] = useState(0);
    const [coolAtt, setCoolAtt] = useState(0);
    const [streetCredAtt, setStreetCredAtt] = useState(1);

    // mental attributes
    const [intelligenceAtt, setIntelligenceAtt] = useState(0);
    const [willpowerAtt, setWillpowerAtt] = useState(0)
    const [techniqueAtt, setTechniqueAtt] = useState(0)

    const setAttributes = () => {
        setStrengthAtt(strengthAtt)
        setBodyAtt(bodyAtt)
        setReflexesAtt(reflexesAtt)
        setMoveAtt(moveatt)
        setAppearanceAtt(appearanceAtt)
        setCoolAtt(coolAtt)
        setStreetCredAtt(streetCredAtt)
        setIntelligenceAtt(intelligenceAtt)
        setWillpowerAtt(willpowerAtt)
        setTechniqueAtt(techniqueAtt)
    }

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
                console.log(`Whoopsie`);
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
                move: moveatt,
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
            alert('Not done!')
        }
    }

    return (
        <>
            <h2>Attributes:</h2>
            <h3>To start, select an attribute to be rated at 4. Next, three selections at 3. Another four at 2.</h3>
            {/* <h3>Movement is derived from Reflexes, and Street Cred always starts at 1 for beginning characters.</h3> */}
            <h4>Please click an attribute name to set it at {attributeNumber}</h4>
            <Grid container>
                <Grid item xs={12} textAlign={'center'}>
                    <Button sx={{ margin: 1 }} variant='contained' onClick={() => resetAttributeSelection()}>Start Over</Button>
                    <Button sx={{ margin: 1 }} variant='contained' onClick={() => dispatchAttributes()}>Save Attribute Selection</Button>
                </Grid>
            </Grid>
            <Grid container>
                <Grid xs={1.5} item><Item onClick={() => AttributeSelector('strength')}>Strength</Item></Grid>
                <Grid xs={2.5} item><Item>{dotReturn(strengthAtt)}</Item></Grid>
                <Grid xs={1.5} item><Item onClick={() => AttributeSelector('appearance')}>Appearance</Item></Grid>
                <Grid xs={2.5} item><Item>{dotReturn(appearanceAtt)}</Item></Grid>
                <Grid xs={1.5} item><Item onClick={() => AttributeSelector('intelligence')}>Intelligence</Item></Grid>
                <Grid xs={2.5} item><Item>{dotReturn(intelligenceAtt)}</Item></Grid>
                <Grid xs={1.5} item><Item onClick={() => AttributeSelector('body')}>Body</Item></Grid>
                <Grid xs={2.5} item><Item>{dotReturn(bodyAtt)}</Item></Grid>
                <Grid xs={1.5} item><Item onClick={() => AttributeSelector('cool')}>Cool</Item></Grid>
                <Grid xs={2.5} item><Item>{dotReturn(coolAtt)}</Item></Grid>
                <Grid xs={1.5} item><Item onClick={() => AttributeSelector('willpower')}>Willpower</Item></Grid>
                <Grid xs={2.5} item><Item>{dotReturn(willpowerAtt)}</Item></Grid>
                <Grid xs={1.5} item><Item onClick={() => AttributeSelector('reflexes')}>Reflexes</Item></Grid>
                <Grid xs={2.5} item><Item>{dotReturn(reflexesAtt)}</Item></Grid>
                <Grid xs={1.5} item><Item>Street Cred</Item></Grid>
                <Grid xs={2.5} item><Item>{dotReturn(streetCredAtt)}</Item></Grid>
                <Grid xs={1.5} item><Item onClick={() => AttributeSelector('technique')}>Technique</Item></Grid>
                <Grid xs={2.5} item><Item>{dotReturn(techniqueAtt)}</Item></Grid>
                <Grid xs={1.5} item><Item>Movement</Item></Grid>
                <Grid xs={2.5} item><Item>{dotReturn(moveatt)}</Item></Grid>
            </Grid>
        </>
    )

}

export default CreationAttributes