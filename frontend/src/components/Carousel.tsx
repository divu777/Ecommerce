import React, { useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import mainPoster from "../images/main3.jpg";
import main1 from "../images/main2.jpg";
import main2 from "../images/main1.jpg";

const Carousel: React.FC = () => {
  const settings: SliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    variableWidth: true,
    autoplay: true, // Add this line
    autoplaySpeed: 3000, // Add this line (adjust the value to your desired speed in milliseconds)
  };

  const sliderRef = useRef<Slider | null>(null);

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.slickPlay();
    }
  }, []);
  return (
    <Slider
      {...settings}
      className="flex justify-center  w-screen shadow-2xl"
      ref={sliderRef}
    >
      <div className=" w-screen px-2 ">
        <img src={main1} alt="Main Poster" className=" w-full" />
      </div>
      <div className=" w-screen px-2">
        <img src={main2} alt="Main Poster" className=" w-full" />
      </div>
      <div className="w-screen px-2 ">
        <img src={mainPoster} alt="Main Poster" className=" w-full" />
      </div>
    </Slider>
  );
};

export default Carousel;

interface SliderSettings {
  dots: boolean;
  infinite: boolean;
  speed: number;
  slidesToShow: number;
  slidesToScroll: number;
  centerMode?: boolean;
  variableWidth?: boolean;
  autoplay?: boolean; // Add this line
  autoplaySpeed?: number; // Add this line
}
