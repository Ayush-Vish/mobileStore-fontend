import React, { useState } from "react";

function MobileCard({ name, image, processor, memory, type,OS, price }) {
  const [index, setIndex] = useState(0);

  return (
    <div className="flex flex-col sm:flex-row border-2 rounded-lg overflow-hidden shadow-lg m-4  p-2">
      <div
        className="sm:w-1/2 h-64 sm:h-auto flex items-center justify-center  "
        onClick={() => setIndex(!index)}
      >
        <img className="h-[100%]" src="https://rukminim2.flixcart.com/image/416/416/xif0q/mobile/3/5/l/-original-imaghx9qmgqsk9s4.jpeg?q=70" alt="" />
      </div>
      <div className="sm:w-1/2 p-4 bg-white">
        <h1 className="font-bold text-2xl mb-4">{name}</h1>
        <ul className="mb-4">
          <li>Type : {type}</li>
          <li>{memory} GB Memory</li>
          <li>{processor} type Processor</li>
          <li>
            Operating System :  {OS}
          </li>
        </ul>
        <div className="flex items-center justify-between">
          <h1 className="font-semibold text-lg">&#36; {price}</h1>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default MobileCard;