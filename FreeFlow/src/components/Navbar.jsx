import { useState } from "react";
import "../App.css";

function Navbar() {
  return (
    <nav className="background-white shadow-lg flex justify-center">
      <div className="py-6 w-3/4">
        <h1 className="text-red-400 text-2xl md:text-4xl tracking-widest">
          <span className="font-bold">Free</span>
          <span className="font-light">Flow</span>
        </h1>
      </div>
    </nav>
  );
}

export default Navbar;
