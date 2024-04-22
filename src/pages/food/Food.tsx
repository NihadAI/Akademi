import Breadcrumb from "@/components/Breadcrumb/Breadcrumb"
import DefaultLayout from "@/layout/DefaultLayout"
import { FoodTable, columns } from "./FoodTable"
import { foodData } from "./foodData"

const Food:React.FC = () => {
    return(
        <DefaultLayout>
            <Breadcrumb pageName={"Food"} />
            <FoodTable columns={columns} data={foodData} />
        </DefaultLayout>
    )
}

export default Food