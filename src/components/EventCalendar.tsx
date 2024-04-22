import { useState } from "react";
import { Calendar } from "./ui/calendar"

const EventCalendar: React.FC = () => {
    const [date, setDate] = useState<Date | undefined>(new Date())

    return (
        <div className="col-span-12 h-full max-w-full rounded-lg border border-stroke bg-white px-5 dark:bg-boxdark dark:border-boxdark pt-7.5 pb-5 shadow-default sm:px-7.5 xl:col-span-8">
            <div className="text-xl font-semibold text-black dark:text-white">
                <h3>School Calendar</h3>
            </div>
            <div className="grid-cols-12 col-span-12">        
                <Calendar mode="single" selected={date} onSelect={setDate} className="flex justify-center"/>
            </div>
        </div>
    )
}

export default EventCalendar;