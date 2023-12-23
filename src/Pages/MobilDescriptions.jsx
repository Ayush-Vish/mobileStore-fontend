import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../Helpers/axios';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { addToCart } from '../Redux/slices/mobile.slice';

function MobileDescriptions() {
  const [data, setData] = useState({});
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate( );

  const getData = async () => {
    const response = await axiosInstance.get(`api/mobiles/${id}`);
    setData(response.data.data.mobile);
  };
  const handlAddToCart = async ( ) => {
    const response =await dispatch(addToCart({id}));
    if(response.payload.status) {
      navigate("/cart")
    }
  }
  useEffect(() => {
    getData();
  }, []);

  return (
    <motion.div
      className='flex flex-col m-auto bg-gray-200 max-w-[65rem]  text-center '
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className=' w-full mx-auto bg-white rounded-xl shadow-md overflow-hidden '>
        <div className='md:flex'>
          <div className='md:flex-shrink-0'>
            <img className=' object-cover m-auto md:w-[600px]' src="https://rukminim2.flixcart.com/image/416/416/ktketu80/mobile/8/z/w/iphone-13-mlph3hn-a-apple-original-imag6vzzhrxgazsg.jpeg?q=70" alt={data.name} />
          </div>
          <div className='p-8'>
            <motion.h1
              className='text-4xl font-bold mb-2'
              initial={{ y: -50 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {data.name}
            </motion.h1>
            <h2 className='text-2xl font-semibold mb-2'>&#36; {data.price}</h2>
            <p className='text-lg text-gray-700'>{data.processor} type Processor</p>
            <p className='text-lg text-gray-700'>{data.memory} GB Memory</p>
            <p className='text-lg text-gray-700'>{data.type}</p>
            <p className='text-lg text-gray-700'>{data.OS}</p>
            <button  onClick={handlAddToCart} className='mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300 w-full'>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default MobileDescriptions;