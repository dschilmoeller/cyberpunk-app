import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Grid } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: .5,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function AttributesModal({ prop }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const modalText = (prop) => {
        switch (prop) {
            case 'Strength':
                return <>
                    <Grid container >
                        <Grid item padding={.5} xs={12}>Strength determines how strong a character is.
                            A test is an example of a task that requires effort but is not especially impressive;
                            a feat of strength is something that would represent a high difficulty roll for the character with that strength
                            but would probably be a mere test for someone with higher strength.
                            Feats two levels down rarely require tests to perform, so a character with 10 strength can
                            casually rip off car doors and smash through brick walls all day!</Grid>


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
                        <Grid container>
                            <Grid item padding={.5} xs={12}>Body is a measure of phsyical toughness and general good health. Characters with a very low body are generally not in very good health, while characters with a high body tend to be extremely fit.</Grid>
                            <Grid item padding={.5} xs={12}>Common rolls include checking for fatiguing tasks such as running around on foot all day, and of course Body + Armor is used for resisting damage.</Grid>
                        </Grid>
                    </>
                )
            case 'Reflexes':
                return (
                    <>
                        <Grid container>
                            <Grid item padding={.5} xs={12}>Reflexes measure how flexible and agile a character is.</Grid>
                            <Grid item padding={.5} xs={12}>Common rolls include most combat related tests, including attacking and dodging.</Grid>
                        </Grid>
                    </>
                )
            case 'Appearance':
                return (
                    <>
                        <Grid container>
                            <Grid item padding={.5} xs={12}>Appearance is the physical attractiveness and/or measure of how striking a character looks</Grid>
                            <Grid item padding={.5} xs={12}>Common rolls include making a strong first impression and getting your way by sheer animal magnetism.</Grid>
                        </Grid>
                    </>
                )
            case 'Cool':
                return (
                    <>
                    <Grid container>
                        <Grid item padding={.5} xs={12}>Cool is a combination of charisma, sociability, the ability to impress and influence others. It also reflects a character's composure and ability to remain calm under pressure</Grid>
                        <Grid item padding={.5} xs={12}>As such, common rolls include not only etiquette, persuasion and subterfuge (lying) rolls, but Cool can also be used in many situations where another attribute would normally appear, including:</Grid>
                        <Grid item paddingTop={.5} paddingLeft={.5} xs={12}>Ranged Weapon Tests</Grid>
                        <Grid item xs={12} paddingLeft={.5}>Drive vehicle tests</Grid>
                        <Grid item xs={12} paddingLeft={.5}>Gambling</Grid>
                        <Grid item xs={12} paddingLeft={.5}>High stakes, formal combat, such as quick draw/dueling.</Grid>
                        <Grid item xs={12} paddingLeft={.5}>Generally, such rolls have a higher difficulty value than they otherwise might.</Grid>
                    </Grid>
                    </>
                )
            case 'Street Cred':
                return (
                    <>
                    <Grid container>
                        <Grid item xs={12}>Simply put, how good your name is on the street - a measure of your underworld notoriety.</Grid>
                        <Grid item xs={12}>Street cred cannot be purchased with experience, but can be obtained during character creation and during play as the runner pulls off especially daring and/or stupid jobs.</Grid>
                    </Grid>
                    </>
                )
            case 'Intelligence':
                return (
                    <>
                    <Grid container>
                        <Grid item xs={12}>How mentally sharp someone is, as well as describing a level of book learning.</Grid>
                        <Grid item xs={12}>Common used in academic skill tests, as well as to recall specific events or items.</Grid>
                    </Grid>
                    </>
                )
            case 'Willpower':
                return (
                    <>
                    <Grid container>
                        <Grid item xs={12}>A person's level of mental toughness and willingness to persevere in the face of adversity.</Grid>
                        <Grid item xs={12}>Commonly used as a solo test to deal with terrifying situations, as a counter to intimidation, and in conjunction with the Resist Torture/Drugs skill when appropriate.</Grid>
                    </Grid>
                    </>
                )
            case 'Technique':
                return (
                    <>
                    <Grid container>
                        <Grid item xs={12}>A person's level of skill, generally with mechanical or more practical matters than Intelligence.</Grid>
                        <Grid item xs={12}>Commonly used with technical skills, as well Performance, Drive Vehicles, and Gambling (e.g. when trying to cheat)</Grid>
                    </Grid>
                    </>
                )
            case 'Move':
                return (
                    <>
                    <Grid container>
                        <Grid item xs={12}>The speed a person moves at. In grid-based play, this the number of squares (1 meter) a character can move each round as a standard action during combat or other contested situations.</Grid>
                        <Grid item xs={12}>Generally, this can be used as a comparison as to whether two characters move faster/slower than each other, or at roughly the same speed.</Grid>
                        <Grid item xs={12}>A successful Reflexes + Athletics test allows for more movement in a round, particularly when that is all a character is doing that turn.</Grid>
                    </Grid>
                    </>
                )
            default:
                return ''
        }
    }
    return (
        <div>
            <Typography variant='subtitle2' sx={{ "&:hover": { cursor: "pointer" } }} onClick={handleOpen}>{prop}</Typography>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {prop}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {modalText(prop)}
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}