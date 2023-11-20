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

export default function RulebookCombat() {
    // handles combat accordions
    const [expandedCombatAccordion, setExpandedCombatAccordion] = useState(false);
    const handleCombatAccordionChange = (panel) => (event, newExpanded) => {
        setExpandedCombatAccordion(newExpanded ? panel : false);
    }

    return (<>
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
                                        <TableRow hover>
                                            <TableCell>Action</TableCell>
                                            <TableCell align="left">Action Type</TableCell>
                                            <TableCell align='left'>Description</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow hover>
                                            <TableCell>Move</TableCell>
                                            <TableCell align="left">Simple</TableCell>
                                            <TableCell align='left'>Normal move action</TableCell>
                                        </TableRow>

                                        <TableRow hover>
                                            <TableCell>Reload</TableCell>
                                            <TableCell align="left">Simple</TableCell>
                                            <TableCell align='left'>Fully reload a firearm. Requires a free hand.</TableCell>
                                        </TableRow>

                                        <TableRow hover>
                                            <TableCell>Equip Item</TableCell>
                                            <TableCell align="left">Simple</TableCell>
                                            <TableCell align='left'>Bring a weapon, shield, or other item to hand from pocket/bag/harness.</TableCell>
                                        </TableRow>

                                        <TableRow hover>
                                            <TableCell>Stow Item</TableCell>
                                            <TableCell align="left">Simple</TableCell>
                                            <TableCell align='left'>Put a weapon, shield, or other item from hand into pocket, bag, or harness.</TableCell>
                                        </TableRow>

                                        <TableRow hover>
                                            <TableCell>Hit the Deck</TableCell>
                                            <TableCell align="left">Simple</TableCell>
                                            <TableCell align='left'>Drop prone and move up to 1 meter.</TableCell>
                                        </TableRow>

                                        <TableRow hover>
                                            <TableCell>Get into Vehicle</TableCell>
                                            <TableCell align="left">Simple</TableCell>
                                            <TableCell align='left'>Get into a vehicle.</TableCell>
                                        </TableRow>

                                        <TableRow hover>
                                            <TableCell>Start Vehicle</TableCell>
                                            <TableCell align="left">Simple</TableCell>
                                            <TableCell align='left'>Turn a vehicle on and put into gear.</TableCell>
                                        </TableRow>

                                        <TableRow hover>
                                            <TableCell>Drop Item</TableCell>
                                            <TableCell align="left">Free</TableCell>
                                            <TableCell align='left'>Drop item in hand to ground.</TableCell>
                                        </TableRow>

                                        <TableRow hover>
                                            <TableCell>Run</TableCell>
                                            <TableCell align="left">Complex</TableCell>
                                            <TableCell align='left'>Take a second move action. Can optionally roll Reflexes + Athletics and move additional 1 meter per success.</TableCell>
                                        </TableRow>

                                        <TableRow hover>
                                            <TableCell>Attack</TableCell>
                                            <TableCell align="left">Complex</TableCell>
                                            <TableCell align='left'>Make a number of Melee or Ranged attacks up to the weapon's ROF.</TableCell>
                                        </TableRow>

                                        <TableRow hover>
                                            <TableCell>Get Up</TableCell>
                                            <TableCell align="left">Complex</TableCell>
                                            <TableCell align='left'>Recover from being <b>prone</b>.</TableCell>
                                        </TableRow>

                                        <TableRow hover>
                                            <TableCell>Grab</TableCell>
                                            <TableCell align='left'>Complex</TableCell>
                                            <TableCell align="left">Grab opponent on succesful Brawl attack.</TableCell>
                                        </TableRow>

                                        <TableRow hover>
                                            <TableCell>Choke</TableCell>
                                            <TableCell align='left'>Complex</TableCell>
                                            <TableCell align="left">Choke a grabbed opponent, dealing (Strength) stun wounds and bypassing any non-hardened armor.</TableCell>
                                        </TableRow>

                                        <TableRow hover>
                                            <TableCell>Human Shield</TableCell>
                                            <TableCell align='left'>Complex</TableCell>
                                            <TableCell align="left">Turn a grabbed opponent into a human shield, and use grabbed opponent wound track and armor in place of one's own.</TableCell>
                                        </TableRow>

                                        <TableRow hover>
                                            <TableCell>Throw</TableCell>
                                            <TableCell align='left'>Complex</TableCell>
                                            <TableCell align="left">Throw grabbed opponent to floor, or (Strength) meters.</TableCell>
                                        </TableRow>

                                        <TableRow hover>
                                            <TableCell>Vehicle Maneuver</TableCell>
                                            <TableCell align='left'>Complex</TableCell>
                                            <TableCell align="left">Perform dangerous or challenging maneuver in a vehicle.</TableCell>
                                        </TableRow>

                                        <TableRow hover>
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

            <Grid item xs={12} display={'flex'} justifyContent={'center'}><Typography variant='p'><i>After determining damage, reduce wounds taken by (Body + Armor) divided by 2 (round down).</i></Typography></Grid>
            <Grid item xs={12} display={'flex'} justifyContent={'center'}><Typography variant='p'><i>Generally, lower armor by 1 or more depending on the weapon.</i></Typography></Grid>



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
                    <i>The ganger reduces the incoming damage by 2 - their Body is 2 and their armor is 3, so 5/2 (rounded down) is 2 - so they take 5 lethal wounds - half their wound track! They also mark 1 point off their armor as Raff blows a big hole in it. Raff could shoot them again, as their weapon has a ROF of 2 - but Raff would have had to have decided to do this before attacking, as it requires splitting their die pool. On their turn, the ganger attempts to run away, but doesn't get far enough - They're still in range, and Raf shoots again getting a whopping 5 successes on their attack roll. With 5 wounds from the first attack, the ganger now has a 2 die wound penalty to their Reflexes roll to dodge - they roll 2 dice, and get no successs. Raff thus deals a total of 9 lethal damage - 4 from the weapon's base damage and 5 more from successes. The ganger reduces this by 2 - their armor has been ablated by 1, but it is still Body 2 + Armor 2. 7 more damage has filled their wound track, with 2 additional damage to deal with. The ganger now has 2 aggravated and 8 lethal wounds. They are unlikely to survive much longer without prompt medical attention.</i>
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
                                <TableRow hover>
                                    <TableCell>Target</TableCell>
                                    <TableCell align="left">Effect</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow hover>
                                    <TableCell>Head</TableCell>
                                    <TableCell align="left">If target doesn't have a helmet or hardened armor, damage is mulitplied by 2 after soaking rules are applied.</TableCell>
                                </TableRow>

                                <TableRow hover>
                                    <TableCell>Held Item</TableCell>
                                    <TableCell align="left">If damage is not completely soaked, item is dropped.</TableCell>
                                </TableRow>

                                <TableRow hover>
                                    <TableCell>Critical Injury</TableCell>
                                    <TableCell align="left">Select and inflict a Critical Injury from the table (see 8 - Injuries and Dying). Injury must make sense given the weapon - it is not possible to inflict a crushed windpipe with a sniper rifle, unless you're using the wrong end.</TableCell>
                                </TableRow>

                            </TableBody>
                        </Table>
                    </TableContainer>
                </Typography>
            </Grid>

            <Grid item xs={12}>
                <Typography variant='p'>
                    <b>Weapon Specific Rules</b>
                </Typography>
            </Grid>

            <Grid item xs={12}>
                <Typography variant='p'>
                    Certain weapons are parts of groups that share similar characteristics. SMGs and Assault Rifles, no matter their type, have access to the Automatic Fire and Suppressing Fire rules. Shotguns always have access to Shellfire.
                </Typography>
            </Grid>

            <Grid item xs={12}>
                <Typography variant='p'>
                    SMGs do not deal extra damage based on the number of successes made to hit if the target has ANY armor remaining. They are extremely effective rapid fire devices, however - when a character splits their die pool while making more than one attack in a round, add +1 die to each pool.
                </Typography>
            </Grid>

            <Grid item xs={12}>
                <Typography variant='p'>
                    Assault Rifles are designed to fire very accurately and quickly - when a character splits their die pool while making more than one attack in a round, add +1 die to each pool.
                </Typography>
            </Grid>

            <Grid item xs={12}>
                <Typography variant='p'>
                    <b>Automatic Fire</b>
                </Typography>
            </Grid>

            <Grid item xs={12}>
                <Typography variant='p'>
                    Characters firing a weapon in full automatic have a ROF of 1 and a base difficulty of 5 on their attack. Their weapon must have 10 or more rounds remaining in its clip. The attacker cannot perform aimed shots, and additional successes on the attack do not provide additional damage. However, the attacker can elect to remove one or more dice from their attack die pool. If they do so, they can force their opponent to remove the same number of dice from their Reflexes roll to dodge <b>OR</b> increase the amount of armor lost by the target by the number of dice removed, provided they hit the target at all. Removing additional armor does not work if the target's armor is <i>Hardened</i>.
                    <Grid item xs={12}>Automatic Fire is only usable at the weapons normal range. If used at point blank range, the attacker has a difficulty of 4 AND trades dice at a 1:2 ratio - for every die they remove, their opponent loses 2 from the selected roll(s).</Grid>
                </Typography>
            </Grid >

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
                    Explosives damage a large area rather than hitting a specific target. Similar to shellfire, they deal damage in a large area. Landing an explosive in a specific location requires 3 successes on the attack roll - it drifts a bit on attacks that get fewer than 3 successes. Only characters with Reflexes of 6 or higher AND can get out of range in a single move action have a chance of dodging explosive attacks.
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

        </Grid >
    </>)
}