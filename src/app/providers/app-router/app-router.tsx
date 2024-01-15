import { Route, Routes } from 'react-router-dom';
import { routeConfig } from '@config/route-config';

export const AppRouter = () => (
    <Routes>
        {Object.values(routeConfig).map(({ path, element }) => (
            <Route path={path} element={element} key={path} />
        ))}
    </Routes>
);
