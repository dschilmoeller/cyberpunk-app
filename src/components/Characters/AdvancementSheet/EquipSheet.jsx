import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import { useHistory, useParams, useLocation } from 'react-router-dom';

import Grid from '@mui/material/Grid';
import Item from '../CharacterSheet/Item';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import AdvancementGearArmor from './AdvancementGearArmor';
import AdvancementGearWeapons from './AdvancementGearWeapons';
import AdvancementGearOther from './AdvancementGearOther';
import AdvancementPharma from './AdvancementGearPharma';
import AdvancementNetrunnerGear from './AdvancementNetrunnerGear';
import AdvancementCyberware from './AdvancementCyberware';
import AdvancementGarage from './AdvancementGarage';
import AdvancementClothes from './AdvancementClothes';

export default function EquipSheet() {
  const advancementDetails = useSelector((store) => store.advancementDetail);

  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  const location = useLocation();

  const euroBuck = `\u20AC$`;

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
            <Button
              variant="contained"
              onClick={() => history.push('/characterlist')}
            >
              Back to Character List
            </Button>
          </Grid>

          <Grid item display={'flex'} justifyContent={'center'} xs={3}>
            <Button
              variant="contained"
              color="secondary"
              onClick={() =>
                history.push(`/charactersheet/${advancementDetails.id}`)
              }
            >
              Move to In Play Sheet
            </Button>
          </Grid>

          <Grid item display={'flex'} justifyContent={'center'} xs={3}>
            <Button
              variant="contained"
              color="warning"
              onClick={() =>
                history.push(`/advancementsheet/${advancementDetails.id}`)
              }
            >
              Move to Spend XP Sheet
            </Button>
          </Grid>

          <Grid item display={'flex'} justifyContent={'center'} xs={3}>
            <Button
              variant="contained"
              color="success"
              onClick={() =>
                history.push(`/shopSheet/${advancementDetails.id}`)
              }
            >
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
              {/* <Grid item xs={6}><Item><h3>Available XP: {advancementDetails.max_xp - advancementDetails.spent_xp}</h3></Item></Grid> */}
              <Grid item xs={12}>
                <Item>
                  <h3>
                    Cash on Hand: {euroBuck}
                    {advancementDetails.bank}
                  </h3>
                </Item>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={12}>
                <Item>
                  <h2>Equip Gear</h2>
                </Item>
              </Grid>
            </Grid>
          </>
        ) : (
          <></>
        )}

        <Tabs
          value={value}
          onChange={handleChange}
          centered
          indicatorColor="primary"
          textColor="secondary"
        >
          <Tab
            value="#armor"
            href={`/#/equipsheet/${params.id}#armor`}
            label="Armor"
          />
          <Tab
            value="#weapons"
            href={`/#/equipsheet/${params.id}#weapons`}
            label="Weapons"
          />
          <Tab
            value="#other"
            href={`/#/equipsheet/${params.id}#other`}
            label="Other Gear"
          />
          {advancementDetails.med_pharma > 0 ? (
            <Tab
              value="#pharma"
              href={`/#/equipsheet/${params.id}#pharma`}
              label="Pharmaceuticals"
            />
          ) : (
            <Tab disabled label="Pharmaceuticals" />
          )}
          <Tab
            value="#netrunner"
            disabled
            href={`/#/equipsheet/${params.id}#netrunner`}
            label="Netrunner Gear"
          />
          <Tab
            value="#cyberware"
            href={`/#/equipsheet/${params.id}#cyberware`}
            label="Cyberware"
          />
          <Tab
            value="#vehicles"
            href={`/#/equipsheet/${params.id}#vehicles`}
            label="Vehicles"
          />
          <Tab
            value="#clothes"
            href={`/#/equipsheet/${params.id}#clothes`}
            label="Clothes"
          />
        </Tabs>

        {value === '#armor' ? (
          <>
            <AdvancementGearArmor />
          </>
        ) : (
          <></>
        )}

        {value === '#weapons' ? (
          <>
            <AdvancementGearWeapons />
          </>
        ) : (
          <></>
        )}

        {value === '#pharma' && advancementDetails.med_pharma > 0 ? (
          <>
            <AdvancementPharma />
          </>
        ) : (
          <></>
        )}

        {value === '#other' ? (
          <>
            <AdvancementGearOther />
          </>
        ) : (
          <></>
        )}

        {value === '#netrunner' ? (
          <>
            <AdvancementNetrunnerGear />
          </>
        ) : (
          <></>
        )}

        {value === '#cyberware' ? (
          <>
            <AdvancementCyberware />
          </>
        ) : (
          <></>
        )}

        {value === '#vehicles' ? (
          <>
            <AdvancementGarage />
          </>
        ) : (
          <></>
        )}

        {value === '#clothes' ? (
          <>
            <AdvancementClothes />
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
