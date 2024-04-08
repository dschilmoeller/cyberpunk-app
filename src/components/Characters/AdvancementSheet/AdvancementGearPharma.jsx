import React, { useEffect, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { TextField, Button } from "@mui/material";
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

import Grid from '@mui/material/Grid';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';

import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function TransitionUp(props) {
    return <Slide {...props} direction="up" />;
}

export default function AdvancementPharma() {
    const charDetail = useSelector(store => store.characterDetail)
    const pharma = useSelector(store => store.characterGear.pharma)
    const masterPharma = useSelector(store => store.gearMaster.pharma)
    const dispatch = useDispatch();

    const [selectedPharma, setSelectedPharma] = useState('None Selected')
    const [pharmReagentCost, setPharmReagentCost] = useState(0)
    const [dosesToMake, setDosesToMake] = useState('')

    const setPharma = (pharm) => {
        setSelectedPharma(pharm);
        setPharmReagentCost(pharm.price / 2);
    }

    const setDoses = (doses) => {
        if (doses < 0) {
            setAlertText('Cannot make negative quantities of pharmaceuticals!')
            setShowSnackbar(true)
        } else if (doses % 1 != 0) {
            setAlertText('Cannot make partial pharmaceuticals!')
            setShowSnackbar(true)
        } else {
            setDosesToMake(doses)
        }
    }

    const createPharma = () => {
        if (selectedPharma === 'None Selected') {
            setAlertText('Select a pharmaceutical to craft!')
            setShowSnackbar(true)
        } else if (dosesToMake <= 0) {
            setAlertText('Please select a number of doses to make!')
            setShowSnackbar(true)
        } else {
            if (charDetail.bank >= pharmReagentCost) {
                let newBank = (charDetail.bank - pharmReagentCost)
                dispatch({
                    type: 'CREATE_PHARMA', payload: {
                        charID: charDetail.id,
                        pharmaID: selectedPharma.pharma_master_id,
                        doses: Math.floor(Number(dosesToMake)),
                        newBank
                    }
                })
                setDosesToMake('')
                setSelectedPharma('None Selected')
                setPharmReagentCost(0)
            } else {
                setAlertText('Insufficient funds!')
                setShowSnackbar(true)
            }
        }
    }

    const [showSnackbar, setShowSnackbar] = React.useState(false);
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });
    const [alertText, setAlertText] = React.useState('')

    const [expandedGearAccordion, setExpandedGearAccordion] = useState(false);
    const handleGearAccordionChange = (panel) => (event, newExpanded) => {
        setExpandedGearAccordion(newExpanded ? panel : false);
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
    const [orderBy, setOrderBy] = React.useState('name');

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    function createCharOtherData(char_pharma_bridge_id, char_id, description, name, price, rank) {
        return {
            char_pharma_bridge_id,
            char_id,
            description,
            name,
            price,
            rank
        }
    }

    const charOtherRows = []
    for (let i = 0; i < pharma.length; i++) {
        charOtherRows.push(createCharOtherData(pharma[i].char_pharma_bridge_id,
            pharma[i].char_id,
            pharma[i].description,
            pharma[i].name,
            pharma[i].price,
            pharma[i].rank))
    }

    // sort and monitor changes to charOtherRows in case of sales.
    const sortedCharOtherRows = React.useMemo(
        () =>
            stableSort(charOtherRows, getComparator(order, orderBy)),
        [order, orderBy, charOtherRows],
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
                {alertText}
            </Alert>
        </Snackbar>

        <Accordion disableGutters expanded={expandedGearAccordion === 'panel1'} onChange={handleGearAccordionChange('panel1')}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="armor-content"
                id="armor-panel-header"
            >
                <Typography>Owned Pharmaceuticals</Typography>
            </AccordionSummary>
            <AccordionDetails>
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
                                    {sortedCharOtherRows.map((row) => {
                                        return (
                                            <TableRow hover key={row.char_pharma_bridge_id}>
                                                <TableCell align='left'>{row.name}</TableCell>
                                                <TableCell align='left'>{row.description}</TableCell>
                                                <TableCell align='left'>{row.rank}</TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Box>

            </AccordionDetails>
        </Accordion>

        {charDetail.med_pharma > 0 ? (
            <>
                <h1>Create Pharmaceuticals</h1>
                <Paper sx={{ width: '100%', mb: 2 }}>
                    <Grid container>
                        <Grid display={'flex'} justifyContent={'center'} item xs={12}>
                            Crafting
                        </Grid>
                        <Grid display={'flex'} justifyContent={'center'} item xs={4}>
                            Selected Pharmaceutical: {selectedPharma.name}
                        </Grid>
                        <Grid display={'flex'} justifyContent={'center'} item xs={4}>
                            Quantity to make:
                            <TextField
                                label="Doses To Create"
                                onChange={e => setDoses(e.target.value)}
                                required
                                autoFocus
                                type='number'
                                value={dosesToMake}
                                fullWidth />
                        </Grid>
                        <Grid display={'flex'} justifyContent={'center'} item xs={4}>
                            Reagent Cost: {pharmReagentCost}
                        </Grid>
                        <Grid display={'flex'} justifyContent={'center'} item padding={2} xs={12}>
                            {selectedPharma != 'None Selected' ? <Button variant='contained' color='info' size='large' onClick={() => createPharma()}>
                                Craft Pharmaceuticals</Button> :
                                <Button variant='disabled' color='info' size='large'>Craft Pharmaceuticals</Button>}
                        </Grid>
                    </Grid>
                </Paper>
                <Box sx={{ width: '100%' }}>
                    <Paper sx={{ width: '100%', mb: 2 }}>
                        <TableContainer>
                            <Table
                                sx={{ minWidth: 750 }}
                                aria-labelledby="tableTitle"
                                size={'small'}
                            >
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Description</TableCell>
                                        <TableCell>Rank</TableCell>
                                        <TableCell>Select</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {masterPharma.map((row) => {
                                        if (charDetail.med_pharma >= row.rank) {

                                            return (
                                                <TableRow hover key={row.pharma_master_id}>
                                                    <TableCell sx={{ minWidth: 150 }}>{row.name}</TableCell>
                                                    <TableCell>{row.description}</TableCell>
                                                    <TableCell>{row.rank}</TableCell>
                                                    <TableCell><Button onClick={() => setPharma(row)}>Select</Button></TableCell>
                                                </TableRow>
                                            )
                                        }
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Box>
            </>) : <></>}
    </>)
}