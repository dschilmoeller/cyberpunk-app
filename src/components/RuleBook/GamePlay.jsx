import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';

export default function Gameplay() {

    return (
        <>
            <Grid container spacing={1} padding={1}>
                <Grid item xs={12}><Typography variant='h4'>Playing the Game</Typography></Grid>
                <Grid item xs={12}><Typography variant='p'>
                A typical session consists of several scenes, narrated by the Gamemaster (GM). Player Characters (PCs) play the game socially, with 2-5 players being recommended. They play Edgerunners, aka 'Runners, Mercs, or any number of other monikers more or less flattering. They have a wide variety of backgrounds and motivations, but are generally unified by some kind of mission or goal (even if it just 'Get Rich or Die Trying').</Typography></Grid>
                <Grid item xs={12}><Typography variant='p'>
                Play consists of a broader campaign, which is broken down into a series of individual sessions. Each run is further broken down into scenes; a scene is generally a short, coherent part of a story. Going to a bar and shaking down a local drunk for information, infiltrating a den of Yakuza and stealing a sword, and planting evidence in a warehouse are all examples of individual scenes. 
                </Typography></Grid>
                <Grid item xs={12}><Typography variant='p'>
                Scenes can be further broken down into rounds, but this is usually only done when timing is critical - combat, contests, and the like. During scenes, players will often be called upon to roll dice in various skill and/or attribute tests.
                </Typography></Grid>
                <Grid item xs={12}><Typography variant='p'>
                Generally, the GM will provide the structure, and players engage with the structure, pursuing their own character's goals and generally behaving as they think their character would. The GM generally has gone through the trouble of making at least a general map of what is going on. 
                </Typography></Grid>
            </Grid>
        </>
    )
}
