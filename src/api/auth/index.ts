import axiosInstance, { getAxiosInstance } from "../axios";
import { endpoint } from "../endpoint";
import { localStore } from "utils";
import { AxiosResponse } from "axios";

interface login {
    email?: string;
    password?: string;
}

export interface GetMeResponse {
    id: number;
    name: string;
    gender: number;
    avatar: string;
    email: string;
    phone: string;
    role: number;
}

export const postLogin = async ( request: login ) => {
    const response = await axiosInstance.post(endpoint.auth.login, request);
    localStore.store("token", response.data.access_token);
    return response.data;
};

export const postLogout = async (): Promise<void> => {
    localStore.remove("token");
};

export const getMe = async (): Promise<GetMeResponse> => {
    const axiosInstance = await getAxiosInstance();

    const response: AxiosResponse<GetMeResponse> = await axiosInstance.get(endpoint.auth.getMe);
    return response.data;
};