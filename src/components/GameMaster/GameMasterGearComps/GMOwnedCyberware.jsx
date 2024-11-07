import React, { useState } from 'react';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import Item from '../../Characters/CharacterSheet/Item';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

export default function GMOwnedCyberware({ charDetail, charCyberware }) {
  const euroBuck = `\u20AC$`;

  const [selectedList, setSelectedList] = useState('fashionware');
  const handleTabChange = (event, newValue) => {
    setSelectedList(newValue);
  };

  const [allowDeleteEquipped, setAllowDeleteEquipped] = useState(false);

  return (
    <>
      <Tabs value={selectedList} onChange={handleTabChange} indicatorColor="primary" textColor="secondary">
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

      <Grid container>
        <Grid item xs={12}>
          <h2>{charDetail.handle}'s Cyberware</h2>
        </Grid>
        <Grid item xs={12}>
          <Item>
            Note: This will restore permanent humanity losses. It will not alter slot counts, armor, or health; removing equipped cyberware is NOT
            recommended.
          </Item>
        </Grid>
        <Grid item xs={12}>
          <Item>
            <FormGroup sx={{ position: 'flex', alignItems: 'center' }}>
              <FormControlLabel
                control={<Switch checked={allowDeleteEquipped} onChange={(e) => setAllowDeleteEquipped(e.target.checked)} />}
                label="Allow Deleting Equipped Cyberware"
              />
            </FormGroup>
          </Item>
        </Grid>
      </Grid>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow hover>
              <TableCell align="left">Name</TableCell>
              <TableCell align="center">Description</TableCell>
              <TableCell align="center">Humanity Cost</TableCell>
              <TableCell align="center">Install Requirement</TableCell>
              <TableCell align="center">Street Price</TableCell>
              <TableCell align="center">Equipped</TableCell>
              <TableCell align="center">Remove</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {charCyberware.map((item) => {
              if ((item.type === selectedList && item.equipped === false) || (item.type === selectedList && allowDeleteEquipped === true)) {
                return (
                  <React.Fragment key={item.owned_cyberware_id}>
                    <TableRow hover>
                      <TableCell align="left">{item.name} </TableCell>
                      <TableCell align="center">{item.description}</TableCell>
                      <TableCell align="center">
                        {item.humanity_loss_min} - {item.humanity_loss_max}
                      </TableCell>
                      <TableCell align="center">{item.install_level}</TableCell>
                      <TableCell align="center">
                        {euroBuck}
                        {Math.floor(item.price / 4).toLocaleString('en-US')}
                      </TableCell>
                      <TableCell align="center">{item.equipped ? 'Y' : 'N'}</TableCell>
                      <TableCell align="center">
                        <Button onClick={() => gmRemoveCyberware(item)}>Remove</Button>
                      </TableCell>
                    </TableRow>
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
