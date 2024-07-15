import { createSignal, createEffect, Show } from "solid-js";

// Value component
const Value = (props: { value: string | null }) => {
  // State to manage fading and content update
  const [currentValue, setCurrentValue] = createSignal(props.value);
  const [fading, setFading] = createSignal(false);

  // Function to handle fading animation
  const handleFade = () => {
    setFading(true);
    setTimeout(() => {
      setCurrentValue(props.value);
      setFading(false); // Update content after fade out
    }, 300); // Adjust timing as needed for your animation
  };

  // Watch for props.value changes and trigger animations
  createEffect(() => {
    if (props.value !== currentValue()) {
      handleFade(); // Trigger fade animation
    }
  });

  // Construct class string based on fading state
  const classString = `fade-in-out ${fading() ? "fade-out" : "fade-in"}`;

  return (
    <>
      {currentValue() && currentValue() != "" && (
        <span
          class={classString}
          style={{
            opacity: fading() ? "0" : "1",
            display: !currentValue() || currentValue() == "" ? "none" : "block",
          }}
        >
          {currentValue()}
        </span>
      )}
    </>
  );
};

export default Value;
