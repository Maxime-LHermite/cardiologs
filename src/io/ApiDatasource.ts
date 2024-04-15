import axios, { AxiosInstance, AxiosRequestConfig, Method } from 'axios';
import { Schema } from 'zod';

const AXIOS_NOT_INITIALIZED_ERROR = 'AXIOS_NOT_INITIALIZED';

export type AxiosConfig = AxiosRequestConfig & {
    apiVersion?: 'v1';
};

class ApiDatasource {
    axiosInstance: AxiosInstance | undefined;

    constructor() {
        this.axiosInstance = axios.create({
            baseURL: 'http://localhost:3000/api',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });
    }

    request = async <T>(method: Method, url: string, schema: Schema<T>, config?: AxiosConfig): Promise<T> => {
        if (!this.axiosInstance) {
            throw new Error(AXIOS_NOT_INITIALIZED_ERROR);
        }
        const baseUrl = config?.baseURL || this.axiosInstance.defaults.baseURL;
        const apiVersion = config?.apiVersion || 'v1';
        const result = await this.axiosInstance.request({
            ...config,
            baseURL: `${baseUrl}/${apiVersion}`,
            method,
            url,
        });
        return schema.parse(result.data);
    };

    get = <T>(url: string, schema: Schema<T>, config?: AxiosConfig): Promise<T> => this.request('get', url, schema, config);

    post = <T>(url: string, schema: Schema<T>, data?: unknown, config?: AxiosConfig): Promise<T> =>
        this.request('post', url, schema, {
            ...config,
            data,
        });

    put = <T>(url: string, schema: Schema<T>, data?: unknown, config?: AxiosConfig): Promise<T> =>
        this.request('put', url, schema, {
            ...config,
            data,
        });

    patch = <T>(url: string, schema: Schema<T>, data?: unknown, config?: AxiosConfig): Promise<T> =>
        this.request('patch', url, schema, {
            ...config,
            data,
        });

    delete = <T>(url: string, schema: Schema<T>, config?: AxiosConfig): Promise<T> => this.request('delete', url, schema, config);
}

export type ApiDataSourceSpec = {
    get: <T>(url: string, schema: Schema<T>, config?: AxiosConfig) => Promise<T>;
    post: <T>(url: string, schema: Schema<T>, data?: unknown, config?: AxiosConfig) => Promise<T>;
    put: <T>(url: string, schema: Schema<T>, data?: unknown, config?: AxiosConfig) => Promise<T>;
    patch: <T>(url: string, schema: Schema<T>, data?: unknown, config?: AxiosConfig) => Promise<T>;
    delete: <T>(url: string, schema: Schema<T>, config?: AxiosConfig) => Promise<T>;
};

export const apiDataSource = new ApiDatasource();
