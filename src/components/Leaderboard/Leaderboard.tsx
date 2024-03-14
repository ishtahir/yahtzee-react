import useLeaderboardStore from "../../stores/useLeaderboardStore";

const Leaderboard = () => {
  const leaderboard = useLeaderboardStore((state) => state.leaderboard);

  const datify = (date: Date) => {
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate();
    const year = date.getFullYear().toString().slice(2);
    return `${month}/${day}/${year}`;
  };

  return (
    <div className="leaderboard" data-testid="leaderboard">
      <h2>Leaderboard: Top 10 Scores</h2>
      {leaderboard.map(({ name, date, score }, ind) => (
        <menu key={`${name}-${ind}`} className="rules">
          <li>{datify(new Date(date))}</li>
          <li>{name}</li>
          <li>{score}</li>
        </menu>
      ))}
    </div>
  );
};

export default Leaderboard;
