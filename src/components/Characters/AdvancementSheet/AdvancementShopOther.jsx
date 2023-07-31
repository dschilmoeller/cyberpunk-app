import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Button } from '@mui/material';

export default function AdvancementShopOther() {
    const dispatch = useDispatch()
    const charMiscGear = useSelector(store => store.advancementGear.gear)
    const boughtMiscGear = useSelector(store => store.advancementGear.boughtMiscGear)
    const miscGearID = useSelector(store => store.advancementGear.miscGearID)
    const gearMaster = useSelector(store => store.miscGearMaster)

    const charDetail = useSelector((store) => store.advancementDetail)

    const sellOwnedGear = (item) => {
        dispatch({ type: 'SELL_OWNED_MISC_GEAR', payload: item })
    }

    const sellBoughtGear = (item) => {
        dispatch({ type: 'SELL_ADVANCEMENT_MISC_GEAR', payload: item})
    }

    const buyMiscGear = (item) => {
        if (charDetail.bank >= item.price) {
        dispatch({ type: 'BUY_MISC_GEAR', payload: {item, miscGearID: miscGearID}})
        }
        else {
            alert('Transaction canceled due to lack of funds!')
        }
    }

    return (<>
    <h1>Shop Gear</h1>
        <h2>My Gear</h2>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left">Name</TableCell>
                        <TableCell align="center">Description</TableCell>
                        <TableCell align="center">Street Price</TableCell>
                        <TableCell align="center">Sell</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {charMiscGear.map(item => {
                        return (<React.Fragment key={item.char_gear_bridge_id}>
                            <TableRow>
                                <TableCell align="left">{item.name} </TableCell>
                                <TableCell align="center">{item.description}</TableCell>
                                <TableCell align="center">{Math.floor(item.price / 4)}</TableCell>
                                <TableCell align="center"><Button onClick={() => sellOwnedGear(item)}>Sell</Button></TableCell>
                            </TableRow>
                        </React.Fragment>)
                    })}
                    {boughtMiscGear.map((item, i) => {
                        return (<React.Fragment key={i}>
                            <TableRow>
                                <TableCell align="left">{item.name} </TableCell>
                                <TableCell align="center">{item.description}</TableCell>
                                <TableCell align="center">{Math.floor(item.price)}</TableCell>
                                <TableCell align="center"><Button onClick={() => sellBoughtGear(item)}>Return</Button></TableCell>
                            </TableRow>
                        </React.Fragment>)
                    })}
                </TableBody>
            </Table>
        </TableContainer>

        <h2>Buy Gear</h2>

        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left">Name</TableCell>
                        <TableCell align="center">Description</TableCell>
                        <TableCell align="center">Cost</TableCell>
                        <TableCell align="center">Buy</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {gearMaster.map(item => {
                        return (<React.Fragment key={item.misc_gear_master_id}>
                            <TableRow>
                                <TableCell align="left">{item.name} </TableCell>
                                <TableCell width={600} align="center">{item.description}</TableCell>
                                <TableCell align="center">{item.price}</TableCell>
                                <TableCell align="center"><Button onClick={() => buyMiscGear(item)}>Buy</Button></TableCell>
                            </TableRow>
                        </React.Fragment>)
                    })}
                </TableBody>
            </Table>
        </TableContainer>
        </>)
}