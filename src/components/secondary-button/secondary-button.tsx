import "./secondary-button.scss";

interface SecondaryButtonProps {
  text: string;
  onClick: () => void;
}

export function SecondaryButton({ text, onClick }: SecondaryButtonProps) {
  return (
    <div className="secondary-button" onClick={onClick}>
      {text}
    </div>
  );
}
