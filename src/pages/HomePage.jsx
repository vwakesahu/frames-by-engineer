import { RecentFrames, HeroSection } from "@/modules";
import { getAllFrames } from "@/utils/firebaseFunctions";
import { useStateValue } from "@/context/StateProvider";
import { actionType } from "@/context/reducer";
import React, { useEffect } from "react";

const HomePage = () => {
  // const [{ frames }, dispatch] = useStateValue();

  const fetchData = async () => {
    try {
      const data = await getAllFrames();
      console.log("Fetched data:", data);
      // dispatch({
      //   type: actionType.SET_FRAMES,
      //   frames: data,
      // });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="h-screen">
      <HeroSection />
      <RecentFrames />
    </div>
  );
};

export default HomePage;
