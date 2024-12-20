import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import { useSelector, useDispatch } from 'react-redux';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import Typography from '@mui/material/Typography';
import Item from '../Characters/CharacterSheet/Item';
import { Grid } from '@mui/material';

import { Button } from '@mui/material';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';

function TransitionUp(props) {
  return <Slide {...props} direction="up" />;
}

export default function CreationCyberware() {
  window.scrollTo({ top: 0, behavior: 'smooth' });

  const dispatch = useDispatch();

  const cyberware = useSelector((store) => store.gearMaster.cyberware);
  const charCyberware = useSelector(
    (store) => store.characterCreation.cyberware
  );
  const cyberbucks = useSelector((store) => store.characterCreation.cyberbucks);
  const [selectedList, setSelectedList] = useState('fashionware');
  const [bank, setBank] = useState(cyberbucks);

  const euroBuck = `\u20AC$`;

  const [showSnackbar, setShowSnackbar] = React.useState(false);
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleChange = (event, newValue) => {
    setSelectedList(newValue);
  };

  const cyberwareTableList = [];
  const cyberwareTableBuilder = () => {
    const createCyberwareData = (
      cyberware_master_id,
      name,
      price,
      description,
      humanity_loss_min,
      humanity_loss_max,
      install_level,
      type
    ) => {
      return {
        cyberware_master_id,
        name,
        price,
        description,
        humanity_loss_min,
        humanity_loss_max,
        install_level,
        type,
      };
    };
    for (let i = 0; i < cyberware.length; i++) {
      cyberwareTableList.push(
        createCyberwareData(
          cyberware[i].cyberware_master_id,
          cyberware[i].name,
          cyberware[i].price,
          cyberware[i].description,
          cyberware[i].humanity_loss_min,
          cyberware[i].humanity_loss_max,
          cyberware[i].install_level,
          cyberware[i].type
        )
      );
    }
  };

  cyberwareTableBuilder();

  const purchaseCyberware = (price, index) => {
    if (bank >= price) {
      setBank(bank - price);
      dispatch({
        type: 'CREATION_BUY_CYBERWARE',
        payload: index,
        newBank: bank - price,
      });
    } else {
      setShowSnackbar(true);
    }
  };

  const sellCyberware = (price, index) => {
    setBank(bank + price);
    dispatch({
      type: 'CREATION_SELL_CYBERWARE',
      payload: index,
      newBank: bank + price,
    });
  };

  const savePurchases = () => {
    dispatch({ type: 'SET_CREATION_STEP', payload: 'review' });
    dispatch({ type: 'CREATION_REVIEW_REACHED' });
  };

  return (
    <>
      <Snackbar
        TransitionComponent={TransitionUp}
        autoHideDuration={2000}
        open={showSnackbar}
        onClose={() => setShowSnackbar(false)}
        anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
      >
        <Alert
          onClose={() => setShowSnackbar(false)}
          severity="warning"
          sx={{ width: '100%' }}
        >
          Insufficient Funds!
        </Alert>
      </Snackbar>

      <Grid container display={'flex'} justifyContent={'center'} spacing={1}>
        <Grid item xs={12}>
          <Item sx={{ height: 1 }}>
            <Typography variant="h4">
              Cash on Hand: {euroBuck}
              {bank}{' '}
              <Button fullWidth onClick={() => savePurchases()}>
                Save Purchases
              </Button>
            </Typography>
          </Item>
        </Grid>
        <Grid item xs={12}>
          <Item sx={{ height: 1 }}>Remember: You can't take it with you.</Item>
        </Grid>
        <Grid item xs={12}>
          <Item sx={{ height: 1 }}>
            Note: All Cyberware must be manually equipped after character
            creation.
          </Item>
        </Grid>
      </Grid>

      <TableContainer component={Paper}>
        <h3>My Cyberware</h3>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow hover>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Description</TableCell>
              <TableCell align="left">Humanity Loss</TableCell>
              <TableCell align="left">Install Requirement</TableCell>
              <TableCell align="left">Price</TableCell>
              <TableCell align="left">Return?</TableCell>
            </TableRow>
          </TableHead>
          {charCyberware.length ? (
            <>
              <TableBody>
                {charCyberware.map((item, i) => (
                  <TableRow hover key={i}>
                    <TableCell align="left">{cyberware[item].name} </TableCell>
                    <TableCell align="left">
                      {cyberware[item].description}
                    </TableCell>
                    <TableCell align="left">
                      {cyberware[item].humanity_loss_min} -{' '}
                      {cyberware[item].humanity_loss_max}
                    </TableCell>
                    <TableCell align="left">
                      {cyberware[item].install_level}
                    </TableCell>
                    <TableCell align="right">
                      {euroBuck}
                      {cyberware[item].price.toLocaleString('en-US')}
                    </TableCell>
                    <TableCell align="left">
                      <Button
                        onClick={() => sellCyberware(cyberware[item].price, i)}
                      >
                        Return
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </>
          ) : (
            <></>
          )}
        </Table>
      </TableContainer>

      <Tabs
        value={selectedList}
        onChange={handleChange}
        indicatorColor="secondary"
      >
        <Tab value="fashionware" label="Fashionware" />
        <Tab value="neuralware" label="Neuralware" />
        <Tab value="cyberoptics" label="Cyberoptics" />
        <Tab value="cyberaudio" label="Cyberaudio" />
        <Tab value="internalware" label="Internalware" />
        <Tab value="externalware" label="Externalware" />
        <Tab value="cyberarm" label="Cyberarm" />
        <Tab value="cyberleg" label="Cyberleg" />
        <Tab value="borgware" label="Borgware" />
      </Tabs>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow hover>
              <TableCell>Name</TableCell>
              <TableCell align="left">Description</TableCell>
              <TableCell align="left">Humanity Loss</TableCell>
              <TableCell align="left">Install Requirement</TableCell>
              <TableCell align="left">Price</TableCell>
              <TableCell align="left">Purchase?</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cyberwareTableList.map((row, i) => {
              // cycle through list and do not render items not of type selected and those that cost too much
              if (row.price < 5000 && row.type === selectedList) {
                return (
                  <React.Fragment key={i}>
                    <TableRow hover key={i}>
                      <TableCell>{row.name} </TableCell>
                      <TableCell align="left">{row.description}</TableCell>
                      <TableCell align="left">
                        {row.humanity_loss_min} - {row.humanity_loss_max}
                      </TableCell>
                      <TableCell align="left">{row.install_level}</TableCell>
                      <TableCell align="right">
                        {euroBuck}
                        {row.price.toLocaleString('en-US')}
                      </TableCell>
                      <TableCell align="left">
                        <Button onClick={() => purchaseCyberware(row.price, i)}>
                          Purchase
                        </Button>
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                );
              }
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
