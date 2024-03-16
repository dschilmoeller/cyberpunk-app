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
import Grid from '@mui/material/Grid';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';

function TransitionUp(props) {
    return <Slide {...props} direction="up" />;
}

export default function ShopCyberware() {
    const dispatch = useDispatch()
    const charCyberware = useSelector(store => store.advancementGear.cyberware)
    const cyberwareMaster = useSelector(store => store.gearMaster.cyberware)

    const charDetail = useSelector((store) => store.advancementDetail)
    const loadStatus = useSelector(store => store.loaders.advancementSheet);

    const euroBuck = `\u20AC$`

    const [showSnackbar, setShowSnackbar] = React.useState(false);
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const [selectedList, setSelectedList] = useState('fashionware')
    const handleTabChange = (event, newValue) => {
        setSelectedList(newValue)
    }

    const sellOwnedCyberware = (item) => {
        let newBank = Number(charDetail.bank + Math.floor(item.price / 4))
        dispatch({ type: 'SELL_ITEM', payload: { itemID: item.owned_cyberware_id, newBank, charID: charDetail.id, table: 'char_owned_cyberware', column: 'owned_cyberware_id' } })
    }

    const buyCyberware = (item) => {
        if (charDetail.bank >= item.price) {
            let newBank = charDetail.bank - item.price
            dispatch({ type: 'BUY_ITEM', payload: { itemMasterID: item.cyberware_master_id, newBank, charID: charDetail.id, table: 'char_owned_cyberware', column: 'cyberware_master_id' } })
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
        </Snackbar>

        <Tabs
            value={selectedList}
            onChange={handleTabChange}
            indicatorColor='primary'
            textColor='secondary'>
            <Tab value='fashionware' label='Fashionware' />
            <Tab value='neuralware' label='Neuralware' />
            <Tab value='cyberoptics' label='Cyberoptics' />
            <Tab value='cyberaudio' label='Cyberaudio' />
            <Tab value='internalware' label='Internalware' />
            <Tab value='externalware' label='Externalware' />
            <Tab value='cyberarm' label='Cyberarm' />
            <Tab value='cyberleg' label='Cyberleg' />
            <Tab value='borgware' label='Borgware (Beta)' />
        </Tabs>

        <h2>My Cyberware</h2>

        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow hover>
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
                                <TableRow hover>
                                    <TableCell align="left">{item.name} </TableCell>
                                    <TableCell align="center">{item.description}</TableCell>
                                    <TableCell align="center">{item.humanity_loss_min} - {item.humanity_loss_max}</TableCell>
                                    <TableCell align="center">{item.install_level}</TableCell>
                                    <TableCell align="center">{euroBuck}{Math.floor(item.price / 4).toLocaleString("en-US")}</TableCell>
                                    <TableCell align="center"><Button variant={loadStatus === false ? 'contained' : 'disabled'} color='error' onClick={() => sellOwnedCyberware(item)}>Sell</Button></TableCell>
                                </TableRow>
                            </React.Fragment>)
                        }
                    })}
                </TableBody>
            </Table>
        </TableContainer>

        <h2>Buy Cyberware</h2>

        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow hover>
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
                        if (item.is_treasure != true) {

                            return (
                                <React.Fragment key={item.cyberware_master_id}>
                                    {item.type === selectedList ? (
                                        <React.Fragment key={item.cyberware_master_id}>
                                            <TableRow hover>
                                                <TableCell align="left">{item.name} </TableCell>
                                                <TableCell align="center">{item.description}</TableCell>
                                                <TableCell align="center">{item.humanity_loss_min} - {item.humanity_loss_max}</TableCell>
                                                <TableCell align="center">{item.install_level}</TableCell>
                                                <TableCell align="center">{euroBuck}{Math.floor(item.price).toLocaleString("en-US")}</TableCell>
                                                <TableCell align="center"><Button variant={loadStatus === false ? 'contained' : 'disabled'} color='success' onClick={() => buyCyberware(item)}>Buy</Button></TableCell>
                                            </TableRow>
                                        </React.Fragment>
                                    ) : <></>}
                                </React.Fragment>)
                        }
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    </>)
}