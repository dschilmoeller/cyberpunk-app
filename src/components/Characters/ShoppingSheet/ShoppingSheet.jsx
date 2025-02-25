import React, { useState, useEffect } from 'react';
import { Button, Grid, Tabs, Tab } from '@mui/material';
import { useHistory, useParams, useLocation } from 'react-router-dom';
import SnackbarComponent from '../../GeneralAssets/Snackbar';
import Item from '../CharacterSheet/Item';
import { moneyMaker } from '../../../utils/funcs/funcs';

import ArmorOwnedTable from './Armor/ArmorOwnedTable';
import ArmorMasterTable from './Armor/ArmorMasterTable';
import ClothingMasterTable from './Clothing/ClothingMasterTable';
import ClothingOwnedTable from './Clothing/ClothingOwnedTable';
import ClothingEquippedTable from './Clothing/ClothingEquippedTable';
import ShopCyberware from './Cyberware/ShopCyberware';
import GrenadeOwnedTable from './Grenade/GrenadeOwnedTable';
import GrenadeMasterTable from './Grenade/GrenadeMasterTable';
import OtherOwnedTable from './Misc/OtherOwnedTable';
import OtherMasterTable from './Misc/OtherMasterTable';
import PharmaOwnedTable from './Pharma/PharmaOwnedTable';
import PharmaMasterTable from './Pharma/PharmaMasterTable';
import NetrunnerOwnedTable from './Netrunner/NetrunnerOwnedTable';
import NetrunnerMasterTable from './Netrunner/NetrunnerMasterTable';
import VehicleMasterTable from './Vehicles/VehicleMasterTable';
import VehicleOwnedTable from './Vehicles/VehicleOwnedTable';
import WeaponsOwnedTable from './Weapons/WeaponsOwnedTable';
import WeaponsMasterTable from './Weapons/WeaponsMasterTable';

import {
  fetchShopCharDetailsRequest,
  fetchMasterArmorListRequest,
  fetchMasterWeaponsListRequest,
  fetchMasterGrenadesListRequest,
  fetchMasterMiscGearListRequest,
  fetchMasterPharmaListRequest,
  fetchMasterCyberwareListRequest,
  fetchMasterVehiclesListRequest,
  fetchMasterVehicleModsListRequest,
} from '../../../services/shopping.services';

import {
  fetchCharArmorRequest,
  fetchCharWeaponsRequest,
  fetchCharGrenadesRequest,
  fetchCharMiscGearRequest,
  fetchCharPharmaRequest,
  fetchCharCyberwareRequest,
  fetchCharVehiclesRequest,
  fetchCharVehicleModsRequest,
} from '../../../services/equip.services';

