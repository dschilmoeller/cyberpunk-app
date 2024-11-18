import React from 'react';
import { Button, Grid } from '@mui/material';
import Item from '../Item';
import OtherAttributesDialog from '../../../Modals/OtherAttributesDialog';
import { inPlayStatusChangeRequest } from '../CharInPlay.services';

import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import AcUnitIcon from '@mui/icons-material/AcUnit';

function Luck({ charDetail, charStatus, setCharStatus, loading, setLoading, chuckError, setPageAlert }) {
  const unhurtMarker = <CircleOutlinedIcon />;
  const aggMarker = <AcUnitIcon />;

  const luckBuilder = () => {
    let luckArray = [];
    for (let i = 0; i < charDetail.max_luck; i++) {
      luckArray.push(
        <React.Fragment key={i}>
          <Grid item xs={2.4}>
            <Item>{i < charStatus.current_luck_loss ? aggMarker : unhurtMarker}</Item>
          </Grid>
        </React.Fragment>
      );
    }
    return luckArray;
  };

  const changeLuck = async (change) => {
    setLoading(true);
    const luckObj = {
      ...charStatus,
      current_luck_loss: charStatus.current_luck_loss + change,
      charID: charDetail.id,
    };
    if (charStatus.current_luck_loss + change >= 0 && charStatus.current_luck_loss + change <= charDetail.max_luck) {
      try {
        let result = await inPlayStatusChangeRequest(luckObj);
        if (result === 'OK') {
          setCharStatus({
            ...charStatus,
            current_luck_loss: charStatus.current_luck_loss + change,
          });
        } else {
          chuckError;
        }
      } catch (error) {
        console.error('Error changing luck:', error);
        chuckError();
      }
    } else {
      setPageAlert({ open: true, message: 'No Bueno', severity: 'error' });
    }
    setLoading(false);
  };

  return (
    <>
      <Item>
        <OtherAttributesDialog prop={'Luck'} />
      </Item>
      <Grid container>
        <Grid item xs={6}>
          <Item>
            <Button
              variant="contained"
              disabled={loading}
              fullWidth
              sx={{
                lineHeight: 1,
                height: '125%',
                fontSize: { xs: '0.6em', md: '0.9em' },
              }}
              color="secondary"
              onClick={() => changeLuck(1)}
            >
              Use Luck
            </Button>
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item>
            <Button
              variant="contained"
              disabled={loading}
              fullWidth
              sx={{
                lineHeight: 1,
                height: '125%',
                fontSize: { xs: '0.6em', md: '0.9em' },
              }}
              color="primary"
              onClick={() => changeLuck(-1)}
            >
              Recover Luck
            </Button>
          </Item>
        </Grid>
        <Grid container>{luckBuilder()}</Grid>
        <Grid item xs={12}>
          <Item sx={{ opacity: 0 }}></Item>
        </Grid>
      </Grid>
    </>
  );
}

export default Luck;
