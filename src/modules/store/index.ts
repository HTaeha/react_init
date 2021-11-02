import { createStore, applyMiddleware } from 'redux';
import rootReducer, {rootSaga} from '..';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from "redux-logger"

const persistConfig = {
    key: 'root',
    storage,
    // Whitelist (Save Specific Reducers)
    whitelist: [
    ],
    // Blacklist (Don't Save Specific Reducers)
    blacklist: [
        "dark",
        "github",
        "google",
        "itemList",
    ],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)
const sagaMiddleware = createSagaMiddleware();
const store = createStore(persistedReducer,
    composeWithDevTools(
        applyMiddleware(sagaMiddleware, logger)
    )
)
const persistor = persistStore(store)
sagaMiddleware.run(rootSaga);

export { store, persistor };