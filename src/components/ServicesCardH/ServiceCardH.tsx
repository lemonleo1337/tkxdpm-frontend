import { ServiceDataType } from "api/service";
import GallerySlider from "components/GallerySlider/GallerySlider";
import { FC } from "react";
import { Link } from "react-router-dom";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import convertMinuteToHour from "utils/converMinuteToHour";
import convertNumbThousand from "utils/convertNumbThousand";

export interface ServicesCardHProps {
  className?: string;
  data?: ServiceDataType;
}

const ServicesCardH: FC<ServicesCardHProps> = ({
  className = "",
  data = {} as ServiceDataType,
}) => {
  const {
    serviceGallaryImages,
    duration,
    name,
    description,
    price,
    // reviewStart,
    // reviewCount,
    maxParticipants,
    id,
  } = data;

  const renderSliderGallery = () => {
    return (
      <div className="relative w-full md:w-72 flex-shrink-0 overflow-hidden">
        <GallerySlider
          ratioClass="aspect-w-12 aspect-h-9 md:aspect-h-11"
          galleryImgs={serviceGallaryImages}
          uniqueID={`ServicesCardH_${id}`}
          href={`/services/${id}`}
        />
        {/* <BtnLikeIcon isLiked={like} className="absolute right-3 top-3" />
        {saleOff && <SaleOffBadge className="absolute left-3 top-3" />} */}
      </div>
    );
  };

  const renderContent = () => {
    return (
      <div className="flex-grow p-3 sm:p-5 flex flex-col">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            {/* {isAds && <Badge name="ADS" color="green" />} */}
            <h2 className="text-lg font-medium capitalize">
              <span className="line-clamp-1">{name}</span>
            </h2>
          </div>
          <div className="flex items-center space-x-4 text-sm text-neutral-500 dark:text-neutral-400">
            {/* <StartRating reviewCount={reviewCount} point={reviewStart} /> */}
            {/* <span>· </span> */}
            <div className="flex items-center">
              <span className="hidden sm:inline-block  text-base">
                {/* icon money */}
                <i className="las la-money-bill-wave"></i>
              </span>
              <span className="sm:ml-2"> {convertNumbThousand(price)}{" VND"}</span>
            </div>
          </div>
        </div>
        {/* <div className="w-14 border-b border-neutral-100 dark:border-neutral-800 my-4"></div> */}
        <div className="hidden sm:block text-sm text-neutral-500 dark:text-neutral-400 mt-4">
          <span className="line-clamp-2">
            {description}
          </span>
        </div>
        <div className="flex items-center space-x-8 mt-4  ">
          <div className="flex items-center space-x-2">
            <i className="las la-clock text-lg"></i>
            <span className="text-sm text-neutral-500 dark:text-neutral-400">
              {convertMinuteToHour(duration)}{""}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <i className="las la-user text-lg"></i>
            <span className="text-sm text-neutral-500 dark:text-neutral-400">
              Tối đa {maxParticipants
              } người
            </span>
          </div>
        </div>
        <div className="w-14 border-b border-neutral-100 dark:border-neutral-800 my-4"></div>
        <div className="flex justify-between items-end">
          {/* <div className="flex items-center space-x-3 text-sm text-neutral-700  dark:text-neutral-300">
            <Avatar imgUrl={author.avatar} userName={author.displayName} />
            <span className="hidden sm:inline-block">
              <span className="hidden sm:inline">Hosted by</span>{" "}
              {author.displayName}
            </span>
          </div> */}
          <ButtonPrimary>
            Chọn dịch vụ
          </ButtonPrimary>
        </div>
      </div>
    );
  };

  return (
    <div
      className={`nc-ServicesCardH group relative bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-2xl overflow-hidden hover:shadow-xl transition-shadow will-change-transform ${className}`}
      data-nc-id="ServicesCardH"
    >
      <Link to={`/services/${id}`} className="absolute inset-0" />
      <div className="md:flex md:flex-row">
        {renderSliderGallery()}
        {renderContent()}
      </div>
    </div>
  );
};

export default ServicesCardH;
