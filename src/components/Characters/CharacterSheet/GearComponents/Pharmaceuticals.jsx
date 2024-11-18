import * as React from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableRow, Grid } from '@mui/material';
import { getComparator, stableSort, EnhancedTableHead, headCellsGenerator } from '../../../GeneralAssets/tableFuncs.service';
import { inPlayUsePharma } from '../character.services';
import Item from '../Item';
import CharacterSheetHeaderDialog from '../Modals/CharacterSheetHeaderDialog';

export default function Pharmaceuticals({ charPharma, setCharPharma, loading, setLoading, chuckError, setPageAlert }) {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('name');

  const sortedCharPharmaRows = React.useMemo(() => stableSort(charPharma, getComparator(order, orderBy)), [order, orderBy, charPharma]);

  const usePharma = async (pharma) => {
    setLoading(true);
    const pharmaObj = { char_pharma_bridge_id: pharma.char_pharma_bridge_id };
    try {
      let result = await inPlayUsePharma(pharmaObj);
      if (result === 'OK') {
        setPageAlert({ open: true, message: 'Pharma Used', severity: 'success' });
        setCharPharma(charPharma.filter((e) => e.char_pharma_bridge_id != pharma.char_pharma_bridge_id));
      } else {
        chuckError();
      }
    } catch (error) {
      console.error('Error using pharmaceutical:', error);
      chuckError();
    }
    setLoading(false);
  };

  return (
    <>
      <Grid container>
        <Grid item xs={12} paddingBottom={4}>
          <Item>
            <CharacterSheetHeaderDialog prop={'Pharmaceuticals'} />
          </Item>
        </Grid>
      </Grid>

      <TableContainer>
        <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={'small'}>
          <EnhancedTableHead
            headCells={headCellsGenerator(['name', 'description', 'consume'])}
            order={order}
            orderBy={orderBy}
            setOrder={setOrder}
            setOrderBy={setOrderBy}
          />
          <TableBody>
            {sortedCharPharmaRows.map((row, i) => {
              return (
                <TableRow hover key={i}>
                  <TableCell padding="normal">{row.name}</TableCell>
                  <TableCell padding="normal">{row.description}</TableCell>
                  <TableCell align="center" padding="normal">
                    <Button
                      sx={{
                        textTransform: 'none',
                        backgroundColor: '#1A2027',
                        color: 'white',
                        '&:hover': {
                          backgroundColor: '#fff',
                          color: '#000',
                        },
                      }}
                      variant={loading === false ? 'contained' : 'disabled'}
                      fullWidth
                      onClick={() => usePharma(row)}
                    >
                      Use
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
