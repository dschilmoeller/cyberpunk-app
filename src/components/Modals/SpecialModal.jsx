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

export default function SpecialModal({ prop }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const modalText = (prop) => {
        switch (prop) {
            // roles
            case 'Rockerboy':
                return 'Sick frets bruv'
            case 'Solo':
                return 'Time for fighting!'
            case 'Netrunner':
                return 'Oh, the networks you will go!'
            case 'Nomad':
                return 'No, it is not carboy FFS'
            case 'Media':
                return 'Seriously does anyone ever pick this?'
            case 'Medtech':
                return 'Radical surgery is our only option.'
            case 'Maker':
                return 'I made that!'
            // role skills
            case 'Surgery':
                return 'Get in there'
            case 'Pharmaceuticals':
                return 'Chew the willow bark'
            case 'Cryogenics':
                return 'Ice cold, baby.'
            case 'Field Expertise':
                return 'Field upgrades and repair. Jury rigging, or making it up as we go along, in other words.'
            case 'Upgrade Expertise':
                return 'Better. Faster. Stronger. Two clips. Bigger knives.'
            case 'Fabrication':
                return 'Lets make some magic.'
            case 'Invention':
                return 'Lets make NEW magic.'

            // other clickables
            case 'Status':
            case 'Health':
            case 'Marks':
            case 'Die Penalty':
            case 'Bruised':
            case 'Badly Bruised':
            case 'Hurt':
            case 'Badly Hurt':
            case 'Injured':
            case 'Wounded':
            case 'Mauled':
            case 'Seriously Mauled':
            case 'Crippled':
            case 'Incapacitated':
                return 'Some colorful language'

            case 'Armor':
                return 'Armor words'

            case 'Luck':
                return 'Luck Words'

            case 'Humanity':
                return 'Humanity desc.'
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