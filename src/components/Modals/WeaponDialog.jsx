import * as React from 'react';
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { Grid } from '@mui/material';

export default function WeaponDialog({ prop }) {
    const weaponMaster = useSelector(store => store.weaponMaster)
    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');

    const handleClickOpen = (scrollType) => () => {
        setOpen(true);
        setScroll(scrollType);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const dialogText = (prop) => {
        // switch (prop) 
        //     case 'Vampyres':
        //     case 'Cybersnake':
        //         return (<>
        //             <Grid container fontFamily={'serif'}>
        //                 <Grid item padding={1} xs={12}>These weapons are implanted in a character, and are very hard to detect. They generally cannot be found without some reason to suspect their existence, and require an Intelligence + Cyber Tech roll against a difficulty value of 8 or higher to spot.</Grid>
        //                 <Grid item padding={1} xs={12}>Vampyres are retractable fangs that can be used as a Light Melee Weapon. They can store a single dose of poison. Using them requires first grappling a victim, but their damage is aggravated if the attacker desires.</Grid>
        //                 <Grid item padding={1} xs={12}>Cybersnakes are horrifying weapons, consisting of a metal tentacle that erupts out of a handy orifice. Most users opt to implant them in the abdomen and have them come out of their mouth - the head of the weapon is commonly compared to a razor-blade roto rooter. The tentacle is approximately 3 feet long. If the user successfully grapples an enemy before attacking with this weapon, the damage it causes is aggravated.</Grid>
        //             </Grid>
        //         </>)
        //     case 'Scratchers':
        //     case 'Rippers':
        //     case 'Wolvers':
        //         return (<>
        //             <Grid container fontFamily={'serif'}>
        //                 <Grid item padding={1} xs={12}>Big Knucks are little more than reinforced knuckles, and allow a character's unarmed attacks to deal lethal damage as well as acting as a medium melee weapon.</Grid>
        //                 <Grid item padding={1} xs={12}>These weapons are implanted in a cyberlimb, and are quite hard to spot, requiring an Intelligence + Cyber Tech roll against a difficulty value of 7 or higher to spot.</Grid>
        //                 <Grid item padding={1} xs={12}>Scratchers are simple replacement fingernails that are edged in carbide razors; they are relatively fragile but quite dangerous and unexpected. They deal damage as a Light Melee Weapon and use the Exotic Weapons skill.</Grid>
        //                 <Grid item padding={1} xs={12}>Rippers are claws that extend from the middle joint of the finger and lock into place. They deal damage as a Medium Melee Weapon and use the Exotic Weapons skill.</Grid>
        //                 <Grid item padding={1} xs={12}>Wolvers are roughly 8 inch clas that extend between the knuckles. They deal damage as a Heavy Melee Weapon and use the Exotic Weapons skill. For legal reasons they do not make the noise.</Grid>
        //             </Grid>
        //         </>)
        //     case 'Big Knucks':
        //         return (<>
        //             <Grid container fontFamily={'serif'}>
        //                 <Grid item padding={1} xs={12}>Big Knucks are little more than reinforced knuckles, and allow a character's unarmed attacks to deal lethal damage as well as acting as a medium melee weapon.</Grid>
        //             </Grid>
        //         </>)
        //     case 'Companion Revolver':
        //         return ''
        //     default:
        //         return ''
        // }

    }

    const titleText = (prop) => {
        switch (prop) {
            case 'DMG':
                return 'Damage'
            case 'ROF':
                return 'Rate of Fire'
            default:
                return prop
        }
    }

    return (
        <>
            <Button sx={{
                justifyContent: 'flex-start',
                textTransform: 'none', color: 'white', '&:hover': {
                    backgroundColor: '#fff',
                    color: '#000',
                }
            }} fullWidth onClick={handleClickOpen('paper')}>{prop}</Button>
            <Dialog
                open={open}
                onClose={handleClose}
                scroll={scroll}
                maxWidth='lg'
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title">{titleText(prop)}</DialogTitle>
                <DialogContent dividers={scroll === 'paper'}>
                    {weaponMaster.map(item => {
                        if (item.name === prop) {
                            return (
                                <React.Fragment key={item.weapon_master_id}>
                                    <Grid container fontFamily={'serif'}>
                                        <Grid item padding={1} xs={12}>{item.description}</Grid>
                                    </Grid>
                                </React.Fragment>
                            )
                        }
                    })}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}