import React from "react";
import Companies from "../components/Companies";
import Contact from "../components/Contact";
import GetStarted from "../components/GetStarted";
import Hero from "../components/Hero";
import Residencies from "../components/Residencies";
import Value from "../components/Value";

const Root = () => {
  return (
    <div className="App">
      <div>
        <div className="white-gradient" />

        <Hero />
      </div>
      <Companies />
      <Residencies />
      <Value />
      <Contact />
      <GetStarted />
    </div>
  );
};

export default Root;
