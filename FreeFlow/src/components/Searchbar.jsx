import "../App.css";
import usePlayerStats from "../hooks/usePlayerStats";

function Searchbar(props) {
  const { playerName, setPlayerName, error, fetchPlayerStats } =
    usePlayerStats();

  async function handleSubmit(e) {
    e.preventDefault();
    props.setStats(null);

    const result = await fetchPlayerStats();

    if (result) {
      const { stats, shotsData, miss, enter, mins, age } = result;
      props.setShotsData(shotsData);
      props.setMiss(miss);
      props.setEnter(enter);
      props.setStats(stats);

      if (mins !== undefined) props.setMins(mins);
      if (age !== undefined) props.setAge(age);
    }
  }

  return (
    <div className="flex flex-col items-center mt-6">
      <form
        onSubmit={handleSubmit}
        className="flex w-4/5 mb-6 md:w-2/4 lg:w-1/3 border border-gray-400 rounded-lg overflow-hidden"
      >
        <input
          type="text"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          placeholder="Enter player name"
          className="tracking-wide text-lg md:text-xl flex-1 px-3 py-2 focus:outline-none"
        />
        <button
          type="submit"
          className="px-3 md:px-4 py-2 background-primary-color text-white hover:bg-blue-600"
        >
          Search
        </button>
      </form>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}

export default Searchbar;
