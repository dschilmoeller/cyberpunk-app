import React from 'react';
import Grid from '@mui/material/Grid';
import Item from './Item';

import RoleAbilitiesDialog from '../../Modals/RoleAbilitiesDialog';

import CircleIcon from '@mui/icons-material/Circle';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';

function CharacterRoleAbilities(charDetailProp) {
    const charDetail = charDetailProp.charDetail

    const fulldot = <CircleIcon sx={{fontSize: {xs: '1.25rem', sm: '1.25rem', md: '1.25rem', lg: '1.5rem'}}}/>
    const emptydot = <CircleOutlinedIcon sx={{fontSize: {xs: '1.25rem', sm: '1.25rem', md: '1.25rem', lg: '1.5rem'}}}/>

    const dotReturn = (skill) => {
        let returnedDots = []

        for (let i = 0; i < skill; i++) {
            returnedDots.push(<React.Fragment key={i}>{fulldot}</React.Fragment>);
        }
        let j = skill
        for (j; j <= 4; j++) {
            returnedDots.push(<React.Fragment key={j + 10}>{emptydot}</React.Fragment>)
        }
        return returnedDots
    }

    const roleDotReturn = (skill) => {
        let returnedDots = []
        if (skill != 0) {
            for (let i = 0; i < skill; i++) {
                returnedDots.push(<React.Fragment key={i}>{fulldot}</React.Fragment>);
            }
            let j = skill
            for (j; j <= 9; j++) {
                returnedDots.push(<React.Fragment key={j + 10}>{emptydot}</React.Fragment>)
            }
        }
        return returnedDots
    }

    const makerDotReturn = (skill) => {
        let returnedDots = []

        for (let i = 0; i < skill; i++) {
            returnedDots.push(<React.Fragment key={i}>{fulldot}</React.Fragment>);
        }
        let j = skill
        for (j; j <= 9; j++) {
            returnedDots.push(<React.Fragment key={j + 10}>{emptydot}</React.Fragment>)
        }
        return returnedDots
    }

    return (
        <>
            <Grid item xs={12}><Item sx={{ fontSize: '1.3em', padding: 0 }}>Special Skills and Other Information</Item></Grid>
            <Grid item xs={4}>
                <Grid container>

                    <Grid item xs={12}>
                        <Item>Role Abilities</Item>
                    </Grid>
                    {charDetail.rockerboy != 0 ? (<>
                        <Grid item xs={4.5}>
                            <Item><RoleAbilitiesDialog prop={'Rockerboy'} /></Item>
                        </Grid>
                        <Grid item xs={7.5}>
                            <Item>{roleDotReturn(charDetail.rockerboy)}</Item>
                        </Grid></>) : <></>}

                    {charDetail.solo != 0 ? (<>
                        <Grid item xs={4.5}>
                            <Item><RoleAbilitiesDialog prop={'Solo'} /></Item>
                        </Grid>
                        <Grid item xs={7.5}>
                            <Item>{roleDotReturn(charDetail.solo)}</Item>
                        </Grid></>) : <></>}

                    {charDetail.netrunner != 0 ? (<>
                        <Grid item xs={4.5}>
                            <Item><RoleAbilitiesDialog prop={'Netrunner'} /></Item>
                        </Grid>
                        <Grid item xs={7.5}>
                            <Item>{roleDotReturn(charDetail.netrunner)}</Item>
                        </Grid></>) : <></>}

                    {charDetail.nomad != 0 ? (<>
                        <Grid item xs={4.5}>
                            <Item><RoleAbilitiesDialog prop={'Nomad'} /></Item>
                        </Grid>
                        <Grid item xs={7.5}>
                            <Item>{roleDotReturn(charDetail.nomad)}</Item>
                        </Grid></>) : <></>}

                    {charDetail.media != 0 ? (<>
                        <Grid item xs={4.5}>
                            <Item><RoleAbilitiesDialog prop={'Media'} /></Item>
                        </Grid>
                        <Grid item xs={7.5}>
                            <Item>{roleDotReturn(charDetail.media)}</Item>
                        </Grid></>) : <></>}

                    {charDetail.medtech != 0 ? (<>
                        <Grid item xs={4.5}>
                            <Item><RoleAbilitiesDialog prop={'Medtech'} /></Item>
                        </Grid>
                        <Grid item xs={7.5}>
                            <Item>{roleDotReturn(charDetail.medtech)}</Item>
                        </Grid>

                        {charDetail.med_surgery != 0 ? (<>
                            <Grid item xs={4.5}>
                                <Item><RoleAbilitiesDialog prop={'Surgery'} /></Item>
                            </Grid>
                            <Grid item xs={7.5}>
                                <Item>{dotReturn(charDetail.med_surgery)}</Item>
                            </Grid>
                        </>) : <></>}

                        {charDetail.med_cryo != 0 ? (<>
                            <Grid item xs={4.5}>
                                <Item><RoleAbilitiesDialog prop={'Cryogenics'} /></Item>
                            </Grid>
                            <Grid item xs={7.5}>
                                <Item>{dotReturn(charDetail.med_cryo)}</Item>
                            </Grid>
                        </>) : <> </>}
                        
                        {charDetail.med_pharma != 0 ? (<>
                            <Grid item xs={4.5}>
                                <Item><RoleAbilitiesDialog prop={'Pharmaceuticals'} /></Item>
                            </Grid>
                            <Grid item xs={7.5}>
                                <Item>{dotReturn(charDetail.med_pharma)}</Item>
                            </Grid>
                        </>) : <> </>}

                    </>) : <></>}

                    {charDetail.maker != 0 ? (<><Grid item xs={4.5}>
                        <Item><RoleAbilitiesDialog prop={'Maker'} /></Item>
                    </Grid>
                        <Grid item xs={7.5}>
                            <Item>{roleDotReturn(charDetail.maker)}</Item>
                        </Grid>

                        {charDetail.maker_field != 0 ? (<>
                            <Grid item xs={4.5}>
                                <Item><RoleAbilitiesDialog prop={'Field Expertise'} /></Item>
                            </Grid>
                            <Grid item xs={7.5}>
                                <Item>{makerDotReturn(charDetail.maker_field)}</Item>
                            </Grid>
                        </>) : <> </>}

                        {charDetail.maker_upgrade != 0 ? (<>
                            <Grid item xs={4.5}>
                                <Item><RoleAbilitiesDialog prop={'Upgrade Expertise'} /></Item>
                            </Grid>
                            <Grid item xs={7.5}>
                                <Item>{makerDotReturn(charDetail.maker_upgrade)}</Item>
                            </Grid>
                        </>) : <> </>}

                        {charDetail.maker_fab != 0 ? (<>
                            <Grid item xs={4.5}>
                                <Item><RoleAbilitiesDialog prop={'Fabrication'} /></Item>
                            </Grid>
                            <Grid item xs={7.5}>
                                <Item>{makerDotReturn(charDetail.maker_fab)}</Item>
                            </Grid>
                        </>) : <></>}

                        {charDetail.maker_invent != 0 ? (<>
                            <Grid item xs={4.5}>
                                <Item><RoleAbilitiesDialog prop={'Invention'} /></Item>
                            </Grid>
                            <Grid item xs={7.5}>
                                <Item>{makerDotReturn(charDetail.maker_invent)}</Item>
                            </Grid>
                        </>) : <> </>}
                    </>) : <></>}
                </Grid>
            </Grid>
        </>
    )
}

export default CharacterRoleAbilities 