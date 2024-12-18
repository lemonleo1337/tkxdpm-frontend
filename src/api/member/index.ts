import axiosInstance from "api/axios";
import { endpoint } from "api/endpoint";

export const getMemberDetail = async (id: string | number) => {
    const response = await axiosInstance.get(endpoint.member.getDetail(id));
    return response.data;
}

export const getMemberBodyMeasurements = async (id: string | number) => {
    const response = await axiosInstance.get(endpoint.member.getBody(id));
    return response.data;
}
