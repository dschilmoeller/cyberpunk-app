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
                        <Grid item padding={.5} paddingBottom={2} xs={12}>Shockingly, strength is a measure of how strong a character is. A test is an example of a task that requires effort but is not especially impressive; a feat of strength is something that would represent a high difficulty roll, possibly requiring additional successes for the character with that strength.</Grid>
                        <Grid item padding={.5} paddingBottom={3} xs={12}>Generally, what is a test for one character is not rolled for a character with 1 more dot in strength. Likewise, a feat for one character is a test for a character with one more dot in strength, and a roll is not required for a character with 2 more dots in strength. For example, a character with Strength 3 would have to get 2 successes on a strength test at DV8 to punch through a wooden plank. A character with Strength 4 would only need a single success at DV6 to do the same. A character with Strength 5 wouldn't need to roll - they would simply perform the action.</Grid>
                        
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
                            <Grid item padding={1} xs={12}>A character with Body 1 is sickly, while Body 2 is fairly average.</Grid>
                            <Grid item padding={1} xs={12}>Characters with Body 3 are likely at least amateur athletes or body builders, and are in the pink of health.</Grid>
                            <Grid item padding={1} xs={12}>Characters with a Body of 4 are likely professional athletes or special forces troops. Characters with Body of 5 are unbelievably tough, and include professional ultramarathon runners, cave divers, and similar lunatics.</Grid>
                            <Grid item padding={1} xs={12}>Characters with a Body of 6+ are almost supernaturally tough - they can go for days without sleep, hike across the sahara, and react strangely when people claim to be suffering from a cold.</Grid>
                            <Grid item padding={1} xs={12}>Example rolls include checking for fatiguing tasks with Body + Survival or doing physically exhausting activities with Body + Athletics.</Grid>
                        </Grid>
                    </>
                )
            case 'Reflexes':
                return (
                    <>
                        <Grid container fontFamily={'serif'}>
                            <Grid item padding={1} xs={12}>Reflexes measure how flexible and agile a character is.</Grid>
                            <Grid item padding={1} xs={12}>A character with Reflexes of 1 is a bit ham-handed and fairly uncoordinated</Grid>
                            <Grid item padding={1} xs={12}>A character with Reflexes of 2 is fairly average - they're not going to impress anyone, but they can walk and chew gum at the same time.</Grid>
                            <Grid item padding={1} xs={12}>A character with Reflexes of 3 is a skilled amateur at some kind of sport, be it polo or HEMA; alternately, they may just have unusually good hand-eye coordination</Grid>
                            <Grid item padding={1} xs={12}>A character with Reflexes of 4 is probably a professional athlete of some kind, and trains regularly to keep themselves sharp.</Grid>
                            <Grid item padding={1} xs={12}>A character with Reflexes of 5 has reached the pinnacle of what most people can achieve, and could be a professional sportsperson or a renowned ninja.</Grid>
                            <Grid item padding={1} xs={12}>A character with Reflexes of 6+ has reached a level beyond what most people are capable of - they can fit themselves through a hole the size of their head faster than most can get through a narrow doorway, can scale cliffs freehand, and similar feats.</Grid>
                            <Grid item padding={1} xs={12}>Common rolls include combat related tests, including attacking and dodging, as well as any test requiring physical finesse that isn't related to a technical skill.</Grid>
                        </Grid>
                    </>
                )
            case 'Appearance':
                return (
                    <>
                        <Grid container fontFamily={'serif'}>
                            <Grid item padding={1} xs={12}>Appearance is the physical attractiveness and/or measure of how striking a character looks</Grid>
                            <Grid item padding={1} xs={12}>An appearance of 2 is a fairly average and forgettable person, while someone with appearance of 5 has supermodel level good looks or an almost supernaturally intense stare.</Grid>
                            <Grid item padding={1} xs={12}>Common rolls include making a strong first impression and getting your way by sheer animal magnetism. Frequently paired with Fast Talk, Etiquette, or Business</Grid>
                        </Grid>
                    </>
                )
            case 'Cool':
                return (
                    <>
                        <Grid container fontFamily={'serif'}>
                            <Grid item padding={1} xs={12}>Cool is a combination of charisma, sociability, the ability to impress and influence others. It also reflects a character's composure and ability to remain calm under pressure</Grid>
                            <Grid item padding={1} xs={12}>Cool is combined with some skills such as Fast Talk or Etiquette, but it can also be used in many situations where another attribute would normally appear due to the <b>Rule of Cool.</b></Grid>
                            <Grid item padding={1} xs={12}><b>The Rule of Cool</b></Grid>
                            <Grid item padding={1} xs={12}>Cyberpumpkins live and die by how cool they are. To reflect this, once per scene, they can use their Cool attribute in lieu of any other attribute in a roll. This can only be done if what they are doing is Fucking Awesome.
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
                            <Grid item xs={12}>Simply put, how good your name is on the street - a measure of your underworld notoriety. The average 'Runner might have 1-2 Street Cred. 4-5 represents a 'runner who is known throughout the city or region, while 8+ reflects a level of worldwide fame - videos of their exploits can fetch a fair price on the street.</Grid>
                            <Grid item padding={1} xs={12}>Street Cred is useful when negotiating pay for a job, and affects what kinds of jobs a runner can expect to get in the first place. It can also be used with Streetwise to impress other runners, gangers, corpos, and other lowlifes.</Grid>
                            <Grid item xs={12}>Street cred cannot be purchased with experience, and is granted during play as the runner pulls off especially daring and/or stupid jobs.</Grid>
                        </Grid>
                    </>
                )
            case 'Intelligence':
                return (
                    <>
                        <Grid container fontFamily={'serif'}>
                            <Grid item xs={12}>How mentally sharp someone is, as well as describing their level of academic achievement or "book learning".</Grid>
                            <Grid item padding={1} xs={12}>Netrunners use Intelligence for most net tests.</Grid>
                            <Grid item xs={12}>Commonly used in academic skill tests. A character can use a raw intelligence test to recall specific events or items, as well.</Grid>
                        </Grid>
                    </>
                )
            case 'Willpower':
                return (
                    <>
                        <Grid container fontFamily={'serif'}>
                            <Grid item xs={12}>A person's level of mental toughness and willingness to persevere in the face of adversity. Can be thought of as the Body attribute for the brain.</Grid>
                            <Grid item padding={1} xs={12}>Netrunners use Willpower in place of Body when encountering damage on the 'net.</Grid>
                            <Grid item xs={12}>Commonly used as a solo test to deal with terrifying situations, and may be paired with other skills in some situations (Concentration is the most common, but Demolitions, Etiquette, and Gambling are likewise common enough pairings).</Grid>
                        </Grid>
                    </>
                )
            case 'Technique':
                return (
                    <>
                        <Grid container fontFamily={'serif'}>
                            <Grid item xs={12}>A person's level of skilled manual dexterity, generally with mechanical or more practical matters than Intelligence. Hotwiring a car, performing surgery, and playing an instrument all use the Technique skill.</Grid>
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
                            <Grid item xs={12} padding={1}>Movement is one part of a character's actions each round. They can opt to move during their normal move action as well, doubling their movement for one turn. If they do this, they can elect to roll Reflexes + Athletics, and move an additional amount equal to the successes rolled. This does open the character up to failing and botching, of course.</Grid>
                            <Grid item padding={1} xs={12}>The GM may also decide that a similar roll is called for to make any moves at all. Alternately, moving under fire (such as when someone is blindly firing an automatic weapon around) may require a different test to perform even normal movements, such as Willpower + Concentration</Grid>
                        </Grid>
                    </>
                )
            case 'Luck':
                return (<>
                    <Grid item xs={12} paddingBottom={1}>Luck has a number of uses for a character. Characters can expend a point of temporary luck to do any of the following. A character cannot spend more than one point of luck each round.</Grid>
                    <Grid item xs={12}><b>Just Plain Lucky:</b> A character can add a single success - basically add a die that came up 9.</Grid>
                    <Grid item xs={12}><b>Finger on the Scale:</b> A character can reroll a number of dice up to their maximum luck score. They must take the new results, including any additional 1s that come up.</Grid>
                    <Grid item xs={12}><b>Doesn't Even Sting:</b> This must be declared before rolling. A character can ignore any wound penalties they have for one turn.</Grid>
                    <Grid item xs={12}><b>Trust in The Lady:</b> Before making a roll, once per session, a character can trust in their luck and use their <b>maximum</b> luck in place of an attribute for a single roll. However, any 1s rolled are counted twice - Luck is a fickle mistress.</Grid>
                    <Grid item xs={12}><b>A Kiss While Dying:</b> Characters can also expend one point of luck <b>permanently</b> to perform a single action while incapacitated. They cannot spend temporary luck in the same turn.</Grid>
                </>)
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
                    {dialogText(prop)}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}