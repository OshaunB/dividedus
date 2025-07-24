import { useContext, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignUpPage from "./pages/SignUp";
import SiteHeadingAndNav from "./components/SiteHeadingAndNav";
import NotFoundPage from "./pages/NotFound";
// import UserContext from "./contexts/current-user-context";
import CurrentUserContext from './contexts/current-user-context';
import { checkForLoggedInUser } from "./adapters/auth-adapter";
import UsersPage from "./pages/Users";
import UserPage from "./pages/User";
import AskOphelia from "./pages/AskOphelia";

export default function App() {
  // const { setCurrentUser } = useContext(UserContext);
  const { setCurrentUser } = useContext(CurrentUserContext);
  const [isModalOpen, setIsModalOpen] = useState(false); // ✅ moved here

  useEffect(() => {
    const loadCurrentUser = async () => {
      const [data] = await checkForLoggedInUser();
      if (data) setCurrentUser(data);
    };
    loadCurrentUser();
  }, [setCurrentUser]);

  return (
    <>
      <SiteHeadingAndNav
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/users/:id" element={<UserPage />} />
          <Route path="/ask-ophelia" element={<AskOphelia />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </>
  );
}
