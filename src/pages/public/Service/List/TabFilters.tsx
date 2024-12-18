import React, { Fragment, useEffect, useState } from "react";
import { Dialog, Popover, Tab, Transition } from "@headlessui/react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ButtonThird from "shared/Button/ButtonThird";
import ButtonClose from "shared/ButtonClose/ButtonClose";
import Checkbox from "shared/Checkbox/Checkbox";
import convertNumbThousand from "utils/convertNumbThousand";
import Slider from "rc-slider";
import { useAppDispatch, useAppSelector } from "states";
import { fetchService, selectServiceFilter, setFilter } from "states/slices/service";
import { ServiceTypeLabel, ServiceTypeValue } from "enums";

const typeOfCategory = [
  {
    id: ServiceTypeValue.GROUP,
    name: ServiceTypeLabel.GROUP,
  },
  {
    id: ServiceTypeValue.ONLINE,
    name: ServiceTypeLabel.ONLINE,
  },
  {
    id: ServiceTypeValue.PRIVATE,
    name: ServiceTypeLabel.PRIVATE,
  },
  {
    id: ServiceTypeValue.SELF,
    name: ServiceTypeLabel.SELF,
  },
];

const typeOfWorkout = [
  {
    id: 1,
    name: "Boxing",
  },
  {
    id: 2,
    name: "Cardio",
  },
  {
    id: 3,
    name: "Cycling",
  },
  {
    id: 4,
    name: "Dumbblelling",
  },
  {
    id: 5,
    name: "Fitness",
  },
];


const typeOfSort = [
  {
    name: "Giá (thấp nhất)"
  },
  {
    name: "Giá (cao nhất)"
  },
  {
    name: "Phổ biến nhất"
  },
  {
    name: "Tên (A-Z)"
  },
  {
    name: "Tên (Z-A)"
  },
];


