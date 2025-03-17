"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Slider() {
    const [sliderData, setSliderData] = useState(null);

    useEffect(() => {
        fetch("http//:103.107.184.80:3000/api/slider_images")
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setSliderData(data.data);
                }
            })
            .catch((err) => console.error("Error fetching data:", err));
    }, []);

    if (!sliderData) return <p>Loading...</p>;

    return (
        <div>
            <h1>{sliderData.title}</h1>
            <Image src={sliderData.image} alt="Main Image" width="400" />
            <h2>Header Images</h2>
            <Image src={sliderData.headerImage.bdFlag} alt="BD Flag" width={100} height={100} />
            <Image src={sliderData.headerImage.cglogo} alt="CG Logo" width={100} height={100} />
            <Image src={sliderData.headerImage.cgFlag} alt="CG Flag" width={100} height={100} />

            <h2>Slider Images</h2>
            {sliderData.sliderImages.map((img, index) => (
                <Image key={index} src={img} alt={`Slider ${index}`} width={100} height={100} />
            ))}

            {sliderData.video && (
                <div>
                    <h2>Video</h2>
                    <video src={sliderData.video} controls width="400" />
                </div>
            )}
        </div>
    );
}
