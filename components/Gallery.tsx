"use client";

import { CircleChevronLeft, CircleChevronRight } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

const Gallery = ({ productMedia }: { productMedia: string[] }) => {
  const [mainImage, setMainImage] = useState(productMedia[0]);
  const [startIndex, setStartIndex] = useState(0);
  const visibleImages = 3; // Limit the number of images shown at a time

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  const handleNext = () => {
    if (startIndex < productMedia.length - visibleImages) {
      setStartIndex(startIndex + 1);
    }
  };

  return (
    <div className="flex flex-col  gap-3  max-w-[350px]">
      <Image
        src={mainImage}
        width={500}
        height={500}
        alt="product"
        className="w-96 h-96 rounded-lg shadow-x1 object-cover justify-center"
      />

      <div className="flex justify-center gap-2">
        {/* Left Arrow */}
        <button
          onClick={handlePrev}
          disabled={startIndex === 0}
          className="p-2 disabled:opacity-50"
        >
          <CircleChevronLeft />
        </button>

        {/* Image Carousel */}
        <div className="flex gap-2 overflow-hidden">
          {productMedia
            .slice(startIndex, startIndex + visibleImages)
            .map((image, index) => (
              <Image
                key={index + startIndex} // Ensure unique key across all images
                src={image}
                width={200}
                height={200}
                alt="product"
                className={`w-20 h-20 rounded-lg object-cover cursor-pointer ${
                  mainImage === image ? "border-2 border-black" : ""
                }`}
                onClick={() => setMainImage(image)}
              />
            ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={handleNext}
          disabled={startIndex >= productMedia.length - visibleImages}
          className="p-2 disabled:opacity-50"
        >
          <CircleChevronRight />
        </button>
      </div>
    </div>
  );
};

export default Gallery;
