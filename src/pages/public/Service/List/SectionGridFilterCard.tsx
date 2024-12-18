import { ServiceDataType } from "api/service";
import Heading2 from "components/Heading/Heading2";
import ServiceCard from "components/ServiceCard/ServiceCard";
import { FC } from "react";
import Pagination from "shared/Pagination/Pagination";
import { useAppDispatch, useAppSelector } from "states";
import { fetchService, selectServiceFilter, selectServicePagination, selectServiceResults, selectServiceStatus, setFilter } from "states/slices/service";
import TabFilters from "./TabFilters";
import { PageType } from "contains/type";
import LoadingIcon from "shared/LoadingIcon/LoadingIcon";
import Label from "components/Label/Label";

export interface SectionGridFilterCardProps {
  className?: string;
  data?: ServiceDataType[];
}


const SectionGridFilterCard: FC<SectionGridFilterCardProps> = ({
  className = "",
  data = useAppSelector(selectServiceResults),
}) => {
  const pagination = useAppSelector(selectServicePagination);
  const filter = useAppSelector(selectServiceFilter);

  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectServiceStatus) === "loading";
  const isError = useAppSelector(selectServiceStatus) === "error";
  const handlePageChange = (value: number) => {
    const newPage: PageType = { page: value, take: filter?.page?.take, sort: filter?.page?.sort ?? "asc", sort_by: filter?.page?.sort_by ?? "id" };
    dispatch(setFilter({ ...filter, page: newPage }));
    dispatch(fetchService());
  }
  return (
    <div
      className={`nc-SectionGridFilterCard ${className}`}
      data-nc-id="SectionGridFilterCard"
    >
      <Heading2
        heading="Dịch vụ"
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

      {isLoading ? <LoadingIcon size={30} /> : isError ? <Label className="text-red-500">Có lỗi xảy ra vui lòng thử lại sau</Label>
        : (
          <div>
            <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
              {data?.map((service: any) => (
                <ServiceCard key={service.id} data={service} />
              ))}
            </div>
            <div className="flex mt-16 justify-center items-center">
              <Pagination pagination={pagination} filter={filter.page} handlePageChange={handlePageChange} />
            </div>
          </div>
        )}
    </div>
  );
};

export default SectionGridFilterCard;
