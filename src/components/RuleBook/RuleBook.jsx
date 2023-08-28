import { useState, useEffect, Fragment } from 'react';

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Item from '../Characters/CharacterSheet/Item.jsx'
import AttributesDialog from '../Modals/AttributesDialog'
import SkillsDialog from '../Modals/SkillsDialog.jsx';
import RoleAbilitiesDialog from '../Modals/RoleAbilitiesDialog.jsx'
import CharSheetWeaponDialog from '../Modals/CharSheetWeaponDialog.jsx'

import { useSelector, useDispatch } from 'react-redux';

// accordion showings for various rule sets
// sub-accordians for e.g. roles, individual skills, etc.
// tables for some data.
// FAQ section.
// 

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
        <Box sx={{ p: 1 }}>
          {children}
        </Box>
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

  // pulling gear tables - can probably be made into its own component to improve efficiency.
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "FETCH_ARMOR_LIST" })
    dispatch({ type: "FETCH_SHIELD_LIST" })
    dispatch({ type: "FETCH_WEAPON_LIST" })
    dispatch({ type: "FETCH_MISC_GEAR_LIST" })
    dispatch({ type: "FETCH_CYBERWARE_LIST" })
    dispatch({ type: "FETCH_NETRUNNER_LIST" })
  }, [])
  const armorMaster = useSelector(store => store.armorMaster)
  const shieldMaster = useSelector(store => store.shieldMaster)
  const weaponMaster = useSelector(store => store.weaponMaster)
  const miscGearMaster = useSelector(store => store.miscGearMaster)
  const cyberwareMaster = useSelector(store => store.cyberwareMaster)
  const netrunnerMaster = useSelector(store => store.netrunnerGearMaster)

  // handles tab changes
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // handles accordion changes
  const [expandedAccordion, setExpandedAccordion] = useState(false);
  const handleAccordionChange = (panel) => (event, newExpanded) => {
    setExpandedAccordion(newExpanded ? panel : false);
  };

  // handles gear accordions
  const [expandedGearAccordion, setExpandedGearAccordion] = useState(false);
  const handleGearAccordionChange = (panel) => (event, newExpanded) => {
    setExpandedGearAccordion(newExpanded ? panel : false);
  };

  // handles cyberware accordion
  const [expandedCyberwareAccordion, setExpandedCyberwareAccordion] = useState(false);
  const handleCyberwareAccordionChange = (panel) => (event, newExpanded) => {
    setExpandedCyberwareAccordion(newExpanded ? panel : false);
  }
  // handles cyberware tabs
  const [cyberwareValue, setCyberwareValue] = useState('fashionware');
  const handleCyberwareValueChange = (event, newValue) => {
    setCyberwareValue(newValue);
  }

  // handles netrunner accordion
  const [expandedNetrunnerAccordion, setNetrunnerExpandedAccordion] = useState(false);
  const handleNetrunnerAccordionChange = (panel) => (event, newExpanded) => {
    setNetrunnerExpandedAccordion(newExpanded ? panel : false);
  }
  // handles netrunner tabs
  const [netrunnerValue, setNetrunnerValue] = useState('deck');
  const handleNetrunnerValueChange = (event, newValue) => {
    setNetrunnerValue(newValue);
  }

  // handles combat accordions
  const [expandedCombatAccordion, setExpandedCombatAccordion] = useState(false);
  const handleCombatAccordionChange = (panel) => (event, newExpanded) => {
    setExpandedCombatAccordion(newExpanded ? panel : false);
  }

  // marker special characters
  const stunMarker = `\u2736`;
  const lethalMarker = `\uFE45`;
  const aggMarker = `\u2718`;
  const euroBuck = `\u20AC$`

  return (
    <Box
      sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 1 }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Chapter Tabs"

        sx={{ borderRight: 1, borderColor: 'divider', minWidth: '11rem', maxWidth: '11rem' }}
      >
        <Tab sx={{ alignItems: 'flex-start', textAlign: 'left' }} wrapped label="1 - Introduction" {...a11yProps(0)} />
        <Tab sx={{ alignItems: 'flex-start', textAlign: 'left' }} wrapped label="2 - Attributes and Skills" {...a11yProps(1)} />
        <Tab sx={{ alignItems: 'flex-start', textAlign: 'left' }} wrapped label="3 - Roles" {...a11yProps(2)} />
        <Tab sx={{ alignItems: 'flex-start', textAlign: 'left' }} wrapped label="4 - Gear" {...a11yProps(3)} />
        <Tab sx={{ alignItems: 'flex-start', textAlign: 'left' }} wrapped label="5 - Cyberware" {...a11yProps(4)} />
        <Tab sx={{ alignItems: 'flex-start', textAlign: 'left' }} wrapped label="6 - Netrunning" {...a11yProps(5)} />
        <Tab sx={{ alignItems: 'flex-start', textAlign: 'left' }} wrapped label="7 - Actions & Combat" {...a11yProps(6)} />
        <Tab sx={{ alignItems: 'flex-start', textAlign: 'left' }} wrapped label="8 - Injuries & Dying" {...a11yProps(7)} />
        <Tab sx={{ alignItems: 'flex-start', textAlign: 'left' }} wrapped label="9 - Vehicles" {...a11yProps(8)} />
        <Tab sx={{ alignItems: 'flex-start', textAlign: 'left' }} wrapped label="10 - Character Generation" {...a11yProps(9)} />
        <Tab sx={{ alignItems: 'flex-start', textAlign: 'left' }} wrapped label="11 - Character Advancement" {...a11yProps(10)} />
      </Tabs>

      <TabPanel value={value} index={0}>
        <Grid container spacing={1} padding={1}>
          <Grid item xs={12}><Typography variant='h4'>Introduction</Typography></Grid>
          <Grid item xs={12}><Typography variant='p'>Cyberpumpkin is an adaptation of the Cyberpunk game. It is a role playing game aimed at an incredibly specific group of people, and is not in anyway a commercial product or object. The core rules are based on the World of Darkness d10 system, while the bulk of the content is derived from the core Cyberpunk game. As this ruleset is not aimed at the general public; the core concepts of TTRPGs are not going to be elaborated on, and many parts pertaining only to the GM are not going to appear on this page.</Typography></Grid>
          <Grid item xs={12}><Typography variant='h4'>Core Concepts: Dice Rolling</Typography></Grid>
          <Grid item xs={12}><Typography variant='p'>Generally, the GM will tell players when to roll dice, and provide three pieces of information: the Parameters of the roll, the Type of roll is happening, and the Difficulty Value.</Typography></Grid>
          <Grid item xs={12}><Typography variant='h6'>Roll Parameters & Die Pool</Typography></Grid>
          <Grid item xs={12}><Typography variant='p'>Most rolls will consist of one or two parameters. Typically, this is an Attribute + something else, such as a skill, role ability, or other stat. The combination of a character's score in the Parameters is the number of 10 sided dice they can roll. This is commonly referred to as a Player's <b>Die Pool</b>.</Typography></Grid>
          <Grid item xs={12}><Typography variant='h6'>Roll Type</Typography></Grid>
          <Grid item xs={12}><Typography variant='p'>Rolls have two primary types: Simple and Contested. A Simple roll requires a Player to score one or more successes. A Contested roll requires a Player to score <b>more</b> successes than their opponent. Most rolls are simple outside of combat, sneaking around, and lying.</Typography></Grid>
          <Grid item xs={12}><Typography variant='h6'>Difficulty Value (DV)</Typography></Grid>
          <Grid item xs={12}><Typography variant='p'>The Difficulty Value (commonly abbreviated to DV throughout this ruleset and website) is the target on a 10 sided die roll. The 'default' difficulty value is 6. Many tasks have a higher difficulty value - 7 representing something harder than average, 9 being extremely challenging. For math reasons, a DV of 10 is not used - see Glitching and Botching, below. Likewise, some tasks are easier than others - 5 being quite simple, and 4 being the lowest a difficulty value should go - lower than that and its really not worth rolling in most cases.</Typography></Grid>
          <Grid item xs={12}><Typography variant='h6'>Succeeding, Glitching and Botching</Typography></Grid>
          <Grid item xs={12}><Typography variant='p'>While rolling their die pool, any dice a Player rolls that come up equal to or higher than the Difficulty Value is called a 'success' or 'hit'. However, any dice that comes up as a 1 is called a 'glitch die', 'botch die', or a '#$%*ing 1'. In any case, both successes and 1s are totaled up.</Typography></Grid>
          <Grid item xs={12}><Typography variant='p'>In a Simple roll, a player simply needs more successes than 1s to succeed. In this instance, if the player has gotten no successes and no 1s, they have simply failed at whatever they are doing. If they have more successees than 1s, they have succeeded at their task (most likely - some tasks require more than one success to achieve). If they have rolled some number of successes and an EQUAL number of 1s, the player has made a 'glitch' - they've technically succeeded, but something has gone awry - the GM is encouraged to be inventive. If their roll has MORE 1s than successes, they have Botched - not only have they failed, something else has gone wrong. Finally, if they roll and manage to score NO successes and at least one 1, they have Critically Botched - not only did they fail, but something is about to go about as wrong as humanly possible.</Typography></Grid>
          <Grid item xs={12}><Typography variant='p'>In a Contested roll, things are similar - the player wants to roll as many hits as possible and avoid 1s. The key difference is that they may need more than 1 success - the number is determined by how many successes their opponent got on their roll.</Typography></Grid>
          <Grid item xs={12}>
            <Typography variant='p'><i>Examples:</i></Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant='p'><i>Simple Roll: Tahei is trying to find a place to crash on the streets. The GM determines the Parameters of the roll to be Intelligence & Streetwise. Tahei's player consults his sheet, and notes his total - 5 dice. As he is in a relatively decent part of town, the GM declares it is a Simple roll against the standard DV (6). Tahei rolls 5 dice, and gets 1, 3, 6, 7, and 10. That's 3 hits and 1 glitch; Tahei has successfully found an unattended nook and can sleep undisturbed.</i></Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant='p'><i>Contested Roll: Ace is trying to charm a bouncer into letting them into a Nightclub without paying the cover. The GM determines the bouncer is going to be difficult about it. The parameters are Cool + Fast Talk, which happens to be Ace's specialty - they roll a whopping 8 dice. The bouncer will be rolling Willpower + Streetwise, with a pool of 4 dice. However, Ace's DV is 7 - this is not an easy thing they're doing; while the bouncer's is only 5 - denying people entry is about half of what they do. Ace gets 1,1,3,5,6,8,8,9 - only 3 successes. The bouncer gets a 2,3,5,7 - A total of 2 successes. Ace manages to talk the bouncer into letting them into the club.</i></Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant='p'><i>Glitched Roll: Mad Maxine is trying sneak past a group of Gangers she owes money to. The GM determines the Parameters of the roll to be Reflexes + Stealth. Maxine consults her sheet, notes the total - only 3 dice. Thankfully, the Gangers aren't very alert. Rather than making a contested roll, the GM decides this is easier to handle with a simple roll at DV 5. Maxine rolls a 1, 2, 5 - a glitch. She manages to sneak past the Gangers, but can't help but dropping one of her trademark purple and red glowsticks on the path behind them. The gangers soon know she was in the area, and are going to be looking for her.</i></Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant='p'><i>Botched Roll: Dr Chill has been kidnapped and is forced to perform a heart transplant on a Tyger Claw boss. The GM decides this will be an extended contested roll - the Dr needs to get 5 successes, but can roll Technique + Surgery as many times as it requires, with each roll representing an hour of surgery. His DV is 9, however - the task is extremly challenging. Dr Chill gets to it, rolling a 1, 2, 7, 9, and 10 - he's got 1 glitch and 2 successes. Great start. Shortly, he makes another roll, and gets 1, 1, 2, 4, 6. Consulting his chart, the Dr realizes he has 3 botches and 2 successes - in an extended roll or a standard one, this ends his activity in abject failure, and in this case the patient expires messily. This was, however, a Botch - not only is the patient dead, but (the GM thinks fast here!) another Doctor has just arrived with a Tyger Claw's lieutenant. The lieutenant recognizes Dr Chill as the son of a man the Boss and Lieutenant executed all those years ago, and demands the other doctor investigate the Boss' death. Sure enough - Dr Chill is an extremely talented, #1 surgeon, and has a Die Pool of 8 for the task he was performing, but only used 5 dice per roll! He killed the Boss intentionally - things are looking quite bad for Dr Chill...</i> Side Note: In the text, this challenge would be written as 'DV9 (5+).'</Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant='p'>
              Grid vs Narrative play - Cyberpumpkin can be played on a game mat; in which case events are more regulated and movement, range, and the like are easier to comprehend. Narrative play is more free-form, and puts more of an onus on the GM to describe and track what's going on; that being said it doesn't require as much prep and is faster and less tactical.
            </Typography>
          </Grid>

        </Grid>
      </TabPanel>

      <TabPanel value={value} index={1}>
        <Grid container spacing={1} padding={1}>
          <Grid item xs={12}><Typography variant='h4'>Attributes</Typography></Grid>
          <Grid item xs={12}><Typography variant='p'>Attributes are the core statistics of your character, and define major parts of their presence and attitude. A bodybuilder with vanadium skin and a genius with hollow bones are going to approach the world very differently.</Typography></Grid>
          <Grid item xs={12}><Typography variant='p'>Attributes are divided into physical, social, and mental groups, and are rated from 1-5. Some attributes can be improved past these limits with cyberware, particularly physical skills, while some others require have a...different path. An average human would have 1-2 points in any given trait; 5 is the unaugmented maximum and represents the trait of a world class talent - an Olympian or an Einstein.</Typography></Grid>
          <Grid item xs={12}><Typography variant='p'>Attributes consist of the following - click each to see more information.</Typography></Grid>
          <Grid item xs={4}>
            <Grid container spacing={1} padding={1}>
              <Grid item xs={12}><Item><AttributesDialog prop={'Strength'} /></Item></Grid>
              <Grid item xs={12}><Item><AttributesDialog prop={'Body'} /></Item></Grid>
              <Grid item xs={12}><Item><AttributesDialog prop={'Reflexes'} /></Item></Grid>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <Grid container spacing={1} padding={1}>
              <Grid item xs={12}><Item><AttributesDialog prop={'Appearance'} /></Item></Grid>
              <Grid item xs={12}><Item><AttributesDialog prop={'Cool'} /></Item></Grid>
              <Grid item xs={12}><Item><AttributesDialog prop={'Street Cred'} /></Item></Grid>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <Grid container spacing={1} padding={1}>
              <Grid item xs={12}><Item><AttributesDialog prop={'Intelligence'} /></Item></Grid>
              <Grid item xs={12}><Item><AttributesDialog prop={'Willpower'} /></Item></Grid>
              <Grid item xs={12}><Item><AttributesDialog prop={'Technique'} /></Item></Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Typography variant='h6'>
              The Rule of Cool
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant='p'>
              Cyberpunks live and die by how cool they are. To reflect this, once per scene, they can use their Cool attribute in lieu of any other attribute in a roll. This can only be done if what they are doing is Fucking Awesome. The GM has final say on what can be subbed, but they are encouraged to be generous. Typically, the difficulty value of the roll is higher, or it requires two rolls (only one of which uses Cool) to succeed.
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant='p'>
              If successful, the result should be Very Dramatic.
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant='p'>
              <i>Example:
                Ace has strutted into the wrong bar and is close to being on the receiving end of an ass-kicking from a group of Maelstrom gangers. They opt to shoot one in the back of the head…from in front of them. The GM requires Ace to make an Intelligence (3) + Science (2) roll to calculate the angles. Ace succeeds at Geometry, and rolls their Cool (6) + Automatics (5) skill, scoring an impressive 8 successes and spraying robo-eyes all over their immaculate vest. The stunned gangers decide this is Awesome and buy Ace all the beer.</i>
            </Typography>
          </Grid>

          <Grid item xs={12}><Typography variant='h4'>Skills</Typography></Grid>
          <Grid item xs={12}><Typography variant='p'>Skills are slightly more specialized areas, and are almost always combined with an Attribute to determine the outcome of various character actions.</Typography></Grid>
          <Grid item xs={12}><Typography variant='p'>The different categories are important - Streets skills are picked up on the job and actions involving them can generally be attempted with no points in the skill in question if the GM names one as a Parameter - anyone can try and lie to someone, or dodge a punch. There's just a limit to how well they can do so without training. Tekhne (your GM will lie and say this is Greek referring to 'some skill or craft required') refers to skills that require a bit more in the way of expertise, without being fully a specialty. If the GM declares one of these skills as a Parameter, a character can attempt to perform the task, but should tell the GM they have no points - their DV is usually one higher. Finally, Knowledge skills are more Academic specialties. When declared as a parameter, a character <b>cannot</b> even attempt the roll without at least one point in the skill in question. No amount of natural smarts will allow someone who's never encountered a computer write an Excel Macro.</Typography></Grid>
          <Grid item xs={12}><Typography variant='p'>There are ten skills in each category - click each below to see more details.</Typography></Grid>
          <Grid item xs={4}>
            <Grid container spacing={1} padding={1}>
              <Grid item xs={12}><Item><SkillsDialog prop={'Streets'} /></Item></Grid>
              <Grid item xs={6}><Item><SkillsDialog prop={'Athletics'} /></Item></Grid>
              <Grid item xs={6}><Item><SkillsDialog prop={'Brawling'} /></Item></Grid>
              <Grid item xs={6}><Item><SkillsDialog prop={'Concentration'} /></Item></Grid>
              <Grid item xs={6}><Item><SkillsDialog prop={'Evasion'} /></Item></Grid>
              <Grid item xs={6}><Item><SkillsDialog prop={'Fast Talk'} /></Item></Grid>
              <Grid item xs={6}><Item><SkillsDialog prop={'Firearms'} /></Item></Grid>
              <Grid item xs={6}><Item><SkillsDialog prop={'Legerdemain'} /></Item></Grid>
              <Grid item xs={6}><Item><SkillsDialog prop={'Melee Weapons'} /></Item></Grid>
              <Grid item xs={6}><Item><SkillsDialog prop={'Perception'} /></Item></Grid>
              <Grid item xs={6}><Item><SkillsDialog prop={'Streetwise'} /></Item></Grid>
            </Grid>
          </Grid>

          <Grid item xs={4}>
            <Grid container spacing={1} padding={1}>
              <Grid item xs={12}><Item><SkillsDialog prop={'Tekhne'} /></Item></Grid>
              <Grid item xs={6}><Item><SkillsDialog prop={'Demolitions'} /></Item></Grid>
              <Grid item xs={6}><Item><SkillsDialog prop={'Drive Land Vehicle'} /></Item></Grid>
              <Grid item xs={6}><Item><SkillsDialog prop={'Drive Exotic Vehicle'} /></Item></Grid>
              <Grid item xs={6}><Item><SkillsDialog prop={'Etiquette'} /></Item></Grid>
              <Grid item xs={6}><Item><SkillsDialog prop={'Exotic Weapons'} /></Item></Grid>
              <Grid item xs={6}><Item><SkillsDialog prop={'Heavy Weapons'} /></Item></Grid>
              <Grid item xs={6}><Item><SkillsDialog prop={'Performance'} /></Item></Grid>
              <Grid item xs={6}><Item><SkillsDialog prop={'Stealth'} /></Item></Grid>
              <Grid item xs={6}><Item><SkillsDialog prop={'Survival'} /></Item></Grid>
              <Grid item xs={6}><Item><SkillsDialog prop={'Tracking'} /></Item></Grid>
            </Grid>
          </Grid>

          <Grid item xs={4}>
            <Grid container spacing={1} padding={1}>
              <Grid item xs={12}><Item><SkillsDialog prop={'Knowledge'} /></Item></Grid>
              <Grid item xs={6}><Item><SkillsDialog prop={'Business'} /></Item></Grid>
              <Grid item xs={6}><Item><SkillsDialog prop={'Cryptography'} /></Item></Grid>
              <Grid item xs={6}><Item><SkillsDialog prop={'Cyber Tech'} /></Item></Grid>
              <Grid item xs={6}><Item><SkillsDialog prop={'Investigation'} /></Item></Grid>
              <Grid item xs={6}><Item><SkillsDialog prop={'First Aid'} /></Item></Grid>
              <Grid item xs={6}><Item><SkillsDialog prop={'Gambling'} /></Item></Grid>
              <Grid item xs={6}><Item><SkillsDialog prop={'Language'} /></Item></Grid>
              <Grid item xs={6}><Item><SkillsDialog prop={'Military Tech'} /></Item></Grid>
              <Grid item xs={6}><Item><SkillsDialog prop={'Science'} /></Item></Grid>
              <Grid item xs={6}><Item><SkillsDialog prop={'Vehicle Tech'} /></Item></Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}><Typography variant='p'>Special: Paramedic. If a character has the Medtech role, their skill in First Aid is immediately converted to Paramedic. This reflects the specialized training Medtechs go through, and generally the same tasks can be attempted - the DV is simply lower if you're rolling Paramedic instead of First Aid. Like First Aid, Paramedic is a Knowledge skill.</Typography></Grid>
          <Grid item xs={2}><Item><SkillsDialog prop={'Paramedic'} /></Item></Grid>

          <Grid container padding={1} spacing={1}>
            <Grid item xs={12}><Typography variant='h4'>Other Attributes: Health</Typography>
              <Grid container padding={1} spacing={1}>
                <Grid item xs={12}>Character health is expressed in a number of boxes. Every character has a minimum of 10 health boxes. Health can be increased with different kinds of cyberware. Most commonly, Externalware is usually armor grafted directly to the character and provides 1 or more health boxes along with some armor. Cyberlimbs each grant an additional health box as well.</Grid>
                <Grid item xs={12} paddingBottom={1}>Health is reduced by damage, also called 'wounds', which comes in three different types. Each type overwrites the previous - so a character with two stun wounds who receives a single lethal wound would now have a single lethal wound and a single stun wound. If they then take an aggravated wound, they would have a stun wound and an aggravated wound; the aggravated wound has overwritten the lethal wound.</Grid>

                <Grid item xs={3}>Damage Type</Grid>
                <Grid item xs={9} paddingBottom={1}>Description</Grid>

                <Grid item xs={3}>Stun Damage: {stunMarker}</Grid>
                <Grid item xs={9} paddingBottom={1}>Stun damage comes from clubs, fists, and other fairly superficial sources. Characters can recover from stun damage pretty quickly, recovering their Body stat in stun wounds each hour when resting.</Grid>

                <Grid item xs={3}>Lethal Damage: {lethalMarker}</Grid>
                <Grid item xs={9} paddingBottom={1}>Lethal damage is far more severe than stun, and comes from blades, bullets, and many other hazards frequently encountered by Edgerunners. Characters going about their business make a Body roll each week at difficulty 6 (1s do not affect this roll); they recover a number of lethal wounds equal to the successes rolled. If a character is resting and receiving constant medical attention (4+ hours a day), this roll can be made once per day.</Grid>

                <Grid item xs={3}>Aggravated Damage: {aggMarker}</Grid>
                <Grid item xs={9} paddingBottom={1}>Aggravated damage is the most severe kind of damage a character can receive, and usually comes from fire, electricity, or other extreme sources of damage. Characters cannot recover Aggravated wounds without daily medical attention (8+ hours a day); if they are receiving care they can make a body roll at difficulty 8 once per week and recover a number of aggravated wounds equal to the successes rolled.</Grid>
                <Grid item xs={12}><Typography variant='h4'>Wound Penalties:</Typography></Grid>
                <Grid item xs={12}><Typography variant='p'>Characters suffer penalties to most Rolls as they become more and more injured. This penalty applies to any roll that does not specifically mention otherwise. Primarily, Soaking damage and Death Saves are the main exceptions to wound penalties.</Typography></Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid container spacing={1} padding={1}>
            <Grid item xs={12}><Typography variant='h4'>Other Attributes: Armor</Typography></Grid>
            <Grid container padding={1}>
              <Grid item xs={12} paddingBottom={1}>Armor reflects a combination of worn armor, shields, and cyberware that provide some protection against injury. When receiving an injury, characters roll Body + Armor to resist the damage against a difficulty value of 6. <b>This roll is the only one in which 1s are ignored and wound penalties do not apply.</b></Grid>
              <Grid item xs={12} paddingBottom={1}><b>Armor Ablation:</b> any attack that is not disregarded (see below) damages armor, weakening it slowly <b>whether or not the attack does any damage</b>. Each hit reduces current armor by 1. Repairing armor requires the Military Tech (worn armor) or Cybertech (cyberware armor) skill to repair.</Grid>
              <Grid item xs={12} paddingBottom={1}>Advanced Rules - these rarely come up:</Grid>
              <Grid item xs={12} paddingBottom={1}>Weapons whose base damage is one third or less of a target's armor value (<b>not</b> body + armor) cannot damage that armor - the armor is simply too tough. The weapon does no damage, a soak roll is not needed, and the armor is not ablated. A light pistol cannot shoot through a bank vault door no matter how many times it is fired. This rarely comes into play except as regards some kinds of cover and certain super-heavy cyberware.</Grid>
              <Grid item xs={12} paddingBottom={1}><b>Hardened Armor:</b> Some armor is vastly tougher than others, and is considered <i>Hardened.</i> Typically this consists of advanced military equipment, full body cyberware conversions, and military grade vehicle armor. Characters (or cover) with any amount of hardened armor roll against a difficulty value of 5 to soak damage, and ignore attacks whose base damage is 1/2 or less of their armor value rather than 1/3. Further, many attacks that would do aggravated damage to a character with normal armor are only lethal against a character with hardened armor. However, some ammunition and even specific weapons allow characters to ignore the <i>Hardened</i> property.</Grid>
              <Grid item xs={12}>Hardened armor typically does not stack with other kinds armor - putting a kevlar jacket on over Powered Military Armor is gilding the lily somewhat. The GM has final say on whether or not armors can be worn together.</Grid>
            </Grid>
          </Grid>

          <Grid container padding={1} spacing={1}>
            <Grid item xs={12}><Typography variant='h4'>Other Attributes: Luck</Typography>
              <Grid container>
                <Grid item xs={12} >Luck has a number of uses for a character. Characters can expend a point of temporary luck to do any of the following. A character cannot spend more than one point of luck each round.</Grid>
                <Grid item xs={12} ><b>Just Plain Lucky:</b> A character can add a single success - basically add a die that came up 10.</Grid>
                <Grid item xs={12} ><b>Finger on the Scale:</b> A character can reroll a number of dice up to their maximum luck score. They must take the new results, including any additional 1s that come up.</Grid>
                <Grid item xs={12} ><b>Doesn't Even Sting:</b> This must be declared before rolling. A character can ignore any wound penalties they have for one turn.</Grid>
                <Grid item xs={12} ><b>Trust in The Lady:</b> Before making a roll, once per session, a character can trust in their luck and use their <b>maximum</b> luck in place of an attribute for a single roll. However, any 1s rolled are counted twice - Luck is a fickle mistress.</Grid>
              </Grid>
              <Grid item xs={12}>Characters can also expend one point of luck <b>permanently</b> to perform a single action while incapacitated. They cannot spend temporary luck in the same turn.</Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid container spacing={1} padding={1}>
          <Grid item xs={12}><Typography variant='h4'>Other Attributes: Humanity</Typography></Grid>
          <Grid container padding={1}>
            <Grid item xs={12} paddingBottom={1}>Humanity is a measure of a character's stability, sanity, and of course, tracking their slow but inevitable slide into Cyberpsychosis. No direct penalties are associated with Humanity, but a variety of effects should be taken into consideration by the GM and players as their characters humanity dwindles.</Grid>
            <Grid item xs={12} paddingBottom={1}>The most common way of losing humanity, temporary and otherwise, is the installation of Cyberware. However, particularly traumatic scenes and exposure to true horror can also cause a character to lose temporary humanity. Generally, it becomes harder to lose humanity as it fades away - a character with 40 humanity might lose many points if they have to shoot an innocent bystander, another with only 5 left won't even blink at doing so.</Grid>
            <Grid item xs={12} paddingBottom={1}>Temporary humanity loss can be recovered with therapy, experience, or acts of genuine empathy and redemption. Temporary humanity recovery happens at the GMs discretion, or can purchased during character advancement with experience. Some cyberware causes humanity loss that cannot be restored until the cyberware is removed, reflecting the internal dissociation that comes with replacing parts of oneself with chrome. This is generally the minimum figure listed in the Cyberware tables.</Grid>
            <Grid item xs={12} paddingBottom={1}>Characters with more than half their humanity missing are generally 'off' and scary to normal people, and will have higher difficulty values when interacting with them in anything but a threatening way.</Grid>
            <Grid item xs={12} paddingBottom={1}>Characters missing 30 or more Humanity suffer from some kind of mental derangement - sociopathy is most common, but hallucinations, dissociative episodes, mistaken identity of themselves or others, and memory loss are all regular occurrences.</Grid>
            <Grid item xs={12} paddingBottom={1}>Characters missing 40 or more humanity undergo a complete psychotic break, and are turned over to the control of the GM. If they are immediately subdued they might be able to recover, but most often this is the end of that character as anything but a dangerous opponent to themselves and everyone around them.</Grid>
          </Grid>
        </Grid>
      </TabPanel >

      <TabPanel value={value} index={2}>
        <Grid container spacing={1} padding={1}>
          <Grid item xs={12}><Typography variant='h4'>Roles</Typography></Grid>
          <Grid item xs={12}><Typography variant='p'>Roles are the defining characteristic of a character, granting special abilities and actions not available to anyone without the same skills. While the average person might have the same attributes and skills as a Cyberpumpkin, they don't have the special sauce that comes with a Role. Likewise, Roles are the most expensive thing a character can buy in terms of Experience.</Typography></Grid>
          <Grid item xs={12}><Typography variant='p'>Role abilities generally scale up quickly, and often go in non-linear fashion - there is a world of difference between a Rank 1 Rockerboy playing shows in their mother's basement and a Rank 10 one playing a Worldwide Broadcast.</Typography></Grid>
          <Grid item xs={12}><Typography variant='p'>Characters start at Rank 2 - not complete n00bs, but not exactly world class at their chosen profession, either.</Typography></Grid>
        </Grid>
        <Grid padding={1}>
          <Accordion disableGutters expanded={expandedAccordion === 'panel1'} onChange={handleAccordionChange('panel1')}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="rockerboy-content"
              id="panel1-header"
            >
              <Typography>Rockerboy - Charismatic Impact</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container padding={1}>
                <Grid item xs={12}>
                  <h1>Rockerboy - Charismatic Impact</h1>
                  A character with the Rockerboy Role has the Charismatic Impact ability. They can influence others by sheer presence of personality. They need not be a musical performer; they can influence others through poetry, art, dance, or simply their physical presence. They could be a rocker—or a cult leader.
                </Grid>
                <Grid item xs={12}>
                  When not in combat or around people who already actively dislike them, a Rockerboy can make people into fans by rolling Cool + Charismatic Impact vs DV6 for a single person, DV7 for a small group (2-6), and DV8-9 for larger groups.
                  Upon acquiring fans, a Rockerboy can get them to do things for them based on their rank in Charismatic impact.
                </Grid>
                <Grid item padding={.25} xs={12}>
                  Venues played - the typical venue for the Rockerboy's performance or display.
                </Grid>
                <Grid item padding={.25} xs={12}>
                  Impact on a single fan: What the Rockerboy can convince one fan to do. Difficulty Value 6.
                </Grid>
                <Grid item padding={.25} xs={12}>
                  Impact on a small group of fans: What the Rockerboy can convince up to six fans to do. They will generally form a semi-permanent posse that follows the Rockerboy around. Difficulty Value 7.
                </Grid>
                <Grid item padding={.25} xs={12}>
                  Impact on a huge group of fans: What the Rockerboy can convince their fanbase to do in an extreme situation. Affects all fans who can see or hear the Rockerboy, who form a horde for a number of hours equal to the successes rolled. Difficulty Value 9.
                </Grid>
                <Grid item padding={.25} xs={12}>
                  <h3>Favor Size</h3>
                </Grid>
                <Grid item padding={.25} xs={12}>
                  Small: Buy a drink, give a ride.
                </Grid>
                <Grid item padding={.25} xs={12}>
                  Medium: Buy some gear, sneak into place of work.
                </Grid>
                <Grid item padding={.25} xs={12}>
                  Large: Give substantial amount of money, minor crimes, assist in a fight when the danger is low.
                </Grid>
                <Grid item padding={.25} paddingBottom={2} xs={12}>
                  Huge: Give life savings, commit major crimes, assist in a hopeless fight.
                </Grid>

                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="left">Rank</TableCell>
                        <TableCell align="left">Venue</TableCell>
                        <TableCell align="center">Single Fan</TableCell>
                        <TableCell align="center">Small Group</TableCell>
                        <TableCell align="center">Huge Group</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell align="left">1-2</TableCell>
                        <TableCell align='left'>Small clubs & Church Basements</TableCell>
                        <TableCell align='center'>Small Favor</TableCell>
                        <TableCell align='center'>Attention</TableCell>
                        <TableCell align='center'>You can't reach a huge group</TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell align="left">3-4</TableCell>
                        <TableCell align='left'>Medium clubs & local churches</TableCell>
                        <TableCell align='center'>Medium Favor</TableCell>
                        <TableCell align='center'>Small Favor Posse</TableCell>
                        <TableCell align='center'>Attend shows</TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell align="left">5-6</TableCell>
                        <TableCell align='left'>Large Clubs & Churches</TableCell>
                        <TableCell align='center'>Large Favor</TableCell>
                        <TableCell align='center'>Medium Favor Posse</TableCell>
                        <TableCell align='center'>Temporary Small Favor Horde</TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell align="left">7-8</TableCell>
                        <TableCell align='left'>Concert Halls & Megachurches</TableCell>
                        <TableCell align='center'>Huge Favor</TableCell>
                        <TableCell align='center'>Large Favor Posse</TableCell>
                        <TableCell align='center'>Temporary Medium Favor Horde</TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell align="left">9</TableCell>
                        <TableCell align='left'>Stadiums & Int'l Video Feeds</TableCell>
                        <TableCell align='center'>Die without Question</TableCell>
                        <TableCell align='center'>Huge Favor Posse</TableCell>
                        <TableCell align='center'>Temporary Large Favor Horde</TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell align="left">10</TableCell>
                        <TableCell align='left'>Stadiums & Int'l Video Feeds</TableCell>
                        <TableCell align='center'>Die without Question</TableCell>
                        <TableCell align='center'>Die without Question</TableCell>
                        <TableCell align='center'>Temporary Huge Favor Horde</TableCell>
                      </TableRow>

                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>

            </AccordionDetails>
          </Accordion>

          <Accordion disableGutters expanded={expandedAccordion === 'panel2'} onChange={handleAccordionChange('panel2')}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="solo-content"
              id="panel2-header"
            >
              <Typography>Solo - Combat Awareness</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container>
                <Grid item xs={12}>
                  <h1>Combat Awareness</h1>
                  A character with the Solo Role has the Combat Awareness ability. They get 1 point in Combat Awareness for each rank in Solo. At any time outside of combat, or at the beginning of their combat turn, they can distribute their points into any of the below abilities. Each ability with a 'charge' such as Damage Reduction resets at the beginning of their turn.
                </Grid>
                <Grid item xs={12}>
                  Solos should describe a 'default' state to their GM - when not otherwise declared, this can be assumed to be their active ability. Damage reduction, Instant Reflexes, and Threat Detection are all common choices.
                </Grid>

                <Grid item xs={12}>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                      <TableHead>
                        <TableRow>
                          <TableCell align="left">Name</TableCell>
                          <TableCell align="left">Points</TableCell>
                          <TableCell align="left">Description</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>

                        <TableRow>
                          <TableCell align="left">Threat Detection</TableCell>
                          <TableCell align="left">1</TableCell>
                          <TableCell align='left'>Solos develop a sixth sense about danger - each point in this ability adds 1 die to any Perception roll the Solo makes.</TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell align="left">Instant Reflexes</TableCell>
                          <TableCell align="left">1</TableCell>
                          <TableCell align='left'>Solos react to danger almost instantly - for every point in this skill, add 1 automatic success to any initiative roll.</TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell align="left">Damage Reduction</TableCell>
                          <TableCell align="left">2</TableCell>
                          <TableCell align='left'>Solos are highly resistant to damage - for every 2 points spent in this ability, decrease the number of wounds taken by 1 <b>after</b> soaking damage from one wound that would be suffered each round. These resisted wounds can be used to resist multiple wounds from a single attack, or distributed between several different sources of damage, but the Solo must declare how may wounds they are resisting when taking damage.</TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell align="left">Spot Weakness</TableCell>
                          <TableCell align="left">2</TableCell>
                          <TableCell align='left'>Solos can almost unerringly spot weak points in a target - for every 2 points in this skill, the Solo can add 1 automatic wound (before soaking) to an attack made this turn. These wounds can be piled into one attack, or distributed amongst many if they have a weapon with a high ROF.</TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell align="left">Precision Attack</TableCell>
                          <TableCell align="left">3</TableCell>
                          <TableCell align='left'>Solos are trained to aim carefully - for every 3 points in this ability, the Solo gets an automatic success on any attack rolls made this round, including aimed shots.</TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell align="left">Fumble Recovery</TableCell>
                          <TableCell align="left">5</TableCell>
                          <TableCell align='left'>Solos take their time and don't make the petty mistakes of amateur Edgerunners - while this is active, 1s do not subtract from successes on die rolls made in a combat situation. You can still glitch if the number of 1s is higher than the number of successes - your mistakes will be the spectacular disasters of a professional, not the careless errors of a novice.</TableCell>
                        </TableRow>

                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>

          <Accordion disableGutters expanded={expandedAccordion === 'panel3'} onChange={handleAccordionChange('panel3')}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="netrunner-content"
              id="panel3-header"
            >
              <Typography>Netrunner - </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container>
                <Grid item xs={12}>
                  Look this one is friggin TBD. Just leave it for the momennt.
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>

          <Accordion disableGutters expanded={expandedAccordion === 'panel4'} onChange={handleAccordionChange('panel4')}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="nomad-content"
              id="panel4-header"
            >
              <Typography>Nomad - Moto</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container>
                <Grid item padding={.5} xs={12}>
                  <h1>Moto</h1>
                  A character with the Nomad role has the Moto ability. Nomads spend their whole lives behind the wheel and under the hoods of their cars, and as a consequence are significantly better drivers than most other people. Nomads add dice equal to 1/2 their rank to just about any vehicle test they make, including piloting, repairing, and inventing.
                </Grid>
                <Grid item padding={.5}>
                  <h3>Family Motorpool</h3>
                  Nomads are part of a larger group, and have access to their family motor pool. For each rank, they have the option of either adding a stock vehicle of their rank or lower to the vehicles they can withdraw from the pool, or upgrading one of their existing vehicles. This is free of cost; a Nomad can add to their available vehicles and vehicle mods by acquiring them in some other way (theft, money, etc) as well.
                </Grid>
                <Grid item padding={.5}>
                  Nomads can only have one Family Vehicle out at a time. Generally, they can get someone to come and swap out a vehicle within 24 hours. If damaged, the family will repair the vehicle for 50% of the normal cost, but it will take a week or so. This is only for serious repairs - the nomad is expected to take care of bumper scuffs, paint scratches, and bullet holes on their own. If destroyed, the family will provide a replacement vehicle for about 50% of the replacement vehicles cost.
                </Grid>
                <Grid item padding={.5}>
                  After Rank 7, Nomads are generally assumed to have a leadership role of some kind in the family - they can negotiate in play with the family to gain access to additional vehicles or have more than 1 vehicle in their possession at a time.
                </Grid>

                <Grid item padding={.5}>
                  See rulebook for a complete list of vehicles and available upgrades.
                </Grid>

                <Grid item xs={12}>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                      <TableHead>
                        <TableRow>
                          <TableCell align="left">Rank</TableCell>
                          <TableCell align="left">Vehicles availabe</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>

                        <TableRow>
                          <TableCell align="left">1-4</TableCell>
                          <TableCell align="left">Compact Groundcar, Gyrocopter, Jetski, Roadbike</TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell align="left">5-6</TableCell>
                          <TableCell align="left">Helicopter, High performance groundcar, Speedboat</TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell align="left">7-8</TableCell>
                          <TableCell align="left">AV-4, Cigarette Boat, Cabin Cruiser, Superbike</TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell align="left">9-10</TableCell>
                          <TableCell align="left">Aerozep, AV-9, Super Groundcar, Yacht</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>

          <Accordion disableGutters expanded={expandedAccordion === 'panel5'} onChange={handleAccordionChange('panel5')}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="media-content"
              id="panel5-header"
            >
              <Typography>Media - Credibility</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container>
                <Grid item padding={.5} xs={12}>
                  <h1>Credibility</h1>
                  A character with the Media role has Credibility. This ability affects how their stories are received by the public, as well as how large their audience is. It also allows the Media to pick up rumors passively, and assists in digging up new information, rumors, and the like.
                </Grid>
                <Grid item padding={.5} xs={12}>
                  <h3>Rumors:</h3>
                  Medias are deeply plugged into (often suspect) information networks, rumor mills, and bullshit factories. They have hosts of friends, contacts, acquaintances, and drinking buddies. Assuming they're not intentionally staying off grid, simply maintaining these networks requires the GM to make secret rolls to see what kinds of information makes its way into the Media's hot little hands each week. This is the same kind of information that any character can find by hitting the street (ie. using Streetwise or Investigation to track down information), but requires no legwork on the Media's part.
                </Grid>
                <Grid item padding={.5} xs={12}>
                  Like other characters, a Media can attempt to find information out intentionally. The passive DV is lower, but only occurs 1/week of in game time - they might hear a lot more, but only one item will likely be credible.
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                      <TableHead>
                        <TableRow>
                          <TableCell align="left">Rumor Quality</TableCell>
                          <TableCell align="left">Description</TableCell>
                          <TableCell align="left">Passive DV</TableCell>
                          <TableCell align="left">Active DV (Media)</TableCell>
                          <TableCell align="left">Active DV (All others)</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell>Vague</TableCell>
                          <TableCell>Rumor is hazy and has only the bare minimum information needed to look into it further.</TableCell>
                          <TableCell>5</TableCell>
                          <TableCell>6</TableCell>
                          <TableCell>7</TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell>Typical</TableCell>
                          <TableCell>The rumor contains minimal information, but does offer a concrete lead on where to find more information.</TableCell>
                          <TableCell>6</TableCell>
                          <TableCell>7</TableCell>
                          <TableCell>8</TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell>Substantial</TableCell>
                          <TableCell>As a typical rumor, but some details of the subject may be available. Multiple avenues to follow up may be included, along with names, places, dates, or times.</TableCell>
                          <TableCell>7</TableCell>
                          <TableCell>8</TableCell>
                          <TableCell>9</TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell>Details</TableCell>
                          <TableCell>Contains enough information to be published on its own - either someone got sloppy and left too many tracks, or a Deep Throat in the organization spawning the rumor is looking to get the story out.</TableCell>
                          <TableCell>8</TableCell>
                          <TableCell>9</TableCell>
                          <TableCell>9 (3+ hits)</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>

          <Accordion disableGutters expanded={expandedAccordion === 'panel6'} onChange={handleAccordionChange('panel6')}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="medtech-content"
              id="panel6-header"
            >
              <Typography>Medtech - Medical Expertise</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container>
                <Grid item padding={.5} xs={12}>
                  <h1>Medical Expertise</h1>
                  A character with the Medtech role has, not to put to fine a point on it, the knowledge and skills of a paramedic or doctor. In Cyberpumpkin, this makes them as much mechanics as doctors much of the time, and they rarely lack for demand of their skills. Medtechs get 1 point in one of three specialties when they advance their Medical Expertise Role Ability. These skills are rolled with an attribute for most tests; Medical Expertise is rarely rolled on its own.
                </Grid>
                <Grid item padding={.5} xs={12}>
                  <h3>Surgery:</h3>
                  Surgery is used to treat the most severe injuries, as well as implanting cyberware. It is typically used with the Technique attribute.
                </Grid>
                <Grid item padding={.5} xs={12}>
                  <h3>Pharmaceuticals:</h3>
                  Pharmaceuticals allows the Medtech to synthesize one of the below compounds with an Intelligence + Pharmaceuticals roll (DV 6) and some reagents. This will produce a number of doses of a given compound equal to the number of successes on the roll. The reagents have a street value of roughly 200 eddies. Pharmaceuticals typically require injection, though they can be prepared as a topical, pill, etc. possibly with a higher difficulty value as decided by the GM. Applying a dose takes a normal action; if the target is unwilling the Medtech can attempt to forcibly apply the medicine with a melee attack roll. Characters who are <b>not</b> Medtechs cannot administer Pharmaceuticals correctly - they cannot evaluate the correct dosage. Side effects may vary wildly.
                </Grid>
                <Grid item padding={.5} xs={12}>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                      <TableHead>
                        <TableRow>
                          <TableCell align="left">Pharmaceutical</TableCell>
                          <TableCell align="left">Effect</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>

                        <TableRow>
                          <TableCell align="left">Antibiotic</TableCell>
                          <TableCell align="left">Speeds up natural healing processes, allowing the recovery of one additional wound when the user rolls their body to recover. Multiple doses cannot stack, and it cannot be used with Speedheal. Each roll uses one dose of the compound.</TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell align="left">Rapi-Detox</TableCell>
                          <TableCell align="left">When injected, a user affected by a drug, poison, or other intoxicant is immediately purged of the substance. Aggressively. From both ends.</TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell align="left">Speedheal</TableCell>
                          <TableCell align="left">When injected, the user immediately rolls Body (DV 6) and recovers stun and lethal wounds as though they'd rested for the appropriate length of time. The user immediately loses one temporary humanity point. Can be used on a target no more than once per day.</TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell align="left">Stim</TableCell>
                          <TableCell align="left">When administered, the user can ignore all wound penalties for 1 hour. Further, Stun Wounds cannot cause the user to fall unconscious.</TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell align="left">Surge</TableCell>
                          <TableCell align="left">A dose of surge allows the target to function without sleep for approximately 48 hours. They immediately lose 1 point of temporary humanity. For each consecutive dose a user takes in without taking a week off, they lose 2 additional humanity (3 for the second, 5 for the 3rd dose, and so on).</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
                <Grid item padding={.5} xs={12}>
                  <h3>Cryogenics:</h3>
                  The Cryogenics skill is used to operate and repair cryogenic medical technology. As points are put into this skill, the Medtech will manage to source the following equipment at no extra cost to themselves.
                </Grid>
                <Grid item padding={.5} xs={12}>
                  <h4>Cryopump:</h4>
                  A cryopump is a briefcase sized device containing a bodybag hooked to a pump and a few chemical containers. Once a willing (or unconscious) person is placed in the bag and the pump activated, they are bathed in a hypercool chemical slurry and the bag deflates around them. The person in the bag is put into stasis - they are unconscious and will no longer need to roll death saves as long as they are kept in the bag. The cryopump uses one charge per day of use, and has two charges as standard. The bag will be ruined if it suffers a lethal or aggravated wound of any kind. Surgery can be performed on the occupant through a special seal, reducing difficulties by 1. Refueling the Cryopump restores all used charges and uses materials with a street cost of roughly 200 eurobucks.
                </Grid>
                <Grid item padding={.5} xs={12}>
                  <h4>Cryotank:</h4>
                  A cryotank is a pod that can contain a grown adult. When placing someone into the tank, the Medtech makes an Intelligence + Cryogenics test at DV6; if successful the Cryotank will keep the person in stasis (see Cryopump) as long as the Cryotank is supplied with power. While in the tank, an occupant is considered unconscious, and heals far more rapidly than normal - all body saves to recover wounds are made with a -2 difficulty value. A cryotank is a substantial device, with an armor of 5, and can suffer 4 wounds before it fails. It makes excellent cover, honestly! Keeping a Cryotank running uses about materials with a street cost of roughly 200 eurobucks per week; up to about 6 months worth of material can be attached to a tank at a time. They can be installed in large vehicles, as well.
                </Grid>
                <Grid item padding={.5} xs={12}>
                  <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="left">Cryogenics Level</TableCell>
                        <TableCell align="left">Benefit</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>

                      <TableRow>
                        <TableCell align="left">1</TableCell>
                        <TableCell align="left">Gain one standard Cryopump.</TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell align="left">2</TableCell>
                        <TableCell align="left">Become a registered Cryotank technician and gain unlimited 24/7 access to a Cryotank at a corporate or government operated facility.</TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell align="left">3</TableCell>
                        <TableCell align="left">Refurbish a broken Cryotank, and install it in the location of your chooosing. All Cryopumps used by you have two charges as you learn to operate them more efficiently.</TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell align="left">4</TableCell>
                        <TableCell align="left">Refurbish an additional Cryotank, and install in a location of your choosing.</TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell align="left">5</TableCell>
                        <TableCell align="left">Refurbish two additional Cryotanks, and install them in location(s) of your choosing. All Cryopumps used by you have three charges due to your mastery of the Cryonic arts!</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>

          <Accordion disableGutters expanded={expandedAccordion === 'panel7'} onChange={handleAccordionChange('panel7')}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="maker-content"
              id="panel7-header"
            >
              <Typography>Maker - Craft</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container>
                <Grid item padding={.5} xs={12}>
                  <h1>Craft</h1>
                  A character with the Maker role can jury rig, improve, manufacture, and invent items using their Craft Role Ability. Each rank of Maker gives 2 ranks to put into one of four specialties. These skills are rolled with an attribute for most tests; Craft is rarely rolled on its own.
                </Grid>
                <Grid item padding={.5} xs={12}>
                  <h3>Field Expertise:</h3>
                  A Maker with Field Expertise is familiar with jury rigging, bypassing, or otherwise changing equipment in a hurry. A maker with this skill can attempt to jury rig a broken device. They roll Technique + Field Expertise against an items normal repair difficulty; if successful the device functions for 1 round / 10 minutes (combat / normal) for each success. Afterwards, the device is fully broken, and cannot be jury rigged again.
                </Grid>
                <Grid item padding={.5} xs={12}>
                  Field Expertise can often be used in place of any other technical skill to make a device do a single action - it can be used in place of Cybertech to temporarily disable a cyberlimb, instead of science to disable an alarm system (briefly), or in place of Military Tech to fire the main gun of a tank (once). It
                </Grid>
                <Grid item padding={.5} xs={12}>
                  <h3>Upgrade Expertise</h3>
                  Makers can improve their equipment in various ways, applying a modification to armor, weapon, or vehicle. Items can generally benefit from only one modification at a time; Makers with 5 ranks in this skill can apply two upgrades to weapons. Upgrading an item requires the items base cost in additional materials (or an amount determined by GM for vehicle upgrades). The Maker rolls Technique + Upgrade expertise after a suitable amount of time tinkering. Failure consumes the materials to no benefit, while glitching upgrades the item but it is unlikely to work for very long.
                </Grid>
                <Grid item padding={.5} xs={12}>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                      <TableHead>
                        <TableRow>
                          <TableCell align="left">Item Type</TableCell>
                          <TableCell align="left">Effect</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>

                        <TableRow>
                          <TableCell align="left">Melee Weapon</TableCell>
                          <TableCell align="left">Embiggen: Make a 1 handed weapon 2 handed; this increases the damage by 2.</TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell align="left">Melee Weapon</TableCell>
                          <TableCell align="left">Lightweight Material: Make a 2 handed weapon 1 handed; this decreases the damage by 1.</TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell align="left">Weapon</TableCell>
                          <TableCell align="left">Dangerous: Increase damage by 1.</TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell align="left">Standard Ranged Weapon</TableCell>
                          <TableCell align="left">Ballistics: Increase range by 25%.</TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell align="left">Any Weapon</TableCell>
                          <TableCell align="left">Collapsible: Make a non-concealable weapon conceable. It takes 2 standard actions to reassemble a concealed weapon for use.</TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell align="left">Any weapon with ammunition</TableCell>
                          <TableCell align="left">Bigger Clip: Increase base clip by 25% or +3, whichever is higher.</TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell align="left">Armor</TableCell>
                          <TableCell align="left">Improved Resistance: Add 1 to armor Quality.</TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell align="left">Armor</TableCell>
                          <TableCell align="left">Reactive Coating: Reduce Stealth difficulty values by 1.</TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell align="left">Shield</TableCell>
                          <TableCell align="left">Thicker Materials: add 1 to shield quality.</TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell align="left">Any Item</TableCell>
                          <TableCell align="left">Simplify: Time and material costs to repair item are reduced by 50%.</TableCell>
                        </TableRow>

                      </TableBody>
                    </Table>
                  </TableContainer>

                  <Grid item padding={.5} xs={12}>
                    <h3>Fabrication Expertise</h3>
                    Makers can manufacture items from materials costing roughly half an items purchase price. Fabrication usually requires blueprints of some kind (which generally cost rather more than the base item) or the Invention expertise skill as well as access to suitable tools and an interval of time to work on the device. Difficulty and time are based on the base cost of the item being created; Makers roll Technique + Fabrication Expertise at the end of each interval. Failure on this roll consumes 50% of the materials, while a glitch destroys all the Maker's raw materials. Critical glitches tend to destroy the workshop. Items requiring additional successes don't need to be succeeded at in one go; track successes each interval. Failures only occur if the total number of failures exceeds the number of successes.
                  </Grid>
                  <Grid item padding={.5} xs={12}>
                    <TableContainer component={Paper}>
                      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                        <TableHead>
                          <TableRow>
                            <TableCell align="left">Item Base Cost</TableCell>
                            <TableCell align="left">DV</TableCell>
                            <TableCell align="left">Interval</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>

                          <TableRow>
                            <TableCell align="left">Cheap</TableCell>
                            <TableCell align='left'>5 (2+)</TableCell>
                            <TableCell align="left">1 hour.</TableCell>
                          </TableRow>

                          <TableRow>
                            <TableCell align="left">Costly</TableCell>
                            <TableCell align='left'>6 (2+)</TableCell>
                            <TableCell align="left">6 hours.</TableCell>
                          </TableRow>

                          <TableRow>
                            <TableCell align="left">Preem</TableCell>
                            <TableCell align='left'>6 (4+)</TableCell>
                            <TableCell align="left">1 day.</TableCell>
                          </TableRow>

                          <TableRow>
                            <TableCell align="left">Expensive</TableCell>
                            <TableCell align='left'>7 (2+)</TableCell>
                            <TableCell align="left">3 days.</TableCell>
                          </TableRow>

                          <TableRow>
                            <TableCell align="left">Valuable</TableCell>
                            <TableCell align='left'>7 (4+)</TableCell>
                            <TableCell align="left">1 week.</TableCell>
                          </TableRow>

                          <TableRow>
                            <TableCell align="left">Luxury</TableCell>
                            <TableCell align='left'>7 (8+)</TableCell>
                            <TableCell align="left">1 month.</TableCell>
                          </TableRow>

                          <TableRow>
                            <TableCell align="left">Extravagant</TableCell>
                            <TableCell align='left'>8 (2 successes / 10,000 of base cost)</TableCell>
                            <TableCell align="left">1 week / 10,000 of base cost.</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>

                  <Grid item padding={.5} xs={12}>
                    <h3>Invention Expertise:</h3>
                    A Maker can invent upgrades, modifications, or entirely new items. This skill is kept fairly open ended, but should fit in with the approximate technology and costs of existing items.
                  </Grid>
                  <Grid item padding={.5} xs={12}>
                    If satisfied, the GM will create rules and stats for the proposed item. The invention skill allows the production of a single prototype device; these tend to unbalance and break the game and as such are notoriously prone to failure as the GM realizes their mistake. Mass production requires the Fabrication skill. The roll to invent something is Intelligence + Invention Expertise with a DV determined by the GM.
                  </Grid>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>

        </Grid>
      </TabPanel>

      <TabPanel value={value} index={3}>
        <Grid container padding={1} spacing={1}>

          <Grid item xs={12}><Typography variant='h4'>Armor & Shields</Typography></Grid>
          <Grid item xs={12}><Typography variant='p'>Armor has a quality rating, which reflects both how many dice it grants to a user to soak damage and how much ablation it can stand before it is rendered useless.</Typography></Grid>
          <Grid item xs={12}><Typography variant='p'>Shields can be used in conjunction with armor, and have seen a resurgence in the modern era. They require a free hand, but add their quality to a character's armor rating when used.</Typography></Grid>
          <Grid item xs={12}>
            <Accordion disableGutters expanded={expandedGearAccordion === 'panel1'} onChange={handleGearAccordionChange('panel1')}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="armor-content"
                id="armor-panel-header"
              >
                <Typography>Armor List</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="left">Quality</TableCell>
                        <TableCell align="left">Description</TableCell>
                        <TableCell align="left">Price</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {armorMaster.map((row, i) => {
                        return (
                          <TableRow key={row.name}>
                            <TableCell>{row.name}</TableCell>
                            <TableCell align="left">{row.quality}</TableCell>
                            <TableCell align="left">{row.description}</TableCell>
                            <TableCell align="right">{euroBuck}{row.price.toLocaleString("en-US")}</TableCell>
                          </TableRow>
                        )
                      })}
                      {shieldMaster.map((row, i) => {
                        return (
                          <TableRow key={row.name}>
                            <TableCell>{row.name}</TableCell>
                            <TableCell align="left">{row.quality}</TableCell>
                            <TableCell align="left">{row.description}</TableCell>
                            <TableCell align="right">{euroBuck}{row.price.toLocaleString("en-US")}</TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </AccordionDetails>
            </Accordion>
          </Grid>


          <Grid item xs={12}><Typography variant='h4'>Weapons</Typography></Grid>
          <Grid item xs={12}><Typography variant='p'>Weapons have a number of characteristics that affect how they behave. Click a name read more about a specific weapon.</Typography></Grid>
          <Grid item xs={12}><Typography variant='p'>Damage is the weapons base damage - generally, this number is added to the successes on an attack roll to determine how much damage a given attack does.</Typography></Grid>
          <Grid item xs={12}><Typography variant='p'>Range is how far a weapon can shoot in meters. It is the number of squares a weapon can shoot in grid based play.</Typography></Grid>
          <Grid item xs={12}><Typography variant='p'>Rate of Fire is how many times a weapon can be used as a standard action. </Typography></Grid>
          <Grid item xs={12}><Typography variant='p'>Max Clip is how many bullets the weapon holds before it must be reloaded (taking a standard action).</Typography></Grid>
          <Grid item xs={12}><Typography variant='p'># of Hands is how many hands a weapon requires to use effectively. Some melee weapons can be used with 1 hand instead of 2 by especially strong characters.</Typography></Grid>
          <Grid item xs={12} paddingBottom={1}><Typography variant='p'>Concealable is simply whether or not a weapon can be concealed on one's person. Concealing a weapon requires a potential spotter to make a Cool + Streetwise check to locate with a search - the DV is based on how thorough they're being. High Speed Ocular Pat Downs cannot in fact spot such hardware if concealed by someone being careful.</Typography></Grid>

          <Grid item xs={12}>
            <Accordion disableGutters expanded={expandedGearAccordion === 'panel2'} onChange={handleGearAccordionChange('panel2')}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="weapon-content"
                id="weapon-panel-header"
              >
                <Typography>Weapon List</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <TableContainer component={Paper}>
                  <Table sx={{ width: 1 }} size="small" aria-label="a dense table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="left">Name</TableCell>
                        <TableCell align="center">Damage</TableCell>
                        <TableCell align="center">Range</TableCell>
                        <TableCell align="center">Rate of Fire</TableCell>
                        <TableCell align="center">Max Clip</TableCell>
                        <TableCell align="center"># of Hands</TableCell>
                        <TableCell align="center">Concealable?</TableCell>
                        <TableCell align="center">Price</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {weaponMaster.map((row, i) => {
                        return (
                          <TableRow key={i}>
                            <TableCell align="left"><CharSheetWeaponDialog prop={row.name} /></TableCell>
                            <TableCell align="center">{row.dmg_type === 'melee' || row.dmg_type === 'bow' ? `Str + ${row.damage}` : `${row.damage}`}</TableCell>
                            <TableCell align="center">{row.dmg_type === 'bow' ? `Str * ${row.range}` : `${row.range}`}</TableCell>
                            <TableCell align="center">{row.rof}</TableCell>
                            <TableCell align="center">{row.max_clip}</TableCell>
                            <TableCell align="center">{row.hands}</TableCell>
                            <TableCell align="center">{row.concealable ? 'Yes' : 'No'}</TableCell>
                            <TableCell align="right">{euroBuck}{row.price.toLocaleString("en-US")}</TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </AccordionDetails>
            </Accordion>
          </Grid>

          <Grid item xs={12}><Typography variant='h4'>Misc Gear</Typography></Grid>
          <Grid item xs={12}><Typography variant='p'>Misc gear is a catch all of equipment that doesn't fit neatly elsewhere.</Typography></Grid>
          <Grid item xs={12}>
            <Accordion disableGutters expanded={expandedGearAccordion === 'panel3'} onChange={handleGearAccordionChange('panel3')}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="misc-gear-content"
                id="misc-gear-panel-header"
              >
                <Typography>Misc Gear List</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="left">Description</TableCell>
                        <TableCell align="left">Price</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {miscGearMaster.map((row, i) => (
                        <TableRow key={row.name}>
                          <TableCell>{row.name}</TableCell>
                          <TableCell align="left">{row.description}</TableCell>
                          <TableCell align="right">{euroBuck}{row.price.toLocaleString("en-US")}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>

              </AccordionDetails>
            </Accordion>
          </Grid>

        </Grid>

      </TabPanel>

      <TabPanel value={value} index={4}>
        <Grid item xs={12}><Typography variant='h4'>Cyberware</Typography></Grid>
        <Grid item xs={12}><Typography variant='p'>Cyberware has a variety of classifications, having to do with where it is located on or inside a character.</Typography></Grid>

        <Tabs
          value={cyberwareValue}
          onChange={handleCyberwareValueChange}
          indicatorColor='secondary'
        >
          <Tab value='fashionware' label='Fashionware' />
          <Tab value='neuralware' label='Neuralware' />
          <Tab value='cyberoptics' label='Cyberoptics' />
          <Tab value='cyberaudio' label='Cyberaudio' />
          <Tab value='internalware' label='Internalware' />
          <Tab value='externalware' label='Externalware' />
          <Tab value='cyberarm' label='Cyberarm' />
          <Tab value='cyberleg' label='Cyberleg' />
          <Tab value='borgware' label='Borgware' />
        </Tabs>
        <Grid item xs={12}>
          <Accordion disableGutters expanded={expandedCyberwareAccordion === 'panel1'} onChange={handleCyberwareAccordionChange('panel1')}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="cyberware-content"
              id="cyberware-panel-header"
            >
              <Typography>Cyberware List</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {cyberwareValue === 'fashionware' ? <Grid item xs={12}><Typography variant='p'>Fashionware is mainly cosmetic, and does no lasting damage to the psyche. Installation is usually painless and done in less than an hour.</Typography></Grid> : <></>}
              {cyberwareValue === 'neuralware' ? <Grid item xs={12}><Typography variant='p'>Neuralware requires a Neural Link, which has a number of chip-slots, usually found in the neck. The rest of the category are simply chips slotted into the link.</Typography></Grid> : <></>}
              {cyberwareValue === 'cyberoptics' ? <Grid item xs={12}><Typography variant='p'>Cyberoptics start by replacing one or both eyes; the other modifications affect the implanted eyes.</Typography></Grid> : <></>}
              {cyberwareValue === 'cyberaudio' ? <Grid item xs={12}><Typography variant='p'>Cyberaudio starts by replacing the inner ear; the other modifications affect the implanted ear replacement. This modification is not visible - no metal ears without a special request.</Typography></Grid> : <></>}
              {cyberwareValue === 'internalware' ? <Grid item xs={12}><Typography variant='p'>Internalware is installed directly inside a character, and runs the gamut from simple contraception implants to nanohives and metal bones.</Typography></Grid> : <></>}
              {cyberwareValue === 'externalware' ? <Grid item xs={12}><Typography variant='p'>Externalware is somewhat misnamed; these generally involve replacing the exterior of a character with something besides skin.</Typography></Grid> : <></>}
              {cyberwareValue === 'cyberarm' ? <Grid item xs={12}><Typography variant='p'>Cyberarms are exactly what they sound like - mechanical replacements for missing limbs.</Typography></Grid> : <></>}
              {cyberwareValue === 'cyberleg' ? <Grid item xs={12}><Typography variant='p'>Cyberlegs are exactly what they sound like - mechanical replacements for missing limbs</Typography></Grid> : <></>}
              {cyberwareValue === 'borgware' ? <Grid item xs={12}><Typography variant='p'>Borgware usually involves fairly extreme changes or replacements, and for the most part doesn't currently work 'cause it's in Beta!</Typography></Grid> : <></>}

              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell align="left">Description</TableCell>
                      <TableCell align="left">Humanity Loss</TableCell>
                      <TableCell align="left">Install Requirement</TableCell>
                      <TableCell align="left">Price</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {cyberwareMaster.map((row, i) => {
                      if (row.type === cyberwareValue) {
                        return (
                          <Fragment key={i}>
                            <TableRow key={i}>
                              <TableCell>{row.name}</TableCell>
                              <TableCell align="left">{row.description}</TableCell>
                              <TableCell align="left">{row.humanity_loss_min} - {row.humanity_loss_max}</TableCell>
                              <TableCell align="left">{row.install_level}</TableCell>
                              <TableCell align="right">{euroBuck}{row.price.toLocaleString("en-US")}</TableCell>
                            </TableRow>
                          </Fragment>)
                      }
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </AccordionDetails>
          </Accordion>
        </Grid>
      </TabPanel>

      <TabPanel value={value} index={5}>
        <Grid container spacing={1} padding={1}>
          <Grid item xs={12}><Typography variant='h4'>Netrunning</Typography></Grid>
          <Grid item xs={12}><Typography variant='p'>Netrunners is the art of accessing computers and networks without tricky things like passwords and information. The <b>INTERNET</b> of old was largely destroyed by the Corporate Wars (physically) and the unleashed hellhounds of a madman named Rache Bartmoss (digitally). The remains of the old Net now have to be securely firewalled away from modern users, lest they be devoured by feral AIs and hostile algorithms that persist across the old Net. Even today, seven kinds of hell can be raised with a simple antenna pointed at the wrong abandoned building with a server bank still humming away on emergency power in the basement.</Typography></Grid>
          <Grid item xs={12}><Typography variant='p'>The modern Net is a -very- loosely connected series of tight, compact networks that are defended by ICE - standing for Intrusion Countermeasure Electronics or Insidious Cortical Electocution.</Typography></Grid>

          <Grid item xs={12}><Typography variant='p'>ICE comes in several versions - White and Black are the most common. White ICE is designed to incapacitate an intruder, in order to allow the proper authorities to kick them in the meat kidneys. Black ICE, on the other hand, skips the line and just melts people's brains out of their ears. It's worth mentioning at this point that in the wake of the 'Net crash and the subsequent Computer Control Acts passed by most major nations, White ICE has almost entirely vanished. In game terms, White Ice does Stun damage, while Black ICE does lethal. Killer ICE (that deals Aggravated damage) is rumored to exist, but has yet to be confirmed.</Typography></Grid>

          <Grid item xs={12}><Typography variant='p'>Nets now are tiny and highly compartmentalized. Nets are divided into <b>Architectures</b>, consisting of multiple levels and possibly forks, with each level containing ICE, password blocks, controls for devices, or data (the latter two being the province of penetrating deeper). A netrunner delves into the Architecture, destroying or bypassing ICE and blocks to obtain their goal.</Typography></Grid>
          <Grid item xs={12}><Typography variant='p'>The downside of many small Architectures from the Netrunner's perspective is that they can no longer sit at home and cruise wherever they like, assisting their comrades while they hide from mortal danger. The upside is that a given Architecture tends not to be especially complex, unless it is some kind of master controller for a major facility. Accessing an Architecture requires finding an Access Point - these come in all shapes and sizes, but are either a low powered wireless contact or a physical slot. Decks can connect to wireless access points from about 10 meters away if they don't have an improved antenna; physical plugs require a physical connection. Netrunners can be forcibly removed from range or unplugged, and the full effects of Jacking Out (see below) if this occurs.</Typography></Grid>
          <Grid item xs={12}><Typography variant='p'>This isn't to say there aren't large networks around - the Data Pool, various warehouses, and corporate sponsored networks exist and can be quite expansive. The required investment in infrastructure and vigorous patrolling by government and/or corporate sponsored White Hat Netrunners means hacking them is a losing proposition, and they tend to not to have links to the less affluent parts of town.</Typography></Grid>
          <Grid item xs={12}><Typography variant='p'></Typography>As an example, a standard office building probably has one Architecture responsible for controlling its elevators, sprinkler system, air conditioning, and the like, which will be guarded more or less loosely and have any number of maintenance Access Points. A separate Architecture might control the cameras, locks, alarms, and hidden gun turrets. The access to this network is probably much more limited, and it likely has significantly more powerful firewalls. Finally, a third might actually house interesting data and spreadsheets and stuff. This is cumbersome to maintain, but offers great advantages - if a Netrunner manages to compromise the elevators, the turrets can still blow them to hell; if they compromise both their brain is probably half-cooked before they even start trying to get into the Corpo Crown Jewels.</Grid>
          <Grid item xs={12}><Typography variant='p'>Netrunning requires the use of a Cyberdeck and Neural Plugs - A Netrunner must therefore have a Deck and a Neural Link in order to Netrun. They are advised to invest in a pair of Virtuality Goggles - this allows them to continue Netrunning while keeping tabs on the physical world. If they have these (or their cybereye equivalent) they have the option of taking either a Standard Action or as many Netrunning actions as their Interface skill allows. If they don't have these, a Netrunner is essentially catatonic while 'running. Any roll while Netrunning uses Intelligence + Interface unless otherwise specified.</Typography></Grid>

          <Grid item xs={12}><Typography variant='h5'>Jacking In / Out</Typography></Grid>
          <Grid item xs={12}><Typography variant='p'>Jacking In to an Architecture requires, as mentioned, physical access to an Access Point. Jacking Out can be done either manually, as a single Netrunner action (provided nothing is stopping them...) or it can be done forcibly, by moving out of range or having one's plugs removed. In either case, the Architecture 'resets', and all programs and ICE previously encountered will be reset and returned to full strength. No changes made will persist if the Netrunner didn't make it to the Root of the Architecture and alter things to their liking.</Typography></Grid>
          <Grid item xs={12}><Typography variant='p'>If the Netrunner is forcibly Jacked Out, they suffer an immediate single attack by EVERY piece of ICE they've encountered and not de-rezzed - this attack cannot be defended against, and comes in reverse of the normal damage sequence - aggravated damage first, then lethal, then stun. It is resisted with a single Netrunner Soak Roll - the end result is usually 1 Netrunner, Medium Rare.</Typography></Grid>

          <Grid item xs={12}><Typography variant='h5'>Interface Actions</Typography></Grid>
          <Grid item xs={12}><Typography variant='p'>Actions use 1 NET action unless otherwise noted</Typography></Grid>
          <Grid item xs={12}><Typography variant='p'>Scanner: Uses 1 Meatspace action to find the locations of any Access Points in range of the Netrunner's deck. The difficulty of this roll may be affected (for the better) by a particularly open area or (for the worse) by large amounts of electronic interference, heavy metal structures, etc between the AP and the Netrunner.</Typography></Grid>
          <Grid item xs={12}><Typography variant='p'>PathFinder: Allows the Netrunner to map the Architecture they're jacked into. Each success reveals another floor or some information on the same. Cannot be used to see past Password Obstructions.</Typography></Grid>
          <Grid item xs={12}><Typography variant='p'>Change Floors: The Netrunner can move to any floor in the Architecture they've already been to as a single NET action.</Typography></Grid>
          <Grid item xs={12}><Typography variant='p'>Slide: Allows the Netrunner to flee Net combat or avoid it entirely. Roll Interface (+ any software bonuses) against Program Perception. If successful, the Netrunner moves up or down one floor. Can only be done once per turn; can be done pre-emptively if hostile software has been revealed with Pathfinder Action.</Typography></Grid>
          <Grid item xs={12}><Typography variant='p'>Backdoor: Netrunner breaks through a Password barrier. DV is based on quality of the Password Software.</Typography></Grid>
          <Grid item xs={12}><Typography variant='p'>Zap: Allows Netrunner to make an unmodified attack on enemy program/Netrunner. Deals Netrunners Interface score in damage. Deals Stun damage to Netrunners.</Typography></Grid>
          <Grid item xs={12}><Typography variant='p'>Control: Cause one item connected to the Architecture to perform an action.</Typography></Grid>
          <Grid item xs={12}><Typography variant='p'>EyeBall: Identify and assess a single piece of Data found on the Architecture. This action is typically automatic, but some Data may require a knowledge roll to assess properly (decyphering payroll accounts to find out who's embezzling may require an Intelligence + Business roll, for example).</Typography></Grid>
          <Grid item xs={12}><Typography variant='p'>Virus: Once in the Root of an Architecture, the Netrunner can make a Virus to make changes or perform scripted actions that will persist beyond when a Netrunner Jacks Out. Viruses require a number of successes to make based on the complexity and number of changes being made, and may require the Netrunner to make an extended roll to achieve the required number..</Typography></Grid>
          <Grid item xs={12}><Typography variant='p'>Cloak: Once a Netrunner makes changes, they tend to be painfully obvious to the owner's sysadmins and tame script kiddies. Cloak actions conceal the Netrunner's activity - they roll against a DV of 6, and other Netrunners must make a Pathfinder roll and get more successes than the Cloaking Netrunner to find their changes.</Typography></Grid>


          <Grid item xs={12}><Typography variant='h5'>Net Combat:</Typography></Grid>
          <Grid item xs={12}><Typography variant='p'>ICE has nothing better to do than wait around to ambush unwary Netrunners, and rolls it's Speed vs. the Netrunner's Interface score (+ any applicable bonuses). If more than one piece of ICE is involved, they use the highest Speed attribute - slower, more dangerous programs are often paired with quicker ones for this very purpose.</Typography></Grid>
          <Grid item xs={12}><Typography variant='p'>Once combat commences, attacks are made as follows:</Typography></Grid>
          <Grid item xs={12} display={'flex'} justifyContent={'center'}><Typography variant='p'><i>Interface + Software Attack or ICE Attack Attribute</i></Typography></Grid>
          <Grid item xs={12} display={'flex'} justifyContent={'center'}><Typography variant='p'><i>vs.</i></Typography></Grid>
          <Grid item xs={12} display={'flex'} justifyContent={'center'}><Typography variant='p'><i>Interface + Software Defense or ICE Defense Attribute</i></Typography></Grid>

          <Grid item xs={12}><Typography variant='p'>Damage from ICE is soaked normally, but uses Willpower in place of the Body Attribute. White ICE causes stun damage, while Black ICE deals Lethal wounds.</Typography></Grid>
          <Grid item xs={12}><Typography variant='p'>Netrunners and ICE can attack each other directly, or they can attack Netrunner Programs. Software uses the REZ attribute as a wound track; if it fills the program is said to be De-Rezzed and requires 2 Net actions to restore. Some ICE makes a point of destroying software, and can delete a Netrunner's programs permanently.</Typography></Grid>
          <Grid item xs={12}><Typography variant='p'>A Netrunner can only have one Weapon Software active each round, but it adds it's Attack both to rolls to hit enemy software. Likewise, its Defensive attribute is added to Interface rolls to defend against enemy attacks.</Typography></Grid>
          <Grid item xs={12}><Typography variant='p'>Damage consists of the Netrunner's Interface score + Weapon Software Attack Rating</Typography></Grid>
          <Grid item xs={12}><Typography variant='p'>A Netrunner can flee ICE by using the Slide action - they can attempt this automatically if they already know ICE is waiting via the Pathfinder action.</Typography></Grid>

          <Grid item xs={12}><Typography variant='h5'>Final Notes on Netrunning:</Typography></Grid>
          <Grid item xs={12}><Typography variant='p'>Only a limited amount of software can be activated each round - equal to the number of slots in the deck divided by 3 (rounded down). This makes the first level of most Architecture the most dangerous, as the Netrunner has to deal with ICE with only a limited selection of their software active.</Typography></Grid>
          <Grid item xs={12}><Typography variant='p'>Netrunners don't fall unconscious while Netrunning; likewise, they can ignore wound penalties on NET actions equal to their Interface score. It is easy to push themselves into suffering massive amounts of damage, and they will fall unconscious / into making Death Saves normally once they Jack Out. What is happening is extremely apparent from the outside.</Typography></Grid>
          <Grid item xs={12}><Typography variant='p'>Non weapon software effects stack unless otherwise noted.</Typography></Grid>
          <Grid item xs={12}><Typography variant='p'><i>Example of a Netrun:</i></Typography></Grid>
          <Grid item xs={12}><Typography variant='p'><i>Tahei has located an Access Point, and Jacks In with his interface plugs. The first level of the Architecture is a simple password prompt - he takes a few rounds to activate two Speedy programs, a See Ya, a Shield, and his Ban Hammer. Properly equipped, he uses a Pathfinder Action and scores two successes - he determines the next floor has a Scorpion waiting for him. He moves to the floor, and rolls 4 (his Interface) + 2 (one for each Speedy program), while the GM rolls the Scorpion's speed of 4. Tahei wins, and he elects to use his Ban Hammer the Scorpion - it adds two to Attack, so he easily hits the scorpion and deals 6 wounds to it - instantly de-rezzing the hostile program. Tahei performs an EyeBall on the floor, and gets three successes - but turns up nothing interesting in the data stored on this level. Satisfied this floor is useless, Tahei makes another Pathfinder check - scoring a single success and determining that the next floor consists of a fork.</i></Typography></Grid>
          <Grid item xs={12}><Typography variant='p'><i>Tahei moves to the next floor without waiting for his actions to refresh, and realizes he missed a quartet of White ICE Wisps some joker has loaded into the floor. He's out of actions, and the Wisps immediately Voltron together into something much scarier than they normally are. They attack (their attack upped to 5) and get 3 successes to Tahei's 2 on an Interface + 0 roll - Ban Hammers are hardly defensive weapons. Tahei shield takes the hit and deactivates - he's surprised but doing alright so far. He decides messing around with Wisps is stupid, and Slides to the next floor - he gets 3 successes to the Wisps 2, and manages to shake the ICE.</i></Typography></Grid>
          <Grid item xs={12}><Typography variant='p'><i>The next floor a Password gate, and is mercifully free of interfering ICE. Tahei takes 2 actions to deactivate and reactivate his shield, and another one to crack the password. He opts to take the left fork after his PathFinder reveals the Root 2 floors down, with no more ICE in sight.</i></Typography></Grid>
          <Grid item xs={12}><Typography variant='p'><i>A few more floors and another Slide past a pair of Hellhounds finds Tahei on the Root of the Architecture. He wants to let the management know exactly what he thinks of their stupid Wisptron, and resolves to shut it down permanently. He takes a Virus action, then uses EyeBall to find the data he came here for originally.</i></Typography></Grid>
          <Grid item xs={12}><Typography variant='p'><i>At this point, the security guard finds the recumbent Tahei hiding behind the potted plant, and unplugs him from the Access Point - Tahei is Jacked Out forcibly. He must immediately soak 5 stun wounds from the Wisptron and 10 lethal ones from the pair of Hellhounds. This damage comes in a massive lump - thankfully, Tahei took the time to reactivate his Shield program and it takes most of the hit. He still has to soak 7 damage, managing to get 1 successes on his willpower roll, and he suffers 1 lethal and 5 stun damage. He also has to explain himself to a pissed off security drone. Hopefully the rest of his team shows up to assist soon!</i></Typography></Grid>

          <Grid item xs={12}><Typography variant='h4'>Netrunner Gear</Typography></Grid>
        </Grid>
        <Accordion disableGutters expanded={expandedNetrunnerAccordion === 'panel1'} onChange={handleNetrunnerAccordionChange('panel1')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="netrunner-content"
            id="netrunner-panel-header"
          >
            <Typography>Netrunner Gear List</Typography>
          </AccordionSummary>
          <AccordionDetails >
            <Grid container sx={{ minWidth: 1 }}>
              {netrunnerValue === 'deck' ? <Grid item xs={12}><Typography variant='p'>Decks are small, immensely powerful computers. Netrunners jack directly into them to perform Netruns on hostile networks.</Typography></Grid> : <></>}
              {netrunnerValue === 'software' ? <Grid item xs={12}><Typography variant='p'>Software runs on the Netrunner's Deck and always require 1 slot.</Typography></Grid> : <></>}
              {netrunnerValue === 'mod' ? <Grid item xs={12}><Typography variant='p'>Mods are physical changes to a deck; they reduce a deck's capacity for software but offer compensating advantages.</Typography></Grid> : <></>}
              <Tabs
                value={netrunnerValue}
                onChange={handleNetrunnerValueChange}
                indicatorColor='secondary'
              >
                <Tab value='deck' label='Decks' />
                <Tab value='software' label='Software' />
                <Tab value='mod' label='Mods' />
                <Tab value='black ice' label='ICE' />
              </Tabs>
              <TableContainer sx={{ minWidth: 1 }} component={Paper}>
                <Table size="small" aria-label="a dense table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell align="left">Description</TableCell>
                      {netrunnerValue === 'deck' ? (
                        <>
                          <TableCell align='center'>Slots</TableCell>
                        </>) : <></>}
                      {netrunnerValue === 'software' ? (
                        <>
                          <TableCell align='center'>Attack</TableCell>
                          <TableCell align='center'>Defense</TableCell>
                        </>
                      ) : <></>}
                      {netrunnerValue === 'mod' ? (
                        <>
                          <TableCell align='center'>Slots</TableCell>
                        </>) : <></>}
                      <TableCell align="center">Price</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {netrunnerMaster.map((row, i) => {
                      if (row.type === netrunnerValue) {
                        return (
                          <Fragment key={i}>
                            <TableRow key={row.name}>
                              <TableCell>{row.name} </TableCell>
                              <TableCell align="left">{row.description}</TableCell>
                              {netrunnerValue === 'software' ? (
                                <>
                                  <TableCell align='center'>{row.attack}</TableCell>
                                  <TableCell align='center'>{row.defense}</TableCell>
                                </>
                              ) : <></>}
                              {netrunnerValue === 'deck' ? (
                                <>
                                  <TableCell align='center'>{row.slots}</TableCell>
                                </>
                              ) : <></>}
                              {netrunnerValue === 'mod' ? (
                                <>
                                  <TableCell align='center'>{row.slots}</TableCell>
                                </>
                              ) : <></>}
                              <TableCell align="center">{euroBuck}{row.price.toLocaleString("en-US")}</TableCell>
                            </TableRow>
                          </Fragment>)
                      }
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </AccordionDetails>
        </Accordion>

      </TabPanel>

      <TabPanel value={value} index={6}>
        <Grid container spacing={1} padding={1}>
          <Grid item xs={12}>
            <Typography variant='h4'>
              Combat & Actions
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant='p'>
              A 'round' covers about 4 - 5 seconds. When combat starts, everyone rolls initiative. The higher one's initiative is, the sooner they go. If two character's tie, the one with higher reflexes goes first. Each round, each character gets a turn, consisting of a Simple Action and a Complex Action. There are also a very limited number of free actions. If desired, a character can a second simple action in place of their complex action. If a character elects to move, they can perform a combination of movements and other actions - a character with Move 3 and a ROF 2 weapon can move 1 meter, shoot a weapon, then move 2 more meters, and shoot again.
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant='p'>
              Initiative is calculated as follows:
            </Typography>
          </Grid>

          <Grid item xs={12} display={'flex'} justifyContent={'center'}><Typography variant='p'><i>Initiative: Reflexes</i></Typography></Grid>
          <Grid item xs={12} display={'flex'} justifyContent={'center'}><Typography variant='p'><i>+</i></Typography></Grid>
          <Grid item xs={12} display={'flex'} justifyContent={'center'}><Typography variant='p'><i>Reflexes roll against DV6</i></Typography></Grid>

          <Grid item xs={12}>
            <Accordion disableGutters expanded={expandedCombatAccordion === 'panel1'} onChange={handleCombatAccordionChange('panel1')}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="combat-actions-content"
                id="combat-actions-panel-header"
              >
                <Typography>Combat Action Table</Typography>
              </AccordionSummary>
              <AccordionDetails >

                <Typography variant='p'>
                  <TableContainer sx={{ minWidth: 1 }} component={Paper}>
                    <Table size="small" aria-label="a dense table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Action</TableCell>
                          <TableCell align="left">Action Type</TableCell>
                          <TableCell align='left'>Description</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell>Move</TableCell>
                          <TableCell align="left">Simple</TableCell>
                          <TableCell align='left'>Normal move action</TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell>Reload</TableCell>
                          <TableCell align="left">Simple</TableCell>
                          <TableCell align='left'>Fully reload a firearm. Requires a free hand.</TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell>Equip Item</TableCell>
                          <TableCell align="left">Simple</TableCell>
                          <TableCell align='left'>Bring a weapon, shield, or other item to hand from pocket/bag/harness.</TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell>Stow Item</TableCell>
                          <TableCell align="left">Simple</TableCell>
                          <TableCell align='left'>Put a weapon, shield, or other item from hand into pocket, bag, or harness.</TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell>Hit the Deck</TableCell>
                          <TableCell align="left">Simple</TableCell>
                          <TableCell align='left'>Drop prone and move up to 1 meter.</TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell>Get into Vehicle</TableCell>
                          <TableCell align="left">Simple</TableCell>
                          <TableCell align='left'>Get into a vehicle.</TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell>Start Vehicle</TableCell>
                          <TableCell align="left">Simple</TableCell>
                          <TableCell align='left'>Turn a vehicle on and put into gear.</TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell>Drop Item</TableCell>
                          <TableCell align="left">Free</TableCell>
                          <TableCell align='left'>Drop item in hand to ground.</TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell>Run</TableCell>
                          <TableCell align="left">Complex</TableCell>
                          <TableCell align='left'>Take a second move action. Can optionally roll Reflexes + Athletics and move additional 1 meter per success.</TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell>Attack</TableCell>
                          <TableCell align="left">Complex</TableCell>
                          <TableCell align='left'>Make a number of Melee or Ranged attacks equal to the weapon's ROF.</TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell>Get Up</TableCell>
                          <TableCell align="left">Complex</TableCell>
                          <TableCell align='left'>Recover from being <b>prone</b>.</TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell>Grab</TableCell>
                          <TableCell align='left'>Complex</TableCell>
                          <TableCell align="left">Grab opponent on succesful Brawl attack.</TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell>Choke</TableCell>
                          <TableCell align='left'>Complex</TableCell>
                          <TableCell align="left">Choke a grabbed opponent, dealing (Strength) stun wounds with no soak roll.</TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell>Human Shield</TableCell>
                          <TableCell align='left'>Complex</TableCell>
                          <TableCell align="left">Turn a grabbed opponent into a human shield, and use grabbed opponent wound track and armor in place of one's own.</TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell>Throw</TableCell>
                          <TableCell align='left'>Complex</TableCell>
                          <TableCell align="left">Throw grabbed opponent to floor, or (Strength) meters.</TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell>Vehicle Maneuver</TableCell>
                          <TableCell align='left'>Complex</TableCell>
                          <TableCell align="left">Perform dangerous or challenging maneuver in a vehicle.</TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell>Netrunner Actions</TableCell>
                          <TableCell align='left'>Complex</TableCell>
                          <TableCell align="left">Perform a number of NET actions based on character's Netrunner skill.</TableCell>
                        </TableRow>

                      </TableBody>
                    </Table>
                  </TableContainer>
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Grid>

          <Grid item xs={12}>
            <Typography variant='h6'>
              Movement
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant='p'>
              Movement is equal to Reflexes divided by 2 (rounded up) meters per move action, and can be modified by some cyberware.
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant='p'>
              Movement can be increased dramatically if that's all character does that round - they can simply move twice as far with a complex action. They can also make an athletics test (typically paired with Reflexes, though Willpower may be more appropriate in some firefights) to move even further, adding 1 meter for each success rolled.
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant='h6'>
              Attack Rolls
            </Typography>
          </Grid>

          <Grid item xs={12} display={'flex'} justifyContent={'center'}><Typography variant='p'><i>Attacker Reflexes + Weapon Skill</i></Typography></Grid>
          <Grid item xs={12} display={'flex'} justifyContent={'center'}><Typography variant='p'><i>vs</i></Typography></Grid>
          <Grid item xs={12} display={'flex'} justifyContent={'center'}><Typography variant='p'><i>Defender Reflexes (+ Weapons skill if both characters are using melee weapons)</i></Typography></Grid>
          <Grid item xs={12} display={'flex'} justifyContent={'center'}><Typography variant='p'><i>Base DV for both is 6; modified by distance, called shots, and other modifiers. Defender wins ties.</i></Typography></Grid>
          <Grid item xs={12} display={'flex'} justifyContent={'center'}><Typography variant='p'><i>Attacker damage is equal to weapons base damage + number of successes on attack, minus number of defender successes.</i></Typography></Grid>

          <Grid item xs={12} display={'flex'} justifyContent={'center'}>
            <Typography variant='p'>
              <b>Soaking Damage</b>
            </Typography>
          </Grid>

          <Grid item xs={12} display={'flex'} justifyContent={'center'}><Typography variant='p'><i>After determining damage; roll Body + Current Armor against DV6. Each success reduces wounds suffered by 1.</i></Typography></Grid>
          <Grid item xs={12} display={'flex'} justifyContent={'center'}><Typography variant='p'><i>Wound penalties do not apply to this roll, and 1s are disregarded.</i></Typography></Grid>



          <Grid item xs={12}>
            <Typography variant='h6'>
              Wielding Multiple Weapons
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant='p'>
              Obviously it's pretty cool, but weapons must split their ROF to be used in a single turn. For instance, a character can use a machete (medium melee weapon, ROF 2) for one attack, walk down a hall and shoot a ganger with a Heavy pistol (ROF 2). The lowest ROF applies if one weapon's is higher than the other (e.g. a character with a SMG and a Machete has an effective ROF of 2). If any weapon has a ROF of 1, it cannot be used in the same round as another weapon.
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant='p'>
              <i>Example Combat Round:</i>
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant='p'>
              <i>Raff takes a shot with a Pistol at a ganger. They roll 6 dice -  3 from Reflexes + 3 from Firearms skill - and get 4 successes. The ganger rolls 3 (Reflexes) dice, getting 1 success. Raff deals 7 damage to the ganger - 4 from the weapon's base damage, and 3 additional from their roll (4 successes on attack - 1 from ganger's reflexes).</i>
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant='p'>
              <i>The ganger rolls 4 soak dice - 2 from their Body + 2 from their Armor, and gets 2 successes - finally, they take 5 lethal wounds. They also mark 1 point off their armor as Raff blows a big hole in it. Raff shoots them again, as their weapon has a ROF of 2 - Raff gets a whopping 5 successes on their unchanged roll, but with 5 wounds the ganger now has a 2 die wound penalty to their Reflexes roll to dodge - they roll 2 dice, and get no successs. Raff thus deals a total of 9 lethal damage. The ganger rolls 3 soak dice - their armor has been degraded, costing them a point, but their roll is otherwise unchanged by wound penalties. They get a single success - the ganger has filled their wound track, with 3 additional damage to deal with. The ganger falls, with 3 aggravated wounds overwriting their full lethal track, and the ganger is unlikely to survive much longer if they don't get prompt medical attention.</i>
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant='h6'>
              Ranged Weapon Special rules
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant='p'>
              <b>Range</b>
            </Typography>
          </Grid>
          <Grid container padding={1}>
            <Grid item xs={12}>Range is measured in meters. Melee weapons must be used within 1 meter of the target. In grid based play, each square is one meter. Otherwise, the GM has final say over whether a target is in range or not.</Grid>
            <Grid item xs={12}>Shots fired at a target 1 or 2 meters away are considered 'point blank', and have a difficulty value 1 lower than normal to hit (typically 5).</Grid>
            <Grid item xs={12}>Shots fired at a target 3 meters to their stated range are considered 'in range', and have no modifiers to the difficulty value (typically 6).</Grid>
            <Grid item xs={12}>Shots fired at a target between 1 and 2 times the weapons Range are considered 'long range', and have a difficulty value 1 higher than normal to hit (typically 7).</Grid>
            <Grid item xs={12}>Shots fired at a target between 2 and 3 times the weapons Range are considered 'extreme range', and have a difficulty value 3 higher than normal to hit (typically 9).</Grid>
          </Grid>

          <Grid item xs={12}>
            <Typography variant='p'>
              <b>Aimed Shots</b>
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant='p'>
              Aimed shots change any weapons ROF to 1. Both Melee and Ranged weapons can take aimed shots. An aimed shot raises the DV to hit by 2.
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant='p'>
              <TableContainer sx={{ minWidth: 1 }} component={Paper}>
                <Table size="small" aria-label="a dense table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Target</TableCell>
                      <TableCell align="left">Effect</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>Head</TableCell>
                      <TableCell align="left">If target doesn't have helmet or hardened armor, damage is mulitplied by 2 before soaking.</TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell>Held Item</TableCell>
                      <TableCell align="left">If damage is not completely soaked, item is dropped.</TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell>Critical Injury</TableCell>
                      <TableCell align="left">Select and inflict chosen critical injury from table below. Injury must make sense given the weapon - it is not possible to inflict a crushed windpipe with a sniper rifle, unless you're in melee range.</TableCell>
                    </TableRow>

                  </TableBody>
                </Table>
              </TableContainer>
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant='p'>
              <b>Automatic Fire</b>
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant='p'>
              Characters firing a weapon in full automatic have a ROF of 1 and a base difficulty of 5 on their attack. Their weapon must have 10 or more rounds remaining in its clip. The attacker cannot perform aimed shots, and additional successes on the attack do not provide additional damage. However, the attacker can remove dice from their attack die pool. If they do so, they can force their opponent to remove the same number of dice from their Reflexes roll to dodge <b>OR</b> their soak roll.
              Automatic Fire is only usable at the weapons normal range. If used at point blank range, the attacker has a difficulty of 4.
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant='p'>
              <b>Suppressing Fire</b>
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant='p'>
              Instead of aiming for a specific target, an attacker can encourage others to keep their head down. The attackers weapon has a ROF of 1 and a difficulty of 5 for this 'attack'. Their weapon must have 10 or more rounds remaining in the clip. When used succesfully, <b>everyone</b> in front of the shooter within 20 meters must succeed on a Willpower check (difficulty value 6) and score more successes than the attacker in order to do anything besides seek cover or hit the deck immediately.
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant='p'>
              <b>Shellfire</b>
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant='p'>
              Shotguns can be set to wide dispersal, and can hit a 2x2 square up to 3 meters away from the shooter in grid play. This attack has a base DV of 7, cannot be aimed, and additional successes do not increase damage. Thit attack can only be dodged by characters with Reflexes of 6 or higher. In narrative play, the GM has the final say on whether enemies are close enough together for a single shotgun attack to hit more than one target.
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant='p'>
              <b>Explosives</b>
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant='p'>
              Explosives damage a large area rather than hitting a specific target. Similar to shellfire, they deal damage in a large area. Landing an explosive in a specific location requires 3 successes on the attack roll - it drifts a bit on attacks that get fewer than 3 successes. Only characters with Reflexes of 6 or higher who can get out of range in a single move action have a chance of dodging explosive attacks.
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant='h6'>
              Melee Weapon Special Rules
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant='p'>
              <b>Bare Knuckle Boxing</b>
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant='p'>
              Brawling attacks deal (Strength) stun wounds. Brawling attacks do NOT ablate armor. This also goes for Cyberarms. Characters with the Big Knucks Cyberware can deal Stun or Lethal wounds, but still do not ablate armor.
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant='p'>
              <b>Fencing</b>
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant='p'>
              When two characters wielding a melee weapon attack each other, they roll Reflexes + Melee Weapon (or brawling, if both are unarmed) rather than just Reflexes. If the defender scores more successes on their defense roll than the attacker, those successes are added to the defenders next attack roll, provided it is with a melee weapon and is the next complex action they take.
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant='p'>
              <b>Grab</b>
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant='p'>
              Requires 1 free hand. Attacker and Defender both roll Reflexes + Brawling against difficulty 6. If attacker wins, either the defender is grabbed or the attacker can remove one item from their hand(s). Grabs can be released by attacker at any time. Both characters have +1 difficulty to all actions as long as the Grab is active. The defender or any other character can roll Reflexes + Brawling to try and break the grab, with the grab broken if the attacker gets fewer successes than the defender.
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant='p'>
              Note: A character can grab 2 people if they have no weapons in either hand. Difficulty penalties are cumulative for attacker (not the defender).
            </Typography>
          </Grid>


          <Grid item xs={12}>
            <Typography variant='p'>
              <b>Choke</b>
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant='p'>
              If a character has someone in a grapple, they can choke the defender as a complex action. This deals [Strength] stun wounds. This damage is not able to be soaked. Characters wearing Hardened Armor cannot be choked.
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant='p'>
              <b>Throw</b>
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant='p'>
              If a character has someone in a grapple, they can throw them up to (Strength) meters. The victim lands prone.
            </Typography>
          </Grid>

        </Grid>
      </TabPanel>

      <TabPanel value={value} index={7}>
        <Grid container spacing={1} padding={1}>
          <Grid item xs={12}>
            <Typography variant='h4'>
              Injuries & Dying
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant='h6'>
              Dying
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant='p'>
              <b>Consciousness and Dying:</b>
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant='p'>
              Characters whose damage track is filled are either unconscious or dying.
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant='p'>
              If the last wound in the track is a Stun wound, the character is merely unconscious. The exception is characters on Stims or with a Pain Editor; they can only be rendered unconscious with Lethal Damage. Generally, they cannot take further actions, and any actions they attempt are at a severe penalty. Any further stun wounds they suffer are now Lethal.
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant='p'>
              Characters whose damage tracked is filled with lethal damage are <b>dying</b>. They are unconscious, and must make a <b>Death Save</b> each round. This save has an initial difficulty value of 4, but it increases by 1 for each Aggravated wound the character has suffered, to a maximum of 8. Success means they live; failure means immediate death. They can be stabilized with a First Aid (DV8) or Paramedic (DV6) roll. If successful, the character no longer needs to make Death Saves. Any further lethal wounds the character receives are instead Aggravated. Death Saves do not suffer from wound based die penalties.
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant='p'>
              Characters whose last wound is Aggravated require immediate and continuing medical attention to survive. They will require a First Aid (DV9) or Paramedic (DV7) Stabilization Roll; they will need to accrue at least 3 successes to stabilize the character. The character must make a <b>Death Save</b> each round, with a base difficulty of 9. Failure on this roll results in immediate death. Any single damage source that fills a damage track with aggravated damage does no further harm; that is, a character with 2 remaining wounds who suffers 2 additional aggravated wounds is treated no differently from one who suffers 6 additional aggravated wounds. However, ANY further damage will instantly slay the character, regardless of its source or type.
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant='p'>
              <b>The Last Word:</b>
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant='p'>
              Characters who are unconscious generally can take no actions (other than Death Saves, if applicable). However, they can use their luck to roll over onto a syringe full of adrenaline, twitch their trigger finger at the right moment, or have their head bang into the eject button. The character can perform a single Complex Action that isn't moving during their turn, but to do so they must burn one point of Luck <b>permanently.</b> They do not suffer wound penalties on this roll.
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant='p'>
              <b>But My Body is Chrome!</b>
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant='p'>
              Up to half a character's health can originate from Cyberware, so surely it can be recovered faster by the simple application of a screwdriver, right? In a word: No. The delicate nerve connections to the 'ware are damaged when cyberware is damaged, and only crazy future medicine allows nerve regeneration at all. Ultimately, the GM has the final say on this kind of thing - if your character is fully borged out and they have a spare body laying around, they might be able to recover quicker.
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant='h6'>
              Critical Injuries
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant='p'>
              Most critical injuries are the results of aimed shots. Additionally, if a character receives more than 7 damage in a single attack (after soaking), they receive a random critical injury - see table below. Other events - car crashes, long falls, etc - can result in a Critical injury at the GM's discretion.
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant='p'>
              A critical injury can be alleviated for 1 hour if a Quick Fix can be applied, otherwise it can be removed with treatment - this requires a roll as indicated on the table, and recovery of at least 3 wounds.
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant='p'>
              <TableContainer sx={{ minWidth: 1 }} component={Paper}>
                <Table size="small" aria-label="a dense table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Roll</TableCell>
                      <TableCell align="left">Injury</TableCell>
                      <TableCell align="left">Effect</TableCell>
                      <TableCell align="left">Quick Fix?</TableCell>
                      <TableCell align="left">Treatment</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>1</TableCell>
                      <TableCell>Broken/Dismembered Arm</TableCell>
                      <TableCell>The limb cannot be used. Any gear in arm is dropped.</TableCell>
                      <TableCell>N/A</TableCell>
                      <TableCell>Surgery, DV7, replacement limb</TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell>2</TableCell>
                      <TableCell>Broken/Dismembered Leg</TableCell>
                      <TableCell>The limb cannot be used. -3 move stat, min 1. Character is knocked <b>prone</b>.</TableCell>
                      <TableCell>N/A</TableCell>
                      <TableCell>Surgery, DV7, replacement limb</TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell>3</TableCell>
                      <TableCell>Collapsed Lung</TableCell>
                      <TableCell>-2 to Move, begin making death saves as though track is filled with Lethal Damage.</TableCell>
                      <TableCell>First Aid DV9, Paramedic DV7</TableCell>
                      <TableCell>Surgery DV7</TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell>4</TableCell>
                      <TableCell>Foreign Object</TableCell>
                      <TableCell>If the character uses a move action, take 1 unsoakable lethal damage per meter moved.</TableCell>
                      <TableCell>First Aid DV9, Paramedic DV7</TableCell>
                      <TableCell>Quick fix removes injury, or Surgery DV6</TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell>5</TableCell>
                      <TableCell>Torn Muscle</TableCell>
                      <TableCell>All wound penalties increased by 2.</TableCell>
                      <TableCell>N/A</TableCell>
                      <TableCell>Paramedic DV8, Surgery DV7</TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell>6</TableCell>
                      <TableCell>Spinal Injury</TableCell>
                      <TableCell>Can only take 1 Complex action each round.</TableCell>
                      <TableCell>N/A</TableCell>
                      <TableCell>Surgery DV8</TableCell>
                    </TableRow>


                    <TableRow>
                      <TableCell>7</TableCell>
                      <TableCell>Lost Aye</TableCell>
                      <TableCell>Avast, ye be having -3 dice to yer ranged attacks!</TableCell>
                      <TableCell>N/A</TableCell>
                      <TableCell>Surgery, DV7, Replacement Eye</TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell>8</TableCell>
                      <TableCell>Concussion</TableCell>
                      <TableCell>+1 DV to any roll involving a Skill</TableCell>
                      <TableCell>First Aid DV8, Paramedic DV6</TableCell>
                      <TableCell>Quick fix removes injury.</TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell>9</TableCell>
                      <TableCell>Broken Jaw</TableCell>
                      <TableCell>Character cannot speak.</TableCell>
                      <TableCell>N/A</TableCell>
                      <TableCell>Paramedic DV7, Surgery DV6</TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell>10</TableCell>
                      <TableCell>Crushed Windpipe</TableCell>
                      <TableCell>Cannot speak. Begin making death saves as though track is filled with Lethal Damage.</TableCell>
                      <TableCell>First Aid DV8, Paramedic DV6</TableCell>
                      <TableCell>Surgery, DV6</TableCell>
                    </TableRow>

                  </TableBody>
                </Table>
              </TableContainer>
            </Typography>
          </Grid>


        </Grid>
      </TabPanel>

      <TabPanel value={value} index={8}>
        <Grid container padding={1} spacing={1}>
          <Grid item xs={12}>
            <Typography variant='h4'>
              Vehicles
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant='p'>
              <b>Using a Vehicle</b>
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant='p'>
              Getting into and starting a vehicle requires a full round - the character can start driving on the next turn after getting into the vehicle. This is for reasons of Realism, and may be waived by the GM if annoying.
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant='p'>
              Piloting a vehicle is usually a Reflexes (manual control) or Technique (when using interface plugs) test + the appropriate piloting skill. Basic operation of a ground or sea vehicle requires no checks if you have at least one dot in the relevant skill, and in good circumstances even without any skills a character won't have too much trouble. Air vehicles are barely less friendly in the modern era, and most can be operated without killing everyone on board at least to the nearest flat piece of ground.
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant='p'>
              Maneuvers and complex actions generally require a vehicle test, with a difficulty assigned by the GM. The GM further has final say on whether certain maneuvers can be performed by a character without the appropriate skill.
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant='p'>
              Using a weapon or attempting to do anything else while driving all require the appropriate piloting skill, and generally result in a divided dice pool - select the lower of the two skill pools, and divide the dice from that pool between piloting and whatever else is happening. Even routine driving may require a check depending on what the character is doing.
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant='p'>
              <b>Ramming:</b>
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant='p'>
              Ramming another vehicle deals a number of lethal wounds equal to the vehicles structure to BOTH the ramming vehicle and the target vehicle. This can be increased by high speed and other factors. The driver and passengers also suffer a number of stun wounds (at least) determined by the GM. Ramming a pedestrian deals a number of lethal wounds equal to the vehicles structure, and the vehicle takes a number of wounds equal to the number of the pedestrians cyberlimbs.
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant='p'>
              <b>Interface Plugs:</b>
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant='p'>
              Interface plugs allow, amongst other things, operating a vehicle with one's mind. This allows for some rather flashier maneuvers, though there's always a risk of dangerous feedback.
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant='p'>
              Multi-tasking is made much easier - characters connected via interface plaugs divide the LARGER of two die pools for actions. The smaller pool cannot be larger than normal.
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant='p'>
              Feedback - If a character is connected via interface plugs and the first half of the vehicles damage track is filled, they immediately suffer 4 unsoakable lethal wounds. If the second track fills, they immediately suffer 4 unsoakable aggravated wounds (these can overwrite the lethal wounds). If something sufficiently catastrophic happens that fills the damage track in a single round, the character suffers the lower of the vehicles max health or 8 unsoakable aggravated wounds.
            </Typography>
          </Grid>
        </Grid>
      </TabPanel>
    </Box >
  );
}