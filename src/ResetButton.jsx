import { ResetIcon } from "@radix-ui/react-icons";

export default function ResetButton({
  setCount,
  setBoom,
  boom,
  setSpaceCounter,
}) {
  const handleClick = (event) => {
    setCount(0);
    setBoom(false);
    setSpaceCounter(0);
    event.currentTarget.blur();
  };
  return (
    <div className="highscore-container">
      <button
        disabled={!boom}
        onClick={handleClick}
        className={!boom ? "reset-btn-inactive" : "reset-btn"}
      >
        <ResetIcon className="reset-btn-icon" />
      </button>
    </div>
  );
}
