import { useState, useEffect, Fragment } from 'react';
import Grid from '@mui/material/Grid';
import { useSelector, useDispatch } from 'react-redux';
import Item from './Item';
import { Button, Typography } from '@mui/material';
import CharSheetWeaponDialog from '../../Modals/CharSheetWeaponDialog';

export default function CharacterNetrunner() {

    const charNetrunnerGear = useSelector((store) => store.characterNetrunnerGear)
    const charDetail = useSelector((store) => store.characterDetail)

    const unhurtMarker = `\u2610`;
    const aggMarker = `\u2718`;

    const netrunnerActionsCalc = () => {
        if (charDetail.netrunner > 0 && charDetail.netrunner < 4) {
            return 2
        } else if (charDetail.netrunner > 3 && charDetail.netrunner < 7) {
            return 3
        } else if (charDetail.netrunner > 6 && charDetail.netrunner < 10) {
            return 4
        } else if (charDetail.netrunner === 10) {
            return 5
        }
    }

    const rezBoxBuilder = (rez) => {
        let rezArray = []
        for (let i = 0; i < rez; i++) {
            rezArray.push(<Grid key={i} item xs={2} onClick={(e)=> rezBoxChanger(e)}><Item>{unhurtMarker}</Item></Grid>)
        }
        return rezArray
    }

    const [softwareUses, setSoftwareUses] = useState(0)

    const activationBuilder = () => {
        for (let i = 0; i < charNetrunnerGear.length; i++) {
            if (charNetrunnerGear[i].type === 'deck' && charNetrunnerGear[i].equipped === true) {
                setSoftwareUses(Math.floor(charNetrunnerGear[i].slots / 3))
            }
        }
    }

    const useBoxBuilder = (uses) => {
        let useArray = []
        for (let i = 0; i < uses; i++) {
            useArray.push(<Grid key={i} item xs={2} onClick={(e)=> useBoxChanger(e)}><Item>{unhurtMarker}</Item></Grid>)
        }   
        return useArray
    }

    useEffect(() => {
        activationBuilder();
    }, [charNetrunnerGear])

    const rezBoxChanger = (e) => {
        if (e.target.innerText === unhurtMarker) {
            e.target.innerText = aggMarker
        } else if (e.target.innerText === aggMarker) {
            e.target.innerText = unhurtMarker
        }
    }

    const useBoxChanger = (e, incomingKey) => {
        if (e.target.innerText === unhurtMarker) {
            e.target.innerText = aggMarker
        } else if (e.target.innerText === aggMarker) {
            e.target.innerText = unhurtMarker
        }
    }

    return (<>
        <Grid container spacing={2}>
            <Grid item xs={12}><Item>Netrunning Equipment</Item></Grid>
            {charNetrunnerGear.map(gear => {
                if (gear.type === 'deck' && gear.equipped === true) {
                    return (
                        <Fragment key={gear.netrunner_bridge_id}>
                            <Grid item xs={12}>
                                <Grid container paddingBottom={2}>
                                    <Grid item paddingLeft={1} paddingRight={1} xs={4}><Item>Net Actions: {netrunnerActionsCalc()}</Item></Grid>
                                    <Grid item paddingLeft={1} paddingRight={1} xs={4}><Item>Equipped Deck: {gear.name}</Item></Grid>
                                    <Grid item paddingLeft={1} paddingRight={1} xs={4}><Item>Software Activations: {softwareUses}</Item></Grid>
                                </Grid>
                            </Grid>
                        </Fragment>
                    )
                }
            })}

            <Grid container spacing={1}>
                <Grid item xs={12}><Item>Mods</Item></Grid>
            </Grid>
            {charNetrunnerGear.map(gear => {
                if (gear.equipped === true && gear.type === 'mod') {
                    return (
                        <Fragment key={gear.netrunner_bridge_id}>
                            <Grid item xs={12} >
                                <Grid container>
                                    <Grid item xs={4}><Item><b>Name: {gear.name}</b></Item></Grid>
                                    <Grid item xs={8}><Item>{gear.description}</Item></Grid>
                                </Grid>
                            </Grid>
                        </Fragment>
                    )
                }
            })
            }

            <Grid container paddingTop={2} spacing={1}>
                <Grid item xs={12}><Item>Programs</Item></Grid>
            </Grid>

            {charNetrunnerGear.map(gear => {
                if (gear.equipped === true && gear.type === 'software') {
                    return (
                        <Fragment key={gear.netrunner_bridge_id}>
                            <Grid item xs={6} >
                                <Grid container>
                                    <Grid item xs={12}><Item>{gear.name}</Item></Grid>


                                    <Grid item xs={6}><Item>Description</Item></Grid>
                                    <Grid item xs={6}><Item>{gear.description}</Item></Grid>

                                    <Grid item xs={3}><Item>Attack</Item></Grid>
                                    <Grid item xs={3}><Item>{gear.attack}</Item></Grid>
                                    <Grid item xs={3}><Item>Defense</Item></Grid>
                                    <Grid item xs={3}><Item>{gear.defense}</Item></Grid>

                                    <Grid item xs={6}>
                                        <Grid container>
                                            <Grid item xs={12}><Item>Rez</Item></Grid>
                                            {rezBoxBuilder(gear.rez)}
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Grid container>
                                            <Grid item xs={12}><Item>Activations</Item></Grid>
                                            {useBoxBuilder(softwareUses)}
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Fragment>
                    )
                }
            })
            }
        </Grid>
    </>)
}