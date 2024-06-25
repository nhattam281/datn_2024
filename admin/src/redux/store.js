import { combineReducers, configureStore, current } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import createFilter from 'redux-persist-transform-filter';
import storage from 'redux-persist/lib/storage';
import adminsSlice from './slices/adminsSlice';
import authSlice from './slices/authSlice';
import categorySlice from './slices/categorySlice';
import currentUserSlice from './slices/currentUserSlice';
import postsSlice from './slices/postsSlice';
import usersSlice from './slices/usersSlice';

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
    currentUser: currentUserSlice.reducer,
    admins: adminsSlice.reducer,
    category: categorySlice.reducer,
    users: usersSlice.reducer,
    posts: postsSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
export default store;
