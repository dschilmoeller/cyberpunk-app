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

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

export default function GMGiveCyberware() {
    const dispatch = useDispatch()
    const cyberwareID = useSelector(store => store.advancementGear.cyberwareID)
    const cyberwareMaster = useSelector(store => store.cyberwareMaster)

    const charDetail = useSelector((store) => store.advancementDetail)

    const euroBuck = `\u20AC$`

    const [selectedList, setSelectedList] = useState('fashionware')
    const handleTabChange = (event, newValue) => {
        setSelectedList(newValue)
    }

    const buyCyberware = (item) => {
        dispatch({ type: 'GM_GIVE_CYBERWARE', payload: { item, cyberwareID: cyberwareID, price: 0 } })
    }

    return (<>

<h2>Give {charDetail.handle} Cyberware</h2>

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


        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left">Name</TableCell>
                        <TableCell align="center">Description</TableCell>
                        <TableCell align="center">Humanity Cost</TableCell>
                        <TableCell align="center">Install Requirement</TableCell>
                        <TableCell align="center">Price</TableCell>
                        <TableCell align="center">Give</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {cyberwareMaster.map(item => {
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
                                            <TableCell align="center"><Button onClick={() => buyCyberware(item)}>Give</Button></TableCell>
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