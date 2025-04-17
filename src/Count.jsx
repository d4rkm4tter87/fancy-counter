export default function Count({ count }) {
  return (
    <>
      <p className="count">{count}</p>
      <img
        src="https://tsumego-hero.com/img/external/img/mine.png"
        width="100px"
        alt="count"
        className="count__img"
      />
    </>
  );
}
