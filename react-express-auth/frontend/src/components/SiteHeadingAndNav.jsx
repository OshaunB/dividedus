import { NavLink } from "react-router-dom";
import { useContext } from "react";
import CurrentUserContext from "../contexts/current-user-context";

export default function SiteHeadingAndNav() {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <header style={{ backgroundColor: "#28353A" }}>
      <NavLink to="/">
        <img
          src="/flag.png"
          alt="Flag"
          className="w-20 h-16 object-contain cursor-pointer"
        />
      </NavLink>
      <nav>
        <ul>
          <li>{/* <NavLink to="/">Home</NavLink> */}</li>

          {currentUser ? (
            /*if true*/ <>
              <li>
                <NavLink to="/cases">Cases</NavLink>
              </li>
              <li>
                <NavLink to="/report">Report</NavLink>
              </li>
              <li>
                <NavLink to="/resources">Resources</NavLink>
              </li>
              <li>
                <NavLink to={`/users/${currentUser.id}`}>
                  {currentUser.username}
                </NavLink>
              </li>
            </>
          ) : (
            /*if false*/ <>
              <li>
                <NavLink to="/login">Cases</NavLink>
              </li>
              <li>
                <NavLink to="/login">Report</NavLink>
              </li>
              <li>
                <NavLink to="/resources">Resources</NavLink>
              </li>
              <li>
                <NavLink to="/sign-up">Sign In</NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
