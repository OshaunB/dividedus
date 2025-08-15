import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { Widget } from "@uploadcare/react-widget";

export default function ReportPage() {
  const [form, setForm] = useState({
    person_name: "",
    age: "",
    gender: "",
    summary: "",
    date_last_seen: "",
    photo_url: "",
    last_seen_city: "",
    last_seen_state: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [createdId, setCreatedId] = useState(null);
  const navigate = useNavigate();

  // ---- Uploadcare key (from .env). Fallback to demo key so you can proceed. ----
  const rawKey = (import.meta.env.VITE_UPLOADCARE_PUBLIC_KEY || "").trim();
  const UC_PUBLIC_KEY =
    rawKey && rawKey.length >= 30 ? rawKey : "demopublickey";
  if (UC_PUBLIC_KEY === "demopublickey") {
    console.warn(
      "Using Uploadcare demo key. Set VITE_UPLOADCARE_PUBLIC_KEY in your frontend .env and restart dev server."
    );
  }

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    setCreatedId(null);

    try {
      const payload = {
        ...form,
        summary: (form.summary || "").trim(),
        status: "open",
        age: form.age ? Number(form.age) : null,
      };

      const res = await fetch("/api/cases", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || "Failed to submit report");
      }

      const created = await res.json();
      setCreatedId(created.id);

      setForm({
        person_name: "",
        age: "",
        gender: "",
        summary: "",
        date_last_seen: "",
        photo_url: "",
        last_seen_city: "",
        last_seen_state: "",
      });
    } catch (err) {
      setError(err.message || "Failed to submit report");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      <div className="min-h-[calc(100vh-186px)] w-full bg-black">
        <div className="mx-auto max-w-3xl px-6 py-8">
          {/* Header */}
          <header className="text-center">
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-[#DCC89D] text-center w-full">
              Submit a Report
            </h1>
          </header>

          {/* Card */}
          <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900/30 p-6 md:p-8">
            {/* Success */}
            {createdId && (
              <div
                role="status"
                className="mb-6 rounded-lg border border-emerald-500/60 bg-emerald-600/15 p-4 text-emerald-200">
                Report submitted successfully.{" "}
                <Link
                  to={`/cases/${createdId}`}
                  className="underline text-emerald-300">
                  View case #{createdId}
                </Link>{" "}
                or{" "}
                <Link to="/cases" className="underline text-emerald-300">
                  go to Cases
                </Link>
                .
              </div>
            )}

            {/* Error */}
            {error && (
              <div
                role="alert"
                className="mb-6 rounded-lg border border-rose-500/60 bg-rose-600/15 p-4 text-rose-200">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-slate-200 text-sm mb-1">
                    Person name *
                  </label>
                  <input
                    name="person_name"
                    value={form.person_name}
                    onChange={onChange}
                    required
                    placeholder="Full name"
                    className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3
                               text-slate-100 placeholder:text-slate-400
                               focus:border-sky-400 focus:ring-1 focus:ring-sky-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-200 text-sm mb-1">
                    Age
                  </label>
                  <input
                    name="age"
                    type="number"
                    min="0"
                    value={form.age}
                    onChange={onChange}
                    placeholder="e.g., 28"
                    className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3
                               text-slate-100 placeholder:text-slate-400
                               focus:border-sky-400 focus:ring-1 focus:ring-sky-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-200 text-sm mb-1">
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={form.gender}
                    onChange={onChange}
                    className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3
                               text-slate-100 focus:border-sky-400 focus:ring-1 focus:ring-sky-400">
                    <option value="">Prefer not to say</option>
                    <option value="F">F</option>
                    <option value="M">M</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-200 text-sm mb-1">
                    Date last seen *
                  </label>
                  <input
                    name="date_last_seen"
                    type="date"
                    value={form.date_last_seen}
                    onChange={onChange}
                    required
                    className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3
                               text-slate-100 focus:border-sky-400 focus:ring-1 focus:ring-sky-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-200 text-sm mb-1">
                    Last seen city *
                  </label>
                  <input
                    name="last_seen_city"
                    value={form.last_seen_city}
                    onChange={onChange}
                    required
                    placeholder="City"
                    className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3
                               text-slate-100 placeholder:text-slate-400
                               focus:border-sky-400 focus:ring-1 focus:ring-sky-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-200 text-sm mb-1">
                    Last seen state *
                  </label>
                  <input
                    name="last_seen_state"
                    value={form.last_seen_state}
                    onChange={onChange}
                    required
                    placeholder="State (e.g., NY)"
                    className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3
                               text-slate-100 placeholder:text-slate-400
                               focus:border-sky-400 focus:ring-1 focus:ring-sky-400"
                  />
                </div>
              </div>

              {/* Summary */}
              <div>
                <label className="block text-slate-200 text-sm mb-1">
                  Summary *
                </label>
                <textarea
                  name="summary"
                  value={form.summary}
                  onChange={onChange}
                  required
                  rows={5}
                  maxLength={800}
                  placeholder="What happened? Include time, location, last contact, identifiers, and who to reach."
                  className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3
                             text-slate-100 placeholder:text-slate-400
                             focus:border-sky-400 focus:ring-1 focus:ring-sky-400"
                />
                <div className="mt-1 text-right text-xs text-slate-400">
                  {form.summary.length}/800
                </div>
              </div>

              {/* Photo */}
              <div>
                <label className="block text-slate-200 text-sm mb-1">Photo</label>
                <div className="rounded-lg border border-slate-700 bg-slate-900 px-4 py-4">
                  <Widget
                    publicKey={UC_PUBLIC_KEY}
                    tabs="file url camera"
                    imagesOnly
                    previewStep
                    clearable
                    onChange={(file) => {
                      const url = file?.cdnUrl || "";
                      setForm((f) => ({ ...f, photo_url: url }));
                    }}
                  />
                  {form.photo_url && (
                    <p className="mt-2 text-xs text-slate-400 break-all">
                      Saved URL: {form.photo_url}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-center">
                <button
                  type="submit"
                  disabled={submitting}
                  className="mx-auto min-w-[220px] md:min-w-[260px] rounded-md
                             bg-[#D0BC86] px-8 py-3 text-base md:text-lg text-slate-900 font-medium
                             hover:bg-[#DBC994] disabled:opacity-60">
                  {submitting ? "Submitting…" : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
