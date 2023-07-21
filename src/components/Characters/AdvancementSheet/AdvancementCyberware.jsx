import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Button } from '@mui/material';

export default function AdvancementCyberware() {
    const dispatch = useDispatch()
    const charCyberware = useSelector(store => store.advancementGear.cyberware)
    const charDetails = useSelector(store => store.advancementDetail[0])
    const charCyberwareSlots = useSelector(store => store.advancementGear.cyberwareSlots)

    const [selectedList, setSelectedList] = useState('fashionware')

    const [fashionSlots, setFashionSlots] = useState(charCyberwareSlots.fashion_slots)
    const [neuralSlots, setNeuralSlots] = useState(charCyberwareSlots.neural_slots)
    const [opticSlots, setOpticSlots] = useState(charCyberwareSlots.optic_slots)
    const [cyberaudioSlots, setCyberaudioSlots] = useState(charCyberwareSlots.cyberaudio_slots)
    const [internalwareSlots, setInternalwareSlots] = useState(charCyberwareSlots.internalware_slots)
    const [externalwareSlots, setExternalwareSlots] = useState(charCyberwareSlots.externalware_slots)
    const [cyberarmSlots, setCyberarmSlots] = useState(charCyberwareSlots.cyberarm_slots)
    const [cyberlegSlots, setCyberlegSlots] = useState(charCyberwareSlots.cyberleg_slots)

    // will need to useEffect to map through owned cyberware on page load
    // and change slots based on map results. Very similar to equip/unequip trees.

    const equipCyber = (incomingCyber) => {
        const slotter = {
            fashionSlots,
            neuralSlots,
            opticSlots,
            cyberaudioSlots,
            internalwareSlots,
            externalwareSlots,
            cyberarmSlots,
            cyberlegSlots
        }
        // dealing with slot count.
        // need to send which slot to change with the equip payload somehow.
        // payload = slotName: slotName +/- x => ...state, cyberwareSlots: ...state, action.payload.slotname: action.payload.slotnumber

        switch (incomingCyber.type) {
            case 'fashionware':
                if (fashionSlots > 0) {
                    setFashionSlots(fashionSlots - 1)
                    dispatch({ type: 'EQUIP_CYBERWARE', payload: {incomingCyber: incomingCyber, slot_type: 'fashion_slots', slot_count: fashionSlots - 1 }})
                    break;
                } else {
                    alert('Not enough slots - try getting being less fashionable!')
                    break;
                }

            // handle equipping cyberAudio
            case 'cyberaudio':
                if (incomingCyber.name === 'Basic Cyberaudio Suite') {
                    setCyberaudioSlots(3)
                    dispatch({ type: 'EQUIP_CYBERWARE', payload: {incomingCyber: incomingCyber, slot_type: 'cyberaudio_slots', slot_count: 3 } })
                    dispatch({ type: 'HUMANITY_LOSS_CYBERWARE', payload: { totalLoss: Number(humanityLossCalculator(incomingCyber.humanity_loss_min, incomingCyber.humanity_loss_max)), minLoss: Number(incomingCyber.humanity_loss_min) } })
                    break;
                } else if (cyberaudioSlots > 0) {
                    setCyberaudioSlots(cyberaudioSlots - 1)
                    dispatch({ type: 'EQUIP_CYBERWARE', payload: {incomingCyber: incomingCyber, slot_type: 'cyberaudio_slots', slot_count: cyberaudioSlots - 1 } })
                    break;
                } else {
                    alert("Not enough slots - make sure you have a cyberaudio suite installed and it isn't full!")
                    break;
                }

            // Handle equipping Neuralware.
            case 'neuralware':
                if (incomingCyber.name === 'Basic Neural Link') {
                    setNeuralSlots(5)
                    dispatch({ type: 'EQUIP_CYBERWARE', payload: {incomingCyber: incomingCyber, slot_type: 'neural_slots', slot_count: 5 } })
                    dispatch({ type: 'HUMANITY_LOSS_CYBERWARE', payload: { totalLoss: Number(humanityLossCalculator(incomingCyber.humanity_loss_min, incomingCyber.humanity_loss_max)), minLoss: Number(incomingCyber.humanity_loss_min) } })
                    break;
                } else if (neuralSlots > 0) {
                    setNeuralSlots(neuralSlots - 1)
                    dispatch({ type: 'EQUIP_CYBERWARE', payload: {incomingCyber: incomingCyber, slot_type: 'neural_slots', slot_count: neuralSlots - 1 } })
                    break;
                } else {
                    alert("Not enough slots - make sure you have a neural link installed and it isn't full!")
                    break;
                }

            // handle eqiupping cybereyes
            case 'cyberoptics':
                if (incomingCyber.name === 'Basic Cybereyes') {
                    setOpticSlots(3)
                    dispatch({ type: 'EQUIP_CYBERWARE', payload: {incomingCyber: incomingCyber, slot_type: 'optic_slots', slot_count: 3 } })
                    dispatch({ type: 'HUMANITY_LOSS_CYBERWARE', payload: { totalLoss: Number(humanityLossCalculator(incomingCyber.humanity_loss_min, incomingCyber.humanity_loss_max)), minLoss: Number(incomingCyber.humanity_loss_min) } })
                    break;
                } else if (opticSlots > 0) {
                    setOpticSlots(opticSlots - 1)
                    dispatch({ type: 'EQUIP_CYBERWARE', payload: {incomingCyber: incomingCyber, slot_type: 'optic_slots', slot_count: opticSlots - 1 } })
                    break;
                } else {
                    alert("Not enough slots - make sure you have cybereyes and they aren't already full!")
                    break;
                }

            // handle equipping internalware
            case 'internalware':
                if (internalwareSlots > 0) {
                    setInternalwareSlots(internalwareSlots - 1)
                    dispatch({ type: 'EQUIP_CYBERWARE', payload: {incomingCyber: incomingCyber, slot_type: 'internalware_slots', slot_count: internalwareSlots - 1 } })
                    dispatch({ type: 'HUMANITY_LOSS_CYBERWARE', payload: { totalLoss: Number(humanityLossCalculator(incomingCyber.humanity_loss_min, incomingCyber.humanity_loss_max)), minLoss: Number(incomingCyber.humanity_loss_min) } })
                    break;
                } else {
                    alert("Not enough slots - you're full up!")
                    break;
                }

            // handle externalware
            case 'externalware':
                if (externalwareSlots > 0) {
                    setExternalwareSlots(externalwareSlots - 1)
                    dispatch({ type: 'EQUIP_CYBERWARE', payload: {incomingCyber: incomingCyber, slot_type: 'externalware_slots', slot_count: externalwareSlots - 1 } })
                    dispatch({ type: 'HUMANITY_LOSS_CYBERWARE', payload: { totalLoss: Number(humanityLossCalculator(incomingCyber.humanity_loss_min, incomingCyber.humanity_loss_max)), minLoss: Number(incomingCyber.humanity_loss_min) } })
                    break;
                } else {
                    alert('You need to remove your existing externalware to equip a new piece!')
                    break;
                }
            case 'cyberarm':
                if (incomingCyber.name === 'Cyberarm - Right' || incomingCyber.name === 'Cyberarm - Left') {
                    setCyberarmSlots(cyberarmSlots + 4)
                    dispatch({ type: 'EQUIP_CYBERWARE', payload: {incomingCyber: incomingCyber, slot_type: 'cyberarm_slots', slot_count: cyberarmSlots + 4 } })
                    dispatch({ type: 'HUMANITY_LOSS_CYBERWARE', payload: { totalLoss: Number(humanityLossCalculator(incomingCyber.humanity_loss_min, incomingCyber.humanity_loss_max)), minLoss: Number(incomingCyber.humanity_loss_min) } })
                    break;
                } else if (cyberarmSlots > 0) {
                    setCyberarmSlots(cyberarmSlots - 1)
                    dispatch({ type: 'EQUIP_CYBERWARE', payload: {incomingCyber: incomingCyber, slot_type: 'cyberarm_slots', slot_count: cyberarmSlots - 1 } })
                    break;
                } else {
                    alert("Not enough slots - make sure you have a cyberarm or two and they aren't already full!")
                    break;
                }
            case 'cyberleg':
                if (incomingCyber.name === 'Cyberleg - Right' || incomingCyber.name === 'Cyberleg - Left') {
                    setCyberlegSlots(cyberlegSlots + 3)
                    dispatch({ type: 'EQUIP_CYBERWARE', payload: {incomingCyber: incomingCyber, slot_type: 'cyberleg_slots', slot_count: cyberlegSlots + 3 } })
                    dispatch({ type: 'HUMANITY_LOSS_CYBERWARE', payload: { totalLoss: Number(humanityLossCalculator(incomingCyber.humanity_loss_min, incomingCyber.humanity_loss_max)), minLoss: Number(incomingCyber.humanity_loss_min) } })
                    break;
                } else if (cyberlegSlots > 0) {
                    setCyberlegSlots(cyberlegSlots - 1)
                    dispatch({ type: 'EQUIP_CYBERWARE', payload: {incomingCyber: incomingCyber, slot_type: 'cyberleg_slots', slot_count: cyberlegSlots - 1 } })
                    break;
                } else {
                    alert("Not enough slots - make sure you have a cyberarm or two and they aren't already full!")
                    break;
                }
            default:
                break;
        }
    }

    const unequipCyber = (incomingCyber) => {
        switch (incomingCyber.type) {
            case 'fashionware':
                dispatch({ type: 'UNEQUIP_CYBERWARE', payload: {incomingCyber: incomingCyber, slot_type: 'fashion_slots', slot_count: fashionSlots + 1 } })
                setFashionSlots(fashionSlots + 1)
                break;
            case 'cyberaudio':
                if (incomingCyber.name === 'Basic Cyberaudio Suite') {
                    setCyberaudioSlots(0)
                    dispatch({ type: 'UNEQUIP_CYBERWARE', payload: {incomingCyber: incomingCyber, slot_type: 'cyberaudio_slots', slot_count: 0 } })
                    dispatch({ type: 'HUMANITY_RECOVERY_CYBERWARE', payload: { totalLoss: Number(humanityLossCalculator(incomingCyber.humanity_loss_min, incomingCyber.humanity_loss_max)), minLoss: Number(incomingCyber.humanity_loss_min) } })
                    break;
                } else {
                    setCyberaudioSlots(cyberaudioSlots + 1)
                    dispatch({ type: 'UNEQUIP_CYBERWARE', payload: {incomingCyber: incomingCyber, slot_type: 'cyberaudio_slots', slot_count: cyberaudioSlots + 1 } })
                    break;
                }
            case 'neuralware':
                if (incomingCyber.name === 'Basic Neural Link') {
                    setNeuralSlots(0)
                    dispatch({ type: 'UNEQUIP_CYBERWARE', payload: {incomingCyber: incomingCyber, slot_type: 'neural_slots', slot_count: 0 } })
                    dispatch({ type: 'HUMANITY_RECOVERY_CYBERWARE', payload: { totalLoss: Number(humanityLossCalculator(incomingCyber.humanity_loss_min, incomingCyber.humanity_loss_max)), minLoss: Number(incomingCyber.humanity_loss_min) } })
                    break;
                } else {
                    setNeuralSlots(neuralSlots + 1)
                    dispatch({ type: 'UNEQUIP_CYBERWARE', payload: {incomingCyber: incomingCyber, slot_type: 'neural_slots', slot_count: neuralSlots + 1 } })
                    break;
                }
            case 'cyberoptics':
                if (incomingCyber.name === 'Basic Cybereyes') {
                    setOpticSlots(0)
                    dispatch({ type: 'UNEQUIP_CYBERWARE', payload: {incomingCyber: incomingCyber, slot_type: 'optic_slots', slot_count: 0 } })
                    dispatch({ type: 'HUMANITY_RECOVERY_CYBERWARE', payload: { totalLoss: Number(humanityLossCalculator(incomingCyber.humanity_loss_min, incomingCyber.humanity_loss_max)), minLoss: Number(incomingCyber.humanity_loss_min) } })
                    break;
                } else {
                    setOpticSlots(opticSlots + 1)
                    dispatch({ type: 'UNEQUIP_CYBERWARE', payload: {incomingCyber: incomingCyber, slot_type: 'optic_slots', slot_count: opticSlots + 1 } })
                    break;
                }
            case 'internalware':
                setInternalwareSlots(internalwareSlots + 1)
                dispatch({ type: 'UNEQUIP_CYBERWARE', payload: {incomingCyber: incomingCyber, slot_type: 'internalware_slots', slot_count: internalwareSlots + 1 } })
                dispatch({ type: 'HUMANITY_RECOVERY_CYBERWARE', payload: { totalLoss: Number(humanityLossCalculator(incomingCyber.humanity_loss_min, incomingCyber.humanity_loss_max)), minLoss: Number(incomingCyber.humanity_loss_min) } })
                break;
            case 'externalware':
                setExternalwareSlots(externalwareSlots + 1)
                dispatch({ type: 'UNEQUIP_CYBERWARE', payload: {incomingCyber: incomingCyber, slot_type: 'externalware_slots', slot_count: externalwareSlots + 1 } })
                dispatch({ type: 'HUMANITY_RECOVERY_CYBERWARE', payload: { totalLoss: Number(humanityLossCalculator(incomingCyber.humanity_loss_min, incomingCyber.humanity_loss_max)), minLoss: Number(incomingCyber.humanity_loss_min) } })
                break;
            case 'cyberarm':
                if (incomingCyber.name === 'Cyberarm - Right' || incomingCyber.name === 'Cyberarm - Left') {
                    setCyberarmSlots(cyberarmSlots - 4)
                    dispatch({ type: 'UNEQUIP_CYBERWARE', payload: {incomingCyber: incomingCyber, slot_type: 'cyberarm_slots', slot_count: cyberarmSlots - 4 } })
                    dispatch({ type: 'HUMANITY_RECOVERY_CYBERWARE', payload: { totalLoss: Number(humanityLossCalculator(incomingCyber.humanity_loss_min, incomingCyber.humanity_loss_max)), minLoss: Number(incomingCyber.humanity_loss_min) } })
                    break;
                } else {
                    setCyberarmSlots(cyberarmSlots + 1)
                    dispatch({ type: 'UNEQUIP_CYBERWARE', payload: {incomingCyber: incomingCyber, slot_type: 'cyberarm_slots', slot_count: cyberarmSlots + 1 } })
                    break;
                }
            case 'cyberleg':
                if (incomingCyber.name === 'Cyberleg - Right' || incomingCyber.name === 'Cyberleg - Left') {
                    setCyberlegSlots(cyberlegSlots - 3)
                    dispatch({ type: 'UNEQUIP_CYBERWARE', payload: {incomingCyber: incomingCyber, slot_type: 'cyberleg_slots', slot_count: cyberlegSlots - 3 } })
                    dispatch({ type: 'HUMANITY_RECOVERY_CYBERWARE', payload: { totalLoss: Number(humanityLossCalculator(incomingCyber.humanity_loss_min, incomingCyber.humanity_loss_max)), minLoss: Number(incomingCyber.humanity_loss_min) } })
                    break;
                } else {
                    setCyberlegSlots(cyberlegSlots + 1)
                    dispatch({ type: 'UNEQUIP_CYBERWARE', payload: {incomingCyber: incomingCyber, slot_type: 'cyberleg_slots', slot_count: cyberlegSlots + 1 } })
                    break;
                }
            default:
                break;
        }
    }

    const humanityLossCalculator = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    return (<>
        <h1>Cyber!</h1>

        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableBody>
                    <TableRow>
                        <TableCell align="center"><Button onClick={() => setSelectedList('cyberaudio')}>Cyberaudio</Button></TableCell>
                        <TableCell align="center"><Button onClick={() => setSelectedList('neuralware')}>Neuralware</Button></TableCell>
                        <TableCell align="center"><Button onClick={() => setSelectedList('cyberoptics')}>Cyberoptics</Button></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="center"><Button onClick={() => setSelectedList('fashionware')}>Fashionware</Button></TableCell>
                        <TableCell align="center"><Button onClick={() => setSelectedList('internalware')}>Internal Ware</Button></TableCell>
                        <TableCell align="center"><Button onClick={() => setSelectedList('externalware')}>External Ware</Button></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="center"><Button onClick={() => setSelectedList('cyberarm')}>Cyberarms</Button></TableCell>
                        <TableCell align="center"><Button onClick={() => setSelectedList('cyberleg')}>Cyberlegs</Button></TableCell>
                        <TableCell align="center"><Button onClick={() => setSelectedList('borgware')}>Borgware (BETA)</Button></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align='center'>Permanent Humanity Loss: {charDetails.perm_humanity_loss}</TableCell>
                        <TableCell align='center'>Temporary Humanity Loss: {charDetails.current_humanity_loss}</TableCell>
                        <TableCell align='center'>Total Humanity Loss: {charDetails.perm_humanity_loss + charDetails.current_humanity_loss}</TableCell>
                    </TableRow>

                    {selectedList === 'fashionware' ? (
                        <TableRow>
                            <TableCell align='center'>Fashionware Requirements: None</TableCell>
                            <TableCell></TableCell>
                            <TableCell align='center'>Available Fashionware Slots: {fashionSlots}</TableCell>
                        </TableRow>
                    ) : <></>}

                    {selectedList === 'cyberaudio' ? (
                        <TableRow>
                            <TableCell align='center'>Cyberaudio Requirements: Cyber Audio Suite</TableCell>
                            <TableCell></TableCell>
                            <TableCell align='center'>Available Cyberaudio Slots: {cyberaudioSlots}</TableCell>
                        </TableRow>
                    ) : <></>}

                    {selectedList === 'neuralware' ? (
                        <TableRow>
                            <TableCell align='center'>Neuralware Requirements: Neural Link</TableCell>
                            <TableCell></TableCell>
                            <TableCell align='center'>Available Neuralware Slots: {neuralSlots}</TableCell>
                        </TableRow>
                    ) : <></>}

                    {selectedList === 'cyberoptics' ? (
                        <TableRow>
                            <TableCell align='center'>Optic Requirements: Cybereyes</TableCell>
                            <TableCell></TableCell>
                            <TableCell align='center'>Available Cyberoptic Slots: {opticSlots}</TableCell>
                        </TableRow>
                    ) : <></>}

                    {selectedList === 'internalware' ? (
                        <TableRow>
                            <TableCell align='center'>Internalware Requirements: None</TableCell>
                            <TableCell></TableCell>
                            <TableCell align='center'>Available Internalware Slots: {internalwareSlots}</TableCell>
                        </TableRow>
                    ) : <></>}

                    {selectedList === 'externalware' ? (
                        <TableRow>
                            <TableCell align='center'>Externalware Requirements: None</TableCell>
                            <TableCell></TableCell>
                            <TableCell align='center'>Available Externalware Slots: {externalwareSlots}</TableCell>
                        </TableRow>
                    ) : <></>}

                    {selectedList === 'cyberarm' ? (
                        <TableRow>
                            <TableCell align='center'>Cyberarm Requirements: Cyberarm</TableCell>
                            <TableCell></TableCell>
                            <TableCell align='center'>Available Cyberarm Slots: {cyberarmSlots}</TableCell>
                        </TableRow>
                    ) : <></>}

                    {selectedList === 'cyberleg' ? (
                        <TableRow>
                            <TableCell align='center'>Cyberleg Requirements: Cyberleg</TableCell>
                            <TableCell></TableCell>
                            <TableCell align='center'>Available Cyberleg Slots: {cyberlegSlots}</TableCell>
                        </TableRow>
                    ) : <></>}

                </TableBody>
            </Table>
        </TableContainer>

        <h1>Equipped Cyberware</h1>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left">Name</TableCell>
                        <TableCell align="center">Description</TableCell>
                        <TableCell align="center">Install Requirement</TableCell>
                        <TableCell align="center">Remove</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {charCyberware.map((item, i) => {
                        if (item.equipped === true) {
                            return (
                                <React.Fragment key={i}>
                                    {item.type === selectedList ? (
                                        <TableRow key={i}>
                                            <TableCell align="left">{item.name} </TableCell>
                                            <TableCell align="center">{item.description}</TableCell>
                                            <TableCell align="center">{item.install_level}</TableCell>

                                            <TableCell align="center"><Button onClick={() => unequipCyber(item)}>Remove</Button></TableCell>
                                        </TableRow>
                                    ) : <></>}</React.Fragment>)
                        }
                    })}
                </TableBody>
            </Table>
        </TableContainer>

        <h1>Owned Cyberware</h1>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left">Name</TableCell>
                        <TableCell align="center">Description</TableCell>
                        <TableCell align='center'>Humanity Cost</TableCell>
                        <TableCell align="center">Install Requirement</TableCell>
                        <TableCell align="center">Install</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {charCyberware.map((item, i) => {
                        if (item.equipped === false) {
                            return (
                                <React.Fragment key={i}>
                                    {item.type === selectedList ? (
                                        <TableRow key={i}>
                                            <TableCell align="left">{item.name} </TableCell>
                                            <TableCell align="center">{item.description}</TableCell>
                                            <TableCell align="center">{item.humanity_loss_min} - {item.humanity_loss_max}</TableCell>
                                            <TableCell align="center">{item.install_level}</TableCell>
                                            <TableCell align="center"><Button onClick={() => equipCyber(item)}>Equip</Button></TableCell>
                                        </TableRow>
                                    ) : <></>}</React.Fragment>)
                        }
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    </>)
}