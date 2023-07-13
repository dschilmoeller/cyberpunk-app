// Gear purchased first with separate pool of money
// Currently to include armor [no mods], weapons [no mods], and misc. gear [make table]
// Need to figure out drop downs before mods will make sense. Also fancy ammo.
// Grenades table?
// Show character gear at top of page
// can show armor all in one.

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

export default function CreationGear() {
    const dispatch = useDispatch();

    const armor = useSelector(store => store.armorMaster)
    const weapons = useSelector(store => store.weaponMaster)
    const miscGear = useSelector(store => store.miscGearMaster)
    const charArmor = useSelector(store => store.characterCreation.armor)
    const charWeapons = useSelector(store => store.characterCreation.weapons)
    const charGear = useSelector(store => store.characterCreation.gear)
    const gearbucks = useSelector(store => store.characterCreation.gearbucks)

    const [selectedList, setSelectedList] = useState('Armor')
    const [bank, setBank] = useState(gearbucks)

    const armorRows = []
    const armorBuilder = () => {
        const createArmorData = (name, quality, description, price, armor_master_id) => {
            return { name, quality, description, price, armor_master_id };
        }
        for (let i = 0; i < armor.length; i++) {
            armorRows.push(createArmorData(armor[i].name, armor[i].quality, armor[i].description, armor[i].price, armor[i].armor_master_id))
        }
    }

    const weaponRows = []
    const weaponBuilder = () => {
        const createWeaponData = (name, damage, dmg_type, range, rof, max_clip, hands, concealable, price, weapon_master_id) => {
            return { name, damage, dmg_type, range, rof, max_clip, hands, concealable, price, weapon_master_id }
        }
        for (let i = 0; i < weapons.length; i++) {
            weaponRows.push(createWeaponData(weapons[i].name, weapons[i].damage, weapons[i].dmg_type, weapons[i].range,
                weapons[i].rof, weapons[i].max_clip, weapons[i].hands, weapons[i].concealable, weapons[i].price, weapons[i].weapon_master_id))
        }
    }

    armorBuilder();
    weaponBuilder();

    const purchaseArmor = (price, index) => {
        if (bank >= price) {
            setBank(bank - price)
            dispatch({ type: "CREATION_BUY_ARMOR", payload: index, newBank: (bank - price) })
        } else {
            alert("Insufficient funds")
        }
    }

    const sellArmor = (price, index) => {
        setBank(bank + price)
        dispatch({ type: "CREATION_SELL_ARMOR", payload: index, newBank: (bank + price) })
    }

    const purchaseWeapon = (price, index) => {
        if (bank >= price) {
            setBank(bank - price)
            dispatch({ type: "CREATION_BUY_WEAPON", payload: index, newBank: (bank - price) })
        } else {
            alert("Insufficient funds")
        }
    }

    const sellWeapon = (price, index) => {
        setBank(bank + price)
        dispatch({ type: "CREATION_SELL_WEAPON", payload: index, newBank: (bank + price) })
    }

    const purchaseGear = (price, index) => {
        if (bank >= price) {
            setBank(bank - price)
            dispatch({ type: "CREATION_BUY_GEAR", payload: index, newBank: (bank - price) })
        } else {
            alert("Insufficient funds")
        }
    }

    const sellGear = (price, index) => {
        setBank(bank + price)
        dispatch({ type: "CREATION_SELL_GEAR", payload: index, newBank: (bank + price) })
    }

    const savePurchases = () => {
        dispatch({ type: "SET_CREATION_STEP", payload: 'cyberware' })
    }

    return (<>
        <h2>Cash on Hand: ${bank} <Button onClick={() => savePurchases()}>Save Purchases</Button></h2>
        <h3>Remember: You can't take it with you. You'll have another pool of money for cyberware, also!</h3>


        <Button onClick={() => setSelectedList('Armor')}>Armor</Button>
        <Button onClick={() => setSelectedList('Weapons')}>Weapons</Button>
        <Button onClick={() => setSelectedList('Misc')}>Misc Gear</Button>

        {selectedList === 'Armor' ? (<>

            <h3>My armor:</h3>
            <h4>Note: armor must be equipped from the advancement sheet.</h4>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Return?</TableCell>
                            <TableCell align="left">Name</TableCell>
                            <TableCell align="left">Quality</TableCell>
                            <TableCell align="left">Description</TableCell>
                            <TableCell align="left">Price</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {charArmor.map((item, i) => (
                            <TableRow key={i}>
                                <TableCell align="left"><Button onClick={() => sellArmor(armor[item].price, i)}>Return</Button></TableCell>
                                <TableCell align="left">{armor[item].name} </TableCell>
                                <TableCell align="left">{armor[item].quality}</TableCell>
                                <TableCell align="left">{armor[item].description}</TableCell>
                                <TableCell align="right">{armor[item].price}$</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <h1>Armor</h1>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Purchase?</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell align="left">Quality</TableCell>
                            <TableCell align="left">Description</TableCell>
                            <TableCell align="left">Price</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {armorRows.map((row, i) => (
                            <TableRow key={row.name}>
                                <TableCell align="left"><Button onClick={() => purchaseArmor(row.price, i)}>Purchase</Button></TableCell>
                                <TableCell>{row.name} </TableCell>
                                <TableCell align="left">{row.quality}</TableCell>
                                <TableCell align="left">{row.description}</TableCell>
                                <TableCell align="right">{row.price}$</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>) : <></>}

        {selectedList === 'Weapons' ? (<>
            <h3>My Weapons:</h3>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Return?</TableCell>
                            <TableCell align="left">Name</TableCell>
                            <TableCell align="center">Damage</TableCell>
                            <TableCell align="center">Range</TableCell>
                            <TableCell align="center">Rate of Fire</TableCell>
                            <TableCell align="center">Max Clip</TableCell>
                            <TableCell align="center"># of Hands</TableCell>
                            <TableCell align="center">Concealable?</TableCell>
                            <TableCell align="center">Price</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {charWeapons.map((item, i) => (
                            <TableRow key={i}>
                                <TableCell align="left"><Button onClick={() => sellWeapon(weapons[item].price, i)}>Return</Button></TableCell>
                                <TableCell align="left">{weapons[item].name}</TableCell>
                                <TableCell align="center">{weapons[item].dmg_type === 'melee' || weapons[item].dmg_type === 'bow' ? `Str + ${weapons[item].damage}` : `${weapons[item].damage}`}</TableCell>
                                <TableCell align="center">{weapons[item].dmg_type === 'bow' ? `Str * ${weapons[item].range}` : `${weapons[item].range}`}</TableCell>
                                <TableCell align="center">{weapons[item].rof}</TableCell>
                                <TableCell align="center">{weapons[item].max_clip}</TableCell>
                                <TableCell align="center">{weapons[item].hands}</TableCell>
                                <TableCell align="center">{weapons[item].concealable ? 'Yes' : 'No'}</TableCell>
                                <TableCell align="right">{weapons[item].price}$</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <h1>Weapons</h1>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Purchase?</TableCell>
                            <TableCell align="left">Name</TableCell>
                            <TableCell align="center">Damage</TableCell>
                            <TableCell align="center">Range</TableCell>
                            <TableCell align="center">Rate of Fire</TableCell>
                            <TableCell align="center">Max Clip</TableCell>
                            <TableCell align="center"># of Hands</TableCell>
                            <TableCell align="center">Concealable?</TableCell>
                            <TableCell align="center">Price</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {weaponRows.map((row, i) => (
                            <TableRow key={i}>
                                <TableCell align="left"><Button onClick={() => purchaseWeapon(row.price, i)}>Purchase</Button></TableCell>
                                <TableCell align="left">{row.name}</TableCell>
                                <TableCell align="center">{row.dmg_type === 'melee' || row.dmg_type === 'bow' ? `Str + ${row.damage}` : `${row.damage}`}</TableCell>
                                <TableCell align="center">{row.dmg_type === 'bow' ? `Str * ${row.range}` : `${row.range}`}</TableCell>
                                <TableCell align="center">{row.rof}</TableCell>
                                <TableCell align="center">{row.max_clip}</TableCell>
                                <TableCell align="center">{row.hands}</TableCell>
                                <TableCell align="center">{row.concealable ? 'Yes' : 'No'}</TableCell>
                                <TableCell align="right">{row.price}$</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>) : <></>}

        {selectedList === 'Misc' ? (<>

            <h3>My Misc Gear:</h3>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Return?</TableCell>
                            <TableCell align="left">Name</TableCell>
                            <TableCell align="left">Description</TableCell>
                            <TableCell align="left">Price</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {charGear.map((item, i) => (
                            <TableRow key={i}>
                                <TableCell align="left"><Button onClick={() => sellGear(miscGear[item].price, i)}>Return</Button></TableCell>
                                <TableCell align="left">{miscGear[item].name} </TableCell>
                                <TableCell align="left">{miscGear[item].description}</TableCell>
                                <TableCell align="right">{miscGear[item].price}$</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <h1>Misc Gear</h1>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Purchase?</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell align="left">Description</TableCell>
                            <TableCell align="left">Price</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {miscGear.map((row, i) => (
                            <TableRow key={row.name}>
                                <TableCell align="left"><Button onClick={() => purchaseGear(row.price, i)}>Purchase</Button></TableCell>
                                <TableCell>{row.name} </TableCell>
                                <TableCell align="left">{row.description}</TableCell>
                                <TableCell align="right">{row.price}$</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>) : <></>}

    </>)
}