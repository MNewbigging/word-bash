import { AnimatePresence, motion } from "framer-motion";
import { useEventData } from "../hooks/use-event-data";
import "./score-fx.scss";
import { useEffect, useState } from "react";

export function ScoreFx() {
  const pointsGained = useEventData("score-changed")?.pointsGained;

  const [fx, setFx] = useState<{ id: number; pointsGained: number } | null>(
    null,
  );

  useEffect(() => {
    if (!pointsGained) return;

    // New fx each time score changes (id forces fresh animation)
    setFx({ id: Date.now(), pointsGained });
  }, [pointsGained]);

  const points = pointsGained ?? 0;
  const peakScale = getScaleFromPoints(points);
  const floatHeight = -18 - Math.min(points * 0.6, 12);

  return (
    <div className="score-fx">
      <AnimatePresence>
        {fx && (
          <motion.div
            key={fx.id}
            className="points-float"
            initial={{ opacity: 0, y: 8, x: -2, scale: 0.98 }}
            animate={{
              opacity: 1,
              y: floatHeight,
              x: 2,
              scale: [0.98, peakScale, 1],
            }}
            exit={{ opacity: 0, y: -28, x: 0, scale: 0.98 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            onAnimationComplete={() => setFx(null)}
          >
            +{pointsGained}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function getScaleFromPoints(points: number) {
  const min = 1.06;
  const max = 1.22;

  const mid = 14;
  const softness = 10;

  const t = Math.tanh((points - mid) / softness);
  const normalised = (t + 1) / 2;

  return min + (max - min) * normalised;
}
