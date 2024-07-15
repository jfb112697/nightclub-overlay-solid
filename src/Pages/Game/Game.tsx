import { Component } from "solid-js";
import { useState } from "../../Context/StateContext";
import { GameLeftPanel } from "./GameLeftPanel";
import Value from "../../Components/Value";
import { Scorebar } from "./Scorebar";

export const Game: Component = () => {
  const state = useState();

  return (
    <>
      <div id="gameroot">
        <div id="camera" />
        <GameLeftPanel
        />
        <div id="gamecontainer"></div>
      </div>
      <div id="round-container">
        <div id="newround"><Value value={state.round ||""} /></div>
      </div>
      <Scorebar/>
      </>
      
  );
};