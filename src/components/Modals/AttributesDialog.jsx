import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { Grid } from '@mui/material';

export default function AttributesDialog({ prop }) {
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
            case 'Strength':
                return <>
                    <Grid container fontFamily={'serif'}>
                        <Grid item padding={.5} paddingBottom={2} xs={12}>Strength determines how strong a character is. A test is an example of a task that requires effort but is not especially impressive; a feat of strength is something that would represent a high difficulty roll, possibly requiring additional successes for the character with that strength.

                        </Grid>
                        <Grid item padding={.5} paddingBottom={3} xs={12}>Generally, what is a test for one character is not rolled for a character with 1 more dot in strength. Likewise, a feat for one character is a test for a character with one more dot in strength, and a roll is not required for a character with 2 more dots in strength.</Grid>

                        <Grid item padding={.5} xs={2}><b>Rating</b></Grid>
                        <Grid item padding={.5} xs={6}><b>Example Test / Feet of Strength</b></Grid>
                        <Grid item padding={.5} xs={4}><b>Dead Lift Weight in kilos</b></Grid>

                        <Grid item padding={.5} xs={2}>1</Grid>
                        <Grid item padding={.5} xs={6}>Snap a medium tree branch / Crush a steel beer can</Grid>
                        <Grid item padding={.5} xs={4}>25</Grid>

                        <Grid item padding={.5} xs={2}>2</Grid>
                        <Grid item padding={.5} xs={6}>Smash a car window / Break a barstool</Grid>
                        <Grid item padding={.5} xs={4}>50</Grid>

                        <Grid item padding={.5} xs={2}>3</Grid>
                        <Grid item padding={.5} xs={6}>Break down a cheap interior door / Punch through a wooden plank</Grid>
                        <Grid item padding={.5} xs={4}>100</Grid>

                        <Grid item padding={.5} xs={2}>4</Grid>
                        <Grid item padding={.5} xs={6}>Haul another person up a rope hand over hand / Kick down an exterior door</Grid>
                        <Grid item padding={.5} xs={4}>175</Grid>

                        <Grid item padding={.5} xs={2}>5</Grid>
                        <Grid item padding={.5} xs={6}>Pick up a motorcycle / Tear apart a chain link fence</Grid>
                        <Grid item padding={.5} xs={4}>250</Grid>

                        <Grid item padding={.5} xs={2}>6</Grid>
                        <Grid item padding={.5} xs={6}>Burst through an interior wall / Break a cheap padlock by brute force</Grid>
                        <Grid item padding={.5} xs={4}>350</Grid>

                        <Grid item padding={.5} xs={2}>7</Grid>
                        <Grid item padding={.5} xs={6}>Flip a (small) car / Break a good padlock with brute force</Grid>
                        <Grid item padding={.5} xs={4}>450</Grid>

                        <Grid item padding={.5} xs={2}>8</Grid>
                        <Grid item padding={.5} xs={6}>Rip a car door off / Smash through a brick wall shouting 'Oh Yeah!'</Grid>
                        <Grid item padding={.5} xs={4}>575</Grid>

                        <Grid item padding={.5} xs={2}>9</Grid>
                        <Grid item padding={.5} xs={6}>Flip a mid-size car / Rip a bot in half. Also anything seen in anime.</Grid>
                        <Grid item padding={.5} xs={4}>700</Grid>

                        <Grid item padding={.5} xs={2}>10</Grid>
                        <Grid item padding={.5} xs={6}>Flip large vehicles / Briefly prevent a helicopter from taking off.</Grid>
                        <Grid item padding={.5} xs={4}>1 Metric Ton</Grid>
                    </Grid>
                </>
            case 'Body':
                return (
                    <>
                        <Grid container fontFamily={'serif'}>
                            <Grid item padding={1} xs={12}>Body is a measure of phsyical toughness and general good health. Characters with a very low body are generally not in very good health, while characters with a high body tend to be extremely fit.</Grid>
                            <Grid item padding={1} xs={12}>Common rolls include checking for fatiguing tasks with Body + Survival, and of course Body + Armor is used for resisting damage. </Grid>
                        </Grid>
                    </>
                )
            case 'Reflexes':
                return (
                    <>
                        <Grid container fontFamily={'serif'}>
                            <Grid item padding={1} xs={12}>Reflexes measure how flexible and agile a character is.</Grid>
                            <Grid item padding={1} xs={12}>Common rolls include combat related tests, including attacking and dodging, as well as any test requiring physical finesse that isn't related to a technical skill.</Grid>
                        </Grid>
                    </>
                )
            case 'Appearance':
                return (
                    <>
                        <Grid container fontFamily={'serif'}>
                            <Grid item padding={1} xs={12}>Appearance is the physical attractiveness and/or measure of how striking a character looks</Grid>
                            <Grid item padding={1} xs={12}>Common rolls include making a strong first impression and getting your way by sheer animal magnetism. Frequently paired with Fast Talk, Etiquette, or Business</Grid>
                        </Grid>
                    </>
                )
            case 'Cool':
                return (
                    <>
                        <Grid container fontFamily={'serif'}>
                            <Grid item padding={1} xs={12}>Cool is a combination of charisma, sociability, the ability to impress and influence others. It also reflects a character's composure and ability to remain calm under pressure</Grid>
                            <Grid item padding={1} xs={12}>It is only rarely partnered with a skill by default (Fast Talk is the only skill it pairs with by default), but Cool can be used in many situations where another attribute would normally appear due to the <b>Rule of Cool.</b></Grid>
                            <Grid item padding={1} xs={12}><b>The Rule of Cool</b></Grid>
                            <Grid item padding={1} xs={12}>Cyberpunks live and die by how cool they are. To reflect this, once per scene, they can use their Cool attribute in lieu of any other attribute in a roll. This can only be done if what they are doing is Fucking Awesome.
                                The GM has final say on what can be subbed, but they are encouraged to be generous.</Grid>
                            <Grid item padding={1} xs={12}>
                                Typically, the difficulty value of the roll is higher, or it requires two rolls (only one of which uses Cool) to succeed. If successful, the result should be Very Dramatic.
                            </Grid>
                            <Grid item padding={1} xs={12}>Example:
                                Ace has strutted into the wrong bar and is close to being on the receiving end of an ass-kicking from a group of Maelstrom gangers. They opt to shoot one in the back of the head…from the front.
                                The GM requires Ace to make an Intelligence (3) + Science (2) roll to calculate the angles.
                                Ace succeeds at Geometry, and rolls their Cool (6) + Automatics (5) skill, scoring an impressive 8 successes and spraying robo-eyes all over their immaculate vest. The remaining gangers buy Ace all the beer.
                            </Grid>
                        </Grid>
                    </>
                )
            case 'Street Cred':
                return (
                    <>
                        <Grid container fontFamily={'serif'}>
                            <Grid item xs={12}>Simply put, how good your name is on the street - a measure of your underworld notoriety.</Grid>
                            <Grid item xs={12}>Street cred cannot be purchased with experience, and is granted during play as the runner pulls off especially daring and/or stupid jobs.</Grid>
                        </Grid>
                    </>
                )
            case 'Intelligence':
                return (
                    <>
                        <Grid container fontFamily={'serif'}>
                            <Grid item xs={12}>How mentally sharp someone is, as well as describing their level of book learning.</Grid>
                            <Grid item xs={12}>Common used in academic skill tests. A character can use a raw intelligence test to recall specific events or items.</Grid>
                        </Grid>
                    </>
                )
            case 'Willpower':
                return (
                    <>
                        <Grid container fontFamily={'serif'}>
                            <Grid item xs={12}>A person's level of mental toughness and willingness to persevere in the face of adversity.</Grid>
                            <Grid item xs={12}>Commonly used as a solo test to deal with terrifying situations, and may be paired with other skills in some situations (Concentration is the most common, but Demolitions, Etiquette, and Gambling are likewise common enough pairings)</Grid>
                        </Grid>
                    </>
                )
            case 'Technique':
                return (
                    <>
                        <Grid container fontFamily={'serif'}>
                            <Grid item xs={12}>A person's level of skill and manual dexterity, generally with mechanical or more practical matters than Intelligence.</Grid>
                            <Grid item xs={12}>Commonly used with Tech skills, as well Performance, Drive Vehicles, and Gambling (when trying to cheat)</Grid>
                        </Grid>
                    </>
                )
            case 'Move':
                return (
                    <>
                        <Grid container fontFamily={'serif'}>
                            <Grid item xs={12} padding={1}>The speed a person moves at. In grid-based play, this the number of squares (1 meter) a character can move each round as a standard action during combat or other contested situations.</Grid>
                            <Grid item xs={12} padding={1}>Generally, this can be used as a comparison as to whether two characters move faster/slower than each other, or at roughly the same speed.</Grid>
                            <Grid item xs={12} padding={1}>A successful Reflexes + Athletics test allows for more movement in a round, particularly when moving is all a character is doing that turn.</Grid>
                        </Grid>
                    </>
                )
            default:
                return ''
        }
    }

    return (
        <>
            <Button sx={{
                textTransform: 'none', color: 'white', '&:hover': {
                    backgroundColor: '#fff',
                    color: '#000',
                }
            }} fullWidth onClick={handleClickOpen('paper')}>{prop}</Button>
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
        </>
    )
}