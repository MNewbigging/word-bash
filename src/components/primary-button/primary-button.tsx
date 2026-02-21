import "./primary-button.scss";

interface PrimaryButtonProps {
  text: string;
  onClick: () => void;
  disabled?: boolean;
}

export function PrimaryButton({ text, onClick, disabled }: PrimaryButtonProps) {
  return (
    <div
      className={`primary-button ${disabled ? "disabled" : ""}`}
      onClick={onClick}
    >
      {text}
    </div>
  );
}
