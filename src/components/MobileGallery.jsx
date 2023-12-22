import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMobiles } from '../Redux/slices/mobile.slice';
import MobileCard from './MobileCard';

function MobileGallery() {
  const dispatch = useDispatch()
  const mobileData= useSelector(state => state.mobile);


  const getMobilesData =async () => {

    const response = await dispatch(getMobiles()); 
    
  }
  useEffect(()=>{
    getMobilesData();
    
  }, [])
  return (
    <section className='flex flex-col flex-wrap bg-white p-1 w-full  '>
      {
        mobileData.mobiles.map((e , idx ) => (

          <MobileCard key={idx} name={e.name} type={e.type} processor={e.processor} memory={e.memory} price={e.price} image={e.image}  />
        ) )
      }
    </section>
  )
}

export default MobileGallery