import { Link } from "react-router-dom";

export default function CaseCard({ c }) {
  const submittedBy = c.submitted_by || c.username || "Unknown";
  const summary = (c.summary || "").trim();

  return (
    <article
      className="
        h-[420px] max-w-[300px] w-full overflow-hidden
        rounded-[22px] bg-white p-6 shadow-lg
        flex flex-col items-center gap-3
        ring-0 transition hover:ring-4 hover:ring-sky-300
      "
    >
      {c.photo_url ? (
        <img
          src={c.photo_url}
          alt={c.person_name || 'Case photo'}
          className="h-40 w-full rounded-[14px] object-cover"
          loading="lazy"
        />
      ) : (
        <div className="h-40 w-full rounded-[14px] bg-gray-200" />
      )}

      <h3 className="text-center text-lg md:text-xl font-semibold text-gray-900">
        {c.person_name}
      </h3>

      {summary && (
        <p className="text-center text-sm md:text-base leading-6 text-gray-700 italic line-clamp-3">
          &ldquo;{summary}&rdquo;
        </p>
      )}

      <div className="flex-1" />

      <Link
        to={`/cases/${c.id}`}
        className="mt-2 inline-flex items-center justify-center rounded-md
                   bg-[#D0BC86] px-6 py-2.5 text-sm md:text-base font-medium text-slate-900
                   shadow-sm hover:bg-[#DBC994] focus:outline-none"
      >
        View
      </Link>

      <p className="mt-2 text-center text-xs md:text-sm text-gray-500">
        Submitted by: {submittedBy}
      </p>
    </article>
  );
}
