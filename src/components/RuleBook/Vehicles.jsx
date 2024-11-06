import { Grid } from '@mui/material';
import Typography from '@mui/material/Typography';

export default function RulebookVehicles() {
  return (
    <>
      <Grid container padding={1} spacing={1}>
        <Grid item xs={12}>
          <Typography variant="h4">Vehicles</Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="p">
            <b>Using a Vehicle</b>
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="p">
            Getting into and starting a vehicle requires a full round - the
            character can start driving on the next turn after getting into the
            vehicle. This is for reasons of Realism, and may be waived by the GM
            if annoying.
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="p">
            Piloting a vehicle is usually a Reflexes (manual control) or
            Technique (when using Interface Plugs) test + the appropriate
            piloting skill. Basic operation of a ground or sea vehicle requires
            no checks if you have at least one dot in the relevant skill, and in
            good circumstances even without any skills a character won't have
            too much trouble. Air vehicles are barely less friendly in the
            modern era, and most can be operated without killing everyone on
            board at least to the nearest flat piece of ground.
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="p">
            Maneuvers and complex actions generally require a vehicle test, with
            a difficulty assigned by the GM. The GM further has final say on
            whether certain maneuvers can be performed by a character without
            the appropriate skill.
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="p">
            Using a weapon or attempting to do anything else while driving all
            require the appropriate piloting skill, and generally results in a
            divided dice pool - select the lower of the two skill pools, and
            divide the dice from that pool between piloting and whatever else is
            happening. Even routine driving may require a check depending on
            what else the character is doing.
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="p">
            <b>Ramming:</b>
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="p">
            Ramming another vehicle deals a number of lethal wounds equal to the
            vehicles armor to BOTH the ramming vehicle and the target vehicle.
            This can be increased by high speed and other factors. The driver
            and passengers also suffer a number of stun wounds (at least)
            determined by the GM. Ramming a pedestrian deals a number of lethal
            wounds equal to the vehicles structure, and the vehicle takes a
            number of wounds equal to the number of the pedestrians cyberlimbs.
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="p">
            <b>Interface Plugs:</b>
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="p">
            Interface plugs allow, amongst other things, operating a vehicle
            with one's mind. This allows for some rather flashy maneuvers,
            though there's always a risk of dangerous feedback.
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="p">
            Multi-tasking is made much easier - characters connected via
            Interface Plugs doing multiple actions divide the LARGER of their
            two die pools for actions. The smaller of these pools cannot be
            above its normal maximum - so if a character is driving (die pool 8)
            and firing a gun (die pool 6) they split 8 dice, but they can only
            use 6 dice to shoot their weapon.
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="p">
            Motorcyclists using interface plugs can make their bike do some
            wholly unnatural things - a character operating any kind of
            motorcycle with Interface Plugs is treated as on foot, and uses the
            highest attribute available when making tests - they can use the
            bike's health in place of their Body stat, the bike's Move in place
            of their normal Move attribute, and the bike's armor in place of
            their normal one, as they desire. Aimed shots can hit the operator
            as normal, but suffer a +1 DV above and beyond the normal Aimd Shot
            rules.
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="p">
            Feedback - If a character is connected via Interface Plugs and the
            first half of the vehicles damage track is filled, they immediately
            suffer 4 unsoakable lethal wounds. If the second half of the track
            fills, they immediately suffer 4 unsoakable aggravated wounds. If
            something sufficiently catastrophic happens that fills the damage
            track in a single hit, the character suffers the lower of the
            vehicles max health or eight in unsoakable aggravated wounds.
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="p">
            <b>Vehicle health and armor</b>
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="p">
            Vehicles generally have very large health pools. They also have 1/2
            their health value in armor as standard. Attacks on characters are
            treated as attacking the vehicle; vehicles, broadly, cannot dodge. A
            Technique + Pilot test is required to attempt to have a vehicle
            dodge an attack, and every three successes is counted as a single
            success on the dodge roll. If the driver has interface plugs, this
            is changed to two successes on a Technique + Pilot roll counting as
            a success on the dodge roll.
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="p">
            Attacking a character inside a vehicle requires a aimed shot,
            raising the DV by 2 as per normal aimed shot rules. This can be
            stacked with other aimed shot modifiers; a aimed shot to the head on
            a character in a vehicle is DV9(2+) - a base DV of 6, +2 for a aimed
            shot to hit the character in the vehicle, and an additional +2 to
            hit the character in head.
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="p">
            {/* Called shots to the tire are repeated in ActionsCombat.jsx and should be updated in tandem */}
            A vehicle's move is reduced by 1/2 when at half health or lower. An
            aimed shot to the tire that deals at least one point of damage
            (armor still applies to this attack) causes the tire to blow out,
            reducing the vehicles movement by 5 for 1 round and lowering its max
            speed appropriately (50%/tire for motorcycles, 25%/tire for cars,
            etc). The driver's next action must be a drive test to regain
            control of the vehicle.
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}
