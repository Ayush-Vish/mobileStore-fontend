import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllMobiles, getMobiles } from "../Redux/slices/mobile.slice";
import MobileCard from "./MobileCard";
import Loader from "./Loader";

function MobileGallery() {
  const dispatch = useDispatch();
  const { filteredMobiles, pending, mobiles, pending2 } = useSelector(
    (state) => state.mobile
  );

  const getMobilesData = async () => {
    const response = await dispatch(getAllMobiles());
  };
  useEffect(() => {
    getMobilesData();
  }, []);

  if (pending || pending2) {
    return (
      <div className="flex flex-col h-full  bg-white p-1 w-[100%] justify-center items-center ">
        <Loader part1={false} part2={true} />
      </div>
    );
  }
  return (
    <section className="flex flex-col flex-wrap bg-white p-1 w-full  ">
      {(filteredMobiles ? filteredMobiles : mobiles).map((e, idx) => (
        <MobileCard
          id={e._id}
          key={idx}
          name={e.name}
          type={e.type}
          OS={e.OS}
          processor={e.processor}
          memory={e.memory}
          price={e.price}
          image={e.image}
        />
      ))}
    </section>
  );
}

export default MobileGallery;
