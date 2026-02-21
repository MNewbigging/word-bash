import { PrimaryButton } from "../primary-button/primary-button";
import "./word-bar.scss";

export function WordBar() {
  function onSubmit() {
    console.log("submit");
  }

  return (
    <div className="word-bar">
      <div className="word-display">PAPERWORK</div>

      <PrimaryButton text="✓" onClick={onSubmit} size="sm" />
    </div>
  );
}
