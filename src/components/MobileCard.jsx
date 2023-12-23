import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function MobileCard({ name, image, processor, memory, type,OS, price  , id }) {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  return (
    <div onClick={ ()=> navigate(`/description/${id}` )} className="flex cursor-pointer flex-col sm:flex-row border-2 rounded-lg overflow-hidden shadow-lg m-4  p-2">
      <div
        className="sm:w-1/2 h-64 sm:h-auto flex items-center justify-center  "
        onClick={() => setIndex(!index)}
      >
        <img className="h-[100%]" src={image[0]} alt="" />
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