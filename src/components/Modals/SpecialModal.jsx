import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import Modal from '@mui/material/Modal';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

import { Grid } from '@mui/material';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Button } from '@mui/material';

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
                return (<>
                    <Grid container>
                        <Grid item xs={12}>
                            <h1>Charismatic Impact</h1>
                            The Rockerboy has the Role ability Charismatic Impact. They can influence others by sheer presence of personality. They need not be a musical performer; they can influence others through poetry, art, dance, or simply their physical presence. They could be a rocker—or a cult leader.
                        </Grid>
                        <Grid item xs={12}>
                            When not in combat or around people who already actively dislike them, a Rockerboy can make people into fans by rolling Cool + Charismatic Impact vs DV6 for a single person, DV7 for a small group (2-6), and DV8-9 for larger groups.
                            Upon acquiring fans, a Rockerboy can get them to do things for them based on their rank in Charismatic impact.
                        </Grid>
                        <Grid item padding={.25} xs={12}>
                            Venues played - the typical venue for the Rockerboy's performance or display.
                        </Grid>
                        <Grid item padding={.25} xs={12}>
                            Impact on a single fan: What the Rockerboy can convince one fan to do. DV6.
                        </Grid>
                        <Grid item padding={.25} xs={12}>
                            Impact on a small group of fans: What the Rockerboy can convince up to six fans to do. DV7.
                        </Grid>
                        <Grid item padding={.25} xs={12}>
                            Impact on a huge group of fans: What the Rockerboy can convince their fanbase generally to do. DV9.
                        </Grid>
                        <Grid item padding={.25} xs={12}>
                            <h3>Favor Size</h3>
                        </Grid>
                        <Grid item padding={.25} xs={12}>
                            Small: Buy a drink, give a ride
                        </Grid>
                        <Grid item padding={.25} xs={12}>
                            Medium: Buy a drink, give a ride
                        </Grid>
                        <Grid item padding={.25} xs={12}>
                            Large: Buy a drink, give a ride
                        </Grid>
                        <Grid item padding={.25} xs={12}>
                            Huge: Buy a drink, give a ride
                        </Grid>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                                <TableHead>
                                    <TableRow>
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
                                        <TableCell align='center'>Nothing</TableCell>
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
                </>)
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