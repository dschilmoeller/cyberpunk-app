import React, { useState } from 'react';
import { Grid } from '@mui/material';
import Item from '../Characters/CharacterSheet/Item';
import { TextField, Button } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

function CreationFirstSteps() {
    const dispatch = useDispatch()
    const charDetail = useSelector(store => store.characterCreation)
    const creationReviewReached = useSelector(store => store.characterCreation.creationReviewReached)

    const [handle, setHandle] = useState(charDetail.handle)
    const [player, setPlayer] = useState(charDetail.player)
    const [campaign, setCampaign] = useState(charDetail.campaign)
    const [campaignName, setCampaignName] = useState('')

    const campaignList = useSelector(store => store.campaigns)

    const selectCampaign = (value) => {
        setCampaign(value)
        campaignList.map(campaign => {
            if (value == campaign.campaign_id) {
                setCampaignName(campaign.campaign_name)
            }
        })
    }

    const handleSubmit = () => {
        event.preventDefault();
        const character = {
            handle,
            player,
            campaign,
            campaignName
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
                    {campaignList.length > 0 ? <Select
                        value={campaign}
                        fullWidth
                        onChange={e => selectCampaign(e.target.value)}>
                        {campaignList.map(campaign => {
                            return <MenuItem key={campaign.campaign_id} value={campaign.campaign_id}>{campaign.campaign_name}</MenuItem>
                        })}
                    </Select> : <></>}
                </Grid>

                <Grid item xs={12}>
                    <Item><Button variant='contained' type='submit'>Save Character Details</Button></Item>
                </Grid>

            </Grid>
        </form>
    </>)
}

export default CreationFirstSteps
