function Stats(props) {
  console.log(props.stats);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="/background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Basketball GIF */}
      <img
        src="/basketball.gif"
        alt="Basketball Animation"
        className="absolute top-0 left-0 w-full h-full object-cover opacity-30"
      />

      {/* Gradient red overlay */}
      <div
        className="absolute top-0 left-0 w-full h-full"
        style={{
          background:
            "linear-gradient(to right bottom, rgba(238,9,121,0.4), rgba(255,106,0,0.8))",
        }}
      ></div>

      {/* Content */}
      <div className="relative flex flex-col items-center justify-center h-full">
        <h1 className="text-4xl font-normal text-white mb-4 tracking-[0.2em]">
          Stats
        </h1>
        <p className="text-2xl text-white mb-2 mt-5">
          FPG <span className="text-6xl ml-10">{props.fgPercentage}</span>
        </p>
        <p className="text-2xl text-white mb-2 mt-5">
          Shots <span className="text-6xl ml-10">{props.totalShots}</span>
        </p>
        <p className="text-2xl text-white mb-2 mt-5">
          Minutes <span className="text-6xl ml-10">{props.mins}</span>
        </p>
        <p className="text-2xl text-white mb-2 mt-5">
          Age <span className="text-6xl ml-10">{props.age}</span>
        </p>
      </div>
    </div>
  );
}

export default Stats;
