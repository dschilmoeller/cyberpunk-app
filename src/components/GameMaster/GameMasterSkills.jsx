import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@mui/material';

import Grid from '@mui/material/Grid';
import Item from '../Characters/CharacterSheet/Item';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';

import SkillsDialog from '../Modals/SkillsDialog';

import CircleIcon from '@mui/icons-material/Circle';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';

function TransitionUp(props) {
    return <Slide {...props} direction="up" />;
}

export default function GameMasterSkills() {

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
        for (j; j <= 4; j++) {
            returnedDots.push(<React.Fragment key={j+5}>{emptyCircle}</React.Fragment>)
        }
        return returnedDots
    }

    const attLevelChange = (statToChange, currentStat, changeType) => {
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
                    <Grid xs={12} item><Item><SkillsDialog prop={'Streets'} /></Item></Grid>

                    <Grid xs={3} item><Item><SkillsDialog prop={'Athletics'} /></Item></Grid>
                    <Grid xs={3} item><Item>{attDotReturn(charDetail.athletics)}</Item></Grid>
                    <Grid xs={3} item><Item><Button variant='contained' color='success' onClick={() => attLevelChange('athletics', charDetail.athletics, 'increase')}>Increase</Button></Item></Grid>
                    <Grid xs={3} item><Item><Button variant='contained' color='error' onClick={() => attLevelChange('athletics', charDetail.athletics, 'decrease')}>Decrease</Button></Item></Grid>

                    <Grid xs={3} item><Item><SkillsDialog prop={'Brawling'} /></Item></Grid>
                    <Grid xs={3} item><Item>{attDotReturn(charDetail.brawling)}</Item></Grid>
                    <Grid xs={3} item><Item><Button variant='contained' color='success' onClick={() => attLevelChange('brawling', charDetail.brawling, 'increase')}>Increase</Button></Item></Grid>
                    <Grid xs={3} item><Item><Button variant='contained' color='error' onClick={() => attLevelChange('brawling', charDetail.brawling, 'decrease')}>Decrease</Button></Item></Grid>

                    <Grid xs={3} item><Item><SkillsDialog prop={'Concentration'} /></Item></Grid>
                    <Grid xs={3} item><Item>{attDotReturn(charDetail.concentration)}</Item></Grid>
                    <Grid xs={3} item><Item><Button variant='contained' color='success' onClick={() => attLevelChange('concentration', charDetail.concentration, 'increase')}>Increase</Button></Item></Grid>
                    <Grid xs={3} item><Item><Button variant='contained' color='error' onClick={() => attLevelChange('concentration', charDetail.concentration, 'decrease')}>Decrease</Button></Item></Grid>

                    <Grid xs={3} item><Item><SkillsDialog prop={'Evasion'} /></Item></Grid>
                    <Grid xs={3} item><Item>{attDotReturn(charDetail.evasion)}</Item></Grid>
                    <Grid xs={3} item><Item><Button variant='contained' color='success' onClick={() => attLevelChange('evasion', charDetail.evasion, 'increase')}>Increase</Button></Item></Grid>
                    <Grid xs={3} item><Item><Button variant='contained' color='error' onClick={() => attLevelChange('evasion', charDetail.evasion, 'decrease')}>Decrease</Button></Item></Grid>

                    <Grid xs={3} item><Item><SkillsDialog prop={'Fast Talk'} /></Item></Grid>
                    <Grid xs={3} item><Item>{attDotReturn(charDetail.fast_talk)}</Item></Grid>
                    <Grid xs={3} item><Item><Button variant='contained' color='success' onClick={() => attLevelChange('fast_talk', charDetail.fast_talk, 'increase')}>Increase</Button></Item></Grid>
                    <Grid xs={3} item><Item><Button variant='contained' color='error' onClick={() => attLevelChange('fast_talk', charDetail.fast_talk, 'decrease')}>Decrease</Button></Item></Grid>

                    <Grid xs={3} item><Item><SkillsDialog prop={'Firearms'} /></Item></Grid>
                    <Grid xs={3} item><Item>{attDotReturn(charDetail.firearms)}</Item></Grid>
                    <Grid xs={3} item><Item><Button variant='contained' color='success' onClick={() => attLevelChange('firearms', charDetail.firearms, 'increase')}>Increase</Button></Item></Grid>
                    <Grid xs={3} item><Item><Button variant='contained' color='error' onClick={() => attLevelChange('firearms', charDetail.firearms, 'decrease')}>Decrease</Button></Item></Grid>

                    <Grid xs={3} item><Item><SkillsDialog prop={'Legerdemain'} /></Item></Grid>
                    <Grid xs={3} item><Item>{attDotReturn(charDetail.legerdemain)}</Item></Grid>
                    <Grid xs={3} item><Item><Button variant='contained' color='success' onClick={() => attLevelChange('legerdemain', charDetail.legerdemain, 'increase')}>Increase</Button></Item></Grid>
                    <Grid xs={3} item><Item><Button variant='contained' color='error' onClick={() => attLevelChange('legerdemain', charDetail.legerdemain, 'decrease')}>Decrease</Button></Item></Grid>

                    <Grid xs={3} item><Item><SkillsDialog prop={'Melee Weapons'} /></Item></Grid>
                    <Grid xs={3} item><Item>{attDotReturn(charDetail.melee_weapons)}</Item></Grid>
                    <Grid xs={3} item><Item><Button variant='contained' color='success' onClick={() => attLevelChange('melee_weapons', charDetail.melee_weapons, 'increase')}>Increase</Button></Item></Grid>
                    <Grid xs={3} item><Item><Button variant='contained' color='error' onClick={() => attLevelChange('melee_weapons', charDetail.melee_weapons, 'decrease')}>Decrease</Button></Item></Grid>

                    <Grid xs={3} item><Item><SkillsDialog prop={'Perception'} /></Item></Grid>
                    <Grid xs={3} item><Item>{attDotReturn(charDetail.perception)}</Item></Grid>
                    <Grid xs={3} item><Item><Button variant='contained' color='success' onClick={() => attLevelChange('perception', charDetail.perception, 'increase')}>Increase</Button></Item></Grid>
                    <Grid xs={3} item><Item><Button variant='contained' color='error' onClick={() => attLevelChange('perception', charDetail.perception, 'decrease')}>Decrease</Button></Item></Grid>

                    <Grid xs={3} item><Item><SkillsDialog prop={'Streetwise'} /></Item></Grid>
                    <Grid xs={3} item><Item>{attDotReturn(charDetail.streetwise)}</Item></Grid>
                    <Grid xs={3} item><Item><Button variant='contained' color='success' onClick={() => attLevelChange('streetwise', charDetail.streetwise, 'increase')}>Increase</Button></Item></Grid>
                    <Grid xs={3} item><Item><Button variant='contained' color='error' onClick={() => attLevelChange('streetwise', charDetail.streetwise, 'decrease')}>Decrease</Button></Item></Grid>

                    <Grid xs={12} item><Item><SkillsDialog prop={'Tekhne'} /></Item></Grid>

                    <Grid xs={3} item><Item><SkillsDialog prop={'Demllitions'} /></Item></Grid>
                    <Grid xs={3} item><Item>{attDotReturn(charDetail.demolitions)}</Item></Grid>
                    <Grid xs={3} item><Item><Button variant='contained' color='success' onClick={() => attLevelChange('demolitions', charDetail.demolitions, 'increase')}>Increase</Button></Item></Grid>
                    <Grid xs={3} item><Item><Button variant='contained' color='error' onClick={() => attLevelChange('demolitions', charDetail.demolitions, 'decrease')}>Decrease</Button></Item></Grid>

                    <Grid xs={3} item><Item><SkillsDialog prop={'Drive Land Vehicle'} /></Item></Grid>
                    <Grid xs={3} item><Item>{attDotReturn(charDetail.drive_land)}</Item></Grid>
                    <Grid xs={3} item><Item><Button variant='contained' color='success' onClick={() => attLevelChange('drive_land', charDetail.drive_land, 'increase')}>Increase</Button></Item></Grid>
                    <Grid xs={3} item><Item><Button variant='contained' color='error' onClick={() => attLevelChange('drive_land', charDetail.drive_land, 'decrease')}>Decrease</Button></Item></Grid>

                    <Grid xs={3} item><Item><SkillsDialog prop={'Drive Exotic Vehicle'} /></Item></Grid>
                    <Grid xs={3} item><Item>{attDotReturn(charDetail.drive_exotic)}</Item></Grid>
                    <Grid xs={3} item><Item><Button variant='contained' color='success' onClick={() => attLevelChange('drive_exotic', charDetail.drive_exotic, 'increase')}>Increase</Button></Item></Grid>
                    <Grid xs={3} item><Item><Button variant='contained' color='error' onClick={() => attLevelChange('drive_exotic', charDetail.drive_exotic, 'decrease')}>Decrease</Button></Item></Grid>

                    <Grid xs={3} item><Item><SkillsDialog prop={'Etiquette'} /></Item></Grid>
                    <Grid xs={3} item><Item>{attDotReturn(charDetail.etiquette)}</Item></Grid>
                    <Grid xs={3} item><Item><Button variant='contained' color='success' onClick={() => attLevelChange('etiquette', charDetail.etiquette, 'increase')}>Increase</Button></Item></Grid>
                    <Grid xs={3} item><Item><Button variant='contained' color='error' onClick={() => attLevelChange('etiquette', charDetail.etiquette, 'decrease')}>Decrease</Button></Item></Grid>

                    <Grid xs={3} item><Item><SkillsDialog prop={'Exotic Weapons'} /></Item></Grid>
                    <Grid xs={3} item><Item>{attDotReturn(charDetail.exotic_weapons)}</Item></Grid>
                    <Grid xs={3} item><Item><Button variant='contained' color='success' onClick={() => attLevelChange('exotic_weapons', charDetail.exotic_weapons, 'increase')}>Increase</Button></Item></Grid>
                    <Grid xs={3} item><Item><Button variant='contained' color='error' onClick={() => attLevelChange('exotic_weapons', charDetail.exotic_weapons, 'decrease')}>Decrease</Button></Item></Grid>

                    <Grid xs={3} item><Item><SkillsDialog prop={'Heavy Weapons'} /></Item></Grid>
                    <Grid xs={3} item><Item>{attDotReturn(charDetail.heavy_weapons)}</Item></Grid>
                    <Grid xs={3} item><Item><Button variant='contained' color='success' onClick={() => attLevelChange('heavy_weapons', charDetail.heavy_weapons, 'increase')}>Increase</Button></Item></Grid>
                    <Grid xs={3} item><Item><Button variant='contained' color='error' onClick={() => attLevelChange('heavy_weapons', charDetail.heavy_weapons, 'decrease')}>Decrease</Button></Item></Grid>

                    <Grid xs={3} item><Item><SkillsDialog prop={'Performance'} /></Item></Grid>
                    <Grid xs={3} item><Item>{attDotReturn(charDetail.performance)}</Item></Grid>
                    <Grid xs={3} item><Item><Button variant='contained' color='success' onClick={() => attLevelChange('performance', charDetail.performance, 'increase')}>Increase</Button></Item></Grid>
                    <Grid xs={3} item><Item><Button variant='contained' color='error' onClick={() => attLevelChange('performance', charDetail.performance, 'decrease')}>Decrease</Button></Item></Grid>

                    <Grid xs={3} item><Item><SkillsDialog prop={'Stealth'} /></Item></Grid>
                    <Grid xs={3} item><Item>{attDotReturn(charDetail.stealth)}</Item></Grid>
                    <Grid xs={3} item><Item><Button variant='contained' color='success' onClick={() => attLevelChange('stealth', charDetail.stealth, 'increase')}>Increase</Button></Item></Grid>
                    <Grid xs={3} item><Item><Button variant='contained' color='error' onClick={() => attLevelChange('stealth', charDetail.stealth, 'decrease')}>Decrease</Button></Item></Grid>

                    <Grid xs={3} item><Item><SkillsDialog prop={'Survival'} /></Item></Grid>
                    <Grid xs={3} item><Item>{attDotReturn(charDetail.survival)}</Item></Grid>
                    <Grid xs={3} item><Item><Button variant='contained' color='success' onClick={() => attLevelChange('survival', charDetail.survival, 'increase')}>Increase</Button></Item></Grid>
                    <Grid xs={3} item><Item><Button variant='contained' color='error' onClick={() => attLevelChange('survival', charDetail.survival, 'decrease')}>Decrease</Button></Item></Grid>

                    <Grid xs={3} item><Item><SkillsDialog prop={'Tracking'} /></Item></Grid>
                    <Grid xs={3} item><Item>{attDotReturn(charDetail.tracking)}</Item></Grid>
                    <Grid xs={3} item><Item><Button variant='contained' color='success' onClick={() => attLevelChange('tracking', charDetail.tracking, 'increase')}>Increase</Button></Item></Grid>
                    <Grid xs={3} item><Item><Button variant='contained' color='error' onClick={() => attLevelChange('tracking', charDetail.tracking, 'decrease')}>Decrease</Button></Item></Grid>

                    <Grid xs={12} item><Item><SkillsDialog prop={'Knowledge'} /></Item></Grid>

                    <Grid xs={3} item><Item><SkillsDialog prop={'Business'} /></Item></Grid>
                    <Grid xs={3} item><Item>{attDotReturn(charDetail.business)}</Item></Grid>
                    <Grid xs={3} item><Item><Button variant='contained' color='success' onClick={() => attLevelChange('business', charDetail.business, 'increase')}>Increase</Button></Item></Grid>
                    <Grid xs={3} item><Item><Button variant='contained' color='error' onClick={() => attLevelChange('business', charDetail.business, 'decrease')}>Decrease</Button></Item></Grid>

                    <Grid xs={3} item><Item><SkillsDialog prop={'Cryptography'} /></Item></Grid>
                    <Grid xs={3} item><Item>{attDotReturn(charDetail.cryptography)}</Item></Grid>
                    <Grid xs={3} item><Item><Button variant='contained' color='success' onClick={() => attLevelChange('cryptography', charDetail.cryptography, 'increase')}>Increase</Button></Item></Grid>
                    <Grid xs={3} item><Item><Button variant='contained' color='error' onClick={() => attLevelChange('cryptography', charDetail.cryptography, 'decrease')}>Decrease</Button></Item></Grid>

                    <Grid xs={3} item><Item><SkillsDialog prop={'Cyber Tech'} /></Item></Grid>
                    <Grid xs={3} item><Item>{attDotReturn(charDetail.cyber_tech)}</Item></Grid>
                    <Grid xs={3} item><Item><Button variant='contained' color='success' onClick={() => attLevelChange('cyber_tech', charDetail.cyber_tech, 'increase')}>Increase</Button></Item></Grid>
                    <Grid xs={3} item><Item><Button variant='contained' color='error' onClick={() => attLevelChange('cyber_tech', charDetail.cyber_tech, 'decrease')}>Decrease</Button></Item></Grid>

                    <Grid xs={3} item><Item><SkillsDialog prop={'Investigation'} /></Item></Grid>
                    <Grid xs={3} item><Item>{attDotReturn(charDetail.investigation)}</Item></Grid>
                    <Grid xs={3} item><Item><Button variant='contained' color='success' onClick={() => attLevelChange('investigation', charDetail.investigation, 'increase')}>Increase</Button></Item></Grid>
                    <Grid xs={3} item><Item><Button variant='contained' color='error' onClick={() => attLevelChange('investigation', charDetail.investigation, 'decrease')}>Decrease</Button></Item></Grid>

                    {charDetail.is_paramedical ? (<>
                        <Grid xs={3} item><Item><SkillsDialog prop={'Paramedic'} /></Item></Grid>
                        <Grid xs={3} item><Item>{attDotReturn(charDetail.paramed)}</Item></Grid>
                        <Grid xs={3} item><Item><Button variant='contained' color='success' onClick={() => attLevelChange('paramed', charDetail.paramed, 'increase')}>Increase</Button></Item></Grid>
                        <Grid xs={3} item><Item><Button variant='contained' color='error' onClick={() => attLevelChange('paramed', charDetail.paramed, 'decrease')}>Decrease</Button></Item></Grid>
                    </>) : (<>
                        <Grid xs={3} item><Item><SkillsDialog prop={'First Aid'} /></Item></Grid>
                        <Grid xs={3} item><Item>{attDotReturn(charDetail.first_aid)}</Item></Grid>
                        <Grid xs={3} item><Item><Button variant='contained' color='success' onClick={() => attLevelChange('first_aid', charDetail.first_aid, 'increase')}>Increase</Button></Item></Grid>
                        <Grid xs={3} item><Item><Button variant='contained' color='error' onClick={() => attLevelChange('first_aid', charDetail.first_aid, 'decrease')}>Decrease</Button></Item></Grid>
                    </>)}

                    < Grid xs={3} item><Item><SkillsDialog prop={'Gambling'} /></Item></Grid>
                    <Grid xs={3} item><Item>{attDotReturn(charDetail.gambling)}</Item></Grid>
                    <Grid xs={3} item><Item><Button variant='contained' color='success' onClick={() => attLevelChange('gambling', charDetail.gambling, 'increase')}>Increase</Button></Item></Grid>
                    <Grid xs={3} item><Item><Button variant='contained' color='error' onClick={() => attLevelChange('gambling', charDetail.gambling, 'decrease')}>Decrease</Button></Item></Grid>

                    <Grid xs={3} item><Item><SkillsDialog prop={'Language'} /></Item></Grid>
                    <Grid xs={3} item><Item>{attDotReturn(charDetail.language)}</Item></Grid>
                    <Grid xs={3} item><Item><Button variant='contained' color='success' onClick={() => attLevelChange('language', charDetail.language, 'increase')}>Increase</Button></Item></Grid>
                    <Grid xs={3} item><Item><Button variant='contained' color='error' onClick={() => attLevelChange('language', charDetail.language, 'decrease')}>Decrease</Button></Item></Grid>

                    <Grid xs={3} item><Item><SkillsDialog prop={'Military Tech'} /></Item></Grid>
                    <Grid xs={3} item><Item>{attDotReturn(charDetail.military_tech)}</Item></Grid>
                    <Grid xs={3} item><Item><Button variant='contained' color='success' onClick={() => attLevelChange('military_tech', charDetail.military_tech, 'increase')}>Increase</Button></Item></Grid>
                    <Grid xs={3} item><Item><Button variant='contained' color='error' onClick={() => attLevelChange('military_tech', charDetail.military_tech, 'decrease')}>Decrease</Button></Item></Grid>

                    <Grid xs={3} item><Item><SkillsDialog prop={'Science'} /></Item></Grid>
                    <Grid xs={3} item><Item>{attDotReturn(charDetail.science)}</Item></Grid>
                    <Grid xs={3} item><Item><Button variant='contained' color='success' onClick={() => attLevelChange('science', charDetail.science, 'increase')}>Increase</Button></Item></Grid>
                    <Grid xs={3} item><Item><Button variant='contained' color='error' onClick={() => attLevelChange('science', charDetail.science, 'decrease')}>Decrease</Button></Item></Grid>

                    <Grid xs={3} item><Item><SkillsDialog prop={'Vehicle Tech'} /></Item></Grid>
                    <Grid xs={3} item><Item>{attDotReturn(charDetail.vehicle_tech)}</Item></Grid>
                    <Grid xs={3} item><Item><Button variant='contained' color='success' onClick={() => attLevelChange('vehicle_tech', charDetail.vehicle_tech, 'increase')}>Increase</Button></Item></Grid>
                    <Grid xs={3} item><Item><Button variant='contained' color='error' onClick={() => attLevelChange('vehicle_tech', charDetail.vehicle_tech, 'decrease')}>Decrease</Button></Item></Grid>
                </Grid>
            </Grid>
        </Grid >
    </>)
}
