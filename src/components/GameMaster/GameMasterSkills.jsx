import React from 'react';
import { Button, Grid } from '@mui/material';

import Item from '../Characters/CharacterSheet/Item';
import SkillsDialog from '../Modals/SkillsDialog';

import { dotReturn } from '../../utils/funcs/funcs';
import { SkillSet } from '../../utils/objects/objects.utils';
import { changeCharacterSkill } from '../../services/gm.services';

export default function GameMasterSkills({ charDetail, setCharDetail, setPageAlert, loading, setLoading, chuckError }) {
  const changeSkill = async (skillName, change) => {
    setLoading(true);
    const skillObj = {
      charID: charDetail.id,
      skillName,
      newRank: charDetail[skillName] + change,
    };

    if ((change > 0 && charDetail[skillName] + change <= 5) || (change < 0 && charDetail[skillName] + change >= 0)) {
      try {
        let result = await changeCharacterSkill(skillObj);
        if (result === 'OK') {
          setCharDetail({
            ...charDetail,
            [skillName]: charDetail[skillName] + change,
          });
        } else {
          setPageAlert({
            open: true,
            message: 'Task Failed Successfully',
            severity: 'error',
          });
        }
      } catch (error) {
        chuckError();
        console.error('Error changing skill rank:', error);
      }
    } else {
      chuckError();
    }
    setLoading(false);
  };

  const changeIsParamed = async (change) => {
    setLoading(true);
    const paraObj = {
      charID: charDetail.id,
      skillName: 'is_paramedical',
      newRank: change,
    };
    try {
      let result = await changeCharacterSkill(paraObj);
      if (result === 'OK') {
        setCharDetail({
          ...charDetail,
          is_paramedical: change,
        });
      } else {
        setPageAlert({
          open: true,
          message: 'Task Failed Successfully',
          severity: 'error',
        });
      }
    } catch (error) {
      chuckError();
      console.error('Error changing skill rank:', error);
    }
    setLoading(false);
  };

  return (
    <>
      <Grid container paddingTop={3} spacing={3} alignContent={'center'}>
        <Grid item xs={12}>
          <Grid container spacing={1}>
            <Grid xs={12} item>
              <Item>
                <SkillsDialog prop={'Streets'} />
              </Item>
            </Grid>
            {SkillSet.streets.map((skill, i) => {
              return (
                <React.Fragment key={i}>
                  <Grid xs={3} item>
                    <Item>
                      <SkillsDialog prop={skill[1]} />
                    </Item>
                  </Grid>
                  <Grid xs={3} item>
                    <Item>{dotReturn(charDetail[skill[0]], 5)}</Item>
                  </Grid>
                  <Grid xs={3} item>
                    <Item>
                      <Button disabled={loading} variant="contained" color="success" onClick={() => changeSkill(skill[0], 1)}>
                        Increase
                      </Button>
                    </Item>
                  </Grid>
                  <Grid xs={3} item>
                    <Item>
                      <Button disabled={loading} variant="contained" color="error" onClick={() => changeSkill(skill[0], -1)}>
                        Decrease
                      </Button>
                    </Item>
                  </Grid>
                </React.Fragment>
              );
            })}
            <Grid xs={12} item>
              <Item>
                <SkillsDialog prop={'Tekhne'} />
              </Item>
            </Grid>

            {SkillSet.tekhne.map((skill, i) => {
              return (
                <React.Fragment key={i}>
                  <Grid xs={3} item>
                    <Item>
                      <SkillsDialog prop={skill[1]} />
                    </Item>
                  </Grid>
                  <Grid xs={3} item>
                    <Item>{dotReturn(charDetail[skill[0]], 5)}</Item>
                  </Grid>
                  <Grid xs={3} item>
                    <Item>
                      <Button disabled={loading} variant="contained" color="success" onClick={() => changeSkill(skill[0], 1)}>
                        Increase
                      </Button>
                    </Item>
                  </Grid>
                  <Grid xs={3} item>
                    <Item>
                      <Button disabled={loading} variant="contained" color="error" onClick={() => changeSkill(skill[0], -1)}>
                        Decrease
                      </Button>
                    </Item>
                  </Grid>
                </React.Fragment>
              );
            })}
            <Grid xs={12} item>
              <Item>
                <SkillsDialog prop={'Knowledge'} />
              </Item>
            </Grid>

            {SkillSet.knowledge.map((skill, i) => {
              return (
                <React.Fragment key={i}>
                  <Grid xs={3} item>
                    <Item>
                      <SkillsDialog prop={skill[1]} />
                    </Item>
                  </Grid>
                  <Grid xs={3} item>
                    <Item>{dotReturn(charDetail[skill[0]], 5)}</Item>
                  </Grid>
                  <Grid xs={3} item>
                    <Item>
                      <Button disabled={loading} variant="contained" color="success" onClick={() => changeSkill(skill[0], 1)}>
                        Increase
                      </Button>
                    </Item>
                  </Grid>
                  <Grid xs={3} item>
                    <Item>
                      <Button disabled={loading} variant="contained" color="error" onClick={() => changeSkill(skill[0], -1)}>
                        Decrease
                      </Button>
                    </Item>
                  </Grid>
                </React.Fragment>
              );
            })}

            <Grid item xs={3}>
              <Item>Is Paramedic?</Item>
            </Grid>
            <Grid item xs={3}>
              <Item>{charDetail.is_paramedical ? 'YES' : 'NO'}</Item>
            </Grid>
            <Grid item xs={3}>
              <Item>
                <Button disabled={charDetail.is_paramedical ? true : false} onClick={() => changeIsParamed(true)}>
                  Enable
                </Button>
              </Item>
            </Grid>
            <Grid item xs={3}>
              <Item>
                <Button disabled={charDetail.is_paramedical ? false : true} onClick={() => changeIsParamed(false)}>
                  Disable
                </Button>
              </Item>
            </Grid>

            {charDetail.is_paramedical ? (
              <React.Fragment>
                <Grid xs={3} item>
                  <Item>
                    <SkillsDialog prop={'Paramedic'} />
                  </Item>
                </Grid>
                <Grid xs={3} item>
                  <Item>{dotReturn(charDetail.paramed, 5)}</Item>
                </Grid>
                <Grid xs={3} item>
                  <Item>
                    <Button disabled={loading} variant="contained" color="success" onClick={() => changeSkill('paramed', 1)}>
                      Increase
                    </Button>
                  </Item>
                </Grid>
                <Grid xs={3} item>
                  <Item>
                    <Button disabled={loading} variant="contained" color="error" onClick={() => changeSkill('paramed', -1)}>
                      Decrease
                    </Button>
                  </Item>
                </Grid>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Grid xs={3} item>
                  <Item>
                    <SkillsDialog prop={'First Aid'} />
                  </Item>
                </Grid>
                <Grid xs={3} item>
                  <Item>{dotReturn(charDetail.first_aid, 5)}</Item>
                </Grid>
                <Grid xs={3} item>
                  <Item>
                    <Button disabled={loading} variant="contained" color="success" onClick={() => changeSkill('first_aid', 1)}>
                      Increase
                    </Button>
                  </Item>
                </Grid>
                <Grid xs={3} item>
                  <Item>
                    <Button disabled={loading} variant="contained" color="error" onClick={() => changeSkill('first_aid', -1)}>
                      Decrease
                    </Button>
                  </Item>
                </Grid>{' '}
              </React.Fragment>
            )}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
