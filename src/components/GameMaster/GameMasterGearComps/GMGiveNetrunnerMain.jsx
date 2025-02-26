import { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import GMGiveNetrunnerDeck from './GMGiveNetrunnerDeck';
import GMGiveNetrunnerMods from './GMGiveNetrunnerMods';
import GMGiveNetrunnerSoftware from './GMGiveNetrunnerSoftware';

// TODO
// reexamine this one - can probably be made more efficient.
export default function GMGiveNetrunnerMain({ charDetail, netrunnerMaster, setPageAlert, loading, setLoading }) {
  // Tab handlers
  const [selectedGearType, setSelectedGearType] = useState('software');
  const handleGearTypeSelect = (event, newValue) => {
    setSelectedGearType(newValue);
  };

  return (
    <>
      <h2>Give {charDetail.handle} Netrunner Gear</h2>

      <Tabs value={selectedGearType} onChange={handleGearTypeSelect} indicatorColor="primary" textColor="secondary">
        <Tab value="deck" label="Deck" />
        <Tab value="software" label="Software" />
        <Tab value="mod" label="Deck Mod" />
      </Tabs>

      {selectedGearType === 'deck' ? <GMGiveNetrunnerDeck netrunnerMaster={netrunnerMaster} /> : <></>}
      {selectedGearType === 'software' ? <GMGiveNetrunnerSoftware netrunnerMaster={netrunnerMaster} /> : <></>}
      {selectedGearType === 'mod' ? <GMGiveNetrunnerMods netrunnerMaster={netrunnerMaster} /> : <></>}
    </>
  );
}
