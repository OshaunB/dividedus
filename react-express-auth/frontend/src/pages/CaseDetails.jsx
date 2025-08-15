import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Link removed
import Footer from "../components/Footer";

function fmtDate(d) {
  if (!d) return "—";
  try {
    const dt = new Date(d);
    if (Number.isNaN(dt.getTime())) return d;
    return dt.toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return d;
  }
}

export default function CaseDetails() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancel = false;
    (async () => {
      try {
        setErr("");
        setLoading(true);
        const res = await fetch(`/api/cases/${id}`, { credentials: "include" });
        if (!res.ok) throw new Error(await res.text());
        const json = await res.json();
        if (!cancel) setData(json);
      } catch {
        if (!cancel) setErr("Failed to load case.");
      } finally {
        if (!cancel) setLoading(false);
      }
    })();
    return () => { cancel = true; };
  }, [id]);

  const submittedBy = data?.submitted_by || data?.username || "Unknown";
  const lastSeen = [data?.last_seen_city, data?.last_seen_state].filter(Boolean).join(", ") || "—";
  const statusText = (data?.status || "open");
  const statusCap = statusText.charAt(0).toUpperCase() + statusText.slice(1);

  return (
    <div className="w-full">
      <div className="min-h-[calc(100vh-73.6px)] w-full bg-[#0E1D21]">
        <div className="mx-auto max-w-5xl px-6 py-8">
          {/* Loading / Error */}
          {loading && (
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="h-72 rounded-2xl bg-slate-800/40 animate-pulse" />
              <div className="h-72 rounded-2xl bg-slate-800/40 animate-pulse" />
            </div>
          )}
          {err && !loading && (
            <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-3 text-red-700">
              {err}
            </div>
          )}

          {/* Content */}
          {!loading && !err && data && (
            <>
              <header className="mt-6 flex items-center justify-between gap-3">
                <div>
                  <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-[#DCC89D]">
                    {data.person_name || "Unnamed Person"}
                  </h1>
                  <p className="mt-1 text-slate-300 text-sm">
                    Submitted by <span className="text-slate-100">{submittedBy}</span>
                  </p>
                </div>
                <span className="shrink-0 rounded-full bg-[#D0BC86] px-3 py-1 text-sm font-medium text-slate-900">
                  {statusCap}
                </span>
              </header>

              <section className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Photo */}
                <div className="rounded-2xl overflow-hidden bg-slate-800/30 border border-slate-700">
                  {data.photo_url ? (
                    <img
                      src={data.photo_url}
                      alt={data.person_name || "Case photo"}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="h-72 w-full grid place-items-center text-slate-400">
                      No photo provided
                    </div>
                  )}
                </div>

                {/* Quick facts */}
                <div className="rounded-2xl border border-slate-700 bg-slate-800/30 p-5">
                  <h2 className="text-lg font-medium text-white">Details</h2>
                  <dl className="mt-3 grid grid-cols-1 gap-3 text-sm">
                    <div className="flex justify-between border-b border-slate-700/60 py-2">
                      <dt className="text-slate-300">Status</dt>
                      <dd className="text-slate-100">{statusCap}</dd>
                    </div>
                    <div className="flex justify-between border-b border-slate-700/60 py-2">
                      <dt className="text-slate-300">Age</dt>
                      <dd className="text-slate-100">{data.age ?? "—"}</dd>
                    </div>
                    <div className="flex justify-between border-b border-slate-700/60 py-2">
                      <dt className="text-slate-300">Gender</dt>
                      <dd className="text-slate-100">{data.gender || "—"}</dd>
                    </div>
                    <div className="flex justify-between border-b border-slate-700/60 py-2">
                      <dt className="text-slate-300">Date last seen</dt>
                      <dd className="text-slate-100">{fmtDate(data.date_last_seen)}</dd>
                    </div>
                    <div className="flex justify-between py-2">
                      <dt className="text-slate-300">Last seen</dt>
                      <dd className="text-slate-100">{lastSeen}</dd>
                    </div>
                  </dl>
                </div>
              </section>

              {/* Summary */}
              {data.summary && (
                <section className="mt-6 rounded-2xl border border-slate-700 bg-slate-800/30 p-5">
                  <h2 className="text-lg font-medium text-white mb-2">Summary</h2>
                  <p className="text-slate-200 leading-7">{data.summary}</p>
                </section>
              )}

              {/* Comments placeholder */}
              <section className="mt-6 rounded-2xl border border-slate-700 bg-slate-800/30 p-5">
                <h2 className="text-lg font-medium text-white">Comments</h2>
                <p className="mt-2 text-slate-300 text-sm">Coming soon.</p>
              </section>
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
