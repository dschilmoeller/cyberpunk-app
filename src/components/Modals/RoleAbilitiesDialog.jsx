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