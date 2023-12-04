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
import { Grid } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Item from '../Characters/CharacterSheet/Item';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';

function TransitionUp(props) {
    return <Slide {...props} direction="up" />;
}

export default function CreationGear() {
    const dispatch = useDispatch();
    const charDetail = useSelector(store => store.characterCreation)
    const creationReviewReached = useSelector(store => store.characterCreation.creationReviewReached)

    const armor = useSelector(store => store.gearMaster.armor)
    const shield = useSelector(store => store.gearMaster.shields)
    const weapons = useSelector(store => store.gearMaster.weapons)
    const miscGear = useSelector(store => store.gearMaster.miscGear)
    const netrunnerGear = useSelector(store => store.gearMaster.netrunnerGear)

    // const lifestyle = useSelector(store => store.lifestyleMaster)

    const charArmor = useSelector(store => store.characterCreation.armor)
    const charShield = useSelector(store => store.characterCreation.shield)
    const charWeapons = useSelector(store => store.characterCreation.weapons)
    const charGear = useSelector(store => store.characterCreation.gear)
    const charNetrunnerGear = useSelector(store => store.characterCreation.netrunnerGear)

    // const charLifestyle = useSelector(store => store.characterCreation.lifestyle)

    const gearbucks = useSelector(store => store.characterCreation.gearbucks)

    const euroBuck = `\u20AC$`

    const [bank, setBank] = useState(gearbucks)

    const [showSnackbar, setShowSnackbar] = React.useState(false);
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    // value/handleChange are for tabs.
    const [value, setValue] = useState('Armor')
    const [netrunnerValue, setNetrunnerValue] = useState('deck')

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }
    const handleNetrunnerChange = (event, newValue) => {
        setNetrunnerValue(newValue);
    }

    const purchaseArmor = (price, index) => {
        if (bank >= price) {
            setBank(bank - price)
            dispatch({ type: "CREATION_BUY_ARMOR", payload: index, newBank: (bank - price) })
        } else {
            setShowSnackbar(true)
        }
    }

    const sellArmor = (price, index) => {
        setBank(bank + price)
        dispatch({ type: "CREATION_SELL_ARMOR", payload: index, newBank: (bank + price) })
    }

    const purchaseShield = (price, index) => {
        if (bank >= price) {
            setBank(bank - price)
            dispatch({ type: "CREATION_BUY_SHIELD", payload: index, newBank: (bank - price) })
        } else {
            setShowSnackbar(true)
        }
    }

    const sellShield = (price, index) => {
        setBank(bank + price)
        dispatch({ type: "CREATION_SELL_SHIELD", payload: index, newBank: (bank + price) })
    }

    const purchaseWeapon = (price, index) => {
        if (bank >= price) {
            setBank(bank - price)
            dispatch({ type: "CREATION_BUY_WEAPON", payload: index, newBank: (bank - price) })
        } else {
            setShowSnackbar(true)
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
            setShowSnackbar(true)
        }
    }

    const sellGear = (price, index) => {
        setBank(bank + price)
        dispatch({ type: "CREATION_SELL_GEAR", payload: index, newBank: (bank + price) })
    }

    const purchaseNetrunnerGear = (price, index) => {
        if (bank >= price) {
            setBank(bank - price)
            dispatch({ type: "CREATION_BUY_NETRUNNER_GEAR", payload: index, newBank: (bank - price) })
        } else {
            setShowSnackbar(true)
        }
    }

    const sellNetrunnerGear = (price, index) => {
        setBank(bank + price)
        dispatch({ type: "CREATION_SELL_NETRUNNER_GEAR", payload: index, newBank: (bank + price) })
    }

    const savePurchases = () => {
        if (creationReviewReached === false) {
            dispatch({ type: "SET_CREATION_STEP", payload: 'cyberware' })
        } else {
            dispatch({ type: 'SET_CREATION_STEP', payload: 'review' })
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
                Insufficient Funds!
            </Alert>
        </Snackbar >

        <Grid container display={'flex'} justifyContent={'center'} spacing={1}>
            <Grid item xs={12}><Item sx={{ height: 1 }}><Typography variant='h4'>Cash on Hand: {euroBuck}{bank} <Button fullWidth onClick={() => savePurchases()}>Save Purchases</Button></Typography></Item></Grid>
            <Grid item xs={12}><Item sx={{ height: 1 }}>Remember: You can't take it with you. You'll have a different pool of money for cyberware next!</Item></Grid>
        </Grid>

        <Grid container>
            <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor='secondary'
            >
                <Tab value='Armor' label='Armor' />
                <Tab value='Weapons' label='Weapons' />
                <Tab value='Misc' label='Misc Gear' />
                {charDetail.netrunner > 0 ? <Tab value='Netrunner' label='Netrunner Equipment' /> : <Tab value='Netrunner' label='Netrunner Equipment' disabled />}
            </Tabs>
        </Grid>


        {value === 'Armor' ? (<>

            <Grid container display={'flex'} justifyContent={'center'} spacing={1}>
                <Grid item xs={12}><Item>My Armor</Item></Grid>
                <Grid item xs={12}><Item>Note: Armor must be equipped from the advancement sheet.</Item></Grid>
            </Grid>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow hover>
                            <TableCell align="left">Name</TableCell>
                            <TableCell align="left">Quality</TableCell>
                            <TableCell align="left">Description</TableCell>
                            <TableCell align="left">Price</TableCell>
                            <TableCell align="left">Return?</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {charArmor.map((item, i) => (
                            <TableRow hover key={i}>
                                <TableCell align="left">{armor[item].name} </TableCell>
                                <TableCell align="left">{armor[item].quality}</TableCell>
                                <TableCell align="left">{armor[item].description}</TableCell>
                                <TableCell align="right">{euroBuck}{armor[item].price.toLocaleString("en-US")}</TableCell>
                                <TableCell align="left"><Button onClick={() => sellArmor(armor[item].price, i)}>Return</Button></TableCell>
                            </TableRow>
                        ))}
                        {charShield.map((item, i) => (
                            <TableRow hover key={i}>
                                <TableCell align="left">{shield[item].name} </TableCell>
                                <TableCell align="left">{shield[item].quality}</TableCell>
                                <TableCell align="left">{shield[item].description}</TableCell>
                                <TableCell align="right">{euroBuck}{shield[item].price.toLocaleString("en-US")}</TableCell>
                                <TableCell align="left"><Button onClick={() => sellShield(shield[item].price, i)}>Return</Button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <h3>Armor</h3>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow hover>
                            <TableCell>Name</TableCell>
                            <TableCell align="left">Quality</TableCell>
                            <TableCell align="left">Description</TableCell>
                            <TableCell align="left">Price</TableCell>
                            <TableCell align="left">Purchase?</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {armor.map((row, i) => {
                            if (row.price < 5000 && row.name != 'No Armor') {
                                return (
                                    <TableRow hover key={row.name}>
                                        <TableCell>{row.name} </TableCell>
                                        <TableCell align="left">{row.quality}</TableCell>
                                        <TableCell align="left">{row.description}</TableCell>
                                        <TableCell align="right">{euroBuck}{row.price.toLocaleString("en-US")}</TableCell>
                                        <TableCell align="left"><Button onClick={() => purchaseArmor(row.price, i)}>Purchase</Button></TableCell>
                                    </TableRow>
                                )
                            }
                        })}
                        {shield.map((row, i) => {
                            if (row.price < 5000 && row.name != 'No Shield') {
                                return (
                                    <TableRow hover key={row.name}>
                                        <TableCell>{row.name} </TableCell>
                                        <TableCell align="left">{row.quality}</TableCell>
                                        <TableCell align="left">{row.description}</TableCell>
                                        <TableCell align="right">{euroBuck}{row.price.toLocaleString("en-US")}</TableCell>
                                        <TableCell align="left"><Button onClick={() => purchaseShield(row.price, i)}>Purchase</Button></TableCell>
                                    </TableRow>
                                )
                            }
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </>) : <></>}

        {value === 'Weapons' ? (<>
            <Grid container display={'flex'} justifyContent={'center'} spacing={1}>
                <Grid item xs={12}><Item>My Weapons</Item></Grid>
                <Grid item xs={12}><Item>Note: Weapons are automatically equipped.</Item></Grid>
            </Grid>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow hover>
                            <TableCell align="left">Name</TableCell>
                            <TableCell align="center">Damage</TableCell>
                            <TableCell align="center">Range</TableCell>
                            <TableCell align="center">Rate of Fire</TableCell>
                            <TableCell align="center">Max Clip</TableCell>
                            <TableCell align="center"># of Hands</TableCell>
                            <TableCell align="center">Concealable?</TableCell>
                            <TableCell align="center">Price</TableCell>
                            <TableCell align="left">Return?</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {charWeapons.map((item, i) => (
                            <TableRow hover key={i}>
                                <TableCell align="left">{weapons[item].name}</TableCell>
                                <TableCell align="center">{weapons[item].dmg_type === 'melee' || weapons[item].dmg_type === 'bow' ? `Str + ${weapons[item].damage}` : `${weapons[item].damage}`}</TableCell>
                                <TableCell align="center">{weapons[item].dmg_type === 'bow' ? `Str * ${weapons[item].range}` : `${weapons[item].range}`}</TableCell>
                                <TableCell align="center">{weapons[item].rof}</TableCell>
                                <TableCell align="center">{weapons[item].max_clip}</TableCell>
                                <TableCell align="center">{weapons[item].hands}</TableCell>
                                <TableCell align="center">{weapons[item].concealable ? 'Yes' : 'No'}</TableCell>
                                <TableCell align="right">${weapons[item].price.toLocaleString("en-US")}</TableCell>
                                <TableCell align="left"><Button onClick={() => sellWeapon(weapons[item].price, i)}>Return</Button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <h3>Weapons</h3>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow hover>
                            <TableCell align="left">Name</TableCell>
                            <TableCell align="center">Damage</TableCell>
                            <TableCell align="center">Range</TableCell>
                            <TableCell align="center">Rate of Fire</TableCell>
                            <TableCell align="center">Max Clip</TableCell>
                            <TableCell align="center"># of Hands</TableCell>
                            <TableCell align="center">Concealable?</TableCell>
                            <TableCell align="center">Price</TableCell>
                            <TableCell align="left">Purchase?</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {weapons.map((row, i) => {
                            if (row.price < 5000 && row.is_treasure != true) {
                                return (
                                    <TableRow hover key={i}>
                                        <TableCell align="left">{row.name}</TableCell>
                                        <TableCell align="center">{row.dmg_type === 'melee' || row.dmg_type === 'bow' ? `Str + ${row.damage}` : `${row.damage}`}</TableCell>
                                        <TableCell align="center">{row.dmg_type === 'bow' ? `Str * ${row.range}` : `${row.range}`}</TableCell>
                                        <TableCell align="center">{row.rof}</TableCell>
                                        <TableCell align="center">{row.max_clip}</TableCell>
                                        <TableCell align="center">{row.hands}</TableCell>
                                        <TableCell align="center">{row.concealable ? 'Yes' : 'No'}</TableCell>
                                        <TableCell align="right">{euroBuck}{row.price.toLocaleString("en-US")}</TableCell>
                                        <TableCell align="left"><Button onClick={() => purchaseWeapon(row.price, i)}>Purchase</Button></TableCell>
                                    </TableRow>
                                )
                            }
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </>) : <></>}

        {value === 'Misc' ? (<>

            <Grid container display={'flex'} justifyContent={'center'} spacing={1}>
                <Grid item xs={12}><Item>My Misc Gear</Item></Grid>
            </Grid>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow hover>
                            <TableCell align="left">Name</TableCell>
                            <TableCell align="left">Description</TableCell>
                            <TableCell align="left">Price</TableCell>
                            <TableCell align="left">Return?</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {charGear.map((item, i) => (
                            <TableRow hover key={i}>
                                <TableCell align="left">{miscGear[item].name} </TableCell>
                                <TableCell align="left">{miscGear[item].description}</TableCell>
                                <TableCell align="right">{euroBuck}{miscGear[item].price.toLocaleString("en-US")}</TableCell>
                                <TableCell align="left"><Button onClick={() => sellGear(miscGear[item].price, i)}>Return</Button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <h3>Misc Gear</h3>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow hover>
                            <TableCell>Name</TableCell>
                            <TableCell align="left">Description</TableCell>
                            <TableCell align="left">Price</TableCell>
                            <TableCell align="left">Purchase?</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {miscGear.map((row, i) => (
                            <TableRow hover key={row.name}>
                                <TableCell>{row.name} </TableCell>
                                <TableCell align="left">{row.description}</TableCell>
                                <TableCell align="right">{euroBuck}{row.price.toLocaleString("en-US")}</TableCell>
                                <TableCell align="left"><Button onClick={() => purchaseGear(row.price, i)}>Purchase</Button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>) : <></>}

        {/* {selectedList === 'Lifestyle' ? (<>
            <h3>My Lifestyle:</h3>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow hover>
                            <TableCell align="left">Name</TableCell>
                            <TableCell align="left">Description</TableCell>
                            <TableCell align="left">Price</TableCell>
                            <TableCell align="left">Remove</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {charGear.map((item, i) => (
                            <TableRow hover key={i}>
                                <TableCell align="left">{miscGear[item].name} </TableCell>
                                <TableCell align="left">{miscGear[item].description}</TableCell>
                                <TableCell align="right">${miscGear[item].price.toLocaleString("en-US")}</TableCell>
                                <TableCell align="left"><Button onClick={() => sellGear(miscGear[item].price, i)}>Return</Button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <h1>Lifestyles</h1>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow hover>
                            <TableCell>Name</TableCell>
                            <TableCell align="left">Description</TableCell>
                            <TableCell align="left">Price</TableCell>
                            <TableCell align="left" width={'15%'}>Purchase (1 month)?</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {miscGear.map((row, i) => (
                            <TableRow hover key={row.name}>
                                <TableCell>{row.name} </TableCell>
                                <TableCell align="left">{row.description}</TableCell>
                                <TableCell align="right">${row.price.toLocaleString("en-US")}</TableCell>
                                <TableCell align="left"><Button onClick={() => purchaseGear(row.price, i)}>Purchase</Button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </>) : <></>} */}

        {value === 'Netrunner' ? (<>
            <Grid container padding={2}>
                <Grid item xs={12}><Tabs
                    value={netrunnerValue}
                    onChange={handleNetrunnerChange}
                    indicatorColor='primary'
                    textColor='secondary'>
                    <Tab value='deck' label='Decks' />
                    <Tab value='software' label='Software' />
                    <Tab value='mod' label='Deck Mods' />
                </Tabs>
                </Grid>
                <Grid item xs={12}>
                    <h3>My Netrunning Equipment:</h3>
                    <h4>Note: Equipment must be equipped from the advancement sheet.</h4>
                </Grid>
            </Grid>
            <Grid container padding={2}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow hover>
                                <TableCell align="left">Name</TableCell>
                                <TableCell align="left">Description</TableCell>
                                <TableCell align="center">Price</TableCell>
                                <TableCell align="center">Slots</TableCell>
                                <TableCell align="center">Remove</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {charNetrunnerGear.map((item, i) => {
                                return (
                                    <TableRow hover key={i}>
                                        <TableCell align="left">{netrunnerGear[item].name} </TableCell>
                                        <TableCell align="left">{netrunnerGear[item].description}</TableCell>
                                        <TableCell align="center">{euroBuck}{netrunnerGear[item].price.toLocaleString("en-US")}</TableCell>
                                        <TableCell align="center">{netrunnerGear[item].slots}</TableCell>
                                        <TableCell align="center"><Button onClick={() => sellNetrunnerGear(netrunnerGear[item].price, i)}>Return</Button></TableCell>
                                    </TableRow>
                                )
                            }) // end map
                            } {/* end conditional */}
                        </TableBody>
                    </Table>
                </TableContainer>

                <h3>Available Decks</h3>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow hover>
                                <TableCell>Name</TableCell>
                                <TableCell align="left">Description</TableCell>
                                <TableCell align="center">Price</TableCell>
                                {netrunnerValue === 'software' ? (
                                    <>
                                        <TableCell align='center'>Attack</TableCell>
                                        <TableCell align='center'>Defense</TableCell>
                                    </>
                                ) : <></>}
                                {netrunnerValue === 'deck' ? (
                                    <>
                                        <TableCell align='center'>Slots</TableCell>
                                    </>) : <></>}
                                {netrunnerValue === 'mod' ? (
                                    <>
                                        <TableCell align='center'>Slots</TableCell>
                                    </>) : <></>}
                                <TableCell align="center" width={'15%'}>Purchase?</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {netrunnerGear.map((row, i) => {
                                if (row.type === netrunnerValue && row.price < 2000) {
                                    return (
                                        <TableRow hover key={row.name}>
                                            <TableCell>{row.name} </TableCell>
                                            <TableCell align="left">{row.description}</TableCell>
                                            <TableCell align="center">{euroBuck}{row.price.toLocaleString("en-US")}</TableCell>
                                            {netrunnerValue === 'software' ? (
                                                <>
                                                    <TableCell align='center'>{row.attack}</TableCell>
                                                    <TableCell align='center'>{row.defense}</TableCell>
                                                </>
                                            ) : <></>}
                                            {netrunnerValue === 'deck' ? (
                                                <>
                                                    <TableCell align='center'>{row.slots}</TableCell>
                                                </>
                                            ) : <></>}
                                            {netrunnerValue === 'mod' ? (
                                                <>
                                                    <TableCell align='center'>{row.slots}</TableCell>
                                                </>
                                            ) : <></>}
                                            <TableCell align="center"><Button onClick={() => purchaseNetrunnerGear(row.price, i)}>Purchase</Button></TableCell>
                                        </TableRow>
                                    )
                                } // end if
                            }) // end map
                            } {/* end conditional */}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </>) : <></>}

    </>)
}