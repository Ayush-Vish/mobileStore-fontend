import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import SideBar from '../components/SideBar';
import MobileGallery from '../components/MobileGallery';

const HomePage = () => {
  return (

    <main className='max-w-[65rem]   m-auto flex flex-col  gap-2   '>
        <Header/>
        <div className='flex justify-between gap-3'>
          <SideBar  />
       
          <MobileGallery/>
        </div>
    </main>
  );
};

export default HomePage;