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

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import WeaponDialog from '../Modals/WeaponDialog.jsx';

import { useSelector } from 'react-redux';

export default function RulebookClothingLifestyle() {

    const clothingMaster = useSelector(store => store.gearMaster.clothing)
    const lifestyleMaster = useSelector(store => store.gearMaster.lifestyle)

    // handles gear accordions
    const [expandedGearAccordion, setExpandedGearAccordion] = useState(false);
    const handleGearAccordionChange = (panel) => (event, newExpanded) => {
        setExpandedGearAccordion(newExpanded ? panel : false);
    };

    const [lifestyleAccordion, setLifestyleAccordion] = useState(false);
    const handleLifestyleAccordionChange = (panel) => (event, newExpanded) => {
        setLifestyleAccordion(newExpanded ? panel : false)
    }

    const [lifestyleTabValue, setLifestyleTabValue] = useState('housing');
    const handleLifestyleTabValueChange = (event, newValue) => {
        setLifestyleTabValue(newValue);
    }

    const euroBuck = `\u20AC$`

    return (
        <>
            <Grid container padding={1} spacing={1}>
                <Grid item xs={12}><Typography variant='h4'>Clothing</Typography></Grid>
                <Grid item xs={12}>
                    <Typography variant='p'>
                        Clothing has several distinct styles and levels of quality. Generally, this is more of a flavor situation, but there can be a couple benefits to looking good.
                    </Typography>
                </Grid>

                <Grid item xs={12}>
                    <Typography variant='p'>
                        At its most basic level, each item of clothing represents an outfit with a single stat - Quality. An outfit can be improved, pimped, or draped in drip to improve its quality rating, limited by the outfit's baseline quality. Improving an outfit's quality might be everything from accessorizing properly to replacing pieces with higher quality or more interesting bits. Outfits can be 'downgraded' as well as improved; lowering the quality represents pawning or selling one's clothes for a quick buck.
                    </Typography>
                </Grid>

                <Grid item xs={12}>
                    <Typography variant='p'>
                        Characters can have multiple outfits of varying styles, each of which can improved separately. The rules of fashion and gameplay balance only allow for wearing one at a time, however. Clothing of sufficient quality (5+) increases a character's Appearance attribute by 1. Clothing of maximum quality (10) provides a more powerful bonus.
                    </Typography>
                </Grid>

                <Grid item xs={12}>
                    <Accordion disableGutters expanded={expandedGearAccordion === 'panel1'} onChange={handleGearAccordionChange('panel1')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="armor-content"
                            id="armor-panel-header"
                        >
                            <Typography>Clothing List</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                                    <TableHead>
                                        <TableRow hover>
                                            <TableCell>Name</TableCell>
                                            <TableCell align="left">Description</TableCell>
                                            <TableCell align="left">Min Quality</TableCell>
                                            <TableCell align="left">Max Quality</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {clothingMaster.map((row, i) => {
                                            {/* deal with quality min/max here. */ }
                                            let qualityMin;
                                            let qualityMax;
                                            switch (row.quality) {
                                                case 0:
                                                    qualityMin = 0;
                                                    qualityMax = 0;
                                                    break;
                                                case 1:
                                                    qualityMin = 1;
                                                    qualityMax = 5;
                                                    break;
                                                case 2:
                                                    qualityMin = 4;
                                                    qualityMax = 8;
                                                    break;
                                                case 3:
                                                    qualityMin = 9;
                                                    qualityMax = 10;
                                                    break;
                                            }
                                            return (
                                                <TableRow hover key={row.name}>
                                                    <TableCell>{row.name}</TableCell>
                                                    <TableCell align="left">{row.description}</TableCell>
                                                    <TableCell align="left">{qualityMin}</TableCell>
                                                    <TableCell align="left">{qualityMax}</TableCell>
                                                </TableRow>
                                            )
                                        })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </AccordionDetails>
                    </Accordion>
                </Grid>

                {/* Lifestyle */}
                {/* 
                Each aspect purchased separate
                Each aspect's rank contributes to monthly cost.
                Lower an aspect's rank, receive funds = lowering cost * months remaining
                Unlike almost all other gear, selling imposes no discount since you're typically 'giving up' expenses rather than selling something concrete.
                 */}
                <Grid item xs={12}><Typography variant='h4'>Lifestyle</Typography></Grid>
                <Grid item xs={12}>
                    <Typography variant='p'>
                        Lifestyle is a measure of how a character lives, as well as their access to certain resources and a general guide to how they live from day to day. It is divided into several areas, each with their own rank and cost.
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant='p'>
                        Housing: What kind of housing the character stays in.
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant='p'>
                        Storage: What kind of stash the character has access to.
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant='p'>
                        Amenities: What the character's home offers in terms of utilities, recreation, etc.
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant='p'>
                        Food: What the character eats on a regular basis.
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant='p'>
                        Parking: Where characters can store their vehicles, and how many and securely they can do so.
                    </Typography>
                </Grid>
                <Accordion disableGutters expanded={lifestyleAccordion === 'panel1'} onChange={handleLifestyleAccordionChange('panel1')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="armor-content"
                        id="armor-panel-header"
                    >
                        <Typography>Lifestyles of the Poor and Desperate</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        {/* tabs? */}
                        <Tabs
                            value={lifestyleTabValue}
                            onChange={handleLifestyleTabValueChange}
                            indicatorColor='secondary'
                        >
                            <Tab value='housing' label='Housing' />
                            <Tab value='storage' label='Storage' />
                            <Tab value='ameneties' label='Ameneties' />
                            <Tab value='food' label='Food' />
                            <Tab value='parking' label='Parking' />
                        </Tabs>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                                <TableHead>
                                    <TableRow hover>
                                        <TableCell>Rank</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell align="left">Description</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {lifestyleMaster.map((row, i) => {
                                        return (
                                            <TableRow hover key={row.name}>
                                            <TableCell>{row.quality}</TableCell>
                                            <TableCell align="left">{row.name}</TableCell>
                                            {/* filters by the value of the selected tab, effectively row.[variable] */}
                                            <TableCell align="left">{row[lifestyleTabValue]}</TableCell>
                                            </TableRow>
                                        )
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </AccordionDetails>
                </Accordion>
            </Grid>
        </>
    )
}