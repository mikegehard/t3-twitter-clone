import { createContext, useContext } from "react";

interface EventContextType {
  registerListener: (id: string, callback: (data: unknown) => void) => void;
  unregisterListener: (id: string) => void;
}

const EventContext = createContext<EventContextType>({
  registerListener: () => { /* no-op */ },
  unregisterListener: () => { /* no-op */ },
});

export function useEventContext() {
  return useContext(EventContext);
}

export default EventContext;
