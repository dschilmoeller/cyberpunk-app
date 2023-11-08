import { useState, useEffect, Fragment } from 'react';
import Grid from '@mui/material/Grid';
import { useSelector, useDispatch } from 'react-redux';
import Item from './Item';
import { Button } from '@mui/material';

// list vehicles. Damage track. Mods -> Weapons.

export default function CharacterVehicles() {
    const charVehicles = useSelector((store) => store.characterGear.vehicles)
    const charVehicleMods = useSelector((store => store.characterModMaster.vehicleMods))
    const dispatch = useDispatch();

    const unhurtMarker = `\u2610`;
    const aggMarker = `\u2718`;

    const healthBuilder = (maxHealth, currentDamage, incomingKey) => {
        let healthArray = []
        for (let i = 0; i < currentDamage; i++) {
            healthArray.push(<Grid item key={i} xs={1.2}><Item onClick={(e) => handleHealthDamage(e, incomingKey)}>{aggMarker}</Item></Grid>)
        }
        for (let i = 0; i < (maxHealth - currentDamage); i++) {
            healthArray.push(<Grid item key={i + 100} xs={1.2}><Item onClick={(e) => handleHealthDamage(e, incomingKey)}>{unhurtMarker}</Item></Grid>)
        }
        return healthArray
    }

    const armorBuilder = (maxHealth, current_armor_damage, has_armor, incomingKey) => {
        let armorTotal = 0
        let armorArray = []
        if (has_armor === true) {
            armorTotal = maxHealth
        } else {
            armorTotal = Math.floor(maxHealth / 2)
        }


        for (let i = 0; i < current_armor_damage; i++) {
            armorArray.push(<Grid key={i} item xs={1.2}><Item onClick={(e) => handleArmorDamage(e, incomingKey)}>{aggMarker}</Item></Grid>)
        }
        for (let i = 0; i < (armorTotal - current_armor_damage); i++) {
            armorArray.push(<Grid key={i + 100} item xs={1.2}><Item onClick={(e) => handleArmorDamage(e, incomingKey)}>{unhurtMarker}</Item></Grid>)
        }
        return armorArray
    }

    const handleHealthDamage = (e, incomingKey) => {
        if (e.target.innerText === unhurtMarker) {
            dispatch({ type: "VEHICLE_ADD_ONE_DAMAGE", payload: incomingKey })
        } else if (e.target.innerText === aggMarker) {
            dispatch({ type: "VEHICLE_REMOVE_ONE_DAMAGE", payload: incomingKey })
        }
    }

    const handleArmorDamage = (e, incomingKey) => {
        if (e.target.innerText === unhurtMarker) {
            dispatch({ type: "VEHICLE_ADD_ONE_ARMOR_DAMAGE", payload: incomingKey })
        } else if (e.target.innerText === aggMarker) {
            dispatch({ type: "VEHICLE_REMOVE_ONE_ARMOR_DAMAGE", payload: incomingKey })
        }
    }

    const VehicularAmmoBuilder = (mod) => {
        let bulletArray = []
        let shotCaller = 0
        let damageValue = 0
        let xsNumber = 4

        switch (mod.name) {
            case 'Onboard Flamethrower':
                shotCaller = 3
                damageValue = 8
                break;
            case 'Onboard Machine Gun':
                shotCaller = 3
                damageValue = 7
                break;
            case 'Rocket Pod':
                shotCaller = 3
                damageValue = 24
                break;
            case 'Heavy Weapon Mount':
                shotCaller = 10
                damageValue = 16
                xsNumber = 1.2
                break;
        }
        for (let i = 0; i < shotCaller; i++) {
            bulletArray.push(<Grid item key={i} xs={xsNumber}><Item onClick={(e) => handleVehicleWeaponShot(e)}>{unhurtMarker}</Item></Grid>)
        }
        return (<>
            <Grid item xs={3}><Item>{mod.name}</Item></Grid>
            <Grid item xs={2}><Item>DV: {damageValue}</Item></Grid>
            <Grid item xs={2}><Item>ROF: 1</Item></Grid>
            <Grid item xs={1}><Item>Ammo:</Item></Grid>
            <Grid item xs={4}>
                <Grid container>
                    {bulletArray}
                </Grid>
            </Grid>
        </>)
    }

    const handleVehicleWeaponShot = (e) => {
        if (e.target.innerText === unhurtMarker) {
            e.target.innerText = aggMarker
        } else if (e.target.innerText === aggMarker) {
            e.target.innerText = unhurtMarker
        }
    }

    return (<>
        <Grid container spacing={1}>
            {charVehicles.map(item => {
                return (
                    <Fragment key={item.vehicle_bridge_id}>
                        <Grid item xs={3}><Item><b>{item.name}</b></Item></Grid>
                        <Grid item xs={3}><Item>Move: {item.move}</Item></Grid>
                        <Grid item xs={3}><Item>Top Speed (mph): {item.mph}</Item></Grid>
                        <Grid item xs={3}><Item>Seats: {item.seats + item.extra_seats}</Item></Grid>

                        {charVehicleMods.map(mod => {
                            if ((mod.name === 'Onboard Flamethrower' || mod.name === 'Onboard Machine Gun' || mod.name === 'Rocket Pod' || mod.name === 'Heavy Weapon Mount') && mod.vehicle_bridge_id === item.vehicle_bridge_id) {
                                return (
                                    <Fragment key={mod.char_vehicle_mod_bridge_id}>
                                        {VehicularAmmoBuilder(mod)}
                                    </Fragment>)
                            } else if (mod.name === 'Mounted Melee Weapon' && mod.vehicle_bridge_id === item.vehicle_bridge_id) {
                                return (
                                    <Fragment key={mod.char_vehicle_mod_bridge_id}>
                                        <Grid item xs={4}><Item>{mod.name}</Item></Grid>
                                        <Grid item xs={4}><Item>DV: {item.type === 'Bike' ? '8' : '11'}</Item></Grid>
                                        <Grid item xs={4}><Item>ROF: 1</Item></Grid>
                                    </Fragment>
                                )
                            }
                        })}
                        <Grid item xs={6}>
                            <Grid container>
                                <Grid item xs={12}><Item>Health</Item></Grid>
                                {healthBuilder(item.health, item.current_damage, item.vehicle_bridge_id)}
                            </Grid>
                        </Grid>

                        <Grid item xs={6}>
                            <Grid container>
                                <Grid item xs={12}><Item>Armor</Item></Grid>
                                {armorBuilder(item.health, item.current_armor_damage, item.has_armor, item.vehicle_bridge_id)}
                            </Grid>
                        </Grid>

                    </Fragment>
                )
            })}
        </Grid>
    </>
    )
}