import { useEffect, useState } from "react";
import Carousel from "./Carousel";

export default function RealPeopleSection() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5001/api/guardian")
      .then((res) => res.json())
      .then((data) => {
        console.log("Guardian API response:", data); // 👈 logs the raw API response
        setArticles(data);
      })
      .catch((err) => console.error("Guardian fetch error:", err));
  }, []);

  const slides = articles.map((article) => ({
    title: article.fields?.headline || "Untitled",
    src: article.fields?.thumbnail || "",
    trail: article.fields?.trailText || "",
    href: article.webUrl,
  }));

  const handleClick = (slide) => {
    if (slide.href) {
      window.open(slide.href, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <section className="bg-black text-white relative w-full overflow-hidden pt-[27rem]">
      {/* Absolutely positioned heading */}
      <div className="absolute top-20 left-14 text-left z-10">
        <h2 className="text-[4rem] sm:text-[5rem] md:text-[7rem] lg:text-[9rem] font-bold text-[#C2B280] leading-tight">
          REAL PEOPLE.
          <br />
          REAL IMPACT.
        </h2>
      </div>

      {/* Carousel pushed below heading */}
      <div className="relative w-full h-full py-14">
        <Carousel slides={slides} onSlideClick={handleClick} />
      </div>
    </section>
  );
}
