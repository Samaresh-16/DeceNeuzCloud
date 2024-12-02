import React from "react";
import Banner from "./Banner";
import Trending from "./Trending";
import Posts from "../Common/Posts/Posts";
import Discover from "./Discover";
import { BsGraphUpArrow } from "react-icons/bs";

const Demo = () => {
  return (
    <>
      <Banner />
      <Trending />
      <div className="size py-7 flex flex-col-reverse md:flex-row gap-[7rem]">
        <div className="flex-[1.5] space-y-8">
          <div className="flex items-center gap-3 font-semibold">
            <span>
              <BsGraphUpArrow />
            </span>
            <h2 className="text-2xl">Latest Posts</h2>
          </div>

          <Posts />
        </div>
        <div className="flex-[1] relative">
          <Discover />
        </div>
      </div>
    </>
  );
};

export default Demo;
