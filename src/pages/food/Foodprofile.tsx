import Breadcrumb from "@/components/Breadcrumb/Breadcrumb"
import DefaultLayout from "@/layout/DefaultLayout"
import { foodData } from "./foodData"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import Picture from "../../images/cover/cover-01.png"
import { Badge } from "@/components/ui/badge"
import { BarChart2, MoveUpRight, StarIcon } from "lucide-react"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"

const FoodProfile:React.FC = () => {
    const { foodId } :{ foodId?: string } = useParams(); 

    const food = foodData.find(food => food.id === foodId)

    const [isVisible, setIsVisible] = useState<boolean>(false)

    useEffect(() => {
        const timer = setTimeout(() => {
          setIsVisible(true)
        }, 10 * 75)
    
        return () => clearTimeout(timer)
      }, [])
  
    if (!food || !isVisible) return <FoodSkeleton />

    return(
        <DefaultLayout>
            <Breadcrumb pageName={"Food Details"} />
            <div className="overflow-hidden rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <Card className="p-6">
                    <div className="grid grid-cols-12 w-full">
                        <div className="col-span-12 sm:col-span-6">
                            <img className="rounded-lg object-cover" src={Picture} alt="" />
                        </div>
                        <div className="col-span-12 sm:col-span-6">
                            <CardHeader className="font-bold text-2xl">
                                {food?.name}
                            </CardHeader>
                            <div>
                                <CardContent>
                                    <Badge>
                                        {food?.type}
                                    </Badge>
                                </CardContent>
                                <CardContent>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Est incidunt eos vel dignissimos dicta ipsum, placeat iste dolor   quae tenetur ducimus vero ullam at porro enim laudantium, ut cum quas.
                                </CardContent>
                            </div>
                        </div>
                    </div>
                    <div className="sm:grid sm:grid-cols-12 items-center">
                        <CardContent className="sm:col-span-2">
                            <p className="font-thin">Rating</p>
                            <div className="flex items-center gap-2 mt-2 font-bold text-lg">
                                <StarIcon className="text-yellow-200" fill="yellow"/>
                                {food?.rating}
                            </div>
                        </CardContent>
                        <CardContent className="sm:col-span-3">
                            <div className="flex items-center gap-2 mt-2 font-bold text-lg">
                                <BarChart2 size={70} className="text-purple"/>
                                <div className="">
                                    {food?.totalOrder}
                                    <p className="text-sm font-thin">Total Order</p>
                                </div>
                            </div>
                        </CardContent>
                        <CardContent className="sm:col-span-3">
                            <div className="flex items-center gap-2 mt-2 font-bold text-lg">
                                <MoveUpRight size={70} className="text-purple"/>
                                <div className="">
                                    {food?.interest}%
                                    <p className="text-sm font-thin">Interest</p>
                                </div>
                            </div>
                        </CardContent>
                    </div>
                    <div className="sm:grid sm:grid-cols-12">
                        <div className="col-span-5 mb-5">
                            <h3 className="font-bold text-lg">Ingredients</h3>
                            <ul className="list-disc mx-4 mt-5 font-light text-muted-foreground">
                                    <li>2 tablespoons butter, softened, divided </li>
                                    <li>1 teaspoon minced fresh parsley </li>
                                    <li>1/2 teaspoon minced garlic</li> 
                                    <li>1/4 teaspoon reduced-sodium soy sauce </li>
                                    <li>1 beef flat iron steak or boneless top sirloin steak (3/4 pound) </li>
                                    <li>1/8 teaspoon salt </li>
                                    <li>1/8 teaspoon pepper</li>
                            </ul>
                        </div>
                        <div className="col-span-3 mb-5">
                            <h3 className="font-bold text-lg">Nutrition:</h3>
                            <ul className="list-disc mx-4 mt-5 font-light text-muted-foreground">
                                <li>Calories: 217.</li> 
                                <li>Water: 61%</li> 
                                <li>Protein: 26.1 grams.</li> 
                                <li>Carbs: 0 grams.</li> 
                                <li>Sugar: 0 grams.</li> 
                                <li>Fiber: 0 grams.</li> 
                                <li>Fat: 11.8 grams.</li>
                            </ul>
                        </div>
                    </div>
                </Card>
            </div>
        </DefaultLayout>
    )
}

