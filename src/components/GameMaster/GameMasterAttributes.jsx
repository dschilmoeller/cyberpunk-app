import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@mui/material';

import Grid from '@mui/material/Grid';
import Item from '../Characters/CharacterSheet/Item';

import AttributesDialog from '../Modals/AttributesDialog';
import { AttributesArr } from '../../utils/objects/objects.utils'
import { capitalizer } from '../../utils/funcs/funcs';

import { changeCharacterAttribute } from './gm.services';
import CircleIcon from '@mui/icons-material/Circle';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import SquareIcon from '@mui/icons-material/Square';
import CheckBoxOutlineBlankOutlinedIcon from '@mui/icons-material/CheckBoxOutlineBlankOutlined'

export default function GameMasterAttributes({ charDetail, setCharDetail, setPageAlert, loading, setLoading, chuckError }) {

    const fullCircle = <CircleIcon />
    const emptyCircle = <CircleOutlinedIcon />
    const fullBox = <SquareIcon />
    const boxOutline = <CheckBoxOutlineBlankOutlinedIcon />

    const attDotReturn = (stat) => {
        let returnedDots = []
        // fetch relevant character score(s) - this is highly dependent on the arrangement of objects in the objects.utils file
        let charStat = charDetail[stat[0]] != undefined ? charDetail[stat[0]] : charDetail[stat[2]]
        let charCyberStat = stat[2] ? charDetail[stat[2]] : 0

        // generate x full or empty dots, based on character score and maximum
        for (let i = 0; i < stat[1]; i++) {
            returnedDots.push(
                <React.Fragment key={i}>{charStat <= i ? emptyCircle : fullCircle}</React.Fragment>
            )
        }
        // if max is only 5, punch in 5 more dots (for cyber_attributes) and fill appropriately.
        if (stat[1] === 5) {
            for (let i = 0; i < 5; i++) {
                returnedDots.push(
                    <React.Fragment key={i + 20}>{charCyberStat <= i ? boxOutline : fullBox}</React.Fragment>
                )
            }
        }
        return returnedDots
    }

    const changeAttribute = async (attribute, max, change) => {
        const fixedAtt = attributeFixer(attribute)
        // is attribute to be changed + change less than maximum & >0
        if ((charDetail[fixedAtt] + change) > (max) || charDetail[fixedAtt] + change <= 0) {
            setPageAlert({ open: true, message: 'Task Failed Successfully', severity: 'error' });
        } else {
            try {
                let attributeObj = {
                    // xp changes to be implemented later
                    // max_xp: charDetail.max_xp,
                    // spent_xp: charDetail.spent_xp,
                    attribute: fixedAtt,
                    newScore: charDetail[fixedAtt] + change,
                    charID: charDetail.id,
                }
                let result = await changeCharacterAttribute(attributeObj);
                if (result === 'OK') {
                    setCharDetail({
                        ...charDetail,
                        [fixedAtt]: charDetail[fixedAtt] + change
                    });
                    setLoading(false);
                }
            } catch (error) {
                console.error('Error');
                chuckError();
            }
        }
    }

    const attributeFixer = (attributeName) => {
        if (attributeName === 'street cred'){
            return "street_cred"
        } else if (attributeName === 'luck'){
            return "max_luck"
        } else {
            return attributeName
        }
    }


    return (<>
        <Grid container paddingTop={3} spacing={1} alignContent={'center'}>
            {AttributesArr.map((stat, i) => {
                return (
                    <React.Fragment key={i}>
                        {i % 3 === 0 ? <Grid item xs={12} /> : <></>}
                        <Grid xs={3} item><Item><AttributesDialog prop={capitalizer(stat[0])} /></Item></Grid>
                        <Grid xs={3} item><Item>{attDotReturn(stat)}</Item></Grid>
                        <Grid xs={3} item><Item><Button variant='contained' color='success' onClick={() => changeAttribute(stat[0], stat[1], 1)}>Increase</Button></Item></Grid>
                        <Grid xs={3} item><Item><Button variant='contained' color='error' onClick={() => changeAttribute(stat[0], stat[1], -1)}>Decrease</Button></Item></Grid>
                    </React.Fragment>
                )
            })}
        </Grid>
    </>)
}
