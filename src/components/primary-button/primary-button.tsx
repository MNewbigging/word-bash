import "./primary-button.scss";

interface PrimaryButtonProps {
  text: string;
  onClick: () => void;
  disabled?: boolean;
  size: "sm" | "md" | "lg";
}

export function PrimaryButton({
  text,
  onClick,
  disabled,
  size,
}: PrimaryButtonProps) {
  return (
    <div
      className={`primary-button ${disabled ? "disabled" : ""} ${size}`}
      onClick={onClick}
    >
      {text}
    </div>
  );
}
