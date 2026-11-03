import { useEffect } from "react";
import { usePaletteStore } from "./stores/palette";

function App() {
  const colors = usePaletteStore((s) => s.colors); // evita re-renders
  const generate = usePaletteStore((s) => s.generate);
  const toggleLock = usePaletteStore((s) => s.toggleLock);

  useEffect(() => {
    // const onKey = (e) => {e.code === "space" && (e.preventDefault(), generate());
    const onKey = (e) => {
      if (e.code === "Space") {
        e.preventDefault();
        generate();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [generate]);

  return (
    <main className="h-screen w-full flex flex-col">
      <header className="p-4 flex justify-between items-center border-b">
        <h1 className="font-black">Paleta</h1>
        <button
          onClick={generate}
          className="px-4 py-1.5 bg-black text-white rounded-lg text-sm"
        >
          Espacio para generar
        </button>
      </header>

      <div className="flex flex-1">
        {colors.map((c) => (
          <div
            key={c.id}
            style={{ background: c.hex }}
            className="flex flex-1 flex-col items-center justify-center gap-4 group"
          >
            <button
              onClick={() => toggleLock(c.id)}
              className="w-10 h-10 rounded-full bg-black/30 text-xl"
            >
              {c.locked ? "🔒" : "🔓"}
            </button>
            <button
              onClick={() => {
                navigator.clipboard.writeText(c.hex);
                alert("Copiado!");
              }}
              className="px-3 py-1 rounded-full bg-white/90 text-black font-mono text-xs font-bold opacity-0 group-hover:opacity-100 transition"
            >
              {c.hex}
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}

export default App;
