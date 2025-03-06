export default function Title({ locked }) {
  return (
    <h1 className="title">
      {locked ? (
        <span>
          Buy <b>Pro</b> for &gt;5
        </span>
      ) : (
        <span>Fancy Counter</span>
      )}
    </h1>
  );
}
