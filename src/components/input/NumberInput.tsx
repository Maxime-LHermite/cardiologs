import React, { useMemo, useState } from 'react';
import { GenericInput } from './GenericInput';
import { initEmptyInput, initInput, InputDecoder, InputModel, modelToResult, Validator } from './BaseInput';
import { Err, Ok, ResultType } from '@app/utils/Result';

/**
 * Component props
 */
type NumberInputProps = {
    initialValue?: number;
    validators: Validator<number>[];
    onInputChanged: (input: ResultType<number, string>) => void;
    decode: InputDecoder<number>;
    inputProps?: Omit<React.HTMLProps<HTMLInputElement>, 'value' | 'onChange'>;
};

/**
 * NumberInput
 * React Functional Component
 *
 * @param props
 */
export const NumberInput: React.FC<NumberInputProps> = ({ onInputChanged, initialValue, validators, decode, inputProps }) => {
    const [inputModel, setInputModel] = useState(initialValue ? initInput(initialValue, validators) : initEmptyInput<number>());

    const onChange = (newModel: InputModel<number>) => {
        setInputModel(newModel);
        onInputChanged(modelToResult(newModel, 0));
    };

    return (
        <GenericInput<number>
            inputModel={inputModel}
            onChange={onChange}
            decode={decode}
            encode={(value) => value.toString()}
            validators={validators}
            inputProps={inputProps}
        />
    );
};

type IntInputProps = {
    initialValue?: number;
    min?: number;
    max?: number;
    onInputChanged: (input: ResultType<number, string>) => void;
    inputProps?: Omit<React.HTMLProps<HTMLInputElement>, 'value' | 'onChange'>;
};

export const IntInput: React.FC<IntInputProps> = ({ initialValue, min, max, onInputChanged, inputProps }) => {
    const validator = useMemo(() => [minMaxValidator(min, max)], [min, max]);
    return (
        <NumberInput initialValue={initialValue} onInputChanged={onInputChanged} inputProps={inputProps} decode={intDecoder} validators={validator} />
    );
};

const intDecoder = (value: string): ResultType<number, string> => {
    const decodedNumber = parseInt(value);
    if (isNaN(decodedNumber)) {
        return Err('Int decode error');
    } else {
        return Ok(decodedNumber);
    }
};

const minMaxValidator = (min?: number, max?: number): Validator<number> => {
    return (value) => {
        if (min !== undefined && value < min) {
            return Err('');
        } else if (max !== undefined && value > max) {
            return Err('');
        } else {
            return Ok(value);
        }
    };
};
