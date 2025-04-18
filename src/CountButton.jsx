import { PlusIcon, SketchLogoIcon } from "@radix-ui/react-icons";

export default function CountButton({ setCount, count, type, mode }) {
  const calculateCount = () => {
    console.log("count");
    return count + Math.floor(Math.random() * mode) + 1;
  };
  return (
    <button
      disabled={type !== "cash"}
      onClick={() => setCount(calculateCount)}
      className="count-btn"
    >
      {type === "plus1" || type === "plus2" || type === "plus3" ? (
        <PlusIcon className="count-btn-icon" />
      ) : (
        <SketchLogoIcon className="count-btn-icon" />
      )}
    </button>
  );
}
