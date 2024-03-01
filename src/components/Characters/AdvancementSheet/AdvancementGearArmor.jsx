import React from 'react';
import Grid from '@mui/material/Grid';
import { useSelector, useDispatch } from 'react-redux';
import Item from '../CharacterSheet/Item';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { Button } from '@mui/material';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';

function TransitionUp(props) {
    return <Slide {...props} direction="up" />;
}

export default function AdvancementGearArmor() {
    const dispatch = useDispatch();
    const charBank = useSelector(store => store.advancementDetail.bank)
    const charDetail = useSelector((store) => store.advancementDetail)
    const charCyberArmorMax = useSelector(store => store.advancementDetail.current_cyberware_armor_quality)
    const charCyberArmorCurrent = useSelector(store => store.advancementDetail.current_cyberware_armor_loss)
    const characterArmor = useSelector(store => store.advancementGear.armor)
    const characterShield = useSelector(store => store.advancementGear.shield)


    const [showSnackbar, setShowSnackbar] = React.useState(false);
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });
    const [alertText, setAlertText] = React.useState('')

    const armorMaxQualityBuilder = () => {
        let armorTotal = 0
        characterArmor.map(item => {
            if (item.equipped === true) {
                armorTotal += item.quality
            }
        })
        characterShield.map(item => {
            if (item.equipped === true) {
                armorTotal += item.quality
            }
        })
        return armorTotal
    }

    const armorCurrentQualityBuilder = () => {
        let armorTotal = 0
        characterArmor.map(item => {
            if (item.equipped === true) {
                armorTotal += item.quality
                armorTotal -= item.this_armor_loss
            }
        })
        characterShield.map(item => {
            if (item.equipped === true) {
                armorTotal += item.quality
                armorTotal -= item.this_shield_loss
            }
        })
        return armorTotal
    }

    const armorAmountBuilder = () => {
        let armorTotal = 0
        characterArmor.map(item => {
            if (item.equipped === true) {
                armorTotal += item.quality
                armorTotal -= item.this_armor_loss
            }
        })
        return armorTotal
    }

    const shieldAmountBuilder = () => {
        let shieldTotal = 0
        characterShield.map(item => {
            if (item.equipped === true) {
                shieldTotal += item.quality
                shieldTotal -= item.this_shield_loss
            }
        })
        return shieldTotal
    }

    const equipArmor = (incomingArmor) => {
        characterArmor.map(armor => {
            if (armor.equipped === true) {
                unequipArmor(armor)
            }
        })
        dispatch({ type: 'EQUIP_ARMOR', payload: { armor: incomingArmor, charID: charDetail.id } })
    }

    const equipShield = (incomingShield) => {
        characterShield.map(shield => {
            if (shield.equipped === true) {
                unequipShield(shield)
            }
        })
        dispatch({ type: 'EQUIP_SHIELD', payload: { shield: incomingShield, charID: charDetail.id } })
    }

    const unequipArmor = (incomingArmor) => {
        dispatch({ type: 'UNEQUIP_ARMOR', payload: { armor: incomingArmor, charID: charDetail.id } })
    }
    
    const unequipShield = (incomingShield) => {
        dispatch({ type: 'UNEQUIP_SHIELD', payload: { shield: incomingShield, charID: charDetail.id } })
    }

    const repairArmor = (incomingArmor) => {
        if (incomingArmor.this_armor_loss * (incomingArmor.price / 10) == 0) {
            setAlertText('No Repairs Required')
            setShowSnackbar(true)
        } else if (charBank >= incomingArmor.this_armor_loss * (incomingArmor.price / 10)) {
            dispatch({ type: 'REPAIR_ARMOR', payload: incomingArmor })
        } else {
            setAlertText('Cannot Afford Repairs')
            setShowSnackbar(true)
        }
    }

    const repairShield = (incomingShield) => {
        if (incomingShield.this_shield_loss * (incomingShield.price / 10) == 0) {
            setAlertText('No Repairs Required')
            setShowSnackbar(true)
        } else if (charBank >= incomingShield.this_shield_loss * (incomingShield.price / 10)) {
            dispatch({ type: 'REPAIR_SHIELD', payload: incomingShield })
        } else {
            setAlertText('Cannot Afford Repairs')
            setShowSnackbar(true)
        }
    }

    const repairCyberware = () => {
        if ((charCyberArmorCurrent * 300) == 0) {
            setAlertText('No Repairs Required')
            setShowSnackbar(true)
        } else if (charBank >= (charCyberArmorCurrent * 300)) {
            dispatch({ type: 'REPAIR_CYBERWARE', payload: Number((charCyberArmorCurrent * 300)) })
        } else {
            setAlertText('Cannot Afford Repairs')
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
                    {alertText}
                </Alert>
            </Snackbar>

            <Grid container>
                <Grid container spacing={2} padding={1} item xs={12}>
                    <Grid item xs={6}><Item><h2>Current Maximum Armor: {armorMaxQualityBuilder()}</h2></Item></Grid>
                    <Grid item xs={6}><Item><h2>Current Total Armor: {armorCurrentQualityBuilder()}</h2></Item></Grid>
                    <Grid item xs={6}><Item><h2>From Armor: {armorAmountBuilder()}</h2></Item></Grid>
                    <Grid item xs={6}><Item><h2>From Shield: {shieldAmountBuilder()}</h2></Item></Grid>
                    <Grid item xs={6}><Item><h2>From Cyberware: {charCyberArmorMax - charCyberArmorCurrent} of {charCyberArmorMax}</h2></Item></Grid>
                    <Grid item xs={6}><Item><Button fullWidth onClick={() => repairCyberware()}>Repair Cyberware - ${(charCyberArmorCurrent) * 300}</Button></Item></Grid>
                </Grid>
            </Grid>

            <h1>Equipped Armor</h1>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow hover>
                            <TableCell align="left">Name</TableCell>
                            <TableCell align="left">Quality</TableCell>
                            <TableCell align="left">Damage</TableCell>
                            <TableCell align="left">Repair?</TableCell>
                            <TableCell align="left">Description</TableCell>
                            <TableCell align="left">Unequip</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {characterArmor.map((item, i) => {
                            if (item.equipped === true && item.name != 'No Armor') {
                                return (
                                    <TableRow hover key={i}>
                                        <TableCell align="left">{item.name} </TableCell>
                                        <TableCell align="left">{item.quality}</TableCell>
                                        <TableCell align="left">{item.this_armor_loss}</TableCell>
                                        <TableCell align="left"><Button onClick={() => repairArmor(item)}>Repair - ${item.this_armor_loss * item.price / 10}</Button></TableCell>
                                        <TableCell width={600} align="left">{item.description}</TableCell>
                                        <TableCell align="left"><Button onClick={() => unequipArmor(item)}>Unequip</Button></TableCell>
                                    </TableRow>
                                )
                            }
                        })}
                        {characterShield.map((item, i) => {
                            if (item.equipped === true && item.name != 'No Shield') {
                                return (
                                    <TableRow hover key={i}>
                                        <TableCell align="left">{item.name} </TableCell>
                                        <TableCell align="left">{item.quality}</TableCell>
                                        <TableCell align="left">{item.this_shield_loss}</TableCell>
                                        <TableCell align="left"><Button onClick={() => repairShield(item)}>Repair - ${item.this_shield_loss * item.price / 10}</Button></TableCell>
                                        <TableCell width={600} align="left">{item.description}</TableCell>
                                        <TableCell align="left"><Button onClick={() => unequipShield(item)}>Unequip</Button></TableCell>
                                    </TableRow>
                                )
                            }
                        })}
                    </TableBody>
                </Table>
            </TableContainer>

            <h1>Owned Armor</h1>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow hover>
                            <TableCell align="left">Name</TableCell>
                            <TableCell align="left">Quality</TableCell>
                            <TableCell align="left">Damage</TableCell>
                            <TableCell align="left">Repair?</TableCell>
                            <TableCell align="left">Description</TableCell>
                            <TableCell align="left">Equip?</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {characterArmor.map((item, i) => {
                            if (item.equipped === false && item.name != 'No Armor') {
                                return (
                                    <TableRow hover key={i}>
                                        <TableCell align="left">{item.name} </TableCell>
                                        <TableCell align="left">{item.quality}</TableCell>
                                        <TableCell align="left">{item.this_armor_loss}</TableCell>
                                        <TableCell align="left"><Button onClick={() => repairArmor(item)}>Repair - ${item.this_armor_loss * item.price / 10}</Button></TableCell>
                                        <TableCell width={600} align="left">{item.description}</TableCell>
                                        <TableCell align="left"><Button onClick={() => equipArmor(item)}>Equip</Button></TableCell>
                                    </TableRow>
                                )
                            }
                        })}
                        {characterShield.map((item, i) => {
                            if (item.equipped === false && item.name != 'No Shield') {
                                return (
                                    <TableRow hover key={i}>
                                        <TableCell align="left">{item.name} </TableCell>
                                        <TableCell align="left">{item.quality}</TableCell>
                                        <TableCell align="left">{item.this_shield_loss}</TableCell>
                                        <TableCell align="left"><Button onClick={() => repairShield(item)}>Repair - ${item.this_shield_loss * item.price / 10}</Button></TableCell>
                                        <TableCell width={600} align="left">{item.description}</TableCell>
                                        <TableCell align="left"><Button onClick={() => equipShield(item)}>Equip</Button></TableCell>
                                    </TableRow>
                                )
                            }
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </>)
}