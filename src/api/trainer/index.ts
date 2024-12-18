import axiosInstance from "api/axios";
import { endpoint } from "api/endpoint";
import { PaginationType } from "contains/type";
import { FilterTrainer } from "states/slices/trainer";

export interface TrainerDataType {
    TrainerId: string | number;
    email: string;
    name: string;
    phone: string;
    avatar: string;
    address: string;
    birth_date: string;
    gender: string;
    specialty: string;
    experience: string;
    reviewCount: number;
    reviewStart: number;
}


export const getListTrainers = async (
    request?: FilterTrainer
): Promise<{ data: any[]; meta: PaginationType }> => {
    const response = await axiosInstance.get(endpoint.trainer.getList, {
        params: {
            ...request,
            ...request?.page,
        },
    });
    return response.data;
}

export const getDetailTrainer = async (id: string | number) => {
    const response = await axiosInstance.get(endpoint.trainer.getDetail(id));
    return response.data;
}

export const getListTrainersSelect = async () => {
    const response = await axiosInstance.get(endpoint.trainer.getList, {});
    return response.data;
}