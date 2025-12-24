import { create } from "zustand";
import { useMulti } from "../hooks/useMulti";

// Example Zustand store - customize for your application
interface ExampleState {
  value: string;
  setValue: (value: string) => void;
}

export const useExampleStore = create<ExampleState>((set) => ({
  value: "",
  setValue: (value) => set({ value }),
}));

// Helper hook for efficient store selection
export const useExampleStoreSelector = <K extends keyof ExampleState>(
  ...keys: K[]
): Pick<ExampleState, K> => {
  return useMulti(useExampleStore, ...keys);
};
