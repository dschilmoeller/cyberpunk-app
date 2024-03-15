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
import CyberwareCheck from './CyberwareCheck';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';

function TransitionUp(props) {
    return <Slide {...props} direction="up" />;
}


export default function AdvancementCyberware() {
    const dispatch = useDispatch()
    // Char Cyberware - all items from char_owned_cyberware bridged with cyberware_master
    const charCyberware = useSelector(store => store.advancementGear.cyberware)
    // character details atts, skills, etc.
    const charDetails = useSelector(store => store.advancementDetail)
    // contents of the char_cyberware_bridge (which should be char_cyberware_status of course)
    const charCyberwareSlots = useSelector(store => store.advancementGear.cyberwareSlots)

    // sets selected list - cannot convert to address without making cyberware handling it's own thing.
    // duplicate Tab Functionality to prevent errors?

    const [selectedList, setSelectedList] = useState('internalware')
    const handleTabChange = (event, newValue) => {
        setSelectedList(newValue)
    }

    // reads data from char_cyberware_bridge data
    const fashionSlots = charCyberwareSlots.fashionware_slots
    const neuralSlots = charCyberwareSlots.neuralware_slots
    const opticSlots = charCyberwareSlots.cyberoptic_slots
    const cyberaudioSlots = charCyberwareSlots.cyberaudio_slots
    const internalwareSlots = charCyberwareSlots.internalware_slots
    const externalwareSlots = charCyberwareSlots.externalware_slots

    // const [externalwareSlots, setExternalwareSlots] = useState(charCyberwareSlots.externalware_slots)
    const [cyberarmSlots, setCyberarmSlots] = useState(charCyberwareSlots.cyberarm_slots)
    const [cyberlegSlots, setCyberlegSlots] = useState(charCyberwareSlots.cyberleg_slots)

    useEffect(() => {
        // would need for all, but a direct reference to the reducer would be better and more in keeping with the current app's standards.
        // setFashionSlots(charCyberwareSlots.fashionware_slots)
    }, [charCyberwareSlots])

    const [showSnackbar, setShowSnackbar] = React.useState(false);
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });
    const [toastText, setToastText] = React.useState('')

    // Function runs before equipping 'ware in order to detect if identical cyberware is already equipped OR if incompatible gear is equipped.
    // this needs to be asynchronous?
    // it also needs to be moved to a different module. All it needs to do is return is true/false in the end. Would that also effectively make it asynchronous as it would wait for the return of the function result before running the next items?

    const cyberwareEquippedCheck = (incomingCyber) => {
        // check for humanity:
        if (charDetails.temp_humanity_loss + charDetails.perm_humanity_loss + incomingCyber.humanity_loss_min > 40) {
            setToastText(`You're gonna go crazy if you equip that!`)
            setShowSnackbar(true)
        } else {
            // checks for already equipped cyberware.
            let status = CyberwareCheck(incomingCyber, charCyberware)

            if (status.equipStatus === false) {
                equipCyber(incomingCyber)
            } else {
                // in the event alreadyEquipped === true - inform user of issue with equipping attempt.
                setToastText(`Incompatible cyberware ${status.equippedItemName} detected`)
                setShowSnackbar(true)
            }
        }

    }

    const equipCyber = (incomingCyber) => {
        // should be able to blackbox this.

        switch (incomingCyber.type) {
            case 'fashionware':
                if (fashionSlots > 0) {
                    // this only affects the reducer, so can fire separately.
                    dispatch({ type: "SET_ADVANCEMENT_LOAD_STATUS", payload: true })
                    // this is the primary change happening.
                    dispatch({ type: "CHANGE_GEAR_EQUIP_STATUS", payload: { item: incomingCyber, charID: charDetails.id, table: 'char_owned_cyberware', tablePrimaryKey: 'owned_cyberware_id', tableID: incomingCyber.owned_cyberware_id, equipStatus: true, charCyberwareSlots, humanity: { currentPermLoss: charDetails.perm_humanity_loss, currentTempLoss: charDetails.temp_humanity_loss } } });
                    break;
                } else {
                    // warning in case character is too fashionable for their own good.
                    setToastText('Not enough slots - try being less fashionable!')
                    setShowSnackbar(true)
                    dispatch({ type: "SET_ADVANCEMENT_LOAD_STATUS", payload: false })
                    break;
                }
            case 'neuralware':
                dispatch({ type: "SET_ADVANCEMENT_LOAD_STATUS", payload: true })
                if (incomingCyber.name === 'Basic Neural Link') {
                    dispatch({ type: "CHANGE_GEAR_EQUIP_STATUS", payload: { item: incomingCyber, charID: charDetails.id, table: 'char_owned_cyberware', tablePrimaryKey: 'owned_cyberware_id', tableID: incomingCyber.owned_cyberware_id, equipStatus: true, charCyberwareSlots, humanity: { currentPermLoss: charDetails.perm_humanity_loss, currentTempLoss: charDetails.temp_humanity_loss } } });
                    break;
                } else if (neuralSlots > 0) {
                    dispatch({ type: "CHANGE_GEAR_EQUIP_STATUS", payload: { item: incomingCyber, charID: charDetails.id, table: 'char_owned_cyberware', tablePrimaryKey: 'owned_cyberware_id', tableID: incomingCyber.owned_cyberware_id, equipStatus: true, charCyberwareSlots, humanity: { currentPermLoss: charDetails.perm_humanity_loss, currentTempLoss: charDetails.temp_humanity_loss } } });
                    break;
                } else {
                    setToastText("Not enough slots - make sure you have a neural link installed and it isn't full!")
                    setShowSnackbar(true)
                    dispatch({ type: "SET_ADVANCEMENT_LOAD_STATUS", payload: false })
                    break;
                }
            case 'cyberoptics':
                dispatch({ type: "SET_ADVANCEMENT_LOAD_STATUS", payload: true })
                if (incomingCyber.name === 'Basic Cybereyes') {
                    dispatch({ type: "CHANGE_GEAR_EQUIP_STATUS", payload: { item: incomingCyber, charID: charDetails.id, table: 'char_owned_cyberware', tablePrimaryKey: 'owned_cyberware_id', tableID: incomingCyber.owned_cyberware_id, equipStatus: true, charCyberwareSlots, humanity: { currentPermLoss: charDetails.perm_humanity_loss, currentTempLoss: charDetails.temp_humanity_loss } } });
                    break;
                } else if (opticSlots > 0) {
                    dispatch({ type: "CHANGE_GEAR_EQUIP_STATUS", payload: { item: incomingCyber, charID: charDetails.id, table: 'char_owned_cyberware', tablePrimaryKey: 'owned_cyberware_id', tableID: incomingCyber.owned_cyberware_id, equipStatus: true, charCyberwareSlots, humanity: { currentPermLoss: charDetails.perm_humanity_loss, currentTempLoss: charDetails.temp_humanity_loss } } });
                    break;
                } else {
                    setToastText("Not enough slots - make sure you have cybereyes and they aren't already full!")
                    setShowSnackbar(true)
                    dispatch({ type: "SET_ADVANCEMENT_LOAD_STATUS", payload: false })
                    break;
                }
            case 'cyberaudio':
                dispatch({ type: "SET_ADVANCEMENT_LOAD_STATUS", payload: true })
                // check if base item is being equipped; 
                if (incomingCyber.name === 'Basic Cyberaudio Suite') {
                    dispatch({ type: "CHANGE_GEAR_EQUIP_STATUS", payload: { item: incomingCyber, charID: charDetails.id, table: 'char_owned_cyberware', tablePrimaryKey: 'owned_cyberware_id', tableID: incomingCyber.owned_cyberware_id, equipStatus: true, charCyberwareSlots, humanity: { currentPermLoss: charDetails.perm_humanity_loss, currentTempLoss: charDetails.temp_humanity_loss } } });
                    break;
                } else if (cyberaudioSlots > 0) {
                    dispatch({ type: "CHANGE_GEAR_EQUIP_STATUS", payload: { item: incomingCyber, charID: charDetails.id, table: 'char_owned_cyberware', tablePrimaryKey: 'owned_cyberware_id', tableID: incomingCyber.owned_cyberware_id, equipStatus: true, charCyberwareSlots, humanity: { currentPermLoss: charDetails.perm_humanity_loss, currentTempLoss: charDetails.temp_humanity_loss } } });
                    break;
                } else {
                    // warning in case character is trying to equip too much gear.
                    setToastText("Not enough slots - make sure you have a cyberaudio suite installed and that it isn't full!")
                    setShowSnackbar(true)
                    dispatch({ type: "SET_ADVANCEMENT_LOAD_STATUS", payload: false })
                    break;
                }
            case 'internalware':
                dispatch({ type: "SET_ADVANCEMENT_LOAD_STATUS", payload: true })
                if (internalwareSlots > 0) {
                    dispatch({ type: "CHANGE_GEAR_EQUIP_STATUS", payload: { item: incomingCyber, charID: charDetails.id, table: 'char_owned_cyberware', tablePrimaryKey: 'owned_cyberware_id', tableID: incomingCyber.owned_cyberware_id, equipStatus: true, charCyberwareSlots, humanity: { currentPermLoss: charDetails.perm_humanity_loss, currentTempLoss: charDetails.temp_humanity_loss } } });
                    break;
                } else {
                    setToastText("Not enough slots - you're full up!")
                    setShowSnackbar(true)
                    dispatch({ type: "SET_ADVANCEMENT_LOAD_STATUS", payload: false })
                    break;
                }
            case 'externalware':
                dispatch({ type: "SET_ADVANCEMENT_LOAD_STATUS", payload: true })
                if (externalwareSlots > 0) {
                    dispatch({ type: "CHANGE_GEAR_EQUIP_STATUS", payload: { item: incomingCyber, charID: charDetails.id, table: 'char_owned_cyberware', tablePrimaryKey: 'owned_cyberware_id', tableID: incomingCyber.owned_cyberware_id, equipStatus: true, charCyberwareSlots, humanity: { currentPermLoss: charDetails.perm_humanity_loss, currentTempLoss: charDetails.temp_humanity_loss } } });
                } else {
                    setToastText(`Remove your current externalware to equip a different piece!`)
                    setShowSnackbar(true)
                    break;
                }
                break;


            case 'cyberarm':
                dispatch({ type: "SET_ADVANCEMENT_LOAD_STATUS", payload: true })
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
                            setToastText('You do not have a shoulder to stand on.')
                            setShowSnackbar(true)
                            dispatch({ type: "SET_ADVANCEMENT_LOAD_STATUS", payload: false })
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
                            setToastText('You do not have a shoulder to stand on.')
                            setShowSnackbar(true)
                            dispatch({ type: "SET_ADVANCEMENT_LOAD_STATUS", payload: false })
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
                    setToastText("Not enough slots - make sure you have a cyberarm or two and they aren't already full!")
                    setShowSnackbar(true)
                    dispatch({ type: "SET_ADVANCEMENT_LOAD_STATUS", payload: false })
                    break;
                }
            case 'cyberleg':
                dispatch({ type: "SET_ADVANCEMENT_LOAD_STATUS", payload: true })
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
                    setToastText("Not enough slots - make sure you have a cyberleg or two and they aren't already full!")
                    setShowSnackbar(true)
                    dispatch({ type: "SET_ADVANCEMENT_LOAD_STATUS", payload: false })
                    break;
                }
            case 'borgware':
                dispatch({ type: "SET_ADVANCEMENT_LOAD_STATUS", payload: true })
                switch (incomingCyber.name) {
                    case 'Artificial Shoulder Mount':
                        dispatch({ type: 'EQUIP_CYBERWARE', payload: { incomingCyber: incomingCyber } })
                        dispatch({ type: 'HUMANITY_LOSS_CYBERWARE', payload: { totalLoss: Number(humanityLossCalculator(incomingCyber.humanity_loss_min, incomingCyber.humanity_loss_max)), minLoss: Number(incomingCyber.humanity_loss_min) } })
                        break;
                    case 'Linear Frame Alpha':
                        dispatch({ type: 'EQUIP_CYBERWARE', payload: { incomingCyber: incomingCyber } })
                        dispatch({ type: 'HUMANITY_LOSS_CYBERWARE', payload: { totalLoss: Number(humanityLossCalculator(incomingCyber.humanity_loss_min, incomingCyber.humanity_loss_max)), minLoss: Number(incomingCyber.humanity_loss_min) } })

                        dispatch({ type: "STATIC_CYBERWARE_ATTRIBUTE_SET", payload: { type: 'cyber_strength', quality: 3 } })
                        dispatch({ type: "STATIC_CYBERWARE_ATTRIBUTE_SET", payload: { type: 'cyber_body', quality: 3 } })
                        dispatch({ type: "STATIC_CYBERWARE_ATTRIBUTE_SET", payload: { type: 'cyber_reflexes', quality: -1 } })

                        dispatch({ type: 'CYBERWARE_ARMOR_EQUIPPED', payload: { armor: 5, healthBoxes: 4 } })
                        break;
                    default:
                        setToastText('Borgware Error!')
                        setShowSnackbar(true)
                        dispatch({ type: "SET_ADVANCEMENT_LOAD_STATUS", payload: false })
                        break;
                }
            default:
                break;
        }
    }

    const unequipCyber = (incomingCyber) => {
        switch (incomingCyber.type) {
            case 'fashionware':
                dispatch({ type: "SET_ADVANCEMENT_LOAD_STATUS", payload: true })
                dispatch({ type: "CHANGE_GEAR_EQUIP_STATUS", payload: { item: incomingCyber, charID: charDetails.id, table: 'char_owned_cyberware', tablePrimaryKey: 'owned_cyberware_id', tableID: incomingCyber.owned_cyberware_id, equipStatus: false, charCyberwareSlots, humanity: { currentPermLoss: charDetails.perm_humanity_loss, currentTempLoss: charDetails.temp_humanity_loss } } });
                break;
            case 'neuralware':
                if (charCyberwareSlots.neuralware_slots === 5 || incomingCyber.name != 'Basic Neural Link') {
                    dispatch({ type: "SET_ADVANCEMENT_LOAD_STATUS", payload: true })
                    dispatch({ type: "CHANGE_GEAR_EQUIP_STATUS", payload: { item: incomingCyber, charID: charDetails.id, table: 'char_owned_cyberware', tablePrimaryKey: 'owned_cyberware_id', tableID: incomingCyber.owned_cyberware_id, equipStatus: false, charCyberwareSlots, humanity: { currentPermLoss: charDetails.perm_humanity_loss, currentTempLoss: charDetails.temp_humanity_loss } } });
                    break;
                } else {
                    setToastText('Remove all your chips first!')
                    setShowSnackbar(true)
                    dispatch({ type: "SET_ADVANCEMENT_LOAD_STATUS", payload: false })
                    break;
                }
            case 'cyberoptics':
                dispatch({ type: "SET_ADVANCEMENT_LOAD_STATUS", payload: true })
                if (charCyberwareSlots.cyberoptic_slots === 3 || incomingCyber.name != 'Basic Cybereyes') {
                    dispatch({ type: "CHANGE_GEAR_EQUIP_STATUS", payload: { item: incomingCyber, charID: charDetails.id, table: 'char_owned_cyberware', tablePrimaryKey: 'owned_cyberware_id', tableID: incomingCyber.owned_cyberware_id, equipStatus: false, charCyberwareSlots, humanity: { currentPermLoss: charDetails.perm_humanity_loss, currentTempLoss: charDetails.temp_humanity_loss } } });
                } else {
                    setToastText('Remove all your cybereye mods first!')
                    setShowSnackbar(true)
                    dispatch({ type: "SET_ADVANCEMENT_LOAD_STATUS", payload: false })
                    break;
                }
            case 'cyberaudio':
                dispatch({ type: "SET_ADVANCEMENT_LOAD_STATUS", payload: true })
                if (charCyberwareSlots.cyberaudio_slots === 3 || incomingCyber.name != 'Basic Cyberaudio Suite') {
                    dispatch({ type: "CHANGE_GEAR_EQUIP_STATUS", payload: { item: incomingCyber, charID: charDetails.id, table: 'char_owned_cyberware', tablePrimaryKey: 'owned_cyberware_id', tableID: incomingCyber.owned_cyberware_id, equipStatus: false, charCyberwareSlots, humanity: { currentPermLoss: charDetails.perm_humanity_loss, currentTempLoss: charDetails.temp_humanity_loss } } });
                    break;
                } else {
                    setToastText('Remove all your cyberaudio mods first!')
                    setShowSnackbar(true)
                    dispatch({ type: "SET_ADVANCEMENT_LOAD_STATUS", payload: false })
                    break;
                }
            case 'internalware':
                dispatch({ type: "SET_ADVANCEMENT_LOAD_STATUS", payload: true })
                dispatch({ type: "CHANGE_GEAR_EQUIP_STATUS", payload: { item: incomingCyber, charID: charDetails.id, table: 'char_owned_cyberware', tablePrimaryKey: 'owned_cyberware_id', tableID: incomingCyber.owned_cyberware_id, equipStatus: false, charCyberwareSlots, humanity: { currentPermLoss: charDetails.perm_humanity_loss, currentTempLoss: charDetails.temp_humanity_loss } } });
                break;
            case 'externalware':
                dispatch({ type: "SET_ADVANCEMENT_LOAD_STATUS", payload: true })
                dispatch({ type: "CHANGE_GEAR_EQUIP_STATUS", payload: { item: incomingCyber, charID: charDetails.id, table: 'char_owned_cyberware', tablePrimaryKey: 'owned_cyberware_id', tableID: incomingCyber.owned_cyberware_id, equipStatus: false, charCyberwareSlots, humanity: { currentPermLoss: charDetails.perm_humanity_loss, currentTempLoss: charDetails.temp_humanity_loss } } });
                break;


            case 'cyberarm':
                dispatch({ type: "SET_ADVANCEMENT_LOAD_STATUS", payload: true })
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
                dispatch({ type: "SET_ADVANCEMENT_LOAD_STATUS", payload: true })
                if (incomingCyber.name === 'Cyberleg - Right' || incomingCyber.name === 'Cyberleg - Left') {
                    setCyberlegSlots(cyberlegSlots - 3)
                    dispatch({ type: 'UNEQUIP_CYBERWARE', payload: { incomingCyber: incomingCyber, slot_type: 'cyberleg_slots', slot_count: cyberlegSlots - 3 } })
                    dispatch({
                        type: 'HUMANITY_RECOVERY_CYBERWARE', payload: {
                            totalLoss: Number(humanityLossCalculator(incomingCyber.humanity_loss_min, incomingCyber.humanity_loss_max)),
                            minLoss: Number(incomingCyber.humanity_loss_min)
                        }
                    })
                    dispatch({ type: 'CYBERLIMB_REMOVED' })
                    break;
                } else {
                    setCyberlegSlots(cyberlegSlots + 1)
                    dispatch({ type: 'UNEQUIP_CYBERWARE', payload: { incomingCyber: incomingCyber, slot_type: 'cyberleg_slots', slot_count: cyberlegSlots + 1 } })
                    break;
                }
            case 'borgware':
                dispatch({ type: "SET_ADVANCEMENT_LOAD_STATUS", payload: true })
                dispatch({ type: 'UNEQUIP_CYBERWARE', payload: { incomingCyber: incomingCyber } })
                dispatch({ type: 'HUMANITY_RECOVERY_CYBERWARE', payload: { totalLoss: Number(humanityLossCalculator(incomingCyber.humanity_loss_min, incomingCyber.humanity_loss_max)), minLoss: Number(incomingCyber.humanity_loss_min) } })
                if (incomingCyber.name === 'Linear Frame Alpha') {
                    // ATTRIBUTE_ENHANCING_CYBERWARE_EQUIPPED (attribute/amount)
                    dispatch({ type: "STATIC_CYBERWARE_ATTRIBUTE_SET", payload: { type: 'cyber_strength', quality: 0 } })
                    dispatch({ type: "STATIC_CYBERWARE_ATTRIBUTE_SET", payload: { type: 'cyber_body', quality: 0 } })
                    dispatch({ type: "STATIC_CYBERWARE_ATTRIBUTE_SET", payload: { type: 'cyber_reflexes', quality: 0 } })
                    // CYBERWARE_ARMOR_EQUIPPED (health/armor)
                    dispatch({ type: 'CYBERWARE_ARMOR_REMOVED', payload: { armor: -5, healthBoxes: -4 } })
                }
            default:
                break;
        }
    }

    const humanityLossCalculator = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1))
    }

    return (<>
        <Tabs
            value={selectedList}
            onChange={handleTabChange}
            indicatorColor='primary'
            textColor='secondary'>
            <Tab value='fashionware' label='Fashionware' />
            <Tab value='neuralware' label='Neuralware' />
            <Tab value='cyberoptics' label='Cyberoptics' />
            <Tab value='cyberaudio' label='Cyberaudio' />
            <Tab value='internalware' label='Internalware' />
            <Tab value='externalware' label='Externalware' />
            <Tab value='cyberarm' label='Cyberarm' />
            <Tab value='cyberleg' label='Cyberleg' />
            <Tab value='borgware' label='Borgware (Beta)' />
        </Tabs>

        <Item><h1>Cyberware</h1></Item>

        <Snackbar
            TransitionComponent={TransitionUp}
            autoHideDuration={2000}
            open={showSnackbar}
            onClose={() => setShowSnackbar(false)}
            anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
        >
            <Alert onClose={() => setShowSnackbar(false)} severity="warning" sx={{ width: '100%' }}>
                {toastText}
            </Alert>
        </Snackbar>

        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableBody>
                    <TableRow hover>
                        <TableCell align='center'>Permanent Humanity Loss: {charDetails.perm_humanity_loss}</TableCell>
                        <TableCell align='center'>Temporary Humanity Loss: {charDetails.temp_humanity_loss}</TableCell>
                        {(charDetails.perm_humanity_loss + charDetails.temp_humanity_loss) > 39 ? <TableCell sx={{ color: 'red', backgroundColor: 'black' }} align='center'>Total Humanity Loss: {charDetails.perm_humanity_loss + charDetails.temp_humanity_loss}</TableCell>
                            : <TableCell align='center'>Total Humanity Loss: {charDetails.perm_humanity_loss + charDetails.temp_humanity_loss}</TableCell>}
                    </TableRow>

                    {selectedList === 'fashionware' ? (
                        <TableRow hover>
                            <TableCell align='center'>Fashionware Requirements: None</TableCell>
                            <TableCell></TableCell>
                            <TableCell align='center'>Available Fashionware Slots: {fashionSlots}</TableCell>
                        </TableRow>
                    ) : <></>}

                    {selectedList === 'cyberaudio' ? (
                        <TableRow hover>
                            <TableCell align='center'>Cyberaudio Requirements: Cyber Audio Suite</TableCell>
                            <TableCell></TableCell>
                            <TableCell align='center'>Available Cyberaudio Slots: {cyberaudioSlots}</TableCell>
                        </TableRow>
                    ) : <></>}

                    {selectedList === 'neuralware' ? (
                        <TableRow hover>
                            <TableCell align='center'>Neuralware Requirements: Neural Link</TableCell>
                            <TableCell></TableCell>
                            <TableCell align='center'>Available Neuralware Slots: {neuralSlots}</TableCell>
                        </TableRow>
                    ) : <></>}

                    {selectedList === 'cyberoptics' ? (
                        <TableRow hover>
                            <TableCell align='center'>Optics Requirements: Cybereyes</TableCell>
                            <TableCell></TableCell>
                            <TableCell align='center'>Available Cyberoptic Slots: {opticSlots}</TableCell>
                        </TableRow>
                    ) : <></>}

                    {selectedList === 'internalware' ? (
                        <TableRow hover>
                            <TableCell align='center'>Internalware Requirements: None</TableCell>
                            <TableCell></TableCell>
                            <TableCell align='center'>Available Internalware Slots: {internalwareSlots}</TableCell>
                        </TableRow>
                    ) : <></>}

                    {selectedList === 'externalware' ? (
                        <TableRow hover>
                            <TableCell align='center'>Externalware Requirements: None</TableCell>
                            <TableCell></TableCell>
                            <TableCell align='center'>Available Externalware Slots: {externalwareSlots}</TableCell>
                        </TableRow>
                    ) : <></>}

                    {selectedList === 'cyberarm' ? (
                        <TableRow hover>
                            <TableCell align='center'>Cyberarm Requirements: Cyberarm</TableCell>
                            <TableCell></TableCell>
                            <TableCell align='center'>Available Cyberarm Slots: {cyberarmSlots}</TableCell>
                        </TableRow>
                    ) : <></>}

                    {selectedList === 'cyberleg' ? (
                        <TableRow hover>
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
                    <TableRow hover>
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
                                        <TableRow hover key={i}>
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
                    <TableRow hover>
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
                                        <TableRow hover key={i}>
                                            <TableCell align="left">{item.name} </TableCell>
                                            <TableCell align="center">{item.description}</TableCell>
                                            <TableCell align="center">{item.humanity_loss_min} - {item.humanity_loss_max}</TableCell>
                                            <TableCell align="center">{item.install_level}</TableCell>
                                            <TableCell align="center"><Button onClick={() => cyberwareEquippedCheck(item)}>Equip</Button></TableCell>
                                        </TableRow>
                                    ) : <></>}</React.Fragment>)
                        }
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    </>)
}