import { useState, useEffect, Fragment } from 'react';
import Grid from '@mui/material/Grid';
import { useSelector, useDispatch } from 'react-redux';
import Item from './Item';
import { Button } from '@mui/material';

export default function CharacterNetrunner() {
  const charNetrunnerGear = useSelector(
    (store) => store.characterGear.netrunnerGear
  );
  const charDetail = useSelector((store) => store.characterDetail);

  const unhurtMarker = `\u2610`;
  const aggMarker = `\u2718`;

  const dispatch = useDispatch();

  // determines how many software items can be activated based on deck quality. Should run once. Netrunner gear should be loaded in reducer on char page load before this fires.
  const [activationsPerAction, setActivationsPerAction] = useState(0);
  const activationBuilder = () => {
    for (let i = 0; i < charNetrunnerGear.length; i++) {
      if (
        charNetrunnerGear[i].type === 'deck' &&
        charNetrunnerGear[i].equipped === true
      ) {
        setActivationsPerAction(Math.floor(charNetrunnerGear[i].slots / 3));
      }
    }
  };

  // sets up reducer for in play activity.
  const netrunnerGearPrep = () => {
    dispatch({ type: 'PREP_CHARACTER_NETRUNNER_GEAR' });
  };

  // runs above two calculations. Should occur once, when page is loaded.
  useEffect(() => {
    activationBuilder();
    netrunnerGearPrep();
  }, []);

  // Determine net actions for display, based on role level.
  const netrunnerActionsCalc = () => {
    if (charDetail.netrunner > 0 && charDetail.netrunner < 4) {
      return 2;
    } else if (charDetail.netrunner > 3 && charDetail.netrunner < 7) {
      return 3;
    } else if (charDetail.netrunner > 6 && charDetail.netrunner < 10) {
      return 4;
    } else if (charDetail.netrunner === 10) {
      return 5;
    }
  };

  // creates health boxes for each piece of software.
  const rezBoxBuilder = (rez, current_rez_damage, netrunner_bridge_id) => {
    let rezArray = [];
    for (let i = 0; i < rez; i++) {
      if (i + 1 > current_rez_damage) {
        rezArray.push(
          <Grid
            key={i}
            item
            xs={2}
            onClick={(e) =>
              rezBoxChanger(e, netrunner_bridge_id, rez, current_rez_damage)
            }
          >
            <Item>{unhurtMarker}</Item>
          </Grid>
        );
      } else {
        rezArray.push(
          <Grid
            key={i}
            item
            xs={2}
            onClick={(e) => rezBoxChanger(e, netrunner_bridge_id)}
          >
            <Item>{aggMarker}</Item>
          </Grid>
        );
      }
    }
    return rezArray;
  };

  // handles health changes for a given piece of software.
  const rezBoxChanger = (e, netrunner_bridge_id, rez, current_rez_damage) => {
    if (e.target.innerText === unhurtMarker) {
      if (current_rez_damage + 1 === rez) {
        dispatch({
          type: 'NETRUNNER_SOFTWARE_DEACTIVATED',
          payload: netrunner_bridge_id,
        });
      } else {
        dispatch({ type: 'LOSE_ONE_REZ', payload: netrunner_bridge_id });
      }
    }
    // else if (e.target.innerText === aggMarker) {
    //     e.target.innerText = unhurtMarker
    // }
  };

  // handles active status changes for given piece of software
  const activeBoxChanger = (e, incomingKey) => {
    if (e.target.innerText === unhurtMarker) {
      dispatch({ type: 'ACTIVATE_NETRUNNER_GEAR', payload: incomingKey });
      netrunnerCalculate();
    } else if (e.target.innerText === aggMarker) {
      dispatch({ type: 'DEACTIVATE_NETRUNNER_GEAR', payload: incomingKey });
      netrunnerCalculate();
    }
  };

  // returns appropriate marker based on whether software is active or not.
  const activeBoxBuilder = (netrunner_bridge_id, active) => {
    if (active === true) {
      return (
        <Grid
          item
          xs={2}
          onClick={(e) => activeBoxChanger(e, netrunner_bridge_id)}
        >
          <Item>{aggMarker}</Item>
        </Grid>
      );
    } else {
      return (
        <Grid
          item
          xs={2}
          onClick={(e) => activeBoxChanger(e, netrunner_bridge_id)}
        >
          <Item>{unhurtMarker}</Item>
        </Grid>
      );
    }
  };

  const reloadSoftware = (netrunner_bridge_id) => {
    dispatch({ type: 'RELOAD_NETRUNNER_GEAR', payload: netrunner_bridge_id });
  };

  // determine Net Stats for display - need to be reloaded frequently
  const [netrunnerAttack, setNetrunnerAttack] = useState(0);
  const [netrunnerDefense, setNetrunnerDefense] = useState(0);
  const [netrunnerSoak, setNetrunnerSoak] = useState(0);

  // handles reloading Net Stats when changes are made to reducer.
  useEffect(() => {
    netrunnerCalculate();
  }, [charNetrunnerGear]);

  // changes displayed data.
  const netrunnerCalculate = () => {
    let highAttack = 0;
    charNetrunnerGear.map((gear) => {
      if (
        gear.equipped === true &&
        gear.type === 'software' &&
        gear.attack > highAttack &&
        gear.active === true
      ) {
        highAttack = gear.attack;
      }
    });
    setNetrunnerAttack(highAttack);

    let highDefense = 0;
    charNetrunnerGear.map((gear) => {
      if (
        gear.equipped === true &&
        gear.type === 'software' &&
        gear.defense > highDefense &&
        gear.active === true
      ) {
        highDefense = gear.defense;
      }
    });
    setNetrunnerDefense(highDefense);

    let soak = charDetail.willpower;
    charNetrunnerGear.map((gear) => {
      if (
        gear.equipped === true &&
        gear.type === 'software' &&
        gear.name === 'Armor' &&
        gear.active === true
      ) {
        soak += 1;
      }
    });
    setNetrunnerSoak(soak);
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Item>Netrunning Equipment</Item>
        </Grid>
        {charNetrunnerGear.map((gear) => {
          if (gear.type === 'deck' && gear.equipped === true) {
            return (
              <Fragment key={gear.netrunner_bridge_id}>
                <Grid item xs={12}>
                  <Grid container paddingBottom={2}>
                    <Grid item paddingLeft={1} paddingRight={1} xs={4}>
                      <Item>Net Actions: {netrunnerActionsCalc()}</Item>
                    </Grid>
                    <Grid item paddingLeft={1} paddingRight={1} xs={4}>
                      <Item>Equipped Deck: {gear.name}</Item>
                    </Grid>
                    <Grid item paddingLeft={1} paddingRight={1} xs={4}>
                      <Item>
                        Software Activations per Netrunner Action:{' '}
                        {activationsPerAction}
                      </Item>
                    </Grid>
                  </Grid>
                  <Grid container paddingBottom={2}>
                    <Grid item paddingLeft={1} paddingRight={1} xs={4}>
                      <Item>Net Attack: {netrunnerAttack}</Item>
                    </Grid>
                    <Grid item paddingLeft={1} paddingRight={1} xs={4}>
                      <Item>Net Defense: {netrunnerDefense}</Item>
                    </Grid>
                    <Grid item paddingLeft={1} paddingRight={1} xs={4}>
                      <Item>Net Soak: {netrunnerSoak}</Item>
                    </Grid>
                  </Grid>
                </Grid>
              </Fragment>
            );
          }
        })}

        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Item>Mods</Item>
          </Grid>
        </Grid>
        {charNetrunnerGear.map((gear) => {
          if (gear.equipped === true && gear.type === 'mod') {
            return (
              <Fragment key={gear.netrunner_bridge_id}>
                <Grid item xs={12}>
                  <Grid container>
                    <Grid item xs={4}>
                      <Item>
                        <b>Name: {gear.name}</b>
                      </Item>
                    </Grid>
                    <Grid item xs={8}>
                      <Item>{gear.description}</Item>
                    </Grid>
                  </Grid>
                </Grid>
              </Fragment>
            );
          }
        })}

        <Grid container paddingTop={2} spacing={1}>
          <Grid item xs={12}>
            <Item>Programs - Click REZ to reload (2 NET actions)</Item>
          </Grid>
        </Grid>

        {charNetrunnerGear.map((gear) => {
          if (gear.equipped === true && gear.type === 'software') {
            return (
              <Fragment key={gear.netrunner_bridge_id}>
                <Grid item xs={6}>
                  <Grid container>
                    <Grid item xs={12}>
                      <Item>{gear.name}</Item>
                    </Grid>

                    <Grid item xs={6}>
                      <Item>Description</Item>
                    </Grid>
                    <Grid item xs={6}>
                      <Item>{gear.description}</Item>
                    </Grid>

                    <Grid item xs={2}>
                      <Item>Attack</Item>
                    </Grid>
                    <Grid item xs={2}>
                      <Item>{gear.attack}</Item>
                    </Grid>
                    <Grid item xs={2}>
                      <Item>Defense</Item>
                    </Grid>
                    <Grid item xs={2}>
                      <Item>{gear.defense}</Item>
                    </Grid>
                    <Grid item xs={2}>
                      <Item>Active?</Item>
                    </Grid>
                    {activeBoxBuilder(gear.netrunner_bridge_id, gear.active)}

                    <Grid item xs={2}>
                      <Item>
                        <Button
                          onClick={() =>
                            reloadSoftware(gear.netrunner_bridge_id)
                          }
                        >
                          REZ
                        </Button>
                      </Item>
                    </Grid>
                    {rezBoxBuilder(
                      gear.rez,
                      gear.current_rez_damage,
                      gear.netrunner_bridge_id
                    )}
                  </Grid>
                </Grid>
              </Fragment>
            );
          }
        })}
      </Grid>
    </>
  );
}
