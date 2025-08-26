import { useState } from "react";
import "../App.css";

function Searchbar(props) {
  const [playerName, setPlayerName] = useState("");
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    props.setStats(null);

    try {
      const response = await fetch(
        `http://127.0.0.1:5000/player-career-stats/?player_name=${encodeURIComponent(
          playerName
        )}`
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch stats");
      }

      props.setStats(data);
      console.log("Raw API data:", data);

      let miss = 0;
      let enter = 0;

      // Group shots by similar coordinates
      const locationMap = new Map();
      const groupingRadius = 0.3; // feet

      data.shot_chart.forEach((shot) => {
        const x = shot.LOC_X / 12 + 25; // recenter: half-court width = 25ft
        const y = shot.LOC_Y / 12 + 5; // baseline offset ~5ft

        // count makes/misses
        if (shot.SHOT_MADE_FLAG === 1) {
          enter++;
        } else {
          miss++;
        }

        // make a grouping key
        const key = `${Math.round(x / groupingRadius) * groupingRadius},${
          Math.round(y / groupingRadius) * groupingRadius
        }`;

        if (!locationMap.has(key)) {
          locationMap.set(key, { x, y, made: 0, attempts: 0 });
        }

        const group = locationMap.get(key);
        group.attempts += 1;
        group.made += shot.SHOT_MADE_FLAG;
      });

      // finalize
      const shotsData = Array.from(locationMap.values()).map((g) => ({
        ...g,
        efficiency: g.made / g.attempts,
        z: g.made / g.attempts, // currently z = shooting %
      }));

      // console.log("Original shots count:", data.shot_chart.length);
      // console.log("Grouped locations count:", shotsData.length);
      // console.log("Processed shotsData:", shotsData);
      // console.log(`Total makes: ${enter}, Total misses: ${miss}`);

      props.setShotsData(shotsData);
      console.log(shotsData);

      props.setMiss(miss);
      props.setEnter(enter);
      props.setStats(data);

      const lastSeason = data.career_stats[data.career_stats.length - 1];
      if (lastSeason) {
        props.setMins(lastSeason.MIN);
        props.setAge(lastSeason.PLAYER_AGE);
      }
    } catch (err) {
      setError(err.message);
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
