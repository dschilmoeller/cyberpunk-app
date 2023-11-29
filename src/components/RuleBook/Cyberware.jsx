import { useState, Fragment } from 'react';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
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

import { useSelector } from 'react-redux';

export default function RulebookCyberware() {
  const cyberwareMaster = useSelector(store => store.gearMaster.cyberware)
  const euroBuck = `\u20AC$`

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

  return (<>

    <Grid container spacing={1}>
      <Grid item xs={12}><Typography variant='h4'>Cyberware</Typography></Grid>
      <Grid item xs={12}><Typography variant='p'>Cyberware has a variety of classifications, having to do with where it is located on or inside a character.</Typography></Grid>
      <Grid item xs={12}><Typography variant='p'>Cyberware is generally limited by a number of slots, either inherent to the user (such as Fashion or Internal 'Ware), a base implant (such as a Neural Link or Cybereyes), or the space in a Cyberlimb.</Typography></Grid>
      <Grid item xs={12}><Typography variant='p'>Cyberware frequently costs some amount of Humanity from the person it's installed in. This is not a problem in most cases - fashionware generally doesn't cause issues, and even complete cyberlimb replacements can be gotten used to over time. Going beyond the normal abilities of Humanity 1.0 can, however, result in drastic mental dissasociations and disorders. Adding too much cyberware (especially doing so very quickly, without time or professional counseling) can result in Cyberpsychosis, a complete mental break with reality. Even more controlled or modest use, however, can cause severe psychological issues as the individual becomes alienated from their own body and the people around them by their new abilities.</Typography></Grid>

      <Grid item xs={12}><Typography variant='p'>No matter how much effort cyberware owners put in, there is always <i>some</i> dissasociation with body warping equipment. This is reflected in the minimum humanity loss. Temporary humanity loss is variable, and can be much higher. Temporary humanity loss can be mitigated by spending experience, seeking professional counseling, or just getting used to the equipment - temporary humanity loss recovers at a rate of a character's Willpower per month.</Typography></Grid>
    </Grid>

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
                <TableRow hover>
                  <TableCell>Name</TableCell>
                  <TableCell align="left">Description</TableCell>
                  <TableCell align="left">Humanity Loss</TableCell>
                  <TableCell align="left">Install Requirement</TableCell>
                  <TableCell align="left">Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cyberwareMaster.map((row, i) => {
                  if (row.type === cyberwareValue && row.is_treasure != true) {
                    return (
                      <Fragment key={i}>
                        <TableRow hover key={i}>
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
  </>)
}