import React, { useState, useEffect } from 'react';
import { Button, Grid, Tabs, Tab } from '@mui/material';
import { useHistory, useParams, useLocation } from 'react-router-dom';

import Item from '../CharacterSheet/Item';

import { fetchAdvancementDetailsRequest } from './advancement.services';

import AdvancementAttributes from './AdvancementAttributes';
import AdvancementSkills from './AdvancementSkills';
import AdvancementRoles from './AdvancementRoles';
import AdvancementOther from './AdvancementOther';
import SnackbarComponent from '../../GeneralAssets/Snackbar';

// Top Level Sheet - Spending XP
function AdvancementSheet() {
  const [advancementDetails, setAdvancementDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [pageAlert, setPageAlert] = useState({
    open: false,
    message: '',
    severity: '',
  });

  const fetchAdvancementDetails = async () => {
    const charObj = {
      charID: params.id,
    };
    try {
      let charDetails = await fetchAdvancementDetailsRequest(charObj);
      setAdvancementDetails(charDetails);
    } catch (error) {
      chuckError();
    }
  };

  const chuckError = () => {
    setPageAlert({
      open: true,
      message: 'Something is awry',
      severity: 'info',
    });
    setLoading(false);
  };

  const history = useHistory();
  const params = useParams();
  const location = useLocation();

  // opener for primary tabs.
  const [value, setValue] = useState(location.hash ? location.hash : false);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    fetchAdvancementDetails();
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
              <Grid item xs={4}>
                <Item>{value === '#role' ? 'Medtech Skill Points:' + advancementDetails.medtech_available : ''}</Item>
              </Grid>
              <Grid item xs={4}>
                <Item>
                  <h3>Available XP: {advancementDetails.max_xp - advancementDetails.spent_xp}</h3>
                </Item>
              </Grid>
              <Grid item xs={4}>
                <Item>{value === '#role' ? '/TODO Netrunner Actions/ ' : ''} </Item>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={4}>
                <Item> {value === '#role' ? 'Maker Skill Points:' + advancementDetails.maker_available : ''}</Item>
              </Grid>
              <Grid item xs={4}>
                <Item>
                  <h2>Spend Experience</h2>
                </Item>
              </Grid>
              <Grid item xs={4}>
                <Item>{value === '#role' ? 'Nomad Vehicles:' + advancementDetails.nomad_vehicle_slots : ''}</Item>
              </Grid>
            </Grid>
          </>
        ) : (
          <></>
        )}
        <Tabs centered value={value} onChange={handleChange} indicatorColor="primary" textColor="secondary">
          <Tab value="#attributes" label="Attributes" />
          <Tab value="#skills" label="Skills" />
          <Tab value="#role" label="Role Abilities" />
          <Tab value="#otherTraits" label="Other Traits" />
        </Tabs>

        {value === '#attributes' ? (
          <>
            <AdvancementAttributes
              advancementDetails={advancementDetails}
              setAdvancementDetails={setAdvancementDetails}
              loading={loading}
              setLoading={setLoading}
              setPageAlert={setPageAlert}
              chuckError={chuckError}
            />
          </>
        ) : (
          <></>
        )}

        {value === '#skills' ? (
          <>
            <AdvancementSkills
              advancementDetails={advancementDetails}
              setAdvancementDetails={setAdvancementDetails}
              loading={loading}
              setLoading={setLoading}
              setPageAlert={setPageAlert}
              chuckError={chuckError}
            />
          </>
        ) : (
          <></>
        )}

        {value === '#role' ? (
          <>
            <AdvancementRoles
              advancementDetails={advancementDetails}
              setAdvancementDetails={setAdvancementDetails}
              loading={loading}
              setLoading={setLoading}
              setPageAlert={setPageAlert}
              chuckError={chuckError}
            />
          </>
        ) : (
          <></>
        )}

        {value === '#otherTraits' ? (
          <>
            <AdvancementOther
              advancementDetails={advancementDetails}
              setAdvancementDetails={setAdvancementDetails}
              loading={loading}
              setLoading={setLoading}
              setPageAlert={setPageAlert}
              chuckError={chuckError}
            />
          </>
        ) : (
          <></>
        )}
      </div>
      <SnackbarComponent
        open={pageAlert.open}
        message={pageAlert.message}
        severity={pageAlert.severity}
        onClose={() => setPageAlert({ open: false, message: '', severity: '' })}
      />
    </>
  );
}

export default AdvancementSheet;