//
const TabFilters = () => {
  const [isOpenMoreFilter, setisOpenMoreFilter] = useState(false);
  //
  const [isOnSale, setIsOnSale] = useState(true);
  const [durationTime, setDurationTime] = useState(60);
  const [workoutsStates, setWorkoutsStates] = useState<number[]>([]);
  const [categoriesStates, setCategoriesStates] = useState<number[]>([]);
  const [rangePrices, setRangePrices] = useState([0, 600000]);
  const [sortStates, setSortStates] = useState<string[]>([]);
  const filter = useAppSelector(selectServiceFilter);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const newFilter = {
      ...filter,
      categories: categoriesStates,
      workouts: workoutsStates,
      rangePrices: rangePrices,
      durationTime: durationTime,
    };
    dispatch(setFilter(newFilter));
  }, [categoriesStates, workoutsStates, rangePrices, durationTime, dispatch]);

  const handlerApplyFilter = async () => {
    await dispatch(setFilter({
      ...filter,
      categories: categoriesStates,
      workouts: workoutsStates,
      rangePrices: rangePrices,
      durationTime: durationTime,
    }));
    dispatch(fetchService());
  };
  //
  const closeModalMoreFilter = () => setisOpenMoreFilter(false);
  const openModalMoreFilter = () => setisOpenMoreFilter(true);

  //
  const handleChangeCategory = (checked: boolean, id: number) => {
    checked
      ? setCategoriesStates([...categoriesStates, id])
      : setCategoriesStates(categoriesStates.filter((i) => i !== id));
  };

  const handleChangeWorkout = (checked: boolean, id: number) => {
    checked
      ? setWorkoutsStates([...workoutsStates, id])
      : setWorkoutsStates(workoutsStates.filter((i) => i !== id));
  };

  const handlerChangeSort = (checked: boolean, name: string) => {
    // checked only 1
    checked
      ? setSortStates([name])
      : setSortStates(sortStates.filter((i) => i !== name));
  };
  //


  const renderXClear = () => {
    return (
      <span className="w-4 h-4 rounded-full bg-primary-500 text-white flex items-center justify-center ml-3 cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-3 w-3"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </span>
    );
  };

  const renderTabsPriceRage = () => {
    return (
      <Popover className="relative">
        {({ open, close }) => (
          <>
            <Popover.Button
              className={`flex items-center justify-center px-4 py-2 text-sm rounded-full border border-neutral-300 dark:border-neutral-700 focus:outline-none
               ${open ? "!border-primary-500 " : ""}
                ${rangePrices[0] !== 0 || rangePrices[1] !== 600000
                  ? "!border-primary-500 bg-primary-50"
                  : ""
                }`}
            >
              <span>
                {`${convertNumbThousand(
                  rangePrices[0]
                )} VND - ${convertNumbThousand(rangePrices[1])} VND`}{" "}
              </span>
              {rangePrices[0] !== 0 || rangePrices[1] !== 600000 ? (
                <span onClick={() => setRangePrices([0, 600000])}>
                  {renderXClear()}
                </span>
              ) : (
                <i className="las la-angle-down ml-2"></i>
              )}
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute z-10 w-screen max-w-sm px-4 mt-3 left-0 sm:px-0 ">
                <div className="overflow-hidden rounded-2xl shadow-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700">
                  <div className="relative flex flex-col px-5 py-6 space-y-8">
                    <div className="space-y-5">
                      <span className="font-medium">Giá buổi tập</span>
                      <Slider
                        range
                        min={0}
                        max={600000}
                        defaultValue={[rangePrices[0], rangePrices[1]]}
                        allowCross={false}
                        onChange={(e) => setRangePrices(e as number[])}
                      />
                    </div>

                    <div className="flex justify-between space-x-5">
                      <div>
                        <label
                          htmlFor="minPrice"
                          className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
                        >
                          Giá nhỏ nhất
                        </label>
                        <div className="mt-1 relative rounded-md">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-neutral-500 sm:text-sm">
                              VND
                            </span>
                          </div>
                          <input
                            type="text"
                            name="minPrice"
                            disabled
                            id="minPrice"
                            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-12 pr-3 sm:text-sm"
                            value={rangePrices[0]}
                          />
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor="maxPrice"
                          className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
                        >
                          Giá lớn nhất
                        </label>
                        <div className="mt-1 relative rounded-md">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-neutral-500 sm:text-sm">
                              VND
                            </span>
                          </div>
                          <input
                            type="text"
                            disabled
                            name="maxPrice"
                            id="maxPrice"
                            className="pl-12 pr-3 "
                            value={rangePrices[1]}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-5 bg-neutral-50 dark:bg-neutral-900 dark:border-t dark:border-neutral-800 flex items-center justify-between">
                    <ButtonThird
                      onClick={() => {
                        close();
                        setRangePrices([0, 600000]);
                      }}
                      sizeClass="px-4 py-2 sm:px-5"
                    >
                      Clear
                    </ButtonThird>
                    <ButtonPrimary
                      onClick={() => {
                        close();
                        handlerApplyFilter();
                      }}
                      sizeClass="px-4 py-2 sm:px-5"
                    >
                      Apply
                    </ButtonPrimary>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    );
  };
  const renderTabsTypeOfCategories = () => {
    return (
      <Popover className="relative">
        {({ open, close }) => (
          <>
            <Popover.Button
              className={`flex items-center justify-center px-4 py-2 text-sm rounded-full border border-neutral-300 dark:border-neutral-700 focus:outline-none
               ${open ? "!border-primary-500 " : ""}
                ${!!categoriesStates.length
                  ? "!border-primary-500 bg-primary-50"
                  : ""
                }
                `}
            >
              <span>Loại hình dịch vụ</span>
              {!categoriesStates.length ? (
                <i className="las la-angle-down ml-2"></i>
              ) : (
                <span onClick={() => setCategoriesStates([])}>
                  {renderXClear()}
                </span>
              )}
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute z-10 w-screen max-w-sm px-4 mt-3 left-0 sm:px-0 lg:max-w-md">
                <div className="overflow-hidden rounded-2xl shadow-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700">
                  <div className="relative flex flex-col px-5 py-6 space-y-5">
                    <Checkbox
                      name="Tất cả loại dịch vụ"
                      label="Tất cả loại dịch vụ"
                      defaultChecked={categoriesStates.includes(0)}
                      onChange={(checked) =>
                        handleChangeCategory(checked, 0)
                      }
                    />
                    <hr />
                    {typeOfCategory.map((item) => (
                      <div key={item.name} className="">
                        <Checkbox
                          name={item.name}
                          label={item.name}
                          defaultChecked={categoriesStates.includes(item.id)}
                          onChange={(checked) =>
                            handleChangeCategory(checked, item.id)
                          }
                        />
                      </div>
                    ))}
                  </div>
                  <div className="p-5 bg-neutral-50 dark:bg-neutral-900 dark:border-t dark:border-neutral-800 flex items-center justify-between">
                    <ButtonThird
                      onClick={() => {
                        close();
                        setCategoriesStates([]);
                      }}
                      sizeClass="px-4 py-2 sm:px-5"
                    >
                      Clear
                    </ButtonThird>
                    <ButtonPrimary
                      onClick={() => {
                        close();
                        handlerApplyFilter();
                      }}
                      sizeClass="px-4 py-2 sm:px-5"
                    >
                      Apply
                    </ButtonPrimary>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    );
  };

  const renderTabsWorkouts = () => {
    return (
      <Popover className="relative">
        {({ open, close }) => (
          <>
            <Popover.Button
              className={`flex items-center justify-center px-4 py-2 text-sm rounded-full border border-neutral-300 dark:border-neutral-700 focus:outline-none 
              ${open ? "!border-primary-500 " : ""}
                ${!!workoutsStates.length
                  ? "!border-primary-500 bg-primary-50"
                  : ""
                }
                `}
            >
              <span>Bài tập luyện</span>
              {!workoutsStates.length ? (
                <i className="las la-angle-down ml-2"></i>
              ) : (
                <span onClick={() => setWorkoutsStates([])}>
                  {renderXClear()}
                </span>
              )}
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute z-10 w-screen max-w-sm px-4 mt-3 left-0 sm:px-0 lg:max-w-md">
                <div className="overflow-hidden rounded-2xl shadow-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700">
                  <div className="relative flex flex-col px-5 py-6 space-y-5">
                    {typeOfWorkout.map((item) => (
                      <div key={item.name} className="">
                        <Checkbox
                          name={item.name}
                          label={item.name}
                          defaultChecked={workoutsStates.includes(item.id)}
                          onChange={(checked) =>
                            handleChangeWorkout(checked, item.id)
                          }
                        />
                      </div>
                    ))}
                  </div>
                  <div className="p-5 bg-neutral-50 dark:bg-neutral-900 dark:border-t dark:border-neutral-800 flex items-center justify-between">
                    <ButtonThird
                      onClick={() => {
                        close();
                        setWorkoutsStates([]);
                      }}
                      sizeClass="px-4 py-2 sm:px-5"
                    >
                      Clear
                    </ButtonThird>
                    <ButtonPrimary
                      onClick={() => {
                        close();
                        handlerApplyFilter();
                      }}
                      sizeClass="px-4 py-2 sm:px-5"
                    >
                      Apply
                    </ButtonPrimary>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )
        }
      </Popover >
    );
  };

  const renderTabsDurationTime = () => {
    return (
      <Popover className="relative">
        {({ open, close }) => (
          <>
            <Popover.Button
              className={`flex items-center justify-center px-4 py-2 text-sm rounded-full border border-neutral-300 dark:border-neutral-700 focus:outline-none
               ${open ? "!border-primary-500 " : ""}
                ${durationTime !== 60
                  ? "!border-primary-500 bg-primary-50"
                  : ""
                }`}
            >
              <span>Nhỏ hơn {durationTime} phút</span>
              {durationTime === 60 ? (
                <i className="las la-angle-down ml-2"></i>
              ) : (
                <span onClick={() => setDurationTime(60)}>
                  {renderXClear()}
                </span>
              )}
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute z-10 w-screen max-w-sm px-4 mt-3 left-0 sm:px-0 ">
                <div className="overflow-hidden rounded-2xl shadow-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700">
                  <div className="relative flex flex-col px-5 py-6 space-y-8">
                    <div className="space-y-5">
                      <div className="font-medium">
                        Thời gian diễn ra buổi tập:
                        <span className="text-sm font-normal ml-1 text-primary-500">{` <${durationTime} phút`}</span>
                      </div>

                      <Slider
                        min={1}
                        max={180}
                        defaultValue={durationTime}
                        onChange={(e) => setDurationTime(e as number)}
                      />
                    </div>
                  </div>
                  <div className="p-5 bg-neutral-50 dark:bg-neutral-900 dark:border-t dark:border-neutral-800 flex items-center justify-between">
                    <ButtonThird
                      onClick={() => {
                        close();
                        setDurationTime(60);
                      }}
                      sizeClass="px-4 py-2 sm:px-5"
                    >
                      Clear
                    </ButtonThird>
                    <ButtonPrimary
                      onClick={() => {
                        close();
                        handlerApplyFilter();
                      }}
                      sizeClass="px-4 py-2 sm:px-5"
                    >
                      Apply
                    </ButtonPrimary>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )
        }
      </Popover >
    );
  };

  const renderTabsSorts = () => {
    return (
      <Popover className="relative">
        {({ open, close }) => (
          <>
            <Popover.Button
              className={`flex items-center justify-center px-4 py-2 text-sm rounded-full border border-neutral-300 dark:border-neutral-700 focus:outline-none 
              ${open ? "!border-primary-500 " : ""}
                ${!!sortStates.length
                  ? "!border-primary-500 bg-primary-50"
                  : ""
                }
                `}
            >
              <span>Sắp xếp</span>
              {!sortStates.length ? (
                <i className="las la-angle-down ml-2"></i>
              ) : (
                <span onClick={() => setSortStates([])}>
                  {renderXClear()}
                </span>
              )}
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute z-10 w-screen max-w-sm px-4 mt-3 left-1/2 transform -translate-x-1/2 sm:left-0 lg:max-w-md">
                <div className="overflow-hidden rounded-2xl shadow-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700">
                  <div className="relative flex flex-col px-5 py-6 space-y-5">
                    {typeOfSort.map((item) => (
                      <div key={item.name} className="">
                        <a
                          onClick={() => handlerChangeSort(true, item.name)}
                          className={`cursor-default flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50 
                            ${sortStates.includes(item.name)
                              ? "bg-gray-100 dark:bg-neutral-700"
                              : "opacity-80"
                            }`}                        >
                          {item.name}
                        </a>
                      </div>
                    ))}
                  </div>
                  <div className="p-5 bg-neutral-50 dark:bg-neutral-900 dark:border-t dark:border-neutral-800 flex items-center justify-between">
                    <ButtonThird
                      onClick={() => {
                        close();
                        setSortStates([]);
                      }}
                      sizeClass="px-4 py-2 sm:px-5"
                    >
                      Clear
                    </ButtonThird>
                    <ButtonPrimary
                      onClick={() => {
                        close();
                        handlerApplyFilter();
                      }}
                      sizeClass="px-4 py-2 sm:px-5"
                    >
                      Apply
                    </ButtonPrimary>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    );
  };

  const renderMoreFilterItem = (
    data: {
      name: string;
      description?: string;
      defaultChecked?: boolean;
      onChange: (checked: boolean) => void;
    }[],
    state: any[] = []
  ) => {
    const list1 = data.filter((_, i) => i < data.length / 2);
    const list2 = data.filter((_, i) => i >= data.length / 2);
    return (
      <div className="grid grid-cols-2 gap-8">
        <div className="flex flex-col space-y-5">
          {list1.map((item) => (
            <Checkbox
              key={item.name}
              name={item.name}
              subLabel={item.description}
              label={item.name}
              defaultChecked={state.includes(item.name)}
              onChange={(checked) => item.onChange(checked)}
            />
          ))}
        </div>
        <div className="flex flex-col space-y-5">
          {list2.map((item) => (
            <Checkbox
              key={item.name}
              name={item.name}
              subLabel={item.description}
              label={item.name}
              defaultChecked={state.includes(item.name)}
              onChange={(checked) => item.onChange(checked)}
            />
          ))}
        </div>
      </div>
    );
  };

  // FOR RESPONSIVE MOBILE
  const renderTabMobileFilter = () => {
    return (
      <div>
        <div
          className={`flex items-center justify-center px-4 py-2 text-sm rounded-full border border-neutral-300 dark:border-neutral-700 focus:outline-non 
            ${categoriesStates.length || workoutsStates.length || rangePrices[0] !== 0 || rangePrices[1] !== 600000 || durationTime !== 60 || sortStates.length
              ? "!border-primary-500 bg-primary-50"
              : ""
            }`}
        >
          <span onClick={openModalMoreFilter}>
            <span className="hidden sm:inline">Dịch vụ</span> Lọc (5)
          </span>

          {categoriesStates.length || workoutsStates.length || rangePrices[0] !== 0 || rangePrices[1] !== 600000 || durationTime !== 60 ? (
            <span onClick={() => {
              setisOpenMoreFilter(false);
              setCategoriesStates([]);
              setWorkoutsStates([]);
              setRangePrices([0, 600000]);
              setDurationTime(60);
              handlerApplyFilter();
            }}>
              {renderXClear()}
            </span>
          ) : (
            <i className="las la-angle-down ml-2"></i>
          )}
        </div>

        <Transition appear show={isOpenMoreFilter} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 z-50 overflow-y-auto"
            onClose={closeModalMoreFilter}
          >
            <div className="min-h-screen text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-40 dark:bg-opacity-60" />
              </Transition.Child>

              {/* This element is to trick the browser into centering the modal contents. */}
              <span
                className="inline-block h-screen align-middle"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <Transition.Child
                className="inline-block py-8 px-2 h-screen w-full max-w-4xl"
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <div className="inline-flex flex-col w-full max-w-4xl text-left align-middle transition-all transform overflow-hidden rounded-2xl bg-white dark:bg-neutral-900 dark:border dark:border-neutral-700 dark:text-neutral-100 shadow-xl h-full">
                  <div className="relative flex-shrink-0 px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 text-center">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Lọc dịch vụ
                    </Dialog.Title>
                    <span className="absolute left-3 top-3">
                      <ButtonClose onClick={closeModalMoreFilter} />
                    </span>
                  </div>

                  <div className="flex-grow overflow-y-auto">
                    <div className="px-4 md:px-10 divide-y divide-neutral-200 dark:divide-neutral-800">
                      {/* --------- */}
                      {/* ---- */}
                      <div className="py-7">
                        <h3 className="text-xl font-medium">Loại hình dịch vụ</h3>
                        <div className="mt-6 relative ">
                          {renderMoreFilterItem(
                            typeOfCategory.map(item => ({
                              ...item,
                              onChange: (checked: boolean) => handleChangeCategory(checked, item.id)
                            })),
                            categoriesStates
                          )}
                        </div>
                      </div>
                      {/* --------- */}
                      {/* ---- */}
                      <div className="py-7">
                        <h3 className="text-xl font-medium">Các bài tập</h3>
                        <div className="mt-6 relative ">
                          {renderMoreFilterItem(
                            typeOfWorkout.map(item => ({
                              ...item,
                              onChange: (checked: boolean) => handleChangeWorkout(checked, item.id)
                            })),
                            workoutsStates
                          )}
                        </div>
                      </div>


                      {/* --------- */}
                      {/* ---- */}
                      <div className="py-7">
                        <h3 className="text-xl font-medium">Giá dịch vụ</h3>
                        <div className="mt-6 relative ">
                          <div className="relative flex flex-col space-y-8">
                            <div className="space-y-5">
                              <Slider
                                range
                                className="text-red-400"
                                min={0}
                                max={600000}
                                defaultValue={[0, 600000]}
                                allowCross={false}
                                onChange={(e) => setRangePrices(e as number[])}
                              />
                            </div>

                            <div className="flex justify-between space-x-5">
                              <div>
                                <label
                                  htmlFor="minPrice"
                                  className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
                                >
                                  Giá nhỏ nhất
                                </label>
                                <div className="mt-1 relative rounded-md">
                                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <span className="text-neutral-500 sm:text-sm">
                                      VND
                                    </span>
                                  </div>
                                  <input
                                    type="text"
                                    name="minPrice"
                                    disabled
                                    id="minPrice"
                                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-12 pr-3 sm:text-sm border-neutral-200 rounded-full text-neutral-900"
                                    value={rangePrices[0]}
                                  />
                                </div>
                              </div>
                              <div>
                                <label
                                  htmlFor="maxPrice"
                                  className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
                                >
                                  Giá lớn nhất
                                </label>
                                <div className="mt-1 relative rounded-md">
                                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <span className="text-neutral-500 sm:text-sm">
                                      VND
                                    </span>
                                  </div>
                                  <input
                                    type="text"
                                    disabled
                                    name="maxPrice"
                                    id="maxPrice"
                                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-12 pr-3 sm:text-sm border-neutral-200 rounded-full text-neutral-900"
                                    value={rangePrices[1]}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* --------- */}
                      {/* ---- */}
                      <div className="py-7">
                        <h3 className="text-xl font-medium">
                          Thời gian tập luyện
                          <span className="text-sm font-normal ml-1 text-primary-500">{` <${durationTime} Phút`}</span>
                        </h3>
                        <div className="mt-6 relative ">
                          <Slider
                            min={1}
                            max={120}
                            defaultValue={durationTime}
                            onChange={(e) => setDurationTime(e as number)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 sm:p-6 flex-shrink-0 bg-neutral-50 dark:bg-neutral-900 dark:border-t dark:border-neutral-800 flex items-center justify-between">
                    <ButtonThird
                      onClick={closeModalMoreFilter}
                      sizeClass="px-4 py-2 sm:px-5"
                    >
                      Clear
                    </ButtonThird>
                    <ButtonPrimary
                      onClick={() => {
                        closeModalMoreFilter();
                        handlerApplyFilter();
                      }}
                      sizeClass="px-4 py-2 sm:px-5"
                    >
                      Apply
                    </ButtonPrimary>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>
      </div>
    );
  };

  return (
    <div className="flex lg:space-x-4">
      {/* FOR DESKTOP */}
      <div className="hidden lg:flex space-x-4">
        {renderTabsTypeOfCategories()}
        {renderTabsPriceRage()}
        {renderTabsDurationTime()}
        {renderTabsWorkouts()}
        {/* {renderTabOnSale()} */}
        {renderTabsSorts()}
      </div>

      {/* FOR RESPONSIVE MOBILE */}
      <div className="flex lg:hidden space-x-4">
        {renderTabMobileFilter()}
        {/* {renderTabOnSale()} */}
        {renderTabsSorts()}
      </div>
    </div>
  );
};

export default TabFilters;
