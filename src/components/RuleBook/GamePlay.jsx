import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';

export default function Gameplay() {

    return (
        <>
            <Grid container spacing={1} padding={1}>
                <Grid item xs={12}><Typography variant='h4'>Playing the Game</Typography></Grid>
                <Grid item xs={12}><Typography variant='p'>A typical session consists of several scenes, narrated by the Gamemaster (GM).</Typography></Grid>
            </Grid>
        </>
    )
}
