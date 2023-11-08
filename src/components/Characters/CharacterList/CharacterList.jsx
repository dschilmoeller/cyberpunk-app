import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import { useHistory } from 'react-router-dom';

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

function CharacterList() {
  const characterList = useSelector((store) => store.characterList);

  const dispatch = useDispatch();
  const history = useHistory()

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
      id: 'handle',
      numeric: false,
      disablePadding: true,
      label: 'In Play Sheet',
    },
    {
      id: 'campaign',
      numeric: false,
      disablePadding: true,
      label: 'Campaign',
    },
    {
      id: 'advancement',
      numeric: false,
      disablePadding: true,
      label: 'Equip Gear and Spend XP',
    },
    {
      id: 'shopping',
      numeric: false,
      disablePadding: true,
      label: 'Shopping',
    },
  ];

  function EnhancedTableHead(props) {
    const { order, orderBy, onRequestSort } =
      props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };

    return (
      <TableHead>
        <TableRow hover>
          {headCells.map((headCell) => {
            if (headCell.id === 'handle' || headCell.id === 'campaign') {
              return (
                <TableCell
                  key={headCell.id}
                  align={'center'}
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
              )
            } else {
              return (
                <TableCell key={headCell.id} align={'center'} padding={'none'}>
                  {headCell.label}
                </TableCell>
              )
            }
          }
          )}
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
  const [orderBy, setOrderBy] = React.useState('handle');

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  function createCharListData(handle, id, campaign, campaign_name) {
    return {
      handle, id, campaign, campaign_name
    }
  }

  // take charMiscGear data and push into array for conversion into rows.
  const charListRows = []
  for (let i = 0; i < characterList.length; i++) {
    charListRows.push(createCharListData(characterList[i].handle, characterList[i].id, characterList[i].campaign, characterList[i].campaign_name  ))
  }

  const sortedCharListRows = React.useMemo(
    () =>
      stableSort(charListRows, getComparator(order, orderBy)),
    [order, orderBy, characterList],
  );

  useEffect(() => {
    dispatch({ type: "FETCH_ALL_CHARACTERS" })
    dispatch({ type: "CLEAR_ADVANCEMENT_DETAIL" })
    dispatch({ type: "CLEAR_CHARACTER_DETAIL"})
    dispatch({ type: "CLEAR_CHARACTER_GEAR_DETAILS"})
  }, [])

  const moveToCharacterSheet = (id) => {
    history.push(`/charactersheet/${id}`)
  }
  const moveToAdvancementSheet = (id) => {
    history.push(`/advancementsheet/${id}`)
  }

  const moveToShopSheet = (id) => {
    history.push(`/shopSheet/${id}`)
  }



  return (<>
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
              {sortedCharListRows.map((row) => {
                return (
                  <TableRow hover key={row.id}>
                    <TableCell align='center' padding="none"><Button fullWidth variant='contained' onClick={() => moveToCharacterSheet(row.id)}>{row.handle}</Button></TableCell>
                    <TableCell align='center' padding="none">{row.campaign_name}</TableCell>
                    <TableCell padding="none"><Button fullWidth onClick={() => moveToAdvancementSheet(row.id)}>Spend XP & Equip Gear </Button></TableCell>
                    <TableCell padding="none"><Button fullWidth variant='outlined' onClick={() => moveToShopSheet(row.id)}>Shopping </Button></TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>

    {/* <div>
      <h2>Character List</h2>
      {characterList.length ? (
        <>
          <p>My Characters:</p>
          {characterList.map((character) => {
            return (
              <div key={character.id}>
                <Grid container>
                  <Grid item xs={3} margin={3}><Button fullWidth variant='contained' onClick={() => moveToCharacterSheet(character.id)}>{character.handle}</Button></Grid>
                  <Grid item xs={2} margin={3}><Button fullWidth onClick={() => moveToAdvancementSheet(character.id)}>Spend XP & Equip Gear </Button></Grid>
                  <Grid item xs={2} margin={3}><Button fullWidth onClick={() => moveToShopSheet(character.id)}>Shopping </Button></Grid>
                </Grid>
              </div>
            )
          })}
        </>) : <></>}
    </div> */}
  </>
  );
}

export default CharacterList;
