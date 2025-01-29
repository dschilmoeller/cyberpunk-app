import React from 'react';
import { Grid, Button } from '@mui/material/';
import Item from '../CharacterSheet/Item';

import { dotReturn, humanityDotReturnGrid } from '../../../utils/funcs/funcs';
import { updateCharacterStat } from '../../../services/advancement.services';

import OtherAttributesDialog from '../../Modals/OtherAttributesDialog';

export default function AdvancementOther({ advancementDetails, setAdvancementDetails, loading, setLoading, setPageAlert, chuckError }) {
  const addLuck = async () => {
    setLoading(true);
    if (advancementDetails.max_xp - advancementDetails.spent_xp >= (advancementDetails.max_luck + 1) * 2) {
      try {
        let luckObj = {
          charID: advancementDetails.id,
          newRank: advancementDetails.max_luck + 1,
          statName: 'max_luck',
          newSpentXP: advancementDetails.spent_xp + (advancementDetails.max_luck + 1) * 2,
        };
        let result = await updateCharacterStat(luckObj);
        if (result === 'OK') {
          setAdvancementDetails({
            ...advancementDetails,
            max_luck: advancementDetails.max_luck + 1,
            spent_xp: advancementDetails.spent_xp + (advancementDetails.max_luck + 1) * 2,
          });
          setPageAlert({ open: true, message: 'You have improved!', severity: 'success' });
        } else {
          chuckError();
        }
      } catch (error) {
        console.error('Error updating luck:', error);
        chuckError();
      }
    } else {
      chuckError();
    }
    setLoading(false);
  };

  const restoreTemporaryHumanity = async () => {
    setLoading(true);
    if (advancementDetails.max_xp - advancementDetails.spent_xp >= 1 && advancementDetails.temp_humanity_loss > 0) {
      try {
        let humObj = {
          charID: advancementDetails.id,
          newRank: advancementDetails.temp_humanity_loss - 1,
          statName: 'temp_humanity_loss',
          newSpentXP: advancementDetails.spent_xp + 1,
        };
        let result = await updateCharacterStat(humObj);
        if (result === 'OK') {
          setPageAlert({ open: true, message: 'You have improved!', severity: 'success' });
          setAdvancementDetails({
            ...advancementDetails,
            temp_humanity_loss: advancementDetails.temp_humanity_loss - 1,
            spent_xp: advancementDetails.spent_xp + 1,
          });
        } else {
          chuckError();
        }
      } catch (error) {
        console.error('Error updating temp humanity loss:', error);
        chuckError();
      }
    } else if (advancementDetails.max_xp - advancementDetails.spent_xp >= 1) {
      setPageAlert({ open: true, message: 'Insufficient XP!', severity: 'error' });
    } else if (advancementDetails.temp_humanity_loss > 0) {
      setPageAlert({ open: true, message: 'Nothing temporary left - try removing some cyberware?', severity: 'error' });
    } else {
      chuckError(); // should cover all bases, so something is off if this ever fires.
    }
    setLoading(false);
  };

  return (
    <>
      <Grid container>
        <>
          <Grid container spacing={2} marginTop={2}>
            <Grid item xs={4}>
              <Item>
                <OtherAttributesDialog prop={'Luck'} />
              </Item>
            </Grid>
            <Grid item xs={4}>
              <Item>{dotReturn(advancementDetails.max_luck, 10)}</Item>
            </Grid>
            <Grid item xs={4}>
              {advancementDetails.max_luck < 10 ? (
                <Item sx={{ cursor: 'pointer' }} onClick={() => addLuck()}>
                  <Button variant="contained" disabled={loading} onClick={() => restoreTemporaryHumanity()}>
                    Increase Maximum Luck: {(advancementDetails.max_luck + 1) * 2} XP
                  </Button>
                </Item>
              ) : (
                <Item>Maximum Luck Achieved!</Item>
              )}
            </Grid>

            <Grid item xs={4}>
              <Item>
                <OtherAttributesDialog prop={'Humanity'} />
              </Item>
            </Grid>
            <Grid item xs={8}>
              {advancementDetails.temp_humanity_loss > 0 ? (
                <Item sx={{ cursor: 'pointer' }}>
                  <Button variant="contained" disabled={loading} onClick={() => restoreTemporaryHumanity()}>
                    Restore Temporary Humanity: 1 XP
                  </Button>
                </Item>
              ) : (
                <></>
              )}
              {advancementDetails.temp_humanity_loss === 0 ? <Item>Remove Cyberware to restore additional humanity</Item> : <></>}
              {advancementDetails.perm_humanity_loss === 0 && advancementDetails.temp_humanity_loss === 0 ? (
                <Item>Maximum Humanity reached</Item>
              ) : (
                <></>
              )}
            </Grid>
            <Grid container marginTop={2}>
              {humanityDotReturnGrid(advancementDetails.temp_humanity_loss, advancementDetails.perm_humanity_loss)}
              {/* {humanityArrayBuilder(advancementDetails.temp_humanity_loss, advancementDetails.perm_humanity_loss)} */}
            </Grid>
          </Grid>
        </>
      </Grid>
    </>
  );
}
