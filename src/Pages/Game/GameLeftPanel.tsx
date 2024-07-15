import nycmelee from "../../assets/nycmelee.png";
import { AdRoll } from "./AdRoll";

export const GameLeftPanel = () => {
    
    return(
    <div id="leftpanel">
      <AdRoll />
      <div class="sponsors">
        <p class="fancy">
          <span class="sponsor-title">In Partnership With</span>
        </p>
        <div class="sponsor-images">
          <img style={{'mix-blend-mode':"screen"}}  src={nycmelee}></img>
          <img src="https://images.squarespace-cdn.com/content/v1/5d695110f8d59d0001fd289b/c085e465-ca9c-46cb-ac78-e8eced2dce7e/OS_with_bars_logo_WHITE.png?format=1500w" />
        </div>
      </div>
      <div class="border-animation"></div>

    </div>
    )
}