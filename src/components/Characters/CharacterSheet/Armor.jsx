import React from 'react';
import Grid from '@mui/material/Grid';
import { useSelector, useDispatch } from 'react-redux';
import Item from './Item';
import { Button } from '@mui/material';
import OtherAttributesDialog from '../../Modals/OtherAttributesDialog';

import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import CheckBoxOutlineBlankOutlinedIcon from '@mui/icons-material/CheckBoxOutlineBlankOutlined';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';

function TransitionUp(props) {
  return <Slide {...props} direction="up" />;
}

function Armor() {
  const charDetails = useSelector((store) => store.characterDetail);
  const charStatus = useSelector((store) => store.characterStatus);
  const charArmor = useSelector((store) => store.characterGear.armor);
  const charShield = useSelector((store) => store.characterGear.shield);

  const dispatch = useDispatch();
  const unhurtMarker = <CircleOutlinedIcon />;
  const aggMarker = <AcUnitIcon />;
  const bodyMarker = <CheckBoxOutlineBlankOutlinedIcon />;

  const [showSnackbar, setShowSnackbar] = React.useState(false);
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const charTotalArmor =
    (charArmor === undefined ? 0 : charArmor.quality) +
    (charShield === undefined ? 0 : charShield.quality) +
    charStatus.current_cyberware_armor_quality;

  const loadStatus = useSelector((store) => store.loaders.inPlaySheet);

  // Builds armor total from various sources. If no armor/shield worn, default to 0.
  const armorBuilder = () => {
    let armorBoxes = [];
    let armorArray = armorDamageBuilder(
      charStatus.current_cyberware_armor_loss +
        (charArmor === undefined ? 0 : charArmor.this_armor_loss) +
        (charShield === undefined ? 0 : charShield.this_shield_loss),
      charTotalArmor
    );
    for (let i = 0; i < charDetails.body + charDetails.cyber_body; i++) {
      armorBoxes.push(
        <React.Fragment key={i + 100}>
          <Grid item xs={2.4}>
            <Item>{bodyMarker}</Item>
          </Grid>
        </React.Fragment>
      );
    }
    for (let i = 0; i < charTotalArmor; i++) {
      armorBoxes.push(
        <React.Fragment key={i}>
          <Grid item xs={2.4}>
            <Item>{armorArray[i]}</Item>
          </Grid>
        </React.Fragment>
      );
    }
    return armorBoxes;
  };

  // builds array of damaged / undamaged armor
  const armorDamageBuilder = (ablated, armorTotal) => {
    let armorArray = [];
    for (let i = 0; i < armorTotal - ablated; i++) {
      armorArray.push(unhurtMarker);
    }
    for (let i = 0; i < ablated; i++) {
      armorArray.push(aggMarker);
    }
    return armorArray;
  };

  const charShieldQuality = charShield === undefined ? 0 : charShield.quality;
  const charShieldLoss =
    charShield === undefined ? 0 : charShield.this_shield_loss;
  const charArmorQuality = charArmor === undefined ? 0 : charArmor.quality;
  const charArmorLoss = charArmor === undefined ? 0 : charArmor.this_armor_loss;
  const charCyberArmorQuality = charStatus.current_cyberware_armor_quality;
  const charCyberArmorLoss = charStatus.current_cyberware_armor_loss;

  const ablateOneArmor = () => {
    // take total armor, and add +1 damage to appropriate source - shield, then armor, then cyberware.

    if (charShieldLoss < charShieldQuality) {
      dispatch({
        type: 'CHANGE_CHARACTER_ARMOR_STATUS',
        payload: {
          armorType: 'shield',
          charID: charDetails.id,
          newLoss: charShieldLoss + 1,
          shield_bridge_id: charShield.shield_bridge_id,
        },
      });
      dispatch({ type: 'SET_CHARSHEET_LOAD_STATUS', payload: true });
    } else if (charArmorLoss < charArmorQuality) {
      dispatch({
        type: 'CHANGE_CHARACTER_ARMOR_STATUS',
        payload: {
          armorType: 'armor',
          charID: charDetails.id,
          newLoss: charArmorLoss + 1,
          armor_bridge_id: charArmor.armor_bridge_id,
        },
      });
      dispatch({ type: 'SET_CHARSHEET_LOAD_STATUS', payload: true });
    } else if (charCyberArmorLoss < charCyberArmorQuality) {
      dispatch({
        type: 'CHANGE_CHARACTER_ARMOR_STATUS',
        payload: {
          armorType: 'cyberArmor',
          charID: charDetails.id,
          newLoss: charCyberArmorLoss + 1,
          char_status_id: charStatus.char_status_id,
        },
      });
      dispatch({ type: 'SET_CHARSHEET_LOAD_STATUS', payload: true });
    } else {
      setShowSnackbar(true);
    }
  };

  const recoverOneArmor = () => {
    // as ablate, but in reverse - heals shield, then armor, then cyberware.
    if (charShieldLoss > 0) {
      dispatch({
        type: 'CHANGE_CHARACTER_ARMOR_STATUS',
        payload: {
          armorType: 'shield',
          charID: charDetails.id,
          newLoss: charShieldLoss - 1,
          shield_bridge_id: charShield.shield_bridge_id,
        },
      });
      dispatch({ type: 'SET_CHARSHEET_LOAD_STATUS', payload: true });
    } else if (charArmorLoss > 0) {
      dispatch({
        type: 'CHANGE_CHARACTER_ARMOR_STATUS',
        payload: {
          armorType: 'armor',
          charID: charDetails.id,
          newLoss: charArmorLoss - 1,
          armor_bridge_id: charArmor.armor_bridge_id,
        },
      });
      dispatch({ type: 'SET_CHARSHEET_LOAD_STATUS', payload: true });
    } else if (charCyberArmorLoss > 0) {
      dispatch({
        type: 'CHANGE_CHARACTER_ARMOR_STATUS',
        payload: {
          armorType: 'cyberArmor',
          charID: charDetails.id,
          newLoss: charCyberArmorLoss - 1,
          char_status_id: charStatus.char_status_id,
        },
      });
      dispatch({ type: 'SET_CHARSHEET_LOAD_STATUS', payload: true });
    } else {
      console.log(`No armor to fix!`);
    }
  };

  const damageReduction = Math.floor(
    (charDetails.body +
      charDetails.cyber_body +
      (charArmorQuality - charArmorLoss) +
      (charShieldQuality - charShieldLoss) +
      (charCyberArmorQuality - charCyberArmorLoss)) /
      2
  );

  return (
    <>
      <Snackbar
        TransitionComponent={TransitionUp}
        autoHideDuration={2000}
        open={showSnackbar}
        onClose={() => setShowSnackbar(false)}
        anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
      >
        <Alert
          onClose={() => setShowSnackbar(false)}
          severity="warning"
          sx={{ width: '100%' }}
        >
          No Armor Remaining!
        </Alert>
      </Snackbar>

      <>
        <Item>
          <OtherAttributesDialog prop={'Armor'} />
        </Item>
        <Grid container>
          <Grid item xs={6}>
            <Item>
              <Button
                color="secondary"
                variant={loadStatus === false ? 'contained' : 'disabled'}
                fullWidth
                sx={{
                  lineHeight: 1,
                  height: '125%',
                  fontSize: { xs: '0.6em', md: '0.9em' },
                }}
                onClick={() => ablateOneArmor()}
              >
                Ablate Armor
              </Button>
            </Item>
          </Grid>
          <Grid item xs={6}>
            <Item>
              <Button
                variant={loadStatus === false ? 'contained' : 'disabled'}
                fullWidth
                sx={{
                  lineHeight: 1,
                  height: '125%',
                  fontSize: { xs: '0.6em', md: '0.9em' },
                }}
                onClick={() => recoverOneArmor()}
              >
                Recover Armor
              </Button>
            </Item>
          </Grid>
          <Grid item xs={12}>
            <Item
              sx={{
                color: 'white',
                fontWeight: 800,
                fontSize: { xs: '0.7em', md: '0.9em' },
              }}
            >
              Total Damage Reduction: {damageReduction}
            </Item>
          </Grid>
        </Grid>

        <Grid container>{armorBuilder()}</Grid>

        {charTotalArmor + charDetails.body + charDetails.cyber_body <= 5 ? (
          <>
            <Grid item xs={12}>
              <Item sx={{ opacity: 0 }}></Item>
            </Grid>
            <Grid item xs={12}>
              <Item sx={{ opacity: 0 }}></Item>
            </Grid>
            <Grid item xs={12}>
              <Item sx={{ opacity: 0 }}></Item>
            </Grid>
            <Grid item xs={12}>
              <Item sx={{ opacity: 0 }}></Item>
            </Grid>
          </>
        ) : (
          <></>
        )}

        {charTotalArmor + charDetails.body + charDetails.cyber_body >= 6 &&
        charTotalArmor + charDetails.body + charDetails.cyber_body < 11 ? (
          <>
            <Grid item xs={12}>
              <Item sx={{ opacity: 0 }}></Item>
            </Grid>
            <Grid item xs={12}>
              <Item sx={{ opacity: 0 }}></Item>
            </Grid>
            <Grid item xs={12}>
              <Item sx={{ opacity: 0 }}></Item>
            </Grid>
          </>
        ) : (
          <></>
        )}

        {charTotalArmor + charDetails.body + charDetails.cyber_body >= 11 &&
        charTotalArmor + charDetails.body + charDetails.cyber_body <= 15 ? (
          <>
            <Grid item xs={12}>
              <Item sx={{ opacity: 0 }}></Item>
            </Grid>
            <Grid item xs={12}>
              <Item sx={{ opacity: 0 }}></Item>
            </Grid>
          </>
        ) : (
          <></>
        )}

        {charTotalArmor + charDetails.body + charDetails.cyber_body >= 16 &&
        charTotalArmor + charDetails.body + charDetails.cyber_body <= 20 ? (
          <>
            <Grid item xs={12}>
              <Item sx={{ opacity: 0 }}></Item>
            </Grid>
          </>
        ) : (
          <></>
        )}
      </>
    </>
  );
}

export default Armor;
