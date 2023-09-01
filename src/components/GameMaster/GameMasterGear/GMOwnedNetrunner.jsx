import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Button } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import Grid from '@mui/material/Grid';
import Item from '../../Characters/CharacterSheet/Item';

export default function GMOwnedNetrunner() {

    const dispatch = useDispatch();
    
    const charDetail = useSelector(store => store.advancementDetail)
    const charNetrunnerGear = useSelector(store => store.advancementGear.netrunnerGear)

    const gmRemoveNetrunnerGear = (item) => {
        switch (item.type) {
            case 'deck':
                // removes deck, unequips all software and mods
                dispatch({ type: 'GM_REMOVE_NETRUNNER_DECK', payload: item })
                // zeroes out netrunner slots
                dispatch({ type: 'NETRUNNER_DECK_UNEQUIPPED' })
                break;
            case 'software':
            case 'mod':
                dispatch({ type: 'GM_REMOVE_NETRUNNER_GEAR', payload: item, slots: item.slots })
                break;
            default:
                break;
        }
    }

    return (<>
        <h2>{charDetail.handle}'s Netrunning Equipment</h2>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left">Name</TableCell>
                        <TableCell align="center">Description</TableCell>
                        <TableCell align="center">Equipped?</TableCell>
                        <TableCell align="center">Remove?</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {charNetrunnerGear.map((item, i) => {
                        return (
                            <TableRow key={i}>
                                <TableCell align="left">{item.name} </TableCell>
                                <TableCell align="center">{item.description}</TableCell>
                                <TableCell align="center">{item.equipped ? 'Yes' : 'No'}</TableCell>
                                <TableCell align="center"><Button onClick={() => gmRemoveNetrunnerGear(item)}>Remove</Button></TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>

        </TableContainer>

    </>)
}