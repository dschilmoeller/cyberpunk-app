import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import { useHistory, useParams } from 'react-router-dom';

import Grid from '@mui/material/Grid';
import Item from '../CharacterSheet/Item';

import ShopArmor from './ShopArmor';
import ArmorOwnedTable from './ArmorOwnedTable';
import ArmorMasterTable from './ArmorMasterTable';
import WeaponsOwnedTable from './WeaponsOwnedTable';
import WeaponsMasterTable from './WeaponsMasterTable';
import ShopCyberware from './ShopCyberware';
import ShopOther from './ShopOther';

function ShoppingSheet() {
    const advancementDetails = useSelector((store) => store.advancementDetail);
    const equipmentDetails = useSelector(store => store.advancementGear)
    // console.log(`Characters:`, characterList);
    const [heading, setHeading] = useState('Character Sheet - Shopping');
    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();

    const [opener, setOpener] = useState('')

    useEffect(() => {
        dispatch({ type: "FETCH_ADVANCEMENT_DETAIL", payload: params.id })
        dispatch({ type: "FETCH_ARMOR_LIST" })
        dispatch({ type: "FETCH_SHIELD_LIST" })
        dispatch({ type: "FETCH_WEAPON_LIST" })
        dispatch({ type: "FETCH_MISC_GEAR_LIST" })
        dispatch({ type: "FETCH_CYBERWARE_LIST" })
    }, [])

    const fetchCharacterDetail = () => {
        dispatch({ type: "FETCH_ADVANCEMENT_DETAIL", payload: params.id })
        window.location.reload(true);
    }

    const saveCharacterChanges = () => {
        if (advancementDetails.perm_humanity_loss + advancementDetails.current_humanity_loss > 39) {
            alert('You cannot save! Your character will undergo immediate cyberpsychosis if you do have at least 1 humanity remaining!')
        } else {
            dispatch({ type: "SAVE_ADVANCEMENT_DETAIL", payload: { char: advancementDetails, gear: equipmentDetails } })
            history.push('/characterlist')
        }
    }

    return (
        <>
            <div>
                <h2>{heading}</h2>
                <Button onClick={() => history.push('/characterlist')}>Back to Character List</Button>
                <Button onClick={() => fetchCharacterDetail()}>Reset Character Information</Button>
                <Button onClick={() => saveCharacterChanges()}>Save Character Changes</Button>

                {advancementDetails ? (
                    <>
                        <Grid container>
                            <Grid item xs={4}>
                                <Item>Name: {advancementDetails.handle}</Item>
                            </Grid>
                            <Grid item xs={4}>
                                <Item>Role: {advancementDetails.role}</Item>
                            </Grid>
                            <Grid item xs={4}>
                                <Item>Player: {advancementDetails.player}</Item>
                            </Grid>
                            <Grid item xs={4}>
                                <Item>Campaign: {advancementDetails.campaign} </Item>
                            </Grid>
                            <Grid item xs={4}>
                                <Item>Culture: {advancementDetails.culture}</Item>
                            </Grid>
                            <Grid item xs={4}>
                                <Item>Concept: {advancementDetails.concept}</Item>
                            </Grid>
                        </Grid>

                        <Grid container>
                            <Grid item xs={12}><Item>Cash on Hand: ${advancementDetails.bank}</Item></Grid>
                        </Grid>
                    </>
                ) : <></>}

                <Item><h2>I want to shop for...</h2></Item>
                <Grid container>
                    <Grid item xs={3}><Item><Button onClick={() => setOpener('Shop Armor')}>Shop Armor</Button></Item></Grid>
                    <Grid item xs={3}><Item><Button onClick={() => setOpener('Shop Weapons')}>Shop Weapons</Button></Item></Grid>
                    <Grid item xs={3}><Item><Button onClick={() => setOpener('Shop Misc Gear')}>Shop Other Gear</Button></Item></Grid>
                    <Grid item xs={3}><Item><Button onClick={() => setOpener('Shop Cyberware')}>Shop Cyberware</Button></Item></Grid>
                </Grid>

                {opener === 'Shop Armor' ? (<>
                    <ArmorOwnedTable />
                    <ArmorMasterTable />
                </>) : <></>}

                {opener === 'Shop Weapons' ? (<>
                    <WeaponsOwnedTable />
        <WeaponsMasterTable />
                </>) : <></>}

                {opener === 'Shop Misc Gear' ? (<>
                    <ShopOther />
                </>) : <></>}

                {opener === 'Shop Cyberware' ? (<>
                    <ShopCyberware />
                </>) : <></>}

            </div>
        </>
    )
}

export default ShoppingSheet;
