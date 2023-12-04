import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { Grid } from '@mui/material';

export default function SkillsDialog({ prop }) {
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
            case 'Streets':
                return 'Skills learned in the rough and tumble streets. Tests involving these skills can be used untrained with no penalty - simply roll the associated attribute.'
            case 'Tekhne':
                return 'Skills with some technical and training requirements. Tests involving these skills might be able to be attempted without any dots in the skill, but will probably have a higher difficulty value or require additional successes to succeed.'
            case 'Knowledge':
                return 'Skills reflecting a fair amount of study or broad knowledge of a given subject. Tests involving these skills usually cannot be attempted without at least one dot in the relevant skill.'
            // street skills
            case 'Athletics':
                return `Athletics is a character's skill in all manner of sport and physical activity, from acrobatics and rock climbing to parkour and swimming. Common tests involve perform feats of dexterity or strength such as sprinting or leaping over an obstacle. It also covers throwing items.`
            case 'Brawling':
                return `Whether dirty street fighting or classic hapkido, Brawling represents a character's ability to engage in physical violence without weaponry. While one dot might reflect a self-taught backroom bruiser, four or five indicates someone who dismantles people with their hands for a living.`
            case 'Concentration':
                return `Concentration is a character's ability to maintain focus even in trying circumstances. It is commonly used to perform difficult tasks under pressure (time, mid-firefight, etc), or to continue a dull task for an extended period of time without making mistakes, such as coding overly elaborate character management systems.`
            case 'Evasion':
                return `Evasion represents a character's ability to dodge and avoid attacks.`
            case 'Fast Talk':
                return `Fast Talk is used to charm, deceive, or hornswaggle other folks - sometimes all three at once. It can be used from everything from getting a good deal at the local night market to convincing a local ganger you were sent by their boss.`
            case 'Firearms':
                return `Firearms is a character's skill with most ranged weapons that rely on gunpowder or, because the future, magnets or whatever.`
            case 'Legerdemain':
                return `Legerdemain allows a character to perform acts of fine physical dexterity, and covers a variety of crime-adjacent activities, including lock picking and casual theft. It also can be used for close up magic. It is also useful for detecting people engaged in the same.`
            case 'Melee Weapons':
                return `Melee Weapons is a character's skill with pretty much everything that isn't a gun or cyberware - from the trusty lead pipe to a crystal edged, vibrating monokatana.`
            case 'Perception':
                return `Perception is a character's ability to observe that which is concealed or hidden, and is commonly used in opposition to other characters sneaking around. Common rolls include detecting ambushes, spotting fake walls, or noticing the last five people to come into the bar belong to the local killgangs.`
            case 'Streetwise':
                return `Streetwise is a character's knowledge of the streets. It represents a character's ability to survive in an urban environment. It also represents the ability to find information, scrounge materials, or even a couch for the night.`
            // Tekhne Skills
            case 'Demolitions':
                return `Demolitions is a character's skill with emplaced explosives, as well as their ability to safely handle and disarm the same.`
            case 'Drive Land Vehicle':
                return `Drive Land Vehicles is a character's ability to pilot groundcraft, including cars and motorcycles.`
            case 'Drive Exotic Vehicle':
                return `Drive Exotic Vehicles is a character's ability to pilot all other vehicles, from speedboats to airplanes to submarines to zeppelins.`
            case 'Etiquette':
                return `Etiquette is a character's knowledge of appropriate behavior for diverse situations. Not only which fork to use at a black tie dinner, but also how to behave at a go-ganger rally and the depth of bow appropriate for a Tyger Claw Boss vs their lieutenant.`
            case 'Exotic Weapons':
                return `Exotic Weapons are those which don't fall easily into either Ranged or Melee categories. The most commonly seen weapons are bows, but most cyberweapons also use this skill.`
            case 'Heavy Weapons':
                return `Heavy Weapons are rarely used by Edgerunners - they are expensive, complicated, super advanced, or all of the above - gatling guns, rocket launchers, and high powered lasers are examples of heavy weapons.`
            case 'Performance':
                return `Performance is skill at some kind of artistic pursuit, generally one designed to be played to a crowd. Singing, musical instruments, or dancing are typical applications of this skill.`
            case 'Stealth':
                return `Stealth is a character's ability to move undetected. It can also cover camouflauging ones person or equipment.`
            case 'Survival':
                return `Survival is a character's ability to survive in a harsh, non-urban environment. Outdoor survivalists, nomads, and the like use this skill regularly, mostly to tell whether or not the cactus water is going to make them see things again.`
            case 'Tracking':
                return `Tracking is a character's ability to follow signs and evidence to locate prey of some kind. Bounty Hunters and Big Game Enthusiasts alike have many uses for this skill.`

            // knowledge skills
            case 'Business':
                return `Business is a practical knowledge of the day to day tasks of a corporation. It includes knowledge of finance and accounting, as well as business etiquette and proper filing of form 11-J.`
            case 'Cryptography':
                return `Cryptography is a theoretical and practical application of cybersecurity and cryptographic principles.`
            case 'Cyber Tech':
                return `Cyber tech is a character's knowledge of the installation, repair, and development of implanted technology.`
            case 'Investigation':
                return `Investigation is a character's knowledge of investigative principles and methods.`
            case 'First Aid':
                return `First Aid is basic medical training and skills at applying medical attention in the field.`
            case 'Paramedic':
                return `Paramedic is advanced medical training and the skills needed to deal with severe injuries in the field.`
            case 'Gambling':
                return `Gambling represents a sophisticated understanding of the principles of chance and how they may be altered in one's favor.`
            case 'Language':
                return `Language is a character's skill in a foreign language. Each rank represents fluency in an additional language beyond one's native tongue.`
            case 'Military Tech':
                return `Military Technology is the skill at repairing and maintaining weapons and armor.`
            case 'Science':
                return `Science represents training and knowledge in advanced fields such as Physics, Chemistry, and related subjects.`
            case 'Vehicle Tech':
                return `Vehicle Technology is the training and mechanical knowledge needed to perform maintenance and repairs to vehicles of all types.`
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
                    <Grid container fontFamily={'serif'}>
                        <Grid item>{dialogText(prop)}</Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}