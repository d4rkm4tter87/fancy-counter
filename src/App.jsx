import Count from "./Count";
import { useEffect, useState } from "react";
import { PlusIcon, SketchLogoIcon } from "@radix-ui/react-icons";
import Highscore from "./Highscore";
import ResetButton from "./ResetButton";
import Blinker from "./Blinker";

function App() {
  const [count, setCount] = useState(0);
  const [boom, setBoom] = useState(false);
  const [spaceCounter, setSpaceCounter] = useState(0);
  const [spaceTrigger, setSpaceTrigger] = useState(0);
  const [blinker, setBlinker] = useState(0);
  const [highest, setHighest] = useState(false);
  const calculateCount = (amount) => {
    if (boom) return;
    const rdm = Math.floor(Math.random() * amount) + 1;
    const calc = 1 + 0.1 * rdm;
    const result = calc * count;
    const threshold = 3000;
    const coinflip = Math.floor(Math.random() * threshold);
    const amountReducer = Math.round(rdm / 3) + 1;
    const result2 = result * amountReducer;
    //console.log(amountReducer, "-", result, "-", result2, "-", coinflip);
    //console.log(coinflip, result2);
    setBoom(coinflip < result2);
    setCount(count + rdm);
  };
  const cash = () => {
    if (boom) return;
    if (count > highest) setHighest(count);
    setCount(0);
    setSpaceCounter(spaceCounter - 1);
    setSpaceTrigger(0);
  };

  const getSpaceTrigger = (x) => {
    switch (x) {
      case 0:
        return 20;
      case 1:
        return 60;
      case 3:
        return 110;
      case 4:
        return 220;
      case 5:
        return 400;
      default:
        return 20;
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === "Space" && !boom) {
        setCount(count + 1);
        setSpaceCounter(spaceCounter + 1);
        //console.log(spaceCounter, spaceTrigger);
        if (spaceCounter > getSpaceTrigger(spaceTrigger)) {
          if (spaceTrigger == 4) {
            setBlinker(1);
          } else if (spaceTrigger > 4) {
            setBlinker(2);
          }
          setSpaceTrigger(spaceTrigger + 1);
          setBoom(true);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [count, boom, spaceCounter, spaceTrigger]);

  useEffect(() => {
    if (blinker > 0) {
      const bTimer = blinker == 1 ? 700 : 1800;
      const timer = setTimeout(() => {
        setBlinker(0);
        if (blinker > 1) {
          setSpaceTrigger(0);
          setSpaceCounter(0);
        }
      }, bTimer);
      return () => clearTimeout(timer);
    }
  }, [blinker]);
  return (
    <>
      {blinker > 0 && <Blinker mode={blinker} />}
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

      <ResetButton
        setCount={setCount}
        setBoom={setBoom}
        boom={boom}
        setSpaceCounter={setSpaceCounter}
      />

      <Highscore score={highest} />
    </>
  );
}

export default App;
