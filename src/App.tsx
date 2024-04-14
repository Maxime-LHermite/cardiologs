import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/Store';
import { createRoot } from 'react-dom/client';
import { Logger } from './utils/Logger';
import { injectGlobal } from '@emotion/css';
import { Fonts } from './assets/Fonts';
import { CustomBrowserRouter, History } from './utils/CustomBrowserRouter';
import { WindowResize } from '@app/components/WindowResize';
import { AppRoutes } from '@app/utils/RoutesUtils';
import { rootNavigation } from '@app/RootNavigation';

export const App: React.FC = () => {
    return (
        <Provider store={store}>
            <WindowResize>
                <CustomBrowserRouter>
                    <AppRoutes pathRenderers={rootNavigation} history={History} />
                </CustomBrowserRouter>
            </WindowResize>
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

injectGlobal`
    @font-face {  
        font-family: 'Roboto';  
        font-style: normal;  
        font-weight: 400;  
        font-display: swap;  
        src: local('Roboto'), local('Roboto-Regular'), url(${Fonts.Roboto.Regular}) format('truetype');  
    }
    
    @font-face {  
        font-family: 'Roboto';  
        font-style: normal;  
        font-weight: 700;  
        font-display: swap;  
        src: local('Roboto Bold'), local('Roboto-Bold'), url(${Fonts.Roboto.Bold}) format('truetype');  
    }
    
    body {
        font-family: 'Roboto', 'Source Sans Pro', 'Trebuchet MS', 'Lucida Grande', 'Bitstream Vera Sans', 'Helvetica Neue', sans-serif;
        margin: 0;
        padding: 0;
        background-color: #fafafa;
        color: rgba(0, 0, 0, 0.87);
        overflow: hidden;
    }
`;
