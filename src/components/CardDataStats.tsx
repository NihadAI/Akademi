import { ArrowDown, ArrowUp } from 'lucide-react';
import React, { ReactNode } from 'react';

interface CardDataStatsProps {
  title: string;
  total: string;
  rate?: string;
  levelUp?: boolean;
  levelDown?: boolean;
  children: ReactNode;
}

const CardDataStats: React.FC<CardDataStatsProps> = ({
  title,
  total,
  rate,
  levelUp,
  levelDown,
  children,
}) => {
  return (
    <div className="rounded-lg bg-white dark:bg-boxdark py-6 px-7.5 dark:border-boxdark ">
      <div className='flex justify-start '>
        <div className="flex h-11.5 w-11.5 items-center mx-2 justify-center rounded-full bg-meta-2 dark:bg-black dark:text-black">
        {children}
        </div>
      
        <div className="mt-1 mx-3 flex items-end justify-between">
        <div>
          <h4 className="text-title-md font-bold text-black dark:text-white">
            {title}
          </h4>
          <span className="text-sm font-medium">{total}</span>
        </div>
      </div>
      </div>
        <span
          className={`flex items-center justify-end gap-1 text-sm font-medium ${
            levelUp && 'text-meta-3'
          } ${levelDown && 'text-meta-1'} `}
        >
          {rate}

          {levelUp && (
            <ArrowUp className='h-4'/>
          )}
          {levelDown && (
            <ArrowDown className='h-4'/>
          )}
        </span>
    </div>
  );
};

export default CardDataStats;
