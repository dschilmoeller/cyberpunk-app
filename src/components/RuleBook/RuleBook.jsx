import { useState, useEffect } from 'react';

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import { useDispatch } from 'react-redux';

import RulebookIntroduction from './Introduction.jsx';
import RulebookAttSkills from './AttributesAndSkills.jsx';
import RulebookRoles from './Roles.jsx';
import RulebookGear from './Gear.jsx';
import RulebookCyberware from './Cyberware.jsx';
import RulebookNetrunner from './Netrunner.jsx';
import RulebookCombat from './ActionsCombat.jsx';
import RulebookInjuries from './InjuriesDying.jsx';
import RulebookVehicles from './Vehicles.jsx';
import Gameplay from './GamePlay.jsx';
import RulebookClothingLifestyle from './ClothingLifestyle.jsx';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        // This is applied to every tab panel.
        <Box sx={{ p: 1 }}>{children}</Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_MASTER_LISTS' });
  }, []);

  // handles tab changes
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: 'background.paper',
        display: 'flex',
        height: 1,
      }}
    >
      <Box position={'fixed'}>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Chapter Tabs"
          sx={{
            borderRight: 1,
            borderColor: 'divider',
            minWidth: '11rem',
            maxWidth: '11rem',
          }}
        >
          <Tab
            sx={{ alignItems: 'flex-start', textAlign: 'left' }}
            wrapped
            label="1 - Introduction"
            {...a11yProps(0)}
          />
          <Tab
            sx={{ alignItems: 'flex-start', textAlign: 'left' }}
            wrapped
            label="2 - Attributes and Skills"
            {...a11yProps(1)}
          />
          <Tab
            sx={{ alignItems: 'flex-start', textAlign: 'left' }}
            wrapped
            label="3 - Roles"
            {...a11yProps(2)}
          />
          <Tab
            sx={{ alignItems: 'flex-start', textAlign: 'left' }}
            wrapped
            label="4 - Gear"
            {...a11yProps(3)}
          />
          <Tab
            sx={{ alignItems: 'flex-start', textAlign: 'left' }}
            wrapped
            label="5 - Cyberware"
            {...a11yProps(4)}
          />
          <Tab
            sx={{ alignItems: 'flex-start', textAlign: 'left' }}
            wrapped
            label="6 - Netrunning"
            {...a11yProps(5)}
          />
          <Tab
            sx={{ alignItems: 'flex-start', textAlign: 'left' }}
            wrapped
            label="7 - Actions & Combat"
            {...a11yProps(6)}
          />
          <Tab
            sx={{ alignItems: 'flex-start', textAlign: 'left' }}
            wrapped
            label="8 - Injuries & Dying"
            {...a11yProps(7)}
          />
          <Tab
            sx={{ alignItems: 'flex-start', textAlign: 'left' }}
            wrapped
            label="9 - Vehicles"
            {...a11yProps(8)}
          />
          {/* <Tab sx={{ alignItems: 'flex-start', textAlign: 'left' }} wrapped label="10 - Clothing and Lifestyle" {...a11yProps(9)} />
          <Tab sx={{ alignItems: 'flex-start', textAlign: 'left' }} wrapped label="11 - Character Advancement" {...a11yProps(10)} />
          <Tab sx={{ alignItems: 'flex-start', textAlign: 'left' }} wrapped label="12 - Playing The Game" {...a11yProps(11)} /> */}
        </Tabs>
      </Box>

      <Box paddingLeft={'11rem'}>
        <TabPanel value={value} index={0}>
          <RulebookIntroduction />
        </TabPanel>

        <TabPanel value={value} index={1}>
          <RulebookAttSkills />
        </TabPanel>

        <TabPanel value={value} index={2}>
          <RulebookRoles />
        </TabPanel>

        <TabPanel value={value} index={3}>
          <RulebookGear />
        </TabPanel>

        <TabPanel value={value} index={4}>
          <RulebookCyberware />
        </TabPanel>

        <TabPanel value={value} index={5}>
          <RulebookNetrunner />
        </TabPanel>

        <TabPanel value={value} index={6}>
          <RulebookCombat />
        </TabPanel>

        <TabPanel value={value} index={7}>
          <RulebookInjuries />
        </TabPanel>

        <TabPanel value={value} index={8}>
          <RulebookVehicles />
        </TabPanel>

        <TabPanel value={value} index={9}>
          <RulebookClothingLifestyle />
        </TabPanel>

        <TabPanel value={value} index={11}>
          <Gameplay />
        </TabPanel>

        {/* Future site of Chargen */}

        {/* Future site of Character Advancement */}
      </Box>
    </Box>
  );
}
