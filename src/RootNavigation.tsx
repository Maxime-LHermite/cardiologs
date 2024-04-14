import { Home } from '@app/pages/Home';
import { Game } from '@app/pages/Game';
import { PathRenderers } from './utils/RoutesUtils';
import { NotFound } from '@app/pages/NotFound';
import { z } from 'zod';

export type RootPaths = {
    '/home': undefined;
    '/game/:width/:height/:bombs': { width: number; height: number; bombs: number };
    '404': undefined;
    '': undefined;
};

const gameScreenSchema = z
    .object({
        width: z.number().min(2),
        height: z.number().min(2),
        bombs: z.number().min(1),
    })
    .refine((data) => data.width * data.height > data.bombs);

export const rootNavigation: PathRenderers<RootPaths> = {
    '/home': { render: <Home /> },
    '/game/:width/:height/:bombs': {
        render: (params) => <Game {...params} />,
        schema: gameScreenSchema,
    },
    '404': { render: <NotFound /> },
    '': { render: <Home /> },
};
