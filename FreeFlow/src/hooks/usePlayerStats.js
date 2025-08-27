import { useState } from "react";

const usePlayerStats = () => {
  const [playerName, setPlayerName] = useState("");
  const [error, setError] = useState(null);

  const fetchPlayerStats = async () => {
    setError(null);

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

      const lastSeason = data.career_stats[data.career_stats.length - 1];

      return {
        stats: data,
        shotsData,
        miss,
        enter,
        mins: lastSeason?.MIN,
        age: lastSeason?.PLAYER_AGE,
      };
    } catch (err) {
      setError(err.message);
      return null;
    }
  };

  return {
    playerName,
    setPlayerName,
    error,
    fetchPlayerStats,
  };
};

export default usePlayerStats;
