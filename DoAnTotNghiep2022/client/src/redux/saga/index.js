import { all } from 'redux-saga/effects'

import listNFTsByAddressSaga from './listNFTsByAddressSaga'
import detailNFTSaga from './detailNFTSaga'
import listMarketNFTSaga from './listMarketNFTSaga'
import detailMarketNFTSaga from './detailMarketNFTSaga'
import bidHistorySaga from './bidHistorySaga'
import provenanceSaga from './provenanceSaga'
import infoSaga from './infoSaga'

export default function* rootSaga() {
    yield all([
        ...listNFTsByAddressSaga,
        ...detailNFTSaga,
        ...listMarketNFTSaga,
        ...detailMarketNFTSaga,
        ...bidHistorySaga,
        ...provenanceSaga,
        ...infoSaga,
    ])
}

