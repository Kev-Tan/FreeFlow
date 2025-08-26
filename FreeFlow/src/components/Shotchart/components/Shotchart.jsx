import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import court from "./chart.png";

const BasketballShotChart = ({ data }) => {
  const chartRef = useRef(null);

  // Keep track of chart dimensions
  const [dimensions, setDimensions] = useState(() => {
    const courtAspect = 50 / 47; // width / height
    let width = window.innerWidth * 0.8;
    let height = width / courtAspect;

    if (height > window.innerHeight * 0.8) {
      height = window.innerHeight * 0.8;
      width = height * courtAspect;
    }
    return { width, height };
  });

  // Recalculate size on resize
  useEffect(() => {
    const handleResize = () => {
      const courtAspect = 50 / 47; // width / height
      let width = window.innerWidth * 0.8;
      let height = width / courtAspect;

      if (height > window.innerHeight * 0.8) {
        height = window.innerHeight * 0.8;
        width = height * courtAspect;
      }
      setDimensions({ width, height });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!data || data.length === 0) return;

    const { width, height } = dimensions;

    // Clear old chart
    const root = d3.select(chartRef.current);
    root.selectAll("*").remove();

    const svg = root
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("id", "shotchart");

    // Background court image
    const defs = svg.append("defs");
    const pattern = defs
      .append("pattern")
      .attr("id", "bg")
      .attr("patternUnits", "userSpaceOnUse")
      .attr("width", width)
      .attr("height", height);

    pattern
      .append("image")
      .attr("href", court)
      .attr("width", width)
      .attr("height", height);

    svg
      .append("rect")
      .attr("width", width)
      .attr("height", height)
      .attr("fill", "url(#bg)")
      .attr("transform", `rotate(180, ${width / 2}, ${height / 2})`);

    // Scales
    const xScale = d3.scaleLinear().domain([0, 50]).range([0, width]);
    const yScale = d3.scaleLinear().domain([0, 47]).range([height, 0]);

    const colorValue = (d) => (d.made > 0 ? "#013220" : "#8b0000");
    const classByShot = (d) => (d.made > 0 ? "dot made" : "dot missed");

    // Draw circles
    svg
      .selectAll(".dot")
      .data(data)
      .enter()
      .append("circle")
      .attr("r", (d) => 3 + d.attempts * 1.05)
      .attr("cx", (d) => xScale(d.x))
      .attr("cy", (d) => yScale(d.y))
      .attr("class", classByShot)
      .style("fill", colorValue)
      .style("opacity", 0.8);
  }, [data, dimensions]);

  return (
    <div className="flex flex-col items-center bg-white">
      <h1 className="text-3xl mb-5 font-semibold text-black tracking-wider">
        Basketball Shot Chart
      </h1>
      <div ref={chartRef} />
      {/* Legend */}
      <div className="flex gap-6 mt-8 items-center">
        <div className="flex items-center gap-2">
          <span
            className="inline-block w-4 h-4 rounded-full"
            style={{ background: "#013220" }}
          ></span>
          <span className="text-base font-medium text-black">Blue = In</span>
        </div>
        <div className="flex items-center gap-2">
          <span
            className="inline-block w-4 h-4 rounded-full"
            style={{ background: "#8b0000" }}
          ></span>
          <span className="text-base font-medium text-black">Red = Not In</span>
        </div>
      </div>
    </div>
  );
};

export default BasketballShotChart;
