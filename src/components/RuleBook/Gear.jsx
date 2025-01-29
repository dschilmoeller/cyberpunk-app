import { useState } from 'react';

import Typography from '@mui/material/Typography';
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

import WeaponDialog from '../Modals/WeaponDialog.jsx';

import { useSelector } from 'react-redux';

export default function RulebookGear() {
  const armorMaster = useSelector((store) => store.gearMaster.armor);
  const shieldMaster = useSelector((store) => store.gearMaster.shields);
  const weaponMaster = useSelector((store) => store.gearMaster.weapons);
  const miscGearMaster = useSelector((store) => store.gearMaster.miscGear);
  const pharmaGearMaster = useSelector((store) => store.gearMaster.pharma);

  // handles gear accordions
  const [expandedGearAccordion, setExpandedGearAccordion] = useState(false);
  const handleGearAccordionChange = (panel) => (event, newExpanded) => {
    setExpandedGearAccordion(newExpanded ? panel : false);
  };

  const euroBuck = `\u20AC$`;

  return (
    <>
      <Grid container padding={1} spacing={1}>
        <Grid item xs={12}>
          <Typography variant="h4">Armor & Shields</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="p">
            Armor has a quality rating, which reflects both how well it allows the wearer to soak damage and how much ablation it can stand before it
            is rendered useless.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="p">
            Shields can be used in conjunction with armor, and have seen a resurgence in the modern era. They require a free hand, but add their
            quality to a character's armor rating when used.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Accordion disableGutters expanded={expandedGearAccordion === 'panel1'} onChange={handleGearAccordionChange('panel1')}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="armor-content" id="armor-panel-header">
              <Typography>Armor List</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                  <TableHead>
                    <TableRow hover>
                      <TableCell>Name</TableCell>
                      <TableCell align="left">Quality</TableCell>
                      <TableCell align="left">Description</TableCell>
                      <TableCell align="left">Price</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {armorMaster.map((row) => {
                      if (row.quality != 0) {
                        return (
                          <TableRow hover key={row.name}>
                            <TableCell>{row.name}</TableCell>
                            <TableCell align="left">{row.quality}</TableCell>
                            <TableCell align="left">{row.description}</TableCell>
                            <TableCell align="right">
                              {euroBuck}
                              {row.price.toLocaleString('en-US')}
                            </TableCell>
                          </TableRow>
                        );
                      }
                    })}
                    {shieldMaster.map((row) => {
                      if (row.quality != 0) {
                        return (
                          <TableRow hover key={row.name}>
                            <TableCell>{row.name}</TableCell>
                            <TableCell align="left">{row.quality}</TableCell>
                            <TableCell align="left">{row.description}</TableCell>
                            <TableCell align="right">
                              {euroBuck}
                              {row.price.toLocaleString('en-US')}
                            </TableCell>
                          </TableRow>
                        );
                      }
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </AccordionDetails>
          </Accordion>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h4">Weapons</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="p">
            Weapons have a number of characteristics that affect how they behave. Click a name read more about a specific weapon.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="p">
            Damage is the weapons base damage - generally, this number is added to the successes on an attack roll to determine how much damage a
            given attack does.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="p">
            Range is how far a weapon can shoot in meters. It is the number of squares a weapon can shoot in grid based play.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="p">
            Rate of Fire is how many times a weapon can be used as part of a standard action. Attacking more than once requires splitting a character
            to split their die pool.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="p">Max Clip is how many bullets the weapon holds before it must be reloaded (taking a standard action).</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="p">
            # of Hands is how many hands a weapon requires to use effectively. Some melee weapons can be used with 1 hand instead of 2 by especially
            strong characters.
          </Typography>
        </Grid>
        <Grid item xs={12} paddingBottom={1}>
          <Typography variant="p">
            Concealable is simply whether or not a weapon can be concealed on one's person. Concealing a weapon requires a potential spotter to make a
            Cool + Streetwise check to locate with a search - the DV is based on how thorough they're being. High Speed Ocular Pat Downs cannot in
            fact spot such hardware if concealed by someone being careful.
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Accordion disableGutters expanded={expandedGearAccordion === 'panel2'} onChange={handleGearAccordionChange('panel2')}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="weapon-content" id="weapon-panel-header">
              <Typography>Weapon List</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <TableContainer component={Paper}>
                <Table sx={{ width: 1 }} size="small" aria-label="a dense table">
                  <TableHead>
                    <TableRow hover>
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
                      if (row.is_treasure === false) {
                        return (
                          <TableRow hover key={i}>
                            <TableCell align="left">
                              <WeaponDialog prop={row.name} />
                            </TableCell>
                            <TableCell align="center">
                              {row.dmg_type === 'melee' || row.dmg_type === 'bow' ? `Str + ${row.damage}` : `${row.damage}`}
                            </TableCell>
                            <TableCell align="center">{row.dmg_type === 'bow' ? `Str * ${row.range}` : `${row.range}`}</TableCell>
                            <TableCell align="center">{row.rof}</TableCell>
                            <TableCell align="center">{row.max_clip}</TableCell>
                            <TableCell align="center">{row.hands}</TableCell>
                            <TableCell align="center">{row.concealable ? 'Yes' : 'No'}</TableCell>
                            <TableCell align="right">
                              {euroBuck}
                              {row.price.toLocaleString('en-US')}
                            </TableCell>
                          </TableRow>
                        );
                      }
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </AccordionDetails>
          </Accordion>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h4">Misc Gear</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="p">Misc gear is a catch all of equipment that doesn't fit neatly elsewhere.</Typography>
        </Grid>
        <Grid item xs={12}>
          <Accordion disableGutters expanded={expandedGearAccordion === 'panel3'} onChange={handleGearAccordionChange('panel3')}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="misc-gear-content" id="misc-gear-panel-header">
              <Typography>Misc Gear List</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                  <TableHead>
                    <TableRow hover>
                      <TableCell>Name</TableCell>
                      <TableCell align="left">Description</TableCell>
                      <TableCell align="left">Price</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {miscGearMaster.map((row) => (
                      <TableRow hover key={row.name}>
                        <TableCell>{row.name}</TableCell>
                        <TableCell align="left">{row.description}</TableCell>
                        <TableCell align="right">
                          {euroBuck}
                          {row.price.toLocaleString('en-US')}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </AccordionDetails>
          </Accordion>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h4">Pharmaceuticals</Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="p">
            Pharmaceutical compounds are medicines, poisons, and other substances created via chemical and nanotech processes by a Medtech with the
            Pharmaceutical skill. They can be used by anyone, but gauging the correct dosage and precise mixture is more art than science, and most
            characters will find it very difficult. The exception is poison, which can be used fairly reliably by anyone.
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="p">
            Any character can attempt to apply pharmaceuticals by making an Administration Test: Intelligence + First Aid. This is normally at DV8,
            although if they have 10 minutes or so to carefully read the label and do a little research this can be reduced to DV7.
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="p">
            A Medtech has a slightly easier time of it - a character with the Paramedic skill always rolls Intelligence + Paramedic against DV7 to
            administer a pharmaceutical compound.
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="p">
            Medtechs with the Pharmaceutical skill roll the better combination of Intelligence + Paramedic or Intelligence + Pharmaceutical against
            DV6. If they have ready access to a Pharmaceutical Workshop or Facility, this roll is instead at DV5.
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="p">
            Pharmaceuticals have a Rank, reflecting the required Pharmaceutical rank required to be able to create them.
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="p">
            Combat Drugs are a variant designed to be used by anyone relatively easily, but still require an administration test at DV7 for all users.
            While there are no specific rules on their overuse and abuse, humanity loss, unhealable wounds, and the like can be expected by anyone who
            abuses them.
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="p">
            Poisons & Biotoxins - Unlike other pharmaceutical compounds, they do not require an Administration Test to use. They can be applied a few
            different ways, with the most common being smeared on a melee weapon (with their effects lasting for 1 scene) or being ingested or
            injected. All poison effects for ingestion/injection can be reduced by the victim making a Body test - each success reduces the damage by
            1.
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="p">
            Characters can use a simple airhypo to inject a character not wearing armor with the <i>Hardened</i> property. This requires a successful
            Brawling attack. While bullets cannot carry a worthwhile amount of poison, arrows may be another story.
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Accordion disableGutters expanded={expandedGearAccordion === 'panel4'} onChange={handleGearAccordionChange('panel4')}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="pharma-content" id="pharma-panel-header">
              <Typography>Pharmaceutical List</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                  <TableHead>
                    <TableRow hover>
                      <TableCell>Name</TableCell>
                      <TableCell align="left">Description</TableCell>
                      <TableCell align="left">Rank</TableCell>
                      <TableCell align="left">Price</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {pharmaGearMaster.map((row) => (
                      <TableRow hover key={row.name}>
                        <TableCell>{row.name}</TableCell>
                        <TableCell align="left">{row.description}</TableCell>
                        <TableCell align="left">{row.rank}</TableCell>
                        <TableCell align="right">
                          {euroBuck}
                          {row.price.toLocaleString('en-US')}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Grid>
    </>
  );
}
