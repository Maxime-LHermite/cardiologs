import React, { PropsWithChildren } from 'react';
import { css, cx } from '@emotion/css';
import { Theme } from '../../models/ThemeModel';
import { useStyles } from '../hooks/useTheme';

type TextType =
    | 'Title1'
    | 'Title2'
    | 'Title3'
    | 'Title4'
    | 'Paragraph1'
    | 'Paragraph2'
    | 'Paragraph3'
    | 'Paragraph4'
    | 'Paragraph5'
    | 'Error'
    | 'Warning'
    | 'ErrorMessage'
    | 'SuccessMessage'
    | 'ValidationError';

type TypoProps = {
    textType: TextType;
    textStyle?: string;
    Component?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
};

export const Typo: React.FC<PropsWithChildren<TypoProps>> = ({ textType, textStyle, children, Component = 'p' }) => {
    const styles = useStyles(makeStyles, textType);
    return <Component className={cx(styles.text, textStyle)}>{children}</Component>;
};

const makeStyles = (theme: Theme, textType: TextType) => ({
    text: (() => {
        switch (textType) {
            case 'Title1':
                return css`
                    color: ${theme.colors.typoMax};
                    font-size: ${theme.fontSizes.XXL}rem;
                    font-weight: bold;
                `;
            case 'Title2':
                return css``;
            case 'Title3':
                return css``;
            case 'Title4':
                return css``;
            case 'Paragraph1':
                return css`
                    color: ${theme.colors.typoMedium};
                    font-size: ${theme.fontSizes.M}rem;
                    font-weight: normal;
                `;
            case 'Paragraph2':
                return css``;
            case 'Paragraph3':
                return css``;
            case 'Paragraph4':
                return css``;
            case 'Paragraph5':
                return css``;
            case 'Error':
                return css``;
            case 'Warning':
                return css``;
            case 'ErrorMessage':
                return css``;
            case 'SuccessMessage':
                return css``;
            case 'ValidationError':
                return css``;
        }
    })(),
});
