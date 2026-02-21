import { useEffect } from "react";
import {
  EventCallback,
  eventDispatcher,
  EventMap,
} from "../../event-dispatcher";

export function useEvent<E extends keyof EventMap>(
  event: E,
  callback: EventCallback,
) {
  useEffect(() => {
    eventDispatcher.on(event, callback);

    return () => {
      eventDispatcher.off(event, callback);
    };
  }, [event, callback]);
}
