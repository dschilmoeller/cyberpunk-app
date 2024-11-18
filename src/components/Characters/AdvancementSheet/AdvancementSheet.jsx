import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import { useHistory, useParams, useLocation } from 'react-router-dom';

import Grid from '@mui/material/Grid';
import Item from '../CharacterSheet/Item';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import AdvancementAttributes from './AdvancementAttributes';
import AdvancementSkills from './AdvancementSkills';
import AdvancementRoles from './AdvancementRoles';
import AdvancementOther from './AdvancementOther';

// Top Level Sheet
function AdvancementSheet() {
  const advancementDetails = useSelector((store) => store.advancementDetail);

  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  const location = useLocation();

  // opener for primary tabs.
  const [value, setValue] = useState(location.hash ? location.hash : false);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    dispatch({ type: 'FETCH_ADVANCEMENT_DETAIL', payload: params.id });
    dispatch({ type: 'FETCH_MASTER_LISTS' });
  }, []);

  return (
    <>
      <div>
        <Grid container>
          <Grid item display={'flex'} justifyContent={'center'} xs={3}>
            <Button variant="contained" onClick={() => history.push('/characterlist')}>
              Back to Character List
            </Button>
          </Grid>

          <Grid item display={'flex'} justifyContent={'center'} xs={3}>
            <Button variant="contained" color="secondary" onClick={() => history.push(`/charactersheet/${advancementDetails.id}`)}>
              Move to In Play Sheet
            </Button>
          </Grid>

          <Grid item display={'flex'} justifyContent={'center'} xs={3}>
            <Button variant="contained" color="info" onClick={() => history.push(`/equipSheet/${advancementDetails.id}`)}>
              Move to Equip Sheet
            </Button>
          </Grid>

          <Grid item display={'flex'} justifyContent={'center'} xs={3}>
            <Button variant="contained" color="success" onClick={() => history.push(`/shopSheet/${advancementDetails.id}`)}>
              Move to Shopping Sheet
            </Button>
          </Grid>
        </Grid>

        {advancementDetails ? (
          <>
            <Grid container>
              <Grid item xs={4}>
                <Item>
                  <h2>Name: {advancementDetails.handle}</h2>
                </Item>
              </Grid>
              <Grid item xs={4}>
                <Item>
                  <h2>Player: {advancementDetails.player}</h2>
                </Item>
              </Grid>
              <Grid item xs={4}>
                <Item>
                  <h2>Campaign: {advancementDetails.campaign_name}</h2>
                </Item>
              </Grid>
            </Grid>

            <Grid container>
              <Grid item xs={12}>
                <Item>
                  <h3>Available XP: {advancementDetails.max_xp - advancementDetails.spent_xp}</h3>
                </Item>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={12}>
                <Item>
                  <h2>Spend Experience</h2>
                </Item>
              </Grid>
            </Grid>
          </>
        ) : (
          <></>
        )}
        <Tabs centered value={value} onChange={handleChange} indicatorColor="primary" textColor="secondary">
          <Tab value="#attributes" href={`/#/advancementsheet/${params.id}#attributes`} label="Attributes" />
          <Tab value="#skills" href={`/#/advancementsheet/${params.id}#skills`} label="Skills" />
          <Tab value="#role" href={`/#/advancementsheet/${params.id}#role`} label="Role Abilities" />
          <Tab value="#otherTraits" href={`/#/advancementsheet/${params.id}#otherTraits`} label="Other Traits" />
        </Tabs>

        {value === '#attributes' ? (
          <>
            <AdvancementAttributes />
          </>
        ) : (
          <></>
        )}

        {value === '#skills' ? (
          <>
            <AdvancementSkills />
          </>
        ) : (
          <></>
        )}

        {value === '#role' ? (
          <>
            <AdvancementRoles />
          </>
        ) : (
          <></>
        )}

        {value === '#otherTraits' ? (
          <>
            <AdvancementOther />
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

export default AdvancementSheet;
