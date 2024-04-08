import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import Item from '../../Characters/CharacterSheet/Item';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';

import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';


function TransitionUp(props) {
    return <Slide {...props} direction="up" />;
}

export default function GMOwnedCyberware() {

    const dispatch = useDispatch();

    const charCyberware = useSelector(store => store.characterGear.cyberware);
    const boughtCyberware = useSelector(store => store.characterGear.boughtCyberware);
    const cyberwareID = useSelector(store => store.characterGear.cyberwareID);
    const cyberwareMaster = useSelector(store => store.gearMaster.cyberware);

    const charDetail = useSelector((store) => store.characterDetail);

    const euroBuck = `\u20AC$`

    const [showSnackbar, setShowSnackbar] = React.useState(false);
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const [selectedList, setSelectedList] = useState('fashionware');
    const handleTabChange = (event, newValue) => {
        setSelectedList(newValue);
    }

    const gmRemoveCyberware = (item) => {
        dispatch({ type: 'GM_REMOVE_CYBERWARE', payload: item });
    }

    const gmRemoveGMCyberware = (item) => {
        dispatch({ type: 'GM_REMOVE_GM_CYBERWARE', payload: item });
    }

    const [allowDeleteEquipped, setAllowDeleteEquipped] = useState(false)

    return (<>
        <Snackbar
            TransitionComponent={TransitionUp}
            autoHideDuration={2000}
            open={showSnackbar}
            onClose={() => setShowSnackbar(false)}
            anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
        >
            <Alert onClose={() => setShowSnackbar(false)} severity="warning" sx={{ width: '100%' }}>
                Transaction canceled due to lack of funds
            </Alert>
        </Snackbar>

        <Tabs
            value={selectedList}
            onChange={handleTabChange}
            indicatorColor='primary'
            textColor='secondary'>
            <Tab value='fashionware' label='Fashionware' />
            <Tab value='neuralware' label='Neuralware' />
            <Tab value='cyberoptics' label='Cyberoptics' />
            <Tab value='cyberaudio' label='Cyberaudio' />
            <Tab value='internalware' label='Internalware' />
            <Tab value='externalware' label='Externalware' />
            <Tab value='cyberarm' label='Cyberarm' />
            <Tab value='cyberleg' label='Cyberleg' />
            <Tab value='borgware' label='Borgware (Beta)' />
        </Tabs>

        <Grid container>
            <Grid item xs={12}>
                <h2>{charDetail.handle}'s Cyberware</h2>
            </Grid>
            <Grid item xs={12}>
                <Item>Note: This will restore permanent humanity losses. It will not alter slot counts, armor, or health; removing equipped cyberware is NOT recommended.</Item>
            </Grid>
            <Grid item xs={12}><Item><FormGroup sx={{ position: 'flex', alignItems: 'center' }}>
                <FormControlLabel control={<Switch
                    checked={allowDeleteEquipped}
                    onChange={(e) => setAllowDeleteEquipped(e.target.checked)} />} label="Allow Deleting Equipped Cyberware" />
            </FormGroup>
            </Item>
            </Grid>
        </Grid>

        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow hover>
                        <TableCell align="left">Name</TableCell>
                        <TableCell align="center">Description</TableCell>
                        <TableCell align="center">Humanity Cost</TableCell>
                        <TableCell align="center">Install Requirement</TableCell>
                        <TableCell align="center">Street Price</TableCell>
                        <TableCell align="center">Equipped</TableCell>
                        <TableCell align="center">Remove</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {charCyberware.map(item => {
                        if (item.type === selectedList && item.equipped === false || item.type === selectedList && allowDeleteEquipped === true) {
                            return (<React.Fragment key={item.owned_cyberware_id}>
                                <TableRow hover>
                                    <TableCell align="left">{item.name} </TableCell>
                                    <TableCell align="center">{item.description}</TableCell>
                                    <TableCell align="center">{item.humanity_loss_min} - {item.humanity_loss_max}</TableCell>
                                    <TableCell align="center">{item.install_level}</TableCell>
                                    <TableCell align="center">{euroBuck}{Math.floor(item.price / 4).toLocaleString("en-US")}</TableCell>
                                    <TableCell align="center">{item.equipped ? 'Y' : 'N'}</TableCell>
                                    <TableCell align="center"><Button onClick={() => gmRemoveCyberware(item)}>Remove</Button></TableCell>
                                </TableRow>
                            </React.Fragment>)
                        }
                    })}
                    {boughtCyberware.map((item, i) => {
                        if (item.type === selectedList) {
                            return (<React.Fragment key={i}>
                                <TableRow hover>
                                    <TableCell align="left">{item.name} </TableCell>
                                    <TableCell align="center">{item.description}</TableCell>
                                    <TableCell align="center">{item.humanity_loss_min} - {item.humanity_loss_max}</TableCell>
                                    <TableCell align="center">{item.install_level}</TableCell>
                                    <TableCell align="center">{euroBuck}{Math.floor(item.price).toLocaleString("en-US")}</TableCell>
                                    <TableCell align="center">N</TableCell>
                                    <TableCell align="center"><Button onClick={() => gmRemoveGMCyberware(item)}>Remove</Button></TableCell>
                                </TableRow>
                            </React.Fragment>)
                        }
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    </>)
}