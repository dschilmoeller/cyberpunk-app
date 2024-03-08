import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* increaseAttribute(action) {
    try {
        yield axios.put('/api/advancement/increaseAttribute', action.payload)
        const advancementDetails = yield axios.get(`/api/advancement/fetchAdvancementDetails/${action.payload.charID}`)
        yield put({ type: 'SET_ADVANCEMENT_DETAIL', payload: advancementDetails.data[0] })
        yield put({ type: "SET_ADVANCEMENT_LOAD_STATUS", payload: false })

    } catch (err) {
        console.log(`Error increasing attribute:`, err);
    }
}

function* advancementSaga() {
    yield takeLatest('ADVANCEMENT_INCREASE_ATTRIBUTE', increaseAttribute)
}

export default advancementSaga;