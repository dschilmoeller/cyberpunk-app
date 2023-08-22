import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button } from '@mui/material';

function UserPage() {
  
  const user = useSelector((store) => store.user);
  const history = useHistory();

  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <Button sx={{margin: 2}} variant='contained' onClick={()=>history.push('/characterlist')}>See Existing Characters</Button>
      <br />
      <Button sx={{margin: 2}} variant='contained' onClick={()=>history.push('/charcreation/')}>Create New Character</Button>
      <br />

      {user.user_type === 2 ? <Button sx={{margin: 2}} variant='contained' onClick={()=>history.push('/gamemaster/')}>GM Page</Button> : <></>}
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
