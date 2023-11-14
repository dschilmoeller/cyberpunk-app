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


export default function RulebookNetrunner() {
    const netrunnerMaster = useSelector(store => store.gearMaster.netrunnerGear)

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

    const euroBuck = `\u20AC$`

    return (<>
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
            <Grid item xs={12}><Typography variant='p'>Architectures are generally a straight line - 3+ rooms in a row. They can have forks, and paths can split and recombine depending on the Architect's vision and whims. The servers available to corporate powers are almost universally larger and more powerful than a Netrunner's deck, as they can be built much more cheaply due to their large size and lack of need for portability.</Typography></Grid>

            <Grid item xs={12}><Typography variant='h5'>Jacking In / Out</Typography></Grid>
            <Grid item xs={12}><Typography variant='p'>Jacking In to an Architecture requires, as mentioned, physical access to an Access Point. Jacking Out can be done either manually, as a single Netrunner action (provided nothing is stopping them...) or it can be done forcibly, by moving out of range or having one's plugs removed. In either case, the Architecture 'resets', and all programs and ICE previously encountered will be reset and returned to full strength. No changes made will persist if the Netrunner didn't make it to the Root of the Architecture and alter things to their liking.</Typography></Grid>
            <Grid item xs={12}><Typography variant='p'>If the Netrunner is forcibly Jacked Out, they suffer an immediate single attack by EVERY piece of ICE they've encountered and not de-rezzed - this attack cannot be defended against, and comes in reverse of the normal damage sequence - aggravated damage first, then lethal, then stun. It is resisted with a single Netrunner Soak Roll - the end result is usually 1 Netrunner, Medium Rare.</Typography></Grid>
            <Grid item xs={12}><Typography variant='p'>In the event the system the Netrunner is intruding in loses power, the standard emergency shutdown procedure uses a battery backup to safely jack out all netrunners from the system, and all nonessential systems (such as ICE) are usually shut down as well at the same time - the netrunner has a single round to do anything before they are removed. Of course, particularly sensitive installations may have many power backups, and change their priorities accordingly. . .</Typography></Grid>

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
            <Grid item xs={12}><Typography variant='p'>Virus: Once in the Root of an Architecture, the Netrunner can make a Virus to make changes or perform scripted actions that will persist beyond when a Netrunner Jacks Out. Viruses require a number of successes to make based on the complexity and number of changes being made, and may require the Netrunner to make an extended roll to achieve the required number.</Typography></Grid>
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
            <Grid item xs={12}><Typography variant='p'><i>Tahei has located an Access Point, and Jacks In with his Interface Plugs. The first level of the Architecture is a simple password prompt - he takes a few rounds to activate two Speedy programs, a See Ya, a Shield, and his Ban Hammer. Properly equipped, he uses a Pathfinder Action and scores two successes - he determines the next floor has a Scorpion waiting for him. He moves to the floor, and rolls 4 (his Interface) + 2 (one for each Speedy program), while the GM rolls the Scorpion's speed of 4. Tahei wins, and he elects to use his Ban Hammer the Scorpion - it adds two to Attack, so he easily hits the scorpion and deals 6 wounds to it - instantly de-rezzing the hostile program. Tahei performs an EyeBall on the floor, and gets three successes - but turns up nothing interesting in the data stored on this level. Satisfied this floor is useless, Tahei makes another Pathfinder check - scoring a single success and determining that the next floor consists of a fork.</i></Typography></Grid>
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
                                <TableRow hover>
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
                                                <TableRow hover key={row.name}>
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
    </>)
}