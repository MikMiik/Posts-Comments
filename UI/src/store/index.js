import { combineReducers, configureStore } from "@reduxjs/toolkit"
import storage from "redux-persist/lib/storage"
import persistReducer from "redux-persist/es/persistReducer"
import { setupListeners } from '@reduxjs/toolkit/query'

import authReducer from "@/features/auth/authSlice"
import persistStore from "redux-persist/es/persistStore"
import { postsApi } from "@/features/posts/postAPI"

const persistConfig = {
    key: "root",
    storage,
    // blacklist,
    // whitelist
}

const rootReducer = combineReducers({
    auth: authReducer,
    [postsApi.reducerPath]: postsApi.reducer,
})

const store = configureStore({
    reducer: persistReducer(persistConfig, rootReducer),
    middleware: (getDefaultMiddleware) => [
        ...getDefaultMiddleware({ serializableCheck: false }),
        postsApi.middleware,
    ],
})
setupListeners(store.dispatch)

export const persistor = persistStore(store)
export default store
