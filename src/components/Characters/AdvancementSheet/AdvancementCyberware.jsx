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

    const loadStatus = useSelector(store => store.loaders.advancementSheet);

    // sets selected list - cannot convert to address without making cyberware handling it's own thing.
    // duplicate Tab Functionality to prevent errors?

    const [selectedList, setSelectedList] = useState('fashionware')
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
    const cyberarmSlots = charCyberwareSlots.cyberarm_slots
    const cyberlegSlots = charCyberwareSlots.cyberleg_slots

    const [showSnackbar, setShowSnackbar] = React.useState(false);
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });
    const [toastText, setToastText] = React.useState('')

    // This still needs to be changed to Async to ensure functionality but works for local users.

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
                    break;
                } else {
                    setToastText(`Remove your current externalware to equip a different piece!`)
                    setShowSnackbar(true)
                    break;
                }
            case 'cyberarm':
                dispatch({ type: "SET_ADVANCEMENT_LOAD_STATUS", payload: true })
                // Top level - Check if incoming gear being equipped is a cyberarm or something else
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
                            dispatch({ type: "CHANGE_GEAR_EQUIP_STATUS", payload: { item: incomingCyber, charID: charDetails.id, table: 'char_owned_cyberware', tablePrimaryKey: 'owned_cyberware_id', tableID: incomingCyber.owned_cyberware_id, equipStatus: true, charCyberwareSlots, humanity: { currentPermLoss: charDetails.perm_humanity_loss, currentTempLoss: charDetails.temp_humanity_loss } } });
                            break;
                        } else {
                            setToastText('You do not have a shoulder to stand on.')
                            setShowSnackbar(true)
                            dispatch({ type: "SET_ADVANCEMENT_LOAD_STATUS", payload: false })
                            break;
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
                            dispatch({ type: "CHANGE_GEAR_EQUIP_STATUS", payload: { item: incomingCyber, charID: charDetails.id, table: 'char_owned_cyberware', tablePrimaryKey: 'owned_cyberware_id', tableID: incomingCyber.owned_cyberware_id, equipStatus: true, charCyberwareSlots, humanity: { currentPermLoss: charDetails.perm_humanity_loss, currentTempLoss: charDetails.temp_humanity_loss } } });
                            break;
                        } else {
                            setToastText('You do not have a shoulder to stand on.')
                            setShowSnackbar(true)
                            dispatch({ type: "SET_ADVANCEMENT_LOAD_STATUS", payload: false })
                            break;
                        }
                    }
                    // If a cyberarm type and not a right / left cyberarm (thus, an arm mod), see if there are any slots open for mods.
                } else if (incomingCyber.name === 'Big Knucks' || incomingCyber.name === 'Scratchers' || incomingCyber.name === 'Rippers' || incomingCyber.name === 'Wolvers') {
                    dispatch({ type: "CHANGE_GEAR_EQUIP_STATUS", payload: { item: incomingCyber, charID: charDetails.id, table: 'char_owned_cyberware', tablePrimaryKey: 'owned_cyberware_id', tableID: incomingCyber.owned_cyberware_id, equipStatus: true, charCyberwareSlots, humanity: { currentPermLoss: charDetails.perm_humanity_loss, currentTempLoss: charDetails.temp_humanity_loss } } });
                    break;
                } else if (cyberarmSlots > 0) {
                    // if there are open slots, lower slot count by 1, equip gear, and exit function
                    dispatch({ type: "CHANGE_GEAR_EQUIP_STATUS", payload: { item: incomingCyber, charID: charDetails.id, table: 'char_owned_cyberware', tablePrimaryKey: 'owned_cyberware_id', tableID: incomingCyber.owned_cyberware_id, equipStatus: true, charCyberwareSlots, humanity: { currentPermLoss: charDetails.perm_humanity_loss, currentTempLoss: charDetails.temp_humanity_loss } } });
                    break;
                } else {
                    // if there are no open slots, alert user to lack of slots.
                    setToastText("Not enough slots - make sure you have a cyberarm or two and they aren't already full!")
                    setShowSnackbar(true)
                    dispatch({ type: "SET_ADVANCEMENT_LOAD_STATUS", payload: false })
                    break;
                }
            case 'cyberleg':
                // coming soon: SpiderLegs(tm) and reworking of cyberlegs to be even more identical to cyberarms.
                dispatch({ type: "SET_ADVANCEMENT_LOAD_STATUS", payload: true })
                if (incomingCyber.name === 'Cyberleg - Right' || incomingCyber.name === 'Cyberleg - Left') {
                    if (incomingCyber.name === 'Cyberleg - Right') {
                        let rightLegCount = 1
                        for (let i = 0; i < charCyberware.length; i++) {
                            if (charCyberware[i].name === 'Cyberleg - Right' && charCyberware[i].equipped === true) {
                                rightLegCount += -1
                            }
                        }
                        if (rightLegCount > 0) {
                            dispatch({ type: "CHANGE_GEAR_EQUIP_STATUS", payload: { item: incomingCyber, charID: charDetails.id, table: 'char_owned_cyberware', tablePrimaryKey: 'owned_cyberware_id', tableID: incomingCyber.owned_cyberware_id, equipStatus: true, charCyberwareSlots, humanity: { currentPermLoss: charDetails.perm_humanity_loss, currentTempLoss: charDetails.temp_humanity_loss } } });
                        } else {
                            setToastText('You already have that cyberleg equipped!')
                            setShowSnackbar(true)
                            dispatch({ type: "SET_ADVANCEMENT_LOAD_STATUS", payload: false })
                            return;
                        }

                    } else if (incomingCyber.name === 'Cyberleg - Left') {
                        let leftLegCount = 1
                        for (let i = 0; i < charCyberware.length; i++) {
                            if (charCyberware[i].name === 'Cyberleg - Left' && charCyberware[i].equipped === true) {
                                leftLegCount += -1
                            }
                        }
                        if (leftLegCount > 0) {
                            dispatch({ type: "CHANGE_GEAR_EQUIP_STATUS", payload: { item: incomingCyber, charID: charDetails.id, table: 'char_owned_cyberware', tablePrimaryKey: 'owned_cyberware_id', tableID: incomingCyber.owned_cyberware_id, equipStatus: true, charCyberwareSlots, humanity: { currentPermLoss: charDetails.perm_humanity_loss, currentTempLoss: charDetails.temp_humanity_loss } } });
                        } else {
                            setToastText('You already have that cyberleg equipped!')
                            setShowSnackbar(true)
                            dispatch({ type: "SET_ADVANCEMENT_LOAD_STATUS", payload: false })
                            return;
                        }
                    }
                    break;
                } else if (cyberlegSlots > 0) {
                    dispatch({ type: "CHANGE_GEAR_EQUIP_STATUS", payload: { item: incomingCyber, charID: charDetails.id, table: 'char_owned_cyberware', tablePrimaryKey: 'owned_cyberware_id', tableID: incomingCyber.owned_cyberware_id, equipStatus: true, charCyberwareSlots, humanity: { currentPermLoss: charDetails.perm_humanity_loss, currentTempLoss: charDetails.temp_humanity_loss } } });
                    break;
                } else {
                    setToastText("Not enough slots - make sure you have a cyberleg or two and they aren't already full!")
                    setShowSnackbar(true)
                    dispatch({ type: "SET_ADVANCEMENT_LOAD_STATUS", payload: false })
                    break;
                }
            case 'borgware':
                dispatch({ type: "SET_ADVANCEMENT_LOAD_STATUS", payload: true })
                // linear frame checks should already be in place in cyberware check
                // shoulder mount should not be able to be removed if 2 of either cyberlimb is equipped.
                // TBAdded - SPIDERLEGS
                dispatch({ type: "CHANGE_GEAR_EQUIP_STATUS", payload: { item: incomingCyber, charID: charDetails.id, table: 'char_owned_cyberware', tablePrimaryKey: 'owned_cyberware_id', tableID: incomingCyber.owned_cyberware_id, equipStatus: true, charCyberwareSlots, humanity: { currentPermLoss: charDetails.perm_humanity_loss, currentTempLoss: charDetails.temp_humanity_loss } } });
                break;
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
                    break;
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
                dispatch({ type: "CHANGE_GEAR_EQUIP_STATUS", payload: { item: incomingCyber, charID: charDetails.id, table: 'char_owned_cyberware', tablePrimaryKey: 'owned_cyberware_id', tableID: incomingCyber.owned_cyberware_id, equipStatus: false, charCyberwareSlots, humanity: { currentPermLoss: charDetails.perm_humanity_loss, currentTempLoss: charDetails.temp_humanity_loss } } });
                break;
            case 'cyberleg':
                dispatch({ type: "SET_ADVANCEMENT_LOAD_STATUS", payload: true })
                dispatch({ type: "CHANGE_GEAR_EQUIP_STATUS", payload: { item: incomingCyber, charID: charDetails.id, table: 'char_owned_cyberware', tablePrimaryKey: 'owned_cyberware_id', tableID: incomingCyber.owned_cyberware_id, equipStatus: false, charCyberwareSlots, humanity: { currentPermLoss: charDetails.perm_humanity_loss, currentTempLoss: charDetails.temp_humanity_loss } } });
                break;
            case 'borgware':
                dispatch({ type: "SET_ADVANCEMENT_LOAD_STATUS", payload: true })
                // need a check to prevent removing artificial shoulder mount if character has 2 of either cyberarm still equipped.
                dispatch({ type: "CHANGE_GEAR_EQUIP_STATUS", payload: { item: incomingCyber, charID: charDetails.id, table: 'char_owned_cyberware', tablePrimaryKey: 'owned_cyberware_id', tableID: incomingCyber.owned_cyberware_id, equipStatus: false, charCyberwareSlots, humanity: { currentPermLoss: charDetails.perm_humanity_loss, currentTempLoss: charDetails.temp_humanity_loss } } });
                // Below isn't complete - linear frames are still in beta.
                // dispatch({ type: 'UNEQUIP_CYBERWARE', payload: { incomingCyber: incomingCyber } })
                // dispatch({ type: 'HUMANITY_RECOVERY_CYBERWARE', payload: { totalLoss: Number(humanityLossCalculator(incomingCyber.humanity_loss_min, incomingCyber.humanity_loss_max)), minLoss: Number(incomingCyber.humanity_loss_min) } })
                // if (incomingCyber.name === 'Linear Frame Alpha') {
                //     // ATTRIBUTE_ENHANCING_CYBERWARE_EQUIPPED (attribute/amount)
                //     dispatch({ type: "STATIC_CYBERWARE_ATTRIBUTE_SET", payload: { type: 'cyber_strength', quality: 0 } })
                //     dispatch({ type: "STATIC_CYBERWARE_ATTRIBUTE_SET", payload: { type: 'cyber_body', quality: 0 } })
                //     dispatch({ type: "STATIC_CYBERWARE_ATTRIBUTE_SET", payload: { type: 'cyber_reflexes', quality: 0 } })
                //     // CYBERWARE_ARMOR_EQUIPPED (health/armor)
                //     dispatch({ type: 'CYBERWARE_ARMOR_REMOVED', payload: { armor: -5, healthBoxes: -4 } })
                // }
                break;
            default:
                break;
        }
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

                                            <TableCell align="center"><Button variant={loadStatus === true ? 'disabled' : 'contained'} color='secondary' onClick={() => unequipCyber(item)}>Unequip</Button></TableCell>
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
                                            <TableCell align="center"><Button variant={loadStatus === true ? 'disabled' : 'contained'} color='info' onClick={() => cyberwareEquippedCheck(item)}>Equip</Button></TableCell>
                                        </TableRow>
                                    ) : <></>}</React.Fragment>)
                        }
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    </>)
}