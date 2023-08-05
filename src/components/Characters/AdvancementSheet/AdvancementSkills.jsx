import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Grid from '@mui/material/Grid';
import Item from '../CharacterSheet/Item';

import SkillsDialog from '../../Modals/SkillsDialog';

export default function AdvancementSkills() {

    const dispatch = useDispatch();
    const advancementDetails = useSelector((store) => store.advancementDetail);

    const fulldot = ` \u2b24`
    const emptydot = ` \u25ef`

    const skillDotReturn = (skill) => {
        let returnedDots = ''
        for (let i = 0; i < skill; i++) {
            returnedDots += fulldot;
        }
        let j = skill
        for (j; j <= 4; j++) {
            returnedDots += emptydot
        }
        return returnedDots
    }

    const skillExpReturn = (skill) => {
        let newCost = (skill + 1) * 2
        return `${newCost} XP`
    }

    const skillSpendExp = (skillScore, skillName) => {
        const availableExp = advancementDetails.max_xp - advancementDetails.spent_xp
        skillScore = Number(skillScore)
        let increaseSkillCost = (skillScore + 1) * 2

        if (increaseSkillCost <= availableExp) {
            dispatch({ type: 'INCREASE_SKILL', payload: { skillScore: skillScore, skillName: skillName, increaseSkillCost: increaseSkillCost } })
        } else {
            alert('Insufficient XP')
        }
    }

    return (<>
        <h1>Skills</h1>
        <Grid container>
            <Grid item xs={4}>
                <Grid container>

                    <Grid item xs={3}><Item><SkillsDialog prop={'Athletics'}></SkillsDialog></Item></Grid>
                    <Grid item xs={5}><Item>{skillDotReturn(advancementDetails.athletics)}</Item></Grid>
                    <Grid item xs={4}>{advancementDetails.athletics < 5 ? <Item sx={{ cursor: 'pointer' }} onClick={() => skillSpendExp(advancementDetails.athletics, 'athletics')}>Increase: {skillExpReturn(advancementDetails.athletics)}</Item> : <Item>Maxed</Item>}</Grid>

                    <Grid item xs={3}><Item><SkillsDialog prop={'Brawling'}></SkillsDialog></Item></Grid>
                    <Grid item xs={5}><Item>{skillDotReturn(advancementDetails.brawling)}</Item></Grid>
                    <Grid item xs={4}>{advancementDetails.brawling < 5 ? <Item sx={{ cursor: 'pointer' }} onClick={() => skillSpendExp(advancementDetails.brawling, 'brawling')}>Increase: {skillExpReturn(advancementDetails.brawling)}</Item> : <Item>Maxed</Item>}</Grid>

                    <Grid item xs={3}><Item><SkillsDialog prop={'Concentration'}></SkillsDialog></Item></Grid>
                    <Grid item xs={5}><Item>{skillDotReturn(advancementDetails.concentration)}</Item></Grid>
                    <Grid item xs={4}>{advancementDetails.concentration < 5 ? <Item sx={{ cursor: 'pointer' }} onClick={() => skillSpendExp(advancementDetails.concentration, 'concentration')}>Increase: {skillExpReturn(advancementDetails.concentration)}</Item> : <Item>Maxed</Item>}</Grid>

                    <Grid item xs={3}><Item><SkillsDialog prop={'Evasion'}></SkillsDialog></Item></Grid>
                    <Grid item xs={5}><Item>{skillDotReturn(advancementDetails.evasion)}</Item></Grid>
                    <Grid item xs={4}>{advancementDetails.evasion < 5 ? <Item sx={{ cursor: 'pointer' }} onClick={() => skillSpendExp(advancementDetails.evasion, 'evasion')}>Increase: {skillExpReturn(advancementDetails.evasion)}</Item> : <Item>Maxed</Item>}</Grid>

                    <Grid item xs={3}><Item><SkillsDialog prop={'Fast Talk'}></SkillsDialog></Item></Grid>
                    <Grid item xs={5}><Item>{skillDotReturn(advancementDetails.fast_talk)}</Item></Grid>
                    <Grid item xs={4}>{advancementDetails.fast_talk < 5 ? <Item sx={{ cursor: 'pointer' }} onClick={() => skillSpendExp(advancementDetails.fast_talk, 'fast_talk')}>Increase: {skillExpReturn(advancementDetails.fast_talk)}</Item> : <Item>Maxed</Item>}</Grid>

                    <Grid item xs={3}><Item><SkillsDialog prop={'Firearms'}></SkillsDialog></Item></Grid>
                    <Grid item xs={5}><Item>{skillDotReturn(advancementDetails.firearms)}</Item></Grid>
                    <Grid item xs={4}>{advancementDetails.firearms < 5 ? <Item sx={{ cursor: 'pointer' }} onClick={() => skillSpendExp(advancementDetails.firearms, 'firearms')}>Increase: {skillExpReturn(advancementDetails.firearms)}</Item> : <Item>Maxed</Item>}</Grid>

                    <Grid item xs={3}><Item><SkillsDialog prop={'Legerdemain'}></SkillsDialog></Item></Grid>
                    <Grid item xs={5}><Item>{skillDotReturn(advancementDetails.legerdemain)}</Item></Grid>
                    <Grid item xs={4}>{advancementDetails.legerdemain < 5 ? <Item sx={{ cursor: 'pointer' }} onClick={() => skillSpendExp(advancementDetails.legerdemain, 'legerdemain')}>Increase: {skillExpReturn(advancementDetails.legerdemain)}</Item> : <Item>Maxed</Item>}</Grid>

                    <Grid item xs={3}><Item><SkillsDialog prop={'Melee Weapons'}></SkillsDialog></Item></Grid>
                    <Grid item xs={5}><Item>{skillDotReturn(advancementDetails.melee_weapons)}</Item></Grid>
                    <Grid item xs={4}>{advancementDetails.melee_weapons < 5 ? <Item sx={{ cursor: 'pointer' }} onClick={() => skillSpendExp(advancementDetails.melee_weapons, 'melee_weapons')}>Increase: {skillExpReturn(advancementDetails.melee_weapons)}</Item> : <Item>Maxed</Item>}</Grid>

                    <Grid item xs={3}><Item><SkillsDialog prop={'Perception'}></SkillsDialog></Item></Grid>
                    <Grid item xs={5}><Item>{skillDotReturn(advancementDetails.perception)}</Item></Grid>
                    <Grid item xs={4}>{advancementDetails.perception < 5 ? <Item sx={{ cursor: 'pointer' }} onClick={() => skillSpendExp(advancementDetails.perception, 'perception')}>Increase: {skillExpReturn(advancementDetails.perception)}</Item> : <Item>Maxed</Item>}</Grid>

                    <Grid item xs={3}><Item><SkillsDialog prop={'Streetwise'}></SkillsDialog></Item></Grid>
                    <Grid item xs={5}><Item>{skillDotReturn(advancementDetails.streetwise)}</Item></Grid>
                    <Grid item xs={4}>{advancementDetails.streetwise < 5 ? <Item sx={{ cursor: 'pointer' }} onClick={() => skillSpendExp(advancementDetails.streetwise, 'streetwise')}>Increase: {skillExpReturn(advancementDetails.streetwise)}</Item> : <Item>Maxed</Item>}</Grid>
                </Grid>
            </Grid>

            <Grid item xs={4}>
                <Grid container>

                    <Grid item xs={3}><Item><SkillsDialog prop={'Demolitions'}></SkillsDialog></Item></Grid>
                    <Grid item xs={5}><Item>{skillDotReturn(advancementDetails.demolitions)}</Item></Grid>
                    <Grid item xs={4}>{advancementDetails.demolitions < 5 ? <Item sx={{ cursor: 'pointer' }} onClick={() => skillSpendExp(advancementDetails.demolitions, 'demolitions')}>Increase: {skillExpReturn(advancementDetails.demolitions)}</Item> : <Item>Maxed</Item>}</Grid>

                    <Grid item xs={3}><Item><SkillsDialog prop={'Drive Land'}></SkillsDialog></Item></Grid>
                    <Grid item xs={5}><Item>{skillDotReturn(advancementDetails.drive_land)}</Item></Grid>
                    <Grid item xs={4}>{advancementDetails.drive_land < 5 ? <Item sx={{ cursor: 'pointer' }} onClick={() => skillSpendExp(advancementDetails.drive_land, 'drive_land')}>Increase: {skillExpReturn(advancementDetails.drive_land)}</Item> : <Item>Maxed</Item>}</Grid>

                    <Grid item xs={3}><Item><SkillsDialog prop={'Drive Exotic'}></SkillsDialog></Item></Grid>
                    <Grid item xs={5}><Item>{skillDotReturn(advancementDetails.drive_exotic)}</Item></Grid>
                    <Grid item xs={4}>{advancementDetails.drive_exotic < 5 ? <Item sx={{ cursor: 'pointer' }} onClick={() => skillSpendExp(advancementDetails.drive_exotic, 'drive_exotic')}>Increase: {skillExpReturn(advancementDetails.drive_exotic)}</Item> : <Item>Maxed</Item>}</Grid>

                    <Grid item xs={3}><Item><SkillsDialog prop={'Etiquette'}></SkillsDialog></Item></Grid>
                    <Grid item xs={5}><Item>{skillDotReturn(advancementDetails.etiquette)}</Item></Grid>
                    <Grid item xs={4}>{advancementDetails.etiquette < 5 ? <Item sx={{ cursor: 'pointer' }} onClick={() => skillSpendExp(advancementDetails.etiquette, 'etiquette')}>Increase: {skillExpReturn(advancementDetails.etiquette)}</Item> : <Item>Maxed</Item>}</Grid>

                    <Grid item xs={3}><Item><SkillsDialog prop={'Exotic Weapons'}></SkillsDialog></Item></Grid>
                    <Grid item xs={5}><Item>{skillDotReturn(advancementDetails.exotic_weapons)}</Item></Grid>
                    <Grid item xs={4}>{advancementDetails.exotic_weapons < 5 ? <Item sx={{ cursor: 'pointer' }} onClick={() => skillSpendExp(advancementDetails.exotic_weapons, 'exotic_weapons')}>Increase: {skillExpReturn(advancementDetails.exotic_weapons)}</Item> : <Item>Maxed</Item>}</Grid>

                    <Grid item xs={3}><Item><SkillsDialog prop={'Heavy Weapons'}></SkillsDialog></Item></Grid>
                    <Grid item xs={5}><Item>{skillDotReturn(advancementDetails.heavy_weapons)}</Item></Grid>
                    <Grid item xs={4}>{advancementDetails.heavy_weapons < 5 ? <Item sx={{ cursor: 'pointer' }} onClick={() => skillSpendExp(advancementDetails.heavy_weapons, 'heavy_weapons')}>Increase: {skillExpReturn(advancementDetails.heavy_weapons)}</Item> : <Item>Maxed</Item>}</Grid>

                    <Grid item xs={3}><Item><SkillsDialog prop={'Performance'}></SkillsDialog></Item></Grid>
                    <Grid item xs={5}><Item>{skillDotReturn(advancementDetails.performance)}</Item></Grid>
                    <Grid item xs={4}>{advancementDetails.performance < 5 ? <Item sx={{ cursor: 'pointer' }} onClick={() => skillSpendExp(advancementDetails.performance, 'performance')}>Increase: {skillExpReturn(advancementDetails.performance)}</Item> : <Item>Maxed</Item>}</Grid>

                    <Grid item xs={3}><Item><SkillsDialog prop={'Stealth'}></SkillsDialog></Item></Grid>
                    <Grid item xs={5}><Item>{skillDotReturn(advancementDetails.stealth)}</Item></Grid>
                    <Grid item xs={4}>{advancementDetails.stealth < 5 ? <Item sx={{ cursor: 'pointer' }} onClick={() => skillSpendExp(advancementDetails.stealth, 'stealth')}>Increase: {skillExpReturn(advancementDetails.stealth)}</Item> : <Item>Maxed</Item>}</Grid>

                    <Grid item xs={3}><Item><SkillsDialog prop={'Survival'}></SkillsDialog></Item></Grid>
                    <Grid item xs={5}><Item>{skillDotReturn(advancementDetails.survival)}</Item></Grid>
                    <Grid item xs={4}>{advancementDetails.survival < 5 ? <Item sx={{ cursor: 'pointer' }} onClick={() => skillSpendExp(advancementDetails.survival, 'survival')}>Increase: {skillExpReturn(advancementDetails.survival)}</Item> : <Item>Maxed</Item>}</Grid>

                    <Grid item xs={3}><Item><SkillsDialog prop={'Tracking'}></SkillsDialog></Item></Grid>
                    <Grid item xs={5}><Item>{skillDotReturn(advancementDetails.tracking)}</Item></Grid>
                    <Grid item xs={4}>{advancementDetails.tracking < 5 ? <Item sx={{ cursor: 'pointer' }} onClick={() => skillSpendExp(advancementDetails.tracking, 'tracking')}>Increase: {skillExpReturn(advancementDetails.tracking)}</Item> : <Item>Maxed</Item>}</Grid>

                </Grid>
            </Grid>

            <Grid item xs={4}>
                <Grid container>

                    <Grid item xs={3}><Item><SkillsDialog prop={'Business'}></SkillsDialog></Item></Grid>
                    <Grid item xs={5}><Item>{skillDotReturn(advancementDetails.business)}</Item></Grid>
                    <Grid item xs={4}>{advancementDetails.business < 5 ? <Item sx={{ cursor: 'pointer' }} onClick={() => skillSpendExp(advancementDetails.business, 'business')}>Increase: {skillExpReturn(advancementDetails.business)}</Item> : <Item>Maxed</Item>}</Grid>

                    <Grid item xs={3}><Item><SkillsDialog prop={'Cryptography'}></SkillsDialog></Item></Grid>
                    <Grid item xs={5}><Item>{skillDotReturn(advancementDetails.cryptography)}</Item></Grid>
                    <Grid item xs={4}>{advancementDetails.cryptography < 5 ? <Item sx={{ cursor: 'pointer' }} onClick={() => skillSpendExp(advancementDetails.cryptography, 'cryptography')}>Increase: {skillExpReturn(advancementDetails.cryptography)}</Item> : <Item>Maxed</Item>}</Grid>

                    <Grid item xs={3}><Item><SkillsDialog prop={'Cyber Tech'}></SkillsDialog></Item></Grid>
                    <Grid item xs={5}><Item>{skillDotReturn(advancementDetails.cyber_tech)}</Item></Grid>
                    <Grid item xs={4}>{advancementDetails.cyber_tech < 5 ? <Item sx={{ cursor: 'pointer' }} onClick={() => skillSpendExp(advancementDetails.cyber_tech, 'cyber_tech')}>Increase: {skillExpReturn(advancementDetails.cyber_tech)}</Item> : <Item>Maxed</Item>}</Grid>

                    {advancementDetails.is_paramedical ? (<>
                        <Grid item xs={3}><Item><SkillsDialog prop={'Paramedic'}></SkillsDialog></Item></Grid>
                    <Grid item xs={5}><Item>{skillDotReturn(advancementDetails.paramed)}</Item></Grid>
                    <Grid item xs={4}>{advancementDetails.paramed < 5 ? <Item sx={{ cursor: 'pointer' }} onClick={() => skillSpendExp(advancementDetails.paramed, 'paramed')}>Increase: {skillExpReturn(advancementDetails.paramed)}</Item> : <Item>Maxed</Item>}</Grid>
                    </>) : <>
                    <Grid item xs={3}><Item><SkillsDialog prop={'First Aid'}></SkillsDialog></Item></Grid>
                    <Grid item xs={5}><Item>{skillDotReturn(advancementDetails.first_aid)}</Item></Grid>
                    <Grid item xs={4}>{advancementDetails.first_aid < 5 ? <Item sx={{ cursor: 'pointer' }} onClick={() => skillSpendExp(advancementDetails.first_aid, 'first_aid')}>Increase: {skillExpReturn(advancementDetails.first_aid)}</Item> : <Item>Maxed</Item>}</Grid>
                    </>}

                    <Grid item xs={3}><Item><SkillsDialog prop={'Investigation'}></SkillsDialog></Item></Grid>
                    <Grid item xs={5}><Item>{skillDotReturn(advancementDetails.investigation)}</Item></Grid>
                    <Grid item xs={4}>{advancementDetails.investigation < 5 ? <Item sx={{ cursor: 'pointer' }} onClick={() => skillSpendExp(advancementDetails.investigation, 'investigation')}>Increase: {skillExpReturn(advancementDetails.investigation)}</Item> : <Item>Maxed</Item>}</Grid>

                    <Grid item xs={3}><Item><SkillsDialog prop={'Gambling'}></SkillsDialog></Item></Grid>
                    <Grid item xs={5}><Item>{skillDotReturn(advancementDetails.gambling)}</Item></Grid>
                    <Grid item xs={4}>{advancementDetails.gambling < 5 ? <Item sx={{ cursor: 'pointer' }} onClick={() => skillSpendExp(advancementDetails.gambling, 'gambling')}>Increase: {skillExpReturn(advancementDetails.gambling)}</Item> : <Item>Maxed</Item>}</Grid>

                    <Grid item xs={3}><Item><SkillsDialog prop={'Language'}></SkillsDialog></Item></Grid>
                    <Grid item xs={5}><Item>{skillDotReturn(advancementDetails.language)}</Item></Grid>
                    <Grid item xs={4}>{advancementDetails.language < 5 ? <Item sx={{ cursor: 'pointer' }} onClick={() => skillSpendExp(advancementDetails.language, 'language')}>Increase: {skillExpReturn(advancementDetails.language)}</Item> : <Item>Maxed</Item>}</Grid>

                    <Grid item xs={3}><Item><SkillsDialog prop={'Military Tech'}></SkillsDialog></Item></Grid>
                    <Grid item xs={5}><Item>{skillDotReturn(advancementDetails.military_tech)}</Item></Grid>
                    <Grid item xs={4}>{advancementDetails.military_tech < 5 ? <Item sx={{ cursor: 'pointer' }} onClick={() => skillSpendExp(advancementDetails.military_tech, 'military_tech')}>Increase: {skillExpReturn(advancementDetails.military_tech)}</Item> : <Item>Maxed</Item>}</Grid>

                    <Grid item xs={3}><Item><SkillsDialog prop={'Science'}></SkillsDialog></Item></Grid>
                    <Grid item xs={5}><Item>{skillDotReturn(advancementDetails.science)}</Item></Grid>
                    <Grid item xs={4}>{advancementDetails.science < 5 ? <Item sx={{ cursor: 'pointer' }} onClick={() => skillSpendExp(advancementDetails.science, 'science')}>Increase: {skillExpReturn(advancementDetails.science)}</Item> : <Item>Maxed</Item>}</Grid>

                    <Grid item xs={3}><Item><SkillsDialog prop={'Vehicle Tech'}></SkillsDialog></Item></Grid>
                    <Grid item xs={5}><Item>{skillDotReturn(advancementDetails.vehicle_tech)}</Item></Grid>
                    <Grid item xs={4}>{advancementDetails.vehicle_tech < 5 ? <Item sx={{ cursor: 'pointer' }} onClick={() => skillSpendExp(advancementDetails.vehicle_tech, 'vehicle_tech')}>Increase: {skillExpReturn(advancementDetails.vehicle_tech)}</Item> : <Item>Maxed</Item>}</Grid>
                </Grid>
            </Grid>

        </Grid>
    </>)
}