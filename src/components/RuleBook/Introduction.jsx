import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';

export default function RulebookIntroduction() {

    return (

        <Grid container spacing={1} padding={1}>

            <Grid item xs={12}><Typography variant='h4'>Introduction</Typography></Grid>
            <Grid item xs={12}><Typography variant='p'>Cyberpumpkin is an adaptation of the Cyberpunk game. It is a role playing game aimed at an incredibly specific group of people, and is not in anyway a commercial object. The core rules are based on the World of Darkness d10 system, while the bulk of the content is derived from the core Cyberpunk game. As this ruleset is not aimed at the general public the core concepts of TTRPGs are not going to be elaborated on, and many parts pertaining only to the GM are not going to appear on this page.</Typography></Grid>
            <Grid item xs={12}><Typography variant='h4'>Core Concepts: Dice Rolling</Typography></Grid>
            <Grid item xs={12}><Typography variant='p'>Generally, the GM will tell players when to roll dice, and provide three pieces of information: the Parameters of the roll, the Type of roll is happening, and the Difficulty Value.</Typography></Grid>
            <Grid item xs={12}><Typography variant='h6'>Roll Parameters & Die Pool</Typography></Grid>
            <Grid item xs={12}><Typography variant='p'>Most rolls will consist of one or two parameters. Typically, this is an Attribute + something else, such as a skill, role ability, or other stat. The combination of a character's score in the Parameters is the number of 10 sided dice they can roll. This is commonly referred to as a Player's <b>Die Pool</b>.</Typography></Grid>
            <Grid item xs={12}><Typography variant='h6'>Roll Type</Typography></Grid>
            <Grid item xs={12}><Typography variant='p'>Rolls have two primary types: Simple and Contested. A Simple roll requires a Player to score one or more successes. A Contested roll requires a Player to score <b>more</b> successes than their opponent. Most rolls are simple outside of combat, sneaking around, and lying.</Typography></Grid>
            <Grid item xs={12}><Typography variant='h6'>Difficulty Value (DV)</Typography></Grid>
            <Grid item xs={12}><Typography variant='p'>The Difficulty Value (commonly abbreviated to DV throughout this ruleset and website) is the target on a 10 sided die roll. The 'default' difficulty value is 6. Many tasks have a higher difficulty value - 7 representing something harder than average, 9 being extremely challenging. For math reasons, a DV of 10 is not used - see Glitching and Botching, below. Likewise, some tasks are easier than others - 5 being quite simple, and 4 being the lowest a difficulty value should go - lower than that and its really not worth rolling in most cases. In cases where a difficulty would go over 10, it instead becomes 9 and a required success is added. So something that normally has a DV8 that receives a +2 DV modifier results in a DV9 (2+) - that is, a roll with a Difficulty Value of 9, requiring 2 successes to accomplish.</Typography></Grid>
            <Grid item xs={12}><Typography variant='h6'>Succeeding, Glitching and Botching</Typography></Grid>
            <Grid item xs={12}><Typography variant='p'>While rolling their die pool, any dice a Player rolls that come up equal to or higher than the Difficulty Value is called a 'success' or 'hit'. If a player rolls two 10s on a single roll, they count twice - so if a player rolls 2, 6, 10, 10 against a DV of 6 they have five hits/successes.</Typography></Grid>
            <Grid item xs={12}><Typography variant='p'>However, any dice that comes up as a 1 is called a 'glitch die', 'botch die', or a '#$%*ing 1'. Each 1 subtracts a success from the total. Both successes and 1s are totaled up and reported to the GM.</Typography></Grid>
            <Grid item xs={12}><Typography variant='p'>In a Simple roll, a player simply needs more successes than 1s to succeed. In this instance, if they have 0 hits (either by rolling no 1s and no successes, or an equal number of 1s and successes) they have simply failed at whatever they are doing. If they have more successees than 1s, they have succeeded at their task (most likely - some tasks require more than one success to achieve). If their roll has MORE 1s than successes, they have Botched - not only have they failed, something else has gone wrong. Finally, if they roll and manage to score NO successes and at least one 1, they have Critically Botched - not only did they fail, but something is about to go about as wrong as humanly possible.</Typography></Grid>
            <Grid item xs={12}><Typography variant='p'>In a Contested roll, things are similar - the player wants to roll as many hits as possible and avoid 1s. The key difference is that they may need more than 1 success - the number is determined by how many successes their opponent got on their roll. Both botches and hits are tracked, until either the character has MORE botches than hits, or enough hits to achieve their target after accounting for any botches. See below for examples.</Typography></Grid>
            <Grid item xs={12}>
                <Typography variant='p'><i>Examples:</i></Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant='p'><i>Simple Roll: Tahei is trying to find a place to crash on the streets. The GM determines the Parameters of the roll to be Intelligence & Streetwise. Tahei's player consults his sheet, and notes his total - 5 dice. As he is in a relatively decent part of town, the GM declares it is a Simple roll against the standard DV (6). Tahei rolls 5 dice, and gets 1, 3, 6, 7, and 10. That's 3 hits and 1 glitch for a total of 2 successes; Tahei has successfully found an unattended nook and can sleep undisturbed.</i></Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant='p'><i>Contested Roll: Ace is trying to charm a bouncer into letting them into a Nightclub without paying the cover. The GM determines the bouncer is going to be difficult about it. The parameters are Cool + Fast Talk, which happens to be Ace's specialty - they roll a whopping 8 dice. The bouncer will be rolling Willpower + Streetwise, with a pool of 4 dice. However, Ace's DV is 7 - this is not an easy thing they're doing; while the bouncer's is only 5 - denying people entry is about half of what they do. Ace gets 1,1,3,5,6,8,8,9 - only 3 successes. The bouncer gets a 2,3,5,7 - A total of 2 successes. Ace manages to talk the bouncer into letting them into the club, but only barely.</i></Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant='p'>
                    <i>Extended Roll: Dr Chill has been kidnapped and is forced to perform a heart transplant on a Tyger Claw boss. The GM decides this will be an Extended roll - the Dr needs to get 5 total hits, but can roll Technique + Surgery as many times as it requires, with each roll representing an hour of surgery. His DV is 9, however - the task is extremly challenging. Dr Chill gets to it, rolling a 1, 2, 7, 9, and 10 - he's got 1 glitch and 2 hits. Great start.

                        <Grid item xs={12}>After an hour of in game time passes (allowing his companions to try and rescue him, or just immediately in the real world if nothing else in particular is happening), he makes another roll, and gets 1, 2, 2, 5, 6. The Dr realizes he has 2 botches and 2 hits - he's on the cusp of disaster, but in this case nothing in particular happens - he effectively has 0 hits.
                        </Grid>
                        <Grid item xs={12}>On his next roll, Dr. Chill gets a 1, 1, 5, 6, and 8 - for a total of 4 botches and 2 hits thus far. As he has more botches than hits, Dr Chill fails and the patient expires messily. Unlike most rolls, this was simply a failure - not a botch.
                        </Grid>

                    </i>
                </Typography>
            </Grid>


            <Grid item xs={12}>
                <Typography variant='h6'>
                    Grid vs Narrative play
                </Typography>

                <Typography variant='p'>
                    Cyberpumpkin can be played on a game mat; in which case events are more regulated and movement, range, and the like are easier to comprehend. Narrative play is more free-form, and puts more of an onus on the GM to describe and track what's going on; that being said it doesn't require as much prep and is faster and less tactical.
                </Typography>
            </Grid>

        </Grid>
    )
}