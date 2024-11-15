import React from 'react';
import PropTypes from 'prop-types';
import { TableHead, TableRow, TableCell, TableSortLabel } from '@mui/material';
import { capitalizer } from '../../utils/funcs/funcs';

const headCellsGenerator = (IDs) => {
  let headCellsReturned = [];
  for (let i = 0; i < IDs.length; i++) {
    headCellsReturned.push({ id: IDs[i], label: capitalizer(IDs[i]), disablePadding: true, numeric: false });
  }
  return headCellsReturned;
};

const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};

const getComparator = (order, orderBy) => {
  return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
};

const stableSort = (array, comparator) => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
};

function EnhancedTableHead(props) {
  const { order, orderBy, setOrder, setOrderBy } = props;
  const createSortHandler = (property) => (event) => {
    handleRequestSort(event, property, order, setOrder, orderBy, setOrderBy);
  };

  return (
    <TableHead>
      <TableRow hover>
        {props.headCells.map((headCell) => (
          <TableCell key={headCell.id} align={'left'} padding={'normal'} sortDirection={orderBy === headCell.id ? order : false}>
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
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  setOrder: PropTypes.func.isRequired,
  setOrderBy: PropTypes.func.isRequired,
};

const handleRequestSort = (event, property, order, setOrder, orderBy, setOrderBy) => {
  const isAsc = orderBy === property && order === 'asc';
  setOrder(isAsc ? 'desc' : 'asc');
  setOrderBy(property);
};

export { getComparator, stableSort, EnhancedTableHead, headCellsGenerator, handleRequestSort };
