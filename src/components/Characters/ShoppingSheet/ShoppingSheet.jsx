import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import { useHistory, useParams } from 'react-router-dom';

import Grid from '@mui/material/Grid';
import Item from '../CharacterSheet/Item';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import ArmorOwnedTable from './ArmorOwnedTable';
import ArmorMasterTable from './ArmorMasterTable';
import WeaponsOwnedTable from './WeaponsOwnedTable';
import WeaponsMasterTable from './WeaponsMasterTable';
import GrenadeOwnedTable from './GrenadeOwnedTable';
import GrenadeMasterTable from './GrenadeMasterTable';
import OtherOwnedTable from './OtherOwnedTable';
import OtherMasterTable from './OtherMasterTable';
import NetrunnerOwnedTable from './NetrunnerOwnedTable';
import NetrunnerMasterTable from './NetrunnerMasterTable';
import VehicleMasterTable from './VehicleMasterTable';
import VehicleOwnedTable from './VehicleOwnedTable'
import ClothingMasterTable from './ClothingMasterTable';
import ClothingOwnedTable from './ClothingOwnedTable';
import ClothingEquippedTable from './ClothingEquippedTable';

import ShopCyberware from './ShopCyberware';

function ShoppingSheet() {
    const advancementDetails = useSelector((store) => store.advancementDetail);
    const equipmentDetails = useSelector(store => store.advancementGear)
    const modDetails = useSelector(store => store.characterModMaster)

    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();

    const euroBuck = `\u20AC$`

    useEffect(() => {
        dispatch({ type: "FETCH_ADVANCEMENT_DETAIL", payload: params.id })
        dispatch({ type: "FETCH_MASTER_LISTS" })
    }, [])

    useEffect(() => {
        window.addEventListener('beforeunload', alertUser)
        return () => {
            window.removeEventListener('beforeunload', alertUser)
        }
    })

    const alertUser = (event) => {
        event.preventDefault()
        event.returnValue = ''
    }
    
    const fetchCharacterDetail = () => {
        dispatch({ type: "FETCH_ADVANCEMENT_DETAIL", payload: params.id })
        window.location.reload(true);
    }

    const saveCharacterChanges = () => {
        dispatch({ type: "SAVE_ADVANCEMENT_DETAIL", payload: { char: advancementDetails, gear: equipmentDetails, mods: modDetails } })
        history.push('/characterlist')
    }

    const [selectedShopping, setSelectedShopping] = useState(false)
    const handleShoppingSelect = (event, newValue) => {
        setSelectedShopping(newValue)
    }

    return (
        <>
            <div>
                <Grid container>
                    <Grid item display={'flex'} justifyContent={'center'} xs={4}>
                        <Button onClick={() => history.push('/characterlist')}>Back to Character List</Button>
                    </Grid>
                    <Grid item display={'flex'} justifyContent={'center'} xs={4}>
                        <Button onClick={() => fetchCharacterDetail()}>Reset Character Information</Button>
                    </Grid>
                    <Grid item display={'flex'} justifyContent={'center'} xs={4}>
                        <Button onClick={() => saveCharacterChanges()}>Save Character Changes</Button>
                    </Grid>
                </Grid>

                {advancementDetails ? (
                    <>
                        <Grid container>
                            <Grid item xs={4}>
                                <Item>Name: {advancementDetails.handle}</Item>
                            </Grid>
                            <Grid item xs={4}>
                                <Item>Player: {advancementDetails.player}</Item>
                            </Grid>
                            <Grid item xs={4}>
                                <Item>Campaign: {advancementDetails.campaign_name} </Item>
                            </Grid>
                        </Grid>

                        <Grid container>
                            <Grid item xs={12}><Item><h2>Cash on Hand: {euroBuck}{advancementDetails.bank}</h2></Item></Grid>
                        </Grid>
                    </>
                ) : <></>}

                <Item>
                    <h2>I want to shop for...</h2>
                    <Tabs
                        value={selectedShopping}
                        onChange={handleShoppingSelect}
                        indicatorColor='primary'
                        textColor='secondary'>
                        <Tab value='armor' label='Armor' />
                        <Tab value='weapons' label='Weapons' />
                        <Tab value='grenades' label='Grenades' />
                        <Tab value='other' label='Other Gear' />
                        {advancementDetails.netrunner > 0 && <Tab value='netrunner' label='Netrunner' />}
                        <Tab value='cyberware' label='Cyberware' />
                        <Tab value='vehicles' label='Vehicles' />
                        <Tab value='clothes' label='Clothing' />
                    </Tabs>
                </Item>

                {selectedShopping === 'armor' ? (<>
                    <ArmorOwnedTable />
                    <ArmorMasterTable />
                </>) : <></>}

                {selectedShopping === 'weapons' ? (<>
                    <WeaponsOwnedTable />
                    <WeaponsMasterTable />
                </>) : <></>}

                {selectedShopping === 'grenades' ? (<>
                    <GrenadeOwnedTable />
                    <GrenadeMasterTable />
                </>) : <></>}

                {selectedShopping === 'other' ? (<>
                    <OtherOwnedTable />
                    <OtherMasterTable />
                </>) : <></>}

                {selectedShopping === 'netrunner' ? (<>
                    <NetrunnerOwnedTable />
                    <NetrunnerMasterTable />
                </>) : <></>}

                {selectedShopping === 'cyberware' ? (<>
                    <ShopCyberware />
                </>) : <></>}

                {selectedShopping === 'vehicles' ? (<>
                    <VehicleOwnedTable />
                    <VehicleMasterTable />
                </>) : <></>}

                {selectedShopping === 'clothes' ? (<>
                    <ClothingEquippedTable />
                    <ClothingOwnedTable />
                    <ClothingMasterTable />
                </>): <></>}

            </div>
        </>
    )
}

export default ShoppingSheet;
