import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import { Button } from '@mui/material';

// Shows equipped clothing in the shopping page - mainly used for improving/pawning existing clothes.
export default function ClothingEquippedTable() {
    const dispatch = useDispatch()
    const charClothes = useSelector(store => store.advancementGear.clothes)
    const charDetail = useSelector(store => store.advancementDetail)

    const euroBuck = `\u20AC$`

    const improveEquippedClothing = (item) => {
        // check if character has money
        if (priceMaker(item.quality, item.rank + 1) <= charDetail.bank) {
            //   if item quality is street level, can't be improved
            if (item.quality === 0) {
                console.log(`cannot improve`);
            } else if (item.quality === 1 && item.rank < 5) {
                // if item is of low quality, can only be improved to 5
                dispatch({ type: "IMPROVE_CLOTHING", payload: item, bank: priceMaker(item.quality, item.rank + 1) });
                if (item.rank === 5) {
                    // upon improving to rank 5, increase character's cyber_appearance
                    dispatch({ type: "ATTRIBUTE_ENHANCING_CYBERWARE_EQUIPPED", payload: { type: 'cyber_appearance', quality: 1 } })
                }
            } else if (item.quality === 2 && item.rank < 8) {
                // if item is of mid quality, can be improved up to rank 8
                dispatch({ type: "IMPROVE_CLOTHING", payload: item, bank: priceMaker(item.quality, item.rank + 1) });
                if (item.rank === 5) {
                    // upon improving to rank 5, increase character's cyber_appearance
                    dispatch({ type: "ATTRIBUTE_ENHANCING_CYBERWARE_EQUIPPED", payload: { type: 'cyber_appearance', quality: 1 } })
                }
            } else if (item.quality === 3 && item.rank < 10) {
                // if item is of high quality, can be improved to 10
                dispatch({ type: "IMPROVE_CLOTHING", payload: item, bank: priceMaker(item.quality, item.rank + 1) });
                if (item.rank === 10) {
                    // upon improving to rank 10, increase char's cyber_cool and cyber_appearance
                    dispatch({ type: "ATTRIBUTE_ENHANCING_CYBERWARE_EQUIPPED", payload: { type: 'cyber_appearance', quality: 1 } })
                    dispatch({ type: "ATTRIBUTE_ENHANCING_CYBERWARE_EQUIPPED", payload: { type: 'cyber_cool', quality: 1 } })
                }
            } else {
                // toast if item is maxed out
                console.log(`Cannae improve.`);
            }
        } else {
            // toast if player lacks moolah.
            console.log(`No cashola`);
        }
    }

    const degradeEquippedClothing = (item) => {
        if (item.quality === 0) {
            console.log(`cannot degrade`);
        } else if (item.quality === 1 && item.rank > 1) {
            dispatch({ type: 'DEGRADE_CLOTHING', payload: item, bank: Math.floor(priceMaker(item.quality, item.rank - 1) / 4) })
            if (item.rank === 4) {
                dispatch({ type: "ATTRIBUTE_ENHANCING_CYBERWARE_EQUIPPED", payload: { type: 'cyber_appearance', quality: -1} })
            }
        } else if (item.quality === 2 && item.rank > 4) {
            dispatch({ type: 'DEGRADE_CLOTHING', payload: item, bank: Math.floor(priceMaker(item.quality, item.rank - 1) / 4)})
            if (item.rank === 4) {
                dispatch({ type: "ATTRIBUTE_ENHANCING_CYBERWARE_EQUIPPED", payload: { type: 'cyber_appearance', quality: -1 } })
            }
        } else if (item.quality === 3 && item.rank > 9) {
            dispatch({ type: 'DEGRADE_CLOTHING', payload: item, bank: (Math.floor(priceMaker(item.quality, item.rank - 1) / 4)) })
            if (item.rank === 9) {
                dispatch({ type: "ATTRIBUTE_ENHANCING_CYBERWARE_EQUIPPED", payload: { type: 'cyber_appearance', quality: -1 } })
                dispatch({ type: "ATTRIBUTE_ENHANCING_CYBERWARE_EQUIPPED", payload: { type: 'cyber_cool', quality: -1 } })
            }
        } else {
            console.log(`Cannae degrade - best sell it.`);
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
        <h2>My Clothes</h2>

        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={'small'}
                    >
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
                                                    <TableCell align="center"><Button variant='contained' color='success' onClick={() => improveEquippedClothing(row)}>It's important to accessorize - {euroBuck}{priceMaker(row.quality, row.rank + 1)}</Button></TableCell>
                                                    <TableCell align="center">Hope you can give this to someone in need.</TableCell>
                                                </>) : <></>}
                                            {row.quality === 1 && (row.rank > 1 && row.rank < 5) ? (
                                                <>
                                                    <TableCell align="center"><Button variant='contained' color='success' onClick={() => improveEquippedClothing(row)}>Time to look better - {euroBuck}{priceMaker(row.quality, row.rank + 1)}</Button></TableCell>
                                                    <TableCell align="center"><Button variant='contained' color='error' onClick={() => degradeEquippedClothing(row)}>Marie Kondo this look - {euroBuck}{Math.floor(priceMaker(row.quality, row.rank - 1) / 4)}</Button></TableCell>
                                                </>
                                            ) : <></>}
                                            {row.quality === 1 && row.rank > 4 ? (
                                                <>
                                                    <TableCell align="center">You need better threads, choom.</TableCell>
                                                    <TableCell align="center"><Button variant='contained' color='error' onClick={() => degradeEquippedClothing(row)}>Marie Kondo this look - {euroBuck}{Math.floor(priceMaker(row.quality, row.rank - 1) / 4)}</Button></TableCell>
                                                </>
                                            ) : <></>}
                                            {row.quality === 2 && row.rank === 4 ? (
                                                <>
                                                    <TableCell align="center"><Button variant='contained' color='success' onClick={() => improveEquippedClothing(row)}>Feeling cute, might buy another hat - {euroBuck}{priceMaker(row.quality, row.rank + 1)}</Button></TableCell>
                                                    <TableCell align="center">You could look a lot worse, frankly.</TableCell>
                                                </>
                                            ) : <></>}
                                            {row.quality === 2 && (row.rank > 4 && row.rank < 8) ? (
                                                <>
                                                    <TableCell align="center"><Button variant='contained' color='success' onClick={() => improveEquippedClothing(row)}>Does it come in green? - {euroBuck}{priceMaker(row.quality, row.rank + 1)}</Button></TableCell>
                                                    <TableCell align="center"><Button variant='contained' color='error' onClick={() => degradeEquippedClothing(row)}>I need to afford food again - {euroBuck}{Math.floor(priceMaker(row.quality, row.rank - 1) /4)}</Button></TableCell>
                                                </>
                                            ) : <></>}
                                            {row.quality === 2 && row.rank === 8 ? (
                                                <>
                                                    <TableCell align="center">I mean you look really great.</TableCell>
                                                    <TableCell align="center"><Button variant='contained' color='error' onClick={() => degradeEquippedClothing(row)}>Needs must - {euroBuck}{Math.floor(priceMaker(row.quality, row.rank - 1) /4)}</Button></TableCell>
                                                </>
                                            ) : <></>}
                                            {row.quality === 3 && row.rank === 9 ? (
                                                <>
                                                    <TableCell align="center"><Button variant='contained' color='success' onClick={() => improveEquippedClothing(row)}>There's literally one stitch out of place! - {euroBuck}{priceMaker(row.quality, row.rank + 1)}</Button></TableCell>
                                                    <TableCell align="center">Who buys used clothing like this?</TableCell>
                                                </>
                                            ) : <></>}
                                            {row.quality === 3 && row.rank === 10 ? (
                                                <>
                                                <TableCell align="center">Finaly. You made it work.</TableCell>
                                                    <TableCell align="center"><Button variant='contained' color='error' onClick={() => degradeEquippedClothing(row)}>I don't need this many diamonds - {euroBuck}{Math.floor(priceMaker(row.quality, row.rank - 1) / 4)}</Button></TableCell>
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
