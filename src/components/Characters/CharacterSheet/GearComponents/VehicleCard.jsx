import React from 'react';
import { Grid } from '@mui/material';
import VehicleModDialog from '../../../Modals/VehicleModDialog';
import { inPlayVehicleStatusChange } from '../character.services';
import Item from '../Item';

export default function VehicleCard({ incomingVehicle, charVehicleMods, loading, setLoading, chuckError }) {
  const unhurtMarker = `\u2610`;
  const aggMarker = `\u2718`;
  const [vehicle, setVehicle] = React.useState(incomingVehicle);

  // takes in health (max), current damage, vehicle key, whether vehicle has armor, and whether the box in question is armor or health.
  const boxBuilder = (max, currentDamage, incomingKey, hasArmor, isArmor) => {
    let totalBoxes = hasArmor ? max : Math.floor(max / 2);
    let returnArr = [];

    for (let i = 0; i < totalBoxes; i++) {
      returnArr.push(
        <Grid key={i} item xs={1.2}>
          {/* due to some suboptimal design choices that need to be on the TODO the buttons simply won't 
          work while the damage handler function is waiting for a server response.*/}
          {i < currentDamage ? (
            <>{loading ? <Item>{aggMarker}</Item> : <Item onClick={(e) => handleDamage(e, incomingKey, isArmor, -1)}>{aggMarker}</Item>}</>
          ) : (
            <>{loading ? <Item>{unhurtMarker}</Item> : <Item onClick={(e) => handleDamage(e, incomingKey, isArmor, 1)}>{unhurtMarker}</Item>}</>
          )}
        </Grid>
      );
    }
    return returnArr;
  };

  // takes the vehicle key, whether the affected box is health or armor, and the change (+/- 1)
  const handleDamage = async (e, incomingKey, armor, change) => {
    setLoading(true);
    // for simplicity, both columns are updated even though only 1 gets changed at a time.
    const vehicleObj = {
      vehicle_bridge_id: incomingKey,
      current_damage: armor ? vehicle.current_damage : vehicle.current_damage + change,
      current_armor_damage: armor ? vehicle.current_armor_damage + change : vehicle.current_armor_damage,
    };
    let result = await inPlayVehicleStatusChange(vehicleObj);
    if (result === 'OK') {
      setVehicle({
        ...vehicle,
        current_damage: armor ? vehicle.current_damage : vehicle.current_damage + change,
        current_armor_damage: armor ? vehicle.current_armor_damage + change : vehicle.current_armor_damage,
      });
    } else {
      chuckError();
    }
    setLoading(false);
  };

  // This is all just fucking terrible.
  const VehicularAmmoBuilder = (mod) => {
    let bulletArray = [];
    let shotCaller = 0;
    let damageValue = 0;
    let xsNumber = 4;

    switch (mod.name) {
      case 'Onboard Flamethrower':
        shotCaller = 3;
        damageValue = 8;
        break;
      case 'Onboard Machine Gun':
        shotCaller = 3;
        damageValue = 7;
        break;
      case 'Rocket Pod':
        shotCaller = 3;
        damageValue = 24;
        break;
      case 'Heavy Weapon Mount':
        shotCaller = 10;
        damageValue = 16;
        xsNumber = 1.2;
        break;
    }
    for (let i = 0; i < shotCaller; i++) {
      bulletArray.push(
        <Grid item key={i} xs={xsNumber}>
          <Item onClick={(e) => handleVehicleWeaponShot(e)}>{unhurtMarker}</Item>
        </Grid>
      );
    }
    return (
      <>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={3}>
              <VehicleModDialog prop={mod.name} />
            </Grid>
            <Grid item xs={2}>
              DV: {damageValue}
            </Grid>
            <Grid item xs={2}>
              ROF: 1
            </Grid>
            <Grid item xs={1}>
              Ammo:
            </Grid>
            <Grid item xs={4}>
              <Grid container>{bulletArray}</Grid>
            </Grid>
          </Grid>
        </Grid>
      </>
    );
  };

  // This just changes the Page HTML, as vehicular weapons are used so rarely as to make tracking their ammo beyond that pointless.
  const handleVehicleWeaponShot = (e) => {
    if (e.target.innerText === unhurtMarker) {
      e.target.innerText = aggMarker;
    } else if (e.target.innerText === aggMarker) {
      e.target.innerText = unhurtMarker;
    }
  };

  return (
    <React.Fragment key={vehicle.vehicle_bridge_id}>
      <Grid item xs={12}>
        <b>{vehicle.name}</b>
      </Grid>
      <Grid item xs={4}>
        Move: {vehicle.move}
      </Grid>
      <Grid item xs={4}>
        Top Speed (mph): {vehicle.mph}
      </Grid>
      <Grid item xs={4}>
        Seats: {vehicle.seats + vehicle.extra_seats}
      </Grid>
      {charVehicleMods.filter((e) => e.vehicle_bridge_id === vehicle.vehicle_bridge_id).length > 0 ? (
        <Grid item xs={12} paddingBottom={1}>
          <Item>All Equipped Vehicle Mods:</Item>
        </Grid>
      ) : (
        <></>
      )}
      {charVehicleMods.map((mod) => {
        if (
          /* TODO Still dumb */
          (mod.name === 'Onboard Flamethrower' ||
            mod.name === 'Onboard Machine Gun' ||
            mod.name === 'Rocket Pod' ||
            mod.name === 'Heavy Weapon Mount') &&
          mod.vehicle_bridge_id === vehicle.vehicle_bridge_id
        ) {
          return <React.Fragment key={mod.char_vehicle_mod_bridge_id}>{VehicularAmmoBuilder(mod)}</React.Fragment>;
          /* also dumb */
        } else if (mod.name === 'Mounted Melee Weapon' && mod.vehicle_bridge_id === vehicle.vehicle_bridge_id) {
          return (
            <React.Fragment key={mod.char_vehicle_mod_bridge_id}>
              <Grid item xs={12}>
                <Grid container>
                  <Grid item xs={3}>
                    <VehicleModDialog prop={mod.name} />
                  </Grid>
                  <Grid item xs={2}>
                    DV: {vehicle.type === 'Bike' ? '8' : '11'}
                  </Grid>
                  <Grid item xs={2}>
                    ROF: 1
                  </Grid>
                </Grid>
              </Grid>
            </React.Fragment>
          );
        }
      })}

      <Grid container>
        {/* Hey you know what the below is. TODO because it is dumb. */}
        {charVehicleMods.map((mod) => {
          if (
            mod.vehicle_bridge_id === vehicle.vehicle_bridge_id &&
            mod.name != 'Onboard Flamethrower' &&
            mod.name != 'Onboard Machine Gun' &&
            mod.name != 'Rocket Pod' &&
            mod.name != 'Heavy Weapon Mount' &&
            mod.name != 'Mounted Melee Weapon'
          ) {
            return (
              <React.Fragment key={mod.char_vehicle_mod_bridge_id}>
                <Grid paddingLeft={1} item xs={12 / charVehicleMods.filter((e) => e.vehicle_bridge_id === vehicle.vehicle_bridge_id).length}>
                  <VehicleModDialog prop={mod.name} />
                </Grid>
              </React.Fragment>
            );
          }
        })}
      </Grid>

      <Grid item xs={6}>
        <Grid container>
          <Grid item xs={12}>
            <b>Health</b>
          </Grid>
          {boxBuilder(vehicle.health, vehicle.current_damage, vehicle.vehicle_bridge_id, true, false)}
        </Grid>
      </Grid>

      <Grid item xs={6}>
        <Grid container>
          <Grid item xs={12}>
            <b>Armor</b>
          </Grid>
          {boxBuilder(vehicle.health, vehicle.current_armor_damage, vehicle.vehicle_bridge_id, vehicle.has_armor, true)}
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
