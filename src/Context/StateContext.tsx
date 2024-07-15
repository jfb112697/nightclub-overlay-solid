import {
  ParentComponent,
  createContext,
  createEffect,
  createResource,
  onCleanup,
  useContext,
  createMemo,
} from "solid-js";
import { createStore, produce } from "solid-js/store";
import { Scoreboard, DEFAULT_SCOREBOARD } from "../types";

const StateContext = createContext<Scoreboard>(DEFAULT_SCOREBOARD);

export const StateProvider: ParentComponent = (props) => {
  const [state, setState] = createStore<Scoreboard>(DEFAULT_SCOREBOARD);

  const fetchData = async (): Promise<Partial<Scoreboard>> => {
    const response = await fetch("http://localhost/getCurrentValues");
    if (!response.ok) {
      console.error(response);
      throw new Error("Network response was not ok");
    }
    return response.json();
  };

  const [data, { refetch }] = createResource<Partial<Scoreboard>>(fetchData);

  const intervalId = setInterval(() => {
    refetch();
  }, 1000);

  onCleanup(() => clearInterval(intervalId));

  createEffect(() => {
    const fetchedData = data();
    if (fetchedData) {
      setState(
        produce((s) => {
          Object.assign(s, fetchedData);
        })
      );
    }
  });

  const memoizedState = createMemo(() => state);

  return (
    <StateContext.Provider value={memoizedState()}>
      {props.children}
    </StateContext.Provider>
  );
};

export function useState(): Scoreboard {
  const context = useContext(StateContext);
  if (context === undefined) {
    throw new Error("useState must be used within a StateProvider");
  }
  return context;
}
