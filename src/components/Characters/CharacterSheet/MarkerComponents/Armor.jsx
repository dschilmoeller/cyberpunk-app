import React, { useEffect, useState } from 'react';
import { Button, Grid } from '@mui/material';
import Item from '../Item';
import OtherAttributesDialog from '../../../Modals/OtherAttributesDialog';

import { fetchInPlayArmorRequest, inPlayArmorChangeRequest, inPlayStatusChangeRequest } from '../character.services';

import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import CheckBoxOutlineBlankOutlinedIcon from '@mui/icons-material/CheckBoxOutlineBlankOutlined';
import GpsFixedOutlinedIcon from '@mui/icons-material/GpsFixedOutlined';
import GpsNotFixedOutlinedIcon from '@mui/icons-material/GpsNotFixedOutlined';
import PanoramaVerticalOutlinedIcon from '@mui/icons-material/PanoramaVerticalOutlined';
import PanoramaVerticalSelectOutlinedIcon from '@mui/icons-material/PanoramaVerticalSelectOutlined';
// TODO
// refine spacer thing at bottom (4/3/2/1 spaces.)
function Armor({ charDetail, charStatus, setCharStatus, loading, setLoading, chuckError, setPageAlert }) {
  const unhurtMarker = <CircleOutlinedIcon />;
  const aggMarker = <AcUnitIcon />;
  const bodyMarker = <CheckBoxOutlineBlankOutlinedIcon />;
  const cyberMarkerFilled = <GpsFixedOutlinedIcon />;
  const cyberMarker = <GpsNotFixedOutlinedIcon />;
  const shieldMarker = <PanoramaVerticalOutlinedIcon />;
  const shieldMarkerFilled = <PanoramaVerticalSelectOutlinedIcon />;

  const [charArmorList, setCharArmorList] = useState([]);
  const [charTotalArmor, setCharTotalArmor] = useState(0);
  const [charShield, setCharShield] = useState({ armor_bridge_id: 0, quality: 0, this_armor_loss: 0 });
  const [charArmor, setCharArmor] = useState({ armor_bridge_id: 0, quality: 0, this_armor_loss: 0 });

  const fetchInPlayArmor = async () => {
    setLoading(true);
    try {
      let armorTotal = 0;
      const charObj = {
        charID: charDetail.id,
      };
      let result = await fetchInPlayArmorRequest(charObj);
      if (result) {
        setCharArmorList(result);
        result.map((armor) => {
          if (armor.is_shield === true) {
            setCharShield(armor);
            armorTotal += armor.quality;
          } else {
            setCharArmor(armor);
            armorTotal += armor.quality;
          }
          setCharTotalArmor(armorTotal + charStatus.current_cyberware_armor_quality);
        });
      } else {
        chuckError();
      }
    } catch (error) {
      console.error('Error fetching in play armor:', error);
      chuckError();
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchInPlayArmor();
  }, []);

  // Builds armor html from various sources. If no armor/shield worn, default to 0.
  const armorBuilderTwo = () => {
    let armorBoxes = [];
    let keyMaker = 0;
    for (let i = 0; i < charDetail.body + charDetail.cyber_body; i++) {
      keyMaker++;
      // Create body-based armor boxes
      armorBoxes.push(
        <React.Fragment key={keyMaker}>
          <Grid item xs={2.4}>
            <Item>{bodyMarker}</Item>
          </Grid>
        </React.Fragment>
      );
    }
    // create current armor.
    // cyberware armor
    for (let i = 0; i < charStatus.current_cyberware_armor_quality - charStatus.current_cyberware_armor_loss; i++) {
      keyMaker++;
      armorBoxes.push(
        <React.Fragment key={keyMaker}>
          <Grid item xs={2.4}>
            <Item>{cyberMarker}</Item>
          </Grid>
        </React.Fragment>
      );
    }
    for (let j = 0; j < charStatus.current_cyberware_armor_loss; j++) {
      keyMaker++;
      armorBoxes.push(
        <React.Fragment key={keyMaker}>
          <Grid item xs={2.4}>
            <Item>{cyberMarkerFilled}</Item>
          </Grid>
        </React.Fragment>
      );
    }
    // worn armor & shield
    charArmorList.map((armor) => {
      for (let i = 0; i < armor.quality - armor.this_armor_loss; i++) {
        keyMaker++;
        armorBoxes.push(
          <React.Fragment key={keyMaker}>
            <Grid item xs={2.4}>
              <Item>{armor.is_shield ? shieldMarker : unhurtMarker}</Item>
            </Grid>
          </React.Fragment>
        );
      }
      for (let j = 0; j < armor.this_armor_loss; j++) {
        keyMaker++;
        armorBoxes.push(
          <React.Fragment key={keyMaker}>
            <Grid item xs={2.4}>
              <Item>{armor.is_shield ? shieldMarkerFilled : aggMarker}</Item>
            </Grid>
          </React.Fragment>
        );
      }
    });
    return armorBoxes;
  };

  const ablateOneArmor = async () => {
    setLoading(true);
    if (charShield.this_armor_loss + 1 <= charShield.quality) {
      try {
        let result = await inPlayArmorChangeRequest({ ...charShield, this_armor_loss: charShield.this_armor_loss + 1 });
        if (result === 'OK') {
          fetchInPlayArmor();
        } else {
          chuckError();
        }
      } catch (error) {
        console.error('Error changing character armor:', error);
        chuckError();
      }
    } else if (charArmor.this_armor_loss + 1 <= charArmor.quality) {
      try {
        let result = await inPlayArmorChangeRequest({ ...charArmor, this_armor_loss: charArmor.this_armor_loss + 1 });
        if (result === 'OK') {
          fetchInPlayArmor();
        } else {
          chuckError();
        }
      } catch (error) {
        console.error('Error changing character armor:', error);
        chuckError();
      }
    } else if (charStatus.current_cyberware_armor_loss + 1 <= charStatus.current_cyberware_armor_quality) {
      try {
        let result = await inPlayStatusChangeRequest({
          ...charStatus,
          current_cyberware_armor_loss: charStatus.current_cyberware_armor_loss + 1,
          charID: charDetail.id,
        });

        if (result === 'OK') {
          fetchInPlayArmor();
          setCharStatus({
            ...charStatus,
            current_cyberware_armor_loss: charStatus.current_cyberware_armor_loss + 1,
          });
        } else {
          chuckError();
        }
      } catch (error) {
        console.error('Error changing character cyberarmor:', error);
        chuckError();
      }
    } else {
      setPageAlert({
        open: true,
        message: 'No armor to lose!',
        severity: 'error',
      });
    }
    setLoading(false);
  };

  const recoverOneArmor = async () => {
    setLoading(true);
    if (charStatus.current_cyberware_armor_loss - 1 >= 0) {
      try {
        let result = await inPlayStatusChangeRequest({
          ...charStatus,
          current_cyberware_armor_loss: charStatus.current_cyberware_armor_loss - 1,
          charID: charDetail.id,
        });

        if (result === 'OK') {
          fetchInPlayArmor();
          setCharStatus({
            ...charStatus,
            current_cyberware_armor_loss: charStatus.current_cyberware_armor_loss - 1,
          });
        } else {
          chuckError();
        }
      } catch (error) {
        console.error('Error changing character cyberarmor:', error);
        chuckError();
      }
    } else if (charArmor.this_armor_loss - 1 >= 0) {
      try {
        let result = await inPlayArmorChangeRequest({ ...charArmor, this_armor_loss: charArmor.this_armor_loss - 1 });
        if (result === 'OK') {
          fetchInPlayArmor();
        } else {
          chuckError();
        }
      } catch (error) {
        console.error('Error changing character armor:', error);
        chuckError();
      }
    } else if (charShield.this_armor_loss - 1 >= 0) {
      try {
        let result = await inPlayArmorChangeRequest({ ...charShield, this_armor_loss: charShield.this_armor_loss - 1 });
        if (result === 'OK') {
          fetchInPlayArmor();
        } else {
          chuckError();
        }
      } catch (error) {
        console.error('Error changing character armor:', error);
        chuckError();
      }
    } else {
      setPageAlert({
        open: true,
        message: 'Armor is fully recovered!',
        severity: 'error',
      });
    }
    setLoading(false);
  };

  const damageReduction = Math.floor(
    (charDetail.body +
      charDetail.cyber_body +
      charArmorList
        .map((armor) => {
          return armor.quality - armor.this_armor_loss;
        })
        .reduce((acc, e) => acc + e, 0) +
      (charStatus.current_cyberware_armor_quality - charStatus.current_cyberware_armor_loss)) /
      2
  );

  const spacer = (spaces) => {
    let spacers = [];
    for (let i = 0; i < spaces; i++) {
      spacers.push(
        <React.Fragment key={i}>
          <Grid item xs={12}>
            <Item sx={{ opacity: 0 }}></Item>
          </Grid>
        </React.Fragment>
      );
    }
    return spacers;
  };

  return (
    <>
      <>
        <Item>
          <OtherAttributesDialog prop={'Armor'} />
        </Item>
        <Grid container>
          <Grid item xs={6}>
            <Item>
              <Button
                color="secondary"
                disabled={loading}
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
                disabled={loading}
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

        <Grid container>{armorBuilderTwo()}</Grid>

        {charTotalArmor + charDetail.body + charDetail.cyber_body <= 5 ? spacer(1) : <></>}
        {charTotalArmor + charDetail.body + charDetail.cyber_body <= 10 ? spacer(1) : <></>}
        {charTotalArmor + charDetail.body + charDetail.cyber_body <= 15 ? spacer(1) : <></>}
        {charTotalArmor + charDetail.body + charDetail.cyber_body <= 20 ? spacer(1) : <></>}
      </>
    </>
  );
}

export default Armor;
