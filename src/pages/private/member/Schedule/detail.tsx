import { ArrowRightIcon } from "@heroicons/react/24/solid";
import Input from "shared/Input/Input";
import { getBookingDetail } from "api/booking";
import FiveStartIconForRate from "components/FiveStartIconForRate/FiveStartIconForRate";
import { ServiceTypeLabel, ServiceTypeValue } from "enums";
import { FC, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Badge from "shared/Badge/Badge";
import ButtonCircle from "shared/Button/ButtonCircle";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import LoadingIcon from "shared/LoadingIcon/LoadingIcon";
import NcImage from "shared/NcImage/NcImage";
import NcModal from "shared/NcModal/NcModal";
import convertMinuteToHour from "utils/converMinuteToHour";

export interface ScheduleDetailPageProps {
  className?: string;
}

const ScheduleDetailPage: FC<ScheduleDetailPageProps> = ({
  className = "",
}) => {
  const { id } = useParams();
  const { data: scheduleData, isLoading, isError } = useQuery("scheduleDetail", () => getBookingDetail(Number(id) || 0));
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  const ReviewForm: FC<{ onSubmit: (rating: number, comment: string) => void }> = ({ onSubmit }) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    return (
      <div>
        <h3 className="text-lg font-semibold mb-4">Đánh giá của bạn</h3>
        <div className="space-y-5">
          <FiveStartIconForRate
            iconClass="w-6 h-6"
            className="space-x-0.5"
            defaultPoint={rating}
            onChange={setRating}
          />
          <div className="relative">
            <Input
              fontClass=""
              sizeClass="h-16 px-4 py-3"
              rounded="rounded-3xl"
              placeholder="Share your thoughts ..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <ButtonCircle
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
              size="w-12 h-12"
              onClick={() => onSubmit(rating, comment)}
            >
              <ArrowRightIcon className="w-5 h-5" />
            </ButtonCircle>
          </div>
        </div>
      </div>
    );
  };


  const renderContent = () => {
    return (
      <div className="w-full flex flex-col sm:rounded-2xl sm:border border-neutral-200 dark:border-neutral-700 space-y-8 px-0 sm:p-6 xl:p-8">
        <h2 className="text-3xl lg:text-4xl font-semibold">
          Chi tiết lịch hẹn của bạn
        </h2>

        <div className="border-b border-neutral-200 dark:border-neutral-700"></div>

        {/* ------------------------ */}
        {
          scheduleData?.data.serviceName && (
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold">Thông tin dịch vụ</h3>
              <div className="flex flex-col sm:flex-row sm:items-center">
                <div className="flex-shrink-0 w-full sm:w-40">
                  <div className=" aspect-w-4 aspect-h-3 sm:aspect-h-4 rounded-2xl overflow-hidden">
                    <NcImage src={scheduleData?.data.serviceThumbnail} />
                  </div>
                </div>
                <div className="pt-5  sm:pb-5 sm:px-5 space-y-3">
                  <div>
                    {/* <Badge name="Online" color="green" /> */}
                    {
                      <Badge name={ServiceTypeLabel.PRIVATE} color="green" />
                    }
                    <span className="text-base sm:text-lg font-medium mt-1 block">
                      {scheduleData?.data.serviceName}
                    </span>
                  </div>
                  <span className="block  text-sm text-neutral-500 dark:text-neutral-400">
                    Mô tả gói dịch vụ: {scheduleData?.data.serviceDescription}
                  </span>
                  <div className="w-10 border-b border-neutral-200  dark:border-neutral-700"></div>
                  <span className="text-base sm:text-lg font-medium mt-1 block">
                    <br />
                  </span>

                </div>
              </div>
              <div className="mt-6 border border-neutral-200 dark:border-neutral-700 rounded-3xl flex flex-col sm:flex-row divide-y sm:divide-x sm:divide-y-0 divide-neutral-200 dark:divide-neutral-700">
                <div className="flex-1 p-5 flex space-x-4">
                  <svg
                    className="w-8 h-8 text-neutral-300 dark:text-neutral-6000"
                    viewBox="0 0 28 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.33333 8.16667V3.5M18.6667 8.16667V3.5M8.16667 12.8333H19.8333M5.83333 24.5H22.1667C23.4553 24.5 24.5 23.4553 24.5 22.1667V8.16667C24.5 6.878 23.4553 5.83333 22.1667 5.83333H5.83333C4.54467 5.83333 3.5 6.878 3.5 8.16667V22.1667C3.5 23.4553 4.54467 24.5 5.83333 24.5Z"
                      stroke="#D1D5DB"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="flex flex-col">
                    <span className="text-sm text-neutral-400">Ngày</span>
                    <span className="mt-1.5 text-lg font-semibold">
                      {scheduleData?.data.date} : {scheduleData?.data.startTime} - {scheduleData?.data.endTime}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )
        }

        {/* ------------------------ */}
        <div className="space-y-6">
          {/* <h3 className="text-2xl font-semibold">{
            scheduleData?.data.serviceType === ServiceTypeValue.GROUP ? "Thông tin lớp học" :
              scheduleData?.data.serviceType === ServiceTypeValue.ONLINE ? "Thông tin lớp online" :
                scheduleData?.data.bookingTrainerName ? "Thông tin bài tập riêng tư" :
                  "Thông tin tập tự do" }</h3> */}
          <h3 className="text-2xl font-semibold">Thông tin chi tiết bài tập</h3>
          <div className="flex flex-col sm:flex-row sm:items-center">
            <div className="flex-shrink-0 w-full sm:w-40">
              <div className=" aspect-w-4 aspect-h-3 sm:aspect-h-4 rounded-2xl overflow-hidden">
                <NcImage src={scheduleData?.data.workoutThumbnail} />
              </div>
            </div>
            <div className="pt-5  sm:pb-5 sm:px-5 space-y-3">
              <div>
                {/* <Badge name="Online" color="green" /> */}
                {
                  !scheduleData?.data.serviceType &&
                  <Badge name={ServiceTypeLabel.SELF} color="green" />

                }
                <span className="text-base sm:text-lg font-medium mt-1 block">
                  {scheduleData?.data.workoutName}
                </span>
              </div>
              <span className="block  text-sm text-neutral-500 dark:text-neutral-400">
                Thời gian tập luyện: {convertMinuteToHour(Number(scheduleData?.data.serviceDuration) || Number(scheduleData?.data.workoutDuration))}
              </span>
              <div className="w-10 border-b border-neutral-200  dark:border-neutral-700"></div>
              <span className="text-base sm:text-lg font-medium mt-1 block">
                Giáo viên : {scheduleData?.data.bookingTrainerName}
              </span>
            </div>
          </div>
        </div>
        {!scheduleData?.data.serviceName && (
          <div className="mt-6 border border-neutral-200 dark:border-neutral-700 rounded-3xl flex flex-col sm:flex-row divide-y sm:divide-x sm:divide-y-0 divide-neutral-200 dark:divide-neutral-700">
            <div className="flex-1 p-5 flex space-x-4">
              <svg
                className="w-8 h-8 text-neutral-300 dark:text-neutral-6000"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.33333 8.16667V3.5M18.6667 8.16667V3.5M8.16667 12.8333H19.8333M5.83333 24.5H22.1667C23.4553 24.5 24.5 23.4553 24.5 22.1667V8.16667C24.5 6.878 23.4553 5.83333 22.1667 5.83333H5.83333C4.54467 5.83333 3.5 6.878 3.5 8.16667V22.1667C3.5 23.4553 4.54467 24.5 5.83333 24.5Z"
                  stroke="#D1D5DB"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="flex flex-col">
                <span className="text-sm text-neutral-400">Ngày</span>
                <span className="mt-1.5 text-lg font-semibold">
                  {scheduleData?.data.date} : {scheduleData?.data.startTime} - {scheduleData?.data.endTime}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Check status nếu là 1 thì hiển thị đánh giá. 0 và ngày đặt lịch < 7 ngày hiện tại hiển thị Hủy tập còn lại không hiển thị gì */}
        {
          scheduleData?.data.status === 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-between">
              <ButtonPrimary
                fontSize="text-sm sm:text-base lg:text-lg font-medium"
                onClick={() => setIsReviewModalOpen(true)}
              >
                Đánh giá
              </ButtonPrimary>
            </div>
          )
        }
        {
          scheduleData?.data.status === 0 && scheduleData?.data.date &&
          new Date(scheduleData?.data.date).getTime() - new Date().getTime() >= 7 * 24 * 60 * 60 * 1000
          && (
            <div className="flex flex-col sm:flex-row items-center justify-between">
              <ButtonPrimary
                fontSize="text-sm sm:text-base lg:text-lg font-medium"
              >
                Hủy lịch
              </ButtonPrimary>
            </div>
          )
        }
      </div>
    );
  };

  return (
    <div className={`nc-PayPage ${className}`} data-nc-id="PayPage">
      <main className="container mt-11 mb-24 lg:mb-32 ">
        <div className="max-w-4xl mx-auto">{
          isLoading ? <LoadingIcon size={30} /> :
            isError ? <div>Có lỗi xảy ra vui lòng thử lại sau</div> :
              renderContent()
        }</div>
      </main>
      {/* Modal for Review */}
      <NcModal
        isOpenProp={isReviewModalOpen}
        onCloseModal={() => setIsReviewModalOpen(false)}
        modalTitle="Đánh giá dịch vụ"
        renderContent={() => (
          <ReviewForm
            onSubmit={(rating, comment) => {
              console.log('Rating:', rating);
              console.log('Comment:', comment);
              setIsReviewModalOpen(false);
            }}
          />
        )}
      />

    </div>
  );
};

export default ScheduleDetailPage;
