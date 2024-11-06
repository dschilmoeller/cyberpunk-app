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

export { capitalizer, dotReturn };
