import { RequireAuth } from '@components/require-auth';

export const ProfilePage = () => (
    <RequireAuth>
        <div>profile</div>
    </RequireAuth>
);
