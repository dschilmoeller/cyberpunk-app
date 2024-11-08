import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Grid, Select, MenuItem } from '@mui/material';
import { getComparator, stableSort, EnhancedTableHead, headCellsGenerator } from './GameMasterGearComps/tableFuncs.service';

import { gmCharFetchRequest, fetchCampaignListRequest } from './gm.services';

export default function GameMasterLanding() {
  const history = useHistory();
  const [characterList, setCharacterList] = useState([]);
  const [campaignList, setCampaignList] = useState([]);

  const fetchGameMasterCharacters = async () => {
    try {
      const gmCharList = await gmCharFetchRequest();
      setCharacterList(gmCharList);
    } catch (error) {
      console.error('Error fetching GM page characters:', error);
    }
  };

  const fetchCampaigns = async () => {
    try {
      const inFuncCampaignList = await fetchCampaignListRequest();
      setCampaignList(inFuncCampaignList);
    } catch (error) {
      console.error('Error fetching campaign list:', error);
    }
  };

  const euroBuck = `\u20AC$`;

  useEffect(() => {
    fetchGameMasterCharacters();
    fetchCampaigns();
  }, []);

  const commaTizer = (incoming) => {
    if (incoming === undefined) {
      return 0;
    } else {
      return incoming.toLocaleString();
    }
  };

  const [campaign, setCampaign] = useState(0);
  const [campaignName, setCampaignName] = useState('');

  const changeCampaign = (value) => {
    if (value == 0) {
      setCampaignName('All Campaigns');
      setCampaign(value);
    } else {
      campaignList.map((campaign) => {
        {
          if (value == campaign.campaign_id) {
            setCampaignName(campaign.campaign_name);
          }
          setCampaign(value);
        }
      });
    }
  };

  const headCells = headCellsGenerator(['handle', 'player', 'perception', 'reflexes', 'humanityLoss', 'availableExp', 'bank']);

  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('price');

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  function createTableData(id, handle, player, campaign, perception, reflexes, humanityLoss, availableExp, bank) {
    return {
      id,
      handle,
      player,
      campaign,
      perception,
      reflexes,
      humanityLoss,
      availableExp,
      bank,
    };
  }

  const characterDataRows = [];

  for (let i = 0; i < characterList.length; i++) {
    let perc = characterList[i].cool + characterList[i].cyber_cool + characterList[i].perception;
    let totalReflexees = characterList[i].reflexes + characterList[i].cyber_reflexes;
    let remainingHumanity = 40 - characterList[i].perm_humanity_loss - characterList[i].temp_humanity_loss;
    let availableExp = characterList[i].max_xp - characterList[i].spent_xp;

    // return finalized weapon data (allows range and damage to sort properly)
    characterDataRows.push(
      createTableData(
        characterList[i].id,
        characterList[i].handle,
        characterList[i].player,
        characterList[i].campaign,
        perc,
        totalReflexees,
        remainingHumanity,
        availableExp,
        characterList[i].bank
      )
    );
  }

  // sort and monitor changes.
  const sortedCharacterListRows = React.useMemo(() => stableSort(characterDataRows, getComparator(order, orderBy)), [order, orderBy, characterList]);

  return (
    <>
      <Grid container>
        <Grid item xs={6} padding={1}>
          <Button fullWidth variant="contained" onClick={() => history.push('/gamemastercontacts/')}>
            Manage Contacts
          </Button>
        </Grid>
        <Grid item xs={6} padding={1}>
          <Button fullWidth variant="contained" color="error">
            Button #2
          </Button>
        </Grid>
        <Grid item xs={6} padding={1}>
          <Button fullWidth variant="contained" color="error">
            Manage Campaigns
          </Button>
        </Grid>
        <Grid item xs={6} padding={1}>
          <Button fullWidth variant="contained" color="error">
            Buton #4
          </Button>
        </Grid>

        {/* <Grid item xs={6} padding={1}> */}
        <Grid item xs={12}>
          <h2>Select Campaign</h2>
        </Grid>
        <Grid item xs={12}>
          <Select value={campaign} fullWidth onChange={(e) => changeCampaign(e.target.value)}>
            {
              <MenuItem key={0} value={0}>
                All Campaigns
              </MenuItem>
            }
            {campaignList.map((campaign) => {
              return (
                <MenuItem key={campaign.campaign_id} value={campaign.campaign_id}>
                  {campaign.campaign_name}
                </MenuItem>
              );
            })}
          </Select>
        </Grid>
        {/* </Grid> */}
      </Grid>

      <h2>Select Character to Review</h2>

      {characterList.length ? (
        <>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
              <EnhancedTableHead headCells={headCells} order={order} orderBy={orderBy} onRequestSort={handleRequestSort} />

              {sortedCharacterListRows.map((character) => {
                if (character.campaign == campaign || campaign == 0) {
                  return (
                    <React.Fragment key={character.id}>
                      <TableBody>
                        <TableRow hover>
                          <TableCell align="center">
                            <Button fullWidth variant="contained" sx={{ m: 1 }} onClick={() => history.push(`/gamemastersheet/${character.id}`)}>
                              {character.handle}
                            </Button>
                          </TableCell>
                          <TableCell align="center">{character.player}</TableCell>
                          <TableCell align="center">{character.perception}</TableCell>
                          <TableCell align="center">{character.reflexes}</TableCell>
                          <TableCell align="center">{character.humanityLoss}</TableCell>
                          <TableCell align="center">{character.availableExp}</TableCell>
                          <TableCell align="center">
                            {euroBuck}
                            {commaTizer(character.bank)}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </React.Fragment>
                  );
                }
              })}
            </Table>
          </TableContainer>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
