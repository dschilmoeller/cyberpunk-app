import React from 'react';
import Grid from '@mui/material/Grid';
import { useSelector, useDispatch } from 'react-redux';
import Item from './Item';
import { Button, Typography } from '@mui/material';

import WeaponDialog from '../../Modals/WeaponDialog';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';


function TransitionUp(props) {
    return <Slide {...props} direction="up" />;
}

export default function WeaponsGrenades() {
    const charDetail = useSelector((store) => store.characterDetail)
    const charGrenades = useSelector((store) => store.characterGrenades)
    const dispatch = useDispatch();

    const [showSnackbar, setShowSnackbar] = React.useState(false);
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const useGrenade = (grenade) => {
        dispatch({ type: 'USE_GRENADE', payload: grenade })
        setShowSnackbar(true)
    }

    const grenadeRange = (charDetail.strength + charDetail.cyber_strength) * 5

    return (<>
        <Snackbar
            TransitionComponent={TransitionUp}
            autoHideDuration={2000}
            open={showSnackbar}
            onClose={() => setShowSnackbar(false)}
            anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
        >
            <Alert onClose={() => setShowSnackbar(false)} severity="error" sx={{ width: '100%' }}>
                Kaboom!
            </Alert>
        </Snackbar >

        <Grid container>
            <Grid item xs={12}><Item>Grenades</Item></Grid>
            {charGrenades.map(grenade => {

                return (
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
                )
            })}
        </Grid>
    </>)
}