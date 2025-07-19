import { NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import CurrentUserContext from "../contexts/current-user-context";
import SignInModal from "./SignInModal";

import {
  ChatBubbleLeftEllipsisIcon,
  NewspaperIcon,
  BookOpenIcon,
  ArrowRightOnRectangleIcon,
  UserIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/solid";

export default function SiteHeadingAndNav() {
  const { currentUser } = useContext(CurrentUserContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleProtectedClick = (e, path) => {
    if (!currentUser) {
      e.preventDefault();
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <header
        className="flex items-center justify-between px-6 py-3 text-white relative z-50"
        style={{ backgroundColor: "#28353A" }}>
        {/* Left - Logo */}
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-2 border-b-2 transition-all duration-200 ${
              isActive ? "border-white" : "border-transparent"
            }`
          }>
          <img
            src="/flag.png"
            alt="Flag"
            className="w-14 h-14 object-contain cursor-pointer"
          />
          <span className="text-2xl font-semibold">DividedUS</span>
        </NavLink>

        {/* Mobile toggle */}
        <button
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? (
            <XMarkIcon className="h-8 w-8" />
          ) : (
            <Bars3Icon className="h-8 w-8" />
          )}
        </button>

        {/* Desktop Nav */}
        <ul className="hidden md:flex gap-x-16 text-xl items-center">
          <li>
            <NavLink
              to="/cases"
              onClick={(e) => handleProtectedClick(e, "/cases")}
              className={({ isActive }) =>
                `flex items-center gap-2 border-b-2 pb-1 transition-all duration-200 ${
                  currentUser && isActive ? "border-white" : "border-transparent"
                }`
              }>
              <ChatBubbleLeftEllipsisIcon className="h-5 w-5" />
              Cases
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/report"
              onClick={(e) => handleProtectedClick(e, "/report")}
              className={({ isActive }) =>
                `flex items-center gap-2 border-b-2 pb-1 transition-all duration-200 ${
                  currentUser && isActive ? "border-white" : "border-transparent"
                }`
              }>
              <NewspaperIcon className="h-5 w-5" />
              Report
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/resources"
              className={({ isActive }) =>
                `flex items-center gap-2 border-b-2 pb-1 transition-all duration-200 ${
                  isActive ? "border-white" : "border-transparent"
                }`
              }>
              <BookOpenIcon className="h-5 w-5" />
              Resources
            </NavLink>
          </li>
        </ul>

        {/* Desktop Auth */}
        <ul className="hidden md:flex gap-x-6 text-xl mr-8 items-center">
          <li>
            {currentUser ? (
              <NavLink
                to={`/users/${currentUser.id}`}
                className="flex items-center gap-2">
                <UserIcon className="h-5 w-5" />
                {currentUser.username}
              </NavLink>
            ) : (
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 border-b-2 pb-1 transition-all duration-200 border-transparent hover:border-white">
                <ArrowRightOnRectangleIcon className="h-5 w-5" />
                <span>Sign In</span>
              </button>
            )}
          </li>
        </ul>

        {/* Mobile Dropdown */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-[#28353A] flex flex-col gap-4 py-4 px-6 text-xl md:hidden">
            <NavLink to="/cases" onClick={(e) => handleProtectedClick(e, "/cases")}>
              <div className="flex items-center gap-2">
                <ChatBubbleLeftEllipsisIcon className="h-5 w-5" />
                Cases
              </div>
            </NavLink>
            <NavLink to="/report" onClick={(e) => handleProtectedClick(e, "/report")}>
              <div className="flex items-center gap-2">
                <NewspaperIcon className="h-5 w-5" />
                Report
              </div>
            </NavLink>
            <NavLink to="/resources">
              <div className="flex items-center gap-2">
                <BookOpenIcon className="h-5 w-5" />
                Resources
              </div>
            </NavLink>
            {currentUser ? (
              <NavLink to={`/users/${currentUser.id}`}>
                <div className="flex items-center gap-2">
                  <UserIcon className="h-5 w-5" />
                  {currentUser.username}
                </div>
              </NavLink>
            ) : (
              <button
                onClick={() => {
                  setIsModalOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center gap-2">
                <ArrowRightOnRectangleIcon className="h-5 w-5" />
                Sign In
              </button>
            )}
          </div>
        )}
      </header>

      <SignInModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
