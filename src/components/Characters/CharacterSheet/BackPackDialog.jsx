import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

import PropTypes from 'prop-types';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';


export default function BackPackDialog({ prop }) {
    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');

    const handleClickOpen = (scrollType) => () => {
        setOpen(true);
        setScroll(scrollType);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const dispatch = useDispatch();

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
            numeric: false,
            disablePadding: true,
            label: 'Description',
        },
        {
            id: 'consume',
            numeric: false,
            disablePadding: true,
            label: 'Consume?',
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
                <TableRow>
                    {headCells.map((headCell) => {
                        if (headCell.id != 'consume') {
                            return (
                                <TableCell
                                    key={headCell.id}
                                    align={'left'}
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
                                <TableCell key={headCell.id} align={'left'} padding={'normal'}>
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
    const [orderBy, setOrderBy] = React.useState('name');

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };


    // create charMiscGear data
    const charMiscGear = useSelector(store => store.characterMiscGear)
    function createMiscGearData(name, description, char_gear_bridge_id) {
        return {
            name, description, char_gear_bridge_id
        }
    }

    // take charMiscGear data and push into array for conversion into rows.
    const charMiscGearRows = []
    for (let i = 0; i < charMiscGear.length; i++) {
        charMiscGearRows.push(createMiscGearData(charMiscGear[i].name, charMiscGear[i].description, charMiscGear[i].char_gear_bridge_id))
    }

    const sortedcharMiscGearRows = React.useMemo(
        () =>
            stableSort(charMiscGearRows, getComparator(order, orderBy)),
        [order, orderBy, charMiscGear],
    );

    const edibleTest = (row) => {
        if (row.name === 'MRE' || row.name === 'Food Stick' || row.name === 'Kibble Pack') {
            return (<><TableCell align='center' padding="normal"><Button sx={{
                textTransform: 'none', backgroundColor: '#1A2027', color: 'white', '&:hover': {
                    backgroundColor: '#fff',
                    color: '#000',
                }
            }} fullWidth onClick={() => UseConsumable(row)}>Eat</Button></TableCell></>)
        } else if (row.name === 'Personal CarePak' || row.name === 'Vial of deadly poison' || row.name === 'Vial of biotoxin' || row.name === 'Glow Paint' || row.name === 'Glow Stick' || row.name === 'Memory Chip' || row.name === 'Road Flare'
        || row.name === 'Antibiotic' || row.name === 'Rapi-Detox' || row.name === 'Speedheal' || row.name === 'Stim' || row.name === 'Surge') {
            return (<TableCell align='center' padding="normal"><Button sx={{
                textTransform: 'none', backgroundColor: '#1A2027', color: 'white', '&:hover': {
                    backgroundColor: '#fff',
                    color: '#000',
                }
            }} fullWidth onClick={() => UseConsumable(row)}>Use</Button></TableCell>)
        } else {
            return (<TableCell padding="normal"></TableCell>)
        }
    }

    const UseConsumable = (foodstuff) => {
        dispatch({ type: 'USE_CONSUMABLE_FROM_PACK', payload: foodstuff })
    }

    return (
        <>
            <Button sx={{
                textTransform: 'none', backgroundColor: '#1A2027', backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))', color: 'white', '&:hover': {
                    backgroundColor: '#fff',
                    color: '#000',
                }
            }} fullWidth onClick={handleClickOpen('paper')}>{prop}</Button>
            <Dialog
                open={open}
                onClose={handleClose}
                scroll={scroll}
                maxWidth='lg'
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title">{prop}</DialogTitle>


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
                            {sortedcharMiscGearRows.map((row, i) => {
                                return (
                                    <TableRow hover key={i}>
                                        <TableCell padding="normal">{row.name}</TableCell>
                                        <TableCell padding="normal">{row.description}</TableCell>
                                        {edibleTest(row)}
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>


                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}