import { useState} from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import NetrunnerMasterTableDeck from './NetrunnerMasterTableDeck';
import NetrunnerMasterTableSoftware from './NetrunnerMasterTableSoftware';
import NetrunnerMasterTableMods from './NetrunnerMasterTableMods';

export default function NetrunnerMasterTable() {

    // Tab handlers
    const [selectedGearType, setSelectedGearType] = useState('software')
    const handleGearTypeSelect = (event, newValue) => {
        setSelectedGearType(newValue)
    }

    return (<>
        <h2>Buy Netrunner Gear</h2>

        <Tabs
            value={selectedGearType}
            onChange={handleGearTypeSelect}
            indicatorColor='primary'
            textColor='secondary'>
            <Tab value='deck' label='Deck' />
            <Tab value='software' label='Software' />
            <Tab value='mod' label='Deck Mod' />
        </Tabs>
        {/* Decks
            <TableCell align="center">{row.slots}</TableCell>
            <TableCell align="center">{Math.floor(row.slots / 3)}</TableCell> */}
        {/* software */}

        {selectedGearType === 'deck' ? <NetrunnerMasterTableDeck /> : <></>}
        {selectedGearType === 'software' ? <NetrunnerMasterTableSoftware /> : <></>}
        {selectedGearType === 'mod' ? <NetrunnerMasterTableMods /> : <></>}

    </>)
}