import React, { useState } from 'react';
import { Paper, Button, Table, TableBody, TableCell, TableContainer, TableRow, TableHead } from '@mui/material/';
import { moneyMaker } from '../../../../utils/funcs/funcs';
import { Tabs, Tab } from '@mui/material/';
import { charChangeBankRequest, charPurchaseGearRequest, charSellGearRequest } from '../../../../services/shopping.services';
export default function ShopCyberware({
  masterCyber,
  charGear,
  setCharGear,
  charDetail,
  setCharDetail,
  setPageAlert,
  loading,
  setLoading,
  chuckError,
}) {
  const [selectedList, setSelectedList] = useState('fashionware');
  const handleTabChange = (event, newValue) => {
    setSelectedList(newValue);
  };

  const buyCyberware = async (item) => {
    setLoading(true);
    const bankObj = {
      charID: charDetail.id,
      newBank: Number(charDetail.bank - item.price),
    };
    const gearObj = {
      type: 'Cyberware',
      charID: charDetail.id,
      gearID: item.cyberware_master_id,
    };
    try {
      const bankResult = await charChangeBankRequest(bankObj);
      const shopResult = await charPurchaseGearRequest(gearObj);
      if (bankResult === 'OK' && shopResult.owned_cyberware_id) {
        setCharGear({ ...charGear, cyberware: [...charGear.cyberware, shopResult] });
        setCharDetail({ ...charDetail, bank: bankObj.newBank });
        setPageAlert({ open: true, message: 'Item purchased!', severity: 'success' });
      } else {
        chuckError();
      }
    } catch (error) {
      console.error('Error buying cyberware:', error);
      setPageAlert({ open: true, message: 'Error purchasingcyberware!', severity: 'error' });
    }
    setLoading(false);
  };

  const sellCyberware = async (item) => {
    setLoading(true);
    let newBank = Number(charDetail.bank + Math.floor(item.price / 4));
    const bankObj = {
      charID: charDetail.id,
      newBank: newBank,
    };
    const itemObj = {
      type: 'Cyberware',
      gearID: item.owned_cyberware_id,
    };
    try {
      let bankResult = await charChangeBankRequest(bankObj);
      let sellResult = await charSellGearRequest(itemObj);
      if (bankResult === 'OK' && sellResult === 'OK') {
        setCharGear({ ...charGear, cyberware: charGear.cyberware.filter((e) => e.owned_cyberware_id != item.owned_cyberware_id) });
        setCharDetail({ ...charDetail, bank: newBank });
        setPageAlert({ open: true, message: 'Cyberware Sold!', severity: 'success' });
      } else {
        chuckError();
      }
    } catch (error) {
      console.error('Error selling cyberware:', error);
      setPageAlert({ open: true, message: 'Error selling cyberware!', severity: 'error' });
    }
    setLoading(false);
  };

  return (
    <>
      <Tabs value={selectedList} onChange={handleTabChange} indicatorColor="primary" textColor="secondary">
        <Tab value="fashionware" label="Fashionware" />
        <Tab value="neuralware" label="Neuralware" />
        <Tab value="cyberoptics" label="Cyberoptics" />
        <Tab value="cyberaudio" label="Cyberaudio" />
        <Tab value="internalware" label="Internalware" />
        <Tab value="externalware" label="Externalware" />
        <Tab value="cyberarm" label="Cyberarm" />
        <Tab value="cyberleg" label="Cyberleg" />
        <Tab value="borgware" label="Borgware (Beta)" />
      </Tabs>

      <h2>My Cyberware</h2>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow hover>
              <TableCell align="left">Name</TableCell>
              <TableCell align="center">Description</TableCell>
              <TableCell align="center">Humanity Cost</TableCell>
              <TableCell align="center">Install Requirement</TableCell>
              <TableCell align="center">Street Price</TableCell>
              <TableCell align="center">Sell</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {charGear.cyberware.map((item) => {
              if (item.equipped === false && item.type === selectedList) {
                return (
                  <React.Fragment key={item.owned_cyberware_id}>
                    <TableRow hover>
                      <TableCell align="left">{item.name} </TableCell>
                      <TableCell align="center">{item.description}</TableCell>
                      <TableCell align="center">
                        {item.humanity_loss_min} - {item.humanity_loss_max}
                      </TableCell>
                      <TableCell align="center">{item.install_level}</TableCell>
                      <TableCell align="center">{moneyMaker(Math.floor(item.price / 4))}</TableCell>
                      <TableCell align="center">
                        <Button variant={loading === false ? 'contained' : 'disabled'} color="error" onClick={() => sellCyberware(item)}>
                          Sell
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

      <h2>Buy Cyberware</h2>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow hover>
              <TableCell align="left">Name</TableCell>
              <TableCell align="center">Description</TableCell>
              <TableCell align="center">Humanity Cost</TableCell>
              <TableCell align="center">Install Requirement</TableCell>
              <TableCell align="center">Price</TableCell>
              <TableCell align="center">Buy</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {masterCyber.map((item) => {
              if (item.is_treasure != true) {
                return (
                  <React.Fragment key={item.cyberware_master_id}>
                    {item.type === selectedList ? (
                      <React.Fragment key={item.cyberware_master_id}>
                        <TableRow hover>
                          <TableCell align="left">{item.name} </TableCell>
                          <TableCell align="center">{item.description}</TableCell>
                          <TableCell align="center">
                            {item.humanity_loss_min} - {item.humanity_loss_max}
                          </TableCell>
                          <TableCell align="center">{item.install_level}</TableCell>
                          <TableCell align="center">{moneyMaker(Math.floor(item.price))}</TableCell>
                          <TableCell align="center">
                            <Button variant={loading === false ? 'contained' : 'disabled'} color="success" onClick={() => buyCyberware(item)}>
                              Buy
                            </Button>
                          </TableCell>
                        </TableRow>
                      </React.Fragment>
                    ) : (
                      <></>
                    )}
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
