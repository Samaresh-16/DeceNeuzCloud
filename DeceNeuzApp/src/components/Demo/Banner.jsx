import React from "react";
import bannerImage from "./banner.jpeg";

const Banner = () => {
  return (
    <div className="relative border-b border-black w-full overflow-hidden">
      <img
        src={bannerImage}
        alt=""
        className="-z-10 absolute top-0 object-cover w-full h-full "
      />
      <div className="size py-[5rem] flex flex-col items-start gap-[1rem]">
        <h1 className="font-title text-[3rem] sm:text-[4rem] md:text-[6rem] font-normal">
          Stay curious.
        </h1>
        <p className="w-full md:w-[31rem] text-[1.3rem] md:text-[1.5rem] font-medium leading-7">
          Discover stories, thinking, and expertise from writers on any topic.
        </p>
        <button className="btn bg-orange-500 rounded-full text-white !text-[1.2rem] !px-6 !mt-[2.5rem]">
          Start reading
        </button>
      </div>
    </div>
  );
};

export default Banner;
