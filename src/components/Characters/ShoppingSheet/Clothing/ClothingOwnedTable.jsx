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

export default function ClothingOwnedTable() {
  const dispatch = useDispatch();
  const charClothes = useSelector((store) => store.advancementGear.clothes);
  const charDetail = useSelector((store) => store.advancementDetail);
  const loadStatus = useSelector((store) => store.loaders.advancementSheet);

  const euroBuck = `\u20AC$`;

  const sellOwnedClothing = (item) => {
    let newBank =
      charDetail.bank + Math.floor(priceMaker(item.quality, item.rank) / 4);
    // dispatch({ type: 'SELL_CLOTHING', payload: { item, newBank, charID: item.char_id } })
    dispatch({
      type: 'SELL_ITEM',
      payload: {
        itemID: item.clothing_bridge_id,
        newBank,
        charID: charDetail.id,
        table: 'char_clothing_bridge',
        column: 'clothing_bridge_id',
      },
    });
  };

  const priceMaker = (quality, rank) => {
    let price = 5;
    if (quality > 0) {
      price = 10 * (quality * quality) * (rank * rank);
    }
    return Number(price);
  };

  const equipclothes = (incomingClothing) => {
    charClothes.map((clothing) => {
      if (clothing.equipped === true) {
        unequipClothes(clothing);
      }
    });
    if (incomingClothing.rank > 4 && incomingClothing.rank < 10) {
      dispatch({
        type: 'ATTRIBUTE_ENHANCING_GEAR_EQUIPPED',
        payload: { type: 'cyber_appearance', change: 1, charID: charDetail.id },
      });
    } else if (incomingClothing.rank === 10) {
      dispatch({
        type: 'ATTRIBUTE_ENHANCING_GEAR_EQUIPPED',
        payload: { type: 'cyber_appearance', change: 2, charID: charDetail.id },
      });
      dispatch({
        type: 'ATTRIBUTE_ENHANCING_GEAR_EQUIPPED',
        payload: { type: 'cyber_cool', change: 1, charID: charDetail.id },
      });
    }
    dispatch({
      type: 'CHANGE_GEAR_EQUIP_STATUS',
      payload: {
        item: incomingClothing,
        charID: charDetail.id,
        table: 'char_clothing_bridge',
        tablePrimaryKey: 'clothing_bridge_id',
        tableID: incomingClothing.clothing_bridge_id,
        equipStatus: true,
      },
    });
  };

  const unequipClothes = (incomingClothing) => {
    if (incomingClothing.rank > 4 && incomingClothing.rank < 10) {
      dispatch({
        type: 'ATTRIBUTE_ENHANCING_GEAR_EQUIPPED',
        payload: {
          type: 'cyber_appearance',
          change: -1,
          charID: charDetail.id,
        },
      });
    } else if (incomingClothing.rank === 10) {
      dispatch({
        type: 'ATTRIBUTE_ENHANCING_GEAR_EQUIPPED',
        payload: {
          type: 'cyber_appearance',
          change: -2,
          charID: charDetail.id,
        },
      });
      dispatch({
        type: 'ATTRIBUTE_ENHANCING_GEAR_EQUIPPED',
        payload: { type: 'cyber_cool', change: -1, charID: charDetail.id },
      });
    }
    dispatch({
      type: 'CHANGE_GEAR_EQUIP_STATUS',
      payload: {
        item: incomingClothing,
        charID: charDetail.id,
        table: 'char_clothing_bridge',
        tablePrimaryKey: 'clothing_bridge_id',
        tableID: incomingClothing.clothing_bridge_id,
        equipStatus: false,
      },
    });
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
      id: 'rank',
      numeric: true,
      disablePadding: false,
      label: 'Rank',
    },
    {
      id: 'equip',
      numeric: true,
      disablePadding: false,
      label: 'Equip',
    },
    {
      id: 'price',
      numeric: true,
      disablePadding: false,
      label: 'Street Price',
    },
    {
      id: 'sell',
      numeric: true,
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
              padding={'normal'}
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

  function createCharClothingData(
    char_id,
    clothing_bridge_id,
    clothing_id,
    clothing_master_id,
    description,
    equipped,
    name,
    quality,
    rank
  ) {
    let price = priceMaker(quality, rank);
    return {
      char_id,
      clothing_bridge_id,
      clothing_id,
      clothing_master_id,
      description,
      equipped,
      name,
      quality,
      rank,
      price,
    };
  }

  const charClothingRows = [];
  for (let i = 0; i < charClothes.length; i++) {
    charClothingRows.push(
      createCharClothingData(
        charClothes[i].char_id,
        charClothes[i].clothing_bridge_id,
        charClothes[i].clothing_id,
        charClothes[i].clothing_master_id,
        charClothes[i].description,
        charClothes[i].equipped,
        charClothes[i].name,
        charClothes[i].quality,
        charClothes[i].rank
      )
    );
  }

  // sort and monitor changes to charWeaponRows in case of sales.
  const sortedCharClothingRows = React.useMemo(
    () => stableSort(charClothingRows, getComparator(order, orderBy)),
    [order, orderBy, charClothingRows]
  );

  return (
    <>
      <h2>My Clothes</h2>

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
                {sortedCharClothingRows.map((row) => {
                  if (row.equipped === false) {
                    return (
                      <TableRow hover key={row.clothing_bridge_id}>
                        <TableCell align="center">{row.name}</TableCell>
                        <TableCell align="center">{row.description}</TableCell>
                        <TableCell align="center">{row.rank}</TableCell>
                        <TableCell align="center">
                          <Button
                            variant={
                              loadStatus === false ? 'contained' : 'disabled'
                            }
                            color="info"
                            onClick={() => equipclothes(row)}
                          >
                            Equip
                          </Button>
                        </TableCell>
                        <TableCell align="center">
                          {euroBuck}
                          {Math.floor(
                            priceMaker(row.quality, row.rank) / 4
                          ).toLocaleString()}
                        </TableCell>
                        <TableCell align="center">
                          <Button
                            variant={
                              loadStatus === false ? 'contained' : 'disabled'
                            }
                            color="error"
                            onClick={() => sellOwnedClothing(row)}
                          >
                            Sell
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
