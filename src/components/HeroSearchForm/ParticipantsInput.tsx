import React, { Fragment, useEffect, useState } from "react";
import { Popover, Transition } from "@headlessui/react";
import NcInputNumber from "components/NcInputNumber/NcInputNumber";
import { FC } from "react";
import ClearDataButton from "./ClearDataButton";
import ButtonSubmit from "./ButtonSubmit";
import { PathName } from "routers/types";
import { ParticipantsObject } from "components/HeroSearchForm2Mobile/ParticipantsInput";

export interface ParticipantsInputProps {
  defaultValue: ParticipantsObject;
  onChange?: (data: ParticipantsObject) => void;
  fieldClassName?: string;
  className?: string;
  buttonSubmitHref?: PathName;
  hasButtonSubmit?: boolean;
}

const ParticipantsInput: FC<ParticipantsInputProps> = ({
  defaultValue,
  onChange,
  fieldClassName = "[ nc-hero-field-padding ]",
  className = "[ nc-flex-1 ]",
  buttonSubmitHref = "/",
  hasButtonSubmit = true,
}) => {
  const [participantsInputValue, setParticipantsInputValue] = useState(
    defaultValue.participants || 1
  );


  useEffect(() => {
    setParticipantsInputValue(defaultValue.participants || 0);
  }, [defaultValue]);

  const handleChangeData = (value: number, type: keyof ParticipantsObject) => {
    let newValue = {
      participants: participantsInputValue,
    };
    if (type === "participants") {
      setParticipantsInputValue(value);
      newValue.participants = value;
    }
    onChange && onChange(newValue);
  };

  const totalParticipants =
    participantsInputValue > 0 ? participantsInputValue : 0;

  return (
    <Popover className={`flex relative ${className}`}>
      {({ open }) => (
        <>
          <div
            className={`flex-1 flex items-center focus:outline-none cursor-pointer ${
              open ? "nc-hero-field-focused" : ""
            }`}
          >
            <Popover.Button
              className={`flex-1 flex text-left items-center ${fieldClassName} space-x-3 `}
              onClick={() => document.querySelector("html")?.click()}
            >
              <div className="text-neutral-300 dark:text-neutral-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="nc-icon-field"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                  />
                </svg>
              </div>
              <div className="flex-grow">
                <span className="block xl:text-lg font-semibold">
                  {totalParticipants || ""} Người
                </span>
                <span className="block mt-1 text-sm text-neutral-400 leading-none font-light">
                  {totalParticipants ? "Người" : "Thêm người"}
                </span>
              </div>
            </Popover.Button>

            <div className="relative">
              {!!totalParticipants && open && (
                <ClearDataButton
                  onClick={() => {
                    setParticipantsInputValue(0);
                  }}
                />
              )}
            </div>

            {/* BUTTON SUBMIT OF FORM */}
            {hasButtonSubmit && (
              <div className="pr-2 xl:pr-4">
                <ButtonSubmit />
              </div>
            )}
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute right-0 z-10 w-full sm:min-w-[340px] max-w-sm bg-white dark:bg-neutral-800 top-full mt-3 py-5 sm:py-6 px-4 sm:px-8 rounded-3xl shadow-xl">
              <NcInputNumber
                className="w-full"
                defaultValue={participantsInputValue}
                onChange={(value) => handleChangeData(value, "participants")}
                max={10}
                min={1}
                label="Người"
                desc="Tối đa 10 người"
              />
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default ParticipantsInput;
