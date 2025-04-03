import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import { combineReducers } from 'redux';
import authReducer from './slices/authSlice';
import transactionReducer from './slices/transactionSlice';
import { persistConfig } from './persistConfig';

const rootReducer = combineReducers({
  auth: authReducer,
  transactions: transactionReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Add store subscription for debugging
store.subscribe(() => {
  console.log('Redux Store State:', store.getState());
});

export const persistor = persistStore(store);