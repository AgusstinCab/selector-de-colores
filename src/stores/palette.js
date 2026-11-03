import { create } from "zustand";

const random = () => {
  const h = Math.floor(Math.random() * 360);
  const s = 70 + Math.random() * 20;
  const l = 55 + Math.random() * 15;

  return `hsl(${h} ${s.toFixed(2)}% ${l.toFixed(2)}%)`;
};

export const usePaletteStore = create((set, get) => ({
  colors: Array.from({ length: 5 }, () => ({
    id: new Date(),
    hex: random(),
    locked: false,
  })),

  generate: () =>
    set({
      colors: get().colors.map((c) => (c.locked ? c : { ...c, hex: random() })),
    }),

  toggleLock: (id) =>
    set({
      colors: get().colors.map((c) =>
        c.id === id ? { ...c, locked: !c.locked } : c,
      ),
    }),
}));
