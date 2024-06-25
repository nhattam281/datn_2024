import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import createFilter from 'redux-persist-transform-filter';
import storage from 'redux-persist/lib/storage';
import authSlice from './slices/authSlice';
import categorySlice from './slices/categorySlice';
import postSlice from './slices/postSlice';
import userSlice from './slices/userSlice';

const persistConfig = {
    key: 'auth',
    storage,
    whitelist: ['auth'],
    transforms: [
        createFilter(
            'auth',
            ['isLoggin', 'token', 'loading'], // Danh sách các trạng thái muốn lưu
            null
        ),
    ],
};

const rootReducer = combineReducers({
    auth: authSlice.reducer,
    currentUser: userSlice.reducer,
    category: categorySlice.reducer,
    posts: postSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
export default store;
