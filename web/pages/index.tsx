import { NextPage } from "next";
import React from "react";

const Home: NextPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-3xl font-logo">Portfolio Stacker</h1>
      <h3>Quickly Get Your Work Seen</h3>
      <button className="py-2 rounded-sm dark:text-steel-900 dark:bg-steel-100 w-52 dark:focus:bg-steel-300">
        Get Started
      </button>
    </div>
  );
};

export default Home;
