"use client";

import React from "react";

const Globe: React.FC = () => {
  return (
    <>
      <style>
        {`
          @keyframes earthRotate {
            0% { background-position: 0 0; }
            100% { background-position: 400px 0; }
          }
          @keyframes twinkling {
            0%,100% { opacity:0.1; }
            50% { opacity:1; }
          }
          @keyframes twinkling-slow {
            0%,100% { opacity:0.1; }
            50% { opacity:1; }
          }
          @keyframes twinkling-long {
            0%,100% { opacity:0.1; }
            50% { opacity:1; }
          }
          @keyframes twinkling-fast {
            0%,100% { opacity:0.1; }
            50% { opacity:1; }
          }
        `}
      </style>
      <div className="flex min-h-[260px] items-center justify-center py-8">
        <div
          className="relative h-[220px] w-[220px] overflow-hidden rounded-full shadow-[0_0_20px_rgba(255,255,255,0.2),-5px_0_8px_#c3f4ff_inset,15px_2px_25px_#000_inset,-24px_-2px_34px_#c3f4ff99_inset,250px_0_44px_#00000066_inset,150px_0_38px_#000000aa_inset]"
          style={{
            backgroundImage: "url('/media/globe.jpeg')",
            backgroundSize: "cover",
            backgroundPosition: "left",
            animation: "earthRotate 30s linear infinite",
          }}
        >
          <div
            className="absolute left-[-20px] top-[40px] h-1 w-1 rounded-full bg-white"
            style={{ animation: "twinkling 3s infinite" }}
          />
          <div
            className="absolute left-[40px] top-[30px] h-1 w-1 rounded-full bg-white"
            style={{ animation: "twinkling-slow 2s infinite" }}
          />
          <div
            className="absolute left-[180px] top-[90px] h-1 w-1 rounded-full bg-white"
            style={{ animation: "twinkling-long 4s infinite" }}
          />
          <div
            className="absolute left-[120px] top-[190px] h-1 w-1 rounded-full bg-white"
            style={{ animation: "twinkling 3s infinite" }}
          />
          <div
            className="absolute left-[50px] top-[170px] h-1 w-1 rounded-full bg-white"
            style={{ animation: "twinkling-fast 1.5s infinite" }}
          />
          <div
            className="absolute left-[150px] top-[-10px] h-1 w-1 rounded-full bg-white"
            style={{ animation: "twinkling-long 4s infinite" }}
          />
          <div
            className="absolute left-[190px] top-[60px] h-1 w-1 rounded-full bg-white"
            style={{ animation: "twinkling-slow 2s infinite" }}
          />
        </div>
      </div>
    </>
  );
};

export default Globe;
