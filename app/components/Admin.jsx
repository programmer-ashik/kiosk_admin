"use client"; // Add this directive at the top

import { assets } from "@/public/assets/assets_frontend/assets";
import Image from "next/image";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import sliderDatas from "../../public/uploads/sliderData.json";
import { AppContext } from "../context/AppContext";

const AdminForm = () => {
    const [sliderData, setSliderData] = useState(sliderDatas);
    const [isEdit, setIsEdit] = useState(false);
    const [headerImage, setHeaderImage] = useState(sliderDatas.headerImage);
    const [sliderImages, setSliderImages] = useState([]);
    const [numSliderImages, setNumSliderImages] = useState(sliderDatas.sliderImages?.length || 1);
    const [videoFile, setVideoFile] = useState(sliderDatas.video || null); // Store the File object
    const [error, setError] = useState('');
    const { setAtoken } = useContext(AppContext)
    // Handle image change for a specific index
    const handleSliderImageChange = (index, file) => {
        const newSliderImages = [...sliderImages];
        newSliderImages[index] = file;
        setSliderImages(newSliderImages);
    };

    // Add more slider image fields
    const addMoreSliderImages = () => {
        setNumSliderImages((prev) => prev + 1);
    };

    // Handle video upload
    const handleVideoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setVideoFile(file); // Store the File object
            toast.success('Video Uploaded');
            // if (file.size > 20000000) { // 20MB limit (20 * 1024 * 1024)
            //     toast.warn("File size must be under 20MB");
            //     setVideoFile(null);
            // } else {
            //     setError("");
            //     // setVideoFile(file); // Store the File object
            //     // toast.success('Video Uploaded');
            // }
        }
    };

    const handleSubmit = async () => {
        const formData = new FormData();

        // Append header images
        Object.entries(headerImage).forEach(([key, file]) => {
            if (file instanceof File) {
                formData.append(`headerImage[${key}]`, file);
            }
        });

        // Append slider images
        sliderImages.forEach((file, index) => {
            if (file instanceof File) {
                formData.append(`sliderImages[${index}]`, file);
            }
        });

        // Append video
        if (videoFile instanceof File) {
            formData.append("video", videoFile);
        }

        // Append text data
        formData.append("title", sliderData.title);

        // Send data to the API route
        try {
            const response = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Failed to upload files");
            }

            if (response.ok) {
                toast.success("File Uploaded");
            }

            const result = await response.json();
            console.log(result.message);

            // Update UI with the uploaded file paths
            if (result.files) {
                result.files.forEach((file) => {
                    console.log(`File saved: ${file.filePath}`);
                });
            }
        } catch (error) {
            console.error("Error uploading files:", error);
        }
        setIsEdit(false)
    };

    return (
        <div className="max-w-7xl text-sm flex flex-col gap-4 px-4">
            <div className="header">
                <h1 className="text-md text-gray-800 font-bold">Header Image Uploader</h1>
            </div>
            <div className="flex flex-row gap-8 w-full">
                {Object.entries(headerImage).map(([key, value], idx) => (
                    <div key={idx} className="image1">
                        <h1 className="text-md text-gray-800 font-bold">
                            {key === "bdFlag" ? "Bangladesh Flag" : key === "cglogo" ? "Coast Guard Logo" : "Bangladesh Coast Guard Flag"}
                        </h1>
                        {isEdit ? (
                            <label htmlFor={`image-${key}`}>
                                <div className="inline-block cursor-pointer relative">
                                    <Image
                                        src={value instanceof File ? URL.createObjectURL(value) : sliderData.headerImage[key] || sliderData.image}
                                        width={100}
                                        height={100}
                                        alt="profilepic"
                                        className="w-48 h-40 rounded py-4 opacity-75"
                                    />
                                    <Image
                                        src={assets.upload_icon}
                                        width={16}
                                        height={16}
                                        alt="profilepic"
                                        className={`${value instanceof File && "hidden"} bg-gray-400 w-[40px] absolute bottom-12 right-12 rounded-md border-2`}
                                    />
                                </div>
                                <input
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        if (file) {
                                            setHeaderImage((prev) => ({ ...prev, [key]: file }));
                                        }
                                    }}
                                    type="file"
                                    id={`image-${key}`}
                                    hidden
                                />
                            </label>
                        ) : (
                            <Image
                                src={sliderData.image}
                                width={160}
                                height={130}
                                alt="profilepic"
                                className="max-w-[300px] rounded-lg py-4"
                            />
                        )}
                    </div>
                ))}
            </div>
            {/* Slider images */}
            <hr />
            <div className="header">
                <h1 className="text-md text-gray-800 font-bold">Slider Image Uploader</h1>
                <button
                    onClick={addMoreSliderImages}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4" >
                    Add More Images
                </button>
                <div className="grid grid-cols-5 gap-8 w-full overflow-x-scroll p-4">
                    {Array.from({ length: numSliderImages }).map((_, index) => (
                        <div key={index} className="sliderImg">
                            <h1 className="text-md text-gray-800 font-bold">Image {index + 1}:</h1>
                            {isEdit ? (
                                <label htmlFor={`sliderImage-${index}`}>
                                    <div className=" inline-block cursor-pointer relative ">
                                        <Image
                                            src={
                                                sliderImages[index] instanceof File
                                                    ? URL.createObjectURL(sliderImages[index])
                                                    : sliderData.sliderImages[index] || sliderData.image
                                            }
                                            width={160}
                                            height={130}
                                            alt={`sliderImage-${index}`}
                                            className="w-36 h-40 rounded py-4 opacity-75"
                                        />
                                        <Image
                                            src={assets.upload_icon}
                                            width={16}
                                            height={16}
                                            alt="upload-icon"
                                            className={`${sliderImages[index] instanceof File && "hidden"} bg-gray-400 w-[40px] absolute bottom-12 right-12 rounded-md border-2`}
                                        />
                                    </div>
                                    <input
                                        onChange={(e) => {
                                            const file = e.target.files[0];
                                            if (file) {
                                                handleSliderImageChange(index, file);
                                            }
                                        }}
                                        type="file"
                                        id={`sliderImage-${index}`}
                                        hidden
                                    />
                                </label>
                            ) : (
                                <Image
                                    src={sliderData.sliderImages[index] || sliderData.image}
                                    width={160}
                                    height={130}
                                    alt={`sliderImage-${index}`}
                                    className="max-w-[300px] rounded-lg py-4"
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>
            {/* Video Upload Section */}
            <hr />
            <div className="header">
                <h1 className="text-md text-gray-800 font-bold">Video Uploader</h1>
                {isEdit ? (
                    <label className="relative" htmlFor="video">
                        <div className="inline-block cursor-pointer relative">
                            {videoFile ? (
                                <video
                                    src={videoFile instanceof File ? URL.createObjectURL(videoFile) : sliderData.video}
                                    width={160}
                                    height={130}
                                    controls
                                    className="w-36 h-full rounded py-4 opacity-75"
                                />
                            ) : (
                                <div className="w-36 h-36 bg-red-300 rounded py-4 opacity-100 flex items-center justify-center">
                                    <Image
                                        src={assets.upload_icon}
                                        width={16}
                                        height={16}
                                        alt="upload-icon"
                                        className="bg-gray-400 w-[40px] rounded-md border-2"
                                    />
                                </div>
                            )}
                        </div>
                        <input
                            onChange={handleVideoChange}
                            type="file"
                            id="video"
                            accept="video/mp4/*"
                            className="absolute top-0 left-0"
                        />
                    </label>
                ) : (
                    <video
                        src={sliderData.video}
                        width={160}
                        height={130}
                        controls
                        className="max-w-[300px] rounded-lg py-4"
                    />
                )}
            </div>

            {/* Title Informations */}
            <hr className="border-none h-[1px] bg-zinc-500" />
            <div>
                <p className="text-neutral-500 underline mt-4">CONTACT INFORMATION</p>
                <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3">
                    <p className="font-medium">Welcome Text:</p>
                    {isEdit ? (
                        <input
                            type="text"
                            value={sliderData.title}
                            onChange={(e) => setSliderData((prev) => ({ ...prev, title: e.target.value }))}
                            className="bg-gray-300 w-full h-20 px-8"
                        />
                    ) : (
                        <p className="text-blue-400">{sliderData.title}</p>
                    )}
                </div>
            </div>
            <div>
                {isEdit ? (
                    <button
                        onClick={handleSubmit}
                        className="border-[1px] rounded-md border-neutral-500 px-3 py-[5px] transition-all duration-500 hover:bg-primary hover:text-white"
                    >
                        Save information
                    </button>
                ) : (
                    <button
                        onClick={() => setIsEdit(true)}
                        className="border-[1px] rounded-md border-neutral-500 px-3 py-[5px] transition-all duration-500 hover:bg-primary hover:text-white"
                    >
                        Edit
                    </button>
                )}
            </div>
        </div>
    );
};

export default AdminForm;