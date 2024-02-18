export const navigateAfterRequest = async (
    navigate: any,
    request: any,
    routes: string[],
    route: string,
) => {
    if (routes.includes(route)) {
        await request().unwrap();
    }

    navigate(route);
};
