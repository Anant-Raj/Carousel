import React, { FC, MouseEventHandler, useEffect, useState } from "react";
interface CarouselProps {
  duration: number;
  direction: string;
  images: string[];
}
const Carousel: FC<CarouselProps> = ({
  duration = 2,
  direction = "forward",
  images = []
}: CarouselProps) => {
  const [imgIndex, setImgIndex] = useState(0);

  const leftClickHandler: MouseEventHandler<HTMLDivElement> = (event) => {
    if (imgIndex > 0) setImgIndex(imgIndex - 1);
  };

  const rightClickHandler: MouseEventHandler<HTMLDivElement> = (event) => {
    if (imgIndex < images.length - 1) setImgIndex(imgIndex + 1);
  };

  useEffect(() => {
    let timer = setTimeout(() => {
      if (direction === "forward") {
        if (imgIndex < images.length - 1) setImgIndex(imgIndex + 1);
        else setImgIndex(0);
      } else if (direction === "reverse") {
        if (imgIndex > 0) setImgIndex(imgIndex - 1);
        else setImgIndex(images.length - 1);
      }
    }, duration * 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [duration, direction, imgIndex, images.length]);

  return (
    <div className="carouselWrap">
      <img alt={`${imgIndex}`} src={images[imgIndex]} width="100%"></img>
      <div>{imgIndex}</div>
      <div className="leftArrow" onClick={leftClickHandler}>
        {"<"}
      </div>
      <div className="rightArrow" onClick={rightClickHandler}>
        {">"}
      </div>
    </div>
  );
};

export default Carousel;
