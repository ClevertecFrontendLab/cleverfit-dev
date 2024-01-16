import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { accessTokenSelector } from '@redux/modules/app';
import { Paths } from '@routes/paths';

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
    const token = useAppSelector(accessTokenSelector);
    const location = useLocation();

    return token ? (
        children
    ) : (
        <Navigate to={Paths.AUTH} state={{ from: location }} replace={true} />
    );
};
