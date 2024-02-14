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

// add toast & custom text
// improving clothing of certain rank/quality improves cool/appearance/etc -> show in display somehow.

export default function AdvancementClothes() {
  const history = useHistory();
  const dispatch = useDispatch();
  const params = useParams();
  const characterClothes = useSelector((store) => store.advancementGear.clothes);
  const charDetail = useSelector((store) => store.advancementDetail);

  // need something different to happen if equipping clothes when already have some equipped - going off numbers present when page is loaded.
  // need to convert payload.quality changes to just be a flat number and the reducer to deal with +/-
  // will probably need attribute-enhancing and attribute-lowering dispatches as well.

  const equipClothes = (incomingClothing) => {
    characterClothes.map(clothing => {
      if (clothing.equipped === true) {
        unequipClothes(clothing)
      }
    })

    if (incomingClothing.rank > 4 && incomingClothing.rank < 10) {
      dispatch({ type: "ATTRIBUTE_ENHANCING_CYBERWARE_EQUIPPED", payload: { type: "cyber_appearance", quality: 1 }, });
    } else if (incomingClothing.rank === 10) {
      dispatch({ type: "ATTRIBUTE_ENHANCING_CYBERWARE_EQUIPPED", payload: { type: "cyber_appearance", quality: 2 }, });
      dispatch({ type: "ATTRIBUTE_ENHANCING_CYBERWARE_EQUIPPED", payload: { type: "cyber_cool", quality: 1 }, });
    }
    dispatch({ type: "EQUIP_CLOTHES", payload: incomingClothing });
  };

  const unequipClothes = (incomingClothing) => {
    if (incomingClothing.rank > 4 && incomingClothing.rank < 10) {
      dispatch({ type: "ATTRIBUTE_ENHANCING_CYBERWARE_EQUIPPED", payload: { type: "cyber_appearance", quality: -1 }, });
    } else if (incomingClothing.rank === 10) {
      dispatch({ type: "ATTRIBUTE_ENHANCING_CYBERWARE_EQUIPPED", payload: { type: "cyber_appearance", quality: -2 }, });
      dispatch({ type: "ATTRIBUTE_ENHANCING_CYBERWARE_EQUIPPED", payload: { type: "cyber_cool", quality: -1 }, });
    }

    dispatch({ type: "UNEQUIP_CLOTHES", payload: incomingClothing });

    return true;
  };
// history.push(`/shopSheet/${78}`
  return (
    <>
      <h1>Current Clothing - Clothes can modified in the <Button
      variant="contained"
      onClick={()=> history.push(`/shopSheet/${params.id}`)}
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
      <h3>
        Clothes of Rank 5+ give you a bonus to Cool - because you look good and
        you know it, baby.
      </h3>
      <h3>
        Clothes of rank 10 give a special bonus, but only the finest clothing
        can be improved that far.
      </h3>
    </>
  );
}
