import { useEffect, useState } from "react";
import Carousel from "./Carousel";
import "./styles.css";

export default function App() {
  const [duration, setDuration] = useState(2);
  const [direction, setDirection] = useState("forward");
  const [settings, updateSettings] = useState({
    duration: 2,
    direction: "forward"
  });
  const [images, setImages] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    fetch("https://demo5110359.mockable.io/images")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setImages(result.images);
        },
        (error) => {
          setIsLoaded(true);
          //setError(error);
        }
      );
  }, []);

  const handleDurationChange = (event) => {
    setDuration(event.target.value);
  };

  const handleDirectionChange = (event) => {
    const direction = event.target.value;
    console.log("direction is : ", direction);
    setDirection(direction);
  };

  const onSubmit = (event) => {
    console.log("direction: ", direction);
    console.log("duration: ", duration);
    updateSettings({
      direction: direction,
      duration: duration
    });
    event.preventDefault();
  };

  return (
    <div className="App">
      <div className="formWrap">
        <label className="durationWrap">
          Duration :
          <input
            type="number"
            name="Duration"
            value={duration}
            onChange={handleDurationChange}
          />
        </label>

        <label className="directionWrap">
          Direction :
          <div className="radio">
            <label>
              <input
                type="radio"
                value="forward"
                checked={direction === "forward"}
                onChange={handleDirectionChange}
              />
              Forward
            </label>
          </div>
          <div className="radio">
            <label>
              <input
                type="radio"
                value="reverse"
                checked={direction === "reverse"}
                onChange={handleDirectionChange}
              />
              Reverse
            </label>
          </div>
        </label>

        <input type="submit" value="Submit" onClick={onSubmit} />
      </div>
      {isLoaded && (
        <Carousel
          duration={settings.duration}
          direction={settings.direction}
          images={images}
        />
      )}
    </div>
  );
}
