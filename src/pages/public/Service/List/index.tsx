import { getTopServices } from "api/service";
import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import BgGlassmorphism from "components/BgGlassmorphism/BgGlassmorphism";
import SectionSliderNewCategories from "components/SectionSliderNewCategories/SectionSliderNewCategories";
import { useEffect } from "react";
import { useQuery } from 'react-query';
import { useAppDispatch, useAppSelector } from "states";
import { fetchService, selectServiceStatus } from "states/slices/service";
import { convertServiceDataTypeToTaxonomyType } from "utils/convertToNewFormat";
import SectionGridFilterCard from "./SectionGridFilterCard";

function PageService() {

  const { data: servicesData, isLoading, isError } = useQuery("services", () => getTopServices(10));
  
  //rename data, isLoading, isError
  const top10Services = convertServiceDataTypeToTaxonomyType(servicesData?.data || []);
  
  // CUSTOM THEME STYLE
  useEffect(() => {
    const $body = document.querySelector("body");
    if (!$body) return;
    $body.classList.add("theme-purple-blueGrey");
    return () => {
      $body.classList.remove("theme-purple-blueGrey");
    };
  }, []);

  const dispatch = useAppDispatch();
  const serviceStatus = useAppSelector(selectServiceStatus);

  useEffect(() => {
    if (serviceStatus === "idle") dispatch(fetchService());
  }, [dispatch, serviceStatus]);

  return (
    <div className="nc-PageHome3 relative overflow-hidden">
      {/* GLASSMOPHIN */}
      <BgGlassmorphism />

      {/* SECTION HERO */}
      <div className="container px-1 sm:px-4 mb-24 ">
      </div>

      <div className="container relative space-y-24 mb-24 ">
        {/* SECTION */}
        <SectionGridFilterCard className="pb-24 lg:pb-28" />

        {/* SECTION */}
        <div className="relative py-16">
          <BackgroundSection />
          <SectionSliderNewCategories
            heading="Top dich vụ nổi bật"
            subHeading="Dịch vụ được yêu thích nhất trong tháng"
            categoryCardType="card5"
            itemPerRow={4}
            sliderStyle="style1"
            uniqueClassName="ListingServicePage"
            categories={top10Services}
            isLoading={isLoading}
            isError={isError}
          />
        </div>

      </div>
    </div>
  );
}

export default PageService;
