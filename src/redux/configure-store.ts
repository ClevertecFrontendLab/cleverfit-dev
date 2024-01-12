import { createReduxHistoryContext, RouterState } from 'redux-first-history';
import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { createBrowserHistory } from 'history';
import { apiSlice } from '@redux/serviсes';
import { CombinedState, EndpointDefinitions } from '@reduxjs/toolkit/query';
import appReducer, { appSlice, AppState } from '@redux/modules/app';

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
