import { Navigate, Route, Routes } from 'react-router-dom';
import { MainLayout } from '@components/main-layout';
import { Paths } from './paths';
import { MainPage } from '@pages/main-page';
import { NotFoundPage } from '@pages/not-found-page';
import { LoginProfilePage } from '@pages/login-profile-page';
import { LoginProfileTabs } from '@pages/login-profile-page/login-profile-tabs';
import { ProfileLayout } from '@components/profile-layout';
import { Result } from '@components/result/result';

export const routes = (
    <Routes>
        <Route path={Paths.AUTH} element={<Navigate to={Paths.LOGIN} />} />
        <Route path={Paths.LOGIN} element={<LoginProfilePage />}>
            <Route index={true} element={<LoginProfileTabs />} />
            <Route path=':tabName' element={<LoginProfileTabs />} />
        </Route>
        <Route path={Paths.RESULT} element={<ProfileLayout />}>
            <Route path=':resultName' element={<Result />} />
        </Route>
        <Route element={<MainLayout />}>
            <Route path={Paths.MAIN} element={<MainPage />} />
        </Route>
        <Route path='*' element={<NotFoundPage />} />
    </Routes>
);
