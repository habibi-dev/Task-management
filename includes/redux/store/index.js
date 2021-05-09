import {applyMiddleware, compose, createStore} from 'redux';
import thunk from 'redux-thunk';
// import storage from 'redux-persist/lib/storage'
import AsyncStorage from '@react-native-community/async-storage';
import {persistReducer, persistStore} from 'redux-persist'
import rootReducer from '../reducers'

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleware = [thunk];

const store = createStore(
    persistedReducer,
    undefined,
    compose(
        applyMiddleware(...middleware)
    )
);
persistStore(store);

export default store;
