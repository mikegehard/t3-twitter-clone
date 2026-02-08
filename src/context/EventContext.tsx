import { createContext, useContext } from "react";

type EventContextType = {
  registerListener: (id: string, callback: (data: unknown) => void) => void;
  unregisterListener: (id: string) => void;
};

const EventContext = createContext<EventContextType>({
  registerListener: () => {},
  unregisterListener: () => {},
});

export const useEventContext = () => useContext(EventContext);
export default EventContext;
