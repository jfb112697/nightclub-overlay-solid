import { createSignal, createEffect, Show } from "solid-js";
import MatchRow from "../../Components/MatchRow";
import { useState } from "../../Context/StateContext";

const HeadToHead = () => {
  const state = useState();
  const player1 = () => state.players[0];
  const player2 = () => state.players[1];
  const predictions = () => state.predictions;
  const outcomes = () => state.predictions.outcomes;

  const [playerPercents, setPlayerPercents] = createSignal<number[]>([]);

  createEffect(() => {
    const currentOutcomes = outcomes();
    if (currentOutcomes && currentOutcomes.length > 1) {
      const total = //@ts-ignore
        currentOutcomes[0].channel_points + currentOutcomes[1].channel_points;
      setPlayerPercents([
        Math.ceil((currentOutcomes[0].channel_points * 100) / total), //@ts-ignore
        Math.floor((currentOutcomes[1].channel_points * 100) / total),
      ]);
    }
  });

  return (
    <div class="ad" style={{ height: "170px" }}>
      <Show when={player1().h2hWins > -1 && player2().h2hWins > -1}>
        <h1 style={{ "font-size": "34pt", "margin-top": 0 }}>Head to Head</h1>
        <MatchRow
          match={[
            { name: player1().name, score: player1().h2hWins },
            { name: player2().name, score: player2().h2hWins },
          ]}
        />
      </Show>
      <Show when={predictions().isActive}>
        <h1 style={{ "margin-top": 0, "margin-bottom": "10px" }}>
          Live Prediction
        </h1>
        <div style={{ "font-style": "italic", "font-size": "18pt" }}>
          {predictions().event.title}
        </div>
        PREDICTION BAR
      </Show>
    </div>
  );
};

export default HeadToHead;
