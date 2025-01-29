import React from 'react';
import { Grid, Button } from '@mui/material/';
import Item from '../CharacterSheet/Item';
import RoleAbilitiesDialog from '../../Modals/RoleAbilitiesDialog';
import { capitalizer, dotReturn } from '../../../utils/funcs/funcs';
import { Roles, RoleSkills } from '../../../utils/objects/objects.utils';
import { updateCharacterStat } from '../../../services/advancement.services';

export default function AdvancementRoles({ advancementDetails, setAdvancementDetails, loading, setLoading, setPageAlert, chuckError }) {
  const roleExpReturn = (role) => {
    if (role < 1) {
      return `15 XP`;
    } else {
      let newCost = (role + 1) * 5;
      return `${newCost} XP`;
    }
  };

  //REQUIRES EXTENSIVE REVIEW & TESTING =/
  const increaseStat = async (attribute, maxRank, roleSkill, roleSkillPool) => {
    if (roleSkill === false) {
      setLoading(true);
      const availableExp = advancementDetails.max_xp - advancementDetails.spent_xp;
      const requiredExp = advancementDetails[attribute] === 0 ? 15 : (advancementDetails[attribute] + 1) * 5;
      const statObj = {
        charID: advancementDetails.id,
        newRank: advancementDetails[attribute] + 1,
        statName: attribute,
        newSpentXP: advancementDetails.spent_xp + requiredExp,
      };
      if (requiredExp <= availableExp && advancementDetails[attribute] + 1 <= maxRank) {
        try {
          let result = await updateCharacterStat(statObj);
          if (result === 'OK' && (attribute === 'medtech' || attribute === 'maker')) {
            try {
              const roleSkillObj = {
                charID: advancementDetails.id,
                newRank: attribute === 'medtech' ? advancementDetails.medtech_available + 1 : advancementDetails.maker_available + 2,
                statName: attribute === 'medtech' ? 'medtech_available' : 'maker_available',
                newSpentXP: advancementDetails.spent_xp + requiredExp,
              };
              let roleSkillResult = await updateCharacterStat(roleSkillObj);
              // handle first rank of medtech - convert first aid -> paramedic and and set paramed = first aid
              if (roleSkillResult === 'OK' && attribute === 'medtech' && statObj.newRank === 1) {
                let paramedObj = {
                  charID: advancementDetails.id,
                  newRank: true,
                  statName: 'is_paramedical',
                  newSpentXP: advancementDetails.spent_xp + requiredExp,
                };
                let paramedSkillObj = {
                  charID: advancementDetails.id,
                  newRank: advancementDetails.first_aid,
                  statName: 'paramed',
                  newSpentXP: advancementDetails.spent_xp + requiredExp,
                };
                let paramedBoolResult = await updateCharacterStat(paramedObj);
                let firstParamedResult = await updateCharacterStat(paramedSkillObj);
                if (paramedBoolResult === 'OK' && firstParamedResult === 'OK') {
                  setAdvancementDetails({
                    ...advancementDetails,
                    is_paramedical: true,
                    paramed: advancementDetails.first_aid,
                    [attribute]: advancementDetails[attribute] + 1,
                    medtech_available: attribute === 'medtech' ? advancementDetails.medtech_available + 1 : advancementDetails.medtech_available,
                    maker_available: attribute === 'maker' ? advancementDetails.maker_available + 2 : advancementDetails.maker_available,
                    spent_xp: advancementDetails.spent_xp + requiredExp,
                  });
                  setPageAlert({ open: true, message: 'You have improved!', severity: 'success' });
                } else {
                  chuckError();
                }
              } else if (roleSkillResult === 'OK') {
                console.log(`att`, attribute, 'max', maxRank, 'roleskill', roleSkill, 'skillpool', roleSkillPool);
                setAdvancementDetails({
                  ...advancementDetails,
                  [attribute]: advancementDetails[attribute] + 1,
                  medtech_available: attribute === 'medtech' ? advancementDetails.medtech_available + 1 : advancementDetails.medtech_available,
                  maker_available: attribute === 'maker' ? advancementDetails.maker_available + 2 : advancementDetails.maker_available,
                  spent_xp: advancementDetails.spent_xp + requiredExp,
                });
                setPageAlert({ open: true, message: 'You have improved!', severity: 'success' });
              } else {
                chuckError();
              }
            } catch (error) {
              chuckError();
            }
          } else if (result === 'OK' && attribute === 'nomad') {
            const nomadObj = {
              charID: advancementDetails.id,
              newRank: advancementDetails.nomad_vehicle_slots + 1,
              statName: 'nomad_vehicle_slots',
              newSpentXP: advancementDetails.spent_xp + requiredExp,
            };
            let nomadResult = await updateCharacterStat(nomadObj);
            console.log(`nomad result:`, nomadResult, 'nomad obj:', nomadObj);
            if (nomadResult === 'OK') {
              setAdvancementDetails({
                ...advancementDetails,
                [attribute]: advancementDetails[attribute] + 1,
                spent_xp: advancementDetails.spent_xp + requiredExp,
                nomad_vehicle_slots: advancementDetails.nomad_vehicle_slots + 1,
              });
              setPageAlert({ open: true, message: 'You have improved!', severity: 'success' });
            } else {
              chuckError();
            }
          } else if (result === 'OK') {
            setPageAlert({ open: true, message: 'You have improved!', severity: 'success' });
            setAdvancementDetails({
              ...advancementDetails,
              [attribute]: advancementDetails[attribute] + 1,
              spent_xp: advancementDetails.spent_xp + requiredExp,
            });
          } else {
            chuckError();
          }
        } catch (error) {
          chuckError();
        }
      } else if (requiredExp > availableExp) {
        setPageAlert({ open: true, message: 'Insufficient XP', severity: 'error' });
      } else {
        chuckError();
      }
    } else if (roleSkill === true) {
      // handle increasing skill - whole different thing.
      const roleSkillObj = {
        charID: advancementDetails.id,
        newRank: advancementDetails[attribute] + 1,
        statName: attribute,
        newSpentXP: advancementDetails.spent_xp,
      };
      const spentRoleSkillObj = {
        charID: advancementDetails.id,
        newRank: advancementDetails[roleSkillPool] - 1,
        statName: roleSkillPool,
        newSpentXP: advancementDetails.spent_xp,
      };
      let roleSkillResult = await updateCharacterStat(roleSkillObj);
      let spentRoleSkillResult = await updateCharacterStat(spentRoleSkillObj);
      if (roleSkillResult === 'OK' && spentRoleSkillResult === 'OK') {
        setAdvancementDetails({
          ...advancementDetails,
          [attribute]: advancementDetails[attribute] + 1,
          [roleSkillPool]: advancementDetails[roleSkillPool] - 1,
          spent_xp: advancementDetails.spent_xp,
        });
        setPageAlert({ open: true, message: 'You have improved!', severity: 'success' });
      } else {
        chuckError();
      }
    } else {
      chuckError();
    }
    setLoading(false);
  };

  return (
    <Grid container spacing={1}>
      {Roles.map((role, i) => {
        return (
          <React.Fragment key={i}>
            <Grid item xs={4}>
              <Item>
                <RoleAbilitiesDialog prop={capitalizer(role[0])} />
              </Item>
            </Grid>
            <Grid item xs={4}>
              <Item>{dotReturn(advancementDetails[role[0]], 10)}</Item>
            </Grid>
            <Grid item xs={4}>
              <Item>
                <Button variant="contained" disabled={loading} fullWidth onClick={() => increaseStat(role[0], 10, false)}>
                  {roleExpReturn(advancementDetails[role[0]])}
                </Button>
              </Item>
            </Grid>
            {role[0] === 'medtech' ? (
              RoleSkills.medtech.map((skill, i) => {
                return (
                  <React.Fragment key={i}>
                    <Grid item xs={4}>
                      <Item>
                        <RoleAbilitiesDialog prop={skill[1]} />
                      </Item>
                    </Grid>
                    <Grid item xs={4}>
                      <Item>{dotReturn(advancementDetails[skill[0]], skill[2])}</Item>
                    </Grid>
                    <Grid item xs={4}>
                      <Item>
                        {advancementDetails.medtech_available > 0 ? (
                          <>
                            <Button
                              variant="contained"
                              disabled={loading}
                              fullWidth
                              onClick={() => increaseStat(skill[0], 5, true, 'medtech_available')}
                            >
                              Increase by 1
                            </Button>
                          </>
                        ) : (
                          'Increase Role'
                        )}
                      </Item>
                    </Grid>
                  </React.Fragment>
                );
              })
            ) : (
              <></>
            )}
            {role[0] === 'maker' ? (
              RoleSkills.maker.map((skill, i) => {
                return (
                  <React.Fragment key={i}>
                    <Grid item xs={4}>
                      <Item>
                        <RoleAbilitiesDialog prop={skill[1]} />
                      </Item>
                    </Grid>
                    <Grid item xs={4}>
                      <Item>{dotReturn(advancementDetails[skill[0]], skill[2])}</Item>
                    </Grid>
                    <Grid item xs={4}>
                      <Item>
                        {advancementDetails.maker_available > 0 ? (
                          <>
                            <Button
                              variant="contained"
                              disabled={loading}
                              fullWidth
                              onClick={() => increaseStat(skill[0], 10, true, 'maker_available')}
                            >
                              Increase by 1
                            </Button>
                          </>
                        ) : (
                          'Increase Role'
                        )}
                      </Item>
                    </Grid>
                  </React.Fragment>
                );
              })
            ) : (
              <></>
            )}
          </React.Fragment>
        );
      })}
    </Grid>
  );
}
