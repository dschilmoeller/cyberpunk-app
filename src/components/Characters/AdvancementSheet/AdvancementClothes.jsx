import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import { Button } from "@mui/material";
import { Grid } from '@mui/material';

// add toast & custom text

export default function AdvancementClothes() {
  const history = useHistory();
  const dispatch = useDispatch();
  const params = useParams();
  const characterClothes = useSelector((store) => store.advancementGear.clothes);
  const charDetail = useSelector((store) => store.advancementDetail);

  const equipClothes = (incomingClothing) => {
    characterClothes.map(clothing => {
      if (clothing.equipped === true) {
        unequipClothes(clothing)
      }
    })

    if (incomingClothing.rank > 4 && incomingClothing.rank < 10) {
      dispatch({ type: "ATTRIBUTE_ENHANCING_GEAR_EQUIPPED", payload: { type: 'cyber_appearance', change: 1, charID: charDetail.id } })
    } else if (incomingClothing.rank === 10) {
      dispatch({ type: "ATTRIBUTE_ENHANCING_GEAR_EQUIPPED", payload: { type: 'cyber_appearance', change: 2, charID: charDetail.id } })
      dispatch({ type: "ATTRIBUTE_ENHANCING_GEAR_EQUIPPED", payload: { type: 'cyber_cool', change: 1, charID: charDetail.id } })
    }
    dispatch({ type: "CHANGE_GEAR_EQUIP_STATUS", payload: { item: incomingClothing, charID: charDetail.id, table: 'char_clothing_bridge', tablePrimaryKey: 'clothing_bridge_id', tableID: incomingClothing.clothing_bridge_id, equipStatus: true } });
  };

  const unequipClothes = (incomingClothing) => {
    if (incomingClothing.rank > 4 && incomingClothing.rank < 10) {
      dispatch({ type: "ATTRIBUTE_ENHANCING_GEAR_EQUIPPED", payload: { type: 'cyber_appearance', change: -1, charID: charDetail.id } })
    } else if (incomingClothing.rank === 10) {
      dispatch({ type: "ATTRIBUTE_ENHANCING_GEAR_EQUIPPED", payload: { type: 'cyber_appearance', change: -2, charID: charDetail.id } })
      dispatch({ type: "ATTRIBUTE_ENHANCING_GEAR_EQUIPPED", payload: { type: 'cyber_cool', change: -1, charID: charDetail.id } })
    }

    dispatch({ type: "CHANGE_GEAR_EQUIP_STATUS", payload: { item: incomingClothing, charID: charDetail.id, table: 'char_clothing_bridge', tablePrimaryKey: 'clothing_bridge_id', tableID: incomingClothing.clothing_bridge_id, equipStatus: false } });
    return true;
  };

  return (
    <>
      <h1>Current Clothing - Outfits can be upgraded in the <Button
        variant="contained"
        onClick={() => history.push(`/shopSheet/${params.id}#clothes`)}
      >Shopping Area!</Button></h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow hover>
              <TableCell align="left">Name</TableCell>
              <TableCell align="center">Description</TableCell>
              <TableCell align="center">Rank</TableCell>
              <TableCell align="center">Unequip</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {characterClothes.map((item, i) => {
              if (item.equipped === true) {
                return (
                  <TableRow hover key={i}>
                    <TableCell align="left">{item.name}</TableCell>
                    <TableCell align="center">{item.description}</TableCell>

                    <TableCell align="center">{item.rank}</TableCell>
                    <TableCell align="center">
                      <Button onClick={() => unequipClothes(item)}>
                        Unequip
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              }
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Grid container>
        <Grid item xs={12} paddingLeft={2} paddingRight={2}>
          <h4>
            Clothes of Rank 5+ give you a +1 bonus to Appearance Attribute. Clothes of Rank 10 give a bonus to Appearance and Cool - there's confidence that comes with that amount of style.
          </h4>
        </Grid>
      </Grid>

      <h1>Owned Clothing</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow hover>
              <TableCell align="left">Name</TableCell>
              <TableCell align="center">Description</TableCell>
              <TableCell align="center">Rank</TableCell>
              <TableCell align="center">Unequip</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {characterClothes.map((item, i) => {
              if (item.equipped === false) {
                return (
                  <TableRow hover key={i}>
                    <TableCell align="left">{item.name}</TableCell>
                    <TableCell align="center">{item.description}</TableCell>
                    <TableCell align="center">{item.rank}</TableCell>
                    <TableCell align="center">
                      <Button onClick={() => equipClothes(item)}>Equip</Button>
                    </TableCell>
                  </TableRow>
                );
              }
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
