import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Item from './Item';
import SpecialModal from '../../Modals/SpecialModal';

function CharacterSpecialSkills(charDetailProp) {
    const charDetail = charDetailProp.charDetail

    const fulldot = ` \u2b24`
    const emptydot = ` \u25ef`

    useEffect(() => {
        setSpecialSkills();
    })

    // role abilities
    const [rockerboy, setRockerboy] = useState(0);
    const [solo, setSolo] = useState(0);
    const [netrunner, setNetrunner] = useState(0);
    const [nomad, setNomad] = useState(0);
    const [media, setMedia] = useState(0);
    const [medtech, setMedtech] = useState(0);
    const [maker, setMaker] = useState(0);

    // special role skills - Medtech
    const [medSurgery, setMedSurgery] = useState(0);
    const [medPharma, setMedPharma] = useState(0);
    const [medCryo, setMedCryo] = useState(0);
    // special role skills - Maker
    const [makerField, setMakerField] = useState(0);
    const [makerUpgrade, setMakerUpgrade] = useState(0);
    const [makerFab, setMakerFab] = useState(0);
    const [makerInvent, setMakerInvent] = useState(0);

    const setSpecialSkills = () => {

        setRockerboy(roleDotReturn(charDetail.rockerboy))
        setSolo(roleDotReturn(charDetail.solo))
        setNetrunner(roleDotReturn(charDetail.netrunner))
        setNomad(roleDotReturn(charDetail.nomad))
        setMedia(roleDotReturn(charDetail.media))
        setMedtech(roleDotReturn(charDetail.medtech))
        setMaker(roleDotReturn(charDetail.maker))

        setMedSurgery(dotReturn(charDetail.med_surgery))
        setMedPharma(dotReturn(charDetail.med_pharma))
        setMedCryo(dotReturn(charDetail.med_cryo))
        setMakerField(makerDotReturn(charDetail.maker_field))
        setMakerUpgrade(makerDotReturn(charDetail.maker_upgrade))
        setMakerFab(makerDotReturn(charDetail.maker_fab))
        setMakerInvent(makerDotReturn(charDetail.maker_invent))
    }

    const dotReturn = (skill) => {
        let returnedDots = ''

        for (let i = 0; i < skill; i++) {
            returnedDots += fulldot;
        }
        let j = skill
        for (j; j <= 4; j++) {
            returnedDots += emptydot
        }
        return returnedDots
    }

    const roleDotReturn = (skill) => {
        let returnedDots = ''
        if (skill != 0) {
            for (let i = 0; i < skill; i++) {
                returnedDots += fulldot;
            }
            let j = skill
            for (j; j <= 9; j++) {
                returnedDots += emptydot
            }
        }
        return returnedDots
    }

    const makerDotReturn = (skill) => {
        let returnedDots = ''

        for (let i = 0; i < skill; i++) {
            returnedDots += fulldot;
        }
        let j = skill
        for (j; j <= 9; j++) {
            returnedDots += emptydot
        }
        return returnedDots
    }

    return (
        <>
            <Grid item xs={12}><Item>Special Skills</Item></Grid>
            <Grid item xs={4}>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Item>Role Abilities</Item>
                    </Grid>
                    {rockerboy != '' ? (<>
                        <Grid item xs={4.5}>
                            <Item><SpecialModal prop={'Rockerboy'} /></Item>
                        </Grid>
                        <Grid item xs={7.5}>
                            <Item>{rockerboy}</Item>
                        </Grid></>) : <></>}

                    {solo != '' ? (<>
                        <Grid item xs={4.5}>
                            <Item><SpecialModal prop={'Solo'} /></Item>
                        </Grid>
                        <Grid item xs={7.5}>
                            <Item>{solo}</Item>
                        </Grid></>) : <></>}

                    {netrunner != '' ? (<>
                        <Grid item xs={4.5}>
                            <Item><SpecialModal prop={'Netrunner'} /></Item>
                        </Grid>
                        <Grid item xs={7.5}>
                            <Item>{netrunner}</Item>
                        </Grid></>) : <></>}

                    {nomad != '' ? (<>
                        <Grid item xs={4.5}>
                            <Item><SpecialModal prop={'Nomad'} /></Item>
                        </Grid>
                        <Grid item xs={7.5}>
                            <Item>{nomad}</Item>
                        </Grid></>) : <></>}

                    {media != '' ? (<>
                        <Grid item xs={4.5}>
                            <Item><SpecialModal prop={'Media'} /></Item>
                        </Grid>
                        <Grid item xs={7.5}>
                            <Item>{media}</Item>
                        </Grid></>) : <></>}

                    {medtech != '' ? (<>
                        <Grid item xs={4.5}>
                            <Item><SpecialModal prop={'Medtech'} /></Item>
                        </Grid>
                        <Grid item xs={7.5}>
                            <Item>{medtech}</Item>
                        </Grid>

                        <Grid item xs={4.5}>
                            <Item><SpecialModal prop={'Surgery'} /></Item>
                        </Grid>
                        <Grid item xs={7.5}>
                            <Item>{medSurgery}</Item>
                        </Grid>

                        <Grid item xs={4.5}>
                            <Item><SpecialModal prop={'Pharmaceuticals'} /></Item>
                        </Grid>
                        <Grid item xs={7.5}>
                            <Item>{medPharma}</Item>
                        </Grid>

                        <Grid item xs={4.5}>
                            <Item><SpecialModal prop={'Cryogenics'} /></Item>
                        </Grid>
                        <Grid item xs={7.5}>
                            <Item>{medCryo}</Item>
                        </Grid>
                    </>) : <></>}

                    {maker != '' ? (<><Grid item xs={4.5}>
                        <Item><SpecialModal prop={'Maker'} /></Item>
                    </Grid>
                        <Grid item xs={7.5}>
                            <Item>{maker}</Item>
                        </Grid>
                        <Grid item xs={4.5}>
                            <Item><SpecialModal prop={'Field Expertise'} /></Item>
                        </Grid>
                        <Grid item xs={7.5}>
                            <Item>{makerField}</Item>
                        </Grid>
                        <Grid item xs={4.5}>
                            <Item><SpecialModal prop={'Upgrade Expertise'} /></Item>
                        </Grid>
                        <Grid item xs={7.5}>
                            <Item>{makerUpgrade}</Item>
                        </Grid>
                        <Grid item xs={4.5}>
                            <Item><SpecialModal prop={'Fabrication'} /></Item>
                        </Grid>
                        <Grid item xs={7.5}>
                            <Item>{makerFab}</Item>
                        </Grid>
                        <Grid item xs={4.5}>
                            <Item><SpecialModal prop={'Invention'} /></Item>
                        </Grid>
                        <Grid item xs={7.5}>
                            <Item>{makerInvent}</Item>
                        </Grid>
                        </>) : <></>}

                    <Grid item xs={12} />

                </Grid>
            </Grid>


        </>
    )
}

export default CharacterSpecialSkills 