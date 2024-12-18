import { StarIcon } from "@heroicons/react/24/solid";
import React, { FC, useEffect } from "react";
import { useState } from "react";

export interface FiveStartIconForRateProps {
  className?: string;
  iconClass?: string;
  defaultPoint?: number;
  onChange?: (point: number) => void;
}

const FiveStartIconForRate: FC<FiveStartIconForRateProps> = ({
  className = "",
  iconClass = "w-4 h-4",
  defaultPoint = 5,
  onChange,
}) => {
  const [point, setPoint] = useState(defaultPoint);
  const [currentHover, setCurrentHover] = useState(0);

  useEffect(() => {
    setPoint(defaultPoint);
  }, [defaultPoint]);

  return (
    <div
      className={`nc-FiveStartIconForRate flex items-center text-neutral-300 ${className}`}
      data-nc-id="FiveStartIconForRate"
    >
      {[1, 2, 3, 4, 5].map((item) => (
        <StarIcon
          key={item}
          className={`${point >= item || currentHover >= item ? "text-yellow-500" : ""} ${iconClass}`}
          onMouseEnter={() => setCurrentHover(item)}
          onMouseLeave={() => setCurrentHover(0)}
          onClick={() => {
            setPoint(item);
            if (onChange) {
              onChange(item);
            }
          }}
        />
      ))}
    </div>
  );
};


export default FiveStartIconForRate;
