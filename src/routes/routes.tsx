import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from '@components/layout';
import { MainLayout } from '@components/main-layout';
import { Result } from '@components/result/result';
import {CalendarPage} from '@pages/calendar-page/calendar-page.tsx';
import { ChangePasswordPage } from '@pages/change-password-page';
import { ConfirmEmailPage } from '@pages/confirm-email-page';
import { LoginProfilePage } from '@pages/login-profile-page';
import { LoginProfileTabs } from '@pages/login-profile-page/login-profile-tabs';
import { MainPage } from '@pages/main-page';
import { NotFoundPage } from '@pages/not-found-page';
import { ResultProfilePage } from '@pages/result-profile-page';
import { ReviewsPage } from '@pages/reviews-page';

import { Paths } from './paths';

export const routes = (
    <Routes>
        <Route path={Paths.AUTH} element={<Layout />}>
            <Route index={true} element={<Navigate to={Paths.LOGIN} />} />
            <Route path={Paths.LOGIN} element={<LoginProfilePage />}>
                <Route index={true} element={<LoginProfileTabs />} />
                <Route path=':tabName' element={<LoginProfileTabs />} />
                <Route path={Paths.CONFIRM_EMAIL} element={<ConfirmEmailPage />} />
                <Route path={Paths.CHANGE_PASSWORD} element={<ChangePasswordPage />} />
            </Route>
            <Route path={Paths.RESULT} element={<ResultProfilePage />}>
                <Route index={true} path=':resultName' element={<Result />} />
            </Route>
            <Route element={<MainLayout />}>
                <Route path={Paths.MAIN} element={<MainPage />} />
            </Route>
            <Route element={<MainLayout isSimpleFooter={true}  isImage={false}/>}>
                <Route path={Paths.CALENDAR} element={<CalendarPage />} />
                <Route path={Paths.REVIEWS} element={<ReviewsPage />} />
            </Route>
            <Route path='*' element={<NotFoundPage />} />
        </Route>
    </Routes>
);
