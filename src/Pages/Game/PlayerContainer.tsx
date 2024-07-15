import { createMemo, Show } from "solid-js";
import { useState } from "../../Context/StateContext";
import Value from "../../Components/Value";
import { Player } from "../../types";

export const PlayerContainer = (props: { index: number }) => {
  const state = useState();
  const isReversed = props.index === 1;

  const player = createMemo(() => state.players[props.index]);

  return (
    <div
      class={`player-container ${
        isReversed ? "flex-direction-row-reverse" : "flex-direction-row"
      }`}
    >
      <Show when={player()}>
        {(p) => (
          <>
            <div
              class="score-container"
              style={{
                "border-width": isReversed ? "0 0 0 3px" : "0 3px 0 0",
                "border-radius": isReversed ? "0 0 6px 0" : "0 0 0 6px",
                background: `linear-gradient(${
                  isReversed ? "270deg" : "90deg"
                }, rgba(197, 30, 147, 1) 0%, rgba(253, 140, 251, 1) 100%)`,
              }}
            >
              <Value value={p().score.toString()} />
            </div>
            <div
              class={`name-container ${
                isReversed ? "align-items-flex-end" : "align-items-flex-start"
              } ${isReversed ? "margin-right-13px" : "margin-left-13px"}`}
            >
              <div
                style={{
                  "font-weight": "bold",
                  display: "flex",
                  gap: p().sponsor ? "12px" : "0",
                }}
              >
                <span style={{ "font-weight": "normal" }}>
                  <Value value={p().sponsor || ""} />
                </span>
                <Value value={p().name} />
              </div>
              <div style={{ "font-size": "12pt" }}>
                <Value value={p().pronouns || ""} />
              </div>
            </div>
            <div
              class={`char-container ${
                isReversed
                  ? "border-radius-0-10px-0-0"
                  : "border-radius-10px-0-0-0"
              } ${
                isReversed
                  ? "border-width-3px-3px-3px-0"
                  : "border-width-3px-0-3px-3px"
              }`}
            >
              <img
                class={`${
                  isReversed ? "" : "transform-scaleX-1"
                } position-relative ${isReversed ? "left-19px" : ""}`}
                src={`/Characters/${p().realCharacter?.name || ""}/0.png`}
              />
            </div>
          </>
        )}
      </Show>
    </div>
  );
};
