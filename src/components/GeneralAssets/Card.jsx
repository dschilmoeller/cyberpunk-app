import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

const Card = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#2A2025' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  fontSize: '.9em',
  fontWeight: '500',
  display: 'flex',
  justifyContent: 'center',
  alignContent: 'center',
  alignItems: 'center',
  margin: '1em',
  width: '100%',
}));

export default Card;
