import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { Grid } from '@mui/material';

import { useSelector, useDispatch } from 'react-redux';

import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import HorizontalRuleOutlinedIcon from '@mui/icons-material/HorizontalRuleOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

export default function OtherAttributesDialog({ prop }) {
    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');

    const handleClickOpen = (scrollType) => () => {
        setOpen(true);
        setScroll(scrollType);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const unhurtMarker = <CircleOutlinedIcon />
    const stunMarker =  <HorizontalRuleOutlinedIcon />;
    const lethalMarker = <CloseOutlinedIcon />
    const aggMarker = <AcUnitIcon />;

    const dispatch = useDispatch();

    const burnOneLuck = (charID, max_luck) => {
        dispatch({ type: 'PLAYER_BURN_ONE_LUCK', payload: { charID, max_luck } })
    }

    const dialogText = (prop) => {
        switch (prop) {
            case 'Health':
                return (<>
                    <Grid item xs={12}>Character health is expressed in a number of boxes. Every character has a minimum of 10 health boxes. Health can be increased with different kinds of cyberware.</Grid>
                    <Grid item xs={12} paddingBottom={1}>Health is reduced by damage, also called 'wounds', which comes in three different types. Each type overwrites the previous - so a character with two stun wounds who receives a single lethal wound would now have a single lethal wound and a single stun wound. If they then take an aggravated wound, they would have a stun wound and an aggravated wound; the aggravated wound overwrites the lethal wound.</Grid>

                    <Grid item xs={3}>Damage Type</Grid>
                    <Grid item xs={9} paddingBottom={1}>Description</Grid>

                    <Grid item xs={2} display={'flex'}>Stun Damage:</Grid>
                    <Grid item xs={1} display={'flex'}>{stunMarker}</Grid>
                    <Grid item xs={9} paddingBottom={1}>Stun damage comes from clubs, fists, and other fairly superficial sources. Characters can recover from stun damage pretty quickly, recovering their Body stat in stun wounds each hour when resting.</Grid>

                    <Grid item xs={2} display={'flex'}>Lethal Damage:</Grid>
                    <Grid item xs={1} display={'flex'}>{lethalMarker}</Grid>
                    <Grid item xs={9} paddingBottom={1}>Lethal damage is far more severe than stun, and comes from blades, bullets, and many other hazards frequently encountered by Edgerunners. Characters going about their business make a Body roll each week at difficulty 6 (1s do not affect this roll); they recover a number of lethal wounds equal to the successes rolled. If a character is resting and receiving constant medical attention (4+ hours a day), this roll can be made once per day.</Grid>

                    <Grid item xs={2} display={'flex'}>Aggravated Damage:</Grid>
                    <Grid item xs={1} display={'flex'}>{aggMarker}</Grid>
                    <Grid item xs={9} paddingBottom={1}>Aggravated damage is the most severe kind of damage a character can receive, and usually comes from fire, electricity, or other extreme sources of damage. Characters cannot recover Aggravated wounds without daily medical attention (8+ hours a day); if they are receiving care they can make a body roll at difficulty 8 once per week and recover a number of aggravated wounds equal to the successes rolled.</Grid>

                    <Grid item xs={12}>Items that affect healing:</Grid>
                    <Grid item xs={12}>Speedheal: immediately roll Body vs. DV6 to recover stun or lethal wounds at a small humanity cost.</Grid>
                    <Grid item xs={12}>Cryopumps: While in a cryobag with a charged Cryopump, characters are unconscious, but no longer need to make death saves.</Grid>
                    <Grid item xs={12} paddingBottom={1}>Cryotanks: while in a Cryotank, difficulties for Body rolls to recover damage are 2 lower. They are considered to be receiving medical attention while in the tank.</Grid>

                    <Grid item xs={12} paddingBottom={1}>
                        <b>Consciousness and Dying:</b> Characters whose damage track is filled are either unconscious or dying.
                    </Grid>
                    <Grid item xs={12} paddingBottom={1}>If the last wound in the track is a Stun wound, the character is merely unconscious. The exception is characters with a Pain Editor; they can only be rendered unconscious with Lethal Damage. Generally, they cannot take further actions, and any actions they attempt are at a severe penalty. Any further stun wounds they suffer are now Lethal.</Grid>

                    <Grid item xs={12} paddingBottom={1}>Characters whose damage tracked is filled with lethal damage are <b>dying</b>. They are unconscious, and must make a <b>Death Save</b> each round. This save has an initial difficulty value of 4, but it increases by 1 for each Aggravated wound the character has suffered, to a maximum of 8. Success means they live; failure means immediate death. They can be stabilized with a First Aid (DV8) or Paramedic (DV6) roll. If successful, the character no longer needs to make Death Saves. Any further lethal wounds the character receives are instead Aggravated. Death Saves do not suffer from wound based die penalties.</Grid>

                    <Grid item xs={12} paddingBottom={1}>Characters whose last wound is Aggravated require immediate and continuing medical attention to survive. They will require a First Aid (DV9) or Paramedic (DV7) Stabilization Roll; they will need to accrue at least 3 successes to stabilize the character. The character must make a <b>Death Save</b> each round, with a base difficulty of 9. Failure on this roll results in immediate death. Any single damage source that fills a damage track with aggravated damage does no further harm; that is, a character with 2 remaining wounds who suffers 2 additional aggravated wounds is treated no differently from one who suffers 6 additional aggravated wounds. However, ANY further damage will instantly slay the character, regardless of its source or type.</Grid>

                    <Grid item xs={12} paddingBottom={1}><b>The Last Word:</b></Grid>
                    <Grid item xs={12} paddingBottom={1}>Characters who are unconscious generally can take no actions (other than Death Saves, if applicable). However, they can use their luck to roll over onto a syringe full of adrenaline, twitch their trigger finger at the right moment, or have their head bang into the eject button. The character can perform a single Standard Action that isn't moving during their turn, but to do so they must burn one point of Luck <b>permanently.</b> They do not suffer wound penalties on this roll.</Grid>

                    <Grid item xs={12} paddingBottom={1}><b>But My Body is Chrome!</b> Up to half a character's health can originate from Cyberware, so surely it can be recovered faster by the simple application of a screwdriver, right? In the interest of balance and complexity, no, it cannot. What's being injured are the delicate nerve connections to the 'ware. Ultimately, the GM has the final say on this kind of thing - if your character is a full borg and they have a spare body laying around, they might be able to recover quicker.</Grid>

                </>)
            case 'Die Penalty':
                return (<>
                    <Grid item xs={12} paddingBottom={1}>Characters suffer increasing penalties as their wound track fills up. These apply to any actions taken, and characters reduce all die pools by the indicated number of dice. This number cannot bring a pool lower than 2 dice.</Grid>
                    <Grid item xs={12} paddingBottom={1}>Characters with Pain Editor cyberware have significantly reduced die penalties. Players can also expend a point of temporary luck to remove all die penalties for one <b>action</b>, and can ignore them for a round with the use of a Stim.</Grid>
                    <Grid item xs={12} paddingBottom={1}>Die penalties do not apply to Death Saves or rolls made to recover health. Generally, any roll that uses the Body attribute is unlikely to be affected by Die Penalties.</Grid>
                </>)
            case 'Marks':
                return (<>
                    <Grid item xs={12}>Marks indicate the kind of damage a character has received, and there are four states a given health box can be in. A more severe wound overwrites a less severe one - a character with six stun wounds who receives three lethal wounds now has three stun and three lethal wounds.</Grid>
                    <Grid item xs={12} display={'flex'}>{unhurtMarker} - Unhurt: A character has suffered no damage.</Grid>
                    <Grid item xs={12} display={'flex'}>{stunMarker} - Stun: A light and easily recovered wound. Recovers at a rate of (Body) stat per hour of rest.</Grid>
                    <Grid item xs={12} display={'flex'}>{lethalMarker} - Lethal: A serious injury. Recover a rate of (successes on a Body roll at DV6) per week, or per day if receiving frequent medical attention. </Grid>
                    <Grid item xs={12} display={'flex'}>{aggMarker} - Aggravated: A very serious injury that requires medical attention to recover from. Recovered at a rate of (successes on a Body roll at DV8) per week, provided character is receiving daily medical attention.</Grid>
                </>)
            case 'Status':
            case 'Bruised':
            case 'Badly Bruised':
            case 'Hurt':
            case 'Badly Hurt':
            case 'Injured':
            case 'Wounded':
            case 'Mauled':
            case 'Seriously Mauled':
            case 'Crippled':
            case 'Incapacitated':
                return (<>
                    <Grid item xs={12}>This is shorthand for use when GM asks how injured a character is.</Grid>
                </>)

            case 'Armor':
                return (<>
                    <Grid item xs={12} paddingBottom={1}>Armor reflects a combination of worn armor, shields, and cyberware that provide some protection against injury. When receiving an injury, characters roll Body + Armor to resist the damage against a difficulty value of 6. 1s are ignored on this roll.</Grid>

                    <Grid item xs={12} paddingBottom={1}><b>Armor Ablation:</b> any attack that is not disregarded (see below) damages armor, weakening it slowly. Each hit reduces current armor by 1. Repairing armor requires the Military Tech (worn armor) or Cybertech (cyberware armor) skill to repair, along with time, materials, and an appropriate work area or tool kit.</Grid>

                    <Grid item xs={12} paddingBottom={1}>Weapons whose base damage is one third or less of a target's combined armor value cannot damage that target - their armor is simply too tough. The weapon does no damage and the armor is not ablated or degraded. A light pistol will not shoot through a heavily armored car no matter how many times it is fired. This rarely comes into play except as regards some kinds of cover and certain super-heavy cyberware.
                    </Grid>

                    <Grid item xs={12} paddingBottom={1}><b>Hardened Armor:</b> Some armor is vastly tougher than others, and is considered <i>Hardened.</i> Typically this consists of advanced military equipment, full body cyberware conversions, and military issue armor. Characters (or cover) with any amount of hardened armor ignore attacks whose base damage is 1/2 or less of their armor value rather than 1/3. Automatic weapons have a harder time rapidly degrading hardened armor, as well. Further, many attacks that would do aggravated damage to a character with normal armor are only lethal against a character with hardened armor. However, some ammunition and even specific weapons allow characters to ignore the <i>Hardened</i> property.</Grid>

                    <Grid item xs={12}>Hardened armor typically does not stack with other kinds armor - putting a kevlar jacket on over Powered Military Armor is gilding the lily somewhat. The GM has final say on whether or not armors can be worn together.</Grid>
                </>)

            case 'Luck':
                const charStatus = useSelector(store => store.characterDetail)

                return (<>
                    <Grid item xs={12} paddingBottom={1}>Luck has a number of uses for a character. Characters can expend a point of temporary luck to do any of the following. A character cannot spend more than one point of luck each round.</Grid>
                    <Grid item xs={12}><b>Just Plain Lucky:</b> A character can add a single success - basically add a die that came up 9.</Grid>
                    <Grid item xs={12}><b>Finger on the Scale:</b> A character can reroll a number of dice up to their maximum luck score. They must take the new results, including any additional 1s that come up.</Grid>
                    <Grid item xs={12}><b>Doesn't Even Sting:</b> This must be declared before rolling. A character can ignore any wound penalties they have for one turn.</Grid>
                    <Grid item xs={12}><b>Trust in The Lady:</b> Before making a roll, once per session, a character can trust in their luck and use their <b>maximum</b> luck in place of an attribute for a single roll. However, any 1s rolled are counted twice - Luck is a fickle mistress.</Grid>
                    <Grid item xs={12}><b>A Kiss While Dying:</b> Characters can also expend one point of luck <b>permanently</b> to perform a single action while incapacitated. They cannot spend temporary luck in the same turn.</Grid>
                    <Grid item xs={12} display={'flex'} justifyContent={'center'}><Button onClick={() => burnOneLuck(charStatus.id, charStatus.max_luck)}>Burn 1 Luck - This Cannot Be Undone</Button></Grid>
                </>)
            case 'Humanity':
                return (<>
                    <Grid item xs={12} paddingBottom={1}>Humanity is a measure of a character's stability, sanity, and of course, tracking their slow but inevitable slide into Cyberpsychosis. No direct penalties are associated with Humanity, but a variety of effects should be taken into consideration by the GM and players as their characters humanity dwindles.</Grid>
                    <Grid item xs={12} paddingBottom={1}>The most common way of losing humanity, temporary and otherwise, is the installation of Cyberware. However, particularly traumatic scenes and exposure to true horror can also cause a character to lose temporary humanity. Generally, it becomes harder to lose humanity as it fades away - a character with 40 humanity might lose many points if they have to shoot an innocent bystander, another with only 5 left won't even blink at doing so.</Grid>
                    <Grid item xs={12} paddingBottom={1}>Temporary humanity loss can be recovered with therapy, experience, or acts of genuine empathy and redemption. Temporary humanity recovery happens at the GMs discretion, or can purchased during character advancement with experience. Some cyberware causes humanity loss that cannot be restored until the cyberware is removed, reflecting the internal dissociation that comes with replacing parts of oneself with chrome. This is generally the minimum figure listed in the Cyberware tables.</Grid>
                    <Grid item xs={12} paddingBottom={1}>Characters with more than half their humanity missing are generally 'off' and scary to normal people, and will have higher difficulty values when interacting with them in anything but a threatening way.</Grid>
                    <Grid item xs={12} paddingBottom={1}>Characters missing 30 or more Humanity suffer from some kind of mental derangement - sociopathy is most common, but hallucinations, dissociative episodes, mistaken identity of themselves or others, and memory loss are all regular occurrences.</Grid>
                    <Grid item xs={12} paddingBottom={1}>Characters missing 40 or more humanity undergo a complete psychotic break, and are turned over to the control of the GM. If they are immediately subdued they might be able to recover, but most often this is the end of that character as anything but a dangerous opponent to themselves and everyone around them.</Grid>
                </>)
            case 'DMG':
                return (
                    <>
                        <Grid container fontFamily={'serif'}>
                            <Grid item padding={1} xs={12}></Grid>
                            <Grid item padding={1} xs={12}>This is the base damage of the weapon. Any successes beyond the one needed to hit a target are added to this number (with some exceptions) when calculating total damage done on an attack. This figure is compared to a targets armor, as well, and cannot hurt them if their armor is more than 3 times the base damage.</Grid>
                        </Grid>
                    </>
                )
            case 'ROF':
                return (<>
                    <Grid container fontFamily={'serif'}>
                        <Grid item padding={1} xs={12}>Rate of Fire determines how many times a weapon can be used to attack as part of a standard action. Attacking more than once requires splitting a character's die pool. If two or more weapons are being used, the lowest rate of fire is the one which applies.</Grid>
                    </Grid>
                </>)
            case 'Range':
                return (<>
                    <Grid container fontFamily={'serif'}>
                        <Grid item padding={1} xs={12}>Range is measured in meters. Melee weapons must be used within 1 meter of the target. In grid based play, each square is one meter. Otherwise, the GM has final say over whether a target is in range or not.</Grid>
                        <Grid item padding={1} xs={12}>Shots fired at a target 1 or 2 meters away are considered 'point blank', and have a difficulty value 1 lower than normal to hit (typically 5).</Grid>
                        <Grid item padding={1} xs={12}>Shots fired at a target 3 meters to their stated range are considered 'in range', and have no modifiers to the difficulty value (typically 6).</Grid>
                        <Grid item padding={1} xs={12}>Shots fired at a target between 1 and 2 times the weapons Range are considered 'long range', and have a difficulty value 1 higher than normal to hit (typically 7).</Grid>
                        <Grid item padding={1} xs={12}>Shots fired at a target between 2 and 3 times the weapons Range are considered 'extreme range', and have a difficulty value 3 higher than normal to hit (typically 9).</Grid>
                    </Grid>
                </>)
            case 'Number of Hands':
                return (<>
                    <Grid container fontFamily={'serif'}>
                        <Grid item padding={1} xs={12}>Range is measured in meters. Melee weapons must be used within 1 meter of the target. In grid based play, each square is one meter. Otherwise, the GM has final say over whether a target is in range or not.</Grid>
                    </Grid>
                </>)
        }
    }

    return (
        <>
            <Button sx={{
                textTransform: 'none', color: 'white', '&:hover': {
                    backgroundColor: '#fff',
                    color: '#000',
                }
            }} fullWidth onClick={handleClickOpen('paper')}>{prop}</Button>
            <Dialog
                open={open}
                onClose={handleClose}
                scroll={scroll}
                maxWidth='lg'
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
    )
}