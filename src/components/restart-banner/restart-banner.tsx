import { motion } from "framer-motion";
import { PrimaryButton } from "../primary-button/primary-button";
import "./restart-banner.scss";

interface RestartBannerProps {
  onRestart: () => void;
}

export function RestartBanner({ onRestart }: RestartBannerProps) {
  return (
    <motion.div
      className="restart-banner"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      <PrimaryButton text="Restart" onClick={onRestart} size="md" />
    </motion.div>
  );
}
