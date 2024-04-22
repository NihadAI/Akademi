import Breadcrumb from "@/components/Breadcrumb/Breadcrumb"
import DefaultLayout from "@/layout/DefaultLayout"
import { fetchTeacherByID } from "@/redux/features/teacher/teacherActions"
import { useAppDispatch, useAppSelector } from "@/redux/store"
import { Mail, Phone } from "lucide-react"
import { useEffect, useState } from "react"
import Cover from '../../images/cover/cover-01.png'
import Profile from '../../images/user/user-06.png'
import { useParams, Link } from "react-router-dom"
import SkeletonProfile from "@/components/SkeletonProfile"

const TeacherProfile = () => {
    const { teacherId } :{ teacherId?: string } = useParams();

    const dispatch = useAppDispatch();
    const teacherData = useAppSelector((state) => state.teacherSingle.teacherData);
    const [isVisible, setIsVisible] = useState<boolean>(false)

    useEffect(() => {
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 10 * 75)
  
      return () => clearTimeout(timer)
    }, [])

    useEffect(() => {
        dispatch(fetchTeacherByID({teacherId: teacherId || ""}))
    }, [dispatch, teacherId]);
    
    if (!teacherData || !isVisible) return <SkeletonProfile />

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Teacher" />
            <div className="overflow-hidden rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="relative z-20 h-35 md:h-65">
                    <img src={Cover} alt="profile cover"
                        className="h-full w-full rounded-tl-sm rounded-tr-sm object-cover object-center" />
                </div>
                <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
                    <div
                        className="relative z-30 mx-auto -mt-22 h-30 w-full max-w-30 rounded-full bg-white/20 p-1 backdrop-blur sm:h-44 sm:max-w-44 sm:p-3">
                        <div className="relative drop-shadow-2">
                            <img src={Profile} alt="profile" />
                        </div>
                    </div>

                    <div className="mt-4">
                        <h3 className="mb-1.5 text-2xl font-semibold text-black dark:text-white">
                            {teacherData?.name}
                        </h3>
                        <div className="flex gap-7 justify-center">
                            <div className="flex flex-col sm:flex-row gap-3 items-center">
                                <Link to="#" type="phone"
                                    className="relative flex h-8.5 w-8.5 items-center justify-center rounded-full border-[0.5px] border-stroke bg-gray hover:text-purple dark:border-strokedark dark:bg-meta-4 dark:text-white">
                                <Phone />
                                </Link>
                                <p className="font-medium text-sm sm:text-md">{teacherData?.phone}</p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-3 items-center">
                                <Link to="#" type="email"
                                    className="relative flex h-8.5 w-8.5 items-center justify-center rounded-full border-[0.5px] border-stroke bg-gray hover:text-purple dark:border-strokedark dark:bg-meta-4 dark:text-white">
                                <Mail />
                                </Link>
                                <p className="font-medium text-sm sm:text-md">{teacherData?.email}</p>
                            </div>
                        </div>
                        <div
                            className="mx-auto mt-4.5 mb-5.5 grid max-w-101 grid-cols-6 rounded-md border border-stroke py-2.5 shadow-1 dark:border-strokedark dark:bg-[#37404F]">
                            <div
                                className="flex flex-col items-center col-span-2 justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark">
                                <span className="text-sm">Field:</span>
                                <span className="font-semibold text-black dark:text-white">
                                    {teacherData?.position}
                                </span>
                            </div>
                            <div
                                className="flex flex-col items-center col-span-2 justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark">
                                <span className="text-sm">University:</span>
                                <span className="font-semibold text-black dark:text-white">
                                    Yale
                                </span>
                            </div>
                            <div
                                className="flex flex-col items-center col-span-2 justify-center gap-1 px-4">
                                <span className="text-sm">Degree:</span>
                                <span className="font-semibold text-black dark:text-white">
                                    PhD
                                </span>
                            </div>
                        </div>

                        <div className="mx-auto max-w-180">
                            <h4 className="font-semibold text-black dark:text-white">
                                About Me
                            </h4>
                            <p className="mt-4.5">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                Pellentesque posuere fermentum urna, eu condimentum mauris
                                tempus ut. Donec fermentum blandit aliquet. Etiam dictum dapibus
                                ultricies. Sed vel aliquet libero. Nunc a augue fermentum,
                                pharetra ligula sed, aliquam lacus.
                            </p>
                        </div>
                    </div>
                </div>
                </div>
        </DefaultLayout>
    )
}

export default TeacherProfile