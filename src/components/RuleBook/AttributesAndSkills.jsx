import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';

import Item from '../Characters/CharacterSheet/Item.jsx'
import AttributesDialog from '../Modals/AttributesDialog'
import SkillsDialog from '../Modals/SkillsDialog.jsx';

import AcUnitIcon from '@mui/icons-material/AcUnit';
import HorizontalRuleOutlinedIcon from '@mui/icons-material/HorizontalRuleOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';


export default function RulebookAttSkills() {

    const stunMarker = <HorizontalRuleOutlinedIcon />;
    const lethalMarker = <CloseOutlinedIcon />
    const aggMarker = <AcUnitIcon />;
    
    return (
        <>
            <Grid container spacing={1} padding={1}>
                <Grid item xs={12}><Typography variant='h4'>Attributes</Typography></Grid>
                <Grid item xs={12}><Typography variant='p'>Attributes are the core statistics of your character, and define major parts of their presence and attitude. A bodybuilder with vanadium skin and a genius with hollow bones are going to approach the world very differently.</Typography></Grid>
                <Grid item xs={12}><Typography variant='p'>Attributes are divided into physical, social, and mental groups, and are rated from 1-5. Some attributes can be improved past these limits with cyberware, particularly physical skills, while some others require have a...different path. An average human would have 1-2 points in any given trait; 5 is the unaugmented maximum and represents the trait of a world class talent - an Olympian or an Einstein.</Typography></Grid>
                <Grid item xs={12}><Typography variant='p'>Attributes consist of the following - click each to see more information.</Typography></Grid>
                <Grid item xs={4}>
                    <Grid container spacing={1} padding={1}>
                        <Grid item xs={12}><Item><AttributesDialog prop={'Strength'} /></Item></Grid>
                        <Grid item xs={12}><Item><AttributesDialog prop={'Body'} /></Item></Grid>
                        <Grid item xs={12}><Item><AttributesDialog prop={'Reflexes'} /></Item></Grid>
                    </Grid>
                </Grid>
                <Grid item xs={4}>
                    <Grid container spacing={1} padding={1}>
                        <Grid item xs={12}><Item><AttributesDialog prop={'Appearance'} /></Item></Grid>
                        <Grid item xs={12}><Item><AttributesDialog prop={'Cool'} /></Item></Grid>
                        <Grid item xs={12}><Item><AttributesDialog prop={'Street Cred'} /></Item></Grid>
                    </Grid>
                </Grid>
                <Grid item xs={4}>
                    <Grid container spacing={1} padding={1}>
                        <Grid item xs={12}><Item><AttributesDialog prop={'Intelligence'} /></Item></Grid>
                        <Grid item xs={12}><Item><AttributesDialog prop={'Willpower'} /></Item></Grid>
                        <Grid item xs={12}><Item><AttributesDialog prop={'Technique'} /></Item></Grid>
                    </Grid>
                </Grid>

                <Grid item xs={12}>
                    <Typography variant='h6'>
                        The Rule of Cool
                    </Typography>
                </Grid>

                <Grid item xs={12}>
                    <Typography variant='p'>
                        Cyberpunks live and die by how cool they are. To reflect this, once per scene, they can use their Cool attribute in lieu of any other attribute in a roll. This can only be done if what they are doing is Fucking Awesome. The GM has final say on what can be subbed, but they are encouraged to be generous. Typically, the difficulty value of the roll is higher, or it requires two rolls (only one of which uses Cool) to succeed.
                    </Typography>
                </Grid>

                <Grid item xs={12}>
                    <Typography variant='p'>
                        If successful, the result should be Very Dramatic.
                    </Typography>
                </Grid>

                <Grid item xs={12}>
                    <Typography variant='p'>
                        <i>Example:
                            Ace has strutted into the wrong bar and is close to being on the receiving end of an ass-kicking from a group of Maelstrom gangers. They opt to shoot one in the back of the head…from in front of them. The GM requires Ace to make an Intelligence (3) + Science (2) roll to calculate the angles. Ace succeeds at Geometry, and rolls their Cool (6) + Automatics (5) skill, scoring an impressive 8 successes and spraying robo-eyes all over their immaculate vest. The stunned gangers decide this is Awesome and buy Ace all the beer.</i>
                    </Typography>
                </Grid>

                <Grid item xs={12}><Typography variant='h4'>Skills</Typography></Grid>
                <Grid item xs={12}><Typography variant='p'>Skills are slightly more specialized areas, and are almost always combined with an Attribute to determine the outcome of various character actions.</Typography></Grid>
                <Grid item xs={12}><Typography variant='p'>The different categories are important - Streets skills are picked up on the job and actions involving them can generally be attempted with no points in the skill in question if the GM names one as a Parameter - anyone can try and lie to someone, or dodge a punch. There's just a limit to how well they can do so without training. Tekhne (your GM will lie and say this is Greek referring to 'some skill or craft required') refers to skills that require a bit more in the way of expertise, without being fully a specialty. If the GM declares one of these skills as a Parameter, a character can attempt to perform the task, but should tell the GM they have no points - their DV is usually one higher. Finally, Knowledge skills are more Academic specialties. When declared as a parameter, a character <b>cannot</b> even attempt the roll without at least one point in the skill in question. No amount of natural smarts will allow someone who's never encountered a computer write an Excel Macro.</Typography></Grid>
                <Grid item xs={12}><Typography variant='p'>There are ten skills in each category - click each below to see more details.</Typography></Grid>
                <Grid item xs={4}>
                    <Grid container spacing={1} padding={1}>
                        <Grid item xs={12}><Item><SkillsDialog prop={'Streets'} /></Item></Grid>
                        <Grid item xs={6}><Item><SkillsDialog prop={'Athletics'} /></Item></Grid>
                        <Grid item xs={6}><Item><SkillsDialog prop={'Brawling'} /></Item></Grid>
                        <Grid item xs={6}><Item><SkillsDialog prop={'Concentration'} /></Item></Grid>
                        <Grid item xs={6}><Item><SkillsDialog prop={'Evasion'} /></Item></Grid>
                        <Grid item xs={6}><Item><SkillsDialog prop={'Fast Talk'} /></Item></Grid>
                        <Grid item xs={6}><Item><SkillsDialog prop={'Firearms'} /></Item></Grid>
                        <Grid item xs={6}><Item><SkillsDialog prop={'Legerdemain'} /></Item></Grid>
                        <Grid item xs={6}><Item><SkillsDialog prop={'Melee Weapons'} /></Item></Grid>
                        <Grid item xs={6}><Item><SkillsDialog prop={'Perception'} /></Item></Grid>
                        <Grid item xs={6}><Item><SkillsDialog prop={'Streetwise'} /></Item></Grid>
                    </Grid>
                </Grid>

                <Grid item xs={4}>
                    <Grid container spacing={1} padding={1}>
                        <Grid item xs={12}><Item><SkillsDialog prop={'Tekhne'} /></Item></Grid>
                        <Grid item xs={6}><Item><SkillsDialog prop={'Demolitions'} /></Item></Grid>
                        <Grid item xs={6}><Item><SkillsDialog prop={'Drive Land Vehicle'} /></Item></Grid>
                        <Grid item xs={6}><Item><SkillsDialog prop={'Drive Exotic Vehicle'} /></Item></Grid>
                        <Grid item xs={6}><Item><SkillsDialog prop={'Etiquette'} /></Item></Grid>
                        <Grid item xs={6}><Item><SkillsDialog prop={'Exotic Weapons'} /></Item></Grid>
                        <Grid item xs={6}><Item><SkillsDialog prop={'Heavy Weapons'} /></Item></Grid>
                        <Grid item xs={6}><Item><SkillsDialog prop={'Performance'} /></Item></Grid>
                        <Grid item xs={6}><Item><SkillsDialog prop={'Stealth'} /></Item></Grid>
                        <Grid item xs={6}><Item><SkillsDialog prop={'Survival'} /></Item></Grid>
                        <Grid item xs={6}><Item><SkillsDialog prop={'Tracking'} /></Item></Grid>
                    </Grid>
                </Grid>

                <Grid item xs={4}>
                    <Grid container spacing={1} padding={1}>
                        <Grid item xs={12}><Item><SkillsDialog prop={'Knowledge'} /></Item></Grid>
                        <Grid item xs={6}><Item><SkillsDialog prop={'Business'} /></Item></Grid>
                        <Grid item xs={6}><Item><SkillsDialog prop={'Cryptography'} /></Item></Grid>
                        <Grid item xs={6}><Item><SkillsDialog prop={'Cyber Tech'} /></Item></Grid>
                        <Grid item xs={6}><Item><SkillsDialog prop={'Investigation'} /></Item></Grid>
                        <Grid item xs={6}><Item><SkillsDialog prop={'First Aid'} /></Item></Grid>
                        <Grid item xs={6}><Item><SkillsDialog prop={'Gambling'} /></Item></Grid>
                        <Grid item xs={6}><Item><SkillsDialog prop={'Language'} /></Item></Grid>
                        <Grid item xs={6}><Item><SkillsDialog prop={'Military Tech'} /></Item></Grid>
                        <Grid item xs={6}><Item><SkillsDialog prop={'Science'} /></Item></Grid>
                        <Grid item xs={6}><Item><SkillsDialog prop={'Vehicle Tech'} /></Item></Grid>
                    </Grid>
                </Grid>

                <Grid item xs={12}><Typography variant='p'>Special: Paramedic. If a character has the Medtech role, their skill in First Aid is immediately converted to Paramedic. This reflects the specialized training Medtechs go through, and generally the same tasks can be attempted - the DV is simply lower if you're rolling Paramedic instead of First Aid. Like First Aid, Paramedic is a Knowledge skill.</Typography></Grid>
                <Grid item xs={2}><Item><SkillsDialog prop={'Paramedic'} /></Item></Grid>

                <Grid container padding={1} spacing={1}>
                    <Grid item xs={12}><Typography variant='h4'>Other Attributes: Health</Typography>
                        <Grid container padding={1} spacing={1}>
                            <Grid item xs={12}>Character health is expressed in a number of boxes. Every character has a minimum of 10 health boxes. Health can be increased with different kinds of cyberware. Most commonly, Externalware is usually armor grafted directly to the character and provides 1 or more health boxes along with some armor. Cyberlimbs each grant an additional health box as well.</Grid>
                            <Grid item xs={12} paddingBottom={1}>Health is reduced by damage, also called 'wounds', which comes in three different types. Each type overwrites the previous - so a character with two stun wounds who receives a single lethal wound would now have a single lethal wound and a single stun wound. If they then take an aggravated wound, they would have a stun wound and an aggravated wound; the aggravated wound has overwritten the lethal wound.</Grid>

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
                            <Grid item xs={12}><Typography variant='h4'>Wound Penalties:</Typography></Grid>
                            <Grid item xs={12}><Typography variant='p'>Characters suffer penalties to most Rolls as they become more and more injured. This penalty applies to any roll that does not specifically mention otherwise. Death Saves are the main exceptions to wound penalties, though most rolls involving the Body attribute are exempt as well.</Typography></Grid>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid container spacing={1} padding={1}>
                    <Grid item xs={12}><Typography variant='h4'>Other Attributes: Armor</Typography></Grid>
                    <Grid container padding={1}>
                        <Grid item xs={12} paddingBottom={1}>Armor reflects a combination of a character's natural toughness, worn armor, shields, and cyberware that provide some protection against injury. When receiving damage, that damage is reduced by 1/2 of the total Armor a character has.</Grid>
                        <Grid item xs={12} paddingBottom={1}><b>Armor Ablation:</b> any attack that is not disregarded (see below) damages armor, weakening it slowly <b>whether or not the attack does any damage</b>. Each hit reduces current armor by 1. Repairing armor requires the Military Tech (worn armor) or Cybertech (cyberware armor) skill to repair.</Grid>
                        <Grid item xs={12} paddingBottom={1}>Advanced Rules - these rarely come up:</Grid>
                        <Grid item xs={12} paddingBottom={1}>Weapons whose base damage is 1/4 or less of a target's armor + cyberware armor value (rounded down) cannot damage that target - they are simply too tough. The weapon does no damage and the armor is not ablated or degraded. A light pistol will not shoot through a heavily armored car no matter how many times it is fired. This rarely comes into play except as regards some kinds of cover and certain super-heavy cyberware.</Grid>
                        <Grid item xs={12} paddingBottom={1}><b>Hardened Armor:</b> Some armor is vastly tougher than others, and is considered <i>Hardened.</i> Typically this consists of advanced military equipment, full body cyberware conversions, and military grade vehicle armor. Characters (or cover) with hardened armor reduce damage by the Body + Armor - not divided by 2. They also ignore attacks whose base damage is 1/3 or less of their armor value rather than the normal 1/3. Further, many attacks that would do aggravated damage to a character with normal armor are only lethal against a character with hardened armor. However, some ammunition and even specific weapons allow characters to ignore the <i>Hardened</i> property.</Grid>
                        <Grid item xs={12}>Hardened armor typically does not stack with other kinds armor - putting a kevlar jacket on over Powered Military Armor is gilding the lily somewhat. The GM has final say on whether or not armors can be worn together.</Grid>
                    </Grid>
                </Grid>

                <Grid container padding={1} spacing={1}>
                    <Grid item xs={12}><Typography variant='h4'>Other Attributes: Luck</Typography>
                        <Grid container>
                            <Grid item xs={12}>Luck has a number of uses for a character. Characters can expend a point of temporary luck to do any of the following. A character cannot spend more than one point of luck each round.</Grid>
                            <Grid item xs={12}><b>Just Plain Lucky:</b>A character can add a single success - add a die that came up 10. This can be declared after the result of a roll is known.</Grid>
                            <Grid item xs={12}><b>Doesn't Even Sting:</b>This must be declared before rolling. A character can ignore any wound penalties they have for one turn.</Grid>
                            <Grid item xs={12}><b>Trust in The Lady:</b>A character can redo a single roll - they have to take the new result.</Grid>
                            <Grid item xs={12}><b>A Kiss While Dying:</b> Characters can also expend one point of luck <b>permanently</b> to perform a single action while incapacitated. They cannot spend temporary luck in the same turn.</Grid>
                        </Grid>
                        <Grid item xs={12}>Characters can also expend one point of luck <b>permanently</b> to perform a single action while incapacitated. They cannot spend temporary luck in the same turn.</Grid>
                    </Grid>
                </Grid>
            </Grid>

            <Grid container spacing={1} padding={1}>
                <Grid item xs={12}><Typography variant='h4'>Other Attributes: Humanity</Typography></Grid>
                <Grid container padding={1}>
                    <Grid item xs={12} paddingBottom={1}>Humanity is a measure of a character's stability, sanity, and of course, tracking their slow but inevitable slide into Cyberpsychosis. No direct penalties are associated with Humanity, but a variety of effects should be taken into consideration by the GM and players as their characters humanity dwindles.</Grid>
                    <Grid item xs={12} paddingBottom={1}>The most common way of losing humanity, temporary and otherwise, is the installation of Cyberware. However, particularly traumatic scenes and exposure to true horror can also cause a character to lose temporary humanity. Generally, it becomes harder to lose humanity as it fades away - a character with 40 humanity might lose many points if they have to shoot an innocent bystander, another with only 5 left won't even blink at doing so.</Grid>
                    <Grid item xs={12} paddingBottom={1}>Temporary humanity loss can be recovered with therapy, experience, or acts of genuine empathy and redemption. Temporary humanity recovery happens at the GMs discretion, or can purchased during character advancement with experience. Some cyberware causes humanity loss that cannot be restored until the cyberware is removed, reflecting the internal dissociation that comes with replacing parts of oneself with chrome. This is generally the minimum figure listed in the Cyberware tables.</Grid>
                    <Grid item xs={12} paddingBottom={1}>Characters with more than half their humanity missing are generally 'off' and scary to normal people, and will have higher difficulty values when interacting with them in anything but a threatening way.</Grid>
                    <Grid item xs={12} paddingBottom={1}>Characters missing 30 or more Humanity suffer from some kind of mental derangement - sociopathy is most common, but hallucinations, dissociative episodes, mistaken identity of themselves or others, and memory loss are all regular occurrences.</Grid>
                    <Grid item xs={12} paddingBottom={1}>Characters missing 40 or more humanity undergo a complete psychotic break, and are turned over to the control of the GM. If they are immediately subdued they might be able to recover, but most often this is the end of that character as anything but a dangerous opponent to themselves and everyone around them.</Grid>
                </Grid>
            </Grid>
        </>
    )
}