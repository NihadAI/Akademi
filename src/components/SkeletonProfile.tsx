import { Link } from 'react-router-dom'
import { Skeleton } from './ui/skeleton'
import { Mail, Phone } from 'lucide-react'
import DefaultLayout from '@/layout/DefaultLayout'
import Breadcrumb from './Breadcrumb/Breadcrumb'

const SkeletonProfile = () => {
  return (
  <DefaultLayout>
      <Breadcrumb pageName='Student' />
      <div className='overflow-hidden rounded-lg border border-stroke bg-white dark:bg-boxdark dark:border-boxdark shadow-default'>
          <div className="relative z-20 h-35 md:h-65">
              <Skeleton
                  className="h-full w-full rounded-tl-sm rounded-tr-sm object-cover object-center" />
          </div>
          <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
              <div
                  className="relative z-30 mx-auto -mt-22 h-30 w-full max-w-30 rounded-full bg-white/20 p-1 backdrop-blur sm:h-44 sm:max-w-44 sm:p-3">
                  <div className="relative drop-shadow-2">
                      <Skeleton className=' absolute h-35 w-35 rounded-full top-2 left-[5px]'/>
                  </div>
              </div>
              <div className="mt-4">
                  <h3 className="mb-1.5 text-2xl font-semibold text-black dark:text-white">
                      <Skeleton className="w-[400px] h-5 mx-auto" />
                  </h3>
                  <div className="flex gap-7 justify-center">
                      <div className="flex flex-row gap-3 items-center">
                          <Link to="#" type="phone" className="relative flex h-8.5 w-8.5 items-center justify-center rounded-full border-[0.5px]
                      border-stroke bg-gray hover:text-purple dark:border-strokedark dark:bg-meta-4 dark:text-white">
                          <Phone />
                          </Link>
                          <Skeleton className="w-[100px] h-4" />
                      </div>
                      <div className="flex flex-row gap-3 items-center">
                          <Link to="#" type="email" className="relative flex h-8.5 w-8.5 items-center justify-center rounded-full border-[0.5px]
                      border-stroke bg-gray hover:text-purple dark:border-strokedark dark:bg-meta-4 dark:text-white">
                          <Mail />
                          </Link>
                          <Skeleton className="h-4 w-[100px]" />
                      </div>
                  </div>
                  <div
                      className="mx-auto mt-4.5 mb-5.5 grid max-w-101 grid-cols-6 rounded-lg border border-stroke py-2.5 shadow-1 dark:border-strokedark dark:bg-[#37404F]">
                      <div
                          className="flex lg:flex-col items-center col-span-2 justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row">
                          <span className="text-sm">City:</span>
                          <span className="font-semibold text-black dark:text-white">
                              <Skeleton className="w-[200px] h-4" />
                          </span>
                      </div>
                      <div
                          className="flex lg:flex-col items-center col-span-2 justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row">
                          <span className="text-sm">Parent Name:</span>
                          <span className="font-semibold text-black dark:text-white">
                              <Skeleton className="w-[200px] h-4" />

                          </span>
                      </div>
                      <div className="flex lg:flex-col items-center col-span-2 justify-center gap-1 px-4 xsm:flex-row">
                          <span className="text-sm">Grade:</span>
                          <span className="font-semibold text-black dark:text-white">
                              <Skeleton className="w-[30px] h-4" />
                          </span>
                      </div>
                  </div>

                  <div className="mx-auto max-w-180">
                      <h4 className="font-semibold text-black dark:text-white">
                          About Me
                      </h4>
                      <Skeleton className="mt-4.5 w-[400px] h-4 mx-auto" />
                      <Skeleton className="mt-4.5 w-[350px] h-4 mx-auto" />
                      <Skeleton className="mt-4.5 w-[300px] h-4 mx-auto" />
                  </div>
              </div>
          </div>
      </div>
  </DefaultLayout>

  )
  }

export default SkeletonProfile