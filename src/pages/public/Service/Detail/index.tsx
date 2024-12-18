import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { Session, TimeSlot, Workout } from "api/booking";
import { getServiceSessions } from "api/service";
import CommentListing from "components/CommentListing/CommentListing";
import FiveStartIconForRate from "components/FiveStartIconForRate/FiveStartIconForRate";
import ServicesDateSingleInput from "components/HeroSearchForm/ServicesDateSingleInput";
import StartRating from "components/StartRating/StartRating";
import moment from "moment";
import { FC, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import ButtonCircle from "shared/Button/ButtonCircle";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import LikeSaveBtns from "shared/Button/LikeSaveBtns";
import Input from "shared/Input/Input";
import NcImage from "shared/NcImage/NcImage";
import { useAppDispatch, useAppSelector } from "states";
import { fetchServiceById, selectServiceDetail } from "states/slices/service";
import convertMinuteToHour from "utils/converMinuteToHour";
import convertNumbThousand from "utils/convertNumbThousand";
import ModalPhotos from "./ModalPhotos";
import ModalReserveMobile from "./ModalReserveMobile";
import MobileFooterSticky from "./MobileFooterSticky";

export interface ListingServicesDetailPageProps {
  className?: string;
}

const ListingServicesDetailPage: FC<ListingServicesDetailPageProps> = ({
  className = "",
}) => {


  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [openFocusIndex, setOpenFocusIndex] = useState(0);

  const [startDate, setStartDate] = useState<moment.Moment | null>(moment().add(7, "days"));
  const [endDate, setEndDate] = useState<moment.Moment | null>(moment().add(7, "days"));

  const [trainingTimes, setTrainingTimes] = useState<TimeSlot[][]>([
    [], // Monday
    [], // Tuesday
    [], // Wednesday
    [], // Thursday
    [], // Friday
    [], // Saturday
    [], // Sunday
  ]);
  const [sessions, setSessions] = useState<Session[]>();


  const { id } = useParams();
  const { data: servicesData, isLoading, isError } = useQuery("services", () => getServiceSessions(id?.toString() || ""));
  useEffect(() => {
    console.log(servicesData);
    const newSession = servicesData?.data.map((session) => {
      return {
        id: session.id,
        name: session.name,
        trainingDay: null,
        workouts: session?.workouts?.map((workout: any) => ({
          id: workout.id,
          name: workout.name,
          duration: workout.duration,
          trainers: workout.trainers,
          trainingTime: {
            start: workout.trainingTime?.startTime,
            end: workout.trainingTime?.endTime,
            trainer: workout.trainingTime?.trainer,
          },
        }) as Workout)
      } as Session;
    });
    setSessions(newSession);
  }, [servicesData]);

  // const getDaySize = () => {
  //   if (windowSize.width <= 375) {
  //     return 34;
  //   }
  //   if (windowSize.width <= 500) {
  //     return undefined;
  //   }
  //   if (windowSize.width <= 1280) {
  //     return 56;
  //   }
  //   return 48;
  // };

  const handleOpenModal = (index: number) => {
    setIsOpen(true);
    setOpenFocusIndex(index);
  };

  const handleCloseModal = () => setIsOpen(false);

  useEffect(() => {
    dispatch(fetchServiceById(id?.toString() || ""));
  }, [dispatch, id]);

  const serviceResult = useAppSelector(selectServiceDetail);
  const renderBacsicInfoSerivce = () => {
    return (
      <div className="listingSection__wrap !space-y-6">
        {/* 1 */}
        <div className="flex justify-between items-center">
          {/* {serviceResult?.is_online && (<Badge color="pink" name="Lớp Online" />)} */}
          <LikeSaveBtns />
        </div>

        {/* 2 */}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">
          {serviceResult?.name}
        </h2>

        {/* 3 */}
        <div className="flex items-center space-x-4">
          <StartRating />
        </div>

        {/* 5 */}
        <div className="w-full border-b border-neutral-100 dark:border-neutral-700" />

        {/* 6 */}
        <div className="flex items-center justify-between xl:justify-start space-x-8 xl:space-x-12 text-sm text-neutral-700 dark:text-neutral-300">
          <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 text-center sm:text-left sm:space-x-3 ">
            <i className="las la-clock text-2xl"></i>
            <span className="">{convertMinuteToHour(serviceResult?.duration)}</span>
          </div>
          <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 text-center sm:text-left sm:space-x-3 ">
            <i className="las la-user-friends text-2xl"></i>
            <span className="">{`Tối đa ${serviceResult?.maxParticipants} người /lớp`}</span>
          </div>
          <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 text-center sm:text-left sm:space-x-3 ">
            <i className="las la-language text-2xl"></i>
            <span className="">Tiếng Anh, Tiếng Việt</span>
          </div>
        </div>
      </div>
    );
  };

  const renderDesciptionService = () => {
    return (
      <div className="listingSection__wrap">
        <h2 className="text-2xl font-semibold">Mô tả dịch vụ</h2>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        <div className="text-neutral-6000 dark:text-neutral-300">
          {serviceResult?.description}
        </div>
      </div>
    );
  };

  const renderIncludeService = () => {
    return (
      <div className="listingSection__wrap">
        <div>
          <h2 className="text-2xl font-semibold">Bao gồm </h2>
          <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
            Những dịch vụ dưới đây sẽ được bao gồm trong trải nghiệm của bạn
          </span>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        {/* 6 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-sm text-neutral-700 dark:text-neutral-300">
          {serviceResult?.sessions
            .filter((_, i) => i < 12) // Chỉ lấy 12 phiên tập đầu tiên
            .map((session) => (
              <div key={session.id} className="flex items-center space-x-3">
                <i className="las la-check-circle text-2xl"></i>
                <div>
                  <span className="font-medium">{session.name}</span>
                  <p className="text-neutral-500 dark:text-neutral-400">{session.description}</p>
                  <div className="flex flex-wrap">
                    {session.workouts.map((workout) => (
                      <div key={workout.id} className="flex items-center space-x-2 mb-1">
                        {/* <img
                          src={workout?.thumbnail}
                          alt={workout?.name}
                          className="w-8 h-8 rounded-full object-cover"
                        /> */}
                        <span className="text-neutral-500 dark:text-neutral-400">{`${workout.name} ,`}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  };

  const renderReviewService = () => {
    return (
      <div className="listingSection__wrap">
        {/* HEADING */}
        <h2 className="text-2xl font-semibold">Đánh giá (23 đánh giá)</h2>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

        {/* Content */}
        <div className="space-y-5">
          <FiveStartIconForRate iconClass="w-6 h-6" className="space-x-0.5" />
          <div className="relative">
            <Input
              fontClass=""
              sizeClass="h-16 px-4 py-3"
              rounded="rounded-3xl"
              placeholder="Share your thoughts ..."
            />
            <ButtonCircle
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
              size=" w-12 h-12 "
            >
              <ArrowRightIcon className="w-5 h-5" />
            </ButtonCircle>
          </div>
        </div>

        {/* comment */}
        <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
          <CommentListing className="py-8" />
          <CommentListing className="py-8" />
          <CommentListing className="py-8" />
          <CommentListing className="py-8" />
          <div className="pt-8">
            <ButtonSecondary>View more 20 reviews</ButtonSecondary>
          </div>
        </div>
      </div>
    );
  };

  const renderSectionThingToKnow = () => {
    return (
      <div className="listingSection__wrap">
        {/* HEADING */}
        <h2 className="text-2xl font-semibold">Mô tả các bài tập</h2>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />

        {/* <div>
          <h4 className="text-lg font-semibold">Chính sách hủy lịch tập</h4>
          <span className="block mt-3 text-neutral-500 dark:text-neutral-400">
            Mọi dịch vụ đều có thể bị hủy và được hoàn tiền đầy đủ trong vòng 24 giờ
            kể từ khi mua hoặc ít nhất 7 ngày trước khi trải nghiệm bắt đầu.
          </span>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />

        <div>
          <h4 className="text-lg font-semibold">Yêu cầu khách hàng</h4>
          <span className="block mt-3 text-neutral-500 dark:text-neutral-400">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veritatis cupiditate corrupti sequi maxime! Non hic fugit harum iusto nostrum, ipsum vitae suscipit magni modi debitis similique dolore labore alias eum!
          </span>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />

        <div>
          <h4 className="text-lg font-semibold">Những thứ cần thiết</h4>
          <div className="prose sm:prose">
            <ul className="mt-3 text-neutral-500 dark:text-neutral-400 space-y-2">
              <li>

              </li>
              <li>

              </li>
            </ul>
          </div>
        </div> */}
        {serviceResult?.sessions?.map((item) => (
          <div key={item.id}>
            <div className="flex items-center space-x-3">
              <i className="las la-check-circle text-2xl"></i>
              <span>{item.name}</span>
            </div>
            <div className="text-neutral-500 dark:text-neutral-400 mt-2.5 ml-9">
              {item.description}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderSidebar = () => {
    return (
      <div className="listingSectionSidebar__wrap shadow-xl">
        {/* PRICE */}
        <div className="flex justify-between">
          <span className="text-3xl font-semibold">
            {convertNumbThousand(serviceResult?.price)}{" VND"}
            <span className="ml-1 text-base font-normal text-neutral-500 dark:text-neutral-400">
              /tuần
            </span>
          </span>
          <StartRating />
        </div>

        {/* FORM */}
        <form className="flex flex-col sm:flex-row border divide-y sm:divide-y-0 sm:divide-x divide-neutral-200 dark:divide-neutral-700 border-neutral-200 dark:border-neutral-700 rounded-3xl ">
          <div className="flex-1">
            <ServicesDateSingleInput
              defaultValue={startDate}
              anchorDirection={"right"}
              fieldClassName="p-4"
              className="h-full"
            />
          </div>
          <div className="flex-1 listingServicesDetailPage__GuestsInput">
            <ServicesDateSingleInput
              defaultValue={endDate}
              anchorDirection={"right"}
              fieldClassName="p-4"
              className="h-full"
            />
          </div>
        </form>

        {/* SUM */}
        {/* SUBMIT */}
        <ModalReserveMobile
          renderChildren={({ openModal }) => (
            <ButtonPrimary
              sizeClass="px-5 sm:px-7 py-3 !rounded-2xl"
              onClick={openModal}
            >
              Đặt ngay
            </ButtonPrimary>
          )}
          defaultService={serviceResult}
          defaultEndDate={endDate}
          defaultStartDate={startDate}
          onChangeEndDate={setEndDate}
          onChangeStartDate={setStartDate}
          sessions={sessions}
          onChangeSessions={setSessions}
        />
      </div>
    );
  };

  return (
    <div
      className={`ListingDetailPage nc-ListingServicesDetailPage ${className}`}
      data-nc-id="ListingServicesDetailPage"
    >
      {/* SINGLE HEADER */}
      <>
        <header className="container 2xl:px-14 rounded-md sm:rounded-xl">
          <div className="relative grid grid-cols-4 gap-1 sm:gap-2">
            <div
              className="col-span-3 row-span-3 relative rounded-md sm:rounded-xl overflow-hidden cursor-pointer"
              onClick={() => handleOpenModal(0)}
            >
              <NcImage
                containerClassName="absolute inset-0"
                className="object-cover w-full h-full rounded-md sm:rounded-xl"
                src={serviceResult?.serviceGallaryImages[0]}
              />
              <div className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity"></div>
            </div>
            {serviceResult?.serviceGallaryImages?.filter((_, i) => i >= 1 && i < 4).map((item, index) => (
              <div
                key={index}
                className={`relative rounded-md sm:rounded-xl overflow-hidden ${index >= 2 ? "block" : ""
                  }`}
              >
                <NcImage
                  containerClassName="aspect-w-4 aspect-h-3"
                  className="object-cover w-full h-full rounded-md sm:rounded-xl "
                  src={item || ""}
                />

                {/* OVERLAY */}
                <div
                  className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
                  onClick={() => handleOpenModal(index + 1)}
                />
              </div>
            ))}

            <div
              className="absolute hidden md:flex md:items-center md:justify-center left-3 bottom-3 px-4 py-2 rounded-xl bg-neutral-100 text-neutral-500 cursor-pointer hover:bg-neutral-200 z-10"
              onClick={() => handleOpenModal(0)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                />
              </svg>
              <span className="ml-2 text-neutral-800 text-sm font-medium">
                Xem thêm ảnh
              </span>
            </div>
          </div>
        </header>
        {/* MODAL PHOTOS */}
        <ModalPhotos
          imgs={serviceResult?.serviceGallaryImages || []}
          isOpen={isOpen}
          onClose={handleCloseModal}
          initFocus={openFocusIndex}
          uniqueClassName="nc-ListingServicesDetailPage__modalPhotos"
        />
      </>

      {/* MAIn */}
      <main className="container relative z-10 mt-11 flex flex-col lg:flex-row ">
        {/* CONTENT */}
        <div className="w-full lg:w-3/5 xl:w-2/3 space-y-8 lg:pr-10 lg:space-y-10">
          {renderBacsicInfoSerivce()}
          {renderDesciptionService()}
          {renderIncludeService()}
          {renderReviewService()}
          {renderSectionThingToKnow()}
        </div>

        {/* SIDEBAR */}
        <div className="hidden lg:block flex-grow mt-14 lg:mt-0">
          <div className="sticky top-28">{renderSidebar()}</div>
        </div>
      </main>

      {/* STICKY FOOTER MOBILE */}
      <MobileFooterSticky
        startDate={startDate}
        onChangeStartDate={setStartDate}
        endDate={endDate}
        onChangeEndDate={setEndDate}
        defaultService={serviceResult}
        sessions={sessions}
        onChangeSessions={setSessions}
      />

      {/* OTHER SECTION */}
      <div className="container py-24 lg:py-32">
      </div>
    </div>
  );
};

export default ListingServicesDetailPage;
