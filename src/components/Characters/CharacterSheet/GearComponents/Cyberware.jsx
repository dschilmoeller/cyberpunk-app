import React from 'react';
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

import Item from '.././Item';
import CharacterSheetHeaderDialog from '../Modals/CharacterSheetHeaderDialog';

export default function Cyberware({ charCyberware }) {
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
              {charCyberware.map((row, i) => {
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
