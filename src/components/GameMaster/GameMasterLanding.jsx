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

    const euroBuck = `\u20AC$`

    useEffect(() => {
        dispatch({ type: "FETCH_GM_CHARACTERS" })
    }, [])

    const commaTizer = (incoming) => {
        if (incoming === undefined) {
            return 0
        } else {
            return incoming.toLocaleString()
        }
    }

    return (<>
        <h2>Select Character to Review</h2>
        {characterList.length ? (<>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow hover>
                            <TableCell align="center">Name</TableCell>
                            <TableCell align="center">Player</TableCell>
                            <TableCell align="center">Cool + Perception</TableCell>
                            <TableCell align="center">Reflexes</TableCell>
                            <TableCell align="center">Humanity Remaining</TableCell>
                            <TableCell align="center">Available XP</TableCell>
                            <TableCell align="center">Current Funds</TableCell>
                        </TableRow>
                    </TableHead>
                    {characterList.map(character => {
                        return (<React.Fragment key={character.id}>
                            <TableBody>
                                <TableRow hover>
                                    <TableCell align="center"><Button fullWidth variant='contained' sx={{ m: 1 }} onClick={() => history.push(`/gamemastersheet/${character.id}`)}>{character.handle}</Button></TableCell>
                                    <TableCell align="center">{character.player}</TableCell>
                                    <TableCell align="center">{character.cool + character.cyber_cool + character.perception}</TableCell>
                                    <TableCell align="center">{character.reflexes + character.cyber_reflexes}</TableCell>
                                    <TableCell align="center">{40 - (character.perm_humanity_loss + character.temp_humanity_loss)}</TableCell>
                                    <TableCell align="center">{character.max_xp - character.spent_xp}</TableCell>
                                    <TableCell align="center">{euroBuck}{commaTizer(character.bank)}</TableCell>
                                </TableRow>
                            </TableBody>
                        </React.Fragment>)
                    })}
                </Table>
            </TableContainer>
        </>) : <></>}
    </>)
}