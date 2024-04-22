import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchStudentByID } from "@/redux/features/student/studentActions";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import Cover from '../../images/cover/cover-01.png'
import Profile from '../../images/user/user-06.png'
import DefaultLayout from "@/layout/DefaultLayout";
import { Mail, Phone } from "lucide-react";
import SkeletonProfile from "@/components/SkeletonProfile";

const StudentProfile = ()=> {
    const { studentId } :{ studentId?: string } = useParams(); 
    const dispatch = useAppDispatch();
    const student = useAppSelector((state) => state.studentSingle.studentData);
    const [isVisible, setIsVisible] = useState<boolean>(false)

    useEffect(() => {
      dispatch(fetchStudentByID({studentId: studentId || ""}))

    }, [dispatch, studentId]);

    useEffect(() => {
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 10 * 75)
  
      return () => clearTimeout(timer)
    }, [])

  if (!student || !isVisible) return <SkeletonProfile />

  
    return (
      <DefaultLayout>
        <Breadcrumb pageName="Student" />
        {(!student && studentId) ? <div>Loading...</div> : (

        <div className="overflow-hidden rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="relative z-20 h-35 md:h-65">
            <img
              src={Cover}
              alt="profile cover"
              className="h-full w-full rounded-tl-sm rounded-tr-sm object-cover object-center"
            />
          </div>
          <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
            <div className="relative z-30 mx-auto -mt-22 h-30 w-full max-w-30 rounded-full bg-white/20 p-1 backdrop-blur sm:h-44 sm:max-w-44 sm:p-3">
              <div className="relative drop-shadow-2">
                <img src={Profile} alt="profile" />
              </div>
            </div>
            <div className="mt-4">
              <h3 className="mb-1.5 text-2xl font-semibold text-black dark:text-white">
                {student?.name}
              </h3>
              <div className="flex gap-7 justify-center">
                <div className="flex flex-col sm:flex-row gap-3 items-center">
                    <Link to="#" type="phone"
                        onClick={() => navigator.clipboard.writeText(student?.phone || '')}
                        className="relative flex h-8.5 w-8.5 items-center justify-center rounded-full border-[0.5px] border-stroke bg-gray hover:text-purple dark:border-strokedark dark:bg-meta-4 dark:text-white">
                    <Phone />
                    </Link>
                    <p className="font-medium text-sm sm:text-lg">{student?.phone}</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 items-center">
                    <Link to="#" type="email"
                        onClick={() => navigator.clipboard.writeText(student?.email || '')}
                        className="relative flex h-8.5 w-8.5 items-center justify-center rounded-full border-[0.5px] border-stroke bg-gray hover:text-purple dark:border-strokedark dark:bg-meta-4 dark:text-white">
                      <Mail />
                    </Link>
                  <p className="font-medium text-sm sm:text-lg">{student?.email}</p>
                </div>
              </div>
              <div className="mx-auto mt-4.5 mb-5.5 grid max-w-101 grid-cols-6 rounded-lg border border-stroke py-2.5 shadow-1 dark:border-strokedark dark:bg-[#37404F]">
                <div className="flex flex-col items-center col-span-2 justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark">
                  <span className="text-sm">City:</span>
                  <span className="font-semibold text-black dark:text-white">
                    {student?.city}
                  </span>
                </div>
                <div className="flex flex-col items-center col-span-2 justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark">
                  <span className="text-sm">Parent Name:</span>
                  <span className="font-semibold text-black dark:text-white">
                    {student?.parent_name}
                  </span>
                </div>
                <div className="flex flex-col items-center col-span-2 justify-center gap-1 px-4">
                  <span className="text-sm">Grade:</span>
                  <span className="font-semibold text-black dark:text-white">
                    {student?.grade}
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
        
        )}
      </DefaultLayout>
    );
};

export default StudentProfile;