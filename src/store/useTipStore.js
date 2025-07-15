// src/store/useTipStore.js
import { create } from 'zustand';

export const useTipStore = create((set) => ({
  tipHistory: [],
  addTip: (tip) =>
    set((state) => ({
      tipHistory: [
        {
          ...tip,
          timestamp: new Date().toISOString(),
        },
        ...state.tipHistory.slice(0, 49),
      ],
    })),
}));