function ShoppingSheet() {
  const [loading, setLoading] = useState(false);
  const [pageAlert, setPageAlert] = useState({
    open: false,
    message: '',
    severity: '',
  });
  const [charDetail, setCharDetail] = useState({});
  const [charGear, setCharGear] = useState({
    armor: [],
    weapons: [],
    grenades: [],
    misc: [],
    pharma: [],
    cyberware: [],
    vehicles: [],
    vehicleMods: [],
  });
  const [masterGear, setMasterGear] = useState({
    armor: [],
    weapons: [],
    grenades: [],
    misc: [],
    pharma: [],
    cyberware: [],
    vehicles: [],
    vehicleMods: [],
  });
  const history = useHistory();
  const params = useParams();
  const location = useLocation();

  const shopSheetSetup = async () => {
    setLoading(true);
    try {
      const charObj = {
        charID: params.id,
      };

      const characterDetails = await fetchShopCharDetailsRequest(charObj);
      setCharDetail(characterDetails);

      const charArmor = await fetchCharArmorRequest(charObj);
      const charWeapons = await fetchCharWeaponsRequest(charObj);
      const charGrenades = await fetchCharGrenadesRequest(charObj);
      const charMiscGear = await fetchCharMiscGearRequest(charObj);
      const charPharma = await fetchCharPharmaRequest(charObj);
      const charCyberware = await fetchCharCyberwareRequest(charObj);
      const charVehicles = await fetchCharVehiclesRequest(charObj);
      const charVehicleMods = await fetchCharVehicleModsRequest(charObj);

      setCharGear({
        armor: charArmor,
        weapons: charWeapons,
        grenades: charGrenades,
        misc: charMiscGear,
        pharma: charPharma,
        cyberware: charCyberware,
        vehicles: charVehicles,
        vehicleMods: charVehicleMods,
      });

      const masterArmor = await fetchMasterArmorListRequest();
      const masterWeapons = await fetchMasterWeaponsListRequest();
      const masterGrenades = await fetchMasterGrenadesListRequest();
      const masterMiscGear = await fetchMasterMiscGearListRequest();
      const masterPharma = await fetchMasterPharmaListRequest();
      const masterCyberware = await fetchMasterCyberwareListRequest();
      const masterVehicles = await fetchMasterVehiclesListRequest();
      const masterVehicleMods = await fetchMasterVehicleModsListRequest();
      setMasterGear({
        armor: masterArmor,
        weapons: masterWeapons,
        grenades: masterGrenades,
        misc: masterMiscGear,
        pharma: masterPharma,
        cyberware: masterCyberware,
        vehicles: masterVehicles,
        vehicleMods: masterVehicleMods,
      });
    } catch (error) {
      chuckError();
    }
    setLoading(false);
  };

  useEffect(() => {
    shopSheetSetup();
  }, []);

  const chuckError = () => {
    setPageAlert({
      open: true,
      message: 'Something is awry',
      severity: 'info',
    });
    setLoading(false);
  };

  const [selectedShopping, setSelectedShopping] = useState(location.hash ? location.hash : false);
  const handleShoppingSelect = (event, newValue) => {
    setSelectedShopping(newValue);
  };

  if (charDetail.id) {
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
              <Button variant="contained" color="secondary" onClick={() => history.push(`/charactersheet/${charDetail.id}`)}>
                Move to In Play Sheet
              </Button>
            </Grid>

            <Grid item display={'flex'} justifyContent={'center'} xs={3}>
              <Button variant="contained" color="warning" onClick={() => history.push(`/advancementsheet/${charDetail.id}`)}>
                Move to Spend XP Sheet
              </Button>
            </Grid>

            <Grid item display={'flex'} justifyContent={'center'} xs={3}>
              <Button variant="contained" color="info" onClick={() => history.push(`/equipSheet/${charDetail.id}`)}>
                Move to Equip Sheet
              </Button>
            </Grid>
          </Grid>

          {charDetail ? (
            <>
              <Grid container>
                <Grid item xs={4}>
                  <Item>
                    <h2>Name: {charDetail.handle}</h2>
                  </Item>
                </Grid>
                <Grid item xs={4}>
                  <Item>
                    <h2>Player: {charDetail.player}</h2>
                  </Item>
                </Grid>
                <Grid item xs={4}>
                  <Item>
                    <h2>Campaign: {charDetail.campaign_name}</h2>
                  </Item>
                </Grid>
              </Grid>

              <Grid container>
                <Grid item xs={12}>
                  <Item>
                    <h3>Cash on Hand: {moneyMaker(charDetail.bank)}</h3>
                  </Item>
                </Grid>
              </Grid>
            </>
          ) : (
            <></>
          )}

          <Item>
            <Tabs value={selectedShopping} onChange={handleShoppingSelect} indicatorColor="primary" textColor="secondary">
              <Tab value="#armor" href={`/#/shopSheet/${params.id}#armor`} label="Armor" />
              <Tab value="#weapons" href={`/#/shopSheet/${params.id}#weapons`} label="Weapons" />
              <Tab value="#grenades" href={`/#/shopSheet/${params.id}#grenades`} label="Grenades" />
              <Tab value="#other" href={`/#/shopSheet/${params.id}#other`} label="Other Gear" />
              <Tab value="#pharma" href={`/#/shopSheet/${params.id}#pharma`} label="Pharma" />
              {charDetail.netrunner > 0 && <Tab value="#netrunner" href={`/#/shopSheet/${params.id}#netrunner`} label="Netrunner" />}
              <Tab value="#cyberware" href={`/#/shopSheet/${params.id}#cyberware`} label="Cyberware" />
              <Tab value="#vehicles" href={`/#/shopSheet/${params.id}#vehicles`} label="Vehicles" />
              <Tab value="#clothes" href={`/#/shopSheet/${params.id}#clothes`} label="Clothing" />
            </Tabs>
          </Item>

          {selectedShopping === '#armor' ? (
            <>
              <ArmorOwnedTable
                charGear={charGear}
                setCharGear={setCharGear}
                charDetail={charDetail}
                setCharDetail={setCharDetail}
                setPageAlert={setPageAlert}
                loading={loading}
                setLoading={setLoading}
                chuckError={chuckError}
              />
              <ArmorMasterTable
                masterArmor={masterGear.armor}
                charGear={charGear}
                setCharGear={setCharGear}
                charDetail={charDetail}
                setCharDetail={setCharDetail}
                setPageAlert={setPageAlert}
                loading={loading}
                setLoading={setLoading}
                chuckError={chuckError}
              />
            </>
          ) : (
            <></>
          )}

          {selectedShopping === '#weapons' ? (
            <>
              <WeaponsOwnedTable
                charGear={charGear}
                setCharGear={setCharGear}
                charDetail={charDetail}
                setCharDetail={setCharDetail}
                setPageAlert={setPageAlert}
                loading={loading}
                setLoading={setLoading}
                chuckError={chuckError}
              />
              <WeaponsMasterTable
                masterWeapons={masterGear.weapons}
                charGear={charGear}
                setCharGear={setCharGear}
                charDetail={charDetail}
                setCharDetail={setCharDetail}
                setPageAlert={setPageAlert}
                loading={loading}
                setLoading={setLoading}
                chuckError={chuckError}
              />
            </>
          ) : (
            <></>
          )}

          {selectedShopping === '#grenades' && charGear.grenades.length > 0 ? (
            <>
              <GrenadeOwnedTable
                charGear={charGear}
                setCharGear={setCharGear}
                charDetail={charDetail}
                setCharDetail={setCharDetail}
                setPageAlert={setPageAlert}
                loading={loading}
                setLoading={setLoading}
                chuckError={chuckError}
              />
              <GrenadeMasterTable
                masterGrenades={masterGear.grenades}
                charGear={charGear}
                setCharGear={setCharGear}
                charDetail={charDetail}
                setCharDetail={setCharDetail}
                setPageAlert={setPageAlert}
                loading={loading}
                setLoading={setLoading}
                chuckError={chuckError}
              />
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
        <SnackbarComponent
          open={pageAlert.open}
          message={pageAlert.message}
          severity={pageAlert.severity}
          onClose={() => setPageAlert({ open: false, message: '', severity: '' })}
        />
      </>
    );
  }
}

export default ShoppingSheet;
