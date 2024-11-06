import React from 'react';
import Grid from '@mui/material/Grid';
import { useSelector } from 'react-redux';
import Item from './Item';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import CharacterSheetHeaderDialog from '../../Modals/CharacterSheetHeaderDialog';

export default function CharacterSheetCyberware() {
  const characterCyberware = useSelector(
    (store) => store.characterGear.cyberware
  );

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Item>
            <CharacterSheetHeaderDialog prop={'Cyberware'} />
          </Item>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <TableContainer component={Paper}>
          <h3>My Cyberware</h3>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow hover>
                <TableCell align="left">Name</TableCell>
                <TableCell align="left">Description</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {characterCyberware.map((row, i) => {
                if (row.equipped == true) {
                  return (
                    <React.Fragment key={i}>
                      <TableRow hover key={i}>
                        <TableCell>{row.name} </TableCell>
                        <TableCell align="left">{row.description}</TableCell>
                      </TableRow>
                    </React.Fragment>
                  );
                }
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </>
  );
}
