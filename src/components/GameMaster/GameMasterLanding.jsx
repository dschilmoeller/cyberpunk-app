import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button } from '@mui/material';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

export default function GameMasterLanding() {
    const dispatch = useDispatch();
    const history = useHistory()

    const characterList = useSelector((store) => store.characterList);

    useEffect(() => {
        dispatch({ type: "FETCH_GM_CHARACTERS" })
    }, [])

    const viewGameMasterSheet = (characterID) => {
        history.push(`/gamemastersheet/${characterID}`)
    }

    return (<>
        <h1>GM Page</h1>

        <h2>Select Character to Review</h2>
        {characterList.length ? (<>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Name</TableCell>
                            <TableCell align="left">Player</TableCell>
                            <TableCell align="left">Available XP</TableCell>
                            <TableCell align="left">Current Funds</TableCell>
                        </TableRow>
                    </TableHead>
                    {characterList.map(character => {
                        return (<>

                            <TableBody>
                                <TableRow>
                                    <TableCell align="left"><Button variant='contained' sx={{ m: 1 }} onClick={() => viewGameMasterSheet(character.id)}>{character.handle}</Button></TableCell>
                                    <TableCell align="left">{character.player}</TableCell>
                                    <TableCell align="left">{character.max_xp - character.spent_xp}</TableCell>
                                    <TableCell align="left">${character.bank.toLocaleString()}</TableCell>
                                </TableRow>
                            </TableBody>

                        </>)
                    })}
                </Table>
            </TableContainer>
        </>) : <></>}
    </>)
}