import React from 'react';
import { Button } from '@mui/material';

import Grid from '@mui/material/Grid';
import Item from '../Characters/CharacterSheet/Item';

import SkillsDialog from '../Modals/SkillsDialog';

import CircleIcon from '@mui/icons-material/Circle';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';

import { SkillSet } from '../../utils/objects/objects.utils';
// import { capitalizer } from '../../utils/funcs/funcs';
import { changeCharacterSkill } from './gm.services';

export default function GameMasterSkills({
  charDetail,
  setCharDetail,
  setPageAlert,
  loading,
  setLoading,
  chuckError,
}) {
  // const charDetail = useSelector(store => store.advancementDetail)

  const fullCircle = <CircleIcon />;
  const emptyCircle = <CircleOutlinedIcon />;

  const attDotReturn = (attribute) => {
    let returnedDots = [];
    for (let i = 0; i < attribute; i++) {
      returnedDots.push(<React.Fragment key={i}>{fullCircle}</React.Fragment>);
    }
    let j = attribute;
    for (j; j <= 4; j++) {
      returnedDots.push(
        <React.Fragment key={j + 5}>{emptyCircle}</React.Fragment>
      );
    }
    return returnedDots;
  };

  const changeSkill = async (skillName, change) => {
    setLoading(true);
    const skillObj = {
      charID: charDetail.id,
      skillName,
      newRank: charDetail[skillName] + change,
    };

    if (
      (change > 0 && charDetail[skillName] + change <= 5) ||
      (change < 0 && charDetail[skillName] + change >= 0)
    ) {
      try {
        let result = await changeCharacterSkill(skillObj);
        if (result === 'OK') {
          setCharDetail({
            ...charDetail,
            [skillName]: charDetail[skillName] + change,
          });
          setLoading(false);
        } else {
          setPageAlert({
            open: true,
            message: 'Task Failed Successfully',
            severity: 'error',
          });
          setLoading(false);
        }
      } catch (error) {
        chuckError();
        console.error('Error changing skill rank:', error);
      }
    } else {
      chuckError();
    }
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
        setLoading(false);
      } else {
        setPageAlert({
          open: true,
          message: 'Task Failed Successfully',
          severity: 'error',
        });
        setLoading(false);
      }
    } catch (error) {
      chuckError();
      console.error('Error changing skill rank:', error);
    }
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
                    <Item>{attDotReturn(charDetail[skill[0]])}</Item>
                  </Grid>
                  <Grid xs={3} item>
                    <Item>
                      <Button
                        disabled={loading}
                        variant="contained"
                        color="success"
                        onClick={() => changeSkill(skill[0], 1)}
                      >
                        Increase
                      </Button>
                    </Item>
                  </Grid>
                  <Grid xs={3} item>
                    <Item>
                      <Button
                        disabled={loading}
                        variant="contained"
                        color="error"
                        onClick={() => changeSkill(skill[0], -1)}
                      >
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
                    <Item>{attDotReturn(charDetail[skill[0]])}</Item>
                  </Grid>
                  <Grid xs={3} item>
                    <Item>
                      <Button
                        disabled={loading}
                        variant="contained"
                        color="success"
                        onClick={() => changeSkill(skill[0], 1)}
                      >
                        Increase
                      </Button>
                    </Item>
                  </Grid>
                  <Grid xs={3} item>
                    <Item>
                      <Button
                        disabled={loading}
                        variant="contained"
                        color="error"
                        onClick={() => changeSkill(skill[0], -1)}
                      >
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
                    <Item>{attDotReturn(charDetail[skill[0]])}</Item>
                  </Grid>
                  <Grid xs={3} item>
                    <Item>
                      <Button
                        disabled={loading}
                        variant="contained"
                        color="success"
                        onClick={() => changeSkill(skill[0], 1)}
                      >
                        Increase
                      </Button>
                    </Item>
                  </Grid>
                  <Grid xs={3} item>
                    <Item>
                      <Button
                        disabled={loading}
                        variant="contained"
                        color="error"
                        onClick={() => changeSkill(skill[0], -1)}
                      >
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
                <Button
                  disabled={charDetail.is_paramedical ? true : false}
                  onClick={() => changeIsParamed(true)}
                >
                  Enable
                </Button>
              </Item>
            </Grid>
            <Grid item xs={3}>
              <Item>
                <Button
                  disabled={charDetail.is_paramedical ? false : true}
                  onClick={() => changeIsParamed(false)}
                >
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
                  <Item>{attDotReturn(charDetail.paramed)}</Item>
                </Grid>
                <Grid xs={3} item>
                  <Item>
                    <Button
                      disabled={loading}
                      variant="contained"
                      color="success"
                      onClick={() => changeSkill('paramed', 1)}
                    >
                      Increase
                    </Button>
                  </Item>
                </Grid>
                <Grid xs={3} item>
                  <Item>
                    <Button
                      disabled={loading}
                      variant="contained"
                      color="error"
                      onClick={() => changeSkill('paramed', -1)}
                    >
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
                  <Item>{attDotReturn(charDetail.first_aid)}</Item>
                </Grid>
                <Grid xs={3} item>
                  <Item>
                    <Button
                      disabled={loading}
                      variant="contained"
                      color="success"
                      onClick={() => changeSkill('first_aid', 1)}
                    >
                      Increase
                    </Button>
                  </Item>
                </Grid>
                <Grid xs={3} item>
                  <Item>
                    <Button
                      disabled={loading}
                      variant="contained"
                      color="error"
                      onClick={() => changeSkill('first_aid', -1)}
                    >
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
