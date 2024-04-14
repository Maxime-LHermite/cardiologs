import { AppDomain } from './Basics';

const isDebugMode = (): boolean => import.meta.env.DEV;

export type LoggerSpecs = {
    log: (domain: AppDomain, ...values: unknown[]) => void;
    warn: (domain: AppDomain, ...values: unknown[]) => void;
    error: (domain: AppDomain, ...values: unknown[]) => void;
    debug: (domain: AppDomain, ...values: unknown[]) => void;
    logValue: (domain: AppDomain, ...values: unknown[]) => (value: unknown) => void;
    warnValue: (domain: AppDomain, ...values: unknown[]) => (value: unknown) => void;
    errorValue: (domain: AppDomain, ...values: unknown[]) => (value: unknown) => void;
    debugValue: (domain: AppDomain, ...values: unknown[]) => (value: unknown) => void;
};

class ConsoleLogger implements LoggerSpecs {
    log = (domain: AppDomain, ...values: unknown[]): void => console.log(domain, ...values);
    warn = (domain: AppDomain, ...values: unknown[]): void => console.warn(domain, ...values);
    error = (domain: AppDomain, ...values: unknown[]): void => console.error(domain, ...values);
    debug = (domain: AppDomain, ...values: unknown[]): void => {
        isDebugMode() ? console.log(domain, ...values) : null;
    };
    logValue =
        (domain: AppDomain, ...values: unknown[]): ((value: unknown) => void) =>
        (value: unknown) =>
            console.log(domain, ...values, value);
    warnValue =
        (domain: AppDomain, ...values: unknown[]): ((value: unknown) => void) =>
        (value: unknown) =>
            console.log(domain, ...values, value);
    errorValue =
        (domain: AppDomain, ...values: unknown[]): ((value: unknown) => void) =>
        (value: unknown) =>
            console.log(domain, ...values, value);
    debugValue =
        (domain: AppDomain, ...values: unknown[]): ((value: unknown) => void) =>
        (value: unknown) =>
            isDebugMode() ? console.log(domain, ...values, value) : null;
}

export const Logger: LoggerSpecs = new ConsoleLogger();
