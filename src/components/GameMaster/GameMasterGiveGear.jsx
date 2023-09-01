import * as React from 'react';
import Grid from '@mui/material/Grid';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import Item from '../Characters/CharacterSheet/Item';

import GMGiveArmor from './GameMasterGear/GMGiveArmor';
import GMGiveWeapons from './GameMasterGear/GMGiveWeapons';
import GMGiveGearOther from './GameMasterGear/GMGiveGearOther';
import GMGiveCyberware from './GameMasterGear/GMGiveCyberware';
import GMGiveNetrunnerMain from './GameMasterGear/GMGiveNetrunnerMain';
import GMGiveVehicles from './GameMasterGear/GMGiveVehicles';

export default function GameMasterGiveGear() {

    const [selectedGear, setSelectedGear] = React.useState('armor')
    const handleSelectedGearChange = (event, newValue) => {
        setSelectedGear(newValue)
    }

    return (<>
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
                    <GMGiveArmor />
                </Grid>
            </>) : <></>}

            {selectedGear === 'weapons' ? (<>
                <Grid item xs={12} padding={1}>
                    <GMGiveWeapons />
                </Grid>
            </>) : <></>}

            {selectedGear === 'misc' ? (<>
                <Grid item xs={12} padding={1}>
                    <GMGiveGearOther />
                </Grid>
            </>) : <></>}

            {selectedGear === 'cyberware' ? (<>
                <Grid item xs={12} padding={1}>
                    <GMGiveCyberware />
                </Grid>
            </>) : <></>}

            {selectedGear === 'netrunner' ? (<>
                <Grid item xs={12} padding={1}>
                    <GMGiveNetrunnerMain />
                </Grid>
            </>) : <></>}

            {selectedGear === 'vehicles' ? (<>
                <Grid item xs={12} padding={1}>
                    <GMGiveVehicles />
                </Grid>
            </>) : <></>}


        </Grid>
    </>)
}