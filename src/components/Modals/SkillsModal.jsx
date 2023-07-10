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

export default function SkillsModal({ prop }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const modalText = (prop) => {
        switch (prop) {
            case 'Streets':
                return 'Skills learned in the rough and tumble streets. Most tests involving these skills can be used untrained.'
            case 'Tekhne':
                return 'Skills with some technical requirements and background. Tests involving these skills might be able to be attempted without any dots in the skill, but will probably have a higher difficulty value.'
            case 'Knowledge':
                return 'Skills reflecting a fair amount of study. Tests involving these skills usually cannot be attempted without at least one dot in the relevant skill.'
            // street skills
            case 'Athletics':
                return 'Good sport person.'
            case 'Brawling':
                return 'Fisticuffs!'
            case 'Concentration':
                return 'Good focus brain'
            case 'Evasion':
                return 'Stand still dangit!'
            case 'Fast Talk':
                return 'Lying. Just lying'
            case 'Firearms':
                return 'Shooty bang bang'
            case 'Legerdemain':
                return 'I think that is how you spell it.'
            case 'Melee Weapons':
                return 'You have my stun baton'
            case 'Perception':
                return 'What is sight without wisdom to see what is there.'
            case 'Streetwise':
                return 'The wisdom of the streets.'
            // Tekhne Skills
            case 'Demolitions':
                return 'Pop goes the weasal. and the condos. And the garage.'
            case 'Drive Land':
                return 'Cars and such'
            case 'Drive Exotic':
                return 'Planes, Trains, and automoboats.'
            case 'Etiquette':
                return 'Use the small fork.'
            case 'Exotic Weapons':
                return 'And my monofilament whip'
            case 'Heavy Weapons':
                return 'And my axe-class minigun'
            case 'Performance':
                return 'Toodle toot tooty horn.'
            case 'Stealth':
                return 'Sneaky sneaky boots.'
            case 'Survival':
                return 'There can be only one.'
            case 'Tracking':
                return 'Where did that fricking lion go.'

            // knowledge skills
            case 'Business':
                return 'That is just good business.'
            case 'Cryptography':
                return 'Hope you sanitized your inputs.'
            case 'Cyber Tech':
                return 'Care and maintenance of the chrome.'
            case 'Investigation':
                return 'If A then B and Not C ergo the Dog Did Not Bark'
            case 'First Aid':
                return 'I do not think I trained for this.'
            case 'Paramedic':
                return 'I definitely trained for this.'
            case 'Gambling':
                return 'I dont feel lucky. I AM lucky.'
            case 'Language':
                return 'Ah, the sub-dialect of northern German native to the Piffledorf valley.'
            case 'Military Tech':
                return 'Care and maintenance of the steel and polymerized plastic'
            case 'Science':
                return 'She blinded me!'
            case 'Vehicle Tech':
                return 'Care and maintenance of the fleet!'
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
    )
}