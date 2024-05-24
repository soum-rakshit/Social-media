import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import authReducer from "./state";
import { configureStore } from "@reduxjs/toolkit";
//redux-persist is used to save all the states in local state
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from "redux-persist";
  import storage from "redux-persist/lib/storage";
  import { Provider } from "react-redux";
  import { PersistGate } from "redux-persist/integration/react";

  const persistConfig = { key: "root", storage, version: 1 };
  const persistedReducer = persistReducer(persistConfig, authReducer);
  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
            //ignores warnings
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)}>
        <App />
      </PersistGate>
    </Provider>
    </React.StrictMode>
);


//Note : Redux package is a safe choice for a state management tool as it has been in market for a long time and therefore there are high chances that the specific edge cases in projects are already taken care of compared to other packages therfore making scaling of application easier