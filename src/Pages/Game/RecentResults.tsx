import { createMemo, For } from "solid-js";
import MatchRow from "../../Components/MatchRow";

interface Match {
  name: string;
  score: number;
}

function getMatch(node: any, slot: number): Match {
  return {
    name: node.slots[slot].entrant.name,
    score: node.slots[slot].standing.stats.score.value,
  };
}

const RecentResults = (props: { results: any }) => {
  const nodes = createMemo(() => {
    console.log("Recalculating nodes with new results:", props.results);
    if (
      props.results.data &&
      props.results.data.event &&
      props.results.data.event.sets
    ) {
      return props.results.data.event.sets.nodes;
    }
    return [];
  });

  return (
    <div class="recent-result ad">
      <h1>Recent Results</h1>
      <For each={nodes()}>
        {(node) => {
          const match = createMemo(() =>
            [getMatch(node, 0), getMatch(node, 1)].sort(
              (a, b) => b.score - a.score
            )
          );
          return <MatchRow match={match()} />;
        }}
      </For>
    </div>
  );
};

export default RecentResults;
