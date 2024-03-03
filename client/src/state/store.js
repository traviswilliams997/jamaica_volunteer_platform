import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import volunteerReducer from '../reducers/volunteerReducer'
import postReducer from '../reducers/postReducer'
import agencyReducer from '../reducers/agencyReducer'

import globalReducer from '../reducers/globalReducer'
import hardSet from 'redux-persist/lib/stateReconciler/hardSet'
const rootReducer = combineReducers({
  posts: postReducer,
  volunteer: volunteerReducer,
  agency: agencyReducer,
  global: globalReducer,
})

const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: hardSet,
  version: 1,
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})
const persistor = persistStore(store)

export { store, persistor }
