export default function Count({ count, exploded, calculateCount }) {
  const calculateSize = (count) => {
    const size = !exploded ? 1 : 1.6;
    return (40 + count * 2.5) * size;
  };
  return (
    <>
      {/* <p className="count">{count}</p> */}
      <img
        disabled={exploded}
        src={
          exploded
            ? "https://tsumego-hero.com/img/external/img/mine-explosion.png"
            : "https://tsumego-hero.com/img/external/img/mine.png"
        }
        width={calculateSize(count)}
        alt="count"
        className="count__img"
        onClick={() => calculateCount(11)}
      />
    </>
  );
}
