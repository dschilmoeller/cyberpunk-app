import React, { useState } from 'react';
import { Grid } from '@mui/material';
import Item from '../Characters/CharacterSheet/Item';
import { TextField, Button } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import { Typography } from '@mui/material';

function CreationFirstSteps() {
    const dispatch = useDispatch()
    const charDetail = useSelector(store => store.characterCreation)

    const [handle, setHandle] = useState(charDetail.handle)
    const [player, setPlayer] = useState(charDetail.player)
    const [campaign, setCampaign] = useState(charDetail.campaign)
    const [role, setRole] = useState(charDetail.role)
    const [culture, setCulture] = useState(charDetail.culture)

    const campaigns = [
        { label: 'Gatti Ombre', id: 1 },
        { label: 'Test Campaign', id: 2 },
        { label: 'Just Fizz-Bizz', id: 3 }
    ]

    const handleSubmit = () => {
        event.preventDefault();
        const character = {
            handle,
            player,
            campaign,
            role,
            culture,
        }
        dispatch({ type: 'SET_CREATION_FIRST_STEPS', payload: character })
        dispatch({ type: 'SET_CREATION_STEP', payload: 'attributes' })
    }
    const instaFill = () => {
        setHandle('Mad Maxine')
        setPlayer('Schwami')
        setCampaign('Gatti Ombre')
        setRole('Missus Fixit')
        setCulture('Desert Traveler')
    }
    return (<>
        <h1>First Steps:</h1>
        <Button onClick={()=> instaFill()}>Instafill</Button>

        <form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={12} marginLeft={4} marginRight={4} marginBottom={1}>
                    <Item><Typography variant='subtitle1'>Handle: What is your character's Street Name?</Typography></Item>
                </Grid>
                <Grid item xs={12} marginLeft={4} marginRight={4} marginBottom={4}>
                    <TextField
                        label="Handle"
                        onChange={e => setHandle(e.target.value)}
                        required
                        type='text'
                        value={handle}
                        fullWidth
                        autoFocus
                    />
                </Grid>

                <Grid item xs={12} marginLeft={4} marginRight={4} marginBottom={1}>
                    <Item><Typography variant='subtitle1'>Player: Who is playing the character?</Typography></Item>
                </Grid>
                <Grid item xs={12} marginLeft={4} marginRight={4} marginBottom={4}>
                    <TextField
                        label="Player"
                        onChange={e => setPlayer(e.target.value)}
                        required
                        type='text'
                        value={player}
                        fullWidth
                    />
                </Grid>

                <Grid item xs={12} marginLeft={4} marginRight={4} marginBottom={1}>
                    <Item><Typography variant='subtitle1'>Campaign: What campaign is the character playing in?</Typography></Item>
                </Grid>
                <Grid item xs={12} marginLeft={4} marginRight={4} marginBottom={4}>
                    <TextField
                        label="Campaign"
                        onChange={e => setCampaign(e.target.value)}
                        required
                        type='text'
                        value={campaign}
                        fullWidth
                    />
                </Grid>

                <Grid item xs={12} marginLeft={4} marginRight={4} marginBottom={1}>
                    <Item><Typography variant='subtitle1'>Role: What is your character's function on the team?</Typography></Item>
                </Grid>
                <Grid item xs={12} marginLeft={4} marginRight={4} marginBottom={4}>
                    <TextField
                        label="Role"
                        onChange={e => setRole(e.target.value)}
                        required
                        type='text'
                        value={role}
                        fullWidth
                    />
                </Grid>

                <Grid item xs={12} marginLeft={4} marginRight={4} marginBottom={1}>
                    <Item><Typography variant='subtitle1'>Culture: What is your character's background?</Typography></Item>
                </Grid>
                <Grid item xs={12} marginLeft={4} marginRight={4} marginBottom={4}>
                    <TextField
                        label="Culture"
                        onChange={e => setCulture(e.target.value)}
                        required
                        type='text'
                        value={culture}
                        fullWidth
                    />
                </Grid>

                <Grid item xs={12}>
                    <Item><Button variant='contained' type='submit'>Save Character Details</Button></Item>
                </Grid>

            </Grid>
        </form>
    </>)
}

export default CreationFirstSteps
