import { useState } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { sliderItems } from "../data";
import { Link } from "react-router-dom";

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0);

  const handleClick = (direction) => {
    if (direction === "right") {
      setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
    } else {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2);
    }
  };

  return (
    <section className="w-full h-screen relative overflow-hidden hidden md:flex">
      <div
        className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center opacity-50 hover:opacity-75 cursor-pointer absolute top-1/2 -translate-y-1/2 left-3 z-10 transition-opacity duration-200"
        onClick={() => handleClick("left")}
      >
        <ChevronLeftIcon className="text-gray-700" />
      </div>
      <div
        className="h-full flex transition-all duration-1000 ease-in-out"
        style={{ transform: `translateX(${slideIndex * -100}vw)` }}
      >
        {sliderItems.map((item) => (
          <div
            key={item.id}
            className="w-screen h-screen flex items-center"
            style={{ backgroundColor: `#${item.bg}` }}
          >
            <div className="flex-1 h-full flex items-center justify-center">
              <img
                src={item.img}
                alt={item.title}
                className="h-4/5 object-cover rounded-lg shadow-2xl"
              />
            </div>
            <div className="flex-1 px-12 py-20 flex flex-col gap-3">
              <h1 className="text-6xl lg:text-7xl font-bold text-gray-800 leading-tight">
                {item.title}
              </h1>
              <p className="uppercase text-lg lg:text-xl font-medium tracking-widest text-gray-600 leading-relaxed">
                {item.desc}
              </p>
              <Link to="/products/clothing">
                <button className="text-xl bg-transparent border-2 border-gray-800 px-6 py-3 cursor-pointer hover:bg-gray-800 hover:text-white transition-all duration-300 font-medium tracking-wider">
                  SHOP NOW
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div
        className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center opacity-50 hover:opacity-75 cursor-pointer absolute top-1/2 -translate-y-1/2 right-3 z-10 transition-opacity duration-200"
        onClick={() => handleClick("right")}
      >
        <ChevronRightIcon className="text-gray-700" />
      </div>
    </section>
  );
};

export default Slider;
