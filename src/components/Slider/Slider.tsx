import React, { useEffect, useRef } from "react";
import images1 from "../../assets/1.png";
import images2 from "../../assets/2.png";
import images3 from "../../assets/3.png";
 
const images = [images1, images2, images3,images1, images2, images3,images1, images2, images3,images1, images2, images3,];
 

const Slider: React.FC = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  let currentIndex = 0;

  useEffect(() => {
    const interval = setInterval(() => {
      if (sliderRef.current) {
        currentIndex = (currentIndex + 1) % images.length;  
        sliderRef.current.style.transform = `translateX(-${currentIndex * 100}%)`;
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="overflow-hidden max-w-[1440px] m-auto h-64 mt-20 rounded-2xl">
      <div
        ref={sliderRef}
        className="flex transition-transform duration-700 ease-in-out w-full h-full"
      >
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`slide-${i}`}
            className="w-full flex-shrink-0 object-cover"
          />
        ))}
      </div>
     </div>
  );
};

export default Slider;
