import React, { createContext, PropsWithChildren, useEffect, useState } from 'react';

/**
 * Component props
 */
type WindowResizeProps = PropsWithChildren<{
    // Empty
}>;

const windowSize = {
    width: window.innerWidth,
    height: window.innerHeight,
};

const WindowSizeContext = createContext(windowSize);

export const WindowResize: React.FC<WindowResizeProps> = ({ children }) => {
    const [value, setValue] = useState(windowSize);
    useEffect(() => {
        return window.addEventListener('resize', () => {
            setValue({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        });
    }, []);
    return <WindowSizeContext.Provider value={value}>{children}</WindowSizeContext.Provider>;
};
