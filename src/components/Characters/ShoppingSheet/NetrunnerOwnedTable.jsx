import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';
import Grid from '@mui/material/Grid';

export default function NetrunnerOwnedTable() {
  const dispatch = useDispatch();
  const charNetrunnerGear = useSelector(
    (store) => store.advancementGear.netrunnerGear
  );
  const boughtNetrunnerGear = useSelector(
    (store) => store.advancementGear.boughtNetrunnerGear
  );

  const euroBuck = `\u20AC$`;

  const sellOwnedGear = (item) => {
    dispatch({ type: 'SELL_OWNED_NETRUNNER_GEAR', payload: item });
  };

  const sellBoughtGear = (item) => {
    dispatch({ type: 'SELL_ADVANCEMENT_NETRUNNER_GEAR', payload: item });
  };

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  // Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
  // stableSort() brings sort stability to non-modern browsers (notably IE11). If you
  // only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
  // with exampleArray.slice().sort(getComparator(order, orderBy))
  // DS - the above gives a .map error for some reason. Not sure why.

  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  const headCells = [
    {
      id: 'name',
      numeric: false,
      disablePadding: true,
      label: 'Name',
    },
    {
      id: 'description',
      numeric: true,
      disablePadding: false,
      label: 'Description',
    },
    {
      id: 'price',
      numeric: true,
      disablePadding: false,
      label: 'Street Price',
    },
    {
      id: 'sell',
      numeric: false,
      disablePadding: false,
      label: 'Sell',
    },
  ];

  function EnhancedTableHead(props) {
    const { order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };

    return (
      <TableHead>
        <TableRow hover>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? 'center' : 'left'}
              padding={headCell.disablePadding ? 'none' : 'normal'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }

  EnhancedTableHead.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
  };

  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('name');

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  function createCharNetrunnerGearData(
    attack,
    char_id,
    defense,
    description,
    equipped,
    name,
    netrunner_bridge_id,
    netrunner_master_id,
    perception,
    price,
    rez,
    slots,
    speed,
    type
  ) {
    return {
      attack,
      char_id,
      defense,
      description,
      equipped,
      name,
      netrunner_bridge_id,
      netrunner_master_id,
      perception,
      price,
      rez,
      slots,
      speed,
      type,
    };
  }

  const charNetrunnerRows = [];
  for (let i = 0; i < charNetrunnerGear.length; i++) {
    charNetrunnerRows.push(
      createCharNetrunnerGearData(
        charNetrunnerGear[i].attack,
        charNetrunnerGear[i].char_id,
        charNetrunnerGear[i].defense,
        charNetrunnerGear[i].description,
        charNetrunnerGear[i].equipped,
        charNetrunnerGear[i].name,
        charNetrunnerGear[i].netrunner_bridge_id,
        charNetrunnerGear[i].netrunner_master_id,
        charNetrunnerGear[i].perception,
        charNetrunnerGear[i].price,
        charNetrunnerGear[i].rez,
        charNetrunnerGear[i].slots,
        charNetrunnerGear[i].speed,
        charNetrunnerGear[i].type
      )
    );
  }

  // sort and monitor changes to charOtherRows in case of sales.
  const sortedCharNetrunnerRows = React.useMemo(
    () => stableSort(charNetrunnerRows, getComparator(order, orderBy)),
    [order, orderBy, charNetrunnerRows]
  );

  return (
    <>
      <Grid container>
        <Grid item xs={12} display={'flex'} justifyContent={'center'}>
          <h1>Shop Netrunner Gear</h1>
        </Grid>
      </Grid>
      <h2>My Netrunner Gear</h2>

      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={'small'}
            >
              <EnhancedTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
              />
              <TableBody>
                {sortedCharNetrunnerRows.map((row) => {
                  if (row.equipped === 'false') {
                    return (
                      <TableRow hover key={row.netrunner_bridge_id}>
                        <TableCell>{row.name}</TableCell>
                        <TableCell align="center">{row.description}</TableCell>
                        <TableCell align="center">
                          {euroBuck}
                          {Math.floor(row.price / 4).toLocaleString('en-US')}
                        </TableCell>
                        <TableCell align="center">
                          <Button onClick={() => sellOwnedGear(row)}>
                            Sell
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  }
                })}

                {boughtNetrunnerGear.map((item, i) => {
                  return (
                    <TableRow hover key={i}>
                      <TableCell align="left">{item.name} </TableCell>
                      <TableCell align="center">{item.description}</TableCell>
                      <TableCell align="center">
                        {euroBuck}
                        {Math.floor(item.price).toLocaleString('en-US')}
                      </TableCell>
                      <TableCell align="center">
                        <Button onClick={() => sellBoughtGear(item)}>
                          Sell
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </>
  );
}
