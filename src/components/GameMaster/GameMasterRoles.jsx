import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@mui/material';

import Grid from '@mui/material/Grid';
import Item from '../Characters/CharacterSheet/Item';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';

import RoleAbilitiesDialog from '../Modals/RoleAbilitiesDialog';

import CircleIcon from '@mui/icons-material/Circle';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';

function TransitionUp(props) {
    return <Slide {...props} direction="up" />;
}

export default function GameMasterRoles() {

    const dispatch = useDispatch();

    const charDetail = useSelector(store => store.advancementDetail)

    const [showSnackbar, setShowSnackbar] = React.useState(false);
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const fullCircle = <CircleIcon />
    const emptyCircle = <CircleOutlinedIcon />

    const attDotReturn = (attribute, cyberAtt) => {
        let returnedDots = []
        for (let i = 0; i < attribute; i++) {
            returnedDots.push(<React.Fragment key={i}>{fullCircle}</React.Fragment>)
        }
        let j = attribute
        for (j; j <= 9; j++) {
            returnedDots.push(<React.Fragment key={j}>{emptyCircle}</React.Fragment>)
        }
        return returnedDots
    }

    const fiveAttDotReturn = (attribute, cyberAtt) => {
        let returnedDots = []
        for (let i = 0; i < attribute; i++) {
            returnedDots.push(<React.Fragment key={i}>{fullCircle}</React.Fragment>)
        }
        let j = attribute
        for (j; j <= 4; j++) {
            returnedDots.push(<React.Fragment key={j}>{emptyCircle}</React.Fragment>)
        }
        return returnedDots
    }

    const attLevelChange = (statToChange, currentStat, changeType) => {
        if (currentStat < 10 && changeType === 'increase') {
            currentStat += 1
        } else if (currentStat > 0 && changeType === 'decrease') {
            currentStat -= 1
        } else {
            setShowSnackbar(true)
        }

        dispatch({
            type: "GM_CHANGE_STAT", payload: {
                statToChange: statToChange,
                newStatAmount: currentStat,
            }
        })
    }

    const fiveAttLevelChange = (statToChange, currentStat, changeType) => {
        if (currentStat < 5 && changeType === 'increase') {
            currentStat += 1
        } else if (currentStat > 0 && changeType === 'decrease') {
            currentStat -= 1
        } else {
            setShowSnackbar(true)
        }

        dispatch({
            type: "GM_CHANGE_STAT", payload: {
                statToChange: statToChange,
                newStatAmount: currentStat,
            }
        })
    }

    const changeParamedic = (input) => {
        dispatch({ type: "GM_SET_IS_PARAMEDICAL", payload: input})
    }

    return (<>

        <Snackbar
            TransitionComponent={TransitionUp}
            autoHideDuration={2000}
            open={showSnackbar}
            onClose={() => setShowSnackbar(false)}
            anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
        >
            <Alert onClose={() => setShowSnackbar(false)} severity="warning" sx={{ width: '100%' }}>
                Can't make selected change!
            </Alert>
        </Snackbar >

        <Grid container paddingTop={3} spacing={3} alignContent={'center'}>
            <Grid item xs={12}>
                <Grid container spacing={1}>
                    <Grid xs={12} item><Item>Caution: It is possible to override built in limits (eg more points in role skills than role abilities) - please check your math.</Item></Grid>

                    <Grid xs={3} item><Item><RoleAbilitiesDialog prop={'Rockerboy'} /></Item></Grid>
                    <Grid xs={3} item><Item>{attDotReturn(charDetail.rockerboy)}</Item></Grid>
                    <Grid xs={3} item><Item><Button variant='contained' color='success' onClick={() => attLevelChange('rockerboy', charDetail.rockerboy, 'increase')}>Increase</Button></Item></Grid>
                    <Grid xs={3} item><Item><Button variant='contained' color='error' onClick={() => attLevelChange('rockerboy', charDetail.rockerboy, 'decrease')}>Decrease</Button></Item></Grid>

                    <Grid xs={3} item><Item><RoleAbilitiesDialog prop={'Solo'} /></Item></Grid>
                    <Grid xs={3} item><Item>{attDotReturn(charDetail.solo)}</Item></Grid>
                    <Grid xs={3} item><Item><Button variant='contained' color='success' onClick={() => attLevelChange('solo', charDetail.solo, 'increase')}>Increase</Button></Item></Grid>
                    <Grid xs={3} item><Item><Button variant='contained' color='error' onClick={() => attLevelChange('solo', charDetail.solo, 'decrease')}>Decrease</Button></Item></Grid>

                    <Grid xs={3} item><Item><RoleAbilitiesDialog prop={'Netrunner'} /></Item></Grid>
                    <Grid xs={3} item><Item>{attDotReturn(charDetail.netrunner)}</Item></Grid>
                    <Grid xs={3} item><Item><Button variant='contained' color='success' onClick={() => attLevelChange('netrunner', charDetail.netrunner, 'increase')}>Increase</Button></Item></Grid>
                    <Grid xs={3} item><Item><Button variant='contained' color='error' onClick={() => attLevelChange('netrunner', charDetail.netrunner, 'decrease')}>Decrease</Button></Item></Grid>

                    <Grid xs={3} item><Item><RoleAbilitiesDialog prop={'Nomad'} /></Item></Grid>
                    <Grid xs={3} item><Item>{attDotReturn(charDetail.nomad)}</Item></Grid>
                    <Grid xs={3} item><Item><Button variant='contained' color='success' onClick={() => attLevelChange('nomad', charDetail.nomad, 'increase')}>Increase</Button></Item></Grid>
                    <Grid xs={3} item><Item><Button variant='contained' color='error' onClick={() => attLevelChange('nomad', charDetail.nomad, 'decrease')}>Decrease</Button></Item></Grid>

                    <Grid xs={3} item><Item>Nomad Vehicles Available</Item></Grid>
                    <Grid xs={3} item><Item>{attDotReturn(charDetail.nomad_vehicle_slots)}</Item></Grid>
                    <Grid xs={3} item><Item><Button variant='contained' color='success' onClick={() => attLevelChange('nomad_vehicle_slots', charDetail.nomad_vehicle_slots, 'increase')}>Increase</Button></Item></Grid>
                    <Grid xs={3} item><Item><Button variant='contained' color='error' onClick={() => attLevelChange('nomad_vehicle_slots', charDetail.nomad_vehicle_slots, 'decrease')}>Decrease</Button></Item></Grid>

                    <Grid xs={3} item><Item><RoleAbilitiesDialog prop={'Media'} /></Item></Grid>
                    <Grid xs={3} item><Item>{attDotReturn(charDetail.media)}</Item></Grid>
                    <Grid xs={3} item><Item><Button variant='contained' color='success' onClick={() => attLevelChange('media', charDetail.media, 'increase')}>Increase</Button></Item></Grid>
                    <Grid xs={3} item><Item><Button variant='contained' color='error' onClick={() => attLevelChange('media', charDetail.media, 'decrease')}>Decrease</Button></Item></Grid>

                    <Grid xs={3} item><Item><RoleAbilitiesDialog prop={'Medtech'} /></Item></Grid>
                    <Grid xs={3} item><Item>{attDotReturn(charDetail.medtech)}</Item></Grid>
                    <Grid xs={3} item><Item><Button variant='contained' color='success' onClick={() => attLevelChange('medtech', charDetail.medtech, 'increase')}>Increase</Button></Item></Grid>
                    <Grid xs={3} item><Item><Button variant='contained' color='error' onClick={() => attLevelChange('medtech', charDetail.medtech, 'decrease')}>Decrease</Button></Item></Grid>

                    <Grid xs={3} item><Item> Character has Paramedic:</Item></Grid>
                    <Grid xs={3} item><Item>{charDetail.is_paramedical ? 'Yes' : 'No'}</Item></Grid>
                    <Grid xs={3} item><Item><Button variant='contained' color='success' onClick={() => changeParamedic(true)}>Add</Button></Item></Grid>
                    <Grid xs={3} item><Item><Button variant='contained' color='error' onClick={() => changeParamedic(false)}>Remove</Button></Item></Grid>

                    <Grid xs={3} item><Item><RoleAbilitiesDialog prop={'Surgery'} /></Item></Grid>
                    <Grid xs={3} item><Item>{fiveAttDotReturn(charDetail.med_surgery)}</Item></Grid>
                    <Grid xs={3} item><Item><Button variant='contained' color='success' onClick={() => fiveAttLevelChange('med_surgery', charDetail.med_surgery, 'increase')}>Increase</Button></Item></Grid>
                    <Grid xs={3} item><Item><Button variant='contained' color='error' onClick={() => fiveAttLevelChange('med_surgery', charDetail.med_surgery, 'decrease')}>Decrease</Button></Item></Grid>

                    <Grid xs={3} item><Item><RoleAbilitiesDialog prop={'Pharmaceuticals'} /></Item></Grid>
                    <Grid xs={3} item><Item>{fiveAttDotReturn(charDetail.med_pharma)}</Item></Grid>
                    <Grid xs={3} item><Item><Button variant='contained' color='success' onClick={() => fiveAttLevelChange('med_pharma', charDetail.med_pharma, 'increase')}>Increase</Button></Item></Grid>
                    <Grid xs={3} item><Item><Button variant='contained' color='error' onClick={() => fiveAttLevelChange('med_pharma', charDetail.med_pharma, 'decrease')}>Decrease</Button></Item></Grid>

                    <Grid xs={3} item><Item><RoleAbilitiesDialog prop={'Cryogenics'} /></Item></Grid>
                    <Grid xs={3} item><Item>{fiveAttDotReturn(charDetail.med_cryo)}</Item></Grid>
                    <Grid xs={3} item><Item><Button variant='contained' color='success' onClick={() => fiveAttLevelChange('med_cryo', charDetail.med_cryo, 'increase')}>Increase</Button></Item></Grid>
                    <Grid xs={3} item><Item><Button variant='contained' color='error' onClick={() => fiveAttLevelChange('med_cryo', charDetail.med_cryo, 'decrease')}>Decrease</Button></Item></Grid>

                    <Grid xs={3} item><Item><RoleAbilitiesDialog prop={'Maker'} /></Item></Grid>
                    <Grid xs={3} item><Item>{attDotReturn(charDetail.maker)}</Item></Grid>
                    <Grid xs={3} item><Item><Button variant='contained' color='success' onClick={() => attLevelChange('maker', charDetail.maker, 'increase')}>Increase</Button></Item></Grid>
                    <Grid xs={3} item><Item><Button variant='contained' color='error' onClick={() => attLevelChange('maker', charDetail.maker, 'decrease')}>Decrease</Button></Item></Grid>
                    
                    <Grid xs={3} item><Item><RoleAbilitiesDialog prop={'Field Expertise'} /></Item></Grid>
                    <Grid xs={3} item><Item>{attDotReturn(charDetail.maker_field)}</Item></Grid>
                    <Grid xs={3} item><Item><Button variant='contained' color='success' onClick={() => attLevelChange('maker_field', charDetail.maker_field, 'increase')}>Increase</Button></Item></Grid>
                    <Grid xs={3} item><Item><Button variant='contained' color='error' onClick={() => attLevelChange('maker_field', charDetail.maker_field, 'decrease')}>Decrease</Button></Item></Grid>
                    
                    <Grid xs={3} item><Item><RoleAbilitiesDialog prop={'Upgrade Expertise'} /></Item></Grid>
                    <Grid xs={3} item><Item>{attDotReturn(charDetail.maker_upgrade)}</Item></Grid>
                    <Grid xs={3} item><Item><Button variant='contained' color='success' onClick={() => attLevelChange('maker_upgrade', charDetail.maker_upgrade, 'increase')}>Increase</Button></Item></Grid>
                    <Grid xs={3} item><Item><Button variant='contained' color='error' onClick={() => attLevelChange('maker_upgrade', charDetail.maker_upgrade, 'decrease')}>Decrease</Button></Item></Grid>
                    
                    <Grid xs={3} item><Item><RoleAbilitiesDialog prop={'Fabrication'} /></Item></Grid>
                    <Grid xs={3} item><Item>{attDotReturn(charDetail.maker_fab)}</Item></Grid>
                    <Grid xs={3} item><Item><Button variant='contained' color='success' onClick={() => attLevelChange('maker_fab', charDetail.maker_fab, 'increase')}>Increase</Button></Item></Grid>
                    <Grid xs={3} item><Item><Button variant='contained' color='error' onClick={() => attLevelChange('maker_fab', charDetail.maker_fab, 'decrease')}>Decrease</Button></Item></Grid>
                    
                    <Grid xs={3} item><Item><RoleAbilitiesDialog prop={'Invention'} /></Item></Grid>
                    <Grid xs={3} item><Item>{attDotReturn(charDetail.maker_invent)}</Item></Grid>
                    <Grid xs={3} item><Item><Button variant='contained' color='success' onClick={() => attLevelChange('maker_invent', charDetail.maker_invent, 'increase')}>Increase</Button></Item></Grid>
                    <Grid xs={3} item><Item><Button variant='contained' color='error' onClick={() => attLevelChange('maker_invent', charDetail.maker_invent, 'decrease')}>Decrease</Button></Item></Grid>
                </Grid>
            </Grid>
        </Grid >
    </>)
}
