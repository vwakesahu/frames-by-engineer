"use client";
import { useStateValue } from "@/context/StateProvider";
import { actionType } from "@/context/reducer";
import { getAllFrames, saveItem } from "@/utils/firebaseFunctions";
import Lottie from "lottie-react";
import React, { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import animationData from "@/assets/lottie/uploadImage.json";
import {
  categories,
  frameColors,
  frameDimension,
  frameMaterials,
} from "@/utils/data";
import { Loader } from "@/components";
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../firebase.config";

const AddFrame = () => {
  const [alertStatus, setAlertStatus] = useState("danger");
  const [fields, setFields] = useState(false);
  const [msg, setMsg] = useState(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(null);
  const [frameColor, setFrameColor] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [imageAsset, setImageAsset] = useState(null);
  const [{ user }, dispatch] = useStateValue();
  const [width, setWidth] = useState();
  const [height, setHeight] = useState();
  const [glass, setGlass] = useState("No");
  const [material, setMaterial] = useState("");
  const [dimensions, setDimensions] = useState("");
  const [price, setPrice] = useState();

  const uploadImage = (e) => {
    setIsLoading(true);
    const imageFile = e.target.files[0];
    const storageRef = ref(storage, `Images/${Date.now()}-${imageFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const uploadProgress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        console.log(error);
        setFields(true);
        setMsg("Error while uploading : Try AGain 🙇");
        setAlertStatus("danger");
        setTimeout(() => {
          setFields(false);
          setIsLoading(false);
        }, 4000);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageAsset(downloadURL);
          setIsLoading(false);
          setFields(true);
          setMsg("Image uploaded successfully 😊");
          setAlertStatus("success");
          setTimeout(() => {
            setFields(false);
          }, 4000);
        });
      }
    );
  };

  const deleteImage = () => {
    setIsLoading(true);
    const deleteRef = ref(storage, imageAsset);
    deleteObject(deleteRef).then(() => {
      setImageAsset(null);
      setIsLoading(false);
      setFields(true);
      setMsg("Image deleted successfully 😊");
      setAlertStatus("success");
      setTimeout(() => {
        setFields(false);
      }, 4000);
    });
  };

  const saveDetails = () => {
    setIsLoading(true);
    try {
      if (!title || !imageAsset) {
        setFields(true);
        setMsg("Required fields can't be empty");
        setAlertStatus("danger");
        setTimeout(() => {
          setFields(false);
          setIsLoading(false);
        }, 4000);
      } else {
        const data = {
          id: `${Date.now()}`,
          title: title,
          imageURL: imageAsset,
          category: category,
          color: frameColor,
          width: width,
          height: height,
          material: material,
          glass: glass,
          dimensions: dimensions,
          price: price,
        };
        saveItem(data);
        setIsLoading(false);
        setFields(true);
        setMsg("Data Uploaded successfully 😊");
        setAlertStatus("success");
        setTimeout(() => {
          setFields(false);
        }, 4000);
        clearData();
      }
    } catch (error) {
      console.log(error);
      setFields(true);
      setMsg("Error while uploading : Try AGain 🙇");
      setAlertStatus("danger");
      setTimeout(() => {
        setFields(false);
        setIsLoading(false);
      }, 4000);
    }

    fetchData();
  };

  const clearData = () => {
    setTitle("");
    setImageAsset(null);
  };

  const fetchData = async () => {
    await getAllFrames().then((data) => {
      dispatch({
        type: actionType.SET_FRAME,
        frames: data,
      });
    });
  };

  return (
    <div className="mt-24 w-full flex flex-col gap-8 items-center justify-center">
      <div className="w-[90%] md:w-[50%] border border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center gap-4">
        {fields && (
          <p
            className={`w-full p-2 rounded-lg text-center text-lg font-semibold ${
              alertStatus === "danger"
                ? "bg-red-400 text-red-800"
                : "bg-emerald-400 text-emerald-800"
            }`}
          >
            {msg}
          </p>
        )}

        <div className="group flex justify-center items-center flex-col border-2 border-dotted border-gray-300 w-full h-225 md:h-340 cursor-pointer rounded-lg">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {!imageAsset ? (
                <>
                  <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                    <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                      {/* <p className="text-gray-500 hover:text-gray-700">
                          Click here to upload
                        </p> */}

                      <Lottie animationData={animationData} />
                    </div>
                    <input
                      type="file"
                      name="uploadimage"
                      accept="image/*"
                      onChange={uploadImage}
                      className="w-0 h-0"
                    />
                  </label>
                </>
              ) : (
                <>
                  <div className="relative h-full p-6">
                    <img
                      src={imageAsset}
                      alt="uploaded image"
                      className="w-full h-full object-cover md:max-h-96"
                    />
                    <button
                      type="button"
                      className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md  duration-500 transition-all ease-in-out"
                      onClick={deleteImage}
                    >
                      <AiFillDelete className=" text-white" />
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </div>
        <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Give me a title..."
            className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
          />
        </div>

        <div className="w-full">
          <select
            onChange={(e) => setCategory(e.target.value)}
            className="outline-none w-full text-base border-b border-gray-200 p-2 rounded-md cursor-pointer"
          >
            <option value="other" className="bg-white">
              Select Category
            </option>
            {categories &&
              categories.map((item) => (
                <option
                  key={item.id}
                  className="text-base border-0 outline-none capitalize bg-white text-headingColor"
                  value={item.urlParamName}
                >
                  {item.name}
                </option>
              ))}
          </select>

          <select
            onChange={(e) => setFrameColor(e.target.value)}
            className="outline-none w-full text-base border-b border-gray-200 p-2 rounded-md cursor-pointer mt-2"
          >
            <option value="other" className="bg-white">
              Select Color
            </option>
            {frameColors &&
              frameColors.map((item) => (
                <option
                  key={item.id}
                  className="text-base border-0 outline-none capitalize bg-white text-headingColor"
                  value={item.urlParamName}
                >
                  {item.color}
                </option>
              ))}
          </select>

          <select
            onChange={(e) => setDimensions(e.target.value)}
            className="outline-none w-full text-base border-b border-gray-200 p-2 rounded-md cursor-pointer mt-2"
          >
            <option value="other" className="bg-white">
              Select Dimension
            </option>
            {frameDimension &&
              frameDimension.map((item) => (
                <option
                  key={item.id}
                  className="text-base border-0 outline-none capitalize bg-white text-black"
                  value={item.urlParamName}
                >
                  {item.dimension}
                </option>
              ))}
          </select>

          <select
            onChange={(e) => setMaterial(e.target.value)}
            className="outline-none w-full text-base border-b border-gray-200 p-2 rounded-md cursor-pointer mt-2"
          >
            <option value="other" className="bg-white">
              Select Material
            </option>
            {frameMaterials &&
              frameMaterials.map((item) => (
                <option
                  key={item.id}
                  className="text-base border-0 outline-none capitalize bg-white text-headingColor"
                  value={item.name}
                >
                  {item.name}
                </option>
              ))}
          </select>
        </div>

        <div className="w-full py-2 md:flex flex-col md:flex-row items-center gap-2">
            <div className=" w-full border border-grey-300 p-4 rounded-lg">
              <input
                type="text"
                required
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                placeholder="Width in inches"
                className=" border border-gray-300 w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
              />
            </div>
            <div className=" w-full border border-grey-300 p-4 rounded-lg mt-2 md:mt-0">
              <input
                type="text"
                required
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="Height in inches"
                className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
              />
            </div>
          </div>

        

          <div className=" w-full border border-grey-300 p-4 rounded-lg">
            <input
              type="text"
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price in Rupees"
              className=" border border-gray-300 w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
            />
          </div>

          
          <div className="flex items-center w-full">
            <button
              type="button"
              className="ml-0 md:ml-auto w-full md:w-auto border-none outline-none bg-lightBlue px-12 py-2 rounded-lg bg-black text-white"
              onClick={saveDetails}
            >
              Save
            </button>
          </div>
      </div>
    </div>
  );
};

export default AddFrame;
