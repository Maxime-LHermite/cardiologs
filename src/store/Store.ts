import { ActionCreator, configureStore, Dispatch } from '@reduxjs/toolkit';
import { exampleSlice, exampleActions } from '@app/store/ExampleSlice';
import { TypedUseSelectorHook, UseDispatch, useDispatch, useSelector } from 'react-redux';

type TypedAction<T extends Record<string, ActionCreator<unknown>>> = T[keyof T] extends ActionCreator<infer U> ? U : never;

const reducers = {
    example: exampleSlice.reducer,
};

type AppActions = TypedAction<typeof exampleActions>;

export const store = configureStore({
    reducer: reducers,
});

export type RootState = ReturnType<typeof store.getState>;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: UseDispatch<Dispatch<AppActions>> = useDispatch;
