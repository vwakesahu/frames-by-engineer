"use client";
import { useStateValue } from "@/context/StateProvider";
import React, { useEffect } from "react";

const RecentFrames = () => {
  // const [{ frames }, dispatch] = useStateValue();
  // useEffect(() => {
  //   console.log(frames);
  // }, [frames]);

  return (
    <div>
      {/* {frames &&
        frames.map((frame) => (
          <div>
            <img src={frame.imageURL} className="w-10" />
            <p>{frame.category}</p>
            <p>{frame.color}</p>
            <p>{frame.dimensions}</p>
            <p>{frame.glass}</p>
            <p>{frame.height}</p>
            <p>{frame.width}</p>
          </div>
        ))} */}
    </div>
  );
};

export default RecentFrames;
