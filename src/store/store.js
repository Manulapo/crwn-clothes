import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { rootReducer } from "./root-reducer";

// Define the middleware, including the redux-logger middleware
const middleware = [logger];

// Create the Redux store using configureStore
export const store = configureStore({
  reducer: rootReducer,
  middleware, // Apply the defined middleware
});


