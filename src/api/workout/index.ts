import axiosInstance from "api/axios";
import { endpoint } from "api/endpoint";
import { PaginationType } from "contains/type";


export const getDetailWorkout = async (id: string | number) => {
    const response = await axiosInstance.get(endpoint.workout.getDetail(id));
    return response.data;
}

export const getListWorkoutsSelect = async () => {
    const response = await axiosInstance.get(endpoint.workout.getList, {});
    return response.data;
}