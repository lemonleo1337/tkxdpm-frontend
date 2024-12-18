import React from 'react';

interface LoadingIconProps {
  size?: number;
}

const LoadingIcon: React.FC<LoadingIconProps> = ({ size = 32 }) => {
  const colors = [
    "#fd3c81e5",
    "#f47e60",
    "#f8b26a",
    "#abbd81",
    "#849b87",
    "#6492ac",
    "#638ca6",
    "#638ca6",
  ].reverse();
  const r = 5;
  return (
    <div className="z-999 relative">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        width={size}
        height={size}
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
        className='mx-auto my-auto'
      >
        <g>
          {colors.map((color, index) => (
            <circle
              key={index}
              cx={73.801 - (index * 7.737)}
              cy={68.263 + (index * 5.538)}
              fill={color}
              r={r}
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                calcMode="spline"
                values="0 50 50;360 50 50"
                keySplines="0.5 0 0.5 1"
                repeatCount="indefinite"
                dur="1.4925373134328357s"
                begin={`${-0.062 * index}s`}
              ></animateTransform>
            </circle>
          ))}
          <animateTransform
            attributeName="transform"
            type="rotate"
            calcMode="spline"
            values="0 50 50;0 50 50"
            keySplines="0.5 0 0.5 1"
            repeatCount="indefinite"
            dur="1.4925373134328357s"
          ></animateTransform>
        </g>
      </svg>
    </div>
  );
};

export default LoadingIcon;
