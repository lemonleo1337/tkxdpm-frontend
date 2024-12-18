import moment from "moment";
import { FC } from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import convertNumbThousand from "utils/convertNumbThousand";
import ModalReserveMobile from "./ModalReserveMobile";
import { Session } from "api/booking";
export interface MobileFooterStickyProps {
  className?: string;
  startDate: moment.Moment | null;
  onChangeStartDate: (date: moment.Moment | null) => void;
  endDate: moment.Moment | null;
  onChangeEndDate: (date: moment.Moment | null) => void;
  defaultService: any;
  sessions: any;
  onChangeSessions: (data: Session[]) => void;
}
const MobileFooterSticky: FC<MobileFooterStickyProps> = ({
  className = "",
  startDate,
  onChangeStartDate,
  endDate,
  onChangeEndDate,
  defaultService,
  sessions,
  onChangeSessions,
}) => {
  return (
    <div className="block lg:hidden fixed bottom-0 inset-x-0 py-2 sm:py-3 bg-white dark:bg-neutral-800 border-t border-neutral-200 dark:border-neutral-6000 z-20">
      <div className="container flex items-center justify-between">
        <div className="">
          <span className="block text-xl font-semibold">
            {convertNumbThousand(defaultService?.price || 0)} VNĐ
            <span className="ml-1 text-sm font-normal text-neutral-500 dark:text-neutral-400">
              /buổi
            </span>
          </span>
        </div>
        <ModalReserveMobile
          defaultStartDate={startDate}
          onChangeStartDate={onChangeStartDate}
          defaultEndDate={endDate}
          onChangeEndDate={onChangeEndDate}
          sessions={sessions}
          onChangeSessions={onChangeSessions}
          renderChildren={({ openModal }) => (
            <ButtonPrimary
              sizeClass="px-5 sm:px-7 py-3 !rounded-2xl"
              onClick={openModal}
            >
              Đặt ngay
            </ButtonPrimary>
          )}
          defaultService={defaultService}
           />
      </div>
    </div>
  );
};

export default MobileFooterSticky;
