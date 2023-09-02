import * as React from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { TextField, Button } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { Grid } from '@mui/material';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';

function TransitionUp(props) {
    return <Slide {...props} direction="up" />;
}

export default function MakePharmaDialog() {
    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');

    const [showSnackbar, setShowSnackbar] = React.useState(false);
    const [alertText, setAlertText] = React.useState('');
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const euroBuck = `\u20AC$`

    const handleClickOpen = (scrollType) => () => {
        setOpen(true);
        setScroll(scrollType);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const dispatch = useDispatch()
    const charDetail = useSelector(store => store.characterDetail)
    const charMiscGear = useSelector(store => store.characterMiscGear)
    const miscGearList = useSelector(store => store.miscGearMaster)

    const [reagentCost, setReagentCost] = React.useState(200)
    const [quantityPharmaCreated, setQuantityPharmaCreated] = React.useState(0)

    const [numberAntibiotic, setNumberAntibiotic] = React.useState(0)
    const [numberRapiDetox, setNumberRapiDetox] = React.useState(0)
    const [numberSpeedheal, setNumberSpeedheal] = React.useState(0)
    const [numberStim, setNumberStim] = React.useState(0)
    const [numberSurge, setNumberSurge] = React.useState(0)


    // TODO: add to advancement sheet - See Other Gear - Add 'Create Drugs' button on full width right below selection. 
    // figure out why the commented out section is not working for doing a stupid count of existing pharmaceuticals. 
    // 

    // React.useEffect(() => {
    //     countPharma();
    // }, [charMiscGear])

    // console.log(`number Anti:`, numberAntibiotic);
    // console.log(`number rapid:`, numberRapiDetox);
    // console.log(`number speed`, numberSpeedheal);
    // console.log(`number stim`, numberStim);
    // console.log(`Number surge:`, numberSurge);

    // Not working at all as expected. Odd.
    // const countPharma = () => {
    //     charMiscGear.map(item => {
    //         switch (item.name) {
    //             case 'Antibiotic':
    //                 setNumberAntibiotic(numberAntibiotic + 1)
    //                 break;
    //             case 'Rapi-Detox':
    //                 setNumberRapiDetox(numberRapiDetox + 1)
    //                 break;
    //             case 'Speedheal':
    //                 setNumberSpeedheal(numberSpeedheal + 1)
    //                 break;
    //             case 'Stim':
    //                 setNumberStim(numberStim + 1)
    //                 break;
    //             case 'Surge':
    //                 setNumberSurge(numberSurge + 1)
    //                 break;
    //             default:
    //                 break;
    //         }
    //     })
    // }

    const makePharma = (pharmName) => {
        if (charDetail.bank > reagentCost && reagentCost > -1) {
            miscGearList.map(gear => {
                if (gear.name === pharmName) {
                    dispatch({ type: 'MAKE_PHARMACEUTICAL', payload: { characterID: charDetail.id, pharmaceutical: gear, newBank: Math.floor(charDetail.bank - reagentCost), doses: quantityPharmaCreated } })
                }
            })
        } else if (reagentCost < 0) {
            setAlertText('Nice try.')
            setShowSnackbar(true)
        } else if (charDetail.bank < reagentCost) {
            setAlertText('Not Enough Funds!')
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
            </Snackbar >

            <Button sx={{
                justifyContent: 'center',
                backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))',
                backgroundColor: '#1A2027',
                textTransform: 'none', color: 'white', '&:hover': {
                    backgroundColor: '#fff',
                    color: '#000',
                }
            }} fullWidth onClick={handleClickOpen('paper')}>Make Pharmaceuticals</Button>
            <Dialog
                open={open}
                onClose={handleClose}
                scroll={scroll}
                maxWidth='lg'
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title">The Lab</DialogTitle>
                <DialogContent dividers={scroll === 'paper'}>

                    <Grid container>
                        <Grid item xs={8}>
                            <Grid container>
                                <Grid item padding={1} xs={12}>
                                    Creating pharmaceuticals takes approximately 2 hours. It requires the use of the appropriate Tools, Workshop, or Lab. The character makes an Intelligence + Pharmaceuticals roll against a Difficulty Value (DV) of 6; they prepare a number of doses of a single compound equal to the number of successes rolled.
                                </Grid>
                                <Grid item xs={12} padding={1}>
                                    Applying a dose takes a normal action; if the target is unwilling the Medtech can attempt to forcibly apply the medicine with a melee attack roll. Characters who are <b>not</b> Medtechs cannot administer Pharmaceuticals correctly - they cannot evaluate the correct dosage. Side effects may vary wildly.
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={4}>
                            <Grid container>
                                <Grid item xs={12}
                                    display={'flex'}
                                    alignItems={'center'}
                                    justifyContent={'center'}
                                    padding={2}>
                                    <b>Current Bank: {euroBuck}{charDetail.bank}</b>
                                </Grid>
                                <Grid item xs={12}
                                    display={'flex'}
                                    alignItems={'center'}
                                    justifyContent={'center'}
                                    padding={2}>
                                    Reagent Cost:
                                    <TextField
                                        label="Reagents Cost"
                                        onChange={e => setReagentCost(e.target.value)}
                                        required
                                        type='number'
                                        value={reagentCost}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12}
                                    display={'flex'}
                                    alignItems={'center'}
                                    justifyContent={'center'}
                                    padding={2}>
                                    Doses Created
                                    <TextField
                                        label="Doses Created"
                                        onChange={e => setQuantityPharmaCreated(e.target.value)}
                                        required
                                        autoFocus
                                        type='number'
                                        value={quantityPharmaCreated}
                                        fullWidth
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item padding={.5} xs={12}>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                                <TableHead>
                                    <TableRow hover>
                                        <TableCell align="left">Pharmaceutical</TableCell>
                                        <TableCell align="left">Effect</TableCell>
                                        {/* <TableCell align="left">Qty Owned</TableCell> */}
                                        <TableCell align="left">Create?</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>

                                    <TableRow hover>
                                        <TableCell align="left">Antibiotic</TableCell>
                                        <TableCell align="left">Speeds up natural healing processes, allowing the recovery of one additional wound when the user rolls their body to recover. Multiple doses cannot stack, and it cannot be used with Speedheal. Each roll uses one dose of the compound.</TableCell>
                                        {/* <TableCell align="left">{numberAntibiotic}</TableCell> */}
                                        <TableCell align='left'><Button onClick={() => makePharma('Antibiotic', reagentCost)}>Create</Button></TableCell>
                                    </TableRow>

                                    <TableRow hover>
                                        <TableCell align="left">Rapi-Detox</TableCell>
                                        <TableCell align="left">When injected, a user affected by a drug, poison, or other intoxicant is immediately purged of the substance. Aggressively. From both ends.</TableCell>
                                        {/* <TableCell align="left">{numberRapiDetox}</TableCell> */}
                                        <TableCell align='left'><Button onClick={() => makePharma('Rapi-Detox', reagentCost)}>Create</Button></TableCell>
                                    </TableRow>

                                    <TableRow hover>
                                        <TableCell align="left">Speedheal</TableCell>
                                        <TableCell align="left">When injected, the user immediately rolls Body (DV 6) and recovers stun and lethal wounds as though they had rested for 1 day. The user immediately loses one temporary humanity point. Can be used on a target no more than once per day.</TableCell>
                                        {/* <TableCell align="left">{numberSpeedheal}</TableCell> */}
                                        <TableCell align='left'><Button onClick={() => makePharma('Speedheal', reagentCost)}>Create</Button></TableCell>
                                    </TableRow>

                                    <TableRow hover>
                                        <TableCell align="left">Stim</TableCell>
                                        <TableCell align="left">When administered, the user can ignore all wound penalties for 1 hour. Further, Stun Wounds cannot cause the user to fall unconscious.</TableCell>
                                        {/* <TableCell align="left">{numberStim}</TableCell> */}
                                        <TableCell align='left'><Button onClick={() => makePharma('Stim', reagentCost)}>Create</Button></TableCell>
                                    </TableRow>

                                    <TableRow hover>
                                        <TableCell align="left">Surge</TableCell>
                                        <TableCell align="left">A dose of surge allows the target to function without sleep for approximately 48 hours. They immediately lose 1 point of temporary humanity. Consecutive uses without a week or more of rest incur increasing humanity penalties.</TableCell>
                                        {/* <TableCell align="left">{numberSurge}</TableCell> */}
                                        <TableCell align='left'><Button onClick={() => makePharma('Surge', reagentCost)}>Create</Button></TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
