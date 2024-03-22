import { useState } from 'react'; import Typography from '@mui/material/Typography';
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

export default function RulebookRoles() {
    // handles Role accordion changes
    const [roleAccordion, setRoleAccordion] = useState(false);
    const handleRoleAccordionChange = (panel) => (event, newExpanded) => {
        setRoleAccordion(newExpanded ? panel : false);
    };
    return (<>
        <Grid container spacing={1} padding={1}>
            <Grid item xs={12}><Typography variant='h4'>Roles</Typography></Grid>
            <Grid item xs={12}><Typography variant='p'>Roles are the defining characteristic of a character, granting special abilities and actions not available to anyone without the same skills. While the average person might have the same attributes and skills as a Cyberpumpkin, they don't have the special sauce that comes with a Role. Likewise, Roles are the most expensive thing a character can buy in terms of Experience.</Typography></Grid>
            <Grid item xs={12}><Typography variant='p'>Role abilities generally scale up quickly, and often go in non-linear fashion - there is a world of difference between a Rank 1 Rockerboy playing shows in their mother's basement and a Rank 10 one playing a Worldwide Broadcast.</Typography></Grid>
            <Grid item xs={12}><Typography variant='p'>Characters start at Rank 2 - not complete n00bs, but not exactly world class at their chosen profession, either.</Typography></Grid>
        </Grid>
        <Grid padding={1}>
            <Accordion disableGutters expanded={roleAccordion === 'panel1'} onChange={handleRoleAccordionChange('panel1')}>
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
                                    <TableRow hover>
                                        <TableCell align="left">Rank</TableCell>
                                        <TableCell align="left">Venue</TableCell>
                                        <TableCell align="center">Single Fan</TableCell>
                                        <TableCell align="center">Small Group</TableCell>
                                        <TableCell align="center">Huge Group</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow hover>
                                        <TableCell align="left">1-2</TableCell>
                                        <TableCell align='left'>Small clubs & Church Basements</TableCell>
                                        <TableCell align='center'>Small Favor</TableCell>
                                        <TableCell align='center'>Attention</TableCell>
                                        <TableCell align='center'>You can't reach a huge group</TableCell>
                                    </TableRow>

                                    <TableRow hover>
                                        <TableCell align="left">3-4</TableCell>
                                        <TableCell align='left'>Medium clubs & local churches</TableCell>
                                        <TableCell align='center'>Medium Favor</TableCell>
                                        <TableCell align='center'>Small Favor Posse</TableCell>
                                        <TableCell align='center'>Attend shows</TableCell>
                                    </TableRow>

                                    <TableRow hover>
                                        <TableCell align="left">5-6</TableCell>
                                        <TableCell align='left'>Large Clubs & Churches</TableCell>
                                        <TableCell align='center'>Large Favor</TableCell>
                                        <TableCell align='center'>Medium Favor Posse</TableCell>
                                        <TableCell align='center'>Temporary Small Favor Horde</TableCell>
                                    </TableRow>

                                    <TableRow hover>
                                        <TableCell align="left">7-8</TableCell>
                                        <TableCell align='left'>Concert Halls & Megachurches</TableCell>
                                        <TableCell align='center'>Huge Favor</TableCell>
                                        <TableCell align='center'>Large Favor Posse</TableCell>
                                        <TableCell align='center'>Temporary Medium Favor Horde</TableCell>
                                    </TableRow>

                                    <TableRow hover>
                                        <TableCell align="left">9</TableCell>
                                        <TableCell align='left'>Stadiums & Int'l Video Feeds</TableCell>
                                        <TableCell align='center'>Die without Question</TableCell>
                                        <TableCell align='center'>Huge Favor Posse</TableCell>
                                        <TableCell align='center'>Temporary Large Favor Horde</TableCell>
                                    </TableRow>

                                    <TableRow hover>
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

            <Accordion disableGutters expanded={roleAccordion === 'panel2'} onChange={handleRoleAccordionChange('panel2')}>
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
                                        <TableRow hover>
                                            <TableCell align="left">Name</TableCell>
                                            <TableCell align="left">Points</TableCell>
                                            <TableCell align="left">Description</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>

                                        <TableRow hover>
                                            <TableCell align="left">Threat Detection</TableCell>
                                            <TableCell align="left">1</TableCell>
                                            <TableCell align='left'>Solos develop a sixth sense about danger - each point in this ability adds 1 die to any Perception roll the Solo makes.</TableCell>
                                        </TableRow>

                                        <TableRow hover>
                                            <TableCell align="left">Instant Reflexes</TableCell>
                                            <TableCell align="left">1</TableCell>
                                            <TableCell align='left'>Solos react to danger almost instantly - for every point in this skill, add 1 automatic success to any initiative roll.</TableCell>
                                        </TableRow>

                                        <TableRow hover>
                                            <TableCell align="left">Damage Reduction</TableCell>
                                            <TableCell align="left">2</TableCell>
                                            <TableCell align='left'>Solos are highly resistant to damage - for every 2 points spent in this ability, decrease the damage of any attack targeting them this round by 1. This applies before armor is checked, and can reduce incoming attacks to 0 damage.</TableCell>
                                        </TableRow>

                                        <TableRow hover>
                                            <TableCell align="left">Spot Weakness</TableCell>
                                            <TableCell align="left">2</TableCell>
                                            <TableCell align='left'>Solos can almost unerringly find weak points in a target - for every 2 points in this skill, the Solo increases the base damage of any weapon they use this round by one.</TableCell>
                                        </TableRow>

                                        <TableRow hover>
                                            <TableCell align="left">Precision Attack</TableCell>
                                            <TableCell align="left">3</TableCell>
                                            <TableCell align='left'>Solos are trained to aim carefully - for every 3 points in this ability, the Solo gets an automatic success on any attack rolls made this round, including aimed shots. Divided Die pools each receive an automatic success to each pool as well, provided they are for an attack.</TableCell>
                                        </TableRow>

                                        <TableRow hover>
                                            <TableCell align="left">Fumble Recovery</TableCell>
                                            <TableCell align="left">5</TableCell>
                                            <TableCell align='left'>Solos take their time and don't make the petty mistakes of amateur Edgerunners - solos with this ability ignore any 1s rolled during combat. They cannot glitch or botch their roll. They can, however, critically botch by rolling one or more 1s and no successes.</TableCell>
                                        </TableRow>

                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>

            <Accordion disableGutters expanded={roleAccordion === 'panel3'} onChange={handleRoleAccordionChange('panel3')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="netrunner-content"
                    id="panel3-header"
                >
                    <Typography>Netrunner - Interface </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container>
                        <Grid item xs={12}>
                            Please see the netrunning tab for more information.
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>

            <Accordion disableGutters expanded={roleAccordion === 'panel4'} onChange={handleRoleAccordionChange('panel4')}>
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
                                        <TableRow hover>
                                            <TableCell align="left">Rank</TableCell>
                                            <TableCell align="left">Vehicles availabe</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>

                                        <TableRow hover>
                                            <TableCell align="left">1-4</TableCell>
                                            <TableCell align="left">Compact Groundcar, Gyrocopter, Jetski, Roadbike</TableCell>
                                        </TableRow>

                                        <TableRow hover>
                                            <TableCell align="left">5-6</TableCell>
                                            <TableCell align="left">Helicopter, High performance groundcar, Speedboat</TableCell>
                                        </TableRow>

                                        <TableRow hover>
                                            <TableCell align="left">7-8</TableCell>
                                            <TableCell align="left">AV-4, Cigarette Boat, Cabin Cruiser, Superbike</TableCell>
                                        </TableRow>

                                        <TableRow hover>
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

            <Accordion disableGutters expanded={roleAccordion === 'panel5'} onChange={handleRoleAccordionChange('panel5')}>
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
                            A character with the Media role has Credibility. This ability affects how their stories are received by the public, as well as how large their audience is. It also allows the Media to pick up rumors passively, gain additional contacts, and assists in digging up new information.
                        </Grid>
                        <Grid item padding={.5} xs={12}>
                            <h3>Rumors:</h3>
                            Medias are deeply plugged into (often suspect) information networks, rumor mills, and bullshit factories. They have hosts of friends, contacts, acquaintances, and drinking buddies. Assuming they're not intentionally staying off grid, the GM should make a passive data collection roll for the Media periodically - they'll pick up all kinds of strange information over time, and it's the GM's call whether any of it relevant to the campaign generally or any job they're working more specifically.
                        </Grid>
                        <Grid item padding={.5} xs={12}>
                            This is the same kind of information that any character can find by hitting the street (ie. using Streetwise or Investigation to track down information), but requires no legwork on the Media's part. Like other characters, a Media can attempt to find information out intentionally.
                        </Grid>
                        <Grid item padding={.5} marginBottom={1} xs={12}>
                            Depending on their style, Medias roll Credibility, plus one of Cool + Streetwise (Citizen Reporter), Technique + Etiquette (Professional Journalism), or Appearance + Performance (Social Media Maven) in order to gather information. Their base DV is 9, and the result is based on the number of successes. The kinds of rumors they'll pick up should be influenced by their style - A citizen reporter is going to get an ants-eye view of the universe from low level workers, while the ProJo is going more likely to find a Deep Throat board memmber. The Social Media tends to find more out about the personal lives of people they're looking into. The base DV is lowered depending on how much time the Media is able to spend looking into a subject (person, place, product, corp, etc) - as a guideline, DV9 is about 15 minutes of digging. Spending a couple hours on a subject should be DV8, a whole day should be DV7, and a week DV6.
                        </Grid>
                        <Grid item padding={.5} xs={12}>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                                    <TableHead>
                                        <TableRow hover>
                                            <TableCell align="left">Successes</TableCell>
                                            <TableCell align="left">Rumor Quality</TableCell>
                                            <TableCell align="left">Description</TableCell>


                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow hover>
                                            <TableCell>0</TableCell>
                                            <TableCell>No result</TableCell>
                                            <TableCell>The character makes no progress on finding information relevant to the subject they're investigating.</TableCell>
                                        </TableRow>

                                        <TableRow hover>
                                            <TableCell>1-2</TableCell>
                                            <TableCell>Vague</TableCell>
                                            <TableCell>The character finds something on the subject, but it's of dubious use - finding out the public history of a given person or place, someone's professional CV, etc..</TableCell>
                                        </TableRow>

                                        <TableRow hover>
                                            <TableCell>3-4</TableCell>
                                            <TableCell>Typical</TableCell>
                                            <TableCell>The character finds a decent amount of information; they are also able to better filter the information out. They are able to find out a bit more about the subject of their investigation, including some things they might not necessarily want everyone to know. Some of it is likely inaccurate, but there should be a nugget of something useful.</TableCell>
                                        </TableRow>

                                        <TableRow hover>
                                            <TableCell>5-6</TableCell>
                                            <TableCell>Substantial</TableCell>
                                            <TableCell>The character has found out a lot about their subject, including something that will absolutely be directly useful to the mission at hand - whether they know it or not. GMs are encouraged to be devious on the subject. They also likely find out quite a lot of nonsense on the subject. They should further be able to ask a couple of follow up questions to the GM.</TableCell>
                                        </TableRow>

                                        <TableRow hover>
                                            <TableCell>7+</TableCell>
                                            <TableCell>Detailed</TableCell>
                                            <TableCell>The character is able to put together something genuinely useful and informative on their subject. The GM should volunteer 1-2 pieces of useful data, and answer any reasonable questions the PC has on the subject.</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>

                        <Grid item xs={12} padding={.5}>
                            <h3>Contacts:</h3>
                            Characters gain contacts each time they gain a rank in Media. The GM is encouraged to be creative when handing these out; that being said they shouldn't be wholly useless. Medias gain a pool of points each rank based on their Credibility score; new contacts split the points between Connection and Loyalty up to the maximums in the table below.
                        </Grid>
                        <Grid item xs={12} padding={.5} marginBottom={1}>
                            Making new connections is what being a Media is all about - just about anyone they interact with is a potential contact. They should always be on the lookout for new contacts, and the GM is encouraged to be liberal with their distribution.
                        </Grid>
                        <Grid item xs={6} padding={.5}>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                                    <TableHead>
                                        <TableRow hover>
                                            <TableCell align="left">Credibility</TableCell>
                                            <TableCell align="left">Points to spend (each rank)</TableCell>
                                            <TableCell align="left">Max Connection</TableCell>
                                            <TableCell align="left">Max Loyalty</TableCell>


                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow hover>
                                            <TableCell>1</TableCell>
                                            <TableCell>4</TableCell>
                                            <TableCell>2</TableCell>
                                            <TableCell>0</TableCell>
                                        </TableRow>

                                        <TableRow hover>
                                            <TableCell>2-3</TableCell>
                                            <TableCell>6</TableCell>
                                            <TableCell>3</TableCell>
                                            <TableCell>1</TableCell>
                                        </TableRow>

                                        <TableRow hover>
                                            <TableCell>4-5</TableCell>
                                            <TableCell>10</TableCell>
                                            <TableCell>4</TableCell>
                                            <TableCell>2</TableCell>
                                        </TableRow>

                                        <TableRow hover>
                                            <TableCell>6-7</TableCell>
                                            <TableCell>14</TableCell>
                                            <TableCell>5</TableCell>
                                            <TableCell>3</TableCell>
                                        </TableRow>

                                        <TableRow hover>
                                            <TableCell>8-9</TableCell>
                                            <TableCell>18</TableCell>
                                            <TableCell>6</TableCell>
                                            <TableCell>4</TableCell>
                                        </TableRow>

                                        <TableRow hover>
                                            <TableCell>10</TableCell>
                                            <TableCell>24</TableCell>
                                            <TableCell>7</TableCell>
                                            <TableCell>5</TableCell>
                                        </TableRow>

                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>

            <Accordion disableGutters expanded={roleAccordion === 'panel6'} onChange={handleRoleAccordionChange('panel6')}>
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
                                        <TableRow hover>
                                            <TableCell align="left">Pharmaceutical</TableCell>
                                            <TableCell align="left">Effect</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>

                                        <TableRow hover>
                                            <TableCell align="left">Antibiotic</TableCell>
                                            <TableCell align="left">Speeds up natural healing processes, allowing the recovery of one additional wound when the user rolls their body to recover. Multiple doses cannot stack, and it cannot be used with Speedheal. Each roll uses one dose of the compound.</TableCell>
                                        </TableRow>

                                        <TableRow hover>
                                            <TableCell align="left">Rapi-Detox</TableCell>
                                            <TableCell align="left">When injected, a user affected by a drug, poison, or other intoxicant is immediately purged of the substance. Aggressively. From both ends.</TableCell>
                                        </TableRow>

                                        <TableRow hover>
                                            <TableCell align="left">Speedheal</TableCell>
                                            <TableCell align="left">When injected, the user immediately rolls Body (DV 6) and recovers stun and lethal wounds as though they'd rested for the appropriate length of time. The user immediately loses one temporary humanity point. Can be used on a target no more than once per day.</TableCell>
                                        </TableRow>

                                        <TableRow hover>
                                            <TableCell align="left">Stim</TableCell>
                                            <TableCell align="left">When administered, the user can ignore all wound penalties for 1 hour. Further, Stun Wounds cannot cause the user to fall unconscious.</TableCell>
                                        </TableRow>

                                        <TableRow hover>
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
                            A cryotank is a pod that can contain a grown adult. The name is something of a misnomer - it's a fully automated medical device that puts all nonessential functions into statis while accelerating vital healing functions. When placing someone into the tank, the Medtech makes an Intelligence + Cryogenics test at DV6; if successful the Cryotank will keep the person in stasis (see Cryopump) as long as the Cryotank is supplied with power. While in the tank, an occupant is considered unconscious, and heals far more rapidly than normal - all body saves to recover wounds are made with a -2 difficulty value. A cryotank is a substantial device, with an armor of 5, and can suffer 4 wounds before it fails. It makes excellent cover, honestly! Keeping a Cryotank running uses about materials with a street cost of roughly 200 eurobucks per week; up to about 6 months worth of material can be attached to a tank at a time. They can be installed in large vehicles, as well.
                        </Grid>
                        <Grid item padding={.5} xs={12}>
                            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                                <TableHead>
                                    <TableRow hover>
                                        <TableCell align="left">Cryogenics Level</TableCell>
                                        <TableCell align="left">Benefit</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>

                                    <TableRow hover>
                                        <TableCell align="left">1</TableCell>
                                        <TableCell align="left">Gain one standard Cryopump.</TableCell>
                                    </TableRow>

                                    <TableRow hover>
                                        <TableCell align="left">2</TableCell>
                                        <TableCell align="left">Become a registered Cryotank technician and gain unlimited 24/7 access to a Cryotank at a corporate or government operated facility.</TableCell>
                                    </TableRow>

                                    <TableRow hover>
                                        <TableCell align="left">3</TableCell>
                                        <TableCell align="left">Refurbish a broken Cryotank, and install it in the location of your chooosing. All Cryopumps used by you have three charges as you learn to operate them more efficiently.</TableCell>
                                    </TableRow>

                                    <TableRow hover>
                                        <TableCell align="left">4</TableCell>
                                        <TableCell align="left">Refurbish an additional Cryotank, and install in a location of your choosing.</TableCell>
                                    </TableRow>

                                    <TableRow hover>
                                        <TableCell align="left">5</TableCell>
                                        <TableCell align="left">Refurbish two additional Cryotanks, and install them in location(s) of your choosing. All Cryopumps used by you have four charges due to your mastery of the Cryonic arts!</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>

            <Accordion disableGutters expanded={roleAccordion === 'panel7'} onChange={handleRoleAccordionChange('panel7')}>
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
                            Field Expertise can often be used in place of any other technical skill to make a device do a single action - it can be used in place of Cybertech to temporarily disable a cyberlimb, instead of science to disable an alarm system (briefly), or in place of Military Tech to fire the main gun of a tank (once).
                        </Grid>
                        <Grid item padding={.5} xs={12}>
                            <h3>Upgrade Expertise</h3>
                            Makers can improve their equipment in various ways, applying a modification to armor, weapon, or vehicle. Items can generally benefit from only one modification at a time; Makers with 5 ranks in this skill can apply two upgrades to weapons. Upgrading an item requires the items base cost in additional materials (or an amount determined by GM for vehicle upgrades). The Maker rolls Technique + Upgrade expertise after a suitable amount of time tinkering. Failure consumes the materials to no benefit, while glitching upgrades the item but it is unlikely to work for very long.
                        </Grid>
                        <Grid item padding={.5} xs={12}>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                                    <TableHead>
                                        <TableRow hover>
                                            <TableCell align="left">Item Type</TableCell>
                                            <TableCell align="left">Effect</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>

                                        <TableRow hover>
                                            <TableCell align="left">Melee Weapon</TableCell>
                                            <TableCell align="left">Embiggen: Make a 1 handed weapon 2 handed; this increases the damage by 2.</TableCell>
                                        </TableRow>

                                        <TableRow hover>
                                            <TableCell align="left">Melee Weapon</TableCell>
                                            <TableCell align="left">Lightweight Material: Make a 2 handed weapon 1 handed.</TableCell>
                                        </TableRow>

                                        <TableRow hover>
                                            <TableCell align="left">Weapon</TableCell>
                                            <TableCell align="left">Dangerous: Increase damage by 1.</TableCell>
                                        </TableRow>

                                        <TableRow hover>
                                            <TableCell align="left">Standard Ranged Weapon</TableCell>
                                            <TableCell align="left">Ballistics: Increase range by 25%.</TableCell>
                                        </TableRow>

                                        <TableRow hover>
                                            <TableCell align="left">Any Weapon</TableCell>
                                            <TableCell align="left">Collapsible: Make a non-concealable weapon conceable. It takes 2 standard actions to reassemble a concealed weapon for use.</TableCell>
                                        </TableRow>

                                        <TableRow hover>
                                            <TableCell align="left">Any weapon with ammunition</TableCell>
                                            <TableCell align="left">Bigger Clip: Increase base clip by 25% or +3, whichever is higher.</TableCell>
                                        </TableRow>

                                        <TableRow hover>
                                            <TableCell align="left">Armor</TableCell>
                                            <TableCell align="left">Improved Plating: Add 1 to armor Quality.</TableCell>
                                        </TableRow>

                                        <TableRow hover>
                                            <TableCell align="left">Armor</TableCell>
                                            <TableCell align="left">Reactive Coating: Reduce Stealth difficulty values by 1.</TableCell>
                                        </TableRow>

                                        <TableRow hover>
                                            <TableCell align="left">Shield</TableCell>
                                            <TableCell align="left">Thicker Materials: add 1 to shield quality.</TableCell>
                                        </TableRow>

                                        <TableRow hover>
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
                                            <TableRow hover>
                                                <TableCell align="left">Item Base Cost</TableCell>
                                                <TableCell align="left">DV</TableCell>
                                                <TableCell align="left">Interval</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>

                                            <TableRow hover>
                                                <TableCell align="left">Cheap</TableCell>
                                                <TableCell align='left'>5 (2+)</TableCell>
                                                <TableCell align="left">1 hour.</TableCell>
                                            </TableRow>

                                            <TableRow hover>
                                                <TableCell align="left">Costly</TableCell>
                                                <TableCell align='left'>6 (2+)</TableCell>
                                                <TableCell align="left">6 hours.</TableCell>
                                            </TableRow>

                                            <TableRow hover>
                                                <TableCell align="left">Preem</TableCell>
                                                <TableCell align='left'>6 (4+)</TableCell>
                                                <TableCell align="left">1 day.</TableCell>
                                            </TableRow>

                                            <TableRow hover>
                                                <TableCell align="left">Expensive</TableCell>
                                                <TableCell align='left'>7 (2+)</TableCell>
                                                <TableCell align="left">3 days.</TableCell>
                                            </TableRow>

                                            <TableRow hover>
                                                <TableCell align="left">Valuable</TableCell>
                                                <TableCell align='left'>7 (4+)</TableCell>
                                                <TableCell align="left">1 week.</TableCell>
                                            </TableRow>

                                            <TableRow hover>
                                                <TableCell align="left">Luxury</TableCell>
                                                <TableCell align='left'>7 (8+)</TableCell>
                                                <TableCell align="left">1 month.</TableCell>
                                            </TableRow>

                                            <TableRow hover>
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
    </>)
}