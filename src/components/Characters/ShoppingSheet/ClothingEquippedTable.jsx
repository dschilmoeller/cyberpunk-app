import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Button } from '@mui/material';

// Shows equipped clothing in the shopping page - mainly used for improving/pawning existing clothes.
export default function ClothingEquippedTable() {
    const dispatch = useDispatch()
    const charClothes = useSelector(store => store.advancementGear.clothes)
    const charDetail = useSelector(store => store.advancementDetail)

    const euroBuck = `\u20AC$`

    const improveClothing = (item) => {
        if (priceMaker(item.quality, item.rank + 1) <= charDetail.bank) {
            let newBank = (charDetail.bank - priceMaker(item.quality, item.rank + 1))
            if (item.quality === 0) {
                console.log(`Cannot Improve This Look`);
            } else if (item.quality === 1 && item.rank < 5) {
                dispatch({ type: "ALTER_CLOTHING", payload: { item, newRank: item.rank + 1, newBank, charID: charDetail.id } })
                if (item.rank + 1 === 5) {
                    // rank 5 clothes improve appearance by 1
                    dispatch({ type: "ATTRIBUTE_ENHANCING_GEAR_EQUIPPED", payload: { type: 'cyber_appearance', change: 1, charID: charDetail.id } })
                }
            } else if (item.quality === 1 && item.rank === 5) {
                console.log(`Cannot improve`);

            } else if (item.quality === 2 && item.rank < 10) {
                dispatch({ type: "ALTER_CLOTHING", payload: { item, newRank: item.rank + 1, newBank, charID: charDetail.id } })
                if (item.rank + 1 === 5) {
                    // rank 5 clothes improve appearance by 1
                    dispatch({ type: "ATTRIBUTE_ENHANCING_GEAR_EQUIPPED", payload: { type: 'cyber_appearance', change: 1, charID: charDetail.id } })
                } else if (item.rank + 1 === 10) {
                    dispatch({ type: "ATTRIBUTE_ENHANCING_GEAR_EQUIPPED", payload: { type: 'cyber_appearance', change: 1, charID: charDetail.id } })
                    dispatch({ type: "ATTRIBUTE_ENHANCING_GEAR_EQUIPPED", payload: { type: 'cyber_cool', change: 1, charID: charDetail.id } })
                }
            } else {
                console.log(`Cannot improve`);
            }
        } else {
            console.log(`Insufficient Funds`);
        }
    }

    const degradeClothing = (item) => {
        let newBank = (charDetail.bank + (Math.floor(priceMaker(item.quality, item.rank - 1) / 4)))
        if (item.quality === 1 && item.rank > 1) {
            dispatch({ type: "ALTER_CLOTHING", payload: { item, newRank: item.rank - 1, newBank, charID: charDetail.id } })
            if (item.rank - 1 === 4) {
                dispatch({ type: "ATTRIBUTE_ENHANCING_GEAR_EQUIPPED", payload: { type: 'cyber_appearance', change: -1, charID: charDetail.id } })
            }
        } else if (item.quality === 2 && item.rank < 11) {
            dispatch({ type: "ALTER_CLOTHING", payload: { item, newRank: item.rank - 1, newBank, charID: charDetail.id } })
            if (item.rank - 1 === 4) {
                dispatch({ type: "ATTRIBUTE_ENHANCING_GEAR_EQUIPPED", payload: { type: 'cyber_appearance', change: -1, charID: charDetail.id } })
            } else if (item.rank - 1 === 9) {
                dispatch({ type: "ATTRIBUTE_ENHANCING_GEAR_EQUIPPED", payload: { type: 'cyber_appearance', change: -1, charID: charDetail.id } })
                dispatch({ type: "ATTRIBUTE_ENHANCING_GEAR_EQUIPPED", payload: { type: 'cyber_cool', change: -1, charID: charDetail.id } })
            }
        } else {
            console.log(`Cannot degrade.`);
        }
    }

    const priceMaker = (quality, rank) => {
        let price = 5;
        if (quality > 0) {
            price = 10 * (quality * quality) * (rank * rank);
        }
        return Number(price)
    }

    return (<>
        <h2>Worn Clothes</h2>

        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={'small'}
                    >
                        <TableHead>
                            <TableRow>
                                <TableCell align='center'>Name</TableCell>
                                <TableCell align='center'>Description</TableCell>
                                <TableCell align='center'>Rank</TableCell>
                                <TableCell align='center'>Accessorize</TableCell>
                                <TableCell align='center'>Pawn</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {charClothes.map((row) => {
                                let improvementWords;
                                if (row.quality === 0) {
                                    improvementWords = 'Outfit busted!'
                                }
                                if (row.equipped === true) {
                                    return (
                                        <TableRow hover key={row.clothing_bridge_id}>
                                            <TableCell align="center">{row.name}</TableCell>
                                            <TableCell align="center">{row.description}</TableCell>
                                            <TableCell align="center">{row.rank}</TableCell>
                                            {row.quality === 0 ? (<>
                                                <TableCell align="center">This outfit is busted.</TableCell>
                                                <TableCell align="center">Can you even sell this for money?</TableCell>
                                            </>) : <></>}
                                            {row.quality === 1 && row.rank === 1 ? (
                                                <>
                                                    <TableCell align="center"><Button variant='contained' color='success' onClick={() => improveClothing(row)}>It's important to accessorize - {euroBuck}{priceMaker(row.quality, row.rank + 1)}</Button></TableCell>
                                                    <TableCell align="center"><Button disabled variant='contained'>Hope you can give this to someone in need.</Button></TableCell>
                                                </>
                                            ) : <></>}

                                            {row.quality === 1 && row.rank > 1 && row.rank < 5 ? (
                                                <>
                                                    <TableCell align="center"><Button variant='contained' color='success' onClick={() => improveClothing(row)}>It's important to accessorize - {euroBuck}{priceMaker(row.quality, row.rank + 1)}</Button></TableCell>
                                                    <TableCell align="center"><Button variant='contained' color='error' onClick={() => degradeClothing(row)}>Marie Kondo this look - {euroBuck}{Math.floor(priceMaker(row.quality, row.rank - 1) / 4)}</Button></TableCell>
                                                </>
                                            ) : <></>}

                                            {row.quality === 1 && row.rank === 5 ? (
                                                <>
                                                    <TableCell align="center"><Button disabled variant='contained'>You need better threads, choom.</Button></TableCell>
                                                    <TableCell align="center"><Button variant='contained' color='error' onClick={() => degradeClothing(row)}>Marie Kondo this look - {euroBuck}{Math.floor(priceMaker(row.quality, row.rank - 1) / 4)}</Button></TableCell>
                                                </>
                                            ) : <></>}

                                            {row.quality === 2 && row.rank === 1 ? (
                                                <>
                                                    <TableCell align="center"><Button variant='contained' color='success' onClick={() => improveClothing(row)}>It's important to accessorize - {euroBuck}{priceMaker(row.quality, row.rank + 1)}</Button></TableCell>
                                                    <TableCell align="center"><Button disabled variant='contained'>Hope you can give this to someone in need.</Button></TableCell>
                                                </>
                                            ) : <></>}

                                            {row.quality === 2 && row.rank > 1 && row.rank < 10 ? (
                                                <>
                                                    <TableCell align="center"><Button variant='contained' color='success' onClick={() => improveClothing(row)}>Feeling cute, might buy another hat - {euroBuck}{priceMaker(row.quality, row.rank + 1)}</Button></TableCell>
                                                    <TableCell align="center"><Button variant='contained' color='error' onClick={() => degradeClothing(row)}>I need to afford food again - {euroBuck}{Math.floor(priceMaker(row.quality, row.rank - 1) / 4)}</Button></TableCell>
                                                </>
                                            ) : <></>}

                                            {row.quality === 2 && row.rank === 10 ? (
                                                <>
                                                    <TableCell align="center"><Button disabled variant='contained'>I mean you look really great.</Button></TableCell>
                                                    <TableCell align="center"><Button variant='contained' color='error' onClick={() => degradeClothing(row)}>Needs must - {euroBuck}{Math.floor(priceMaker(row.quality, row.rank - 1) / 4)}</Button></TableCell>
                                                </>
                                            ) : <></>}
                                        </TableRow>
                                    );
                                }
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Box>
    </>)
}
