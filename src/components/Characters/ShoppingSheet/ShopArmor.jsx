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

import ArmorOwnedTable from './ArmorOwnedTable';

export default function ShopArmor() {
    const dispatch = useDispatch()
    
    const charArmor = useSelector(store => store.advancementGear.armor)
    const boughtArmor = useSelector(store => store.advancementGear.boughtArmor)
    const armorID = useSelector(store => store.advancementGear.armorID)
    const armorMaster = useSelector(store => store.armorMaster)

    const charShield = useSelector(store => store.advancementGear.shield)
    const boughtShield = useSelector(store => store.advancementGear.boughtShield)
    const shieldID = useSelector(store => store.advancementGear.shieldID)
    const shieldMaster = useSelector(store => store.shieldMaster)
    
    const charDetail = useSelector((store) => store.advancementDetail)

    const sellOwnedArmor = (item) => {
        dispatch({ type: 'SELL_OWNED_ARMOR', payload: item })
    }

    const sellBoughtArmor = (item) => {
        dispatch({ type: 'SELL_ADVANCEMENT_ARMOR', payload: item})
    }

    const buyArmor = (item) => {
        if (charDetail.bank >= item.price) {
        dispatch({ type: 'BUY_ARMOR', payload: {item, armorID}})
        }
        else {
            alert('Transaction canceled due to lack of funds!')
        }
    }

    const sellOwnedShield = (item) => {
        dispatch({ type: 'SELL_OWNED_SHIELD', payload: item })
    }

    const sellBoughtShield = (item) => {
        dispatch({ type: 'SELL_ADVANCEMENT_SHIELD', payload: item})
    }

    const buyShield = (item) => {
        if (charDetail.bank >= item.price) {
        dispatch({ type: 'BUY_SHIELD', payload: {item, shieldID}})
        }
        else {
            alert('Transaction canceled due to lack of funds!')
        }
    }

    return (<>
        <h1>Shop Armor</h1>
        <h2>My Armor</h2>
<ArmorOwnedTable />

        {/* <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left">Name</TableCell>
                        <TableCell align="center">Quality</TableCell>
                        <TableCell align="center">Description</TableCell>
                        <TableCell align="center">Street Price</TableCell>
                        <TableCell align="center">Sell</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {charArmor.map(item => {
                        if (item.equipped === false) {
                        return (<React.Fragment key={item.armor_bridge_id}>
                            <TableRow>
                                <TableCell align="left">{item.name} </TableCell>
                                <TableCell align="center">{item.quality}</TableCell>
                                <TableCell width={600} align="center">{item.description}</TableCell>
                                <TableCell align="center">{Math.floor(item.price / 4)}</TableCell>
                                <TableCell align="center"><Button onClick={() => sellOwnedArmor(item)}>Sell</Button></TableCell>
                            </TableRow>
                        </React.Fragment>)
                    }})}
                    {boughtArmor.map((item, i) => {
                        return (<React.Fragment key={i}>
                            <TableRow>
                                <TableCell align="left">{item.name} </TableCell>
                                <TableCell align="center">{item.quality}</TableCell>
                                <TableCell width={600} align="center">{item.description}</TableCell>
                                <TableCell align="center">{Math.floor(item.price)}</TableCell>
                                <TableCell align="center"><Button onClick={() => sellBoughtArmor(item)}>Return</Button></TableCell>
                            </TableRow>
                        </React.Fragment>)
                    })}
                    {charShield.map(item => {
                        if (item.equipped === false) {
                        return (<React.Fragment key={item.shield_bridge_id}>
                            <TableRow>
                                <TableCell align="left">{item.name} </TableCell>
                                <TableCell align="center">{item.quality}</TableCell>
                                <TableCell width={600} align="center">{item.description}</TableCell>
                                <TableCell align="center">{Math.floor(item.price / 4)}</TableCell>
                                <TableCell align="center"><Button onClick={() => sellOwnedShield(item)}>Sell</Button></TableCell>
                            </TableRow>
                        </React.Fragment>)
                    }})}
                    {boughtShield.map((item, i) => {
                        return (<React.Fragment key={i}>
                            <TableRow>
                                <TableCell align="left">{item.name} </TableCell>
                                <TableCell align="center">{item.quality}</TableCell>
                                <TableCell width={600} align="center">{item.description}</TableCell>
                                <TableCell align="center">{Math.floor(item.price)}</TableCell>
                                <TableCell align="center"><Button onClick={() => sellBoughtShield(item)}>Return</Button></TableCell>
                            </TableRow>
                        </React.Fragment>)
                    })}
                </TableBody>
            </Table>
        </TableContainer>

        <h2>Buy Armor</h2>

        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left">Name</TableCell>
                        <TableCell align="center">Quality</TableCell>
                        <TableCell align="center">Description</TableCell>
                        <TableCell align="center">Cost</TableCell>
                        <TableCell align="center">Buy</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {armorMaster.map(item => {
                        return (<React.Fragment key={item.armor_master_id}>
                            <TableRow>
                                <TableCell align="left">{item.name} </TableCell>
                                <TableCell align="center">{item.quality}</TableCell>
                                <TableCell width={600} align="center">{item.description}</TableCell>
                                <TableCell align="center">{item.price}</TableCell>
                                <TableCell align="center"><Button onClick={() => buyArmor(item)}>Buy</Button></TableCell>
                            </TableRow>
                        </React.Fragment>)
                    })}
                    {shieldMaster.map(item => {
                        return (<React.Fragment key={item.shield_master_id}>
                            <TableRow>
                                <TableCell align="left">{item.name} </TableCell>
                                <TableCell align="center">{item.quality}</TableCell>
                                <TableCell width={600} align="center">{item.description}</TableCell>
                                <TableCell align="center">{item.price}</TableCell>
                                <TableCell align="center"><Button onClick={() => buyShield(item)}>Buy</Button></TableCell>
                            </TableRow>
                        </React.Fragment>)
                    })}
                </TableBody>
            </Table>
        </TableContainer> */}
    </>)
}