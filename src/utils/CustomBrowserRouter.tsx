import React, { useContext } from 'react';
import { BrowserRouterProps } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Router } from 'react-router';

export const History = createBrowserHistory({ window });
export const HistoryProvider = React.createContext(History);

const CustomInternalBrowserRouter: React.FC<BrowserRouterProps> = ({ basename, children }) => {
    const history = useContext(HistoryProvider);

    const [state, setState] = React.useState({
        action: history.action,
        location: history.location,
    });

    React.useLayoutEffect(() => history.listen(setState), [history]);

    return (
        <Router basename={basename} location={state.location} navigationType={state.action} navigator={history}>
            {children}
        </Router>
    );
};

export const CustomBrowserRouter: React.FC<BrowserRouterProps> = (props) => {
    return (
        <HistoryProvider.Provider value={History}>
            <CustomInternalBrowserRouter {...props} />
        </HistoryProvider.Provider>
    );
};
