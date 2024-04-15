import { Home } from '@app/pages/Home';
import { PathRenderers } from './utils/RoutesUtils';

export type RootPaths = {
    '/home': undefined;
    '': undefined;
};

export const rootNavigation: PathRenderers<RootPaths> = {
    '/home': { render: <Home /> },
    '': { render: <Home /> },
};
