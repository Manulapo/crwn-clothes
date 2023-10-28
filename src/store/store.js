import { applyMiddleware, configureStore } from "@reduxjs/toolkit";
import { compose } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { rootReducer } from "./root-reducer";

// redux persist
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  // localstorage by default
  storage,
  blacklist: ["user"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Define the middleware, including the redux-logger middleware
// it only appears when the env is development, otherwise it will clear the array
const middlewares = [process.env.NODE_ENV !== 'production' && logger].filter(Boolean);

const composeEnhancer = (process.env.NODE_ENV !== 'production' && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const composedEnhancers = composeEnhancer(applyMiddleware(...middlewares))

// Create the Redux store using configureStore
export const store = configureStore({
  reducer: persistedReducer,
  undefined,
  composedEnhancers, // Apply the defined middleware
});

export const persistor = persistStore(store);
