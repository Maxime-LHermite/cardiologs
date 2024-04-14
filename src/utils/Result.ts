type Ok<D> = { status: 'Ok'; data: D };
type Err<E = undefined> = { status: 'Err'; error: E };

type Result<D, E> = (Ok<D> | Err<E>) & {
    map: <D2>(fn: (d: D) => D2) => Result<D2, E>;
    mapError: <E2>(fn: (e: E) => E2) => Result<D, E2>;
    andThen: <D2, E2>(fn: (d: D) => Result<D2, E2>) => Result<D, E> | Result<D2, E2>;
    isOk: () => boolean;
    isErr: () => boolean;
};

const Ok = <D, E = undefined>(data: D): Result<D, E> => {
    const ok: Ok<D> = { status: 'Ok', data };
    return {
        ...ok,
        map: <D2>(fn: (d: D) => D2) => Ok<D2, E>(fn(ok.data)),
        mapError: <E2>() => ok as Result<D, E2>,
        andThen: <D2, E2>(fn: (d: D) => Result<D2, E2>) => fn(ok.data),
        isOk: () => true,
        isErr: () => false,
    };
};

const Err = <D, E>(error: E): Result<D, E> => {
    const err: Err<E> = { status: 'Err', error };
    return {
        ...err,
        map: <D2>() => err as Result<D2, E>,
        mapError: <E2>(fn: (e: E) => E2) => Err<D, E2>(fn(err.error)),
        andThen: () => err as Result<D, E>,
        isOk: () => false,
        isErr: () => true,
    };
};
