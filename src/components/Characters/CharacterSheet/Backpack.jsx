import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TextField, Button } from "@mui/material";

import PropTypes from 'prop-types';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import { Grid } from '@mui/material';

import Item from './Item';
import CharacterSheetHeaderDialog from '../../Modals/CharacterSheetHeaderDialog';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';

function TransitionUp(props) {
    return <Slide {...props} direction="up" />;
}

export default function Backpack() {
    const characterDetail = useSelector(store => store.characterDetail)
    const dispatch = useDispatch();

    const euroBuck = `\u20AC$`

    const [showSnackbar, setShowSnackbar] = React.useState(false);
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const [showSnackSnackBar, setShowSnackSnackBar] = React.useState(false);

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
                <TableRow hover>
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
                                <TableCell key={headCell.id}
                                    align={'left'}
                                    padding={'normal'}
                                >
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
    const charMiscGear = useSelector(store => store.characterGear.gear)
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
            let isFood = true
            return (<><TableCell align='center' padding="normal">
                <Button sx={{
                    textTransform: 'none', backgroundColor: '#1A2027', color: 'white', '&:hover': {
                        backgroundColor: '#fff',
                        color: '#000',
                    }
                }}
                    fullWidth
                    onClick={() => UseConsumable(row, isFood)}>Eat</Button></TableCell></>)
        } else if (row.name === 'Personal CarePak' || row.name === 'Vial of deadly poison' || row.name === 'Vial of biotoxin' || row.name === 'Glow Paint' || row.name === 'Glow Stick' || row.name === 'Memory Chip' || row.name === 'Road Flare'
            || row.name === 'Antibiotic' || row.name === 'Rapi-Detox' || row.name === 'Speedheal' || row.name === 'Stim' || row.name === 'Surge' || row.name === 'Hotel Soap') {
            return (<TableCell align='center' padding="normal">
                <Button sx={{
                    textTransform: 'none', backgroundColor: '#1A2027', color: 'white', '&:hover': {
                        backgroundColor: '#fff',
                        color: '#000',
                    }
                }}
                    fullWidth
                    onClick={() => UseConsumable(row)}>Use</Button></TableCell>)
        } else {
            return (<TableCell padding="normal"></TableCell>)
        }
    }

    const UseConsumable = (foodstuff, isFood) => {
        dispatch({ type: 'USE_CONSUMABLE_FROM_PACK', payload: foodstuff })
        if (isFood === true) {
            setShowSnackSnackBar(true)
        }
    }

    // arbitrary money changes:
    const [bankChange, setBankChange] = React.useState(0)

    const addMoney = (change) => {
        if ((change) > 0 && change < 10000) {
            dispatch({ type: 'ARBITRARY_BANK_CHANGE', payload: parseFloat(characterDetail.bank) + parseFloat(change) })
            dispatch({ type: "SAVE_CHARACTER_BANK", payload: { charID: characterDetail.id, newBank: (parseFloat(characterDetail.bank) + parseFloat(change)) } })
            setBankChange(0)
        } else {
            setShowSnackbar(true)
        }
    }

    const spendMoney = (change) => {
        if ((change) > 0 && change < 10000) {
            dispatch({ type: 'ARBITRARY_BANK_CHANGE', payload: parseFloat(characterDetail.bank) - parseFloat(change) })
            dispatch({ type: "SAVE_CHARACTER_BANK", payload: { charID: characterDetail.id, newBank: (parseFloat(characterDetail.bank) - parseFloat(change)) } })
            setBankChange(0)
        } else {
            setShowSnackbar(true)
        }
    }

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
                    None of that nonsense now!
                </Alert>
            </Snackbar>

            <Snackbar
                TransitionComponent={TransitionUp}
                autoHideDuration={2000}
                open={showSnackSnackBar}
                onClose={() => setShowSnackSnackBar(false)}
                anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
            >
                <Alert onClose={() => setShowSnackSnackBar(false)} severity="success" sx={{ width: '100%' }}>
                    NOM NOM NOM!
                </Alert>
            </Snackbar>
            <Grid container>
                <Grid item xs={12} paddingBottom={4}>
                    <Item><CharacterSheetHeaderDialog prop={'Backpack'} /></Item>
                </Grid>
            </Grid>

            <Grid container>
                <Grid item xs={6} display={'flex'} alignItems={'center'} justifyContent={'center'}>Bank: {euroBuck}{characterDetail.bank.toLocaleString("en-US")}</Grid>
                {/* <Grid item xs={2} /> */}
                <Grid item xs={2} display={'flex'} justifyContent={'center'}><Button variant='contained' color='error' fullWidth onClick={() => spendMoney(bankChange)}>Spend Eddies</Button></Grid>
                {/* <Grid item xs={2} /> */}

                {/* <Grid item xs={8} /> */}
                <Grid item xs={2} display={'flex'} justifyContent={'center'}><TextField
                    label="Add/Remove Amount"
                    onChange={e => setBankChange(e.target.value)}
                    required
                    type='number'
                    value={bankChange}
                    fullWidth
                />
                </Grid>
                {/* <Grid item xs={2} /> */}

                {/* <Grid item xs={8} /> */}
                <Grid item xs={2} display={'flex'} justifyContent={'center'}><Button variant='contained' color='success' fullWidth onClick={() => addMoney(bankChange)}>Gain Eddies</Button></Grid>

                {/* <Grid item xs={2} /> */}
            </Grid>

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
        </>
    )
}