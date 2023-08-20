import { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';


export default function AdvancementGearOther() {
    const gear = useSelector(store => store.advancementGear.gear)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: "FETCH_MISC_GEAR_LIST" })
    }, [])

    return (<>
        <h1>Other Gear</h1>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left">Name</TableCell>
                        <TableCell align="center">Description</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {gear.map((item, i) => {
                        return (
                            <TableRow key={i}>
                                <TableCell align="left">{item.name} </TableCell>
                                <TableCell align="center">{item.description}</TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    </>)
}