import { useEffect, useState } from "react";
import { eventDispatcher, EventMap } from "../../event-dispatcher";

export function useEventData<E extends keyof EventMap>(event: E) {
  const [eventData, setEventData] = useState<EventMap[E] | null>(null);

  useEffect(() => {
    function onEvent(data: EventMap[E]) {
      setEventData(data);
    }

    eventDispatcher.on(event, onEvent);

    return () => {
      eventDispatcher.off(event, onEvent);
    };
  }, [event]);

  return eventData;
}
