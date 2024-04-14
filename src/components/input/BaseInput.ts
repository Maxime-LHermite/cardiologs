import { Err, Ok, ResultType } from '../../utils/Result';

export type Validator<T> = (value: T) => ResultType<T, string>;
export type TouchStatus = 'Pristine' | 'Touched';
export type InputModel<T> =
    | {
          status: 'Empty';
          touch: TouchStatus;
      }
    | {
          status: 'Valid';
          value: T;
          touch: TouchStatus;
      }
    | {
          status: 'Invalid';
          value: T;
          error: string;
          touch: TouchStatus;
      };

export type InputDecoder<T> = (value: string) => ResultType<T, string>;
export type InputEncoder<T> = (value: T) => string;
export type InputChangeListener<T> = (inputResult: InputModel<T>) => void;

export type InputActions<T> =
    | { type: 'setEmpty' }
    | { type: 'setValue'; value: T; validators: Validator<T>[] }
    | { type: 'setTouch'; touch: TouchStatus };

export const inputReducer = <T>(state: InputModel<T>, action: InputActions<T>): InputModel<T> => {
    switch (action.type) {
        case 'setTouch':
            return {
                ...state,
                touch: action.touch,
            };
        case 'setEmpty':
            return {
                status: 'Empty',
                touch: state.touch,
            };
        case 'setValue': {
            const validation = validate(action.value, action.validators);
            switch (validation.status) {
                case 'Ok':
                    return {
                        status: 'Valid',
                        value: action.value,
                        touch: state.touch,
                    };
                case 'Err':
                    return {
                        status: 'Invalid',
                        value: action.value,
                        error: validation.error,
                        touch: state.touch,
                    };
            }
        }
    }
};

const validate = <T>(data: T, validators: Validator<T>[]): ResultType<T, string> => {
    let result = Ok<T, string>(data);
    let i = 0;
    const length = validators.length;
    loop: while (i < length) {
        const validatorResult = validators[i](data);
        switch (validatorResult.status) {
            case 'Ok':
                i++;
                break;
            case 'Err':
                result = validatorResult;
                break loop;
        }
    }
    return result;
};

export const initEmptyInput = <T>(): InputModel<T> => ({ status: 'Empty', touch: 'Pristine' });

export const initInput = <T>(value: T, validators: Validator<T>[]): InputModel<T> => {
    return inputReducer(initEmptyInput(), { type: 'setValue', value, validators });
};

export const modelToResult = <T>(model: InputModel<T>, defaultValue: T): ResultType<T, string> => {
    switch (model.status) {
        case 'Empty':
            return Ok(defaultValue);
        case 'Valid':
            return Ok(model.value);
        case 'Invalid':
            return Err('Invalid');
    }
};
