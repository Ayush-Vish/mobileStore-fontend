import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'

const Loader = ({ part1, part2 }) => {
  if(part1 ) return (
      <div className='flex h-screen w-full  flex-row gap-3'>

        <div className='w-52 hidden sm:block h-full'>
          <Skeleton width="100%" height="50%" />
        </div>
      </div>

  )
  return (
    <div className="flex h-screen w-full  flex-row gap-3">
    
        
        <div className='w-full p-3 bg-white  items-center'>
          <Skeleton  height="200px" />
          <Skeleton width="100%" height="200px" />
          <Skeleton width="100%" height="200px" />
          <Skeleton width="100%" height="200px" />
     
        </div>
      
    </div>
  );
};

export default Loader;