import React, { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { applyFilter, getMobiles, removeFilter  } from "../Redux/slices/mobile.slice";

const buttonVariants = {
  hover: {
    scale: 1.1,
    transition: {
      duration: 0.3,
    },
  },
};

function SideBar() {
  console.log(useSelector(state=> state.mobile.mobiles))
  const processors =[...new Set(useSelector(state => state.mobile.mobiles).map((e) => {
    return e.processor
  }))]
  const companyName =[...new Set(useSelector(state => state.mobile.mobiles).map((e) => {
    return e.name.split(" ")[0];
  }))]
  const Os =[...new Set(useSelector(state => state.mobile.mobiles).map((e) => {
    return e.OS;
  }))]
  const memoryTypes = [...new Set(useSelector(state => state.mobile.mobiles).map((e) => {
    return e.memory;
  }))]
  console.log(Os);

  console.log(companyName)

  const dispatch = useDispatch();
  const {priceFilter , brandFilter  ,appliedFilters , processorFilter , oSFilter  , memoryFilter} = useSelector(state => state.mobile);
  
  console.log(priceFilter , brandFilter , appliedFilters , oSFilter)
  const handleapplyFilter = (filterType, filterValue) => {
    dispatch(applyFilter({ type: filterType, value: filterValue }));
  };

  const handleremoveFilter = (filterType, filterValue) => {
    dispatch(removeFilter({ type: filterType, value: filterValue }));
  };

  
  const fetchData = useCallback(
    async ( )=> {
      await dispatch(getMobiles({price: priceFilter , name: brandFilter , processor: processorFilter , OS : oSFilter})) 

    } , [brandFilter, dispatch, priceFilter, processorFilter, oSFilter]
  )

  useEffect(() => {

    fetchData();
  }, [priceFilter, brandFilter, processorFilter, oSFilter,memoryFilter,  fetchData]);

  return (
    <motion.div
      className="bg-yellow-50  max-w-[210px] sm:flex flex-col items-center gap-3 rounded-lg shadow-lg h-full py-4 "
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ transition: { duration: 0.3 } }}
    >
      <div className="flex flex-wrap justify-center gap-2 mb-4">
        {appliedFilters.map((filter) => (
          <div
            className="bg-blue-500 text-white px-2 py-1 rounded-md"
            key={`${filter.type.type}-${filter.type.value}`}
          >
            {filter.type.value}
            <button
              className="ml-2 text-sm"
              onClick={() => handleremoveFilter(filter.type.type, filter.type.value)}
            >
              X
            </button>
          </div>
        ))}
      </div>
      <div className="flex flex-col items-center w-full px-4">
        <h1 className="font-bold text-lg mb-2">Price (&#36;) </h1>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {["0-300", "300-500", "500-700", "700-1000", "1000-1500"].map(
            (price, idx) => (
              <motion.button
              className="bg-white p-[3px] text-[12px] rounded-md border border-black cursor-pointer hover:bg-gray-200 transition-colors duration-300"

                variants={buttonVariants}
                whileHover="hover"
                key={price}
                disabled={priceFilter}
                onClick={() => {
                  handleapplyFilter({type:"price" , value : price})
                }}
              >
                
                  {price}
       
              </motion.button>
            )
          )}
        </div>
      </div>
      <hr className="w-full" />

      <div className="flex flex-col items-center w-full px-4">
        <h1 className="font-bold text-lg mb-2">Brand</h1>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {companyName.map((name) => (
            <motion.button
            className="bg-white p-[3px] text-[12px] rounded-md border border-black cursor-pointer hover:bg-gray-200 transition-colors duration-300"

              variants={buttonVariants}
              whileHover="hover"
              key={name}
              disabled={brandFilter}
              onClick={() => {

                handleapplyFilter({type: "brand" , value: name})
              }}
            >
             
                {name}

            </motion.button>
          ))}
        </div>
      </div>

      <hr className="w-full" />
      <div className="flex flex-col items-center w-full px-4">
        <h1 className="font-bold text-lg mb-2">Processor</h1>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {processors.map((name) => (
            <motion.button
              className="bg-white p-[3px] text-[12px] rounded-md border border-black cursor-pointer hover:bg-gray-200 transition-colors duration-300"
              variants={buttonVariants}
              whileHover="hover"
              key={name}
              disabled={processorFilter}
              onClick={() => {

                handleapplyFilter({type: "processor" , value: name})
              }}
            >
              {name}

            </motion.button>
          ))}
        </div>
      </div>
      <hr className="w-full" />
      <div className="flex flex-col items-center w-full px-4">
        <h1 className="font-bold text-lg mb-2">Operating System</h1>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {Os.map((name) => (
            <motion.button
              className="bg-white p-[3px] text-[12px] rounded-md border border-black cursor-pointer hover:bg-gray-200 transition-colors duration-300"
              variants={buttonVariants}
              whileHover="hover"
              key={name}
              disabled={oSFilter}
              onClick={() => {

                handleapplyFilter({type: "os" , value: name})
              }}
            >
              {name}

            </motion.button>
          ))}
        </div>
      </div>
      <hr className="w-full" />
      <div className="flex flex-col items-center w-full px-4">
        <h1 className="font-bold text-lg mb-2">Operating System</h1>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {memoryTypes.map((name) => (
            <motion.button
              className="bg-white p-[3px] text-[12px] rounded-md border border-black cursor-pointer hover:bg-gray-200 transition-colors duration-300"
              variants={buttonVariants}
              whileHover="hover"
              key={name}
              disabled={memoryFilter}
              onClick={() => {

                handleapplyFilter({type: "memory" , value: name})
              }}
            >
              {name}

            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default SideBar;
