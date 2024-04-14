import React, { ChangeEventHandler, ReactElement, useEffect } from 'react';
import { useStyles } from '../../hooks/useTheme';
import { css, cx } from '@emotion/css';
import { InputChangeListener, InputDecoder, InputEncoder, InputModel, inputReducer, Validator } from './BaseInput';

/**
 * Component props
 */
type GenericInputProps<T> = {
    inputModel: InputModel<T>;
    onChange: InputChangeListener<T>;
    decode: InputDecoder<T>;
    encode: InputEncoder<T>;
    validators: Validator<T>[];
    inputProps?: Omit<React.HTMLProps<HTMLInputElement>, 'value' | 'onChange'>;
};

/**
 * GenericInput
 * React Functional Component
 *
 * @param props
 */
export const GenericInput = <T,>({ inputModel, onChange, decode, encode, validators, inputProps }: GenericInputProps<T>): ReactElement => {
    const styles = useStyles(makeStyles);

    // Update model if validators change
    useEffect(() => {
        switch (inputModel.status) {
            case 'Valid':
            case 'Invalid':
                onChange(inputReducer(inputModel, { type: 'setValue', value: inputModel.value, validators }));
                break;
            case 'Empty':
                break;
        }
    }, [validators]);

    const onInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        const value = event.target.value;
        if (value === '') {
            onChange(inputReducer(inputModel, { type: 'setEmpty' }));
        } else {
            const result = decode(value);
            switch (result.status) {
                case 'Ok':
                    onChange(inputReducer(inputModel, { type: 'setValue', value: result.data, validators }));
                    break;
                case 'Err':
                    break;
            }
        }
    };

    const { className, ...remainingInputProps } = inputProps ?? {};
    return (
        <div className={styles.container}>
            <input
                className={cx(styles.input, className)}
                onChange={onInputChange}
                value={inputModel.status === 'Empty' ? '' : encode(inputModel.value)}
                {...remainingInputProps}
            />
        </div>
    );
};

const makeStyles = () => ({
    container: css``,
    input: css``,
});
