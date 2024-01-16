"use client";
import { Badge } from "@/components/ui/badge";
import React from "react";
import HerAnimation from "@/assets/lottie/hero.json";
import Lottie from "lottie-react";
import { Button } from "@/components/ui/button";
// import HeroImg from "../img/hero-img.png";
const HeroSection = () => {
  return (
    <section className="flex items-center justify-center w-full md:pl-36 ">
      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-2 max-w-6xl "
        id="home"
      >
        <div className="md:h-screen flex flex-col justify-center md:pb-36 pt-10 md:pt-0 md:gap-3 gap-1">
          <div className="flex">
            <Badge
              variant={"outline"}
              className="border py-2 cursor-pointer px-5"
            >
              Abolutely hot collections🔥
            </Badge>
          </div>
          <p className="md:text-7xl text-4xl font-extrabold mt-5">
            The Best Place to find and buy amazing&nbsp;
            <span className=" inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#B977FE] to-[#FEBBED]">
              Frames
            </span>
          </p>
          <p className="mt-5 md:mt-1 text-mediumGrey md:w-3/4 text-muted-foreground">
            Transform moments into memories with our meticulously crafted
            frames, where each click finds its perfect place.
          </p>

          {/* Desktop */}
          <Button variant='outline' className="flex md:items-center max-w-sm">
            Buy Now
          </Button>
        </div>

        <div className="relative">
          <div className="md:h-screen md:absolute flex items-center justify-center md:pb-36">
            <Lottie
              animationData={HerAnimation}
              className=" h-[75%] object-contain"
            />
            {/* <img
          src={HeroImg}
          className=" md:ml-auto h-[75%] object-contain"
          alt=""
        /> */}
          </div>
        </div>

        {/* Mobile */}
        <Button className="mr-auto mt-8 text-lg  rounded-lg p-3 px-6 w-full  bg-gradient-to-r from-lightPink to-lightViolet font-medium text-white md:hidden mb-24">
          Buy Now
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;
