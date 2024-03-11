import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* changeStat(action) {
    try {
        yield axios.put('/api/advancement/changeStat', action.payload)
        if (action.payload.statName === 'medtech' && action.payload.newValue === 1) {
            // yield axios.put('/api/advancement/setParamedical/', true)
            console.log(`Setting paramed`);
            const advancementDetails = yield axios.get(`/api/advancement/fetchAdvancementDetails/${action.payload.charID}`)
            yield axios.put('/api/advancement/changeStat', { statName: 'is_paramedical', newSpentXP: advancementDetails.data[0].spent_xp, newValue: !advancementDetails.data[0].is_paramedical, charID: action.payload.charID })
            yield axios.put('/api/advancement/changeStat', { statName: 'medtech_available', newSpentXP: advancementDetails.data[0].spent_xp, newValue: advancementDetails.data[0].medtech_available + 1, charID: action.payload.charID })
        } else if (action.payload.statName === 'medtech') {
            // increase available medtech skills by 1
            const advancementDetails = yield axios.get(`/api/advancement/fetchAdvancementDetails/${action.payload.charID}`)
            yield axios.put('/api/advancement/changeStat', { statName: 'medtech_available', newSpentXP: advancementDetails.data[0].spent_xp, newValue: advancementDetails.data[0].medtech_available + 1, charID: action.payload.charID })
        } else if (action.payload.statName === 'med_surgery' || action.payload.statName === 'med_pharma' || action.payload.statName === 'med_cryo') {
            // if medtech skill increase, need to change without altering current spent XP
            const advancementDetails = yield axios.get(`/api/advancement/fetchAdvancementDetails/${action.payload.charID}`)
            yield axios.put('/api/advancement/changeStat', { statName: 'medtech_available', newSpentXP: advancementDetails.data[0].spent_xp, newValue: advancementDetails.data[0].medtech_available - 1, charID: action.payload.charID })
        } else if (action.payload.statName === 'maker') {
            // increase available maker skills by 2
            const advancementDetails = yield axios.get(`/api/advancement/fetchAdvancementDetails/${action.payload.charID}`)
            yield axios.put('/api/advancement/changeStat', { statName: 'maker_available', newSpentXP: advancementDetails.data[0].spent_xp, newValue: advancementDetails.data[0].maker_available + 2, charID: action.payload.charID })
        } else if (action.payload.statName === 'maker_field' || action.payload.statName === 'maker_upgrade' || action.payload.statName === 'maker_fab' || action.payload.statName === 'maker_invent') {
            // if maker skill increase, need to change without altering current spent XP
            const advancementDetails = yield axios.get(`/api/advancement/fetchAdvancementDetails/${action.payload.charID}`)
            yield axios.put('/api/advancement/changeStat', { statName: 'maker_available', newSpentXP: advancementDetails.data[0].spent_xp, newValue: advancementDetails.data[0].maker_available - 1, charID: action.payload.charID })
        } else if (action.payload.statName === 'nomad') {
            // Increase nomad vehicle slots by 1 if nomad role increased
            const advancementDetails = yield axios.get(`/api/advancement/fetchAdvancementDetails/${action.payload.charID}`)
            yield axios.put('/api/advancement/changeStat', { statName: 'nomad_vehicle_slots', newSpentXP: advancementDetails.data[0].spent_xp, newValue: advancementDetails.data[0].nomad_vehicle_slots + 1, charID: action.payload.charID })
        }
        const advancementDetails = yield axios.get(`/api/advancement/fetchAdvancementDetails/${action.payload.charID}`)
        yield put({ type: 'SET_ADVANCEMENT_DETAIL', payload: advancementDetails.data[0] })
        yield put({ type: "SET_ADVANCEMENT_LOAD_STATUS", payload: false })
    } catch (err) {
        console.log(`Error increasing attribute:`, err);
    }
}

function* advancementSaga() {
    yield takeLatest('ADVANCEMENT_CHANGE_STAT', changeStat)
}

export default advancementSaga;