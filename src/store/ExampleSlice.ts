import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/////////////////////////////////////////////
///////////////// PAYLOADS //////////////////
/////////////////////////////////////////////

type UpdateValuePayload = string;

/////////////////////////////////////////////
/////////////////// SLICE ///////////////////
/////////////////////////////////////////////

type ExampleState = {
    value: string;
};

const initialState: ExampleState = {
    value: 'Hello world!',
};

export const exampleSlice = createSlice({
    name: 'Example' as const,
    initialState,
    reducers: {
        updateValue: (state, action: PayloadAction<UpdateValuePayload>): ExampleState => ({
            ...state,
            value: action.payload,
        }),
    },
});

/////////////////////////////////////////////
////////////////// EXPORTS //////////////////
/////////////////////////////////////////////

export const exampleActions = {
    updateValue: exampleSlice.actions.updateValue,
};
