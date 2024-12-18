import { TrainerDataType } from "api/trainer";
import StartRating from "components/StartRating/StartRating";
import { FC } from "react";
import { Link } from "react-router-dom";
import NcImage from "shared/NcImage/NcImage";

export interface TrainersCardProps {
  className?: string;
  ratioClass?: string;
  data?: TrainerDataType;
  size?: "default" | "small";
}

const TrainerCard: FC<TrainersCardProps> = ({
  size = "default",
  className = "",
  data = {} as TrainerDataType,
  ratioClass = "aspect-w-3 aspect-h-3",
}) => {
  const {
    TrainerId,
    name,
    avatar,
    birth_date,
    email,
    phone,
    address,
    gender,
    specialty,
    experience,
    reviewCount,
    reviewStart,
  } = data;

  const renderSliderGallery = () => {
    return (
      <div className="relative w-full rounded-2xl overflow-hidden will-change-transform">
        <Link to={`/trainers/${TrainerId}`} className={`block ${ratioClass}`}>
          <NcImage src={avatar} />
        </Link>
        {/* <BtnLikeIcon isLiked={like} className="absolute right-3 top-3" /> */}
        {/* {saleOff && <SaleOffBadge className="absolute left-3 top-3" desc={`Giảm ${saleOff}%`} />} */}
      </div>
    );
  };

  const renderContent = () => {
    return (
      <div className={size === "default" ? "py-4 space-y-4" : "py-3 space-y-2"}>
        <div className="space-y-2">
          <div className="flex items-center text-neutral-500 dark:text-neutral-400 text-sm space-x-2">
            {/* {size === "default" && (
              <svg className="w-6 h-6 text-neutral-300 dark:text-neutral-6000" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.33333 8.16667V3.5M18.6667 8.16667V3.5M8.16667 12.8333H19.8333M5.83333 24.5H22.1667C23.4553 24.5 24.5 23.4553 24.5 22.1667V8.16667C24.5 6.878 23.4553 5.83333 22.1667 5.83333H5.83333C4.54467 5.83333 3.5 6.878 3.5 8.16667V22.1667C3.5 23.4553 4.54467 24.5 5.83333 24.5Z" stroke="#D1D5DB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
            )} */}
            {/* gender */}
            <span className="">
              Kinh nghiệm: {experience} năm
            </span>
          </div>

          <div className="flex items-center space-x-2 justify-between">
            {/* {is_online && <Badge name="ONLINE" color="green" />} */}
            <h2
              className={` font-medium capitalize ${size === "default" ? "text-base" : "text-base"
                }`}
            >
              <span className="line-clamp-1">{name}</span>
            </h2>
            <StartRating reviewCount={reviewCount} point={reviewStart} />
            
          </div>
        </div>
        <div className="border-b border-neutral-100 dark:border-neutral-800"></div>
        <div className="flex justify-between items-center">
          <span className="text-base font-semibold">
            Chuyên ngành: {specialty}
            {/* {size === "default" && (
              <span className="text-sm text-neutral-500 dark:text-neutral-400 font-normal">
                /person
              </span>
            )} */}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div
      className={`nc-ExperiencesCard group relative ${className}`}
      data-nc-id="ExperiencesCard"
    >
      {renderSliderGallery()}
      <Link to={`/trainers/${TrainerId}`}>{renderContent()}</Link>
    </div>
  );
};

export default TrainerCard