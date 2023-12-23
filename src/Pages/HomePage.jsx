import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import SideBar from '../components/SideBar';
import MobileGallery from '../components/MobileGallery';
import { CiMenuBurger } from 'react-icons/ci';
import { useDispatch, useSelector } from 'react-redux';
import { toggleMenu } from '../Redux/slices/mobile.slice';
import Loader from '../components/Loader';

const HomePage = () => {
  const dispatch = useDispatch();
  const {isMenuOpen , mobiles} = useSelector(state => state.mobile);
  console.log(isMenuOpen);
  console.log(mobiles);

  const variants = {
    open: { rotate: 90 },
    closed: { rotate: 0 },
  };

  return (
    <main className='max-w-[65rem] m-auto flex flex-col gap-2 shadow-xl  bg-gray-100'>
      <Header/>
    
        {
          mobiles ? 
                    <div className='flex justify-between gap-3 relative'>
                    <div className='h-fit relative'>
                      <div className='flex sm:hidden absolute top-0 left-2 z-10'>
                        <motion.div animate={isMenuOpen ? "open" : "closed"} variants={variants}>
                          <CiMenuBurger onClick={()=> dispatch(toggleMenu(!isMenuOpen))} scale={10} size={20} />
                        </motion.div>
                      </div>
                      {isMenuOpen && (
                        <div className='sm:hidden z-10 absolute top-8 '>
                          <SideBar />
                        </div>
                      )}
                      <div className='hidden sm:flex w-[200px]'>
                        <SideBar />
                      </div>
                    </div>
                    <MobileGallery/>
                  </div>
                  : 
                    <Loader/>
        }
    </main>
  );
};

export default HomePage;