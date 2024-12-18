import { PencilSquareIcon, PlusIcon } from "@heroicons/react/24/solid";
import { PostCreateBookingRequest, postCreateBooking } from "api/booking";
import { getListWorkoutsSelect } from "api/workout";
import ModalSelectDate from "components/ModalSelectDate";
import moment from "moment";
import { FC, useState } from "react";
import { useMutation, useQuery } from 'react-query';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ButtonPrimary from "shared/Button/ButtonPrimary";

export interface CreateBookingPageProps {
    className?: string;
}

const fetchWorkouts = async () => {
    const { data } = await getListWorkoutsSelect();
    return data.map((workout: any) => ({
        label: workout.name,
        value: workout.id,
        duration: workout.duration, // Assuming duration is provided in minutes
        trainers: workout.trainers.map((trainer: any) => ({
            label: trainer.staff.user.name,
            value: trainer.id,
        }))
    }))
};

const CreateBookingPage: FC<CreateBookingPageProps> = ({ className = "" }) => {
    interface Day {
        label: string;
        value: number;
    }

    interface TimeSlot {
        start_time: string;
        end_time: string;
        workout: number;
        trainer: number;
    }

    const daysOfWeek: Day[] = [
        { label: 'Chủ nhật', value: 0 },
        { label: 'Thứ 2', value: 1 },
        { label: 'Thứ 3', value: 2 },
        { label: 'Thứ 4', value: 3 },
        { label: 'Thứ 5', value: 4 },
        { label: 'Thứ 6', value: 5 },
        { label: 'Thứ 7', value: 6 },
    ];

    const { data: workoutOptions, isLoading: isLoadingWorkouts, error: errorWorkouts } = useQuery('workouts', fetchWorkouts);
    const [defaultStartDate, setDefaultStartDate] = useState<moment.Moment | null>(moment().add(7, "days"));
    const [defaultEndDate, setDefaultEndDate] = useState<moment.Moment | null>(moment().add(7, "days"));
    const [timeSlots, setTimeSlots] = useState<TimeSlot[][]>([[], [], [], [], [], [], []]);

    const [errorDetails, setErrorDetails] = useState<{ note: string; reason: string }[]>([]);
    const navigate = useNavigate();
    const getTimesByDay = (dayIndex: number) => {
        return timeSlots[dayIndex];
    };

    const addTimeSlot = (dayIndex: number) => {
        setTimeSlots(prevTimeSlots => {
            const newTimeSlots = [...prevTimeSlots];
            newTimeSlots[dayIndex] = [...newTimeSlots[dayIndex], { start_time: '', end_time: '', workout: 0, trainer: 0 }];
            return newTimeSlots;
        });
    };

    const removeTimeSlot = (dayIndex: number, timeIndex: number) => {
        setTimeSlots(prevTimeSlots => {
            const newTimeSlots = [...prevTimeSlots];
            newTimeSlots[dayIndex] = newTimeSlots[dayIndex].filter((_, index) => index !== timeIndex);
            return newTimeSlots;
        });
    };

    const handleCreateBooking = async () => {
        if (!defaultStartDate || !defaultEndDate) {
            toast.error("Vui lòng chọn ngày bắt đầu và kết thúc");
            return;
        }

        if (defaultStartDate?.isAfter(defaultEndDate)) {
            toast.error("Ngày kết thúc phải sau ngày bắt đầu");
            return;
        }

        if (timeSlots.some(timeSlot => timeSlot.some(time => !time.start_time || !time.workout))) {
            toast.error("Vui lòng nhập đầy đủ thông tin cho tất cả các khung giờ");
            return;
        }

        const data = {
            startDate: defaultStartDate?.format("YYYY-MM-DD"),
            endDate: defaultEndDate?.format("YYYY-MM-DD"),
            trainingTimes: timeSlots.map((timeSlot, dayIndex) => {
                return timeSlot.map((time) => ({
                    dayOfWeek: dayIndex,
                    start_time: time.start_time,
                    end_time: time.end_time,
                    workout: time.workout,
                    trainer: time.trainer,
                }));
            }).flat()
        } as PostCreateBookingRequest;

        try {
            const res = await createBookingMutation.mutateAsync(data);

            if (res?.statusCode === 201) {
                const navigationState = {
                    defaultStartDate: defaultStartDate?.format("YYYY-MM-DD"),
                    defaultEndDate: defaultEndDate?.format("YYYY-MM-DD"),
                    bookings: res.data
                };
                navigate("/services/pay-done", { state: navigationState });
            }
        } catch (error: any) {
            if (error?.response?.data?.details) {
                setErrorDetails(error.response.data.details);
            }
            toast.error("Đặt lịch thất bại");
        }
    };

    const createBookingMutation = useMutation(postCreateBooking);

    const handleTimeChange = (dayIndex: number, timeIndex: number, field: 'start_time' | 'workout', value: string | number) => {
        setTimeSlots(prevTimeSlots => {
            const newTimeSlots = [...prevTimeSlots];
            const timeSlot = { ...newTimeSlots[dayIndex][timeIndex], [field]: value };
            newTimeSlots[dayIndex][timeIndex] = timeSlot;

            if (field === 'start_time') {
                const workout = workoutOptions.find((w: { value: number; }) => w.value === timeSlot.workout);
                if (workout) {
                    const endTime = moment(value, 'HH:mm').add(workout.duration, 'minutes').format('HH:mm');
                    timeSlot.end_time = endTime;
                }
            } else if (field === 'workout') {
                const workout = workoutOptions.find((w: { value: number; }) => w.value === Number(value));
                if (workout && timeSlot.start_time) {
                    const endTime = moment(timeSlot.start_time, 'HH:mm').add(workout.duration, 'minutes').format('HH:mm');
                    timeSlot.end_time = endTime;
                }
            }

            return newTimeSlots;
        });
    };

    const renderContent = () => {
        if (isLoadingWorkouts) {
            return <div>Loading...</div>;
        }

        if (errorWorkouts) {
            return <div>There was an error loading the data.</div>;
        }

        return (
            <div className="w-full flex flex-col sm:rounded-2xl sm:border border-neutral-200 dark:border-neutral-700 space-y-8 px-0 sm:p-6 xl:p-8">
                <h2 className="text-3xl lg:text-4xl font-semibold">
                    Đăng ký lịch tập tự do
                </h2>

                <div className="mt-6 border border-neutral-200 dark:border-neutral-700 rounded-3xl flex flex-col sm:flex-row divide-y sm:divide-x sm:divide-y-0 divide-neutral-200 dark:divide-neutral-700">
                    {
                        errorDetails.map((error, index) => (
                            <div key={index} className="text-red-500">{error.note}-{error.reason}</div>
                        ))
                    }
                    <ModalSelectDate
                        defaultValue={defaultStartDate}
                        onSelectDate={(date) => { setDefaultStartDate(date) }}
                        renderChildren={({ openModal }) => (
                            <button
                                onClick={openModal}
                                className="text-left flex-1 p-5 flex justify-between space-x-5 "
                                type="button"
                            >
                                <div className="flex flex-col">
                                    <span className="text-sm text-neutral-400">Ngày Bắt Đầu</span>
                                    <span className="mt-1.5 text-lg font-semibold">
                                        {defaultStartDate ? defaultStartDate.format("DD MMM") : "Date"}
                                    </span>
                                </div>
                                <PencilSquareIcon className="w-6 h-6 text-neutral-6000 dark:text-neutral-400" />
                            </button>
                        )}
                    />

                    <ModalSelectDate
                        defaultValue={defaultEndDate}
                        onSelectDate={(date) => { setDefaultEndDate(date) }}
                        renderChildren={({ openModal }) => (
                            <button
                                onClick={openModal}
                                className="text-left flex-1 p-5 flex justify-between space-x-5 "
                                type="button"
                            >
                                <div className="flex flex-col">
                                    <span className="text-sm text-neutral-400">Ngày Kết Thúc</span>
                                    <span className="mt-1.5 text-lg font-semibold">
                                        {defaultEndDate ? defaultEndDate.format("DD MMM") : "Date"}
                                    </span>
                                </div>
                                <PencilSquareIcon className="w-6 h-6 text-neutral-6000 dark:text-neutral-400" />
                            </button>
                        )}
                    />
                </div>

                <div>
                    {daysOfWeek.map((day, dayIndex) => (
                        <div key={day.value} className="mb-4">
                            <h3 className="text-lg font-medium">{day.label}</h3>
                            {getTimesByDay(dayIndex).map((time, timeIndex) => (
                                <div key={timeIndex} className="flex items-center mt-2">
                                    <input
                                        type="time"
                                        value={time.start_time}
                                        onChange={e => handleTimeChange(dayIndex, timeIndex, 'start_time', e.target.value)}
                                        className="form-control mr-2"
                                        placeholder="Thời gian bắt đầu"
                                    />
                                    <input
                                        type="time"
                                        value={time.end_time}
                                        readOnly
                                        className="form-control mr-2"
                                        placeholder="Thời gian kết thúc"
                                    />
                                    <select
                                        value={time.workout}
                                        onChange={e => handleTimeChange(dayIndex, timeIndex, 'workout', Number(e.target.value))}
                                        className="form-control mr-2"
                                    >
                                        <option value="">-- Chọn bài tập --</option>
                                        {workoutOptions.map((workout: any) => (
                                            <option key={workout.value} value={workout.value}>
                                                {workout.label}
                                            </option>
                                        ))}
                                    </select>
                                    <select
                                        value={time.trainer}
                                        onChange={e => {
                                            const newTimeSlots = [...timeSlots];
                                            newTimeSlots[dayIndex][timeIndex].trainer = Number(e.target.value);
                                            setTimeSlots(newTimeSlots);
                                        }}
                                        className="form-control"
                                    >
                                        <option value="">-- Chọn giáo viên --</option>
                                        {
                                            workoutOptions.find((workout: any) => workout.value === time.workout)?.trainers.map((trainer: any) => (
                                                <option key={trainer.value} value={trainer.value}>
                                                    {trainer.label}
                                                </option>
                                            ))
                                        }
                                    </select>
                                    <button className="btn btn-danger ml-2" onClick={() => removeTimeSlot(dayIndex, timeIndex)}>
                                        Xóa
                                    </button>
                                </div>
                            ))}
                            <button className="btn btn-outline-primary border-dashed w-full mt-4" onClick={() => addTimeSlot(dayIndex)}>
                                <PlusIcon className="w-4 h-4 mr-2" /> Thêm khung giờ
                            </button>
                        </div>
                    ))}
                </div>

                <div className="flex justify-end">
                    <ButtonPrimary onClick={() => { handleCreateBooking() }}>
                        Đăng ký
                    </ButtonPrimary>
                </div>
            </div>
        );
    };

    return (
        <div className={`nc-PayPage ${className}`} data-nc-id="PayPage">
            <main className="container mt-11 mb-24 lg:mb-32 ">
                <div className="max-w-4xl mx-auto">
                    {renderContent()}
                </div>
            </main>
        </div>
    );
};

export default CreateBookingPage;
