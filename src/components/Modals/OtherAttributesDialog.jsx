import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { Grid } from '@mui/material';

export default function OtherAttributesDialog({ prop }) {
    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');

    const handleClickOpen = (scrollType) => () => {
        setOpen(true);
        setScroll(scrollType);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const stunMarker = `\u2736`;
    const lethalMarker = `\uFE45`;
    const aggMarker = `\u2718`;

    const dialogText = (prop) => {
        switch (prop) {
            case 'Health':
                return (<>
                    <Grid item xs={12}>Character health is expressed in a number of boxes. Every character has a minimum of 10 health boxes. Health can be increased with different kinds of cyberware.</Grid>
                    <Grid item xs={12} paddingBottom={1}>Health is reduced by damage, also called 'wounds', which comes in three different types. Each type overwrites the previous - so a character with two stun wounds who receives a single lethal wound would now have a single lethal wound and a single stun wound. If they then take an aggravated wound, they would have a stun wound and an aggravated wound; the aggravated wound overwrites the lethal wound.</Grid>
                    
                    <Grid item xs={3}>Damage Type</Grid>
                    <Grid item xs={9} paddingBottom={1}>Description</Grid>

                    <Grid item xs={3}>Stun Damage: {stunMarker}</Grid>
                    <Grid item xs={9} paddingBottom={1}>Stun damage comes from clubs, fists, and other fairly superficial sources. Characters can recover from stun damage pretty quickly, recovering their Body stat in stun wounds each hour when resting.</Grid>

                    <Grid item xs={3}>Lethal Damage: {lethalMarker}</Grid>
                    <Grid item xs={9} paddingBottom={1}>Lethal damage is far more severe than stun, and comes from blades, bullets, and many other hazards frequently encountered by Edgerunners. Characters going about their business make a Body roll each week at difficulty 6 (This roll cannot be botched/glitched, but can result in 0 wounds being recovered); they recover a number of lethal wounds equal to the successes rolled. If a character is resting and receiving constant medical attention, this roll can be made once per day.</Grid>

                    <Grid item xs={3}>Aggravated Damage: {aggMarker}</Grid>
                    <Grid item xs={9} paddingBottom={1}>Aggravated damage is the most severe kind of damage a character can receive, and usually comes from fire, electricity, or other extreme sources of damage. Characters cannot recover Aggravated wounds without daily medical attention; if they are receiving this care they can make a body roll at difficulty 8 once per week and recover a number of aggravated wounds equal to the successes rolled.</Grid>

                    <Grid item xs={12}>Items that affect healing:</Grid>
                    <Grid item xs={12}>Speedheal: immediately roll Body vs. DV6 to recover stun or lethal wounds at a small humanity cost.</Grid>
                    <Grid item xs={12}>Cryopumps: While in a cryobag with a charged Cryopump, characters ignore 1s on Body rolls to recovering damage and do not make death saves.</Grid>
                    <Grid item xs={12} paddingBottom={1}>Cryotanks: while in a Cryotank, difficulties for Body rolls to recover damage are 2 lower and 1s are ignored.</Grid>

                    <Grid item xs={12} paddingBottom={1}>
                        <b>Consciousness and Dying:</b> Characters whose damage track is filled are either unconscious or dying. 
                    </Grid>
                    <Grid item xs={12} paddingBottom={1}>If the last wound in the track is a Stun wound, the character is merely unconscious. Generally, they cannot take further actions, and any actions they attempt are at a severe penalty. Any further stun wounds they suffer are now Lethal.</Grid>
                    
                    <Grid item xs={12} paddingBottom={1}>Characters whose last damage was lethal are <b>dying</b>. They must make a <b>Death Save</b> each round. This save has an initial difficulty value of 4, but it increases by 1 for each Aggravated wound the character has suffered, to a maximum of 8. Success means they live; failure means immediate death. They can be stabilized and no longer need to make Death Saves with a First Aid (DV8) or Paramedic (DV6) roll. Any further lethal wounds the character receives are instead Aggravated.</Grid>

                    <Grid item xs={12} paddingBottom={1}>Characters whose last wound is Aggravated require immediate and continuing medical attention to survive. They will require a First Aid (DV9) or Paramedic (DV7) Stabilization Roll; they will need to accrue at least 3 successes to stabilize the character. Any single damage source that fills a damage track with aggravated damage does no further harm; that is, a character with 2 remaining wounds who suffers 2 additional aggravated wounds is treated no differently from one who suffers 6 additional aggravated wounds. However, ANY further damage will instantly slay the character, regardless of its source or type.</Grid>

                </>)
        }
    }

    return (
        <div>
            <Button onClick={handleClickOpen('paper')}>{prop}</Button>
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
                    <DialogContentText
                        tabIndex={-1}
                    >
                        <Grid container fontFamily={'serif'}>
                            {dialogText(prop)}
                        </Grid>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}