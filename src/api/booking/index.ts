import { getAxiosInstance } from "api/axios";
import { endpoint } from "api/endpoint";

export interface PostCreateBookingRequest {
    startDate: string;
    endDate: string;
    trainingTimes: TimeSlot[];
    serviceId?: number;
}

export interface BookingDataType {
    serviceName?: string;
    servicePrice?: string | number;
    serviceThumbnail?: string;
    serviceType?: string | number;
    serviceDuration?: string | number;
    serviceDescription?: string;
    trainerName?: string;
    date?: string;
    startTime?: string;
    endTime?: string;
    bookingId?: string | number;
    memberId?: string | number;
    participants?: string | number;
    payment_method?: string | number;
    notes?: string;
    status?: string | number;
    bookingTrainerName?: string;
    workoutName?: string;
    workoutDuration?: string | number;
    workoutThumbnail?: string;
}

export interface TimeSlot {
    dayOfWeek: number;
    start_time: string;
    end_time: string;
    workout: number;
    trainer: number;
}

export interface Trainer {
    id: number;
    name: string;
}

export interface Workout {
    id: number;
    name: string;
    duration: number;
    trainers: Trainer[];
    trainingTime: {
        start: string;
        end: string;
        trainer: number;
    };
}

export interface Session {
    id: number;
    name: string;
    trainingDay: number | null;
    workouts: Workout[];
}
export const postCreateBooking = async (request: PostCreateBookingRequest): Promise<{
  statusCode: number; data: any 
}> => {
    const response = await getAxiosInstance().post(endpoint.booking.create, request);
    return response.data;
}

export const getListBooking = async (): Promise<{ data: BookingDataType[] }> => {
    const response = await getAxiosInstance().get(endpoint.booking.getList);
    return response.data;
}

export const getBookingDetail = async (id: number): Promise<{ data: BookingDataType }> => {
    const response = await getAxiosInstance().get(endpoint.booking.getDetail(id), { params: { id } });
    return response.data;
}