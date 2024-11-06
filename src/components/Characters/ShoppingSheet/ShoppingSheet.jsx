import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import { useHistory, useParams, useLocation } from 'react-router-dom';

import Grid from '@mui/material/Grid';
import Item from '../CharacterSheet/Item';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import ArmorOwnedTable from './ArmorOwnedTable';
import ArmorMasterTable from './ArmorMasterTable';
import WeaponsOwnedTable from './WeaponsOwnedTable';
import WeaponsMasterTable from './WeaponsMasterTable';
import GrenadeOwnedTable from './GrenadeOwnedTable';
import GrenadeMasterTable from './GrenadeMasterTable';
import OtherOwnedTable from './OtherOwnedTable';
import OtherMasterTable from './OtherMasterTable';
import PharmaOwnedTable from './PharmaOwnedTable';
import PharmaMasterTable from './PharmaMasterTable';
import NetrunnerOwnedTable from './NetrunnerOwnedTable';
import NetrunnerMasterTable from './NetrunnerMasterTable';
import VehicleMasterTable from './VehicleMasterTable';
import VehicleOwnedTable from './VehicleOwnedTable';
import ClothingMasterTable from './ClothingMasterTable';
import ClothingOwnedTable from './ClothingOwnedTable';
import ClothingEquippedTable from './ClothingEquippedTable';

import ShopCyberware from './ShopCyberware';

function ShoppingSheet() {
  const advancementDetails = useSelector((store) => store.advancementDetail);

  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  const location = useLocation();

  const euroBuck = `\u20AC$`;

  useEffect(() => {
    dispatch({ type: 'FETCH_ADVANCEMENT_DETAIL', payload: params.id });
    dispatch({ type: 'FETCH_MASTER_LISTS' });
  }, []);

  const [selectedShopping, setSelectedShopping] = useState(
    location.hash ? location.hash : false
  );
  const handleShoppingSelect = (event, newValue) => {
    setSelectedShopping(newValue);
  };

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
              color="info"
              onClick={() =>
                history.push(`/equipSheet/${advancementDetails.id}`)
              }
            >
              Move to Equip Sheet
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
                  <h3>
                    Cash on Hand: {euroBuck}
                    {advancementDetails.bank}
                  </h3>
                </Item>
              </Grid>
            </Grid>
          </>
        ) : (
          <></>
        )}

        <Item>
          <Tabs
            value={selectedShopping}
            onChange={handleShoppingSelect}
            indicatorColor="primary"
            textColor="secondary"
          >
            <Tab
              value="#armor"
              href={`/#/shopSheet/${params.id}#armor`}
              label="Armor"
            />
            <Tab
              value="#weapons"
              href={`/#/shopSheet/${params.id}#weapons`}
              label="Weapons"
            />
            <Tab
              value="#grenades"
              href={`/#/shopSheet/${params.id}#grenades`}
              label="Grenades"
            />
            <Tab
              value="#other"
              href={`/#/shopSheet/${params.id}#other`}
              label="Other Gear"
            />
            <Tab
              value="#pharma"
              href={`/#/shopSheet/${params.id}#pharma`}
              label="Pharma"
            />
            {advancementDetails.netrunner > 0 && (
              <Tab
                value="#netrunner"
                href={`/#/shopSheet/${params.id}#netrunner`}
                label="Netrunner"
              />
            )}
            <Tab
              value="#cyberware"
              href={`/#/shopSheet/${params.id}#cyberware`}
              label="Cyberware"
            />
            <Tab
              value="#vehicles"
              href={`/#/shopSheet/${params.id}#vehicles`}
              label="Vehicles"
            />
            <Tab
              value="#clothes"
              href={`/#/shopSheet/${params.id}#clothes`}
              label="Clothing"
            />
          </Tabs>
        </Item>

        {selectedShopping === '#armor' ? (
          <>
            <ArmorOwnedTable />
            <ArmorMasterTable />
          </>
        ) : (
          <></>
        )}

        {selectedShopping === '#weapons' ? (
          <>
            <WeaponsOwnedTable />
            <WeaponsMasterTable />
          </>
        ) : (
          <></>
        )}

        {selectedShopping === '#grenades' ? (
          <>
            <GrenadeOwnedTable />
            <GrenadeMasterTable />
          </>
        ) : (
          <></>
        )}

        {selectedShopping === '#other' ? (
          <>
            <OtherOwnedTable />
            <OtherMasterTable />
          </>
        ) : (
          <></>
        )}

        {selectedShopping === '#pharma' ? (
          <>
            <PharmaOwnedTable />
            <PharmaMasterTable />
          </>
        ) : (
          <></>
        )}

        {selectedShopping === '#netrunner' ? (
          <>
            <NetrunnerOwnedTable />
            <NetrunnerMasterTable />
          </>
        ) : (
          <></>
        )}

        {selectedShopping === '#cyberware' ? (
          <>
            <ShopCyberware />
          </>
        ) : (
          <></>
        )}

        {selectedShopping === '#vehicles' ? (
          <>
            <VehicleOwnedTable />
            <VehicleMasterTable />
          </>
        ) : (
          <></>
        )}

        {selectedShopping === '#clothes' ? (
          <>
            <ClothingEquippedTable />
            <ClothingOwnedTable />
            <ClothingMasterTable />
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

export default ShoppingSheet;
