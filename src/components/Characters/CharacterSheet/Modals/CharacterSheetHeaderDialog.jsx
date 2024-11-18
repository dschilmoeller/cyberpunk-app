import * as React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Typography } from '@mui/material';

export default function CharacterSheetHeaderDialog({ prop }) {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const dialogText = (prop) => {
    switch (prop) {
      case 'Contacts':
        // The bulk of this should be moved into either an accordion, grid, otherwise prettied up, and/or moved to the rulebook.
        return (
          <>
            <Grid container fontFamily={'serif'}>
              <Grid item padding={1} xs={12}>
                Contacts are people with information, resources, and/or skills you've met on your journey.
              </Grid>
              <Grid item padding={1} xs={12}>
                Contacts consist of:
              </Grid>
              <Grid item padding={1} xs={12}>
                The Contact's name or street handle.
              </Grid>
              <Grid item padding={1} xs={12}>
                Connection - How plugged in, resourceful, or skilled they are. This is determined by the GM, but can be affected by player actions.
                This ranges from 1 to 9.
              </Grid>
              <Grid item padding={1} xs={12}>
                Example Connection Ratings:
              </Grid>
              <Grid item paddingLeft={1} xs={12}>
                Connection 1: A locksmith able to assist with simple locks in their neighborhood with some advance notice. A fence with a with a
                better selection of gear than the local dumpster on good day. A fixer who can arrange a meet with a street level gang tough, or get a
                hold of moderately illegal gear.
              </Grid>
              <Grid item paddingLeft={1} xs={12}>
                Connection 3: A locksmith who can get through basic security measures in their city. A fence who can dispose of common goods, but who
                will not get a fantastic price or be able to move a lot of gear quickly. A fixer who can arrange a meeting with the head of a street
                gang, or get a hold of common but illegal gear and substances.
              </Grid>
              <Grid item paddingLeft={1} xs={12}>
                Connection 5: A security specialist who can get through sophisticated countermeasures with time to prep. A fence who can move most
                goods, though maybe not quickly. A fixer who can arrange a meeting with a regional gang's lieutenant or get a hold of just about any
                illegal equipment, given enough time to work their network.
              </Grid>
              <Grid item paddingLeft={1} xs={12}>
                Connection 7: A cat burglar who can infiltrate all but the most secure facilities easily. A fence who handles trainloads of hot goods
                regularly. A fixer who can arrange a meeting with the underboss of all but the largest gangs, or arrange the purchase a light tank.
              </Grid>
              <Grid item paddingLeft={1} xs={12}>
                Connection 9: A thief on the scale of Arsenne Lupin, Selena Kyle, or Danny Ocean. A fence who is the go-to for hocking unique and
                priceless artifacts. A fixer who can arrange a meeting with a head of state, or the leasing of a small military.
              </Grid>
              <Grid item padding={1} xs={12}>
                Loyalty - How loyal the contact is to the character. Contacts are rated 0 to 9. Please note contacts can have very different
                relationships with various characters, including those in the same party!
              </Grid>
              <Grid item padding={1} xs={12}>
                Example Loyalty Ratings:
              </Grid>
              <Grid item paddingLeft={1} xs={12}>
                Loyalty 0: This is the default rating for most contacts, and represents a purely mercenary relationship. The character will have to
                give the contact the appropriate amount of money for their services, and they are unlikely to accept favors in place of cold, hard
                cash. They are unlikely to make any special efforts or cut the PC any breaks.
              </Grid>
              <Grid item paddingLeft={1} xs={12}>
                Loyalty 1: The contact is willing to go out on a VERY small limb for the PC - a landlord might let them be late on rent once a year, a
                fixer who might accept payment at the end of the job in exchange for providing a vital piece of gear. The contact may accept a favor
                of much higher value than their service in lieu of payment.
              </Grid>
              <Grid item paddingLeft={1} xs={12}>
                Loyalty 3: The contact is willing to go through some small trouble for the PC - a landlord who just overlooks rent payments coming in
                a week or two late every month, a fixer who will front gear or even small amounts of cash to get a job done. The contact will be
                willing to trade the promise of a favor in lieu of payment, though they'll expect to come out better than the PC.
              </Grid>
              <Grid item paddingLeft={1} xs={12}>
                Loyalty 5: The contact is quite friendly, and willing to bend some exceptional effort and small risks for the PC. A landlord might
                refuse to let a PC pay a month's rent when down on their luck, a fixer who will incur debts and favors on behalf of the PC. The
                contact is happy to trade favors, and won't feel the need to keep score if they aren't screwed.
              </Grid>
              <Grid item paddingLeft={1} xs={12}>
                Loyalty 7: The contact considers the PC a close friend or ally, and will take considerable risks on their behalf - A landlord ignoring
                the PC's 4 roommates and habit of chopping up bodies in the kitchen, or a fixer who will put their own rep on the line without
                blinking to do what the PC needs done. The contact is willing to do the PC favors, including the risk of physical violence.
              </Grid>
              <Grid item paddingLeft={1} xs={12}>
                Loyalty 9: The contact considers the PC their closest family, and will unhesitatingly do just about anything they feel is required to
                serve their interests - the landlord of a typical sitcom character, or a fixer who will front the PC any item of gear or amount of
                money they have access to.
              </Grid>
              <Grid item padding={1} xs={12}>
                Description - this is a GM provided field, usually a quick reference for who the contact is and/or what they can assist with.
              </Grid>
              <Grid item padding={1} xs={12}>
                Type (fixer) (fence) (etc)
              </Grid>
              <Grid item padding={1} xs={12}>
                My Notes - this is a space for characters to write their own private notes regarding the contact.
              </Grid>
            </Grid>
          </>
        );
      case 'Weapons':
        return (
          <>
            <Grid container fontFamily={'serif'}>
              <Grid item padding={1} xs={12}>
                This is a list of <b>equipped</b> weapons a character has.
              </Grid>
              <Grid item padding={1} xs={12}>
                Weapons come in several varieties - melee, ranged, and cyberware.
              </Grid>
              <Grid item padding={1} xs={12}>
                Weapons have a number of qualities. These can be clicked through and include the following. Weapons with ammunition will also have
                buttons with the weapons functions (shoot, autofire, and reload) as well as an ammunition tracker.
              </Grid>
              <Grid item padding={1} xs={12}>
                Name - this will provide some basic details of the weapon, including any applicable special rules.
              </Grid>
              <Grid item padding={1} xs={12}>
                DMG - the weapon's base damage.
              </Grid>
              <Grid item padding={1} xs={12}>
                ROF - the weapon's rate of fire.
              </Grid>
              <Grid item padding={1} xs={12}>
                Range - the optimum range for the weapon.
              </Grid>
              <Grid item padding={1} xs={12}>
                Conceal - whether the weapon can be concealed or not.
              </Grid>
              <Grid item padding={1} xs={12}>
                Number of hands - the required number of hands to use the weapon effectively.
              </Grid>
              <Grid item padding={1} xs={12}>
                Below weapons grenades are listed; these include the name and range they can be thrown, based on the character's strength.
              </Grid>
            </Grid>
          </>
        );
      case 'Backpack':
        return (
          <>
            <Grid container fontFamily={'serif'}>
              <Grid item padding={1} xs={12}>
                This is your backpack! Miscellaneous items can be found and consumed here, including food, pharmaceuticals, and other consumables.
              </Grid>
              <Grid item padding={1} xs={12}>
                For the convenience of your GM, you can add and remove arbitrary amounts of money from your backpack as well.
              </Grid>
            </Grid>
          </>
        );
      case 'Pharmaceuticals':
        return (
          <>
            <Grid container fontFamily={'serif'}>
              <Grid item padding={1} xs={12}>
                This is a list of your pharmaceuticals! Any pharmaceutical you own can be found and used from here. Additional Pharmaceuticals can be
                made in the Role Modal or on the advancement page.
              </Grid>
            </Grid>
          </>
        );
      case 'Cyberware':
        return (
          <>
            <Grid container fontFamily={'serif'}>
              <Grid item padding={1} xs={12}>
                This is simple, alphabetical list of your equipped cyberware.
              </Grid>
            </Grid>
          </>
        );
      case 'Vehicles':
        return (
          <>
            <Grid container fontFamily={'serif'}>
              <Grid item padding={1} xs={12}>
                This lists your vehicle's vital stats, as well as their equipped mods. Vehicular weapons are also listed.
              </Grid>
            </Grid>
          </>
        );
      case 'Notes':
        return (
          <>
            <Grid container fontFamily={'serif'}>
              <Grid item padding={1} xs={12}>
                This area is for your personal notes. They can be added, edited, deleted, and favorited.
              </Grid>
              <Grid item padding={1} xs={12}>
                Notes will appear in order created; favorited notes will be at the top.
              </Grid>
            </Grid>
          </>
        );
      default:
        return 'default';
    }
  };

  return (
    <>
      <Typography variant="h5">My {prop}</Typography>
      <Button
        sx={{
          textTransform: 'none',
          color: 'white',
          '&:hover': {
            // backgroundColor: '#fff',
            color: 'lightgray',
          },
          padding: 0,
        }}
        onClick={handleClickOpen('paper')}
      >
        (?)
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        maxWidth="lg"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">{prop}</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <Grid container fontFamily={'serif'}>
            {dialogText(prop)}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
