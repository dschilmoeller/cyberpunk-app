import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { Grid } from '@mui/material';

export default function WeaponDialog({ prop }) {
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
                        <Grid item padding={1} xs={12}>Rate of Fire determines how many times a weapon can be used to attack as part of a standard action. If two or more weapons are being used, the lowest rate of fire is the one which applies.</Grid>
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

            case 'Light Melee Weapon':
            case 'Medium Melee Weapon':
            case 'Heavy Melee Weapon':
            case 'Very Heavy Melee Weapon':
                return (<>
                    <Grid container fontFamily={'serif'}>
                        <Grid item padding={1} xs={12}>From a handy rock to the finest vibro katana, melee weapons cover just about anything held in the hand that can be used as a weapon. Most melee weapons use the Melee Weapons skill; some, including most Cyberweapons, use the Exotic Weapons skill.</Grid>
                        <Grid item padding={1} xs={12}>Light Melee weapons are small, easily concealed items like pocket knives and switchblades. It can also cover small improvised weapons like rocks, broken bottles, and small sticks.</Grid>
                        <Grid item padding={1} xs={12}>Medium Melee weapons are larger, heavier, and unable to be hidden on one's person - they include things like truncheons, nunchaku, large daggers and small swords. This also covers larger improvised weapons like chairs and pool cues.</Grid>
                        <Grid item padding={1} xs={12}>Heavy Melee weapons are specialized tools of destruction - most swords, machetes, and large clubs fit into this category. Generally they are two handed propositions, though a character with 4 strength or higher can use them one handed. Only very massive or dangerous improvised weapons are considered in this category.</Grid>
                        <Grid item padding={1} xs={12}>Very Heavy Melee Weapons covers exceptionally large and/or dangerous weapons - Cyberweapons such as Mantis Blades and Gorilla Arms are dangerous enough to fit into this category; Greatswords and battle axes would be more standard weapons. No improvised weapon is considered Very Heavy unless it is effectively a weapon in it's own right, like a piece of rebar with a chunk of cement on it. Most Very Heavy weapons cannot be used effectively by characters with less than 6 strength (Cyberweapons being the exception); characters using them with 5 or lower strength have +1 difficulty on all attack rolls. A character with 9 strength or higher can use them one-handed effectively, however.</Grid>
                    </Grid>
                </>)

            case 'Light Pistol':
            case 'Heavy Pistol':
            case 'Very Heavy Pistol':
                return (<>
                    <Grid container fontFamily={'serif'}>
                        <Grid item padding={1} xs={12}>Pistols are one handed firearms, and are very nearly ubiquitous in Night City and the rest of the Cyberpunk world. They are most dangerous in the hands of a skilled shooter. Please note that machine pistols are treated as Submachine Guns. Pistols use the Firearms skill.</Grid>
                        <Grid item padding={1} xs={12}>Light Pistols are typically low caliber, high magazine weapons. They also include hold-outs and very small revolvers; they are generally not terribly accurate and only useful at very close range.</Grid>
                        <Grid item padding={1} xs={12}>Heavy Pistols are the favored weapon of law enforcement, Edgerunners, and just about everyone else who can afford one - they mix the best in range, stopping power, and magazine size.</Grid>
                        <Grid item padding={1} xs={12}>Very Heavy Pistols are favored by those looking to make a statement; the 44 Magnum or Desert Eagle being classic examples. While each shot is far more dangerous and accurate from such weapons, relatively low rates of fire and magazine size means they should only be used by experts.</Grid>
                    </Grid>
                </>)
            case 'Light SMG':
            case 'Heavy SMG':
                return (<>
                    <Grid container fontFamily={'serif'}>
                        <Grid item padding={1} xs={12}>Submachine gunss are typically cheap machine pistols or bullpup devices. They can be used one handed by most people, and can spray bullets willy nilly. Submachine Guns use the Firearms skill.</Grid>
                        <Grid item padding={1} xs={12}>SMGs do not deal additional damage if more successes than needed are scored on attack rolls - they are not especially accurate or powerful, and rely far more on quantity than quality when it comes to dealing damage.</Grid>
                        <Grid item padding={1} xs={12}>SMGs can use the Automatic special rules.</Grid>
                        <Grid item padding={1} xs={12}>Automatic Fire:</Grid>
                        <Grid item padding={1} xs={12}>Characters firing a weapon in full automatic have a ROF of 1 and a base difficulty of 5 on their attack. Their weapon must have 10 or more rounds remaining in its clip. The attacker cannot perform aimed shots, and additional successes on the attack do not provide additional damage. However, the attacker can remove dice from their attack die pool. If they do so, they can force their opponent to remove the same number of dice from their Reflexes roll to dodge <b>OR</b> their soak roll.</Grid>
                        <Grid item padding={1} xs={12}>Automatic Fire is only usable at the weapons normal range. If used at point blank range, the attacker has a difficulty of 4 AND trades dice at a 1:2 ratio - for every die they remove, their opponent loses 2 from the selected roll(s).</Grid>

                        <Grid item padding={1} xs={12}>Suppressing Fire:</Grid>
                        <Grid item padding={1} xs={12}>Instead of aiming for a specific target, an attacker can encourage others to keep their head down. The attackers weapon has a ROF of 1 and a difficulty of 5 for this 'attack'. Their weapon must have 10 or more rounds remaining in the clip. When used succesfully, <b>everyone</b> in front of the shooter within 20 meters must succeed on a Willpower check (difficulty value 6) and score more successes than the attacker in order to do anything besides seek cover or hit the deck immediately.</Grid>
                    </Grid>
                </>)

            case 'Pump Shotgun':
            case 'Double Barrel':
            case 'Assault Shotgun':
                return (<>
                    <Grid container fontFamily={'serif'}>
                        <Grid item padding={1} xs={12}>Shotguns are two handed weapons that trade range for damage. Modern shotguns have a choke on the barrel that allows for the attack to be widely dispersed - in this case, the user can hit a Lot of People with a single shot if they know what they're doing. Shotguns use the Firearms skill.</Grid>
                        <Grid item padding={1} xs={12}>Shotguns can use the Shellfire special rule. They can be set to wide dispersal, and can hit a 2x3 square up to 3 meters away from the shooter in grid play. In narrative play, the GM has the final say on whether enemies are close enough together for a single shotgun attack to hit more than one target.</Grid>
                        <Grid item padding={1} xs={12}>Pump shotguns are favored for home defense, and are fairly common among gangers and law enforcement alike.</Grid>
                        <Grid item padding={1} xs={12}>Double Barrel shotguns are rarely seen in the city, but they can pack a surprising punch. A character with a double barrel can fire both simultaneously, dealing an additional 3 damage. This cannot be combined with the Shellfire special rule.</Grid>
                        <Grid item padding={1} xs={12}>Assault Shotguns are extremely dangerous devices that use slightly smaller shells and provide sustained, rapid fire. They are commonly used by military forces as breaching and suppression devices.</Grid>
                    </Grid>
                </>)

            case 'Assault Rifle':
                return (<>
                    <Grid container fontFamily={'serif'}>
                        <Grid item padding={1} xs={12}>Assault Rifles are rapid firing, extremely powerful weapons rarely seen outside the hands of trained military units. Using one in public will generally bring down an unholy shitstorm of law enforcement. Assault Rifles use the Firearms skill.</Grid>
                        <Grid item padding={1} xs={12}>Assault Rifles can use the Automatics special rules.</Grid>
                        <Grid item padding={1} xs={12}>Automatic Fire:</Grid>
                        <Grid item padding={1} xs={12}>Characters firing a weapon in full automatic have a ROF of 1 and a base difficulty of 5 on their attack. Their weapon must have 10 or more rounds remaining in its clip. The attacker cannot perform aimed shots, and additional successes on the attack do not provide additional damage. However, the attacker can remove dice from their attack die pool. If they do so, they can force their opponent to remove the same number of dice from their Reflexes roll to dodge <b>OR</b> their soak roll.</Grid>
                        <Grid item padding={1} xs={12}>Automatic Fire is only usable at the weapons normal range. If used at point blank range, the attacker has a difficulty of 4 AND trades dice at a 1:2 ratio - for every die they remove, their opponent loses 2 from the selected roll(s).</Grid>

                        <Grid item padding={1} xs={12}>Suppressing Fire:</Grid>
                        <Grid item padding={1} xs={12}>Instead of aiming for a specific target, an attacker can encourage others to keep their head down. The attackers weapon has a ROF of 1 and a difficulty of 5 for this 'attack'. Their weapon must have 10 or more rounds remaining in the clip. When used succesfully, <b>everyone</b> in front of the shooter within 20 meters must succeed on a Willpower check (difficulty value 6) and score more successes than the attacker in order to do anything besides seek cover or hit the deck immediately.</Grid>
                    </Grid>
                </>)
            case 'Sniper Rifle':
                return (<>
                    <Grid container fontFamily={'serif'}>
                        <Grid item padding={1} xs={12}>Sniper rifles are cumbersome, heavy weapons that provide high damage at extreme range. They have a low rate of fire and smaller magazines. Sniper Rifles use the Firearms skill.</Grid>
                    </Grid>
                </>)
            case 'Bow':
                return (<>
                    <Grid container fontFamily={'serif'}>
                        <Grid item padding={1} xs={12}>Bows are muscle powered weapons that are inferior to modern firearms except in one area - they are almost completely silent. As a result, they are surprisingly common on the streets. Bows use the Exotic Weapons skill.</Grid>
                        <Grid item padding={1} xs={12}>Modern bows have adjustable tensions. Getting one for use by an extraordinarily strong character (Strength of 6 or higher) requires a special order and carries a much higher cost.</Grid>
                    </Grid>
                </>)
            case 'Grenade Launcher':
            case 'Rocket Launcher':
                return (<>
                    <Grid container fontFamily={'serif'}>
                        <Grid item padding={1} xs={12}>High explosive weapons generally have a long range and deal extremely high damage. They are difficult to find ammunition for, and are rarely found outside the hands of highly trained military units. Using them in public is contra-indicated by the sane; using them in enclosed areas is usually the last thing someone does. High Explosive Weapons use the Heavy Weapons skill.</Grid>
                        <Grid item padding={1} xs={12}>These weapons deal their damage in a large area. An attacker needs 3 successes to land the explosive in a specific location. 1-2 successes gets it nearby, and 0 or less results in a fair amount of drift. In grid play, a square in the weapons range is picked as the target; full damage is applied in a 5x5 square and 1/2 damage is applied in a 10x10 square. In narrative play, the GM has the final say on which enemies are hit by a given attack.</Grid>
                        <Grid item padding={1} xs={12}>Explosives cannot really be dodged effectively - only characters with Reflexes of 6 or higher realistically have a chance to do so. Use in a contained area is typically extremely fatal - the GM has the final say but the words 'chunky salsa' usually enter the story.</Grid>
                    </Grid>
                </>)
            case 'Vampyres':
            case 'Cybersnake':
                return (<>
                    <Grid container fontFamily={'serif'}>
                        <Grid item padding={1} xs={12}>These weapons are implanted in a character, and are very hard to detect. They generally cannot be found without some reason to suspect their existence, and require an Intelligence + Cyber Tech roll against a difficulty value of 8 or higher to spot.</Grid>
                        <Grid item padding={1} xs={12}>Vampyres are retractable fangs that can be used as a Light Melee Weapon. They can store a single dose of poison. Using them requires first grappling a victim, but their damage is aggravated if the attacker desires.</Grid>
                        <Grid item padding={1} xs={12}>Cybersnakes are horrifying weapons, consisting of a metal tentacle that erupts out of a handy orifice. Most users opt to implant them in the abdomen and have them come out of their mouth - the head of the weapon is commonly compared to a razor-blade roto rooter. The tentacle is approximately 3 feet long. If the user successfully grapples an enemy before attacking with this weapon, the damage it causes is aggravated.</Grid>
                    </Grid>
                </>)
            case 'Scratchers':
            case 'Rippers':
            case 'Wolvers':
                return (<>
                    <Grid container fontFamily={'serif'}>
                        <Grid item padding={1} xs={12}>Big Knucks are little more than reinforced knuckles, and allow a character's unarmed attacks to deal lethal damage as well as acting as a medium melee weapon.</Grid>
                        <Grid item padding={1} xs={12}>These weapons are implanted in a cyberlimb, and are quite hard to spot, requiring an Intelligence + Cyber Tech roll against a difficulty value of 7 or higher to spot.</Grid>
                        <Grid item padding={1} xs={12}>Scratchers are simple replacement fingernails that are edged in carbide razors; they are relatively fragile but quite dangerous and unexpected. They deal damage as a Light Melee Weapon and use the Exotic Weapons skill.</Grid>
                        <Grid item padding={1} xs={12}>Rippers are claws that extend from the middle joint of the finger and lock into place. They deal damage as a Medium Melee Weapon and use the Exotic Weapons skill.</Grid>
                        <Grid item padding={1} xs={12}>Wolvers are roughly 8 inch clas that extend between the knuckles. They deal damage as a Heavy Melee Weapon and use the Exotic Weapons skill. For legal reasons they do not make the noise.</Grid>
                    </Grid>
                </>)
            case 'Big Knucks':
                return (<>
                    <Grid container fontFamily={'serif'}>
                        <Grid item padding={1} xs={12}>Big Knucks are little more than reinforced knuckles, and allow a character's unarmed attacks to deal lethal damage as well as acting as a medium melee weapon.</Grid>
                    </Grid>
                </>)
            default:
                return ''
        }
    }

    const titleText = (prop) => {
        switch (prop) {
            case 'DMG':
                return 'Damage'
            case 'ROF':
                return 'Rate of Fire'
            default:
                return prop
        }
    }

    return (
        <>
            <Button sx={{
                justifyContent: 'flex-start',
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
                <DialogTitle id="scroll-dialog-title">{titleText(prop)}</DialogTitle>
                <DialogContent dividers={scroll === 'paper'}>
                    {dialogText(prop)}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}