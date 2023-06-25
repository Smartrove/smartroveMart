import React, { useEffect, useState } from "react";
import styles from "./slider.scss";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import { sliderData } from "./sliderData";

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderLength = sliderData.length;

  const autoScroll = true;
  let slideInterval;
  let intervalTime = 5000;

  const nextSlide = () => {
    setCurrentSlide(currentSlide === sliderLength - 1 ? 0 : currentSlide + 1);
  };
  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? sliderLength - 1 : currentSlide - 1);
  };

  useEffect(() => {
    setCurrentSlide(0);
  }, []);

  useEffect(() => {
    if (autoScroll) {
      function automaticScrolling() {
        slideInterval = setInterval(nextSlide, intervalTime);
      }
      automaticScrolling();
    }

    return () => {
      clearInterval(slideInterval);
    };
  }, [currentSlide, autoScroll, slideInterval]);

  return (
    <div className="slider">
      <KeyboardDoubleArrowLeftIcon
        className="arrow prev"
        style={{ fontSize: "35px" }}
        onClick={prevSlide}
      />
      <KeyboardDoubleArrowRightIcon
        className="arrow next"
        style={{ fontSize: "35px" }}
        onClick={nextSlide}
      />

      {sliderData &&
        sliderData.map((slide, index) => {
          const { image, heading, desc } = slide;
          return (
            <div
              key={index}
              className={index === currentSlide ? "slide current" : "slide"}
            >
              {index === currentSlide && (
                <>
                  <img
                    src={image}
                    width="500px"
                    height="500px"
                    alt="slideImage"
                  />
                  <div className="content">
                    <h2>{heading}</h2>
                    <p>{desc}</p>
                    <hr />
                    <a href="#product" className="--btn --btn-primary">
                      Shop Now
                    </a>
                  </div>
                </>
              )}
            </div>
          );
        })}
    </div>
  );
};

export default Slider;
