import React, { useEffect, useState } from "react";
import NcInputNumber from "components/NcInputNumber/NcInputNumber";
import { FC } from "react";

export interface ParticipantsObject {
  participants?: number;
}
export interface ParticipantsInputProps {
  defaultValue: ParticipantsObject;
  onChange?: (data: ParticipantsObject) => void;
  className?: string;
  max?: number;
}

const ParticipantsInput: FC<ParticipantsInputProps> = ({
  defaultValue,
  onChange,
  className = "",
  max = 20,
}) => {
  const [participantsnputValue, setParticipantsInputValue] = useState(
    defaultValue.participants || 0
  );


  useEffect(() => {
    setParticipantsInputValue(defaultValue.participants || 0);
  }, [defaultValue.participants]);


  const handleChangeData = (value: number, type: keyof ParticipantsObject) => {
    let newValue = {
      participants: participantsnputValue,
    };
    if (type === "participants") {
      setParticipantsInputValue(value);
      newValue.participants = value;
    }
  
    onChange && onChange(newValue);
  };

  return (
    <div className={`flex flex-col relative p-5 ${className}`}>
      <span className="mb-5 block font-semibold text-xl sm:text-2xl">
        Số người tham gia
      </span>
      <NcInputNumber
        className="w-full"
        defaultValue={participantsnputValue}
        onChange={(value) => handleChangeData(value, "participants")}
        max={max}
        label="Người tham gia"
        desc={`Tối đa ${max} người`}
      />
    </div>
  );
};

export default ParticipantsInput;
