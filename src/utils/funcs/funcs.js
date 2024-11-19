const capitalizer = (string) => {
  return (string = string
    .toLowerCase()
    .split(' ')
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' '));
};

import React from 'react';
import CircleIcon from '@mui/icons-material/Circle';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import SquareIcon from '@mui/icons-material/Square';
import CheckBoxOutlineBlankOutlinedIcon from '@mui/icons-material/CheckBoxOutlineBlankOutlined';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import HorizontalRuleOutlinedIcon from '@mui/icons-material/HorizontalRuleOutlined';
import Item from '../../components/Characters/CharacterSheet/Item';
import { Grid } from '@mui/material';

const dotReturn = (charStat, max, cyber, charCyberStat) => {
  let returnedDots = [];
  for (let i = 0; i < max; i++) {
    returnedDots.push(<React.Fragment key={i}>{charStat <= i ? <CircleOutlinedIcon /> : <CircleIcon />}</React.Fragment>);
  }

  if (cyber) {
    for (let i = 0; i < 5; i++) {
      returnedDots.push(<React.Fragment key={i + 10}>{charCyberStat <= i ? <CheckBoxOutlineBlankOutlinedIcon /> : <SquareIcon />}</React.Fragment>);
    }
  }

  return returnedDots;
};

const humanityDotReturnGrid = (tempLoss, permLoss) => {
  let returnedDots = [];
  for (let i = 0; i < permLoss; i++) {
    returnedDots.push(
      <React.Fragment key={i}>
        <Grid item xs={1.2}>
          <Item>{<AcUnitIcon />}</Item>
        </Grid>
      </React.Fragment>
    );
  }

  for (let i = 0; i < tempLoss; i++) {
    returnedDots.push(
      <React.Fragment key={i + 40}>
        <Grid item xs={1.2}>
          <Item>{<HorizontalRuleOutlinedIcon />}</Item>
        </Grid>
      </React.Fragment>
    );
  }

  for (let i = 0; i < 40 - (tempLoss + permLoss); i++) {
    returnedDots.push(
      <React.Fragment key={i + 80}>
        <Grid item xs={1.2}>
          <Item>{<CircleOutlinedIcon />}</Item>
        </Grid>
      </React.Fragment>
    );
  }

  return returnedDots;
};

export { capitalizer, dotReturn, humanityDotReturnGrid };
