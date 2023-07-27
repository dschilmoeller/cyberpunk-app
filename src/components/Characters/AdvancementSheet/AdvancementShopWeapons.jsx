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

export default function AdvancementShopWeapons() {
    const dispatch = useDispatch()
    const charWeapons = useSelector(store => store.advancementGear.weapons)
    const boughtWeapons = useSelector(store => store.advancementGear.boughtWeapons)
    const weaponID = useSelector(store => store.advancementGear.weaponID)
    const weaponMaster = useSelector(store => store.weaponMaster)

    const charDetail = useSelector((store) => store.advancementDetail[0])

    const sellOwnedWeapon = (item) => {
        dispatch({ type: 'SELL_OWNED_WEAPON', payload: item })
    }

    const sellBoughtWeapon = (item) => {
        dispatch({ type: 'SELL_ADVANCEMENT_WEAPON', payload: item })
    }

    const buyWeapon = (item) => {
        if (charDetail.bank >= item.price) {
            dispatch({ type: 'BUY_WEAPON', payload: { item, weaponID } })
        }
        else {
            alert('Transaction canceled due to lack of funds!')
        }
    }

    return (<>
        <h1>Shop Weapons</h1>
        <h2>My Weapons</h2>

        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left">Name</TableCell>
                        <TableCell align="center">Damage</TableCell>
                        <TableCell align="center">Range</TableCell>
                        <TableCell align="center">Rate of Fire</TableCell>
                        <TableCell align="center">Max Clip</TableCell>
                        <TableCell align="center"># of Hands</TableCell>
                        <TableCell align="center">Concealable?</TableCell>
                        <TableCell align="center">Street Price</TableCell>
                        <TableCell align="center">Sell</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {charWeapons.map(item => {
                        if (item.equipped === false) {
                            return (<React.Fragment key={item.weapon_bridge_id}>
                                <TableRow>
                                    <TableCell align="left">{item.name} </TableCell>
                                    <TableCell align="center">{item.damage}</TableCell>
                                    <TableCell align="center">{item.range}</TableCell>
                                    <TableCell align="center">{item.rof}</TableCell>
                                    <TableCell align="center">{item.max_clip}</TableCell>
                                    <TableCell align="center">{item.hands}</TableCell>
                                    <TableCell align="center">{item.concealable ? 'Yes' : 'No'}</TableCell>
                                    <TableCell align="center">{Math.floor(item.price / 4)}</TableCell>
                                    <TableCell align="center"><Button onClick={() => sellOwnedWeapon(item)}>Sell</Button></TableCell>
                                </TableRow>
                            </React.Fragment>)
                        }
                    })}
                    {boughtWeapons.map((item, i) => {
                        return (<React.Fragment key={i}>
                            <TableRow>
                                <TableCell align="left">{item.name} </TableCell>
                                <TableCell align="center">{item.damage}</TableCell>
                                <TableCell align="center">{item.range}</TableCell>
                                <TableCell align="center">{item.rof}</TableCell>
                                <TableCell align="center">{item.max_clip}</TableCell>
                                <TableCell align="center">{item.hands}</TableCell>
                                <TableCell align="center">{item.concealable ? 'Yes' : 'No'}</TableCell>
                                <TableCell align="center">{Math.floor(item.price / 4)}</TableCell>
                                <TableCell align="center"><Button onClick={() => sellBoughtWeapon(item)}>Sell</Button></TableCell>
                            </TableRow>
                        </React.Fragment>)
                    })}
                </TableBody>
            </Table>
        </TableContainer>

        <h2>Buy Weapon</h2>

        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left">Name</TableCell>
                        <TableCell align="center">Damage</TableCell>
                        <TableCell align="center">Range</TableCell>
                        <TableCell align="center">Rate of Fire</TableCell>
                        <TableCell align="center">Max Clip</TableCell>
                        <TableCell align="center"># of Hands</TableCell>
                        <TableCell align="center">Concealable?</TableCell>
                        <TableCell align="center">Price</TableCell>
                        <TableCell align="center">Buy</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {weaponMaster.map(item => {
                        return (<React.Fragment key={item.weapon_master_id}>
                            <TableRow>
                                <TableCell align="left">{item.name} </TableCell>
                                <TableCell align="center">{item.dmg_type === 'melee' || item.dmg_type === 'bow' ? `Str + ${item.damage}` : `${item.damage}`}</TableCell>
                                <TableCell align="center">{item.dmg_type === 'bow' ? `Str * ${item.range}` : `${item.range}`}</TableCell>
                                <TableCell align="center">{item.rof}</TableCell>
                                <TableCell align="center">{item.max_clip}</TableCell>
                                <TableCell align="center">{item.hands}</TableCell>
                                <TableCell align="center">{item.concealable ? 'Yes' : 'No'}</TableCell>
                                <TableCell align="center">{item.price}</TableCell>
                                <TableCell align="center"><Button onClick={() => buyWeapon(item)}>Buy</Button></TableCell>
                            </TableRow>
                        </React.Fragment>)
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    </>)
}