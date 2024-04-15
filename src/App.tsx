import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/Store';
import { createRoot } from 'react-dom/client';
import { Logger } from './utils/Logger';
import { CustomBrowserRouter, History } from './utils/CustomBrowserRouter';
import { WindowResize } from '@app/components/WindowResize';
import { AppRoutes } from '@app/utils/RoutesUtils';
import { rootNavigation } from '@app/RootNavigation';
import { Translation } from '@app/I18n';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export const App: React.FC = () => {
    return (
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <Translation>
                    <WindowResize>
                        <CustomBrowserRouter>
                            <AppRoutes pathRenderers={rootNavigation} history={History} />
                        </CustomBrowserRouter>
                    </WindowResize>
                </Translation>
            </QueryClientProvider>
        </Provider>
    );
};

const rootElement = document.getElementById('app');

if (rootElement) {
    createRoot(rootElement, {
        onRecoverableError: Logger.debugValue('App'),
        identifierPrefix: 'react',
    }).render(<App />);
}
