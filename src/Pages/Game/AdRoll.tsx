import {
  createSignal,
  createEffect,
  onCleanup,
  createMemo,
  For,
  JSX,
} from "solid-js";
import { createResource } from "solid-js";
import nightclub from "../../assets/nightclub.webm";
import { useState } from "../../Context/StateContext";
import RecentResults from "./RecentResults";
import HeadToHead from "./HeadToHead";

type AdContent = () => JSX.Element;

const fetchEventId = async (slug: any) => {
  if (!slug) return null;

  const query = `
    query TournamentQuery($slug: String!) {
      tournament(slug: $slug) {
        events {
          id
          name
        }
      }
    }
  `;

  try {
    const response = await fetch("https://api.smash.gg/gql/alpha", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_GG_TOKEN}`,
      },
      body: JSON.stringify({
        query,
        variables: { slug },
      }),
    });

    const json = await response.json();
    const singlesEvent = json.data.tournament.events.find(
      (e: { name: string }) => e.name.toLowerCase().includes("singles")
    );
    return singlesEvent ? singlesEvent.id : null;
  } catch (error) {
    console.error("Error fetching event ID:", error);
    return null;
  }
};

const fetchRecentResults = async (eventId: string) => {
  if (!eventId) return null;

  const query = `query EventSets($eventId: ID!, $page: Int!, $perPage: Int!) {
    event(id: $eventId) {
      id
      name
      sets(
        page: $page
        perPage: $perPage
        sortType: RECENT
        filters: {
          hideEmpty: true
          state: 3
        }
      ) {
        pageInfo {
          total
        }
        nodes {
          state
          slots {
            entrant {
              name
            }
            standing {
              id
              stats {
                score {
                  value
                }
              }
            }
          }
        }
      }
    }
  }`;

  try {
    const response = await fetch("https://api.smash.gg/gql/alpha", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_GG_TOKEN}`,
      },
      body: JSON.stringify({
        query,
        variables: {
          eventId,
          page: 1,
          perPage: 4,
        },
      }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching recent results:", error);
    return null;
  }
};

const VideoAd = () => (
  <video
    src={nightclub}
    height={825}
    autoplay
    loop
    muted
    class="nightclub-loop"
  />
);

export const AdRoll = () => {
  const state = useState();
  const [currentAdIndex, setCurrentAdIndex] = createSignal(0);
  const [isFading, setIsFading] = createSignal(false);

  const slug = createMemo(() => state.Smashgg.slug);
  const [eventId] = createResource(slug, fetchEventId);
  const [recentResults] = createResource(eventId, fetchRecentResults);

  const player1 = createMemo(() => state.players[0]);
  const player2 = createMemo(() => state.players[1]);

  const ads = createMemo<AdContent[]>(() => {
    console.log("Recalculating ads with new recentResults:", recentResults());
    const adArray = [VideoAd];

    if (recentResults() && !recentResults().errors) {
      adArray.push(() => <RecentResults results={recentResults()} />);
    }

    if (player1().h2hWins > 0 || player2().h2hWins > 0) {
      adArray.push(() => <HeadToHead />);
    }

    return adArray;
  });

  createEffect(() => {
    // If the current ad index is out of bounds, reset it to 0
    if (currentAdIndex() >= ads().length) {
      setCurrentAdIndex(0);
    }
  });

  const rotateAd = () => {
    console.log("rotating if > 1", ads());
    if (ads().length > 1) {
      setIsFading(true);
      setTimeout(() => {
        setCurrentAdIndex((prev) => (prev + 1) % ads().length);
        setIsFading(false);
        console.log("Ad rotated to index:", currentAdIndex());
      }, 300);
    }
  };

  let rotationInterval: number | undefined;

  createEffect(() => {
    if (rotationInterval !== undefined) {
      clearInterval(rotationInterval);
    }
    rotationInterval = window.setInterval(rotateAd, 10000);
  });

  onCleanup(() => {
    if (rotationInterval !== undefined) {
      clearInterval(rotationInterval);
    }
  });

  const classString = createMemo(
    () => `ad-container fade-in-out ${isFading() ? "fade-out" : "fade-in"}`
  );

  return (
    <div class={classString()}>
      <For each={ads()}>
        {(Ad, index) => (
          <div
            style={{
              display: index() === currentAdIndex() ? "block" : "none",
              height: "100%",
              width: "100%",
            }}
          >
            <Ad />
          </div>
        )}
      </For>
    </div>
  );
};
