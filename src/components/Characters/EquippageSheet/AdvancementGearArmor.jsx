import React from 'react';
import { Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material/';

import Item from '../CharacterSheet/Item';
import {
  fetchCharArmorRequest,
  updateArmorStatusRequest,
  updateCharacterRequest,
  updateCharacterStatusRequest,
} from '../../../services/equip.services';

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

  // Ah. This reverses the current state, so you can equip everything.
  async function changeArmorEquip(incomingArmor) {
    setLoading(true);

    const armor = charGear.armor;
    for (let i = 0; i < armor.length; i++) {
      // find and unequip any other of same armor type
      if (
        (armor[i].equipped === true && armor[i].is_shield === incomingArmor.is_shield) ||
        armor[i].armor_bridge_id === incomingArmor.armor_bridge_id
      ) {
        const armorObj = {
          this_armor_loss: armor[i].this_armor_loss,
          equipped:
            armor[i].armor_bridge_id === incomingArmor.armor_bridge_id && armor[i].is_shield === incomingArmor.is_shield ? !armor[i].equipped : false,
          armor_bridge_id: armor[i].armor_bridge_id,
        };
        try {
          const result = await updateArmorStatusRequest(armorObj);
          if (result === 'OK') {
            setPageAlert({ open: true, message: 'Armor Equipped', severity: 'success' });
          } else {
            setLoading(false);
            chuckError();
            break;
          }
        } catch (error) {
          console.error('Error equipping armor:', error);
          chuckError();
        }
      }
    }
    setLoading(false);
    setCharGear({
      ...charGear,
      armor: charGear.armor.map((e) =>
        e.armor_bridge_id === incomingArmor.armor_bridge_id
          ? { ...e, equipped: !e.equipped }
          : e.is_shield === incomingArmor.is_shield
            ? { ...e, equipped: false }
            : e
      ),
    });
  }

  const repairArmor = async (incomingArmor) => {
    setLoading(true);
    const armorObj = {
      this_armor_loss: 0,
      equipped: incomingArmor.equipped,
      armor_bridge_id: incomingArmor.armor_bridge_id,
    };
    const statObj = {
      charID: equipCharDetails.id,
      statName: 'bank',
      newRank: equipCharDetails.bank - incomingArmor.this_armor_loss * (incomingArmor.price / 10),
    };
    if (incomingArmor.this_armor_loss > 0) {
      try {
        let bankresult = await updateCharacterRequest(statObj);
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
    const bankObj = {
      charID: equipCharDetails.id,
      statName: 'bank',
      newRank: equipCharDetails.bank - 1,
    };
    if (equipCharStatus.current_cyberware_armor_loss > 0) {
      try {
        let bankresult = await updateCharacterRequest(bankObj);
        let result = await updateCharacterStatusRequest(statObj);
        if (result === 'OK' && bankresult === 'OK') {
          setEquipCharStatus({ ...equipCharStatus, current_cyberware_armor_loss: 0 });
          setEquipCharDetails({ ...equipCharDetails, bank: bankObj.newRank });
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
