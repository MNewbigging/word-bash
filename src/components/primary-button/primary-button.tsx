import { useEffect, useRef } from "react";
import "./primary-button.scss";

interface PrimaryButtonProps {
  text: string;
  onClick: () => void;
  size: "sm" | "md" | "lg";
  disabled?: boolean;
  activeOnEnter?: boolean;
}

export function PrimaryButton({
  text,
  onClick,
  size,
  disabled,
  activeOnEnter,
}: PrimaryButtonProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!activeOnEnter) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Enter") {
        ref.current?.classList.toggle("active");
      }
    }

    function onKeyUp(e: KeyboardEvent) {
      if (e.key === "Enter") {
        ref.current?.classList.toggle("active");
      }
    }

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`primary-button ${disabled ? "disabled" : ""} ${size}`}
      onClick={onClick}
    >
      {text}
    </div>
  );
}
