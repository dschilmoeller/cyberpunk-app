import React, { useState } from 'react';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

import Item from '../CharacterSheet/Item';
import { equipCyberwareHandler, unequipCyberwareHandler } from './CyberwareFuncs';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

export default function AdvancementCyberware({
  equipCharStatus,
  equipCharDetails,
  charGear,
  setEquipCharDetails,
  setEquipCharStatus,
  setCharGear,
  loading,
  setLoading,
  setPageAlert,
}) {
  const [selectedList, setSelectedList] = useState('fashionware');
  const handleTabChange = (event, newValue) => {
    setSelectedList(newValue);
  };

  // Just making things easier to read downstream.
  const fashionSlots = charGear.cyberwareStatus.fashionware_slots;
  const neuralSlots = charGear.cyberwareStatus.neuralware_slots;
  const opticSlots = charGear.cyberwareStatus.cyberoptic_slots;
  const cyberaudioSlots = charGear.cyberwareStatus.cyberaudio_slots;
  const internalwareSlots = charGear.cyberwareStatus.internalware_slots;
  const externalwareSlots = charGear.cyberwareStatus.externalware_slots;
  const cyberarmSlots = charGear.cyberwareStatus.cyberarm_slots;
  const cyberlegSlots = charGear.cyberwareStatus.cyberleg_slots;

  return (
    <>
      <Tabs value={selectedList} onChange={handleTabChange} indicatorColor="primary" textColor="secondary" variant="scrollable" scrollButtons="auto">
        <Tab value="fashionware" label="Fashionware" />
        <Tab value="neuralware" label="Neuralware" />
        <Tab value="cyberoptics" label="Cyberoptics" />
        <Tab value="cyberaudio" label="Cyberaudio" />
        <Tab value="internalware" label="Internalware" />
        <Tab value="externalware" label="Externalware" />
        <Tab value="cyberarm" label="Cyberarm" />
        <Tab value="cyberleg" label="Cyberleg" />
        <Tab value="borgware" label="Borgware (Beta)" />
      </Tabs>

      <Item>
        <h1>Cyberware</h1>
      </Item>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableBody>
            <TableRow hover>
              <TableCell align="center">Permanent Humanity Loss: {equipCharDetails.perm_humanity_loss}</TableCell>
              <TableCell align="center">Temporary Humanity Loss: {equipCharDetails.temp_humanity_loss}</TableCell>
              {equipCharDetails.perm_humanity_loss + equipCharDetails.temp_humanity_loss > 39 ? (
                <TableCell sx={{ color: 'red', backgroundColor: 'black' }} align="center">
                  Total Humanity Loss: {equipCharDetails.perm_humanity_loss + equipCharDetails.temp_humanity_loss}
                </TableCell>
              ) : (
                <TableCell align="center">Total Humanity Loss: {equipCharDetails.perm_humanity_loss + equipCharDetails.temp_humanity_loss}</TableCell>
              )}
            </TableRow>

            {selectedList === 'fashionware' ? (
              <TableRow hover>
                <TableCell align="center">Fashionware Requirements: None</TableCell>
                <TableCell></TableCell>
                <TableCell align="center">Available Fashionware Slots: {fashionSlots}</TableCell>
              </TableRow>
            ) : (
              <></>
            )}

            {selectedList === 'cyberaudio' ? (
              <TableRow hover>
                <TableCell align="center">Cyberaudio Requirements: Cyber Audio Suite</TableCell>
                <TableCell></TableCell>
                <TableCell align="center">Available Cyberaudio Slots: {cyberaudioSlots}</TableCell>
              </TableRow>
            ) : (
              <></>
            )}

            {selectedList === 'neuralware' ? (
              <TableRow hover>
                <TableCell align="center">Neuralware Requirements: Neural Link</TableCell>
                <TableCell></TableCell>
                <TableCell align="center">Available Neuralware Slots: {neuralSlots}</TableCell>
              </TableRow>
            ) : (
              <></>
            )}

            {selectedList === 'cyberoptics' ? (
              <TableRow hover>
                <TableCell align="center">Optics Requirements: Cybereyes</TableCell>
                <TableCell></TableCell>
                <TableCell align="center">Available Cyberoptic Slots: {opticSlots}</TableCell>
              </TableRow>
            ) : (
              <></>
            )}

            {selectedList === 'internalware' ? (
              <TableRow hover>
                <TableCell align="center">Internalware Requirements: None</TableCell>
                <TableCell></TableCell>
                <TableCell align="center">Available Internalware Slots: {internalwareSlots}</TableCell>
              </TableRow>
            ) : (
              <></>
            )}

            {selectedList === 'externalware' ? (
              <TableRow hover>
                <TableCell align="center">Externalware Requirements: None</TableCell>
                <TableCell></TableCell>
                <TableCell align="center">Available Externalware Slots: {externalwareSlots}</TableCell>
              </TableRow>
            ) : (
              <></>
            )}

            {selectedList === 'cyberarm' ? (
              <TableRow hover>
                <TableCell align="center">Cyberarm Requirements: Cyberarm</TableCell>
                <TableCell></TableCell>
                <TableCell align="center">Available Cyberarm Slots: {cyberarmSlots}</TableCell>
              </TableRow>
            ) : (
              <></>
            )}

            {selectedList === 'cyberleg' ? (
              <TableRow hover>
                <TableCell align="center">Cyberleg Requirements: Cyberleg</TableCell>
                <TableCell></TableCell>
                <TableCell align="center">Available Cyberleg Slots: {cyberlegSlots}</TableCell>
              </TableRow>
            ) : (
              <></>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <h1>Equipped Cyberware</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow hover>
              <TableCell align="left">Name</TableCell>
              <TableCell align="center">Description</TableCell>
              <TableCell align="center">Install Requirement</TableCell>
              <TableCell align="center">Remove</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {charGear.cyberware.map((item, i) => {
              if (item.equipped === true) {
                return (
                  <React.Fragment key={i}>
                    {item.type === selectedList ? (
                      <TableRow hover key={i}>
                        <TableCell align="left">{item.name} </TableCell>
                        <TableCell align="center">{item.description}</TableCell>
                        <TableCell align="center">{item.install_level}</TableCell>

                        <TableCell align="center">
                          <Button
                            variant="contained"
                            disabled={loading}
                            color="secondary"
                            onClick={() => {
                              setLoading(true);
                              unequipCyberwareHandler(
                                item,
                                equipCharDetails,
                                equipCharStatus,
                                charGear.cyberwareStatus,
                                charGear,
                                setEquipCharDetails,
                                setEquipCharStatus,
                                setCharGear,
                                setPageAlert
                              );
                              setLoading(false);
                            }}
                          >
                            Unequip
                          </Button>
                        </TableCell>
                      </TableRow>
                    ) : (
                      <></>
                    )}
                  </React.Fragment>
                );
              }
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <h1>Owned Cyberware</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow hover>
              <TableCell align="left">Name</TableCell>
              <TableCell align="center">Description</TableCell>
              <TableCell align="center">Humanity Cost</TableCell>
              <TableCell align="center">Install Requirement</TableCell>
              <TableCell align="center">Install</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {charGear.cyberware.map((item, i) => {
              if (item.equipped === false) {
                return (
                  <React.Fragment key={i}>
                    {item.type === selectedList ? (
                      <TableRow hover key={i}>
                        <TableCell align="left">{item.name} </TableCell>
                        <TableCell align="center">{item.description}</TableCell>
                        <TableCell align="center">
                          {item.humanity_loss_min} - {item.humanity_loss_max}
                        </TableCell>
                        <TableCell align="center">{item.install_level}</TableCell>
                        <TableCell align="center">
                          <Button
                            variant="contained"
                            disabled={loading}
                            color="info"
                            onClick={() => {
                              setLoading(true);
                              equipCyberwareHandler(
                                item,
                                equipCharDetails,
                                equipCharStatus,
                                charGear,
                                setEquipCharDetails,
                                setEquipCharStatus,
                                setCharGear,
                                setPageAlert
                              );
                              setLoading(false);
                            }}
                          >
                            Equip
                          </Button>
                        </TableCell>
                      </TableRow>
                    ) : (
                      <></>
                    )}
                  </React.Fragment>
                );
              }
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
