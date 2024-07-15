import { PlayerContainer } from "./PlayerContainer"

export const Scorebar = () => {
    return(
        <div id="scorebar">
        <PlayerContainer index={0} />
        <PlayerContainer index={1} />
      </div>
    )
}