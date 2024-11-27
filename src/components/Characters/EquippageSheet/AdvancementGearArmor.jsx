import React from 'react';
import { Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material/';

import Item from '../CharacterSheet/Item';
import { fetchCharArmorRequest, updateArmorStatusRequest, updateCharacter, updateCharacterStatus } from './Equip.services';

export default function AdvancementGearArmor({
  equipCharDetails,
  setEquipCharDetails,
  equipCharStatus,
  setEquipCharStatus,
  charGear,
  setCharGear,
  loading,
  setLoading,
  setPageAlert,
  chuckError,
}) {
  const armorBuilder = (stat) => {
    let maxArmorTotal = equipCharStatus.current_cyberware_armor_quality;
    let currentArmorTotal = equipCharStatus.current_cyberware_armor_quality - equipCharStatus.current_cyberware_armor_loss;
    let currentArmorVal = 0;
    let currentShieldVal = 0;
    charGear.armor.map((item) => {
      if (item.equipped === true) {
        maxArmorTotal += item.quality;
        currentArmorTotal += item.quality - item.this_armor_loss;
        if (item.is_shield === false) {
          currentArmorVal += item.quality - item.this_armor_loss;
        } else {
          currentShieldVal += item.quality - item.this_armor_loss;
        }
      }
    });
    switch (stat) {
      case 'max':
        return maxArmorTotal;
      case 'current':
        return currentArmorTotal;
      case 'armor':
        return currentArmorVal;
      case 'shield':
        return currentShieldVal;
      default:
        return '';
    }
  };

  // unwieldy but there are four distinct cases to be handled.
  // {
  // armor_bridge_id: Primary Key from table
  // equipped: boolean
  // }
  // this_armor_loss is being included right now to save time later (re-use service & route for repairs.)
  async function changeArmorEquip(incomingArmor) {
    setLoading(true);
    const armor = charGear.armor;
    // case 1 - removing armor that is currently equipped.
    if (incomingArmor.equipped === true && incomingArmor.is_shield === false) {
      // technically this doesn't need to be done - could just shove the current item straight in.
      // combined with losing the 'No armor' item would simplify this considerably.
      // but still have to check that all other non-shield armor is unequipped, requiring a map or loop
      // which in turn needs to be run async.
      // apparently our dear (let i = 0; etc) loop with ASYNC
      for (let i = 0; i < armor.length; i++) {
        // find and unequip armor
        if (armor[i].armor_bridge_id === incomingArmor.armor_bridge_id) {
          const armorObj = {
            this_armor_loss: armor[i].this_armor_loss,
            equipped: false,
            armor_bridge_id: armor[i].armor_bridge_id,
          };
          try {
            let result = await updateArmorStatusRequest(armorObj);
            if (result === 'OK') {
              setPageAlert({ open: true, message: 'Armor Removed', severity: 'success' });
            }
          } catch (error) {
            console.error('Error equipping armor:', error);
            chuckError();
          }
        }
      }
      setLoading(false);
      // case 2 - equipping inventory armor
    } else if (incomingArmor.equipped === false && incomingArmor.is_shield === false) {
      for (let i = 0; i < armor.length; i++) {
        // find and equip armor
        if (armor[i].armor_bridge_id === incomingArmor.armor_bridge_id) {
          const armorObj = {
            this_armor_loss: armor[i].this_armor_loss,
            equipped: true,
            armor_bridge_id: armor[i].armor_bridge_id,
          };
          try {
            let result = await updateArmorStatusRequest(armorObj);
            if (result === 'OK') {
              setPageAlert({ open: true, message: 'Armor Equipped', severity: 'success' });
            }
          } catch (error) {
            console.error('Error equipping armor:', error);
            chuckError();
          }
          // remove other equipped armor.
        } else if (armor[i].armor_bridge_id != incomingArmor.armor_bridge_id && armor[i].is_shield === false && armor[i].equipped === true) {
          const armorObj = {
            this_armor_loss: armor[i].this_armor_loss,
            equipped: false,
            armor_bridge_id: armor[i].armor_bridge_id,
          };
          try {
            let result = await updateArmorStatusRequest(armorObj);
            if (result != 'OK') {
              console.error('Error removing current armor:', result);
              chuckError();
            }
          } catch (error) {
            console.error('Error equipping armor:', error);
            chuckError();
          }
        }
      }
      setLoading(false);
      // case 3 - removing currently equipped shield.
    } else if (incomingArmor.equipped === true && incomingArmor.is_shield === true) {
      for (let i = 0; i < armor.length; i++) {
        if (armor[i].armor_bridge_id === incomingArmor.armor_bridge_id) {
          const armorObj = {
            this_armor_loss: armor[i].this_armor_loss,
            equipped: false,
            armor_bridge_id: armor[i].armor_bridge_id,
          };
          try {
            let result = await updateArmorStatusRequest(armorObj);
            if (result === 'OK') {
              setPageAlert({ open: true, message: 'Shield Removed', severity: 'success' });
            }
          } catch (error) {
            console.error('Error equipping Shield:', error);
            chuckError();
          }
        }
      }
      setLoading(false);
      // case 4 - equipping inventory shield
    } else if (incomingArmor.equipped === false && incomingArmor.is_shield === true) {
      for (let i = 0; i < armor.length; i++) {
        // find and equip desired shield.
        if (armor[i].armor_bridge_id === incomingArmor.armor_bridge_id) {
          const armorObj = {
            this_armor_loss: armor[i].this_armor_loss,
            equipped: true,
            armor_bridge_id: armor[i].armor_bridge_id,
          };
          try {
            let result = await updateArmorStatusRequest(armorObj);
            if (result === 'OK') {
              setPageAlert({ open: true, message: 'Armor Equipped', severity: 'success' });
            }
          } catch (error) {
            console.error('Error equipping shield:', error);
            chuckError();
          }
        } else if (armor[i].armor_bridge_id != incomingArmor.armor_bridge_id && armor[i].is_shield === true && armor[i].equipped === true) {
          // unequip existing shield (if any)
          const armorObj = {
            this_armor_loss: armor[i].this_armor_loss,
            equipped: false,
            armor_bridge_id: armor[i].armor_bridge_id,
          };
          try {
            let result = await updateArmorStatusRequest(armorObj);
            if (result != 'OK') {
              console.error('Result from removing existing shield:', result);
            }
          } catch (error) {
            console.error('Error removing equipped shield:', error);
            chuckError();
          }
        }
      }
    } else {
      chuckError();
    }
    const charObj = { charID: equipCharDetails.id };
    let charArmorResult = await fetchCharArmorRequest(charObj);
    setCharGear({ ...charGear, armor: charArmorResult });
    setLoading(false);
  }

  const repairArmor = async (incomingArmor) => {
    setLoading(true);
    const armorObj = {
      this_armor_loss: 0,
      equipped: false,
      armor_bridge_id: incomingArmor.armor_bridge_id,
    };
    const statObj = {
      charID: equipCharDetails.id,
      statName: 'bank',
      newRank: equipCharDetails.bank - incomingArmor.this_armor_loss * (incomingArmor.price / 10),
    };
    if (incomingArmor.this_armor_loss > 0) {
      try {
        let bankresult = await updateCharacter(statObj);
        let result = await updateArmorStatusRequest(armorObj);
        if (result === 'OK' && bankresult === 'OK') {
          const charObj = { charID: equipCharDetails.id };
          let charArmorResult = await fetchCharArmorRequest(charObj);
          setCharGear({ ...charGear, armor: charArmorResult });
          setEquipCharDetails({ ...equipCharDetails, bank: statObj.newRank });
        } else {
          chuckError();
        }
      } catch (error) {
        console.error('Error repairing armor:', error);
        chuckError();
      }
    } else {
      setPageAlert({ open: true, message: 'Armor not damaged!', severity: 'error' });
    }
    setLoading(false);
  };

  const repairCyberware = async () => {
    setLoading(true);
    const statObj = {
      charID: equipCharStatus.char_id,
      statName: 'current_cyberware_armor_loss',
      newRank: 0,
    };
    if (equipCharStatus.current_cyberware_armor_loss > 0) {
      try {
        let result = await updateCharacterStatus(statObj);
        if (result === 'OK') {
          setEquipCharStatus({ ...equipCharStatus, current_cyberware_armor_loss: 0 });
        } else {
          chuckError();
        }
      } catch (error) {
        console.error('Error repairing cyberware armor:', error);
      }
    } else {
      setPageAlert({ open: true, message: 'Cyberware is undamaged!', severity: 'error' });
    }
    setLoading(false);
  };

  if (!loading) {
    return (
      <>
        <Grid container>
          {loading === false ? (
            <>
              <Grid container>
                <Grid container spacing={2} padding={1} item xs={12}>
                  <Grid item xs={6}>
                    <Item>
                      <h2>Current Maximum Armor: {armorBuilder('max')}</h2>
                    </Item>
                  </Grid>
                  <Grid item xs={6}>
                    <Item>
                      <h2>Current Total Armor: {armorBuilder('current')}</h2>
                    </Item>
                  </Grid>
                  <Grid item xs={6}>
                    <Item>
                      <h2>From Armor: {armorBuilder('armor')}</h2>
                    </Item>
                  </Grid>
                  <Grid item xs={6}>
                    <Item>
                      <h2>From Shield: {armorBuilder('shield')}</h2>
                    </Item>
                  </Grid>
                  <Grid item xs={6}>
                    <Item>
                      <h2>
                        From Cyberware: {equipCharStatus.current_cyberware_armor_quality - equipCharStatus.current_cyberware_armor_loss} of{' '}
                        {equipCharStatus.current_cyberware_armor_quality}
                      </h2>
                    </Item>
                  </Grid>
                </Grid>
              </Grid>

              <h1>Equipped Armor</h1>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                  <TableHead>
                    <TableRow hover>
                      <TableCell align="left">Name</TableCell>
                      <TableCell align="left">Quality</TableCell>
                      <TableCell align="left">Damage</TableCell>
                      <TableCell align="left">Repair?</TableCell>
                      <TableCell align="left">Description</TableCell>
                      <TableCell align="left">Unequip</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {charGear.cyberware.map((cyberware, i) => {
                      if (cyberware.equipped === true && cyberware.type === 'externalware') {
                        return (
                          <TableRow hover key={i}>
                            <TableCell align="left">{cyberware.name}</TableCell>
                            <TableCell align="left">{equipCharStatus.current_cyberware_armor_quality}</TableCell>
                            <TableCell align="left">{equipCharStatus.current_cyberware_armor_loss}</TableCell>
                            {equipCharStatus.current_cyberware_armor_loss === 0 ? (
                              <TableCell align="left">
                                <Button variant="disabled" color="inherit">
                                  Repair
                                </Button>
                              </TableCell>
                            ) : (
                              <TableCell align="left">
                                <Button variant={loading === false ? 'contained' : 'disabled'} color="inherit" onClick={() => repairCyberware()}>
                                  Repair - ${equipCharStatus.current_cyberware_armor_loss * 200}
                                </Button>
                              </TableCell>
                            )}

                            <TableCell align="left">{cyberware.description}</TableCell>
                            <TableCell align="left">See Cyberware</TableCell>
                          </TableRow>
                        );
                      }
                    })}
                    {charGear.armor.map((item, i) => {
                      if (item.equipped === true) {
                        return (
                          <TableRow hover key={i}>
                            <TableCell align="left">{item.name} </TableCell>
                            <TableCell align="left">{item.quality}</TableCell>
                            <TableCell align="left">{item.this_armor_loss}</TableCell>
                            {item.this_armor_loss === 0 ? (
                              <TableCell align="left">
                                <Button variant="disabled" color="inherit">
                                  Repair
                                </Button>
                              </TableCell>
                            ) : (
                              <TableCell align="left">
                                <Button
                                  disabled={item.this_armor_loss > 0 ? loading : true}
                                  variant="contained"
                                  color="inherit"
                                  onClick={() => repairArmor(item)}
                                >
                                  Repair - ${item.this_armor_loss * (item.price / 10)}
                                </Button>
                              </TableCell>
                            )}
                            <TableCell width={600} align="left">
                              {item.description}
                            </TableCell>
                            <TableCell align="left">
                              <Button
                                variant={item.name === 'No Armor' ? 'disabled' : loading === false ? 'contained' : 'disabled'}
                                color="secondary"
                                onClick={() => changeArmorEquip(item)}
                              >
                                Unequip
                              </Button>
                            </TableCell>
                          </TableRow>
                        );
                      }
                    })}
                  </TableBody>
                </Table>
              </TableContainer>

              <h1>Owned Armor</h1>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                  <TableHead>
                    <TableRow hover>
                      <TableCell align="left">Name</TableCell>
                      <TableCell align="left">Quality</TableCell>
                      <TableCell align="left">Damage</TableCell>
                      <TableCell align="left">Repair?</TableCell>
                      <TableCell align="left">Description</TableCell>
                      <TableCell align="left">Equip?</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {charGear.armor.map((item, i) => {
                      if (item.equipped === false) {
                        return (
                          <TableRow hover key={i}>
                            <TableCell align="left">{item.name} </TableCell>
                            <TableCell align="left">{item.quality}</TableCell>
                            <TableCell align="left">{item.this_armor_loss}</TableCell>
                            <TableCell align="left">
                              <Button
                                disabled={item.this_armor_loss > 0 ? loading : true}
                                variant="contained"
                                color="inherit"
                                onClick={() => repairArmor(item)}
                              >
                                Repair - ${(item.this_armor_loss * item.price) / 10}
                              </Button>
                            </TableCell>
                            <TableCell width={600} align="left">
                              {item.description}
                            </TableCell>
                            <TableCell align="left">
                              <Button variant={loading === false ? 'contained' : 'disabled'} color="info" onClick={() => changeArmorEquip(item)}>
                                Equip
                              </Button>
                            </TableCell>
                          </TableRow>
                        );
                      }
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          ) : (
            <>
              <Grid item xs={12}>
                <Item>Loading...</Item>
              </Grid>
            </>
          )}
        </Grid>
      </>
    );
  } else {
    return <></>;
  }
}
