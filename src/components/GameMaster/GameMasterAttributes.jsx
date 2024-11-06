import React from 'react';
import { Button } from '@mui/material';

import Grid from '@mui/material/Grid';
import Item from '../Characters/CharacterSheet/Item';

import AttributesDialog from '../Modals/AttributesDialog';
import { AttributesArr } from '../../utils/objects/objects.utils';
import { capitalizer, dotReturn } from '../../utils/funcs/funcs';

import { changeCharacterAttribute } from './gm.services';

export default function GameMasterAttributes({ charDetail, setCharDetail, setPageAlert, loading, setLoading, chuckError }) {
  const changeAttribute = async (attribute, max, change) => {
    setLoading(true);
    const fixedAtt = attributeFixer(attribute);
    // is attribute to be changed + change less than maximum & >0
    if (charDetail[fixedAtt] + change > max || charDetail[fixedAtt] + change <= 0) {
      setPageAlert({
        open: true,
        message: 'Task Failed Successfully',
        severity: 'error',
      });
      setLoading(false);
    } else {
      try {
        let attributeObj = {
          attribute: fixedAtt,
          newScore: charDetail[fixedAtt] + change,
          charID: charDetail.id,
        };
        let result = await changeCharacterAttribute(attributeObj);
        if (result === 'OK') {
          setCharDetail({
            ...charDetail,
            [fixedAtt]: charDetail[fixedAtt] + change,
          });
          setLoading(false);
        }
      } catch (error) {
        console.error('Error:', error);
        chuckError();
      }
    }
  };

  const attributeFixer = (attributeName) => {
    if (attributeName === 'street cred') {
      return 'street_cred';
    } else if (attributeName === 'luck') {
      return 'max_luck';
    } else {
      return attributeName;
    }
  };

  return (
    <>
      <Grid container paddingTop={3} spacing={1} alignContent={'center'}>
        {AttributesArr.map((stat, i) => {
          return (
            <React.Fragment key={i}>
              {i % 3 === 0 ? <Grid item xs={12} /> : <></>}
              <Grid xs={3} item>
                <Item>
                  <AttributesDialog prop={capitalizer(stat[0])} />
                </Item>
              </Grid>
              <Grid xs={3} item>
                <Item>
                  {charDetail[stat[2]]
                    ? stat[2].includes('cyber')
                      ? dotReturn(charDetail[stat[0]], stat[1], true, charDetail[stat[2]])
                      : dotReturn(charDetail[stat[2]], stat[1], false)
                    : dotReturn(charDetail[stat[0]], stat[1], false)}
                </Item>
              </Grid>
              <Grid xs={3} item>
                <Item>
                  <Button disabled={loading} variant="contained" color="success" onClick={() => changeAttribute(stat[0], stat[1], 1)}>
                    Increase
                  </Button>
                </Item>
              </Grid>
              <Grid xs={3} item>
                <Item>
                  <Button disabled={loading} variant="contained" color="error" onClick={() => changeAttribute(stat[0], stat[1], -1)}>
                    Decrease
                  </Button>
                </Item>
              </Grid>
            </React.Fragment>
          );
        })}
      </Grid>
    </>
  );
}
