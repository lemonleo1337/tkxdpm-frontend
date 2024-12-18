import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { ParticipantsObject } from "components/HeroSearchForm2Mobile/ParticipantsInput";
import React, { FC, Fragment, useState } from "react";
import PaymentPage from "./PaymentPage";
import { Session, TimeSlot } from "api/booking";

interface ModalReserveMobileProps {
  onClose?: () => void;
  onChangeStartDate: (date: moment.Moment | null) => void;
  defaultStartDate: moment.Moment | null;
  renderChildren?: (p: { openModal: () => void }) => React.ReactNode;
  defaultService: any;
  defaultEndDate: moment.Moment | null;
  onChangeEndDate: (date: moment.Moment | null) => void;
  sessions: any;
  onChangeSessions: (data: Session[]) => void;
}

const ModalReserveMobile: FC<ModalReserveMobileProps> = ({
  onClose,
  onChangeStartDate,
  defaultStartDate,
  renderChildren,
  defaultService,
  defaultEndDate,
  onChangeEndDate,
  sessions,
  onChangeSessions,
}) => {
  const [showModal, setShowModal] = useState(false);
  // FOR RESET ALL DATA WHEN CLICK CLEAR BUTTON
  //
  function closeModal() {
    setShowModal(false);
  }

  function openModal() {
    setShowModal(true);
  }

  const renderButtonOpenModal = () => {
    return renderChildren ? (
      renderChildren({ openModal })
    ) : (
      <button onClick={openModal}>Chọn ngày</button>
    );
  };

  return (
    <>
      {renderButtonOpenModal()}
      <Transition appear show={showModal} as={Fragment}>
        <Dialog
          as="div"
          className="HeroSearchFormMobile__Dialog relative z-50"
          onClose={closeModal}
        >
          <div className="fixed inset-0 bg-neutral-100 dark:bg-neutral-900">
            <div className="flex h-full">
              <Transition.Child
                as={Fragment}
                enter="ease-out transition-transform"
                enterFrom="opacity-0 translate-y-52"
                enterTo="opacity-100 translate-y-0"
                leave="ease-in transition-transform"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-52"
              >
                <Dialog.Panel className="relative h-full flex-1 flex flex-col justify-between overflow-auto">
                  <>
                    <div className="absolute left-4 top-4">
                      <button
                        className="focus:outline-none focus:ring-0"
                        onClick={closeModal}
                      >
                        <XMarkIcon className="w-5 h-5 text-black dark:text-white" />
                      </button>
                    </div>

                    <div className="flex-1 pt-12 py-1 flex flex-col ">
                      <div className="flex-1 bg-white dark:bg-neutral-900">
                        <PaymentPage
                          defaultService={defaultService}
                          defaultStartDate={defaultStartDate}
                          onChangeStartDate={onChangeStartDate}
                          defaultEndDate={defaultEndDate}
                          onChangeEndDate={onChangeEndDate}
                          sessions={sessions}
                          onChangeSessions={onChangeSessions}
                          onClose={closeModal}
                        />
                      </div>
                    </div>
                  </>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ModalReserveMobile;
