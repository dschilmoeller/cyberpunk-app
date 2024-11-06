import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@mui/material';

import Grid from '@mui/material/Grid';
import Item from '../Characters/CharacterSheet/Item';

import SkillsDialog from '../Modals/SkillsDialog';

import CircleIcon from '@mui/icons-material/Circle';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';

import { SkillSet } from '../../utils/objects/objects.utils';
import { capitalizer } from '../../utils/funcs/funcs';
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

  const changeSkill = (skillName, change) => {
    const skillObj = {
      charID: charDetail.id,
      skillName,
      newRank: charDetail[skillName] + change,
    };

    if (
      (change > 0 && charDetail[skillName] + change <= 5) ||
      (change < 0 && charDetail[skillName] + change >= 1)
    ) {
      try {
        let result = changeCharacterSkill(skillObj);
        console.log(`result:`, result);
        if (result === 'OK') {
          setCharDetail({
            ...charDetail,
            [skillName]: charDetail[fixedAtt] + change,
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

  // const attLevelChange = (statToChange, currentStat, changeType) => {
  //     let newTotalExp;
  //     let newSpentTotalExp;
  //     if (currentStat < 5 && changeType === 'increase') {
  //         newTotalExp = charDetail.max_xp + ((currentStat + 1) * 2)
  //         newSpentTotalExp = charDetail.spent_xp + ((currentStat + 1) * 2)
  //         currentStat += 1
  //         dispatch({
  //             type: "GM_INCREASE_STAT", payload: {
  //                 statToChange: statToChange,
  //                 newStatAmount: currentStat,
  //             }
  //         })
  //     } else if (currentStat > 0 && changeType === 'decrease') {
  //         currentStat -= 1
  //         // newTotalExp = charDetail.max_xp + ((currentStat) * 2)
  //         dispatch({
  //             type: "GM_DECREASE_STAT", payload: {
  //                 statToChange: statToChange,
  //                 newStatAmount: currentStat,
  //                 // newTotalExp: newTotalExp
  //             }
  //         })
  //     } else {
  //         setShowSnackbar(true)
  //     }

  // }

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
                      variant="contained"
                      color="error"
                      onClick={() => changeSkill(skill[0], -1)}
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
                      variant="contained"
                      color="error"
                      onClick={() => changeSkill(skill[0], -1)}
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
