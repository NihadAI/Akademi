import React from 'react';
import CardDataStats from '../components/CardDataStats';
import ChartOne from '../components/Charts/ChartOne';
import ChartTwo from '../components/Charts/ChartTwo';
import TableOne from '../components/Table/TableOne';
import DefaultLayout from '../layout/DefaultLayout';
import { Calendar, User, Users, Utensils } from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import EventCalendar from '@/components/EventCalendar';

const Dashboard: React.FC = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName={'Dashboard'}/>
      <div className="grid grid-cols-1 gap-4 bg-white dark:bg-boxdark rounded-lg border shadow-default border-stroke dark:border-meta-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5 ">
        <CardDataStats title="Students" total="942" rate="43%" levelUp>
          <Users className='text-primary'/>
        </CardDataStats>
        <CardDataStats title="Teachers" total="754" rate="4%" levelUp>
          <User className='text-primary'/>
        </CardDataStats>
        <CardDataStats title="Events" total="55" rate="20%" levelDown>
          <Calendar className='text-primary'/>
        </CardDataStats>
        <CardDataStats title="Food" total="32k" >
          <Utensils className='text-primary'/>
        </CardDataStats>
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <div className="col-span-12">
          <ChartOne />
        </div>
        <div className='col-span-12 sm:col-span-6'>
          <ChartTwo />
        </div>
        <div className='col-span-12 sm:col-span-6'>
          <EventCalendar />
        </div>
        <div className="col-span-12">
          <TableOne />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Dashboard;
