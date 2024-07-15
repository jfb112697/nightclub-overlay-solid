const MatchRow = (props: { match: { score: number; name: string }[] }) => {
  return (
    <>
      <div class="player-row-container">
        <div class="result-player justify-content-flex-start">
          <div class="player-row-score left-17px">{props.match[0].score}</div>
          <div>
            <p class="player-row-name left-17px">
              {props.match[0].name.slice(
                props.match[0].name.lastIndexOf("|") + 1
              )}
            </p>
          </div>
        </div>
        <div class="result-player flex-direction-row-reverse justify-content-flex-end">
          <div class="player-row-score right-17px">{props.match[1].score}</div>
          <div class="justify-content-flex-end">
            <p class="player-row-name right-17px">
              {props.match[1].name.slice(
                props.match[1].name.lastIndexOf("|") + 1
              )}
            </p>
          </div>
        </div>
      </div>
      <div class="vs">VS</div>
    </>
  );
};

export default MatchRow;
