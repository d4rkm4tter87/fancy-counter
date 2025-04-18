import Count from "./Count";
import { useEffect, useState } from "react";
import { PlusIcon, SketchLogoIcon } from "@radix-ui/react-icons";
import Highscore from "./Highscore";
import ResetButton from "./ResetButton";

function App() {
  const [count, setCount] = useState(0);
  const [boom, setBoom] = useState(false);
  const [highest, setHighest] = useState(false);
  const calculateCount = (amount) => {
    if (boom) return;
    const rdm = Math.floor(Math.random() * amount) + 1;
    const calc = 1 + 0.1 * rdm;
    const result = calc * count;
    const threshold = 1500;
    const coinflip = Math.floor(Math.random() * threshold);
    console.log(result, "-", coinflip, "-", count);
    setBoom(coinflip < result);
    setCount(count + rdm);
  };
  const cash = () => {
    if (count > highest) setHighest(count);
    setCount(0);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === "Space") {
        setCount(count + 1);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [count]);
  return (
    <>
      <div className="button-container-outer">
        <div className="button-container-inner">
          <button
            disabled={boom}
            onClick={() => calculateCount(3)}
            className="count-btn"
          >
            <PlusIcon className="count-btn-icon btn-size1" width="10px" />
          </button>
          <button
            disabled={boom}
            onClick={() => calculateCount(6)}
            className="count-btn"
          >
            <PlusIcon className="count-btn-icon btn-size2" />
          </button>
          <button
            disabled={boom}
            onClick={() => calculateCount(12)}
            className="count-btn"
          >
            <PlusIcon className="count-btn-icon btn-size3" />
          </button>
        </div>
      </div>
      <div className="button-container-outer">
        <div className="button-container-inner">
          <button onClick={cash} className="count-btn">
            <SketchLogoIcon className="count-btn-icon btn-size2" />
          </button>
        </div>
      </div>
      <main>
        <Count count={count} exploded={boom} calculateCount={calculateCount} />
      </main>

      <ResetButton setCount={setCount} setBoom={setBoom} boom={boom} />

      <Highscore score={highest} />
    </>
  );
}

export default App;
