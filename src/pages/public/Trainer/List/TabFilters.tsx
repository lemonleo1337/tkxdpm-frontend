import React, { Fragment, useState } from "react";
import { Dialog, Popover, Tab, Transition } from "@headlessui/react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ButtonThird from "shared/Button/ButtonThird";
import ButtonClose from "shared/ButtonClose/ButtonClose";
import Checkbox from "shared/Checkbox/Checkbox";
import convertNumbThousand from "utils/convertNumbThousand";
import Slider from "rc-slider";

const typeOfCategory = [
  {
    name: "Economy",
  },
  {
    name: "Business",
  },
  {
    name: "First Class",
  },
];

const typeOfTrainer = [
  {
    name: "Nguyễn Văn A",
  },
  {
    name: "Nguyễn Văn B",
  },
  {
    name: "Nguyễn Văn C",
  },
  {
    name: "Nguyễn Văn D",
  },
];

const typeOfLocation = [
  {
    name: "Hà Nội",
  },
  {
    name: "Hồ Chí Minh",
  },
  {
    name: "Đà Nẵng",
  },
  {
    name: "Hải Phòng",
  }
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
  const [rangePrices, setRangePrices] = useState([100, 5000]);
  const [tripTimes, setTripTimes] = useState(10);
  const [trainersStates, setTrainersStates] = useState<string[]>([]);
  const [locationsStates, setLocationsStates] = useState<string[]>([]);
  const [categoriesStates, setCategoriesStates] = useState<string[]>([]);
  const [sortStates, setSortStates] = useState<string[]>([]);
  //
  let [catTimes, setCatTimes] = useState({
    "Take Off": {
      Departure: [0, 24],
      Arrival: [0, 24],
    },
    Landing: {
      Departure: [0, 24],
      Arrival: [0, 24],
    },
  });

  //
  const closeModalMoreFilter = () => setisOpenMoreFilter(false);
  const openModalMoreFilter = () => setisOpenMoreFilter(true);

  //
  const handleChangeTrainer = (checked: boolean, name: string) => {
    checked
      ? setTrainersStates([...trainersStates, name])
      : setTrainersStates(trainersStates.filter((i) => i !== name));
  };

  const handleChangeCategory = (checked: boolean, name: string) => {
    checked
      ? setCategoriesStates([...categoriesStates, name])
      : setCategoriesStates(categoriesStates.filter((i) => i !== name));
  };

  const handleChangeLocation = (checked: boolean, name: string) => {
    checked
      ? setLocationsStates([...locationsStates, name])
      : setLocationsStates(locationsStates.filter((i) => i !== name));
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
      <span className="w-4 h-4 rounded-full bg-primary-500 text-white flex items-center justify-center ml-3 cursor-pointer">
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

  const renderTabsTimeFlightTab = () => {
    return (
      <div>
        <Tab.Group>
          <Tab.List className="flex p-1 space-x-1 bg-primary-900/10 rounded-xl">
            {Object.keys(catTimes).map((category) => (
              <Tab
                key={category}
                className={({ selected }) =>
                  `w-full py-2.5 text-sm leading-5 font-medium text-primary-700 dark:text-primary-400 rounded-lg focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60 ${selected
                    ? "bg-white dark:bg-neutral-800 shadow"
                    : " hover:bg-white/[0.15] dark:hover:bg-neutral-800"
                  }`
                }
              >
                {category}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className="mt-2">
            {Object.values(catTimes).map((posts, idx) => {
              return (
                <Tab.Panel
                  key={idx}
                  className={
                    "bg-neutral-50 dark:bg-neutral-900 rounded-xl p-3 space-y-8 focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60"
                  }
                >
                  <span className=" text-neutral-6000 dark:text-neutral-300 text-sm">
                    {idx ? " Tokyo to Singapore" : " Singapore to Tokyo"}
                  </span>
                  <div></div>
                  <div className="space-y-3">
                    <div className="flex space-x-2">
                      <i className="text-lg las la-plane-departure"></i>
                      <span className="text-xs">Departure time:</span>
                      <span className="text-xs text-primary-500 dark:text-primary-400">
                        {posts.Departure[0]}:00 - {posts.Departure[1]}
                        :00
                      </span>
                    </div>
                    <Slider
                      range
                      min={0}
                      max={24}
                      defaultValue={posts.Departure}
                      onChange={(val) =>
                        setCatTimes((catTimes) =>
                          !idx
                            ? {
                              ...catTimes,
                              "Take Off": {
                                ...posts,
                                Departure: val as [number, number],
                              },
                            }
                            : {
                              ...catTimes,
                              Landing: {
                                ...posts,
                                Departure: val as [number, number],
                              },
                            }
                        )
                      }
                      allowCross={false}
                    />
                  </div>
                  <div className="space-y-3">
                    <div className="flex space-x-2">
                      <i className="text-lg las la-plane-arrival"></i>
                      <span className="text-xs">Arrival time:</span>
                      <span className="text-xs text-primary-500 dark:text-primary-400">
                        {posts.Arrival[0]}:00 - {posts.Arrival[1]}:00
                      </span>
                    </div>
                    <Slider
                      range
                      min={0}
                      max={24}
                      defaultValue={posts.Arrival}
                      onChange={(val) =>
                        setCatTimes((catTimes) =>
                          !idx
                            ? {
                              ...catTimes,
                              "Take Off": {
                                ...posts,
                                Arrival: val as [number, number],
                              },
                            }
                            : {
                              ...catTimes,
                              Landing: {
                                ...posts,
                                Arrival: val as [number, number],
                              },
                            }
                        )
                      }
                      allowCross={false}
                    />
                  </div>
                </Tab.Panel>
              );
            })}
          </Tab.Panels>
        </Tab.Group>
      </div>
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
              <span>Categories</span>
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
                      name="All Categories"
                      label="All Categories"
                      defaultChecked={categoriesStates.includes("All Categories")}
                      onChange={(checked) =>
                        handleChangeCategory(checked, "All Categories")
                      }
                    />
                    <hr />
                    {typeOfCategory.map((item) => (
                      <div key={item.name} className="">
                        <Checkbox
                          name={item.name}
                          label={item.name}
                          defaultChecked={categoriesStates.includes(item.name)}
                          onChange={(checked) =>
                            handleChangeCategory(checked, item.name)
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
                      onClick={close}
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

  const renderTabsTrainers = () => {
    return (
      <Popover className="relative">
        {({ open, close }) => (
          <>
            <Popover.Button
              className={`flex items-center justify-center px-4 py-2 text-sm rounded-full border border-neutral-300 dark:border-neutral-700 focus:outline-none 
              ${open ? "!border-primary-500 " : ""}
                ${!!trainersStates.length
                  ? "!border-primary-500 bg-primary-50"
                  : ""
                }
                `}
            >
              <span>Huấn luyện viên</span>
              {!trainersStates.length ? (
                <i className="las la-angle-down ml-2"></i>
              ) : (
                <span onClick={() => setTrainersStates([])}>
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
                    {typeOfTrainer.map((item) => (
                      <div key={item.name} className="">
                        <Checkbox
                          name={item.name}
                          label={item.name}
                          defaultChecked={trainersStates.includes(item.name)}
                          onChange={(checked) =>
                            handleChangeTrainer(checked, item.name)
                          }
                        />
                      </div>
                    ))}
                  </div>
                  <div className="p-5 bg-neutral-50 dark:bg-neutral-900 dark:border-t dark:border-neutral-800 flex items-center justify-between">
                    <ButtonThird
                      onClick={() => {
                        close();
                        setTrainersStates([]);
                      }}
                      sizeClass="px-4 py-2 sm:px-5"
                    >
                      Clear
                    </ButtonThird>
                    <ButtonPrimary
                      onClick={close}
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

  const renderTabsLocations = () => {
    return (
      <Popover className="relative">
        {({ open, close }) => (
          <>
            <Popover.Button
              className={`flex items-center justify-center px-4 py-2 text-sm rounded-full border border-neutral-300 dark:border-neutral-700 focus:outline-none 
              ${open ? "!border-primary-500 " : ""}
                ${!!locationsStates.length
                  ? "!border-primary-500 bg-primary-50"
                  : ""
                }
                `}
            >
              <span>Địa chỉ</span>
              {!locationsStates.length ? (
                <i className="las la-angle-down ml-2"></i>
              ) : (
                <span onClick={() => setLocationsStates([])}>
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
                    {typeOfLocation.map((item) => (
                      <div key={item.name} className="">
                        <Checkbox
                          name={item.name}
                          label={item.name}
                          defaultChecked={locationsStates.includes(item.name)}
                          onChange={(checked) =>
                            handleChangeLocation(checked, item.name)
                          }
                        />
                      </div>
                    ))}
                  </div>
                  <div className="p-5 bg-neutral-50 dark:bg-neutral-900 dark:border-t dark:border-neutral-800 flex items-center justify-between">
                    <ButtonThird
                      onClick={() => {
                        close();
                        setLocationsStates([]);
                      }}
                      sizeClass="px-4 py-2 sm:px-5"
                    >
                      Clear
                    </ButtonThird>
                    <ButtonPrimary
                      onClick={close}
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
              <Popover.Panel className="absolute z-10 w-screen max-w-sm px-4 mt-3 left-0 sm:px-0 lg:max-w-md">
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
                      onClick={close}
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
  const renderTabOnSale = () => {
    return (
      <div
        className={`flex items-center justify-center px-4 py-2 text-sm rounded-full border focus:outline-none cursor-pointer transition-all ${isOnSale
          ? "border-primary-500 bg-primary-50 text-primary-700"
          : "border-neutral-300 dark:border-neutral-700"
          }`}
        onClick={() => setIsOnSale(!isOnSale)}
      >
        <span>On sale</span>
        {isOnSale && renderXClear()}
      </div>
    );
  };

  const renderMoreFilterItem = (
    data: {
      name: string;
      description?: string;
      defaultChecked?: boolean;
    }[]
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
              defaultChecked={!!item.defaultChecked}
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
              defaultChecked={!!item.defaultChecked}
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
          className={`flex items-center justify-center px-4 py-2 text-sm rounded-full border border-primary-500 bg-primary-50 text-primary-700 focus:outline-none cursor-pointer`}
          onClick={openModalMoreFilter}
        >
          <span>
            <span className="hidden sm:inline">Flights</span> filters (3)
          </span>
          {renderXClear()}
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
                      Flight filters
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
                        <h3 className="text-xl font-medium">Categories</h3>
                        <div className="mt-6 relative ">
                          {renderMoreFilterItem(typeOfCategory)}
                        </div>
                      </div>
                      {/* --------- */}
                      {/* ---- */}
                      <div className="py-7">
                        <h3 className="text-xl font-medium">Huấn luyện viên</h3>
                        <div className="mt-6 relative ">
                          {renderMoreFilterItem(typeOfTrainer)}
                        </div>
                      </div>

                      {/* --------- */}
                      {/* ---- */}
                      <div className="py-7">
                        <h3 className="text-xl font-medium">Range Prices</h3>
                        <div className="mt-6 relative ">
                          <div className="relative flex flex-col space-y-8">
                            <div className="space-y-5">
                              <Slider
                                range
                                className="text-red-400"
                                min={0}
                                max={2000}
                                defaultValue={[0, 1000]}
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
                                  Min price
                                </label>
                                <div className="mt-1 relative rounded-md">
                                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <span className="text-neutral-500 sm:text-sm">
                                      $
                                    </span>
                                  </div>
                                  <input
                                    type="text"
                                    name="minPrice"
                                    disabled
                                    id="minPrice"
                                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-3 sm:text-sm border-neutral-200 rounded-full text-neutral-900"
                                    value={rangePrices[0]}
                                  />
                                </div>
                              </div>
                              <div>
                                <label
                                  htmlFor="maxPrice"
                                  className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
                                >
                                  Max price
                                </label>
                                <div className="mt-1 relative rounded-md">
                                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <span className="text-neutral-500 sm:text-sm">
                                      $
                                    </span>
                                  </div>
                                  <input
                                    type="text"
                                    disabled
                                    name="maxPrice"
                                    id="maxPrice"
                                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-3 sm:text-sm border-neutral-200 rounded-full text-neutral-900"
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
                          Strip times
                          <span className="text-sm font-normal ml-1 text-primary-500">{` <${tripTimes} hours`}</span>
                        </h3>
                        <div className="mt-6 relative ">
                          <Slider
                            min={1}
                            max={72}
                            defaultValue={tripTimes}
                            onChange={(e) => setTripTimes(e as number)}
                          />
                        </div>
                      </div>

                      {/* --------- */}
                      {/* ---- */}
                      <div className="py-7">
                        <h3 className="text-xl font-medium">Flight times</h3>
                        <div className="relative flex flex-col py-5 space-y-5">
                          {renderTabsTimeFlightTab()}
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
                      onClick={closeModalMoreFilter}
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
        {renderTabsTrainers()}
        {/* {renderTabsTimeFlight()} */}
        {renderTabsLocations()}
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
