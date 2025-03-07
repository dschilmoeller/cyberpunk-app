import React from 'react';
import Item from '../Item';
import { Grid } from '@mui/material';
import Card from '../../../GeneralAssets/Card';
import CharacterSheetHeaderDialog from '../Modals/CharacterSheetHeaderDialog';
import VehicleCard from './VehicleCard';

export default function Vehicles({ charVehicles, charVehicleMods, loading, setLoading, setPageAlert }) {
  return (
    <>
      <Grid container>
        <Grid item xs={12} paddingBottom={2}>
          <Item>
            <CharacterSheetHeaderDialog prop={'Vehicles'} />
          </Item>
        </Grid>
      </Grid>

      <Grid container spacing={1}>
        {charVehicles.map((vehicle, i) => {
          return (
            <React.Fragment key={i}>
              <Card>
                <Grid container spacing={1}>
                  <VehicleCard
                    incomingVehicle={vehicle}
                    charVehicleMods={charVehicleMods}
                    loading={loading}
                    setLoading={setLoading}
                    setPageAlert={setPageAlert}
                  />
                </Grid>
              </Card>
            </React.Fragment>
          );
        })}
      </Grid>
    </>
  );
}
