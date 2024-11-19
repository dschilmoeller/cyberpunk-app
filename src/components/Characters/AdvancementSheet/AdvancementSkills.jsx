import React from 'react';
import { Grid, Button } from '@mui/material';
import Item from '../CharacterSheet/Item';

import SkillsDialog from '../../Modals/SkillsDialog';
import { SkillSet } from '../../../utils/objects/objects.utils';
import { dotReturn } from '../../../utils/funcs/funcs';
import { updateCharacterStat } from './advancement.services';

export default function AdvancementSkills({ advancementDetails, setAdvancementDetails, loading, setLoading, setPageAlert, chuckError }) {
  const skillExpReturn = (skill) => {
    let newCost = (skill + 1) * 2;
    return `${newCost} XP`;
  };

  const skillSpendExp = async (skillScore, skillName) => {
    setLoading(true);
    const availableExp = advancementDetails.max_xp - advancementDetails.spent_xp;
    const requiredExp = (Number(skillScore) + 1) * 2;

    if (requiredExp <= availableExp && advancementDetails[skillName] + 1 <= 5) {
      const statObj = {
        charID: advancementDetails.id,
        newRank: advancementDetails[skillName] + 1,
        statName: skillName,
        newSpentXP: advancementDetails.spent_xp + (advancementDetails[skillName] + 1) * 2,
      };
      try {
        let result = await updateCharacterStat(statObj);
        if (result === 'OK') {
          setPageAlert({ open: true, message: 'You have improved!', severity: 'success' });
          setAdvancementDetails({
            ...advancementDetails,
            [skillName]: advancementDetails[skillName] + 1,
            spent_xp: advancementDetails.spent_xp + (advancementDetails[skillName] + 1) * 2,
          });
        }
      } catch (error) {
        console.error('Error increasing skill rank:', error);
      }
    } else if (requiredExp > availableExp) {
      setPageAlert({ open: true, message: 'Insufficient XP', severity: 'error' });
    } else {
      chuckError();
    }
    setLoading(false);
  };

  return (
    <>
      <Grid container>
        {loading === false ? (
          <>
            <Grid item xs={4}>
              <Grid container>
                {SkillSet.streets.map((skill, i) => {
                  return (
                    <React.Fragment key={i}>
                      <Grid item xs={3}>
                        <Item>
                          <SkillsDialog prop={skill[1]}></SkillsDialog>
                        </Item>
                      </Grid>
                      <Grid item xs={5}>
                        <Item>{dotReturn(advancementDetails[skill[0]], 5)}</Item>
                      </Grid>
                      <Grid item xs={4}>
                        {advancementDetails[skill[0]] < 5 ? (
                          <Item>
                            <Button
                              disabled={loading}
                              onClick={() => skillSpendExp(advancementDetails[skill[0]], skill[0])}
                              variant="contained"
                              fullWidth
                              sx={{ justifyContent: 'flex-end' }}
                            >
                              {(advancementDetails[skill[0]] + 1) * 2} XP
                            </Button>
                          </Item>
                        ) : (
                          <Item>Maxed</Item>
                        )}
                      </Grid>
                    </React.Fragment>
                  );
                })}
              </Grid>
            </Grid>

            <Grid item xs={4}>
              <Grid container>
                {SkillSet.tekhne.map((skill, i) => {
                  return (
                    <React.Fragment key={i}>
                      <Grid item xs={3}>
                        <Item>
                          <SkillsDialog prop={skill[1]}></SkillsDialog>
                        </Item>
                      </Grid>
                      <Grid item xs={5}>
                        <Item>{dotReturn(advancementDetails[skill[0]], 5)}</Item>
                      </Grid>
                      <Grid item xs={4}>
                        {advancementDetails[skill[0]] < 5 ? (
                          <Item>
                            <Button
                              disabled={loading}
                              onClick={() => skillSpendExp(advancementDetails[skill[0]], skill[0])}
                              variant="contained"
                              fullWidth
                              sx={{ justifyContent: 'flex-end' }}
                            >
                              {(advancementDetails[skill[0]] + 1) * 2} XP
                            </Button>
                          </Item>
                        ) : (
                          <Item>Maxed</Item>
                        )}
                      </Grid>
                    </React.Fragment>
                  );
                })}
              </Grid>
            </Grid>

            <Grid item xs={4}>
              <Grid container>
                {SkillSet.knowledge.map((skill, i) => {
                  return (
                    <React.Fragment key={i}>
                      <Grid item xs={3}>
                        <Item>
                          <SkillsDialog prop={skill[1]}></SkillsDialog>
                        </Item>
                      </Grid>
                      <Grid item xs={5}>
                        <Item>{dotReturn(advancementDetails[skill[0]], 5)}</Item>
                      </Grid>
                      <Grid item xs={4}>
                        {advancementDetails[skill[0]] < 5 ? (
                          <Item>
                            <Button
                              disabled={loading}
                              onClick={() => skillSpendExp(advancementDetails[skill[0]], skill[0])}
                              variant="contained"
                              fullWidth
                              sx={{ justifyContent: 'flex-end' }}
                            >
                              {(advancementDetails[skill[0]] + 1) * 2} XP
                            </Button>
                          </Item>
                        ) : (
                          <Item>Maxed</Item>
                        )}
                      </Grid>
                    </React.Fragment>
                  );
                })}
              </Grid>
            </Grid>

            {advancementDetails.is_paramedical ? (
              <>
                <Grid item xs={3}>
                  <Item>
                    <SkillsDialog prop={'Paramedic'}></SkillsDialog>
                  </Item>
                </Grid>
                <Grid item xs={5}>
                  <Item>{dotReturn(advancementDetails.paramed, 5)}</Item>
                </Grid>
                <Grid item xs={4}>
                  {advancementDetails.paramed < 5 ? (
                    <Item
                      sx={{
                        cursor: 'pointer',
                        '&:hover': {
                          backgroundColor: '#fff',
                          color: '#000',
                        },
                      }}
                      onClick={() => skillSpendExp(advancementDetails.paramed, 'paramed')}
                    >
                      Increase: {skillExpReturn(advancementDetails.paramed)}
                    </Item>
                  ) : (
                    <Item>Maxed</Item>
                  )}
                </Grid>
              </>
            ) : (
              <>
                <Grid item xs={3}>
                  <Item>
                    <SkillsDialog prop={'First Aid'}></SkillsDialog>
                  </Item>
                </Grid>
                <Grid item xs={5}>
                  <Item>{dotReturn(advancementDetails.first_aid, 5)}</Item>
                </Grid>
                <Grid item xs={4}>
                  {advancementDetails.first_aid < 5 ? (
                    <Item
                      sx={{
                        cursor: 'pointer',
                        '&:hover': {
                          backgroundColor: '#fff',
                          color: '#000',
                        },
                      }}
                      onClick={() => skillSpendExp(advancementDetails.first_aid, 'first_aid')}
                    >
                      Increase: {skillExpReturn(advancementDetails.first_aid)}
                    </Item>
                  ) : (
                    <Item>Maxed</Item>
                  )}
                </Grid>
              </>
            )}
          </>
        ) : (
          <>
            <Grid item xs={12}>
              <Item>Loading...</Item>
            </Grid>
          </>
        )}
      </Grid>
    </>
  );
}
