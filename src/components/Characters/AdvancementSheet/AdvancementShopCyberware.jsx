import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Button } from '@mui/material';

export default function AdvancementShopCyberware() {
    const dispatch = useDispatch()
    const charCyberware = useSelector(store => store.advancementGear.cyberware)
    const boughtCyberware = useSelector(store => store.advancementGear.boughtCyberware)
    const cyberwareID = useSelector(store => store.advancementGear.cyberwareID)
    const cyberwareMaster = useSelector(store => store.cyberwareMaster)

    const charDetail = useSelector((store) => store.advancementDetail[0])

    const [selectedList, setSelectedList] = useState('fashionware')

    const sellOwnedCyberware = (item) => {
        dispatch({ type: 'SELL_OWNED_CYBERWARE', payload: item })
    }

    const sellBoughtCyberware = (item) => {
        dispatch({ type: 'SELL_ADVANCEMENT_CYBERWARE', payload: item })
    }

    const buyCyberware = (item) => {
        if (charDetail.bank >= item.price) {
            dispatch({ type: 'BUY_CYBERWARE', payload: { item, cyberwareID: cyberwareID } })
        }
        else {
            alert('Transaction canceled due to lack of funds!')
        }
    }

    return (<>
        <h1>Shop Cyberware</h1>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableBody>
                    <TableRow>
                        <TableCell align="center"><Button onClick={() => setSelectedList('cyberaudio')}>Cyberaudio</Button></TableCell>
                        <TableCell align="center"><Button onClick={() => setSelectedList('neuralware')}>Neuralware</Button></TableCell>
                        <TableCell align="center"><Button onClick={() => setSelectedList('cyberoptics')}>Cyberoptics</Button></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="center"><Button onClick={() => setSelectedList('fashionware')}>Fashionware</Button></TableCell>
                        <TableCell align="center"><Button onClick={() => setSelectedList('internalware')}>Internal Ware</Button></TableCell>
                        <TableCell align="center"><Button onClick={() => setSelectedList('externalware')}>External Ware</Button></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="center"><Button onClick={() => setSelectedList('cyberarm')}>Cyberarms</Button></TableCell>
                        <TableCell align="center"><Button onClick={() => setSelectedList('cyberleg')}>Cyberlegs</Button></TableCell>
                        <TableCell align="center"><Button onClick={() => setSelectedList('borgware')}>Borgware (BETA)</Button></TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>

        <h2>My Cyberware</h2>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left">Name</TableCell>
                        <TableCell align="center">Description</TableCell>
                        <TableCell align="center">Humanity Cost</TableCell>
                        <TableCell align="center">Install Requirement</TableCell>
                        <TableCell align="center">Street Price</TableCell>
                        <TableCell align="center">Sell</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {charCyberware.map(item => {
                        if (item.equipped === false) {
                            return (<React.Fragment key={item.owned_cyberware_id}>
                                <TableRow>
                                    <TableCell align="left">{item.name} </TableCell>
                                    <TableCell align="center">{item.description}</TableCell>
                                    <TableCell align="center">{item.humanity_loss_min} - {item.humanity_loss_max}</TableCell>
                                    <TableCell align="center">{item.install_level}</TableCell>
                                    <TableCell align="center">{Math.floor(item.price / 4)}</TableCell>
                                    <TableCell align="center"><Button onClick={() => sellOwnedCyberware(item)}>Sell</Button></TableCell>
                                </TableRow>
                            </React.Fragment>)
                        }
                    })}
                    {boughtCyberware.map((item, i) => {
                        return (<React.Fragment key={i}>
                            <TableRow>
                                <TableCell align="left">{item.name} </TableCell>
                                <TableCell align="center">{item.description}</TableCell>
                                <TableCell align="center">{item.humanity_loss_min} - {item.humanity_loss_max}</TableCell>
                                <TableCell align="center">{item.install_level}</TableCell>
                                <TableCell align="center">{Math.floor(item.price)}</TableCell>
                                <TableCell align="center"><Button onClick={() => sellBoughtCyberware(item)}>Return</Button></TableCell>
                            </TableRow>
                        </React.Fragment>)
                    })}
                </TableBody>
            </Table>
        </TableContainer>

        <h2>Buy Cyberware</h2>

        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left">Name</TableCell>
                        <TableCell align="center">Description</TableCell>
                        <TableCell align="center">Humanity Cost</TableCell>
                        <TableCell align="center">Install Requirement</TableCell>
                        <TableCell align="center">Price</TableCell>
                        <TableCell align="center">Buy</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {cyberwareMaster.map(item => {
                        return (
                            <React.Fragment key={item.cyberware_master_id}>
                                {item.type === selectedList ? (
                                    <React.Fragment key={item.cyberware_master_id}>
                                        <TableRow>
                                            <TableCell align="left">{item.name} </TableCell>
                                            <TableCell align="center">{item.description}</TableCell>
                                            <TableCell align="center">{item.humanity_loss_min} - {item.humanity_loss_max}</TableCell>
                                            <TableCell align="center">{item.install_level}</TableCell>
                                            <TableCell align="center">${Math.floor(item.price)}</TableCell>
                                            <TableCell align="center"><Button onClick={() => buyCyberware(item)}>Buy</Button></TableCell>
                                        </TableRow>
                                    </React.Fragment>
                                ) : <></>}
                            </React.Fragment>)
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    </>)
}