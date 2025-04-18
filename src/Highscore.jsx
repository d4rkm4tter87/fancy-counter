export default function Highscore({ score }) {
  if (!score) return null;
  return (
    <div className="highscore-container">
      <h1 className="highscore-title">Highscore: {score}</h1>
    </div>
  );
}
