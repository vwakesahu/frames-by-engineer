'use client'
import { useStateValue } from "@/context/StateProvider";
import { actionType } from "@/context/reducer";
import { Nav } from "@/modules/Nav";
import HomePage from "@/pages/HomePage";
import { getAllFrames } from "@/utils/firebaseFunctions";
import React, { useEffect } from "react";

const page = () => {

  const [{ frames }, dispatch] = useStateValue();

  const fetchData = async () => {
    await getAllFrames().then((data) => {
      // console.log(data);
      dispatch({
        type: actionType.SET_FRAMES,
        frames: data,
      });
    });
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <HomePage />
    </div>
  );
};

export default page;
