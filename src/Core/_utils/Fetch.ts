import axios, { AxiosResponse } from 'axios';

interface PostData {
    service: string;
    method: string;
    data?: Record<string, unknown>;
}

const SERVICE: string = 'Atredo';
const PORT: number = 8443;

function getRequestUrl() {
    return `${window.location.protocol}//${window.location.hostname}:${PORT}`;
}

export function post<TReturnType = unknown>(
    method: string,
    data?: Record<string, unknown>
): Promise<AxiosResponse<TReturnType>> {
    return axios.post<TReturnType>(
        getRequestUrl(),
        { service: SERVICE, method, data } as PostData
    );
}
