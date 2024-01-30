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

import GameMasterContactEdit from '../Modals/GameMasterContactEdit';

export default function GameMasterContacts() {
    const dispatch = useDispatch();

    const campaignList = useSelector(store => store.campaigns)
    const contactList = useSelector(store => store.contactMaster)
    const characterList = useSelector(store => store.characterList)

    useEffect(() => {
        dispatch({ type: "FETCH_GM_CHARACTERS" })
        dispatch({ type: "FETCH_CAMPAIGNS" })
        dispatch({ type: "FETCH_GM_CONTACTS" })
    }, [])

    // these need to be inside functions called within render in order to not break rules of hooks in React.
    // state is going to be an issue if doing these individually. Need to map a master, then render new subcomponents to do this on the main page.
    // otherwise have to do them in the pop up. Probs better.


    // const [character, setCharacter] = useState(0);
    // const [characterName, setCharacterName] = useState('');

    return (
        <>
            <Grid container spacing={1}>
                <Grid item xs={12} margin={2}><GameMasterContactEdit prop={'new'} /></Grid>

                {contactList.map(contact => {
                    return (<React.Fragment key={contact.contact_master_id}>
                        <Grid item xs={5.75} marginLeft={2.5} padding={1} border={'solid gray'}>
                            <Grid item xs={12}>Name: {contact.name}</Grid>
                            <Grid item xs={12}>Connection: {contact.connection}</Grid>
                            <Grid item xs={12}>Description: {contact.description}</Grid>
                            <Grid item xs={12}><GameMasterContactEdit prop={contact} /></Grid>
                        </Grid>
                    </React.Fragment>
                    )
                })}
            </Grid>
        </>
    )
}