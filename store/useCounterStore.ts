import { create } from "zustand";
import { useMulti } from "../hooks/useMulti";

interface CounterState {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  setCount: (count: number) => void;
}

export const useCounterStore = create<CounterState>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
  setCount: (count) => set({ count }),
}));
export const useCounterStoreSelector = <K extends keyof CounterState>(
  ...keys: K[]
): Pick<CounterState, K> => {
  return useMulti(useCounterStore, ...keys);
};
