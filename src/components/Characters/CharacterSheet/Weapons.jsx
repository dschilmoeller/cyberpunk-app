import React from 'react';
import Grid from '@mui/material/Grid';
import { useSelector, useDispatch } from 'react-redux';
import Item from './Item';
import { Button, Typography } from '@mui/material';

import OtherAttributesDialog from '../../Modals/OtherAttributesDialog';
import WeaponDialog from '../../Modals/WeaponDialog';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';

function TransitionUp(props) {
    return <Slide {...props} direction="up" />;
}

function Weapons() {
    const charWeapons = useSelector((store) => store.characterWeapons)
    const charDetail = useSelector((store) => store.characterDetail)
    const charCyberDetail = useSelector((store) => store.characterCyberDetail)

    const dispatch = useDispatch();
    const unhurtMarker = `\u2610`;
    const aggMarker = `\u2718`;

    const [showSnackbar, setShowSnackbar] = React.useState(false);
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    // handles clicking an ammo box manually. simply converts one box from checked to unchecked and vice versa
    const ammoBoxChanger = (e, incomingKey) => {
        if (e.target.innerText === unhurtMarker) {
            dispatch({ type: "FIRE_ONE_SHOT", payload: incomingKey })
        } else if (e.target.innerText === aggMarker) {
            dispatch({ type: "RELOAD_ONE_SHOT", payload: incomingKey })
        }
    }

    // builds the array of boxes out of the max clip (total boxes) and shotsFired (checked boxes)
    const clipBuilder = (maxClip, shotsFired, incomingKey) => {
        let clipArray = []
        // starts by adding a checked box to the array
        for (let i = 0; i < shotsFired; i++) {
            // key is good until something with more than 100 bullets in the clip comes along
            clipArray.push(<Grid item key={i + 100} xs={1.2}><Item onClick={(e) => ammoBoxChanger(e, incomingKey)}>{aggMarker}</Item></Grid>)
        }
        // next adds blank boxes to the array to the end of the list.
        if (clipArray.length < maxClip) {
            let remainder = maxClip - shotsFired
            for (let i = 0; i < remainder; i++) {
                clipArray.push(<Grid item key={i + 200} xs={1.2}><Item onClick={(e) => ammoBoxChanger(e, incomingKey)}>{unhurtMarker}</Item></Grid>)
            }
        }
        return clipArray
    }

    // handles what options are available for a given weapon. SMG and Assault are separated for the moment but could be an OR logic. Default is most guns with only shoot and reload available.
    // not called for melee weapons, which have unlimited ammo
    const ClipButtonBuilder = (damageType, incomingKey, max_clip, current_shots_fired) => {
        switch (damageType) {
            case 'smg':
                return (<Grid item xs={12}><Item><Typography>Clip: <Button onClick={() => handleOneShot(incomingKey, max_clip, current_shots_fired)}>Shoot</Button> <Button onClick={() => handleAutoFire(incomingKey, max_clip, current_shots_fired)}>AutoFire</Button> <Button onClick={() => handleReload(incomingKey)}>Reload</Button> </Typography> </Item></Grid>)
            case 'assault':
                return (<Grid item xs={12}><Item><Typography>Clip: <Button onClick={() => handleOneShot(incomingKey, max_clip, current_shots_fired)}>Shoot</Button> <Button onClick={() => handleAutoFire(incomingKey, max_clip, current_shots_fired)}>AutoFire</Button> <Button onClick={() => handleReload(incomingKey)}>Reload</Button> </Typography> </Item></Grid>)
            default:
                return (<Grid item xs={12}><Item><Typography>Clip: <Button onClick={() => handleOneShot(incomingKey, max_clip, current_shots_fired)}>Shoot</Button> <Button onClick={() => handleReload(incomingKey)}>Reload</Button> </Typography> </Item></Grid>)
        }
    }

    // if gun has 10 or more bullets, allows firing 10 shots in one go.
    const handleAutoFire = (incomingKey, max_clip, current_shots_fired) => {
        if ((max_clip - current_shots_fired) > 9) {
            dispatch({ type: 'FIRE_WEAPON_AUTOMATIC', payload: incomingKey })
        } else {
            setShowSnackbar(true)
        }
    }

    // changes all boxes to unchecked.
    const handleReload = (incomingKey) => {
        dispatch({ type: 'RELOAD_WEAPON', payload: incomingKey })
    }

    // identical to clicking a box in the relevant area.
    const handleOneShot = (incomingKey, max_clip, current_shots_fired) => {
        if ((max_clip - current_shots_fired) > 0) {
        dispatch({ type: "FIRE_ONE_SHOT", payload: incomingKey })
        } else {
            setShowSnackbar(true)
        }
    }

    const weaponHandCalculation = (incoming) => {
        if (incoming.dmg_type === 'melee') {
            if (incoming.name === 'Heavy Melee Weapon' && (charDetail.strength + charDetail.cyber_strength) > 3) {
                return 1
            } else if (incoming.name === 'Heavy Melee Weapon' && (charDetail.strength + charDetail.cyber_strength) > 8) {
                return 1
            } else {
                return incoming.hands
            }
        }
    }

    const cyberWeaponData = (cyberware) => {
        let damage = 0
        switch (cyberware.name) {
            case 'Cybersnake':
                damage = charDetail.strength + charDetail.cyber_strength + 2
                return (
                    <React.Fragment key={cyberware.owned_cyberware_id}>
                        <Grid item xs={6} >
                            <Grid container>
                                <Grid item xs={6}><Item><b>Name</b></Item></Grid>
                                <Grid item xs={2}><Item><OtherAttributesDialog prop={'DMG'} /></Item></Grid>
                                <Grid item xs={2}><Item><OtherAttributesDialog prop={'ROF'} /></Item></Grid>
                                <Grid item xs={2}><Item><OtherAttributesDialog prop={'Range'} /></Item></Grid>
                                <Grid item xs={6}><Item><WeaponDialog prop={cyberware.name} /></Item></Grid>
                                <Grid item xs={2}><Item>{damage}</Item></Grid>
                                <Grid item xs={2}><Item>2</Item></Grid>
                                <Grid item xs={2}><Item>Melee</Item></Grid>
                                <Grid item xs={6}><Item>Conceal: Yes</Item></Grid>
                                <Grid item xs={6}><Item>Number of Hands: 0</Item></Grid>
                            </Grid>
                        </Grid>
                    </React.Fragment>
                )
            case 'Vampyres':
                damage = charDetail.strength + charDetail.cyber_strength + 0
                return (
                    <React.Fragment key={cyberware.owned_cyberware_id}>
                        <Grid item xs={6} >
                            <Grid container>
                                <Grid item xs={6}><Item><b>Name</b></Item></Grid>
                                <Grid item xs={2}><Item><OtherAttributesDialog prop={'DMG'} /></Item></Grid>
                                <Grid item xs={2}><Item><OtherAttributesDialog prop={'ROF'} /></Item></Grid>
                                <Grid item xs={2}><Item><OtherAttributesDialog prop={'Range'} /></Item></Grid>
                                <Grid item xs={6}><Item><WeaponDialog prop={cyberware.name} /></Item></Grid>
                                <Grid item xs={2}><Item>{damage}</Item></Grid>
                                <Grid item xs={2}><Item>2</Item></Grid>
                                <Grid item xs={2}><Item>Melee</Item></Grid>
                                <Grid item xs={6}><Item>Conceal: Yes</Item></Grid>
                                <Grid item xs={6}><Item>Number of Hands: 0</Item></Grid>
                            </Grid>
                        </Grid>
                    </React.Fragment>)
            case 'Big Knucks':
                damage = charDetail.strength + charDetail.cyber_strength + 1
                return (
                    <React.Fragment key={cyberware.owned_cyberware_id}>
                        <Grid item xs={6} >
                            <Grid container>
                                <Grid item xs={6}><Item><b>Name</b></Item></Grid>
                                <Grid item xs={2}><Item><OtherAttributesDialog prop={'DMG'} /></Item></Grid>
                                <Grid item xs={2}><Item><OtherAttributesDialog prop={'ROF'} /></Item></Grid>
                                <Grid item xs={2}><Item><OtherAttributesDialog prop={'Range'} /></Item></Grid>
                                <Grid item xs={6}><Item><WeaponDialog prop={cyberware.name} /></Item></Grid>
                                <Grid item xs={2}><Item>{damage}</Item></Grid>
                                <Grid item xs={2}><Item>2</Item></Grid>
                                <Grid item xs={2}><Item>Melee</Item></Grid>
                                <Grid item xs={6}><Item>Conceal: Yes</Item></Grid>
                                <Grid item xs={6}><Item>Number of Hands: 0</Item></Grid>
                            </Grid>
                        </Grid>
                    </React.Fragment>
                )
            case 'Scratchers':
                damage = charDetail.strength + charDetail.cyber_strength + 0
                return (
                    <React.Fragment key={cyberware.owned_cyberware_id}>
                        <Grid item xs={6} >
                            <Grid container>
                                <Grid item xs={6}><Item><b>Name</b></Item></Grid>
                                <Grid item xs={2}><Item><OtherAttributesDialog prop={'DMG'} /></Item></Grid>
                                <Grid item xs={2}><Item><OtherAttributesDialog prop={'ROF'} /></Item></Grid>
                                <Grid item xs={2}><Item><OtherAttributesDialog prop={'Range'} /></Item></Grid>
                                <Grid item xs={6}><Item><WeaponDialog prop={cyberware.name} /></Item></Grid>
                                <Grid item xs={2}><Item>{damage}</Item></Grid>
                                <Grid item xs={2}><Item>2</Item></Grid>
                                <Grid item xs={2}><Item>Melee</Item></Grid>
                                <Grid item xs={6}><Item>Conceal: Yes</Item></Grid>
                                <Grid item xs={6}><Item>Number of Hands: 1</Item></Grid>
                            </Grid>
                        </Grid>
                    </React.Fragment>
                )
            case 'Rippers':
                damage = charDetail.strength + charDetail.cyber_strength + 1
                return (
                    <React.Fragment key={cyberware.owned_cyberware_id}>
                        <Grid item xs={6} >
                            <Grid container>
                                <Grid item xs={6}><Item><b>Name</b></Item></Grid>
                                <Grid item xs={2}><Item><OtherAttributesDialog prop={'DMG'} /></Item></Grid>
                                <Grid item xs={2}><Item><OtherAttributesDialog prop={'ROF'} /></Item></Grid>
                                <Grid item xs={2}><Item><OtherAttributesDialog prop={'Range'} /></Item></Grid>
                                <Grid item xs={6}><Item><WeaponDialog prop={cyberware.name} /></Item></Grid>
                                <Grid item xs={2}><Item>{damage}</Item></Grid>
                                <Grid item xs={2}><Item>2</Item></Grid>
                                <Grid item xs={2}><Item>Melee</Item></Grid>
                                <Grid item xs={6}><Item>Conceal: Yes</Item></Grid>
                                <Grid item xs={6}><Item>Number of Hands: 1</Item></Grid>
                            </Grid>
                        </Grid>
                    </React.Fragment>
                )
            case 'Wolvers':
                damage = charDetail.strength + charDetail.cyber_strength + 2
                return (
                    <React.Fragment key={cyberware.owned_cyberware_id}>
                        <Grid item xs={6} >
                            <Grid container>
                                <Grid item xs={6}><Item><b>Name</b></Item></Grid>
                                <Grid item xs={2}><Item><OtherAttributesDialog prop={'DMG'} /></Item></Grid>
                                <Grid item xs={2}><Item><OtherAttributesDialog prop={'ROF'} /></Item></Grid>
                                <Grid item xs={2}><Item><OtherAttributesDialog prop={'Range'} /></Item></Grid>
                                <Grid item xs={6}><Item><WeaponDialog prop={cyberware.name} /></Item></Grid>
                                <Grid item xs={2}><Item>{damage}</Item></Grid>
                                <Grid item xs={2}><Item>2</Item></Grid>
                                <Grid item xs={2}><Item>Melee</Item></Grid>
                                <Grid item xs={6}><Item>Conceal: Yes</Item></Grid>
                                <Grid item xs={6}><Item>Number of Hands: 1</Item></Grid>
                            </Grid>
                        </Grid>
                    </React.Fragment>
                )
            default:
                return (<React.Fragment key={cyberware.owned_cyberware_id}></React.Fragment>)
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
                    Insufficient Ammo!
                </Alert>
            </Snackbar >

            <Grid container spacing={2}>
                <Grid item xs={12}><Item>Equipped Weapons</Item></Grid>
                {/* cycle through weapons and list melee weapons up top */}
                {/* Starting with cyberweapons */}
                {charCyberDetail.map(cyberware => {
                    if (cyberware.equipped === true) {
                        return cyberWeaponData(cyberware)
                    }
                })}
                {charWeapons.map(weapon => {
                    if (weapon.equipped === true) {
                        if (weapon.dmg_type === 'melee') {
                            return (
                                <React.Fragment key={weapon.weapon_bridge_id}>
                                    <Grid item xs={6} >
                                        <Grid container>
                                            <Grid item xs={6}><Item><b>Name</b></Item></Grid>
                                            <Grid item xs={2}><Item><OtherAttributesDialog prop={'DMG'} /></Item></Grid>
                                            <Grid item xs={2}><Item><OtherAttributesDialog prop={'ROF'} /></Item></Grid>
                                            <Grid item xs={2}><Item><OtherAttributesDialog prop={'Range'} /></Item></Grid>
                                            <Grid item xs={6}><Item><WeaponDialog prop={weapon.name} /></Item></Grid>
                                            <Grid item xs={2}><Item>{weapon.dmg_type === 'melee' ? charDetail.strength + charDetail.cyber_strength + weapon.damage : weapon.damage}</Item></Grid>
                                            <Grid item xs={2}><Item>{weapon.rof}</Item></Grid>
                                            <Grid item xs={2}><Item>{weapon.range === 0 ? 'Melee' : weapon.range}</Item></Grid>
                                            <Grid item xs={6}><Item>{weapon.concealable ? 'Conceal: Yes' : 'Conceal: No'}</Item></Grid>
                                            <Grid item xs={6}><Item>Number of Hands: {weaponHandCalculation(weapon)}</Item></Grid>
                                        </Grid>
                                    </Grid>
                                </React.Fragment>
                            )
                        }
                    }
                })}
                {/* display remaining weapons */}
                {charWeapons.map(weapon => {
                    if (weapon.equipped === true) {
                        if (weapon.dmg_type != 'melee') {
                            return (
                                <React.Fragment key={weapon.weapon_bridge_id}>
                                    <Grid item xs={6}>
                                        <Grid container>
                                            <Grid item xs={6}><Item><b>Name</b></Item></Grid>
                                            <Grid item xs={2}><Item><OtherAttributesDialog prop={'DMG'} /></Item></Grid>
                                            <Grid item xs={2}><Item><OtherAttributesDialog prop={'ROF'} /></Item></Grid>
                                            <Grid item xs={2}><Item><OtherAttributesDialog prop={'Range'} /></Item></Grid>
                                            <Grid item xs={6}><Item><WeaponDialog prop={weapon.name} /></Item></Grid>
                                            <Grid item xs={2}><Item>{weapon.dmg_type === 'melee' ? charDetail.strength + weapon.damage : weapon.damage}</Item></Grid>
                                            <Grid item xs={2}><Item>{weapon.rof}</Item></Grid>
                                            <Grid item xs={2}><Item>{weapon.range === 0 ? 'Melee' : weapon.range}</Item></Grid>
                                            <Grid item xs={6}><Item>{weapon.concealable ? 'Conceal: Yes' : 'Conceal: No'}</Item></Grid>
                                            <Grid item xs={6}><Item>Number of Hands: {weapon.hands}</Item></Grid>
                                            {ClipButtonBuilder(weapon.dmg_type, weapon.weapon_bridge_id, weapon.max_clip, weapon.current_shots_fired)}

                                        </Grid>
                                        <Grid container justifyContent={'center'}>
                                            {clipBuilder(weapon.max_clip, weapon.current_shots_fired, weapon.weapon_bridge_id)}
                                        </Grid>
                                    </Grid>
                                </React.Fragment>
                            )
                        }
                    }
                })}
            </Grid>
        </>
    )
}

export default Weapons;