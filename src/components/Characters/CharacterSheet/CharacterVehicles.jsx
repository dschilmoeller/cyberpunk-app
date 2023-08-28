import { useState, useEffect, Fragment } from 'react';
import Grid from '@mui/material/Grid';
import { useSelector, useDispatch } from 'react-redux';
import Item from './Item';
import { Button } from '@mui/material';

// list vehicles. Damage track. Mods -> Weapons.

export default function CharacterVehicles() {
    const charVehicles = useSelector((store) => store.characterVehicles)
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

    const armorBuilder = (maxHealth, current_armor_damage, vehicle_mod_1, vehicle_mod_2, vehicle_mod_3, vehicle_mod_4, vehicle_mod_5, incomingKey) => {
        let armorArray = []
        let armorTotal = 0

        if (vehicle_mod_1 === 2 ||
            vehicle_mod_2 === 2 ||
            vehicle_mod_3 === 2 ||
            vehicle_mod_4 === 2 ||
            vehicle_mod_5 === 2) {
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

    return (<>
        <Grid container spacing={1}>

            {charVehicles.map(item => {
                return (
                    <Fragment key={item.vehicle_bridge_id}>
                        <Grid item xs={3}><Item><b>{item.name}</b></Item></Grid>
                        <Grid item xs={3}><Item>Move: {item.move}</Item></Grid>
                        <Grid item xs={3}><Item>Top Speed (mph): {item.mph}</Item></Grid>
                        <Grid item xs={3}><Item>Seats: {item.seats}</Item></Grid>

                        <Grid item xs={6}>
                            <Grid container>
                                <Grid item xs={12}><Item>Health</Item></Grid>
                                {healthBuilder(item.health, item.current_damage, item.vehicle_bridge_id)}
                            </Grid>
                        </Grid>

                        <Grid item xs={6}>
                            <Grid container>
                                <Grid item xs={12}><Item>Armor</Item></Grid>
                                {armorBuilder(item.health, item.current_armor_damage, item.vehicle_mod_1, item.vehicle_mod_2, item.vehicle_mod_3, item.vehicle_mod_4, item.vehicle_mod_5, item.vehicle_bridge_id)}
                            </Grid>
                        </Grid>

                    </Fragment>
                )
            })}
        </Grid>
    </>
    )
}