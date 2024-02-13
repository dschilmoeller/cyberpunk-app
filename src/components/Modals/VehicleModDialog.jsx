import * as React from 'react';
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { Grid } from '@mui/material';

export default function VehicleModDialog({ prop }) {
    const modMaster = useSelector(store => store.gearMaster.vehicleMods)

    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');

    const handleClickOpen = (scrollType) => () => {
        setOpen(true);
        setScroll(scrollType);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const titleText = (prop) => {
        switch (prop) {
            default:
                return prop
        }
    }

    const DescriptionFinder = (prop) => {
        for (let i = 0; i < modMaster.length; i++) {
            if (modMaster[i].name === prop) {
                return (
                    <React.Fragment key={modMaster[i].mod_master_id}>
                        <Grid container fontFamily={'serif'}>
                            <Grid item padding={1} xs={12}>{modMaster[i].description}</Grid>
                        </Grid>
                    </React.Fragment>
                )
                break;
            }
        }
    }


    return (
        <>
            <Button sx={{
                lineHeight: 1,
                justifyContent: 'center',
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
                    {DescriptionFinder(prop)}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}