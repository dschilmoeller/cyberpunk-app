import React from 'react';
import { Button } from '@mui/material';

import Grid from '@mui/material/Grid';
import Item from '../Characters/CharacterSheet/Item';

import RoleAbilitiesDialog from '../Modals/RoleAbilitiesDialog';

import { capitalizer, dotReturn } from '../../utils/funcs/funcs';
import { Roles, RoleSkills } from '../../utils/objects/objects.utils';

export default function GameMasterRoles({
  charDetail,
  setCharDetail,
  setPageAlert,
  loading,
  setLoading,
  chuckError,
}) {
  return (
    <>
      <Grid container paddingTop={3} spacing={3} alignContent={'center'}>
        <Grid item xs={12}>
          <Grid container spacing={1}>
            <Grid xs={12} item>
              <Item>
                Caution: It is possible to override built in limits (eg more
                points in role skills than role abilities) - please check your
                math.
              </Item>
            </Grid>

            {Roles.map((role, i) => {
              return (
                <React.Fragment key={i}>
                  <Grid xs={3} item>
                    <Item>
                      <RoleAbilitiesDialog prop={capitalizer(role[0])} />
                    </Item>
                  </Grid>
                  <Grid xs={3} item>
                    <Item>{dotReturn(charDetail[role[0]], 10)}</Item>
                  </Grid>
                  <Grid xs={3} item>
                    <Item>
                      <Button>Increase</Button>
                    </Item>
                  </Grid>
                  <Grid xs={3} item>
                    <Item>
                      <Button>Decrease</Button>
                    </Item>
                  </Grid>
                  {RoleSkills[role] ? (
                    RoleSkills[role].map((skill, i) => {
                      return (
                        <React.Fragment key={i}>
                          <Grid item xs={3}>
                            <Item>{skill[1]}</Item>
                          </Grid>
                          <Grid item xs={3}>
                            <Item>
                              {dotReturn(charDetail[skill[0]], skill[2])}
                            </Item>
                          </Grid>
                          <Grid xs={3} item>
                            <Item>
                              <Button>Increase</Button>
                            </Item>
                          </Grid>
                          <Grid xs={3} item>
                            <Item>
                              <Button>Decrease</Button>
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
        </Grid>
      </Grid>
    </>
  );
}
