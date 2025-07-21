export default function Footer() {
  return (
    <footer className="footer sm:footer-horizontal footer-center bg-[#C2B280] text-base-content text-center text-black font-bold text-2xl p-10">
      <aside>
        <p>
          Copyright © {new Date().getFullYear()} - All right reserved by
          DividedUS
        </p>
      </aside>
    </footer>
  );
}
