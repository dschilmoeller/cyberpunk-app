import React from 'react';
import Grid from '@mui/material/Grid';
import { useSelector, useDispatch } from 'react-redux';
import Item from './Item';
import { Button } from "@mui/material";
import OtherAttributesDialog from '../../Modals/OtherAttributesDialog';

import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import CheckBoxOutlineBlankOutlinedIcon from '@mui/icons-material/CheckBoxOutlineBlankOutlined'

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';

function TransitionUp(props) {
    return <Slide {...props} direction="up" />;
}

function Armor() {
    const charDetails = useSelector(store => store.characterDetail)
    const charStatus = useSelector(store => store.characterStatus)
    const charArmor = useSelector(store => store.characterGear.armor)
    const charShield = useSelector(store => store.characterGear.shield)

    const dispatch = useDispatch();
    const unhurtMarker = <CircleOutlinedIcon />;
    const aggMarker = <AcUnitIcon />;
    const bodyMarker = <CheckBoxOutlineBlankOutlinedIcon />;

    const [showSnackbar, setShowSnackbar] = React.useState(false);
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    // Builds armor total from various sources
    const armorBuilder = () => {
        const charTotalArmor = charArmor.quality + charShield.quality + charStatus.current_cyberware_armor_quality
        let armorBoxes = []
        let armorArray = armorDamageBuilder(charStatus.current_cyberware_armor_loss + charArmor.this_armor_loss + charShield.this_shield_loss, charTotalArmor)
        for (let i = 0; i < charDetails.body + charDetails.cyber_body; i++) {
            armorBoxes.push(
                <React.Fragment key={i + 100}>
                    <Grid item xs={2.4}><Item>{bodyMarker}</Item></Grid>
                </React.Fragment>
            )
        }
        for (let i = 0; i < charTotalArmor; i++) {
            armorBoxes.push(
                <React.Fragment key={i}>
                    <Grid item xs={2.4}><Item>{armorArray[i]}</Item></Grid>
                </React.Fragment>
            )
        }
        return armorBoxes
    }

    // builds array of damaged / undamaged armor
    const armorDamageBuilder = (ablated, armorTotal) => {
        let armorArray = []
        for (let i = 0; i < armorTotal - ablated; i++) {
            armorArray.push(unhurtMarker)
        }
        for (let i = 0; i < ablated; i++) {
            armorArray.push(aggMarker)
        }
        return armorArray
    }

    const ablateOneArmor = () => {
        // take total armor, and add +1 damage to appropriate source - shield, then armor, then cyberware.
        const charShieldQuality = charShield.quality
        const charShieldLoss = charShield.this_shield_loss
        const charArmorQuality = charArmor.quality
        const charArmorLoss = charArmor.this_armor_loss
        const charCyberArmorQuality = charStatus.current_cyberware_armor_quality
        const charCyberArmorLoss = charStatus.current_cyberware_armor_loss

        if (charShieldLoss < charShieldQuality) {
            dispatch({ type: "CHARACTER_LOSE_ONE_SHIELD_QUALITY" })
        } else if (charArmorLoss < charArmorQuality) {
            dispatch({ type: "CHARACTER_LOSE_ONE_ARMOR_QUALITY" })
        } else if (charCyberArmorLoss < charCyberArmorQuality) {
            dispatch({ type: "CHARACTER_LOSE_ONE_CYBERARMOR_QUALITY" })
        } else {
            setShowSnackbar(true)
        }
    }
    return (
        <>
            <Snackbar
                TransitionComponent={TransitionUp}
                autoHideDuration={2000}
                open={showSnackbar}
                onClose={() => setShowSnackbar(false)}
                anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
            >
                <Alert onClose={() => setShowSnackbar(false)} severity="warning" sx={{ width: '100%' }}>
                    No Armor Remaining!
                </Alert>
            </Snackbar >

            {charArmor && charShield && charStatus ? (
                <>
                    <Item><OtherAttributesDialog prop={'Armor'} /></Item>
                    <Item><Button fullWidth onClick={() => ablateOneArmor()}>Ablate One Armor</Button></Item>
                    <Grid container>
                        {armorBuilder()}
                    </Grid>
                </>
            ) : <></>}
        </>
    )
}

export default Armor;