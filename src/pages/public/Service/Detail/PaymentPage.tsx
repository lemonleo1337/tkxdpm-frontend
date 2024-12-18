import { Tab } from "@headlessui/react";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { PostCreateBookingRequest, Session, postCreateBooking } from "api/booking";
import { ServiceDataType } from "api/service";
import Label from "components/Label/Label";
import ModalSelectDate from "components/ModalSelectDate";
import StartRating from "components/StartRating/StartRating";
import mastercardPng from "images/mastercard.svg";
import visaPng from "images/vis.png";
import moment from "moment";
import { FC, Fragment, useState } from "react";
import { useMutation } from "react-query";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import Input from "shared/Input/Input";
import NcImage from "shared/NcImage/NcImage";
import NcModal from "shared/NcModal/NcModal";
import { useAppDispatch, useAppSelector } from "states";
import { selectAuthStatus } from "states/slices/auth";
import convertMinuteToHour from "utils/converMinuteToHour";
import convertNumbThousand from "utils/convertNumbThousand";

export interface PaymentPageProps {
  className?: string;
  onClose?: () => void;
  onChangeEndDate: (date: moment.Moment | null) => void;
  defaultEndDate: moment.Moment | null;
  onChangeStartDate: (date: moment.Moment | null) => void;
  defaultStartDate: moment.Moment | null;
  defaultService: ServiceDataType | undefined;
  sessions: Session[];
  onChangeSessions: (data: any) => void;
}