export default FoodProfile


const FoodSkeleton =() => {
    return(
        <DefaultLayout>
        <Breadcrumb pageName={"Food Details"} />
        <div className="overflow-hidden rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <Card className="p-6">
                <div className="grid grid-cols-12 w-full">
                    <div className="col-span-12 sm:col-span-6">
                        <Skeleton className="w-200 h-40"/>
                    </div>
                    <div className="col-span-12 sm:col-span-6">
                        <CardHeader className="font-bold text-2xl">
                            <Skeleton className="w-40 h-5"/>
                        </CardHeader>
                        <div>
                            <CardContent>
                                    <Skeleton className="h-4 w-20"/>
                            </CardContent>
                            <CardContent>
                                <Skeleton className="w-150 h-4 mx-1 my-3"/>
                                <Skeleton className="w-120 h-4 mx-1 my-3"/>
                                <Skeleton className="w-100 h-4 mx-1 my-3"/>
                            </CardContent>
                        </div>
                    </div>
                </div>
                <div className="sm:grid sm:grid-cols-12 items-center">
                    <CardContent className="sm:col-span-2">
                        <p className="font-thin">Rating</p>
                        <div className="flex items-center gap-2 mt-2 font-bold text-lg">
                            <StarIcon className="text-yellow-200" fill="yellow"/>
                            <Skeleton className="w-10 h-4"/>
                        </div>
                    </CardContent>
                    <CardContent className="sm:col-span-3">
                        <div className="flex items-center gap-2 mt-2 font-bold text-lg">
                            <BarChart2 size={70} className="text-purple"/>
                            <div className="">
                                <Skeleton className="w-10 h-4"/>
                                <p className="text-sm font-thin">Total Order</p>
                            </div>
                        </div>
                    </CardContent>
                    <CardContent className="sm:col-span-3">
                        <div className="flex items-center gap-2 mt-2 font-bold text-lg">
                            <MoveUpRight size={70} className="text-purple"/>
                            <div className="">
                                <Skeleton className="w-10 h-4"/>
                                <p className="text-sm font-thin">Interest</p>
                            </div>
                        </div>
                    </CardContent>
                </div>
                <div className="sm:grid sm:grid-cols-12">
                    <div className="col-span-5 mb-5">
                        <h3 className="font-bold text-lg">Ingredients</h3>
                        <ul className="list-disc mx-4 mt-5 font-light text-muted-foreground">
                                <li><Skeleton className="w-70 h-4 mr-4 my-3"/></li>
                                <li><Skeleton className="w-70 h-4 mr-4 my-3"/></li>
                                <li><Skeleton className="w-70 h-4 mr-4 my-3"/></li>
                                <li><Skeleton className="w-70 h-4 mr-4 my-3"/></li>
                                <li><Skeleton className="w-70 h-4 mr-4 my-3"/></li>
                                <li><Skeleton className="w-70 h-4 mr-4 my-3"/></li>
                                <li><Skeleton className="w-70 h-4 mr-4 my-3"/></li>
                        </ul>
                    </div>
                    <div className="col-span-3 mb-5">
                        <h3 className="font-bold text-lg">Nutrition:</h3>
                        <ul className="list-disc mx-4 mt-5 font-light text-muted-foreground">
                            <li><Skeleton className="w-40 h-4 mr-4 my-3"/></li>
                            <li><Skeleton className="w-40 h-4 mr-4 my-3"/></li>
                            <li><Skeleton className="w-40 h-4 mr-4 my-3"/></li>
                            <li><Skeleton className="w-40 h-4 mr-4 my-3"/></li>
                            <li><Skeleton className="w-40 h-4 mr-4 my-3"/></li>
                            <li><Skeleton className="w-40 h-4 mr-4 my-3"/></li>
                            <li><Skeleton className="w-40 h-4 mr-4 my-3"/></li>
                        </ul>
                    </div>
                </div>
            </Card>
        </div>
    </DefaultLayout>
    )
}