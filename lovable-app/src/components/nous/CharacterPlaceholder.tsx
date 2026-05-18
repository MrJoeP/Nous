import { useNous } from "@/lib/nous/state";
import { characterBg } from "@/lib/nous/palette";

export function CharacterPlaceholder() {
  const { state } = useNous();
  return (
    <div
      style={{
        width: 240,
        height: 320,
        borderRadius: 8,
        background: characterBg(state.currentDay),
        margin: "0 auto",
        transition: "background 500ms ease",
      }}
    />
  );
}
