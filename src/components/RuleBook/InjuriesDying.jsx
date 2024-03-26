import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';


export default function RulebookInjuries() {

    return (<>
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
                    Characters whose damage tracked is filled with lethal damage are <b>dying</b>. They are unconscious, and must make a <b>Death Save</b> each round - this is just the character's Body attribute. This save has an initial difficulty value of 4, but it increases by 1 for each Aggravated wound the character has suffered, to a maximum of 8. Success means they live; failure means immediate death. They can be stabilized with a First Aid (DV8) or Paramedic (DV6) roll. If successful, the character no longer needs to make Death Saves. Any further lethal wounds the character receives are instead Aggravated. Death Saves do not suffer from wound based die penalties.
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
                    Most critical injuries are the results of Aimed Shots (see Rules: Actions & Combat). Alternately, if a character receives more than 7 damage in a single attack (after soaking), they receive a random critical injury - see table below. Other events - car crashes, long falls, etc - can result in a Critical injury at the GM's discretion.
                </Typography>
            </Grid>

            <Grid item xs={12}>
                <Typography variant='p'>
                    A critical injury can be alleviated for 1 hour if a Quick Fix can be applied, otherwise it can be removed with treatment - this requires a roll as indicated on the table, and the recovery of at least 3 lethal wounds. If the character is able to fully recover all lethal damage they have, the critical injury is also removed, even without treatment.
                </Typography>
            </Grid>

            <Grid item xs={12}>
                <Typography variant='p'>
                    Any critical injury raises a character's difficulty values by 1 for most tests, other than Body rolls to avoid dying, and this modifier is affected by anything that also affects wound penalties (eg. Pain Editor, Drugs). This modifier stacks if multiple critical injuries are suffered.
                </Typography>
            </Grid>

            <Grid item xs={12}>
                <Typography variant='p'>
                    <TableContainer sx={{ minWidth: 1 }} component={Paper}>
                        <Table size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow hover>
                                    <TableCell>Roll</TableCell>
                                    <TableCell align="left">Injury</TableCell>
                                    <TableCell align="left">Effect</TableCell>
                                    <TableCell align="left">Quick Fix?</TableCell>
                                    <TableCell align="left">Treatment</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow hover>
                                    <TableCell>1</TableCell>
                                    <TableCell>Broken/Dismembered Arm</TableCell>
                                    <TableCell>The limb cannot be used. Any gear built into a cyberarm is disabled, and any gear held in the relevant hand is dropped.</TableCell>
                                    <TableCell>N/A</TableCell>
                                    <TableCell>Surgery, DV7, replacement limb</TableCell>
                                </TableRow>

                                <TableRow hover>
                                    <TableCell>2</TableCell>
                                    <TableCell>Broken/Dismembered Leg</TableCell>
                                    <TableCell>The limb cannot be used. Any gear built into a cyberleg is disabled. The victim suffers -3 to their move stat, min 1. Character is immediately knocked <b>prone</b>.</TableCell>
                                    <TableCell>N/A</TableCell>
                                    <TableCell>Surgery, DV7, replacement limb</TableCell>
                                </TableRow>

                                <TableRow hover>
                                    <TableCell>3</TableCell>
                                    <TableCell>Collapsed Lung</TableCell>
                                    <TableCell>-1 to Move, begin making death saves as though track is filled with Lethal Damage.</TableCell>
                                    <TableCell>First Aid DV9, Paramedic DV7</TableCell>
                                    <TableCell>Surgery DV7</TableCell>
                                </TableRow>

                                <TableRow hover>
                                    <TableCell>4</TableCell>
                                    <TableCell>Foreign Object</TableCell>
                                    <TableCell>If the character uses a move action, take 1 unsoakable lethal damage per meter moved.</TableCell>
                                    <TableCell>First Aid DV9, Paramedic DV7</TableCell>
                                    <TableCell>Quick fix removes injury, or Surgery DV6</TableCell>
                                </TableRow>

                                <TableRow hover>
                                    <TableCell>5</TableCell>
                                    <TableCell>Torn Muscle</TableCell>
                                    <TableCell>All wound penalties increased by 2.</TableCell>
                                    <TableCell>N/A</TableCell>
                                    <TableCell>Paramedic DV8, Surgery DV7</TableCell>
                                </TableRow>

                                <TableRow hover>
                                    <TableCell>6</TableCell>
                                    <TableCell>Spinal Injury</TableCell>
                                    <TableCell>Can only take 1 Complex action each round.</TableCell>
                                    <TableCell>N/A</TableCell>
                                    <TableCell>Surgery DV8</TableCell>
                                </TableRow>


                                <TableRow hover>
                                    <TableCell>7</TableCell>
                                    <TableCell>Lost Aye</TableCell>
                                    <TableCell>Avast, ye be having -3 dice to yer ranged attacks!</TableCell>
                                    <TableCell>N/A</TableCell>
                                    <TableCell>Surgery, DV7, Replacement Eye</TableCell>
                                </TableRow>

                                <TableRow hover>
                                    <TableCell>8</TableCell>
                                    <TableCell>Concussion</TableCell>
                                    <TableCell>+1 DV to any roll involving a Skill</TableCell>
                                    <TableCell>First Aid DV8, Paramedic DV6</TableCell>
                                    <TableCell>Quick fix removes injury.</TableCell>
                                </TableRow>

                                <TableRow hover>
                                    <TableCell>9</TableCell>
                                    <TableCell>Broken Jaw</TableCell>
                                    <TableCell>Character cannot speak.</TableCell>
                                    <TableCell>N/A</TableCell>
                                    <TableCell>Paramedic DV7, Surgery DV6</TableCell>
                                </TableRow>

                                <TableRow hover>
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
    </>)
}