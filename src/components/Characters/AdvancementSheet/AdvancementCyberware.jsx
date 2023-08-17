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

import Item from '../CharacterSheet/Item';

export default function AdvancementCyberware() {
    const dispatch = useDispatch()
    const charCyberware = useSelector(store => store.advancementGear.cyberware)
    const charDetails = useSelector(store => store.advancementDetail)
    const charCyberwareSlots = useSelector(store => store.advancementGear.cyberwareSlots)

    const [selectedList, setSelectedList] = useState('fashionware')

    const [fashionSlots, setFashionSlots] = useState(charCyberwareSlots.fashionware_slots)
    const [neuralSlots, setNeuralSlots] = useState(charCyberwareSlots.neuralware_slots)
    const [opticSlots, setOpticSlots] = useState(charCyberwareSlots.cyberoptic_slots)
    const [cyberaudioSlots, setCyberaudioSlots] = useState(charCyberwareSlots.cyberaudio_slots)
    const [internalwareSlots, setInternalwareSlots] = useState(charCyberwareSlots.internalware_slots)
    const [externalwareSlots, setExternalwareSlots] = useState(charCyberwareSlots.externalware_slots)
    const [cyberarmSlots, setCyberarmSlots] = useState(charCyberwareSlots.cyberarm_slots)
    const [cyberlegSlots, setCyberlegSlots] = useState(charCyberwareSlots.cyberleg_slots)

    const equipCyber = (incomingCyber) => {

        switch (incomingCyber.type) {
            case 'fashionware':
                if (fashionSlots > 0) {
                    // remove 1 of the 7 slots available on the dom. This should be synchronous with the slot count, below to keep the count correct. May need further testing.
                    setFashionSlots(fashionSlots - 1)
                    // equip cyberware; inform reducer of type and current count.
                    dispatch({ type: 'EQUIP_CYBERWARE', payload: { incomingCyber: incomingCyber, slot_type: 'fashionware_slots', slot_count: fashionSlots - 1 } })
                    // check if attribute enhancing cyberware has been equipped and inform reducer if so.
                    switch (incomingCyber.name) {
                        case 'Light Tattoo':
                            dispatch({ type: "ATTRIBUTE_ENHANCING_CYBERWARE_EQUIPPED", payload: { type: 'cyber_appearance', quality: 1 } })
                        case 'Techhair':
                            dispatch({ type: "ATTRIBUTE_ENHANCING_CYBERWARE_EQUIPPED", payload: { type: 'cyber_cool', quality: 1 } })
                    }
                    break;
                } else {
                    // warning in case character is too fashionable for their own good.
                    alert('Not enough slots - try getting being less fashionable!')
                    break;
                }

            // handle equipping cyberAudio
            case 'cyberaudio':
                // check if base item is being equipped; 
                if (incomingCyber.name === 'Basic Cyberaudio Suite') {
                    // if so add 3 slots to current count (default 0)
                    setCyberaudioSlots(cyberaudioSlots + 3)
                    // equip cyberware and inform reducer of slot type and current count.
                    dispatch({ type: 'EQUIP_CYBERWARE', payload: { incomingCyber: incomingCyber, slot_type: 'cyberaudio_slots', slot_count: cyberaudioSlots + 3 } })
                    // deal with humanity loss of equipping primary device.
                    dispatch({ type: 'HUMANITY_LOSS_CYBERWARE', payload: { totalLoss: Number(humanityLossCalculator(incomingCyber.humanity_loss_min, incomingCyber.humanity_loss_max)), minLoss: Number(incomingCyber.humanity_loss_min) } })
                    break;
                    // check if cyberaudio slots exist.
                } else if (cyberaudioSlots > 0) {
                    // if so, reduce slot count by 1
                    setCyberaudioSlots(cyberaudioSlots - 1)
                    // equip cyberware and inform reducer of slot type and current count.
                    dispatch({ type: 'EQUIP_CYBERWARE', payload: { incomingCyber: incomingCyber, slot_type: 'cyberaudio_slots', slot_count: cyberaudioSlots - 1 } })
                    break;
                } else {
                    // warning in case character is trying to equip too much gear.
                    alert("Not enough slots - make sure you have a cyberaudio suite installed and it isn't full!")
                    break;
                }

            // Handle equipping Neuralware.
            case 'neuralware':
                if (incomingCyber.name === 'Basic Neural Link') {
                    // set neural slots to the appropriate number. currently only basic neural link is suppported, advanced is easily added e.g. with higher slot count.
                    setNeuralSlots(neuralSlots + 5)
                    // dispatch cyberware, slot type and count. 
                    dispatch({ type: 'EQUIP_CYBERWARE', payload: { incomingCyber: incomingCyber, slot_type: 'neuralware_slots', slot_count: neuralSlots + 5 } })
                    dispatch({ type: 'HUMANITY_LOSS_CYBERWARE', payload: { totalLoss: Number(humanityLossCalculator(incomingCyber.humanity_loss_min, incomingCyber.humanity_loss_max)), minLoss: Number(incomingCyber.humanity_loss_min) } })
                    break;
                } else if (neuralSlots > 0) {
                    // sets neural slots
                    setNeuralSlots(neuralSlots - 1)
                    dispatch({ type: 'EQUIP_CYBERWARE', payload: { incomingCyber: incomingCyber, slot_type: 'neuralware_slots', slot_count: neuralSlots - 1 } })
                    switch (incomingCyber.name) {
                        case 'Algernonic Subprocessors I':
                            dispatch({ type: "ATTRIBUTE_ENHANCING_CYBERWARE_EQUIPPED", payload: { type: 'cyber_intelligence', quality: 1 } })
                            break;
                        case 'Algernonic Subprocessors II':
                            dispatch({ type: "ATTRIBUTE_ENHANCING_CYBERWARE_EQUIPPED", payload: { type: 'cyber_intelligence', quality: 2 } })
                            break;
                        case 'Algernonic Subprocessors III':
                            dispatch({ type: "ATTRIBUTE_ENHANCING_CYBERWARE_EQUIPPED", payload: { type: 'cyber_intelligence', quality: 3 } })
                            break;
                        case 'Algernonic Subprocessors IV':
                            dispatch({ type: "ATTRIBUTE_ENHANCING_CYBERWARE_EQUIPPED", payload: { type: 'cyber_intelligence', quality: 4 } })
                            break;
                        case 'Algernonic Subprocessors V':
                            dispatch({ type: "ATTRIBUTE_ENHANCING_CYBERWARE_EQUIPPED", payload: { type: 'cyber_intelligence', quality: 5 } })
                            break;
                    }
                    break;
                } else {
                    alert("Not enough slots - make sure you have a neural link installed and it isn't full!")
                    break;
                }

            // handle eqiupping cybereyes
            case 'cyberoptics':
                if (incomingCyber.name === 'Basic Cybereyes') {
                    setOpticSlots(3)
                    dispatch({ type: 'EQUIP_CYBERWARE', payload: { incomingCyber: incomingCyber, slot_type: 'cyberoptic_slots', slot_count: 3 } })
                    dispatch({ type: 'HUMANITY_LOSS_CYBERWARE', payload: { totalLoss: Number(humanityLossCalculator(incomingCyber.humanity_loss_min, incomingCyber.humanity_loss_max)), minLoss: Number(incomingCyber.humanity_loss_min) } })
                    break;
                } else if (opticSlots > 0) {
                    setOpticSlots(opticSlots - 1)
                    dispatch({ type: 'EQUIP_CYBERWARE', payload: { incomingCyber: incomingCyber, slot_type: 'cyberoptic_slots', slot_count: opticSlots - 1 } })
                    break;
                } else {
                    alert("Not enough slots - make sure you have cybereyes and they aren't already full!")
                    break;
                }

            // handle equipping internalware
            case 'internalware':
                if (internalwareSlots > 0) {
                    setInternalwareSlots(internalwareSlots - 1)
                    dispatch({ type: 'EQUIP_CYBERWARE', payload: { incomingCyber: incomingCyber, slot_type: 'internalware_slots', slot_count: internalwareSlots - 1 } })
                    dispatch({ type: 'HUMANITY_LOSS_CYBERWARE', payload: { totalLoss: Number(humanityLossCalculator(incomingCyber.humanity_loss_min, incomingCyber.humanity_loss_max)), minLoss: Number(incomingCyber.humanity_loss_min) } })
                    switch (incomingCyber.name) {
                        case 'Grafted Muscles I':
                            dispatch({ type: "ATTRIBUTE_ENHANCING_CYBERWARE_EQUIPPED", payload: { type: 'cyber_strength', quality: 1 } })
                            break;
                        case 'Grafted Muscles II':
                            dispatch({ type: "ATTRIBUTE_ENHANCING_CYBERWARE_EQUIPPED", payload: { type: 'cyber_strength', quality: 2 } })
                            break;
                        case 'Grafted Muscles III':
                            dispatch({ type: "ATTRIBUTE_ENHANCING_CYBERWARE_EQUIPPED", payload: { type: 'cyber_strength', quality: 3 } })
                            break;
                        case 'Grafted Muscles IV':
                            dispatch({ type: "ATTRIBUTE_ENHANCING_CYBERWARE_EQUIPPED", payload: { type: 'cyber_strength', quality: 4 } })
                            break;
                        case 'Grafted Muscles V':
                            dispatch({ type: "ATTRIBUTE_ENHANCING_CYBERWARE_EQUIPPED", payload: { type: 'cyber_strength', quality: 5 } })
                            break;
                        case 'Bone Lacing I':
                            dispatch({ type: "ATTRIBUTE_ENHANCING_CYBERWARE_EQUIPPED", payload: { type: 'cyber_body', quality: 1 } })
                            break;
                        case 'Bone Lacing II':
                            dispatch({ type: "ATTRIBUTE_ENHANCING_CYBERWARE_EQUIPPED", payload: { type: 'cyber_body', quality: 2 } })
                            break;
                        case 'Bone Lacing III':
                            dispatch({ type: "ATTRIBUTE_ENHANCING_CYBERWARE_EQUIPPED", payload: { type: 'cyber_body', quality: 3 } })
                            break;
                        case 'Bone Lacing IV':
                            dispatch({ type: "ATTRIBUTE_ENHANCING_CYBERWARE_EQUIPPED", payload: { type: 'cyber_body', quality: 4 } })
                            break;
                        case 'Bone Lacing V':
                            dispatch({ type: "ATTRIBUTE_ENHANCING_CYBERWARE_EQUIPPED", payload: { type: 'cyber_body', quality: 5 } })
                            break;
                        case 'Nervous System Siliconization I':
                            dispatch({ type: "ATTRIBUTE_ENHANCING_CYBERWARE_EQUIPPED", payload: { type: 'cyber_reflexes', quality: 1 } })
                            break;
                        case 'Nervous System Siliconization II':
                            dispatch({ type: "ATTRIBUTE_ENHANCING_CYBERWARE_EQUIPPED", payload: { type: 'cyber_reflexes', quality: 2 } })
                            break;
                        case 'Nervous System Siliconization III':
                            dispatch({ type: "ATTRIBUTE_ENHANCING_CYBERWARE_EQUIPPED", payload: { type: 'cyber_reflexes', quality: 3 } })
                            break;
                        case 'Nervous System Siliconization IV':
                            dispatch({ type: "ATTRIBUTE_ENHANCING_CYBERWARE_EQUIPPED", payload: { type: 'cyber_reflexes', quality: 4 } })
                            break;
                        case 'Nervous System Siliconization V':
                            dispatch({ type: "ATTRIBUTE_ENHANCING_CYBERWARE_EQUIPPED", payload: { type: 'cyber_reflexes', quality: 5 } })
                            break;
                    }
                    break;
                } else {
                    alert("Not enough slots - you're full up!")
                    break;
                }

            // handle externalware
            case 'externalware':
                if (externalwareSlots > 0) {
                    setExternalwareSlots(externalwareSlots - 1)
                    dispatch({ type: 'EQUIP_CYBERWARE', payload: { incomingCyber: incomingCyber, slot_type: 'externalware_slots', slot_count: externalwareSlots - 1 } })
                    dispatch({ type: 'HUMANITY_LOSS_CYBERWARE', payload: { totalLoss: Number(humanityLossCalculator(incomingCyber.humanity_loss_min, incomingCyber.humanity_loss_max)), minLoss: Number(incomingCyber.humanity_loss_min) } })
                    if (incomingCyber.name === 'Skin Weave') {
                        dispatch({ type: 'CYBERWARE_ARMOR_EQUIPPED', payload: { armor: 2, healthBoxes: 1 } })
                    } else if (incomingCyber.name === 'Subdermal Armor') {
                        dispatch({ type: 'CYBERWARE_ARMOR_EQUIPPED', payload: { armor: 3, healthBoxes: 2 } })
                    } else if (incomingCyber.name === 'Body Plating') {
                        dispatch({ type: 'CYBERWARE_ARMOR_EQUIPPED', payload: { armor: 5, healthBoxes: 3 } })
                    }
                    break;
                } else {
                    alert('You need to remove your existing externalware to equip a new piece!')
                    break;
                }
            case 'cyberarm':
                // Top level - Check if incoming gear being equipped is a cyberarm or a mod
                if (incomingCyber.name === 'Cyberarm - Right' || incomingCyber.name === 'Cyberarm - Left') {
                    // if a right or left arm, check to see if one is already equipped
                    if (incomingCyber.name === 'Cyberarm - Right') {
                        // set number of character shoulders available
                        let rightShoulderCount = 1

                        // detect borgware & increase number of shoulders if appropriate
                        for (let i = 0; i < charCyberware.length; i++) {
                            if (charCyberware[i].name === 'Artificial Shoulder Mount' && charCyberware[i].equipped === true) {
                                rightShoulderCount = 2
                            }
                        }

                        // count number of currently used shoulders and reduce available shoulders
                        for (let i = 0; i < charCyberware.length; i++) {
                            if (charCyberware[i].name === 'Cyberarm - Right' && charCyberware[i].equipped === true) {
                                rightShoulderCount += -1
                            }
                        }

                        // if shoulder amount is okay, equip 'ware. o/w present error.
                        if (rightShoulderCount > 0) {
                            setCyberarmSlots(cyberarmSlots + 4)
                            dispatch({ type: 'EQUIP_CYBERWARE', payload: { incomingCyber: incomingCyber, slot_type: 'cyberarm_slots', slot_count: cyberarmSlots + 4 } })
                            dispatch({ type: 'HUMANITY_LOSS_CYBERWARE', payload: { totalLoss: Number(humanityLossCalculator(incomingCyber.humanity_loss_min, incomingCyber.humanity_loss_max)), minLoss: Number(incomingCyber.humanity_loss_min) } })
                            dispatch({ type: 'CYBERLIMB_EQUIPPED' })
                            return;
                        } else {
                            alert('You do not have a shoulder to stand on.')
                            return;
                        }

                        // repeat above process but for left arms.
                    } else if (incomingCyber.name === 'Cyberarm - Left') {
                        // set number of character shoulders available
                        let leftShoulderCount = 1

                        // detect borgware & increase number of shoulders if appropriate
                        for (let i = 0; i < charCyberware.length; i++) {
                            if (charCyberware[i].name === 'Artificial Shoulder Mount' && charCyberware[i].equipped === true) {
                                leftShoulderCount = 2
                            }
                        }

                        // count number of currently used shoulders and reduce available shoulders
                        for (let i = 0; i < charCyberware.length; i++) {
                            if (charCyberware[i].name === 'Cyberarm - Left' && charCyberware[i].equipped === true) {
                                leftShoulderCount += -1
                            }
                        }

                        // if shoulder amount is okay, equip 'ware. o/w present error.
                        if (leftShoulderCount > 0) {
                            setCyberarmSlots(cyberarmSlots + 4)
                            dispatch({ type: 'EQUIP_CYBERWARE', payload: { incomingCyber: incomingCyber, slot_type: 'cyberarm_slots', slot_count: cyberarmSlots + 4 } })
                            dispatch({ type: 'HUMANITY_LOSS_CYBERWARE', payload: { totalLoss: Number(humanityLossCalculator(incomingCyber.humanity_loss_min, incomingCyber.humanity_loss_max)), minLoss: Number(incomingCyber.humanity_loss_min) } })
                            dispatch({ type: 'CYBERLIMB_EQUIPPED' })
                            return;
                        } else {
                            alert('You do not have a shoulder to stand on.')
                            return;
                        }
                    }
                    // If a cyberarm type and not a right / left cyberarm (thus, an arm mod), see if there are any slots open for mods.
                } else if (incomingCyber.name === 'Big Knucks' || incomingCyber.name === 'Scratchers' || incomingCyber.name === 'Rippers' || incomingCyber.name === 'Wolvers') {
                    dispatch({ type: 'EQUIP_CYBERWARE', payload: { incomingCyber: incomingCyber, slot_type: 'cyberarm_slots', slot_count: cyberarmSlots } })
                    dispatch({ type: 'HUMANITY_LOSS_CYBERWARE', payload: { totalLoss: Number(humanityLossCalculator(incomingCyber.humanity_loss_min, incomingCyber.humanity_loss_max)), minLoss: Number(incomingCyber.humanity_loss_min) } })
                    break;
                } else if (cyberarmSlots > 0) {
                    // if there are open slots, lower slot count by 1, equip gear, and exit function
                    setCyberarmSlots(cyberarmSlots - 1)
                    dispatch({ type: 'EQUIP_CYBERWARE', payload: { incomingCyber: incomingCyber, slot_type: 'cyberarm_slots', slot_count: cyberarmSlots - 1 } })
                    break;
                } else {
                    // if there are no open slots, alert user to lack of slots.
                    alert("Not enough slots - make sure you have a cyberarm or two and they aren't already full!")
                    break;
                }
            case 'cyberleg':
                if (incomingCyber.name === 'Cyberleg - Right' || incomingCyber.name === 'Cyberleg - Left') {
                    setCyberlegSlots(cyberlegSlots + 3)
                    dispatch({ type: 'EQUIP_CYBERWARE', payload: { incomingCyber: incomingCyber, slot_type: 'cyberleg_slots', slot_count: cyberlegSlots + 3 } })
                    dispatch({ type: 'HUMANITY_LOSS_CYBERWARE', payload: { totalLoss: Number(humanityLossCalculator(incomingCyber.humanity_loss_min, incomingCyber.humanity_loss_max)), minLoss: Number(incomingCyber.humanity_loss_min) } })
                    dispatch({ type: 'CYBERLIMB_EQUIPPED' })
                    break;
                } else if (cyberlegSlots > 0) {
                    setCyberlegSlots(cyberlegSlots - 1)
                    dispatch({ type: 'EQUIP_CYBERWARE', payload: { incomingCyber: incomingCyber, slot_type: 'cyberleg_slots', slot_count: cyberlegSlots - 1 } })
                    break;
                } else {
                    alert("Not enough slots - make sure you have a cyberarm or two and they aren't already full!")
                    break;
                }
            case 'borgware':
                dispatch({ type: 'EQUIP_CYBERWARE', payload: { incomingCyber: incomingCyber } })
                dispatch({ type: 'HUMANITY_LOSS_CYBERWARE', payload: { totalLoss: Number(humanityLossCalculator(incomingCyber.humanity_loss_min, incomingCyber.humanity_loss_max)), minLoss: Number(incomingCyber.humanity_loss_min) } })
            default:
                break;
        }
    }

    const unequipCyber = (incomingCyber) => {
        switch (incomingCyber.type) {
            case 'fashionware':
                dispatch({ type: 'UNEQUIP_CYBERWARE', payload: { incomingCyber: incomingCyber, slot_type: 'fashionware_slots', slot_count: fashionSlots + 1 } })
                setFashionSlots(fashionSlots + 1)
                break;
            case 'cyberaudio':
                if (incomingCyber.name === 'Basic Cyberaudio Suite') {
                    setCyberaudioSlots(0)
                    dispatch({ type: 'UNEQUIP_CYBERWARE', payload: { incomingCyber: incomingCyber, slot_type: 'cyberaudio_slots', slot_count: 0 } })
                    dispatch({ type: 'HUMANITY_RECOVERY_CYBERWARE', payload: { totalLoss: Number(humanityLossCalculator(incomingCyber.humanity_loss_min, incomingCyber.humanity_loss_max)), minLoss: Number(incomingCyber.humanity_loss_min) } })
                    break;
                } else {
                    setCyberaudioSlots(cyberaudioSlots + 1)
                    dispatch({ type: 'UNEQUIP_CYBERWARE', payload: { incomingCyber: incomingCyber, slot_type: 'cyberaudio_slots', slot_count: cyberaudioSlots + 1 } })
                    break;
                }
            case 'neuralware':
                if (incomingCyber.name === 'Basic Neural Link') {
                    setNeuralSlots(0)
                    dispatch({ type: 'UNEQUIP_CYBERWARE', payload: { incomingCyber: incomingCyber, slot_type: 'neuralware_slots', slot_count: 0 } })
                    dispatch({ type: 'HUMANITY_RECOVERY_CYBERWARE', payload: { totalLoss: Number(humanityLossCalculator(incomingCyber.humanity_loss_min, incomingCyber.humanity_loss_max)), minLoss: Number(incomingCyber.humanity_loss_min) } })
                    // loop through equipped cyberware; remove all equipped neuralware when Neural Link is removed.
                    charCyberware.map(cyberware => {
                        if (cyberware.type === 'neuralware') {
                            dispatch({ type: 'UNEQUIP_CYBERWARE', payload: { incomingCyber: cyberware, slot_type: 'neuralware_slots', slot_count: 0 } })
                        }
                    })
                    break;
                } else {
                    setNeuralSlots(neuralSlots + 1)
                    dispatch({ type: 'UNEQUIP_CYBERWARE', payload: { incomingCyber: incomingCyber, slot_type: 'neuralware_slots', slot_count: neuralSlots + 1 } })
                    break;
                }
            case 'cyberoptics':
                if (incomingCyber.name === 'Basic Cybereyes') {
                    setOpticSlots(0)
                    dispatch({ type: 'UNEQUIP_CYBERWARE', payload: { incomingCyber: incomingCyber, slot_type: 'cyberoptic_slots', slot_count: 0 } })
                    dispatch({ type: 'HUMANITY_RECOVERY_CYBERWARE', payload: { totalLoss: Number(humanityLossCalculator(incomingCyber.humanity_loss_min, incomingCyber.humanity_loss_max)), minLoss: Number(incomingCyber.humanity_loss_min) } })
                    // loop through equipped cyberware and remove all equipped cyberoptics when cybereyes are removed.
                    charCyberware.map(cyberware => {
                        if (cyberware.type === 'cyberoptics') {
                            dispatch({ type: 'UNEQUIP_CYBERWARE', payload: { incomingCyber: cyberware, slot_type: 'cyberoptic_slots', slot_count: 0 } })
                        }
                    })
                    break;
                } else {
                    setOpticSlots(opticSlots + 1)
                    dispatch({ type: 'UNEQUIP_CYBERWARE', payload: { incomingCyber: incomingCyber, slot_type: 'cyberoptic_slots', slot_count: opticSlots + 1 } })
                    break;
                }
            case 'internalware':
                setInternalwareSlots(internalwareSlots + 1)
                dispatch({ type: 'UNEQUIP_CYBERWARE', payload: { incomingCyber: incomingCyber, slot_type: 'internalware_slots', slot_count: internalwareSlots + 1 } })
                dispatch({ type: 'HUMANITY_RECOVERY_CYBERWARE', payload: { totalLoss: Number(humanityLossCalculator(incomingCyber.humanity_loss_min, incomingCyber.humanity_loss_max)), minLoss: Number(incomingCyber.humanity_loss_min) } })
                break;
            case 'externalware':
                setExternalwareSlots(externalwareSlots + 1)
                dispatch({ type: 'UNEQUIP_CYBERWARE', payload: { incomingCyber: incomingCyber, slot_type: 'externalware_slots', slot_count: externalwareSlots + 1 } })
                dispatch({ type: 'HUMANITY_RECOVERY_CYBERWARE', payload: { totalLoss: Number(humanityLossCalculator(incomingCyber.humanity_loss_min, incomingCyber.humanity_loss_max)), minLoss: Number(incomingCyber.humanity_loss_min) } })
                if (incomingCyber.name === 'Skin Weave') {
                    dispatch({ type: 'CYBERWARE_ARMOR_REMOVED', payload: { armor: -2, healthBoxes: -1 } })
                } else if (incomingCyber.name === 'Subdermal Armor') {
                    dispatch({ type: 'CYBERWARE_ARMOR_REMOVED', payload: { armor: -3, healthBoxes: -2 } })
                } else if (incomingCyber.name === 'Body Plating') {
                    dispatch({ type: 'CYBERWARE_ARMOR_REMOVED', payload: { armor: -5, healthBoxes: -3 } })
                }
                break;
            case 'cyberarm':
                if (incomingCyber.name === 'Cyberarm - Right' || incomingCyber.name === 'Cyberarm - Left') {
                    setCyberarmSlots(cyberarmSlots - 4)
                    dispatch({ type: 'UNEQUIP_CYBERWARE', payload: { incomingCyber: incomingCyber, slot_type: 'cyberarm_slots', slot_count: cyberarmSlots - 4 } })
                    dispatch({ type: 'HUMANITY_RECOVERY_CYBERWARE', payload: { totalLoss: Number(humanityLossCalculator(incomingCyber.humanity_loss_min, incomingCyber.humanity_loss_max)), minLoss: Number(incomingCyber.humanity_loss_min) } })
                    dispatch({ type: 'CYBERLIMB_REMOVED' })
                    break;
                } else if (incomingCyber.name === 'Big Knucks' || incomingCyber.name === 'Scratchers' || incomingCyber.name === 'Rippers' || incomingCyber.name === 'Wolvers') {
                    dispatch({ type: 'UNEQUIP_CYBERWARE', payload: { incomingCyber: incomingCyber, slot_type: 'cyberarm_slots', slot_count: cyberarmSlots } })
                    dispatch({ type: 'HUMANITY_RECOVERY_CYBERWARE', payload: { totalLoss: Number(humanityLossCalculator(incomingCyber.humanity_loss_min, incomingCyber.humanity_loss_max)), minLoss: Number(incomingCyber.humanity_loss_min) } })
                    break;
                } else {
                    setCyberarmSlots(cyberarmSlots + 1)
                    dispatch({ type: 'UNEQUIP_CYBERWARE', payload: { incomingCyber: incomingCyber, slot_type: 'cyberarm_slots', slot_count: cyberarmSlots + 1 } })
                    break;
                }
            case 'cyberleg':
                if (incomingCyber.name === 'Cyberleg - Right' || incomingCyber.name === 'Cyberleg - Left') {
                    setCyberlegSlots(cyberlegSlots - 3)
                    dispatch({ type: 'UNEQUIP_CYBERWARE', payload: { incomingCyber: incomingCyber, slot_type: 'cyberleg_slots', slot_count: cyberlegSlots - 3 } })
                    dispatch({ type: 'HUMANITY_RECOVERY_CYBERWARE', payload: { totalLoss: Number(humanityLossCalculator(incomingCyber.humanity_loss_min, incomingCyber.humanity_loss_max)), minLoss: Number(incomingCyber.humanity_loss_min) } })
                    dispatch({ type: 'CYBERLIMB_REMOVED' })
                    break;
                } else {
                    setCyberlegSlots(cyberlegSlots + 1)
                    dispatch({ type: 'UNEQUIP_CYBERWARE', payload: { incomingCyber: incomingCyber, slot_type: 'cyberleg_slots', slot_count: cyberlegSlots + 1 } })
                    break;
                }
            case 'borgware':
                dispatch({ type: 'UNEQUIP_CYBERWARE', payload: { incomingCyber: incomingCyber } })
                dispatch({ type: 'HUMANITY_RECOVERY_CYBERWARE', payload: { totalLoss: Number(humanityLossCalculator(incomingCyber.humanity_loss_min, incomingCyber.humanity_loss_max)), minLoss: Number(incomingCyber.humanity_loss_min) } })
            default:
                break;
        }
    }

    const humanityLossCalculator = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    return (<>
        <Item><h1>Cyberware</h1></Item>

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
                        <TableCell align='center'>Temporary Humanity Loss: {charDetails.temp_humanity_loss}</TableCell>
                        {(charDetails.perm_humanity_loss + charDetails.temp_humanity_loss) > 39 ? <TableCell sx={{ color: 'red', backgroundColor: 'black' }} align='center'>Total Humanity Loss: {charDetails.perm_humanity_loss + charDetails.temp_humanity_loss}</TableCell>
                            : <TableCell align='center'>Total Humanity Loss: {charDetails.perm_humanity_loss + charDetails.temp_humanity_loss}</TableCell>}
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