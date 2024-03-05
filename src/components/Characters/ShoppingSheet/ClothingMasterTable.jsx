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

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';

function TransitionUp(props) {
    return <Slide {...props} direction="up" />;
}
export default function ClothingMasterTable() {
    const dispatch = useDispatch()
    const clothingID = useSelector(store => store.advancementGear.clothingID)
    const clothesMaster = useSelector(store => store.gearMaster.clothing)

    const charDetail = useSelector((store) => store.advancementDetail)

    const euroBuck = `\u20AC$`

    const [showSnackbar, setShowSnackbar] = React.useState(false);
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const buyClothing = (item) => {
        let price;
        if (item.quality === 0) {
            price = 5;
        } else if (item.quality === 1) {
            price = 10 * (item.quality * item.quality) * 10
        } else if (item.quality === 2) {
            price = 10 * (item.quality * item.quality) * 20
        }

        if (charDetail.bank >= price) {
            let newBank = (charDetail.bank - price)
            dispatch({ type: 'BUY_ITEM', payload: { itemMasterID: item.clothing_master_id, newBank, charID: charDetail.id, table: 'char_clothing_bridge', column: 'clothing_id' } })
        }
        else {
            setShowSnackbar(true)
        }
    }

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
            label: 'Price',
        },
        {
            id: 'purchase',
            numeric: true,
            disablePadding: false,
            label: 'Purchase'
        }
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

    function createMasterClothingData(description, clothing_master_id, quality, name) {
        return {
            description,
            clothing_master_id,
            quality,
            name,
        }
    }

    // take master data and push into array for conversion into rows.
    const clothingMasterRows = []
    for (let i = 0; i < clothesMaster.length; i++) {

        clothingMasterRows.push(createMasterClothingData(
            clothesMaster[i].description,
            clothesMaster[i].clothing_master_id,
            clothesMaster[i].quality,
            clothesMaster[i].name,
        ));
    }

    // sort and monitor changes. 
    const sortedClothingMasterRows = React.useMemo(
        () =>
            stableSort(clothingMasterRows, getComparator(order, orderBy)),
        [order, orderBy, clothesMaster],
    );

    return (<>
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

        <h2>Buy Clothing</h2>
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
                            {sortedClothingMasterRows.map((row) => {
                                let price;
                                if (row.quality === 0) {
                                    price = 5;
                                } else if (row.quality === 1) {
                                    price = 10 * (row.quality * row.quality);
                                } else if (row.quality === 2) {
                                    price = 10 * (row.quality * row.quality) * 16
                                } else if (row.quality === 3) {
                                    price = 10 * (row.quality * row.quality) * 81
                                }
                                return (
                                    <TableRow hover key={row.name}>
                                        <TableCell align="left">{row.name}</TableCell>
                                        <TableCell align="center">{row.description}</TableCell>
                                        <TableCell align="center">{euroBuck}{Math.floor(price).toLocaleString("en-US")}</TableCell>
                                        <TableCell align="center"><Button variant='contained' color='success' onClick={() => buyClothing(row)}>Buy</Button></TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Box>
    </>)
}