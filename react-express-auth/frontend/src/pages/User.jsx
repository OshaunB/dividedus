import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import CurrentUserContext from "../contexts/current-user-context";
import { getUser, updateUser } from "../adapters/user-adapter";
import { logUserOut } from "../adapters/auth-adapter";
import Footer from "../components/Footer";
import { Widget } from "@uploadcare/react-widget";

// Month + Year (e.g., "July 2025")
const fmtMonthYear = (d) => {
  if (!d) return "—";
  const dt = new Date(d);
  return Number.isNaN(dt.getTime())
    ? d
    : dt.toLocaleDateString(undefined, { month: "long", year: "numeric" });
};

export default function UserPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const numericId = Number(id);

  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const isCurrentUserProfile = !!currentUser && currentUser.id === numericId;

  const [userProfile, setUserProfile] = useState(null);
  const [profileErr, setProfileErr] = useState("");
  const [cases, setCases] = useState([]);
  const [casesErr, setCasesErr] = useState("");
  const [loadingCases, setLoadingCases] = useState(true);

  // Edit state
  const [pendingAvatar, setPendingAvatar] = useState("");
  const [quoteDraft, setQuoteDraft] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState("");
  const [showEditor, setShowEditor] = useState(true); // visible by default

  // Uploadcare key
  const rawKey = (import.meta.env.VITE_UPLOADCARE_PUBLIC_KEY || "").trim();
  const UC_PUBLIC_KEY =
    rawKey && rawKey.length >= 30 ? rawKey : "demopublickey";
  if (UC_PUBLIC_KEY === "demopublickey") {
    console.warn(
      "Using Uploadcare demo key. Set VITE_UPLOADCARE_PUBLIC_KEY and restart dev."
    );
  }

  useEffect(() => {
    (async () => {
      const [user, err] = await getUser(numericId);
      if (err) return setProfileErr(err);
      setUserProfile(user);
    })();
  }, [numericId]);

  useEffect(() => {
    if (userProfile) {
      setQuoteDraft(userProfile.quote || "");
      setPendingAvatar("");
      setSaveMsg("");
    }
  }, [userProfile]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setCasesErr("");
        setLoadingCases(true);
        const res = await fetch("/api/cases", { credentials: "include" });
        if (!res.ok) throw new Error(await res.text());
        const data = await res.json();
        const list = Array.isArray(data) ? data : data.data || [];
        const mine = list.filter((c) => Number(c.user_id) === numericId);
        if (!cancelled) setCases(mine);
      } catch {
        if (!cancelled) setCasesErr("Failed to load cases.");
      } finally {
        if (!cancelled) setLoadingCases(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [numericId]);

  const handleLogout = () => {
    logUserOut();
    setCurrentUser(null);
    navigate("/");
  };

  const handleSave = async () => {
    setSaveMsg("");
    setSaving(true);

    const body = {
      quote: quoteDraft, // always send the quote
      ...(pendingAvatar !== "" ? { avatar_url: pendingAvatar } : {}),
    };

    const [updated, err] = await updateUser({ id: numericId, ...body });
    setSaving(false);

    if (err) {
      console.warn("PATCH /api/users error:", err);
      setSaveMsg("Save failed. Please try again.");
      return;
    }

    setPendingAvatar("");
    setUserProfile((prev) => ({ ...prev, ...updated }));
    setSaveMsg("Saved!");
  };

  if (profileErr) {
    return (
      <div className="min-h-[calc(100vh-73.6px)] w-full bg-[#0E1D21] grid place-items-center px-6">
        <p className="rounded-md border border-rose-500/60 bg-rose-600/15 p-4 text-rose-200">
          Sorry, there was a problem loading user. Please try again later.
        </p>
      </div>
    );
  }

  if (!userProfile) return null;

  const username = isCurrentUserProfile
    ? currentUser.username
    : userProfile.username;

  return (
    <div className="w-full">
      <div className="min-h-[calc(100vh-186px)] w-full bg-black">
        <div className="mx-auto max-w-[1100px] px-6 lg:px-8 py-10">
          {/* Responsive Header */}
          <div className="flex flex-col gap-4 sm:gap-5 md:gap-6 md:flex-row md:items-start md:justify-between">
            {/* Left: Avatar + handle/quote */}
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:gap-6">
              {/* Avatar (full-width on mobile, fixed wide on md+) */}
              <div className="w-full md:w-[360px] lg:w-[420px] flex-shrink-0">
                <div className="aspect-[4/3] overflow-hidden rounded-2xl border border-slate-700 bg-slate-900">
                  {pendingAvatar ? (
                    <img
                      src={pendingAvatar}
                      alt="New avatar"
                      className="h-full w-full object-cover"
                    />
                  ) : userProfile.avatar_url ? (
                    <img
                      src={userProfile.avatar_url}
                      alt={`${username} avatar`}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="grid h-full w-full place-items-center text-slate-400">
                      No avatar
                    </div>
                  )}
                </div>
              </div>

              {/* Handle + quote (scales by breakpoint) */}
              <div className="md:max-w-[600px]">
                <div className="text-[#DCC89D] text-base sm:text-lg md:text-xl">
                  @{username}
                </div>
                <p className="mt-1 text-slate-100 text-lg sm:text-xl md:text-2xl leading-7 sm:leading-8">
                  {userProfile.quote || "—"}
                </p>
              </div>
            </div>

            {/* Actions (row on mobile, right-aligned on desktop) */}
            {isCurrentUserProfile && (
              <div className="flex gap-2 md:flex-col md:items-end md:gap-2">
                {/* If you have an Edit toggle, wire onClick here; otherwise remove this button */}
                <button
                  onClick={() => setShowEditor((s) => !s)}
                  className="rounded-md border border-[#DCC89D]/50 text-[#DCC89D] px-4 py-2 hover:bg-[#DCC89D]/10 transition">
                  {showEditor ? "Hide" : "Edit"} Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="rounded-md bg-[#DCC89D] px-4 py-2 text-slate-900 font-medium hover:bg-[#e4d9a9] transition">
                  Log Out
                </button>
              </div>
            )}

            {/* Divider */}
            <div className="h-px bg-slate-700" />
          </div>

          {/* Editor */}
          {isCurrentUserProfile && showEditor && (
            <section className="mt-6 rounded-2xl border border-slate-700 bg-slate-900 p-6">
              <h3 className="text-white text-lg font-semibold mb-4">
                Edit Profile
              </h3>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label className="block text-slate-300 text-sm mb-2">
                    Upload new photo
                  </label>
                  <div className="rounded-lg border border-slate-700 bg-[#0B1220] px-4 py-4">
                    <Widget
                      publicKey={UC_PUBLIC_KEY}
                      tabs="file url camera"
                      imagesOnly
                      previewStep
                      clearable
                      onChange={(file) => setPendingAvatar(file?.cdnUrl || "")}
                    />
                    {pendingAvatar && (
                      <p className="mt-2 text-xs text-slate-400 break-all">
                        Selected URL: {pendingAvatar}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 text-sm mb-2">
                    Personal quote
                  </label>
                  <textarea
                    value={quoteDraft}
                    onChange={(e) => setQuoteDraft(e.target.value)}
                    rows={6}
                    className="w-full rounded-lg border border-slate-700 bg-[#0B1220] px-4 py-3
                               text-slate-100 placeholder:text-slate-400 focus:border-sky-400 focus:ring-1 focus:ring-sky-400"
                    placeholder="Say something meaningful…"
                  />
                </div>
              </div>

              <div className="mt-5 flex items-center gap-3">
                <button
                  onClick={handleSave}
                  disabled={
                    saving ||
                    (!pendingAvatar &&
                      quoteDraft === (userProfile?.quote || ""))
                  }
                  className="rounded-md bg-[#DCC89D] px-6 py-2.5 text-slate-900 font-medium hover:bg-[#e4d9a9] disabled:opacity-60 transition">
                  {saving ? "Saving…" : "Save changes"}
                </button>
                {!!saveMsg && (
                  <span className="text-sm text-slate-300">{saveMsg}</span>
                )}
              </div>
            </section>
          )}

          {/* Title */}
          <h2 className="mt-10 text-center text-xl font-semibold text-slate-100">
            Submitted Cases
          </h2>

          {/* Cards */}
          <section className="mt-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {casesErr ? (
              <div className="sm:col-span-2 lg:col-span-3 mx-auto max-w-md rounded-md border border-rose-500/60 bg-rose-600/15 p-3 text-rose-200 text-center">
                {casesErr}
              </div>
            ) : loadingCases ? (
              Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="h-[200px] rounded-xl bg-slate-900 border border-slate-700 animate-pulse"
                />
              ))
            ) : cases.length === 0 ? (
              <p className="sm:col-span-2 lg:col-span-3 text-center text-slate-300">
                No cases yet.
              </p>
            ) : (
              cases.map((c) => <MiniCaseCard key={c.id} c={c} />)
            )}
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}

function MiniCaseCard({ c }) {
  const submittedMonth = fmtMonthYear(c.created_at || c.date_last_seen || null);

  return (
    <article
      className="rounded-xl bg-slate-900 border border-slate-700 p-6 transition
                 hover:border-[#DCC89D] hover:shadow-[0_10px_30px_rgba(220,200,157,.08)]">
      <h3 className="text-[#DCC89D] text-lg font-semibold truncate">
        {c.person_name}
      </h3>

      <p className="mt-4 text-sm text-slate-400">
        <span className="text-slate-300">Status:</span>{" "}
        <span className="capitalize">{c.status || "open"}</span>
      </p>
      <p className="text-sm text-slate-400">
        <span className="text-slate-300">Submitted:</span> {submittedMonth}
      </p>

      <Link
        to={`/cases/${c.id}`}
        className="mt-5 inline-flex items-center justify-center rounded-md bg-[#DCC89D]
                   px-5 py-2 text-sm font-medium text-slate-900 hover:bg-[#e4d9a9] transition">
        View
      </Link>
    </article>
  );
}
