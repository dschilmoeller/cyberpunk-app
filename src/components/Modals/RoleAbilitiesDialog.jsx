import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { Grid } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

export default function RoleAbilitiesDialog({ prop }) {
    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');

    const handleClickOpen = (scrollType) => () => {
        setOpen(true);
        setScroll(scrollType);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const dialogText = (prop) => {
        switch (prop) {
            case 'Rockerboy':
                return (
                    <Grid container fontFamily={'serif'}>
                        <Grid item xs={12}>
                            <h1>Charismatic Impact</h1>
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
                            Huge: Give life savings, commit major crimes, assist in a fight until hopeless.
                        </Grid>

                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650, fontFamily: 'serif' }} size="small" aria-label="a dense table">
                                <TableHead>
                                    <TableRow sx={{fontFamily: 'serif'}}>
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
                )
            case 'Solo':
                return (
                    <Grid container fontFamily={'serif'}>
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
                )
            case 'Netrunner':
                return (
                    <Grid container fontFamily={'serif'}>
                        <Grid item xs={12}>
                            Look I'm not doing this yet.
                        </Grid>
                    </Grid>
                )
            case 'Nomad':
                return (
                    <Grid container fontFamily={'serif'}>
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
                )
            case 'Media':
                return (
                    <Grid container fontFamily={'serif'}>
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
                )
            case 'Medtech':
                return (
                    <Grid container fontFamily={'serif'}>
                        <Grid item padding={.5} xs={12}>
                            <h1>Medical Expertise</h1>
                            A character with the Medtech role has, not to put to fine a point on it, the knowledge and skills of a paramedic or doctor. In Cyberpunk, this makes them as much mechanics as doctors much of the time, and they rarely lack for demand of their skills. Medtechs get 1 point in one of three specialties when they advance their Medical Expertise Role Ability. These skills are rolled with an attribute for most tests; Medical Expertise is rarely rolled on its own.
                        </Grid>
                        <Grid item padding={.5} xs={12}>
                            <h3>Surgery:</h3>
                            Surgery is used to treat the most severe injuries, as well as implanting cyberware. It is typically used with the Technique attribute.
                        </Grid>
                        <Grid item padding={.5} xs={12}>
                            <h3>Pharmaceuticals:</h3>
                            Pharmaceuticals allows the Medtech to synthesize one of the below compounds with an Intelligence + Pharmaceuticals roll (DV 6) and some reagents. This will produce a number of doses of a given compound equal to the number of successes on the roll. The reagents have a street value of roughly 200 eddies. Pharmaceuticals typically require injection, though they can be prepared as a topical, pill, etc. possibly with a higher difficulty value as decided by the GM. Applying a dose takes a normal action; if the target is unwilling the Medtech can attempt to forcibly apply the medicine with a melee attack roll. Characters who are <b>not</b> Medtechs cannot administer Pharmaceuticals correctly - they cannot evaluate the correct dosage. They can certainly try, of course.
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
                )
            case 'Maker':
                return (
                    <Grid container fontFamily={'serif'}>
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
                )
            case 'Surgery':
                return (
                    <Grid item padding={.5} xs={12}>
                        <h3>Surgery:</h3>
                        Surgery is used to treat the most severe injuries, as well as implanting cyberware. It is typically used with the Technique attribute.
                    </Grid>
                )
            case 'Pharmaceuticals':
                return (<>
                    <Grid item padding={.5} xs={12}>
                        <h3>Pharmaceuticals:</h3>
                        Pharmaceuticals allows the Medtech to synthesize one of the below compounds with an Intelligence + Pharmaceuticals roll (DV 6) and some reagents. This will produce a number of doses of a given compound equal to the number of successes on the roll. The reagents have a street value of roughly 200 eddies. Pharmaceuticals typically require injection, though they can be prepared as a topical, pill, etc. possibly with a higher difficulty value as decided by the GM. Applying a dose takes a normal action; if the target is unwilling the Medtech can attempt to forcibly apply the medicine with a melee attack roll. Characters who are <b>not</b> Medtechs cannot administer Pharmaceuticals correctly - they cannot evaluate the correct dosage. They can certainly try, of course.
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
                </>)
            case 'Cryogenics':
                return (<>
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
                </>)
            case 'Field Expertise':
                return (<>
                    <Grid item padding={.5} xs={12}>
                        <h3>Field Expertise:</h3>
                        A Maker with Field Expertise is familiar with jury rigging, bypassing, or otherwise changing equipment in a hurry. A maker with this skill can attempt to jury rig a broken device. They roll Technique + Field Expertise against an items normal repair difficulty; if successful the device functions for 1 round / 10 minutes (combat / normal) for each success. Afterwards, the device is fully broken, and cannot be jury rigged again.
                    </Grid>
                    <Grid item padding={.5} xs={12}>
                        Field Expertise can often be used in place of any other technical skill to make a device do a single action - it can be used in place of Cybertech to temporarily disable a cyberlimb, instead of science to disable an alarm system (briefly), or in place of Military Tech to fire the main gun of a tank (once). It
                    </Grid>
                </>)
            case 'Upgrade Expertise':
                return (<>
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
                    </Grid>
                </>)
            case 'Fabrication Expertise':
                return (<>
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
                </>)
            case 'Invention Expertise':
                return (<>
                    <Grid item padding={.5} xs={12}>
                        <h3>Invention Expertise:</h3>
                        A Maker can invent upgrades, modifications, or entirely new items. This skill is kept fairly open ended, but should fit in with the approximate technology and costs of existing items.
                    </Grid>
                    <Grid item padding={.5} xs={12}>
                        If satisfied, the GM will create rules and stats for the proposed item. The invention skill allows the production of a single prototype device; these tend to unbalance and break the game and as such are notoriously prone to failure as the GM realizes their mistake. Mass production requires the Fabrication skill. The roll to invent something is Intelligence + Invention Expertise with a DV determined by the GM.
                    </Grid>
                </>)
        }
    }

    return (
        <div>
            <Button onClick={handleClickOpen('paper')}>{prop}</Button>
            <Dialog
                open={open}
                onClose={handleClose}
                scroll={scroll}
                maxWidth='lg'
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title">{prop}</DialogTitle>
                <DialogContent dividers={scroll === 'paper'}>
                    <DialogContentText
                        tabIndex={-1}
                    >
                        {dialogText(prop)}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}