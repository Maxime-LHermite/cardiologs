import React from 'react';
import { useStyles } from '../hooks/useTheme';
import { css } from '@emotion/css';

/**
 * Component props
 */
type GameProps = {
    bombs: number;
    width: number;
    height: number;
};

/**
 * Game
 * React Functional Component
 *
 */
export const Game: React.FC<GameProps> = () => {
    const styles = useStyles(makeStyles);
    console.log(styles);
    return <></>;
};

const makeStyles = () => ({
    container: css``,
});
