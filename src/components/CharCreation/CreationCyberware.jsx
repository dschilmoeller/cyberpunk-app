import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import { useSelector, useDispatch } from 'react-redux';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { Button } from '@mui/material';

export default function CreationCyberware() {

    const dispatch = useDispatch();

    const cyberware = useSelector(store => store.cyberwareMaster)
    const charCyberware = useSelector(store => store.characterCreation.cyberware)
    const cyberbucks = useSelector(store => store.characterCreation.cyberbucks)
    const [selectedList, setSelectedList] = useState('fashionware')
    const [bank, setBank] = useState(cyberbucks)

    const cyberwareTableList = []
    const cyberwareTableBuilder = () => {
        const createCyberwareData = (cyberware_master_id, name, price, description, humanity_loss_min, humanity_loss_max, install_level, type) => {
            return { cyberware_master_id, name, price, description, humanity_loss_min, humanity_loss_max, install_level, type }
        }
        for (let i = 0; i < cyberware.length; i++) {
            cyberwareTableList.push(createCyberwareData(cyberware[i].cyberware_master_id, cyberware[i].name, cyberware[i].price, cyberware[i].description,
                cyberware[i].humanity_loss_min, cyberware[i].humanity_loss_max, cyberware[i].install_level, cyberware[i].type))
        }
    }

    cyberwareTableBuilder();

    const purchaseCyberware = (price, index) => {
        if (bank >= price) {
            setBank(bank - price)
            dispatch({ type: "CREATION_BUY_CYBERWARE", payload: index, newBank: (bank - price) })
        } else {
            alert("Insufficient funds")
        }
    }

    const sellCyberware = (price, index) => {
        setBank(bank + price)
        dispatch({ type: "CREATION_SELL_CYBERWARE", payload: index, newBank: (bank + price) })
    }

    const savePurchases = () => {
        dispatch({ type: "SET_CREATION_STEP", payload: 'review' })
    }

    return (<>
        <h1>Cyberware</h1>
        <h2>Cash on Hand: ${bank} <Button onClick={() => savePurchases()}>Save Purchases</Button></h2>
        <h3>Remember: You can't take it with you!</h3>
        <h3>Due to the vagaries of programming, cyberware must be manually equipped after character creation!</h3>
        <h3>See above: system does not currently check what you're buying against the number of slots available - you can buy more than you can use.</h3>

        <h1>Cyberware</h1>

        {charCyberware.length > 0 ? (
            <>
                <TableContainer component={Paper}>
                    <h3>My Cyberware</h3>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Return?</TableCell>
                                <TableCell align="left">Name</TableCell>
                                <TableCell align="left">Description</TableCell>
                                <TableCell align="left">Humanity Loss</TableCell>
                                <TableCell align="left">Install Requirement</TableCell>
                                <TableCell align="left">Price</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {charCyberware.map((item, i) => (
                                <TableRow key={i}>
                                    <TableCell align="left"><Button onClick={() => sellCyberware(cyberware[item].price, i)}>Return</Button></TableCell>
                                    <TableCell align="left">{cyberware[item].name} </TableCell>
                                    <TableCell align="left">{cyberware[item].description}</TableCell>
                                    <TableCell align="left">{Math.floor(cyberware[item].humanity_loss_max / 2)}</TableCell>
                                    <TableCell align="left">{cyberware[item].install_level}</TableCell>
                                    <TableCell align="right">{cyberware[item].price}$</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </>
        ) : <></>}

        <Button onClick={() => setSelectedList('fashionware')}>Fashionware</Button>
        <Button onClick={() => setSelectedList('neuralware')}>Neuralware</Button>
        <Button onClick={() => setSelectedList('cyberoptics')}>Cyberoptics</Button>
        <Button onClick={() => setSelectedList('cyberaudio')}>Cyberaudio</Button>
        <Button onClick={() => setSelectedList('internalware')}>Internal Ware</Button>
        <Button onClick={() => setSelectedList('externalware')}>External Ware</Button>
        <Button onClick={() => setSelectedList('cyberarm')}>Cyberarms</Button>
        <Button onClick={() => setSelectedList('cyberleg')}>Cyberlegs</Button>
        <Button onClick={() => setSelectedList('borgware')}>Borgware (BETA)</Button>

        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left">Purchase?</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell align="left">Description</TableCell>
                        <TableCell align="left">Humanity Loss</TableCell>
                        <TableCell align="left">Install Requirement</TableCell>
                        <TableCell align="left">Price</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {cyberwareTableList.map((row, i) => (
                        <React.Fragment key={i}>
                            {row.type === selectedList ? (
                                <TableRow key={i}>
                                    <TableCell align="left"><Button onClick={() => purchaseCyberware(row.price, i)}>Purchase</Button></TableCell>
                                    <TableCell>{row.name} </TableCell>
                                    <TableCell align="left">{row.description}</TableCell>
                                    <TableCell align="left">{row.humanity_loss_min} - {row.humanity_loss_max}</TableCell>
                                    <TableCell align="left">{row.install_level}</TableCell>
                                    <TableCell align="right">{row.price}$</TableCell>
                                </TableRow>
                            ) : <></>}</React.Fragment>)
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    </>)
}
