import { useState, useEffect, forwardRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Button } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import Grid from '@mui/material/Grid';
import Item from '../CharacterSheet/Item';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';

function TransitionUp(props) {
    return <Slide {...props} direction="up" />;
}


export default function AdvancementNetrunnerGear() {
    const charDetailCyberdeckSlots = useSelector(store => store.advancementDetail.cyberdeck_slots)
    const charNetrunnerGear = useSelector(store => store.advancementGear.netrunnerGear)
    const dispatch = useDispatch();

    const [netrunnerSlots, setNetrunnerSlots] = useState(0)

    useEffect(() => {
        setNetrunnerSlots(charDetailCyberdeckSlots)
    }, [charDetailCyberdeckSlots])

    const [value, setValue] = useState('deck')
    const handleChange = (event, newValue) => {
        setValue(newValue);
    }

    const [showSnackbar, setShowSnackbar] = useState(false);
    const Alert = forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });


    const equipNetrunnerGear = (item) => {
        switch (item.type) {
            case 'deck':
                dispatch({ type: 'EQUIP_NETRUNNER_DECK', payload: item });
                dispatch({ type: 'NETRUNNER_DECK_EQUIPPED', payload: item.slots });
                break;
            case 'software':
            case 'mod':
                if (netrunnerSlots > item.slots) {
                    dispatch({ type: 'EQUIP_NETRUNNER_GEAR', payload: item });
                } else {
                    setShowSnackbar(true)
                    break;
                }
            default:
                break;
        }
    }

    const unequipNetrunnerGear = (item) => {
        switch (item.type) {
            case 'deck':
                dispatch({ type: 'UNEQUIP_NETRUNNER_DECK', payload: item })
                dispatch({ type: 'NETRUNNER_DECK_UNEQUIPPED' })
                break;
            case 'software':
            case 'mod':
                dispatch({ type: 'UNEQUIP_NETRUNNER_GEAR', payload: item })
                break;
            default:
                break;
        }
    }

    return (<>

        <Snackbar
            TransitionComponent={TransitionUp}
            autoHideDuration={2000}
            open={showSnackbar}
            onClose={() => setShowSnackbar(false)}
            anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
        >
            <Alert onClose={() => setShowSnackbar(false)} severity="warning" sx={{ width: '100%' }}>
                Not enough slots - you'll need a different deck.
            </Alert>
        </Snackbar>

        <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor='primary'
            textColor='secondary'>
            <Tab value='deck' label='Decks' />
            <Tab value='software' label='Software' />
            <Tab value='mod' label='Deck Mods' />
        </Tabs>

        <Grid container>
            <Grid item xs={12}><Item>Available Slots: {netrunnerSlots}</Item></Grid>
        </Grid>


        <Item><h1>Equipped</h1></Item>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow hover>
                        <TableCell align="left">Name</TableCell>
                        <TableCell align="center">Description</TableCell>
                        <TableCell align="center">Unequip?</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {charNetrunnerGear.map((item, i) => {
                        if (item.equipped === true) {
                            return (
                                <TableRow hover key={i}>
                                    <TableCell align="left">{item.name} </TableCell>
                                    <TableCell align="center">{item.description}</TableCell>
                                    <TableCell align="center"><Button onClick={() => unequipNetrunnerGear(item)}>Unequip</Button></TableCell>
                                </TableRow>
                            )
                        }
                    })}
                </TableBody>
            </Table>
        </TableContainer>

        <Item><h1>Available</h1></Item>
        {value === 'deck' ? (<>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow hover>
                            <TableCell align="left">Name</TableCell>
                            <TableCell align="center">Description</TableCell>
                            <TableCell align="center">Slots</TableCell>
                            <TableCell align="center">Equip?</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {charNetrunnerGear.map((item, i) => {
                            if (item.type === 'deck' && item.equipped === false) {
                                return (
                                    <TableRow hover key={i}>
                                        <TableCell align="left">{item.name} </TableCell>
                                        <TableCell align="center">{item.description}</TableCell>
                                        <TableCell align="center">{item.slots}</TableCell>
                                        <TableCell align="center" onClick={() => equipNetrunnerGear(item)}><Button>Equip</Button></TableCell>
                                    </TableRow>
                                )
                            }
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </>) : <></>}

        {value === 'software' ? (<>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow hover>
                            <TableCell align="left">Name</TableCell>
                            <TableCell align="center">Description</TableCell>
                            <TableCell align="center">Attack</TableCell>
                            <TableCell align="center">Defense</TableCell>
                            <TableCell align="center">Equip?</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {charNetrunnerGear.map((item, i) => {
                            if (item.type === 'software' && item.equipped === false) {
                                return (
                                    <TableRow hover key={i}>
                                        <TableCell align="left">{item.name} </TableCell>
                                        <TableCell align="center">{item.description}</TableCell>
                                        <TableCell align="center">{item.attack}</TableCell>
                                        <TableCell align="center">{item.defense}</TableCell>
                                        <TableCell align="center"><Button onClick={() => equipNetrunnerGear(item)}>Equip</Button></TableCell>
                                    </TableRow>
                                )
                            }
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </>) : <></>}

        {value === 'mod' ? (<>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow hover>
                            <TableCell align="left">Name</TableCell>
                            <TableCell align="center">Description</TableCell>
                            <TableCell align="center">Slots</TableCell>
                            <TableCell align="center">Equip?</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {charNetrunnerGear.map((item, i) => {
                            if (item.type === 'mod' && item.equipped === false) {
                                return (
                                    <TableRow hover key={i}>
                                        <TableCell align="left">{item.name} </TableCell>
                                        <TableCell align="center">{item.description}</TableCell>
                                        <TableCell align="center">{item.slots}</TableCell>
                                        <TableCell align="center"><Button onClick={() => equipNetrunnerGear(item)}>Equip</Button></TableCell>
                                    </TableRow>
                                )
                            }
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </>) : <></>}

    </>)
}