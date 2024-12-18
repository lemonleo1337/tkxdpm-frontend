import { getMemberBodyMeasurements } from "api/member";
import BgGlassmorphism from "components/BgGlassmorphism/BgGlassmorphism";
import Heading2 from "components/Heading/Heading2";
import Label from "components/Label/Label";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import LoadingIcon from "shared/LoadingIcon/LoadingIcon";
import { useAppSelector } from "states";
import { selectAuthUserInfo } from "states/slices/auth";

function PageBodyInfo() {
    // CUSTOM THEME STYLE
    const navigate = useNavigate();
    useEffect(() => {
        const $body = document.querySelector("body");
        if (!$body) return;
        $body.classList.add("theme-purple-blueGrey");
        return () => {
            $body.classList.remove("theme-purple-blueGrey");
        };
    }, []);

    const user = useAppSelector(selectAuthUserInfo);
    const { data: bodyData, isLoading, isError } = useQuery("bodyData", () => getMemberBodyMeasurements(user?.id?.toString() || ""));

    const renderTable = () => {
        if (!bodyData || bodyData.length === 0) {
            return <Label className="z-999 relative">Không có dữ liệu</Label>;
        }

        return (
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                    <thead>
                        <tr className="w-full bg-gray-100 dark:bg-gray-700 border-b border-gray-300 dark:border-gray-600">
                            <th className="py-3 px-6 text-left">Ngày đo</th>
                            <th className="py-3 px-6 text-left">Chiều cao (cm)</th>
                            <th className="py-3 px-6 text-left">Cân nặng (kg)</th>
                            <th className="py-3 px-6 text-left">Mỡ (%)</th>
                            <th className="py-3 px-6 text-left">Cơ (%)</th>
                            <th className="py-3 px-6 text-left">Xương (%)</th>
                            <th className="py-3 px-6 text-left">Vòng eo (cm)</th>
                            <th className="py-3 px-6 text-left">Vòng hông (cm)</th>
                            <th className="py-3 px-6 text-left">Vòng ngực (cm)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bodyData.data.map((item: any) => (
                            <tr key={item.id} className="border-b border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="py-3 px-6">{item.measurement_date}</td>
                                <td className="py-3 px-6">{item.height}</td>
                                <td className="py-3 px-6">{item.weight}</td>
                                <td className="py-3 px-6">{item.fat}</td>
                                <td className="py-3 px-6">{item.muscle}</td>
                                <td className="py-3 px-6">{item.bone}</td>
                                <td className="py-3 px-6">{item.waist}</td>
                                <td className="py-3 px-6">{item.hip}</td>
                                <td className="py-3 px-6">{item.chest}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };

    return (
        <div className="nc-PageHome3 relative overflow-hidden">
            {/* GLASSMORPHISM */}
            <BgGlassmorphism />

            {/* SECTION HERO */}
            <div className="container px-1 sm:px-4 mb-24 ">
            </div>

            {/* SECTION HERO */}
            <div className="container relative space-y-24 mb-24">
                <div className="flex justify-between items-center">
                    <div>
                        <Heading2
                            heading="Thông tin cơ thể"
                            subHeading={
                                <span className="block text-neutral-500 dark:text-neutral-400 mt-3"></span>
                            }
                        />
                    </div>
                </div>
                {
                    isLoading ? (
                        <LoadingIcon size={30} />
                    ) : isError ? (
                        <Label className="z-999 relative">Có lỗi xảy ra vui lòng thử lại sau</Label>
                    ) : (
                        renderTable()
                    )
                }
            </div>

            <div className="container relative space-y-24 mb-24">
                {/* SECTION */}
                {/* SECTION */}
            </div>
        </div>
    );
}

export default PageBodyInfo;
