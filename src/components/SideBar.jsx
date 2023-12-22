import React, { useState } from "react";
import { motion } from "framer-motion";

const buttonVariants = {
  hover: {
    scale: 1.1,
    transition: {
      duration: 0.3,
    },
  },
};

function SideBar() {
  const [priceFilter, setPriceFilter] = useState(null);
  const [brandFilter, setBrandFilter] = useState(null);
  const [appliedFilters, setAppliedFilters] = useState([]);
  console.log(appliedFilters);
  console.log(priceFilter);
  console.log(brandFilter);

  const applyFilter = (filterType, filterValue) => {
    setAppliedFilters([
      ...appliedFilters,
      { type: filterType, value: filterValue },
    ]);
    if (filterType === "price") setPriceFilter(filterValue);
    if (filterType === "brand") setBrandFilter(filterValue);
  };

  const removeFilter = (filterType, filterValue) => {
    setAppliedFilters(
      appliedFilters.filter(
        (filter) => filter.type !== filterType || filter.value !== filterValue
      )
    );
    if (filterType === "price") setPriceFilter(null);
    if (filterType === "brand") setBrandFilter(null);
  };

  // useEffect(() => {
  //   async function fetchData() {
  //     const response = await fetch(`https://api.example.com/products?price=${priceFilter}&brand=${brandFilter}`);
  //     const data = await response.json();
  //     console.log(data);
  //   }

  //   fetchData();
  // }, [priceFilter, brandFilter]);

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
            className="bg-blue-500 text-white p-2 rounded-md"
            key={`${filter.type}-${filter.value}`}
          >
            {filter.value}
            <button
              className="ml-2 text-sm"
              onClick={() => removeFilter(filter.type, filter.value)}
            >
              X
            </button>
          </div>
        ))}
      </div>
      <div className="flex flex-col items-center w-full px-4">
        <h1 className="font-bold text-lg mb-2">Price</h1>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {["< 5000", "5000-10000", "10000-15000", "> 15000"].map(
            (price, idx) => (
              <motion.div
                className="bg-white p-2 text-xs rounded-md border border-black cursor-pointer hover:bg-gray-200 transition-colors duration-300"
                variants={buttonVariants}
                whileHover="hover"
                key={price}
              >
                <button
                  disabled={priceFilter}
                  onClick={() => {
                    setPriceFilter(price);
                    applyFilter("price", price);
                  }}
                >
                  {price}
                </button>
              </motion.div>
            )
          )}
        </div>
      </div>
      <hr className="w-full" />

      <div className="flex flex-col items-center w-full px-4">
        <h1 className="font-bold text-lg mb-2">Brand</h1>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {["Apple", "Samsung", "MI", "Realme", "OPPO"].map((name) => (
            <motion.button
              className="bg-white p-2 text-xs rounded-md border border-black cursor-pointer hover:bg-gray-200 transition-colors duration-300"
              variants={buttonVariants}
              whileHover="hover"
              key={name}
            >
              <button
                disabled={brandFilter}
                onClick={() => {
                  setBrandFilter(name);
                  applyFilter("brand", name);
                }}
              >
                {name}
              </button>
            </motion.button>
          ))}
        </div>
      </div>

      <hr className="w-full" />
    </motion.div>
  );
}

export default SideBar;
