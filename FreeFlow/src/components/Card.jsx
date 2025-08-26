import { useState } from "react";
import "../App.css";

function Card(props) {
  return (
    <div className="mb-8 border-secondary-color w-8/10 md:w-2/4 lg:w-5/20 mt-3 flex flex-col items-center pb-5">
      <div className="w-3/4 background-primary-color pt-8 pb-8 m-6 rounded-lg shadow-lg mx-auto flex align-bottom flex-col">
        <h1 className="text-center text-2xl py-2 tracking-wider pb-1">
          <span className="font-semibold text-white">{props.name}</span>
        </h1>
        <img src={props.image} alt="" />
      </div>
      {/* Animated triple chevron-down arrows OUTSIDE card but within border */}
      <div className="flex flex-col items-center mb-2">
        <style>{`
          .chevron {
            animation: bounceDown 1.2s infinite;
          }
          .chevron2 {
            animation-delay: 0.2s;
          }
          .chevron3 {
            animation-delay: 0.4s;
          }
          @keyframes bounceDown {
            0%, 100% { opacity: 0.5; transform: translateY(0); }
            50% { opacity: 1; transform: translateY(10px); }
          }
        `}</style>
        <svg
          className="chevron"
          width="32"
          height="16"
          viewBox="0 0 24 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 4l6 6 6-6"
            stroke="#8b0000"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <svg
          className="chevron chevron2"
          width="32"
          height="16"
          viewBox="0 0 24 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 4l6 6 6-6"
            stroke="#8b0000"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <svg
          className="chevron chevron3"
          width="32"
          height="16"
          viewBox="0 0 24 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 4l6 6 6-6"
            stroke="#8b0000"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}

export default Card;
