import { useShallow } from "zustand/react/shallow";
import type { UseBoundStore, StoreApi } from "zustand";

/**
 * Generic hook to efficiently select multiple properties from any Zustand store
 * Uses shallow comparison to prevent unnecessary re-renders
 *
 * @example
 * const { isOnline, deviceId, currentCaregiver } = useMulti(useStateStore, "isOnline", "deviceId", "currentCaregiver");
 */
export function useMulti<TState extends object, K extends keyof TState>(
  store: UseBoundStore<StoreApi<TState>>,
  ...items: K[]
): Pick<TState, K> {
  const selected = store(
    useShallow((state) =>
      items.reduce(
        (acc, item) => ({ ...acc, [item]: state[item] }),
        {} as Pick<TState, K>,
      ),
    ),
  );

  return selected;
}
