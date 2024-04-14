import React from 'react';
import { useStyles } from '../hooks/useTheme';
import { css } from '@emotion/css';

/**
 * Component props
 */
type NotFoundProps = {
    // Empty
};

/**
 * NotFound
 * React Functional Component
 *
 */
export const NotFound: React.FC<NotFoundProps> = () => {
    const styles = useStyles(makeStyles);

    return <div className={styles.container}></div>;
};

const makeStyles = () => ({
    container: css``,
});
