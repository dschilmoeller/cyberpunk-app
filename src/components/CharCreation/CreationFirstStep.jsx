import React, { useState } from 'react';
import { Grid } from '@mui/material';
import Item from '../Characters/CharacterSheet/Item';
import { TextField, Button } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import Typography from '@mui/material/Typography';


function CreationFirstSteps() {
    const dispatch = useDispatch()
    const charDetail = useSelector(store => store.characterCreation)
    const creationReviewReached = useSelector(store => store.characterCreation.creationReviewReached)

    const [handle, setHandle] = useState(charDetail.handle)
    const [player, setPlayer] = useState(charDetail.player)
    const [campaign, setCampaign] = useState(charDetail.campaign)

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
        }
        
        dispatch({ type: 'SET_CREATION_FIRST_STEPS', payload: character })

        if (creationReviewReached === false) {
            dispatch({ type: 'SET_CREATION_STEP', payload: 'attributes' })
        } else {
            dispatch({ type: 'SET_CREATION_STEP', payload: 'review' })
        }
    }
    // quick fill for faster demo/testing purposes.
    // const instaFill = () => {
    //     setHandle('Mad Maxine')
    //     setPlayer('Schwami')
    //     setCampaign('Gatti Ombre')
    // }
    return (<>
        <Grid container display={'flex'} justifyContent={'center'} spacing={1}>
            <Grid item padding={3} xs={12}><Item sx={{ height: 1 }}><Typography variant='h4'>First Steps</Typography></Item></Grid>
        </Grid>

        {/* <Button onClick={()=> instaFill()}>Instafill</Button> */}

        <form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={12} marginLeft={4} marginRight={4} marginBottom={1}>
                    <Item><Typography variant='h5'>Handle</Typography></Item>
                    <Item><Typography variant='subtitle1'>What is your character's Street Name?</Typography></Item>
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
                    <Item><Typography variant='h5'>Player</Typography></Item>
                    <Item><Typography variant='subtitle1'>Who is playing the character?</Typography></Item>
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
                    <Item><Typography variant='h5'>Campaign</Typography></Item>
                    <Item><Typography variant='subtitle1'>What campaign is the character playing in?</Typography></Item>
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

                <Grid item xs={12}>
                    <Item><Button variant='contained' type='submit'>Save Character Details</Button></Item>
                </Grid>

            </Grid>
        </form>
    </>)
}

export default CreationFirstSteps
