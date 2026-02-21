import "./logo.scss";

interface LogoProps {
  altWord1?: string;
  altWord2?: string;
}

export function Logo({ altWord1, altWord2 }: LogoProps) {
  const word1 = altWord1 ?? "WORD";
  const word2 = altWord2 ?? "BASH";

  return (
    <div className="logo">
      <div className="word">
        <span className="rule"></span>
        <span className="text">{word1}</span>
        <span className="rule"></span>
      </div>
      <div className="bash">{word2}</div>
    </div>
  );
}
