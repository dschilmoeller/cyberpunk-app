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

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';

function TransitionUp(props) {
    return <Slide {...props} direction="up" />;
}

export default function ShopCyberware() {
    const dispatch = useDispatch()
    const charCyberware = useSelector(store => store.advancementGear.cyberware)
    const boughtCyberware = useSelector(store => store.advancementGear.boughtCyberware)
    const cyberwareID = useSelector(store => store.advancementGear.cyberwareID)
    const cyberwareMaster = useSelector(store => store.cyberwareMaster)

    const charDetail = useSelector((store) => store.advancementDetail)

    const [showSnackbar, setShowSnackbar] = React.useState(false);
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

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
            return;
        }
        else {
            setShowSnackbar(true)
            return;
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
                Transaction canceled due to lack of funds
            </Alert>
        </Snackbar >

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
                        if (item.equipped === false && item.type === selectedList) {
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