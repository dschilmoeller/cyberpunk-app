import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button } from '@mui/material';

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

import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';


export default function GameMasterLanding() {
    const dispatch = useDispatch();
    const history = useHistory()

    const characterList = useSelector((store) => store.characterList);

    const euroBuck = `\u20AC$`

    useEffect(() => {
        dispatch({ type: "FETCH_GM_CHARACTERS" })
        dispatch({ type: "FETCH_CAMPAIGNS" })
    }, [])

    const commaTizer = (incoming) => {
        if (incoming === undefined) {
            return 0
        } else {
            return incoming.toLocaleString()
        }
    }

    const campaignList = useSelector(store => store.campaigns)
    const [campaign, setCampaign] = useState(0)
    const [campaignName, setCampaignName] = useState('')

    const changeCampaign = (value) => {
        if (value == 0) {
            setCampaignName('All Campaigns')
            setCampaign(value)
        } else {
            campaignList.map(campaign => {
                {
                   if (value == campaign.campaign_id) {
                       setCampaignName(campaign.campaign_name)
                   }
                   setCampaign(value)
               }
           })
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
        // these ids have to match the object keys to sort properly.
        {
            id: 'handle',
            numeric: false,
            disablePadding: true,
            label: 'Handle',
        },
        {
            id: 'player',
            numeric: true,
            disablePadding: false,
            label: 'Player',
        },
        {
            id: 'perception',
            numeric: true,
            disablePadding: false,
            label: 'Cool + Perception',
        },
        {
            id: 'reflexes',
            numeric: true,
            disablePadding: false,
            label: 'Reflexes',
        },
        {
            id: 'humanityLoss',
            numeric: true,
            disablePadding: false,
            label: 'Humanity Remaining',
        },
        {
            id: 'availableExp',
            numeric: true,
            disablePadding: false,
            label: 'Available XP',
        },
        {
            id: 'bank',
            numeric: false,
            disablePadding: false,
            label: 'Bank',
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
                    {headCells.map((headCell) => (
                        <TableCell
                            key={headCell.id}
                            align={headCell.numeric ? 'center' : 'center'}
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

    function createTableData(id, handle, player, campaign, perception, reflexes, humanityLoss, availableExp, bank) {
        return {
            id,
            handle,
            player,
            campaign,
            perception,
            reflexes,
            humanityLoss,
            availableExp,
            bank
        }
    }

    const characterDataRows = []

    for (let i = 0; i < characterList.length; i++) {
        let perc = characterList[i].cool + characterList[i].cyber_cool + characterList[i].perception
        let totalReflexees = characterList[i].reflexes + characterList[i].cyber_reflexes
        let remainingHumanity = 40 - characterList[i].perm_humanity_loss - characterList[i].temp_humanity_loss
        let availableExp = characterList[i].max_xp - characterList[i].spent_xp

        // return finalized weapon data (allows range and damage to sort properly)
        characterDataRows.push(createTableData(
            characterList[i].id,
            characterList[i].handle,
            characterList[i].player,
            characterList[i].campaign,
            perc,
            totalReflexees,
            remainingHumanity,
            availableExp,
            characterList[i].bank
        ))
    }

    // sort and monitor changes. 
    const sortedCharacterListRows = React.useMemo(
        () =>
            stableSort(characterDataRows, getComparator(order, orderBy)),
        [order, orderBy, characterList],
    );

    return (<>

        <Grid container>
            <Grid item xs={12}><h2>Select Campaign</h2></Grid>
            <Grid item xs={12} marginRight={2}>
                <Select
                    value={campaign}
                    fullWidth
                    onChange={e => changeCampaign(e.target.value)}>
                    {<MenuItem key={0} value={0}>All Campaigns</MenuItem>}
                    {campaignList.map(campaign => {
                        return <MenuItem key={campaign.campaign_id} value={campaign.campaign_id}>{campaign.campaign_name}</MenuItem>
                    })}
                </Select>
            </Grid>
        </Grid>

        <h2>Select Character to Review</h2>

        {characterList.length ? (<>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <EnhancedTableHead
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={handleRequestSort}
                    />

                    {sortedCharacterListRows.map(character => {
                        if (character.campaign == campaign || campaign == 0) {
                        return (<React.Fragment key={character.id}>
                            <TableBody>
                                <TableRow hover>
                                    <TableCell align="center"><Button fullWidth variant='contained' sx={{ m: 1 }} onClick={() => history.push(`/gamemastersheet/${character.id}`)}>{character.handle}</Button></TableCell>
                                    <TableCell align="center">{character.player}</TableCell>
                                    <TableCell align="center">{character.perception}</TableCell>
                                    <TableCell align="center">{character.reflexes}</TableCell>
                                    <TableCell align="center">{character.humanityLoss}</TableCell>
                                    <TableCell align="center">{character.availableExp}</TableCell>
                                    <TableCell align="center">{euroBuck}{commaTizer(character.bank)}</TableCell>
                                </TableRow>
                            </TableBody>
                        </React.Fragment>)
                        }
                    })}
                </Table>
            </TableContainer>
        </>) : <></>}
    </>)
}