const PaymentPage: FC<PaymentPageProps> = ({
  className = "",
  onClose,
  onChangeEndDate,
  defaultEndDate,
  onChangeStartDate,
  defaultStartDate,
  defaultService,
  sessions,
  onChangeSessions,
}) => {
  const authStatus = useAppSelector(selectAuthStatus);
  const location = useLocation();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [errorDetails, setErrorDetails] = useState<{ note: string; reason: string }[]>([]);
  const handleSubmit = async () => {
    // kiểm tra nếu có trường hợp chưa điền đủ thông tin thì toast error
    // sau đó return
    console.log(sessions)
    if (defaultStartDate == null || defaultEndDate == null) {
      toast.error("Vui lòng chọn ngày bắt đầu và kết thúc");
      return;
    }

    if (defaultStartDate.isAfter(defaultEndDate)) {
      toast.error("Ngày bắt đầu không thể sau ngày kết thúc");
      return;
    }

    //không sử dụng ! vì có ngyaf chủ nhật = 0
    if (sessions.some(session => session.trainingDay === undefined)) {
      toast.error("Vui lòng chọn ngày cho tất cả các buổi tập");
      return;
    }

    if (sessions.some(session => session.workouts.some(workout => !workout.trainingTime.start))) {
      toast.error("Vui lòng chọn thời gian cho tất cả các buổi tập");
      return;
    }

    const bookingData = {
      startDate: defaultStartDate?.format("YYYY-MM-DD"),
      endDate: defaultEndDate?.format("YYYY-MM-DD"),
      serviceId: defaultService?.id,
      trainingTimes: sessions.flatMap(session =>
        session.workouts.map(workout => ({
          dayOfWeek: session.trainingDay,
          start_time: workout.trainingTime.start,
          end_time: workout.trainingTime.end,
          workout: workout.id,
          trainer: workout.trainingTime.trainer
        }))
      )
    } as PostCreateBookingRequest;

    try {
      const res = await createBookingMutation.mutateAsync(bookingData);
      // Nếu thành công thì chuyển hướng đến trang thanh toán
      if (res?.statusCode === 201) {
        const navigationState = {
          defaultService,
          defaultStartDate: defaultStartDate?.format("YYYY-MM-DD"),
          defaultEndDate: defaultEndDate?.format("YYYY-MM-DD"),
          bookings: res.data
        };
        console.log('Navigation state:', navigationState);
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

  const handleTimeChange = (sessionId: number, workoutId: number, field: 'start' | 'workout', value: string | number) => {
    const updatedSessions = sessions.map(session => {
      if (session.id === sessionId) {
        const updatedWorkouts = session.workouts.map(workout => {
          if (workout.id === workoutId) {
            const updatedWorkout = { ...workout, trainingTime: { ...workout.trainingTime, [field]: value } };
            if (field === 'start' && typeof value === 'string') {
              const workoutDuration = workout.duration;
              const endTime = moment(value, 'HH:mm').add(workoutDuration, 'minutes').format('HH:mm');
              updatedWorkout.trainingTime.end = endTime;
            }
            return updatedWorkout;
          }
          return workout;
        });
        return { ...session, workouts: updatedWorkouts };
      }
      return session;
    });
    onChangeSessions(updatedSessions);
  };


  const renderTrainingTimes = () => {
    const daysOfWeek = [
      { value: 1, label: 'Thứ 2' },
      { value: 2, label: 'Thứ 3' },
      { value: 3, label: 'Thứ 4' },
      { value: 4, label: 'Thứ 5' },
      { value: 5, label: 'Thứ 6' },
      { value: 6, label: 'Thứ 7' },
      { value: 0, label: 'Chủ nhật' },
    ];
    return (
      <div>
        {
          errorDetails.map((error, index) => (
            <div key={index} className="text-red-500">{error.note}-{error.reason}</div>
          ))
        }

        {sessions.length > 0 && (
          <div>
            {sessions.map(session => (
              <div key={session.id} className="mb-4">
                <h3 className="text-lg font-medium">{session.name}</h3>
                <div className="flex items-center mb-2">
                  <label className="form-label mr-2 flex-shrink-0" style={{ width: '100px' }}>Chọn ngày:</label>
                  <select
                    className="form-control mr-2"
                    onChange={(e) => {
                      const newSession = sessions.map(s => {
                        if (s.id === session.id) {
                          return {
                            ...s,
                            trainingDay: parseInt(e.target.value)
                          }
                        }
                        return s;
                      });
                      onChangeSessions(newSession);
                    }}
                  >
                    <option value="">-- Chọn ngày --</option>
                    {daysOfWeek.map(day => (
                      <option key={day.value} value={day.value}>{day.label}</option>
                    ))}
                  </select>
                </div>
                {
                  session.workouts.map(workout => (
                    <div key={workout.id} className="mt-2">
                      <label className="font-medium">{workout.name}</label>
                      <div className="flex items-center mt-2">
                        <input
                          type="time"
                          onChange={e => handleTimeChange(session.id, workout.id, 'start', e.target.value)}
                          value={workout.trainingTime.start}
                          className="form-control mr-2"
                          placeholder="Thời gian bắt đầu"
                        />
                        <input
                          disabled
                          type="time"
                          value={workout.trainingTime.end}
                          className="form-control mr-2"
                          placeholder="Thời gian kết thúc"
                        />
                        <select
                          value={workout.trainingTime.trainer}
                          className="form-control"
                          onChange={(e) => {
                            const newSession = sessions.map(s => {
                              if (s.id === session.id) {
                                return {
                                  ...s,
                                  workouts: s.workouts.map(w => {
                                    if (w.id === workout.id) {
                                      return {
                                        ...w,
                                        trainingTime: {
                                          ...w.trainingTime,
                                          trainer: parseInt(e.target.value)
                                        }
                                      }
                                    }
                                    return w;
                                  })
                                }
                              }
                              return s;
                            });
                            onChangeSessions(newSession);
                          }}
                        >
                          <option value="">-- Chọn giáo viên --</option>
                          {workout.trainers.map((trainer) => (
                            <option key={trainer.id} value={trainer.id}>{trainer.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  ))
                }
              </div>
            ))}
          </div>
        )
        }
      </div >
    );
  }
  const renderSidebar = () => {
    return (
      <div className="w-full flex flex-col sm:rounded-2xl lg:border border-neutral-200 dark:border-neutral-700 space-y-6 sm:space-y-8 px-0 sm:p-6 xl:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center">
          <div className="flex-shrink-0 w-full sm:w-40">
            <div className=" aspect-w-4 aspect-h-3 sm:aspect-h-4 rounded-2xl overflow-hidden">
              <NcImage src={defaultService?.serviceGallaryImages[0]} />
            </div>
          </div>
          <div className="py-5 sm:px-5 space-y-3">
            <div>
              <span className="text-sm text-neutral-500 dark:text-neutral-400 line-clamp-1">

              </span>
              <span className="text-base font-medium mt-1 block">
                {defaultService?.name}
              </span>
            </div>
            <span className="block  text-sm text-neutral-500 dark:text-neutral-400">
              {convertMinuteToHour(defaultService?.duration)}
            </span>
            <div className="w-10 border-b border-neutral-200  dark:border-neutral-700"></div>
            <StartRating />
          </div>
        </div>
        <div className="flex flex-col space-y-4">
          <h3 className="text-2xl font-semibold">Thông tin giá cả</h3>
          {/* <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
            <span>{convertNumbThousand(defaultService?.price)} x {defaultParticipants.participants} Người </span>
            <span>{convertNumbThousand(defaultService?.price ?? 0 * (defaultParticipants?.participants ?? 0))}</span>
          </div> */}
          <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
            <span>VAT</span>
            <span></span>
          </div>

          <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
          <div className="flex justify-between font-semibold">
            <span>Tổng tiền</span>
            <span>{convertNumbThousand(defaultService?.price ?? 0)}</span>
          </div>
        </div>
      </div>
    );
  };

  const renderMain = () => {
    return (
      <div className="w-full flex flex-col sm:rounded-2xl sm:border border-neutral-200 dark:border-neutral-700 space-y-8 px-0 sm:p-6 xl:p-8">
        <h2 className="text-3xl lg:text-4xl font-semibold">
          Xác nhận thông tin
        </h2>
        <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
        <div>
          <div>
            <h3 className="text-2xl font-semibold">Dịch vụ bạn chọn</h3>
            <NcModal
              renderTrigger={(openModal) => (
                <span
                  onClick={() => openModal()}
                  className="block lg:hidden underline  mt-1 cursor-pointer"
                >
                  Xem thông tin cụ thể
                </span>
              )}
              renderContent={renderSidebar}
              modalTitle="Thông tin chi tiết dịch vụ"
            />
          </div>
          <div className="mt-6 border border-neutral-200 dark:border-neutral-700 rounded-3xl flex flex-col sm:flex-row divide-y sm:divide-x sm:divide-y-0 divide-neutral-200 dark:divide-neutral-700">
            <ModalSelectDate
              defaultValue={defaultStartDate}
              onSelectDate={(date) => { onChangeStartDate(date) }}
              renderChildren={({ openModal }) => (
                <button
                  onClick={openModal}
                  className="text-left flex-1 p-5 flex justify-between space-x-5 "
                  type="button"
                >
                  <div className="flex flex-col">
                    <span className="text-sm text-neutral-400">Ngày</span>
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
              onSelectDate={(date) => { onChangeEndDate(date) }}
              renderChildren={({ openModal }) => (
                <button
                  onClick={openModal}
                  className="text-left flex-1 p-5 flex justify-between space-x-5 "
                  type="button"
                >
                  <div className="flex flex-col">
                    <span className="text-sm text-neutral-400">Ngày</span>
                    <span className="mt-1.5 text-lg font-semibold">
                      {defaultEndDate ? defaultEndDate.format("DD MMM") : "Date"}
                    </span>
                  </div>
                  <PencilSquareIcon className="w-6 h-6 text-neutral-6000 dark:text-neutral-400" />
                </button>
              )}
            />
          </div>
          <div className="mt-6 grid grid-cols-3 gap-6 md:gap-8 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
            {/* {
              timeArray.length === 0 ? (
                <span className="col-span-3 font-semibold text-neutral-500 dark:text-neutral-400">
                  Không có lịch trình phù hợp vui lòng chọn ngày khác
                </span>
              ) : (
                timeArray.map((time) => (
                  <button
                    key={time.id}
                    onClick={() => onChangeTime(timeArray.indexOf(time))}
                    className={`p-4 rounded-lg focus:outline-none text-sm font-semibold ${time.time === timeArray[defaultTime].time
                      ? "bg-neutral-800 dark:bg-neutral-300 text-white dark:text-neutral-900"
                      : "rounded-lg border border-neutral-200 dark:border-neutral-700"
                      }`}
                  >
                    {time?.time?.toString()}
                  </button>
                ))
              )
            } */}
          </div>
        </div>

        {renderTrainingTimes()}
        {
          authStatus === "success" ? (
            <div>
              <h3 className="text-2xl font-semibold">Thanh toán bằng</h3>
              <div className="w-14 border-b border-neutral-200 dark:border-neutral-700 my-5"></div>

              <div className="mt-6">
                <Tab.Group>
                  <Tab.List className="flex my-5">
                    <Tab as={Fragment}>
                      {({ selected }) => (
                        <button
                          className={`px-4 py-1.5 sm:px-6 sm:py-2.5 rounded-full focus:outline-none ${selected
                            ? "bg-neutral-800 dark:bg-neutral-300 text-white dark:text-neutral-900"
                            : "text-neutral-6000 dark:text-neutral-400"
                            }`}
                        >
                          Paypal
                        </button>
                      )}
                    </Tab>
                    <Tab as={Fragment}>
                      {({ selected }) => (
                        <button
                          className={`px-4 py-1.5 sm:px-6 sm:py-2.5  rounded-full flex items-center justify-center focus:outline-none  ${selected
                            ? "bg-neutral-800 dark:bg-neutral-300 text-white dark:text-neutral-900"
                            : " text-neutral-6000 dark:text-neutral-400"
                            }`}
                        >
                          <span className="mr-2.5">Credit card</span>
                          <img className="w-8" src={visaPng} alt="" />
                          <img className="w-8" src={mastercardPng} alt="" />
                        </button>
                      )}
                    </Tab>
                  </Tab.List>

                  <Tab.Panels>
                    <Tab.Panel className="space-y-5">
                      <div className="space-y-1">
                        <Label>Số thẻ </Label>
                        <Input defaultValue="111 112 222 999" />
                      </div>
                      <div className="space-y-1">
                        <Label>Tên chủ thẻ </Label>
                        <Input defaultValue="JOHN DOE" />
                      </div>
                      <div className="flex space-x-5  ">
                        <div className="flex-1 space-y-1">
                          <Label>Ngày hết hạn </Label>
                          <Input type="date" defaultValue="MM/YY" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <Label>CVC </Label>
                          <Input />
                        </div>
                      </div>
                    </Tab.Panel>
                    <Tab.Panel className="space-y-5">
                      <div className="space-y-1">
                        <Label>Email </Label>
                        <Input type="email" defaultValue="example@gmail.com" />
                      </div>
                      <div className="space-y-1">
                        <Label>Mật khẩu </Label>
                        <Input type="password" defaultValue="***" />
                      </div>
                    </Tab.Panel>
                  </Tab.Panels>
                </Tab.Group>
                <div className="pt-8">
                  {/* <ButtonPrimary href={"/pay-done"}>Xác nhận và thanh toán</ButtonPrimary> */}
                  <ButtonPrimary onClick={handleSubmit}>Xác nhận và thanh toán</ButtonPrimary>

                </div>
              </div>
            </div>
          ) : (
            <div>
              <h3 className="text-2xl font-semibold">Đăng nhập để tiếp tục</h3>
              <div className="w-14 border-b border-neutral-200 dark:border-neutral-700 my-5"></div>
              <div className="mt-6">
                <Link to={"/login"} state={{ redirectTo: location }}>
                  <ButtonPrimary >Đăng nhập</ButtonPrimary>
                </Link>
              </div>
            </div>
          )
        }
      </div>
    );
  };

  return (
    <div className={`nc-CheckOutPage ${className}`} data-nc-id="CheckOutPage">
      <main className="container mt-11 mb-24 lg:mb-32 flex flex-col-reverse lg:flex-row">
        <div className="w-full lg:w-3/5 xl:w-2/3 lg:pr-10 ">{renderMain()}</div>
        <div className="hidden lg:block flex-grow">{renderSidebar()}</div>
      </main>
    </div>
  );
};

export default PaymentPage;
