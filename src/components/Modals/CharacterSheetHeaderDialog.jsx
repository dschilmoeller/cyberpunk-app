import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { Grid } from '@mui/material';

import { useSelector, useDispatch } from 'react-redux';

import { Typography } from '@mui/material';

export default function CharacterSheetHeaderDialog({ prop }) {
    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');

    const handleClickOpen = (scrollType) => () => {
        setOpen(true);
        setScroll(scrollType);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const dispatch = useDispatch();

    const burnOneLuck = (charID, max_luck) => {
        dispatch({ type: 'PLAYER_BURN_ONE_LUCK', payload: { charID, max_luck } })
    }

    const dialogText = (prop) => {
        switch (prop) {
            case 'Contacts':
                return (<>
                    <Grid container fontFamily={'serif'}>
                        <Grid item padding={1} xs={12}>Contacts are people with information, resources, and/or skills you've met on your journey.</Grid>
                        <Grid item padding={1} xs={12}>Contacts consist of:</Grid>
                        <Grid item padding={1} xs={12}>The Contact's name or handle.</Grid>
                        <Grid item padding={1} xs={12}>Their Connection - How plugged in, resourceful, or skilled they are. This is determined by the GM, but can be affected by player actions. This ranges from 1 to 9. A friendly lockpick with a connection of 1 is probably able to assist with simple locks in their neighborhood - with some notice. Conversely, a fence with a connection of 9 can dispose of any hot goods, day or night, anywhere in the world, probably within the hour.</Grid>
                        <Grid item padding={1} xs={12}>Their Loyalty -  How loyal the contact is to the character. Contacts default to 0 loyalty - this represents a purely mercenary relationship, and the contact is going to be entirely motivated by money or favors. It can go up to 9 - this represents a contact who will unhesitatingly put themselves into harms way for the player. Please note contacts can have very different relationships with various characters, including those in the same party!</Grid>
                        <Grid item padding={1} xs={12}>Description - this is a GM provided field, usually a quick reference for who the contact is and/or what they can assist with.</Grid>
                        <Grid item padding={1} xs={12}>My Notes - this is a space for characters to write their own private notes regarding the contact.</Grid>
                    </Grid>
                </>)
            case 'Weapons':
                return (<>
                    <Grid container fontFamily={'serif'}>
                        <Grid item padding={1} xs={12}>This is a list of <b>equipped</b> weapons a character has.</Grid>
                        <Grid item padding={1} xs={12}>Weapons come in several varieties - melee, ranged, and cyberware.</Grid>
                        <Grid item padding={1} xs={12}>Weapons have a number of qualities. These can be clicked through and include the following. Weapons with ammunition will also have buttons with the weapons functions (shoot, autofire, and reload) as well as an ammunition tracker.</Grid>
                        <Grid item padding={1} xs={12}>Name - this will provide some basic details of the weapon, including any applicable special rules.</Grid>
                        <Grid item padding={1} xs={12}>DMG - the weapon's base damage.</Grid>
                        <Grid item padding={1} xs={12}>ROF - the weapon's rate of fire.</Grid>
                        <Grid item padding={1} xs={12}>Range - the optimum range for the weapon.</Grid>
                        <Grid item padding={1} xs={12}>Conceal - whether the weapon can be concealed or not.</Grid>
                        <Grid item padding={1} xs={12}>Number of hands - the required number of hands to use the weapon effectively.</Grid>
                        <Grid item padding={1} xs={12}>Below weapons grenades are listed; these include the name and range they can be thrown, based on the character's strength.</Grid>
                    </Grid>
                </>)
            case 'Backpack':
                return (<>
                    <Grid container fontFamily={'serif'}>
                        <Grid item padding={1} xs={12}>This is your backpack! Miscellaneous items can be found and consumed here, including food, pharmaceuticals, and other consumables.</Grid>
                        <Grid item padding={1} xs={12}>For the convenience of your GM, you can add and remove arbitrary amounts of money from your backpack as well.</Grid>
                    </Grid>
                </>)
            case 'Cyberware':
                return (<>
                    <Grid container fontFamily={'serif'}>
                        <Grid item padding={1} xs={12}>This is simple, alphabetical list of your equipped cyberware.</Grid>
                    </Grid>
                </>)
            case 'Vehicles':
                return (<>
                    <Grid container fontFamily={'serif'}>
                        <Grid item padding={1} xs={12}>This lists your vehicle's vital stats, as well as their equipped mods. Vehicular weapons are also listed.</Grid>
                    </Grid>
                </>)
            case 'Notes':
                return (<>
                    <Grid container fontFamily={'serif'}>
                        <Grid item padding={1} xs={12}>This area is for your personal notes. They can be added, edited, deleted, and favorited.</Grid>
                        <Grid item padding={1} xs={12}>Notes will appear in order created; favorited notes will be at the top.</Grid>
                    </Grid>
                </>)
            default:
                return 'default'
        }
    }

    return (
        <>
            <Typography variant='h5'>My     {prop}</Typography>
            <Button sx={{
                textTransform: 'none', color: 'white', '&:hover': {
                    // backgroundColor: '#fff',
                    color: 'lightgray',
                },
                padding: 0,
            }} onClick={handleClickOpen('paper')}>(?)</Button>
            <Dialog
                open={open}
                onClose={handleClose}
                scroll={scroll}
                maxWidth='lg'
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title">{prop}</DialogTitle>
                <DialogContent dividers={scroll === 'paper'}>
                    <Grid container fontFamily={'serif'}>
                        {dialogText(prop)}
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}