import React from 'react';
import Grid from '@mui/material/Grid';
import { useSelector, useDispatch } from 'react-redux';
import Item from './Item';
import { Button, Typography } from '@mui/material';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import CancelIcon from '@mui/icons-material/Cancel';

import OtherAttributesDialog from '../../Modals/OtherAttributesDialog';
import WeaponDialog from '../../Modals/WeaponDialog';

export default function WeaponsGrenades() {
    const charDetail = useSelector((store) => store.characterDetail)
    const charGrenades = useSelector((store) => store.characterGrenades)
    const dispatch = useDispatch();

    const useGrenade = (grenade) => {
        dispatch({type: 'USE_GRENADE', payload: grenade})
    }

    const grenadeRange = (charDetail.strength + charDetail.cyber_strength) * 5

    return (<>
        <Grid container>
            <Grid item xs={12}><Item>Grenades</Item></Grid>
            {charGrenades.map(grenade => {

                return (<>
                    <React.Fragment key={grenade.grenade_bridge_id}>
                        <Grid item xs={4} padding={1} >
                            <Grid container>
                                <Grid item xs={6}><Item><b>Name</b></Item></Grid>
                                <Grid item xs={6}><Item><b>Range: {grenadeRange}</b></Item></Grid>
                                <Grid item xs={6}><Item><WeaponDialog prop={grenade.name} /></Item></Grid>
                                <Grid item xs={6}><Item><Button onClick={() => useGrenade(grenade)}>Use</Button></Item></Grid>
                            </Grid>
                        </Grid>
                    </React.Fragment>
                </>)
            })}
        </Grid>
    </>)
}