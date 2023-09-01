import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import Grid from '@mui/material/Grid';
import Item from '../Characters/CharacterSheet/Item';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';

import GMOwnedArmor from './GameMasterGear/GMOwnedArmor';
import GMOwnedWeapons from './GameMasterGear/GMOwnedWeapons';
import GMOtherOwned from './GameMasterGear/GMOwnedGearOther';
import GMOwnedCyberware from './GameMasterGear/GMOwnedCyberware';
import GMOwnedNetrunner from './GameMasterGear/GMOwnedNetrunner';
import GMOwnedVehicles from './GameMasterGear/GMOwnedVehicles';

function TransitionUp(props) {
    return <Slide {...props} direction="up" />;
}

export default function GameMasterOwnedGear() {
    const [selectedGear, setSelectedGear] = useState('armor')
    const handleSelectedGearChange = (event, newValue) => {
        setSelectedGear(newValue)
    }

    const dispatch = useDispatch();

    const [showSnackbar, setShowSnackbar] = React.useState(false);
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    return (<>

        <Snackbar
            TransitionComponent={TransitionUp}
            autoHideDuration={2000}
            open={showSnackbar}
            onClose={() => setShowSnackbar(false)}
            anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
        >
            <Alert onClose={() => setShowSnackbar(false)} severity="warning" sx={{ width: '100%' }}>
                Can't make selected change!
            </Alert>
        </Snackbar >

        <Grid container paddingTop={3} spacing={3} alignContent={'center'}>

            <Grid item xs={12} padding={3}>
                <Item>
                    <Tabs
                        value={selectedGear}
                        onChange={handleSelectedGearChange}
                        indicatorColor='primary'
                        textColor='secondary'>
                        <Tab value='armor' label='Armor' />
                        <Tab value='weapons' label='Weapons' />
                        <Tab value='misc' label='Misc Gear' />
                        <Tab value='cyberware' label='Cyberware' />
                        <Tab value='netrunner' label='Netrunner' />
                        <Tab value='vehicles' label='Vehicles' />
                    </Tabs>
                </Item>
            </Grid>

            {selectedGear === 'armor' ? (<>
                <Grid item xs={12} padding={1}>
                    <GMOwnedArmor />
                </Grid>
            </>) : <></>}

            {selectedGear === 'weapons' ? (<>
                <Grid item xs={12} padding={1}>
                    <GMOwnedWeapons />
                </Grid>
            </>) : <></>}

            {selectedGear === 'misc' ? (<>
                <Grid item xs={12} padding={1}>
                    <GMOtherOwned />
                </Grid>
            </>) : <></>}

            {selectedGear === 'cyberware' ? (<>
                <Grid item xs={12} padding={1}>
                    <GMOwnedCyberware />
                </Grid>
            </>) : <></>}

            {selectedGear === 'netrunner' ? (<>
                <Grid item xs={12} padding={1}>
                    <GMOwnedNetrunner />
                </Grid>
            </>) : <></>}

            {selectedGear === 'vehicles' ? (<>
                <Grid item xs={12} padding={1}>
                    <GMOwnedVehicles />
                </Grid>
            </>) : <></>}



            <Grid item xs={12}>
                <Grid container spacing={1}>
                    <Grid item xs={12}>Hooboy...</Grid>

                </Grid>
            </Grid>
        </Grid >
    </>)
}
