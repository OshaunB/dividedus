import passportImage from "../../assets/passport.png";
export default function HeroSection() {
  return (
    <div className="relative h-[calc(100vh-73.6px)]  w-full overflow-hidden">
      {/* Background image */}
      <img
        src={passportImage}
        alt="test"
        className="w-screen h-[calc(100vh-73.6px)] object-cover"
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black opacity-60 z-10" />

      {/* Foreground content */}
      <div className="absolute top-15 left-8 text-left text-white z-20 pr-4">
        <h1 className="text-[4rem] sm:text-[5rem] md:text-[7rem] lg:text-[7rem] font-semibold leading-tight text-[#C2B280]">
          TORN BY <br />
          BORDERS, TIED <br />
          BY BLOOD<span className="text-[#C2B280]">.</span>
        </h1>
        <p className="mt-10 text-xl sm:text-2xl md:text-3xl font-medium">
          Shining a light on unjust detentions and the fight to reunite
          families.
        </p>
      </div>
    </div>
  );
}
