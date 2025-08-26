import { useState } from "react";
import { motion } from "framer-motion";
import "./App.css";
import Navbar from "./components/Navbar.jsx";
import Searchbar from "./components/Searchbar.jsx";
import Card from "./components/Card.jsx";
import Stats from "./components/Stats.jsx";
import ShotChart from "./components/Shotchart/components/Shotchart.jsx";

function App() {
  const [stats, setStats] = useState(null);
  const [miss, setMiss] = useState(0);
  const [enter, setEnter] = useState(0);
  const [mins, setMins] = useState(0);
  const [age, setAge] = useState(0);
  const [shotsData, setShotsData] = useState(null);

  const totalShots = miss + enter;
  const fgPercentage =
    totalShots > 0 ? ((enter / totalShots) * 100).toFixed(1) : "0.0";

  // Animation settings
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <>
      <Navbar />
      <Searchbar
        setStats={setStats}
        setMiss={setMiss}
        setEnter={setEnter}
        setMins={setMins}
        setAge={setAge}
        setShotsData={setShotsData}
      />

      {stats && stats.player_name && (
        <motion.section
          className="flex justify-center items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
        >
          <Card
            name={stats.player_name}
            image={`https://cdn.nba.com/headshots/nba/latest/1040x760/${stats.player_id}.png`}
          />
        </motion.section>
      )}

      {stats && stats.player_name && (
        <motion.section
          className="flex justify-center min-h-screen items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
        >
          <Stats
            stats={stats}
            fgPercentage={fgPercentage}
            totalShots={totalShots}
            mins={mins}
            age={age}
          />
        </motion.section>
      )}

      {stats && stats.player_name && (
        <motion.section
          className="w-full min-h-screen flex items-center justify-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
        >
          <ShotChart data={shotsData} />
        </motion.section>
      )}
    </>
  );
}

export default App;
