/* eslint-disable import/no-extraneous-dependencies */
import { createReduxHistoryContext, RouterState } from 'redux-first-history';
import appReducer, { appSlice, AppState } from '@redux/modules/app';
import { apiSlice } from '@redux/serviсes';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { CombinedState, EndpointDefinitions } from '@reduxjs/toolkit/query';
import { createBrowserHistory } from 'history';

const isProduction = false;

const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({
    history: createBrowserHistory(),
    savePreviousLocations: 2,
});

export type ApplicationState = Readonly<{
    [appSlice.name]: AppState;
    api: CombinedState<EndpointDefinitions, never, 'api'>;
    router: RouterState;
}>;

const rootReducer = combineReducers({
    [appSlice.name]: appReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    router: routerReducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware, routerMiddleware),
    devTools: !isProduction,
});

export const history = createReduxHistory(store);
