/* eslint-disable import/no-extraneous-dependencies */
import { Provider } from 'react-redux';
import { HistoryRouter } from 'redux-first-history/rr6';
import { Loader } from '@components/loader';
import { history, store } from '@redux/configure-store';
import { routes } from '@routes/routes';

export const App = () => (
    <Provider store={store}>
        <HistoryRouter history={history}>{routes}</HistoryRouter>
        <Loader />
    </Provider>
);
