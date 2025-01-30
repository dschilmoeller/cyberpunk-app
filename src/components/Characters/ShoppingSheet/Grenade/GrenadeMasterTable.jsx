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

import WeaponDialog from '../../../Modals/WeaponDialog';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';

function TransitionUp(props) {
  return <Slide {...props} direction="up" />;
}

// TODO: Don't forget grenades have a qty owned now.
export default function GrenadeMasterTable() {
  const dispatch = useDispatch();
  const grenadeMaster = useSelector((store) => store.gearMaster.grenades);

  const charDetail = useSelector((store) => store.advancementDetail);
  const loadStatus = useSelector((store) => store.loaders.advancementSheet);

  const euroBuck = `\u20AC$`;

  const [showSnackbar, setShowSnackbar] = React.useState(false);
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const buyGrenade = (item) => {
    if (charDetail.bank >= item.price) {
      let newBank = charDetail.bank - item.price;
      dispatch({
        type: 'BUY_ITEM',
        payload: {
          itemMasterID: item.grenade_master_id,
          newBank,
          charID: charDetail.id,
          table: 'char_grenade_bridge',
          column: 'grenade_id',
        },
      });
    } else {
      setShowSnackbar(true);
    }
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
    return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
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
      id: 'range',
      numeric: true,
      disablePadding: false,
      label: 'Range',
    },
    {
      id: 'price',
      numeric: true,
      disablePadding: false,
      label: 'Price',
    },
    {
      id: 'purchase',
      numeric: false,
      disablePadding: false,
      label: 'Purchase',
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
              padding={headCell.disablePadding ? 'normal' : 'normal'}
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
  const [orderBy, setOrderBy] = React.useState('price');

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // create master data

  function createMasterGrenadeData(description, grenade_master_id, is_treasure, name, price) {
    return {
      description,
      grenade_master_id,
      is_treasure,
      name,
      price,
    };
  }

  // take master data and push into array for conversion into rows.
  const grenadeMasterRows = [];
  for (let i = 0; i < grenadeMaster.length; i++) {
    grenadeMasterRows.push(
      createMasterGrenadeData(
        grenadeMaster[i].description,
        grenadeMaster[i].grenade_master_id,
        grenadeMaster[i].is_treasure,
        grenadeMaster[i].name,
        grenadeMaster[i].price
      )
    );
  }

  // sort and monitor changes.
  const sortedGrenadeMasterRows = React.useMemo(() => stableSort(grenadeMasterRows, getComparator(order, orderBy)), [order, orderBy, grenadeMaster]);

  return (
    <>
      <Snackbar
        TransitionComponent={TransitionUp}
        autoHideDuration={2000}
        open={showSnackbar}
        onClose={() => setShowSnackbar(false)}
        anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
      >
        <Alert onClose={() => setShowSnackbar(false)} severity="warning" sx={{ width: '100%' }}>
          Transaction canceled due to lack of funds!
        </Alert>
      </Snackbar>

      <h2>Buy Grenades</h2>
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <TableContainer>
            <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={'small'}>
              <EnhancedTableHead order={order} orderBy={orderBy} onRequestSort={handleRequestSort} />
              <TableBody>
                {sortedGrenadeMasterRows.map((row) => {
                  if (row.is_treasure === false) {
                    return (
                      <TableRow hover key={row.name}>
                        <TableCell align="left">
                          <WeaponDialog prop={row.name} />
                        </TableCell>
                        <TableCell align="center">{row.description}</TableCell>
                        <TableCell align="center">Strength * 5 Meters</TableCell>
                        <TableCell align="center">
                          {euroBuck}
                          {row.price.toLocaleString('en-US')}
                        </TableCell>
                        <TableCell align="center">
                          <Button variant={loadStatus === false ? 'contained' : 'disabled'} color="success" onClick={() => buyGrenade(row)}>
                            Buy
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  }
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </>
  );
}
