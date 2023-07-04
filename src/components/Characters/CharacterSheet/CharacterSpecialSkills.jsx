import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import { Stack } from '@mui/material';
import Item from './Item';

function CharacterSpecialSkills(charDetailProp) {
    const charDetail = charDetailProp.charDetail

    const fulldot = ` \u2b24`
    const emptydot = ` \u25ef`

    useEffect(() => {
        setSpecialSkills();
    })

    // combat skills
    const [evasion, setEvasion] = useState(0);
    const [brawl, setBrawl] = useState(0);
    const [melee, setMelee] = useState(0);
    const [archery, setArchery] = useState(0);
    const [handgun, setHandgun] = useState(0);
    const [shoulderArms, setShoulderArms] = useState(0);
    const [automatics, setAutomatics] = useState(0);
    const [heavyWeapons, setHeavyWeapons] = useState(0);

    // technical skills
    const [basicTech, setBasicTech] = useState(0);
    const [cybertech, setCybertech] = useState(0);
    const [weaponTech, setWeaponTech] = useState(0);
    const [medicalTech, setMedicalTech] = useState(0);
    const [securityTech, setSecurityTech] = useState(0);
    const [landVehicleTech, setLandVehicleTech] = useState(0);
    const [airVehicleTech, setAirVehicleTech] = useState(0);
    const [seaVehicleTech, setSeaVehicleTech] = useState(0);

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

        setEvasion(dotReturn(charDetail.evasion))
        setBrawl(dotReturn(charDetail.brawl))
        setMelee(dotReturn(charDetail.melee))
        setArchery(dotReturn(charDetail.archery))
        setHandgun(dotReturn(charDetail.handgun))
        setShoulderArms(dotReturn(charDetail.shoulder_arms))
        setAutomatics(dotReturn(charDetail.automatics))
        setHeavyWeapons(dotReturn(charDetail.heavy_weapons))

        setBasicTech(dotReturn(charDetail.basic_tech))
        setCybertech(dotReturn(charDetail.cyber_tech))
        setWeaponTech(dotReturn(charDetail.weapon_tech))
        setMedicalTech(dotReturn(charDetail.medical_tech))
        setSecurityTech(dotReturn(charDetail.security_tech))
        setLandVehicleTech(dotReturn(charDetail.land_tech))
        setAirVehicleTech(dotReturn(charDetail.air_tech))
        setSeaVehicleTech(dotReturn(charDetail.sea_tech))

        setRockerboy(dotReturn(charDetail.rockerboy))
        setSolo(dotReturn(charDetail.solo))
        setNetrunner(dotReturn(charDetail.netrunner))
        setNomad(dotReturn(charDetail.nomad))
        setMedia(dotReturn(charDetail.media))
        setMedtech(dotReturn(charDetail.medtech))
        setMaker(dotReturn(charDetail.maker))

        setMedSurgery(dotReturn(charDetail.med_surgery))
        setMedPharma(dotReturn(charDetail.med_pharma))
        setMedCryo(dotReturn(charDetail.med_cryo))
        setMakerField(dotReturn(charDetail.maker_field))
        setMakerUpgrade(dotReturn(charDetail.maker_upgrade))
        setMakerFab(dotReturn(charDetail.maker_fab))
        setMakerInvent(dotReturn(charDetail.maker_invent))
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

    return (
        <>
            <Grid item xs={12}><Item>Special Skills</Item></Grid>
            <Grid item xs={4}>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Item>Combat Skills</Item>
                    </Grid>
                    <Grid item xs={4.5}>
                        <Item>Evasion</Item>
                    </Grid>
                    <Grid item xs={7.5}>
                        <Item>{evasion}</Item>
                    </Grid>
                    <Grid item xs={4.5}>
                        <Item>Brawl</Item>
                    </Grid>
                    <Grid item xs={7.5}>
                        <Item>{brawl}</Item>
                    </Grid>
                    <Grid item xs={4.5}>
                        <Item>Melee</Item>
                    </Grid>
                    <Grid item xs={7.5}>
                        <Item>{melee}</Item>
                    </Grid>
                    <Grid item xs={4.5}>
                        <Item>Archery</Item>
                    </Grid>
                    <Grid item xs={7.5}>
                        <Item>{archery}</Item>
                    </Grid>
                    <Grid item xs={4.5}>
                        <Item>Handgun</Item>
                    </Grid>
                    <Grid item xs={7.5}>
                        <Item>{handgun}</Item>
                    </Grid>
                    <Grid item xs={4.5}>
                        <Item>Shoulder Arms</Item>
                    </Grid>
                    <Grid item xs={7.5}>
                        <Item>{shoulderArms}</Item>
                    </Grid>
                    <Grid item xs={4.5}>
                        <Item>Automatics</Item>
                    </Grid>
                    <Grid item xs={7.5}>
                        <Item>{automatics}</Item>
                    </Grid>
                    <Grid item xs={4.5}>
                        <Item>Heavy Weapons</Item>
                    </Grid>
                    <Grid item xs={7.5}>
                        <Item>{heavyWeapons}</Item>
                    </Grid>
                </Grid>
            </Grid>

            <Grid item xs={4}>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Item>Technical Skills</Item>
                    </Grid>

                    <Grid item xs={4.5}>
                        <Item>Basic Tech</Item>
                    </Grid>

                    <Grid item xs={7.5}>
                        <Item>{basicTech}</Item>
                    </Grid>

                    <Grid item xs={4.5}>
                        <Item>Cybertech</Item>
                    </Grid>

                    <Grid item xs={7.5}>
                        <Item>{cybertech}</Item>
                    </Grid>

                    <Grid item xs={4.5}>
                        <Item>Weapon Tech</Item>
                    </Grid>
                    <Grid item xs={7.5}>
                        <Item>{weaponTech}</Item>
                    </Grid>

                    <Grid item xs={4.5}>
                        <Item>Medical Tech</Item>
                    </Grid>
                    <Grid item xs={7.5}>
                        <Item>{medicalTech}</Item>
                    </Grid>

                    <Grid item xs={4.5}>
                        <Item>Security Tech</Item>
                    </Grid>
                    <Grid item xs={7.5}>
                        <Item>{securityTech}</Item>
                    </Grid>

                    <Grid item xs={4.5}>
                        <Item>Land Vehicle Tech</Item>
                    </Grid>
                    <Grid item xs={7.5}>
                        <Item>{landVehicleTech}</Item>
                    </Grid>

                    <Grid item xs={4.5}>
                        <Item>Air Vehicle Tech</Item>
                    </Grid>
                    <Grid item xs={7.5}>
                        <Item>{airVehicleTech}</Item>
                    </Grid>

                    <Grid item xs={4.5}>
                        <Item>Sea Vehicle Tech</Item>
                    </Grid>
                    <Grid item xs={7.5}>
                        <Item>{seaVehicleTech}</Item>
                    </Grid>
                </Grid>
            </Grid>


            <Grid item xs={4}>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Item>Role Abilities</Item>
                    </Grid>
                    <Grid item xs={4.5}>
                        <Item>Rockerboy</Item>
                    </Grid>
                    <Grid item xs={7.5}>
                        <Item>{rockerboy}</Item>
                    </Grid>
                    <Grid item xs={4.5}>
                        <Item>Solo</Item>
                    </Grid>
                    <Grid item xs={7.5}>
                        <Item>{solo}</Item>
                    </Grid>
                    <Grid item xs={4.5}>
                        <Item>Netrunner</Item>
                    </Grid>
                    <Grid item xs={7.5}>
                        <Item>{netrunner}</Item>
                    </Grid>
                    <Grid item xs={4.5}>
                        <Item>Nomad</Item>
                    </Grid>
                    <Grid item xs={7.5}>
                        <Item>{nomad}</Item>
                    </Grid>
                    <Grid item xs={4.5}>
                        <Item>Media</Item>
                    </Grid>
                    <Grid item xs={7.5}>
                        <Item>{media}</Item>
                    </Grid>
                    <Grid item xs={4.5}>
                        <Item>Medtech</Item>
                    </Grid>
                    <Grid item xs={7.5}>
                        <Item>{medtech}</Item>
                    </Grid>
                    <Grid item xs={4.5}>
                        <Item>Maker</Item>
                    </Grid>
                    <Grid item xs={7.5}>
                        <Item>{maker}</Item>
                    </Grid>
                    <Grid item xs={12} />

                </Grid>
            </Grid>


        </>
    )
}

export default CharacterSpecialSkills 