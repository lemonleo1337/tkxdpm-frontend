import { TrainerDataType } from "api/trainer";
import Heading2 from "components/Heading/Heading2";
import TrainerCard from "components/TrainerCard/TrainerCard";
import { PageType } from "contains/type";
import { FC } from "react";
import Pagination from "shared/Pagination/Pagination";
import { useAppDispatch, useAppSelector } from "states";
import { fetchTrainer, selectTrainerFilter, selectTrainerPagination, selectTrainerResults, setFilter } from "states/slices/trainer";
import TabFilters from "./TabFilters";

export interface SectionGridFilterCardProps {
  className?: string;
  data?: TrainerDataType[];
}


const SectionGridFilterCard: FC<SectionGridFilterCardProps> = ({
  className = "",
  data = useAppSelector(selectTrainerResults),
}) => {
  const pagination = useAppSelector(selectTrainerPagination);
  const filter = useAppSelector(selectTrainerFilter);

  const dispatch = useAppDispatch();

  const handlePageChange = (value: number) => {
    const newPage: PageType = { page: value, take: filter?.page?.take, sort: filter?.page?.sort ?? "asc", sort_by: filter?.page?.sort_by ?? "id" };
    dispatch(setFilter({ ...filter, page: newPage }));
    dispatch(fetchTrainer());
  }
  return (
    <div
      className={`nc-SectionGridFilterCard ${className}`}
      data-nc-id="SectionGridFilterCard"
    >
      <Heading2
        heading="Huấn luyện viên"
        subHeading={
          <span className="block text-neutral-500 dark:text-neutral-400 mt-3">
            50+ Dịch vụ
            <span className="mx-2">·</span>100+ Huấn luyện viên
          </span>
        }
      />

      <div className="mb-8 lg:mb-11">
        <TabFilters />
      </div>
      <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {data?.map((service) => (
          <TrainerCard key={service.TrainerId} data={service} />
        ))}
      </div>
      <div className="flex mt-16 justify-center items-center">
        <Pagination pagination={pagination} filter={filter.page} handlePageChange={handlePageChange} />
      </div>
    </div>
  );
};

export default SectionGridFilterCard;
