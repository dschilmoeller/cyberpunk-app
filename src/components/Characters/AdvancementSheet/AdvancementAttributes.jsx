import React from 'react';
import { Grid, Button } from '@mui/material/';
import Item from '../CharacterSheet/Item';

import AttributesDialog from '../../Modals/AttributesDialog';

import { AttributesArr } from '../../../utils/objects/objects.utils';
import { capitalizer, dotReturn } from '../../../utils/funcs/funcs';
import { updateCharacterStat } from '../../../services/advancement.services';

export default function AdvancementAttributes({ advancementDetails, setAdvancementDetails, loading, setLoading, setPageAlert }) {
  const increaseStat = async (attribute, maxRank) => {
    setLoading(true);
    const availableExp = advancementDetails.max_xp - advancementDetails.spent_xp;
    const requiredExp = (advancementDetails[attribute] + 1) * 5;

    if (requiredExp <= availableExp && advancementDetails[attribute] + 1 <= maxRank) {
      const statObj = {
        charID: advancementDetails.id,
        newRank: advancementDetails[attribute] + 1,
        statName: attribute,
        newSpentXP: advancementDetails.spent_xp + requiredExp,
      };
      try {
        let result = await updateCharacterStat(statObj);
        if (result === 'OK') {
          setPageAlert({ open: true, message: 'You have improved!', severity: 'success' });
          setAdvancementDetails({
            ...advancementDetails,
            [attribute]: advancementDetails[attribute] + 1,
            spent_xp: advancementDetails.spent_xp + (advancementDetails[attribute] + 1) * 2,
          });
        }
      } catch (error) {
        setPageAlert({ open: true, message: 'Something is awry', severity: 'info' });
      }
    } else if (advancementDetails[attribute] + 1 > maxRank) {
      setPageAlert({ open: true, message: 'Maybe try some cyberware?', severity: 'error' });
    } else {
      setPageAlert({ open: true, message: 'Insufficient XP', severity: 'error' });
    }
    setLoading(false);
  };

  return (
    <Grid container>
      {AttributesArr.map((att, i) => {
        if (att[0] != 'street cred' && att[0] != 'luck') {
          return (
            <React.Fragment key={i}>
              {i === 0 || i === 3 || i === 6 ? (
                <Grid item xs={12}>
                  <Item>
                    <h2>{i === 0 ? 'Physical' : i === 3 ? 'Social' : 'Mental'}</h2>
                  </Item>
                </Grid>
              ) : (
                <></>
              )}
              <Grid item xs={4}>
                <Item>
                  <AttributesDialog prop={capitalizer(att[0])} />
                </Item>
              </Grid>
              <Grid item xs={4}>
                <Item>{dotReturn(advancementDetails[att[0]], att[1])}</Item>
              </Grid>
              <Grid item xs={4}>
                <Item>
                  <Button disabled={loading} variant="contained" fullWidth onClick={() => increaseStat(att[0], att[1])}>
                    Increase Cost: {(advancementDetails[att[0]] + 1) * 5} XP
                  </Button>
                </Item>
              </Grid>
            </React.Fragment>
          );
        }
      })}
    </Grid>
  );
}
