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
                    A 'round' covers about 4 - 5 seconds. When combat starts, everyone rolls initiative. The higher one's initiative is, the sooner they go. If two character's tie, the one with higher reflexes goes first. Each round, each character gets a turn, consisting of a Simple Action and a Complex Action. There are also a very limited number of free actions. If desired, a character can perform a second simple action in place of their complex action. If a character elects to move, they can perform a combination of movements and other actions - a character with Move 3 and a ROF 2 weapon can move 1 meter, shoot a weapon, then move 2 more meters, and shoot again.
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
                                            <TableCell>Dodge</TableCell>
                                            <TableCell align="left">Free</TableCell>
                                            <TableCell align='left'>Attempt to jerk out of the way of a single attack. Roll higher of Reflexes or Evasion against DV6. Use same total minus 1 for each additional attack in a round.</TableCell>
                                        </TableRow>

                                        <TableRow hover>
                                            <TableCell>Parry</TableCell>
                                            <TableCell align="left">Free</TableCell>
                                            <TableCell align='left'>Identical to Dodge, but requires both attacker and defender to be wielding a melee weapon. Use Melee Weapon or Brawl instead of Evasion for dodging in some circumstances.</TableCell>
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
                                            <TableCell>Evade</TableCell>
                                            <TableCell align="left">Complex</TableCell>
                                            <TableCell align='left'>Choose life. Roll Reflexes + Evasion against DV6 and subtract successes from all incoming attacks this round.</TableCell>
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
                    Attack Rolls - Typical
                </Typography>
            </Grid>

            <Grid item xs={12} display={'flex'} justifyContent={'center'}><Typography variant='p'><i>Attacker Reflexes + Weapon Skill</i></Typography></Grid>
            <Grid item xs={12} display={'flex'} justifyContent={'center'}><Typography variant='p'><i>vs</i></Typography></Grid>
            <Grid item xs={12} display={'flex'} justifyContent={'center'}><Typography variant='p'><i>Higher of Defender Reflexes or Evasion</i></Typography></Grid>
            <Grid item xs={12} display={'flex'} justifyContent={'center'}><Typography variant='p'><i>Base DV for both is 6; modified by distance, aimed shots, and other modifiers. Defender wins ties.</i></Typography></Grid>
            <Grid item xs={12} display={'flex'} justifyContent={'center'}><Typography variant='p'><i>If Attacker has more successes than defender, Attacker damage is equal to weapons base damage + number of successes on attack, minus number of defender successes.</i></Typography></Grid>
            <Grid item xs={12} display={'flex'} justifyContent={'center'}><Typography variant='p'><i>Defender can Dodge (above), Parry, or spend their next complex action to Evade.</i></Typography></Grid>

            <Grid item xs={12} display={'flex'} justifyContent={'center'}>
                <Typography variant='p'>
                    <b>Soaking Damage</b>
                </Typography>
            </Grid>

            <Grid item xs={12} display={'flex'} justifyContent={'center'}><Typography variant='p'><i>After determining damage, reduce wounds taken by (Body + Armor) divided by 2 (round down).</i></Typography></Grid>
            <Grid item xs={12} display={'flex'} justifyContent={'center'}><Typography variant='p'><i>Generally, lower armor by 1 or more depending on the weapon.</i></Typography></Grid>

            <Grid item xs={12}>
                <Typography variant='h6'>
                    Dodging
                </Typography>
            </Grid>

            <Grid item xs={12}>
                <Typography variant='p'>
                    Defenders should only make a single defense roll per round. A character rolls Reflexes or Evasion against a DV of 6. They take their successes on this roll and compare it to the attackers successes. Should they be attacked again in the same round, they will use this number minus one for each additional attack in the same round.
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant='h6'>
                    Evade (Full Dodge):
                </Typography>
            </Grid>

            <Grid item xs={12}>
                <Typography variant='p'>
                    If a character concentrates solely on defense, they can roll their Reflexes + Evasion instead of one or the other. This 'uses' their next complex action. A player who as already dodged can use Full Dodge by sacrificing their next complex action and rolling Evasion or Reflexes (whichever wasn't used initially). This can be used after an attack is rolled and the character knows they will get hit.
                </Typography>
            </Grid>

            <Grid item xs={12}>
                <Typography variant='h6'>
                    Wielding Multiple Weapons
                </Typography>
            </Grid>

            <Grid item xs={12}>
                <Typography variant='p'>
                    Obviously it's pretty cool, but weapons must split their ROF to be used in a single turn. For instance, a character can use a machete (medium melee weapon, ROF 2) for one attack, walk down a hall and shoot a ganger with a Heavy pistol (ROF 2). The lowest ROF applies if one weapon's is higher than the other (e.g. a character with a SMG and a Machete has an effective ROF of 2, not 3). If any weapon has a ROF of 1, it cannot be used in the same round as another weapon, though two such weapons can be still be held.
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
                    <i>The ganger reduces the incoming damage by 2 - their Body is 2 and their armor is 3, so 5/2 (rounded down) is 2 - so they take 5 lethal wounds - half their wound track! They also mark 1 point off their armor as Raff blows a big hole in it. Raff could shoot them again, as their weapon has a ROF of 2 - but Raff decided to concentrate their fire.</i>
                </Typography>
            </Grid>

            <Grid item xs={12}>
                <Typography variant='p'>
                    <i>On their turn, the ganger opts to simply run away, but does't get far enough - they're still barely in range. Raff decides to make sure the ganger goes down this turn, and splits their die pool, rolling 3 dice in two separate pools. They get 2 successes on the first, while the ganger rolls to dodge - with a 2 die penalty from their wounds, they only roll 1 dice and get no successes! Raff hits them for 6 lethal wounds (4 Base Damage + 2 Successes on attack), which is reduced to 4 by the ganger's remaining armor (now only 4); they also ablate their armor by 1 more point. The ganger has taken a total of 11 lethal wounds at this point - they've filled their damage track (10 lethal) and suffered an additional aggravated wound. Raff's second shot gets only 1 success. The ganger has already failed to dodge (and is technically unconscious, to boot), so they take an additional 5 lethal wounds. This is reduced by 1 due to their remaining armor (now 3). Since the ganger's wound track is already filled, they take 4 aggravated wounds, and now have a total of 5 lethal and 5 aggravated wounds.</i>
                </Typography>
            </Grid>

            <Grid item xs={12}>
                <Typography variant='p'>
                    <i>The ganger must now make a death save. Their last wound is only lethal, and they have 5 aggravated wounds as well - so their Death Save DV is 8. They roll their Body (2), and get a sin gle success - they'll live for this round, but Raff is unlikely to give them First Aid before they expire.</i>
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
                                    <TableCell align="left">If target doesn't have a helmet or hardened armor, any damage left after applying armor reduction is multiplied by 2.</TableCell>
                                </TableRow>

                                <TableRow hover>
                                    <TableCell>Held Item</TableCell>
                                    <TableCell align="left">If damage is not completely soaked, item is dropped.</TableCell>
                                </TableRow>

                                <TableRow hover>
                                    <TableCell>Critical Injury</TableCell>
                                    <TableCell align="left">Select and inflict a Critical Injury from the table (see 8 - Injuries and Dying). Injury must make sense given the weapon - it is not possible to inflict a crushed windpipe with a sniper rifle, unless you're using the wrong end.</TableCell>
                                </TableRow>

                                <TableRow hover>
                                    <TableCell>Attack weak point</TableCell>
                                    <TableCell align="left">If a weapon cannot normally deal damage to a target due to its heavy armor, a aimed shot can be made. Normal rules apply (+2 damage) except additional successes are added to the weapon's base damage. This can be done to non-human targets (eg Vehicles, Cover) at the GM's discretion.</TableCell>
                                </TableRow>

                                <TableRow hover>
                                    <TableCell>Shoot out Tire</TableCell>
                                    {/* note this is repeated in vehicles.jsx and should be updated in tandem */}
                                    <TableCell align="left">Usable only against wheeled vehicles. Dealing at least one point of damage (armor still applies to this attack) causes the tire to blow out, reducing the vehicles movement by 5 for 1 round and lowering its max speed appropriately (50%/tire for motorcycles, 25%/tire for cars, etc). The driver's next action must be a drive test to regain control of the vehicle.</TableCell>
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
                    SMGs cannot make aimed shots at any range beyond point blank. Further, they do not deal extra damage based on the number of successes made to hit if the target has ANY armor remaining. They are extremely effective rapid fire devices, however - when a character splits their die pool while making more than one attack in a round, add +1 die to each SMG die pool.
                </Typography>
            </Grid>

            <Grid item xs={12}>
                <Typography variant='p'>
                    Assault Rifles are designed to fire very accurately and quickly - when a character splits their die pool while making more than one attack in a round, add +1 die to each Assault Rifle die pool.
                </Typography>
            </Grid>

            <Grid item xs={12}>
                <Typography variant='p'>
                    <b>Automatic Fire</b>
                </Typography>
            </Grid>

            <Grid item xs={12}>
                <Typography variant='p'>
                    Characters firing a weapon in full automatic have a ROF of 1 and a base difficulty of 5 on their attack. Their weapon must have 10 or more rounds remaining in its clip. This attack cannot be an aimed shot, and additional successes on the attack do not provide additional damage. However, the attacker can elect to remove one or more dice from their attack die pool. If they do so, they can force their opponent to remove the same number of dice from their Reflexes roll to dodge <b>OR</b> increase the amount of armor lost by the target by the number of dice removed, provided they hit the target at all. Additional armor cannot be removed if the target's armor is <i>Hardened</i>.
                    <Grid item xs={12}>Automatic Fire is only usable at the weapons normal range. If used at point blank range, the attacker has a difficulty of 4 AND trades dice at a 1:2 ratio - for every die they remove, their opponent loses 2 from their dodge roll or loses 2 armor.</Grid>
                </Typography>
            </Grid>

            <Grid item xs={12}>
                <Typography variant='p'>
                    <b>Suppressing Fire</b>
                </Typography>
            </Grid>

            <Grid item xs={12}>
                <Typography variant='p'>
                    Instead of aiming for a specific target, an attacker can encourage others to keep their head down. The attackers weapon has a ROF of 1 and a difficulty of 5 for this 'attack'. Their weapon must have 10 or more rounds remaining in the clip. When used succesfully, <b>everyone</b> in front of the shooter within 20 meters must succeed on a Willpower check (difficulty value 6) and score more successes than the attacker's shooting roll in order to do anything besides seek cover or hit the deck immediately.
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
                    Brawling attacks deal (Strength) stun wounds. Brawling attacks do NOT ablate armor. This also goes for characters with Cyberarms and no cyberweapons. Characters with the Big Knucks Cyberware can deal Stun or Lethal wounds, but still do not ablate armor.
                </Typography>
            </Grid>

            <Grid item xs={12}>
                <Typography variant='p'>
                    <b>Fencing</b>
                </Typography>
            </Grid>

            <Grid item xs={12}>
                <Typography variant='p'>
                    When two characters wielding a melee weapon attack each other, the defender can opt to roll Reflexes + Melee Weapon (or brawling, if both characters are unarmed) rather than evasion.
                </Typography>
            </Grid>

            <Grid item xs={12}>
                <Typography variant='p'>
                    <b>Grab</b>
                </Typography>
            </Grid>

            <Grid item xs={12}>
                <Typography variant='p'>
                    Requires 1 free hand. Grabber and Defender both roll Reflexes + Brawling against difficulty 6. If the Grabber wins, either the defender is grabbed or the Grabber can remove one item from their hand(s). Grabs can be released by Grabber at any time. Both characters have +1 difficulty to all actions as long as the Grab is active. The defender or any other character can roll Reflexes OR Strength + Brawling to try and break the grab, with the grab broken if the grabber gets fewer successes than the character attempting to break up the grab. Breaking up a grab is a complex action.
                </Typography>
            </Grid>

            <Grid item xs={12}>
                <Typography variant='p'>
                    Note: A character can grab 2 people if they have no weapons in either hand. Difficulty penalties are cumulative for grabber (but not the grabbees).
                </Typography>
            </Grid>


            <Grid item xs={12}>
                <Typography variant='p'>
                    <b>Choke</b>
                </Typography>
            </Grid>

            <Grid item xs={12}>
                <Typography variant='p'>
                    If a character already has someone in a grab, they can choke the defender as a complex action. This deals t[Grabber Strength] stun wounds. This damage is not able to be soaked. Characters wearing Hardened Armor cannot be choked.
                </Typography>
            </Grid>

            <Grid item xs={12}>
                <Typography variant='p'>
                    <b>Human Shield</b>
                </Typography>
            </Grid>

            <Grid item xs={12}>
                <Typography variant='p'>
                    If a character already has someone in a grab, they can use them as a human shield - use their armor and wound tracks in place of the Grabbers!
                </Typography>
            </Grid>

            <Grid item xs={12}>
                <Typography variant='p'>
                    <b>Throw</b>
                </Typography>
            </Grid>

            <Grid item xs={12}>
                <Typography variant='p'>
                    If a character already has someone in a grab, they can throw them up to [Grabber Strength] meters. The victim suffers  [Grabber Strength] stun wounds and lands prone.
                </Typography>
            </Grid>

        </Grid>
    </>)
}