import { TaxonomyType } from "assets/data/types";
import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import BgGlassmorphism from "components/BgGlassmorphism/BgGlassmorphism";
import SectionSliderNewCategories from "components/SectionSliderNewCategories/SectionSliderNewCategories";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "states";
import { fetchTrainer, selectTrainerStatus } from "states/slices/trainer";
import SectionGridFilterCard from "./SectionGridFilterCard"; 
const DEMO_CATS: TaxonomyType[] = [
  {
    id: "1",
    href: "/services/1",
    name: "Yoga",
    taxonomy: "category",
    count: 17288,
    thumbnail:
      "https://images.pexels.com/photos/2581922/pexels-photo-2581922.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
  },
  {
    id: "2",
    href: "/services/2",
    name: "Gym",
    taxonomy: "category",
    count: 2118,
    thumbnail:
      "https://images.pexels.com/photos/2351649/pexels-photo-2351649.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
  {
    id: "3",
    href: "/services/3",
    name: "Spa",
    taxonomy: "category",
    count: 36612,
    thumbnail:
      "https://images.pexels.com/photos/962464/pexels-photo-962464.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
  {
    id: "4",
    href: "/services/4",
    name: "Boxing",
    taxonomy: "category",
    count: 188288,
    thumbnail:
      "https://images.pexels.com/photos/248837/pexels-photo-248837.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
  {
    id: "5",
    href: "/services/5",
    name: "Dance",
    taxonomy: "category",
    count: 188288,
    thumbnail:
      "https://images.pexels.com/photos/3613236/pexels-photo-3613236.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  },
  {
    id: "6",
    href: "/services/6",
    name: "Cycling",
    taxonomy: "category",
    count: 188288,
    thumbnail:
      "https://images.pexels.com/photos/3613236/pexels-photo-3613236.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  },
];

function PageTrainer() {
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
  const trainerStatus = useAppSelector(selectTrainerStatus);

  useEffect(() => {
    if (trainerStatus === "idle") dispatch(fetchTrainer());
  }, [dispatch, trainerStatus]);

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
            heading="Top huấn luyện viên nổi bật"
            subHeading="Huấn luyện viên được bình chọn nhiều nhất trong tháng"
            categoryCardType="card5"
            itemPerRow={4}
            sliderStyle="style1"
            uniqueClassName="ListingTrainerPage"
            categories={DEMO_CATS}
          />
        </div>

      </div>
    </div>
  );
}

export default PageTrainer;
