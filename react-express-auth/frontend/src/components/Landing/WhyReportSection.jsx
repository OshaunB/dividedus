import {
  ChartBarIcon,
  MagnifyingGlassIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/solid";
import classroom from "../../assets/classroom.jpg";

export default function WhyReportSection() {
  return (
    <section className="bg-[#0E1D21] text-white py-20 px-8">
      {/* Top Divider */}
      <div className="border-t border-white/30 my-12 mx-auto max-w-5xl" />

      {/* Top Content */}
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-6xl sm:text-7xl font-bold mb-28 mt-24">
          The Unseen Numbers
        </h2>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-32">
          <div className="flex flex-col items-center max-w-sm text-2xl">
            <ChartBarIcon className="h-32 w-32 text-[#C2B280]" />
            <p className="mt-8 font-bold leading-snug text-3xl text-center">
              1,200+ ICE arrests
              <br />
              happen DAILY
            </p>
          </div>
          <div className="flex flex-col items-center max-w-sm text-2xl">
            <MagnifyingGlassIcon className="h-32 w-32 text-[#C2B280]" />
            <p className="mt-8 font-bold leading-snug text-3xl text-center">
              Most arrests never
              <br />
              make the news
            </p>
            <p className="text-xl text-white/80 mt-3 text-center">
              and go unreported
            </p>
          </div>
          <div className="flex flex-col items-center max-w-sm text-2xl">
            <DocumentTextIcon className="h-32 w-32 text-[#C2B280]" />
            <p className="mt-8 font-bold leading-snug text-3xl text-center">
              You can help
              <br />
              submit a report today
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Divider */}
      <div className="border-t border-white/30 my-20 mx-auto max-w-5xl" />

      {/* Bottom Content */}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-6">
        <div className="flex justify-center w-full">
          <img
            src={classroom}
            alt="Classroom scene"
            className="w-full h-[400px] rounded-xl object-cover shadow-xl"
          />
        </div>
        <div className="flex flex-col justify-center text-center max-w-3xl">
          <h3 className="text-4xl sm:text-5xl font-bold mb-10">
            Why You Should Submit a Report
          </h3>
          <p className="text-3xl leading-loose mb-12 px-4 text-center">
            Every day, families are separated and stories go untold. Submitting
            your experience — or that of someone you love — helps bring
            visibility to injustice and builds collective pressure for change.
            <strong>
              <em> Every voice matters.</em>
            </strong>
          </p>
          <div className="flex justify-center">
            <button className="bg-[#C2B280] text-black text-2xl font-semibold py-4 px-6 rounded hover:bg-[#b3a16f] transition w-full max-w-[8rem]">
              Report
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
