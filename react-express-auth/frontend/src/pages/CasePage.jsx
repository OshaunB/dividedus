import { useEffect, useState } from "react";
import CaseCard from "../components/CaseCard";
import Footer from "../components/Footer";

export default function CasePage() {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [q, setQ] = useState("");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setErr("");
        setLoading(true);
        const res = await fetch("/api/cases", { credentials: "include" });
        if (!res.ok) throw new Error(await res.text());
        const data = await res.json();
        const list = Array.isArray(data) ? data : data.data || [];
        if (!cancelled) setCases(list);
      } catch {
        if (!cancelled) setErr("Failed to load cases.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = q.trim()
    ? cases.filter((c) =>
        (c.person_name || "").toLowerCase().includes(q.toLowerCase())
      )
    : cases;

  return (
    <div className="bg-[#0E1D21] w-full flex min-h-[calc(100vh-73.6px)] flex-col">
      {/* Header */}
      <section className="px-6 py-8 md:py-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-4xl md:text-5xl xl:text-6xl font-semibold tracking-tight text-[#DCC89D]">
            Active Cases
          </h1>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Type Name Here"
            className="h-12 md:h-14 w-80 md:w-96 rounded-lg border border-slate-600
                       bg-white px-4 md:px-5 text-base md:text-lg text-slate-100
                       placeholder:text-black outline-none
                       focus:border-sky-400 focus:ring-1 focus:ring-sky-400"
          />
        </div>
        {/* <p className="mt-3 text-sm text-slate-300">
          {err
            ? err
            : loading
            ? "Loading…"
            : `${filtered.length} result${filtered.length === 1 ? "" : "s"}`}
        </p> */}
      </section>

      {/* Cards */}
      <section className="flex-1 px-6 pb-8">
        {err ? (
          <div className="mx-auto max-w-5xl rounded-xl border border-red-200 bg-red-50 p-3 text-red-700">
            {err}
          </div>
        ) : loading ? (
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-12">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="w-[300px] h-[420px] rounded-[22px] bg-slate-800/40 animate-pulse"
              />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="mx-auto max-w-5xl rounded-2xl border border-slate-700 bg-slate-800/40 p-6 text-center text-slate-300">
            No cases found.
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-12">
            {filtered.map((c) => (
              <div key={c.id} className="w-[300px]">
                <CaseCard c={c} />
              </div>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}
