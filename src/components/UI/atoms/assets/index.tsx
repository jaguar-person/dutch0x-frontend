import React, { LegacyRef, useRef } from "react";
import Image from "next/image";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";


export default function TransactionAssets() {
  const carouselRef:React.RefObject<HTMLElement> = useRef(null);

  const handleNext = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        top: 0,
        left: 200,
        behavior: "smooth",
      });
    }
  };

  const handlePrev = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        top: 0,
        left: -200,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="">
    <div className="p-4 ml-2">
      <Image
        src="/assets/images/demo-image-1.svg"
        alt="Asset"
        width={180}
        height={180}
        className="rounded-[8px]"
        />
    </div>
      <div className="mt-2 flex items-center">
        {/* Carousel Container */}
        <FiChevronLeft color="white" onClick={handlePrev} className="cursor-pointer" />
        <div
          className="flex overflow-hidden"
          style={{ width: "200px", height: "50px" }}
          ref={carouselRef as LegacyRef<HTMLDivElement>}
        >
          {/* Carousel Slides */}
          <div className="flex-none mr-2">
            <Image
              src="/assets/images/demo-image-1.svg"
              className="rounded-md cursor-pointer"
              alt="Asset"
              width={40}
              height={40}
            />
          </div>
          <div className="flex-none mr-2">
            <Image
              src="/assets/images/demo-image-2.svg"
              className="rounded-md cursor-pointer"
              alt="Asset"
              width={40}
              height={40}
            />
          </div>
          <div className="flex-none mr-2">
            <Image
              src="/assets/images/demo-image-2.svg"
              className="rounded-md cursor-pointer"
              alt="Asset"
              width={40}
              height={40}
            />
          </div>
          <div className="flex-none mr-2">
            <Image
              src="/assets/images/demo-image-3.svg"
              className="rounded-md cursor-pointer"
              alt="Asset"
              width={40}
              height={40}
            />
          </div>
          <div className="flex-none mr-2">
            <Image
              src="/assets/images/demo-image-4.svg"
              className="rounded-md cursor-pointer"
              alt="Asset"
              width={40}
              height={40}
            />
          </div>
        </div>
        <FiChevronRight color="white" onClick={handleNext} className="cursor-pointer" />

        {/* Carousel Navigation */}
      </div>
    </div>
  );
}
