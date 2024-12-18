import CardCategoryBox1 from "components/CardCategoryBox1/CardCategoryBox1";
import Heading from "components/Heading/Heading";
import { TaxonomyType } from "assets/data/types";
import React from "react";
import LoadingIcon from "shared/LoadingIcon/LoadingIcon";

export interface SectionGridCategoryBoxProps {
  categories?: TaxonomyType[];
  headingCenter?: boolean;
  categoryCardType?: "card1";
  className?: string;
  gridClassName?: string;
  isLoading?: boolean;
  isError?: boolean;
}

const DEMO_CATS: TaxonomyType[] = [
  {
    id: "1",
    href: "#",
    name: "Boxing",
    taxonomy: "category",
    count: 1882,
    thumbnail:
      "https://i0.wp.com/www.muscleandfitness.com/wp-content/uploads/2020/05/boxer-training-bag.jpg?quality=86&strip=all"
  },
  {
    id: "2",
    href: "#",
    name: "Caradio",
    taxonomy: "category",
    count: 8288,
    thumbnail:
      "https://youfit.com/wp-content/uploads/2022/09/cardio-workouts-at-the-gym.png"
  },
  {
    id: "2",
    href: "#",
    name: "Cycling",
    taxonomy: "category",
    count: 1288,
    thumbnail:
      "https://www.siroko.com/blog/c/app/uploads/2021/07/fitness_21858fa8-864f-404f-9bf5-c2a7d5f72ed7-1440x900.jpg"
  },
  {
    id: "2",
    href: "#",
    name: "Dumbblelling",
    taxonomy: "category",
    count: 112,
    thumbnail:
      "https://shtheme.org/demosd/gymee/wp-content/uploads/2020/06/gallery-12.jpg"
  },
  {
    id: "2",
    href: "#",
    name: "Fitness",
    taxonomy: "category",
    count: 323,
    thumbnail:
      "https://img.freepik.com/free-photo/young-fitness-man-studio_7502-5008.jpg"
  },
  {
    id: "2",
    href: "#",
    name: "Gym",
    taxonomy: "category",
    count: 2223,
    thumbnail:
      "https://shtheme.org/demosd/gymee/wp-content/uploads/2020/06/gallery-13.jpg"
  },
  {
    id: "11",
    href: "#",
    name: "Trainer",
    taxonomy: "category",
    count: 1775,
    thumbnail:
      "https://athleticsweekly.com/wp-content/uploads/2020/11/PT-image-via-OriGym.jpg"
  },
  {
    id: "222",
    href: "#",
    name: "Yoga",
    taxonomy: "category",
    count: 1288,
    thumbnail:
      "https://static.toiimg.com/photo/102565262.cms"
  },
];

const SectionGridCategoryBox: React.FC<SectionGridCategoryBoxProps> = ({
  categories,
  categoryCardType = "card1",
  headingCenter = true,
  className = "",
  gridClassName = "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  isLoading,
  isError,
}) => {
  let CardComponentName = CardCategoryBox1;
  switch (categoryCardType) {
    case "card1":
      CardComponentName = CardCategoryBox1;
      break;

    default:
      CardComponentName = CardCategoryBox1;
  }

  return (
    <div className={`nc-SectionGridCategoryBox relative ${className}`}>
      <Heading
        desc="Các dịch vụ hàng đầu của chúng tôi dành cho bạn"
        isCenter={headingCenter}
      >
        Khám phá dịch vụ
      </Heading>
      {isLoading ? <LoadingIcon size={30} /> : isError ? <LoadingIcon size={30} /> :
        (<div className={`grid ${gridClassName} gap-5 sm:gap-6 md:gap-8`}>
          {categories?.map((item, i) => (
            <CardComponentName key={i} taxonomy={item} />
          ))}
        </div>)}
    </div>
  );
};

export default SectionGridCategoryBox;
